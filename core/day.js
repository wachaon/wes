class Day extends Date {
    [Symbol.toPrimitive] ( hint ) {
        console.log( hint )
        if ( hint === 'number' ) return this.getTime()
        else {
            let year = this.getFullYear()
            let month = ( "0" + ( this.getMonth() + 1 ) ).slice( -2 )
            let date = ( "0" + ( this.getDate() ) ).slice( -2 )
            let hours = ( "0" + ( this.getHours() ) ).slice( -2 )
            let minutes = ( "0" + ( this.getMinutes() ) ).slice( -2 )
            let seconds = ( "0" + ( this.getSeconds() ) ).slice( -2 )
            let milliseconds = ( "00" + ( this.getMilliseconds() ) ).slice( -3 )
            return `${ year }/${ month }/${ date } ${ hours }:${ minutes }:${ seconds }.${ milliseconds }`
        }
    }
}

module.exports = Day