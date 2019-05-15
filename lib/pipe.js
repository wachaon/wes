const { named } = require( 'argv' )
const dump = require( 'dump' )
const { isDebugOption } = require( 'debug' )

class Pipe {
    constructor(){
        let reslut = ( value ) => {
            const val = value instanceof Pipe ? value.dist() : value
            const _pipe = ( v, f ) => new Pipe()( f( v ) )
            let res = {
                dist() {
                   return val
                },
                log( fn ) {
                    if ( typeof fn !== 'function' ) console.log( dump( val ) )
                    else fn( val )
                    return new Pipe()( val )
                },
                debug( fn ) {
                    if ( isDebugOption ) {
                        if ( fn == null ) console.log( dump( val ) )
                        else console.log( fn( val ) )
                    }
                    return new Pipe()( val )
                },
                pipe( ...args ) {
                    args.unshift( new Pipe()( val ) )
                    return args.reduce( ( acc, curr ) => {
                        return _pipe( acc.dist(), curr )
                    } )
                }
            }
            return res
        }
        return reslut
    }
}

module.exports = new Pipe