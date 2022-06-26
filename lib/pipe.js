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
            if (callback != null && typeof callback === 'function') return callback(err, res)
            else if (err == null) return res
            throw err
        }
    }
}

function pipe() {
    return new Pipe()
}

module.exports = pipe
