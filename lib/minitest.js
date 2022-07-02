const { gray, greenBright, redBright, yellowBright, color, clear } = require('ansi')
const { rLINE_SEP, LF, NONE } = require('text')
const inspect = require('inspect')

const orange = color(255, 165, 0)
const purple = color(155, 114, 176)
const options = {
    indent: true,
    colors: true
}

let depth = 0
const indent = '    '
const pass = [0, 0]

function describe(message, callback) {
    depth++
    console.log(LF + indent.repeat(depth) + message)
    callback()
    depth--
}

function it(message, callback) {
    try {
        pass[0]++
        callback()
        pass[1]++
        console.log(indent.repeat(depth) + greenBright + ' ✔ ' + gray + message)
    } catch (e) {
        depth++
        console.print(indent.repeat(depth) + orange + message)
        console.print(
            yellowBright +
            ' ' +
            String(callback)
                .split(rLINE_SEP)
                .join(LF + indent)
        )
        console.log((redBright + ' => ' + e.message).split(rLINE_SEP).join(LF + indent.repeat(depth)))
        depth--
    }
}

class EqualError extends Error {
    constructor(message) {
        super(message)
    }
}
class AssertionError extends Error {
    constructor(message) {
        super(message)
    }
}

function ok(value, message) {
    let result = typeof value === 'function' ? value() : value
    if (result === true) return void 0
    else throw new AssertionError(message || result)
}

function throws(value, expected, message) {
    try {
        if (typeof value === 'function') throw value()
        throw value
    } catch (error) {
        if (error instanceof Error) {
            if (value.constructor === expected) return void 0
            if (error.message === expected) return void 0
            if (expected.constructor === RegExp && expected.test(error.stack)) return void 0
        }
        throw new AssertionError(message || value)
    }
}

function internal_equal(circularReference, expected, actual) {
    if (expected === actual) return void 0
    if (expected == null || actual == null) throw new EqualError()
    if (typeof expected === 'number' && typeof actual === 'number') {
        if (Number.isNaN(expected) && Number.isNaN(actual)) return void 0
        throw new EqualError()
    }
    if (
        (typeof expected === 'string' && typeof actual === 'string') ||
        (typeof expected === 'symbol' && typeof actual === 'symbol')
    )
        throw new EqualError()
    if (
        (typeof expected === 'function' && typeof actual === 'function') ||
        (expected instanceof RegExp && actual instanceof RegExp)
    ) {
        if (String(expected) === String(actual)) return void 0
        throw new EqualError()
    }
    if (expected instanceof Date && actual instanceof Date) {
        if (expected.getTime() === actual.getTime()) return void 0
        throw new EqualError()
    }

    if (circularReference.includes(expected)) throw new EqualError()
    circularReference.push(expected)

    if (!(actual instanceof expected.constructor))
        throw new EqualError('`expected` is a circular reference, so equivalence cannot be checked.')

    Object.keys(expected).map((key) => {
        if (actual == null) throw new EqualError()
        internal_equal(circularReference, expected[key], actual[key])
    })
}

function equal(expected, actual) {
    const circularReference = []
    try {
        internal_equal(circularReference, expected, actual)
        return void 0
    } catch (e) {
        if (e instanceof EqualError && (e.message == null || e.message === NONE)) {
            throw new EqualError(
                `${redBright}expected: ${clear + inspect(expected, options)}${redBright} <> actual: ${clear + inspect(actual, options)
                }`
            )
        } else throw e
    }
}

const assert = ok
assert.ok = ok
assert.throws = throws
assert.equal = equal

module.exports = {
    describe,
    it,
    assert,
    pass
}
