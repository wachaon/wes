const { JScript } = require('sc')
const { TypeName } = require('VBScript')

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

module.exports = {
    Enumerator
}