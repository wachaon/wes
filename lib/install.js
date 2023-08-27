const { get, unnamed } = require('argv')
const { NONE, rLINE_SEP, CRLF } = require('text')
const httprequest = require('httprequest')
const { resolve, dirname } = require('pathname')
const { writeFileSync, readFileSync, mkdirsSync, existsFileSync } = require('filesystem')
const { map } = require('utility')
const pipe = require('pipe')
const isCLI = require('isCLI')

if (isCLI(__filename)) {
    const bare = get('bare') || get('b')
    const _global = get('global') || get('g')
    const node = get('node') || get('n')
    const save = get('save') || get('S') ? 'dependencies' : get('save-dev') || get('D') ? 'devDependencies' : null
    const packs = unnamed.slice(1).map((name) => {
        return { name, bare, global: _global, node, save }
    })
    chain(...packs)
} else module.exports = chain

function chain(...packs) {
    packs.forEach((pack) => install(pack))
}

// main
function install(pack) {
    const { name, bare, global: _global, node, save } = pack
    const matched = match(name)
    const Repository = getRepository(matched)
    const REPOSITORY = 'repository'
    const { author, repository } = matched
    if (repository === 'wes') throw new Error('Packages with that name cannot be installed. // => %O', repository)

    const mods = JSON.parse(httprequest('GET', Repository).responseText)

    const CurrentDir = _global ? dirname(WScript.ScriptFullName) : process.cwd()
    const ModulesDir = resolve(CurrentDir, node ? 'node_modules' : 'wes_modules')
    const ModuleDir = bare ? resolve(ModulesDir, repository) : resolve(ModulesDir, '@' + author, repository)

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

    if (existsFileSync(CurrentPackageSpec)) {
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

        if (save != null && existsFileSync(CurrentPackageSpec) && existsFileSync(ModulesPackageSpec)) {
            if (node) {
                CurrentPackageJson[save] = CurrentPackageJson[save] || {}
                if (bare) CurrentPackageJson[save][repository] = ModulePackageJson.version
                else CurrentPackageJson[save][`@${author}/${repository}`] = ModulePackageJson.version
            } else {
                CurrentPackageJson.wes = CurrentPackageJson.wes || {}
                CurrentPackageJson.wes[save] = CurrentPackageJson.wes[save] || {}
                CurrentPackageJson.wes[save][`@${author}/${repository}`] = ModulePackageJson.version
            }
            console.log(writeFileSync(CurrentPackageSpec, JSON.stringify(CurrentPackageJson, null, 2), 'UTF-8'))
        }
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
