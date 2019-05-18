const toStringCall = type =>
    Object.prototype.toString.call( type )

const isClass = ( val, constructor ) =>
    val instanceof constructor

const isNull = ( val ) => val == null

const isString = val =>
    typeof val === 'string' ||
    toStringCall( val ) === '[object String]'

const isNumber = val =>
    typeof val === 'number' ||
    toStringCall( val ) === '[object Number]'

const isFunction = val =>
    typeof val === 'function'

const isBoolean = val =>
    typeof val === 'boolean'

const isSymbol = val =>
    typeof val === 'symbol'



const isDate = val => isClass( val, Date )

const isRegExp = ( val ) => isClass( val, RegExp )

const isArray = ( val ) => Array.isArray( val )

const isObject = ( val ) =>
    val != null &&
    toStringCall( val ) === '[object Object]'

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