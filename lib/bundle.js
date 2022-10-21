const isCLI = require('isCLI')
const { resolve, relative, join, basename } = require('pathname')
const { writeFileSync } = require('filesystem')
const { stringify } = JSON

const PackageSpec = resolve(process.cwd(), 'package.json')
const BundleSpec = resolve(process.cwd(), 'bundle.json')
const TRANSPILED = 'transpiled'
const MAIN = 'main'
const BRACKET_START = '{'
const BRACKET_END = '}'
const PIPE = '|'

let Package
try {
    Package = require(PackageSpec)
} catch (e) {
    throw new Error('package.json is required for bundles')
}

try {
    require(resolve(process.cwd(), Package[MAIN] || PIPE))
} catch (e) {
    throw new Error('package.json must have a main field')
}

if (isCLI(__filename)) {
    bundle()
} else module.exports = bundle

// main
function bundle() {
    const modules = wes.Modules
    const mods = {}
    Object.keys(modules).forEach((id) => {
        if (!id.startsWith(BRACKET_START)) return
        let { source, mapping, path } = modules[id]
        mods[id] = {
            source,
            mapping,
            path: join(BRACKET_START + basename(process.cwd()) + BRACKET_END, relative(process.cwd(), path))
        }
    })
    console.log(writeFileSync(BundleSpec, stringify(mods, null, 2), 'UTF-8'))
    console.log('%O', 'bundle complated!')
}
