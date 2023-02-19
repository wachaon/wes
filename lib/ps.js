const genGUID = require('genGUID')
const { writeFileSync, deleteFileSync, readFileSync } = require('filesystem')
const { resolve, toWin32Sep } = require('pathname')
const isCLI = require('isCLI')
const { get, unnamed } = require('argv')
const { SPACE } = require('text')
const { execCommand } = require('utility')

if (isCLI(__filename)) {
    let source = get('Command') || get('c') || readFileSync(resolve(process.cwd(), unnamed.shift()), 'auto')
    ps(source, unnamed.slice(1))
} else module.exports = ps

function ps(code, option = []) {
    const spec = resolve(process.cwd(), genGUID() + '.ps1')
    writeFileSync(spec, code, 'UTF-8BOM')

    try {
        const options = option.join(SPACE)
        const command = `powershell -ExecutionPolicy Bypass -File "${toWin32Sep(spec)}" ${options}`
        return execCommand(command)
    } catch (e) {
        throw e
    } finally {
        deleteFileSync(spec)
    }
}
