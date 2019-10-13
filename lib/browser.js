
const { isRegExp } = require( 'typecheck' )

function poling ( callback, options ) {

    function wait ( browser ) {
        if ( isNumber( browser ) ) {
            let time = Math.random( browser )
            WScript.Sleep( browser / 2 + time )
            return void 0
        }
        while ( browser.Busy || browser.readystate != 4 ) {
            WScript.Sleep(100)
        }
    }

    const app = require( 'InternetExplorer.Application' )
    app.Visible = !options.invisible
    app.Navigate( options.home || 'about:blank' )

    wait( app )

    const events = new Map()
    const event = {
        on ( target, fn ) {
            if ( events.has( target ) ) events.get( target ).push( fn )
            else events.set( target, [ fn ] )
        },
        emit ( url, ...params ) {
            events.forEach( ( callbacks, evaluation ) => {
                if ( ( isRegExp( evaluation ) && evaluation.test( url ) ) || String( evaluation ) === url ) callbacks.forEach( fn => fn( url, ...params ) )
            } )
        }
    }

    let result = {}

    try {
        callback( app, event, result )

        let state = ''
        console.print( 'poling' )

        while ( true ) {
            wait( app )
            let url = app.document.location.href
            if ( state === url ) {
                console.print( '.' )
                WScript.Sleep( 100 )
                continue
            }
            wait( app )
            event.emit( url )
            state = url
        }
    } catch ( error ) {
        console.log( '\n' )
        if ( app != null ) app.Visible = true
        if ( options.exception ) options.exception( error, result, app )
        else throw error
    }
}

exports.poling = poling
