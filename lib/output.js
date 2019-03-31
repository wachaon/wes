const output = ( variable, color = true ) => {
    let {
        brightBlue: number,
        brightCyan: func,
        brightYellow: string,
        brightGreen: date,
        brightRed: circle,
        yellow: regexp,
        gray: nul,
        clear
    } = color ? console.ansi : {
        brightBlue: '',
        brightCyan: '',
        brightYellow: '',
        brightGreen: '',
        brightRed: '',
        brightMagenta: '',
        gray: '',
        clear: ''
    }

    const Day = require( 'day' )
    const { LF, NONE, unindent } = require( 'text' )
    const TAB = '    '
    let level = 0
    let Circle = new Set
    let traverse = ['this']

    const print = ( target ) => {
        if ( typeof target === 'function' ) return fn( target ) + clear
        if ( typeof target === 'string' ) return str( target )
        if ( typeof target === 'number' ) return number + target + clear
        if ( target instanceof RegExp ) return regexp + target.toString() + clear
        if ( target instanceof Date ) return date + `new Date( '${ new Day( target ) }' )` + clear
        if ( target == null ) return nul + target + clear
        if ( Array.isArray( target ) ) {
            if ( Circle.has( target ) ) {
                let res = circle + '<Circle::' + traverse.slice( 0, -1 ).join( NONE ) + '>' + clear
                return res
            }
            Circle.add( target )
            return arr( target )
        }
        if ( Object.prototype.toString.call( target ) === '[object Object]' ) {
            if ( Circle.has( target ) ) {
                let res = circle + '<Circle::' + traverse.slice( 0, -1 ).join( NONE ) + '>' + clear
                return res
            }
            Circle.add( target )

            return obj( target )
        }
    }

    const fn = ( code ) => {
        let source = unindent( code.toString() ).split( LF )
            .map( ( v, i ) => i === 0 ? v : TAB.repeat( level ) + v )
            .join( LF )
        return func + source + clear
    }

    const str = ( text ) => {
        if ( color ) return string + `\`${ text.replace( /`/g, '\\`' ) }\`` + clear
        return string + `"${ text.replace( /\n/g, '\\n' ).replace( /"/g, '\\"' ) }"` + clear
    }

    const arr = ( list ) => {
        level++
        let res = list.map ( ( v, i ) => {
            traverse.push( `[${ i }]` )
            let r = TAB.repeat( level ) + print( v )
            traverse.pop()
            return r
         } )
        level--
        let result =  0 < res.length ? LF + res.join( ',' + LF  ) + LF + TAB.repeat( level ) : NONE
        return '[' + result + ']'
    }

    const obj = ( keys ) => {
        const list = Object.keys( keys )
        level++
        let res = list.map( v => {
            traverse.push( `['${ v }']` )
            let r = TAB.repeat( level ) + v + ': ' + print( keys[v] )
            traverse.pop()
            return r
        } )
        level--
        let result = res.length ? LF + res.join( ',' + LF  ) + LF  + TAB.repeat( level ) : NONE
        return '{' + result + '}'
    }

    return print( variable )
}

module.exports = output



