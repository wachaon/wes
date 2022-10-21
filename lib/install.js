const { get, unnamed } = require('argv')
const { NONE } = require('text')
const httprequest = require('httprequest')
const { resolve, dirname } = require('pathname')
const { writeFileSync, readFileSync, mkdirsSync, existsFileSync } = require('filesystem')
const { forEach } = require('utility')
const isCLI = require('isCLI')

if (isCLI(__filename)) {
    install(unnamed[1])
} else module.exports = bundle

// main
function install(pack) {
    const matched = match(pack)
    const Repository = getRepository(matched)
    const { author, repository } = matched

    const mods = JSON.parse(httprequest('GET', Repository))

    const Bare = get('bare') || get('b')
    const Global = get('global') || get('g')

    const Node = get('node')
    const Save = get('save') || get('S') ? 'dependencies' : get('save-dev') || get('D') ? 'devDependencies' : null

    const CurrentDir = Global ? dirname(WScript.ScriptFullName) : process.cwd()
    const ModulesDir = resolve(CurrentDir, Node ? 'node_modules' : 'wes_modules')
    const ModuleDir = Bare ? resolve(ModulesDir, repository) : resolve(ModulesDir, '@' + author, repository)

    const mapping = {}
    forEach(mods, (mod, id) => {
        mapping[id] = resolveModulePath(mod.path, repository, ModuleDir)
    })

    forEach(mapping, (spec, id) => {
        mkdirsSync(dirname(spec))
        console.log(writeFileSync(spec, mods[id].source))
    })

    const CurrentPackageSpec = resolve(CurrentDir, 'package.json')
    const ModulesPackageSpec = resolve(ModuleDir, 'package.json')
    if (Save != null && existsFileSync(CurrentPackageSpec) && existsFileSync(ModulesPackageSpec)) {
        const CURRENT_PKG = JSON.parse(readFileSync(CurrentPackageSpec, 'auto'))
        const MODULE_PKG = JSON.parse(readFileSync(ModulesPackageSpec, 'auto'))
        CURRENT_PKG[Save] = CURRENT_PKG[Save] || {}
        CURRENT_PKG[Save][repository] = MODULE_PKG.version

        console.log(writeFileSync(CurrentPackageSpec, JSON.stringify(CURRENT_PKG, null, 2), 'UTF-8'))
    }

    console.log('%O', '@' + author + '/' + repository + ' install complated!')
}

// util
function getRepository(matched) {
    const { author, repository, token } = matched
    return (
        'https://raw.githubusercontent.com/' +
        author +
        '/' +
        repository +
        '/master/bundle.json' +
        (token != null ? token : NONE)
    )
}

function match(param) {
    const [_, author, repository, token] = /@([^/]+)\/([^?]+)(\?.+)?$/.exec(param)
    return { author, repository, token }
}

function resolveModulePath(spec, repository, ModuleDir) {
    const res = spec.replace('{' + repository + '}', ModuleDir).replace(/(\.\.\/)+(node_modules|wes_modules)/, '$2')
    if (res.includes('/../'))
        throw new Error(
            'The current version cannot deploy packages that bundle files in a directory above the working directory.'
        )
    return res
}
