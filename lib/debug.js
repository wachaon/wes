const { has } = require('argv')
const { redBright, reverse, clear } = require('ansi')

const isDebugOprion = has('debug')

const debug = function debug_debug(expression) {
    if (isDebugOprion) {
        console.log('%S%SDEBUG%S: %O', redBright, reverse, clear, expression)
    }
    return expression
}
debug.isDebugOption = isDebugOprion

module.exports = debug
