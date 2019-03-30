const { Enumerator } = require( 'JScript' )
const io = require( 'io' )

const FSO = require('Scripting.FileSystemObject')
let files = ( new Enumerator(FSO.GetFolder( `./test` ).Files ) ).map( v => v.path )

files.forEach( v => eval( io.readFileSync( v ) ) )