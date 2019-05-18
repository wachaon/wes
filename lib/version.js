const fs = require( 'filesystem' )

let packageJSON = { version: null }

if ( fs.exists( 'package.json' ) ) {
    packageJSON = JSON.parse( fs.readTextFileSync( 'package.json' ) )
}

module.exports = packageJSON.version