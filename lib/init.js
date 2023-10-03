const { basename, resolve, dirname } = require('pathname')
const { existsFileSync, readFileSync, writeFileSync } = require('filesystem')
const { NONE } = require('text')
const { dialog } = require('utility')

const pkg = resolve(process.cwd(), 'package.json')

if (existsFileSync(pkg)) return console.warn('package.json already exists')

const result = dialog([
    { key: 'name', question: 'package name:', initial: basename(getGitRepository() || process.cwd()) },
    { key: 'version', question: 'version:', initial: '0.0.1' },
    { key: 'description', question: 'description:' },
    { key: 'main', question: 'entry point:', initial: 'index.js' },
    { key: 'repository', question: 'git repository:', initial: getGitRepository() },
    { key: 'keywords', question: 'keywords:', array: true },
    { key: 'author', question: 'author:', initial: basename(dirname(getGitRepository())) },
    { key: 'license', question: 'license:', initial: 'MIT' }
])

const json = JSON.stringify(result, null, 4)
console.log(json)

const save = dialog([{ key: 'flag', question: 'Is this OK?', initial: 'yes' }])

if (save.flag.toLowerCase() === 'yes') console.log(() => writeFileSync(pkg, json))

// util
function getGitRepository() {
    const config_spec = resolve(process.cwd(), '.git', 'config')

    if (existsFileSync(config_spec)) {
        const config = readFileSync(config_spec, 'auto')
        const exp = /\[remote "origin"\]\n\s+url = (https:.+\.git)/
        if (exp.test(config)) return exp.exec(config)[1]
    }
    return NONE
}
