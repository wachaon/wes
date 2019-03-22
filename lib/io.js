const UTF8Encoding = require('System.Text.UTF8Encoding')
const ADODB = require('ADODB.Stream')
const DOMDocument = require('Msxml2.DOMDocument')
const SHIFT_JIS = 'Shift-JIS'
const UTF_8 = 'UTF-8'
const UTF_8BOM = 'UTF-8BOM'
const UTF_8N = 'UTF-8N'
const AD_TYPE_BINARY = 1
const AD_TYPE_TEXT = 2
const AD_SAVE_CREAE_OVER_WRITE = 2

const binary2UTF8 = ( binary ) => {
    return UTF8Encoding.GetString( binary )
}

const binary2SJIS = ( binary ) => {
    let source = ''
    try {
        ADODB.Open()
        ADODB.Type = AD_TYPE_BINARY
        ADODB.Write(binary)
        ADODB.Position = 0
        ADODB.Type = AD_TYPE_TEXT
        ADODB.Charset = SHIFT_JIS
        source = ADODB.ReadText()
    } catch (error) {
        console.log( `error binary2SJIS ${ error }` )
    } finally {
        ADODB.Close()
    }
    return source
}

const binary2Hex = ( binary ) => {
    let hex = require('Msxml2.DOMDocument').createElement('hex')
    hex.dataType = 'bin.hex'
    hex.nodeTypedValue = binary
    return hex.text
}

const Hex2binary = ( text ) => {
    let hex = require('Msxml2.DOMDocument').createElement('hex')
    hex.dataType = 'bin.hex'
    hex.text = text
    return hex.nodeTypedValue
}

const UTF82bynary = ( text ) => require( 'System.Text.UTF8Encoding' ).GetBytes_4( text )

const SJIS2binary = ( text ) => {
    const stream = require( 'ADODB.Stream' )
    stream.Open()
    stream.Type = AD_TYPE_TEXT
    stream.Charset = SHIFT_JIS
    stream.WriteText( text )
    stream.Position = 0
    stream.Type = AD_TYPE_BINARY
    const res = stream.Read()
    stream.Close()
    return res
}

const ReadBinaryFile = ( path ) => {
    let source = ''
    try {
        ADODB.Type = AD_TYPE_BINARY
        ADODB.Open()
        ADODB.LoadFromFile( path )
        source = ADODB.Read()
    } catch ( error ) {
        console.log( `error ReadBinaryFile ${ error } ${ path }` )
    } finally {
        ADODB.Close()
    }
    return source
}

const autoGuessEncode = ( binary ) => {
    let hex = binary2Hex( binary )
    if ( /^efbbbf.+/.test(hex) ) return UTF_8BOM
    let hexes = []
    for ( let i = 0; i < hex.length; i++ ) {
        hexes.push( Number( `0x${ hex[i] }${ hex[i + 1] }` ) )
        i++
    }
    let len = hexes.length
    if ( len < 2 ) return UTF_8N
    let sjis = 0
    let utf8 = 0
    for ( let i = 0; i < len - 2; i++ ) {
        const hex1 = hexes[i]
        const hex2 = hexes[i + 1]
        const hex3 = hexes[i + 2]
        if (
            ( ( 0x81 <= hex1 && hex1 <= 0x9f ) || ( 0xe0 <= hex1 && hex1 <= 0xfc ) ) &&
            ( (0x40 <= hex2 && hex2 <= 0x7e ) || ( 0x80 <= hex2 && hex2 <= 0xfc ) )
        ) sjis += 2
        if (0xc0 <= hex1 && hex1 <= 0xdf && (0x80 <= hex2 && hex2 <= 0xbf)) utf8 += 2
        else if (
            0xe0 <= hex1 &&
            hex1 <= 0xef &&
            (0x80 <= hex2 && hex2 <= 0xbf) &&
            (0x80 <= hex3 && hex3 <= 0xbf)
        ) {
            utf8 += 3
            i += 2
        }
        i++
    }
    return sjis > utf8 ? SHIFT_JIS : UTF_8N
}

const read = ( filespec, enc ) => {
    let binary = ReadBinaryFile( filespec )
    let encode = enc || autoGuessEncode( binary )
    if (encode.toLowerCase() === SHIFT_JIS.toLowerCase()) return binary2SJIS( binary )
    if (encode.toLowerCase() === UTF_8BOM.toLowerCase() || encode.toLowerCase() === UTF_8.toLowerCase() ) {
        return binary2UTF8( Hex2binary( binary2Hex( binary ).replace(/^efbbbf/, '') ) )
    }
    return binary2UTF8(binary)
}

const write = ( filespec, text, enc ) => {
    const ADODB = require('ADODB.Stream')
    try {
        ADODB.Type = AD_TYPE_TEXT
        if ( enc == null ) ADODB.CharSet = enc = SHIFT_JIS
        else if ( enc.toLowerCase() === UTF_8N.toLowerCase() ) ADODB.CharSet = UTF_8
        else ADODB.CharSet = enc
        ADODB.Open()
        ADODB.WriteText( text )
    if ( enc.toLowerCase() === UTF_8N.toLowerCase() ) {
        ADODB.Position = 0
        ADODB.Type = AD_TYPE_BINARY
        ADODB.Position = 3
        let bytes = ADODB.Read()
        ADODB.Position = 0
        ADODB.SetEOS()
        ADODB.Write( bytes )
    }
        ADODB.SaveToFile( filespec, AD_SAVE_CREAE_OVER_WRITE )
    } catch ( error ) {
        return console.log( `failed to writing '${ filespec }'\n${ error }`)
    } finally {
        ADODB.Close()
    }
    return `succeeded in writing '${ filespec }'`
}

const win32Sep = '\\'
const posixSep = '/'
const split = ( path ) => toPosixSep( path ).split( posixSep )
const toWin32Sep = ( path ) => path.split( posixSep ).join( win32Sep )
const toPosixSep = ( path ) => path.split( win32Sep ).join( posixSep )
const absolute = ( path ) => toPosixSep( FSO.GetAbsolutePathName( toWin32Sep( path ) ) )
const join = ( ...paths ) => absolute( toWin32Sep( paths.reduce( ( acc, curr ) => `${ acc }${ win32Sep }${ curr }` ) ) )
const dirname = ( path ) => absolute( FSO.GetParentFolderName( toWin32Sep( path ) ) )
const fileExists = ( path ) => FSO.FileExists( toWin32Sep( path ) )

module.exports = {
    readFileSync: read,
    writeFileSync: write,
    autoGuessEncode,
    win32Sep,
    posixSep,
    toWin32Sep,
    toPosixSep,
    absolute,
    split,
    join,
    dirname,
    fileExists,
    ReadBinaryFile,
    binary2UTF8,
    binary2SJIS,
    binary2Hex,
    Hex2binary,
    UTF82bynary,
    SJIS2binary
}

