const { readdirSync, readTextFileSync, writeTextFileSync } = require('filesystem')
const { resolve } = require('pathname')
const fmt = require('fmt')

const successColor = console.ansi.brightGreen

const lib = readdirSync(resolve(process.cwd(), 'lib')).map((file) => resolve(process.cwd(), 'lib', file))
const src = readdirSync(resolve(process.cwd(), 'src')).map((file) => resolve(process.cwd(), 'src', file))
const dir = [...lib, ...src, resolve(process.cwd(), 'wes.js')]

dir.forEach((file) => {
    const source = readTextFileSync(file)
    const res = fmt.format(source)
    console.log(successColor + writeTextFileSync(file, res))
})
