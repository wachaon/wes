const FSO = require( "Scripting.FileSystemObject" )
const io = require( 'io' )
const { Enumerator } = require( 'JScript' )

let files = new Enumerator( FSO.GetFolder( "core" ).Files )

let result = {}

files.forEach( file => {
    let [ , filename, ext ] = file.name.match( /(.+)(\..+)/ )
    if ( ext !== '.js' ) return
    let source = io.readFileSync( file.Path ).replace( /\r/g, '' ).replace( /^\s+/mg, '' )
    result[ filename ] = { source, mapping: {}, name: `core/${ filename }` }
})

let graph = JSON.stringify( result, null, 4 )

const log = require( 'log' )

let template = io.readFileSync( 'src/template.js' )
let sep = /\r\n/.test( template ) ? '\r\n': '\n'
let line = template.split( sep )
const match = /^\s*\/\*\s*includes\s+(.+)\s*\*\/\s*$/

let res = line.map( value => {
    if ( !( match.test( value ) ) ) {
        return value
    } else {
        let includeSource = graph
        return ',' + includeSource
    }
} ).join( sep )

log( () => io.writeFileSync( 'wes.js', res ) )

module.exports = graph



