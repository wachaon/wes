const argv = require('argv')
const { relative, posixSep, CurrentDirectory } = require('pathname')
const { writeTextFileSync } = require('filesystem')
const { REG_LINE_SEP, LF } = require('text')

const cd = CurrentDirectory
const dir = cd.split(posixSep).pop()

const host = 'wes'
if (dir === host) throw new Error(`Cannot bundle if the current directory is "${host}"`)

const { parse, stringify } = JSON
const bracket = '{'
function bundle(_modules) {
    const modules = parse(stringify(_modules))
    const mods = {}
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
console.log(writeTextFileSync(dir + json, stringify(mods, null, 4).replace(REG_LINE_SEP, LF), 'UTF-8N'))
