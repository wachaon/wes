const { _NUMBER, _STRING } = require('text')
const _DEFAULT = 'default'

const zoro = '0'
const doubleZero = '00'

class Day extends Date {
    [Symbol.toPrimitive](hint) {
        if (hint == 'number') return this.getTime()
        return this.stringify('YYYY/MM/DD hh:mm:ss.ms')
    }
    toArray() {
        return [
            this.getFullYear(),
            this.getMonth(),
            this.getDate(),
            this.getHours(),
            this.getMinutes(),
            this.getSeconds(),
            this.getMilliseconds()
        ]
    }
    stringify(format) {
        const [year, month, date, hours, minutes, seconds, milliseconds] = this.toArray()
        return format
            .replace(/Y+/i, year)
            .replace(/M{2,}/, (zoro + (month + 1)).slice(-2))
            .replace(/M/, month + 1)
            .replace(/D{2,}/i, (zoro + date).slice(-2))
            .replace(/D/i, date)
            .replace(/h{2,}/i, (zoro + hours).slice(-2))
            .replace(/h/i, hours)
            .replace(/\bms\b/i, (doubleZero + milliseconds).slice(-3))
            .replace(/m{2,}/, (zoro + minutes).slice(-2))
            .replace(/m/, minutes)
            .replace(/s{2,}/i, (zoro + seconds).slice(-2))
            .replace(/s/i, seconds)
    }
    static calculate(expressions) {
        const d = expressions % 86400000
        const date = (expressions - d) / 86400000
        const h = d % 3600000
        const hours = (d - h) / 3600000
        const m = h % 60000
        const minute = (h - m) / 60000
        const milliseconds = m % 1000
        const seconds = (m - milliseconds) / 1000
        return [date, hours, minute, seconds, milliseconds]
    }
}

module.exports = Day
