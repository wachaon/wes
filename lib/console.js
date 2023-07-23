var YELLOW_BRIGHT = '\u001B[93m'
var GREEN_BRIGHT = '\u001B[92m'
var BLUE_BRIGHT = '\u001B[94m'
var GRAY = '\u001B[90m'
var REVERSE = '\u001B[7m'
var CLEAR = '\u001B[0m'
var TRIM = '\u001B[0K'
var GOTO_TOP = '\u001B[G'

var MONOTONE = 'monotone'
var DEBUG = 'debug'

var rSPECIFIER = /(%[scdfoj])/i
var rSEQ = /\u001B\[[\d;]+m/g
var rLINE_SEP = /\r?\n/
var LF = '\n'
var SPACE = ' '
var NONE = ''

var colord = { indent: true, colors: true }
var indented = { indent: true }

var WARN_COLOR = YELLOW_BRIGHT
var DEBUG_COLOR = GREEN_BRIGHT

var column = 0

function write(message, col) {
    var monotone = removeColor(message)
    if (column > 0) up(column)
    var base = Array.from({ length: column }).fill(NONE)

    if (req('argv').has(MONOTONE)) {
        var extend = trim(monotone)
        WScript.StdOut.Write(Object.assign(base, extend).join(LF))
    } else {
        var extend = trim(message)
        WScript.StdErr.Write(Object.assign(base, extend).join(LF) + CLEAR)
    }
    column = col
    return monotone
}

function writeLine(message, col) {
    return write(message + LF, col)
}

function print() {
    return write(format(arguments), 0)
}

function log() {
    if (arguments.length === 1) {
        var callback = arguments[0]
        if (typeof callback === 'function' && callback.name === '') return writeLine(dump(callback), 0)
    }
    return writeLine(format(arguments), 0)
}

function weaklog() {
    var formated = format(arguments)
    return writeLine(formated, formated.split(rLINE_SEP).length)
}

function warn() {
    write([WARN_COLOR + REVERSE, 'wran', REVERSE + CLEAR].join(SPACE), 0)
    return log.apply(null, Array.prototype.slice.call(arguments))
}

function debug() {
    if (!req('argv').has(DEBUG)) return void 0
    write([DEBUG_COLOR + REVERSE, 'debug', REVERSE + CLEAR].join(SPACE), 0)
    return log.apply(null, Array.prototype.slice.call(arguments))
}

function replace() {
    var formated = format(arguments)
    column = formated.split(rLINE_SEP).length
    return writeLine(formated, 0)
}

function error() {
    throw new Error(format(arguments))
}

function trim(message) {
    if (message == null) return TRIM
    return message.split(rLINE_SEP).map(function (line) {
        return line + TRIM
    })
}

function dump(callback) {
    return (
        BLUE_BRIGHT +
        '(' +
        CLEAR +
        req('inspect')(callback, colord) +
        BLUE_BRIGHT +
        ')() ' +
        GRAY +
        '/* => ' +
        CLEAR +
        req('inspect')(callback(), colord) +
        GRAY +
        ' */'
    )
}

function format(params) {
    params = Array.prototype.slice.call(arguments.length > 1 ? arguments : params)
    if (params.length == 0) return undefined
    if (params.length === 1) return params[0]
    var args = Array.from(params)
    var message = args.shift()
    while (rSPECIFIER.test(message) && args.length > 0) {
        var val = args.shift()
        message = message.replace(rSPECIFIER, function inspect_replacer($1) {
            if ($1 === '%s' || $1 === '%S') return String(val)
            if ($1 === '%c' || $1 === '%C') return genColor(val)
            if ($1 === '%d' || $1 === '%D') return parseInt(+val, 10)
            if ($1 === '%f' || $1 === '%F') return parseFloat(+val)
            if ($1 === '%o') return req('inspect')(val, indented)
            if ($1 === '%O') return req('inspect')(val, colord)
            if ($1 === '%j' || $1 === '%J') {
                try {
                    return JSON.stringify(val, null, $1 === '%j' ? null : 4)
                } catch (error) {
                    return val
                }
            }
            return $1
        })
    }
    if (args.length) message += args.join(SPACE)
    return message
}

function genColor(val) {
    if (Array.isArray(val)) return req('ansi').color.apply(null, val)
    return req('ansi').color(val)
}

function removeColor(message) {
    if (typeof message === 'string') return message.replace(rSEQ, NONE)
    return message
}

function up(row) {
    WScript[req('argv').has(MONOTONE) ? 'StdOut' : 'StdErr'].Write('\u001B[' + row + 'A' + GOTO_TOP)
}

module.exports = {
    log: log,
    print: print,
    weaklog: weaklog,
    replace: replace,
    debug: debug,
    warn: warn,
    error: error,
    format: format
}
