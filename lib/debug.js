const argv = require('argv')
const inspect = require('inspect')
const { brightRed, reverse, clear } = console

const isDebugOprion = argv.get('debug') != null

const debug = function debug(expression) {
    if (isDebugOprion) {
        console.log(`${brightRed + reverse}DEBUG${clear}: ${inspect(expression)}`)
    }
    return expression
}
debug.isDebugOption = isDebugOprion

module.exports = debug
