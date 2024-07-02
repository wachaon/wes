const { Enumerator } = require('/lib/JScript')
const { describe, it, assert, pass } = require('/lib/minitest')

describe('#test Enumerator', () => {
    it('/lib/ files', () => {
        const FSO = require('Scripting.FileSystemObject')
        let files = new Enumerator(FSO.GetFolder(`./lib`).Files).map((v) => v.name)
        let list = [
            'ansi.js',
            'argv.js',
            'babel-standalone.js',
            'buffer.js',
            'bundle.js',
            'chardet.js',
            'console.js',
            'develop.js',
            'event.js',
            'filesystem.js',
            'genGUID.js',
            'getMember.js',
            'help.js',
            'hex.js',
            'httprequest.js',
            'init.js',
            'inspect.js',
            'install.js',
            'isCLI.js',
            'JScript.js',
            'match.js',
            'minitest.js',
            'pathname.js',
            'pipe.js',
            'promise.js',
            'ps.js',
            'REP.js',
            'text.js',
            'typecheck.js',
            'uninstall.js',
            'update.js',
            'utility.js',
            'VBScript.js',
            'zip.js'
        ]
        assert(JSON.stringify(files) === JSON.stringify(list))
    })
})
