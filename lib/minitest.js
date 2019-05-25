const { LF, TAB, REG_CRLF, SPACE, INDNT } = require('text')

let depth = 0
let indent = ''
let rate = 4
let n = LF
let pass = [0, 0]

const checkMark = '\u221a'

const {
    brightRed: red,
    brightGreen: green,
    brightYellow: yellow,
    brightMagenta: pink,
    gray
} = console.ansi

const describe = ( title, fn ) => {
    depth++
    indent = SPACE.repeat( depth * rate )
    console.log( LF + indent + title )
    fn()
    depth--
}

const it = ( message, fn ) => {
    depth++
    indent = SPACE.repeat( depth * rate )
    const printCode = (code) => {
        let source = code
            .toString()
            .split( TAB )
            .join( '    ' )
            .split( REG_CRLF )
        if ( source.length < 2 )
            return `${ SPACE.repeat( indent + rate ) }${ source[0] }`
        source[0] = `${ source[ source.length - 1 ].match( INDNT )[0] }${ source[0] }`
        const sp = source.map((v) => v.match( INDNT )[0].length)
        const min = Math.min.apply( null, sp )
        return source
            .map( v => {
                return `${ SPACE.repeat( ( depth + 1 ) * rate ) }${ v.replace(
                    SPACE.repeat(min),
                    ''
                ) }`
            } )
            .join( '\n' )
    }

    try {
        pass[0]++
        fn()
        pass[1]++
        console.log(`${ indent }${ gray }${ message } ${ green }${ checkMark }`)
    } catch (e) {
        console.log(
            `${ indent }${ pink }${ message }${ n }${ yellow }${ printCode(
                fn
            )} ${ red }// => ${ e.message }${ n }`
        )
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
    assert,
    pass
}
