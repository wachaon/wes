const Shell = require('Shell.Application')
const WShell = require('WScript.Shell')

const genGUID = require('genGUID')
const { writeFileSync, deleteFileSync, readFileSync } = require('filesystem')
const { resolve, toWin32Sep } = require('pathname')
const isCLI = require('isCLI')
const { get, unnamed } = require('argv')

if (isCLI(__filename)) {
    let source = get('Command') || get('c') || readFileSync(resolve(process.cwd(), unnamed[1]), 'auto')
    ps(source)
} else module.exports = ps

function ps(source) {
    const code = `
$shell = New-Object -ComObject "Shell.Application"
$exports = $null
${source}
$shell.Windows().Item().PutProperty("exports", $exports)
`
    const spec = resolve(process.cwd(), genGUID() + '.ps1')
    console.weaklog(writeFileSync(spec, code, 'UTF-8BOM'))

    try {
        const command = `powershell -ExecutionPolicy Bypass -File "${toWin32Sep(spec)}"`
        const stream = WShell.Exec(command)
        while (!stream.StdOut.AtEndOfStream) console.log(stream.StdOut.ReadLine())

        return Shell.Windows().Item().GetProperty('exports')
    } catch (e) {
        throw e
    } finally {
        deleteFileSync(spec)
    }
}
