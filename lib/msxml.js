const msxmlId = [
    'MSXML2.DOMDocument.6.0',
    'MSXML2.DOMDocument.3.0',
    'Msxml2.DOMDocument',
    'Msxml.DOMDocument',
    'Microsoft.XMLDOM'
]

let MSXML = null
for ( let i = 0; i < msxmlId.length; i++ ) {
    try {
        MSXML = WScript.CreateObject( msxmlId[ i ] )
        break
    } catch ( e ) {
        continue
    }
}

if ( MSXML == null ) WScript.CreateObject( msxmlId[ 0 ] )

console.debug( `${ console.ansi.gray }Get ${ require( 'VBScript' ).TypeName( MSXML ) }`)

module.exports = MSXML
