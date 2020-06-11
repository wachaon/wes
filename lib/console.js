var NONE = ''
var SPACE = ' '
var rSPECIFIER = /(%[sdfoj])/i
var rSEQ = /\u001B\[[\d;]+m/g

function color(red, green, blue) {
    var args = Array.prototype.slice.call(arguments)
    if (args.length === 1 && args[0].startsWith('#')) {
        red = parseInt(args[0].slice(1, 3), 16)
        green = parseInt(args[0].slice(3, 5), 16)
        blue = parseInt(args[0].slice(5, 7), 16)
    }
    return '\u001B[38;2;' + red + ';' + green + ';' + blue + 'm'
}

function bgColor(red, green, blue) {
    var args = Array.prototype.slice.call(arguments)
    if (args.length === 1 && args[0].startsWith('#')) {
        red = parseInt(args[0].slice(1, 3), 16)
        green = parseInt(args[0].slice(3, 5), 16)
        blue = parseInt(args[0].slice(5, 7), 16)
    }
    return '\u001B[48;2;' + red + ';' + green + ';' + blue + 'm'
}

function cursorUp(line) {
    return `\u001B[${line}A`
}

function cursorDown(line) {
    return `\u001B[${line}B`
}

function cursorForward(character) {
    return `\u001B[${character}C`
}

function cursorBack(character) {
    return `\u001B[${character}D`
}

var ansi = {
    clear: '\u001B[0m',
    bold: '\u001B[1m',
    underscore: '\u001B[4m',
    blink: '\u001B[5m',
    reverse: '\u001B[7m',
    concealed: '\u001B[8m',

    black: '\u001B[30m',
    red: '\u001B[31m',
    green: '\u001B[32m',
    yellow: '\u001B[33m',
    blue: '\u001B[34m',
    magenta: '\u001B[35m',
    cyan: '\u001B[36m',
    silver: '\u001B[37m',

    gray: '\u001B[90m',
    brightRed: '\u001B[91m',
    brightGreen: '\u001B[92m',
    brightYellow: '\u001B[93m',
    brightBlue: '\u001B[94m',
    brightMagenta: '\u001B[95m',
    brightCyan: '\u001B[96m',
    white: '\u001B[97m',

    bgBlack: '\u001B[40m',
    bgRed: '\u001B[41m',
    bgGreen: '\u001B[42m',
    bgYellow: '\u001B[43m',
    bgBlue: '\u001B[44m',
    bgMagenta: '\u001B[45m',
    bgCyan: '\u001B[46m',
    bgSilver: '\u001B[47m',

    bgGray: '\u001B[100m',
    bgBrightRed: '\u001B[101m',
    bgBrightGreen: '\u001B[102m',
    bgBrightYellow: '\u001B[103m',
    bgBrightBlue: '\u001B[104m',
    bgBrightMagenta: '\u001B[105m',
    bgBrightCyan: '\u001B[106m',
    bgWhite: '\u001B[107m',

    color: color,
    bgColor: bgColor,
    cursorUp: cursorUp,
    cursorDown: cursorDown,
    cursorForward: cursorForward,
    cursorBack: cursorBack
}

function normalize(arg) {
    var args = Array.prototype.slice.call(arg)
    if (args.length === 0) return
    var message = args.shift()
    if (args.length === 0) return message
    while (rSPECIFIER.test(message) && args.length > 0) {
        var val = args.shift()
        message = message.replace(rSPECIFIER, function ($1) {
            if ($1 === '%s' || $1 === '%S') return String(val)
            if ($1 === '%d' || $1 === '%D') return parseInt(val, 10)
            if ($1 === '%f' || $1 === '%F') return Number(val)
            if ($1 === '%o') return req('inspect')(val)
            if ($1 === '%O') return req('inspect')(val, { indent: true, colors: true })
            if ($1 === '%j') {
                try {
                    return JSON.stringify(val)
                } catch (error) {
                    return val
                }
            }
            if ($1 === '%J') {
                try {
                    return JSON.stringify(val, null, 2)
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
    var message = normalize(arguments)
    var monotoneMessage = removeColor(message)
    if (argv.has('monotone')) WScript.StdOut.WriteLine(monotoneMessage)
    else WScript.StdErr.WriteLine(message + ansi.clear)
    return monotoneMessage
}

function print() {
    var message = normalize(arguments)
    var monotoneMessage = removeColor(message)
    if (argv.has('monotone')) WScript.StdOut.Write(monotoneMessage)
    else WScript.StdErr.Write(message + ansi.clear)
    return monotoneMessage
}

function debug() {
    var isDebugOption = argv.has('debug')
    if (!isDebugOption) return
    var message = normalize(arguments)
    var monotoneMessage = removeColor(message)
    if (argv.has('monotone')) WScript.StdOut.WriteLine('DEBUG: ' + monotoneMessage)
    else WScript.StdErr.WriteLine('\u001B[91m\u001B[7mDEBUG:\u001B[0m ' + message + ansi.clear)
    return monotoneMessage
}

function removeColor(message) {
    if (typeof message === 'string') return message.replace(rSEQ, NONE)
    return message
}

module.exports = {
    log: log,
    print: print,
    debug: debug,
    normalize: normalize,
    ansi: ansi
}
