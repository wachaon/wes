const { redBright: red, greenBright: green, yellowBright: yellow, magentaBright: pink, gray } = require('ansi')
const { LF, TAB, rCRLF, SPACE, INDNT, NONE, CHECKMARK } = require('text')
const { isFunction, isRegExp } = require('typecheck')
const inspect = require('inspect')

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
    const printCode = (code) => {
        let source = code.toString().split(TAB).join('    ').split(rCRLF)
        if (source.length < 2) return `${SPACE.repeat(indent + rate)}${source[0]}`
        source[0] = `${source[source.length - 1].match(INDNT)[0]}${source[0]}`
        const sp = source.map((v) => v.match(INDNT)[0].length)
        const min = Math.min.apply(null, sp)
        return source
            .map((v) => {
                return `${SPACE.repeat((depth + 1) * rate)}${v.replace(SPACE.repeat(min), NONE)}`
            })
            .join(LF)
    }

    try {
        pass[0]++
        fn()
        pass[1]++
        console.log('%S%S%S %S%S', indent, gray, message, green, CHECKMARK)
    } catch (e) {
        console.log('%S%S%S%S%S%S %S// => %S%S', indent, pink, message, LF, yellow, printCode(fn), red, e.message, LF)
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
    if (res !== true) throw new Error(res)
}

assert.ng = function minitest_assert_ng(assertion) {
    let res = typeof assertion === FUNCTION ? assertion() : assertion
    if (res !== false) throw new Error(res)
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
    if (!res) throw new Error(res)
}

module.exports = {
    describe,
    it,
    assert,
    pass
}
