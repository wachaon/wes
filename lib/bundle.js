const isCLI = require('isCLI')
const { resolve, relative, join, basename } = require('pathname')
const { writeFileSync, existsFileSync } = require('filesystem')
const pipe = require('pipe')
const { filter, map } = require('utility')
const { stringify } = JSON

const PackageSpec = resolve(process.cwd(), 'package.json')
const BundleSpec = resolve(process.cwd(), 'bundle.json')
const MAIN = 'main'
const BRACKET_START = '{'
const BRACKET_END = '}'
const PIPE = '|'

if (basename(process.cwd()) === 'wes') throw new Error('package name "wes" is not available')

let Package
try {
    Package = require(PackageSpec)
} catch (e) {
    throw new Error('package.json is required for bundles')
}

let main = resolve(process.cwd(), Package[MAIN])
if (!existsFileSync(main)) throw new Error('package.json must have a main field')

require(main)

if (isCLI(__filename)) {
    bundle()
} else module.exports = bundle

// main
function bundle() {
    const mods = pipe()
        .use(filter((value, key) => key.startsWith(BRACKET_START)))
        .use(
            map((value, key) => {
                return {
                    source: value.source,
                    mapping: value.mapping,
                    path: join(
                        BRACKET_START + basename(process.cwd()) + BRACKET_END,
                        relative(process.cwd(), value.path)
                    )
                }
            })
        )
        .process(wes.Modules, (err, res) => {
            return res
        })
    console.log(writeFileSync(BundleSpec, stringify(mods, null, 2), 'UTF-8'))
    console.log('%O', 'bundle complated!')
}
