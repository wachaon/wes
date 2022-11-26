const { BufferToText } = require('filesystem')
const Server = require('MSXML2.ServerXMLHTTP')

/*
const options = {
    async: false,
    user: null,
    password: null,
    params: {},
    exception(error, app) {
        console.log(error.stack)
    },
    execute(app, opt = {}) {
        if (200 <= app.status && app.status < 300) {
        } else throw new Error(console.format('http status:%s statusText: "%s"', app.status, app.statusText))
        return BufferToText(new Buffer(app.responseBody), opt.charset)
    }
}

const httprequest = function httprequest_httprequest(method, url, opt) {
    const opts = Object.assign({}, options, opt)
    try {
        var http = require('Msxml2.ServerXMLHTTP')
        if (method.toLowerCase() === 'post') {
            http.open(method.toUpperCase(), url, opts.async, opts.user, opts.password)
            http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
            http.send(escapeParams(opts.params))
        } else {
            if (Object.keys(opts.params).length) url = url + '?' + escapeParams(opts.params)
            http.open(method.toUpperCase(), url, opts.async, opts.user, opts.password)
            http.send()
        }
        return opts.execute(http, opts)
    } catch (error) {
        opts.exception(error, http)
    }
}
*/

function escapeParams(params) {
    function enc(value) {
        return escape(value).split('%20').join('+')
    }
    return Object.keys(params)
        .map((key) => {
            return key + '=' + enc(params[key])
        })
        .join('&')
}

function request(method, url, options = {}) {
    method = method.toUpperCase()
    let { params, header } = options
    header = header != null ? header : {}

    if (params != null) {
        if (typeof params === 'string') header['Content-Type'] = 'application/x-www-form-urlencoded'
        else if (Object.prototype.toString.call(params) === '[object Object]') {
            if (method === 'GET') url = url + '?' + escapeParams(params)
            else {
                header['Content-Type'] = 'application/json'
                params = JSON.stringify(params)
            }
        } else {
            params = Buffer.from(params).toByte()
        }
    }

    Object.keys(header).forEach((key) => {
        Server.setRequestHeader(key, header[key])
    })

    const { user, password } = options
    Server.open(method, url, true, user, password)
    params != null ? Server.send() : Server.send(params)

    const State = ['UNINITIALIZED', 'LOADING', 'LOADED', 'INTERACTIVE', 'COMPLETED']
    const spiner = ['|', '/', '-', '\\']
    const { message } = options
    let count = 0
    let state

    while ((state = State[Server.readyState]) != 'COMPLETED') {
        const progress = spiner[count % spiner.length]
        if (message === undefined) console.weaklog('%s %s %s', url, progress, state)
        if (message === null) {
        } else console.weaklog('%s %s %s', message, progress, state)
        WScript.Sleep(50)
        count++
    }

    if (Server.status != 200) {
        const msg = console.format('[Server Error]\nstatus: %d\nurl: %s\nparams: %o', Server.status, url, params)
        throw new Error(msg)
    }

    const result = {}

    try {
        result.responseBody = Buffer.from(Server.responseBody)
    } catch (e) {
        result.responseBody = null
    }

    try {
        result.responseStream = Buffer.from(Server.responseStream)
    } catch (e) {
        result.responseStream = null
    }

    try {
        result.responseText = BufferToText(Buffer.from(Server.responseBody))
    } catch (e) {
        result.responseText = null
    }

    try {
        result.responseXML = Server.responseXML
    } catch (e) {
        result.responseXML = null
    }

    return result
}

module.exports = request
