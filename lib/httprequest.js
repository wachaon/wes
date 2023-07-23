const { BufferToText, ByteToText } = require('filesystem')
const { forEach } = require('utility')
const { detect } = require('chardet')

const Server = getServer()
let spiner = ['|', '/', '-', '\\']
let stateText = ['UNSENT', 'OPENED', 'HEADERS_RECEIVED', 'LOADING', 'DONE']
let count = 0

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

    console.log(() => Server.getAllResponseHeaders())

    const { user, password } = options
    Server.open(method, url, true, user, password)
    params != null ? Server.send() : Server.send(params)

    let site = url.length > 50 ? url.slice(0, 30) + '...' + url.slice(-16) : url
    let state

    while ((state = stateText[Server.readyState]) != 'DONE') {
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
        result.responseText = BufferToText(result.responseBody)
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

function request(...args) {
    let method = args.shift().toUpperCase()
    let options = {}
    let address, callback

    args.forEach((arg) => {
        if (typeof arg === 'string') address = arg
        else if (typeof arg === 'function') callback = arg
        else if (arg != null && typeof arg === 'object') options = arg
    })

    const { user, password, sync, charset } = options
    const headers = options.headers || {}
    const url = options.url || address

    Server.open(method, url, !sync, user, password)

    if (headers) forEach((value, key) => Server.setRequestHeader(key, value))(headers)

    if (method === 'GET' || method === 'DELETE') Server.send()
    else if (method === 'POST' || method === 'PUT') {
        let sendData = options.data
        if (headers['Content-type'] == null) {
            if (options.data != null) {
                if (typeof options.data === 'object') {
                    Server.setRequestHeader('Content-type', 'application/json')
                    sendData = JSON.stringify(options.data)
                } else {
                    Server.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
                }
            } else {
                Server.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
                sendData = url.split('?')[1]
            }
        }
        Server.send(sendData)
    }

    if (!sync) {
        let site = url.length > 50 ? url.slice(0, 30) + '...' + url.slice(-16) : url
        while (Server.readyState != 4) {
            console.weaklog(`${method} ${spiner[count++ % 4]} ${stateText[Server.readyState]} ${site}`)
            WScript.Sleep(50)
        }
    }

    const result = {}
    try {
        result.responseBody = Buffer.from(Server.responseBody)
    } catch (e) {}
    try {
        result.responseStream = Buffer.from(Server.responseStream)
    } catch (e) {}
    try {
        result.responseText = decode(Server.responseBody, charset)
    } catch (e) {}
    try {
        result.responseXML = Server.responseXML
    } catch (e) {}

    const status = {
        code: Server.status - 0,
        text: Server.statusText
    }

    if (callback) return callback(result, status)
    if (status.code < 200 || 299 < status.code) throw new Error(status.code + ': ' + status.text)
    return result
}

request.get = request.bind(null, 'GET')
request.post = request.bind(null, 'POST')
request.put = request.bind(null, 'PUT')
request.delete = request.bind(null, 'DELETE')
request.httprequest = httprequest

module.exports = request

// util
function getServer() {
    let result
    let names = [
        'MSXML2.ServerXMLHTTP.6.0',
        'MSXML2.ServerXMLHTTP.3.0',
        'MSXML2.ServerXMLHTTP',
        'MSXML2.XMLHTTP.6.0',
        'MSXML2.XMLHTTP.3.0',
        'MSXML2.XMLHTTP',
        'Microsoft.XMLHTTP'
    ]
    names.find((name) => {
        try {
            result = require(name)
            return true
        } catch (e) {
            return false
        }
    })
    return result
}

function decode(byte, enc) {
    return ByteToText(byte, enc || detect(Buffer.from(byte)))
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
