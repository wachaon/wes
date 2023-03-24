var WShell = WScript.CreateObject('WScript.Shell')

var rLINE_SEP = /\r?\n/
var LF = '\n'
var CR = '\r'
var NONE = ''

function isObject(value) {
    return value != null && Object.prototype.toString.call(value) === '[object Object]'
}

function isArray(value) {
    return Array.isArray(value)
}

function isString(value) {
    return typeof value === 'string'
}

function find(callback) {
    return function (data) {
        if (isObject(data)) {
            return data[
                Object.keys(data).find(function (key) {
                    return callback(data[key], key, data)
                })
            ]
        } else if (isArray(data)) return data.find(callback)
        else if (isString(data)) return data.split(rLINE_SEPg).find(callback)
    }
}

function forEach(callback) {
    return function (data) {
        if (isObject(data)) {
            for (var key in data) {
                callback(data[key], key, data)
            }
        } else if (isArray(data)) data.forEach(callback)
        else if (isString(data)) return data.split(rLINE_SEPg).forEach(callback)
    }
}

function map(callback) {
    return function (data) {
        if (isObject(data)) {
            var res = {}
            for (var key in data) {
                res[key] = callback(data[key], key, data)
            }
            return res
        } else if (isArray(data)) return data.map(callback)
        else if (isString(data)) return data.split(rLINE_SEP).map(callback).join(LF)
    }
}

function filter(callback) {
    return function (data) {
        if (isObject(data)) {
            var res = {}
            for (var key in data) {
                if (callback(data[key], key, data)) res[key] = data[key]
            }
            return res
        } else if (isArray(data)) return data.filter(callback)
        else if (isString(data)) return data.split(rLINE_SEP).filter(callback).join(LF)
    }
}

function manipulate(data, matcher, callback) {
    if (isObject(data)) {
        return map(function (value, key, parent) {
            if (matcher === key) {
                callback(value, key, parent)
            }
            return manipulate(value, matcher, callback)
        })(data)
    } else if (isArray(data)) {
        return data.map(function (value, key, parent) {
            return manipulate(value, matcher, callback)
        })
    }
}

function execCommand(command) {
    var stream = WShell.Exec(command)
    var stdout = []
    var stderr = []

    while (!stream.StdOut.AtEndOfStream) {
        stdout.push(stream.StdOut.ReadLine())
    }

    while (!stream.StdErr.AtEndOfStream) {
        stderr.push(stream.StdErr.ReadLine())
    }

    if (stderr.length) throw new Error(stderr.join(LF))
    return stdout.join(LF)
}

function typecast(arg) {
    if (arg.toLowerCase() === 'true') return true
    if (arg.toLowerCase() === 'false') return false
    if (arg === 'undefined') return null
    if (!isNaN(arg)) return Number(arg)
    return arg
}

function sleep(time, prefix, rate, indicator) {
    prefix = prefix || 'sleep'
    rate = rate || 150
    indicator = indicator || ['', '.', '..', '...']
    var len = indicator.length
    var end = new Date().getTime() + (time || 0)
    var i = 0
    while (new Date() < end) {
        console.weaklog('%S %S', prefix, indicator[i++ % len])
        WScript.Sleep(rate)
    }
}

function dialog(describes) {
    var res = {}
    describes.forEach(function dialog_forEach(describe) {
        var question = describe.question
        var initial = describe.initial
        var key = describe.key
        console.print(question + ' (' + (initial || NONE) + ') ')
        var ans = []
        while (true) {
            var charctor = WScript.StdIn.Read(1)
            if (charctor === CR) continue
            if (charctor === LF) break
            ans.push(charctor)
        }
        var answer = ans.join(NONE)
        res[key] = answer || initial || NONE
    })
    return res
}

module.exports = {
    find: find,
    filter: filter,
    forEach: forEach,
    map: map,
    manipulate: manipulate,
    execCommand: execCommand,
    typecast: typecast,
    sleep: sleep,
    dialog: dialog
}
