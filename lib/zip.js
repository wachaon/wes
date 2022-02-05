const { existsFileSync } = require('filesystem')
const WShell = require('WScript.Shell')
const { extname } = require('pathname')
const { get, unnamed } = require('argv')
const ZIP = '.zip'

function unzip(path, destinationPath, force = true) {
    if (path == null) throw new Error('Please specify a file.')
    if (extname(path) !== ZIP) throw new Error('Please specify a ZIP file.')
    if (path.includes('*')) throw new Error('Wildcards are not allowed in path')

    let dest = destinationPath || path.slice(0, -4)
    if (existsFileSync(dest)) dest = 'unzip_' + dest

    const f = force ? '-Force' : ''
    const command = `powershell -Command Expand-Archive -Path "${path}" -DestinationPath "${dest}" ${f}`

    try {
        WShell.Exec(command)
        return dest
    } catch (error) {
        throw error
    }
}

function zip(path, destinationPath, force = true, update = true) {
    if (path == null) throw new Error('Please specify a file.')
    if (path.includes('*') && destinationPath == null)
        throw new Error('If wildcards are used for path, destinationPath is required')

    let dest = destinationPath || path
    if (extname(dest) !== ZIP) dest = dest + ZIP

    const f = force ? '-Force' : ''
    const u = update ? '-Update' : ''
    const command = `powershell -Command Compress-Archive -Path "${path}" -DestinationPath "${dest}" ${f} ${u}`

    try {
        WShell.Exec(command)
        return dest
    } catch (error) {
        throw error
    }
}

module.exports = {
    zip,
    unzip
}

if (wes.Modules[wes.main].path !== __filename) return
const _path = get('p') || get('path') || unnamed[1] || null
if (_path == null) return console.log('Please specify a file.')

let exec = extname(_path) === ZIP ? unzip : zip

const _destinationPath = get('d') || get('dest') || unnamed[2] || null

console.log('%S dest %O', exec.name, exec(_path, _destinationPath))
