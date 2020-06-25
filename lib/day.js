const zoro = '0'
const doubleZero = '00'

class Day extends Date {
    [Symbol.toPrimitive](hint) {
        if (hint === 'string') {
            const year = this.getFullYear()
            const month = (zoro + (this.getMonth() + 1)).slice(-2)
            const date = (zoro + this.getDate()).slice(-2)
            const hours = (zoro + this.getHours()).slice(-2)
            const minutes = (zoro + this.getMinutes()).slice(-2)
            const seconds = (zoro + this.getSeconds()).slice(-2)
            const milliseconds = (doubleZero + this.getMilliseconds()).slice(-3)
            return `${year}/${month}/${date} ${hours}:${minutes}:${seconds}.${milliseconds}`
        } else this.getTime()
    }
}

module.exports = Day
