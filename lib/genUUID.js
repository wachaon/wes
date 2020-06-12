const genUUID = function genUUID_genUUID() {
    var trash = /[^\}]+$/
    var NONE = ''

    var typelib = WScript.CreateObject('Scriptlet.Typelib')
    return typelib.GUID.replace(trash, NONE)
}

module.exports = genUUID
