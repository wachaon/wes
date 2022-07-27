const { LF } = require('text')

class Task {
    constructor() {
        this.queue = []
        this.pause = true
        this.view = null
    }

    /**
     * Register Queues
     * @param {fucntion} callback
     * @param {number|null} interval
     * @param {number|Function|null} conditional
     * @return {QueueElement} Queue Element
     */
    register(callback, interval, conditional) {
        const element = {
            count: increment(),
            callback,
            interval: interval || 1,
            conditional:
                typeof conditional === 'function'
                    ? conditional
                    : typeof conditional === 'number'
                    ? decrement(conditional)
                    : decrement()
        }
        element.timeout = Date.now() + element.interval
        return this.queue.push(element)
    }

    /**
     * Cancel Task
     * @param {QueueElement} task
     * @return {null} void 0
     */
    cancel(task) {
        this.queue = this.queue.filter((t) => t !== task)
    }

    /**
     * Run Task
     * @return {null} void 0
     */
    run() {
        this.pause = false
        let firstRendering = true
        while (this.queue.length && !this.pause) {
            const now = Date.now()
            this.queue = this.queue.filter((element) => {
                if (now > element.timeout) {
                    const index = element.count()
                    if (element.conditional(index)) {
                        element.callback(index)
                        element.timeout = now + element.interval
                        return true
                    } else return false
                }
                return true
            })
            if (this.view != null) {
                const view = Array.isArray(this.view) ? this.view.join(LF) : this.view
                if (firstRendering) {
                    console.log(view)
                    firstRendering = false
                } else console.replace(view)
            }
        }
    }
    stop() {
        this.pause = true
    }
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

module.exports = Task
