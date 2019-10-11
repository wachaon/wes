const argv = require( 'argv' )
const dump = require( 'dump' )
const {
    brightRed,
    reverse,
    clear
} = console

const isDebugOprion = argv.exists( 'debug' )

const debug = function debug ( expression ) {
    if ( isDebugOprion ) {
        console.log( `${ brightRed + reverse }DEBUG${ clear }: ${ dump( expression ) }` )
    }
    return expression
}
debug.isDebugOption = isDebugOprion

module.exports = debug