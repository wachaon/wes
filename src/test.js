const { Enumerator } = require( 'JScript' )
const fs = require( 'filesystem' )
const { brightGreen, brightRed } =console.ansi

const FSO = require('Scripting.FileSystemObject')
let files = ( new Enumerator( FSO.GetFolder( `./test` ).Files ) ).map( v => v.path )

let total = 0
let succeed = 0

files.forEach( v => {
    let [_total, _succeed] = eval( `( () => { ${ fs.readTextFileSync( v ) } } )()` )
    total += _total
    succeed += _succeed
} )

let complete = succeed / total === 1

console.log( `\n${ complete ? brightGreen : brightRed }tests: ${ total } ${ complete ? "complete" : "fail:" + ( total - succeed ) }` )

module.exports = complete
//console.log( JSON.stringify( console.debugLog, null, 2 ) )