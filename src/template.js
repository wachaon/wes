try {
    var WShell = WScript.CreateObject('WScript.Shell')
    var console = {
        log: function () {
            var args = Array.prototype.slice.call( arguments ).join( ' ' )
            var res = args + console.ansi.clear
            WScript.StdErr.WriteLine( res )
        },
        print: function(args) {
            var args = Array.prototype.slice.call( arguments ).join( ' ' )
            var res = args + console.ansi.clear
            WScript.StdErr.Write( res )
        },
        ansi: {
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
            slver: '\u001B[37m',

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
            bgSlver: '\u001B[47m',

            bgGray: '\u001B[100m',
            bgBrightRed: '\u001B[101m',
            bgBrightGreen: '\u001B[102m',
            bgBrightYellow: '\u001B[103m',
            bgBrightBlue: '\u001B[104m',
            bgBrightMagenta: '\u001B[105m',
            bgBrightCyan: '\u001B[106m',
            bgWhite: '\u001B[107m'
        }
    }
    if (!WScript.Arguments.Named.Exists('Engine')) {
        var WScriptArguments = (function() {
            var results = []
            for (var i = 0, args = WScript.Arguments; i < args.length; i++) {
                results.push(args.Item(i))
            }
            return results
        })()
        var ScriptHost =
            WShell.ExpandEnvironmentStrings('%PROCESSOR_ARCHITECTURE%') !==
            'x86'
                ? '{%}windir{%}\\SysWOW64\\cscript'
                : 'cscript'
        var Nologo = '//nologo'
        var Engin = '/Engine:Chakra'
        var Chakra = '//E:{{}1b7cd997-e5ff-4932-a7a6-2a9e636da385{}}'
        var Monotone = WScript.Arguments.Named.Exists('monotone')
            ? ''
            : '| echo off'
        var Enter = '{ENTER}'
        WShell.SendKeys(
            [
                ScriptHost,
                WScript.ScriptFullName,
                WScriptArguments.join(' '),
                Nologo,
                Chakra,
                Engin,
                Monotone,
                Enter
            ].join(' ')
        )
        WScript.Quit()
    } else {
        var history = []
        var stack = []
        var graph = ( {}
            /* includes core/core.json */
        );
        function require(id, option) {
            let encode, eventPrefix = null
            if (option != null) {
                if (option.endsWith(option) === "_") eventPrefix = option
                else encode = option
            }
            if (graph[id] != null) {
                if (!id.startsWith('{')) stack.push([null, null])
                var code = graph[id].code
                var source = graph[id].source
                var mapping = graph[id].mapping
                function localRequire(name, option) {
                    var res = mapping[name]
                    if (res == null)
                        return require(name, encode )
                    else
                        return require(res, encode )
                }
                localRequire.stack = stack
                localRequire.graph = graph
                var module = {
                    exports: {}
                }
                var fn =
                    typeof code === 'function'
                        ? code
                        : new Function(
                              'require',
                              'module',
                              'exports',
                              'console',
                              '__filename',
                              '"use strict"\n' + source
                          )
                fn(
                    localRequire,
                    module,
                    module.exports,
                    console,
                    graph[id].name || graph[id]
                )
                graph[id].code = fn
                stack.pop()
                return module.exports
            }
            try {
                return WScript.CreateObject(id, eventPrefix)
            } catch (e) {}
            var io = require('io')
            var curr = (function() {
                var res
                if (stack.length) {
                    if ((res = stack[stack.length - 1])) {
                        if (res[0]) {
                            return io.dirname(res[0])
                        }
                    }
                }
                return io.toPosixSep(WShell.CurrentDirectory)
            })()
            var points = []
            if (id.startsWith(io.posixSep)) curr = FSO.GetDriveName(curr)
            if (
                id.startsWith(io.posixSep) ||
                id.startsWith('.' + io.posixSep) ||
                id.startsWith('..' + io.posixSep)
            ) {
                points.push(io.join(curr, id))
            } else {
                points.push(io.join(curr, id))
                var hierarchy = io.split(curr)
                while (hierarchy.length) {
                    points.push(
                        io.absolute(
                            hierarchy.join(io.posixSep) +
                                io.posixSep +
                                'node_modules' +
                                io.posixSep +
                                id
                        )
                    )
                    hierarchy.pop()
                }
            }
            var entry = null
            points.some(function(value) {
                var res = null
                var package = null
                if (((res = value), io.fileExists(res))) return (entry = res)
                if (((res = value + '.js'), io.fileExists(res)))
                    return (entry = res)
                if (((res = value + '.json'), io.fileExists(res)))
                    return (entry = res)
                if (((res = value + '/index.js'), io.fileExists(res)))
                    return (entry = res)
                if (
                    ((package = value + '/package.json'),
                    io.fileExists(package))
                ) {
                    var temp = JSON.parse(
                        io.readFileSync(
                            package,
                            encode
                        )
                    ).main
                    if (temp != null) {
                        if (((res = io.join(value, temp)), io.fileExists(res)))
                            return (entry = res)
                        else if (
                            ((res = io.join(value, temp + '.js')),
                            io.fileExists(res))
                        )
                            return (entry = res)
                    }
                }
            })
            if (entry == null)
                throw new Error(
                    "module not found\ncaller: '" +
                        curr +
                        "' => require: '" +
                        id +
                        "'"
                )
            var loaded = history.find(function(val) {
                return val[0] === entry
            })
            if (!!loaded) {
                graph[stack[stack.length - 1][1]].mapping[id] = loaded[1]
                stack.push([entry, loaded[1]])
                return require(loaded[1])
            }
            var uuid = genUUID()
            graph[stack[stack.length - 1][1]].mapping[id] = uuid
            stack.push([entry, uuid])
            graph[uuid] = {
                source: io
                    .readFileSync(
                        entry,
                        encode
                    )
                    .replace(/\r/g, ''),
                name: entry.match(/([^\/]+)$/)[0] + '',
                mapping: {}
            }
            history.push([entry, uuid])
            return require(uuid, option)
        }
        var FSO = require('Scripting.FileSystemObject')
        var genUUID = function() {
            var typelib = require('Scriptlet.Typelib')
            return typelib.GUID.replace(/[^\}]+$/, '')
        }
        var Guid = genUUID()
        if (!stack.length) {
            stack.push([null, Guid])
            graph[Guid] = {
                code: function() {
                    return require(WScript.Arguments(0))
                },
                mapping: {}
            }
        }
        require(Guid)
    }
} catch (e) {
    var errorStack = e.stack
    if (console) {
        console.log('\n' + errorStack)
    } else {
        WScript.StdErr.WriteLine('\n' + errorStack)
    }
}