const { deletedirSync, existsFileSync, existsdirSync } = require('filesystem')
const { resolve } = require('pathname')
const isCLI = require('isCLI')
const { get, unnamed } = require('argv')
const { filter } = require('utility')
const { isString } = require('typecheck')

if (isCLI(__filename)) {
    const spells = unnamed.slice(1)
    const save = get('save') || get('S') ? 'dependencies' : get('save-dev') || get('D') ? 'devDependencies' : false
    const node = get('node')
    chainspell({ save, node }, ...spells)
} else module.exports = chainspell

function chainspell(options, ...spells) {
    if (isString(options)) {
        spells.unshift(options)
        options = {}
    }
    spells.forEach((spell) => uninstall(spell, options))
}

// main
function uninstall(spec, options) {
    const { node, save } = options
    const mods = node ? 'node_modules' : 'wes_modules'

    if (save != null) {
        const pkg_json = resolve(process.cwd(), 'package.json')
        const pkg = existsFileSync(pkg_json) ? require(pkg_json) : null
        if (pkg) {
            pkg[save] = filter(pkg[save], (value, key) => {
                return key !== spec
            })
        }
    }

    const exp = /^((@[^\/]+)\/)?([^\/]+)$/
    const target = exp.exec(spec)
    if (target == null) throw new Error('Argument must be `@auther/repository` or `repository`')

    const [, , auther, repository] = target
    const auther_spec = resolve(process.cwd(), mods, auther, repository)
    const repository_spec = resolve(process.cwd(), mods, repository)

    let mod_auther = existsdirSync(auther_spec)
    let mod_repository = existsdirSync(repository_spec)

    console.log(() => [auther_spec, mod_auther])
    console.log(() => [repository_spec, mod_repository])

    if (!mod_auther && !mod_repository) return console.log(`Module ${spec} does not exist`)
    if (auther != null && mod_auther) return console.log(deletedirSync(auther_spec))
    return console.log(deletedirSync(repository_spec))
}
