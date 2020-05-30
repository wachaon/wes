const genUUID = function genUUID_genUUID() {
    var typelib = WScript.CreateObject('Scriptlet.Typelib')
    return typelib.GUID.replace(/[^\}]+$/, '')
}

module.exports = genUUID
