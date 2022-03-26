const isCLI = require('isCLI')
if (!isCLI(__filename)) throw new Error('"install" can only be used on the command line')

const { security, has, unnamed } = require('argv')
const ansi = require('ansi')

if (has('bare') || has('b') || has('global') || has('g')) {
    if (!argv.allow(security.unsafe))
        throw new Error(
            'If you specify "--bare" or "--global", the security setting requires "--unsafe" or "--dangerous".'
        )
}

const { dirname, join, posixSep, WorkingDirectory, resolve } = require('pathname')
const {
    readTextFileSync,
    writeFileSync,
    mergeFileSync,
    deleteFileSync,
    copyFileSync,
    existsdirSync,
    mkdirSync,
    download,
    existsFileSync
} = require('filesystem')
const genGUID = require('genGUID')

const global_install = argv.allow(security.unsafe) && (has('global') || has('g'))
const bare_install = argv.allow(security.unsafe) && (has('bare') || has('b'))
const save = has('save') || has('S') ? 'save' : has('save-dev') || has('D') ? 'save-dev' : null

const cd = process.cwd()
const gd = dirname(WScript.ScriptFullName)
const ext_js = '.js'
const index_js = 'index' + ext_js
const ext_json = '.json'
const atmark = '@'
const modules = has('node') || has('n') ? 'node_modules' : 'wes_modules'
const packagejson = 'package'
const modules_dir = global_install ? join(gd, modules) : join(cd, modules)
const VERSION = 'version'

function splitArg(arg) {
    const exp = /^@(.+)\/([^?]+)(\?token=.+)?$/
    if (exp.test(arg)) return exp.exec(arg).slice(1)
    throw new Error('@author/repository')
}

function genSpec(arg) {
    const [author, repository, token] = splitArg(arg)
    const script_raw = `https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json${
        token != null ? token : ''
    }`
    const module_dir = bare_install ? modules_dir : join(modules_dir, atmark + author)
    const repository_spec = join(module_dir, repository)
    const script_spec = join(repository_spec, index_js)
    const json_spec = join(repository_spec, repository + ext_json)

    const result = {
        author,
        repository,
        script_raw,
        module_dir,
        repository_spec,
        script_spec,
        json_spec
    }
    return result
}

function genScript(author, repository, script) {
    const exp = new RegExp(`^\\{${repository}\\}`)
    Object.keys(script).map((key) => {
        script[key].path = script[key].path.replace(exp, `{${atmark + author + posixSep + repository}}`)
    })

    const parent = getMainScript(script)

    const parts = []
    parts.push(`// source: https://github.com/${author}/${repository}
const mods = `)
    parts.push(JSON.stringify(script, null, 4))
    parts.push(`\nconst isCLI = require('isCLI')\nif (isCLI(__filename)) wes.main = '${parent}'
Object.keys(mods).forEach(key => wes.Modules[key] = mods[key])
module.exports = require( '${parent}' )
`)

    const specs = [join(process.cwd(), genGUID()), join(process.cwd(), genGUID()), join(process.cwd(), genGUID())]
    const result_spec = join(process.cwd(), genGUID())
    writeFileSync(result_spec, '', 'UTF-8N')

    specs.forEach((spec, i) => {
        writeFileSync(spec, parts[i], 'UTF-8N')
    })

    mergeFileSync(specs, result_spec)

    specs.forEach((spec) => deleteFileSync(spec))

    return result_spec
}

function getMainScript(script) {
    return Object.keys(script)[0]
}

function install(arg) {
    const { author, repository, script_raw, module_dir, repository_spec, script_spec, json_spec } = genSpec(arg)

    if (!existsdirSync(modules_dir)) mkdirSync(modules_dir)
    if (!existsdirSync(module_dir)) mkdirSync(module_dir)
    if (!existsdirSync(repository_spec)) mkdirSync(repository_spec)
    if (existsdirSync(json_spec)) deleteFileSync(json_spec)
    download(script_raw, json_spec)

    const script = JSON.parse(readTextFileSync(json_spec))
    let version = null
    Object.keys(script)
        .filter((e) => /^[^\}]+\}\/package\.json$/.test(script[e].path))
        .map((e) => {
            let pkg = JSON.parse(script[e].source)
            if (pkg != null && VERSION in pkg) version = pkg.version
            return e
        })
        .forEach((e) => writeFileSync(join(repository_spec, packagejson + ext_json), script[e].source, 'UTF-8N'))

    if (save) {
        const pkg_name = bare_install ? repository : atmark + author + '/' + repository
        const cd_pkg_spec = resolve(WorkingDirectory, packagejson + ext_json)
        let cd_pkg = null
        if (!existsFileSync(cd_pkg_spec)) cd_pkg = {}
        else cd_pkg = JSON.parse(readTextFileSync(cd_pkg_spec))
        if (save === 'save') {
            if ('dependencies' in cd_pkg) cd_pkg.dependencies[pkg_name] = version
            else cd_pkg = { dependencies: { [pkg_name]: version } }
        } else {
            if ('devDependencies' in cd_pkg) cd_pkg.devDependencies[pkg_name] = version
            else cd_pkg = { devDependencies: { [pkg_name]: version } }
        }
        console.log(writeFileSync(cd_pkg_spec, JSON.stringify(cd_pkg, null, 2), 'UTF-8N'))
    }

    const result_spec = genScript(author, repository, script)

    copyFileSync(result_spec, script_spec, true)
    deleteFileSync(result_spec)
    deleteFileSync(json_spec)
    console.log('%sInstalled %s %s', ansi.cyan, arg, version == null ? '' : 'version ' + version)
}

unnamed.slice(1).forEach((mod) => install(mod))
