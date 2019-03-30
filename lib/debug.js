const { named } = require( 'args' )
const output = require( 'output' )

const debug = ( expression ) => {
    if ( 'debug' in named ) {
        console.log( `debug( ${ output( expression ) } )` )
    }
    return expression
}

module.exports = debug