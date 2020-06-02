const ADODB = require('ADODB.Stream')
const FSO = require('Scripting.FileSystemObject')
const { toWin32Sep, posixSep, split, absolute, relative, CurrentDirectory: cd, resolve } = require('pathname')
const chardet = require('chardet')
const { Type } = require('VBScript')
const http = require('Msxml2.XMLHTTP')
const { Enumerator } = require('JScript')
const { NONE } = require('text')
const genUUID = require('genUUID')

const { ByteToHex, HexToByte, Uint8ToHex } = require('hex')
const VB_BYTE = 'vbByte[]'

const AD_TYPE_BINARY = 1
const AD_TYPE_TEXT = 2
const AD_SAVE_CREATE_OVER_WRITE = 2
const UTF_8 = 'UTF-8'
const UTF_8BOM = 'UTF-8BOM'
const UTF_8N = 'UTF-8N'

const readFileSync = function filesystem_readFileSync(filespec, encode) {
    if (encode == null) return new Buffer(readByteFileSync(filespec))
    return readTextFileSync(filespec, encode)
}

const readTextFileSync = function filesystem_readTextFileSync(filespec, encode) {
    let byte = readByteFileSync(filespec)
    if (byte === null) return ''
    let buffer = new Buffer(byte)
    let encoding = null
    if (buffer.length >= 3) encoding = encode != null ? encode : chardet.detect(buffer)
    else encoding = UTF_8
    if (encoding.toUpperCase().startsWith(UTF_8)) {
        encoding = UTF_8
    }
    if (encoding === UTF_8 && buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf) {
        byte = HexToByte(ByteToHex(byte).replace(/^efbbbf/, NONE))
    }
    return ByteToText(byte, encoding)
}

const writeFileSync = function filesystem_writeFileSync(filespec, data, encode) {
    if (data instanceof Buffer) data = data.toByte()
    if (Type(data) === VB_BYTE) {
        try {
            ADODB.Open()
            ADODB.Position = 0
            ADODB.SetEOS()
            ADODB.Type = AD_TYPE_BINARY
            ADODB.Write(data)
            ADODB.SaveToFile(filespec, AD_SAVE_CREATE_OVER_WRITE)
            ADODB.Close()
            return `Save operation succeeded '${filespec}'`
        } catch (error) {
            console.log(`Save operation failed. filespec: ${filespec}\n${error}`)
        }
    }
    return writeTextFileSync(filespec, data, encode)
}

const writeTextFileSync = function filesystem_writeTextFileSync(filespec, text, encode) {
    let spliBbom = false
    try {
        ADODB.Open()
        ADODB.Position = 0
        ADODB.SetEOS()
        ADODB.Type = AD_TYPE_TEXT
        if (encode != null) {
            const _enc = encode.toUpperCase()
            if (_enc.startsWith(UTF_8)) ADODB.CharSet = UTF_8
            else ADODB.CharSet = encode
            if (_enc === UTF_8BOM) spliBbom = false
            else if (_enc === UTF_8N) spliBbom = true
            else spliBbom = false
        }
        ADODB.WriteText(text)
        if (spliBbom) {
            ADODB.Position = 0
            ADODB.Type = AD_TYPE_BINARY
            ADODB.Position = 3
            let bytes = ADODB.Read()
            ADODB.Position = 0
            ADODB.SetEOS()
            ADODB.Write(bytes)
        }
        ADODB.SaveToFile(filespec, AD_SAVE_CREATE_OVER_WRITE)
    } catch (error) {
        return console.log(`Save operation failed. filespec: ${filespec}\n${error}`)
    } finally {
        ADODB.Close()
    }
    return `Save operation succeeded. '${filespec}'`
}

// util
const readByteFileSync = function filesystem_readByteFileSync(filespec) {
    let byte = NONE
    try {
        ADODB.Type = AD_TYPE_BINARY
        ADODB.Open()
        ADODB.LoadFromFile(filespec)
        byte = ADODB.Read()
    } catch (error) {
        console.log(`error readByteFileSync filespec: ${filespec}\n${error} `)
    } finally {
        ADODB.Close()
    }
    return byte
}

const ByteToText = function filesystem_ByteToText(byte, encode) {
    try {
        ADODB.Open()
        ADODB.Type = AD_TYPE_BINARY
        ADODB.Write(byte)
        ADODB.Position = 0
        ADODB.Type = AD_TYPE_TEXT
        if (encode != null) ADODB.Charset = encode
        return ADODB.ReadText()
    } catch (error) {
        console.log(`error ByteToText encode: ${encode}\n${error}`)
    } finally {
        ADODB.Close()
    }
}

const BufferToText = function filesystem_BufferToText(buff, encode) {
    if (!(buff instanceof Buffer)) throw new Error('A parameter other than a buffer is passed as an argument')
    if (buff.length === 0) return NONE
    const byte = HexToByte(Uint8ToHex(buff))
    return ByteToText(byte, encode || chardet.detect(buff))
}

