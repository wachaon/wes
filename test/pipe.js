const pipe = require( 'pipe' )
const { describe, it, assert, pass } = require( 'minitest' )


describe( '#test pipe', () => {
    const add = ( curr ) => ( acc ) => acc + curr
    const sub = ( curr ) => ( acc ) => acc - curr
    const multi = ( curr ) => ( acc ) => acc * curr
    const div = ( curr ) => ( acc ) => acc / curr
    const rem = ( curr ) => ( acc ) => acc % curr
    it( 'pipe( 3 ).pipe( add( 5 ) ).dist() === 8', () => {
        assert( pipe( 3 ).pipe( add( 5 ) ).dist() === 8 )
    } )
    it ( 'pipe( 14 ).pipe( div( 7 ), add( 6 ), sub( 4 ), multi( 5 ), rem( 3 ) ).dist() === 2', () => {
        assert( pipe( 14 ).pipe( div( 7 ), add( 6 ), sub( 4 ), multi( 5 ), rem( 3 ) ).dist() === 2 )
    } )
} )

return pass
