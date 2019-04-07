const dump = require( 'dump' )
const { unindent } = require( 'text' )
const { green, clear } = console.ansi

const log = ( code ) => {
    let res = dump( code() )
    console.log( 'log( ' + dump( code ) + ' )' + green + ' // => ' + clear + res )
}

module.exports = log