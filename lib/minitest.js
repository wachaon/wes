const { gray, greenBright, redBright, yellowBright, color, clear } = require('ansi')
const { rLINE_SEP, LF, NONE, SPACE, _STRING, _FUNCTION, _NUMBER, _SYMBOL } = require('text')
const inspect = require('inspect')
const { map } = require('utility')
const { get } = require('argv')

const orange = color(255, 165, 0)
const options = {
    indent: true,
    colors: true
}

let depth = 0
const indent = '    '
const pass = [0, 0]
const CHECK = String.fromCharCode(10004)

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
        console.log(indent.repeat(depth) + greenBright + SPACE + CHECK + SPACE + gray + message)
    } catch (e) {
        depth++
        console.print(indent.repeat(depth) + orange + message)
        console.print(
            yellowBright +
                SPACE +
                String(callback)
                    .split(rLINE_SEP)
                    .join(LF + indent)
        )
        let errorMessage = get('stack') || get('s') ? unescapeName(e.stack) : e.message
        console.log((redBright + ' => ' + errorMessage).split(rLINE_SEP).join(LF + indent.repeat(depth)))
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
    let result = typeof value === _FUNCTION ? value() : value
    if (result === true) return void 0
    else throw new AssertionError(message || result)
}

function throws(value, expected, message) {
    try {
        if (typeof value === _FUNCTION) throw value()
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
    if (typeof expected === _NUMBER && typeof actual === _NUMBER) {
        if (Number.isNaN(expected) && Number.isNaN(actual)) return void 0
        throw new EqualError()
    }
    if (
        (typeof expected === _STRING && typeof actual === _STRING) ||
        (typeof expected === _SYMBOL && typeof actual === _SYMBOL)
    )
        throw new EqualError()
    if (
        (typeof expected === _FUNCTION && typeof actual === _FUNCTION) ||
        (expected instanceof RegExp && actual instanceof RegExp)
    ) {
        if (String(expected) === String(actual)) return void 0
        throw new EqualError()
    }
    if (expected instanceof Date && actual instanceof Date) {
        if (expected.getTime() === actual.getTime()) return void 0
        throw new EqualError()
    }

    if (circularReference.includes(expected))
        throw new EqualError('`expected` is a circular reference, so equivalence cannot be checked.')
    circularReference.push(expected)

    if (!(actual instanceof expected.constructor)) throw new EqualError()

    map((value, key) => {
        if (actual == null) throw new EqualError()
        internal_equal(circularReference, value, actual[key])
    })(expected)
}

function equal(expected, actual) {
    const circularReference = []
    try {
        internal_equal(circularReference, expected, actual)
        return void 0
    } catch (e) {
        if (e instanceof EqualError && (e.message == null || e.message === NONE)) {
            throw new EqualError(
                `${redBright}expected: ${clear + inspect(expected, options)}${redBright} <> actual: ${
                    clear + inspect(actual, options)
                }`
            )
        } else throw e
    }
}

// util
function unescapeName(stack) {
    return stack
        .split(rLINE_SEP)
        .join(LF)
        .replace(/ ([A-Z]\$3a\$2f|\$7b)[^ ]+ /g, function unescapeName_replace(_spec) {
            return unescape(_spec.split('$').join('%'))
        })
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
