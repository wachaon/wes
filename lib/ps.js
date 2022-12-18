const WShell = require('WScript.Shell')
const genGUID = require('genGUID')
const { writeFileSync, deleteFileSync, existsFileSync } = require('filesystem')
const { resolve, toWin32Sep } = require('pathname')
const { LF } = require('text')
const isCLI = require('isCLI')
const { unnamed, get } = require('argv')

function execCommand(command, options) {
    const file = resolve(process.cwd(), genGUID() + '.ps1')
    writeFileSync(file, command, 'UTF-8BOM')
    try {
        return execFile(file, options)
    } catch (e) {
        throw e
    } finally {
        if (existsFileSync(file)) deleteFileSync(file)
    }
}

function execFile(spec, policy = {}) {
    const { Policy, Minutely } = Object.assign({ Policy: 'Bypass', Minutely: false }, policy)
    const Command = `powershell -ExecutionPolicy ${Policy} -File "${toWin32Sep(spec)}"`
    const stream = WShell.Exec(Command)

    let out = []
    let err = []
    while (!stream.StdOut.AtEndOfStream) {
        const line = stream.StdOut.ReadLine()
        if (Minutely) console.log(line)
        else out.push(line)
    }
    while (!stream.StdErr.AtEndOfStream) {
        err.push(stream.StdErr.ReadLine())
    }

    if (err.length) throw new Error(err.join(LF))
    return out.join(LF)
}

if (isCLI(__filename)) {
    const options = {
        Policy: get('policy') || get('p') || 'Bypass',
        Minutely: true
    }
    const command = get('command') || get('c')

    if (command) {
        console.log(execCommand(command === true ? unnamed[1] : command, options))
    } else {
        const spec = get('file') || get('f') || unnamed[1]
        console.log(execFile(spec, options))
    }
} else
    module.exports = {
        execCommand,
        execFile
    }
