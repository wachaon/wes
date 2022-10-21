const isCLI = require('isCLI')
const { __callFromTest, exclusion } = isCLI
if (!exclusion) {
    if (!isCLI(__filename) && !__callFromTest()) throw new Error('"bundle" can only be used on the command line')
}

const { unnamed } = require('argv')
const { resolve, relative, posixSep, WorkingDirectory } = require('pathname')
const { readTextFileSync, writeFileSync, existsFileSync } = require('filesystem')
const { rLINE_SEP, LF } = require('text')
const genGUID = require('genGUID')

const dir = WorkingDirectory.split(posixSep).pop()

const host = 'wes'
if (isCLI(__filename) && dir === host) throw new Error(`Cannot bundle if the current directory is "${host}"`)

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

if (isCLI(__filename)) {
    let dest = resolve(WorkingDirectory, unnamed[1])
    const pkg_spec = resolve(WorkingDirectory, 'package.json')
    if (existsFileSync(pkg_spec)) {
        const pkg = JSON.parse(readFileSync(pkg_spec, 'auto'))
        if ('main' in pkg) dest = pkg.main
    }

    require(dest)

    const mods = bundle(wes.Modules)
    const bundle_json = 'bundle.json'
    console.log(writeFileSync(bundle_json, stringify(mods, null, 4).replace(rLINE_SEP, LF), 'UTF-8N'))
} else module.exports = bundle
