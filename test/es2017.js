const typecheck = require('/lib/typecheck')
const { describe, it, assert, pass } = require('/lib/minitest')

describe('# ECMA2017', () => {
    describe('## Object.values / Object.entries', () => {
        const obj = {
            name: 'simba',
            type: 'cat'
        }
        it('Object.values', () => {
            assert(JSON.stringify(Object.values(obj)) === '["simba","cat"]')
        })
        it('Object.entries', () => {
            assert(
                JSON.stringify(Object.entries(obj)) ===
                    '[["name","simba"],["type","cat"]]'
            )
        })
    })
    describe('## String padding', () => {
        it('"foo".padStart(10) === "       foo"', () => {
            assert('foo'.padStart(10) === '       foo')
        })
        it('"hoge".padStart(10, "foo") === "foofoohoge"', () => {
            assert('hoge'.padStart(10, 'foo') === 'foofoohoge')
        })
        it('"1234".padStart(5, "0") === "01234"', () => {
            assert('1234'.padStart(5, '0') === '01234')
        })
        it('"foo".padEnd(10) === "foo       "', () => {
            assert('foo'.padEnd(10) === 'foo       ')
        })
        it('"hoge".padEnd(10, "foo") === "hogefoofoo"', () => {
            assert('hoge'.padEnd(10, 'foo') === 'hogefoofoo')
        })
        it('"1234".padEnd(5, "0") === "12340"', () => {
            assert('1234'.padEnd(5, '0') === '12340')
        })
    })
    describe('## Trailing commas in function parameter lists and calls', () => {
        it('{ name: "simba", type: "cat", }', () => {
            assert(
                JSON.stringify({ name: 'simba', type: 'cat' }) ===
                    '{"name":"simba","type":"cat"}'
            )
        })
        it('function add ( a, b, ) { return a + b }', () => {
            assert(
                (function add(a, b) {
                    return a + b
                })(2, 3) === 5
            )
        })
    })
    describe('## Object.getOwnPropertyDescriptors', () => {
        it('getOwnPropertyDescriptors', () => {
            const obj = { name: 'simba', type: 'cat' }
            assert(
                JSON.stringify(Object.getOwnPropertyDescriptors(obj)) ===
                    '{"name":{"value":"simba","writable":true,"enumerable":true,"configurable":true},"type":{"value":"cat","writable":true,"enumerable":true,"configurable":true}}'
            )
        })
    })
    /*
    describe( '## Async Functions', () => {
        it( '', () => {
            assert(  )
        } )
    } )
    */
})

return pass
