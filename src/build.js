const start = new Date()

const FSO = require('Scripting.FileSystemObject')
const { format } = require('fmt')
const { Enumerator } = require('JScript')
const { rLINE_SEP, rCRLF, rCR, CRLF, SPACE, NONE, LF } = require('text')
const fs = require('filesystem')
const path = require('pathname')
const DOLLAR = '$'
var COMMONJS = 'commonjs'

require('./format')
const test = require('./test')
if (!test) throw new Error('Must pass all tests')

let files = new Enumerator(FSO.GetFolder('lib').Files)

let result = {}

files.forEach((file) => {
    const name = file.name
    let filename = path.basename(name, '.js')
    let ext = path.extname(name)
    if (ext !== '.js') return

    let source = fs.readFileSync(file.Path, 'UTF-8N').replace(rCR, NONE)

    result[filename] = { source, mapping: {}, path: `{wes}/${filename}`, type: COMMONJS }
})

result['version'] = {
    source: `const isCLI = require('isCLI')
const httprequest = require('httprequest')
const version = "${require('/package.json').version}"
if (isCLI(__filename)) {
    console.log('current version %S', version)
    try {
        const latest = JSON.parse(httprequest('GET', 'https://raw.githubusercontent.com/wachaon/wes/master/package.json').responseText).version
        console.log(' latest version %S', latest)
    } catch (e) {}
} else module.exports = version`,
    mapping: {},
    path: `{wes}/version`
}

let graph = JSON.stringify(result, null, 4)
    .split(rLINE_SEP)
    .map((v) => SPACE.repeat(8) + v)
    .join(CRLF)

let template = fs.readTextFileSync('src/template.js')
let sep = rCRLF.test(template) ? CRLF : LF
let line = template.split(sep)

const rModule = /\/\* insert Modules \*\//

const Console = fs.readTextFileSync('lib/console.js')
const rConsole = /\/\* insert console \*\//

const Ansi = fs.readTextFileSync('lib/ansi.js')
const rAnsi = /\/\* insert ansi \*\//

const Argv = fs.readTextFileSync('lib/argv.js')
const rArgv = /\/\* insert argv \*\//

const Utility = fs.readTextFileSync('lib/utility.js')
const rUtility = /\/\* insert utility \*\//

let res = format(
    line
        .map((value) => {
            if (rModule.test(value)) return 'var Modules = ' + graph.trim()
            if (rConsole.test(value))
                return (
                    'var console = (function () {\n    var module = { exports: {} };\n        (function () {' +
                    Console +
                    '        })()\n    return module.exports\n})()'
                )
            else if (rAnsi.test(value))
                return (
                    'var ansi = (function () {\n    var module = { exports: {} };\n        (function () {' +
                    Ansi +
                    '        })()\n    return module.exports\n})()'
                )
            else if (rArgv.test(value))
                return (
                    'var argv = (function () {\n    var module = { exports: {} };\n        (function () {' +
                    Argv +
                    '        })()\n    return module.exports\n})()'
                )
            else if (rUtility.test(value))
                return (
                    'var utility = (function () {\n    var module = { exports: {} };\n        (function () {' +
                    Utility +
                    '        })()\n    return module.exports\n})()'
                )
            else return value
        })
        .join(sep)
)

console.log(fs.writeTextFileSync('wes.js', res))
console.log('build time %O', new Date().getTime() - start.getTime())

module.exports = graph

function escapeName(name) {
    return name
        .split(NONE)
        .map(function escapeName_map(ch) {
            return /\w/.test(ch) ? ch : DOLLAR + ch.codePointAt(0).toString(16)
        })
        .join(NONE)
}
