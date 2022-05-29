const { redBright: red, greenBright: green, yellowBright: yellow, magentaBright: pink, gray } = require('ansi')
const { LF, TAB, rCRLF, SPACE, INDNT, NONE, CHECKMARK } = require('text')

let depth = 0
let indent = NONE
let rate = 4
let pass = [0, 0]

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

const assert = function minitest_assert(assertion) {
    return assert.ok(assertion)
}
assert.ok = function minitest_assert_ok(assertion) {
    let res = typeof assertion === 'function' ? assertion() : assertion
    if (res !== true) throw new Error(res)
}
assert.ng = function minitest_assert_ng(assertion) {
    let res = typeof assertion === 'function' ? assertion() : assertion
    if (res !== false) throw new Error(res)
}

module.exports = {
    describe,
    it,
    assert,
    pass
}
