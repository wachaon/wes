//main
var Arguments = WScript.Arguments
var argv = [WScript.FullName, WScript.ScriptFullName]
var unnamed = []
var named = {}

var SHORT = '-'
var LONG = '--'
var NONE = ''
var SPACE = ' '
var DOUBLE_QUOTE = '"'
var ASSIGNMENT = '='

var key = null
for (var i = 0; i < Arguments.length; i++) {
    var arg = unescape(Arguments.Item(i))
    argv.push(arg)
    if (!arg.indexOf(LONG) && arg.length > 2) key = setLongNamed(arg, key)
    else if (!arg.indexOf(SHORT)) key = setShortNamed(arg, key)
    else key = setUnNamed(arg, key)
}
if (key) named[key] = true

// methods

/**
 * Get the value of a named option
 * @param {string} name
 * @returns {string|number|boolean|null}
 */
function get(name) {
    if (name in named) return named[name]
    else false
}

/**
 * Returns a boolean value indicating whether the specified option exists and, if so, whether it is the same as expect.
 * @param {string} name
 * @param {string|number|boolean} expect
 * @returns {boolean}
 */
function has(name, expect) {
    var value = null
    if (name in named) {
        value = named[name]
        if (arguments.length > 1) return value === expect
        return true
    }
    return false
}

function stringify(args) {
    var params = args != null ? args : { unnamed: unnamed, named: named }
    var res = []
    var short = []
    for (var name in params.named) {
        var target = params.named[name]
        if (name.length === 1) {
            if (target === true) short.push(name)
            else res.push(SHORT + key + SPACE + inner(escape(String(target))))
        } else {
            if (target === true) res.push(LONG + escape(name))
            else res.push(LONG + key + ASSIGNMENT + inner(escape(String(target))))
        }
    }

    if (short.length) res.unshift(SHORT + short.join(NONE))
    if (params.unnamed.length) res.unshift(params.unnamed.join(SPACE))
    return res.join(SPACE)
}

// bind
argv.unnamed = unnamed
argv.named = named
argv.get = get
argv.has = has
argv.stringify = stringify

module.exports = argv

// util
function setLongNamed(arg, name) {
    var rNamed = /^\-\-([^=]+)=?([^=]+)?$/
    if (name != null) named[name] = true
    var _named = rNamed.exec(arg)
    name = _named[1]
    var value = _named[2] || null
    if (value) {
        named[name] = typecast(inner(value))
        name = null
    }
    return name
}

function setShortNamed(arg, name) {
    var args = arg.substring(1).split(NONE)
    for (var j = 0; j < args.length; j++) {
        if (name != null) named[name] = true
        name = args[j]
    }
    return name
}

function setUnNamed(arg, name) {
    var _arg = typecast(arg)
    if (name != null) named[name] = _arg
    else unnamed.push(_arg)
    return null
}

function typecast(arg) {
    if (arg.toLowerCase() === 'true') return true
    if (arg.toLowerCase() === 'false') return false
    if (!isNaN(arg)) return Number(arg)
    return arg
}

function inner(value) {
    if (!value.indexOf(DOUBLE_QUOTE) && value.indexOf(DOUBLE_QUOTE) === value.length - 1)
        return value.substring(1, value.lenght - 1)
    return value
}
