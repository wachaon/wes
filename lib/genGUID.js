const genGUID = function genGUID_genGUID() {
    var trash = /[^\}]+$/
    var NONE = ''

    var typelib = WScript.CreateObject('Scriptlet.Typelib')
    return typelib.GUID.replace(trash, NONE)
}

module.exports = genGUID
