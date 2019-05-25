const { Type } = require( 'VBScript' )
const {
    ByteToHex,
    HexToByte,
    Uint8ToHex,
    HexToUint8
} = require( 'hex' )

class Buffer extends Uint8Array{
    constructor( data ) {
        let hex
        if ( data instanceof Uint8Array ) {
            data = Array.from( data )
        }
        if ( Array.isArray( data ) ) {
            hex = data.map( v => ( '0' + v.toString( 16 ) ).slice( -2 ) ).join( '' )
        } else if ( Type( data ) === 'vbByte[]') {
            hex = ByteToHex( data )
        } else {
            throw new TypeError ('argument must be either Array or TypedArray or Byte[]')
        }
        super( HexToUint8( hex ) )
    }
    toByte() {
        return HexToByte( Uint8ToHex( this ) )
    }
    static from( array ) {
        return new Buffer( array )
    }
}

module.exports = Buffer
