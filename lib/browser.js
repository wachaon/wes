const { isRegExp, isNumber, isString } = require( 'typecheck' )

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

    const history = ( function history ( url ) {
        let location = []
        return {
            back ( url ) { // url isString
                if ( isString( url ) ) {
                    for ( let i = location.length; i; i-- ) {
                        if ( location[ i - 1 ].startsWith( url ) ) {
                            location.length = i
                            return location[ i - 1 ]
                        }
                        return null
                    }
                } else if ( isNumber( url ) ){ // url isNumber
                    let num = location.length - url
                    location.length = num
                    return location[ num - 1 ]
        }
            },
            push ( url ) {
                if ( location[ location.length - 1 ] === url ) {} else  location.push( url )
            },
            history () {
                return [ ...location ]
            }

        }
    } )();

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

        callback( app, event, result, wait, history )

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
