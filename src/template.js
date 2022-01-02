try {
    var LF = '\n'
    var NONE = ''
    var SPACE = ' '
    var POSIXSEP = '/'
    var WIN32SEP = '\\'

    var WShell = WScript.CreateObject('WScript.Shell')
    var wes = {
        filestack: [WScript.ScriptFullName.split(WIN32SEP).join(POSIXSEP)]
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
                        else res.push('-' + key + SPACE + inner(escape(String(target))))
                    } else {
                        if (target === true) res.push('--' + escape(name))
                        else res.push('--' + key + '=' + inner(escape(String(target))))
                    }
                }

                if (short.length) res.unshift('-' + short.join(NONE))
                if (params.unnamed.length) res.unshift(params.unnamed.join(SPACE))
                // console.log('-----------\n' + inspect(res))
                return res.join(SPACE)
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
                var args = arg.substring(1).split(NONE)
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

    var ansi = (function () {
        var module = { exports: {} }
        ;(function () {
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

            function cursorUp(row) {
                return '\u001B[' + row + 'A'
            }

            function cursorDown(row) {
                return '\u001B[' + row + 'B'
            }

            function cursorForward(column) {
                return '\u001B[' + column + 'C'
            }

            function cursorBack(column) {
                return '\u001B[' + column + 'D'
            }

            function cursorHrAbs(column) {
                return '\u001B[' + column + 'G'
            }

            function eraseInLine(type) {
                return '\u001B[' + type + 'K'
            }

            module.exports = {
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
                bgColor: bgColor,
                cursorUp: cursorUp,
                cursorDown: cursorDown,
                cursorForward: cursorForward,
                cursorBack: cursorBack,
                cursorHrAbs: cursorHrAbs,
                eraseInLine: eraseInLine
            }
        })()
        return module.exports
    })()

    var console = (function () {
        var module = { exports: {} }
        ;(function () {
            var NONE = NONE
            var SPACE = SPACE
            var rSPECIFIER = /(%[sdfoj])/i
            var rSEQ = /\u001B\[[\d;]+m/g
            var clear = '\u001B[0m'
            var brightRed = '\u001B[91m'
            var reverse = '\u001B[7m'

            function format(arg) {
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
                        if ($1 === '%o' || $1 === '%O')
                            return req('inspect')(val, $1 === '%O' ? { indent: true, colors: true } : {})
                        if ($1 === '%j' || $1 === '%J') {
                            try {
                                return JSON.stringify(val, null, $1 === '%J' ? 2 : null)
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
                var message = format(arguments)
                var monotoneMessage = removeColor(message)
                if (argv.has('monotone')) WScript.StdOut.WriteLine(monotoneMessage)
                else WScript.StdErr.WriteLine(message + clear)
                return monotoneMessage
            }

            function print() {
                var message = format(arguments)
                var monotoneMessage = removeColor(message)
                if (argv.has('monotone')) WScript.StdOut.Write(monotoneMessage)
                else WScript.StdErr.Write(message + clear)
                return monotoneMessage
            }

            function debug() {
                var isDebugOption = argv.has('debug')
                if (!isDebugOption) return
                var message = format(arguments)
                var monotoneMessage = removeColor(message)
                if (argv.has('monotone')) WScript.StdOut.WriteLine('DEBUG: ' + monotoneMessage)
                else WScript.StdErr.WriteLine(brightRed + reverse + 'DEBUG:' + clear + message + clear)
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
                format: format
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
        var monotone = argv.has('monotone') ? NONE : '| echo off'
        var enter = '{ENTER}'

        var parameters = []
        for (var i = 0; i < WScript.Arguments.length; i++) {
            parameters.push(escape(WScript.Arguments(i)).replace(/%/g, '{%}'))
        }

        WShell.SendKeys(
            [cpu, WScript.ScriptFullName, parameters.join(SPACE), nologo, chakra, engin, monotone, enter].join(SPACE)
        )

        WScript.Quit()
    } else {
        var Modules = {}

        // util
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

        function getField(json, path) {
            var parts = path.split(POSIXSEP)
            var part = null
            var curr = json
            while (parts.length) {
                part = parts.shift()
                if (part in curr) curr = curr[part]
                else return undefined
            }
            return curr
        }

        function getPkgField(dir, field) {
            var pathname = req('pathname')
            var resolve = pathname.resolve
            var filesystem = req('filesystem')
            var exists = filesystem.exists
            var readTextFileSync = filesystem.readTextFileSync
            var parse = JSON.parse

            var pkg = resolve(dir, 'package.json')
            if (!exists(pkg)) return undefined
            var file = readTextFileSync(pkg)
            var json = parse(file)
            return getField(json, field)
        }

        function getAreas(caller, _query) {
            var pathname = req('pathname')
            var CurrentDirectory = pathname.CurrentDirectory
            var resolve = pathname.resolve
            var dirname = pathname.dirname
            var rd = '/' // root directory
            var cd = './' // current directory
            var pd = '../' // parent directory
            var query = _query.replace(/\\/g, POSIXSEP)

            var areas = []

            // Replace '/' with Current Directory if query starts with '/'
            if (starts(query, rd)) {
                areas.push(resolve(CurrentDirectory, query.replace(rd, NONE)))

                // combine the caller's path and the query, if relative path
            } else if (starts(query, cd) || starts(query, pd)) {
                areas.push(resolve(dirname(caller), query))
            } else {
                areas.push(resolve(dirname(caller), query))

                // Otherwise, combine node_module while going back directory
                var hierarchy = dirname(caller)
                var node_modules = 'node_modules'

                while (hierarchy !== NONE) {
                    areas.push(resolve(hierarchy, node_modules, query))
                    var _hierarchy = dirname(hierarchy)
                    if (hierarchy === _hierarchy) break
                    hierarchy = _hierarchy
                }
                var ScriptFullName = WScript.ScriptFullName
                areas.push(resolve(dirname(ScriptFullName), node_modules, query))
            }
            return areas
        }

        function getEntry(areas) {
            var pathname = req('pathname')
            var resolve = pathname.resolve
            var dirname = pathname.dirname
            var extname = pathname.extname
            var filesystem = req('filesystem')
            var exists = filesystem.exists
            var js = '.js'
            var json = '.json'
            var index = 'index.js'
            var indexmjs = 'index.mjs'
            var indexjson = 'index.json'
            var packagejson = 'package.json'

            var entry = null
            while (areas.length) {
                var type = getPkgField('/', 'type') || 'commonjs'
                var area = areas.shift()
                var temp
                type = getPkgField(dirname(area), 'type') || type
                if (exists((temp = area))) {
                    if (extname(temp) === '.mjs') type = 'module'
                    entry = temp
                    break
                }
                if (exists((temp = area + js))) {
                    entry = temp
                    break
                }
                if (exists((temp = area + json))) {
                    entry = temp
                    type = 'json'
                    break
                }
                if (exists((temp = resolve(area, index)))) {
                    type = getPkgField(area, 'type') || type
                    entry = temp
                    break
                }
                if (exists((temp = resolve(area, indexmjs)))) {
                    type = 'module'
                    entry = temp
                    break
                }
                if (exists((temp = resolve(area, indexjson)))) {
                    entry = temp
                    break
                }
                if (exists((temp = resolve(area, packagejson)))) {
                    var main = getPkgField(dirname(temp), 'main')
                    if (main == null) continue
                    areas.unshift(resolve(area, main))
                }
            }
            return { entry: entry, type: type }
        }

        function createModule(GUID, entry, query, parentModule, encode, type) {
            var pathname = req('pathname')
            var dirname = pathname.dirname
            var extname = pathname.extname
            var parse = JSON.parse
            var filesystem = req('filesystem')
            var readTextFileSync = filesystem.readTextFileSync

            if (parentModule) parentModule.mapping[query] = GUID

            var mod = {
                source: readTextFileSync(entry, encode != null ? encode : null),
                module: {
                    exports: {}
                },
                path: entry,
                mapping: {}
            }
            if (mod.source.startsWith('#!')) mod.source.split(LF).slice(1).join(LF)

            Modules[GUID] = mod
            mod.type = type
            var js = '.js'
            var mjs = '.mjs'
            var json = '.json'

            switch (extname(entry)) {
                case mjs:
                case js:
                    var name = entry
                        .split(NONE)
                        .map(function (ch) {
                            return '$' + ch.codePointAt().toString(16).toUpperCase()
                        })
                        .join(NONE)
                    wes.filestack.push(entry)

                    var transpiledSource
                    if (mod.type != 'transpiled') {
                        transpiledSource =
                            mod.type === 'module'
                                ? req('babel-standalone').transform(mod.source, { presets: ['env'] }).code
                                : '(function ' + name + '() { ' + '"use strict";' + mod.source + '} )()'
                        mod.source = transpiledSource
                        mod.type = 'transpiled'
                    } else {
                        transpiledSource = mod.source
                    }

                    var code = new Function(
                        'require',
                        'module',
                        'exports',
                        'console',
                        '__dirname',
                        '__filename',
                        'wes',
                        'Buffer',
                        'global',
                        transpiledSource
                    )
                    code(
                        require.bind(null, entry),
                        mod.module,
                        mod.module.exports,
                        console,
                        dirname(entry),
                        entry,
                        wes,
                        entry === 'buffer' ? null : req('buffer'),
                        {}
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
            env: { NODE_ENV: NONE },
            cwd: function () {
                return req('pathname').CurrentDirectory
            },
            platform: 'win32'
        }
        function req(moduleID) {
            var mod = Modules[moduleID]
            var entry = mod.path || POSIXSEP
            if (!has(mod, 'exports')) {
                if (!has(mod, 'module')) {
                    mod.module = { exports: {} }
                    if (mod.path.endsWith('.json')) {
                        mod.module.exports = JSON.parse(mod.source)
                        mod.exports = mod.module.exports
                        return mod.exports
                    }
                    var dirname = entry.split(POSIXSEP).slice(0, -1).join(POSIXSEP)
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
                        'global',
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
                        entry === 'buffer' ? null : req('buffer'),
                        {}
                    )
                }
                mod.exports = mod.module.exports
            }
            return mod.exports
        }

        // require
        function require(caller, query, encode) {
            // execute req function, if it is a core module
            if (!query.includes(POSIXSEP)) {
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

            var file = getEntry(areas)
            var entry = file.entry
            var type = file.type
            if (entry == null)
                throw new Error(
                    'no module:\n' + 'caller: ' + caller + '\nquery: ' + query + LF + JSON.stringify(areas, null, 2)
                )

            var modId = req('genGUID')()
            if (wes.main == null) wes.main = modId
            var mod = createModule(modId, entry, query, parentModule, encode, type)
            mod.exports = mod.module.exports

            return mod.exports
        }

        wes.Modules = Modules
        var pathname = req('pathname')
        var resolve = pathname.resolve
        var CurrentDirectory = pathname.CurrentDirectory

        var main = argv.unnamed[0] != null ? argv.unnamed[0] : 'REPL'
        if (main in wes.Modules) wes.main = main
        require(resolve(CurrentDirectory, '_'), main, argv.get('encoding'))
    }
} catch (error) {
    if (!!console) {
        var errorStack = unescape(error.stack.split('$').join('%'))
        errorStack = errorStack.split(/\r?\n/).filter(function (line) {
            return !(
                line.startsWith('   at Function code (Function code:') ||
                line.startsWith('   at createModule (') ||
                line.startsWith('   at require (') ||
                line.startsWith('   at req (')
            )
        })
        var current = wes.filestack.slice(-1)

        console.log(ansi.color(255, 165, 0) + errorStack.join('\r\n').split('Function code:').join(NONE))

        if (error instanceof SyntaxError) {
            var fmt
            try {
                fmt = require('*', 'fmt')
            } catch (error1) {
                try {
                    fmt = require('*', '@wachaon/fmt')
                } catch (error2) {
                    fmt = null
                }
            }
            if (fmt != null) {
                var source
                if (wes.main === 'REPL') {
                    var file = Object.keys(wes.Modules).filter(function (key) {
                        return key.startsWith('{')
                    })[0]
                    source = wes.Modules[file].source
                } else {
                    var filesystem = req('filesystem')
                    var readTextFileSync = filesystem.readTextFileSync
                    source = readTextFileSync(current)
                    console.log('\n%SWhere the error occurred: %S', ansi.yellow, current)
                }
                fmt.format(source)
            }
        }
    } else WScript.Popup('[error]' + error.message)
}
