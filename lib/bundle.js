const isCLI = require('isCLI')
if (!isCLI(__filename) && !isCLI.__callFromTest) throw new Error('"bundle" can only be used on the command line')

const { unnamed } = require('argv')
const { resolve, relative, posixSep, WorkingDirectory } = require('pathname')
const { readTextFileSync, writeFileSync, existsFileSync } = require('filesystem')
const { rLINE_SEP, LF } = require('text')
const genGUID = require('genGUID')

const dir = WorkingDirectory.split(posixSep).pop()

const host = 'wes'
if (dir === host) throw new Error(`Cannot bundle if the current directory is "${host}"`)

const { parse, stringify } = JSON
const bracket = '{'

function bundle(_modules) {
    const mods = {}
    Object.keys(_modules)
        .filter((key) => key.startsWith(bracket))
        .forEach((key) => {
            const mod = {
                source: _modules[key].source,
                mapping: _modules[key].mapping
            }
            const path = _modules[key].path
            if (path.startsWith(bracket)) mod.path = _modules[key].path
            else mod.path = `{${dir}}${posixSep}${relative(WorkingDirectory, _modules[key].path)}`
            mods[key] = mod
        })
    const pkg_spec = resolve(WorkingDirectory, 'package.json')
    if (existsFileSync(pkg_spec)) {
        mods[genGUID()] = {
            source: readTextFileSync(pkg_spec),
            path: `{${dir}}/package.json`
        }
    }
    return mods
}

const dest = resolve(WorkingDirectory, unnamed[1])
require(dest)

const mods = bundle(wes.Modules)
const json = '.json'
console.log(writeFileSync(dir + json, stringify(mods, null, 4).replace(rLINE_SEP, LF), 'UTF-8N'))
