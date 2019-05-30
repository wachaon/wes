class Pipe {
    constructor( value ) {
        this.value = value
    }
    pipe ( fn ) {
        this.value = fn( this.value )
        return this
    }
    log ( message ) {
        console.log( message, this.value )
        return this
    }
    debug ( message ) {
        console.debug( message, this.value )
        return this
    }
    [Symbol.toPrimitive] ( hint ) {
        return this.value
    }
}

module.exports = Pipe