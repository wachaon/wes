const { readdirsSync, readFileSync, writeFileSync } = require('filesystem')
const { resolve } = require('pathname')
const { format } = require('fmt')
const { brightBlue } = require('ansi')

const UTF8 = 'UTF-8N'

console.log('%OStart formatting', brightBlue)
function formatter(dir) {
    readdirsSync(resolve(process.cwd(), dir), UTF8)
        .filter((spec) => spec.type === 'file' && spec.path.endsWith('.js'))
        .forEach((spec) => {
            const { path } = spec
            console.log(writeFileSync(path, format(readFileSync(path, UTF8)), UTF8))
        })
}

formatter('lib')
formatter('src')
