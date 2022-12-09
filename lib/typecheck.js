const { TypeName } = require('VBScript')
const { NONE, NULL, UNDEFINED, _OBJECT, _STRING, _NUMBER, BOOLEAN, SYMBOL, OBJECT } = require('text')

function typecheck(val) {
    if (val === null) return NULL
    if (val === undefined) return UNDEFINED
    if (val.constructor && val.constructor.name) return val.constructor.name
    else return TypeName(val)
}

function isNull(val) {
    return typecheck(val) === NULL
}

function isUndefined(val) {
    return typecheck(val) === UNDEFINED
}

function isString(val) {
    return typeof val === _STRING || val instanceof String
}

function isNumber(val) {
    return typeof val === _NUMBER
}

function isBoolean(val) {
    return typecheck(val) === BOOLEAN
}

function isSymbol(val) {
    return typecheck(val) === SYMBOL
}

function isDate(val) {
    return val instanceof Date
}

function isRegExp(val) {
    return val instanceof RegExp
}

function isFunction(val) {
    return val instanceof Function
}

function isAsyncFunction(val) {
    return typecheck(val) === 'AsyncFunction'
}

function isGeneratorFunction(val) {
    return typecheck(val) === 'GeneratorFunction'
}
function isObject(val) {
    return !!(val != null && typeof val === _OBJECT && (Object.keys(val).length || typecheck(val) === OBJECT))
}

function isMap(val) {
    return val instanceof Map
}

function isSet(val) {
    return val instanceof Set
}

function isWeakMap(val) {
    return val instanceof WeakMap
}

function isWeakSet(val) {
    return val instanceof WeakSet
}

function isArray(val) {
    return Array.isArray(val)
}

function isInt8Array(val) {
    return val instanceof Int8Array
}

function isInt16Array(val) {
    return val instanceof Int16Array
}

function isInt32Array(val) {
    return val instanceof Int32Array
}

function isUint8Array(val) {
    return val instanceof Uint8Array
}

function isUint16Array(val) {
    return val instanceof Uint16Array
}

function isUint32Array(val) {
    return val instanceof Uint32Array
}

function isFloat32Array(val) {
    return val instanceof Float32Array
}

function isFloat64Array(val) {
    return val instanceof Float64Array
}

function isArrayBuffer(val) {
    return val instanceof ArrayBuffer
}

function isDataView(val) {
    return val instanceof DataView
}

function isError(val) {
    return typecheck(val) === NONE
}

function isSyntaxError(val) {
    return val instanceof SyntaxError
}

function isReferenceError(val) {
    return val instanceof ReferenceError
}

function isRangeError(val) {
    return val instanceof RangeError
}

function isTypeError(val) {
    return val instanceof TypeError
}

function isURIError(val) {
    return val instanceof URIError
}

function isBuffer(val) {
    return val instanceof Buffer
}

function isClass(val, constructor) {
    return val != null && val instanceof constructor
}

module.exports = {
    typecheck,
    isNull,
    isUndefined,
    isString,
    isNumber,
    isBoolean,
    isSymbol,
    isDate,
    isRegExp,
    isFunction,
    isAsyncFunction,
    isGeneratorFunction,
    isObject,
    isMap,
    isSet,
    isWeakMap,
    isWeakSet,
    isArray,
    isInt8Array,
    isInt16Array,
    isInt32Array,
    isUint8Array,
    isUint16Array,
    isUint32Array,
    isFloat32Array,
    isFloat64Array,
    isArrayBuffer,
    isDataView,
    isError,
    isSyntaxError,
    isReferenceError,
    isRangeError,
    isTypeError,
    isURIError,
    isBuffer,
    isClass
}
