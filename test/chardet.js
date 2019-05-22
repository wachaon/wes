const { describe, it, assert, pass } = require( 'minitest' )

describe( '#test chardet', () => {
    const { Enumerator } = require( 'JScript' )
    const FSO = require( 'Scripting.FileSystemObject' )
    const path = require( 'pathname' )
    const WShell = require( 'WScript.Shell' )
    const fs = require( 'filesystem' )
    const chardet = require( 'chardet' )

    const dir = path.join( WShell.CurrentDirectory, 'test/encodings' )
    const folder = FSO.GetFolder( dir )
    const encodeings = new Enumerator( folder.Files )
    const names = encodeings.map( file => file.name )
    const paths = encodeings
        .map( file => file.Path )
        //.map( path => fs.readTextFileSync( path ) )

    paths.forEach( ( path, i ) => {
        const detect = chardet.detect( fs.readFileSync( path ) )
        it( names[i] + ' === ' + detect, () => {
            const a = detect.toLowerCase().replace( /\-/g, '_' )
            const b = detect.toLowerCase().replace( /\-/g, '' )
            assert(
                names[i] === a ||
                names[i] === b ||
                names[i].startsWith( b ) ||
                names[i].startsWith( 'lang' ) && detect === 'UTF-8'
            )
        } )
    } )
} )

return pass