const exists = function filesystem_exists(filespec) {
    return FSO.FileExists(toWin32Sep(filespec))
}

const existsFileSync = function filesystem_existsFileSync(filespec) {
    return FSO.FileExists(toWin32Sep(filespec))
}

const existsdirSync = function filesystem_existsdirSync(dirspec) {
    return FSO.FolderExists(dirspec)
}

const copyFileSync = function filesystem_copyFileSync(from, to) {
    FSO.CopyFile(from, to)
    return `copyFileSync operation succeeded. '${from}' => '${to}'`
}

const moveFileSync = function filesystem_moveFileSync(from, to) {
    FSO.MoveFile(from, to)
    return `moveFileSync operation succeeded. '${from}' => '${to}'`
}

const deleteFileSync = function filesystem_deleteFileSync(filespec) {
    if (FSO.FileExists(filespec)) {
        FSO.DeleteFile(filespec)
        return `deleteFileSync operation succeeded. '${filespec}'`
    }
    return `deleteFileSync operation failed. '${filespec}'`
}

const mkdirSync = function filesystem_mkdirSync(dirspec) {
    if (!FSO.FolderExists(dirspec)) {
        FSO.CreateFolder(dirspec)
        return `mkdirSync operation succeeded. '${dirspec}'`
    }
    return `mkdirSync operation failed. '${dirspec}'`
}

const mkdirsSync = function filesystem_mkdirsSync(spec) {
    let dirs = split(absolute(spec))
    dirs.reduce((acc, curr) => {
        if (!/^[A-z]:/.test(acc)) throw new Error('A drive that does not exist is specified. => %s', spec)
        let specs = acc + posixSep + curr
        if (!existsdirSync(specs)) mkdirSync(specs)
        return specs
    })
    return `mkdirsSync operation succeeded '${spec}'`
}

const copydirSync = function filesystem_copydirSync(from, to) {
    FSO.CopyFolder(from, to)
    return `copydirSync operation succeeded '${dirspec}'`
}

const download = function filesystem_download(url, saveFile) {
    http.Open('GET', url, false)
    http.Send()
    if (http.status === 200) {
        if ( saveFile != null ) return writeFileSync(saveFile, http.responseBody)
        else return http.responseBody
    } else throw new Error(`filesystem_download Error status=${http.status}`)
}

const readdirsSync = function filesystem_readdirsSync(spec, callback) {
    let children = []

    let files = new Enumerator(FSO.GetFolder(spec).Files)
    let dirs = new Enumerator(FSO.GetFolder(spec).SubFolders)

    if (typeof callback === 'function') {
        files.forEach((node) => children.push(callback(node, null)))
        dirs.forEach((node) => children.push(callback(null, node)))
        return children
    } else {
        files.forEach((node) =>
            children.push({
                name: node.Name,
                path: absolute(node.Path),
                type: 'file'
            })
        )
        dirs.forEach((node) =>
            children.push({
                name: node.Name,
                path: absolute(node.path),
                type: 'directory',
                children: readdirsSync(absolute(node.path))
            })
        )
        return children.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
    }
}

const readdirSync = function filesystem_readdirSync(spec) {
    return readdirsSync(spec, (file, dir) => {
        if (file) return file.name
        else return dir.name
    })
}

const deletedirSync = function filesystem_deletedirSync(dirspec) {
    if (relative(cd, dirspec).startsWith('..') && !(argv.get('unsafe') || argv.get('danger')))
        throw new Error(
            '`--unsafe` or `--danger` command line arguments are required to delete outside the current directory'
        )
    try {
        FSO.DeleteFolder(dirspec)
        return `deletedirSync operation succeeded '${dirspec}'`
    } catch (err) {
        return `deletedirSync operation failed '${dirspec}'`
    }
}

const deletedirsSync = function filesystem_deletedirsSync(dirspec) {
    return deletedirSync(dirspec)
}

const encodeBuffer = function filesystem_encodeBuffer(buff, output_encode, input_encode) {
    const spec = resolve(process.cwd(), genUUID())
    try {
        writeFileSync(spec, buff)
        const text = readTextFileSync(spec, input_encode || null)
        writeTextFileSync(spec, text, output_encode)
        const res = readFileSync(spec)
        deleteFileSync(spec)
        return res
    } catch (err) {
        throw err
    } finally {
        if (existsFileSync(spec)) deleteFileSync(spec)
    }
}

module.exports = {
    readFileSync,
    readTextFileSync,
    readByteFileSync,
    readdirsSync,
    readdirSync,

    writeFileSync,
    writeTextFileSync,

    exists,
    existsFileSync,
    existsdirSync,

    copyFileSync,
    copydirSync,

    moveFileSync,

    deleteFileSync,
    deletedirSync,
    deletedirsSync,

    mkdirSync,
    mkdirsSync,

    download,
    BufferToText,
    ByteToText,
    encodeBuffer
}
