const isValid = ( target, name, fn, throwError ) => {
    if ( fn( target ) ) return target
    if ( throwError ) throw new Error ( `${ target } is not ${ name }` )
    return false
}
const isString = ( string, throwError ) => {
    let fn = ( target ) => typeof target === 'string'
    return isValid( string, 'String', fn, throwError )
}

const isNumber = ( number, throwError ) => {
    let fn = ( target ) =>  typeof target === 'number'
    return isValid( number, 'Number', fn, throwError )
}

const isFunction = ( func, throwError ) => {
    let fn = ( target ) => typeof target === 'function'
    return isValid( func, 'Function', fn, throwError )
}

const isArray = ( array, throwError ) => {
    let fn = ( target ) => Array.isArray( target )
    return isValid( array, 'Array', fn, throwError )
}

const isDate = ( date, throwError ) => {
    let fn = ( target ) => target instanceof Date
    return isValid( date, 'Date', fn, throwError )
}

const isRegExp = ( regexp, throwError ) => {
    let fn = ( target ) => regexp instanceof RegExp
    return isValid( regexp, 'RegExp', fn, throwError )
}

const isObject = ( object, throwError ) => {
    let fn = ( target ) => target != null && Object.prototype.toString.call( target ) === '[object Object]'
    return isValid( object, 'Object', fn, throwError )
}

const isClass = ( Class, classConstructor, throwError ) => {
    let fn = ( target ) => target instanceof classConstructor
    return isValid( Class, classConstructor.name, fn, throwError )
}

module.exports = {
    isValid,
    isString,
    isNumber,
    isFunction,
    isArray,
    isDate,
    isRegExp,
    isObject,
    isClass
}