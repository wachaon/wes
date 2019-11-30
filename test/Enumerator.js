const { Enumerator } = require( '/lib/JScript' )
const { describe, it, assert, pass } = require('/lib/minitest')

describe('#test Enumerator', () => {
    it('/lib/ files', () => {
        const FSO = require('Scripting.FileSystemObject')
        let files = ( new Enumerator(FSO.GetFolder(`./lib`).Files) ).map( v => v.name )
        let list = [
            "argv.js",
            "browser.js",
            "buffer.js",
            "bundle.js",
            "chardet.js",
            "day.js",
            "debug.js",
            "dump.js",
            "filesystem.js",
            "genUUID.js",
            "hex.js",
            "install.js",
            "JScript.js",
            "log.js",
            "minitest.js",
            "pathname.js",
            "pipe.js",
            "text.js",
            "typecheck.js",
            "VBScript.js"
        ]
        //console.log( JSON.stringify( files, null, 4 ) )
        assert( JSON.stringify( files ) === JSON.stringify( list ) )
    })
})

return pass