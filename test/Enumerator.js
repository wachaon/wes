const { Enumerator } = require( 'JScript' )
const { describe, it, assert } = require('minitest')

describe('Enumerator test', () => {
    it('lib/ files', () => {
        const FSO = require('Scripting.FileSystemObject')
        let files = ( new Enumerator(FSO.GetFolder(`./lib`).Files) ).map( v => v.name )
        let list = [
            "argv.js",
            "buffer.js",
            "chardet.js",
            "contract.js",
            "day.js",
            "debug.js",
            "dump.js",
            "filesystem.js",
            "JScript.js",
            "log.js",
            "minitest.js",
            "msxml.js",
            "pathname.js",
            "pipe.js",
            "sc.js",
            "text.js",
            "typecast.js",
            "typecheck.js",
            "VBScript.js"
        ]
        //console.log( JSON.stringify( files ) )
        assert( JSON.stringify( files ) === JSON.stringify( list ) )
    })
})
