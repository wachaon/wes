const toStringCall = function typecheck_toStringCall ( type ) {
    return type != null && Object.prototype.toString.call( type )
}
const isClass = function typecheck_isClass ( val, constructor ) {
    return val != null && val instanceof constructor
}

const isNull = function typecheck_isNull ( val ) { return val === null }

const isString = function typecheck_isString ( val ) {
    return val != null && typeof val === 'string' || toStringCall( val ) === '[object String]'
}

const isNumber = function typecheck_isNumber( val ) {
    return val != null && typeof val === 'number' || toStringCall( val ) === '[object Number]'
}

const isFunction = function typecheck_isFunction( val ) {
    return val != null && typeof val === 'function'
}

const isBoolean = function typecheck_isBoolen( val ) {
    return val != null && typeof val === 'boolean'
}

const isSymbol = function typecheck_isSymbol( val ) {
    return val != null && typeof val === 'symbol'
}

const isDate = function typecheck_isDate( val ) { return isClass( val, Date ) }

const isRegExp = function typecheck_isRegExp ( val ) { return isClass( val, RegExp ) }

const isArray = function typecheck_isArray ( val ) { return Array.isArray( val ) }

const isObject = function typecheck_isObject ( val ) {
    return val != null &&  toStringCall( val ) === '[object Object]'
}

const isInt8Array = function typechack_isInt8Array ( val ) {
    return isClass( val, Int8Array )
}

const isUint8Array = function typechack_isUint8Array ( val ) {
    return isClass( val, Uint8Array )
}

const isUint8ClampedArray = function typechack_isUint8ClampedArray ( val ) {
    return isClass( val, Uint8ClampedArray )
}
const isInt16Array = function typechack_isInt16Array ( val ) {
    return isClass( val, Int16Array )
}

const isUint16Array = function typechack_isUint16Array ( val ) {
    return isClass( val, Uint16Array )
}

const isInt32Array = function typechack_isInt32Array ( val ) {
    return isClass( val, Int32Array )
}

const isUint32Array = function typechack_isUint32Array ( val ) {
    return isClass( val, Uint32Array )
}

const isFloat32Array = function typechack_isFloat32Array ( val ) {
    return isClass( val, Float32Array )
}

const isFloat64Array = function typechack_isFloat64Array ( val ) {
    return isClass( val, Float64Array )
}

module.exports = {
    isNull,
    isString,
    isNumber,
    isFunction,
    isBoolean,
    isSymbol,
    isDate,
    isRegExp,
    isArray,
    isObject,
    isClass,
    isInt8Array,
    isUint8Array,
    isUint8ClampedArray,
    isInt16Array,
    isUint16Array,
    isInt32Array,
    isUint32Array,
    isFloat32Array,
    isFloat64Array
}