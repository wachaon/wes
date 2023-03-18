const Shell = require('Shell.Application')
const WShell = require('WScript.Shell')

const { TypeName } = require('VBScript')
const { typecheck } = require('typecheck')
const isCLI = require('isCLI')
const { unnamed, get } = require('argv')

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
    const indicator = ['|', '/', '-', '\\']

    while (stream.Status === 0) {
        console.weaklog(indicator[i++ % 4])
        WScript.Sleep(50)
    }

    while (!stream.StdOut.AtEndOfStream) {
        console.log(stream.StdOut.ReadLine())
    }
}
