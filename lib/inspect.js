const { green, yellow, cyan, blueBright, gray, magenta, red, greenBright, clear } = require('ansi')
const { NONE, TAB, CRLF, SPACE, LF } = require('text')
const {
    typecheck,
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
    isSymbol,
    isWeakSet
} = require('typecheck')

const rCRLF = /\r?\n/
const rINDENTS = /(^ *)/

const CAMMA = ', '
const SEP = ': '

function toSliceCall(value) {
    return Array.prototype.slice.call(value)
}

function doubleDigit(value) {
    return toSliceCall('0' + value)
        .slice(-2)
        .join(NONE)
}

function tripleDigit(value) {
    return toSliceCall('00' + value)
        .slice(-3)
        .join(NONE)
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
        SPACE +
        doubleDigit(date.getHours()) +
        ':' +
        doubleDigit(date.getMinutes()) +
        ':' +
        doubleDigit(date.getSeconds()) +
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
    if (include(value, LF)) {
        res = res
            .replace(/\\"/g, '"')
            .replace(/`/g, '\\`')
            .replace(/\\n/g, LF)
            .replace(/\\t/g, TAB)
            .replace(/^"|"$/g, '`')
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
    var res = NONE
    while (number > 0) {
        res += string
        number--
    }
    return res
}

function indent(opt) {
    var tabWidth = 'tabWidth' in opt ? opt.tabWidth : 4
    if (!('indent' in opt && opt.indent)) return NONE
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
        CircularReference: colors ? gray : NONE,
        Clear: colors ? clear : NONE,
        Comment: colors ? gray : NONE
    }

    if (value === undefined) return color.Undefined + String(value) + color.Clear
    if (value === null) return color.Null + String(value) + color.Clear
    if (value.constructor == null) {
        level++
        var r = indent(opt) + color.Comment + '/* <items unknown> */' + color.Clear
        level--
        r += indent(opt)
        return wrap(r, color.Comment + '/* [TypeName ' + typecheck(value) + '] */ ' + color.Clear + '{', '}')
    }
    if (isString(value)) return color.String + toString(value) + color.Clear
    if (isNumber(value)) return color.Number + +value + color.Clear
    if (isBoolean(value)) return color.Boolean + String(value) + color.Clear
    if (isSymbol(value)) {
        var symbolKey = Symbol.keyFor(value)
        if (symbolKey == null) return color.Symbol + 'Symbol()' + color.Clear
        return color.Symbol + 'Symbol.for(' + inspect(Symbol.keyFor(value)) + ')' + color.Clear
    }

    if (~data.indexOf(value)) {
        if (~data.indexOf(value, data.indexOf(value) + 1)) return color.CircularReference + '[Circular]' + color.Clear
    }

    if (isFunction(value)) return color.Function + toFunctionString(value, opt) + color.Clear
    if (isDate(value)) return color.Date + toDateString(value) + color.Clear
    if (isRegExp(value)) return color.Regexp + String(value) + color.Clear
    if (isBuffer(value)) {
        let res = []
        let title =
            color.Comment +
            'Buffer.from([' +
            LF +
            '  /* ADDRESS       0     1     2     3     4     5     6     7     8     9     a     b     c     d     e     f */' +
            color.Clear

        let row = []
        for (var k = 0; k < value.length; k++) {
            if (k != 0 && k % 16 === 0) {
                res.push(genLine(k - (k % 16) - 16) + SPACE + row.join(CAMMA))
                row = []
            }
            row.push(color.Comment + '0x' + color.Clear + ('0' + value[k].toString(16)).slice(-2))
        }
        if (row.length) {
            if (k > 16) res.push(genLine(k - (k % 16)) + SPACE + row.join(CAMMA))
            else res.push(genLine(0) + SPACE + row.join(CAMMA))
        }

        return title + LF + res.join(CAMMA + LF) + color.Comment + LF + '])' + color.Clear
    }
    if (isArray(value)) {
        level++
        data.push(value)
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
        value.forEach(function inspect_isSet_callback(val) {
            res.push(indent(opt) + inspect(val, opt))
        })
        level--
        return wrap(res.join(CAMMA) + indent(opt), 'new Set ([', '])')
    }
    if (isMap(value)) {
        level++
        var res = []
        value.forEach(function inspect_isMap_callback(value, key) {
            res.push([key, value])
        })
        const ret = inspect(res, opt)
        level--
        return wrap(ret + indent(opt), 'new Map (', ')')
    }
    if (isWeakMap(value)) {
        level++
        var res = indent(opt) + color.Comment + '/* <items unknown> */' + color.Clear
        level--
        return wrap(res + indent(opt), 'new WeakMap (', ')')
    }
    if (isWeakSet(value)) {
        level++
        var res = indent(opt) + color.Comment + '/* <items unknown> */' + color.Clear
        level--
        return wrap(res + indent(opt), 'new WeakSet (', ')')
    }
    if (isObject(value)) {
        data.push(value)

        level++
        var res = []
        for (var key in value) {
            res.push(indent(opt) + toKeyString(key, opt) + SEP + inspect(value[key], opt))
        }
        level--
        data.pop()
        var name = value.constructor.name
        if (name !== 'Object') {
            return wrap(
                res.join(CAMMA) + indent(opt),
                color.Comment + '/* [class ' + name + '] */ ' + color.Clear + '{',
                '}'
            )
        } else return wrap(res.join(CAMMA) + indent(opt), '{', '}')
    }

    function genLine(num) {
        return (
            color.Comment +
            '  /* ' +
            Array.prototype.slice
                .call('0000000' + num.toString(16))
                .slice(-8)
                .join('') +
            ' */' +
            color.Clear
        )
    }
}

module.exports = inspect
