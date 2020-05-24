try {
    var WShell = WScript.CreateObject('WScript.Shell')
    var wes = {
        filestack: [WScript.ScriptFullName.split('\\').join('/')]
    }
    var argv = (function () {
        var module = { exports: {} }
        ;(function () {
            //main
            var Arguments = WScript.Arguments
            var argv = [WScript.FullName, WScript.ScriptFullName]
            var unnamed = []
            var named = {}

            var key = null
            for (var i = 0; i < Arguments.length; i++) {
                var arg = unescape(Arguments.Item(i))
                argv.push(arg)
                if (!arg.indexOf('--') && arg.length > 2) key = setLongNamed(arg, key)
                else if (!arg.indexOf('-')) key = setShortNamed(arg, key)
                else key = setUnNamed(arg, key)
            }
            if (key) named[key] = true

            // methods
            function get(name) {
                if (name in named) return named[name]
                else false
            }

            function has(name, expect) {
                var value = null
                if (name in named) {
                    value = named[name]
                    if (arguments.length > 1) return value === expect
                    return true
                }
                return false
            }

            function security() {
                return has('safe')
                    ? security.safe
                    : has('usual')
                    ? security.usual
                    : has('unsafe')
                    ? security.unsafe
                    : has('dangerous')
                    ? security.dangerous
                    : 0
            }

            ;(security.safe = -1), (security.usual = 0), (security.unsafe = 1), (security.dangerous = 2)

            function allow(borderline) {
                return borderline <= security()
            }

            function stringify(args) {
                var params = args != null ? args : { unnamed: unnamed, named: named }
                var res = []
                var short = []
                for (var name in params.named) {
                    var target = params.named[name]
                    if (name.length === 1) {
                        if (target === true) short.push(name)
                        else res.push('-' + key + ' ' + inner(escape(String(target))))
                    } else {
                        if (target === true) res.push('--' + escape(name))
                        else res.push('--' + key + '=' + inner(escape(String(target))))
                    }
                }

                if (short.length) res.unshift('-' + short.join(''))
                if (params.unnamed.length) res.unshift(params.unnamed.join(' '))
                // console.log('-----------\n' + inspect(res))
                return res.join(' ')
            }

            // bind
            argv.unnamed = unnamed
            argv.named = named
            argv.get = get
            argv.has = has
            argv.security = security
            argv.allow = allow
            argv.stringify = stringify

            module.exports = argv

            // util
            function setLongNamed(arg, name) {
                var rNamed = /^\-\-([^=]+)=?([^=]+)?$/
                if (name != null) named[name] = true
                var _named = rNamed.exec(arg)
                name = _named[1]
                var value = _named[2] || null
                if (value) {
                    named[name] = typecast(inner(value))
                    name = null
                }
                return name
            }

            function setShortNamed(arg, name) {
                var args = arg.substring(1).split('')
                for (var j = 0; j < args.length; j++) {
                    if (name != null) named[name] = true
                    name = args[j]
                }
                return name
            }

            function setUnNamed(arg, name) {
                var _arg = typecast(arg)
                if (name != null) named[name] = _arg
                else unnamed.push(_arg)
                return null
            }

            function typecast(arg) {
                var rBoolean = /true|false/i
                if (rBoolean.test(arg)) {
                    if (arg.toLowerCase() === 'true') return true
                    else return false
                }
                if (!isNaN(arg)) return Number(arg)
                return arg
            }

            function inner(value) {
                if (!value.indexOf('"') && value.indexOf('"') === value.length - 1)
                    return value.substring(1, value.lenght - 1)
                return value
            }
        })()
        return module.exports
    })()

    var console = (function () {
        var module = { exports: {} }
        ;(function () {
            var NONE = ''
            var SPACE = ' '
            var rSPECIFIER = /(%[sdfoj])/i
            var rSEQ = /\u001B\[[\d;]+m/g

            function color(red, green, blue) {
                var args = Array.prototype.slice.call(arguments)
                if (args.length === 1 && args[0].startsWith('#')) {
                    red = parseInt(args[0].slice(1, 3), 16)
                    green = parseInt(args[0].slice(3, 5), 16)
                    blue = parseInt(args[0].slice(5, 7), 16)
                }
                return '\u001B[38;2;' + red + ';' + green + ';' + blue + 'm'
            }

            function bgColor(red, green, blue) {
                var args = Array.prototype.slice.call(arguments)
                if (args.length === 1 && args[0].startsWith('#')) {
                    red = parseInt(args[0].slice(1, 3), 16)
                    green = parseInt(args[0].slice(3, 5), 16)
                    blue = parseInt(args[0].slice(5, 7), 16)
                }
                return '\u001B[48;2;' + red + ';' + green + ';' + blue + 'm'
            }

            var ansi = {
                clear: '\u001B[0m',
                bold: '\u001B[1m',
                underscore: '\u001B[4m',
                blink: '\u001B[5m',
                reverse: '\u001B[7m',
                concealed: '\u001B[8m',

                black: '\u001B[30m',
                red: '\u001B[31m',
                green: '\u001B[32m',
                yellow: '\u001B[33m',
                blue: '\u001B[34m',
                magenta: '\u001B[35m',
                cyan: '\u001B[36m',
                silver: '\u001B[37m',

                gray: '\u001B[90m',
                brightRed: '\u001B[91m',
                brightGreen: '\u001B[92m',
                brightYellow: '\u001B[93m',
                brightBlue: '\u001B[94m',
                brightMagenta: '\u001B[95m',
                brightCyan: '\u001B[96m',
                white: '\u001B[97m',

                bgBlack: '\u001B[40m',
                bgRed: '\u001B[41m',
                bgGreen: '\u001B[42m',
                bgYellow: '\u001B[43m',
                bgBlue: '\u001B[44m',
                bgMagenta: '\u001B[45m',
                bgCyan: '\u001B[46m',
                bgSilver: '\u001B[47m',

                bgGray: '\u001B[100m',
                bgBrightRed: '\u001B[101m',
                bgBrightGreen: '\u001B[102m',
                bgBrightYellow: '\u001B[103m',
                bgBrightBlue: '\u001B[104m',
                bgBrightMagenta: '\u001B[105m',
                bgBrightCyan: '\u001B[106m',
                bgWhite: '\u001B[107m',

                color: color,
                bgColor: bgColor
            }

            function normalize(arg) {
                var args = Array.prototype.slice.call(arg)
                if (args.length === 0) return
                var message = args.shift()
                if (args.length === 0) return message
                while (rSPECIFIER.test(message) && args.length > 0) {
                    var val = args.shift()
                    message = message.replace(rSPECIFIER, function ($1) {
                        if ($1 === '%s' || $1 === '%S') return String(val)
                        if ($1 === '%d' || $1 === '%D') return parseInt(val, 10)
                        if ($1 === '%f' || $1 === '%F') return Number(val)
                        if ($1 === '%o') return req('inspect')(val)
                        if ($1 === '%O') return req('inspect')(val, { indent: true, colors: true })
                        if ($1 === '%j') {
                            try {
                                return JSON.stringify(val)
                            } catch (error) {
                                return val
                            }
                        }
                        if ($1 === '%J') {
                            try {
                                return JSON.stringify(val, null, 2)
                            } catch (error) {
                                return val
                            }
                        }
                        return $1
                    })
                }
                if (argv.length > 0) message += args.join(SPACE)
                return message
            }

            function log() {
                var message = normalize(arguments)
                var monotoneMessage = removeColor(message)
                if (argv.has('monotone')) WScript.StdOut.WriteLine(monotoneMessage)
                else WScript.StdErr.WriteLine(message + ansi.clear)
                return monotoneMessage
            }

            function print() {
                var message = normalize(arguments)
                var monotoneMessage = removeColor(message)
                if (argv.has('monotone')) WScript.StdOut.Write(monotoneMessage)
                else WScript.StdErr.Write(message + ansi.clear)
                return monotoneMessage
            }

            function debug() {
                var isDebugOption = argv.has('debug')
                if (!isDebugOption) return
                var message = normalize(arguments)
                var monotoneMessage = removeColor(message)
                if (argv.has('monotone')) WScript.StdOut.WriteLine('DEBUG: ' + monotoneMessage)
                else WScript.StdErr.WriteLine('\u001B[91m\u001B[7mDEBUG:\u001B[0m ' + message + ansi.clear)
                return monotoneMessage
            }

            function removeColor(message) {
                if (typeof message === 'string') return message.replace(rSEQ, NONE)
                return message
            }

            module.exports = {
                log: log,
                print: print,
                debug: debug,
                normalize: normalize,
                ansi: ansi
            }
        })()
        return module.exports
    })()

    if (!argv.has('engine', 'Chakra')) {
        var cpu =
            WShell.ExpandEnvironmentStrings('%PROCESSOR_ARCHITECTURE%') !== 'x86'
                ? '{%}windir{%}\\SysWOW64\\cscript'
                : 'cscript'
        var nologo = '//nologo'
        var engin = '--engine=Chakra'
        var chakra = '//E:{{}1b7cd997-e5ff-4932-a7a6-2a9e636da385{}}'
        var monotone = argv.has('monotone') ? '' : '| echo off'
        var enter = '{ENTER}'

        var parameters = []
        for (var i = 0; i < WScript.Arguments.length; i++) {
            parameters.push(escape(WScript.Arguments(i)).replace(/%/g, '{%}'))
        }

        WShell.SendKeys(
            [cpu, WScript.ScriptFullName, parameters.join(' '), nologo, chakra, engin, monotone, enter].join(' ')
        )

        WScript.Quit()
    } else {
        console.log('') // Send a line

        var Modules = {
            "argv": {
                "source": "//main\nvar Arguments = WScript.Arguments\nvar argv = [WScript.FullName, WScript.ScriptFullName]\nvar unnamed = []\nvar named = {}\nvar key = null\nfor (var i = 0; i < Arguments.length; i++) {\nvar arg = unescape(Arguments.Item(i))\nargv.push(arg)\nif (!arg.indexOf('--') && arg.length > 2) key = setLongNamed(arg, key)\nelse if (!arg.indexOf('-')) key = setShortNamed(arg, key)\nelse key = setUnNamed(arg, key)\n}\nif (key) named[key] = truez\n// methods\nfunction get(name) {\nif (name in named) return named[name]\nelse false\n}\nfunction has(name, expect) {\nvar value = null\nif (name in named) {\nvalue = named[name]\nif (arguments.length > 1) return value === expect\nreturn true\n}\nreturn false\n}\nfunction security() {\nreturn has('safe')\n? security.safe\n: has('usual')\n? security.usual\n: has('unsafe')\n? security.unsafe\n: has('dangerous')\n? security.dangerous\n: 0\n}\n;(security.safe = -1), (security.usual = 0), (security.unsafe = 1), (security.dangerous = 2)\nfunction allow(borderline) {\nreturn borderline <= security()\n}\nfunction stringify(args) {\nvar params = args != null ? args : { unnamed: unnamed, named: named }\nvar res = []\nvar short = []\nfor (var name in params.named) {\nvar target = params.named[name]\nif (name.length === 1) {\nif (target === true) short.push(name)\nelse res.push('-' + key + ' ' + inner(escape(String(target))))\n} else {\nif (target === true) res.push('--' + escape(name))\nelse res.push('--' + key + '=' + inner(escape(String(target))))\n}\n}\nif (short.length) res.unshift('-' + short.join(''))\nif (params.unnamed.length) res.unshift(params.unnamed.join(' '))\n// console.log('-----------\\n' + inspect(res))\nreturn res.join(' ')\n}\n// bind\nargv.unnamed = unnamed\nargv.named = named\nargv.get = get\nargv.has = has\nargv.security = security\nargv.allow = allow\nargv.stringify = stringify\nmodule.exports = argv\n// util\nfunction setLongNamed(arg, name) {\nvar rNamed = /^\\-\\-([^=]+)=?([^=]+)?$/\nif (name != null) named[name] = true\nvar _named = rNamed.exec(arg)\nname = _named[1]\nvar value = _named[2] || null\nif (value) {\nnamed[name] = typecast(inner(value))\nname = null\n}\nreturn name\n}\nfunction setShortNamed(arg, name) {\nvar args = arg.substring(1).split('')\nfor (var j = 0; j < args.length; j++) {\nif (name != null) named[name] = true\nname = args[j]\n}\nreturn name\n}\nfunction setUnNamed(arg, name) {\nvar _arg = typecast(arg)\nif (name != null) named[name] = _arg\nelse unnamed.push(_arg)\nreturn null\n}\nfunction typecast(arg) {\nvar rBoolean = /true|false/i\nif (rBoolean.test(arg)) {\nif (arg.toLowerCase() === 'true') return true\nelse return false\n}\nif (!isNaN(arg)) return Number(arg)\nreturn arg\n}\nfunction inner(value) {\nif (!value.indexOf('\"') && value.indexOf('\"') === value.length - 1) return value.substring(1, value.lenght - 1)\nreturn value\n}\n",
                "mapping": {},
                "path": "{wes}/argv"
            },
            "browser": {
                "source": "const { isRegExp, isNumber, isString } = require('typecheck')\nconst blank = 'about:blank'\nconst { NONE } = require('text')\nfunction browser(callback, options) {\nconst CR = '\\u001B[1G'\nconst display = ['|', '/', '-', '\\\\']\nlet count = 0\nlet state = NONE\nlet op = {\nhome: blank,\nresulr: {},\ninvisible: false,\nexception: function () {}\n}\nif (options != null) op = Object.assign(op, options)\nfunction wait(app) {\nif (isNumber(app)) {\nconst time = Math.random() * app\nconst finish = new Date().getTime() + app / 2 + time\nwhile (Date.now() < finish) {\nconsole.print(CR + 'waiting ' + display[count++ % 4])\nWScript.Sleep(50)\n}\n} else {\nwhile (app.Busy || app.readystate != 4) {\nconsole.print(CR + 'processing ' + display[count++ % 4])\nWScript.Sleep(50)\n}\n}\nconsole.print('%s              %s', CR, CR)\n}\nconst app = require('InternetExplorer.Application')\napp.Visible = !op.invisible\napp.Navigate(op.home)\nlet result = op.result\nconst location = (function browser_location(url) {\nlet res = []\nreturn {\nback(url) {\n// url isString\nif (isString(url)) {\nfor (let i = res.length; i; i--) {\nif (res[i - 1].startsWith(url)) {\nres.length = i\nreturn res[i - 1]\n}\n}\nreturn blank\n} else if (isNumber(url)) {\n// url isNumber\nif (res.length < url) return blank\nlet num = res.length - url\nres.length = num\nreturn res[num - 1]\n}\n},\npush(url) {\nif (res[res.length - 1] === url) {\n} else res.push(url)\n},\nhistory() {\nreturn [...res]\n}\n}\n})()\ntry {\nwait(app)\nconst events = new Map()\nconst event = {\non(target, fn) {\nif (events.has(target)) events.get(target).push(fn)\nelse events.set(target, [fn])\n},\nemit(url, ...params) {\nevents.forEach((callbacks, evaluation) => {\nif ((isRegExp(evaluation) && evaluation.test(url)) || String(evaluation) === url)\ncallbacks.forEach((fn) => fn(url, ...params))\n})\n}\n}\nevent.on(/./, (url) => location.push(url))\ncallback(app, event, result, wait, location)\nwhile (true) {\nwait(app)\nconst url = app.document.location.href\nif (state === url) {\nconsole.print(CR + 'polling ' + display[count++ % 4])\nWScript.Sleep(50)\ncontinue\n}\nconsole.print('%s         %s', CR, CR)\nstate = url\nwait(app)\nevent.emit(url)\n}\n} catch (error) {\nconsole.print('%s         %s', CR, CR)\ntry {\napp.Document\n} catch (err) {\nconst er = op.exception(error, result, null)\nif (er != null) throw er\n}\n// app.Visible = true\nconst er = op.exception(error, result, app)\nif (er != null) throw er\n}\n}\nmodule.exports = browser\n",
                "mapping": {},
                "path": "{wes}/browser"
            },
            "buffer": {
                "source": "const { Type } = require('VBScript')\nconst { ByteToHex, HexToByte, Uint8ToHex, HexToUint8 } = require('hex')\nconst { isString, isArray } = require('typecheck')\nclass Buff extends Uint8Array {\nconstructor(data) {\nif (data instanceof Buff) return data\nelse if (Type(data) === 'vbByte[]') super(HexToUint8(ByteToHex(data)))\nelse if (data instanceof Uint8Array) super(data)\nelse if (isString(data)) {\nconst uint16Array = Uint16Array.from(data, (c) => c.charCodeAt(0))\nconst len = uint16Array.length\nconst uint8Array = new Uint8Array(len * 2)\nfor (let i = 0, j = 0; i < len; ++i, j += 2) {\nuint8Array[j] = (uint16Array[i] & 0xff00) >> 8\nuint8Array[j + 1] = uint16Array[i] & 0x00ff\n}\nsuper(uint8Array)\n} else if (isArray(data)) super(data)\nelse throw new TypeError('argument must be either String or Array or TypedArray or Byte[]')\n}\ntoByte() {\nreturn HexToByte(Uint8ToHex(this))\n}\nstatic from(date) {\nreturn new Buff(date)\n}\n}\nmodule.exports = Buff\n",
                "mapping": {},
                "path": "{wes}/buffer"
            },
            "bundle": {
                "source": "const argv = require('argv')\nconst { relative, posixSep, CurrentDirectory } = require('pathname')\nconst { writeTextFileSync } = require('filesystem')\nconst { REG_LINE_SEP, LF } = require('text')\nconst cd = CurrentDirectory\nconst dir = cd.split(posixSep).pop()\nconst host = 'wes'\nif (dir === host) throw new Error(`Cannot bundle if the current directory is \"${host}\"`)\nconst { parse, stringify } = JSON\nconst bracket = '{'\nfunction bundle(_modules) {\nconst modules = parse(stringify(_modules))\nconst mods = {}\nObject.keys(modules)\n.filter((key) => key.startsWith(bracket))\n.map((key) => {\nconst mod = modules[key]\nmod.path = `{${dir}}${posixSep}${relative(cd, mod.path)}`\ndelete mod.module\ndelete mod.exports\nreturn key\n})\n.forEach((key) => (mods[key] = modules[key]))\nreturn mods\n}\nrequire(argv.unnamed[1])\nconst mods = bundle(wes.Modules)\nconst json = '.json'\nconsole.log(writeTextFileSync(dir + json, stringify(mods, null, 4).replace(REG_LINE_SEP, LF)))\n",
                "mapping": {},
                "path": "{wes}/bundle"
            },
            "chardet": {
                "source": "var Match = function (det, rec, confidence, name, lang) {\nthis.confidence = confidence\nthis.name = name || rec.name(det)\nthis.lang = lang\n}\nclass ISO_2022 {\nmatch(det) {\nvar i, j\nvar escN\nvar hits = 0\nvar misses = 0\nvar shifts = 0\nvar quality\nvar text = det.fInputBytes\nvar textLen = det.fInputLen\nscanInput: for (i = 0; i < textLen; i++) {\nif (text[i] == 0x1b) {\ncheckEscapes: for (escN = 0; escN < this.escapeSequences.length; escN++) {\nvar seq = this.escapeSequences[escN]\nif (textLen - i < seq.length) continue checkEscapes\nfor (j = 1; j < seq.length; j++) if (seq[j] != text[i + j]) continue checkEscapes\nhits++\ni += seq.length - 1\ncontinue scanInput\n}\nmisses++\n}\nif (text[i] == 0x0e || text[i] == 0x0f) shifts++\n}\nif (hits == 0) return null\nquality = (100 * hits - 100 * misses) / (hits + misses)\nif (hits + shifts < 5) quality -= (5 - (hits + shifts)) * 10\nreturn quality <= 0 ? null : new Match(det, this, quality)\n}\n}\nclass ISO_2022_JP extends ISO_2022 {\nconstructor() {\nsuper()\nthis.name = function () {\nreturn 'ISO-2022-JP'\n}\nthis.escapeSequences = [\n[0x1b, 0x24, 0x28, 0x43],\n[0x1b, 0x24, 0x28, 0x44],\n[0x1b, 0x24, 0x40],\n[0x1b, 0x24, 0x41],\n[0x1b, 0x24, 0x42],\n[0x1b, 0x26, 0x40],\n[0x1b, 0x28, 0x42],\n[0x1b, 0x28, 0x48],\n[0x1b, 0x28, 0x49],\n[0x1b, 0x28, 0x4a],\n[0x1b, 0x2e, 0x41],\n[0x1b, 0x2e, 0x46]\n]\n}\n}\nclass ISO_2022_KR extends ISO_2022 {\nconstructor() {\nsuper()\nthis.name = function () {\nreturn 'ISO-2022-KR'\n}\nthis.escapeSequences = [[0x1b, 0x24, 0x29, 0x43]]\n}\n}\nclass ISO_2022_CN extends ISO_2022 {\nconstructor() {\nsuper()\nthis.name = function () {\nreturn 'ISO-2022-CN'\n}\nthis.escapeSequences = [\n[0x1b, 0x24, 0x29, 0x41],\n[0x1b, 0x24, 0x29, 0x47],\n[0x1b, 0x24, 0x2a, 0x48],\n[0x1b, 0x24, 0x29, 0x45],\n[0x1b, 0x24, 0x2b, 0x49],\n[0x1b, 0x24, 0x2b, 0x4a],\n[0x1b, 0x24, 0x2b, 0x4b],\n[0x1b, 0x24, 0x2b, 0x4c],\n[0x1b, 0x24, 0x2b, 0x4d],\n[0x1b, 0x4e],\n[0x1b, 0x4f]\n]\n}\n}\nfunction binarySearch(arr, searchValue) {\nfunction find(arr, searchValue, left, right) {\nif (right < left) return -1\nvar mid = Math.floor((left + right) >>> 1)\nif (searchValue > arr[mid]) return find(arr, searchValue, mid + 1, right)\nif (searchValue < arr[mid]) return find(arr, searchValue, left, mid - 1)\nreturn mid\n}\nreturn find(arr, searchValue, 0, arr.length - 1)\n}\nfunction IteratedChar() {\nthis.charValue = 0\nthis.index = 0\nthis.nextIndex = 0\nthis.error = false\nthis.done = false\nthis.reset = function () {\nthis.charValue = 0\nthis.index = -1\nthis.nextIndex = 0\nthis.error = false\nthis.done = false\n}\nthis.nextByte = function (det) {\nif (this.nextIndex >= det.fRawLength) {\nthis.done = true\nreturn -1\n}\nvar byteValue = det.fRawInput[this.nextIndex++] & 0x00ff\nreturn byteValue\n}\n}\nclass mbcs {\nmatch(det) {\nvar singleByteCharCount = 0,\ndoubleByteCharCount = 0,\ncommonCharCount = 0,\nbadCharCount = 0,\ntotalCharCount = 0,\nconfidence = 0\nvar iter = new IteratedChar()\ndetectBlock: {\nfor (iter.reset(); this.nextChar(iter, det); ) {\ntotalCharCount++\nif (iter.error) {\nbadCharCount++\n} else {\nvar cv = iter.charValue & 0xffffffff\nif (cv <= 0xff) {\nsingleByteCharCount++\n} else {\ndoubleByteCharCount++\nif (this.commonChars != null) {\nif (binarySearch(this.commonChars, cv) >= 0) {\ncommonCharCount++\n}\n}\n}\n}\nif (badCharCount >= 2 && badCharCount * 5 >= doubleByteCharCount) {\nbreak detectBlock\n}\n}\nif (doubleByteCharCount <= 10 && badCharCount == 0) {\nif (doubleByteCharCount == 0 && totalCharCount < 10) {\nconfidence = 0\n} else {\nconfidence = 10\n}\nbreak detectBlock\n}\nif (doubleByteCharCount < 20 * badCharCount) {\nconfidence = 0\nbreak detectBlock\n}\nif (this.commonChars == null) {\nconfidence = 30 + doubleByteCharCount - 20 * badCharCount\nif (confidence > 100) {\nconfidence = 100\n}\n} else {\nvar maxVal = Math.log(parseFloat(doubleByteCharCount) / 4)\nvar scaleFactor = 90.0 / maxVal\nconfidence = Math.floor(Math.log(commonCharCount + 1) * scaleFactor + 10)\nconfidence = Math.min(confidence, 100)\n}\n}\nreturn confidence == 0 ? null : new Match(det, this, confidence)\n}\nnextChar(iter, det) {}\n}\nclass sjis extends mbcs {\nconstructor() {\nsuper()\nthis.name = function () {\nreturn 'Shift-JIS'\n}\nthis.language = function () {\nreturn 'ja'\n}\nthis.commonChars = [\n0x8140,\n0x8141,\n0x8142,\n0x8145,\n0x815b,\n0x8169,\n0x816a,\n0x8175,\n0x8176,\n0x82a0,\n0x82a2,\n0x82a4,\n0x82a9,\n0x82aa,\n0x82ab,\n0x82ad,\n0x82af,\n0x82b1,\n0x82b3,\n0x82b5,\n0x82b7,\n0x82bd,\n0x82be,\n0x82c1,\n0x82c4,\n0x82c5,\n0x82c6,\n0x82c8,\n0x82c9,\n0x82cc,\n0x82cd,\n0x82dc,\n0x82e0,\n0x82e7,\n0x82e8,\n0x82e9,\n0x82ea,\n0x82f0,\n0x82f1,\n0x8341,\n0x8343,\n0x834e,\n0x834f,\n0x8358,\n0x835e,\n0x8362,\n0x8367,\n0x8375,\n0x8376,\n0x8389,\n0x838a,\n0x838b,\n0x838d,\n0x8393,\n0x8e96,\n0x93fa,\n0x95aa\n]\nthis.nextChar = function (iter, det) {\niter.index = iter.nextIndex\niter.error = false\nvar firstByte\nfirstByte = iter.charValue = iter.nextByte(det)\nif (firstByte < 0) return false\nif (firstByte <= 0x7f || (firstByte > 0xa0 && firstByte <= 0xdf)) return true\nvar secondByte = iter.nextByte(det)\nif (secondByte < 0) return false\niter.charValue = (firstByte << 8) | secondByte\nif (!((secondByte >= 0x40 && secondByte <= 0x7f) || (secondByte >= 0x80 && secondByte <= 0xff))) {\niter.error = true\n}\nreturn true\n}\n}\n}\nclass big5 extends mbcs {\nconstructor() {\nsuper()\nthis.name = function () {\nreturn 'Big5'\n}\nthis.language = function () {\nreturn 'zh'\n}\nthis.commonChars = [\n0xa140,\n0xa141,\n0xa142,\n0xa143,\n0xa147,\n0xa149,\n0xa175,\n0xa176,\n0xa440,\n0xa446,\n0xa447,\n0xa448,\n0xa451,\n0xa454,\n0xa457,\n0xa464,\n0xa46a,\n0xa46c,\n0xa477,\n0xa4a3,\n0xa4a4,\n0xa4a7,\n0xa4c1,\n0xa4ce,\n0xa4d1,\n0xa4df,\n0xa4e8,\n0xa4fd,\n0xa540,\n0xa548,\n0xa558,\n0xa569,\n0xa5cd,\n0xa5e7,\n0xa657,\n0xa661,\n0xa662,\n0xa668,\n0xa670,\n0xa6a8,\n0xa6b3,\n0xa6b9,\n0xa6d3,\n0xa6db,\n0xa6e6,\n0xa6f2,\n0xa740,\n0xa751,\n0xa759,\n0xa7da,\n0xa8a3,\n0xa8a5,\n0xa8ad,\n0xa8d1,\n0xa8d3,\n0xa8e4,\n0xa8fc,\n0xa9c0,\n0xa9d2,\n0xa9f3,\n0xaa6b,\n0xaaba,\n0xaabe,\n0xaacc,\n0xaafc,\n0xac47,\n0xac4f,\n0xacb0,\n0xacd2,\n0xad59,\n0xaec9,\n0xafe0,\n0xb0ea,\n0xb16f,\n0xb2b3,\n0xb2c4,\n0xb36f,\n0xb44c,\n0xb44e,\n0xb54c,\n0xb5a5,\n0xb5bd,\n0xb5d0,\n0xb5d8,\n0xb671,\n0xb7ed,\n0xb867,\n0xb944,\n0xbad8,\n0xbb44,\n0xbba1,\n0xbdd1,\n0xc2c4,\n0xc3b9,\n0xc440,\n0xc45f\n]\nthis.nextChar = function (iter, det) {\niter.index = iter.nextIndex\niter.error = false\nvar firstByte = (iter.charValue = iter.nextByte(det))\nif (firstByte < 0) return false\nif (firstByte <= 0x7f || firstByte == 0xff) return true\nvar secondByte = iter.nextByte(det)\nif (secondByte < 0) return false\niter.charValue = (iter.charValue << 8) | secondByte\nif (secondByte < 0x40 || secondByte == 0x7f || secondByte == 0xff) iter.error = true\nreturn true\n}\n}\n}\nfunction eucNextChar(iter, det) {\niter.index = iter.nextIndex\niter.error = false\nvar firstByte = 0\nvar secondByte = 0\nvar thirdByte = 0\nbuildChar: {\nfirstByte = iter.charValue = iter.nextByte(det)\nif (firstByte < 0) {\niter.done = true\nbreak buildChar\n}\nif (firstByte <= 0x8d) {\nbreak buildChar\n}\nsecondByte = iter.nextByte(det)\niter.charValue = (iter.charValue << 8) | secondByte\nif (firstByte >= 0xa1 && firstByte <= 0xfe) {\nif (secondByte < 0xa1) {\niter.error = true\n}\nbreak buildChar\n}\nif (firstByte == 0x8e) {\nif (secondByte < 0xa1) {\niter.error = true\n}\nbreak buildChar\n}\nif (firstByte == 0x8f) {\nthirdByte = iter.nextByte(det)\niter.charValue = (iter.charValue << 8) | thirdByte\nif (thirdByte < 0xa1) {\niter.error = true\n}\n}\n}\nreturn iter.done == false\n}\nclass euc_jp extends mbcs {\nconstructor() {\nsuper()\nthis.name = function () {\nreturn 'EUC-JP'\n}\nthis.language = function () {\nreturn 'ja'\n}\nthis.commonChars = [\n0xa1a1,\n0xa1a2,\n0xa1a3,\n0xa1a6,\n0xa1bc,\n0xa1ca,\n0xa1cb,\n0xa1d6,\n0xa1d7,\n0xa4a2,\n0xa4a4,\n0xa4a6,\n0xa4a8,\n0xa4aa,\n0xa4ab,\n0xa4ac,\n0xa4ad,\n0xa4af,\n0xa4b1,\n0xa4b3,\n0xa4b5,\n0xa4b7,\n0xa4b9,\n0xa4bb,\n0xa4bd,\n0xa4bf,\n0xa4c0,\n0xa4c1,\n0xa4c3,\n0xa4c4,\n0xa4c6,\n0xa4c7,\n0xa4c8,\n0xa4c9,\n0xa4ca,\n0xa4cb,\n0xa4ce,\n0xa4cf,\n0xa4d0,\n0xa4de,\n0xa4df,\n0xa4e1,\n0xa4e2,\n0xa4e4,\n0xa4e8,\n0xa4e9,\n0xa4ea,\n0xa4eb,\n0xa4ec,\n0xa4ef,\n0xa4f2,\n0xa4f3,\n0xa5a2,\n0xa5a3,\n0xa5a4,\n0xa5a6,\n0xa5a7,\n0xa5aa,\n0xa5ad,\n0xa5af,\n0xa5b0,\n0xa5b3,\n0xa5b5,\n0xa5b7,\n0xa5b8,\n0xa5b9,\n0xa5bf,\n0xa5c3,\n0xa5c6,\n0xa5c7,\n0xa5c8,\n0xa5c9,\n0xa5cb,\n0xa5d0,\n0xa5d5,\n0xa5d6,\n0xa5d7,\n0xa5de,\n0xa5e0,\n0xa5e1,\n0xa5e5,\n0xa5e9,\n0xa5ea,\n0xa5eb,\n0xa5ec,\n0xa5ed,\n0xa5f3,\n0xb8a9,\n0xb9d4,\n0xbaee,\n0xbbc8,\n0xbef0,\n0xbfb7,\n0xc4ea,\n0xc6fc,\n0xc7bd,\n0xcab8,\n0xcaf3,\n0xcbdc,\n0xcdd1\n]\nthis.nextChar = eucNextChar\n}\n}\nclass euc_kr extends mbcs {\nconstructor() {\nsuper()\nthis.name = function () {\nreturn 'EUC-KR'\n}\nthis.language = function () {\nreturn 'ko'\n}\nthis.commonChars = [\n0xb0a1,\n0xb0b3,\n0xb0c5,\n0xb0cd,\n0xb0d4,\n0xb0e6,\n0xb0ed,\n0xb0f8,\n0xb0fa,\n0xb0fc,\n0xb1b8,\n0xb1b9,\n0xb1c7,\n0xb1d7,\n0xb1e2,\n0xb3aa,\n0xb3bb,\n0xb4c2,\n0xb4cf,\n0xb4d9,\n0xb4eb,\n0xb5a5,\n0xb5b5,\n0xb5bf,\n0xb5c7,\n0xb5e9,\n0xb6f3,\n0xb7af,\n0xb7c2,\n0xb7ce,\n0xb8a6,\n0xb8ae,\n0xb8b6,\n0xb8b8,\n0xb8bb,\n0xb8e9,\n0xb9ab,\n0xb9ae,\n0xb9cc,\n0xb9ce,\n0xb9fd,\n0xbab8,\n0xbace,\n0xbad0,\n0xbaf1,\n0xbbe7,\n0xbbf3,\n0xbbfd,\n0xbcad,\n0xbcba,\n0xbcd2,\n0xbcf6,\n0xbdba,\n0xbdc0,\n0xbdc3,\n0xbdc5,\n0xbec6,\n0xbec8,\n0xbedf,\n0xbeee,\n0xbef8,\n0xbefa,\n0xbfa1,\n0xbfa9,\n0xbfc0,\n0xbfe4,\n0xbfeb,\n0xbfec,\n0xbff8,\n0xc0a7,\n0xc0af,\n0xc0b8,\n0xc0ba,\n0xc0bb,\n0xc0bd,\n0xc0c7,\n0xc0cc,\n0xc0ce,\n0xc0cf,\n0xc0d6,\n0xc0da,\n0xc0e5,\n0xc0fb,\n0xc0fc,\n0xc1a4,\n0xc1a6,\n0xc1b6,\n0xc1d6,\n0xc1df,\n0xc1f6,\n0xc1f8,\n0xc4a1,\n0xc5cd,\n0xc6ae,\n0xc7cf,\n0xc7d1,\n0xc7d2,\n0xc7d8,\n0xc7e5,\n0xc8ad\n]\nthis.nextChar = eucNextChar\n}\n}\nclass gb_18030 extends mbcs {\nconstructor() {\nsuper()\nthis.name = function () {\nreturn 'GB18030'\n}\nthis.language = function () {\nreturn 'zh'\n}\nthis.nextChar = function (iter, det) {\niter.index = iter.nextIndex\niter.error = false\nvar firstByte = 0\nvar secondByte = 0\nvar thirdByte = 0\nvar fourthByte = 0\nbuildChar: {\nfirstByte = iter.charValue = iter.nextByte(det)\nif (firstByte < 0) {\niter.done = true\nbreak buildChar\n}\nif (firstByte <= 0x80) {\nbreak buildChar\n}\nsecondByte = iter.nextByte(det)\niter.charValue = (iter.charValue << 8) | secondByte\nif (firstByte >= 0x81 && firstByte <= 0xfe) {\nif ((secondByte >= 0x40 && secondByte <= 0x7e) || (secondByte >= 80 && secondByte <= 0xfe)) {\nbreak buildChar\n}\nif (secondByte >= 0x30 && secondByte <= 0x39) {\nthirdByte = iter.nextByte(det)\nif (thirdByte >= 0x81 && thirdByte <= 0xfe) {\nfourthByte = iter.nextByte(det)\nif (fourthByte >= 0x30 && fourthByte <= 0x39) {\niter.charValue = (iter.charValue << 16) | (thirdByte << 8) | fourthByte\nbreak buildChar\n}\n}\n}\niter.error = true\nbreak buildChar\n}\n}\nreturn iter.done == false\n}\nthis.commonChars = [\n0xa1a1,\n0xa1a2,\n0xa1a3,\n0xa1a4,\n0xa1b0,\n0xa1b1,\n0xa1f1,\n0xa1f3,\n0xa3a1,\n0xa3ac,\n0xa3ba,\n0xb1a8,\n0xb1b8,\n0xb1be,\n0xb2bb,\n0xb3c9,\n0xb3f6,\n0xb4f3,\n0xb5bd,\n0xb5c4,\n0xb5e3,\n0xb6af,\n0xb6d4,\n0xb6e0,\n0xb7a2,\n0xb7a8,\n0xb7bd,\n0xb7d6,\n0xb7dd,\n0xb8b4,\n0xb8df,\n0xb8f6,\n0xb9ab,\n0xb9c9,\n0xb9d8,\n0xb9fa,\n0xb9fd,\n0xbacd,\n0xbba7,\n0xbbd6,\n0xbbe1,\n0xbbfa,\n0xbcbc,\n0xbcdb,\n0xbcfe,\n0xbdcc,\n0xbecd,\n0xbedd,\n0xbfb4,\n0xbfc6,\n0xbfc9,\n0xc0b4,\n0xc0ed,\n0xc1cb,\n0xc2db,\n0xc3c7,\n0xc4dc,\n0xc4ea,\n0xc5cc,\n0xc6f7,\n0xc7f8,\n0xc8ab,\n0xc8cb,\n0xc8d5,\n0xc8e7,\n0xc9cf,\n0xc9fa,\n0xcab1,\n0xcab5,\n0xcac7,\n0xcad0,\n0xcad6,\n0xcaf5,\n0xcafd,\n0xccec,\n0xcdf8,\n0xceaa,\n0xcec4,\n0xced2,\n0xcee5,\n0xcfb5,\n0xcfc2,\n0xcfd6,\n0xd0c2,\n0xd0c5,\n0xd0d0,\n0xd0d4,\n0xd1a7,\n0xd2aa,\n0xd2b2,\n0xd2b5,\n0xd2bb,\n0xd2d4,\n0xd3c3,\n0xd3d0,\n0xd3fd,\n0xd4c2,\n0xd4da,\n0xd5e2,\n0xd6d0\n]\n}\n}\nfunction NGramParser(theNgramList, theByteMap) {\nvar N_GRAM_MASK = 0xffffff\nthis.byteIndex = 0\nthis.ngram = 0\nthis.ngramList = theNgramList\nthis.byteMap = theByteMap\nthis.ngramCount = 0\nthis.hitCount = 0\nthis.spaceChar\nthis.search = function (table, value) {\nvar index = 0\nif (table[index + 32] <= value) index += 32\nif (table[index + 16] <= value) index += 16\nif (table[index + 8] <= value) index += 8\nif (table[index + 4] <= value) index += 4\nif (table[index + 2] <= value) index += 2\nif (table[index + 1] <= value) index += 1\nif (table[index] > value) index -= 1\nif (index < 0 || table[index] != value) return -1\nreturn index\n}\nthis.lookup = function (thisNgram) {\nthis.ngramCount += 1\nif (this.search(this.ngramList, thisNgram) >= 0) {\nthis.hitCount += 1\n}\n}\nthis.addByte = function (b) {\nthis.ngram = ((this.ngram << 8) + (b & 0xff)) & N_GRAM_MASK\nthis.lookup(this.ngram)\n}\nthis.nextByte = function (det) {\nif (this.byteIndex >= det.fInputLen) return -1\nreturn det.fInputBytes[this.byteIndex++] & 0xff\n}\nthis.parse = function (det, spaceCh) {\nvar b,\nignoreSpace = false\nthis.spaceChar = spaceCh\nwhile ((b = this.nextByte(det)) >= 0) {\nvar mb = this.byteMap[b]\nif (mb != 0) {\nif (!(mb == this.spaceChar && ignoreSpace)) {\nthis.addByte(mb)\n}\nignoreSpace = mb == this.spaceChar\n}\n}\nthis.addByte(this.spaceChar)\nvar rawPercent = this.hitCount / this.ngramCount\nif (rawPercent > 0.33) return 98\nreturn Math.floor(rawPercent * 300.0)\n}\n}\nfunction NGramsPlusLang(la, ng) {\nthis.fLang = la\nthis.fNGrams = ng\n}\nclass sbcs {\nconstructor() {\nthis.spaceChar = 0x20\n}\nngrams() {}\nbyteMap() {}\nmatch(det) {\nvar ngrams = this.ngrams()\nvar multiple = Array.isArray(ngrams) && ngrams[0] instanceof NGramsPlusLang\nif (!multiple) {\nvar parser = new NGramParser(ngrams, this.byteMap())\nvar confidence = parser.parse(det, this.spaceChar)\nreturn confidence <= 0 ? null : new Match(det, this, confidence)\n}\nvar bestConfidenceSoFar = -1\nvar lang = null\nfor (var i = ngrams.length - 1; i >= 0; i--) {\nvar ngl = ngrams[i]\nvar parser = new NGramParser(ngl.fNGrams, this.byteMap())\nvar confidence = parser.parse(det, this.spaceChar)\nif (confidence > bestConfidenceSoFar) {\nbestConfidenceSoFar = confidence\nlang = ngl.fLang\n}\n}\nvar name = this.name(det)\nreturn bestConfidenceSoFar <= 0 ? null : new Match(det, this, bestConfidenceSoFar, name, lang)\n}\n}\nclass ISO_8859_1 extends sbcs {\nconstructor() {\nsuper()\nthis.byteMap = function () {\nreturn [\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x00,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x61,\n0x62,\n0x63,\n0x64,\n0x65,\n0x66,\n0x67,\n0x68,\n0x69,\n0x6a,\n0x6b,\n0x6c,\n0x6d,\n0x6e,\n0x6f,\n0x70,\n0x71,\n0x72,\n0x73,\n0x74,\n0x75,\n0x76,\n0x77,\n0x78,\n0x79,\n0x7a,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x61,\n0x62,\n0x63,\n0x64,\n0x65,\n0x66,\n0x67,\n0x68,\n0x69,\n0x6a,\n0x6b,\n0x6c,\n0x6d,\n0x6e,\n0x6f,\n0x70,\n0x71,\n0x72,\n0x73,\n0x74,\n0x75,\n0x76,\n0x77,\n0x78,\n0x79,\n0x7a,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0xaa,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0xb5,\n0x20,\n0x20,\n0x20,\n0x20,\n0xba,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0xe0,\n0xe1,\n0xe2,\n0xe3,\n0xe4,\n0xe5,\n0xe6,\n0xe7,\n0xe8,\n0xe9,\n0xea,\n0xeb,\n0xec,\n0xed,\n0xee,\n0xef,\n0xf0,\n0xf1,\n0xf2,\n0xf3,\n0xf4,\n0xf5,\n0xf6,\n0x20,\n0xf8,\n0xf9,\n0xfa,\n0xfb,\n0xfc,\n0xfd,\n0xfe,\n0xdf,\n0xe0,\n0xe1,\n0xe2,\n0xe3,\n0xe4,\n0xe5,\n0xe6,\n0xe7,\n0xe8,\n0xe9,\n0xea,\n0xeb,\n0xec,\n0xed,\n0xee,\n0xef,\n0xf0,\n0xf1,\n0xf2,\n0xf3,\n0xf4,\n0xf5,\n0xf6,\n0x20,\n0xf8,\n0xf9,\n0xfa,\n0xfb,\n0xfc,\n0xfd,\n0xfe,\n0xff\n]\n}\nthis.ngrams = function () {\nreturn [\nnew NGramsPlusLang('da', [\n0x206166,\n0x206174,\n0x206465,\n0x20656e,\n0x206572,\n0x20666f,\n0x206861,\n0x206920,\n0x206d65,\n0x206f67,\n0x2070e5,\n0x207369,\n0x207374,\n0x207469,\n0x207669,\n0x616620,\n0x616e20,\n0x616e64,\n0x617220,\n0x617420,\n0x646520,\n0x64656e,\n0x646572,\n0x646574,\n0x652073,\n0x656420,\n0x656465,\n0x656e20,\n0x656e64,\n0x657220,\n0x657265,\n0x657320,\n0x657420,\n0x666f72,\n0x676520,\n0x67656e,\n0x676572,\n0x696765,\n0x696c20,\n0x696e67,\n0x6b6520,\n0x6b6b65,\n0x6c6572,\n0x6c6967,\n0x6c6c65,\n0x6d6564,\n0x6e6465,\n0x6e6520,\n0x6e6720,\n0x6e6765,\n0x6f6720,\n0x6f6d20,\n0x6f7220,\n0x70e520,\n0x722064,\n0x722065,\n0x722073,\n0x726520,\n0x737465,\n0x742073,\n0x746520,\n0x746572,\n0x74696c,\n0x766572\n]),\nnew NGramsPlusLang('de', [\n0x20616e,\n0x206175,\n0x206265,\n0x206461,\n0x206465,\n0x206469,\n0x206569,\n0x206765,\n0x206861,\n0x20696e,\n0x206d69,\n0x207363,\n0x207365,\n0x20756e,\n0x207665,\n0x20766f,\n0x207765,\n0x207a75,\n0x626572,\n0x636820,\n0x636865,\n0x636874,\n0x646173,\n0x64656e,\n0x646572,\n0x646965,\n0x652064,\n0x652073,\n0x65696e,\n0x656974,\n0x656e20,\n0x657220,\n0x657320,\n0x67656e,\n0x68656e,\n0x687420,\n0x696368,\n0x696520,\n0x696e20,\n0x696e65,\n0x697420,\n0x6c6963,\n0x6c6c65,\n0x6e2061,\n0x6e2064,\n0x6e2073,\n0x6e6420,\n0x6e6465,\n0x6e6520,\n0x6e6720,\n0x6e6765,\n0x6e7465,\n0x722064,\n0x726465,\n0x726569,\n0x736368,\n0x737465,\n0x742064,\n0x746520,\n0x74656e,\n0x746572,\n0x756e64,\n0x756e67,\n0x766572\n]),\nnew NGramsPlusLang('en', [\n0x206120,\n0x20616e,\n0x206265,\n0x20636f,\n0x20666f,\n0x206861,\n0x206865,\n0x20696e,\n0x206d61,\n0x206f66,\n0x207072,\n0x207265,\n0x207361,\n0x207374,\n0x207468,\n0x20746f,\n0x207768,\n0x616964,\n0x616c20,\n0x616e20,\n0x616e64,\n0x617320,\n0x617420,\n0x617465,\n0x617469,\n0x642061,\n0x642074,\n0x652061,\n0x652073,\n0x652074,\n0x656420,\n0x656e74,\n0x657220,\n0x657320,\n0x666f72,\n0x686174,\n0x686520,\n0x686572,\n0x696420,\n0x696e20,\n0x696e67,\n0x696f6e,\n0x697320,\n0x6e2061,\n0x6e2074,\n0x6e6420,\n0x6e6720,\n0x6e7420,\n0x6f6620,\n0x6f6e20,\n0x6f7220,\n0x726520,\n0x727320,\n0x732061,\n0x732074,\n0x736169,\n0x737420,\n0x742074,\n0x746572,\n0x746861,\n0x746865,\n0x74696f,\n0x746f20,\n0x747320\n]),\nnew NGramsPlusLang('es', [\n0x206120,\n0x206361,\n0x20636f,\n0x206465,\n0x20656c,\n0x20656e,\n0x206573,\n0x20696e,\n0x206c61,\n0x206c6f,\n0x207061,\n0x20706f,\n0x207072,\n0x207175,\n0x207265,\n0x207365,\n0x20756e,\n0x207920,\n0x612063,\n0x612064,\n0x612065,\n0x61206c,\n0x612070,\n0x616369,\n0x61646f,\n0x616c20,\n0x617220,\n0x617320,\n0x6369f3,\n0x636f6e,\n0x646520,\n0x64656c,\n0x646f20,\n0x652064,\n0x652065,\n0x65206c,\n0x656c20,\n0x656e20,\n0x656e74,\n0x657320,\n0x657374,\n0x69656e,\n0x69f36e,\n0x6c6120,\n0x6c6f73,\n0x6e2065,\n0x6e7465,\n0x6f2064,\n0x6f2065,\n0x6f6e20,\n0x6f7220,\n0x6f7320,\n0x706172,\n0x717565,\n0x726120,\n0x726573,\n0x732064,\n0x732065,\n0x732070,\n0x736520,\n0x746520,\n0x746f20,\n0x756520,\n0xf36e20\n]),\nnew NGramsPlusLang('fr', [\n0x206175,\n0x20636f,\n0x206461,\n0x206465,\n0x206475,\n0x20656e,\n0x206574,\n0x206c61,\n0x206c65,\n0x207061,\n0x20706f,\n0x207072,\n0x207175,\n0x207365,\n0x20736f,\n0x20756e,\n0x20e020,\n0x616e74,\n0x617469,\n0x636520,\n0x636f6e,\n0x646520,\n0x646573,\n0x647520,\n0x652061,\n0x652063,\n0x652064,\n0x652065,\n0x65206c,\n0x652070,\n0x652073,\n0x656e20,\n0x656e74,\n0x657220,\n0x657320,\n0x657420,\n0x657572,\n0x696f6e,\n0x697320,\n0x697420,\n0x6c6120,\n0x6c6520,\n0x6c6573,\n0x6d656e,\n0x6e2064,\n0x6e6520,\n0x6e7320,\n0x6e7420,\n0x6f6e20,\n0x6f6e74,\n0x6f7572,\n0x717565,\n0x72206c,\n0x726520,\n0x732061,\n0x732064,\n0x732065,\n0x73206c,\n0x732070,\n0x742064,\n0x746520,\n0x74696f,\n0x756520,\n0x757220\n]),\nnew NGramsPlusLang('it', [\n0x20616c,\n0x206368,\n0x20636f,\n0x206465,\n0x206469,\n0x206520,\n0x20696c,\n0x20696e,\n0x206c61,\n0x207065,\n0x207072,\n0x20756e,\n0x612063,\n0x612064,\n0x612070,\n0x612073,\n0x61746f,\n0x636865,\n0x636f6e,\n0x64656c,\n0x646920,\n0x652061,\n0x652063,\n0x652064,\n0x652069,\n0x65206c,\n0x652070,\n0x652073,\n0x656c20,\n0x656c6c,\n0x656e74,\n0x657220,\n0x686520,\n0x692061,\n0x692063,\n0x692064,\n0x692073,\n0x696120,\n0x696c20,\n0x696e20,\n0x696f6e,\n0x6c6120,\n0x6c6520,\n0x6c6920,\n0x6c6c61,\n0x6e6520,\n0x6e6920,\n0x6e6f20,\n0x6e7465,\n0x6f2061,\n0x6f2064,\n0x6f2069,\n0x6f2073,\n0x6f6e20,\n0x6f6e65,\n0x706572,\n0x726120,\n0x726520,\n0x736920,\n0x746120,\n0x746520,\n0x746920,\n0x746f20,\n0x7a696f\n]),\nnew NGramsPlusLang('nl', [\n0x20616c,\n0x206265,\n0x206461,\n0x206465,\n0x206469,\n0x206565,\n0x20656e,\n0x206765,\n0x206865,\n0x20696e,\n0x206d61,\n0x206d65,\n0x206f70,\n0x207465,\n0x207661,\n0x207665,\n0x20766f,\n0x207765,\n0x207a69,\n0x61616e,\n0x616172,\n0x616e20,\n0x616e64,\n0x617220,\n0x617420,\n0x636874,\n0x646520,\n0x64656e,\n0x646572,\n0x652062,\n0x652076,\n0x65656e,\n0x656572,\n0x656e20,\n0x657220,\n0x657273,\n0x657420,\n0x67656e,\n0x686574,\n0x696520,\n0x696e20,\n0x696e67,\n0x697320,\n0x6e2062,\n0x6e2064,\n0x6e2065,\n0x6e2068,\n0x6e206f,\n0x6e2076,\n0x6e6465,\n0x6e6720,\n0x6f6e64,\n0x6f6f72,\n0x6f7020,\n0x6f7220,\n0x736368,\n0x737465,\n0x742064,\n0x746520,\n0x74656e,\n0x746572,\n0x76616e,\n0x766572,\n0x766f6f\n]),\nnew NGramsPlusLang('no', [\n0x206174,\n0x206176,\n0x206465,\n0x20656e,\n0x206572,\n0x20666f,\n0x206861,\n0x206920,\n0x206d65,\n0x206f67,\n0x2070e5,\n0x207365,\n0x20736b,\n0x20736f,\n0x207374,\n0x207469,\n0x207669,\n0x20e520,\n0x616e64,\n0x617220,\n0x617420,\n0x646520,\n0x64656e,\n0x646574,\n0x652073,\n0x656420,\n0x656e20,\n0x656e65,\n0x657220,\n0x657265,\n0x657420,\n0x657474,\n0x666f72,\n0x67656e,\n0x696b6b,\n0x696c20,\n0x696e67,\n0x6b6520,\n0x6b6b65,\n0x6c6520,\n0x6c6c65,\n0x6d6564,\n0x6d656e,\n0x6e2073,\n0x6e6520,\n0x6e6720,\n0x6e6765,\n0x6e6e65,\n0x6f6720,\n0x6f6d20,\n0x6f7220,\n0x70e520,\n0x722073,\n0x726520,\n0x736f6d,\n0x737465,\n0x742073,\n0x746520,\n0x74656e,\n0x746572,\n0x74696c,\n0x747420,\n0x747465,\n0x766572\n]),\nnew NGramsPlusLang('pt', [\n0x206120,\n0x20636f,\n0x206461,\n0x206465,\n0x20646f,\n0x206520,\n0x206573,\n0x206d61,\n0x206e6f,\n0x206f20,\n0x207061,\n0x20706f,\n0x207072,\n0x207175,\n0x207265,\n0x207365,\n0x20756d,\n0x612061,\n0x612063,\n0x612064,\n0x612070,\n0x616465,\n0x61646f,\n0x616c20,\n0x617220,\n0x617261,\n0x617320,\n0x636f6d,\n0x636f6e,\n0x646120,\n0x646520,\n0x646f20,\n0x646f73,\n0x652061,\n0x652064,\n0x656d20,\n0x656e74,\n0x657320,\n0x657374,\n0x696120,\n0x696361,\n0x6d656e,\n0x6e7465,\n0x6e746f,\n0x6f2061,\n0x6f2063,\n0x6f2064,\n0x6f2065,\n0x6f2070,\n0x6f7320,\n0x706172,\n0x717565,\n0x726120,\n0x726573,\n0x732061,\n0x732064,\n0x732065,\n0x732070,\n0x737461,\n0x746520,\n0x746f20,\n0x756520,\n0xe36f20,\n0xe7e36f\n]),\nnew NGramsPlusLang('sv', [\n0x206174,\n0x206176,\n0x206465,\n0x20656e,\n0x2066f6,\n0x206861,\n0x206920,\n0x20696e,\n0x206b6f,\n0x206d65,\n0x206f63,\n0x2070e5,\n0x20736b,\n0x20736f,\n0x207374,\n0x207469,\n0x207661,\n0x207669,\n0x20e472,\n0x616465,\n0x616e20,\n0x616e64,\n0x617220,\n0x617474,\n0x636820,\n0x646520,\n0x64656e,\n0x646572,\n0x646574,\n0x656420,\n0x656e20,\n0x657220,\n0x657420,\n0x66f672,\n0x67656e,\n0x696c6c,\n0x696e67,\n0x6b6120,\n0x6c6c20,\n0x6d6564,\n0x6e2073,\n0x6e6120,\n0x6e6465,\n0x6e6720,\n0x6e6765,\n0x6e696e,\n0x6f6368,\n0x6f6d20,\n0x6f6e20,\n0x70e520,\n0x722061,\n0x722073,\n0x726120,\n0x736b61,\n0x736f6d,\n0x742073,\n0x746120,\n0x746520,\n0x746572,\n0x74696c,\n0x747420,\n0x766172,\n0xe47220,\n0xf67220\n])\n]\n}\nthis.name = function (det) {\nreturn det && det.fC1Bytes ? 'windows-1252' : 'ISO-8859-1'\n}\n}\n}\nclass ISO_8859_2 extends sbcs {\nconstructor() {\nsuper()\nthis.byteMap = function () {\nreturn [\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x00,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x61,\n0x62,\n0x63,\n0x64,\n0x65,\n0x66,\n0x67,\n0x68,\n0x69,\n0x6a,\n0x6b,\n0x6c,\n0x6d,\n0x6e,\n0x6f,\n0x70,\n0x71,\n0x72,\n0x73,\n0x74,\n0x75,\n0x76,\n0x77,\n0x78,\n0x79,\n0x7a,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x61,\n0x62,\n0x63,\n0x64,\n0x65,\n0x66,\n0x67,\n0x68,\n0x69,\n0x6a,\n0x6b,\n0x6c,\n0x6d,\n0x6e,\n0x6f,\n0x70,\n0x71,\n0x72,\n0x73,\n0x74,\n0x75,\n0x76,\n0x77,\n0x78,\n0x79,\n0x7a,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0xb1,\n0x20,\n0xb3,\n0x20,\n0xb5,\n0xb6,\n0x20,\n0x20,\n0xb9,\n0xba,\n0xbb,\n0xbc,\n0x20,\n0xbe,\n0xbf,\n0x20,\n0xb1,\n0x20,\n0xb3,\n0x20,\n0xb5,\n0xb6,\n0xb7,\n0x20,\n0xb9,\n0xba,\n0xbb,\n0xbc,\n0x20,\n0xbe,\n0xbf,\n0xe0,\n0xe1,\n0xe2,\n0xe3,\n0xe4,\n0xe5,\n0xe6,\n0xe7,\n0xe8,\n0xe9,\n0xea,\n0xeb,\n0xec,\n0xed,\n0xee,\n0xef,\n0xf0,\n0xf1,\n0xf2,\n0xf3,\n0xf4,\n0xf5,\n0xf6,\n0x20,\n0xf8,\n0xf9,\n0xfa,\n0xfb,\n0xfc,\n0xfd,\n0xfe,\n0xdf,\n0xe0,\n0xe1,\n0xe2,\n0xe3,\n0xe4,\n0xe5,\n0xe6,\n0xe7,\n0xe8,\n0xe9,\n0xea,\n0xeb,\n0xec,\n0xed,\n0xee,\n0xef,\n0xf0,\n0xf1,\n0xf2,\n0xf3,\n0xf4,\n0xf5,\n0xf6,\n0x20,\n0xf8,\n0xf9,\n0xfa,\n0xfb,\n0xfc,\n0xfd,\n0xfe,\n0x20\n]\n}\nthis.ngrams = function () {\nreturn [\nnew NGramsPlusLang('cs', [\n0x206120,\n0x206279,\n0x20646f,\n0x206a65,\n0x206e61,\n0x206e65,\n0x206f20,\n0x206f64,\n0x20706f,\n0x207072,\n0x2070f8,\n0x20726f,\n0x207365,\n0x20736f,\n0x207374,\n0x20746f,\n0x207620,\n0x207679,\n0x207a61,\n0x612070,\n0x636520,\n0x636820,\n0x652070,\n0x652073,\n0x652076,\n0x656d20,\n0x656eed,\n0x686f20,\n0x686f64,\n0x697374,\n0x6a6520,\n0x6b7465,\n0x6c6520,\n0x6c6920,\n0x6e6120,\n0x6ee920,\n0x6eec20,\n0x6eed20,\n0x6f2070,\n0x6f646e,\n0x6f6a69,\n0x6f7374,\n0x6f7520,\n0x6f7661,\n0x706f64,\n0x706f6a,\n0x70726f,\n0x70f865,\n0x736520,\n0x736f75,\n0x737461,\n0x737469,\n0x73746e,\n0x746572,\n0x746eed,\n0x746f20,\n0x752070,\n0xbe6520,\n0xe16eed,\n0xe9686f,\n0xed2070,\n0xed2073,\n0xed6d20,\n0xf86564\n]),\nnew NGramsPlusLang('hu', [\n0x206120,\n0x20617a,\n0x206265,\n0x206567,\n0x20656c,\n0x206665,\n0x206861,\n0x20686f,\n0x206973,\n0x206b65,\n0x206b69,\n0x206bf6,\n0x206c65,\n0x206d61,\n0x206d65,\n0x206d69,\n0x206e65,\n0x20737a,\n0x207465,\n0x20e973,\n0x612061,\n0x61206b,\n0x61206d,\n0x612073,\n0x616b20,\n0x616e20,\n0x617a20,\n0x62616e,\n0x62656e,\n0x656779,\n0x656b20,\n0x656c20,\n0x656c65,\n0x656d20,\n0x656e20,\n0x657265,\n0x657420,\n0x657465,\n0x657474,\n0x677920,\n0x686f67,\n0x696e74,\n0x697320,\n0x6b2061,\n0x6bf67a,\n0x6d6567,\n0x6d696e,\n0x6e2061,\n0x6e616b,\n0x6e656b,\n0x6e656d,\n0x6e7420,\n0x6f6779,\n0x732061,\n0x737a65,\n0x737a74,\n0x737ae1,\n0x73e967,\n0x742061,\n0x747420,\n0x74e173,\n0x7a6572,\n0xe16e20,\n0xe97320\n]),\nnew NGramsPlusLang('pl', [\n0x20637a,\n0x20646f,\n0x206920,\n0x206a65,\n0x206b6f,\n0x206d61,\n0x206d69,\n0x206e61,\n0x206e69,\n0x206f64,\n0x20706f,\n0x207072,\n0x207369,\n0x207720,\n0x207769,\n0x207779,\n0x207a20,\n0x207a61,\n0x612070,\n0x612077,\n0x616e69,\n0x636820,\n0x637a65,\n0x637a79,\n0x646f20,\n0x647a69,\n0x652070,\n0x652073,\n0x652077,\n0x65207a,\n0x65676f,\n0x656a20,\n0x656d20,\n0x656e69,\n0x676f20,\n0x696120,\n0x696520,\n0x69656a,\n0x6b6120,\n0x6b6920,\n0x6b6965,\n0x6d6965,\n0x6e6120,\n0x6e6961,\n0x6e6965,\n0x6f2070,\n0x6f7761,\n0x6f7769,\n0x706f6c,\n0x707261,\n0x70726f,\n0x70727a,\n0x727a65,\n0x727a79,\n0x7369ea,\n0x736b69,\n0x737461,\n0x776965,\n0x796368,\n0x796d20,\n0x7a6520,\n0x7a6965,\n0x7a7920,\n0xf37720\n]),\nnew NGramsPlusLang('ro', [\n0x206120,\n0x206163,\n0x206361,\n0x206365,\n0x20636f,\n0x206375,\n0x206465,\n0x206469,\n0x206c61,\n0x206d61,\n0x207065,\n0x207072,\n0x207365,\n0x2073e3,\n0x20756e,\n0x20ba69,\n0x20ee6e,\n0x612063,\n0x612064,\n0x617265,\n0x617420,\n0x617465,\n0x617520,\n0x636172,\n0x636f6e,\n0x637520,\n0x63e320,\n0x646520,\n0x652061,\n0x652063,\n0x652064,\n0x652070,\n0x652073,\n0x656120,\n0x656920,\n0x656c65,\n0x656e74,\n0x657374,\n0x692061,\n0x692063,\n0x692064,\n0x692070,\n0x696520,\n0x696920,\n0x696e20,\n0x6c6120,\n0x6c6520,\n0x6c6f72,\n0x6c7569,\n0x6e6520,\n0x6e7472,\n0x6f7220,\n0x70656e,\n0x726520,\n0x726561,\n0x727520,\n0x73e320,\n0x746520,\n0x747275,\n0x74e320,\n0x756920,\n0x756c20,\n0xba6920,\n0xee6e20\n])\n]\n}\nthis.name = function (det) {\nreturn det && det.fC1Bytes ? 'windows-1250' : 'ISO-8859-2'\n}\n}\n}\nclass ISO_8859_5 extends sbcs {\nconstructor() {\nsuper()\nthis.byteMap = function () {\nreturn [\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x00,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x61,\n0x62,\n0x63,\n0x64,\n0x65,\n0x66,\n0x67,\n0x68,\n0x69,\n0x6a,\n0x6b,\n0x6c,\n0x6d,\n0x6e,\n0x6f,\n0x70,\n0x71,\n0x72,\n0x73,\n0x74,\n0x75,\n0x76,\n0x77,\n0x78,\n0x79,\n0x7a,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x61,\n0x62,\n0x63,\n0x64,\n0x65,\n0x66,\n0x67,\n0x68,\n0x69,\n0x6a,\n0x6b,\n0x6c,\n0x6d,\n0x6e,\n0x6f,\n0x70,\n0x71,\n0x72,\n0x73,\n0x74,\n0x75,\n0x76,\n0x77,\n0x78,\n0x79,\n0x7a,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0xf1,\n0xf2,\n0xf3,\n0xf4,\n0xf5,\n0xf6,\n0xf7,\n0xf8,\n0xf9,\n0xfa,\n0xfb,\n0xfc,\n0x20,\n0xfe,\n0xff,\n0xd0,\n0xd1,\n0xd2,\n0xd3,\n0xd4,\n0xd5,\n0xd6,\n0xd7,\n0xd8,\n0xd9,\n0xda,\n0xdb,\n0xdc,\n0xdd,\n0xde,\n0xdf,\n0xe0,\n0xe1,\n0xe2,\n0xe3,\n0xe4,\n0xe5,\n0xe6,\n0xe7,\n0xe8,\n0xe9,\n0xea,\n0xeb,\n0xec,\n0xed,\n0xee,\n0xef,\n0xd0,\n0xd1,\n0xd2,\n0xd3,\n0xd4,\n0xd5,\n0xd6,\n0xd7,\n0xd8,\n0xd9,\n0xda,\n0xdb,\n0xdc,\n0xdd,\n0xde,\n0xdf,\n0xe0,\n0xe1,\n0xe2,\n0xe3,\n0xe4,\n0xe5,\n0xe6,\n0xe7,\n0xe8,\n0xe9,\n0xea,\n0xeb,\n0xec,\n0xed,\n0xee,\n0xef,\n0x20,\n0xf1,\n0xf2,\n0xf3,\n0xf4,\n0xf5,\n0xf6,\n0xf7,\n0xf8,\n0xf9,\n0xfa,\n0xfb,\n0xfc,\n0x20,\n0xfe,\n0xff\n]\n}\nthis.ngrams = function () {\nreturn [\n0x20d220,\n0x20d2de,\n0x20d4de,\n0x20d7d0,\n0x20d820,\n0x20dad0,\n0x20dade,\n0x20ddd0,\n0x20ddd5,\n0x20ded1,\n0x20dfde,\n0x20dfe0,\n0x20e0d0,\n0x20e1de,\n0x20e1e2,\n0x20e2de,\n0x20e7e2,\n0x20ede2,\n0xd0ddd8,\n0xd0e2ec,\n0xd3de20,\n0xd5dbec,\n0xd5ddd8,\n0xd5e1e2,\n0xd5e220,\n0xd820df,\n0xd8d520,\n0xd8d820,\n0xd8ef20,\n0xdbd5dd,\n0xdbd820,\n0xdbecdd,\n0xddd020,\n0xddd520,\n0xddd8d5,\n0xddd8ef,\n0xddde20,\n0xddded2,\n0xde20d2,\n0xde20df,\n0xde20e1,\n0xded220,\n0xded2d0,\n0xded3de,\n0xded920,\n0xdedbec,\n0xdedc20,\n0xdee1e2,\n0xdfdedb,\n0xdfe0d5,\n0xdfe0d8,\n0xdfe0de,\n0xe0d0d2,\n0xe0d5d4,\n0xe1e2d0,\n0xe1e2d2,\n0xe1e2d8,\n0xe1ef20,\n0xe2d5db,\n0xe2de20,\n0xe2dee0,\n0xe2ec20,\n0xe7e2de,\n0xebe520\n]\n}\nthis.name = function (det) {\nreturn 'ISO-8859-5'\n}\nthis.language = function () {\nreturn 'ru'\n}\n}\n}\nclass ISO_8859_6 extends sbcs {\nconstructor() {\nsuper()\nthis.byteMap = function () {\nreturn [\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x00,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x61,\n0x62,\n0x63,\n0x64,\n0x65,\n0x66,\n0x67,\n0x68,\n0x69,\n0x6a,\n0x6b,\n0x6c,\n0x6d,\n0x6e,\n0x6f,\n0x70,\n0x71,\n0x72,\n0x73,\n0x74,\n0x75,\n0x76,\n0x77,\n0x78,\n0x79,\n0x7a,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x61,\n0x62,\n0x63,\n0x64,\n0x65,\n0x66,\n0x67,\n0x68,\n0x69,\n0x6a,\n0x6b,\n0x6c,\n0x6d,\n0x6e,\n0x6f,\n0x70,\n0x71,\n0x72,\n0x73,\n0x74,\n0x75,\n0x76,\n0x77,\n0x78,\n0x79,\n0x7a,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0xc1,\n0xc2,\n0xc3,\n0xc4,\n0xc5,\n0xc6,\n0xc7,\n0xc8,\n0xc9,\n0xca,\n0xcb,\n0xcc,\n0xcd,\n0xce,\n0xcf,\n0xd0,\n0xd1,\n0xd2,\n0xd3,\n0xd4,\n0xd5,\n0xd6,\n0xd7,\n0xd8,\n0xd9,\n0xda,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0xe0,\n0xe1,\n0xe2,\n0xe3,\n0xe4,\n0xe5,\n0xe6,\n0xe7,\n0xe8,\n0xe9,\n0xea,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20\n]\n}\nthis.ngrams = function () {\nreturn [\n0x20c7e4,\n0x20c7e6,\n0x20c8c7,\n0x20d9e4,\n0x20e1ea,\n0x20e4e4,\n0x20e5e6,\n0x20e8c7,\n0xc720c7,\n0xc7c120,\n0xc7ca20,\n0xc7d120,\n0xc7e420,\n0xc7e4c3,\n0xc7e4c7,\n0xc7e4c8,\n0xc7e4ca,\n0xc7e4cc,\n0xc7e4cd,\n0xc7e4cf,\n0xc7e4d3,\n0xc7e4d9,\n0xc7e4e2,\n0xc7e4e5,\n0xc7e4e8,\n0xc7e4ea,\n0xc7e520,\n0xc7e620,\n0xc7e6ca,\n0xc820c7,\n0xc920c7,\n0xc920e1,\n0xc920e4,\n0xc920e5,\n0xc920e8,\n0xca20c7,\n0xcf20c7,\n0xcfc920,\n0xd120c7,\n0xd1c920,\n0xd320c7,\n0xd920c7,\n0xd9e4e9,\n0xe1ea20,\n0xe420c7,\n0xe4c920,\n0xe4e920,\n0xe4ea20,\n0xe520c7,\n0xe5c720,\n0xe5c920,\n0xe5e620,\n0xe620c7,\n0xe720c7,\n0xe7c720,\n0xe8c7e4,\n0xe8e620,\n0xe920c7,\n0xea20c7,\n0xea20e5,\n0xea20e8,\n0xeac920,\n0xead120,\n0xeae620\n]\n}\nthis.name = function (det) {\nreturn 'ISO-8859-6'\n}\nthis.language = function () {\nreturn 'ar'\n}\n}\n}\nclass ISO_8859_7 extends sbcs {\nconstructor() {\nsuper()\nthis.byteMap = function () {\nreturn [\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x00,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x61,\n0x62,\n0x63,\n0x64,\n0x65,\n0x66,\n0x67,\n0x68,\n0x69,\n0x6a,\n0x6b,\n0x6c,\n0x6d,\n0x6e,\n0x6f,\n0x70,\n0x71,\n0x72,\n0x73,\n0x74,\n0x75,\n0x76,\n0x77,\n0x78,\n0x79,\n0x7a,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x61,\n0x62,\n0x63,\n0x64,\n0x65,\n0x66,\n0x67,\n0x68,\n0x69,\n0x6a,\n0x6b,\n0x6c,\n0x6d,\n0x6e,\n0x6f,\n0x70,\n0x71,\n0x72,\n0x73,\n0x74,\n0x75,\n0x76,\n0x77,\n0x78,\n0x79,\n0x7a,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0xa1,\n0xa2,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0xdc,\n0x20,\n0xdd,\n0xde,\n0xdf,\n0x20,\n0xfc,\n0x20,\n0xfd,\n0xfe,\n0xc0,\n0xe1,\n0xe2,\n0xe3,\n0xe4,\n0xe5,\n0xe6,\n0xe7,\n0xe8,\n0xe9,\n0xea,\n0xeb,\n0xec,\n0xed,\n0xee,\n0xef,\n0xf0,\n0xf1,\n0x20,\n0xf3,\n0xf4,\n0xf5,\n0xf6,\n0xf7,\n0xf8,\n0xf9,\n0xfa,\n0xfb,\n0xdc,\n0xdd,\n0xde,\n0xdf,\n0xe0,\n0xe1,\n0xe2,\n0xe3,\n0xe4,\n0xe5,\n0xe6,\n0xe7,\n0xe8,\n0xe9,\n0xea,\n0xeb,\n0xec,\n0xed,\n0xee,\n0xef,\n0xf0,\n0xf1,\n0xf2,\n0xf3,\n0xf4,\n0xf5,\n0xf6,\n0xf7,\n0xf8,\n0xf9,\n0xfa,\n0xfb,\n0xfc,\n0xfd,\n0xfe,\n0x20\n]\n}\nthis.ngrams = function () {\nreturn [\n0x20e1ed,\n0x20e1f0,\n0x20e3e9,\n0x20e4e9,\n0x20e5f0,\n0x20e720,\n0x20eae1,\n0x20ece5,\n0x20ede1,\n0x20ef20,\n0x20f0e1,\n0x20f0ef,\n0x20f0f1,\n0x20f3f4,\n0x20f3f5,\n0x20f4e7,\n0x20f4ef,\n0xdfe120,\n0xe120e1,\n0xe120f4,\n0xe1e920,\n0xe1ed20,\n0xe1f0fc,\n0xe1f220,\n0xe3e9e1,\n0xe5e920,\n0xe5f220,\n0xe720f4,\n0xe7ed20,\n0xe7f220,\n0xe920f4,\n0xe9e120,\n0xe9eade,\n0xe9f220,\n0xeae1e9,\n0xeae1f4,\n0xece520,\n0xed20e1,\n0xed20e5,\n0xed20f0,\n0xede120,\n0xeff220,\n0xeff520,\n0xf0eff5,\n0xf0f1ef,\n0xf0fc20,\n0xf220e1,\n0xf220e5,\n0xf220ea,\n0xf220f0,\n0xf220f4,\n0xf3e520,\n0xf3e720,\n0xf3f4ef,\n0xf4e120,\n0xf4e1e9,\n0xf4e7ed,\n0xf4e7f2,\n0xf4e9ea,\n0xf4ef20,\n0xf4eff5,\n0xf4f9ed,\n0xf9ed20,\n0xfeed20\n]\n}\nthis.name = function (det) {\nreturn det && det.fC1Bytes ? 'windows-1253' : 'ISO-8859-7'\n}\nthis.language = function () {\nreturn 'el'\n}\n}\n}\nclass ISO_8859_8 extends sbcs {\nconstructor() {\nsuper()\nthis.byteMap = function () {\nreturn [\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x00,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x61,\n0x62,\n0x63,\n0x64,\n0x65,\n0x66,\n0x67,\n0x68,\n0x69,\n0x6a,\n0x6b,\n0x6c,\n0x6d,\n0x6e,\n0x6f,\n0x70,\n0x71,\n0x72,\n0x73,\n0x74,\n0x75,\n0x76,\n0x77,\n0x78,\n0x79,\n0x7a,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x61,\n0x62,\n0x63,\n0x64,\n0x65,\n0x66,\n0x67,\n0x68,\n0x69,\n0x6a,\n0x6b,\n0x6c,\n0x6d,\n0x6e,\n0x6f,\n0x70,\n0x71,\n0x72,\n0x73,\n0x74,\n0x75,\n0x76,\n0x77,\n0x78,\n0x79,\n0x7a,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0xb5,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0xe0,\n0xe1,\n0xe2,\n0xe3,\n0xe4,\n0xe5,\n0xe6,\n0xe7,\n0xe8,\n0xe9,\n0xea,\n0xeb,\n0xec,\n0xed,\n0xee,\n0xef,\n0xf0,\n0xf1,\n0xf2,\n0xf3,\n0xf4,\n0xf5,\n0xf6,\n0xf7,\n0xf8,\n0xf9,\n0xfa,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20\n]\n}\nthis.ngrams = function () {\nreturn [\nnew NGramsPlusLang('he', [\n0x20e0e5,\n0x20e0e7,\n0x20e0e9,\n0x20e0fa,\n0x20e1e9,\n0x20e1ee,\n0x20e4e0,\n0x20e4e5,\n0x20e4e9,\n0x20e4ee,\n0x20e4f2,\n0x20e4f9,\n0x20e4fa,\n0x20ece0,\n0x20ece4,\n0x20eee0,\n0x20f2ec,\n0x20f9ec,\n0xe0fa20,\n0xe420e0,\n0xe420e1,\n0xe420e4,\n0xe420ec,\n0xe420ee,\n0xe420f9,\n0xe4e5e0,\n0xe5e020,\n0xe5ed20,\n0xe5ef20,\n0xe5f820,\n0xe5fa20,\n0xe920e4,\n0xe9e420,\n0xe9e5fa,\n0xe9e9ed,\n0xe9ed20,\n0xe9ef20,\n0xe9f820,\n0xe9fa20,\n0xec20e0,\n0xec20e4,\n0xece020,\n0xece420,\n0xed20e0,\n0xed20e1,\n0xed20e4,\n0xed20ec,\n0xed20ee,\n0xed20f9,\n0xeee420,\n0xef20e4,\n0xf0e420,\n0xf0e920,\n0xf0e9ed,\n0xf2ec20,\n0xf820e4,\n0xf8e9ed,\n0xf9ec20,\n0xfa20e0,\n0xfa20e1,\n0xfa20e4,\n0xfa20ec,\n0xfa20ee,\n0xfa20f9\n]),\nnew NGramsPlusLang('he', [\n0x20e0e5,\n0x20e0ec,\n0x20e4e9,\n0x20e4ec,\n0x20e4ee,\n0x20e4f0,\n0x20e9f0,\n0x20ecf2,\n0x20ecf9,\n0x20ede5,\n0x20ede9,\n0x20efe5,\n0x20efe9,\n0x20f8e5,\n0x20f8e9,\n0x20fae0,\n0x20fae5,\n0x20fae9,\n0xe020e4,\n0xe020ec,\n0xe020ed,\n0xe020fa,\n0xe0e420,\n0xe0e5e4,\n0xe0ec20,\n0xe0ee20,\n0xe120e4,\n0xe120ed,\n0xe120fa,\n0xe420e4,\n0xe420e9,\n0xe420ec,\n0xe420ed,\n0xe420ef,\n0xe420f8,\n0xe420fa,\n0xe4ec20,\n0xe5e020,\n0xe5e420,\n0xe7e020,\n0xe9e020,\n0xe9e120,\n0xe9e420,\n0xec20e4,\n0xec20ed,\n0xec20fa,\n0xecf220,\n0xecf920,\n0xede9e9,\n0xede9f0,\n0xede9f8,\n0xee20e4,\n0xee20ed,\n0xee20fa,\n0xeee120,\n0xeee420,\n0xf2e420,\n0xf920e4,\n0xf920ed,\n0xf920fa,\n0xf9e420,\n0xfae020,\n0xfae420,\n0xfae5e9\n])\n]\n}\nthis.name = function (det) {\nreturn det && det.fC1Bytes ? 'windows-1255' : 'ISO-8859-8'\n}\nthis.language = function () {\nreturn 'he'\n}\n}\n}\nclass ISO_8859_9 extends sbcs {\nconstructor() {\nsuper()\nthis.byteMap = function () {\nreturn [\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x00,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x61,\n0x62,\n0x63,\n0x64,\n0x65,\n0x66,\n0x67,\n0x68,\n0x69,\n0x6a,\n0x6b,\n0x6c,\n0x6d,\n0x6e,\n0x6f,\n0x70,\n0x71,\n0x72,\n0x73,\n0x74,\n0x75,\n0x76,\n0x77,\n0x78,\n0x79,\n0x7a,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x61,\n0x62,\n0x63,\n0x64,\n0x65,\n0x66,\n0x67,\n0x68,\n0x69,\n0x6a,\n0x6b,\n0x6c,\n0x6d,\n0x6e,\n0x6f,\n0x70,\n0x71,\n0x72,\n0x73,\n0x74,\n0x75,\n0x76,\n0x77,\n0x78,\n0x79,\n0x7a,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0xaa,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0xb5,\n0x20,\n0x20,\n0x20,\n0x20,\n0xba,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0xe0,\n0xe1,\n0xe2,\n0xe3,\n0xe4,\n0xe5,\n0xe6,\n0xe7,\n0xe8,\n0xe9,\n0xea,\n0xeb,\n0xec,\n0xed,\n0xee,\n0xef,\n0xf0,\n0xf1,\n0xf2,\n0xf3,\n0xf4,\n0xf5,\n0xf6,\n0x20,\n0xf8,\n0xf9,\n0xfa,\n0xfb,\n0xfc,\n0x69,\n0xfe,\n0xdf,\n0xe0,\n0xe1,\n0xe2,\n0xe3,\n0xe4,\n0xe5,\n0xe6,\n0xe7,\n0xe8,\n0xe9,\n0xea,\n0xeb,\n0xec,\n0xed,\n0xee,\n0xef,\n0xf0,\n0xf1,\n0xf2,\n0xf3,\n0xf4,\n0xf5,\n0xf6,\n0x20,\n0xf8,\n0xf9,\n0xfa,\n0xfb,\n0xfc,\n0xfd,\n0xfe,\n0xff\n]\n}\nthis.ngrams = function () {\nreturn [\n0x206261,\n0x206269,\n0x206275,\n0x206461,\n0x206465,\n0x206765,\n0x206861,\n0x20696c,\n0x206b61,\n0x206b6f,\n0x206d61,\n0x206f6c,\n0x207361,\n0x207461,\n0x207665,\n0x207961,\n0x612062,\n0x616b20,\n0x616c61,\n0x616d61,\n0x616e20,\n0x616efd,\n0x617220,\n0x617261,\n0x6172fd,\n0x6173fd,\n0x617961,\n0x626972,\n0x646120,\n0x646520,\n0x646920,\n0x652062,\n0x65206b,\n0x656469,\n0x656e20,\n0x657220,\n0x657269,\n0x657369,\n0x696c65,\n0x696e20,\n0x696e69,\n0x697220,\n0x6c616e,\n0x6c6172,\n0x6c6520,\n0x6c6572,\n0x6e2061,\n0x6e2062,\n0x6e206b,\n0x6e6461,\n0x6e6465,\n0x6e6520,\n0x6e6920,\n0x6e696e,\n0x6efd20,\n0x72696e,\n0x72fd6e,\n0x766520,\n0x796120,\n0x796f72,\n0xfd6e20,\n0xfd6e64,\n0xfd6efd,\n0xfdf0fd\n]\n}\nthis.name = function (det) {\nreturn det && det.fC1Bytes ? 'windows-1254' : 'ISO-8859-9'\n}\nthis.language = function () {\nreturn 'tr'\n}\n}\n}\nclass windows_1251 extends sbcs {\nconstructor() {\nsuper()\nthis.byteMap = function () {\nreturn [\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x00,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x61,\n0x62,\n0x63,\n0x64,\n0x65,\n0x66,\n0x67,\n0x68,\n0x69,\n0x6a,\n0x6b,\n0x6c,\n0x6d,\n0x6e,\n0x6f,\n0x70,\n0x71,\n0x72,\n0x73,\n0x74,\n0x75,\n0x76,\n0x77,\n0x78,\n0x79,\n0x7a,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x61,\n0x62,\n0x63,\n0x64,\n0x65,\n0x66,\n0x67,\n0x68,\n0x69,\n0x6a,\n0x6b,\n0x6c,\n0x6d,\n0x6e,\n0x6f,\n0x70,\n0x71,\n0x72,\n0x73,\n0x74,\n0x75,\n0x76,\n0x77,\n0x78,\n0x79,\n0x7a,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x90,\n0x83,\n0x20,\n0x83,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x9a,\n0x20,\n0x9c,\n0x9d,\n0x9e,\n0x9f,\n0x90,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x9a,\n0x20,\n0x9c,\n0x9d,\n0x9e,\n0x9f,\n0x20,\n0xa2,\n0xa2,\n0xbc,\n0x20,\n0xb4,\n0x20,\n0x20,\n0xb8,\n0x20,\n0xba,\n0x20,\n0x20,\n0x20,\n0x20,\n0xbf,\n0x20,\n0x20,\n0xb3,\n0xb3,\n0xb4,\n0xb5,\n0x20,\n0x20,\n0xb8,\n0x20,\n0xba,\n0x20,\n0xbc,\n0xbe,\n0xbe,\n0xbf,\n0xe0,\n0xe1,\n0xe2,\n0xe3,\n0xe4,\n0xe5,\n0xe6,\n0xe7,\n0xe8,\n0xe9,\n0xea,\n0xeb,\n0xec,\n0xed,\n0xee,\n0xef,\n0xf0,\n0xf1,\n0xf2,\n0xf3,\n0xf4,\n0xf5,\n0xf6,\n0xf7,\n0xf8,\n0xf9,\n0xfa,\n0xfb,\n0xfc,\n0xfd,\n0xfe,\n0xff,\n0xe0,\n0xe1,\n0xe2,\n0xe3,\n0xe4,\n0xe5,\n0xe6,\n0xe7,\n0xe8,\n0xe9,\n0xea,\n0xeb,\n0xec,\n0xed,\n0xee,\n0xef,\n0xf0,\n0xf1,\n0xf2,\n0xf3,\n0xf4,\n0xf5,\n0xf6,\n0xf7,\n0xf8,\n0xf9,\n0xfa,\n0xfb,\n0xfc,\n0xfd,\n0xfe,\n0xff\n]\n}\nthis.ngrams = function () {\nreturn [\n0x20e220,\n0x20e2ee,\n0x20e4ee,\n0x20e7e0,\n0x20e820,\n0x20eae0,\n0x20eaee,\n0x20ede0,\n0x20ede5,\n0x20eee1,\n0x20efee,\n0x20eff0,\n0x20f0e0,\n0x20f1ee,\n0x20f1f2,\n0x20f2ee,\n0x20f7f2,\n0x20fdf2,\n0xe0ede8,\n0xe0f2fc,\n0xe3ee20,\n0xe5ebfc,\n0xe5ede8,\n0xe5f1f2,\n0xe5f220,\n0xe820ef,\n0xe8e520,\n0xe8e820,\n0xe8ff20,\n0xebe5ed,\n0xebe820,\n0xebfced,\n0xede020,\n0xede520,\n0xede8e5,\n0xede8ff,\n0xedee20,\n0xedeee2,\n0xee20e2,\n0xee20ef,\n0xee20f1,\n0xeee220,\n0xeee2e0,\n0xeee3ee,\n0xeee920,\n0xeeebfc,\n0xeeec20,\n0xeef1f2,\n0xefeeeb,\n0xeff0e5,\n0xeff0e8,\n0xeff0ee,\n0xf0e0e2,\n0xf0e5e4,\n0xf1f2e0,\n0xf1f2e2,\n0xf1f2e8,\n0xf1ff20,\n0xf2e5eb,\n0xf2ee20,\n0xf2eef0,\n0xf2fc20,\n0xf7f2ee,\n0xfbf520\n]\n}\nthis.name = function (det) {\nreturn 'windows-1251'\n}\nthis.language = function () {\nreturn 'ru'\n}\n}\n}\nclass windows_1256 extends sbcs {\nconstructor() {\nsuper()\nthis.byteMap = function () {\nreturn [\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x00,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x61,\n0x62,\n0x63,\n0x64,\n0x65,\n0x66,\n0x67,\n0x68,\n0x69,\n0x6a,\n0x6b,\n0x6c,\n0x6d,\n0x6e,\n0x6f,\n0x70,\n0x71,\n0x72,\n0x73,\n0x74,\n0x75,\n0x76,\n0x77,\n0x78,\n0x79,\n0x7a,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x61,\n0x62,\n0x63,\n0x64,\n0x65,\n0x66,\n0x67,\n0x68,\n0x69,\n0x6a,\n0x6b,\n0x6c,\n0x6d,\n0x6e,\n0x6f,\n0x70,\n0x71,\n0x72,\n0x73,\n0x74,\n0x75,\n0x76,\n0x77,\n0x78,\n0x79,\n0x7a,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x81,\n0x20,\n0x83,\n0x20,\n0x20,\n0x20,\n0x20,\n0x88,\n0x20,\n0x8a,\n0x20,\n0x9c,\n0x8d,\n0x8e,\n0x8f,\n0x90,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x98,\n0x20,\n0x9a,\n0x20,\n0x9c,\n0x20,\n0x20,\n0x9f,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0xaa,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0xb5,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0xc0,\n0xc1,\n0xc2,\n0xc3,\n0xc4,\n0xc5,\n0xc6,\n0xc7,\n0xc8,\n0xc9,\n0xca,\n0xcb,\n0xcc,\n0xcd,\n0xce,\n0xcf,\n0xd0,\n0xd1,\n0xd2,\n0xd3,\n0xd4,\n0xd5,\n0xd6,\n0x20,\n0xd8,\n0xd9,\n0xda,\n0xdb,\n0xdc,\n0xdd,\n0xde,\n0xdf,\n0xe0,\n0xe1,\n0xe2,\n0xe3,\n0xe4,\n0xe5,\n0xe6,\n0xe7,\n0xe8,\n0xe9,\n0xea,\n0xeb,\n0xec,\n0xed,\n0xee,\n0xef,\n0x20,\n0x20,\n0x20,\n0x20,\n0xf4,\n0x20,\n0x20,\n0x20,\n0x20,\n0xf9,\n0x20,\n0xfb,\n0xfc,\n0x20,\n0x20,\n0xff\n]\n}\nthis.ngrams = function () {\nreturn [\n0x20c7e1,\n0x20c7e4,\n0x20c8c7,\n0x20dae1,\n0x20dded,\n0x20e1e1,\n0x20e3e4,\n0x20e6c7,\n0xc720c7,\n0xc7c120,\n0xc7ca20,\n0xc7d120,\n0xc7e120,\n0xc7e1c3,\n0xc7e1c7,\n0xc7e1c8,\n0xc7e1ca,\n0xc7e1cc,\n0xc7e1cd,\n0xc7e1cf,\n0xc7e1d3,\n0xc7e1da,\n0xc7e1de,\n0xc7e1e3,\n0xc7e1e6,\n0xc7e1ed,\n0xc7e320,\n0xc7e420,\n0xc7e4ca,\n0xc820c7,\n0xc920c7,\n0xc920dd,\n0xc920e1,\n0xc920e3,\n0xc920e6,\n0xca20c7,\n0xcf20c7,\n0xcfc920,\n0xd120c7,\n0xd1c920,\n0xd320c7,\n0xda20c7,\n0xdae1ec,\n0xdded20,\n0xe120c7,\n0xe1c920,\n0xe1ec20,\n0xe1ed20,\n0xe320c7,\n0xe3c720,\n0xe3c920,\n0xe3e420,\n0xe420c7,\n0xe520c7,\n0xe5c720,\n0xe6c7e1,\n0xe6e420,\n0xec20c7,\n0xed20c7,\n0xed20e3,\n0xed20e6,\n0xedc920,\n0xedd120,\n0xede420\n]\n}\nthis.name = function (det) {\nreturn 'windows-1256'\n}\nthis.language = function () {\nreturn 'ar'\n}\n}\n}\nclass KOI8_R extends sbcs {\nconstructor() {\nsuper()\nthis.byteMap = function () {\nreturn [\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x00,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x61,\n0x62,\n0x63,\n0x64,\n0x65,\n0x66,\n0x67,\n0x68,\n0x69,\n0x6a,\n0x6b,\n0x6c,\n0x6d,\n0x6e,\n0x6f,\n0x70,\n0x71,\n0x72,\n0x73,\n0x74,\n0x75,\n0x76,\n0x77,\n0x78,\n0x79,\n0x7a,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x61,\n0x62,\n0x63,\n0x64,\n0x65,\n0x66,\n0x67,\n0x68,\n0x69,\n0x6a,\n0x6b,\n0x6c,\n0x6d,\n0x6e,\n0x6f,\n0x70,\n0x71,\n0x72,\n0x73,\n0x74,\n0x75,\n0x76,\n0x77,\n0x78,\n0x79,\n0x7a,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0xa3,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0xa3,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0x20,\n0xc0,\n0xc1,\n0xc2,\n0xc3,\n0xc4,\n0xc5,\n0xc6,\n0xc7,\n0xc8,\n0xc9,\n0xca,\n0xcb,\n0xcc,\n0xcd,\n0xce,\n0xcf,\n0xd0,\n0xd1,\n0xd2,\n0xd3,\n0xd4,\n0xd5,\n0xd6,\n0xd7,\n0xd8,\n0xd9,\n0xda,\n0xdb,\n0xdc,\n0xdd,\n0xde,\n0xdf,\n0xc0,\n0xc1,\n0xc2,\n0xc3,\n0xc4,\n0xc5,\n0xc6,\n0xc7,\n0xc8,\n0xc9,\n0xca,\n0xcb,\n0xcc,\n0xcd,\n0xce,\n0xcf,\n0xd0,\n0xd1,\n0xd2,\n0xd3,\n0xd4,\n0xd5,\n0xd6,\n0xd7,\n0xd8,\n0xd9,\n0xda,\n0xdb,\n0xdc,\n0xdd,\n0xde,\n0xdf\n]\n}\nthis.ngrams = function () {\nreturn [\n0x20c4cf,\n0x20c920,\n0x20cbc1,\n0x20cbcf,\n0x20cec1,\n0x20cec5,\n0x20cfc2,\n0x20d0cf,\n0x20d0d2,\n0x20d2c1,\n0x20d3cf,\n0x20d3d4,\n0x20d4cf,\n0x20d720,\n0x20d7cf,\n0x20dac1,\n0x20dcd4,\n0x20ded4,\n0xc1cec9,\n0xc1d4d8,\n0xc5ccd8,\n0xc5cec9,\n0xc5d3d4,\n0xc5d420,\n0xc7cf20,\n0xc920d0,\n0xc9c520,\n0xc9c920,\n0xc9d120,\n0xccc5ce,\n0xccc920,\n0xccd8ce,\n0xcec120,\n0xcec520,\n0xcec9c5,\n0xcec9d1,\n0xcecf20,\n0xcecfd7,\n0xcf20d0,\n0xcf20d3,\n0xcf20d7,\n0xcfc7cf,\n0xcfca20,\n0xcfccd8,\n0xcfcd20,\n0xcfd3d4,\n0xcfd720,\n0xcfd7c1,\n0xd0cfcc,\n0xd0d2c5,\n0xd0d2c9,\n0xd0d2cf,\n0xd2c1d7,\n0xd2c5c4,\n0xd3d120,\n0xd3d4c1,\n0xd3d4c9,\n0xd3d4d7,\n0xd4c5cc,\n0xd4cf20,\n0xd4cfd2,\n0xd4d820,\n0xd9c820,\n0xded4cf\n]\n}\nthis.name = function (det) {\nreturn 'KOI8-R'\n}\nthis.language = function () {\nreturn 'ru'\n}\n}\n}\n;('use strict')\nclass UTF_16BE {\nname() {\nreturn 'UTF-16BE'\n}\nmatch(det) {\nvar input = det.fRawInput\nif (input.length >= 2 && (input[0] & 0xff) == 0xfe && (input[1] & 0xff) == 0xff) {\nreturn new Match(det, this, 100)\n}\nreturn null\n}\n}\nclass UTF_16LE {\nname() {\nreturn 'UTF-16LE'\n}\nmatch(det) {\nvar input = det.fRawInput\nif (input.length >= 2 && (input[0] & 0xff) == 0xff && (input[1] & 0xff) == 0xfe) {\nif (input.length >= 4 && input[2] == 0x00 && input[3] == 0x00) {\nreturn null\n}\nreturn new Match(det, this, 100)\n}\nreturn null\n}\n}\nclass UTF_32 {\nmatch(det) {\nvar input = det.fRawInput,\nlimit = (det.fRawLength / 4) * 4,\nnumValid = 0,\nnumInvalid = 0,\nhasBOM = false,\nconfidence = 0\nif (limit == 0) {\nreturn null\n}\nif (this.getChar(input, 0) == 0x0000feff) {\nhasBOM = true\n}\nfor (var i = 0; i < limit; i += 4) {\nvar ch = this.getChar(input, i)\nif (ch < 0 || ch >= 0x10ffff || (ch >= 0xd800 && ch <= 0xdfff)) {\nnumInvalid += 1\n} else {\nnumValid += 1\n}\n}\nif (hasBOM && numInvalid == 0) {\nconfidence = 100\n} else if (hasBOM && numValid > numInvalid * 10) {\nconfidence = 80\n} else if (numValid > 3 && numInvalid == 0) {\nconfidence = 100\n} else if (numValid > 0 && numInvalid == 0) {\nconfidence = 80\n} else if (numValid > numInvalid * 10) {\nconfidence = 25\n}\nreturn confidence == 0 ? null : new Match(det, this, confidence)\n}\n}\nclass UTF_32BE extends UTF_32 {\nconstructor() {\nsuper()\nthis.name = function () {\nreturn 'UTF-32BE'\n}\nthis.getChar = function (input, index) {\nreturn (\n((input[index + 0] & 0xff) << 24) |\n((input[index + 1] & 0xff) << 16) |\n((input[index + 2] & 0xff) << 8) |\n(input[index + 3] & 0xff)\n)\n}\n}\n}\nclass UTF_32LE extends UTF_32 {\nconstructor() {\nsuper()\nthis.name = function () {\nreturn 'UTF-32LE'\n}\nthis.getChar = function (input, index) {\nreturn (\n((input[index + 3] & 0xff) << 24) |\n((input[index + 2] & 0xff) << 16) |\n((input[index + 1] & 0xff) << 8) |\n(input[index + 0] & 0xff)\n)\n}\n}\n}\nclass UTF_8 {\nname() {\nreturn 'UTF-8'\n}\nmatch(det) {\nvar hasBOM = false,\nnumValid = 0,\nnumInvalid = 0,\ninput = det.fRawInput,\ntrailBytes = 0,\nconfidence\nif (\ndet.fRawLength >= 3 &&\n(input[0] & 0xff) == 0xef &&\n(input[1] & 0xff) == 0xbb &&\n(input[2] & 0xff) == 0xbf\n) {\nhasBOM = true\n}\nfor (var i = 0; i < det.fRawLength; i++) {\nvar b = input[i]\nif ((b & 0x80) == 0) continue\nif ((b & 0x0e0) == 0x0c0) {\ntrailBytes = 1\n} else if ((b & 0x0f0) == 0x0e0) {\ntrailBytes = 2\n} else if ((b & 0x0f8) == 0xf0) {\ntrailBytes = 3\n} else {\nnumInvalid++\nif (numInvalid > 5) break\ntrailBytes = 0\n}\nfor (;;) {\ni++\nif (i >= det.fRawLength) break\nif ((input[i] & 0xc0) != 0x080) {\nnumInvalid++\nbreak\n}\nif (--trailBytes == 0) {\nnumValid++\nbreak\n}\n}\n}\nconfidence = 0\nif (hasBOM && numInvalid == 0) confidence = 100\nelse if (hasBOM && numValid > numInvalid * 10) confidence = 80\nelse if (numValid > 3 && numInvalid == 0) confidence = 100\nelse if (numValid > 0 && numInvalid == 0) confidence = 80\nelse if (numValid == 0 && numInvalid == 0) confidence = 10\nelse if (numValid > numInvalid * 10) confidence = 25\nelse return null\nreturn new Match(det, this, confidence)\n}\n}\nvar fs = (() => {\nconst AD_TYPE_BINARY = 1\nconst readByteFileSync = (path) => {\nconst ADODB = require('ADODB.stream')\nlet byte = ''\ntry {\nADODB.Type = AD_TYPE_BINARY\nADODB.Open()\nADODB.LoadFromFile(path)\nbyte = ADODB.Read()\n} catch (error) {\nconsole.log(`error readByteFileSync ${error} ${path}`)\n} finally {\nADODB.Close()\n}\nreturn byte\n}\nconst readFileSync = (path) => {\nconst byte = readByteFileSync(path)\nreturn new Buffer(byte)\n}\nreturn { readFileSync }\n})()\nvar recognisers = [\nnew UTF_8(),\nnew UTF_16BE(),\nnew UTF_16LE(),\nnew UTF_32BE(),\nnew UTF_32LE(),\nnew sjis(),\nnew big5(),\nnew euc_jp(),\nnew euc_kr(),\nnew gb_18030(),\nnew ISO_2022_JP(),\nnew ISO_2022_KR(),\nnew ISO_2022_CN(),\nnew ISO_8859_1(),\nnew ISO_8859_2(),\nnew ISO_8859_5(),\nnew ISO_8859_6(),\nnew ISO_8859_7(),\nnew ISO_8859_8(),\nnew ISO_8859_9(),\nnew windows_1251(),\nnew windows_1256(),\nnew KOI8_R()\n]\nfunction detect(buffer, opts) {\nvar fByteStats = []\nfor (var i = 0; i < 256; i++) fByteStats[i] = 0\nfor (var i = buffer.length - 1; i >= 0; i--) fByteStats[buffer[i] & 0x00ff]++\nvar fC1Bytes = false\nfor (var i = 0x80; i <= 0x9f; i += 1) {\nif (fByteStats[i] != 0) {\nfC1Bytes = true\nbreak\n}\n}\nvar context = {\nfByteStats: fByteStats,\nfC1Bytes: fC1Bytes,\nfRawInput: buffer,\nfRawLength: buffer.length,\nfInputBytes: buffer,\nfInputLen: buffer.length\n}\nvar matches = recognisers\n.map(function (rec) {\nreturn rec.match(context)\n})\n.filter(function (match) {\nreturn !!match\n})\n.sort(function (a, b) {\nreturn b.confidence - a.confidence\n})\nif (opts && opts.returnAllMatches === true) {\nreturn matches\n} else {\nreturn matches.length > 0 ? matches[0].name : null\n}\n}\nfunction detectFile(filepath, opts, cb) {\nif (typeof opts === 'function') {\ncb = opts\nopts = undefined\n}\nvar fd\nvar handler = function (err, buffer) {\nif (fd) {\nfs.closeSync(fd)\n}\nif (err) return cb(err, null)\ncb(null, detect(buffer, opts))\n}\nif (opts && opts.sampleSize) {\n;(fd = fs.openSync(filepath, 'r')), (sample = Buffer.allocUnsafe(opts.sampleSize))\nfs.read(fd, sample, 0, opts.sampleSize, null, function (err) {\nhandler(err, sample)\n})\nreturn\n}\nfs.readFile(filepath, handler)\n}\nfunction detectFileSync(filepath, opts) {\n/*\nif (opts && opts.sampleSize) {\nvar fd = fs.openSync(filepath, \"r\"),\nsample = Buffer.allocUnsafe(opts.sampleSize);\nfs.readSync(fd, sample, 0, opts.sampleSize);\nfs.closeSync(fd);\nreturn detect(sample, opts);\n}\n*/\nreturn detect(fs.readFileSync(filepath), opts)\n}\nfunction detectAll(buffer, opts) {\nif (typeof opts !== 'object') {\nopts = {}\n}\nopts.returnAllMatches = true\nreturn detect(buffer, opts)\n}\nfunction detectFileAll(filepath, opts, cb) {\nif (typeof opts === 'function') {\ncb = opts\nopts = undefined\n}\nif (typeof opts !== 'object') {\nopts = {}\n}\nopts.returnAllMatches = true\ndetectFile(filepath, opts, cb)\n}\nfunction detectFileAllSync(filepath, opts) {\nif (typeof opts !== 'object') {\nopts = {}\n}\nopts.returnAllMatches = true\nreturn detectFileSync(filepath, opts)\n}\nmodule.exports = { detect, detectFileSync }\n",
                "mapping": {},
                "path": "{wes}/chardet"
            },
            "console": {
                "source": "var NONE = ''\nvar SPACE = ' '\nvar rSPECIFIER = /(%[sdfoj])/i\nvar rSEQ = /\\u001B\\[[\\d;]+m/g\nfunction color(red, green, blue) {\nvar args = Array.prototype.slice.call(arguments)\nif (args.length === 1 && args[0].startsWith('#')) {\nred = parseInt(args[0].slice(1, 3), 16)\ngreen = parseInt(args[0].slice(3, 5), 16)\nblue = parseInt(args[0].slice(5, 7), 16)\n}\nreturn '\\u001B[38;2;' + red + ';' + green + ';' + blue + 'm'\n}\nfunction bgColor(red, green, blue) {\nvar args = Array.prototype.slice.call(arguments)\nif (args.length === 1 && args[0].startsWith('#')) {\nred = parseInt(args[0].slice(1, 3), 16)\ngreen = parseInt(args[0].slice(3, 5), 16)\nblue = parseInt(args[0].slice(5, 7), 16)\n}\nreturn '\\u001B[48;2;' + red + ';' + green + ';' + blue + 'm'\n}\nvar ansi = {\nclear: '\\u001B[0m',\nbold: '\\u001B[1m',\nunderscore: '\\u001B[4m',\nblink: '\\u001B[5m',\nreverse: '\\u001B[7m',\nconcealed: '\\u001B[8m',\nblack: '\\u001B[30m',\nred: '\\u001B[31m',\ngreen: '\\u001B[32m',\nyellow: '\\u001B[33m',\nblue: '\\u001B[34m',\nmagenta: '\\u001B[35m',\ncyan: '\\u001B[36m',\nsilver: '\\u001B[37m',\ngray: '\\u001B[90m',\nbrightRed: '\\u001B[91m',\nbrightGreen: '\\u001B[92m',\nbrightYellow: '\\u001B[93m',\nbrightBlue: '\\u001B[94m',\nbrightMagenta: '\\u001B[95m',\nbrightCyan: '\\u001B[96m',\nwhite: '\\u001B[97m',\nbgBlack: '\\u001B[40m',\nbgRed: '\\u001B[41m',\nbgGreen: '\\u001B[42m',\nbgYellow: '\\u001B[43m',\nbgBlue: '\\u001B[44m',\nbgMagenta: '\\u001B[45m',\nbgCyan: '\\u001B[46m',\nbgSilver: '\\u001B[47m',\nbgGray: '\\u001B[100m',\nbgBrightRed: '\\u001B[101m',\nbgBrightGreen: '\\u001B[102m',\nbgBrightYellow: '\\u001B[103m',\nbgBrightBlue: '\\u001B[104m',\nbgBrightMagenta: '\\u001B[105m',\nbgBrightCyan: '\\u001B[106m',\nbgWhite: '\\u001B[107m',\ncolor: color,\nbgColor: bgColor\n}\nfunction normalize(arg) {\nvar args = Array.prototype.slice.call(arg)\nif (args.length === 0) return\nvar message = args.shift()\nif (args.length === 0) return message\nwhile (rSPECIFIER.test(message) && args.length > 0) {\nvar val = args.shift()\nmessage = message.replace(rSPECIFIER, function ($1) {\nif ($1 === '%s' || $1 === '%S') return String(val)\nif ($1 === '%d' || $1 === '%D') return parseInt(val, 10)\nif ($1 === '%f' || $1 === '%F') return Number(val)\nif ($1 === '%o') return req('inspect')(val)\nif ($1 === '%O') return req('inspect')(val, { indent: true, colors: true })\nif ($1 === '%j') {\ntry {\nreturn JSON.stringify(val)\n} catch (error) {\nreturn val\n}\n}\nif ($1 === '%J') {\ntry {\nreturn JSON.stringify(val, null, 2)\n} catch (error) {\nreturn val\n}\n}\nreturn $1\n})\n}\nif (argv.length > 0) message += args.join(SPACE)\nreturn message\n}\nfunction log() {\nvar message = normalize(arguments)\nvar monotoneMessage = removeColor(message)\nif (argv.has('monotone')) WScript.StdOut.WriteLine(monotoneMessage)\nelse WScript.StdErr.WriteLine(message + ansi.clear)\nreturn monotoneMessage\n}\nfunction print() {\nvar message = normalize(arguments)\nvar monotoneMessage = removeColor(message)\nif (argv.has('monotone')) WScript.StdOut.Write(monotoneMessage)\nelse WScript.StdErr.Write(message + ansi.clear)\nreturn monotoneMessage\n}\nfunction debug() {\nvar isDebugOption = argv.has('debug')\nif (!isDebugOption) return\nvar message = normalize(arguments)\nvar monotoneMessage = removeColor(message)\nif (argv.has('monotone')) WScript.StdOut.WriteLine('DEBUG: ' + monotoneMessage)\nelse WScript.StdErr.WriteLine('\\u001B[91m\\u001B[7mDEBUG:\\u001B[0m ' + message + ansi.clear)\nreturn monotoneMessage\n}\nfunction removeColor(message) {\nif (typeof message === 'string') return message.replace(rSEQ, NONE)\nreturn message\n}\nmodule.exports = {\nlog: log,\nprint: print,\ndebug: debug,\nnormalize: normalize,\nansi: ansi\n}\n",
                "mapping": {},
                "path": "{wes}/console"
            },
            "day": {
                "source": "const zoro = '0'\nconst doubleZero = '00'\nclass Day extends Date {\n[Symbol.toPrimitive](hint) {\nif (hint === 'number') return this.getTime()\nelse {\nlet year = this.getFullYear()\nlet month = (zoro + (this.getMonth() + 1)).slice(-2)\nlet date = (zoro + this.getDate()).slice(-2)\nlet hours = (zoro + this.getHours()).slice(-2)\nlet minutes = (zoro + this.getMinutes()).slice(-2)\nlet seconds = (zoro + this.getSeconds()).slice(-2)\nlet milliseconds = (doubleZero + this.getMilliseconds()).slice(-3)\nreturn `${year}/${month}/${date} ${hours}:${minutes}:${seconds}.${milliseconds}`\n}\n}\n}\nmodule.exports = Day\n",
                "mapping": {},
                "path": "{wes}/day"
            },
            "debug": {
                "source": "const argv = require('argv')\nconst inspect = require('inspect')\nconst { brightRed, reverse, clear } = console\nconst isDebugOprion = argv.has('debug')\nconst debug = function debug(expression) {\nif (isDebugOprion) {\nconsole.log(`${brightRed + reverse}DEBUG${clear}: ${inspect(expression)}`)\n}\nreturn expression\n}\ndebug.isDebugOption = isDebugOprion\nmodule.exports = debug\n",
                "mapping": {},
                "path": "{wes}/debug"
            },
            "filesystem": {
                "source": "const ADODB = require('ADODB.Stream')\nconst FSO = require('Scripting.FileSystemObject')\nconst { toWin32Sep, posixSep, split, absolute, relative, CurrentDirectory: cd } = require('pathname')\nconst chardet = require('chardet')\nconst { Type } = require('VBScript')\nconst http = require('Msxml2.XMLHTTP')\nconst { Enumerator } = require('JScript')\nconst { NONE } = require('text')\nconst { ByteToHex, HexToByte, Uint8ToHex } = require('hex')\nconst VB_BYTE = 'vbByte[]'\nconst AD_TYPE_BINARY = 1\nconst AD_TYPE_TEXT = 2\nconst AD_SAVE_CREATE_OVER_WRITE = 2\nconst UTF_8 = 'UTF-8'\nconst UTF_8BOM = 'UTF-8BOM'\nconst UTF_8N = 'UTF-8N'\nconst readFileSync = function filesystem_readFileSync(filespec, options) {\nif (options == null) return new Buffer(readByteFileSync(filespec))\nreturn readTextFileSync(filespec, options)\n}\nconst readTextFileSync = function filesystem_readTextFileSync(filespec, options) {\nlet byte = readByteFileSync(filespec)\nif (byte === null) return ''\nlet buffer = new Buffer(byte)\nlet encoding = null\nif (buffer.length >= 3) encoding = options != null ? options : chardet.detect(buffer)\nelse encoding = UTF_8\nif (encoding.toUpperCase().startsWith(UTF_8)) {\nencoding = UTF_8\n}\nif (encoding === UTF_8 && buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf) {\nbyte = HexToByte(ByteToHex(byte).replace(/^efbbbf/, NONE))\n}\nreturn ByteToText(byte, encoding)\n}\nconst writeFileSync = function filesystem_writeFileSync(filespec, data, options) {\nif (data instanceof Buffer) data = data.toByte()\nif (Type(data) === VB_BYTE) {\ntry {\nADODB.Open()\nADODB.Position = 0\nADODB.SetEOS()\nADODB.Type = AD_TYPE_BINARY\nADODB.Write(data)\nADODB.SaveToFile(filespec, AD_SAVE_CREATE_OVER_WRITE)\nADODB.Close()\nreturn `Save operation succeeded '${filespec}'`\n} catch (error) {\nconsole.log(`Save operation failed. filespec: ${filespec}\\n${error}`)\n}\n}\nreturn writeTextFileSync(filespec, data, options)\n}\nconst writeTextFileSync = function filesystem_writeTextFileSync(filespec, text, enc) {\nlet spliBbom = false\ntry {\nADODB.Open()\nADODB.Position = 0\nADODB.SetEOS()\nADODB.Type = AD_TYPE_TEXT\nif (enc != null) {\nconst _enc = enc.toUpperCase()\nif (_enc.startsWith(UTF_8)) ADODB.CharSet = UTF_8\nelse ADODB.CharSet = enc\nif (_enc === UTF_8BOM) spliBbom = false\nelse if (_enc === UTF_8N) spliBbom = true\nelse spliBbom = false\n}\nADODB.WriteText(text)\nif (spliBbom) {\nADODB.Position = 0\nADODB.Type = AD_TYPE_BINARY\nADODB.Position = 3\nlet bytes = ADODB.Read()\nADODB.Position = 0\nADODB.SetEOS()\nADODB.Write(bytes)\n}\nADODB.SaveToFile(filespec, AD_SAVE_CREATE_OVER_WRITE)\n} catch (error) {\nreturn console.log(`Save operation failed. filespec: ${filespec}\\n${error}`)\n} finally {\nADODB.Close()\n}\nreturn `Save operation succeeded. '${filespec}'`\n}\n// util\nconst readByteFileSync = function filesystem_readByteFileSync(path) {\nlet byte = NONE\ntry {\nADODB.Type = AD_TYPE_BINARY\nADODB.Open()\nADODB.LoadFromFile(path)\nbyte = ADODB.Read()\n} catch (error) {\nconsole.log(`error readByteFileSync filespec: ${path}\\n${error} `)\n} finally {\nADODB.Close()\n}\nreturn byte\n}\nconst ByteToText = function filesystem_ByteToText(byte, enc) {\ntry {\nADODB.Open()\nADODB.Type = AD_TYPE_BINARY\nADODB.Write(byte)\nADODB.Position = 0\nADODB.Type = AD_TYPE_TEXT\nif (enc != null) ADODB.Charset = enc\nreturn ADODB.ReadText()\n} catch (error) {\nconsole.log(`error ByteToText encode: ${enc}\\n${error}`)\n} finally {\nADODB.Close()\n}\n}\nconst BufferToText = function filesystem_BufferToText(buff, enc) {\nconst byte = HexToByte(Uint8ToHex(buff))\nreturn ByteToText(byte, enc || chardet.detect(buff))\n}\nconst exists = function filesystem_exists(filespec) {\nreturn FSO.FileExists(toWin32Sep(filespec))\n}\nconst existsFileSync = function filesystem_existsFileSync(filespec) {\nreturn FSO.FileExists(toWin32Sep(filespec))\n}\nconst existsdirSync = function filesystem_existsdirSync(dirspec) {\nreturn FSO.FolderExists(dirspec)\n}\nconst copyFileSync = function filesystem_copyFileSync(from, to) {\nFSO.CopyFile(from, to)\nreturn `copyFileSync operation succeeded. '${from}' => '${to}'`\n}\nconst moveFileSync = function filesystem_moveFileSync(from, to) {\nFSO.MoveFile(from, to)\nreturn `moveFileSync operation succeeded. '${from}' => '${to}'`\n}\nconst deleteFileSync = function filesystem_deleteFileSync(filespec) {\nif (FSO.FileExists(filespec)) {\nFSO.DeleteFile(filespec)\nreturn `deleteFileSync operation succeeded. '${filespec}'`\n}\nreturn `deleteFileSync operation failed. '${filespec}'`\n}\nconst mkdirSync = function filesystem_mkdirSync(dirspec) {\nif (!FSO.FolderExists(dirspec)) {\nFSO.CreateFolder(dirspec)\nreturn `mkdirSync operation succeeded. '${dirspec}'`\n}\nreturn `mkdirSync operation failed. '${dirspec}'`\n}\nconst mkdirsSync = function filesystem_mkdirsSync(spec) {\nlet dirs = split(absolute(spec))\ndirs.reduce((acc, curr) => {\nif (!/^[A-z]:/.test(acc)) throw new Error('A drive that does not exist is specified. => %s', spec)\nlet specs = acc + posixSep + curr\nif (!existsdirSync(specs)) mkdirSync(specs)\nreturn specs\n})\nreturn `mkdirsSync operation succeeded '${spec}'`\n}\nconst copydirSync = function filesystem_copydirSync(from, to) {\nFSO.CopyFolder(from, to)\nreturn `copydirSync operation succeeded '${dirspec}'`\n}\nconst download = function filesystem_download(url, saveFile) {\nhttp.Open('GET', url, false)\nhttp.Send()\nreturn writeFileSync(saveFile, http.responseBody)\n}\nconst readdirsSync = function filesystem_readdirsSync(spec, callback) {\nlet children = []\nlet files = new Enumerator(FSO.GetFolder(spec).Files)\nlet dirs = new Enumerator(FSO.GetFolder(spec).SubFolders)\nif (typeof callback === 'function') {\nfiles.forEach((node) => children.push(callback(node, null)))\ndirs.forEach((node) => children.push(callback(null, node)))\nreturn children\n} else {\nfiles.forEach((node) =>\nchildren.push({\nname: node.Name,\npath: absolute(node.Path),\ntype: 'file'\n})\n)\ndirs.forEach((node) =>\nchildren.push({\nname: node.Name,\npath: absolute(node.path),\ntype: 'directory',\nchildren: readdirsSync(absolute(node.path))\n})\n)\nreturn children.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))\n}\n}\nconst readdirSync = function filesystem_readdirSync(spec) {\nreturn readdirsSync(spec, (file, dir) => {\nif (file) return file.name\nelse return dir.name\n})\n}\nconst deletedirSync = function filesystem_deletedirSync(dirspec) {\nif (relative(cd, dirspec).startsWith('..') && !(argv.get('unsafe') || argv.get('danger')))\nthrow new Error(\n'`--unsafe` or `--danger` command line arguments are required to delete outside the current directory'\n)\ntry {\nFSO.DeleteFolder(dirspec)\nreturn `deletedirSync operation succeeded '${dirspec}'`\n} catch (err) {\nreturn `deletedirSync operation failed '${dirspec}'`\n}\n}\nconst deletedirsSync = function filesystem_deletedirsSync(dirspec) {\nreturn deletedirSync(dirspec)\n}\nconst encodeBuffer = function filesystem_encodeBuffer(buff, output_encode) {\nconst spec = resolve(process.cwd(), genUUID())\ntry {\nwriteFileSync(spec, buff)\nconst text = readTextFileSync(spec)\nwriteTextFileSync(spec, text, output_encode)\nconst res = readFileSync(spec)\ndeleteFileSync(spec)\nreturn res\n} catch (err) {\nthrow err\n} finally {\nif (existsFileSync(spec)) deleteFileSync(spec)\n}\n}\nmodule.exports = {\nreadFileSync,\nreadTextFileSync,\nreadByteFileSync,\nreaddirsSync,\nreaddirSync,\nwriteFileSync,\nwriteTextFileSync,\nexists,\nexistsFileSync,\nexistsdirSync,\ncopyFileSync,\ncopydirSync,\nmoveFileSync,\ndeleteFileSync,\ndeletedirSync,\ndeletedirsSync,\nmkdirSync,\nmkdirsSync,\ndownload,\nBufferToText,\nByteToText,\nencodeBuffer\n}\n",
                "mapping": {},
                "path": "{wes}/filesystem"
            },
            "genUUID": {
                "source": "const genUUID = function genUUID_genUUID() {\nvar typelib = WScript.CreateObject('Scriptlet.Typelib')\nreturn typelib.GUID.replace(/[^\\}]+$/, '')\n}\nmodule.exports = genUUID\n",
                "mapping": {},
                "path": "{wes}/genUUID"
            },
            "hex": {
                "source": "const ByteToHex = function hex_ByteToHex(byte) {\nlet elm = require('Msxml2.DOMDocument').createElement('elm')\nelm.dataType = 'bin.hex'\nelm.nodeTypedValue = byte\nreturn elm.text\n}\nconst HexToByte = function hex_HexToByte(hex) {\nlet elm = require('Msxml2.DOMDocument').createElement('elm')\nelm.dataType = 'bin.hex'\nelm.text = hex\nreturn elm.nodeTypedValue\n}\nconst Uint8ToHex = function hex_Uint8ToHex(buffer) {\nlet res = []\nbuffer.forEach((v) => res.push(('0' + v.toString(16)).slice(-2)))\nreturn res.join('')\n}\nconst HexToUint8 = function hex_HexToUint8(hex) {\nreturn new Uint8Array(hex.match(/.{1,2}/g).map((v) => parseInt(v, 16)))\n}\nmodule.exports = {\nByteToHex,\nHexToByte,\nUint8ToHex,\nHexToUint8\n}\n",
                "mapping": {},
                "path": "{wes}/hex"
            },
            "httprequest": {
                "source": "const genUUID = require('genUUID')\nconst path = require('pathname')\nconst fs = require('filesystem')\nconst options = {\nasync: false,\nuser: null,\npassword: null,\nparams: {},\nexception(error, app) {\nconsole.log(error.stack)\n},\nexecute(app, opt = {}) {\nif (app.status !== 200) throw new Error('http status:%s statusText: \"%s\"', app.status, app.statusText)\nreturn fs.ByteToText(app.responseBody, opt.charset)\n}\n}\nconst httprequest = function httprequest_httprequest(method, url, opt) {\nopt = opt != null ? Object.assign(options, opt) : options\ntry {\nvar http = require('Msxml2.ServerXMLHTTP')\nif (method.toLowerCase() === 'post') {\nhttp.open(method.toUpperCase(), url, opt.async, opt.user, opt.password)\nhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')\nhttp.send(escapeParams(opt.params))\n} else {\nif (Object.keys(opt.params).length) url = url + '?' + escapeParams(opt.params)\nhttp.open(method.toUpperCase(), url, opt.async, opt.user, opt.password)\nhttp.send()\n}\nreturn opt.execute(http, opt)\n} catch (error) {\nopt.exception(error, http)\n}\n}\nfunction escapeParams(params) {\nfunction enc(value) {\nreturn escape(value).split('%20').join('+')\n}\nreturn Object.keys(params)\n.map((key) => {\nreturn key + '=' + enc(params[key])\n})\n.join('&')\n}\nmodule.exports = httprequest\n",
                "mapping": {},
                "path": "{wes}/httprequest"
            },
            "inspect": {
                "source": "var ansi = console.ansi\nfunction toStringCall(value) {\nreturn Object.prototype.toString.call(value)\n}\nfunction toSliceCall(value) {\nreturn Array.prototype.slice.call(value)\n}\nfunction instanceOf(value, Class) {\nreturn value instanceof Class\n}\nfunction doubleDigit(value) {\nreturn toSliceCall('0' + value)\n.slice(-2)\n.join('')\n}\nfunction tripleDigit(value) {\nreturn toSliceCall('00' + value)\n.slice(-3)\n.join('')\n}\nfunction wrap(value, header, footer) {\nif (footer == null) return header + value + header\nelse return header + value + footer\n}\nfunction toDateString(date) {\nreturn (\n'new Data(\"' +\ndate.getFullYear() +\n'/' +\ndoubleDigit(date.getMonth() + 1) +\n'/' +\ndoubleDigit(date.getDate()) +\n' ' +\ndoubleDigit(date.getHours()) +\n':' +\ndoubleDigit(date.getSeconds()) +\n':' +\ndoubleDigit(date.getMinutes()) +\n'.' +\ntripleDigit(date.getMilliseconds()) +\n')'\n)\n}\nfunction include(string, symbol) {\nif (toStringCall(symbol) === '[object RegExp]') return symbol.test(string)\nelse return !!~string.indexOf(String(symbol))\n}\nfunction replace(string, pattern, replacement) {\nreturn string.split(pattern).join(replacement)\n}\nfunction toString(value) {\nif (include(value, rCRLF)) {\n} else if (!include(value, DOUBLE_QUOTE)) return wrap(value, DOUBLE_QUOTE)\nelse if (!include(value, SINGLE_QUOTE)) return wrap(value, SINGLE_QUOTE)\nvalue = replace(value, BACK_QUOTE, BACK_SLASH + BACK_QUOTE)\nreturn wrap(value, BACK_QUOTE)\n}\nfunction toFunctionString(value, opt) {\nvar tabWidth = 'tabWidth' in opt && opt.tabWidth > 0 ? opt.tabWidth : 4\nvar code = replace(String(value), TAB, repeat(SPACE, tabWidth))\nvar line = code.split(rCRLF)\nvar indents = []\nfor (var l = 1; l < line.length; l++) {\nindents[l] = rINDENTS.test(line[l]) ? line[l].match(rINDENTS)[0].length : 0\n}\nvar min = Math.min.apply(null, indents.slice(1))\nfor (var l = 1; l < indents.length; l++) {\nline[l] = line[l].substring(min)\n}\nreturn line.join(indent(opt))\n}\nfunction repeat(string, number) {\nvar res = ''\nwhile (number > 0) {\nres += string\nnumber--\n}\nreturn res\n}\nfunction indent(opt) {\nvar tabWidth = 'tabWidth' in opt ? opt.tabWidth : 4\nif (!('indent' in opt && opt.indent)) return ''\nreturn CRLF + repeat(SPACE, tabWidth * level)\n}\nfunction toKeyString(value, opt) {\nif (typeof value != 'string') return wrap(inspect(value, opt), '[', ']')\nelse return inspect(value, opt)\n}\nvar NONE = ''\nvar TAB = '\\t'\nvar CRLF = '\\r\\n'\nvar rCRLF = /\\r?\\n/\nvar rINDENTS = /(^ *)/\nvar SPACE = ' '\nvar CAMMA = ', '\nvar SEP = ': '\nvar ARROW = ' => '\nvar BACK_QUOTE = '`'\nvar SINGLE_QUOTE = \"'\"\nvar DOUBLE_QUOTE = '\"'\nvar BACK_SLASH = '\\\\'\nvar level = 0\nvar data = []\nfunction inspect(value, opt) {\nif (opt == null) opt = {}\nvar colors = 'colors' in opt ? opt.colors : false\nvar color = {\nString: colors ? ansi.green : NONE,\nNumber: colors ? ansi.yellow : NONE,\nBoolean: colors ? ansi.cyan : NONE,\nFunction: colors ? ansi.brightBlue : NONE,\nUint8Array: colors ? ansi.gray : NONE,\nDate: colors ? ansi.magenta : NONE,\nRegexp: colors ? ansi.red : NONE,\nSymbol: colors ? ansi.brightGreen : NONE,\nNull: colors ? ansi.yellow : NONE,\nUndefined: colors ? ansi.gray : NONE,\nCircularReference: colors ? ansi.gray : NONE,\nclear: colors ? ansi.clear : NONE\n}\nif (value === undefined) return color.Undefined + String(value) + color.clear\nif (value === null) return color.Null + String(value) + color.clear\nif (typeof value === 'string') return color.String + toString(value) + color.clear\nif (typeof value === 'number') return color.Number + String(value) + color.clear\nif (typeof value === 'boolean') return color.Boolean + String(value) + color.clear\nif (toStringCall(value) === '[object Symbol]') return color.Symbol + 'symbol()' + color.clear\nif (~data.indexOf(value)) {\nif (~data.indexOf(value, data.indexOf(value) + 1)) return color.CircularReference + '[Circular]' + color.clear\n}\ndata.push(value)\nif (typeof value === 'function') return color.Function + toFunctionString(value, opt) + color.clear\nif (toStringCall(value) === '[object Date]') return color.Date + toDateString(value) + color.clear\nif (toStringCall(value) === '[object RegExp]') return color.Regexp + String(value) + color.clear\nif (toStringCall(value) === '[object Uint8Array]') {\nlet res = []\nfor (var k = 0; k < value.length; k++) {\nres.push(doubleDigit(value[k].toString(16)))\n}\nreturn color.Uint8Array + wrap(res.join(SPACE), '<Buffer ', '>')\n}\nif (toStringCall(value) === '[object Array]') {\nlevel++\nvar res = []\nfor (var i = 0; i < value.length; i++) {\nres.push(indent(opt) + inspect(value[i], opt))\n}\nlevel--\ndata.pop()\nreturn wrap(res.join(CAMMA) + indent(opt), '[', ']')\n}\nif (toStringCall(value) === '[object Object]') {\nlevel++\nvar res = []\nfor (var key in value) {\nres.push(indent(opt) + toKeyString(key, opt) + SEP + inspect(value[key], opt))\n}\nlevel--\ndata.pop()\nreturn wrap(res.join(CAMMA) + indent(opt), '{', '}')\n}\nif (toStringCall(value) === '[object Set]') {\nlevel++\nvar res = []\nvalue.forEach(function (val) {\nres.push(indent(opt) + inspect(val, opt))\n})\nlevel--\nreturn wrap(res.join(CAMMA) + indent(opt), 'Set {', '}')\n}\nif (toStringCall(value) === '[object Map]') {\nlevel++\nvar res = []\nvalue.forEach(function (value, key) {\nres.push(indent(opt) + inspect(key, opt) + ARROW + inspect(value, opt))\n})\nlevel--\nreturn wrap(res.join(CAMMA) + indent(opt), 'Map {', '}')\n}\nif (toStringCall(value) === '[object WeakMap]') {\nlevel++\nvar res = indent(opt) + '<items unknown>'\nlevel--\nreturn wrap(res + indent(opt), 'WeakMap {', '}')\n}\n}\nmodule.exports = inspect\n",
                "mapping": {},
                "path": "{wes}/inspect"
            },
            "install": {
                "source": "const argv = require('argv')\nconst { security } = argv\nif (argv.has('bare') || argv.has('b') || argv.has('global') || argv.has('g')) {\nif (!argv.allow(security.unsafe))\nthrow new Error(\n'If you specify \"--bare\" or \"--global\", the security setting requires \"--unsafe\" or \"--dangerous\".'\n)\n}\nconst { dirname, join, toPosixSep, posixSep } = require('pathname')\nconst fs = require('filesystem')\nconst global_install = argv.allow(security.unsafe) && (argv.has('global') || argv.has('g'))\nconst bare_install = argv.allow(security.unsafe) && (argv.has('bare') || argv.has('b'))\nconst cd = process.cwd()\nconst gd = dirname(WScript.ScriptFullName)\nconst ext_js = '.js'\nconst index_js = 'index' + ext_js\nconst ext_json = '.json'\nconst atmark = '@'\nconst modules = 'node_modules'\nconst modules_dir = global_install ? join(gd, modules) : join(cd, modules)\nfunction splitArg(arg) {\nconst exp = /^@(.+)\\/([^?]+)(\\?token=.+)?$/\nif (exp.test(arg)) return exp.exec(arg).slice(1)\nthrow new Error('@author/repository')\n}\nfunction genSpec(arg) {\nconst [author, repository, token] = splitArg(arg)\nconst script_raw = `https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json${\ntoken != null ? token : ''\n}`\nconst module_dir = bare_install ? modules_dir : join(modules_dir, atmark + author)\nconst repository_spec = join(module_dir, repository)\nconst script_spec = join(repository_spec, index_js)\nconst json_spec = join(repository_spec, repository + ext_json)\nreturn {\nauthor,\nrepository,\nscript_raw,\nmodule_dir,\nrepository_spec,\nscript_spec,\njson_spec\n}\n}\nfunction genSource(author, repository, script) {\nconst exp = new RegExp(`^\\\\{${repository}\\\\}`)\nObject.keys(script).map((key) => {\nscript[key].path = script[key].path.replace(exp, `{${atmark + author + posixSep + repository}}`)\n})\nlet source = JSON.stringify(script, null, 4)\nconst parent = getMainScript(script)\nreturn `// source: https://github.com/${author}/${repository}\nconst mods = ${source}\nif ( wes.Modules[wes.main].path === __filename ) wes.main = '${parent}'\nObject.keys( mods ).filter( name => name.startsWith( '{' ) ).forEach( id => {\nlet mod = mods[ id ]\nmod.path = mod.path.replace( '{${repository}}', '{@${author}/${repository}}' )\nwes.Modules[ id ] = mod\n} )\nmodule.exports = require( '${parent}' )\n`\n}\nfunction getMainScript(script) {\nreturn Object.keys(script)[0]\n}\nfunction install(arg) {\nconst { author, repository, script_raw, module_dir, repository_spec, script_spec, json_spec } = genSpec(arg)\nif (!fs.existsdirSync(modules_dir)) fs.mkdirSync(modules_dir)\nif (!fs.existsdirSync(module_dir)) fs.mkdirSync(module_dir)\nif (!fs.existsdirSync(repository_spec)) fs.mkdirSync(repository_spec)\nfs.download(script_raw, json_spec)\nconst script = JSON.parse(fs.readTextFileSync(json_spec), null, 4)\nconst source = genSource(author, repository, script)\nfs.writeTextFileSync(script_spec, source)\nfs.deleteFileSync(json_spec)\nconsole.log('%sInstalled %s', console.ansi.cyan, arg)\n}\nargv.unnamed.slice(1).forEach((mod) => install(mod))\n",
                "mapping": {},
                "path": "{wes}/install"
            },
            "JScript": {
                "source": "const JScript = (function (language) {\nconst sc = require('ScriptControl')\nsc.Language = language\nreturn {\nAddCode(code) {\nsc.AddCode(code)\n},\nRun(name, ...args) {\nreturn sc.run(name, ...args)\n}\n}\n})('JScript')\nconst { TypeName } = require('VBScript')\nJScript.AddCode(`\nfunction enumerator ( collection ) {\nreturn new Enumerator( collection )\n}`)\nconst toArray = function JScript_toArray(col) {\nlet res = []\nlet Enum = JScript.Run('enumerator', col)\nfor (; !Enum.atEnd(); Enum.moveNext()) {\nres.push(Enum.item())\n}\nEnum.moveFirst()\nreturn res\n}\nclass Enumerator {\nconstructor(collection) {\nlet res = []\nif (TypeName(collection) === 'Long') {\nres = collection\n} else {\nres = toArray(collection)\n}\nreturn res\n}\n}\nclass ActiveXObject {\nconstructor(progID) {\nreturn WScript.CreateObject(progID)\n}\n}\nmodule.exports = {\nEnumerator,\nActiveXObject\n}\n",
                "mapping": {},
                "path": "{wes}/JScript"
            },
            "log": {
                "source": "const inspect = require('inspect')\nconst { LF } = require('text')\nconst { gray, silver, clear } = console.ansi\nconst opt = { colors: true, indent: true }\nconst log = function log(code) {\nlet res = inspect(code(), opt)\nconsole.log(silver + 'log(' + inspect(code, opt) + silver + ')' + gray + ' // => ' + clear + res + LF)\n}\nmodule.exports = log\n",
                "mapping": {},
                "path": "{wes}/log"
            },
            "minitest": {
                "source": "const { LF, TAB, REG_CRLF, SPACE, INDNT, NONE } = require('text')\nlet depth = 0\nlet indent = NONE\nlet rate = 4\nlet n = LF\nlet pass = [0, 0]\nconst checkMark = '\\u2713' // '\\u221a'\nconst { brightRed: red, brightGreen: green, brightYellow: yellow, brightMagenta: pink, gray } = console.ansi\nconst describe = function minitest_describe(title, fn) {\ndepth++\nindent = SPACE.repeat(depth * rate)\nconsole.log(LF + indent + title)\nfn()\ndepth--\n}\nconst it = function minitest_it(message, fn) {\ndepth++\nindent = SPACE.repeat(depth * rate)\nconst printCode = (code) => {\nlet source = code.toString().split(TAB).join('    ').split(REG_CRLF)\nif (source.length < 2) return `${SPACE.repeat(indent + rate)}${source[0]}`\nsource[0] = `${source[source.length - 1].match(INDNT)[0]}${source[0]}`\nconst sp = source.map((v) => v.match(INDNT)[0].length)\nconst min = Math.min.apply(null, sp)\nreturn source\n.map((v) => {\nreturn `${SPACE.repeat((depth + 1) * rate)}${v.replace(SPACE.repeat(min), NONE)}`\n})\n.join('\\n')\n}\ntry {\npass[0]++\nfn()\npass[1]++\nconsole.log(`${indent}${gray}${message} ${green}${checkMark}`)\n} catch (e) {\nconsole.log(`${indent}${pink}${message}${n}${yellow}${printCode(fn)} ${red}// => ${e.message}${n}`)\n} finally {\ndepth--\n}\n}\nconst assert = function minitest_assert(assertion) {\nreturn assert.ok(assertion)\n}\nassert.ok = function minitest_assert_ok(assertion) {\nlet res = typeof assertion === 'function' ? assertion() : assertion\nif (!res) throw new Error(res)\n}\nassert.ng = function minitest_assert_ng(assertion) {\nlet res = typeof assertion === 'function' ? assertion() : assertion\nif (res) throw new Error(res)\n}\nmodule.exports = {\ndescribe,\nit,\nassert,\npass\n}\n",
                "mapping": {},
                "path": "{wes}/minitest"
            },
            "pathname": {
                "source": "const WShell = require('WScript.Shell')\nconst NONE = ''\nconst Current = '.'\nconst Parent = '..'\nconst posixSep = '/'\nconst win32Sep = '\\\\'\nconst toPosixSep = function pathname_toPosixSep(path) {\nreturn path.split(win32Sep).join(posixSep)\n}\nconst toWin32Sep = function pathname_toWin32Sep(path) {\nreturn path.split(posixSep).join(win32Sep)\n}\nconst CurrentDirectory = toPosixSep(WShell.CurrentDirectory)\nconst split = function pathname_split(path) {\nreturn toPosixSep(path).split(posixSep)\n}\nconst UNC = /^(\\/\\/[^\\/]+\\/[^\\/]+\\/)(|.+)$/\nconst SCHEME = /^([A-z]{2,}:\\/\\/[^\\/]+\\/)(|.+)$/\nconst DRIVE = /^([A-z]:\\/)(|.+)$/\nconst CWD = /^(?!\\/\\/)(\\/)(.+)$/\nconst RELATIVE = ''\nconst _normalize = function pathname_normalize(path) {\nconst paths = path.split(posixSep)\nconst res = []\nfor (let dir of paths) {\nif (dir === Current || dir === NONE) continue\nif (dir === Parent) {\nif (res.length === 0 || res[res.length - 1] === Parent) res.push(Parent)\nelse res.pop()\n} else res.push(dir)\n}\nreturn res.join(posixSep)\n}\nconst parse = function pathname_parse(path) {\npath = toPosixSep(path)\nlet res = null\nif (UNC.test(path)) {\nlet [, root, body] = UNC.exec(path)\nbody = body.replace(/^\\/+/g, '')\nres = { type: UNC, root, body }\n} else if (SCHEME.test(path)) {\nlet [, root, body] = SCHEME.exec(path)\nbody = body.replace(/^\\/+/g, '')\nres = { type: SCHEME, root, body }\n} else if (DRIVE.test(path)) {\nlet [, root, body] = DRIVE.exec(path)\nroot = root.replace(/^([A-z])/, ($1) => $1.toUpperCase())\nbody = body.replace(/^\\/+/g, '')\nres = { type: DRIVE, root, body }\n} else if (CWD.test(path)) {\nlet [, , _body] = CWD.exec(path)\nlet [, root, body] = DRIVE.exec(process.cwd())\nres = { type: DRIVE, root, body: body + posixSep + _body }\n} else res = { type: RELATIVE, root: '', body: path }\nres.body = res.type == RELATIVE ? _normalize(res.body) : _normalize(res.body).replace(/^(\\.\\.\\/)+/, '')\nlet paths = res.body.split(posixSep)\nlet _dir = ''\nlet base = ''\nif (paths.length === 1) base = paths[0]\nelse [_dir, base] = [paths.slice(0, -1).join(posixSep), paths[paths.length - 1]]\nlet dir = res.root + _dir\nconst dot = '.'\nlet name = NONE\nlet ext = NONE\nlet bases = base.split(dot)\nif ((bases.length === 2 && bases[0] === NONE) || bases.length === 1) [name, ext] = [base, '']\nelse [name, ext] = [bases.slice(0, -1).join(dot), dot + bases[bases.length - 1]]\nres.dir = dir\nres.base = base\nres.name = name\nres.ext = ext\nreturn res\n}\nconst isAbsolute = function pathname_isAbsolute(path) {\nconst { root } = parse(path)\nreturn !!root\n}\nconst dirname = function pathname_dirname(path) {\nconst { root, body } = parse(path)\nreturn split([root, body].join(NONE)).slice(0, -1).join(posixSep)\n}\nconst extname = function pathname_extname(path) {\nreturn parse(path).ext\n}\nconst basename = function pathname_basename(path, ext) {\nlet { base } = parse(path)\nif (ext != null && base.endsWith(ext)) {\nbase = Array.from(base)\n.slice(0, ext.length * -1)\n.join(NONE)\n}\nreturn base\n}\nconst normalize = function pathname_normalize(path) {\nlet { root, body } = parse(path)\nreturn [root, body].join(NONE)\n}\nconst absolute = function pathname_absolute(path) {\nconst { root, body } = parse(path)\nif (!!root) return [root, body].join(NONE)\nelse return normalize([CurrentDirectory, body].join(posixSep))\n}\nconst join = function join(...paths) {\nreturn paths.reverse().reduce((acc, curr) => {\nreturn normalize([curr, acc].join(posixSep))\n})\n}\nconst resolve = function resolve(...paths) {\nlet acc = paths[paths.length - 1]\nlet res = normalize(acc)\nif (parse(acc).root) return res\nfor (let i = paths.length - 2; i > -1; i--) {\nlet curr = paths[i]\nif (parse(curr).root) {\nres = normalize(join(curr, res))\nbreak\n}\nres = join(curr, res)\n}\nif (!parse(res).root) return join(CurrentDirectory, res)\nreturn res\n}\nconst relative = function relative(from, to) {\nif (parse(from).root !== parse(to).root) return normalize(to)\nconst genUUID = require('genUUID')\nlet _from = split(resolve(from, genUUID()))\nlet _to = split(resolve(to))\nlet count = 0\nwhile (count < _from.length) {\nif (_from[count] !== _to[count]) break\ncount++\n}\nreturn '../'.repeat(_from.length - count - 1) + _to.slice(count).join(posixSep)\n}\nmodule.exports = {\nCurrentDirectory,\nWorkingDirectory: CurrentDirectory,\nwin32Sep,\nposixSep,\ntoWin32Sep,\ntoPosixSep,\nsplit,\nparse,\ndirname,\nextname,\nbasename,\nnormalize,\nisAbsolute,\nabsolute,\njoin,\nresolve,\nrelative\n}\n",
                "mapping": {},
                "path": "{wes}/pathname"
            },
            "pipe": {
                "source": "function pipe() {\nconst translators = []\nfunction process(\ndata,\ncallback = (err, res) => {\nif (err) throw err\nelse return res\n}\n) {\nlet res, err\ntry {\nres = translators.reduce((acc, curr, i) => {\nreturn curr(i === 1 ? data : acc)\n})\n} catch (error) {\nerr = error\n} finally {\nreturn callback(err, res)\n}\n}\nfunction use(fn) {\ntranslators.push(fn)\nreturn {\nuse,\nprocess\n}\n}\nreturn use(null)\n}\nmodule.exports = pipe\n",
                "mapping": {},
                "path": "{wes}/pipe"
            },
            "text": {
                "source": "const LF = '\\n'\nconst CR = '\\r'\nconst CRLF = CR + LF\nconst SPACE = ' '\nconst TAB = '\\t'\nconst NONE = ''\nconst REG_LINE_SEP = /\\r?\\n/g\nconst REG_LF = /\\n/g\nconst REG_CR = /\\r/g\nconst REG_CRLF = /\\r\\n/g\nconst REG_SPACE = /\\s/g\nconst REG_SPACES = /\\s+/g\nconst REG_BLANK_LINE = /^\\s+$/\nconst REG_TAB = /\\t/g\nconst REG_TABS = /\\t+/g\nconst INDNT = /^\\s+/\nconst trimStarts = function text_trimStarts(string) {\nreturn string.replace(/^([\\s\\r\\n]+\\n)/, NONE)\n}\nconst trimEnds = function text_trimEnds(string) {\nreturn string.replace(/(\\n[\\s\\r\\n]+)$/, NONE)\n}\nconst trim = function text_trimEnds(string) {\nreturn trimStarts(trimEnds(string))\n}\nconst splitLines = function text_splitLines(string, mod, start, end) {\nconst sep = REG_CRLF.test(string) ? CRLF : LF\nreturn string\n.split(REG_LINE_SEP)\n.filter((value, i) => (start < i % mod && i % mod < end) || REG_BLANK_LINE.test(value))\n.join(sep)\n}\nconst unindent = function text_unindent(text) {\nconst lineBreak = text.includes(CRLF) ? CRLF : LF\nlet line = text.split(REG_LINE_SEP)\nconst lastLineSpace = line[line.length - 1].match(INDNT)\nif (lastLineSpace == null) return text\nreturn line\n.map((v) => {\nreturn v.replace(lastLineSpace, '')\n})\n.join(lineBreak)\n.replace(/^\\s+/, '')\n}\nmodule.exports = {\nLF,\nCR,\nCRLF,\nSPACE,\nTAB,\nNONE,\nREG_LINE_SEP,\nREG_LF,\nREG_CR,\nREG_CRLF,\nREG_SPACE,\nREG_SPACES,\nREG_BLANK_LINE,\nREG_TAB,\nREG_TABS,\ntrimStarts,\ntrimEnds,\ntrim,\nsplitLines,\nunindent\n}\n",
                "mapping": {},
                "path": "{wes}/text"
            },
            "typecheck": {
                "source": "const toStringCall = function typecheck_toStringCall(type) {\nreturn type != null && Object.prototype.toString.call(type)\n}\nconst isClass = function typecheck_isClass(val, constructor) {\nreturn val != null && val instanceof constructor\n}\nconst isNull = function typecheck_isNull(val) {\nreturn val === null\n}\nconst isString = function typecheck_isString(val) {\nreturn (val != null && typeof val === 'string') || toStringCall(val) === '[object String]'\n}\nconst isNumber = function typecheck_isNumber(val) {\nreturn (val != null && typeof val === 'number') || toStringCall(val) === '[object Number]'\n}\nconst isFunction = function typecheck_isFunction(val) {\nreturn val != null && typeof val === 'function'\n}\nconst isBoolean = function typecheck_isBoolen(val) {\nreturn val != null && typeof val === 'boolean'\n}\nconst isSymbol = function typecheck_isSymbol(val) {\nreturn val != null && typeof val === 'symbol'\n}\nconst isDate = function typecheck_isDate(val) {\nreturn isClass(val, Date)\n}\nconst isRegExp = function typecheck_isRegExp(val) {\nreturn isClass(val, RegExp)\n}\nconst isArray = function typecheck_isArray(val) {\nreturn Array.isArray(val)\n}\nconst isObject = function typecheck_isObject(val) {\nreturn val != null && toStringCall(val) === '[object Object]'\n}\nconst isInt8Array = function typechack_isInt8Array(val) {\nreturn isClass(val, Int8Array)\n}\nconst isUint8Array = function typechack_isUint8Array(val) {\nreturn isClass(val, Uint8Array)\n}\nconst isUint8ClampedArray = function typechack_isUint8ClampedArray(val) {\nreturn isClass(val, Uint8ClampedArray)\n}\nconst isInt16Array = function typechack_isInt16Array(val) {\nreturn isClass(val, Int16Array)\n}\nconst isUint16Array = function typechack_isUint16Array(val) {\nreturn isClass(val, Uint16Array)\n}\nconst isInt32Array = function typechack_isInt32Array(val) {\nreturn isClass(val, Int32Array)\n}\nconst isUint32Array = function typechack_isUint32Array(val) {\nreturn isClass(val, Uint32Array)\n}\nconst isFloat32Array = function typechack_isFloat32Array(val) {\nreturn isClass(val, Float32Array)\n}\nconst isFloat64Array = function typechack_isFloat64Array(val) {\nreturn isClass(val, Float64Array)\n}\nmodule.exports = {\nisNull,\nisString,\nisNumber,\nisFunction,\nisBoolean,\nisSymbol,\nisDate,\nisRegExp,\nisArray,\nisObject,\nisClass,\nisInt8Array,\nisUint8Array,\nisUint8ClampedArray,\nisInt16Array,\nisUint16Array,\nisInt32Array,\nisUint32Array,\nisFloat32Array,\nisFloat64Array\n}\n",
                "mapping": {},
                "path": "{wes}/typecheck"
            },
            "VBScript": {
                "source": "const VBScript = (function (language) {\nconst sc = require('ScriptControl')\nsc.Language = language\nreturn {\nAddCode(code) {\nsc.AddCode(code)\n},\nRun(name, ...args) {\nreturn sc.run(name, ...args)\n}\n}\n})('VBScript')\nVBScript.AddCode(`\nFunction getTypeName( obj )\ngetTypeName = TypeName( obj )\nEnd Function\n`)\nconst TypeName = function VBScript_TypeName(object) {\nreturn VBScript.Run('getTypeName', object)\n}\nVBScript.AddCode(`\nFunction getVarType( obj )\ngetVarType = VarType( obj )\nEnd Function\n`)\nconst VarType = function VBScript_VarType(object) {\nreturn VBScript.Run('getVarType', object)\n}\nconst Type = function VBScript_Type(object) {\nlet constant = [\n'vbEmpty', // 0\n'vbNull', // 1\n'vbInteger', // 2\n'vbLong', // 3\n'vbSingle', // 4\n'vbDouble', // 5\n'vbCurrency', // 6\n'vbDate', // 7\n'vbString', // 8\n'vbObject', // 9\n'vbError', // 10\n'vbBoolean', // 11\n'vbVariant', // 12\n'vbDataObject' // 13\n]\nconstant[17] = 'vbByte'\nconstant[8192] = 'vbArray'\nlet num = VarType(object)\nreturn num > 8192 ? `${constant[num - 8192]}[]` : constant[num]\n}\nmodule.exports = {\nTypeName,\nVarType,\nType\n}\n",
                "mapping": {},
                "path": "{wes}/VBScript"
            },
            "version": {
                "source": "module.exports = console.log('0.8.25')",
                "mapping": {},
                "path": "{wes}/version"
            }
        }

        // util
        function genUUID() {
            var typelib = WScript.CreateObject('Scriptlet.Typelib')
            return typelib.GUID.replace(/[^\}]+$/, '')
        }

        function has(cls, prop) {
            if (cls == null) throw new Error(prop + ' is null')
            return cls.hasOwnProperty(prop)
        }

        function starts(str, word) {
            return str.startsWith(word)
        }

        function getPathToModule(filespec) {
            var mod = Object.keys(Modules).find(function (key) {
                if (!!Modules[key].path) return Modules[key].path === filespec
                return false
            })
            return Modules[mod]
        }

        function getAreas(caller, _query) {
            var pathname = req('pathname')
            var CurrentDirectory = pathname.CurrentDirectory
            var join = pathname.join
            var dirname = pathname.dirname
            var rd = '/' // root directory
            var cd = './' // current directory
            var pd = '../' // parent directory
            var query = _query.replace(/\\/g, '/')

            var areas = []

            // Replace '/' with Current Directory if query starts with '/'
            if (starts(query, rd)) {
                areas.push(join(CurrentDirectory, query.replace(rd, '')))

                // combine the caller's path and the query, if relative path
            } else if (starts(query, cd) || starts(query, pd)) {
                areas.push(join(dirname(caller), query))
            } else {
                areas.push(join(dirname(caller), query))

                // Otherwise, combine node_module while going back directory
                var hierarchy = dirname(caller)
                var node_modules = 'node_modules'

                while (hierarchy !== '') {
                    areas.push(join(hierarchy, node_modules, query))
                    hierarchy = dirname(hierarchy)
                }
                areas.push(join(dirname(WScript.ScriptFullName), node_modules, query))
            }
            return areas
        }

        function getEntry(areas) {
            var join = req('pathname').join
            var filesystem = req('filesystem')
            var exists = filesystem.exists
            var readTextFileSync = filesystem.readTextFileSync
            var parse = JSON.parse
            var js = '.js'
            var json = '.json'
            var index = 'index.js'
            var indexjson = 'index.json'
            var packagejson = 'package.json'

            var entry = null
            while (areas.length) {
                var area = areas.shift()
                var temp
                if (exists((temp = area))) {
                    entry = temp
                    break
                }
                if (exists((temp = area + js))) {
                    entry = temp
                    break
                }
                if (exists((temp = area + json))) {
                    entry = temp
                    break
                }
                if (exists((temp = join(area, index)))) {
                    entry = temp
                    break
                }
                if (exists((temp = join(area, indexjson)))) {
                    entry = temp
                    break
                }
                if (exists((temp = join(area, packagejson)))) {
                    var main = parse(readTextFileSync(temp)).main
                    if (main == null) continue
                    areas.unshift(join(area, main))
                }
            }
            return entry
        }

        function createModule(GUID, entry, query, parentModule) {
            var pathname = req('pathname')
            var dirname = pathname.dirname
            var basename = pathname.basename
            var extname = pathname.extname
            var parse = JSON.parse
            var readTextFileSync = req('filesystem').readTextFileSync

            if (parentModule) parentModule.mapping[query] = GUID

            var mod = {
                source: readTextFileSync(entry),
                module: {
                    exports: {}
                },
                path: entry,
                mapping: {}
            }

            Modules[GUID] = mod

            var js = '.js'
            var json = '.json'

            switch (extname(entry)) {
                case js:
                    var name = entry
                        .split('')
                        .map(function (ch) {
                            return '$' + ch.codePointAt().toString(16).toUpperCase()
                        })
                        .join('')
                    wes.filestack.push(entry)
                    var code = new Function(
                        'require',
                        'module',
                        'exports',
                        'console',
                        '__dirname',
                        '__filename',
                        'wes',
                        'Buffer',
                        '(function ' + name + '() { ' + '"use strict";' + mod.source + '} )()'
                    )
                    code(
                        require.bind(null, entry),
                        mod.module,
                        mod.module.exports,
                        console,
                        dirname(entry),
                        entry,
                        wes,
                        entry === 'buffer' ? null : req('buffer')
                    )
                    wes.filestack.pop()
                    break
                case json:
                    mod.module.exports = parse(mod.source)
                    break
                default:
                    mod.module.exports = mod.source
            }
            return mod
        }

        // local require
        var process = {
            env: { NODE_ENV: '' },
            cwd: function () {
                return req('pathname').CurrentDirectory
            },
            platform: 'win32'
        }
        function req(moduleID) {
            var mod = Modules[moduleID]
            var entry = mod.path || '/'
            if (!has(mod, 'exports')) {
                if (!has(mod, 'module')) {
                    var dirname = entry //.split( '/' )
                    mod.module = { exports: {} }
                    mod.mapping = mod.mapping || {}
                    new Function(
                        'require',
                        'module',
                        'exports',
                        'console',
                        '__dirname',
                        '__filename',
                        'wes',
                        'process',
                        'Buffer',
                        '"use strict";' + mod.source
                    )(
                        require.bind(null, entry),
                        mod.module,
                        mod.module.exports,
                        console,
                        dirname,
                        entry,
                        wes,
                        process,
                        entry === 'buffer' ? null : req('buffer')
                    )
                }
                mod.exports = mod.module.exports
            }
            return mod.exports
        }

        // require
        function require(caller, query) {
            var posixSep = req('pathname').posixSep

            // execute req function, if it is a core module
            if (!query.includes(posixSep)) {
                if (has(Modules, query)) {
                    return req(query)
                }
            }

            // execute OLE, if it is OLE
            try {
                return WScript.CreateObject(query)
            } catch (e) {}

            // execute req function, if it is a mapping[ query ]
            var parentModule = getPathToModule(caller)
            var mappingID
            if (parentModule) {
                if ((mappingID = parentModule.mapping[query])) {
                    return req(mappingID)
                }
            }

            var isAbsolute = req('pathname').isAbsolute
            var resolve = req('pathname').resolve
            var areas = []
            if (isAbsolute(query)) areas = [resolve(query)]
            else areas = getAreas(caller, query)

            var entry = getEntry(areas)
            if (entry == null)
                throw new Error(
                    'no module:\n' + 'caller: ' + caller + '\nquery: ' + query + '\n' + JSON.stringify(areas, null, 2)
                )

            var modId = genUUID()
            if (wes.main == null) wes.main = modId
            var mod = createModule(modId, entry, query, parentModule)
            mod.exports = mod.module.exports

            return mod.exports
        }

        wes.Modules = Modules
        var path = req('pathname')

        var main = argv.unnamed[0]
        if (main in wes.Modules) wes.main = main
        require(path.join(path.CurrentDirectory, '_'), main)
    }
} catch (error) {
    if (!!console) {
        var errorStack = unescape(error.stack.split('$').join('%'))
        errorStack = errorStack.split(/\r?\n/).filter(function (line) {
            return !(
                line.startsWith('   at Function code (Function code:') ||
                line.startsWith('   at createModule (') ||
                line.startsWith('   at require (')
            )
        })
        var current = wes.filestack.slice(-1)

        console.log(console.ansi.color(255, 165, 0) + errorStack.join('\r\n').split('Function code:').join(''))

        if (error instanceof SyntaxError) {
            var prettier
            try {
                prettier = require('*', 'prettier')
            } catch (error1) {
                try {
                    prettier = require('*', '@wachaon/prettier')
                } catch (error2) {
                    prettier = null
                }
            }
            if (prettier != null) {
                var fs = require('*', 'filesystem')
                var source = fs.readTextFileSync(current)
                console.log('\n' + console.ansi.yellow + current)
                prettier.format(source)
            }
        }
    } else WScript.Popup('[error]' + error.message)
}
