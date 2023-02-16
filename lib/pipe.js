const { isObject, isArray, isString, isFunction } = require('typecheck')
const { rLINE_SEP, LF } = require('text')

class Pipe {
    constructor() {
        this.translators = []
    }
    use(fn, ...options) {
        this.translators.push([fn, ...options])
        return this
    }
    filter(callback) {
        this.translators.push([
            (data) => {
                if (isObject(data)) {
                    var res = {}
                    for (var key in data) {
                        if (callback(data[key], key, data)) res[key] = data[key]
                    }
                    return res
                } else if (isArray(data)) return data.filter(callback)
                else if (isString(data)) return data.split(rLINE_SEP).filter(callback).join(LF)
            }
        ])
        return this
    }
    map(callback) {
        this.translators.push([
            (data) => {
                if (isObject(data)) {
                    var res = {}
                    for (var key in data) {
                        res[key] = callback(data[key], key, data)
                    }
                    return res
                } else if (isArray(data)) return data.map(callback)
                else if (isString(data)) return data.split(rLINE_SEP).map(callback).join(LF)
            }
        ])
        return this
    }
    process(data, callback) {
        let res, err
        try {
            res = this.translators.reduce((acc, curr) => {
                return curr.shift()(acc, ...curr)
            }, data)
        } catch (error) {
            err = error
        } finally {
            if (callback != null && isFunction(callback)) return callback(err, res)
            else if (err != null) return Promise.reject(err)
            return Promise.resolve(res)
        }
    }
}

function pipe() {
    return new Pipe()
}

module.exports = pipe
