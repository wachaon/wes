const { readdirSync, readTextFileSync, writeTextFileSync } = require('filesystem')
const { resolve } = require('pathname')
const fmt = require('fmt')
const ansi = require('ansi')

const successColor = ansi.brightGreen

const libspec = resolve(process.cwd(), 'lib')
const srcspec = resolve(process.cwd(), 'src')

const lib = readdirSync(libspec).map((file) => resolve(libspec, file))
const src = readdirSync(srcspec).map((file) => resolve(srcspec, file))
const dir = [...lib, ...src, resolve(process.cwd(), 'wes.js')]

dir.forEach((file) => {
    const source = readTextFileSync(file)
    const res = fmt.format(source)
    console.log(successColor + writeTextFileSync(file, res))
})
