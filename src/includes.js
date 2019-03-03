const log = require( 'log' )
const io = require( 'io' )

let template = io.readFileSync( 'src/template.js' )
let sep = /\r\n/.test( template ) ? '\r\n': '\n'
let line = template.split( sep )
const match = /^\s*\/\*\s*includes\s+(.+)\s*\*\/\s*$/

let res = line.map( value => {
    if ( !( match.test( value ) ) ) {
        return value
    } else {
        let includeSource = require( './build' )
        return ',' + includeSource
    }
} ).join( sep )

log( () => io.writeFileSync( 'wes.js', res ) )