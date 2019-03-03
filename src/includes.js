const log = require( 'log' )
const io = require( 'io' )

//let core = io.readFileSync( 'core/core.json' )
let template = io.readFileSync( 'src/template.js' )

//console.log( template )
let sep = /\r?\n/.test( template ) ? '\r\n': '\n'
let line = template.split( sep )

//log( () => line )
const match = /^\s*\/\*\s*includes\s+(.+)\s*\*\/\s*$/

let res = line.map( value => {
    if ( !( match.test( value ) ) ) {
        return value
    } else {
        //let path = value.match( match )[1].trim()
        let includeSource = require( './build' )
        return ',' + includeSource
    }
} ).join( sep )

log( () => io.writeFileSync( 'wes.js', res ) )