const {
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
} = require( 'typecheck' )

const dump = function dump ( variable, color = true ) {
    let {
        brightBlue: number,
        cyan: boolean,
        brightCyan: func,
        brightYellow: string,
        brightGreen: date,
        brightRed: circle,
        yellow: regexp,
        brightMagenta: symbol,
        gray: nul,
        silver: uint8array,
        clear
    } = color ? console.ansi : {
        brightBlue: '',
        cyan: '',
        brightCyan: '',
        brightYellow: '',
        brightGreen: '',
        brightRed: '',
        yellow: '',
        brightMagenta: '',
        gray: '',
        silver: '',
        clear: ''
    }

    const Day = require( 'day' )
    const { LF, NONE, unindent } = require( 'text' )
    const TAB = '    '
    let level = 0
    let Circle = new Map

    const print = function dump_pringt ( target, key ) {
        if ( isFunction( target ) ) return fn( target ) + clear
        if ( isString( target ) ) return str( target )
        if ( isNumber( target ) ) return number + target + clear
        if ( isBoolean( target ) ) return boolean + target + clear
        if ( isRegExp( target ) ) return regexp + target.toString() + clear
        if ( isDate( target ) ) return date + `new Date( '${ new Day( target ) }' )` + clear
        if ( isSymbol( target ) ) return symbol + 'Symbol()' + clear
        if ( isClass( target, Uint8Array ) ) {
            let res = []
            target.forEach( v => res.push( ( '0' + v.toString( 16 ) ).slice( -2 ) ) )
            return uint8array + '<Buffer ' + res.join( ' ' ) + ' >'
        }
        if ( isNull( target ) ) return nul + target + clear
        if ( isArray( target ) ) {
            if ( Circle.has( target ) ) {
                let res = circle + '<Circle::' +  Circle.get( target ) + '>' + clear
                return res
            }
            key = key == null ? 'this' : key
            Circle.set( target, key )
            return arr( target, key )
        }
        if ( isObject( target ) ) {
            if ( Circle.has( target ) ) {
                let res = circle + '<Circle::' + Circle.get( target ) + '>' + clear
                return res
            }
            key = key == null ? 'this' : key
            Circle.set( target, key )
            return obj( target, key )
        }
    }

    const fn = function dump_fn ( code ) {
        let source = unindent( code.toString() ).split( LF )
            .map( ( v, i ) => i === 0 ? v : TAB.repeat( level ) + v )
            .join( LF )
        return func + source + clear
    }

    const str = function dump_str ( text ) {
        if ( color ) return string + `\`${ text.replace( /`/g, '\\`' ) }\`` + clear
        return string + `"${ text.replace( /\n/g, '\\n' ).replace( /"/g, '\\"' ) }"` + clear
    }

    const arr = function dump_arr ( list, key ) {
        level++
        let res = list.map( ( v, i ) => {
            let r = TAB.repeat( level ) + print( v, key + `[${ i }]` )
            return r
         } )
        level--
        let result =  0 < res.length ? LF + res.join( ',' + LF  ) + LF + TAB.repeat( level ) : NONE
        return '[' + result + ']'
    }

    const obj = function dump_obj ( keys, key ) {
        const list = Object.getOwnPropertyNames( keys )
        level++
        let res = list.map( v => {
            let r = TAB.repeat( level ) + v + ': ' + print( keys[v], key + `["${ v }"]` )
            return r
        } )
        level--
        let result = res.length ? LF + res.join( ',' + LF  ) + LF  + TAB.repeat( level ) : NONE
        return '{' + result + '}'
    }

    return print( variable )
}

module.exports = dump
