const ADODB = require('ADODB.Stream')
const FSO = require('Scripting.FileSystemObject')
const { security, allow } = require('argv')
const { ByteToHex, HexToByte, Uint8ToHex } = require('hex')
const { Enumerator } = require('JScript')
const { toWin32Sep, posixSep, split, absolute, relative, CurrentDirectory: cd, resolve } = require('pathname')
const { NONE } = require('text')
const { Type } = require('VBScript')
const chardet = require('chardet')
const genGUID = require('genGUID')
const http = require('Msxml2.XMLHTTP')

const VB_BYTE = 'vbByte[]'
const AD_TYPE_BINARY = 1
const AD_TYPE_TEXT = 2
const AD_SAVE_CREATE_OVER_WRITE = 2
const UTF_8 = 'UTF-8'
const UTF_8BOM = 'UTF-8BOM'
const UTF_8N = 'UTF-8N'

const readFileSync = function filesystem_readFileSync(filespec, encode) {
    // (filespec: string, encode?: string): string

    if (encode == null) return new Buffer(readByteFileSync(filespec))
    return readTextFileSync(filespec, encode)
}

const readTextFileSync = function filesystem_readTextFileSync(filespec, encode) {
    // (filespec: string, encode?: string): string

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
    // (filespec: string, data: Buffer|byte|string, encode?: string): string

    if (data instanceof Buffer) data = data.toByte()
    if (Type(data) === VB_BYTE) {
        try {
            ADODB.Open()
            ADODB.Type = AD_TYPE_BINARY
            ADODB.Position = 0
            ADODB.SetEOS()
            ADODB.Write(data)
            ADODB.SaveToFile(filespec, AD_SAVE_CREATE_OVER_WRITE)
            ADODB.Close()
            return `Save operation succeeded '${filespec}'`
        } catch (error) {
            error.message += `\nSave operation failed. filespec: ${filespec}`
            throw error
        }
    }
    return writeTextFileSync(filespec, data, encode)
}

