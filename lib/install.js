const { get, unnamed } = require('argv')
const { NONE } = require('text')
const httprequest = require('httprequest')
const { resolve, dirname } = require('pathname')
const { writeFileSync, readFileSync, mkdirsSync, existsFileSync } = require('filesystem')
const { map } = require('utility')
const pipe = require('pipe')
const isCLI = require('isCLI')

if (isCLI(__filename)) {
    const spells = unnamed.slice(1)
    chainspell(...spells)
} else module.exports = chainspell

function chainspell(...spells) {
    spells.forEach((spell) => install(spell))
}
// main
function install(pack) {
    const matched = match(pack)
    const Repository = getRepository(matched)
    const REPOSITORY = 'repository'
    const { author, repository } = matched
    if (repository === 'wes') throw new Error('Packages with that name cannot be installed. // => %O', repository)

    const mods = JSON.parse(httprequest('GET', Repository).responseText)

    const Bare = get('bare') || get('b')
    const Global = get('global') || get('g')

    const Node = get('node')
    const Save = get('save') || get('S') ? 'dependencies' : get('save-dev') || get('D') ? 'devDependencies' : null

    const CurrentDir = Global ? dirname(WScript.ScriptFullName) : process.cwd()
    const ModulesDir = resolve(CurrentDir, Node ? 'node_modules' : 'wes_modules')
    const ModuleDir = Bare ? resolve(ModulesDir, repository) : resolve(ModulesDir, '@' + author, repository)

    pipe()
        .use(map((mod, id) => resolveModulePath(mod.path, repository, ModuleDir)))
        .use(
            map((spec, id) => {
                mkdirsSync(dirname(spec))
                console.log(writeFileSync(spec, mods[id].source))
            })
        )
        .process(mods)

    const CurrentPackageSpec = resolve(CurrentDir, 'package.json')
    const CurrentPackageJson = JSON.parse(readFileSync(CurrentPackageSpec, 'auto'))
    const ModulesPackageSpec = resolve(ModuleDir, 'package.json')
    const ModulePackageJson = JSON.parse(readFileSync(ModulesPackageSpec, 'auto'))
    if (ModulePackageJson[REPOSITORY] == null) {
        ModulePackageJson[REPOSITORY] = {
            type: 'git',
            url: `git+https://github.com/${matched.author}/${matched.repository}.git`
        }
        writeFileSync(ModulesPackageSpec, JSON.stringify(ModulePackageJson, null, 4), 'UTF-8')
    }

    if (Save != null && existsFileSync(CurrentPackageSpec) && existsFileSync(ModulesPackageSpec)) {
        CurrentPackageJson.wes = CurrentPackageJson.wes || {}
        CurrentPackageJson.wes[Save] = CurrentPackageJson.wes[Save] || {}
        CurrentPackageJson.wes[Save][repository] = ModulePackageJson.version

        console.log(writeFileSync(CurrentPackageSpec, JSON.stringify(CurrentPackageJson, null, 2), 'UTF-8'))
    }

    console.log('%O', '@' + author + '/' + repository + ' version ' + ModulePackageJson.version + ' install complated!')
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
