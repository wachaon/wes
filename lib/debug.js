const argv = require('argv')
const inspect = require('inspect')
const { brightRed, reverse, clear } = require('ansi')

const isDebugOprion = argv.has('debug')

const debug = function debug_debug(expression) {
    if (isDebugOprion) {
        console.log(`${brightRed + reverse}DEBUG${clear}: ${inspect(expression)}`)
    }
    return expression
}
debug.isDebugOption = isDebugOprion

module.exports = debug
