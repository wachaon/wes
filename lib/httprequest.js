const fs = require('filesystem')

const options = {
    async: false,
    user: null,
    password: null,
    params: {},
    exception(error, app) {
        console.log(error.stack)
    },
    execute(app, opt = {}) {
        if (app.status !== 200) throw new Error('http status:%s statusText: "%s"', app.status, app.statusText)
        return fs.ByteToText(app.responseBody, opt.charset)
    }
}

const httprequest = function httprequest_httprequest(method, url, opt) {
    opt = opt != null ? Object.assign(options, opt) : options
    try {
        var http = require('Msxml2.ServerXMLHTTP')
        if (method.toLowerCase() === 'post') {
            http.open(method.toUpperCase(), url, opt.async, opt.user, opt.password)
            http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
            http.send(escapeParams(opt.params))
        } else {
            if (Object.keys(opt.params).length) url = url + '?' + escapeParams(opt.params)
            http.open(method.toUpperCase(), url, opt.async, opt.user, opt.password)
            http.send()
        }
        return opt.execute(http, opt)
    } catch (error) {
        opt.exception(error, http)
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
