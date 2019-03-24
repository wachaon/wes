const output = require( 'output' )
const { green, clear } = console.ansi

const log = ( code ) => {
    let res = output( code() )
    console.log( code.toString() + green + ' // => ' + clear + res )
}

module.exports = log