try {
    var WShell = WScript.CreateObject('WScript.Shell')

    var argv = ( function () {

        var argv = WScript.Arguments

        var args = []
        for ( var i = 0; i < argv.Unnamed.length; i++ ) {
            args.push( argv.Unnamed( i ) )
        }

        function exists ( name ) { return argv.Named.Exists( name ) }
        function getValue ( name ) { return argv.Named( name ) }

        args.exists = exists
        args.getValue = getValue

        return args

    } )()

    var console = ( function() {

        function log () {
            var res = normalize( arguments )
            WScript.StdErr.WriteLine( res )
            return res
        }

        function print () {
            var res = normalize( arguments )
            WScript.StdErr.Write( res )
            return res
        }

        function debug () {
            var debugging = existsArgv( 'debug' )
            if ( !debugging ) return void 0
            var res = normalize( arguments )
            WScript.StdErr.WriteLine( 'DEBUG: ' + res )
            return res
        }

        var none = ''
        var space = ' '
        var specifier = /(%[sdifjo])/
        var seq = /(\x9B|\x1B\[)[0-?]*[ -\/]*[@-~]/g

        function normalize ( argList ) {
            var monotone = argv.exists( 'monotone' )
            var args = splitArgs( argList )
            var res = formatArgs( args )
            if ( monotone ) res = removeColor( res )
            else res = clearTail( res )
            return res
        }

        function splitArgs ( args ) { return Array.prototype.slice.call( args ) }

        function formatArgs ( args ) {
            if ( args == null || args.length > 2 ) return args[0]
            if ( !specifier.test( args[0] ) ) return args.join( space )
            var msg = args.shift()
            while ( args.length ) {
                var val = args.shift()
                var type = specifier.test( msg ) ? msg.match( specifier )[0] : null
                switch ( type ) {
                    case '%s':
                        msg = msg.replace( '%s', '' + val ); break
                    case '%d':
                        msg = msg.replace( '%d', val - 0 ); break
                    case '%f':
                        msg = msg.replace( '%f', val - 0 ); break
                    case '%i':
                        msg = msg.replace( '%i', parseInt( val ) ); break
                    case '%j':
                        msg = msg.replace( '%j', JSON.stringify( val ) ); break
                    case '%o':
                        msg = msg.replace( '%o', val ); break
                }
            }
            return msg
        }

        function removeColor ( arg ) {
          if ( !seq.test( arg ) ) return arg
          return arg.replace( seq, none )
        }

        function clearTail ( arg ) {
          if ( !seq.test( arg ) ) return arg
          return arg + ansi.clear
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
            bgWhite: '\u001B[107m'
        }

        return {
            log: log,
            print: print,
            debug: debug,
            ansi: ansi
        }

      } )()

    if ( !argv.exists( 'engine' ) ) {

        var host = WShell.ExpandEnvironmentStrings('%PROCESSOR_ARCHITECTURE%') !== 'x86'
                ? '{%}windir{%}\\SysWOW64\\cscript'
                : 'cscript'
        var nologo = '//nologo'
        var engin = '/engine:Chakra'
        var chakra = '//E:{{}1b7cd997-e5ff-4932-a7a6-2a9e636da385{}}'
        var monotone = argv.exists('monotone')
            ? ''
            : '| echo off'
        var enter = '{ENTER}'

        WShell.SendKeys([
            host,
            WScript.ScriptFullName,
            argv.join(' '),
            nologo,
            chakra,
            engin,
            monotone,
            enter
        ].join(' ') )

        WScript.Quit()

    } else {
        var history = []
        var stack = []
        var graph = ( {}
            /* includes lib */
        )
        function require(id) {
            if (graph[id] != null) {
                if (!id.startsWith('{')) stack.push([null, null])
                var code = graph[id].code
                var source = graph[id].source
                var mapping = graph[id].mapping
                function localRequire(name) {
                    var res = mapping[name]
                    if (res == null)
                        return require(name)
                    else
                        return require(res)
                }
                localRequire.stack = stack
                localRequire.graph = graph
                var module = {
                    exports: {}
                }
                var global = global || {}
                var process = {
                    env: {
                        NODE_DEBUG: 'semver'
                    },
                    argv: ['wes'].concat( argv ),
                    versions: { node: '4.0.0' },
                    platform: 'win32'
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
                              '__dirname',
                              'global',
                              'process',
                              '"use strict"\n' + source
                          )
                fn(
                    localRequire,
                    module,
                    module.exports,
                    console,
                    graph[id].name || graph[id],
                    ( stack[ stack.length - 1 ][0] + '' ).replace( /\/[^\/]+$/, ''),
                    global,
                    process
                )
                graph[id].code = fn
                stack.pop()
                return module.exports
            }
            try {
                return WScript.CreateObject(id)
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
                var pack = null
                if (((res = value), io.fileExists(res))) return (entry = res)
                if (((res = value + '.js'), io.fileExists(res)))
                    return (entry = res)
                if (((res = value + '.json'), io.fileExists(res)))
                    return (entry = res)
                if (((res = value + '/index.js'), io.fileExists(res)))
                    return (entry = res)
                if (
                    ((pack = value + '/pack.json'),
                    io.fileExists(pack))
                ) {
                    var temp = JSON.parse(
                        io.readFileSync( pack )
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
                source: entry.endsWith( '.json' ) ?
                    "module.exports = " + io
                        .readFileSync(entry)
                        .replace(/\r/g, '') :
                    io
                        .readFileSync(entry)
                        .replace(/\r/g, '')
                        .replace( /^#![^\n]+$/m, '' ),
                name: entry.match(/([^\/]+)$/)[0] + '',
                mapping: {}
            }
            history.push([entry, uuid])
            return require(uuid)
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
                    return require(argv[0])
                },
                mapping: {}
            }
        }
        require(Guid)
    }
} catch ( error ) {
    var errorStack = error.stack
    if (console) console.log( errorStack )
    else WScript.StdErr.WriteLine( errorStack )
}