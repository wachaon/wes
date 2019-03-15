class Pipe {
    constructor() {
        return ( value ) => {
            let val = value instanceof Pipe ? value.dist() : value
            return {
                pipe( fn ) {
                    return new Pipe()( fn( val ) )
                },
                dist() {
                    return val
                },
                log() {
                    console.log(`log: ${ val }`)
                    return new Pipe()( val)
                }
            }
        }
    }
}

module.exports = new Pipe