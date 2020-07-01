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
        }
        return this.getTime()
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
            .replace(/Y+/, year)
            .replace(/M{2}/, (zoro + (month + 1)).slice(-2))
            .replace(/M/, month + 1)
            .replace(/D{2}/, (zoro + date).slice(-2))
            .replace(/D/, date)
            .replace(/h{2}/, (zoro + hours).slice(-2))
            .replace(/h{2}/, hours)
            .replace(/m{2}/, (zoro + minutes).slice(-2))
            .replace(/m/, minutes)
            .replace(/s{2}/, (zoro + seconds).slice(-2))
            .replace(/s/, seconds)
            .replace(/S+/, (doubleZero + milliseconds).slice(-3))
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
