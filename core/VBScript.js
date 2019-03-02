const { VBScript } = require( 'sc' )

VBScript.AddCode(`
Function getTypeName( obj )
    getTypeName = TypeName( obj )
End Function
`)

VBScript.AddCode(`
Function getVarType( obj )
    getVarType = VarType( obj )
End Function
`)


const TypeName = ( object ) => VBScript.Run( 'getTypeName', object )
const VarType = ( object ) => VBScript.Run( 'getVarType', object )
const Type = ( object ) => {
    const constant = [
        'vbEmpty', // 0
        'vbNull', // 1
        'vbInteger', // 2
        'vbLong', // 3
        'vbSingle', // 4
        'vbDouble', // 5
        'vbCurrency', // 6
        'vbDate', // 7
        'vbString', // 8
        'vbObject', // 9
        'vbError', // 10
        'vbBoolean', // 11
        'vbVariant', // 12
        'vbDataObject', // 13
    ]
    let num = VarType( object )
    return  num > 8192 ? `${ constant[ num - 8192 ] }[]` : constant[ num ]
}
Type[17] = 'vbByte'
Type[8192] = 'vbArray'

module.exports = {
    TypeName,
    VarType,
    Type
}
