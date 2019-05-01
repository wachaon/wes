try {
    var WShell = WScript.CreateObject('WScript.Shell')
    var formatConsoleString = function () {
        var args = Array.prototype.slice.call( arguments )
        if( args.length && typeof args[0] === 'string' && args[0].includes( '%' ) ) {
            var message = args.shift()
            while( args.length ) {
                var val = args.shift()
                var type = /(%[sdifjo])/.test( message ) ? message.match( /(%[sdifjo])/ )[0]: null
                switch( type ) {
                    case null: break;
                    case '%s': message = message.replace( '%s', '' + val ); break
                    case '%d': message = message.replace( '%d', val - 0 ); break
                    case '%f': message = message.replace( '%f', val - 0 ); break
                    case '%i': message = message.replace( '%i', parseInt( val ) ); break
                    case '%j': message = message.replace( '%j', JSON.stringify( val ) ); break
                    case '%o': message = message.replace( '%o', val ); break
                    default: break
                }
            }
            return  message
        } else return args.join( ' ' )
    }
    var normalizeConsoleString = function ( message ){
        message =  WScript.Arguments.Named.Exists( 'monotone' )
        ? message.replace( /(\x9B|\x1B\[)[0-?]*[ -\/]*[@-~]/g, "" )
        : message + console.ansi.clear
        return message
    }
    var console = {
        debugLog: [],
        log: function () {
            var args = Array.prototype.slice.call( arguments )
            var message = formatConsoleString.apply( null, args )
            message = normalizeConsoleString( message )
            if ( WScript.Arguments.Named.Exists( 'debug' ) ) console.logPush( message )
            WScript.StdErr.WriteLine( message )
        },
        logPush: function() {
            var args = Array.prototype.slice.call( arguments )
            var message = formatConsoleString.apply( null, args )
            message = normalizeConsoleString( message )
            console.debugLog.push( message )
        },
        print: function () {
            var args = Array.prototype.slice.call( arguments )
            var message = normalizeConsoleString( args.join('') )
            WScript.StdErr.Write( message )
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
            ,{
                "argv": {
                    "source": "const { Enumerator } = require( 'JScript' )\nconst program = [ 'wes' ]\nconst args = program.concat( new Enumerator( WScript.Arguments ) )\nconst unnamed = new Enumerator( WScript.Arguments.unnamed )\nconst named = ( () => {\nlet res = {}\nlet named = new Enumerator(WScript.Arguments.named)\nnamed.forEach(v => {\nlet named = WScript.Arguments.named.item(v)\nres[v] = named || \"\"\n} )\nreturn res\n} )()\nmodule.exports = {\nargs,\nunnamed,\nnamed\n}",
                    "mapping": {},
                    "name": "lib/argv"
                },
                "buffer": {
                    "source": "class Buffer {\nconstructor( byte ) {\nreturn Hex2Buffer( Byte2Hex( byte ) )\n}\n}\nconst Byte2Hex = ( byte ) => {\nlet hex = require('Msxml2.DOMDocument').createElement('hex')\nhex.dataType = 'bin.hex'\nhex.nodeTypedValue = byte\nreturn hex.text\n}\nconst Hex2Buffer = ( hex ) => new Uint8Array( hex.match( /.{1,2}/g ).map( v => parseInt( v, 16 ) ) )\nmodule.exports = Buffer\n",
                    "mapping": {},
                    "name": "lib/buffer"
                },
                "day": {
                    "source": "class Day extends Date {\n[Symbol.toPrimitive] ( hint ) {\nif ( hint === 'number' ) return this.getTime()\nelse {\nlet year = this.getFullYear()\nlet month = ( \"0\" + ( this.getMonth() + 1 ) ).slice( -2 )\nlet date = ( \"0\" + ( this.getDate() ) ).slice( -2 )\nlet hours = ( \"0\" + ( this.getHours() ) ).slice( -2 )\nlet minutes = ( \"0\" + ( this.getMinutes() ) ).slice( -2 )\nlet seconds = ( \"0\" + ( this.getSeconds() ) ).slice( -2 )\nlet milliseconds = ( \"00\" + ( this.getMilliseconds() ) ).slice( -3 )\nreturn `${ year }/${ month }/${ date } ${ hours }:${ minutes }:${ seconds }.${ milliseconds }`\n}\n}\n}\nmodule.exports = Day",
                    "mapping": {},
                    "name": "lib/day"
                },
                "debug": {
                    "source": "const { named } = require( 'argv' )\nconst dump = require( 'dump' )\nconst debug = ( expression ) => {\nif ( 'debug' in named ) {\nconsole.log( `debug( ${ dump( expression ) } )` )\n}\nreturn expression\n}\nmodule.exports = debug",
                    "mapping": {},
                    "name": "lib/debug"
                },
                "dump": {
                    "source": "const dump = ( variable, color = true ) => {\nlet {\nbrightBlue: number,\nbrightCyan: func,\nbrightYellow: string,\nbrightGreen: date,\nbrightRed: circle,\nyellow: regexp,\ngray: nul,\nclear\n} = color ? console.ansi : {\nbrightBlue: '',\nbrightCyan: '',\nbrightYellow: '',\nbrightGreen: '',\nbrightRed: '',\nbrightMagenta: '',\ngray: '',\nclear: ''\n}\nconst Day = require( 'day' )\nconst { LF, NONE, unindent } = require( 'text' )\nconst TAB = '    '\nlet level = 0\nlet Circle = new Map\nconst print = ( target, key ) => {\nif ( typeof target === 'function' ) return fn( target ) + clear\nif ( typeof target === 'string' ) return str( target )\nif ( typeof target === 'number' ) return number + target + clear\nif ( target instanceof RegExp ) return regexp + target.toString() + clear\nif ( target instanceof Date ) return date + `new Date( '${ new Day( target ) }' )` + clear\nif ( target instanceof Unit8Array ) {\nlet res = []\ntarget.forEach( v => res.push( ( '00' + v.toString( 16 ) ).slice( -2 ) ) )\nreturn `<Buffer ${ res.join( ' ' ) } >`\n}\nif ( target == null ) return nul + target + clear\nif ( Array.isArray( target ) ) {\nif ( Circle.has( target ) ) {\nlet res = circle + '<Circle::' +  Circle.get( target ) + '>' + clear\nreturn res\n}\nkey = key == null ? 'this' : key\nCircle.set( target, key )\nreturn arr( target, key )\n}\nif ( Object.prototype.toString.call( target ) === '[object Object]' ) {\nif ( Circle.has( target ) ) {\nlet res = circle + '<Circle::' + Circle.get( target ) + '>' + clear\nreturn res\n}\nkey = key == null ? 'this' : key\nCircle.set( target, key )\nreturn obj( target, key )\n}\n}\nconst fn = ( code ) => {\nlet source = unindent( code.toString() ).split( LF )\n.map( ( v, i ) => i === 0 ? v : TAB.repeat( level ) + v )\n.join( LF )\nreturn func + source + clear\n}\nconst str = ( text ) => {\nif ( color ) return string + `\\`${ text.replace( /`/g, '\\\\`' ) }\\`` + clear\nreturn string + `\"${ text.replace( /\\n/g, '\\\\n' ).replace( /\"/g, '\\\\\"' ) }\"` + clear\n}\nconst arr = ( list, key ) => {\nlevel++\nlet res = list.map( ( v, i ) => {\nlet r = TAB.repeat( level ) + print( v, key + `[${ i }]` )\nreturn r\n} )\nlevel--\nlet result =  0 < res.length ? LF + res.join( ',' + LF  ) + LF + TAB.repeat( level ) : NONE\nreturn '[' + result + ']'\n}\nconst obj = ( keys, key ) => {\nconst list = Object.keys( keys )\nlevel++\nlet res = list.map( v => {\nlet r = TAB.repeat( level ) + v + ': ' + print( keys[v], key + `[\"${ v }\"]` )\nreturn r\n} )\nlevel--\nlet result = res.length ? LF + res.join( ',' + LF  ) + LF  + TAB.repeat( level ) : NONE\nreturn '{' + result + '}'\n}\nreturn print( variable )\n}\nmodule.exports = dump\n",
                    "mapping": {},
                    "name": "lib/dump"
                },
                "enumerator": {
                    "source": "const { JScript } = require('sc')\nconst { TypeName } = require('VBScript')\nJScript.AddCode(`\nfunction enumerator ( collection ) {\nreturn new Enumerator( collection )\n}`)\nconst toArray = ( col ) => {\nlet res = []\nlet Enum = JScript.Run( 'enumerator', col )\nfor (; !Enum.atEnd(); Enum.moveNext()) {\nres.push( Enum.item() )\n}\nEnum.moveFirst()\nreturn res\n}\nconst Enumerator = new Proxy( () => {},{\nconstruct( target, args ) {\nconst res = []\nconst e = JScript.Run( 'enumerator', args[0] )\nfor ( ; !e.atEnd(); e.moveNext() ) {\nres.push( e.item() )\n}\nreturn res\n}\n} )\nclass Enumerators extends Array {\nconstructor( collection ) {\nlet res = []\nif (TypeName( collection ) === 'Long') {\nres = collection\n} else {\nres = toArray( collection )\n}\nsuper( ...res )\nlet i = 0\nObject.defineProperties( this, {\nmoveNext: { value() { i++ } },\natEnd: { value() { return !( i < this.length ) } },\nmoveFirst: { value() { return ( i = 0 ) } },\nitem: { value(num) { return num != null ? this[ num ] : this[ i ] } }\n} )\n}\nmap( callback ) {\nvar T, A, k\nif ( this == null ) {\nthrow new TypeError( 'this is null or not defined' )\n}\nvar O = Object( this )\nvar len = O.length >>> 0\nif ( typeof callback !== 'function' ) {\nthrow new TypeError(callback + ' is not a function' )\n}\nif ( arguments.length > 1) {\nT = arguments[1]\n}\nA = new Array(len)\nk = 0\nwhile (k < len) {\nvar kValue, mappedValue\nif ( k in O ) {\nkValue = O[k]\nmappedValue = callback.call(T, kValue, k, O)\nA[k] = mappedValue\n}\nk++\n}\nreturn A\n}\nfilter( func, thisArg ) {\n'use strict'\nif (\n!(\n( typeof func === 'Function' || typeof func === 'function' ) &&\nthis\n)\n)\nthrow new TypeError()\nvar len = this.length >>> 0,\nres = new Array( len ),\nt = this,\nc = 0,\ni = -1\nif ( thisArg === undefined ) {\nwhile ( ++i !== len ) {\nif (i in this) {\nif ( func( t[ i ], i, t ) ) {\nres[ c++ ] = t[ i ]\n}\n}\n}\n} else {\nwhile ( ++i !== len ) {\nif ( i in this ) {\nif ( func.call( thisArg, t[ i ], i, t ) ) {\nres[ c++ ] = t[ i ]\n}\n}\n}\n}\nres.length = c\nreturn res\n}\n}\nEnumerator.Enumerator = Enumerators\nmodule.exports = Enumerator",
                    "mapping": {},
                    "name": "lib/enumerator"
                },
                "event": {
                    "source": "class Event {\nconstructor() {\nthis.state = {}\n}\non(handler, fn) {\nlet state = this.state\nif (state[handler] == null) state[handler] = [fn]\nelse state[handler].push(fn)\nreturn fn\n}\nemit(handler, ...args) {\nlet state = this.state\nif (state[handler] == null) console.log(`handler: ${handler} not State`)\nelse state[handler].forEach((v) => v(...args))\n}\noff(handler, fn) {\nlet state = this.state\nif (state[handler] == null) console.log(`handler: ${handler} not State`)\nelse if (fn == null) state[handler] = null\nelse state[handler] = state[handler].filter((v) => v !== fn)\n}\nonce(handler, fn) {\nlet state = this.state\nconst _once = (...args) => {\nfn(...args)\nthis.off(handler, _once)\n}\nif (state[handler] == null) state[handler] = [_once]\nelse state[handler].push(_once)\nreturn _once\n}\n}\nmodule.exports = Event",
                    "mapping": {},
                    "name": "lib/event"
                },
                "io": {
                    "source": "const UTF8Encoding = require('System.Text.UTF8Encoding')\nconst ADODB = require('ADODB.Stream')\nconst DOMDocument = require('Msxml2.DOMDocument')\nconst SHIFT_JIS = 'Shift-JIS'\nconst UTF_8 = 'UTF-8'\nconst UTF_8BOM = 'UTF-8BOM'\nconst UTF_8N = 'UTF-8N'\nconst AD_TYPE_BINARY = 1\nconst AD_TYPE_TEXT = 2\nconst AD_SAVE_CREAE_OVER_WRITE = 2\nconst binary2UTF8 = ( binary ) => {\nreturn UTF8Encoding.GetString( binary )\n}\nconst binary2SJIS = ( binary ) => {\nlet source = ''\ntry {\nADODB.Open()\nADODB.Type = AD_TYPE_BINARY\nADODB.Write(binary)\nADODB.Position = 0\nADODB.Type = AD_TYPE_TEXT\nADODB.Charset = SHIFT_JIS\nsource = ADODB.ReadText()\n} catch (error) {\nconsole.log( `error binary2SJIS ${ error }` )\n} finally {\nADODB.Close()\n}\nreturn source\n}\nconst binary2Hex = ( binary ) => {\nlet hex = require('Msxml2.DOMDocument').createElement('hex')\nhex.dataType = 'bin.hex'\nhex.nodeTypedValue = binary\nreturn hex.text\n}\nconst Hex2binary = ( text ) => {\nlet hex = require('Msxml2.DOMDocument').createElement('hex')\nhex.dataType = 'bin.hex'\nhex.text = text\nreturn hex.nodeTypedValue\n}\nconst UTF82bynary = ( text ) => require( 'System.Text.UTF8Encoding' ).GetBytes_4( text )\nconst SJIS2binary = ( text ) => {\nconst stream = require( 'ADODB.Stream' )\nstream.Open()\nstream.Type = AD_TYPE_TEXT\nstream.Charset = SHIFT_JIS\nstream.WriteText( text )\nstream.Position = 0\nstream.Type = AD_TYPE_BINARY\nconst res = stream.Read()\nstream.Close()\nreturn res\n}\nconst ReadBinaryFile = ( path ) => {\nlet source = ''\ntry {\nADODB.Type = AD_TYPE_BINARY\nADODB.Open()\nADODB.LoadFromFile( path )\nsource = ADODB.Read()\n} catch ( error ) {\nconsole.log( `error ReadBinaryFile ${ error } ${ path }` )\n} finally {\nADODB.Close()\n}\nreturn source\n}\nconst autoGuessEncode = ( binary ) => {\nlet hex = binary2Hex( binary )\nif ( /^efbbbf.+/.test(hex) ) return UTF_8BOM\nlet hexes = []\nfor ( let i = 0; i < hex.length; i++ ) {\nhexes.push( Number( `0x${ hex[i] }${ hex[i + 1] }` ) )\ni++\n}\nlet len = hexes.length\nif ( len < 2 ) return UTF_8N\nlet sjis = 0\nlet utf8 = 0\nfor ( let i = 0; i < len - 2; i++ ) {\nconst hex1 = hexes[i]\nconst hex2 = hexes[i + 1]\nconst hex3 = hexes[i + 2]\nif (\n( ( 0x81 <= hex1 && hex1 <= 0x9f ) || ( 0xe0 <= hex1 && hex1 <= 0xfc ) ) &&\n( (0x40 <= hex2 && hex2 <= 0x7e ) || ( 0x80 <= hex2 && hex2 <= 0xfc ) )\n) sjis += 2\nif (0xc0 <= hex1 && hex1 <= 0xdf && (0x80 <= hex2 && hex2 <= 0xbf)) utf8 += 2\nelse if (\n0xe0 <= hex1 &&\nhex1 <= 0xef &&\n(0x80 <= hex2 && hex2 <= 0xbf) &&\n(0x80 <= hex3 && hex3 <= 0xbf)\n) {\nutf8 += 3\ni += 2\n}\ni++\n}\nreturn sjis > utf8 ? SHIFT_JIS : UTF_8N\n}\nconst read = ( filespec, enc ) => {\nlet binary = ReadBinaryFile( filespec )\nlet encode = enc || autoGuessEncode( binary )\nif (encode.toLowerCase() === SHIFT_JIS.toLowerCase()) return binary2SJIS( binary )\nif (encode.toLowerCase() === UTF_8BOM.toLowerCase() || encode.toLowerCase() === UTF_8.toLowerCase() ) {\nreturn binary2UTF8( Hex2binary( binary2Hex( binary ).replace(/^efbbbf/, '') ) )\n}\nreturn binary2UTF8(binary)\n}\nconst write = ( filespec, text, enc ) => {\nconst ADODB = require('ADODB.Stream')\ntry {\nADODB.Type = AD_TYPE_TEXT\nif ( enc == null ) ADODB.CharSet = enc = SHIFT_JIS\nelse if ( enc.toLowerCase() === UTF_8N.toLowerCase() ) ADODB.CharSet = UTF_8\nelse ADODB.CharSet = enc\nADODB.Open()\nADODB.WriteText( text )\nif ( enc.toLowerCase() === UTF_8N.toLowerCase() ) {\nADODB.Position = 0\nADODB.Type = AD_TYPE_BINARY\nADODB.Position = 3\nlet bytes = ADODB.Read()\nADODB.Position = 0\nADODB.SetEOS()\nADODB.Write( bytes )\n}\nADODB.SaveToFile( filespec, AD_SAVE_CREAE_OVER_WRITE )\n} catch ( error ) {\nreturn console.log( `failed to writing '${ filespec }'\\n${ error }`)\n} finally {\nADODB.Close()\n}\nreturn `succeeded in writing '${ filespec }'`\n}\nconst win32Sep = '\\\\'\nconst posixSep = '/'\nconst split = ( path ) => toPosixSep( path ).split( posixSep )\nconst toWin32Sep = ( path ) => path.split( posixSep ).join( win32Sep )\nconst toPosixSep = ( path ) => path.split( win32Sep ).join( posixSep )\nconst absolute = ( path ) => toPosixSep( FSO.GetAbsolutePathName( toWin32Sep( path ) ) )\nconst join = ( ...paths ) => absolute( toWin32Sep( paths.reduce( ( acc, curr ) => `${ acc }${ win32Sep }${ curr }` ) ) )\nconst dirname = ( path ) => absolute( FSO.GetParentFolderName( toWin32Sep( path ) ) )\nconst fileExists = ( path ) => FSO.FileExists( toWin32Sep( path ) )\nmodule.exports = {\nreadFileSync: read,\nwriteFileSync: write,\nautoGuessEncode,\nwin32Sep,\nposixSep,\ntoWin32Sep,\ntoPosixSep,\nabsolute,\nsplit,\njoin,\ndirname,\nfileExists,\nReadBinaryFile,\nbinary2UTF8,\nbinary2SJIS,\nbinary2Hex,\nHex2binary,\nUTF82bynary,\nSJIS2binary\n}\n",
                    "mapping": {},
                    "name": "lib/io"
                },
                "JScript": {
                    "source": "const { JScript } = require('sc')\nconst { TypeName } = require('VBScript')\nJScript.AddCode(`\nfunction enumerator ( collection ) {\nreturn new Enumerator( collection )\n}`)\nconst toArray = ( col ) => {\nlet res = []\nlet Enum = JScript.Run( 'enumerator', col )\nfor (; !Enum.atEnd(); Enum.moveNext()) {\nres.push( Enum.item() )\n}\nEnum.moveFirst()\nreturn res\n}\nclass Enumerator {\nconstructor( collection ) {\nlet res = []\nif (TypeName( collection ) === 'Long') {\nres = collection\n} else {\nres = toArray( collection )\n}\nreturn res\n}\n}\nmodule.exports = {\nEnumerator\n}",
                    "mapping": {},
                    "name": "lib/JScript"
                },
                "log": {
                    "source": "const dump = require( 'dump' )\nconst { unindent } = require( 'text' )\nconst { green, clear } = console.ansi\nconst log = ( code ) => {\nlet res = dump( code() )\nconsole.log( 'log( ' + dump( code ) + ' )' + green + ' // => ' + clear + res )\n}\nmodule.exports = log",
                    "mapping": {},
                    "name": "lib/log"
                },
                "pathname": {
                    "source": "const win32Sep = '\\\\'\nconst posixSep = '/'\nconst split = ( path ) => toPosixSep( path ).split( posixSep )\nconst toWin32Sep = ( path ) => path.split( posixSep ).join( win32Sep )\nconst toPosixSep = ( path ) => path.split( win32Sep ).join( posixSep )\nconst absolute = ( path ) => toPosixSep( FSO.GetAbsolutePathName( toWin32Sep( path ) ) )\nconst join = ( ...paths ) => absolute( toWin32Sep( paths.reduce( ( acc, curr ) => `${ acc }${ win32Sep }${ curr }` ) ) )\nconst dirname = ( path ) => absolute( FSO.GetParentFolderName( toWin32Sep( path ) ) )\nconst extname = ( path ) => {\nlet temp = split( path )\nlet res = temp[ temp.length - 1 ].split( '.' )\nif ( res.length > 1 ) return '.' + res[ res.length - 1 ]\nreturn '' \n}\nconst relative = ( from, to ) => {\nlet _from = split( absolute( from ) )\nlet _to = split( absolute( to ) )\nif ( _from[0] !== _to[0] ) return toPosixSep( to )\nwhile ( _from[0] === _to[0] ) {\n_from.shift()\n_to.shift()\n}\n_from = _from.fill( '..' )\nreturn _from.concat( _to ).join( posixSep )\n}\nconst basename = ( path, ext ) => {\nconst temp = split( path )\nconst res = temp[ temp.length - 1 ]\nif ( ext != null && ext[0] === '.' && res.slice( -ext.length ) === ext) {\nreturn res.slice( 0, res.length - ext.length )\n} else {\nreturn res\n}\n}\nconst normalize = ( path ) => {\nlet temp = split( toPosixSep( path ).replace( /\\/+/g, posixSep ) )\nlet res = []\nlet parent = 0\nfor ( let i = temp.length - 1; i > -1 ; i-- ) {\nlet item = temp[i]\nif ( item === '.' ) continue\nelse if ( item === '..' ) parent++\nelse if ( parent ) parent--\nelse res.unshift( item )\n}\nif ( parent > 0 ) res.unshift( ( new Array( parent ) ).fill( '..' ) )\nif ( /^[a-z]:$/.test( res[0] ) ) res[0] = res[0].toUpperCase()\nreturn res.join( posixSep )\n}\nconst isAbsolute = ( path ) => absolute( path ) === normalize( path )\nmodule.exports = {\nwin32Sep,\nposixSep,\nsplit,\ntoWin32Sep,\ntoPosixSep,\nabsolute,\njoin,\ndirname,\nextname,\nrelative,\nbasename,\nnormalize,\nisAbsolute\n}\n",
                    "mapping": {},
                    "name": "lib/pathname"
                },
                "pipe": {
                    "source": "const { named } = require( 'argv' )\nconst dump = require( 'dump' )\nclass Pipe {\nconstructor(){\nlet reslut = ( value ) => {\nconst val = value instanceof Pipe ? value.dist() : value\nconst _pipe = ( v, f ) => new Pipe()( f( v ) )\nlet res = {\ndist() {\nreturn val\n},\nlog( fn ) {\nif ( typeof fn !== 'function' ) console.log( dump( val ) )\nelse fn( val )\nreturn new Pipe()( val )\n},\ndebug( fn ) {\nif ( 'debug' in named ) {\nif ( fn == null ) console.log( dump( val ) )\nelse console.log( fn( val ) )\n}\nreturn new Pipe()( val )\n},\npipe( ...args ) {\nargs.unshift( new Pipe()( val ) )\nreturn args.reduce( ( acc, curr ) => {\nreturn _pipe( acc.dist(), curr )\n} )\n}\n}\nreturn res\n}\nreturn reslut\n}\n}\nmodule.exports = new Pipe",
                    "mapping": {},
                    "name": "lib/pipe"
                },
                "sc": {
                    "source": "const ScriptControl = ( language ) => {\nconst sc = require( 'ScriptControl' )\nsc.Language = language\nreturn {\nAddCode( code ) {\nsc.AddCode( code )\n},\nRun( name, ...args ) {\nreturn sc.run( name, ...args )\n}\n}\n}\nmodule.exports = {\nJScript: ScriptControl( 'JScript' ),\nVBScript: ScriptControl( 'VBScript' )\n}\n",
                    "mapping": {},
                    "name": "lib/sc"
                },
                "test": {
                    "source": "const { LF, TAB, REG_CRLF, SPACE } = require('text')\nlet depth = 0\nlet indent = ''\nlet rate = 4\nlet n = LF\nconst checkMark = '\\u2714'\nconst {\nbrightRed: red,\nbrightGreen: green,\nbrightYellow: yellow,\nbrightMagenta: pink,\ngray\n} = console.ansi\nconst describe = (title, fn) => {\ndepth++\nindent = SPACE.repeat(depth * rate)\nconsole.log(LF + indent + title + LF)\nfn()\ndepth--\n}\nconst it = (message, fn) => {\ndepth++\nindent = SPACE.repeat(depth * rate)\nconst printCode = (code) => {\nlet source = code\n.toString()\n.split(TAB)\n.join('    ')\n.split(REG_CRLF)\nif (source.length < 2)\nreturn `${SPACE.repeat(indent + rate)}${source[0]}`\nsource[0] = `${source[source.length - 1].match(/^\\s+/)[0]}${source[0]}`\nconst sp = source.map((v) => v.match(/^\\s+/)[0].length)\nconst min = Math.min.apply(null, sp)\nreturn source\n.map((v) => {\nreturn `${SPACE.repeat((depth + 1) * rate)}${v.replace(\nSPACE.repeat(min),\n''\n)}`\n})\n.join('\\n')\n}\ntry {\nfn()\nconsole.log(`${indent}${gray}${message} ${green}${checkMark}`)\n} catch (e) {\nconsole.log(\n`${indent}${pink}${message}\\n${yellow}${printCode(\nfn\n)} ${red}// => ${e.message}${n}`\n)\n} finally {\ndepth--\n}\n}\nconst assert = (assertion) => {\nreturn assert.ok(assertion)\n}\nassert.ok = (assertion) => {\nlet res = typeof assertion === 'function' ? assertion() : assertion\nif (!res) throw new Error(res)\n}\nassert.ng = (assertion) => {\nlet res = typeof assertion === 'function' ? assertion() : assertion\nif (res) throw new Error(res)\n}\nmodule.exports = {\ndescribe,\nit,\nassert\n}\n",
                    "mapping": {},
                    "name": "lib/test"
                },
                "text": {
                    "source": "const LF = '\\n'\nconst CR = '\\r'\nconst CRLF = CR + LF\nconst SPACE = ' '\nconst TAB = '\\t'\nconst NONE = ''\nconst REG_LINE_SEP = /\\r?\\n/g\nconst REG_LF = /\\n/g\nconst REG_CRLF = /\\r\\n/g\nconst REG_SPACE = /\\s/g\nconst REG_SPACES = /\\s+/g\nconst REG_BLANK_LINE = /^\\s+$/\nconst REG_TAB = /\\t/g\nconst REG_TABS = /\\t+/g\nconst INDNT = /^\\s+/\nconst trimStarts = (string) => {\nreturn string.replace(/^([\\s\\r\\n]+\\n)/, NONE)\n}\nconst trimEnds = (string) => {\nreturn string.replace(/(\\n[\\s\\r\\n]+)$/, NONE)\n}\nconst trim = (string) => {\nreturn trimStarts(trimEnds(string))\n}\nconst splitLines = (string, mod, start, end) => {\nconst sep = REG_CRLF.test(string) ? CRLF : LF\nreturn string\n.split(REG_LINE_SEP)\n.filter(\n(value, i) =>\n(start < i % mod && i % mod < end) || REG_BLANK_LINE.test(value)\n)\n.join(sep)\n}\nconst unindent = ( text ) => {\nconst lineBreak = text.includes( CRLF ) ? CRLF : LF\nlet line = text.split( REG_LINE_SEP )\nconst lastLineSpace = line[ line.length - 1 ].match( INDNT )\nif ( lastLineSpace == null ) return text\nreturn line.map( v => {\nreturn v.replace( lastLineSpace, '' )\n} ).join( lineBreak ).replace( /^\\s+/, '')\n}\nmodule.exports = {\nLF,\nCR,\nCRLF,\nSPACE,\nTAB,\nNONE,\nREG_LINE_SEP,\nREG_LF,\nREG_CRLF,\nREG_SPACE,\nREG_SPACES,\nREG_BLANK_LINE,\nREG_TAB,\nREG_TABS,\ntrimStarts,\ntrimEnds,\ntrim,\nsplitLines,\nunindent\n}\n",
                    "mapping": {},
                    "name": "lib/text"
                },
                "validation": {
                    "source": "const isValid = ( target, name, fn, throwError ) => {\nif ( fn( target ) ) return target\nif ( throwError ) throw new Error ( `${ target } is not ${ name }` )\nreturn false\n}\nconst isString = ( string, throwError ) => {\nlet fn = ( target ) => typeof target === 'string'\nreturn isValid( string, 'String', fn, throwError )\n}\nconst isNumber = ( number, throwError ) => {\nlet fn = ( target ) =>  typeof target === 'number'\nreturn isValid( number, 'Number', fn, throwError )\n}\nconst isFunction = ( func, throwError ) => {\nlet fn = ( target ) => typeof target === 'function'\nreturn isValid( func, 'Function', fn, throwError )\n}\nconst isArray = ( array, throwError ) => {\nlet fn = ( target ) => Array.isArray( target )\nreturn isValid( array, 'Array', fn, throwError )\n}\nconst isDate = ( date, throwError ) => {\nlet fn = ( target ) => target instanceof Date\nreturn isValid( date, 'Date', fn, throwError )\n}\nconst isRegExp = ( regexp, throwError ) => {\nlet fn = ( target ) => regexp instanceof RegExp\nreturn isValid( regexp, 'RegExp', fn, throwError )\n}\nconst isObject = ( object, throwError ) => {\nlet fn = ( target ) => target != null && Object.prototype.toString.call( target ) === '[object Object]'\nreturn isValid( object, 'Object', fn, throwError )\n}\nconst isClass = ( Class, classConstructor, throwError ) => {\nlet fn = ( target ) => target instanceof classConstructor\nreturn isValid( Class, classConstructor.name, fn, throwError )\n}\nmodule.exports = {\nisValid,\nisString,\nisNumber,\nisFunction,\nisArray,\nisDate,\nisRegExp,\nisObject,\nisClass\n}",
                    "mapping": {},
                    "name": "lib/validation"
                },
                "VBScript": {
                    "source": "const { VBScript } = require( 'sc' )\nVBScript.AddCode(`\nFunction getTypeName( obj )\ngetTypeName = TypeName( obj )\nEnd Function\n`)\nVBScript.AddCode(`\nFunction getVarType( obj )\ngetVarType = VarType( obj )\nEnd Function\n`)\nconst TypeName = ( object ) => VBScript.Run( 'getTypeName', object )\nconst VarType = ( object ) => VBScript.Run( 'getVarType', object )\nconst Type = ( object ) => {\nlet constant = [\n'vbEmpty', // 0\n'vbNull', // 1\n'vbInteger', // 2\n'vbLong', // 3\n'vbSingle', // 4\n'vbDouble', // 5\n'vbCurrency', // 6\n'vbDate', // 7\n'vbString', // 8\n'vbObject', // 9\n'vbError', // 10\n'vbBoolean', // 11\n'vbVariant', // 12\n'vbDataObject', // 13\n]\nconstant[17] = 'vbByte'\nconstant[8192] = 'vbArray'\nlet num = VarType( object )\nreturn  num > 8192 ? `${ constant[ num - 8192 ] }[]` : constant[ num ]\n}\nmodule.exports = {\nTypeName,\nVarType,\nType\n}\n",
                    "mapping": {},
                    "name": "lib/VBScript"
                },
                "version": {
                    "source": "const io = require( 'io' )\nconst packageJSON = JSON.parse( io.readFileSync( 'package.json' ) )\nmodule.exports = packageJSON.version",
                    "mapping": {},
                    "name": "lib/version"
                }
            }
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
                    argv: ['wes'].concat( WScriptArguments ),
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
                    return require(WScript.Arguments(0))
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