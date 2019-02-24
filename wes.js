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
        var graph = {
            "enumerator": {
                "source": "const { JScript } = require('sc')\nconst { TypeName } = require('vbs')\n\nJScript.AddCode(`\nfunction enumerator ( collection ) {\n    return new Enumerator( collection )\n}`)\n\nconst toArray = ( col ) => {\n    let res = []\n    let Enum = JScript.Run( 'enumerator', col )\n    for (; !Enum.atEnd(); Enum.moveNext()) {\n        res.push( Enum.item() )\n    }\n    Enum.moveFirst()\n    return res\n}\n\nconst Enumerator = new Proxy( () => {},{\n    construct( target, args ) {\n        const res = []\n        const e = JScript.Run( 'enumerator', args[0] )\n        for ( ; !e.atEnd(); e.moveNext() ) {\n            res.push( e.item() )\n        }\n        return res\n    }\n} )\n\nclass Enumerators extends Array {\n    constructor( collection ) {\n        let res = []\n        if (TypeName( collection ) === 'Long') {\n            res = collection\n        } else {\n            res = toArray( collection )\n        }\n        super( ...res )\n\n        let i = 0\n        Object.defineProperties( this, {\n            moveNext: { value() { i++ } },\n            atEnd: { value() { return !( i < this.length ) } },\n            moveFirst: { value() { return ( i = 0 ) } },\n            item: { value(num) { return num != null ? this[ num ] : this[ i ] } }\n        } )\n    }\n    map( callback ) {\n        var T, A, k\n        if ( this == null ) {\n            throw new TypeError( 'this is null or not defined' )\n        }\n        var O = Object( this )\n        var len = O.length >>> 0\n        if ( typeof callback !== 'function' ) {\n            throw new TypeError(callback + ' is not a function' )\n        }\n        if ( arguments.length > 1) {\n            T = arguments[1]\n        }\n        A = new Array(len)\n        k = 0\n        while (k < len) {\n            var kValue, mappedValue\n            if ( k in O ) {\n                kValue = O[k]\n                mappedValue = callback.call(T, kValue, k, O)\n                A[k] = mappedValue\n            }\n            k++\n        }\n        return A\n    }\n    filter( func, thisArg ) {\n        'use strict'\n        if (\n            !(\n                ( typeof func === 'Function' || typeof func === 'function' ) &&\n                this\n            )\n        )\n            throw new TypeError()\n        var len = this.length >>> 0,\n            res = new Array( len ),\n            t = this,\n            c = 0,\n            i = -1\n        if ( thisArg === undefined ) {\n            while ( ++i !== len ) {\n                if (i in this) {\n                    if ( func( t[ i ], i, t ) ) {\n                        res[ c++ ] = t[ i ]\n                    }\n                }\n            }\n        } else {\n            while ( ++i !== len ) {\n                if ( i in this ) {\n                    if ( func.call( thisArg, t[ i ], i, t ) ) {\n                        res[ c++ ] = t[ i ]\n                    }\n                }\n            }\n        }\n        res.length = c\n        return res\n    }\n}\n\nEnumerator.Enumerator = Enumerators\n\nmodule.exports = Enumerator",
                "mapping": {},
                "name": null
            },
            "io": {
                "source": "const UTF8Encoding = require('System.Text.UTF8Encoding')\nconst ADODB = require('ADODB.Stream')\nconst DOMDocument = require('Msxml2.DOMDocument')\nconst SHIFT_JIS = 'Shift-JIS'\nconst UTF_8 = 'UTF-8'\nconst UTF_8BOM = 'UTF-8BOM'\nconst UTF_8N = 'UTF-8N'\nconst AD_TYPE_BINARY = 1\nconst AD_TYPE_TEXT = 2\nconst AD_SAVE_CREAE_OVER_WRITE = 2\n\nconst binary2UTF8 = ( binary ) => {\n    return UTF8Encoding.GetString( binary )\n}\n\nconst binary2SJIS = ( binary ) => {\n    let source = ''\n    try {\n        ADODB.Open()\n        ADODB.Type = AD_TYPE_BINARY\n        ADODB.Write(binary)\n        ADODB.Position = 0\n        ADODB.Type = AD_TYPE_TEXT\n        ADODB.Charset = SHIFT_JIS\n        source = ADODB.ReadText()\n    } catch (error) {\n        console.log( `error binary2SJIS ${ error }` )\n    } finally {\n        ADODB.Close()\n    }\n    return source\n}\n\nconst binary2Hex = ( binary ) => {\n    let hex = require('Msxml2.DOMDocument').createElement('hex')\n    hex.dataType = 'bin.hex'\n    hex.nodeTypedValue = binary\n    return hex.text\n}\n\nconst Hex2binary = ( text ) => {\n    let hex = require('Msxml2.DOMDocument').createElement('hex')\n    hex.dataType = 'bin.hex'\n    hex.text = text\n    return hex.nodeTypedValue\n}\n\nconst UTF82bynary = ( text ) => require( 'System.Text.UTF8Encoding' ).GetBytes_4( text )\n\nconst SJIS2binary = ( text ) => {\n    const stream = require( 'ADODB.Stream' )\n    stream.Open()\n    stream.Type = AD_TYPE_TEXT\n    stream.Charset = SHIFT_JIS\n    stream.WriteText( text )\n    stream.Position = 0\n    stream.Type = AD_TYPE_BINARY\n    const res = stream.Read()\n    stream.Close()\n    return res\n}\n\nconst ReadBinaryFile = ( path ) => {\n    let source = ''\n    try {\n        ADODB.Type = AD_TYPE_BINARY\n        ADODB.Open()\n        ADODB.LoadFromFile( path )\n        source = ADODB.Read()\n    } catch ( error ) {\n        console.log( `error ReadBinaryFile ${ error } ${ path }` )\n    } finally {\n        ADODB.Close()\n    }\n    return source\n}\n\nconst autoGuessEncode = ( binary ) => {\n    let hex = binary2Hex( binary )\n    if ( /^efbbbf.+/.test(hex) ) return UTF_8BOM\n    let hexes = []\n    for ( let i = 0; i < hex.length; i++ ) {\n        hexes.push( Number( `0x${ hex[i] }${ hex[i + 1] }` ) )\n        i++\n    }\n    let len = hexes.length\n    if ( len < 2 ) return UTF_8N\n    let sjis = 0\n    let utf8 = 0\n    for ( let i = 0; i < len - 2; i++ ) {\n        const hex1 = hexes[i]\n        const hex2 = hexes[i + 1]\n        const hex3 = hexes[i + 2]\n        if (\n            ( ( 0x81 <= hex1 && hex1 <= 0x9f ) || ( 0xe0 <= hex1 && hex1 <= 0xfc ) ) &&\n            ( (0x40 <= hex2 && hex2 <= 0x7e ) || ( 0x80 <= hex2 && hex2 <= 0xfc ) )\n        ) sjis += 2\n        if (0xc0 <= hex1 && hex1 <= 0xdf && (0x80 <= hex2 && hex2 <= 0xbf)) utf8 += 2\n        else if (\n            0xe0 <= hex1 &&\n            hex1 <= 0xef &&\n            (0x80 <= hex2 && hex2 <= 0xbf) &&\n            (0x80 <= hex3 && hex3 <= 0xbf)\n        ) {\n            utf8 += 3\n            i += 2\n        }\n        i++\n    }\n    return sjis > utf8 ? SHIFT_JIS : UTF_8N\n}\n\nconst read = ( filespec, enc ) => {\n    let binary = ReadBinaryFile( filespec )\n    let encode = enc || autoGuessEncode( binary )\n    if (encode.toLowerCase() === SHIFT_JIS.toLowerCase()) return binary2SJIS( binary )\n    if (encode.toLowerCase() === UTF_8BOM.toLowerCase() || encode.toLowerCase() === UTF_8.toLowerCase() ) {\n        return binary2UTF8( Hex2binary( binary2Hex( binary ).replace(/^efbbbf/, '') ) )\n    }\n    return binary2UTF8(binary)\n}\n\nconst write = ( filespec, text, enc ) => {\n    const ADODB = require('ADODB.Stream')\n    try {\n        ADODB.Type = AD_TYPE_TEXT\n        if ( enc == null ) ADODB.CharSet = enc = SHIFT_JIS\n        else if ( enc.toLowerCase() === UTF_8N.toLowerCase() ) ADODB.CharSet = UTF_8\n        else ADODB.CharSet = enc\n        ADODB.Open()\n        ADODB.WriteText( text )\n    if ( enc.toLowerCase() === UTF_8N.toLowerCase() ) {\n        ADODB.Position = 0\n        ADODB.Type = AD_TYPE_BINARY\n        ADODB.Position = 3\n        let bytes = ADODB.Read()\n        ADODB.Position = 0\n        ADODB.SetEOS()\n        ADODB.Write( bytes )\n    }\n        ADODB.SaveToFile( filespec, AD_SAVE_CREAE_OVER_WRITE )\n    } catch ( error ) {\n        return console.log( `failed to writing '${ filespec }'\\n${ error }`)\n    } finally {\n        ADODB.Close()\n    }\n    return `succeeded in writing '${ filespec }'`\n}\n\nconst win32Sep = '\\\\'\nconst posixSep = '/'\nconst toWin32Sep = ( path ) => path.split( posixSep ).join( win32Sep )\nconst toPosixSep = ( path ) => path.split( win32Sep ).join( posixSep )\nconst absolute = ( path ) => toPosixSep( FSO.GetAbsolutePathName( toWin32Sep( path ) ) )\nconst split = ( path ) => toPosixSep( path ).split( posixSep )\nconst join = ( ...paths ) => absolute( toWin32Sep( paths.reduce( ( acc, curr ) => `${ acc }${ win32Sep }${ curr }` ) ) )\nconst dirname = ( path ) => absolute( FSO.GetParentFolderName( toWin32Sep( path ) ) )\nconst fileExists = ( path ) => FSO.FileExists( toWin32Sep( path ) )\n\nmodule.exports = {\n    readFileSync: read,\n    writeFileSync: write,\n    autoGuessEncode,\n    win32Sep,\n    posixSep,\n    toWin32Sep,\n    toPosixSep,\n    absolute,\n    split,\n    join,\n    dirname,\n    fileExists,\n    ReadBinaryFile,\n    binary2UTF8,\n    binary2SJIS,\n    binary2Hex,\n    Hex2binary,\n    UTF82bynary,\n    SJIS2binary\n}\n\n",
                "mapping": {},
                "name": null
            },
            "log": {
                "source": "const log = ( code ) => {\n    let res = code()\n    switch ( true ) {\n        case typeof res === 'function' || res instanceof RegExp:\n            res = res.toString()\n            break\n        case res instanceof Date:\n            res = res.toISOString()\n            break\n        case res === ( function(){} )():\n            res = 'undefined'\n            break\n        case res === null:\n            res = null\n            break\n        default:\n            res = JSON.stringify( res, null, 2 )\n    }\n    const { brightGreen: green } = console.ansi\n    console.log( code.toString() + green + ' // => ' + res )\n}\n\nmodule.exports = log",
                "mapping": {},
                "name": null
            },
            "sc": {
                "source": "\nconst ScriptControl = ( language ) => {\n    const sc = require( 'ScriptControl' )\n    sc.Language = language\n    return {\n        AddCode( code ) {\n            sc.AddCode( code )\n        },\n        Run( name, ...args ) {\n            return sc.run( name, ...args )\n        }\n    }\n}\n\nmodule.exports = {\n    JScript: ScriptControl( 'JScript' ),\n    VBScript: ScriptControl( 'VBScript' )\n}\n",
                "mapping": {},
                "name": null
            },
            "test": {
                "source": "\n    let depth = 0\n    let caption = []\n    let indent = \"\"\n    let rate = 4\n    let space = \" \"\n    let noop = ( () => {} )\n    let n = '\\n'\n\n    const checkMark = '\\u2714'\n\n    const {\n        brightRed: red,\n        brightGreen: green,\n        brightYellow: yellow,\n        brightMagenta: pink,\n        gray\n    } = console.ansi\n\n    const describe = ( title, fn ) => {\n        let s = depth ? '' : n\n        depth++\n        indent = space.repeat( depth * rate )\n        console.log( s + indent + title + n )\n        fn()\n        depth--\n    }\n\n    const it = ( message, fn ) => {\n        depth++\n        indent = space.repeat( depth * rate )\n        const printCode = ( code ) => {\n            let source = code.toString().split( '\\t' ).join( '    ' ).split( /\\r?\\n/ )\n            if ( source.length < 2 ) return `${ space.repeat( indent + rate ) }${ source[0] }`\n            source[0] = `${ source[ source.length - 1 ].match( /^\\s+/ )[0] }${ source[0] }`\n            const sp = source.map( v => v.match( /^\\s+/ )[0].length )\n            const min = Math.min.apply( null, sp )\n            return source.map( ( v ) => {\n                return `${ space.repeat( ( depth + 1 ) * rate ) }${ v.replace( space.repeat( min ), \"\"  ) }`\n            } ).join( \"\\n\" )\n        }\n\n        try {\n            fn()\n            console.log( `${ indent }${ gray }${ message } ${ green }${ checkMark }` )\n        } catch ( e ) {\n            console.log( `${ indent }${ pink }${ message }\\n${ yellow }${ printCode( fn ) } ${ red }// => ${ e.message }${ n }` )\n        } finally {\n            depth--\n        }\n    }\n\n    const assert = ( assertion ) => {\n        return assert.ok( assertion )\n    }\n    assert.ok = ( assertion ) => {\n        let res = typeof assertion === 'function' ? assertion() : assertion\n        if ( !res ) throw new Error( res )\n    }\n    assert.ng = ( assertion ) => {\n        let res = typeof assertion === 'function' ? assertion() : assertion\n        if ( res ) throw new Error( res )\n    }\n\n    module.exports = {\n        describe,\n        it,\n        assert\n    }\n\n\n\n",
                "mapping": {},
                "name": null
            },
            "vbs": {
                "source": "const { VBScript } = require( 'sc' )\n\nVBScript.AddCode(`\nFunction getTypeName( obj )\n    getTypeName = TypeName( obj )\nEnd Function\n`)\n\nVBScript.AddCode(`\nFunction getVarType( obj )\n    getVarType = VarType( obj )\nEnd Function\n`)\n\n\nconst TypeName = ( object ) => VBScript.Run( 'getTypeName', object )\nconst VarType = ( object ) => VBScript.Run( 'getVarType', object )\nconst Type = ( object ) => {\n    const constant = [\n        'vbEmpty', // 0\n        'vbNull', // 1\n        'vbInteger', // 2\n        'vbLong', // 3\n        'vbSingle', // 4\n        'vbDouble', // 5\n        'vbCurrency', // 6\n        'vbDate', // 7\n        'vbString', // 8\n        'vbObject', // 9\n        'vbError', // 10\n        'vbBoolean', // 11\n        'vbVariant', // 12\n        'vbDataObject', // 13\n    ]\n    let num = VarType( object )\n    return  num > 8192 ? `${ constant[ num - 8192 ] }[]` : constant[ num ]\n}\nType[17] = 'vbByte'\nType[8192] = 'vbArray'\n\nmodule.exports = {\n    TypeName,\n    VarType,\n    Type\n}\n",
                "mapping": {},
                "name": null
            }
        }
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
