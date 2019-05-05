class Buffer {
    constructor( byte ) {
        return Hex2Buffer( Byte2Hex( byte ) )
    }
    static toHex ( buffer ) {
        return Buffer2Hex( buffer )
    }
}

const Byte2Hex = ( byte ) => {
    let elm = require('MSXML2.DOMDocument.6.0').createElement('elm')
    elm.dataType = 'bin.hex'
    elm.nodeTypedValue = byte
    return elm.text
}

const Hex2Buffer = ( hex ) => new Uint8Array( hex.match( /.{1,2}/g ).map( v => parseInt( v, 16 ) ) )

const Buffer2Hex = ( buffer ) => {
    let res = []
    buffer.forEach( v => res.push( v.toString( 16 ) ) )
    return res.join( '' )
}

module.exports = Buffer
