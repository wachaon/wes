const { Enumerator } = require( 'JScript' )

const args = new Enumerator(WScript.Arguments)
const unnamed = new Enumerator(WScript.Arguments.unnamed)
const named = ( () => {
    let res = {}
    let named = new Enumerator(WScript.Arguments.named)
    named.forEach(v => {
        let named = WScript.Arguments.named.item(v)
        res[v] = named || ""
    } )
    return res
} )()

module.exports = {
    args,
    unnamed,
    named
}