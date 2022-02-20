const { blueBright } = require('ansi')
const { readdirsSync, readFileSync, writeFileSync } = require('filesystem')
const { format } = require('fmt')
const { resolve } = require('pathname')

const UTF8 = 'UTF-8N'

console.log('%SStart formatting', blueBright)
function formatter(dir) {
    readdirsSync(resolve(process.cwd(), dir), UTF8)
        .filter((spec) => spec.type === 'file' && spec.path.endsWith('.js'))
        .filter((spec) => !spec.path.endsWith('babel-standalone.js'))
        .forEach((spec) => {
            const { path } = spec
            console.log('%O', writeFileSync(path, format(readFileSync(path, UTF8)), UTF8))
        })
}

formatter('lib')
formatter('src')
