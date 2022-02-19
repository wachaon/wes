const { gray, silver, clear } = require('ansi')
const inspect = require('inspect')

const opt = { colors: true, indent: true }

const log = function log(code) {
    let res = inspect(code(), opt)
    console.log('%Slog(%S%S)%S // => %S%S', silver, inspect(code, opt), silver, gray, clear, res)
}

module.exports = log
