const { isRegExp, isNumber } = require( 'typecheck' )

function poling ( callback, options ) {

    function wait ( browser ) {
        if ( isNumber( browser ) ) {
            const time = Math.random() * browser
            const finish = new Date().getTime() + browser / 2 + time
            const display = [ '|', '/', '-', '\\' ]
            const carriageReturn = '\u001B[1G'
            let count = 0

            while ( Date.now() < finish ) {
                console.print( carriageReturn + 'waiting ' + display[ count++ % 4 ] )
                WScript.Sleep( 50 )
            }
            console.print( carriageReturn + '         ' + carriageReturn )
        } else {
            while ( browser.Busy || browser.readystate != 4 ) {
                WScript.Sleep(100)
            }
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
        callback( app, event, result, wait )

        const display = [ '|', '/', '-', '\\' ]
        const carriageReturn = '\u001B[1G'
        let state = ''
        let count = 0

        while ( true ) {
            wait( app )
            const url = app.document.location.href
            if ( state === url ) {
                console.print( carriageReturn + 'poling ' + display[ count++ % 4 ] )
                WScript.Sleep( 50 )
                continue
            }
            console.print( carriageReturn + '        ' + carriageReturn )

            wait( app )
            event.emit( url )
            state = url
        }
    } catch ( error ) {
        if ( app != null ) app.Visible = true
        if ( options.exception ) options.exception( error, result, app )
        else throw error
    }
}

exports.poling = poling
