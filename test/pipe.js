const Pipe = require( '/lib/pipe' )
const { describe, it, assert, pass } = require( '/lib/minitest' )


describe( '#test pipe', () => {
    const add = ( curr ) => ( acc ) => acc + curr
    const sub = ( curr ) => ( acc ) => acc - curr
    const multi = ( curr ) => ( acc ) => acc * curr
    const div = ( curr ) => ( acc ) => acc / curr
    const rem = ( curr ) => ( acc ) => acc % curr
    it( 'pipe( 3 ).pipe( add( 5 ) ).value === 8', () => {
        assert( new Pipe( 3 ).pipe( add( 5 ) ).value === 8 )
    } )
    it ( 'pipe( 14 ).pipe( div( 7 ), add( 6 ), sub( 4 ), multi( 5 ), rem( 3 ) ).value === 2', () => {
        assert( new Pipe( 14 ).pipe( div( 7 ), add( 6 ), sub( 4 ), multi( 5 ), rem( 3 ) ).value === 2 )
    } )
} )

return pass
