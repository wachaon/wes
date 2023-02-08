const _FUNCTION = 'function'
const { LF } = require('text')

class Pipe {
    constructor() {
        this.translators = []
    }
    use(fn, ...options) {
        this.translators.push([fn, ...options])
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
            if (callback != null && typeof callback === _FUNCTION) return callback(err, res)
            else if (err != null) return Promise.reject(err)
            return Promise.resolve(res)
        }
    }
    static filter(callback) {
        return function (data) {
            if (isString(data)) {
                return data.split(rLINE_SEP).filter(callback).join(LF)
            }
            if (isArray(data)) return data.filter(callback)
            if (isObject(data)) {
                let res = {}
                for (let key in data) {
                    if (callback(data[key], key)) res[key] = data[key]
                }
                return res
            }
        }
    }
    static map(callback) {
        return function (data) {
            if (isString(data)) {
                return data.split(rLINE_SEP).map(callback).join(LF)
            }
            if (isArray(data)) return data.map(callback)
            if (isObject(data)) {
                let res = {}
                for (let key in data) {
                    res[key] = callback(data[key], key)
                }
                return res
            }
        }
    }
}

function pipe() {
    return new Pipe()
}

pipe.Pipe = Pipe

module.exports = pipe
