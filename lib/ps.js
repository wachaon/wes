const Shell = require('Shell.Application')
const WShell = require('WScript.Shell')

const genGUID = require('genGUID')
const { writeFileSync, deleteFileSync, readFileSync } = require('filesystem')
const { resolve, toWin32Sep } = require('pathname')
const isCLI = require('isCLI')
const { get, unnamed } = require('argv')
const { SPACE } = require('text')

if (isCLI(__filename)) {
    let source = get('Command') || get('c') || readFileSync(resolve(process.cwd(), unnamed.shift()), 'auto')
    ps(source, unnamed.slice(1))
} else module.exports = ps

function ps(source, option = []) {
    const code = `
$shell = New-Object -ComObject "Shell.Application"
$exports = $null
${source}
$shell.Windows().Item().PutProperty("exports", $exports)
`
    const spec = resolve(process.cwd(), genGUID() + '.ps1')
    writeFileSync(spec, code, 'UTF-8BOM')

    try {
        const options = option.join(SPACE)
        const command = `powershell -ExecutionPolicy Bypass -File "${toWin32Sep(spec)}" ${options}`
        const stream = WShell.Exec(command)
        while (!stream.StdOut.AtEndOfStream) console.log(stream.StdOut.ReadLine())

        return Shell.Windows().Item().GetProperty('exports')
    } catch (e) {
        throw e
    } finally {
        deleteFileSync(spec)
    }
}
