const { Enumerator } = require('/lib/JScript')
const { describe, it, assert, pass } = require('/lib/minitest')

describe('#test Enumerator', () => {
    it('/lib/ files', () => {
        const FSO = require('Scripting.FileSystemObject')
        let files = new Enumerator(FSO.GetFolder(`./lib`).Files).map((v) => v.name)
        let list = [
            'ansi.js',
            'argv.js',
            'browser.js',
            'buffer.js',
            'bundle.js',
            'chardet.js',
            'console.js',
            'day.js',
            'debug.js',
            'event.js',
            'filesystem.js',
            'genGUID.js',
            'hex.js',
            'httprequest.js',
            'inspect.js',
            'install.js',
            'JScript.js',
            'log.js',
            'minitest.js',
            'pathname.js',
            'pipe.js',
            'REPL.js',
            'text.js',
            'typecheck.js',
            'VBScript.js'
        ]
        assert(JSON.stringify(files) === JSON.stringify(list))
    })
})

return pass
