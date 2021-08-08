const CLI = wes.Modules[wes.main].path === __filename
if (!CLI) throw new Error('"install" can only be used on the command line')

const argv = require('argv')
const { security } = argv
const ansi = require('ansi')

if (argv.has('bare') || argv.has('b') || argv.has('global') || argv.has('g')) {
    if (!argv.allow(security.unsafe))
        throw new Error(
            'If you specify "--bare" or "--global", the security setting requires "--unsafe" or "--dangerous".'
        )
}

const { dirname, join, toPosixSep, posixSep } = require('pathname')
const fs = require('filesystem')
const genGUID = require('genGUID')

const global_install = argv.allow(security.unsafe) && (argv.has('global') || argv.has('g'))
const bare_install = argv.allow(security.unsafe) && (argv.has('bare') || argv.has('b'))

const cd = process.cwd()
const gd = dirname(WScript.ScriptFullName)
const ext_js = '.js'
const index_js = 'index' + ext_js
const ext_json = '.json'
const atmark = '@'
const modules = 'node_modules'
const packagejson = 'package'
const modules_dir = global_install ? join(gd, modules) : join(cd, modules)

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
    const package_spec = token != null ? null : join(repository_spec, packagejson + ext_json)
    const package_raw = `https://raw.githubusercontent.com/${author}/${repository}/master/package.json`

    return {
        author,
        repository,
        script_raw,
        module_dir,
        repository_spec,
        script_spec,
        json_spec,
        package_spec,
        package_raw
    }
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
    parts.push(`\nif ( wes.Modules[wes.main].path === __filename ) wes.main = '${parent}'
Object.keys(mods).forEach(key => wes.Modules[key] = mods[key])
module.exports = require( '${parent}' )
`)

    const specs = [join(process.cwd(), genGUID()), join(process.cwd(), genGUID()), join(process.cwd(), genGUID())]
    const result_spec = join(process.cwd(), genGUID())
    fs.writeFileSync(result_spec, '', 'UTF-8N')

    specs.forEach((spec, i) => {
        fs.writeFileSync(spec, parts[i], 'UTF-8N')
    })

    fs.mergeFileSync(specs, result_spec)

    specs.forEach((spec) => fs.deleteFileSync(spec))

    return result_spec
}

function getMainScript(script) {
    return Object.keys(script)[0]
}

function install(arg) {
    const {
        author,
        repository,
        script_raw,
        module_dir,
        repository_spec,
        script_spec,
        json_spec,
        package_spec,
        package_raw
    } = genSpec(arg)

    if (!fs.existsdirSync(modules_dir)) fs.mkdirSync(modules_dir)
    if (!fs.existsdirSync(module_dir)) fs.mkdirSync(module_dir)
    if (!fs.existsdirSync(repository_spec)) fs.mkdirSync(repository_spec)
    if (fs.existsdirSync(json_spec)) fs.deleteFileSync(json_spec)
    fs.download(script_raw, json_spec)

    const script = JSON.parse(fs.readTextFileSync(json_spec), null, 4)
    Object.keys(script)
        .filter((e) => /^[^\}]+\}\/package\.json$/.test(script[e].path))
        .forEach((e) => fs.writeFileSync(join(repository_spec, 'package.json'), script[e].source, 'UTF-8N'))
    const result_spec = genScript(author, repository, script)

    fs.copyFileSync(result_spec, script_spec, true)
    fs.deleteFileSync(result_spec)
    fs.deleteFileSync(json_spec)
    console.log('%sInstalled %s', ansi.cyan, arg)
}

argv.unnamed.slice(1).forEach((mod) => install(mod))
