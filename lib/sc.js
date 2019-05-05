const ScriptControl = ( language ) => {
    const sc = require( 'ScriptControl' )
    sc.Language = language
    return {
        AddCode( code ) {
            sc.AddCode( code )
        },
        Run( name, ...args ) {
            return sc.run( name, ...args )
        }
    }
}

module.exports = {
    JScript: ScriptControl( 'JScript' ),
    VBScript: ScriptControl( 'VBScript' )
}
