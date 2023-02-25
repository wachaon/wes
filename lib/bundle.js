const isCLI = require('isCLI')
const { resolve, relative, join, basename } = require('pathname')
const { writeFileSync, existsFileSync, readFileSync } = require('filesystem')
const pipe = require('pipe')
const { filter, map } = require('utility')
const genGUID = require('genGUID')
const { unnamed } = require('argv')
const { stringify } = JSON

const PackageSpec = resolve(process.cwd(), 'package.json')
const BundleSpec = resolve(process.cwd(), 'bundle.json')
const MAIN = 'main'
const BRACKET_START = '{'
const BRACKET_END = '}'

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
    const files = unnamed.slice(1)
    bundle(...files)
} else module.exports = bundle

// main
function bundle(...addFiles) {
    const LICENSE = resolve(process.cwd(), 'LICENSE')
    if (existsFileSync(LICENSE)) addFiles.push(LICENSE)
    const cwd = BRACKET_START + basename(process.cwd()) + BRACKET_END
    const mods = pipe()
        .use(filter((value, key) => key.startsWith(BRACKET_START)))
        .use(
            map((value, key) => {
                const { source, mapping, path } = value
                return {
                    source,
                    mapping,
                    path: join(cwd, relative(process.cwd(), path))
                }
            })
        )
        .use((data) => {
            if (addFiles.length > 0) {
                addFiles.forEach((spec) => {
                    const file = resolve(process.cwd(), spec)
                    const source = readFileSync(file, 'auto')
                    const path = join(cwd, relative(process.cwd(), file))
                    data[genGUID()] = {
                        source,
                        mapping: {},
                        path
                    }
                })
            }
            return data
        })
        .process(wes.Modules, (err, res) => {
            return res
        })
    console.log(writeFileSync(BundleSpec, stringify(mods, null, 2), 'UTF-8'))
    console.log('%O', 'bundle complated!')
}
