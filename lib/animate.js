const { LF, rLINE_SEP } = require('text')
const { isArray, isFunction, isNumber } = require('typecheck')

class Animate {
    constructor(complete) {
        this.queue = []
        this.pause = true
        this.view = []
        this.lastRow = 0
        this.complete = complete
    }

    /**
     * Register Queues
     * @param {Fucntion} callback
     * @param {Number|null} interval
     * @param {Number|Function|null} conditional
     * @return {QueueElement} Queue Element
     */
    register(callback, interval, conditional) {
        const element = {
            count: increment(),
            callback,
            interval: interval || 1,
            conditional: isFunction(conditional)
                ? conditional
                : isNumber(conditional)
                ? decrement(conditional)
                : decrement()
        }
        element.timeout = Date.now() + element.interval
        this.queue.push(element)
        return element
    }

    /**
     * Cancel Queue
     * @param {QueueElement} queue
     * @return {null} void 0
     */
    cancel(queue) {
        this.queue = this.queue.filter((t) => t !== queue)
    }

    /**
     * Run Queues
     * @return {Null} void 0
     */
    run() {
        this.pause = false
        while (this.queue.length && !this.pause) {
            const now = Date.now()
            this.queue.forEach((element) => {
                if (now > element.timeout) {
                    const count = element.count()
                    if (element.conditional(count, element)) {
                        element.callback(count)
                        element.timeout = now + element.interval
                    }
                }
            })
            const { lastRow } = this
            const view = isArray(this.view) ? this.view : String(this.view).split(rLINE_SEP)
            const diff = lastRow - (this.lastRow = view.length)

            if (lastRow === 0) {
                if (view.length === 0) continue
                else console.log(view.join(LF))
            } else if (diff === 0) console.replace(view.join(LF))
            else if (diff > 0) console.replace(view.concat(new Array(diff).fill('')).join(LF))
            else {
                console.replace(view.slice(lastRow))
                console.log(view.slice(diff))
            }
        }
        if (this.complete != null && isFunction(this.complete)) this.complete()
    }

    /**
     * Stop Queues
     * @return {Null} void 0
     */
    stop() {
        this.pause = true
    }

    /**
     * Generation of progress indicator functions
     * @param {Array} animation
     * @returns {Function} Function to return an array element given a number
     */
    static genProgressIndicator(animation = ['|', '/', '-', '\\']) {
        return function (i = 0) {
            return animation[i % animation.length]
        }
    }
}

// util
function decrement(count = 1) {
    return function () {
        if (count < 0) return 0
        return count--
    }
}

function increment(count = 0) {
    return function () {
        if (count < 0) return (count = 0)
        return count++
    }
}

module.exports = Animate
