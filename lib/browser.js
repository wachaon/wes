const { isRegExp, isNumber, isString } = require('typecheck')
const blank = 'about:blank'
const { NONE } = require('text')

function browser(callback, options) {
    const CR = '\u001B[1G'
    const display = ['|', '/', '-', '\\']
    let count = 0
    let state = NONE

    let op = {
        home: blank,
        resulr: {},
        invisible: false,
        exception: function () {}
    }

    if (options != null) op = Object.assign(op, options)

    function wait(app) {
        if (isNumber(app)) {
            const time = Math.random() * app
            const finish = new Date().getTime() + app / 2 + time

            while (Date.now() < finish) {
                console.print(CR + 'waiting ' + display[count++ % 4])
                WScript.Sleep(50)
            }
        } else {
            while (app.Busy || app.readystate != 4) {
                console.print(CR + 'processing ' + display[count++ % 4])
                WScript.Sleep(50)
            }
        }
        console.print('%s              %s', CR, CR)
    }

    const app = require('InternetExplorer.Application')
    app.Visible = !op.invisible
    app.Navigate(op.home)
    let result = op.result

    const location = (function browser_location(url) {
        let res = []
        return {
            back(url) {
                // url isString
                if (isString(url)) {
                    for (let i = res.length; i; i--) {
                        if (res[i - 1].startsWith(url)) {
                            res.length = i
                            return res[i - 1]
                        }
                    }
                    return blank
                } else if (isNumber(url)) {
                    // url isNumber
                    if (res.length < url) return blank
                    let num = res.length - url
                    res.length = num
                    return res[num - 1]
                }
            },
            push(url) {
                if (res[res.length - 1] === url) {
                } else res.push(url)
            },
            history() {
                return [...res]
            }
        }
    })()

    try {
        wait(app)

        const events = new Map()
        const event = {
            on(target, fn) {
                if (events.has(target)) events.get(target).push(fn)
                else events.set(target, [fn])
            },
            emit(url, ...params) {
                events.forEach((callbacks, evaluation) => {
                    if (
                        (isRegExp(evaluation) && evaluation.test(url)) ||
                        String(evaluation) === url
                    )
                        callbacks.forEach((fn) => fn(url, ...params))
                })
            }
        }

        event.on(/./, (url) => location.push(url))

        callback(app, event, result, wait, location)

        while (true) {
            wait(app)
            const url = app.document.location.href
            if (state === url) {
                console.print(CR + 'polling ' + display[count++ % 4])
                WScript.Sleep(50)
                continue
            }
            console.print('%s         %s', CR, CR)

            state = url
            wait(app)
            event.emit(url)
        }
    } catch (error) {
        console.print('%s         %s', CR, CR)
        try {
            app.Document
        } catch (err) {
            const er = op.exception(error, result, null)
            if (er != null) throw er
        }
        // app.Visible = true
        const er = op.exception(error, result, app)
        if (er != null) throw er
    }
}

module.exports = browser
