const typecheck = require('/lib/typecheck')
const { describe, it, assert, pass } = require('/lib/minitest')
const { STRING, FUNCTION } = require('/lib/text')
const log = require('log')

describe("# typecheck", () => {

    describe("## isNull", () => {
        const { isNull } = typecheck

        it("isNull(null) === true", () => {
            assert(isNull(null) === true)
        })
        it("isNull(undefined) === false", () => {
            assert(isNull(undefined) === false)
        })
        it("isNull('string') === false", () => {
            assert(isNull('string') === false)
        })
        it("isNull(1) === false", () => {
            assert(isNull(1) === false)
        })
        it("isNull(true) === false", () => {
            assert(isNull(true) === false)
        })
        it("isNull(Symbol()) === false", () => {
            assert(isNull(Symbol()) === false)
        })
        it("isNull(new Date) === false", () => {
            assert(isNull(new Date) === false)
        })
        it("isNull(/RegExp/) === false", () => {
            assert(isNull(/RegExp/) === false)
        })
        it("isNull(function () { }) === false", () => {
            assert(isNull(function () { }) === false)
        })
        it("isNull(async function () { }) === false", () => {
            assert(isNull(async function () { }) === false)
        })
        it("isNull(function* () { }) === false", () => {
            assert(isNull(function* () { }) === false)
        })
        it("isNull({}) === false", () => {
            assert(isNull({}) === false)
        })
        it("isNull(new Map) === false", () => {
            assert(isNull(new Map) === false)
        })
        it("isNull(new Set) === false", () => {
            assert(isNull(new Set) === false)
        })
        it("isNull(new WeakMap) === false", () => {
            assert(isNull(new WeakMap) === false)
        })
        it("isNull(new WeakSet) === false", () => {
            assert(isNull(new WeakSet) === false)
        })
        it("isNull([]) === false", () => {
            assert(isNull([]) === false)
        })
        it("isNull(new Int8Array) === false", () => {
            assert(isNull(new Int8Array) === false)
        })
        it("isNull(new Int16Array) === false", () => {
            assert(isNull(new Int16Array) === false)
        })
        it("isNull(new Int32Array) === false", () => {
            assert(isNull(new Int32Array) === false)
        })
        it("isNull(new Uint8Array) === false", () => {
            assert(isNull(new Uint8Array) === false)
        })
        it("isNull(new Uint16Array) === false", () => {
            assert(isNull(new Uint16Array) === false)
        })
        it("isNull(new Uint32Array) === false", () => {
            assert(isNull(new Uint32Array) === false)
        })
        it("isNull(new Float32Array) === false", () => {
            assert(isNull(new Float32Array) === false)
        })
        it("isNull(new Float64Array) === false", () => {
            assert(isNull(new Float64Array) === false)
        })
        it("isNull(new ArrayBuffer) === false", () => {
            assert(isNull(new ArrayBuffer) === false)
        })
        it("isNull(new DataView(new ArrayBuffer(2))) === false", () => {
            assert(isNull(new DataView(new ArrayBuffer(2))) === false)
        })
    })

    describe("## isUndefined", () => {
        const { isUndefined } = typecheck

        it("isUndefined(null) === false", () => {
            assert(isUndefined(null) === false)
        })
        it("isUndefined(undefined) === true", () => {
            assert(isUndefined(undefined) === true)
        })
        it("isUndefined('string') === false", () => {
            assert(isUndefined('string') === false)
        })
        it("isUndefined(1) === false", () => {
            assert(isUndefined(1) === false)
        })
        it("isUndefined(true) === false", () => {
            assert(isUndefined(true) === false)
        })
        it("isUndefined(Symbol()) === false", () => {
            assert(isUndefined(Symbol()) === false)
        })
        it("isUndefined(new Date) === false", () => {
            assert(isUndefined(new Date) === false)
        })
        it("isUndefined(/RegExp/) === false", () => {
            assert(isUndefined(/RegExp/) === false)
        })
        it("isUndefined(function () { }) === false", () => {
            assert(isUndefined(function () { }) === false)
        })
        it("isUndefined(async function () { }) === false", () => {
            assert(isUndefined(async function () { }) === false)
        })
        it("isUndefined(function* () { }) === false", () => {
            assert(isUndefined(function* () { }) === false)
        })
        it("isUndefined({}) === false", () => {
            assert(isUndefined({}) === false)
        })
        it("isUndefined(new Map) === false", () => {
            assert(isUndefined(new Map) === false)
        })
        it("isUndefined(new Set) === false", () => {
            assert(isUndefined(new Set) === false)
        })
        it("isUndefined(new WeakMap) === false", () => {
            assert(isUndefined(new WeakMap) === false)
        })
        it("isUndefined(new WeakSet) === false", () => {
            assert(isUndefined(new WeakSet) === false)
        })
        it("isUndefined([]) === false", () => {
            assert(isUndefined([]) === false)
        })
        it("isUndefined(new Int8Array) === false", () => {
            assert(isUndefined(new Int8Array) === false)
        })
        it("isUndefined(new Int16Array) === false", () => {
            assert(isUndefined(new Int16Array) === false)
        })
        it("isUndefined(new Int32Array) === false", () => {
            assert(isUndefined(new Int32Array) === false)
        })
        it("isUndefined(new Uint8Array) === false", () => {
            assert(isUndefined(new Uint8Array) === false)
        })
        it("isUndefined(new Uint16Array) === false", () => {
            assert(isUndefined(new Uint16Array) === false)
        })
        it("isUndefined(new Uint32Array) === false", () => {
            assert(isUndefined(new Uint32Array) === false)
        })
        it("isUndefined(new Float32Array) === false", () => {
            assert(isUndefined(new Float32Array) === false)
        })
        it("isUndefined(new Float64Array) === false", () => {
            assert(isUndefined(new Float64Array) === false)
        })
        it("isUndefined(new ArrayBuffer) === false", () => {
            assert(isUndefined(new ArrayBuffer) === false)
        })
        it("isUndefined(new DataView(new ArrayBuffer(2))) === false", () => {
            assert(isUndefined(new DataView(new ArrayBuffer(2))) === false)
        })
    })

    describe("## isString", () => {
        const { isString } = typecheck

        it("isString(null) === false", () => {
            assert(isString(null) === false)
        })
        it("isString(undefined) === false", () => {
            assert(isString(undefined) === false)
        })
        it("isString('string') === true", () => {
            assert(isString('string') === true)
        })
        it("isString(1) === false", () => {
            assert(isString(1) === false)
        })
        it("isString(true) === false", () => {
            assert(isString(true) === false)
        })
        it("isString(Symbol()) === false", () => {
            assert(isString(Symbol()) === false)
        })
        it("isString(new Date) === false", () => {
            assert(isString(new Date) === false)
        })
        it("isString(/RegExp/) === false", () => {
            assert(isString(/RegExp/) === false)
        })
        it("isString(function () { }) === false", () => {
            assert(isString(function () { }) === false)
        })
        it("isString(async function () { }) === false", () => {
            assert(isString(async function () { }) === false)
        })
        it("isString(function* () { }) === false", () => {
            assert(isString(function* () { }) === false)
        })
        it("isString({}) === false", () => {
            assert(isString({}) === false)
        })
        it("isString(new Map) === false", () => {
            assert(isString(new Map) === false)
        })
        it("isString(new Set) === false", () => {
            assert(isString(new Set) === false)
        })
        it("isString(new WeakMap) === false", () => {
            assert(isString(new WeakMap) === false)
        })
        it("isString(new WeakSet) === false", () => {
            assert(isString(new WeakSet) === false)
        })
        it("isString([]) === false", () => {
            assert(isString([]) === false)
        })
        it("isString(new Int8Array) === false", () => {
            assert(isString(new Int8Array) === false)
        })
        it("isString(new Int16Array) === false", () => {
            assert(isString(new Int16Array) === false)
        })
        it("isString(new Int32Array) === false", () => {
            assert(isString(new Int32Array) === false)
        })
        it("isString(new Uint8Array) === false", () => {
            assert(isString(new Uint8Array) === false)
        })
        it("isString(new Uint16Array) === false", () => {
            assert(isString(new Uint16Array) === false)
        })
        it("isString(new Uint32Array) === false", () => {
            assert(isString(new Uint32Array) === false)
        })
        it("isString(new Float32Array) === false", () => {
            assert(isString(new Float32Array) === false)
        })
        it("isString(new Float64Array) === false", () => {
            assert(isString(new Float64Array) === false)
        })
        it("isString(new ArrayBuffer) === false", () => {
            assert(isString(new ArrayBuffer) === false)
        })
        it("isString(new DataView(new ArrayBuffer(2))) === false", () => {
            assert(isString(new DataView(new ArrayBuffer(2))) === false)
        })
    })

    describe("## isNumber", () => {
        const { isNumber } = typecheck

        it('isNumber(NaN) === true', () => {
            assert(isNumber(NaN))
        })
        it('isNumber(Infinity) === true', () => {
            assert(isNumber(Infinity) === true)
        })
        it('isNumber( "8" ) === false', () => {
            assert(isNumber('8') === false)
        })

        it("isNumber(null) === false", () => {
            assert(isNumber(null) === false)
        })
        it("isNumber(undefined) === false", () => {
            assert(isNumber(undefined) === false)
        })
        it("isNumber('string') === false", () => {
            assert(isNumber('string') === false)
        })
        it("isNumber(1) === true", () => {
            assert(isNumber(1) === true)
        })
        it("isNumber(true) === false", () => {
            assert(isNumber(true) === false)
        })
        it("isNumber(Symbol()) === false", () => {
            assert(isNumber(Symbol()) === false)
        })
        it("isNumber(new Date) === false", () => {
            assert(isNumber(new Date) === false)
        })
        it("isNumber(/RegExp/) === false", () => {
            assert(isNumber(/RegExp/) === false)
        })
        it("isNumber(function () { }) === false", () => {
            assert(isNumber(function () { }) === false)
        })
        it("isNumber(async function () { }) === false", () => {
            assert(isNumber(async function () { }) === false)
        })
        it("isNumber(function* () { }) === false", () => {
            assert(isNumber(function* () { }) === false)
        })
        it("isNumber({}) === false", () => {
            assert(isNumber({}) === false)
        })
        it("isNumber(new Map) === false", () => {
            assert(isNumber(new Map) === false)
        })
        it("isNumber(new Set) === false", () => {
            assert(isNumber(new Set) === false)
        })
        it("isNumber(new WeakMap) === false", () => {
            assert(isNumber(new WeakMap) === false)
        })
        it("isNumber(new WeakSet) === false", () => {
            assert(isNumber(new WeakSet) === false)
        })
        it("isNumber([]) === false", () => {
            assert(isNumber([]) === false)
        })
        it("isNumber(new Int8Array) === false", () => {
            assert(isNumber(new Int8Array) === false)
        })
        it("isNumber(new Int16Array) === false", () => {
            assert(isNumber(new Int16Array) === false)
        })
        it("isNumber(new Int32Array) === false", () => {
            assert(isNumber(new Int32Array) === false)
        })
        it("isNumber(new Uint8Array) === false", () => {
            assert(isNumber(new Uint8Array) === false)
        })
        it("isNumber(new Uint16Array) === false", () => {
            assert(isNumber(new Uint16Array) === false)
        })
        it("isNumber(new Uint32Array) === false", () => {
            assert(isNumber(new Uint32Array) === false)
        })
        it("isNumber(new Float32Array) === false", () => {
            assert(isNumber(new Float32Array) === false)
        })
        it("isNumber(new Float64Array) === false", () => {
            assert(isNumber(new Float64Array) === false)
        })
        it("isNumber(new ArrayBuffer) === false", () => {
            assert(isNumber(new ArrayBuffer) === false)
        })
        it("isNumber(new DataView(new ArrayBuffer(2))) === false", () => {
            assert(isNumber(new DataView(new ArrayBuffer(2))) === false)
        })
    })

    describe("## isBoolean", () => {
        const { isBoolean } = typecheck

        it('isBoolean(false) === true', () => {
            assert(isBoolean(false) === true)
        })
        it('isBoolean( 1 ) === false', () => {
            assert(isBoolean(1) === false)
        })

        it("isBoolean(null) === false", () => {
            assert(isBoolean(null) === false)
        })
        it("isBoolean(undefined) === false", () => {
            assert(isBoolean(undefined) === false)
        })
        it("isBoolean('string') === false", () => {
            assert(isBoolean('string') === false)
        })
        it("isBoolean(1) === false", () => {
            assert(isBoolean(1) === false)
        })
        it("isBoolean(true) === true", () => {
            assert(isBoolean(true) === true)
        })
        it("isBoolean(Symbol()) === false", () => {
            assert(isBoolean(Symbol()) === false)
        })
        it("isBoolean(new Date) === false", () => {
            assert(isBoolean(new Date) === false)
        })
        it("isBoolean(/RegExp/) === false", () => {
            assert(isBoolean(/RegExp/) === false)
        })
        it("isBoolean(function () { }) === false", () => {
            assert(isBoolean(function () { }) === false)
        })
        it("isBoolean(async function () { }) === false", () => {
            assert(isBoolean(async function () { }) === false)
        })
        it("isBoolean(function* () { }) === false", () => {
            assert(isBoolean(function* () { }) === false)
        })
        it("isBoolean({}) === false", () => {
            assert(isBoolean({}) === false)
        })
        it("isBoolean(new Map) === false", () => {
            assert(isBoolean(new Map) === false)
        })
        it("isBoolean(new Set) === false", () => {
            assert(isBoolean(new Set) === false)
        })
        it("isBoolean(new WeakMap) === false", () => {
            assert(isBoolean(new WeakMap) === false)
        })
        it("isBoolean(new WeakSet) === false", () => {
            assert(isBoolean(new WeakSet) === false)
        })
        it("isBoolean([]) === false", () => {
            assert(isBoolean([]) === false)
        })
        it("isBoolean(new Int8Array) === false", () => {
            assert(isBoolean(new Int8Array) === false)
        })
        it("isBoolean(new Int16Array) === false", () => {
            assert(isBoolean(new Int16Array) === false)
        })
        it("isBoolean(new Int32Array) === false", () => {
            assert(isBoolean(new Int32Array) === false)
        })
        it("isBoolean(new Uint8Array) === false", () => {
            assert(isBoolean(new Uint8Array) === false)
        })
        it("isBoolean(new Uint16Array) === false", () => {
            assert(isBoolean(new Uint16Array) === false)
        })
        it("isBoolean(new Uint32Array) === false", () => {
            assert(isBoolean(new Uint32Array) === false)
        })
        it("isBoolean(new Float32Array) === false", () => {
            assert(isBoolean(new Float32Array) === false)
        })
        it("isBoolean(new Float64Array) === false", () => {
            assert(isBoolean(new Float64Array) === false)
        })
        it("isBoolean(new ArrayBuffer) === false", () => {
            assert(isBoolean(new ArrayBuffer) === false)
        })
        it("isBoolean(new DataView(new ArrayBuffer(2))) === false", () => {
            assert(isBoolean(new DataView(new ArrayBuffer(2))) === false)
        })
    })

    describe("## isSymbol", () => {
        const { isSymbol } = typecheck

        it("isSymbol(null) === false", () => {
            assert(isSymbol(null) === false)
        })
        it("isSymbol(undefined) === false", () => {
            assert(isSymbol(undefined) === false)
        })
        it("isSymbol('string') === false", () => {
            assert(isSymbol('string') === false)
        })
        it("isSymbol(1) === false", () => {
            assert(isSymbol(1) === false)
        })
        it("isSymbol(true) === false", () => {
            assert(isSymbol(true) === false)
        })
        it("isSymbol(Symbol()) === true", () => {
            assert(isSymbol(Symbol()) === true)
        })
        it("isSymbol(new Date) === false", () => {
            assert(isSymbol(new Date) === false)
        })
        it("isSymbol(/RegExp/) === false", () => {
            assert(isSymbol(/RegExp/) === false)
        })
        it("isSymbol(function () { }) === false", () => {
            assert(isSymbol(function () { }) === false)
        })
        it("isSymbol(async function () { }) === false", () => {
            assert(isSymbol(async function () { }) === false)
        })
        it("isSymbol(function* () { }) === false", () => {
            assert(isSymbol(function* () { }) === false)
        })
        it("isSymbol({}) === false", () => {
            assert(isSymbol({}) === false)
        })
        it("isSymbol(new Map) === false", () => {
            assert(isSymbol(new Map) === false)
        })
        it("isSymbol(new Set) === false", () => {
            assert(isSymbol(new Set) === false)
        })
        it("isSymbol(new WeakMap) === false", () => {
            assert(isSymbol(new WeakMap) === false)
        })
        it("isSymbol(new WeakSet) === false", () => {
            assert(isSymbol(new WeakSet) === false)
        })
        it("isSymbol([]) === false", () => {
            assert(isSymbol([]) === false)
        })
        it("isSymbol(new Int8Array) === false", () => {
            assert(isSymbol(new Int8Array) === false)
        })
        it("isSymbol(new Int16Array) === false", () => {
            assert(isSymbol(new Int16Array) === false)
        })
        it("isSymbol(new Int32Array) === false", () => {
            assert(isSymbol(new Int32Array) === false)
        })
        it("isSymbol(new Uint8Array) === false", () => {
            assert(isSymbol(new Uint8Array) === false)
        })
        it("isSymbol(new Uint16Array) === false", () => {
            assert(isSymbol(new Uint16Array) === false)
        })
        it("isSymbol(new Uint32Array) === false", () => {
            assert(isSymbol(new Uint32Array) === false)
        })
        it("isSymbol(new Float32Array) === false", () => {
            assert(isSymbol(new Float32Array) === false)
        })
        it("isSymbol(new Float64Array) === false", () => {
            assert(isSymbol(new Float64Array) === false)
        })
        it("isSymbol(new ArrayBuffer) === false", () => {
            assert(isSymbol(new ArrayBuffer) === false)
        })
        it("isSymbol(new DataView(new ArrayBuffer(2))) === false", () => {
            assert(isSymbol(new DataView(new ArrayBuffer(2))) === false)
        })
    })

    describe("## isDate", () => {
        const { isDate } = typecheck

        it('isDate( new Date().getTime() ) === false', () => {
            assert(isDate(new Date().getTime()) === false)
        })


        it("isDate(null) === false", () => {
            assert(isDate(null) === false)
        })
        it("isDate(undefined) === false", () => {
            assert(isDate(undefined) === false)
        })
        it("isDate('string') === false", () => {
            assert(isDate('string') === false)
        })
        it("isDate(1) === false", () => {
            assert(isDate(1) === false)
        })
        it("isDate(true) === false", () => {
            assert(isDate(true) === false)
        })
        it("isDate(Symbol()) === false", () => {
            assert(isDate(Symbol()) === false)
        })
        it("isDate(new Date) === true", () => {
            assert(isDate(new Date) === true)
        })
        it("isDate(/RegExp/) === false", () => {
            assert(isDate(/RegExp/) === false)
        })
        it("isDate(function () { }) === false", () => {
            assert(isDate(function () { }) === false)
        })
        it("isDate(async function () { }) === false", () => {
            assert(isDate(async function () { }) === false)
        })
        it("isDate(function* () { }) === false", () => {
            assert(isDate(function* () { }) === false)
        })
        it("isDate({}) === false", () => {
            assert(isDate({}) === false)
        })
        it("isDate(new Map) === false", () => {
            assert(isDate(new Map) === false)
        })
        it("isDate(new Set) === false", () => {
            assert(isDate(new Set) === false)
        })
        it("isDate(new WeakMap) === false", () => {
            assert(isDate(new WeakMap) === false)
        })
        it("isDate(new WeakSet) === false", () => {
            assert(isDate(new WeakSet) === false)
        })
        it("isDate([]) === false", () => {
            assert(isDate([]) === false)
        })
        it("isDate(new Int8Array) === false", () => {
            assert(isDate(new Int8Array) === false)
        })
        it("isDate(new Int16Array) === false", () => {
            assert(isDate(new Int16Array) === false)
        })
        it("isDate(new Int32Array) === false", () => {
            assert(isDate(new Int32Array) === false)
        })
        it("isDate(new Uint8Array) === false", () => {
            assert(isDate(new Uint8Array) === false)
        })
        it("isDate(new Uint16Array) === false", () => {
            assert(isDate(new Uint16Array) === false)
        })
        it("isDate(new Uint32Array) === false", () => {
            assert(isDate(new Uint32Array) === false)
        })
        it("isDate(new Float32Array) === false", () => {
            assert(isDate(new Float32Array) === false)
        })
        it("isDate(new Float64Array) === false", () => {
            assert(isDate(new Float64Array) === false)
        })
        it("isDate(new ArrayBuffer) === false", () => {
            assert(isDate(new ArrayBuffer) === false)
        })
        it("isDate(new DataView(new ArrayBuffer(2))) === false", () => {
            assert(isDate(new DataView(new ArrayBuffer(2))) === false)
        })
    })

    describe("## isRegExp", () => {
        const { isRegExp } = typecheck

        it('isRegExp(new RegExp( "RegExp" )) === true', () => {
            assert(isRegExp(new RegExp("RegExp")) === true)
        })
        it('isRegExp( "RegExp" ) === false', () => {
            assert(isRegExp('RegExp') === false)
        })

        it("isRegExp(null) === false", () => {
            assert(isRegExp(null) === false)
        })
        it("isRegExp(undefined) === false", () => {
            assert(isRegExp(undefined) === false)
        })
        it("isRegExp('string') === false", () => {
            assert(isRegExp('string') === false)
        })
        it("isRegExp(1) === false", () => {
            assert(isRegExp(1) === false)
        })
        it("isRegExp(true) === false", () => {
            assert(isRegExp(true) === false)
        })
        it("isRegExp(Symbol()) === false", () => {
            assert(isRegExp(Symbol()) === false)
        })
        it("isRegExp(new Date) === false", () => {
            assert(isRegExp(new Date) === false)
        })
        it("isRegExp(/RegExp/) === true", () => {
            assert(isRegExp(/RegExp/) === true)
        })
        it("isRegExp(function () { }) === false", () => {
            assert(isRegExp(function () { }) === false)
        })
        it("isRegExp(async function () { }) === false", () => {
            assert(isRegExp(async function () { }) === false)
        })
        it("isRegExp(function* () { }) === false", () => {
            assert(isRegExp(function* () { }) === false)
        })
        it("isRegExp({}) === false", () => {
            assert(isRegExp({}) === false)
        })
        it("isRegExp(new Map) === false", () => {
            assert(isRegExp(new Map) === false)
        })
        it("isRegExp(new Set) === false", () => {
            assert(isRegExp(new Set) === false)
        })
        it("isRegExp(new WeakMap) === false", () => {
            assert(isRegExp(new WeakMap) === false)
        })
        it("isRegExp(new WeakSet) === false", () => {
            assert(isRegExp(new WeakSet) === false)
        })
        it("isRegExp([]) === false", () => {
            assert(isRegExp([]) === false)
        })
        it("isRegExp(new Int8Array) === false", () => {
            assert(isRegExp(new Int8Array) === false)
        })
        it("isRegExp(new Int16Array) === false", () => {
            assert(isRegExp(new Int16Array) === false)
        })
        it("isRegExp(new Int32Array) === false", () => {
            assert(isRegExp(new Int32Array) === false)
        })
        it("isRegExp(new Uint8Array) === false", () => {
            assert(isRegExp(new Uint8Array) === false)
        })
        it("isRegExp(new Uint16Array) === false", () => {
            assert(isRegExp(new Uint16Array) === false)
        })
        it("isRegExp(new Uint32Array) === false", () => {
            assert(isRegExp(new Uint32Array) === false)
        })
        it("isRegExp(new Float32Array) === false", () => {
            assert(isRegExp(new Float32Array) === false)
        })
        it("isRegExp(new Float64Array) === false", () => {
            assert(isRegExp(new Float64Array) === false)
        })
        it("isRegExp(new ArrayBuffer) === false", () => {
            assert(isRegExp(new ArrayBuffer) === false)
        })
        it("isRegExp(new DataView(new ArrayBuffer(2))) === false", () => {
            assert(isRegExp(new DataView(new ArrayBuffer(2))) === false)
        })
    })

    describe("## isFunction", () => {
        const { isFunction } = typecheck

        it('isFunction(() => {}) === true', () => {
            assert(isFunction(() => { }))
        })
        it('isFunction(String) === true', () => {
            assert(isFunction(String) === true)
        })
        it('isFunction(typecheck.isFunction) === true', () => {
            assert(isFunction(typecheck.isFunction) === true)
        })
        it('isFunction(class {constructor(){}}) === true', () => {
            assert(
                isFunction(
                    class {
                        constructor() { }
                    }
                )
            )
        })

        it("isFunction(null) === false", () => {
            assert(isFunction(null) === false)
        })
        it("isFunction(undefined) === false", () => {
            assert(isFunction(undefined) === false)
        })
        it("isFunction('string') === false", () => {
            assert(isFunction('string') === false)
        })
        it("isFunction(1) === false", () => {
            assert(isFunction(1) === false)
        })
        it("isFunction(true) === false", () => {
            assert(isFunction(true) === false)
        })
        it("isFunction(Symbol()) === false", () => {
            assert(isFunction(Symbol()) === false)
        })
        it("isFunction(new Date) === false", () => {
            assert(isFunction(new Date) === false)
        })
        it("isFunction(/RegExp/) === false", () => {
            assert(isFunction(/RegExp/) === false)
        })
        it("isFunction(function () { }) === true", () => {
            assert(isFunction(function () { }) === true)
        })
        it("isFunction(async function () { }) === true", () => {
            assert(isFunction(async function () { }) === true)
        })
        it("isFunction(function* () { }) === true", () => {
            assert(isFunction(function* () { }) === true)
        })
        it("isFunction({}) === false", () => {
            assert(isFunction({}) === false)
        })
        it("isFunction(new Map) === false", () => {
            assert(isFunction(new Map) === false)
        })
        it("isFunction(new Set) === false", () => {
            assert(isFunction(new Set) === false)
        })
        it("isFunction(new WeakMap) === false", () => {
            assert(isFunction(new WeakMap) === false)
        })
        it("isFunction(new WeakSet) === false", () => {
            assert(isFunction(new WeakSet) === false)
        })
        it("isFunction([]) === false", () => {
            assert(isFunction([]) === false)
        })
        it("isFunction(new Int8Array) === false", () => {
            assert(isFunction(new Int8Array) === false)
        })
        it("isFunction(new Int16Array) === false", () => {
            assert(isFunction(new Int16Array) === false)
        })
        it("isFunction(new Int32Array) === false", () => {
            assert(isFunction(new Int32Array) === false)
        })
        it("isFunction(new Uint8Array) === false", () => {
            assert(isFunction(new Uint8Array) === false)
        })
        it("isFunction(new Uint16Array) === false", () => {
            assert(isFunction(new Uint16Array) === false)
        })
        it("isFunction(new Uint32Array) === false", () => {
            assert(isFunction(new Uint32Array) === false)
        })
        it("isFunction(new Float32Array) === false", () => {
            assert(isFunction(new Float32Array) === false)
        })
        it("isFunction(new Float64Array) === false", () => {
            assert(isFunction(new Float64Array) === false)
        })
        it("isFunction(new ArrayBuffer) === false", () => {
            assert(isFunction(new ArrayBuffer) === false)
        })
        it("isFunction(new DataView(new ArrayBuffer(2))) === false", () => {
            assert(isFunction(new DataView(new ArrayBuffer(2))) === false)
        })
    })

    describe("## isAsyncFunction", () => {
        const { isAsyncFunction } = typecheck

        it("isAsyncFunction(null) === false", () => {
            assert(isAsyncFunction(null) === false)
        })
        it("isAsyncFunction(undefined) === false", () => {
            assert(isAsyncFunction(undefined) === false)
        })
        it("isAsyncFunction('string') === false", () => {
            assert(isAsyncFunction('string') === false)
        })
        it("isAsyncFunction(1) === false", () => {
            assert(isAsyncFunction(1) === false)
        })
        it("isAsyncFunction(true) === false", () => {
            assert(isAsyncFunction(true) === false)
        })
        it("isAsyncFunction(Symbol()) === false", () => {
            assert(isAsyncFunction(Symbol()) === false)
        })
        it("isAsyncFunction(new Date) === false", () => {
            assert(isAsyncFunction(new Date) === false)
        })
        it("isAsyncFunction(/RegExp/) === false", () => {
            assert(isAsyncFunction(/RegExp/) === false)
        })
        it("isAsyncFunction(function () { }) === false", () => {
            assert(isAsyncFunction(function () { }) === false)
        })
        it("isAsyncFunction(async function () { }) === true", () => {
            assert(isAsyncFunction(async function () { }) === true)
        })
        it("isAsyncFunction(function* () { }) === false", () => {
            assert(isAsyncFunction(function* () { }) === false)
        })
        it("isAsyncFunction({}) === false", () => {
            assert(isAsyncFunction({}) === false)
        })
        it("isAsyncFunction(new Map) === false", () => {
            assert(isAsyncFunction(new Map) === false)
        })
        it("isAsyncFunction(new Set) === false", () => {
            assert(isAsyncFunction(new Set) === false)
        })
        it("isAsyncFunction(new WeakMap) === false", () => {
            assert(isAsyncFunction(new WeakMap) === false)
        })
        it("isAsyncFunction(new WeakSet) === false", () => {
            assert(isAsyncFunction(new WeakSet) === false)
        })
        it("isAsyncFunction([]) === false", () => {
            assert(isAsyncFunction([]) === false)
        })
        it("isAsyncFunction(new Int8Array) === false", () => {
            assert(isAsyncFunction(new Int8Array) === false)
        })
        it("isAsyncFunction(new Int16Array) === false", () => {
            assert(isAsyncFunction(new Int16Array) === false)
        })
        it("isAsyncFunction(new Int32Array) === false", () => {
            assert(isAsyncFunction(new Int32Array) === false)
        })
        it("isAsyncFunction(new Uint8Array) === false", () => {
            assert(isAsyncFunction(new Uint8Array) === false)
        })
        it("isAsyncFunction(new Uint16Array) === false", () => {
            assert(isAsyncFunction(new Uint16Array) === false)
        })
        it("isAsyncFunction(new Uint32Array) === false", () => {
            assert(isAsyncFunction(new Uint32Array) === false)
        })
        it("isAsyncFunction(new Float32Array) === false", () => {
            assert(isAsyncFunction(new Float32Array) === false)
        })
        it("isAsyncFunction(new Float64Array) === false", () => {
            assert(isAsyncFunction(new Float64Array) === false)
        })
        it("isAsyncFunction(new ArrayBuffer) === false", () => {
            assert(isAsyncFunction(new ArrayBuffer) === false)
        })
        it("isAsyncFunction(new DataView(new ArrayBuffer(2))) === false", () => {
            assert(isAsyncFunction(new DataView(new ArrayBuffer(2))) === false)
        })
    })

    describe("## isGeneratorFunction", () => {
        const { isGeneratorFunction } = typecheck

        it("isGeneratorFunction(null) === false", () => {
            assert(isGeneratorFunction(null) === false)
        })
        it("isGeneratorFunction(undefined) === false", () => {
            assert(isGeneratorFunction(undefined) === false)
        })
        it("isGeneratorFunction('string') === false", () => {
            assert(isGeneratorFunction('string') === false)
        })
        it("isGeneratorFunction(1) === false", () => {
            assert(isGeneratorFunction(1) === false)
        })
        it("isGeneratorFunction(true) === false", () => {
            assert(isGeneratorFunction(true) === false)
        })
        it("isGeneratorFunction(Symbol()) === false", () => {
            assert(isGeneratorFunction(Symbol()) === false)
        })
        it("isGeneratorFunction(new Date) === false", () => {
            assert(isGeneratorFunction(new Date) === false)
        })
        it("isGeneratorFunction(/RegExp/) === false", () => {
            assert(isGeneratorFunction(/RegExp/) === false)
        })
        it("isGeneratorFunction(function () { }) === false", () => {
            assert(isGeneratorFunction(function () { }) === false)
        })
        it("isGeneratorFunction(async function () { }) === false", () => {
            assert(isGeneratorFunction(async function () { }) === false)
        })
        it("isGeneratorFunction(function* () { }) === true", () => {
            assert(isGeneratorFunction(function* () { }) === true)
        })
        it("isGeneratorFunction({}) === false", () => {
            assert(isGeneratorFunction({}) === false)
        })
        it("isGeneratorFunction(new Map) === false", () => {
            assert(isGeneratorFunction(new Map) === false)
        })
        it("isGeneratorFunction(new Set) === false", () => {
            assert(isGeneratorFunction(new Set) === false)
        })
        it("isGeneratorFunction(new WeakMap) === false", () => {
            assert(isGeneratorFunction(new WeakMap) === false)
        })
        it("isGeneratorFunction(new WeakSet) === false", () => {
            assert(isGeneratorFunction(new WeakSet) === false)
        })
        it("isGeneratorFunction([]) === false", () => {
            assert(isGeneratorFunction([]) === false)
        })
        it("isGeneratorFunction(new Int8Array) === false", () => {
            assert(isGeneratorFunction(new Int8Array) === false)
        })
        it("isGeneratorFunction(new Int16Array) === false", () => {
            assert(isGeneratorFunction(new Int16Array) === false)
        })
        it("isGeneratorFunction(new Int32Array) === false", () => {
            assert(isGeneratorFunction(new Int32Array) === false)
        })
        it("isGeneratorFunction(new Uint8Array) === false", () => {
            assert(isGeneratorFunction(new Uint8Array) === false)
        })
        it("isGeneratorFunction(new Uint16Array) === false", () => {
            assert(isGeneratorFunction(new Uint16Array) === false)
        })
        it("isGeneratorFunction(new Uint32Array) === false", () => {
            assert(isGeneratorFunction(new Uint32Array) === false)
        })
        it("isGeneratorFunction(new Float32Array) === false", () => {
            assert(isGeneratorFunction(new Float32Array) === false)
        })
        it("isGeneratorFunction(new Float64Array) === false", () => {
            assert(isGeneratorFunction(new Float64Array) === false)
        })
        it("isGeneratorFunction(new ArrayBuffer) === false", () => {
            assert(isGeneratorFunction(new ArrayBuffer) === false)
        })
        it("isGeneratorFunction(new DataView(new ArrayBuffer(2))) === false", () => {
            assert(isGeneratorFunction(new DataView(new ArrayBuffer(2))) === false)
        })
    })

    describe("## isObject", () => {
        const { isObject } = typecheck

        it("isObject(null) === false", () => {
            assert(isObject(null) === false)
        })
        it("isObject(undefined) === false", () => {
            assert(isObject(undefined) === false)
        })
        it("isObject('string') === false", () => {
            assert(isObject('string') === false)
        })
        it("isObject(1) === false", () => {
            assert(isObject(1) === false)
        })
        it("isObject(true) === false", () => {
            assert(isObject(true) === false)
        })
        it("isObject(Symbol()) === false", () => {
            assert(isObject(Symbol()) === false)
        })
        it("isObject(new Date) === false", () => {
            assert(isObject(new Date) === false)
        })
        it("isObject(/RegExp/) === false", () => {
            assert(isObject(/RegExp/) === false)
        })
        it("isObject(function () { }) === false", () => {
            assert(isObject(function () { }) === false)
        })
        it("isObject(async function () { }) === false", () => {
            assert(isObject(async function () { }) === false)
        })
        it("isObject(function* () { }) === false", () => {
            assert(isObject(function* () { }) === false)
        })
        it("isObject({}) === true", () => {
            assert(isObject({}) === true)
        })
        it("isObject(new Map) === false", () => {
            assert(isObject(new Map) === false)
        })
        it("isObject(new Set) === false", () => {
            assert(isObject(new Set) === false)
        })
        it("isObject(new WeakMap) === false", () => {
            assert(isObject(new WeakMap) === false)
        })
        it("isObject(new WeakSet) === false", () => {
            assert(isObject(new WeakSet) === false)
        })
        it("isObject([]) === false", () => {
            assert(isObject([]) === false)
        })
        it("isObject(new Int8Array) === false", () => {
            assert(isObject(new Int8Array) === false)
        })
        it("isObject(new Int16Array) === false", () => {
            assert(isObject(new Int16Array) === false)
        })
        it("isObject(new Int32Array) === false", () => {
            assert(isObject(new Int32Array) === false)
        })
        it("isObject(new Uint8Array) === false", () => {
            assert(isObject(new Uint8Array) === false)
        })
        it("isObject(new Uint16Array) === false", () => {
            assert(isObject(new Uint16Array) === false)
        })
        it("isObject(new Uint32Array) === false", () => {
            assert(isObject(new Uint32Array) === false)
        })
        it("isObject(new Float32Array) === false", () => {
            assert(isObject(new Float32Array) === false)
        })
        it("isObject(new Float64Array) === false", () => {
            assert(isObject(new Float64Array) === false)
        })
        it("isObject(new ArrayBuffer) === false", () => {
            assert(isObject(new ArrayBuffer) === false)
        })
        it("isObject(new DataView(new ArrayBuffer(2))) === false", () => {
            assert(isObject(new DataView(new ArrayBuffer(2))) === false)
        })
    })

    describe("## isMap", () => {
        const { isMap } = typecheck

        it("isMap(null) === false", () => {
            assert(isMap(null) === false)
        })
        it("isMap(undefined) === false", () => {
            assert(isMap(undefined) === false)
        })
        it("isMap('string') === false", () => {
            assert(isMap('string') === false)
        })
        it("isMap(1) === false", () => {
            assert(isMap(1) === false)
        })
        it("isMap(true) === false", () => {
            assert(isMap(true) === false)
        })
        it("isMap(Symbol()) === false", () => {
            assert(isMap(Symbol()) === false)
        })
        it("isMap(new Date) === false", () => {
            assert(isMap(new Date) === false)
        })
        it("isMap(/RegExp/) === false", () => {
            assert(isMap(/RegExp/) === false)
        })
        it("isMap(function () { }) === false", () => {
            assert(isMap(function () { }) === false)
        })
        it("isMap(async function () { }) === false", () => {
            assert(isMap(async function () { }) === false)
        })
        it("isMap(function* () { }) === false", () => {
            assert(isMap(function* () { }) === false)
        })
        it("isMap({}) === false", () => {
            assert(isMap({}) === false)
        })
        it("isMap(new Map) === true", () => {
            assert(isMap(new Map) === true)
        })
        it("isMap(new Set) === false", () => {
            assert(isMap(new Set) === false)
        })
        it("isMap(new WeakMap) === false", () => {
            assert(isMap(new WeakMap) === false)
        })
        it("isMap(new WeakSet) === false", () => {
            assert(isMap(new WeakSet) === false)
        })
        it("isMap([]) === false", () => {
            assert(isMap([]) === false)
        })
        it("isMap(new Int8Array) === false", () => {
            assert(isMap(new Int8Array) === false)
        })
        it("isMap(new Int16Array) === false", () => {
            assert(isMap(new Int16Array) === false)
        })
        it("isMap(new Int32Array) === false", () => {
            assert(isMap(new Int32Array) === false)
        })
        it("isMap(new Uint8Array) === false", () => {
            assert(isMap(new Uint8Array) === false)
        })
        it("isMap(new Uint16Array) === false", () => {
            assert(isMap(new Uint16Array) === false)
        })
        it("isMap(new Uint32Array) === false", () => {
            assert(isMap(new Uint32Array) === false)
        })
        it("isMap(new Float32Array) === false", () => {
            assert(isMap(new Float32Array) === false)
        })
        it("isMap(new Float64Array) === false", () => {
            assert(isMap(new Float64Array) === false)
        })
        it("isMap(new ArrayBuffer) === false", () => {
            assert(isMap(new ArrayBuffer) === false)
        })
        it("isMap(new DataView(new ArrayBuffer(2))) === false", () => {
            assert(isMap(new DataView(new ArrayBuffer(2))) === false)
        })
    })

    describe("## isSet", () => {
        const { isSet } = typecheck

        it("isSet(null) === false", () => {
            assert(isSet(null) === false)
        })
        it("isSet(undefined) === false", () => {
            assert(isSet(undefined) === false)
        })
        it("isSet('string') === false", () => {
            assert(isSet('string') === false)
        })
        it("isSet(1) === false", () => {
            assert(isSet(1) === false)
        })
        it("isSet(true) === false", () => {
            assert(isSet(true) === false)
        })
        it("isSet(Symbol()) === false", () => {
            assert(isSet(Symbol()) === false)
        })
        it("isSet(new Date) === false", () => {
            assert(isSet(new Date) === false)
        })
        it("isSet(/RegExp/) === false", () => {
            assert(isSet(/RegExp/) === false)
        })
        it("isSet(function () { }) === false", () => {
            assert(isSet(function () { }) === false)
        })
        it("isSet(async function () { }) === false", () => {
            assert(isSet(async function () { }) === false)
        })
        it("isSet(function* () { }) === false", () => {
            assert(isSet(function* () { }) === false)
        })
        it("isSet({}) === false", () => {
            assert(isSet({}) === false)
        })
        it("isSet(new Map) === false", () => {
            assert(isSet(new Map) === false)
        })
        it("isSet(new Set) === true", () => {
            assert(isSet(new Set) === true)
        })
        it("isSet(new WeakMap) === false", () => {
            assert(isSet(new WeakMap) === false)
        })
        it("isSet(new WeakSet) === false", () => {
            assert(isSet(new WeakSet) === false)
        })
        it("isSet([]) === false", () => {
            assert(isSet([]) === false)
        })
        it("isSet(new Int8Array) === false", () => {
            assert(isSet(new Int8Array) === false)
        })
        it("isSet(new Int16Array) === false", () => {
            assert(isSet(new Int16Array) === false)
        })
        it("isSet(new Int32Array) === false", () => {
            assert(isSet(new Int32Array) === false)
        })
        it("isSet(new Uint8Array) === false", () => {
            assert(isSet(new Uint8Array) === false)
        })
        it("isSet(new Uint16Array) === false", () => {
            assert(isSet(new Uint16Array) === false)
        })
        it("isSet(new Uint32Array) === false", () => {
            assert(isSet(new Uint32Array) === false)
        })
        it("isSet(new Float32Array) === false", () => {
            assert(isSet(new Float32Array) === false)
        })
        it("isSet(new Float64Array) === false", () => {
            assert(isSet(new Float64Array) === false)
        })
        it("isSet(new ArrayBuffer) === false", () => {
            assert(isSet(new ArrayBuffer) === false)
        })
        it("isSet(new DataView(new ArrayBuffer(2))) === false", () => {
            assert(isSet(new DataView(new ArrayBuffer(2))) === false)
        })
    })

    describe("## isWeakMap", () => {
        const { isWeakMap } = typecheck

        it("isWeakMap(null) === false", () => {
            assert(isWeakMap(null) === false)
        })
        it("isWeakMap(undefined) === false", () => {
            assert(isWeakMap(undefined) === false)
        })
        it("isWeakMap('string') === false", () => {
            assert(isWeakMap('string') === false)
        })
        it("isWeakMap(1) === false", () => {
            assert(isWeakMap(1) === false)
        })
        it("isWeakMap(true) === false", () => {
            assert(isWeakMap(true) === false)
        })
        it("isWeakMap(Symbol()) === false", () => {
            assert(isWeakMap(Symbol()) === false)
        })
        it("isWeakMap(new Date) === false", () => {
            assert(isWeakMap(new Date) === false)
        })
        it("isWeakMap(/RegExp/) === false", () => {
            assert(isWeakMap(/RegExp/) === false)
        })
        it("isWeakMap(function () { }) === false", () => {
            assert(isWeakMap(function () { }) === false)
        })
        it("isWeakMap(async function () { }) === false", () => {
            assert(isWeakMap(async function () { }) === false)
        })
        it("isWeakMap(function* () { }) === false", () => {
            assert(isWeakMap(function* () { }) === false)
        })
        it("isWeakMap({}) === false", () => {
            assert(isWeakMap({}) === false)
        })
        it("isWeakMap(new Map) === false", () => {
            assert(isWeakMap(new Map) === false)
        })
        it("isWeakMap(new Set) === false", () => {
            assert(isWeakMap(new Set) === false)
        })
        it("isWeakMap(new WeakMap) === true", () => {
            assert(isWeakMap(new WeakMap) === true)
        })
        it("isWeakMap(new WeakSet) === false", () => {
            assert(isWeakMap(new WeakSet) === false)
        })
        it("isWeakMap([]) === false", () => {
            assert(isWeakMap([]) === false)
        })
        it("isWeakMap(new Int8Array) === false", () => {
            assert(isWeakMap(new Int8Array) === false)
        })
        it("isWeakMap(new Int16Array) === false", () => {
            assert(isWeakMap(new Int16Array) === false)
        })
        it("isWeakMap(new Int32Array) === false", () => {
            assert(isWeakMap(new Int32Array) === false)
        })
        it("isWeakMap(new Uint8Array) === false", () => {
            assert(isWeakMap(new Uint8Array) === false)
        })
        it("isWeakMap(new Uint16Array) === false", () => {
            assert(isWeakMap(new Uint16Array) === false)
        })
        it("isWeakMap(new Uint32Array) === false", () => {
            assert(isWeakMap(new Uint32Array) === false)
        })
        it("isWeakMap(new Float32Array) === false", () => {
            assert(isWeakMap(new Float32Array) === false)
        })
        it("isWeakMap(new Float64Array) === false", () => {
            assert(isWeakMap(new Float64Array) === false)
        })
        it("isWeakMap(new ArrayBuffer) === false", () => {
            assert(isWeakMap(new ArrayBuffer) === false)
        })
        it("isWeakMap(new DataView(new ArrayBuffer(2))) === false", () => {
            assert(isWeakMap(new DataView(new ArrayBuffer(2))) === false)
        })
    })

    describe("## isWeakSet", () => {
        const { isWeakSet } = typecheck

        it("isWeakSet(null) === false", () => {
            assert(isWeakSet(null) === false)
        })
        it("isWeakSet(undefined) === false", () => {
            assert(isWeakSet(undefined) === false)
        })
        it("isWeakSet('string') === false", () => {
            assert(isWeakSet('string') === false)
        })
        it("isWeakSet(1) === false", () => {
            assert(isWeakSet(1) === false)
        })
        it("isWeakSet(true) === false", () => {
            assert(isWeakSet(true) === false)
        })
        it("isWeakSet(Symbol()) === false", () => {
            assert(isWeakSet(Symbol()) === false)
        })
        it("isWeakSet(new Date) === false", () => {
            assert(isWeakSet(new Date) === false)
        })
        it("isWeakSet(/RegExp/) === false", () => {
            assert(isWeakSet(/RegExp/) === false)
        })
        it("isWeakSet(function () { }) === false", () => {
            assert(isWeakSet(function () { }) === false)
        })
        it("isWeakSet(async function () { }) === false", () => {
            assert(isWeakSet(async function () { }) === false)
        })
        it("isWeakSet(function* () { }) === false", () => {
            assert(isWeakSet(function* () { }) === false)
        })
        it("isWeakSet({}) === false", () => {
            assert(isWeakSet({}) === false)
        })
        it("isWeakSet(new Map) === false", () => {
            assert(isWeakSet(new Map) === false)
        })
        it("isWeakSet(new Set) === false", () => {
            assert(isWeakSet(new Set) === false)
        })
        it("isWeakSet(new WeakMap) === false", () => {
            assert(isWeakSet(new WeakMap) === false)
        })
        it("isWeakSet(new WeakSet) === true", () => {
            assert(isWeakSet(new WeakSet) === true)
        })
        it("isWeakSet([]) === false", () => {
            assert(isWeakSet([]) === false)
        })
        it("isWeakSet(new Int8Array) === false", () => {
            assert(isWeakSet(new Int8Array) === false)
        })
        it("isWeakSet(new Int16Array) === false", () => {
            assert(isWeakSet(new Int16Array) === false)
        })
        it("isWeakSet(new Int32Array) === false", () => {
            assert(isWeakSet(new Int32Array) === false)
        })
        it("isWeakSet(new Uint8Array) === false", () => {
            assert(isWeakSet(new Uint8Array) === false)
        })
        it("isWeakSet(new Uint16Array) === false", () => {
            assert(isWeakSet(new Uint16Array) === false)
        })
        it("isWeakSet(new Uint32Array) === false", () => {
            assert(isWeakSet(new Uint32Array) === false)
        })
        it("isWeakSet(new Float32Array) === false", () => {
            assert(isWeakSet(new Float32Array) === false)
        })
        it("isWeakSet(new Float64Array) === false", () => {
            assert(isWeakSet(new Float64Array) === false)
        })
        it("isWeakSet(new ArrayBuffer) === false", () => {
            assert(isWeakSet(new ArrayBuffer) === false)
        })
        it("isWeakSet(new DataView(new ArrayBuffer(2))) === false", () => {
            assert(isWeakSet(new DataView(new ArrayBuffer(2))) === false)
        })
    })

    describe("## isArray", () => {
        const { isArray } = typecheck

        it('Object.keys( typecheck ) === true', () => {
            assert(isArray(Object.keys(typecheck)) === true)
        })
        it('isArray(new Array( 90 ))=== true', () => {
            assert(isArray(new Array(90)) === true)
        })
        it('isArray( { [0]: "zero", [1]: "one", length: 2 } ) === false', () => {
            assert(isArray({ [0]: 'zero', [1]: 'one', length: 2 }) === false)
        })
        it('(function (a) { return isArray(arguments) === false})(2) === true', () => {
            assert(
                (function (a) {
                    return isArray(arguments) === false
                })(2) === true
            )
        })


        it("isArray(null) === false", () => {
            assert(isArray(null) === false)
        })
        it("isArray(undefined) === false", () => {
            assert(isArray(undefined) === false)
        })
        it("isArray('string') === false", () => {
            assert(isArray('string') === false)
        })
        it("isArray(1) === false", () => {
            assert(isArray(1) === false)
        })
        it("isArray(true) === false", () => {
            assert(isArray(true) === false)
        })
        it("isArray(Symbol()) === false", () => {
            assert(isArray(Symbol()) === false)
        })
        it("isArray(new Date) === false", () => {
            assert(isArray(new Date) === false)
        })
        it("isArray(/RegExp/) === false", () => {
            assert(isArray(/RegExp/) === false)
        })
        it("isArray(function () { }) === false", () => {
            assert(isArray(function () { }) === false)
        })
        it("isArray(async function () { }) === false", () => {
            assert(isArray(async function () { }) === false)
        })
        it("isArray(function* () { }) === false", () => {
            assert(isArray(function* () { }) === false)
        })
        it("isArray({}) === false", () => {
            assert(isArray({}) === false)
        })
        it("isArray(new Map) === false", () => {
            assert(isArray(new Map) === false)
        })
        it("isArray(new Set) === false", () => {
            assert(isArray(new Set) === false)
        })
        it("isArray(new WeakMap) === false", () => {
            assert(isArray(new WeakMap) === false)
        })
        it("isArray(new WeakSet) === false", () => {
            assert(isArray(new WeakSet) === false)
        })
        it("isArray([]) === true", () => {
            assert(isArray([]) === true)
        })
        it("isArray(new Int8Array) === false", () => {
            assert(isArray(new Int8Array) === false)
        })
        it("isArray(new Int16Array) === false", () => {
            assert(isArray(new Int16Array) === false)
        })
        it("isArray(new Int32Array) === false", () => {
            assert(isArray(new Int32Array) === false)
        })
        it("isArray(new Uint8Array) === false", () => {
            assert(isArray(new Uint8Array) === false)
        })
        it("isArray(new Uint16Array) === false", () => {
            assert(isArray(new Uint16Array) === false)
        })
        it("isArray(new Uint32Array) === false", () => {
            assert(isArray(new Uint32Array) === false)
        })
        it("isArray(new Float32Array) === false", () => {
            assert(isArray(new Float32Array) === false)
        })
        it("isArray(new Float64Array) === false", () => {
            assert(isArray(new Float64Array) === false)
        })
        it("isArray(new ArrayBuffer) === false", () => {
            assert(isArray(new ArrayBuffer) === false)
        })
        it("isArray(new DataView(new ArrayBuffer(2))) === false", () => {
            assert(isArray(new DataView(new ArrayBuffer(2))) === false)
        })
    })

    describe("## isInt8Array", () => {
        const { isInt8Array } = typecheck

        it("isInt8Array(null) === false", () => {
            assert(isInt8Array(null) === false)
        })
        it("isInt8Array(undefined) === false", () => {
            assert(isInt8Array(undefined) === false)
        })
        it("isInt8Array('string') === false", () => {
            assert(isInt8Array('string') === false)
        })
        it("isInt8Array(1) === false", () => {
            assert(isInt8Array(1) === false)
        })
        it("isInt8Array(true) === false", () => {
            assert(isInt8Array(true) === false)
        })
        it("isInt8Array(Symbol()) === false", () => {
            assert(isInt8Array(Symbol()) === false)
        })
        it("isInt8Array(new Date) === false", () => {
            assert(isInt8Array(new Date) === false)
        })
        it("isInt8Array(/RegExp/) === false", () => {
            assert(isInt8Array(/RegExp/) === false)
        })
        it("isInt8Array(function () { }) === false", () => {
            assert(isInt8Array(function () { }) === false)
        })
        it("isInt8Array(async function () { }) === false", () => {
            assert(isInt8Array(async function () { }) === false)
        })
        it("isInt8Array(function* () { }) === false", () => {
            assert(isInt8Array(function* () { }) === false)
        })
        it("isInt8Array({}) === false", () => {
            assert(isInt8Array({}) === false)
        })
        it("isInt8Array(new Map) === false", () => {
            assert(isInt8Array(new Map) === false)
        })
        it("isInt8Array(new Set) === false", () => {
            assert(isInt8Array(new Set) === false)
        })
        it("isInt8Array(new WeakMap) === false", () => {
            assert(isInt8Array(new WeakMap) === false)
        })
        it("isInt8Array(new WeakSet) === false", () => {
            assert(isInt8Array(new WeakSet) === false)
        })
        it("isInt8Array([]) === false", () => {
            assert(isInt8Array([]) === false)
        })
        it("isInt8Array(new Int8Array) === true", () => {
            assert(isInt8Array(new Int8Array) === true)
        })
        it("isInt8Array(new Int16Array) === false", () => {
            assert(isInt8Array(new Int16Array) === false)
        })
        it("isInt8Array(new Int32Array) === false", () => {
            assert(isInt8Array(new Int32Array) === false)
        })
        it("isInt8Array(new Uint8Array) === false", () => {
            assert(isInt8Array(new Uint8Array) === false)
        })
        it("isInt8Array(new Uint16Array) === false", () => {
            assert(isInt8Array(new Uint16Array) === false)
        })
        it("isInt8Array(new Uint32Array) === false", () => {
            assert(isInt8Array(new Uint32Array) === false)
        })
        it("isInt8Array(new Float32Array) === false", () => {
            assert(isInt8Array(new Float32Array) === false)
        })
        it("isInt8Array(new Float64Array) === false", () => {
            assert(isInt8Array(new Float64Array) === false)
        })
        it("isInt8Array(new ArrayBuffer) === false", () => {
            assert(isInt8Array(new ArrayBuffer) === false)
        })
        it("isInt8Array(new DataView(new ArrayBuffer(2))) === false", () => {
            assert(isInt8Array(new DataView(new ArrayBuffer(2))) === false)
        })
    })

    describe("## isInt16Array", () => {
        const { isInt16Array } = typecheck

        it("isInt16Array(null) === false", () => {
            assert(isInt16Array(null) === false)
        })
        it("isInt16Array(undefined) === false", () => {
            assert(isInt16Array(undefined) === false)
        })
        it("isInt16Array('string') === false", () => {
            assert(isInt16Array('string') === false)
        })
        it("isInt16Array(1) === false", () => {
            assert(isInt16Array(1) === false)
        })
        it("isInt16Array(true) === false", () => {
            assert(isInt16Array(true) === false)
        })
        it("isInt16Array(Symbol()) === false", () => {
            assert(isInt16Array(Symbol()) === false)
        })
        it("isInt16Array(new Date) === false", () => {
            assert(isInt16Array(new Date) === false)
        })
        it("isInt16Array(/RegExp/) === false", () => {
            assert(isInt16Array(/RegExp/) === false)
        })
        it("isInt16Array(function () { }) === false", () => {
            assert(isInt16Array(function () { }) === false)
        })
        it("isInt16Array(async function () { }) === false", () => {
            assert(isInt16Array(async function () { }) === false)
        })
        it("isInt16Array(function* () { }) === false", () => {
            assert(isInt16Array(function* () { }) === false)
        })
        it("isInt16Array({}) === false", () => {
            assert(isInt16Array({}) === false)
        })
        it("isInt16Array(new Map) === false", () => {
            assert(isInt16Array(new Map) === false)
        })
        it("isInt16Array(new Set) === false", () => {
            assert(isInt16Array(new Set) === false)
        })
        it("isInt16Array(new WeakMap) === false", () => {
            assert(isInt16Array(new WeakMap) === false)
        })
        it("isInt16Array(new WeakSet) === false", () => {
            assert(isInt16Array(new WeakSet) === false)
        })
        it("isInt16Array([]) === false", () => {
            assert(isInt16Array([]) === false)
        })
        it("isInt16Array(new Int8Array) === false", () => {
            assert(isInt16Array(new Int8Array) === false)
        })
        it("isInt16Array(new Int16Array) === true", () => {
            assert(isInt16Array(new Int16Array) === true)
        })
        it("isInt16Array(new Int32Array) === false", () => {
            assert(isInt16Array(new Int32Array) === false)
        })
        it("isInt16Array(new Uint8Array) === false", () => {
            assert(isInt16Array(new Uint8Array) === false)
        })
        it("isInt16Array(new Uint16Array) === false", () => {
            assert(isInt16Array(new Uint16Array) === false)
        })
        it("isInt16Array(new Uint32Array) === false", () => {
            assert(isInt16Array(new Uint32Array) === false)
        })
        it("isInt16Array(new Float32Array) === false", () => {
            assert(isInt16Array(new Float32Array) === false)
        })
        it("isInt16Array(new Float64Array) === false", () => {
            assert(isInt16Array(new Float64Array) === false)
        })
        it("isInt16Array(new ArrayBuffer) === false", () => {
            assert(isInt16Array(new ArrayBuffer) === false)
        })
        it("isInt16Array(new DataView(new ArrayBuffer(2))) === false", () => {
            assert(isInt16Array(new DataView(new ArrayBuffer(2))) === false)
        })
    })

    describe("## isInt32Array", () => {
        const { isInt32Array } = typecheck

        it("isInt32Array(null) === false", () => {
            assert(isInt32Array(null) === false)
        })
        it("isInt32Array(undefined) === false", () => {
            assert(isInt32Array(undefined) === false)
        })
        it("isInt32Array('string') === false", () => {
            assert(isInt32Array('string') === false)
        })
        it("isInt32Array(1) === false", () => {
            assert(isInt32Array(1) === false)
        })
        it("isInt32Array(true) === false", () => {
            assert(isInt32Array(true) === false)
        })
        it("isInt32Array(Symbol()) === false", () => {
            assert(isInt32Array(Symbol()) === false)
        })
        it("isInt32Array(new Date) === false", () => {
            assert(isInt32Array(new Date) === false)
        })
        it("isInt32Array(/RegExp/) === false", () => {
            assert(isInt32Array(/RegExp/) === false)
        })
        it("isInt32Array(function () { }) === false", () => {
            assert(isInt32Array(function () { }) === false)
        })
        it("isInt32Array(async function () { }) === false", () => {
            assert(isInt32Array(async function () { }) === false)
        })
        it("isInt32Array(function* () { }) === false", () => {
            assert(isInt32Array(function* () { }) === false)
        })
        it("isInt32Array({}) === false", () => {
            assert(isInt32Array({}) === false)
        })
        it("isInt32Array(new Map) === false", () => {
            assert(isInt32Array(new Map) === false)
        })
        it("isInt32Array(new Set) === false", () => {
            assert(isInt32Array(new Set) === false)
        })
        it("isInt32Array(new WeakMap) === false", () => {
            assert(isInt32Array(new WeakMap) === false)
        })
        it("isInt32Array(new WeakSet) === false", () => {
            assert(isInt32Array(new WeakSet) === false)
        })
        it("isInt32Array([]) === false", () => {
            assert(isInt32Array([]) === false)
        })
        it("isInt32Array(new Int8Array) === false", () => {
            assert(isInt32Array(new Int8Array) === false)
        })
        it("isInt32Array(new Int16Array) === false", () => {
            assert(isInt32Array(new Int16Array) === false)
        })
        it("isInt32Array(new Int32Array) === true", () => {
            assert(isInt32Array(new Int32Array) === true)
        })
        it("isInt32Array(new Uint8Array) === false", () => {
            assert(isInt32Array(new Uint8Array) === false)
        })
        it("isInt32Array(new Uint16Array) === false", () => {
            assert(isInt32Array(new Uint16Array) === false)
        })
        it("isInt32Array(new Uint32Array) === false", () => {
            assert(isInt32Array(new Uint32Array) === false)
        })
        it("isInt32Array(new Float32Array) === false", () => {
            assert(isInt32Array(new Float32Array) === false)
        })
        it("isInt32Array(new Float64Array) === false", () => {
            assert(isInt32Array(new Float64Array) === false)
        })
        it("isInt32Array(new ArrayBuffer) === false", () => {
            assert(isInt32Array(new ArrayBuffer) === false)
        })
        it("isInt32Array(new DataView(new ArrayBuffer(2))) === false", () => {
            assert(isInt32Array(new DataView(new ArrayBuffer(2))) === false)
        })
    })

    describe("## isUint8Array", () => {
        const { isUint8Array } = typecheck

        it("isUint8Array(null) === false", () => {
            assert(isUint8Array(null) === false)
        })
        it("isUint8Array(undefined) === false", () => {
            assert(isUint8Array(undefined) === false)
        })
        it("isUint8Array('string') === false", () => {
            assert(isUint8Array('string') === false)
        })
        it("isUint8Array(1) === false", () => {
            assert(isUint8Array(1) === false)
        })
        it("isUint8Array(true) === false", () => {
            assert(isUint8Array(true) === false)
        })
        it("isUint8Array(Symbol()) === false", () => {
            assert(isUint8Array(Symbol()) === false)
        })
        it("isUint8Array(new Date) === false", () => {
            assert(isUint8Array(new Date) === false)
        })
        it("isUint8Array(/RegExp/) === false", () => {
            assert(isUint8Array(/RegExp/) === false)
        })
        it("isUint8Array(function () { }) === false", () => {
            assert(isUint8Array(function () { }) === false)
        })
        it("isUint8Array(async function () { }) === false", () => {
            assert(isUint8Array(async function () { }) === false)
        })
        it("isUint8Array(function* () { }) === false", () => {
            assert(isUint8Array(function* () { }) === false)
        })
        it("isUint8Array({}) === false", () => {
            assert(isUint8Array({}) === false)
        })
        it("isUint8Array(new Map) === false", () => {
            assert(isUint8Array(new Map) === false)
        })
        it("isUint8Array(new Set) === false", () => {
            assert(isUint8Array(new Set) === false)
        })
        it("isUint8Array(new WeakMap) === false", () => {
            assert(isUint8Array(new WeakMap) === false)
        })
        it("isUint8Array(new WeakSet) === false", () => {
            assert(isUint8Array(new WeakSet) === false)
        })
        it("isUint8Array([]) === false", () => {
            assert(isUint8Array([]) === false)
        })
        it("isUint8Array(new Int8Array) === false", () => {
            assert(isUint8Array(new Int8Array) === false)
        })
        it("isUint8Array(new Int16Array) === false", () => {
            assert(isUint8Array(new Int16Array) === false)
        })
        it("isUint8Array(new Int32Array) === false", () => {
            assert(isUint8Array(new Int32Array) === false)
        })
        it("isUint8Array(new Uint8Array) === true", () => {
            assert(isUint8Array(new Uint8Array) === true)
        })
        it("isUint8Array(new Uint16Array) === false", () => {
            assert(isUint8Array(new Uint16Array) === false)
        })
        it("isUint8Array(new Uint32Array) === false", () => {
            assert(isUint8Array(new Uint32Array) === false)
        })
        it("isUint8Array(new Float32Array) === false", () => {
            assert(isUint8Array(new Float32Array) === false)
        })
        it("isUint8Array(new Float64Array) === false", () => {
            assert(isUint8Array(new Float64Array) === false)
        })
        it("isUint8Array(new ArrayBuffer) === false", () => {
            assert(isUint8Array(new ArrayBuffer) === false)
        })
        it("isUint8Array(new DataView(new ArrayBuffer(2))) === false", () => {
            assert(isUint8Array(new DataView(new ArrayBuffer(2))) === false)
        })
    })

    describe("## isUint16Array", () => {
        const { isUint16Array } = typecheck

        it("isUint16Array(null) === false", () => {
            assert(isUint16Array(null) === false)
        })
        it("isUint16Array(undefined) === false", () => {
            assert(isUint16Array(undefined) === false)
        })
        it("isUint16Array('string') === false", () => {
            assert(isUint16Array('string') === false)
        })
        it("isUint16Array(1) === false", () => {
            assert(isUint16Array(1) === false)
        })
        it("isUint16Array(true) === false", () => {
            assert(isUint16Array(true) === false)
        })
        it("isUint16Array(Symbol()) === false", () => {
            assert(isUint16Array(Symbol()) === false)
        })
        it("isUint16Array(new Date) === false", () => {
            assert(isUint16Array(new Date) === false)
        })
        it("isUint16Array(/RegExp/) === false", () => {
            assert(isUint16Array(/RegExp/) === false)
        })
        it("isUint16Array(function () { }) === false", () => {
            assert(isUint16Array(function () { }) === false)
        })
        it("isUint16Array(async function () { }) === false", () => {
            assert(isUint16Array(async function () { }) === false)
        })
        it("isUint16Array(function* () { }) === false", () => {
            assert(isUint16Array(function* () { }) === false)
        })
        it("isUint16Array({}) === false", () => {
            assert(isUint16Array({}) === false)
        })
        it("isUint16Array(new Map) === false", () => {
            assert(isUint16Array(new Map) === false)
        })
        it("isUint16Array(new Set) === false", () => {
            assert(isUint16Array(new Set) === false)
        })
        it("isUint16Array(new WeakMap) === false", () => {
            assert(isUint16Array(new WeakMap) === false)
        })
        it("isUint16Array(new WeakSet) === false", () => {
            assert(isUint16Array(new WeakSet) === false)
        })
        it("isUint16Array([]) === false", () => {
            assert(isUint16Array([]) === false)
        })
        it("isUint16Array(new Int8Array) === false", () => {
            assert(isUint16Array(new Int8Array) === false)
        })
        it("isUint16Array(new Int16Array) === false", () => {
            assert(isUint16Array(new Int16Array) === false)
        })
        it("isUint16Array(new Int32Array) === false", () => {
            assert(isUint16Array(new Int32Array) === false)
        })
        it("isUint16Array(new Uint8Array) === false", () => {
            assert(isUint16Array(new Uint8Array) === false)
        })
        it("isUint16Array(new Uint16Array) === true", () => {
            assert(isUint16Array(new Uint16Array) === true)
        })
        it("isUint16Array(new Uint32Array) === false", () => {
            assert(isUint16Array(new Uint32Array) === false)
        })
        it("isUint16Array(new Float32Array) === false", () => {
            assert(isUint16Array(new Float32Array) === false)
        })
        it("isUint16Array(new Float64Array) === false", () => {
            assert(isUint16Array(new Float64Array) === false)
        })
        it("isUint16Array(new ArrayBuffer) === false", () => {
            assert(isUint16Array(new ArrayBuffer) === false)
        })
        it("isUint16Array(new DataView(new ArrayBuffer(2))) === false", () => {
            assert(isUint16Array(new DataView(new ArrayBuffer(2))) === false)
        })
    })

    describe("## isUint32Array", () => {
        const { isUint32Array } = typecheck

        it("isUint32Array(null) === false", () => {
            assert(isUint32Array(null) === false)
        })
        it("isUint32Array(undefined) === false", () => {
            assert(isUint32Array(undefined) === false)
        })
        it("isUint32Array('string') === false", () => {
            assert(isUint32Array('string') === false)
        })
        it("isUint32Array(1) === false", () => {
            assert(isUint32Array(1) === false)
        })
        it("isUint32Array(true) === false", () => {
            assert(isUint32Array(true) === false)
        })
        it("isUint32Array(Symbol()) === false", () => {
            assert(isUint32Array(Symbol()) === false)
        })
        it("isUint32Array(new Date) === false", () => {
            assert(isUint32Array(new Date) === false)
        })
        it("isUint32Array(/RegExp/) === false", () => {
            assert(isUint32Array(/RegExp/) === false)
        })
        it("isUint32Array(function () { }) === false", () => {
            assert(isUint32Array(function () { }) === false)
        })
        it("isUint32Array(async function () { }) === false", () => {
            assert(isUint32Array(async function () { }) === false)
        })
        it("isUint32Array(function* () { }) === false", () => {
            assert(isUint32Array(function* () { }) === false)
        })
        it("isUint32Array({}) === false", () => {
            assert(isUint32Array({}) === false)
        })
        it("isUint32Array(new Map) === false", () => {
            assert(isUint32Array(new Map) === false)
        })
        it("isUint32Array(new Set) === false", () => {
            assert(isUint32Array(new Set) === false)
        })
        it("isUint32Array(new WeakMap) === false", () => {
            assert(isUint32Array(new WeakMap) === false)
        })
        it("isUint32Array(new WeakSet) === false", () => {
            assert(isUint32Array(new WeakSet) === false)
        })
        it("isUint32Array([]) === false", () => {
            assert(isUint32Array([]) === false)
        })
        it("isUint32Array(new Int8Array) === false", () => {
            assert(isUint32Array(new Int8Array) === false)
        })
        it("isUint32Array(new Int16Array) === false", () => {
            assert(isUint32Array(new Int16Array) === false)
        })
        it("isUint32Array(new Int32Array) === false", () => {
            assert(isUint32Array(new Int32Array) === false)
        })
        it("isUint32Array(new Uint8Array) === false", () => {
            assert(isUint32Array(new Uint8Array) === false)
        })
        it("isUint32Array(new Uint16Array) === false", () => {
            assert(isUint32Array(new Uint16Array) === false)
        })
        it("isUint32Array(new Uint32Array) === true", () => {
            assert(isUint32Array(new Uint32Array) === true)
        })
        it("isUint32Array(new Float32Array) === false", () => {
            assert(isUint32Array(new Float32Array) === false)
        })
        it("isUint32Array(new Float64Array) === false", () => {
            assert(isUint32Array(new Float64Array) === false)
        })
        it("isUint32Array(new ArrayBuffer) === false", () => {
            assert(isUint32Array(new ArrayBuffer) === false)
        })
        it("isUint32Array(new DataView(new ArrayBuffer(2))) === false", () => {
            assert(isUint32Array(new DataView(new ArrayBuffer(2))) === false)
        })
    })

    describe("## isFloat32Array", () => {
        const { isFloat32Array } = typecheck

        it("isFloat32Array(null) === false", () => {
            assert(isFloat32Array(null) === false)
        })
        it("isFloat32Array(undefined) === false", () => {
            assert(isFloat32Array(undefined) === false)
        })
        it("isFloat32Array('string') === false", () => {
            assert(isFloat32Array('string') === false)
        })
        it("isFloat32Array(1) === false", () => {
            assert(isFloat32Array(1) === false)
        })
        it("isFloat32Array(true) === false", () => {
            assert(isFloat32Array(true) === false)
        })
        it("isFloat32Array(Symbol()) === false", () => {
            assert(isFloat32Array(Symbol()) === false)
        })
        it("isFloat32Array(new Date) === false", () => {
            assert(isFloat32Array(new Date) === false)
        })
        it("isFloat32Array(/RegExp/) === false", () => {
            assert(isFloat32Array(/RegExp/) === false)
        })
        it("isFloat32Array(function () { }) === false", () => {
            assert(isFloat32Array(function () { }) === false)
        })
        it("isFloat32Array(async function () { }) === false", () => {
            assert(isFloat32Array(async function () { }) === false)
        })
        it("isFloat32Array(function* () { }) === false", () => {
            assert(isFloat32Array(function* () { }) === false)
        })
        it("isFloat32Array({}) === false", () => {
            assert(isFloat32Array({}) === false)
        })
        it("isFloat32Array(new Map) === false", () => {
            assert(isFloat32Array(new Map) === false)
        })
        it("isFloat32Array(new Set) === false", () => {
            assert(isFloat32Array(new Set) === false)
        })
        it("isFloat32Array(new WeakMap) === false", () => {
            assert(isFloat32Array(new WeakMap) === false)
        })
        it("isFloat32Array(new WeakSet) === false", () => {
            assert(isFloat32Array(new WeakSet) === false)
        })
        it("isFloat32Array([]) === false", () => {
            assert(isFloat32Array([]) === false)
        })
        it("isFloat32Array(new Int8Array) === false", () => {
            assert(isFloat32Array(new Int8Array) === false)
        })
        it("isFloat32Array(new Int16Array) === false", () => {
            assert(isFloat32Array(new Int16Array) === false)
        })
        it("isFloat32Array(new Int32Array) === false", () => {
            assert(isFloat32Array(new Int32Array) === false)
        })
        it("isFloat32Array(new Uint8Array) === false", () => {
            assert(isFloat32Array(new Uint8Array) === false)
        })
        it("isFloat32Array(new Uint16Array) === false", () => {
            assert(isFloat32Array(new Uint16Array) === false)
        })
        it("isFloat32Array(new Uint32Array) === false", () => {
            assert(isFloat32Array(new Uint32Array) === false)
        })
        it("isFloat32Array(new Float32Array) === true", () => {
            assert(isFloat32Array(new Float32Array) === true)
        })
        it("isFloat32Array(new Float64Array) === false", () => {
            assert(isFloat32Array(new Float64Array) === false)
        })
        it("isFloat32Array(new ArrayBuffer) === false", () => {
            assert(isFloat32Array(new ArrayBuffer) === false)
        })
        it("isFloat32Array(new DataView(new ArrayBuffer(2))) === false", () => {
            assert(isFloat32Array(new DataView(new ArrayBuffer(2))) === false)
        })
    })

    describe("## isFloat64Array", () => {
        const { isFloat64Array } = typecheck

        it("isFloat64Array(null) === false", () => {
            assert(isFloat64Array(null) === false)
        })
        it("isFloat64Array(undefined) === false", () => {
            assert(isFloat64Array(undefined) === false)
        })
        it("isFloat64Array('string') === false", () => {
            assert(isFloat64Array('string') === false)
        })
        it("isFloat64Array(1) === false", () => {
            assert(isFloat64Array(1) === false)
        })
        it("isFloat64Array(true) === false", () => {
            assert(isFloat64Array(true) === false)
        })
        it("isFloat64Array(Symbol()) === false", () => {
            assert(isFloat64Array(Symbol()) === false)
        })
        it("isFloat64Array(new Date) === false", () => {
            assert(isFloat64Array(new Date) === false)
        })
        it("isFloat64Array(/RegExp/) === false", () => {
            assert(isFloat64Array(/RegExp/) === false)
        })
        it("isFloat64Array(function () { }) === false", () => {
            assert(isFloat64Array(function () { }) === false)
        })
        it("isFloat64Array(async function () { }) === false", () => {
            assert(isFloat64Array(async function () { }) === false)
        })
        it("isFloat64Array(function* () { }) === false", () => {
            assert(isFloat64Array(function* () { }) === false)
        })
        it("isFloat64Array({}) === false", () => {
            assert(isFloat64Array({}) === false)
        })
        it("isFloat64Array(new Map) === false", () => {
            assert(isFloat64Array(new Map) === false)
        })
        it("isFloat64Array(new Set) === false", () => {
            assert(isFloat64Array(new Set) === false)
        })
        it("isFloat64Array(new WeakMap) === false", () => {
            assert(isFloat64Array(new WeakMap) === false)
        })
        it("isFloat64Array(new WeakSet) === false", () => {
            assert(isFloat64Array(new WeakSet) === false)
        })
        it("isFloat64Array([]) === false", () => {
            assert(isFloat64Array([]) === false)
        })
        it("isFloat64Array(new Int8Array) === false", () => {
            assert(isFloat64Array(new Int8Array) === false)
        })
        it("isFloat64Array(new Int16Array) === false", () => {
            assert(isFloat64Array(new Int16Array) === false)
        })
        it("isFloat64Array(new Int32Array) === false", () => {
            assert(isFloat64Array(new Int32Array) === false)
        })
        it("isFloat64Array(new Uint8Array) === false", () => {
            assert(isFloat64Array(new Uint8Array) === false)
        })
        it("isFloat64Array(new Uint16Array) === false", () => {
            assert(isFloat64Array(new Uint16Array) === false)
        })
        it("isFloat64Array(new Uint32Array) === false", () => {
            assert(isFloat64Array(new Uint32Array) === false)
        })
        it("isFloat64Array(new Float32Array) === false", () => {
            assert(isFloat64Array(new Float32Array) === false)
        })
        it("isFloat64Array(new Float64Array) === true", () => {
            assert(isFloat64Array(new Float64Array) === true)
        })
        it("isFloat64Array(new ArrayBuffer) === false", () => {
            assert(isFloat64Array(new ArrayBuffer) === false)
        })
        it("isFloat64Array(new DataView(new ArrayBuffer(2))) === false", () => {
            assert(isFloat64Array(new DataView(new ArrayBuffer(2))) === false)
        })
    })

    describe("## isArrayBuffer", () => {
        const { isArrayBuffer } = typecheck

        it("isArrayBuffer(null) === false", () => {
            assert(isArrayBuffer(null) === false)
        })
        it("isArrayBuffer(undefined) === false", () => {
            assert(isArrayBuffer(undefined) === false)
        })
        it("isArrayBuffer('string') === false", () => {
            assert(isArrayBuffer('string') === false)
        })
        it("isArrayBuffer(1) === false", () => {
            assert(isArrayBuffer(1) === false)
        })
        it("isArrayBuffer(true) === false", () => {
            assert(isArrayBuffer(true) === false)
        })
        it("isArrayBuffer(Symbol()) === false", () => {
            assert(isArrayBuffer(Symbol()) === false)
        })
        it("isArrayBuffer(new Date) === false", () => {
            assert(isArrayBuffer(new Date) === false)
        })
        it("isArrayBuffer(/RegExp/) === false", () => {
            assert(isArrayBuffer(/RegExp/) === false)
        })
        it("isArrayBuffer(function () { }) === false", () => {
            assert(isArrayBuffer(function () { }) === false)
        })
        it("isArrayBuffer(async function () { }) === false", () => {
            assert(isArrayBuffer(async function () { }) === false)
        })
        it("isArrayBuffer(function* () { }) === false", () => {
            assert(isArrayBuffer(function* () { }) === false)
        })
        it("isArrayBuffer({}) === false", () => {
            assert(isArrayBuffer({}) === false)
        })
        it("isArrayBuffer(new Map) === false", () => {
            assert(isArrayBuffer(new Map) === false)
        })
        it("isArrayBuffer(new Set) === false", () => {
            assert(isArrayBuffer(new Set) === false)
        })
        it("isArrayBuffer(new WeakMap) === false", () => {
            assert(isArrayBuffer(new WeakMap) === false)
        })
        it("isArrayBuffer(new WeakSet) === false", () => {
            assert(isArrayBuffer(new WeakSet) === false)
        })
        it("isArrayBuffer([]) === false", () => {
            assert(isArrayBuffer([]) === false)
        })
        it("isArrayBuffer(new Int8Array) === false", () => {
            assert(isArrayBuffer(new Int8Array) === false)
        })
        it("isArrayBuffer(new Int16Array) === false", () => {
            assert(isArrayBuffer(new Int16Array) === false)
        })
        it("isArrayBuffer(new Int32Array) === false", () => {
            assert(isArrayBuffer(new Int32Array) === false)
        })
        it("isArrayBuffer(new Uint8Array) === false", () => {
            assert(isArrayBuffer(new Uint8Array) === false)
        })
        it("isArrayBuffer(new Uint16Array) === false", () => {
            assert(isArrayBuffer(new Uint16Array) === false)
        })
        it("isArrayBuffer(new Uint32Array) === false", () => {
            assert(isArrayBuffer(new Uint32Array) === false)
        })
        it("isArrayBuffer(new Float32Array) === false", () => {
            assert(isArrayBuffer(new Float32Array) === false)
        })
        it("isArrayBuffer(new Float64Array) === false", () => {
            assert(isArrayBuffer(new Float64Array) === false)
        })
        it("isArrayBuffer(new ArrayBuffer) === true", () => {
            assert(isArrayBuffer(new ArrayBuffer) === true)
        })
        it("isArrayBuffer(new DataView(new ArrayBuffer(2))) === false", () => {
            assert(isArrayBuffer(new DataView(new ArrayBuffer(2))) === false)
        })
    })

    describe("## isDataView", () => {
        const { isDataView } = typecheck

        it("isDataView(null) === false", () => {
            assert(isDataView(null) === false)
        })
        it("isDataView(undefined) === false", () => {
            assert(isDataView(undefined) === false)
        })
        it("isDataView('string') === false", () => {
            assert(isDataView('string') === false)
        })
        it("isDataView(1) === false", () => {
            assert(isDataView(1) === false)
        })
        it("isDataView(true) === false", () => {
            assert(isDataView(true) === false)
        })
        it("isDataView(Symbol()) === false", () => {
            assert(isDataView(Symbol()) === false)
        })
        it("isDataView(new Date) === false", () => {
            assert(isDataView(new Date) === false)
        })
        it("isDataView(/RegExp/) === false", () => {
            assert(isDataView(/RegExp/) === false)
        })
        it("isDataView(function () { }) === false", () => {
            assert(isDataView(function () { }) === false)
        })
        it("isDataView(async function () { }) === false", () => {
            assert(isDataView(async function () { }) === false)
        })
        it("isDataView(function* () { }) === false", () => {
            assert(isDataView(function* () { }) === false)
        })
        it("isDataView({}) === false", () => {
            assert(isDataView({}) === false)
        })
        it("isDataView(new Map) === false", () => {
            assert(isDataView(new Map) === false)
        })
        it("isDataView(new Set) === false", () => {
            assert(isDataView(new Set) === false)
        })
        it("isDataView(new WeakMap) === false", () => {
            assert(isDataView(new WeakMap) === false)
        })
        it("isDataView(new WeakSet) === false", () => {
            assert(isDataView(new WeakSet) === false)
        })
        it("isDataView([]) === false", () => {
            assert(isDataView([]) === false)
        })
        it("isDataView(new Int8Array) === false", () => {
            assert(isDataView(new Int8Array) === false)
        })
        it("isDataView(new Int16Array) === false", () => {
            assert(isDataView(new Int16Array) === false)
        })
        it("isDataView(new Int32Array) === false", () => {
            assert(isDataView(new Int32Array) === false)
        })
        it("isDataView(new Uint8Array) === false", () => {
            assert(isDataView(new Uint8Array) === false)
        })
        it("isDataView(new Uint16Array) === false", () => {
            assert(isDataView(new Uint16Array) === false)
        })
        it("isDataView(new Uint32Array) === false", () => {
            assert(isDataView(new Uint32Array) === false)
        })
        it("isDataView(new Float32Array) === false", () => {
            assert(isDataView(new Float32Array) === false)
        })
        it("isDataView(new Float64Array) === false", () => {
            assert(isDataView(new Float64Array) === false)
        })
        it("isDataView(new ArrayBuffer) === false", () => {
            assert(isDataView(new ArrayBuffer) === false)
        })
        it("isDataView(new DataView(new ArrayBuffer(2))) === true", () => {
            assert(isDataView(new DataView(new ArrayBuffer(2))) === true)
        })
    })

    describe('## isClass', () => {
        const { isClass } = typecheck
        it(STRING, () => {
            assert(isClass(new String(5), String))
        })
        it(FUNCTION, () => {
            assert(isClass(new Function('return 5'), Function))
        })
        it('class One', () => {
            class One { }
            const one = new One()
            assert(isClass(one, One))
        })
    })
})
