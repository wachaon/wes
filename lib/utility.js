function find(hash, matcher) {
    return hash[
        Object.keys(hash).find(function (key) {
            return matcher(hash[key], key)
        })
    ]
}

function forEach(hash, callback) {
    map(hash, callback)
}

function map(hash, callback) {
    var keys = Object.keys(hash)
    var res = {}
    keys.forEach(function (key) {
        res[key] = callback(hash[key], key)
    })
    return res
}

function filter(hash, callback) {
    var keys = Object.keys(hash)
    var res = {}
    keys.forEach(function (key) {
        var value = hash[key]
        if (callback(value, key)) res[key] = value
    })
    return res
}

function manipulate(hash, callback) {
    Object.keys(hash).forEach(function (key) {
        var value = hash[key]
        callback(value, key, hash)
        var type = typeof value
        if (
            !(
                value == null ||
                type === 'string' ||
                type === 'number' ||
                type === 'boolean' ||
                type === 'symbol' ||
                type === 'function'
            )
        )
            manipulate(value, callback)
    })
}

function execCommand(command) {
    var WShell = WScript.CreateObject('WScript.Shell')
    var stream = WShell.Exec(command)
    var res = []

    while (!stream.StdOut.AtEndOfStream) {
        res.push(stream.StdOut.ReadLine())
    }

    return res.join('\n')
}

module.exports = {
    find: find,
    filter: filter,
    forEach: forEach,
    map: map,
    manipulate: manipulate,
    execCommand: execCommand
}
