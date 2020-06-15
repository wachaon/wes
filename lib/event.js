class Event extends Map {
    on(handler, callback) {
        if (this.has(handler)) this.get(handler).push(callback)
        else this.set(handler, [callback])
        return callback
    }
    off(handler, callback) {
        if (this.has(handler)) {
            if (callback) {
                const callbacks = this.get(handler).filter((cb) => cb != callback)
                if (callbacks.length) this.set(handler, callbacks)
                else this.delete(handler)
            } else this.delete(handler)
        }
    }
    emit(handler, ...args) {
        if (this.has(handler)) {
            this.get(handler).forEach((cb) => {
                cb(...args)
            })
        }
    }
    once(handler, callback) {
        const self = this
        function cb(...args) {
            callback(...args)
            self.off(handler, cb)
        }
        this.on(handler, cb)
        return cb
    }
}

module.exports = Event
