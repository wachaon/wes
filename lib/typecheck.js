const toStringCall = type => type != null &&
    Object.prototype.toString.call( type )

const isClass = ( val, constructor ) => val != null &&
    val instanceof constructor

const isNull = ( val ) => val == null

const isString = val => val != null &&
    typeof val === 'string' ||
    toStringCall( val ) === '[object String]'

const isNumber = val => val != null &&
    typeof val === 'number' ||
    toStringCall( val ) === '[object Number]'

const isFunction = val => val != null &&
    typeof val === 'function'

const isBoolean = val => val != null &&
    typeof val === 'boolean'

const isSymbol = val => val != null &&
    typeof val === 'symbol'



const isDate = val => isClass( val, Date )

const isRegExp = ( val ) => isClass( val, RegExp )

const isArray = ( val ) => Array.isArray( val )

const isObject = ( val ) => val != null &&
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