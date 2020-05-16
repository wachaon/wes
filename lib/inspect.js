var ansi = console.ansi

function toStringCall(value) {
    return Object.prototype.toString.call(value)
}
function toSliceCall(value) {
    return Array.prototype.slice.call(value)
}
function instanceOf(value, Class) {
    return value instanceof Class
}
function doubleDigit(value) {
    return toSliceCall('0' + value)
        .slice(-2)
        .join('')
}
function tripleDigit(value) {
    return toSliceCall('00' + value)
        .slice(-3)
        .join('')
}
function wrap(value, header, footer) {
    if (footer == null) return header + value + header
    else return header + value + footer
}
function toDateString(date) {
    return (
        'new Data("' +
        date.getFullYear() +
        '/' +
        doubleDigit(date.getMonth() + 1) +
        '/' +
        doubleDigit(date.getDate()) +
        ' ' +
        doubleDigit(date.getHours()) +
        ':' +
        doubleDigit(date.getSeconds()) +
        ':' +
        doubleDigit(date.getMinutes()) +
        '.' +
        tripleDigit(date.getMilliseconds()) +
        ')'
    )
}
function include(string, symbol) {
    if (toStringCall(symbol) === '[object RegExp]') return symbol.test(string)
    else return !!~string.indexOf(String(symbol))
}
function replace(string, pattern, replacement) {
    return string.split(pattern).join(replacement)
}
function toString(value) {
    if (include(value, rCRLF)) {
    } else if (!include(value, DOUBLE_QUOTE)) return wrap(value, DOUBLE_QUOTE)
    else if (!include(value, SINGLE_QUOTE)) return wrap(value, SINGLE_QUOTE)
    value = replace(value, BACK_QUOTE, BACK_SLASH + BACK_QUOTE)
    return wrap(value, BACK_QUOTE)
}
function toFunctionString(value, opt) {
    var tabWidth = 'tabWidth' in opt && opt.tabWidth > 0 ? opt.tabWidth : 4
    var code = replace(String(value), TAB, repeat(SPACE, tabWidth))
    var line = code.split(rCRLF)
    var indents = []
    for (var l = 1; l < line.length; l++) {
        indents[l] = rINDENTS.test(line[l]) ? line[l].match(rINDENTS)[0].length : 0
    }
    var min = Math.min.apply(null, indents.slice(1))
    for (var l = 1; l < indents.length; l++) {
        line[l] = line[l].substring(min)
    }
    return line.join(indent(opt))
}
function repeat(string, number) {
    var res = ''
    while (number > 0) {
        res += string
        number--
    }
    return res
}
function indent(opt) {
    var tabWidth = 'tabWidth' in opt ? opt.tabWidth : 4
    if (!('indent' in opt && opt.indent)) return ''
    return CRLF + repeat(SPACE, tabWidth * level)
}
function toKeyString(value, opt) {
    if (
        typeof value != 'string' ||
        include(value, rCRLF) ||
        (include(value, DOUBLE_QUOTE) && include(value, SINGLE_QUOTE))
    )
        return wrap(inspect(value, opt), '[', ']')
    return inspect(value, opt)
}
var NONE = ''
var TAB = '\t'
var CRLF = '\r\n'
var rCRLF = /\r?\n/
var rINDENTS = /(^ *)/
var SPACE = ' '
var CAMMA = ', '
var SEP = ': '
var BACK_QUOTE = '`'
var SINGLE_QUOTE = "'"
var DOUBLE_QUOTE = '"'
var BACK_SLASH = '\\'

var level = 0

function inspect(value, opt) {
    if (opt == null) opt = {}
    var colors = 'colors' in opt ? opt.colors : false
    var color = {
        String: colors ? ansi.green : NONE,
        Number: colors ? ansi.yellow : NONE,
        Boolean: colors ? ansi.cyan : NONE,
        Function: colors ? ansi.brightBlue : NONE,
        Uint8Array: colors ? ansi.gray : NONE,
        Date: colors ? ansi.magenta : NONE,
        Regexp: colors ? ansi.red : NONE,
        Symbol: colors ? ansi.brightGreen : NONE,
        Null: colors ? ansi.yellow : NONE,
        Undefined: colors ? ansi.gray : NONE,
        clear: colors ? ansi.clear : NONE
    }

    if (value === undefined) return color.Undefined + String(value) + color.clear
    if (value === null) return color.Null + String(value) + color.clear
    if (typeof value === 'string') return color.String + toString(value) + color.clear
    if (typeof value === 'number') return color.Number + String(value) + color.clear
    if (typeof value === 'boolean') return color.Boolean + String(value) + color.clear
    if (typeof value === 'function')
        return color.Function + toFunctionString(value, opt) + color.clear
    try {
        // Buffer
        if (instanceOf(value, Uint8Array)) {
            let res = []
            for (var k = 0; k < value.length; k++) {
                res.push(doubleDigit(value[k].toString(16)))
            }
            return color.Uint8Array + wrap(res.join(SPACE), '<Buffer ', ' >')
        }
    } catch (err) {}
    if (toStringCall(value) === '[object Date]')
        return color.Date + toDateString(value) + color.clear
    if (toStringCall(value) === '[object RegExp]') return color.Regexp + String(value) + color.clear
    if (toStringCall(value) === '[object Symbol]') return color.Symbol + 'symbol()' + color.clear
    if (toStringCall(value) === '[object Array]') {
        level++
        var res = []
        for (var i = 0; i < value.length; i++) {
            res.push(indent(opt) + inspect(value[i], opt))
        }
        level--
        return wrap(res.join(CAMMA) + indent(opt), '[', ']')
    }
    if (toStringCall(value) === '[object Object]') {
        level++
        var res = []
        for (var key in value) {
            res.push(indent(opt) + toKeyString(key, opt) + SEP + inspect(value[key], opt))
        }
        level--
        return wrap(res.join(CAMMA) + indent(opt), '{', '}')
    }
}

module.exports = inspect