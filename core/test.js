
    let depth = 0
    let caption = []
    let indent = ""
    let rate = 4
    let space = " "
    let noop = ( () => {} )
    let n = '\n'

    const checkMark = '\u2714'

    const {
        brightRed: red,
        brightGreen: green,
        brightYellow: yellow,
        brightMagenta: pink,
        gray
    } = console.ansi

    const describe = ( title, fn ) => {
        let s = depth ? '' : n
        depth++
        indent = space.repeat( depth * rate )
        console.log( s + indent + title + n )
        fn()
        depth--
    }

    const it = ( message, fn ) => {
        depth++
        indent = space.repeat( depth * rate )
        const printCode = ( code ) => {
            let source = code.toString().split( '\t' ).join( '    ' ).split( /\r?\n/ )
            if ( source.length < 2 ) return `${ space.repeat( indent + rate ) }${ source[0] }`
            source[0] = `${ source[ source.length - 1 ].match( /^\s+/ )[0] }${ source[0] }`
            const sp = source.map( v => v.match( /^\s+/ )[0].length )
            const min = Math.min.apply( null, sp )
            return source.map( ( v ) => {
                return `${ space.repeat( ( depth + 1 ) * rate ) }${ v.replace( space.repeat( min ), ""  ) }`
            } ).join( "\n" )
        }

        try {
            fn()
            console.log( `${ indent }${ gray }${ message } ${ green }${ checkMark }` )
        } catch ( e ) {
            console.log( `${ indent }${ pink }${ message }\n${ yellow }${ printCode( fn ) } ${ red }// => ${ e.message }${ n }` )
        } finally {
            depth--
        }
    }

    const assert = ( assertion ) => {
        return assert.ok( assertion )
    }
    assert.ok = ( assertion ) => {
        let res = typeof assertion === 'function' ? assertion() : assertion
        if ( !res ) throw new Error( res )
    }
    assert.ng = ( assertion ) => {
        let res = typeof assertion === 'function' ? assertion() : assertion
        if ( res ) throw new Error( res )
    }

    module.exports = {
        describe,
        it,
        assert
    }



