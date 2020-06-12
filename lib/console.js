var NONE = ''
var SPACE = ' '
var rSPECIFIER = /(%[sdfoj])/i
var rSEQ = /\u001B\[[\d;]+m/g
var clear = '\u001B[0m'
var brightRed = '\u001B[91m'
var reverse = '\u001B[7m'

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
    else WScript.StdErr.WriteLine(message + clear)
    return monotoneMessage
}

function print() {
    var message = normalize(arguments)
    var monotoneMessage = removeColor(message)
    if (argv.has('monotone')) WScript.StdOut.Write(monotoneMessage)
    else WScript.StdErr.Write(message + clear)
    return monotoneMessage
}

function debug() {
    var isDebugOption = argv.has('debug')
    if (!isDebugOption) return
    var message = normalize(arguments)
    var monotoneMessage = removeColor(message)
    if (argv.has('monotone')) WScript.StdOut.WriteLine('DEBUG: ' + monotoneMessage)
    else WScript.StdErr.WriteLine(brightRed + reverse + 'DEBUG:' + clear + message + clear)
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
    normalize: normalize
}
