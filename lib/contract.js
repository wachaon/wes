const { isDebugOption } = require( 'debug' )
const dump = require( 'dump' )
const {
    brightRed: errorColor,
    gray: commentColor,
    yellow: codeColor,
    cyan: conditionColor,
    clear
} = console.ansi

function contract ( code, condition, ...args ) {
    if( !isDebugOption() ) return code( ...args )
    const res = condition( ...args )
    if ( res.every( v => v ) ) return code( ...args )

    let message = `${ errorColor }Contract Error${ clear }
call: ${ codeColor }${ code.name || code }${ clear } ( ${ require.stack[ require.stack.length  -1 ][0] } )
condition: ${
    conditionColor }${ condition.name || condition }${ commentColor}${ clear }${
'\n  ' + args.map( ( v, i ) => 'arguments[' + ( i + 1 ) + ']: ' + dump( v ) + commentColor + ' // => ' + clear + dump( res[i] ) ).join( '\n  ' )
}\n`

    console.debug( message )
    return code( ...args )
}

module.exports = contract