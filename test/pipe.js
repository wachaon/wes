const pipe = require( '../lib/pipe' )
const { describe, it, assert } = require( 'test' )


describe( 'pipe test', () => {
    const add = ( curr ) => ( acc ) => acc + curr
    const sub = ( curr ) => ( acc ) => acc - curr
    const multi = ( curr ) => ( acc ) => acc * curr
    const div = ( curr ) => ( acc ) => acc / curr
    const rem = ( curr ) => ( acc ) => acc % curr
    it( '単純な `pipe()`', () => {
        assert( pipe( 3 ).pipe( add( 5 ) ).dist() === 8 )
    } )
    it ( '複数の引数を扱う `pipe()`', () => {
        assert( pipe( 14 ).pipe( div( 7 ), add( 6 ), sub( 4 ), multi( 5 ), rem( 3 ) ).dist() === 2 )
    } )
} )
