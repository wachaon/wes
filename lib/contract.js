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
    if( !isDebugOption() ) return void 0
    const res = condition( ...args )
    if ( res.every( v => v ) ) return void 0

    let message = `${ errorColor }Contract Error${ clear }
call: ${ codeColor }${ code.name || code }${ clear } ( ${ require.stack[ require.stack.length  -1 ][0] } )
condition: ${
    conditionColor }${ condition.name || condition }${ clear }${
'\n  ' + args.map( ( v, i ) => 'arguments[' + ( i ) + ']: ' + dump( v ) + commentColor + ' // => ' + clear + dump( res[i] ) ).join( '\n  ' ) + '\n'
}`

    console.debug( message )
    return void 0
}

module.exports = contract