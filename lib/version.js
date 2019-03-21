const io = require( 'io' )

const packageJSON = JSON.parse( io.readFileSync( 'package.json' ) )

module.exports = packageJSON.version