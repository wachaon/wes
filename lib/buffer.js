class Buffer extends Uint8Array{
    constructor( byte ) {
        super( Hex2Buffer( Byte2Hex( byte ) ) )
    }
    toByte() {
      return Hex2Byte( Buffer2Hex( this ) )
    }
}

const Byte2Hex = ( byte ) => {
    let elm = require( 'msxml' ).createElement( 'elm' )
    elm.dataType = 'bin.hex'
    elm.nodeTypedValue = byte
    return elm.text
}

const Hex2Buffer = ( hex ) => new Uint8Array( hex.match( /.{1,2}/g ).map( v => parseInt( v, 16 ) ) )

const Buffer2Hex = ( buffer ) => {
    let res = []
    buffer.forEach( v => res.push( ( '0' + v.toString( 16 ) ).slice( -2 ) ) )
    return res.join( '' )
}

const Hex2Byte = ( hex ) => {
  let elm = require( 'Msxml2.DOMDocument' ).createElement( 'elm' )
  elm.dataType = 'bin.hex'
  elm.text = hex
  return elm.nodeTypedValue
}

module.exports = Buffer
