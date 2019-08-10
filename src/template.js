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

    var genUUID = function() {
        var typelib = require( 'Scriptlet.Typelib' )
        return typelib.GUID.replace( /[^\}]+$/, '' )
    }

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
        var Modules = {}

        // util
        function genUUID () {
            var typelib = WScript.CreateObject( 'Scriptlet.Typelib' )
            return typelib.GUID.replace( /[^\}]+$/, '' )
        }

        function has( cls, prop ) {
            if ( cls == null ) throw new Error ( prop + ' is null' )
            return cls.hasOwnProperty( prop )
        }

        function starts( str, word ) {
            return str.startsWith( word )
        }

        function getPathToModule ( filespec ) {
            var mod = Object.keys( Modules ).find( function ( key ) {
                if ( !!Modules[ key ].path ) return Modules[ key ].path === filespec
                return false
            } )
            return Modules[ mod ]
        }

        function getAreas ( caller, query ) { //console.log( 'getAreas: caller => %s query => %s', caller, query )
            var pathname = req( 'pathname' )
            var CurrentDirectory = pathname.CurrentDirectory
            var join = pathname.join
            var dirname = pathname.dirname
            var rd = '/' // root directory
            var cd = './' // current directory
            var pd = '../' // parent directory

            var areas = []
            // Replace '/' with Current Directory if query starts with '/'

            //console.log( "starts( '%s', '%s' ) => %j", query, rd, starts( query, rd ) )

            if ( starts( query, rd ) ) {
                areas.push( join( CurrentDirectory, query.replace( rd, '' ) ) )
            } else {
                // combine the caller's path and the query, if relative path

                //console.log( "starts( '%s', '%s' ) => %j", query, cd, starts( query, cd ) )
                //console.log( "starts( '%s', '%s' ) => %j ", query, pd, starts( query, pd ) )

                if ( starts( query, cd ) || starts( query, pd ) ) {

                    //console.log( "join( dirname( '%s' ), '%s' )", caller, query, join( dirname( caller ), query ) )

                    areas.push( join( dirname( caller ), query ) )
                } else {

                    console.log( console.ansi.yellow + 'else' )

                    // Otherwise, combine node_module while going back directory
                    var hierarchy = dirname( caller )
                    console.log( 'hierarchy => %s', hierarchy )
                    var node_modules = 'node_modules'
                    // console.log( 'areas while...' )

                    //console.log( "%s !== '' => %s", hierarchy, hierarchy !== '' )

                    while ( hierarchy !== '' ) { // console.log( 'hierarchy => %s dirname( hierarchy ) => %s', hierarchy, dirname( hierarchy ) )

                        //console.log( "join( '%s', node_modules, '%s' ) => %j" , hierarchy, query, join( hierarchy, node_modules, query ) )
                        //console.log( "join => %s", Object.prototype.toString.call( join( hierarchy, node_modules, query ) ) )

                        areas.push( join( hierarchy, node_modules, query ) )
                        hierarchy = dirname( hierarchy )
                    }
                }
            }
            //console.log( 'getAreas caller => %s query => %s areas => %J', caller, query, areas )
            return areas
        }

        function getEntry ( areas ) { //console.log( 'getEntry: areas => %J', areas )
            var join = req( 'pathname' ).join
            var filesystem = req( 'filesystem' )
            var exists = filesystem.exists
            var readTextFileSync = filesystem.readTextFileSync
            var parse = JSON.parse
            var js = '.js'
            var json = '.json'
            var index = 'index.js'
            var indexjson = 'index.json'
            var packagejson = 'package.json'

            var entry = null
            while ( areas.length ) {
                //console.log( 'getEntry#areas: %j', areas )
                var area = areas.shift()
                var temp
                if ( exists( temp = area ) ) { entry = temp; break }
                if ( exists( temp = area + js ) ) { entry = temp; break }
                if ( exists( temp = area + json ) ) { entry = temp; break }
                if ( exists( temp = join( area, index ) ) ) { entry = temp; break }
                if ( exists( temp = join( area, indexjson ) ) ) { entry = temp; break }
                if ( exists( temp = join( area, packagejson ) ) ) {
                    var main = parse( readTextFileSync( temp ) ).main
                    if ( main == null ) continue
                    areas.unshift( join( area, main ) )
                }
            }
            // console.log( 'getEntry#entry: %s', entry )
            return entry
        }

        function createModule ( GUID, entry, query, parentModule ) { // console.log( 'createModule: GUID => %s entry => %s query => %s parentModule => %s', GUID, entry, query, ( parentModule != null && typeof parentModule === 'object' ? parentModule.path : 'noParent') )
            var pathname = req( 'pathname' )
            var dirname = pathname.dirname
            var basename = pathname.basename
            var extname = pathname.extname
            var readTextFileSync = req( 'filesystem' ).readTextFileSync

            if ( parentModule ) parentModule.mapping[ query ] = GUID

            var mod = {
                source: readTextFileSync( entry ),
                module: {
                    exports: {}
                },
                path: entry,
                mapping: {}
            }

            Modules[ GUID ] = mod

            var js = '.js'

            switch ( extname( entry ) ) {
                case js:
                    var code = new Function( 'require', 'module', 'exports', 'console', '__dirname', '__filename', '"use strict";' + mod.source )
                    code( require.bind( null, entry ), mod.module, mod.module.exports, console, dirname( entry ), basename( entry ) )
                    break
                case json:
                    mod.module.exports = parse( mod.source )
                    break
                default:
                    mod.module.exports = mod.source
            }
            return mod
        }

        // local require
        function req ( moduleID ) { // console.log( 'req moduleID => %s', moduleID )
            var mod = Modules[ moduleID ]
            var entry = mod.path || '/'
            if ( !has( mod, 'exports' ) ) {
                if ( !has( mod, 'module') ) {
                    var dirname = entry.split( '/' )
                    var basename = dirname.pop()
                    mod.module = { exports: {} }
                    mod.mapping = {}
                    new Function(
                        'require',
                        'module',
                        'exports',
                        'console',
                        '__dirname',
                        '__filename',
                        '"use strict";' + mod.source
                    )(
                        require.bind( null, entry ),
                        mod.module,
                        mod.module.exports,
                        console,
                        dirname,
                        basename
                    )
                }
                mod.exports = mod.module.exports
            }
            return mod.exports
        }

        // require
        function require( caller, query ) { // console.log( 'require: caller => %s query => %s', caller, query )

            var posixSep = req( 'pathname' ).posixSep

            // execute req function, if it is a core module
            if ( !( query.includes( posixSep ) ) ) {
                if ( has( Modules, query ) ) {
                    // console.log( '%s is core module', query )
                    return req( query )
                }
            }

            // execute OLE, if it is OLE
            try {
                return WScript.CreateObject( query )
            } catch ( e ) {}

            // execute req function, if it is a mapping[ query ]
            var parentModule  = getPathToModule( caller )
            var mappingID
            if ( parentModule ) {
                if ( mappingID = parentModule.mapping[ query ] ) {
                    // console.log( '%s is required module form %s', query, caller )
                    return req( mappingID )
                }
            }

            var areas = getAreas( caller, query )

            // console.log( 'areas => %J', areas )
            var entry = getEntry( areas )
            if ( entry == null ) throw new Error( 'no module:\n' + 'caller: ' + caller + '\nquery: ' + query + '\n' + JSON.stringify( areas, null, 2 ) )

            var mod = createModule( genUUID(), entry, query, parentModule )
            mod.exports = mod.module.exports

            return mod.exports
        }

        //console.log( "argv %J", argv )
        var CurrentDirectory = req( 'pathname' ).CurrentDirectory
        require( CurrentDirectory, '/' + argv[0] )
    }
} catch ( error ) {
    var errorStack = error.stack
    if (console) {
        console.log( errorStack )
    }
    else WScript.StdErr.WriteLine( errorStack )
}