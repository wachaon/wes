const { isObject, isArray, isString, isFunction } = require('typecheck')
const { readFileSync, writeFileSync } = require('filesystem')
const { resolve, extname } = require('pathname')
const { rLINE_SEP, LF, NONE } = require('text')
const { unnamed, get, named } = require('argv')
const genGUID = require('genGUID')
const isCLI = require('isCLI')

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

const pipe = function pipe_pipe() {
    return new Pipe()
}

if (isCLI(__filename)) {
    const input = get('input') || console.error('Unspecified params [input]')
    const ext = extname(input)
    const output = get('output') === true ? NONE : resolve(process.cwd(), get('output') || genGUID() + ext)
    const data = ext === NONE ? require(input) : readFileSync(resolve(process.cwd(), input), 'auto')

    let pipeline = unnamed.slice(1)
    let _pipe = pipe()

    for (let i = 0; i < pipeline.length; i++) {
        const translator = pipeline[i]
        const arg = get(translator)
        if (arg == null) _pipe.use(require(translator))
        else if (isString(arg) && ((arg.includes('(') && arg.includes(')')) || arg.includes('=>')))
            _pipe.use(require(translator), arg)
        else {
            const param = eval(`(function() { return ${arg}})()`)
            if (isArray(param)) _pipe.use(require(translator), ...param)
            else _pipe.use(require(translator), param)
        }
    }

    _pipe.process(data, (err, res) => {
        if (err) console.error(err)
        else if (output === NONE) console.log(res)
        else console.log(writeFileSync(output, res, 'UTF-8'))
    })
} else module.exports = pipe
