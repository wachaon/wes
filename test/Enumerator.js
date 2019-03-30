const { Enumerator } = require( 'JScript' )
const { describe, it, assert } = require('test')

describe('Enumerator test', () => {
    it('lib/ files', () => {
        const FSO = require('Scripting.FileSystemObject')
        let files = ( new Enumerator(FSO.GetFolder(`./lib`).Files) ).map( v => v.name )
        let list = [
            "args.js",
            "day.js",
            "debug.js",
            "enumerator.js",
            "event.js",
            "io.js",
            "JScript.js",
            "log.js",
            "output.js",
            "pipe.js",
            "sc.js",
            "test.js",
            "text.js",
            "validation.js",
            "VBScript.js",
            "version.js"
        ]
        //console.log( JSON.stringify( files ) )
        assert( JSON.stringify( files ) === JSON.stringify( list ) )
    })
})
