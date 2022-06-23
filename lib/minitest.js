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

class AssertionError extends Error {
    constructor(message) {
        super(message)
        this.name = 'AssertionError'
    }
}

class AssertThrowsError extends Error {
    constructor(message) {
        super(message)
        this.name = 'AssertThrowsError'
    }
}

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

const assert = function minitest_assert(assertion) {
    return assert.strict(assertion)
}

assert.ok = function minitest_assert_ok(assertion) {
    let res = typeof assertion === FUNCTION ? assertion() : assertion
    if (res) {
    } else throw new AssertionError(inspect(res))
}

assert.ng = function minitest_assert_ng(assertion) {
    let res = typeof assertion === FUNCTION ? assertion() : assertion
    if (res) throw new AssertionError(inspect(res))
}

assert.strict = function minitest_strict(assertion) {
    let res = typeof assertion === FUNCTION ? assertion() : assertion
    if (res !== true) throw new AssertionError(inspect(res))
}

assert.strictNG = function minitest_strict(assertion) {
    let res = typeof assertion === FUNCTION ? assertion() : assertion
    if (res !== false) throw new AssertionError(inspect(res))
}

assert.equal = function equal(actual, expected, message) {
    reference = []
    const result = internal_equal(actual, expected)
    reference = []
    if (result) return void 0
    else throw new AssertionError(message != null ? format(message, actual, expected, result) : result)
}

assert.strictEqual = function strictEqual(actual, expected, message) {
    reference = []
    const result = internal_equal(actual, expected, true)
    reference = []
    if (result) return void 0
    else throw new AssertionError(message != null ? format(message, actual, expected, result) : result)
}

assert.throws = function throws(fn, error, message) {
    try {
        fn()
        throw new AssertThrowsError(message != null ? message : 'assert.throws error')
    } catch (err) {
        if (err instanceof AssertThrowsError) throw err
        if (error != null) {
            if (error.name != null && error.name !== err.name) {
                throw new AssertThrowsError(
                    'Error name is incorrect. Error name is incorrect. Prediction: ' +
                        error.name +
                        ', Actual: ' +
                        err.name
                )
            }
            if (error.message != null && error.message !== err.message) {
                throw new AssertThrowsError(
                    'Error name is incorrect. Error message is incorrect. Prediction: ' +
                        error.message +
                        ', Actual: ' +
                        err.message
                )
            }
        }
    }
}

// util
function format(message, actual, expected, result) {
    return message
        .split('$actual')
        .join(inspect(actual))
        .split('$expected')
        .join(inspect(expected))
        .split('$result')
        .join(inspect(result))
}

function internal_equal(actual, expected, strict) {
    // equivalent
    if (actual === expected) return true

    // If null or undefined.
    if (actual == null || expected == null) return false

    const ctor = actual.constructor
    const exctor = expected.constructor

    // For Number values.
    if (ctor === Number) return Number.isNaN(actual) && Number.isNaN(expected)

    // Primitive types are eliminated here.
    if (ctor === String || ctor === Number || ctor === Boolean || ctor === Symbol) return false

    // For strict mode. check constructor.
    if (strict && (actual !== expected || ctor.name !== exctor.name)) return false

    // For RegExp or Function values.
    if ((ctor === RegExp && exctor === RegExp) || (ctor === Function && exctor === Function))
        return String(actual) === String(expected)

    // For Date values.
    if (ctor === Date) return actual.getTime() === expected.getTime()

    // If the actual is a circular reference but not an equivalence.
    if (reference.includes(actual)) return false

    // Add to array so that circular references can be checked.
    reference.push(actual)

    // Objects are checked recursively.
    const keys = Object.keys(actual)
    if (!keys.length) return !strict

    return keys.every((key) => {
        return internal_equal(actual[key], expected[key], strict)
    })
}

module.exports = {
    describe,
    it,
    assert,
    pass
}
