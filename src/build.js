const FSO = require( "Scripting.FileSystemObject" )
const fs = require( 'filesystem' )
const path = require( 'pathname' )
const { REG_CRLF, CRLF, SPACE } = require( 'text' )
const { Enumerator } = require( 'JScript' )

let files = new Enumerator( FSO.GetFolder( "lib" ).Files )

let result = {}

files.forEach( file => {
    //let [ , filename, ext ] = file.name.match( /(.+)(\..+)/ )
    let filename = path.basename( file.name, '.js' )
    let ext = path.extname( file.name )
    //console.log( filename, ext )
    //console.log( path.basename( file.name, '.js' ), path.extname( file.name ) )
    if ( ext !== '.js' ) return
    let source = fs.readTextFileSync( file.Path ).replace( /\r/g, '' ).replace( /^\s+/mg, '' )
    result[ filename ] = { source, mapping: {}, name: `wes/${ filename }` }
})

let graph = ( ',' + JSON.stringify(result, null, 4) )
    .split( REG_CRLF )
    .map(v => SPACE.repeat(12) + v)
    .join( CRLF )


const log = require( 'log' )

let template = fs.readTextFileSync( 'src/template.js' )
let sep = /\r\n/.test( template ) ? '\r\n': '\n'
let line = template.split( sep )
const match = /^\s*\/\*\s*includes\s+(.+)\s*\*\/\s*$/

let res = line.map( value => {
    if ( !( match.test( value ) ) ) {
        return value
    } else {
        return  graph
    }
} ).join( sep )

log( () => fs.writeTextFileSync( 'wes.js', res ) )

module.exports = graph



