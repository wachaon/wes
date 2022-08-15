const {
    _OBJECT,
    STRING,
    NUMBER,
    BOOLEAN,
    FUNCTION,
    SYMBOL,
    DATE,
    REGEXP,
    OBJECT,
    INT8ARRAY,
    UINT8ARRAY,
    INT16ARRAY,
    UINT16ARRAY,
    INT32ARRAY,
    UINT32ARRAY,
    FLOAT32ARRAY,
    FLOAT64ARRAY,
    SYNTAXERROR,
    REFERENCEERROR,
    TYPEERROR,
    URIERROR
} = require('text')

function typecheck(val) {
    if (val == null) {
        if (val === null) return 'Null'
        if (val === undefined) return 'Undefined'
    }
    return val.constructor.name
}

function isNull(val) {
    return typecheck(val) === 'Null'
}
function isUndefined(val) {
    return typecheck(val) === 'Undefined'
}
function isString(val) {
    return typecheck(val) === STRING
}
function isNumber(val) {
    return typecheck(val) === NUMBER
}
function isBoolean(val) {
    return typecheck(val) === BOOLEAN
}
function isSymbol(val) {
    return typecheck(val) === SYMBOL
}
function isDate(val) {
    return typecheck(val) === DATE
}
function isRegExp(val) {
    return typecheck(val) === REGEXP
}
function isFunction(val) {
    return typecheck(val) === FUNCTION
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
    return typecheck(val) === 'Map'
}
function isSet(val) {
    return typecheck(val) === 'Set'
}
function isWeakMap(val) {
    return typecheck(val) === 'WeakMap'
}
function isWeakSet(val) {
    return typecheck(val) === 'WeakSet'
}
function isArray(val) {
    return Array.isArray(val)
}
function isInt8Array(val) {
    return typecheck(val) === INT8ARRAY
}
function isInt16Array(val) {
    return typecheck(val) === INT16ARRAY
}
function isInt32Array(val) {
    return typecheck(val) === INT32ARRAY
}
function isUint8Array(val) {
    return typecheck(val) === UINT8ARRAY
}
function isUint16Array(val) {
    return typecheck(val) === UINT16ARRAY
}
function isUint32Array(val) {
    return typecheck(val) === UINT32ARRAY
}
function isFloat32Array(val) {
    return typecheck(val) === FLOAT32ARRAY
}
function isFloat64Array(val) {
    return typecheck(val) === FLOAT64ARRAY
}
function isArrayBuffer(val) {
    return typecheck(val) === 'ArrayBuffer'
}
function isDataView(val) {
    return typecheck(val) === 'DataView'
}
function isError(val) {
    return typecheck(val) === ''
}
function isSyntaxError(val) {
    return typecheck(val) === SYNTAXERROR
}
function isReferenceError(val) {
    return typecheck(val) === REFERENCEERROR
}
function isTypeError(val) {
    return typecheck(val) === TYPEERROR
}
function isURIError(val) {
    return typecheck(val) === URIERROR
}
function isBuffer(val) {
    return typecheck(val) === 'Buff'
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
    isTypeError,
    isURIError,
    isBuffer,
    isClass
}
