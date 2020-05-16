const inspect = require('inspect')
const { LF } = require('text')
const { gray, silver, clear } = console.ansi

const opt = { colors: true, indent: true }

const log = function log(code) {
    let res = inspect(code(), opt)
    console.log(
        silver + 'log(' + inspect(code, opt) + silver + ')' + gray + ' // => ' + clear + res + LF
    )
}

module.exports = log
