var NONE = ''
var SPACE = ' '
var rSPECIFIER = /(%[sdfoj])/i
var rSEQ = /\u001B\[[\d;]+m/g
var clear = '\u001B[0m'
var redBright = '\u001B[91m'
var reverse = '\u001B[7m'
var EIL = '\u001B[0K'

function format(arg) {
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
            if ($1 === '%o' || $1 === '%O')
                return req('inspect')(val, $1 === '%O' ? { indent: true, colors: true } : {})
            if ($1 === '%j' || $1 === '%J') {
                try {
                    return JSON.stringify(val, null, $1 === '%J' ? 2 : null)
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
    if (argv.has('monotone')) WScript.StdOut.WriteLine(monotoneMessage)
    else WScript.StdErr.WriteLine(EIL + message + clear)
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
    if (argv.has('monotone')) WScript.StdOut.WriteLine('DEBUG: ' + monotoneMessage)
    else WScript.StdErr.WriteLine(EIL + redBright + reverse + 'DEBUG:' + clear + message + clear)
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
    format: format
}
