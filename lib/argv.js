//main
var Arguments = WScript.Arguments
var argv = [WScript.FullName, WScript.ScriptFullName]
var unnamed = []
var named = {}

var key = null
for (var i = 0; i < Arguments.length; i++) {
    var arg = unescape(Arguments.Item(i))
    argv.push(arg)
    if (!arg.indexOf('--') && arg.length > 2) key = setLongNamed(arg, key)
    else if (!arg.indexOf('-')) key = setShortNamed(arg, key)
    else key = setUnNamed(arg, key)
}
if (key) named[key] = truez

// methods
function get(name) {
    if (name in named) return named[name]
    else false
}

function has(name, expect) {
    var value = null
    if (name in named) {
        value = named[name]
        if (arguments.length > 1) return value === expect
        return true
    }
    return false
}

function security() {
    return has('safe')
        ? security.safe
        : has('usual')
        ? security.usual
        : has('unsafe')
        ? security.unsafe
        : has('dangerous')
        ? security.dangerous
        : 0
}

;(security.safe = -1), (security.usual = 0), (security.unsafe = 1), (security.dangerous = 2)

function allow(borderline) {
    return borderline <= security()
}

function stringify(args) {
    var params = args != null ? args : { unnamed: unnamed, named: named }
    var res = []
    var short = []
    for (var name in params.named) {
        var target = params.named[name]
        if (name.length === 1) {
            if (target === true) short.push(name)
            else res.push('-' + key + ' ' + inner(escape(String(target))))
        } else {
            if (target === true) res.push('--' + escape(name))
            else res.push('--' + key + '=' + inner(escape(String(target))))
        }
    }

    if (short.length) res.unshift('-' + short.join(''))
    if (params.unnamed.length) res.unshift(params.unnamed.join(' '))
    return res.join(' ')
}

// bind
argv.unnamed = unnamed
argv.named = named
argv.get = get
argv.has = has
argv.security = security
argv.allow = allow
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
    var args = arg.substring(1).split('')
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
    var rBoolean = /true|false/i
    if (rBoolean.test(arg)) {
        if (arg.toLowerCase() === 'true') return true
        else return false
    }
    if (!isNaN(arg)) return Number(arg)
    return arg
}

function inner(value) {
    if (!value.indexOf('"') && value.indexOf('"') === value.length - 1) return value.substring(1, value.lenght - 1)
    return value
}
