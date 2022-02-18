const { has } = require('argv')
const inspect = require('inspect')
const { redBright, reverse, clear } = require('ansi')

const isDebugOprion = has('debug')

const debug = function debug_debug(expression) {
    if (isDebugOprion) {
        console.log(`${redBright + reverse}DEBUG${clear}: ${inspect(expression)}`)
    }
    return expression
}
debug.isDebugOption = isDebugOprion

module.exports = debug
