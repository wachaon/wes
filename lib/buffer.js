class Buffer extends Uint8Array{
    constructor( byte ) {
        super( Hex2Buffer( Byte2Hex( byte ) ) )
        this.toByte = () => byte
    }
    static toHex ( buffer ) {
        return Buffer2Hex( buffer )
    }
}

const Byte2Hex = ( byte ) => {
    let elm = require('msxml').createElement('elm')
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
