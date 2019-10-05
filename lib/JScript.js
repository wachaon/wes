const JScript = ( function ( language ) {
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
} )( 'JScript' )

const { TypeName } = require( 'VBScript' )

JScript.AddCode(`
function enumerator ( collection ) {
    return new Enumerator( collection )
}`)

const toArray = ( col ) => {
    let res = []
    let Enum = JScript.Run( 'enumerator', col )
    for (; !Enum.atEnd(); Enum.moveNext()) {
        res.push( Enum.item() )
    }
    Enum.moveFirst()
    return res
}

class Enumerator {
    constructor( collection ) {
        let res = []
        if (TypeName( collection ) === 'Long') {
            res = collection
        } else {
            res = toArray( collection )
        }
        return res
    }
}

class ActiveXObject {
    constructor ( progID ) {
        return WScript.CreateObject( progID )
    }
}

module.exports = {
    Enumerator,
    ActiveXObject
}