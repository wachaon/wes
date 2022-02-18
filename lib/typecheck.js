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
    return type(val) === 'String'
}
function isNumber(val) {
    return type(val) === 'Number'
}
function isBoolean(val) {
    return type(val) === 'Boolean'
}
function isSymbol(val) {
    return type(val) === 'Symbol'
}
function isDate(val) {
    return type(val) === 'Date'
}
function isRegExp(val) {
    return type(val) === 'RegExp'
}
function isFunction(val) {
    return type(val) === 'Function'
}
function isAsyncFunction(val) {
    return type(val) === 'AsyncFunction'
}
function isGeneratorFunction(val) {
    return type(val) === 'GeneratorFunction'
}
function isObject(val) {
    return type(val) === 'Object'
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
    return type(val) === 'Array'
}
function isInt8Array(val) {
    return type(val) === 'Int8Array'
}
function isInt16Array(val) {
    return type(val) === 'Int16Array'
}
function isInt32Array(val) {
    return type(val) === 'Int32Array'
}
function isUint8Array(val) {
    return type(val) === 'Uint8Array'
}
function isUint16Array(val) {
    return type(val) === 'Uint16Array'
}
function isUint32Array(val) {
    return type(val) === 'Uint32Array'
}
function isFloat32Array(val) {
    return type(val) === 'Float32Array'
}
function isFloat64Array(val) {
    return type(val) === 'Float64Array'
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
    return type(val) === 'SyntaxError'
}
function isReferenceError(val) {
    return type(val) === 'ReferenceError'
}
function isTypeError(val) {
    return type(val) === 'TypeError'
}
function isURIError(val) {
    return type(val) === 'URIError'
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
