var LF = '\n'
var NONE = ''
var SPACE = ' '
var _STRING = 'string'
var rSPECIFIER = /(%[scdfoj])/i
var rSEQ = /\u001B\[[\d;]+m/g
var rCR_LF = /\r?\n/
var clear = '\u001B[0m'
var redBright = '\u001B[91m'
var reverse = '\u001B[7m'
var EIL = '\u001B[0K'
var BOL = '\u001B[1G'

function cursorUp(row) {
    return '\u001B[' + row + 'A'
}

function format() {
    if (arguments.length == 0) return void 0
    var args = arguments.length === 1 ? Array.prototype.slice.call(arguments[0]) : Array.prototype.slice.call(arguments)
    if (args.length === 0) return
    var message = args.shift()
    if (args.length === 0) return message
    while (rSPECIFIER.test(message) && args.length > 0) {
        var val = args.shift()
        message = message.replace(rSPECIFIER, function inspect_replacer($1) {
            if ($1 === '%s' || $1 === '%S') return String(val)
            if ($1 === '%c' || $1 === '%C') return String(val)
            if ($1 === '%d' || $1 === '%D') return parseInt(val, 10)
            if ($1 === '%f' || $1 === '%F') return Number(val)
            if ($1 === '%o' || $1 === '%O')
                return req('inspect')(val, $1 === '%O' ? { indent: true, colors: true } : { indent: true })
            if ($1 === '%j' || $1 === '%J') {
                try {
                    return JSON.stringify(val, null, 4)
                } catch (error) {
                    return val
                }
            }
            return $1
        })
    }
    if (argv.length > 0) message += args.join(SPACE)
    return message
}

function log() {
    var message = format(arguments)
    var monotoneMessage = removeColor(message)
    if (argv.has('monotone')) WScript.StdOut.Write(monotoneMessage + LF)
    else WScript.StdErr.Write(EIL + message + clear + LF)
    return monotoneMessage
}

function print() {
    var message = format(arguments)
    var monotoneMessage = removeColor(message)
    if (argv.has('monotone')) WScript.StdOut.Write(monotoneMessage)
    else WScript.StdErr.Write(message + clear)
    return monotoneMessage
}

function debug() {
    var isDebugOption = argv.has('debug')
    if (!isDebugOption) return
    var message = format(arguments)
    var monotoneMessage = removeColor(message)
    if (argv.has('monotone')) WScript.StdOut.Write('DEBUG: ' + monotoneMessage + LF)
    else WScript.StdErr.Write(EIL + redBright + reverse + 'DEBUG:' + clear + message + clear + LF)
    return monotoneMessage
}

function removeColor(message) {
    if (typeof message === _STRING) return message.replace(rSEQ, NONE)
    return message
}

function error() {
    var message = format(arguments)
    var monotoneMessage = removeColor(message)
    if (argv.has('monotone')) WScript.StdOut.Write('ERROR: ' + monotoneMessage + LF)
    else WScript.StdErr.Write(clear + redBright + reverse + 'ERROR:' + clear + SPACE + message + clear + LF)
    return monotoneMessage
}

function replace() {
    var message = format(arguments)
    var column = message.split(rCR_LF)
    return console.log(cursorUp(column.length) + BOL + column.join(EIL + LF) + EIL)
}

module.exports = {
    log: log,
    print: print,
    debug: debug,
    format: format,
    error: error,
    replace: replace,
    removeColor: removeColor
}
