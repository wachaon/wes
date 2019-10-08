const ADODB = require('ADODB.Stream')
const FSO = require( 'Scripting.FileSystemObject' )
const pathname = require( 'pathname' )
const chardet = require( 'chardet' )
const Buffer = require( 'buffer' )
const { Type } = require( 'VBScript' )
const http = require( 'Msxml2.XMLHTTP' )

const {
    ByteToHex,
    HexToByte
} = require( 'hex' )
const VB_BYTE = 'vbByte[]'

const AD_TYPE_BINARY = 1
const AD_TYPE_TEXT = 2
const AD_SAVE_CREAE_OVER_WRITE = 2
const UTF_8 = 'UTF-8'
const UTF_8BOM = 'UTF-8BOM'
const UTF_8N = 'UTF-8N'

const readFileSync = ( filespec, options ) => {
    if ( options == null ) return new Buffer( readByteFile( filespec ) )
    return readTextFileSync( filespec, options )
}

const readTextFileSync = ( filespec, options ) => {
    let byte = readByteFile( filespec )
    let buffer = new Buffer( byte )
    let encoding = options != null ? options : chardet.detect( buffer )
    if ( encoding.toUpperCase().startsWith( UTF_8 ) ) {
        encoding = UTF_8
    }
    if( encoding === UTF_8 &&
        buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf ) {
            //byte = splitUtf8Bom( byte )
            byte = HexToByte( ByteToHex( byte ).replace( /^efbbbf/, '' ) )
    }
    return Byte2Text( byte, encoding )
}

const writeFileSync = ( filespec, data, options ) => {
    if ( data instanceof Buffer ) data = data.toByte()
    if ( Type( data ) === VB_BYTE ) {
        try {
            ADODB.Open()
            ADODB.Position = 0
            ADODB.SetEOS()
            ADODB.Type = AD_TYPE_BINARY
            ADODB.Write( data )
            ADODB.SaveToFile( filespec, AD_SAVE_CREAE_OVER_WRITE )
            ADODB.Close()
            return `Save operation succeeded '${ filespec }'`
        } catch ( error ) {
            console.log( `Save operation failed '${ filespec }'\n${ error }`)
        }
    }
    return writeTextFileSync( filespec, data, options )
}

const writeTextFileSync = ( filespec, text, enc ) => {
    let spliBbom = false
    try {
        ADODB.Open()
        ADODB.Position = 0
        ADODB.SetEOS()
        ADODB.Type = AD_TYPE_TEXT
        if ( enc != null ) {
            const _enc = enc.toUpperCase()
            if ( _enc.startsWith( UTF_8 ) ) ADODB.CharSet = UTF_8
            else ADODB.CharSet = enc
            if ( _enc === UTF_8BOM ) spliBbom = false
            else if ( _enc === UTF_8N ) spliBbom = true
            else spliBbom = false
        }
        ADODB.WriteText( text )
        if ( spliBbom ) {
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
        return console.log( `Save operation failed '${ filespec }'\n${ error }`)
    } finally {
        ADODB.Close()
    }
    return `Save operation succeeded '${ filespec }'`
}

// util
const readByteFile = ( path ) => {
    let byte = ''
    try {
        ADODB.Type = AD_TYPE_BINARY
        ADODB.Open()
        ADODB.LoadFromFile( path )
        byte = ADODB.Read()
    } catch ( error ) {
        console.log( `error readByteFile ${ error } ${ path }` )
    } finally {
        ADODB.Close()
    }
    return byte
}

const Byte2Text = ( byte, enc ) => {
    try {
        ADODB.Open()
        ADODB.Type = AD_TYPE_BINARY
        ADODB.Write( byte )
        ADODB.Position = 0
        ADODB.Type = AD_TYPE_TEXT
        ADODB.Charset = enc
        return ADODB.ReadText()
    } catch (error) {
        console.log( `error Byte2Text ${ error }` )
    } finally {
        ADODB.Close()
    }
}

const exists = ( filespec ) => {
    return FSO.FileExists( pathname.toWin32Sep( filespec ) )
}

const folderExists = ( dirspec ) => {
    return FSO.FolderExists( dirspec )
}

const copyFileSync = ( from, to ) => {
    FSO.CopyFile( from, to )
    return `CopyFile operation succeeded '${ from }' => '${ to }'`
}

const rename = ( from, to ) => {
    FSO.MoveFile( from, to )
    return `Rename operation succeeded '${ from }' => '${ to }'`
}

const deleteFileSync = ( filespec ) => {
    FSO.DeleteFile( filespec )
    return `DeleteFile operation succeeded '${ filespec }'`
}

const mkdirSync = ( dirspec ) => {
    if( !FSO.FolderExists( dirspec ) ) {
        fs.CreateFolder( dirspec )
        return `MkdirSync operation succeeded '${ dirspec }'`
    }
    return `MkdirSync operation failed '${ dirspec }'`

}

const copySync = ( from, to ) => {
    FSO.CopyFolder( from, to )
    return `copySync operation failed '${ dirspec }'`
}

const httpGet = function _download ( url, saveFile ) {
    http.Open( 'GET', url, false )
    http.Send()
    fs.writeFileSync( saveFile, http.responseBody )
}

module.exports = {
    readFileSync,
    readTextFileSync,
    writeFileSync,
    writeTextFileSync,
    readByteFile,
    Buffer,
    exists,
    folderExists,
    copyFileSync,
    rename,
    deleteFileSync,
    mkdirSync,
    copySync,
    httpGet
}