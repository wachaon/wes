const { Type } = require( 'VBScript' )

class Buffer extends Uint8Array{
    constructor( data ) {
        let hex
        if ( data instanceof Uint8Array ) {
            data = Array.from( data )
        }
        if ( Array.isArray( data ) ) {
            hex = data.map( v => ( '0' + v.toString( 16 ) ).slice( -2 ) ).join( '' )
        } else if ( Type( data ) === 'vbByte[]') {
            hex = Byte2Hex( data )
        } else {
            throw new TypeError ('argument must be either Array or TypedArray or Byte[]')
        }
        super( Hex2Buffer( hex ) )
    }
    toByte() {
        return Hex2Byte( Buffer2Hex( this ) )
    }
    static from( array ) {
        return new Buffer( array )
    }
}

const Byte2Hex = ( byte ) => {
    let elm = require( 'msxml' ).createElement( 'elm' )
    elm.dataType = 'bin.hex'
    elm.nodeTypedValue = byte
    return elm.text
}

const Hex2Byte = ( hex ) => {
  let elm = require( 'Msxml2.DOMDocument' ).createElement( 'elm' )
  elm.dataType = 'bin.hex'
  elm.text = hex
  return elm.nodeTypedValue
}

const Hex2Buffer = ( hex ) => new Uint8Array( hex.match( /.{1,2}/g ).map( v => parseInt( v, 16 ) ) )




module.exports = Buffer
