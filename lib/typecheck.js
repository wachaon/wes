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

function type(val) {
    if (val == null) {
        if (val === null) return 'Null'
        if (val === undefined) return 'Undefined'
    }
    return val.constructor.name
}

function isNull(val) {
    return type(val) === 'Null'
}
function isUndefined(val) {
    return type(val) === 'Undefined'
}
function isString(val) {
    return type(val) === STRING
}
function isNumber(val) {
    return type(val) === NUMBER
}
function isBoolean(val) {
    return type(val) === BOOLEAN
}
function isSymbol(val) {
    return type(val) === SYMBOL
}
function isDate(val) {
    return type(val) === DATE
}
function isRegExp(val) {
    return type(val) === REGEXP
}
function isFunction(val) {
    return type(val) === FUNCTION
}
function isAsyncFunction(val) {
    return type(val) === 'AsyncFunction'
}
function isGeneratorFunction(val) {
    return type(val) === 'GeneratorFunction'
}
function isObject(val) {
    return !!(val != null && typeof val === _OBJECT && (Object.keys(val).length || type(val) === OBJECT))
}
function isMap(val) {
    return type(val) === 'Map'
}
function isSet(val) {
    return type(val) === 'Set'
}
function isWeakMap(val) {
    return type(val) === 'WeakMap'
}
function isWeakSet(val) {
    return type(val) === 'WeakSet'
}
function isArray(val) {
    return Array.isArray(val)
}
function isInt8Array(val) {
    return type(val) === INT8ARRAY
}
function isInt16Array(val) {
    return type(val) === INT16ARRAY
}
function isInt32Array(val) {
    return type(val) === INT32ARRAY
}
function isUint8Array(val) {
    return type(val) === UINT8ARRAY
}
function isUint16Array(val) {
    return type(val) === UINT16ARRAY
}
function isUint32Array(val) {
    return type(val) === UINT32ARRAY
}
function isFloat32Array(val) {
    return type(val) === FLOAT32ARRAY
}
function isFloat64Array(val) {
    return type(val) === FLOAT64ARRAY
}
function isArrayBuffer(val) {
    return type(val) === 'ArrayBuffer'
}
function isDataView(val) {
    return type(val) === 'DataView'
}
function isError(val) {
    return type(val) === ''
}
function isSyntaxError(val) {
    return type(val) === SYNTAXERROR
}
function isReferenceError(val) {
    return type(val) === REFERENCEERROR
}
function isTypeError(val) {
    return type(val) === TYPEERROR
}
function isURIError(val) {
    return type(val) === URIERROR
}
function isBuffer(val) {
    return type(val) === 'Buff'
}

function isClass(val, constructor) {
    return val != null && val instanceof constructor
}

module.exports = {
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
