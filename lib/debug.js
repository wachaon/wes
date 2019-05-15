const argv = require( 'argv' )
const dump = require( 'dump' )

const isDebugOprion = () => argv.exists( 'debug' )

const debug = ( expression ) => {
    if ( isDebugOprion ) {
        console.log( `debug: ${ dump( expression ) }` )
    }
    return expression
}
debug.isDebugOption = isDebugOprion

module.exports = debug