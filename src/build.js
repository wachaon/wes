const FSO = require('Scripting.FileSystemObject')
const fs = require('filesystem')
const path = require('pathname')
const { rLINE_SEP, rCRLF, rCR, CRLF, SPACE, NONE, LF } = require('text')
const { Enumerator } = require('JScript')

let files = new Enumerator(FSO.GetFolder('lib').Files)

let result = {}

files.forEach((file) => {
    let filename = path.basename(file.name, '.js')
    let ext = path.extname(file.name)
    if (ext !== '.js') return
    let source = fs.readTextFileSync(file.Path).replace(rCR, NONE)
    result[filename] = { source, mapping: {}, path: `{wes}/${filename}` }
})

result['version'] = {
    source: `module.exports = console.log('${require('/package').version}')`,
    mapping: {},
    path: `{wes}/version`
}

let graph = JSON.stringify(result, null, 4)
    .split(rLINE_SEP)
    .map((v) => SPACE.repeat(8) + v)
    .join(CRLF)

const log = require('log')

let template = fs.readTextFileSync('src/template.js')
let sep = rCRLF.test(template) ? CRLF : LF
let line = template.split(sep)
const match = /^\s+var Modules = \{\}$/

let res = line
    .map((value) => {
        if (!match.test(value)) {
            return value
        } else {
            return '        var Modules = ' + graph.trim()
        }
    })
    .join(sep)

log(() => fs.writeTextFileSync('wes.js', res))

module.exports = graph
