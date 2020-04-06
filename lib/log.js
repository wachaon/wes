const dump = require('dump')
const { LF } = require('text')
const { green, clear } = console.ansi

const log = function log(code) {
    let res = dump(code())
    console.log('log( ' + dump(code) + ' )' + green + ' // => ' + clear + res + LF)
}

module.exports = log
