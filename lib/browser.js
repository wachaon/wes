const { isRegExp, isNumber } = require( 'typecheck' )

function browser ( callback, options ) {
    const CR = '\u001B[1G'
    const display = [ '|', '/', '-', '\\' ]
    let count = 0
    let state = ''

    function wait ( app ) {
        if ( isNumber( app ) ) {
            const time = Math.random() * app
            const finish = new Date().getTime() + app / 2 + time

            while ( Date.now() < finish ) {
                console.print( CR + 'waiting ' + display[ count++ % 4 ] )
                WScript.Sleep( 50 )
            }
        } else {
            while ( app.Busy || app.readystate != 4 ) {
                console.print( CR + 'polling ' + display[ count++ % 4 ] )
                WScript.Sleep( 50 )
            }
        }
        console.print( '%s         %s', CR, CR )
    }

    const app = require( 'InternetExplorer.Application' )
    app.Visible = !options.invisible
    app.Navigate( options.home || 'about:blank' )
    let result = options.result || {}

    try {

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

        callback( app, event, result, wait )

        while ( true ) {
            wait( app )
            const url = app.document.location.href
            if ( state === url ) {
                console.print( CR + 'polling ' + display[ count++ % 4 ] )
                WScript.Sleep( 50 )
                continue
            }
            console.print( '%s         %s', CR, CR )

            state = url
            wait( app )
            event.emit( url )

        }
    } catch ( error ) {
        console.print( '%s         %s', CR, CR )
        if ( app != null ) app.Visible = true
        if ( options.exception ) options.exception( error, result, app )
        else throw error
    }
}

module.exports = browser
