const CLI = wes.Modules[wes.main].path === __filename
if (!CLI) throw new Error('"bundle" can only be used on the command line')

const argv = require('argv')
const { relative, posixSep, CurrentDirectory } = require('pathname')
const { readTextFileSync, writeFileSync } = require('filesystem')
const { rLINE_SEP, LF } = require('text')
const genGUID = require('genGUID')

const cd = CurrentDirectory
const dir = cd.split(posixSep).pop()

const host = 'wes'
if (dir === host) throw new Error(`Cannot bundle if the current directory is "${host}"`)

const { parse, stringify } = JSON
const bracket = '{'
function bundle(_modules) {
    const modules = parse(stringify(_modules))
    const mods = {}
    const pakage_json_spec = join(cd, 'package.json')
    if (
        fs.fileExsist(pakage_json_spec) &&
        Object.keys(wes.Modules).every((e) => !/^[^\}]+\}package\.json$/.test(wes.Modules[e].path))
    ) {
        mod[genGUID()] = {
            source: readTextFileSync(pakage_json_spec),
            path: `{${dir}}/package.json`
        }
    }
    Object.keys(modules)
        .filter((key) => key.startsWith(bracket))
        .map((key) => {
            const mod = modules[key]
            mod.path = `{${dir}}${posixSep}${relative(cd, mod.path)}`
            delete mod.module
            delete mod.exports
            return key
        })
        .forEach((key) => (mods[key] = modules[key]))
    return mods
}

require(argv.unnamed[1])

const mods = bundle(wes.Modules)
const json = '.json'
console.log(writeFileSync(dir + json, stringify(mods, null, 4).replace(rLINE_SEP, LF), 'UTF-8N'))
