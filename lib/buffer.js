const { Type } = require( 'VBScript' )
const {
    ByteToHex,
    HexToByte,
    Uint8ToHex,
    HexToUint8
} = require( 'hex' )
const { NONE } = require( 'text' )
const { isString, isArray } = require( 'typecheck' )

class Buffer extends Uint8Array{
    constructor( data ) {
        if ( data instanceof Uint8Array ) return data
        if ( isString( data ) ) {
            const uint16Array = new Uint16Array( [].map.call( data, function( c ) {
                return c.charCodeAt(0)
            } ) )
            const len = uint16Array.length
            const uint8Array = new Uint8Array( len * 2 )
            for (let i = 0, j = 0; i < len; ++i, j += 2) {
                uint8Array[ j ] = ( uint16Array[ i ] & 0xff00 ) >> 8
                uint8Array[ j + 1 ] =  uint16Array[ i ] & 0x00ff
            }
            return uint8Array
        }
        if ( isArray( data ) ) return super( data )
        if ( Type( data ) === 'vbByte[]' ) return super( HexToUint8( ByteToHex( data ) ) )

        throw new TypeError ( 'argument must be either String or Array or TypedArray or Byte[]' )
    }
    toByte() {
        return HexToByte( Uint8ToHex( this ) )
    }
    static from( date ) {
        return new Buffer( date )
    }
}

module.exports = Buffer
