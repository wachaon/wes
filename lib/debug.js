const argv = require( 'argv' )
const dump = require( 'dump' )

const debug = ( expression ) => {
    if ( argv.exists( 'debug' ) ) {
        console.log( `debug: ${ dump( expression ) }` )
    }
    return expression
}

module.exports = debug