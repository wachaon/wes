const isCLI = require('isCLI')
const { __callFromTest, exclusion } = isCLI
if (!exclusion) {
    if (!isCLI(__filename) && !__callFromTest()) throw new Error('"install" can only be used on the command line')
}

const { NONE } = require('text')
const { get, has, unnamed } = require('argv')
const ansi = require('ansi')

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

const global_install = has('global') || has('g')
const bare_install = has('bare') || has('b')
const save = has('save') || has('S') ? 'dependencies' : has('save-dev') || has('D') ? 'devDependencies' : null
const internal = has('internal') || has('i')

const cd = process.cwd()
const gd = dirname(WScript.ScriptFullName)
const ext_js = '.js'
const index_js = 'index' + ext_js
const main_js = './index.js'
const ext_json = '.json'
const atmark = '@'
const modules = has('node') || has('n') ? 'node_modules' : 'wes_modules'
const packagejson = 'package.json'
const modules_dir = global_install ? join(gd, modules) : join(cd, modules)
const VERSION = 'version'
const MAIN = 'main'

function splitArg(arg) {
    const exp = /^@(.+)\/([^?]+)(\?token=.+)?$/
    if (exp.test(arg)) return exp.exec(arg).slice(1)
    throw new Error('@author/repository')
}

function genSpec(arg) {
    const [author, repository, token] = splitArg(arg)
    const script_raw = `https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json${
        token != null ? token : NONE
    }`
    const bundle_raw = `https://raw.githubusercontent.com/${author}/${repository}/master/bundle.json${
        token != null ? token : NONE
    }`
    const internal_raw = get('internal') || get('i')

    const module_dir = bare_install ? modules_dir : join(modules_dir, atmark + author)
    const repository_spec = join(module_dir, repository)
    const script_spec = join(repository_spec, index_js)
    const json_spec = join(repository_spec, repository + ext_json)

    const result = {
        author,
        repository,
        script_raw,
        bundle_raw,
        internal_raw,
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
    writeFileSync(result_spec, NONE, 'UTF-8N')

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
    let {
        author,
        repository,
        script_raw,
        bundle_raw,
        internal_raw,
        module_dir,
        repository_spec,
        script_spec,
        json_spec
    } = genSpec(arg)

    if (!existsdirSync(modules_dir)) mkdirSync(modules_dir)
    if (!existsdirSync(module_dir)) mkdirSync(module_dir)
    if (!existsdirSync(repository_spec)) mkdirSync(repository_spec)
    if (existsdirSync(json_spec)) deleteFileSync(json_spec)

    // script_raw is deprecated.

    if (internal) {
        writeFileSync(json_spec, JSON.stringify(require(internal_raw), null, 2), 'UTF-8N')
    } else {
        try {
            download(bundle_raw, json_spec)
        } catch (e) {
            try {
                download(script_raw, json_spec)
            } catch (ee) {
                throw ee
            }
        }
    }

    const script = JSON.parse(readTextFileSync(json_spec))
    let version = null
    Object.keys(script)
        .filter((e) => /^[^\}]+\}\/package\.json$/.test(script[e].path))
        .map((e) => {
            let pkg = JSON.parse(script[e].source)
            if (pkg != null && VERSION in pkg) version = pkg.version
            if (pkg != null && MAIN in pkg) pkg[MAIN] = main_js
            script[e].source = JSON.stringify(pkg, null, 2)
            return e
        })
        .forEach((e) => writeFileSync(join(repository_spec, packagejson), script[e].source, 'UTF-8N'))

    if (save) {
        const pkg_name = atmark + author + '/' + repository
        const cd_pkg_spec = resolve(WorkingDirectory, packagejson)
        let cd_pkg = null
        if (!existsFileSync(cd_pkg_spec)) cd_pkg = {}
        else cd_pkg = JSON.parse(readTextFileSync(cd_pkg_spec))

        let _parent = has('node') ? cd_pkg : 'wes' in cd_pkg ? cd_pkg.wes : ((cd_pkg.wes = {}), cd_pkg.wes)
        let _curr = save in _parent ? _parent[save] : ((_parent[save] = {}), _parent[save])
        _curr[pkg_name] = version

        console.log(writeFileSync(cd_pkg_spec, JSON.stringify(cd_pkg, null, 2), 'UTF-8N'))
    }

    const result_spec = genScript(author, repository, script)

    copyFileSync(result_spec, script_spec, true)
    deleteFileSync(result_spec)
    deleteFileSync(json_spec)
    console.log('%sInstalled %s %s', ansi.cyan, arg, version == null ? NONE : 'version ' + version)
}

unnamed.slice(1).forEach((mod) => install(mod))

module.exports = install
