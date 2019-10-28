var argv = ( function () {
    var args = WScript.Arguments

    var res = []
    var options = {}
    var short = /^\-/
    var named = /^\-{2}/
    var sep = '='
    var none = ''

    for ( var i = 0; i < args.length; i++ ) {
        var Arg = unescape( args( i ) )
        var arg = Arg.toLowerCase()
        var opt = none
        var next = args.length > i + 1 ? unescape( args( i + 1 ) ) : none

        if ( named.test( arg ) ) {
            opt = arg.slice( 2 )
            if ( ~arg.indexOf( sep ) ) options[ opt.split( sep )[0] ] = opt.split( sep )[1]
            else {
                if ( short.test( next ) ) options[ opt ] = true
                else {
                    options[ opt ] = next
                    i++
                }
            }
        } else if ( short.test( arg ) ) {
            opt = arg.slice( 1 )
            for ( var j = 0; j < opt.length; j++ ) {
                options[ opt[j] ] = true
            }
            if ( !short.test( next ) ) {
                options[ opt.slice( -1 ) ] = next
                i++
            }
        } else {
            res.push( Arg )
        }

    }

    var get = function argv_get ( named ) {
        const res = argv.options[ named.toLowerCase() ]
        return named.toLowerCase() in argv.options ? res : null
    }

    var security = function argv_security ( lv ) {
        let level = 0
        if ( argv.get( 'danger' ) ) level = security.danger
        if ( argv.get( 'unsafe') ) level = security.unsafe
        if ( argv.get( 'normal' ) ) level =  security.normal
        if ( argv.get( 'safe') ) level = security.safe
        return level >= lv
    }
    security.safe = -1
    security.normal = 0
    security.unsafe = 1
    security.danger = 2

    res.options = options
    res.get = get
    res.security = security

    return res
} )()


module.exports = argv