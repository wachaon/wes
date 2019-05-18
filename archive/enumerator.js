const { JScript } = require('sc')
const { TypeName } = require('VBScript')

JScript.AddCode(`
function enumerator ( collection ) {
    return new Enumerator( collection )
}`)

const toArray = ( col ) => {
    let res = []
    let Enum = JScript.Run( 'enumerator', col )
    for (; !Enum.atEnd(); Enum.moveNext()) {
        res.push( Enum.item() )
    }
    Enum.moveFirst()
    return res
}

const Enumerator = new Proxy( () => {},{
    construct( target, args ) {
        const res = []
        const e = JScript.Run( 'enumerator', args[0] )
        for ( ; !e.atEnd(); e.moveNext() ) {
            res.push( e.item() )
        }
        return res
    }
} )

class Enumerators extends Array {
    constructor( collection ) {
        let res = []
        if (TypeName( collection ) === 'Long') {
            res = collection
        } else {
            res = toArray( collection )
        }
        super( ...res )

        let i = 0
        Object.defineProperties( this, {
            moveNext: { value() { i++ } },
            atEnd: { value() { return !( i < this.length ) } },
            moveFirst: { value() { return ( i = 0 ) } },
            item: { value(num) { return num != null ? this[ num ] : this[ i ] } }
        } )
    }
    map( callback ) {
        var T, A, k
        if ( this == null ) {
            throw new TypeError( 'this is null or not defined' )
        }
        var O = Object( this )
        var len = O.length >>> 0
        if ( typeof callback !== 'function' ) {
            throw new TypeError(callback + ' is not a function' )
        }
        if ( arguments.length > 1) {
            T = arguments[1]
        }
        A = new Array(len)
        k = 0
        while (k < len) {
            var kValue, mappedValue
            if ( k in O ) {
                kValue = O[k]
                mappedValue = callback.call(T, kValue, k, O)
                A[k] = mappedValue
            }
            k++
        }
        return A
    }
    filter( func, thisArg ) {
        'use strict'
        if (
            !(
                ( typeof func === 'Function' || typeof func === 'function' ) &&
                this
            )
        )
            throw new TypeError()
        var len = this.length >>> 0,
            res = new Array( len ),
            t = this,
            c = 0,
            i = -1
        if ( thisArg === undefined ) {
            while ( ++i !== len ) {
                if (i in this) {
                    if ( func( t[ i ], i, t ) ) {
                        res[ c++ ] = t[ i ]
                    }
                }
            }
        } else {
            while ( ++i !== len ) {
                if ( i in this ) {
                    if ( func.call( thisArg, t[ i ], i, t ) ) {
                        res[ c++ ] = t[ i ]
                    }
                }
            }
        }
        res.length = c
        return res
    }
}

Enumerator.Enumerator = Enumerators

module.exports = Enumerator