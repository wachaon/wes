const VBScript = (function (language) {
    const sc = require('ScriptControl')
    sc.Language = language
    return {
        AddCode(code) {
            sc.AddCode(code)
        },
        Run(name, ...args) {
            return sc.run(name, ...args)
        }
    }
})('VBScript')

VBScript.AddCode(`
Function getTypeName( obj )
    getTypeName = TypeName( obj )
End Function
`)
const TypeName = function VBScript_TypeName(object) {
    return VBScript.Run('getTypeName', object)
}

VBScript.AddCode(`
Function getVarType( obj )
    getVarType = VarType( obj )
End Function
`)
const VarType = function VBScript_VarType(object) {
    return VBScript.Run('getVarType', object)
}

const Type = function VBScript_Type(object) {
    let constant = [
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
        'vbDataObject' // 13
    ]
    constant[17] = 'vbByte'
    constant[8192] = 'vbArray'
    let num = VarType(object)
    return num > 8192 ? `${constant[num - 8192]}[]` : constant[num]
}

VBScript.AddCode(`Function getObj(path)
  Set objRegistry = GetObject(path)
  getObj = TypeName(objRegistry)
End Function`)

function GetObject(path) {
    return VBScript.Run('getObj', path)
}

module.exports = {
    VBScript,
    TypeName,
    VarType,
    Type,
    GetObject
}
