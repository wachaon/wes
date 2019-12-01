const zoro = '0'
const doubleZero = '00'

class Day extends Date {
    [Symbol.toPrimitive] ( hint ) {
        if ( hint === 'number' ) return this.getTime()
        else {
            let year = this.getFullYear()
            let month = ( zoro + ( this.getMonth() + 1 ) ).slice( -2 )
            let date = ( zoro + ( this.getDate() ) ).slice( -2 )
            let hours = ( zoro + ( this.getHours() ) ).slice( -2 )
            let minutes = ( zoro + ( this.getMinutes() ) ).slice( -2 )
            let seconds = ( zoro + ( this.getSeconds() ) ).slice( -2 )
            let milliseconds = ( doubleZero + ( this.getMilliseconds() ) ).slice( -3 )
            return `${ year }/${ month }/${ date } ${ hours }:${ minutes }:${ seconds }.${ milliseconds }`
        }
    }
}

module.exports = Day