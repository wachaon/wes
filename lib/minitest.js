const { redBright: red, greenBright: green, yellowBright: yellow, magentaBright: pink, gray } = require('ansi')
const { LF, TAB, rCRLF, SPACE, INDNT, NONE, CHECKMARK } = require('text')
const { isFunction, isRegExp } = require('typecheck')
const inspect = require('inspect')
const { execArgv } = require('process')

const STRING = 'string'
const BOOLEAN = 'boolean'
const SYMBOL = 'symbol'
const NUMBER = 'number'
const DATE = 'Date'
const FUNCTION = 'function'

let depth = 0
let indent = NONE
let rate = 4
let pass = [0, 0]
let reference = []

const toStringCall = function minitest_toStringCall(value) {
    return Object.prototype.toString.call(value).replace(/\[object ([A-z_$][A-z\d_$]*)\]/, '$1')
}

const describe = function minitest_describe(title, fn) {
    depth++
    indent = SPACE.repeat(depth * rate)
    console.log(LF + indent + title)
    fn()
    depth--
}

const it = function minitest_it(message, fn) {
    depth++
    indent = SPACE.repeat(depth * rate)
    const printCode = (code, dep) => {
        let source = String(code).split(/\r?\n/)
        let last = source[source.length - 1]
        const exp = /^\s*/
        let initial = exp.test(last) ? exp.exec(last)[0] : ''
        source = source
            .map((line) => {
                if (line.startsWith(initial)) return line.slice(initial.length)
                return line
            })
            .map((line) => {
                return SPACE.repeat((dep + 1) * rate) + line
            })
        return source.join('\r\n')
    }

    try {
        pass[0]++
        fn()
        pass[1]++
        console.log('%S%S%S %S%S', indent, gray, message, green, CHECKMARK)
    } catch (e) {
        console.log(
            '%S%S%S%S%S%S %S// => %S%S',
            indent,
            pink,
            message,
            LF,
            yellow,
            printCode(fn, depth),
            red,
            e.message,
            LF
        )
    } finally {
        depth--
    }
}

const internal_equal = function minitest_internal_equal(recursive, base, target, strict) {
    // Strict equal.
    if (base === target) return true

    // Whether the constructor is the same one.
    if (base.constructor.name !== target.constructor.name) return false

    // For primitive values.
    if (typeof base === STRING || typeof base === BOOLEAN || typeof base === SYMBOL) return base === target

    // For Number values.
    if (typeof base === NUMBER && typeof base === NUMBER)
        return Number.isNaN(base) && Number.isNaN(target) ? true : base === target

    // For strict mode.
    if (strict && base !== target) return false

    // For RegExp or Function values.
    if (isRegExp(base) || isFunction(base)) return String(base) === String(target)

    // For Date values.
    if (toStringCall(base) === DATE && toStringCall(target) === DATE) return base.getTime() === target.getTime()

    // If the base is a circular reference but not an equivalence.
    if (reference.includes(base)) return false

    // Add to array so that circular references can be checked.
    reference.push(base)

    // Objects are checked recursively.
    const keys = Object.keys(base)
    if (!keys.length) return inspect(base) === inspect(target)

    return keys.every((key) => {
        return internal_equal(recursive, base[key], target[key], strict)
    })
}

const assert = function minitest_assert(assertion) {
    return assert.ok(assertion)
}

assert.ok = function minitest_assert_ok(assertion) {
    let res = typeof assertion === FUNCTION ? assertion() : assertion
    if (res != true) throw new Error(inspect(res))
}

assert.ng = function minitest_assert_ng(assertion) {
    let res = typeof assertion === FUNCTION ? assertion() : assertion
    if (res != false) throw new Error(inspect(res))
}

assert.equal = function minitest_equal(base, target, strict) {
    /* Check if base and target are equivalent
     * @param base {Any}
     * @param target {Any}
     * @param strict {Boolean} If true, references other than primitive values must be the same.
     */
    reference = []
    let res = internal_equal(base, target, strict)
    reference = []
    if (!res) throw new Error(inspect(res))
}

assert.strict = function minitest_strict(assertion) {
    let res = typeof assertion === FUNCTION ? assertion() : assertion
    if (res !== true) throw new Error(inspect(res))
}

assert.strictNG = function minitest_strict(assertion) {
    let res = typeof assertion === FUNCTION ? assertion() : assertion
    if (res !== false) throw new Error(inspect(res))
}

module.exports = {
    describe,
    it,
    assert,
    pass
}
