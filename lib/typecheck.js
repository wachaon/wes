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
    isClass
}