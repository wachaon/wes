const { blueBright } = require('ansi')
const { readdirsSync, readFileSync, writeFileSync } = require('filesystem')
const { format } = require('fmt')
const { resolve } = require('pathname')

const UTF8 = 'UTF-8N'

console.log('%SStart formatting script', blueBright)
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

console.log('\n%SStart formatting document', blueBright)
readdirsSync(resolve(process.cwd(), 'docs'), (file, dir) => {
    console.log('%O', writeFileSync(file, readTextFileSync(file).replace(/(\r?\n){3,}/g, '\n\n'), UTF8))
})

const doc = resolve(process.cwd(), 'README.md')
console.log('%O', writeFileSync(doc, readTextFileSync(doc).replace(/(\r?\n){3,}/g, '\n\n'), UTF8))