const writeTextFileSync = function filesystem_writeTextFileSync(filespec, text, encode) {
    // (filespec: string, text: string, encode?: string): string

    let spliBbom = false
    try {
        ADODB.Open()
        ADODB.Type = AD_TYPE_TEXT
        ADODB.Position = 0
        ADODB.SetEOS()
        if (encode != null) {
            const _enc = encode.toUpperCase()
            if (_enc.startsWith(UTF_8)) ADODB.CharSet = UTF_8
            else ADODB.CharSet = encode
            if (_enc === UTF_8BOM) spliBbom = false
            else if (_enc === UTF_8N) spliBbom = true
            else spliBbom = true
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
        return `Save operation succeeded. '${filespec}'`
    } catch (error) {
        error.message += `\nSave operation failed. filespec: ${filespec}`
        return error
    } finally {
        ADODB.Close()
    }
}

// util
const readByteFileSync = function filesystem_readByteFileSync(filespec) {
    // (filespec: string): byte

    let byte = NONE
    try {
        ADODB.Open()
        ADODB.Type = AD_TYPE_BINARY
        ADODB.Position = 0
        ADODB.SetEOS()
        ADODB.LoadFromFile(filespec)
        byte = ADODB.Read()
    } catch (error) {
        error.message += `\n   (readByteFileSync filespec: ${filespec})`
        throw error
    } finally {
        ADODB.Close()
    }
    return byte
}

const ByteToText = function filesystem_ByteToText(byte, encode) {
    // (byte: byte, encode?: string): string

    try {
        ADODB.Open()
        ADODB.Type = AD_TYPE_BINARY
        ADODB.Position = 0
        ADODB.SetEOS()
        ADODB.Write(byte)
        ADODB.Position = 0
        ADODB.Type = AD_TYPE_TEXT
        if (encode != null) ADODB.Charset = encode
        return ADODB.ReadText()
    } catch (error) {
        error.message += `\n   (ByteToText encode: ${encode})`
        throw error
    } finally {
        ADODB.Close()
    }
}

const BufferToText = function filesystem_BufferToText(buff, encode) {
    // (buff: Buffer, encode?: string): string

    if (!(buff instanceof Buffer)) throw new Error('A parameter other than a buffer is passed as an argument')
    if (buff.length === 0) return NONE
    const byte = HexToByte(Uint8ToHex(buff))
    return ByteToText(byte, encode || chardet.detect(buff))
}

const existsFileSync = function filesystem_existsFileSync(filespec) {
    // (filespec: string): bool

    return FSO.FileExists(toWin32Sep(filespec))
}

const existsdirSync = function filesystem_existsdirSync(dirspec) {
    // (dirspec: string): bool

    return FSO.FolderExists(toWin32Sep(dirspec))
}

const existsSync = function filesystem_exists(filespec) {
    // (filespec: string): bool

    return existsFileSync(filespec) || existsdirSync(filespec)
}

const exists = function filesystem_exists(filespec, callback) {
    // (filespec: string, callback: function): bool

    const res = existsSync(filespec)
    return callback != null ? res : callback(filespec)
}

const copyFileSync = function filesystem_copyFileSync(from, to, overwrite) {
    // (from: string, to: string): string

    FSO.CopyFile(from, to, overwrite)
    return `copyFileSync operation succeeded. '${from}' => '${to}'`
}

const moveFileSync = function filesystem_moveFileSync(from, to) {
    // (from: string, to: string): string

    FSO.MoveFile(from, to)
    return `moveFileSync operation succeeded. '${from}' => '${to}'`
}

const mergeFileSync = function filesystem_mergeFileSync(src, dest) {
    // (src: string[], dest: string): string

    try {
        ADODB.Open()
        ADODB.Type = AD_TYPE_BINARY
        ADODB.Position = 0
        ADODB.SetEOS()

        src.map((spec) => {
            ADODB.LoadFromFile(spec)
            const bytes = ADODB.Read()
            ADODB.Position = 0
            ADODB.SetEOS()
            return bytes
        }).forEach((bytes) => {
            ADODB.Write(bytes)
            ADODB.Position = ADODB.Size
        })

        ADODB.SaveToFile(dest, AD_SAVE_CREATE_OVER_WRITE)

        return `mergeFileSync operation succeeded. '${dest}'`
    } catch (error) {
        throw error
    } finally {
        ADODB.Close()
    }
}

const deleteFileSync = function filesystem_deleteFileSync(filespec) {
    // (filespec: string): string

    if (FSO.FileExists(filespec)) {
        FSO.DeleteFile(filespec)
        return `deleteFileSync operation succeeded. '${filespec}'`
    }
    return `deleteFileSync operation failed. '${filespec}'`
}

const mkdirSync = function filesystem_mkdirSync(dirspec) {
    // (dirspec: string): string]

    if (!FSO.FolderExists(dirspec)) {
        FSO.CreateFolder(dirspec)
        return `mkdirSync operation succeeded. '${dirspec}'`
    }
    return `mkdirSync operation failed. '${dirspec}'`
}

const mkdirsSync = function filesystem_mkdirsSync(spec) {
    // (spec: string): string

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
    // (from: string, to: string): string

    FSO.CopyFolder(from, to)
    return `copydirSync operation succeeded '${dirspec}'`
}

const download = function filesystem_download(url, saveFile) {
    // (url: string, saveFile?: string): Buffer

    http.Open('GET', url, false)
    http.Send()
    if (http.status === 200) {
        if (saveFile != null) return writeFileSync(saveFile, http.responseBody)
        else return http.responseBody
    } else throw new Error(`filesystem_download Error status: ${http.status}`)
}

const readdirsSync = function filesystem_readdirsSync(spec, callback) {
    // (spec: string, callback: function): any[]

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
    // (spec: string): string[]

    return readdirsSync(spec, (file, dir) => {
        if (file) return file.name
        else return dir.name
    })
}

const deletedirSync = function filesystem_deletedirSync(dirspec) {
    // (dirspec: string): string

    if (relative(cd, dirspec).startsWith('..') && !allow(security.unsafe))
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

const encodeBuffer = function filesystem_encodeBuffer(buff, output_encode, input_encode) {
    // (buff: Buffer, output_encode: string, input_encode?: string): Buffer

    const spec = resolve(process.cwd(), genGUID())
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

const statSync = function filesystem_statSync(spec) {
    // (spec: string): FileStat

    const FSO = require('Scripting.FileSystemObject')
    const file = FSO.getFile(spec.split('/').join('\\'))
    return {
        atimeMs: new Date(file.DateLastAccessed).getTime(),
        mtimeMs: new Date(file.DateLastModified).getTime(),
        ctimeMs: new Date(file.DateCreated).getTime(),
        atime: new Date(file.DateLastAccessed),
        mtime: new Date(file.DateLastModified),
        ctime: new Date(file.DateCreated),
        size: file.Size
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

    mergeFileSync,

    deleteFileSync,
    deletedirSync,

    mkdirSync,
    mkdirsSync,

    download,
    BufferToText,
    ByteToText,
    encodeBuffer,

    statSync
}
