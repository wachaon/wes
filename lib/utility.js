function find(container, matcher) {
    var keys = Object.keys(container)
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i]
        var value = container[key]
        if (matcher(key, value)) return value
    }
}

function forEach(container, callback) {
    map(container, callback)
}

function map(container, callback) {
    var keys = Object.keys(container)
    var result = []
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i]
        var value = container[key]
        result.push(callback(key, value, i))
    }
    return result
}

function filter(container, callback) {
    var keys = Object.keys(container)
    var result = []
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i]
        var value = container[key]
        if (callback(key, value, i)) result.push(value)
    }
    return result
}

module.exports = {
    find: find,
    filter: filter,
    forEach: forEach,
    map: map
}
