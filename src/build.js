try {
    const FSO = require( "Scripting.FileSystemObject" )
    const io = require( 'io' )
    const Enumerator = require( 'enumerator' )
    const log = require( 'log' )

    let files = new Enumerator( FSO.GetFolder( "core" ).Files )

    let result = {}

    files.forEach( ( file ) => {
        let [ , filename, ext ] = file.Path.split( io.win32Sep ).pop().match( /(^.+)(\.[^\.]+$)/ )

        if ( ext !== '.js' ) return

        let source = io.readFileSync( file.Path ).replace( /\r/g, '' )
        result[ filename ] = { source, mapping: {}, name: null }

    } )

    let graph = JSON.stringify( result, null, 2 )


    log( () => io.writeFileSync( 'core/core.json', graph ) )

} catch ( e ) { console.log( e.stack ) }


