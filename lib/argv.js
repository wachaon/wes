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

    var get = function argv_get ( name ) {
        return options[ name.toLowerCase() ]
    }

    res.options = options
    res.get = get

    return res
} )()


module.exports = argv