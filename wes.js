try {
    var WShell = WScript.CreateObject('WScript.Shell')
    var console = {
        log: function(args) {
            var res
            if (WScript.Arguments.Named.Exists('monotone')) {
                res = args.replace(/(\x9B|\x1B\[)[0-?]*[ -\/]*[@-~]/g, '')
            } else {
                res = args + console.ansi.clear
            }
            WScript.StdErr.WriteLine(res)
        },
        print: function(args) {
            if (WScript.Arguments.Named.Exists('monotone')) {
                res = args.replace(/(\u009B|\u001B\[)[0-?]*[ -\/]*[@-~]/g, '')
            } else {
                res = args + console.ansi.clear
            }
            WScript.StdErr.Write(args)
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
    "day": {
        "source": "class Day extends Date {\n[Symbol.toPrimitive] ( hint ) {\nif ( hint === 'number' ) return this.getTime()\nelse {\nlet year = this.getFullYear()\nlet month = ( \"0\" + ( this.getMonth() + 1 ) ).slice( -2 )\nlet date = ( \"0\" + ( this.getDate() ) ).slice( -2 )\nlet hours = ( \"0\" + ( this.getHours() ) ).slice( -2 )\nlet minutes = ( \"0\" + ( this.getMinutes() ) ).slice( -2 )\nlet seconds = ( \"0\" + ( this.getSeconds() ) ).slice( -2 )\nlet milliseconds = ( \"00\" + ( this.getMilliseconds() ) ).slice( -3 )\nreturn `${ year }/${ month }/${ date } ${ hours }:${ minutes }:${ seconds }.${ milliseconds }`\n}\n}\n}\nmodule.exports = Day",
        "mapping": {},
        "name": "lib/day"
    },
    "enumerator": {
        "source": "const { JScript } = require('sc')\nconst { TypeName } = require('VBScript')\nJScript.AddCode(`\nfunction enumerator ( collection ) {\nreturn new Enumerator( collection )\n}`)\nconst toArray = ( col ) => {\nlet res = []\nlet Enum = JScript.Run( 'enumerator', col )\nfor (; !Enum.atEnd(); Enum.moveNext()) {\nres.push( Enum.item() )\n}\nEnum.moveFirst()\nreturn res\n}\nconst Enumerator = new Proxy( () => {},{\nconstruct( target, args ) {\nconst res = []\nconst e = JScript.Run( 'enumerator', args[0] )\nfor ( ; !e.atEnd(); e.moveNext() ) {\nres.push( e.item() )\n}\nreturn res\n}\n} )\nclass Enumerators extends Array {\nconstructor( collection ) {\nlet res = []\nif (TypeName( collection ) === 'Long') {\nres = collection\n} else {\nres = toArray( collection )\n}\nsuper( ...res )\nlet i = 0\nObject.defineProperties( this, {\nmoveNext: { value() { i++ } },\natEnd: { value() { return !( i < this.length ) } },\nmoveFirst: { value() { return ( i = 0 ) } },\nitem: { value(num) { return num != null ? this[ num ] : this[ i ] } }\n} )\n}\nmap( callback ) {\nvar T, A, k\nif ( this == null ) {\nthrow new TypeError( 'this is null or not defined' )\n}\nvar O = Object( this )\nvar len = O.length >>> 0\nif ( typeof callback !== 'function' ) {\nthrow new TypeError(callback + ' is not a function' )\n}\nif ( arguments.length > 1) {\nT = arguments[1]\n}\nA = new Array(len)\nk = 0\nwhile (k < len) {\nvar kValue, mappedValue\nif ( k in O ) {\nkValue = O[k]\nmappedValue = callback.call(T, kValue, k, O)\nA[k] = mappedValue\n}\nk++\n}\nreturn A\n}\nfilter( func, thisArg ) {\n'use strict'\nif (\n!(\n( typeof func === 'Function' || typeof func === 'function' ) &&\nthis\n)\n)\nthrow new TypeError()\nvar len = this.length >>> 0,\nres = new Array( len ),\nt = this,\nc = 0,\ni = -1\nif ( thisArg === undefined ) {\nwhile ( ++i !== len ) {\nif (i in this) {\nif ( func( t[ i ], i, t ) ) {\nres[ c++ ] = t[ i ]\n}\n}\n}\n} else {\nwhile ( ++i !== len ) {\nif ( i in this ) {\nif ( func.call( thisArg, t[ i ], i, t ) ) {\nres[ c++ ] = t[ i ]\n}\n}\n}\n}\nres.length = c\nreturn res\n}\n}\nEnumerator.Enumerator = Enumerators\nmodule.exports = Enumerator",
        "mapping": {},
        "name": "lib/enumerator"
    },
    "io": {
        "source": "const UTF8Encoding = require('System.Text.UTF8Encoding')\nconst ADODB = require('ADODB.Stream')\nconst DOMDocument = require('Msxml2.DOMDocument')\nconst SHIFT_JIS = 'Shift-JIS'\nconst UTF_8 = 'UTF-8'\nconst UTF_8BOM = 'UTF-8BOM'\nconst UTF_8N = 'UTF-8N'\nconst AD_TYPE_BINARY = 1\nconst AD_TYPE_TEXT = 2\nconst AD_SAVE_CREAE_OVER_WRITE = 2\nconst binary2UTF8 = ( binary ) => {\nreturn UTF8Encoding.GetString( binary )\n}\nconst binary2SJIS = ( binary ) => {\nlet source = ''\ntry {\nADODB.Open()\nADODB.Type = AD_TYPE_BINARY\nADODB.Write(binary)\nADODB.Position = 0\nADODB.Type = AD_TYPE_TEXT\nADODB.Charset = SHIFT_JIS\nsource = ADODB.ReadText()\n} catch (error) {\nconsole.log( `error binary2SJIS ${ error }` )\n} finally {\nADODB.Close()\n}\nreturn source\n}\nconst binary2Hex = ( binary ) => {\nlet hex = require('Msxml2.DOMDocument').createElement('hex')\nhex.dataType = 'bin.hex'\nhex.nodeTypedValue = binary\nreturn hex.text\n}\nconst Hex2binary = ( text ) => {\nlet hex = require('Msxml2.DOMDocument').createElement('hex')\nhex.dataType = 'bin.hex'\nhex.text = text\nreturn hex.nodeTypedValue\n}\nconst UTF82bynary = ( text ) => require( 'System.Text.UTF8Encoding' ).GetBytes_4( text )\nconst SJIS2binary = ( text ) => {\nconst stream = require( 'ADODB.Stream' )\nstream.Open()\nstream.Type = AD_TYPE_TEXT\nstream.Charset = SHIFT_JIS\nstream.WriteText( text )\nstream.Position = 0\nstream.Type = AD_TYPE_BINARY\nconst res = stream.Read()\nstream.Close()\nreturn res\n}\nconst ReadBinaryFile = ( path ) => {\nlet source = ''\ntry {\nADODB.Type = AD_TYPE_BINARY\nADODB.Open()\nADODB.LoadFromFile( path )\nsource = ADODB.Read()\n} catch ( error ) {\nconsole.log( `error ReadBinaryFile ${ error } ${ path }` )\n} finally {\nADODB.Close()\n}\nreturn source\n}\nconst autoGuessEncode = ( binary ) => {\nlet hex = binary2Hex( binary )\nif ( /^efbbbf.+/.test(hex) ) return UTF_8BOM\nlet hexes = []\nfor ( let i = 0; i < hex.length; i++ ) {\nhexes.push( Number( `0x${ hex[i] }${ hex[i + 1] }` ) )\ni++\n}\nlet len = hexes.length\nif ( len < 2 ) return UTF_8N\nlet sjis = 0\nlet utf8 = 0\nfor ( let i = 0; i < len - 2; i++ ) {\nconst hex1 = hexes[i]\nconst hex2 = hexes[i + 1]\nconst hex3 = hexes[i + 2]\nif (\n( ( 0x81 <= hex1 && hex1 <= 0x9f ) || ( 0xe0 <= hex1 && hex1 <= 0xfc ) ) &&\n( (0x40 <= hex2 && hex2 <= 0x7e ) || ( 0x80 <= hex2 && hex2 <= 0xfc ) )\n) sjis += 2\nif (0xc0 <= hex1 && hex1 <= 0xdf && (0x80 <= hex2 && hex2 <= 0xbf)) utf8 += 2\nelse if (\n0xe0 <= hex1 &&\nhex1 <= 0xef &&\n(0x80 <= hex2 && hex2 <= 0xbf) &&\n(0x80 <= hex3 && hex3 <= 0xbf)\n) {\nutf8 += 3\ni += 2\n}\ni++\n}\nreturn sjis > utf8 ? SHIFT_JIS : UTF_8N\n}\nconst read = ( filespec, enc ) => {\nlet binary = ReadBinaryFile( filespec )\nlet encode = enc || autoGuessEncode( binary )\nif (encode.toLowerCase() === SHIFT_JIS.toLowerCase()) return binary2SJIS( binary )\nif (encode.toLowerCase() === UTF_8BOM.toLowerCase() || encode.toLowerCase() === UTF_8.toLowerCase() ) {\nreturn binary2UTF8( Hex2binary( binary2Hex( binary ).replace(/^efbbbf/, '') ) )\n}\nreturn binary2UTF8(binary)\n}\nconst write = ( filespec, text, enc ) => {\nconst ADODB = require('ADODB.Stream')\ntry {\nADODB.Type = AD_TYPE_TEXT\nif ( enc == null ) ADODB.CharSet = enc = SHIFT_JIS\nelse if ( enc.toLowerCase() === UTF_8N.toLowerCase() ) ADODB.CharSet = UTF_8\nelse ADODB.CharSet = enc\nADODB.Open()\nADODB.WriteText( text )\nif ( enc.toLowerCase() === UTF_8N.toLowerCase() ) {\nADODB.Position = 0\nADODB.Type = AD_TYPE_BINARY\nADODB.Position = 3\nlet bytes = ADODB.Read()\nADODB.Position = 0\nADODB.SetEOS()\nADODB.Write( bytes )\n}\nADODB.SaveToFile( filespec, AD_SAVE_CREAE_OVER_WRITE )\n} catch ( error ) {\nreturn console.log( `failed to writing '${ filespec }'\\n${ error }`)\n} finally {\nADODB.Close()\n}\nreturn `succeeded in writing '${ filespec }'`\n}\nconst win32Sep = '\\\\'\nconst posixSep = '/'\nconst toWin32Sep = ( path ) => path.split( posixSep ).join( win32Sep )\nconst toPosixSep = ( path ) => path.split( win32Sep ).join( posixSep )\nconst absolute = ( path ) => toPosixSep( FSO.GetAbsolutePathName( toWin32Sep( path ) ) )\nconst split = ( path ) => toPosixSep( path ).split( posixSep )\nconst join = ( ...paths ) => absolute( toWin32Sep( paths.reduce( ( acc, curr ) => `${ acc }${ win32Sep }${ curr }` ) ) )\nconst dirname = ( path ) => absolute( FSO.GetParentFolderName( toWin32Sep( path ) ) )\nconst fileExists = ( path ) => FSO.FileExists( toWin32Sep( path ) )\nmodule.exports = {\nreadFileSync: read,\nwriteFileSync: write,\nautoGuessEncode,\nwin32Sep,\nposixSep,\ntoWin32Sep,\ntoPosixSep,\nabsolute,\nsplit,\njoin,\ndirname,\nfileExists,\nReadBinaryFile,\nbinary2UTF8,\nbinary2SJIS,\nbinary2Hex,\nHex2binary,\nUTF82bynary,\nSJIS2binary\n}\n",
        "mapping": {},
        "name": "lib/io"
    },
    "JScript": {
        "source": "const { JScript } = require( 'sc' )\nJScript.AddCode(`\nfunction enumerator ( collection ) {\nreturn new Enumerator( collection )\n}`)\nconst Enumerator = new Proxy( () => {},{\nconstruct( target, args ) {\nconst res = []\nconst e = JScript.Run( 'enumerator', args[0] )\nfor ( ; !e.atEnd(); e.moveNext() ) {\nres.push( e.item() )\n}\nreturn res\n}\n} )\nmodule.exports = {\nEnumerator\n}",
        "mapping": {},
        "name": "lib/JScript"
    },
    "log": {
        "source": "const log = ( code ) => {\nlet res = code()\nswitch ( true ) {\ncase typeof res === 'function' || res instanceof RegExp:\nres = res.toString()\nbreak\ncase res instanceof Date:\nres = res[Symbol.toPrimitive]( \"string\" )\nbreak\ncase res === ( function(){} )():\nres = 'undefined'\nbreak\ncase res === null:\nres = null\nbreak\ndefault:\nres = JSON.stringify( res, null, 2 )\n}\nconst { brightGreen: green } = console.ansi\nconsole.log( code.toString() + green + ' // => ' + res )\n}\nmodule.exports = log",
        "mapping": {},
        "name": "lib/log"
    },
    "sc": {
        "source": "const ScriptControl = ( language ) => {\nconst sc = require( 'ScriptControl' )\nsc.Language = language\nreturn {\nAddCode( code ) {\nsc.AddCode( code )\n},\nRun( name, ...args ) {\nreturn sc.run( name, ...args )\n}\n}\n}\nmodule.exports = {\nJScript: ScriptControl( 'JScript' ),\nVBScript: ScriptControl( 'VBScript' )\n}\n",
        "mapping": {},
        "name": "lib/sc"
    },
    "StringHelper": {
        "source": "const LF = '\\n'\nconst CR = '\\r'\nconst CRLF = CR + LF\nconst SPACE = ' '\nconst TAB = '\\t'\nconst NONE = ''\nconst REG_LINE_SEP = /\\r?\\n/g\nconst REG_LF = /\\n/g\nconst REG_CRLF = /\\r\\n/g\nconst REG_SPACE = /\\s/g\nconst REG_SPACES = /\\s+/g\nconst REG_BLANK_LINE = /^\\s+$/\nconst REG_TAB = /\\t/g\nconst REG_TABS = /\\t+/g\nconst trimStarts = ( string ) => {\nreturn string.replace( /^([\\s\\r\\n]+\\n)/, NONE )\n}\nconst trimEnds = ( string ) => {\nreturn string.replace( /(\\n[\\s\\r\\n]+)$/, NONE )\n}\nconst trim = ( string ) => {\nreturn trimStarts( trimEnds( string ) )\n}\nconst splitLines = ( string, mod, start, end, ) => {\nconst sep = REG_CRLF.test( string )? CRLF : LF\nreturn string.split( REG_LINE_SEP )\n.filter( ( value, i ) => start < i % mod &&\ni % mod < end ||\nREG_BLANK_LINE.test( value )\n)\n.join( sep )\n}\nmodule.exports = {\nLF,\nCR,\nCRLF,\nSPACE,\nTAB,\nNONE,\nREG_LINE_SEP,\nREG_LF,\nREG_CRLF,\nREG_SPACE,\nREG_SPACES,\nREG_BLANK_LINE,\nREG_TAB,\nREG_TABS,\ntrimStarts,\ntrimEnds,\ntrim,\nsplitLines\n}",
        "mapping": {},
        "name": "lib/StringHelper"
    },
    "test": {
        "source": "const { LF, TAB, REG_CRLF, SPACE } = require( 'StringHelper' )\nlet depth = 0\nlet indent = \"\"\nlet rate = 4\nlet n = LF\nconst checkMark = '\\u2714'\nconst {\nbrightRed: red,\nbrightGreen: green,\nbrightYellow: yellow,\nbrightMagenta: pink,\ngray\n} = console.ansi\nconst describe = ( title, fn ) => {\ndepth++\nindent = SPACE.repeat( depth * rate )\nconsole.log( LF + indent + title + LF )\nfn()\ndepth--\n}\nconst it = ( message, fn ) => {\ndepth++\nindent = SPACE.repeat( depth * rate )\nconst printCode = ( code ) => {\nlet source = code.toString().split( TAB ).join( '    ' ).split( REG_CRLF )\nif ( source.length < 2 ) return `${ SPACE.repeat( indent + rate ) }${ source[0] }`\nsource[0] = `${ source[ source.length - 1 ].match( /^\\s+/ )[0] }${ source[0] }`\nconst sp = source.map( v => v.match( /^\\s+/ )[0].length )\nconst min = Math.min.apply( null, sp )\nreturn source.map( ( v ) => {\nreturn `${ SPACE.repeat( ( depth + 1 ) * rate ) }${ v.replace( SPACE.repeat( min ), \"\"  ) }`\n} ).join( \"\\n\" )\n}\ntry {\nfn()\nconsole.log( `${ indent }${ gray }${ message } ${ green }${ checkMark }` )\n} catch ( e ) {\nconsole.log( `${ indent }${ pink }${ message }\\n${ yellow }${ printCode( fn ) } ${ red }// => ${ e.message }${ n }` )\n} finally {\ndepth--\n}\n}\nconst assert = ( assertion ) => {\nreturn assert.ok( assertion )\n}\nassert.ok = ( assertion ) => {\nlet res = typeof assertion === 'function' ? assertion() : assertion\nif ( !res ) throw new Error( res )\n}\nassert.ng = ( assertion ) => {\nlet res = typeof assertion === 'function' ? assertion() : assertion\nif ( res ) throw new Error( res )\n}\nmodule.exports = {\ndescribe,\nit,\nassert\n}\n",
        "mapping": {},
        "name": "lib/test"
    },
    "validation": {
        "source": "const isValid = ( target, name, fn, throwError ) => {\nif ( fn( target ) ) return true\nif ( throwError ) throw new Error ( `${ target } is not ${ name }` )\nreturn false\n}\nconst isString = ( string, throwError ) => {\nlet fn = ( target ) => typeof target === 'string'\nreturn isValid( string, 'String', fn, throwError )\n}\nconst isNumber = ( number, throwError ) => {\nlet fn = ( target ) =>  typeof target === 'number'\nreturn isValid( number, 'Number', fn, throwError )\n}\nconst isFunction = ( func, throwError ) => {\nlet fn = ( target ) => typeof target === 'function'\nreturn isValid( func, 'Function', fn, throwError )\n}\nconst isArray = ( array, throwError ) => {\nlet fn = ( target ) => Array.isArray( target )\nreturn isValid( array, 'Array', fn, throwError )\n}\nconst isDate = ( date, throwError ) => {\nlet fn = ( target ) => target instanceof Date\nreturn isValid( date, 'Date', fn, throwError )\n}\nconst isRegExp = ( regexp, throwError ) => {\nlet fn = ( target ) => regexp instanceof RegExp\nreturn isValid( regexp, 'RegExp', fn, throwError )\n}\nconst isObject = ( object, throwError ) => {\nlet fn = ( target ) => target != null && Object.prototype.toString.call( target ) === '[object Object]'\nreturn isValid( object, 'Object', fn, throwError )\n}\nmodule.exports = {\nisValid,\nisString,\nisNumber,\nisFunction,\nisArray,\nisDate,\nisRegExp,\nisObject\n}",
        "mapping": {},
        "name": "lib/validation"
    },
    "VBScript": {
        "source": "const { VBScript } = require( 'sc' )\nVBScript.AddCode(`\nFunction getTypeName( obj )\ngetTypeName = TypeName( obj )\nEnd Function\n`)\nVBScript.AddCode(`\nFunction getVarType( obj )\ngetVarType = VarType( obj )\nEnd Function\n`)\nconst TypeName = ( object ) => VBScript.Run( 'getTypeName', object )\nconst VarType = ( object ) => VBScript.Run( 'getVarType', object )\nconst Type = ( object ) => {\nlet constant = [\n'vbEmpty', // 0\n'vbNull', // 1\n'vbInteger', // 2\n'vbLong', // 3\n'vbSingle', // 4\n'vbDouble', // 5\n'vbCurrency', // 6\n'vbDate', // 7\n'vbString', // 8\n'vbObject', // 9\n'vbError', // 10\n'vbBoolean', // 11\n'vbVariant', // 12\n'vbDataObject', // 13\n]\nconstant[17] = 'vbByte'\nconstant[8192] = 'vbArray'\nlet num = VarType( object )\nreturn  num > 8192 ? `${ constant[ num - 8192 ] }[]` : constant[ num ]\n}\nmodule.exports = {\nTypeName,\nVarType,\nType\n}\n",
        "mapping": {},
        "name": "lib/VBScript"
    },
    "version": {
        "source": "module.exports = \"0.1.0\"",
        "mapping": {},
        "name": "lib/version"
    }
}
        );
        function require(id, option) {
            if (graph[id] != null) {
                if (!id.startsWith('{')) stack.push([null, null])
                var code = graph[id].code
                var source = graph[id].source
                var mapping = graph[id].mapping
                function localRequire(name, option) {
                    var res = mapping[name]
                    if (res == null)
                        return require(name, option && !option.startsWith('_')
                            ? option
                            : null)
                    else
                        return require(res, option && !option.startsWith('_')
                            ? option
                            : null)
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
                if (option && option.startsWith('_'))
                    return WScript.CreateObject(id, option)
                else return WScript.CreateObject(id)
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
                            option && !option.startsWith('_') ? option : null
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
                        option && !option.startsWith('_') ? option : null
                    )
                    .replace(/\r/g, ''),
                name: entry.match(/([^\/]+)$/)[0] + '',
                mapping: {}
            }
            history.push([entry, uuid])
            return require(uuid, option ? option : null)
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