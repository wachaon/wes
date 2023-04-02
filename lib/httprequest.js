const { BufferToText } = require('filesystem')
const Server = require('MSXML2.ServerXMLHTTP')
const { map, forEach } = require('utility')

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

function httprequest(method, url, options = {}) {
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

    forEach((value, key) => Server.setRequestHeader(key, value))(header)

    const { user, password, length } = options
    Server.open(method, url, true, user, password)
    params != null ? Server.send() : Server.send(params)

    const State = ['UNINITIALIZED', 'LOADING', 'LOADED', 'INTERACTIVE', 'COMPLETED']
    const spiner = ['|', '/', '-', '\\']
    let count = 0

    const size = length ? length : 30
    let site = url.length > size + 20 ? url.slice(0, size) + '...' + url.slice(-16) : url
    let state

    while ((state = State[Server.readyState]) != 'COMPLETED') {
        const progress = spiner[count % spiner.length]
        console.weaklog('%s %s %s', site, progress, state)
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

module.exports = httprequest
