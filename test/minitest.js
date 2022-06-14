const { describe, it, assert, pass } = require('/lib/minitest')

describe('# test minitest', () => {
    describe('## assert', () => {
        describe('assert.strict // assert', () => {
            it('assert.strict(true)', () => {
                assert.strict(true)
            })
            it('assert.strict(false) // => throw', () => {
                assert.throws(() => assert.strict(false))
            })
            it('assert.strict(undefined) // => throw', () => {
                assert.throws(() => assert.strict(undefined))
            })
            it('assert.strict(null) // => throw', () => {
                assert.throws(() => assert.strict(null))
            })
            it('assert.strict("") // => throw', () => {
                assert.throws(() => assert.strict(""))
            })
            it('assert.strict(1) // => throw', () => {
                assert.throws(() => assert.strict(1))
            })
            it('assert.strict(0) // => throw', () => {
                assert.throws(() => assert.strict(0))
            })
            it('assert.strict(-1) // => throw', () => {
                assert.throws(() => assert.strict(-1))
            })
            it('assert.strict([]) // => throw', () => {
                assert.throws(() => assert.strict([]))
            })
            it('assert.strict({}) // => throw', () => {
                assert.throws(() => assert.strict({}))
            })
        })
        describe('assert.ok', () => {
            it('assert(true)', () => {
                assert(true)
            })
            it('assert.ok(1)', () => {
                assert.ok(1)
            })
            it('assert.ok(false) // => throw', () => {
                assert.throws(() => assert.ok(false))
            })
            it('assert.ok(undefined) // => throw', () => {
                assert.throws(() => assert.ok(undefined))
            })
            it('assert.ok(null) // => throw', () => {
                assert.throws(() => assert.ok(null))
            })
            it('assert.ok("") // => throw', () => {
                assert.throws(() => assert.ok(""))
            })
            it('assert.ok("ok") // => throw', () => {
                assert.throws(() => assert.ok("ok"))
            })
            it('assert.ok(0) // => throw', () => {
                assert.throws(() => assert.ok(0))
            })
            it('assert.ok(-1) // => throw', () => {
                assert.throws(() => assert.ok(-1))
            })
            it('assert.ok([]) // => throw', () => {
                assert.throws(() => assert.ok([]))
            })
            it('assert.ok({}) // => throw', () => {
                assert.throws(() => assert.ok({}))
            })
        })
        describe('## assert.strictNG', () => {
            it('assert.strictNG(false)', () => {
                assert.ng(false)
            })
            it('assert.strictNG(true) // => throw', () => {
                assert.throws(() => assert.strictNG(true))
            })
            it('assert.strictNG(undefined) // => throw', () => {
                assert.throws(() => assert.strictNG(undefined))
            })
            it('assert.strictNG(null) // => throw', () => {
                assert.throws(() => assert.strictNG(null))
            })
            it('assert.strictNG("") // => throw', () => {
                assert.throws(() => assert.strictNG(""))
            })
            it('assert.strictNG("strictNG") // => throw', () => {
                assert.throws(() => assert.strictNG("strictNG"))
            })
            it('assert.strictNG(0) // => throw', () => {
                assert.throws(() => assert.strictNG(0))
            })
            it('assert.strictNG(-1) // => throw', () => {
                assert.throws(() => assert.strictNG(-1))
            })
            it('assert.strictNG([]) // => throw', () => {
                assert.throws(() => assert.strictNG([]))
            })
            it('assert.strictNG({}) // => throw', () => {
                assert.throws(() => assert.strictNG({}))
            })
        })
        describe('## assert.ng', () => {
            it('assert.ng(false)', () => {
                assert.ng(false)
            })
            it('assert.ng(0)', () => {
                assert.ng(0)
            })
            it('assert.ng("")', () => {
                assert.ng("")
            })
            it('assert.ng([])', () => {
                assert.ng([])
            })
            it('assert.ng(true) // => throw', () => {
                assert.throws(() => assert.ng(true))
            })
            it('assert.ng(undefined) // => throw', () => {
                assert.throws(() => assert.ng(undefined))
            })
            it('assert.ng(null) // => throw', () => {
                assert.throws(() => assert.ng(null))
            })
            it('assert.ng("ng") // => throw', () => {
                assert.throws(() => assert.ng("ng"))
            })
            it('assert.ng(-1) // => throw', () => {
                assert.throws(() => assert.ng(-1))
            })
            it('assert.ng({}) // => throw', () => {
                assert.throws(() => assert.ng({}))
            })
        })
        describe('## assert.equal', () => {
            it('assert.equal(null, null)', () => {
                assert.equal(null, null)
            })
            it('assert.equal(undefined, undefined)', () => {
                assert.equal(undefined, undefined)
            })
            it('assert.equal("string", "string")', () => {
                assert.equal("string", "string")
            })
            it('assert.equal(0, 0)', () => {
                assert.equal(0, 0)
            })
            it('assert.equal(1, 1)', () => {
                assert.equal(1, 1)
            })
            it('assert.equal(Infinity, Infinity)', () => {
                assert.equal(Infinity, Infinity)
            })
            it('assert.equal(1 / 3, 1 / 3)', () => {
                assert.equal(1 / 3, 1 / 3)
            })
            it('assert.equal(NaN, NaN)', () => {
                assert.equal(NaN, NaN)
            })
            it('assert.equal(true, true)', () => {
                assert.equal(true, true)
            })
            it('assert.equal(false, false)', () => {
                assert.equal(false, false)
            })
            it('assert.equal(Symbol.for("one"), Symbol.for("one"))', () => {
                assert.equal(Symbol.for("one"), Symbol.for("one"))
            })
            it('assert.equal(date1, date2)', () => {
                const date1 = new Date
                const date2 = new Date(date1)
                assert.equal(date1, date2)
            })
            it('assert.equal(() => {}, () => {})', () => {
                assert.equal(() => { }, () => { })
            })
            it('assert.equal(function () {}, function () {})', () => {
                assert.equal(function () { }, function () { })
            })
            it('assert.equal(/RegExp/i, /RegExp/i)', () => {
                assert.equal(/RegExp/i, /RegExp/i)
            })

            it('assert.equal(new one("wes"), new one("wes"))', () => {
                class one {
                    constructor(name) {
                        this.name = name
                    }
                    say() {
                        return this.name
                    }
                }
                assert.equal(new one("wes"), new one("wes"))
            })
            it('assert.equal(new one("wes"), new two("wes"))', () => {
                class one {
                    constructor(name) {
                        this.name = name
                    }
                    say() {
                        return this.name
                    }
                }

                class two {
                    constructor(name) {
                        this.name = name
                    }
                }
                assert.equal(new one("wes"), new two("wes"))
            })
            it('assert.equal([1, "one", () => value], [1, "one", () => value])', () => {
                assert.equal([1, "one", () => value], [1, "one", () => value])
            })
            it('assert.equal({ one: 1, two: { three: 3, four: { five: /runnin/g } } }, { one: 1, two: { three: 3, four: { five: /runnin/g } } })', () => {
                assert.equal({ one: 1, two: { three: 3, four: { five: /runnin/g } } }, { one: 1, two: { three: 3, four: { five: /runnin/g } } })
            })
        })
        describe('## assert.strictEqual', () => {
            it('assert.strictEqual(null, null)', () => {
                assert.strictEqual(null, null)
            })
            it('assert.strictEqual(undefined, undefined)', () => {
                assert.strictEqual(undefined, undefined)
            })
            it('assert.strictEqual("string", "string")', () => {
                assert.strictEqual("string", "string")
            })
            it('assert.strictEqual(0, 0)', () => {
                assert.strictEqual(0, 0)
            })
            it('assert.strictEqual(1, 1)', () => {
                assert.strictEqual(1, 1)
            })
            it('assert.strictEqual(Infinity, Infinity)', () => {
                assert.strictEqual(Infinity, Infinity)
            })
            it('assert.strictEqual(1 / 3, 1 / 3)', () => {
                assert.strictEqual(1 / 3, 1 / 3)
            })
            it('assert.strictEqual(NaN, NaN)', () => {
                assert.strictEqual(NaN, NaN)
            })
            it('assert.strictEqual(true, true)', () => {
                assert.strictEqual(true, true)
            })
            it('assert.strictEqual(false, false)', () => {
                assert.strictEqual(false, false)
            })
            it('assert.strictEqual(Symbol.for("one"), Symbol.for("one"))', () => {
                assert.strictEqual(Symbol.for("one"), Symbol.for("one"))
            })

        })
    })
})
