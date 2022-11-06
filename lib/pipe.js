const _FUNCTION = 'function'

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
}

function pipe() {
    return new Pipe()
}

module.exports = pipe
