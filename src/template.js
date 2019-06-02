try {
    var WShell = WScript.CreateObject('WScript.Shell')

    var argv = ( function () {

        var args = WScript.Arguments

        var res = []
        for ( var i = 0; i < args.length; i++ ) {
            res.push( args( i ) )
        }

        var unnamed = []
        for ( var i = 0; i < args.Unnamed.length; i++ ) {
            unnamed.push( args.Unnamed( i ) )
        }

        function exists ( name ) { return args.Named.Exists( name ) }
        function getValue ( name ) { return args.Named( name ) }

        res.unnamed = unnamed
        res.exists = exists
        res.getValue = getValue

        return res

    } )()

    var console = ( function() {

        function log () {
            var res = normalize( arguments )
            WScript.StdErr.WriteLine( res )
            return removeColor( res )
        }

        function print () {
            var res = normalize( arguments )
            WScript.StdErr.Write( res )
            return removeColor( res )
        }

        function debug () {
            var isDebugOption = argv.exists( 'debug' )
            if ( !isDebugOption ) return void 0
            var res = normalize( arguments )
            WScript.StdErr.WriteLine( '\u001B[91m\u001B[7mDEBUG:\u001B[0m ' + res )
            return removeColor( res )
        }

        var none = ''
        var space = ' '
        var specifier = /%[sdifjJoO]/
        var seq = /\u001B\[[\d;]+m/g

        function normalize ( argList ) {
            var monotone = argv.exists( 'monotone' )
            var args = splitArgs( argList )
            var res = formatArgs( args )
            res = clearTail( res )
            if ( monotone ) res = removeColor( res )
            return res
        }

        function splitArgs ( args ) { return Array.prototype.slice.call( args ) }

        function formatArgs ( args ) {
            if ( args == null || args.length < 2 ) {
                return args[0]
            }
            if ( !specifier.test( args[0] ) ) {
                return args.join( space )
            }
            var msg = args.shift()
            while ( args.length > 0) {
                var val = args.shift()
                var type = specifier.test( msg ) ? msg.match( specifier )[0] : null
                switch ( type ) {
                    case '%s':
                        msg = msg.replace( '%s', '' + val ); continue
                    case '%d':
                        msg = msg.replace( '%d', val - 0 ); continue
                    case '%f':
                        msg = msg.replace( '%f', val - 0 ); continue
                    case '%i':
                        msg = msg.replace( '%i', parseInt( val ) ); continue
                    case '%j':
                        msg = msg.replace( '%j', JSON.stringify( val ) ); continue
                    case '%J':
                        msg = msg.replace( '%J', JSON.stringify( val, null, 2 ) ); continue
                    case '%o':
                        msg = msg.replace( '%o', val ); continue
                    case '%O':
                        msg = msg.replace( '%O', require( 'dump' )( val ) ); continue
                    default:
                        break
                }
            }
            return msg
        }

        function removeColor ( arg ) {
            return arg.replace( seq, none )
        }

        function clearTail ( arg ) {
            return arg + ansi.clear
        }

        function color ( red, green, blue ) {
            var args = Array.prototype.slice.call( arguments )
            if ( args.length === 1 && args[0].startsWith( '#' ) ) {
                red = parseInt( args[0].slice( 1, 3 ), 16 )
                green = parseInt( args[0].slice( 3, 5 ), 16 )
                blue = parseInt( args[0].slice( 5, 7 ), 16 )
            }
            return '\u001B[38;2;' + red + ';' + green + ';' + blue + 'm'
        }

        function bgColor( red, green, blue ) {
            var args = Array.prototype.slice.call( arguments )
            if ( args.length === 1 && args[0].startsWith( '#' ) ) {
                red = parseInt( args[0].slice( 1, 3 ), 16 )
                green = parseInt( args[0].slice( 3, 5 ), 16 )
                blue = parseInt( args[0].slice( 5, 7 ), 16 )
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
            if ( graph[id] != null ) {
                if ( !id.startsWith('{') ) {
                    stack.push( [null, null] )
                }
                var code = graph[id].code
                var source = graph[id].source
                var mapping = graph[id].mapping

                function localRequire( name ) {
                    var res = mapping[name]
                    if ( res == null )
                        return require( name )
                    else
                        return require( res )
                }

                localRequire.stack = stack
                localRequire.graph = graph

                var module = { exports: {} }
                var global = global || {}
                var process = {
                    env: { NODE_DEBUG: 'semver' },
                    argv: ['wes'].concat( argv ),
                    versions: { node: '4.0.0' },
                    platform: 'win32'
                }
                var fn = typeof code === 'function' ? code : new Function(
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
                    ( stack[ stack.length - 1 ][0] + '' ).replace( /\/[^\/]+$/, '' ),
                    global,
                    process
                )
                graph[id].code = fn
                stack.pop()

                return module.exports
            }
            try {
                return WScript.CreateObject( id )
            } catch ( e ) {}
            var fs = require( 'filesystem' )
            var path = require( 'pathname')

            var curr = ( function() {
                if ( id.startsWith( path.posixSep ) ) return path.CurrentDirectory
                var res
                if ( stack.length ) {
                    if ( ( res = stack[stack.length - 1] ) ) {
                        if ( res[0] ) {
                            return path.dirname( res[0] )
                        }
                    }
                }
                return path.toPosixSep( path.CurrentDirectory )
            })()

            var points = []
            points.push( path.join( curr, id ) )
            if ( !id.startsWith( path.posixSep ) || !id.startsWith( '.' + path.posixSep ) || !id.startsWith( '..' + path.posixSep ) ) {
                var hierarchy = path.split( curr )
                while ( hierarchy.length ) {
                    points.push(
                        path.absolute(
                            path.join( hierarchy.join( path.posixSep ), 'node_modules', id )
                        )
                    )
                    hierarchy.pop()
                }
            }
            var entry = null
            console.log( "%scurr: %O", console.ansi.brightGreen, curr)
            points.some( function( value ) {
                var res = null
                var pack = null
                if ( ( ( res = value ), fs.exists( res ) ) ) {
                    return ( entry = res )
                }
                if ( ( ( res = value + '.js'), fs.exists( res ) ) ) {
                    return ( entry = res )
                }
                if ( ( ( res = value + '.json' ), fs.exists( res ) ) ) {
                    return (entry = res)
                }
                if ( ( ( res = path.join( value, 'index.js' ) ), fs.exists( res ) ) ) {
                    return ( entry = res )
                }
                if ( ( ( pack = path.join( value, 'package.json' ) ), fs.exists( pack ) ) ) {
                    var temp = ( JSON.parse( fs.readTextFileSync( pack ) ) ).main
                    if ( temp != null ) {
                        if ( ( ( res = path.join( value, temp ) ), fs.exists( res ) ) ) return ( entry = res )
                        else if ( ( ( res = path.join( value, temp + '.js' ) ), fs.exists( res ) ) ) return ( entry = res )
                    }
                }
            } )
            if ( entry == null ) {
                throw new Error(
                    "module not found\ncaller: '" + stack[ stack.length - 1 ][0] + "' => require '" + id + "'"
                )
            }
            //console.log( "%sentry %J", console.ansi.brightRed, entry )
            var loaded = history.find( function( val ) {
                return val[0] === entry
            } )
            if ( !!loaded ) {
                graph[ stack[stack.length - 1][1]].mapping[id] = loaded[1]
                stack.push( [entry, loaded[1]] )
                return require( loaded[1] )
            }
            var uuid = genUUID()
            //console.log( "%s stack: %O", console.ansi.cyan, stack )
            graph[ stack[stack.length - 1][1]].mapping[id] = uuid
            stack.push( [entry, uuid] )
            graph[uuid] = {
                source: entry.endsWith( '.json' ) ?
                    "module.exports = " + fs
                        .readTextFileSync( entry )
                        .replace( /\r/g, '' ) :
                    fs
                        .readTextFileSync( entry )
                        .replace( /\r/g, '' )
                        .replace( /^#![^\n]+$/m, '' ),
                name: entry.match( /([^\/]+)$/ )[0] + '',
                mapping: {}
            }
            history.push( [entry, uuid] )
            console.log( "%sentry: %s", console.ansi.reverse, entry)
            return require( uuid )
        }
        var genUUID = function() {
            var typelib = require( 'Scriptlet.Typelib' )
            return typelib.GUID.replace( /[^\}]+$/, '' )
        }
        var Guid = genUUID()
        if ( !stack.length ) {
            stack.push( [null, Guid] )
            graph[Guid] = {
                code: function() {
                    return require( argv[0] )
                },
                mapping: {}
            }
        }
        console.log( '' )
        require( Guid )
    }
} catch ( error ) {
    var errorStack = error.stack
    if (console) {
        console.log( errorStack )
        var log = require( 'log' )
        log( function() { return stack } )
        log( function() { return history } )
    }
    else WScript.StdErr.WriteLine( errorStack )
}