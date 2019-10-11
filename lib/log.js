const dump = require( 'dump' )
const { green, clear } = console.ansi

const log = function log ( code ) {
    let res = dump( code() )
    console.log( 'log( ' + dump( code ) + ' )' + green + ' // => ' + clear + res + '\n' )
}

module.exports = log