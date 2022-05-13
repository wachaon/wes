const { green, yellow, cyan, blueBright, gray, magenta, red, greenBright, clear } = require('ansi')
const { NONE, TAB, CRLF, SPACE } = require('text')
const {
    isString,
    isNumber,
    isBoolean,
    isFunction,
    isRegExp,
    isDate,
    isArray,
    isObject,
    isBuffer,
    isSet,
    isMap,
    isWeakMap,
    isSymbol
} = require('typecheck')

const rCRLF = /\r?\n/
const rINDENTS = /(^ *)/

const CAMMA = ', '
const SEP = ': '
const ARROW = ' => '

function toSliceCall(value) {
    return Array.prototype.slice.call(value)
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
        '")'
    )
}

function include(string, symbol) {
    if (isRegExp(symbol)) return symbol.test(string)
    else return !!~string.indexOf(String(symbol))
}

function replace(string, pattern, replacement) {
    return string.split(pattern).join(replacement)
}

function toString(value) {
    var res = JSON.stringify(value)
    if (include(value, '\n')) {
        res = res.replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/^"|"$/g, '`')
    }
    return res
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
    if (!isString(value)) return wrap(inspect(value, opt), '[', ']')
    else return inspect(value, opt)
}

var level = 0
var data = []

const inspect = function inspect_inspect(value, opt) {
    if (opt == null) opt = {}
    var colors = 'colors' in opt ? opt.colors : false
    var color = {
        String: colors ? green : NONE,
        Number: colors ? yellow : NONE,
        Boolean: colors ? cyan : NONE,
        Function: colors ? blueBright : NONE,
        Uint8Array: colors ? gray : NONE,
        Date: colors ? magenta : NONE,
        Regexp: colors ? red : NONE,
        Symbol: colors ? greenBright : NONE,
        Null: colors ? yellow : NONE,
        Undefined: colors ? gray : NONE,
        CircularReference: colors ? gray : NONE
    }

    if (value === undefined) return color.Undefined + String(value) + clear
    if (value === null) return color.Null + String(value) + clear
    if (isString(value)) return color.String + toString(value) + clear
    if (isNumber(value)) return color.Number + String(value) + clear
    if (isBoolean(value)) return color.Boolean + String(value) + clear
    if (isSymbol(value)) return color.Symbol + 'symbol()' + clear

    if (~data.indexOf(value)) {
        if (~data.indexOf(value, data.indexOf(value) + 1)) return color.CircularReference + '[Circular]' + clear
    }
    data.push(value)

    if (isFunction(value)) return color.Function + toFunctionString(value, opt) + clear
    if (isDate(value)) return color.Date + toDateString(value) + clear
    if (isRegExp(value)) return color.Regexp + String(value) + clear
    if (isBuffer(value)) {
        let res = []
        for (var k = 0; k < value.length; k++) {
            res.push(doubleDigit(value[k].toString(16)))
        }
        return color.Uint8Array + wrap(res.join(SPACE), '<Buffer ', '>')
    }
    if (isArray(value)) {
        level++
        var res = []
        for (var i = 0; i < value.length; i++) {
            res.push(indent(opt) + inspect(value[i], opt))
        }
        level--
        data.pop()
        return wrap(res.join(CAMMA) + indent(opt), '[', ']')
    }
    if (isSet(value)) {
        level++
        var res = []
        value.forEach(function (val) {
            res.push(indent(opt) + inspect(val, opt))
        })
        level--
        return wrap(res.join(CAMMA) + indent(opt), 'Set {', '}')
    }
    if (isMap(value)) {
        level++
        var res = []
        value.forEach(function (value, key) {
            res.push(indent(opt) + inspect(key, opt) + ARROW + inspect(value, opt))
        })
        level--
        return wrap(res.join(CAMMA) + indent(opt), 'Map {', '}')
    }
    if (isWeakMap(value)) {
        level++
        var res = indent(opt) + '<items unknown>'
        level--
        return wrap(res + indent(opt), 'WeakMap {', '}')
    }
    if (typeof value === 'object') {
        level++
        var res = []
        for (var key in value) {
            res.push(indent(opt) + toKeyString(key, opt) + SEP + inspect(value[key], opt))
        }
        level--
        data.pop()
        return wrap(res.join(CAMMA) + indent(opt), '{', '}')
    }
}

module.exports = inspect
