const { isRegExp, isNumber } = require( 'typecheck' )

function browser ( callback, options ) {
    const CR = '\u001B[1G'

    function wait ( app ) {
        if ( isNumber( app ) ) {
            const time = Math.random() * app
            const finish = new Date().getTime() + app / 2 + time
            const display = [ '|', '/', '-', '\\' ]
            let count = 0

            while ( Date.now() < finish ) {
                console.print( CR + 'waiting ' + display[ count++ % 4 ] )
                WScript.Sleep( 50 )
            }
            console.print( CR + '         ' + CR )
        } else {
            while ( app.Busy || app.readystate != 4 ) {
                console.print( CR + 'waiting ' + display[ count++ % 4 ] )
                WScript.Sleep(50)
            }
        }
    }

    const app = require( 'InternetExplorer.Application' )
    app.Visible = !options.invisible
    app.Navigate( options.home || 'about:blank' )
    let result = {}

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

        const display = [ '|', '/', '-', '\\' ]
        let state = ''
        let count = 0

        while ( true ) {
            wait( app )
            const url = app.document.location.href
            if ( state === url ) {
                console.print( CR + 'poling ' + display[ count++ % 4 ] )
                WScript.Sleep( 50 )
                continue
            }
            console.print( CR + '        ' + CR )

            wait( app )
            event.emit( url )
            state = url
        }
    } catch ( error ) {
        console.print( CR + '                   ' + CR )
        if ( app != null ) app.Visible = true
        if ( options.exception ) options.exception( error, result, app )
        else throw error
    }
}

module.exports = browser
