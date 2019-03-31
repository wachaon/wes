const output = require( 'output' )
const { unindent } = require( 'text' )
const { green, clear } = console.ansi

const log = ( code ) => {
    let res = output( code() )
    console.log( 'log( ' + output( code ) + ' )' + green + ' // => ' + clear + res )
}

module.exports = log