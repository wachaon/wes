const { BufferToText } = require('filesystem')

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

module.exports = httprequest
