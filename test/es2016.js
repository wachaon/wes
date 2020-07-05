const typecheck = require('/lib/typecheck')
const { describe, it, assert, pass } = require('/lib/minitest')

describe('# ECMA2016', () => {
    describe('## Array.prototype.includes', () => {
        it('[1, 2, 3].includes(2) === true', () => {
            assert([1, 2, 3].includes(2) === true)
        })
        it('[1, 2, 3].includes(4) === false', () => {
            assert([1, 2, 3].includes(4) === false)
        })
        it('[1, 2, NaN].includes(NaN) === true', () => {
            assert([1, 2, NaN].includes(NaN) === true)
        })
        it('[1, 2, -0].includes(+0) === true', () => {
            assert([1, 2, -0].includes(+0) === true)
        })
        it('[1, 2, +0].includes(-0) === true', () => {
            assert([1, 2, +0].includes(-0) === true)
        })
        it('["a", "b", "c"].includes("a") === true', () => {
            assert(['a', 'b', 'c'].includes('a') === true)
        })
        it('["a", "b", "c"].includes("a", 1) === false', () => {
            assert(['a', 'b', 'c'].includes('a', 1) === false)
        })
    })

    describe('## Exponentiation Operator', () => {
        it('2 ** 2 === 4', () => {
            assert(2 ** 2 === 4)
        })
    })

    describe('## Exponentiation Operator', () => {
        it('let a = 2; a **= 2 === 4', () => {
            let a = 2
            assert((a **= 2) === 4)
        })
    })
})

return pass
