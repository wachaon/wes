class Buffer {
    constructor( byte ) {
        return Hex2Buffer( Byte2Hex( byte ) )
    }
}

const Byte2Hex = ( byte ) => {
    let hex = require('Msxml2.DOMDocument').createElement('hex')
    hex.dataType = 'bin.hex'
    hex.nodeTypedValue = byte
    return hex.text
}

const Hex2Buffer = ( hex ) => new Uint8Array( hex.match( /.{1,2}/g ).map( v => parseInt( v, 16 ) ) )

module.exports = Buffer
