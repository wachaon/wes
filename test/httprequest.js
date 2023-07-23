const { describe, it, assert, pass } = require('/lib/minitest')
const request = require('/lib/httprequest')

describe('# httprequest', () => {
    describe('GET', () => {
        it('Getting one\'s own IP address.', () => {

            const response = request.get('https://httpbin.org/ip')
            const { responseText } = response
            const res = JSON.parse(responseText)
            assert.equal(res, {
                "origin": "60.60.209.165"
            })
        })
        it('`GET` with parameters.', () => {
            const response = request('GET', 'https://httpbin.org/get?param1=ABC&param2=DEF')
            const { responseText } = response
            const res = JSON.parse(responseText)
            delete res.headers["X-Amzn-Trace-Id"]
            assert.equal(res, {
                "args": {
                    "param1": "ABC",
                    "param2": "DEF"
                },
                "headers": {
                    "Accept": "*\/*",
                    "Accept-Language": "ja-JP",
                    "Host": "httpbin.org",
                    "User-Agent": "Mozilla/4.0 (compatible; Win32; WinHttp.WinHttpRequest.5)",
                },
                "origin": "60.60.209.165",
                "url": "https://httpbin.org/get?param1=ABC&param2=DEF"
            })
        })
        it('Things with delays.', () => {
            const response = request('GET', 'https://httpbin.org/delay/2')
            const res = JSON.parse(response.responseText)
            delete res.headers["X-Amzn-Trace-Id"]
            assert.equal(res, {
                "args": {
                    "age": "30",
                    "name": "John"
                },
                "data": "",
                "files": {},
                "form": {
                    "age": "30",
                    "name": "John"
                },
                "headers": {
                    "Accept": "*\/*",
                    "Accept-Language": "ja-JP",
                    "Host": "httpbin.org",
                    "User-Agent": "Mozilla/4.0 (compatible; Win32; WinHttp.WinHttpRequest.5)",
                },
                "origin": "60.60.209.165",
                "url": "https://httpbin.org/delay/2"
            })
        })
        it('Status code 404', () => {
            assert.throws(request.bind(null, 'GET', 'https://httpbin.org/status/404'), '404: NOT FOUND')
        })
        it('Status code 404 with a callback function.', () => {
            const response = request('GET', 'https://httpbin.org/status/404', (result, status) => {
                return status
            })
            assert.equal(response, {
                "code": 404,
                "text": "NOT FOUND"
            })
        })
    })
    describe('POST', () => {
        it('`GET` with query parameters.', () => {
            const response = request.post('http://httpbin.org/post?name=John&age=30')
            const { responseText } = response
            const res = JSON.parse(responseText)
            delete res.headers["X-Amzn-Trace-Id"]
            assert.equal(res, {
                "args": {
                    "age": "30",
                    "name": "John"
                },
                "data": "",
                "files": {},
                "form": {
                    "age": "30",
                    "name": "John"
                },
                "headers": {
                    "Accept": "*\/*",
                    "Accept-Language": "ja-JP",
                    "Content-Length": "16",
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Host": "httpbin.org",
                    "User-Agent": "Mozilla/4.0 (compatible; Win32; WinHttp.WinHttpRequest.5)",
                },
                "json": null,
                "origin": "60.60.209.165",
                "url": "http://httpbin.org/post?name=John&age=30"
            })
        })
        it('`POST` with object parameters.', () => {
            const { responseText } = request('POST', 'https://httpbin.org/post', {
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    "Name": "ウィンドウズ・スクリプト・ホスト",
                    "Age": "100"
                }
            })
            let res = JSON.parse(responseText)
            delete res.headers["X-Amzn-Trace-Id"]
            assert.equal(res, {
                "args": {},
                "data": "{\"Name\":\"ウィンドウズ・スクリプト・ホスト\",\"Age\":\"100\"}",
                "files": {},
                "form": {},
                "headers": {
                    "Accept": "*\/*",
                    "Accept-Language": "ja-JP",
                    "Content-Length": "71",
                    "Content-Type": "application/json",
                    "Host": "httpbin.org",
                    "User-Agent": "Mozilla/4.0 (compatible; Win32; WinHttp.WinHttpRequest.5)"
                },
                "json": {
                    "Age": "100",
                    "Name": "ウィンドウズ・スクリプト・ホスト"
                },
                "origin": "60.60.209.165",
                "url": "https://httpbin.org/post"
            })
        })
        it('`GET` with JSON parameters.', () => {
            const { responseText } = request('POST', 'https://httpbin.org/post', {
                data: {
                    "Name": "windows script host",
                    "Age": "100"
                }
            })
            let res = JSON.parse(responseText)
            delete res.headers["X-Amzn-Trace-Id"]
            assert.equal(res, {
                "args": {},
                "data": "{\"Name\":\"windows script host\",\"Age\":\"100\"}",
                "files": {},
                "form": {},
                "headers": {
                    "Accept": "*\/*",
                    "Accept-Language": "ja-JP",
                    "Content-Length": "42",
                    "Content-Type": "application/json",
                    "Host": "httpbin.org",
                    "User-Agent": "Mozilla/4.0 (compatible; Win32; WinHttp.WinHttpRequest.5)"
                },
                "json": {
                    "Age": "100",
                    "Name": "windows script host"
                },
                "origin": "60.60.209.165",
                "url": "https://httpbin.org/post"
            })
        })
    })
    describe('PUT', () => {
        it('`POST` with query parameters.', () => {
            const { responseText } = request.put('http://httpbin.org/put', {
                data: 'data to be put',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            let res = JSON.parse(responseText)
            delete res.headers["X-Amzn-Trace-Id"]
            assert.equal(res, {
                "args": {
                    "age": "30",
                    "name": "John"
                },
                "data": "",
                "files": {},
                "form": {
                    "data to be put": ""
                },
                "headers": {
                    "Accept": "*\/*",
                    "Accept-Language": "ja-JP",
                    "Content-Length": "14",
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Host": "httpbin.org",
                    "User-Agent": "Mozilla/4.0 (compatible; Win32; WinHttp.WinHttpRequest.5)"
                },
                "json": null,
                "origin": "60.60.209.165",
                "url": "http://httpbin.org/put"
            })

        })
    })
    describe('DELETE', () => {
        it('Sending a DELETE method.', () => {
            const response = request.delete('http://httpbin.org/delete')
            const { responseText } = response
            const res = JSON.parse(responseText)
            delete res.headers["X-Amzn-Trace-Id"]
            assert.equal(res, {
                "args": {},
                "data": "",
                "files": {},
                "form": {},
                "headers": {
                    "Accept": "*\/*",
                    "Accept-Language": "ja-JP",
                    "Content-Length": "0",
                    "Host": "httpbin.org",
                    "User-Agent": "Mozilla/4.0 (compatible; Win32; WinHttp.WinHttpRequest.5)",
                },
                "json": null,
                "origin": "60.60.209.165",
                "url": "http://httpbin.org/delete"
            })
        })
    })
})