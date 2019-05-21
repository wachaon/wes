const { Type } = require( 'VBScript' )
const {
    ByteToHex,
    HexToByte,
    Uint8ToHex,
    HexToUint8
} = require( 'typecast' )

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
/*
const ByteToHex = ( byte ) => {
    let elm = require( 'msxml' ).createElement( 'elm' )
    elm.dataType = 'bin.hex'
    elm.nodeTypedValue = byte
    return elm.text
}

const HexToByte = ( hex ) => {
  let elm = require( 'Msxml2.DOMDocument' ).createElement( 'elm' )
  elm.dataType = 'bin.hex'
  elm.text = hex
  return elm.nodeTypedValue
}

const Uint8ToHex = ( buffer ) => {
    let res = []
    buffer.forEach( v => res.push( ( '0' + v.toString( 16 ) ).slice( -2 ) ) )
    return res.join( '' )
}

const HexToUint8 = ( hex ) => new Uint8Array( hex.match( /.{1,2}/g ).map( v => parseInt( v, 16 ) ) )
*/
module.exports = Buffer
