var LF = '\n'
var NONE = ''
var SPACE = ' '
var _STRING = 'string'
var rSPECIFIER = /(%[scdfoj])/i
var rSEQ = /\u001B\[[\d;]+m/g
var rCR_LF = /\r?\n/
var clear = '\u001B[0m'
var gray = '\u001B[90m'
var blueBright = '\u001B[94m'
var redBright = '\u001B[91m'
var yellow = '\u001B[33m'
var reverse = '\u001B[7m'
var rLINE_SEP = /\r?\n/
var CursorHorizontalAbsolute = '\u001B[G'

var EndOfLine = 0
var BeginningOfLine = 1
var ClearEntireLine = 2
var colord = { indent: true, colors: true }
var indented = { indent: true }

var columns = 0

function EraseInLine(arg) {
    return '\u001B[' + (arg || EndOfLine) + 'K'
}

function CursorUp(row) {
    if (row == null || row === 0) return ''
    return '\u001B[' + row + 'A'
}

function Write(message) {
    var monotoneMessage = removeColor(message)

    if (argv.get('monotone')) {
        WScript.StdOut.Write(monotoneMessage)
    } else {
        var column = message.split(rLINE_SEP)
        if (columns > column.length) {
            column = column.concat(new Array(columns - column.length).fill(NONE))
        }
        WScript.StdErr.Write(
            CursorUp(columns) +
                CursorHorizontalAbsolute +
                column.join(EraseInLine(EndOfLine) + LF) +
                EraseInLine(EndOfLine) +
                clear
        )
    }
    columns = 0

    return monotoneMessage
}

function WriteLine(message) {
    return Write(message + LF)
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
            if ($1 === '%d' || $1 === '%D') return parseInt(+val, 10)
            if ($1 === '%f' || $1 === '%F') return +val
            if ($1 === '%o' || $1 === '%O') return req('inspect')(val, $1 === '%O' ? colord : indented)
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
    if (
        arguments.length === 1 &&
        typeof arguments[0] === 'function' &&
        arguments[0].name === '' &&
        arguments[0].length === 0
    )
        return WriteLine(dump(arguments[0]))
    var message = format(arguments)
    return WriteLine(message)
}

function warn() {
    var message = format(arguments)
    return WriteLine(yellow + message + clear)
}

function dump(callback) {
    return (
        blueBright +
        '(' +
        clear +
        req('inspect')(callback, colord) +
        blueBright +
        ')() ' +
        gray +
        '/* => ' +
        clear +
        req('inspect')(callback(), colord) +
        gray +
        ' */'
    )
}

function print() {
    var message = format(arguments)
    return Write(message)
}

function debug() {
    var isDebugOption = argv.has('debug')
    if (!isDebugOption) return
    var message = format(arguments)
    return WriteLine(redBright + reverse + 'DEBUG: ' + clear + message)
}

function removeColor(message) {
    if (typeof message === _STRING) return message.replace(rSEQ, NONE)
    return message
}

function error() {
    var message = format(arguments)
    throw new Error(removeColor(message))
}

function replace() {
    var message = format(arguments)
    var column = message.split(rCR_LF)
    var msg =
        CursorUp(column.length) +
        CursorHorizontalAbsolute +
        column.join(EraseInLine(EndOfLine) + LF) +
        EraseInLine(EndOfLine)
    return WriteLine(msg)
}

function weaklog() {
    var message = format(arguments)
    var column = message.split(rLINE_SEP)
    var result = WriteLine(message)
    columns = column.length
    return result
}

module.exports = {
    log: log,
    print: print,
    debug: debug,
    warn: warn,
    error: error,
    format: format,
    weaklog: weaklog,
    replace: replace
}
