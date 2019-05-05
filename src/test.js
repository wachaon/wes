const { Enumerator } = require( 'JScript' )
const fs = require( 'filesystem' )

const FSO = require('Scripting.FileSystemObject')
let files = ( new Enumerator(FSO.GetFolder( `./test` ).Files ) ).map( v => v.path )

files.forEach( v => eval( fs.readTextFileSync( v ) ) )

//console.log( JSON.stringify( console.debugLog, null, 2 ) )