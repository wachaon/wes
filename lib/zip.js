const WShell = require('WScript.Shell')
const { get, unnamed } = require('argv')
const { existsFileSync } = require('filesystem')
const { extname, toWin32Sep } = require('pathname')
const { NONE } = require('text')
const isCLI = require('isCLI')
const ZIP = '.zip'

function unzip(path, destinationPath, force = true) {
    if (path == null) throw new Error('Please specify a file.')
    if (extname(path) !== ZIP) throw new Error('Please specify a ZIP file.')
    if (path.includes('*')) throw new Error('Wildcards are not allowed in path')

    let dest = destinationPath || path.slice(0, -4)
    if (existsFileSync(dest)) dest = 'unzip_' + dest

    path = toWin32Sep(path)
    dest = toWin32Sep(dest)

    const f = force ? '-Force' : NONE
    const command = `powershell -Command Expand-Archive -Path "${path}" -DestinationPath "${dest}" ${f}`

    try {
        WShell.Exec(command).StdOut.ReadAll()
        return dest
    } catch (error) {
        throw error
    }
}

function zip(path, destinationPath, force = true) {
    if (path == null) throw new Error('Please specify a file.')
    if (path.includes('*') && destinationPath == null)
        throw new Error('If wildcards are used for path, destinationPath is required')

    let dest = destinationPath || path
    if (extname(dest) !== ZIP) dest = dest + ZIP

    path = toWin32Sep(path)
    dest = toWin32Sep(dest)

    const f = force ? '-Force' : NONE
    const command = `powershell -Command Compress-Archive -Path "${path}" -DestinationPath "${dest}" ${f}`

    try {
        WShell.Exec(command).StdOut.ReadAll()
        if (!existsFileSync(dest)) throw new Error('Compression of ' + dest + ' failed.')
        return dest
    } catch (error) {
        throw error
    }
}

module.exports = {
    zip,
    unzip
}

if (isCLI(__filename)) {
    const _path = get('p') || get('path') || unnamed[1] || null
    if (_path == null) return console.log('Please specify a file.')

    let exec = extname(_path) === ZIP ? unzip : zip

    const _destinationPath = get('d') || get('dest') || unnamed[2] || null

    console.log('%S dest %O', exec.name, exec(_path, _destinationPath))
}
