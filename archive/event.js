class Event {
    constructor() {
        this.state = {}
    }
    on(handler, fn) {
        let state = this.state
        if (state[handler] == null) state[handler] = [fn]
        else state[handler].push(fn)
        return fn
    }
    emit(handler, ...args) {
        let state = this.state
        if (state[handler] == null) console.log(`handler: ${handler} not State`)
        else state[handler].forEach((v) => v(...args))
    }
    off(handler, fn) {
        let state = this.state
        if (state[handler] == null) console.log(`handler: ${handler} not State`)
        else if (fn == null) state[handler] = null
        else state[handler] = state[handler].filter((v) => v !== fn)
    }
    once(handler, fn) {
        let state = this.state
        const _once = (...args) => {
            fn(...args)
            this.off(handler, _once)
        }
        if (state[handler] == null) state[handler] = [_once]
        else state[handler].push(_once)
        return _once
    }
}

module.exports = Event