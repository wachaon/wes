const Shell = require('Shell.Application')
const WShell = require('WScript.Shell')

const genGUID = require('genGUID')
const { writeFileSync, deleteFileSync } = require('filesystem')
const { resolve, toWin32Sep } = require('pathname')
const { TypeName } = require('VBScript')
const { typecheck } = require('typecheck')
const isCLI = require('isCLI')
const { unnamed, get } = require('argv')
const { LF } = require('text')

if (isCLI(__filename)) {
    try {
        const ServerName = get('progID') || get('p') || unnamed[1]
        const SleepTimer = get('timer') || get('t') || unnamed[2] || 1000
        return getMember(require(ServerName), SleepTimer)
    } catch (e) {
        throw new Error('It is mandatory to specify the Program ID for the Component Object Model.')
    }
} else module.exports = getMember

function getMember(instans, sleep = 1000) {
    const typename = TypeName(instans)
    if (/(Long|String|Boolean|JScriptTypeInfo)/.test(typename))
        return console.log('   InstansName: %S\n         Value: %O\n', typecheck(instans), instans)

    Shell.Windows().Item().PutProperty('wes', instans)
    console.log('   InstansName: %S', typename)

    const source = `
$shell = New-Object -ComObject "Shell.Application"
$instans = $shell.Windows().Item().GetProperty("wes")
$instans | Get-Member
`
    const spec = resolve(process.cwd(), genGUID() + '.ps1')
    console.weaklog(writeFileSync(spec, source, 'UTF-8BOM'))

    try {
        const command = `powershell -ExecutionPolicy Bypass -File "${toWin32Sep(spec)}"`
        const stream = WShell.Exec(command)
        WScript.Sleep(sleep)

        const res = []
        while (!stream.StdOut.AtEndOfStream) {
            const line = stream.StdOut.ReadLine()
            res.push(line)
            console.log(line)
        }
        while (!stream.StdErr.AtEndOfStream) {
            const line = stream.StdErr.ReadLine()
            res.push(line)
            console.log(line)
        }
        return res.join(LF)
    } catch (e) {
        throw e
    } finally {
        deleteFileSync(spec)
    }
}
