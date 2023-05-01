const Shell = require('Shell.Application')
const WShell = require('WScript.Shell')

const { TypeName } = require('VBScript')
const { typecheck } = require('typecheck')
const isCLI = require('isCLI')
const { unnamed, get } = require('argv')
const { NONE } = require('text')

if (isCLI(__filename)) {
    const ServerName = get('progID') || get('p') || unnamed[1]
    return getMember(require(ServerName))
} else module.exports = getMember

function getMember(instans) {
    const typename = TypeName(instans)
    if (/(Long|String|Boolean|JScriptTypeInfo)/.test(typename))
        return console.log('   InstansName: %S\n         Value: %O\n', typecheck(instans), instans)

    Shell.Windows().Item().PutProperty('wes', instans)
    console.log('   InstansName: %S', typename)

    const code = `(New-Object -ComObject "Shell.Application).Windows().Item().GetProperty('wes') | Get-Member`
    const command = `powershell -ExecutionPolicy Bypass -Command "${code}"`
    const stream = WShell.Exec(command)

    let i = 0
    const timeout = 3000
    let end = new Date().getTime() + timeout
    const indicator = ['|', '/', '-', '\\']

    while (stream.Status === 0 && new Date() < end) {
        console.weaklog(indicator[i++ % 4])
        WScript.Sleep(50)
    }

    let row = 0
    let blankLineCount = 0
    while (!stream.StdOut.AtEndOfStream) {
        let line
        row++
        if (row < 5) line = stream.StdOut.ReadLine()
        else if (blankLineCount > 0) break
        else {
            line = stream.StdOut.ReadLine()
            line.trim() === NONE && blankLineCount++
        }
        console.log(line)
    }
}
