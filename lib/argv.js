var argv = ( function () {

    const args = WScript.Arguments

    let res = ['wes']
    for ( let i = 0; i < args.length; i++ ) {
        res.push( unescape( args( i ) ) )
    }

    let unnamed = ['wes']
    for ( let i = 0; i < args.Unnamed.length; i++ ) {
        unnamed.push( args.Unnamed( i ) )
    }

    function exists ( name ) { return args.Named.Exists( name ) }
    function getValue ( name ) { return args.Named( name ) }

    res.unnamed = unnamed
    res.exists = exists
    res.getValue = getValue

    return res

} )()

module.exports = argv