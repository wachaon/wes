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

module.exports = graph



