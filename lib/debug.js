const { named } = require( 'argv' )
const dump = require( 'dump' )

const debug = ( expression ) => {
    if ( 'debug' in named ) {
        console.log( `debug( ${ dump( expression ) } )` )
    }
    return expression
}

module.exports = debug