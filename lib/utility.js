function find(container, matcher) {
    var keys = Object.keys(container)
    var res = keys.filter(function (key) {
        return matcher(container[key], key)
    })
    return res.length > 0 ? container[res[0]] : null
}

function forEach(container, callback) {
    map(container, callback)
}

function map(container, callback) {
    var keys = Object.keys(container)
    var res = {}
    keys.forEach(function (key) {
        res[key] = callback(container[key], key)
    })
    return res
}

function filter(container, callback) {
    var keys = Object.keys(container)
    var res = {}
    keys.forEach(function (key) {
        var value = container[key]
        if (callback(value, key)) res[key] = value
    })
    return res
}

function scrutinize(container, callback) {
    var keys = Object.keys(container)
    keys.forEach(function (key) {
        var value = container[key]
        callback(value, key, container)
        var type = typeof value
        if (
            value == null ||
            type === 'string' ||
            type === 'number' ||
            type === 'boolean' ||
            type === 'symbol' ||
            type === 'function'
        ) {
        } else scrutinize(value, callback)
    })
}

module.exports = {
    find: find,
    filter: filter,
    forEach: forEach,
    map: map,
    scrutinize: scrutinize
}
