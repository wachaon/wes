const toStringCall = type =>
    Object.prototype.toString.call( type )

const isClass = ( constructor, val ) =>
    val instanceof constructor


const isString = val =>
    typeof val === 'string' ||
    toStringCall( val ) === '[object String]'

const isNumber = val =>
    typeof val === 'number' ||
    toStringCall( val ) === '[object Number]'

const isFunction = val =>
    typeof val === 'function'

const isDate = val => isClass( Date, val )

const isRegExp = ( val ) => isClass( RegExp, val )

const isArray = ( val ) => Array.isArray( val )

const isObject = ( val ) =>
    target != null &&
    toStringCall( target ) === '[object Object]'

module.exports = {
    isString,
    isNumber,
    isFunction,
    isDate,
    isRegExp,
    isArray,
    isObject,
    isClass
}