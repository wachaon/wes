const genUUID = require( 'genUUID' )
const path = require( 'pathname' )
const fs = require( 'filesystem' )

const options = {
    async: false,
    user: null,
    password: null,
    params: {},
    exception( error, app ) {
        console.log( error.stack )
    },
    execute( app, opt ) {
        if ( app.status !== 200 ) throw new Error( 'http status %j', app.status )
        const temp = path.join( path.CurrentDirectory, genUUID() + '.txt' )
        fs.writeFileSync( temp, app.responseBody )
        const body = opt.charset != null ? fs.readFileSync( temp, opt.charset ) : fs.readTextFileSync( temp )
        fs.deleteFileSync( temp )
        return body
    }
}

const httprequest = function httprequest_httprequest ( method, url, opt ) {
    opt = Object.assign( options, opt )
    try {
        var http = require( 'Msxml2.ServerXMLHTTP' )
        http.open( method.toUpperCase(), url, opt.async, opt.user, opt.password )

        if ( method.toLowerCase() === 'post' ) {
            http.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' )
            http.send( escapeParams( opt.params ) )
        } else http.send()

        return opt.execute( http, opt )
    } catch ( error ){
        opt.exception( error, http )
    }
}

function escapeParams ( params ) {
    function enc ( value ) {
        return encodeURIComponent( value ).split("%20").join("+")
    }
    return Object.keys( params ).reduce( ( acc, curr, i ) => {
        if ( i === 1 ) acc = enc( acc ) + '=' + enc( params[ acc ] )
        return acc + '&' + enc( curr ) + '=' + enc( params[ curr ] )
    } )
}

module.exports = httprequest