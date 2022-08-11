const JScript = (function JScript(language) {
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
})('JScript')

const { TypeName } = require('VBScript')

JScript.AddCode(`
function enumerator ( collection ) {
    return new Enumerator( collection )
}
`)

const toArray = function JScript_toArray(col) {
    let res = []
    let Enum = JScript.Run('enumerator', col)
    for (; !Enum.atEnd(); Enum.moveNext()) {
        res.push(Enum.item())
    }
    Enum.moveFirst()
    return res
}

class Enumerator {
    constructor(collection) {
        let res = []
        if (TypeName(collection) === 'Long') {
            res = collection
        } else {
            res = toArray(collection)
        }
        return res
    }
}

class ActiveXObject {
    constructor(progID) {
        return WScript.CreateObject(progID)
    }
}

JScript.AddCode(`
function vbarray ( safeArray ) {
    return (new VBArray( safeArray )).toArray()
}
`)

class VBArray {
    constructor(safeArray) {
        return Array.from(JScript.Run('vbarray', safeArray))
    }
}

JScript.AddCode(`
function getObj () {
    return GetObject
}
`)

const GetObject = JScript.Run('getObj')

module.exports = {
    JScript,
    Enumerator,
    ActiveXObject,
    VBArray,
    GetObject
}
