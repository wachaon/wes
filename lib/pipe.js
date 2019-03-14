const pipe = ( value ) => {
    return {
        pipe( fn ) { return pipe( fn( value ) ) },
        dist() { return value }
    }
}

module.exports = pipe