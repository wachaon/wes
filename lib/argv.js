const { NONE } = require('text')
const { toPosixSep } = require('pathname')

var argv = (function() {
    var args = WScript.Arguments

    var res = [toPosixSep(WScript.ScriptFullName)]
    var options = {}
    var short = /^\-/
    var named = /^\-{2}/
    var sep = '='

    for (var i = 0; i < args.length; i++) {
        var Arg = unescape(args(i))
        var arg = Arg.toLowerCase()
        var opt = NONE
        var next = args.length > i + 1 ? unescape(args(i + 1)) : NONE

        if (named.test(arg)) {
            opt = arg.slice(2)
            if (~arg.indexOf(sep))
                options[opt.split(sep)[0]] = opt.split(sep)[1]
            else {
                if (short.test(next)) options[opt] = true
                else {
                    options[opt] = next
                    i++
                }
            }
        } else if (short.test(arg)) {
            opt = arg.slice(1)
            for (var j = 0; j < opt.length; j++) {
                options[opt[j]] = true
            }
            if (!short.test(next)) {
                options[opt.slice(-1)] = next
                i++
            }
        } else {
            res.push(Arg)
        }
    }

    var get = function argv_get(named) {
        const res = argv.options[named.toLowerCase()]
        return named.toLowerCase() in argv.options ? res : null
    }

    var security = function argv_security(lv) {
        let level = 0
        if (argv.get('danger')) level = security.danger
        if (argv.get('unsafe')) level = security.unsafe
        if (argv.get('normal')) level = security.normal
        if (argv.get('safe')) level = security.safe
        return level >= lv
    }
    security.safe = -1
    security.normal = 0
    security.unsafe = 1
    security.danger = 2

    res.options = options
    res.get = get
    res.security = security

    return res
})()

argv.toCommand = function argv_toCommand() {
    const space = ' '
    const none = ''

    let args = argv.slice(2)

    const options = argv.options
    const keys = Object.keys(options)

    let short = []
    let shortOpt = []
    let long = []
    let longOpt = []

    keys.forEach(key => {
        const value = options[key]
        if (key.length === 1) {
            if (value === true) short.push(key)
            else
                shortOpt.push([
                    key,
                    value.includes(space) ? `"${value}"` : value
                ])
        } else {
            if (value === true) long.push(key)
            else {
                if (key === 'engine') return
                longOpt.push([
                    key,
                    value.includes(space) ? `"${value}"` : value
                ])
            }
        }
    })

    return [
        args.join(space),
        short.length ? '-' + short.join(none) : '',
        shortOpt.length
            ? shortOpt
                  .map(([key, value]) => '-' + key + space + value)
                  .join(space)
            : '',
        long.length ? long.map(key => '--' + key).join(space) : '',
        longOpt.length
            ? longOpt
                  .map(([key, value]) => '--' + key + '=' + value)
                  .join(space)
            : ''
    ].join(space).trim()
}

module.exports = argv
