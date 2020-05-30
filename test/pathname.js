const path = require('/lib/pathname')
const { describe, it, assert, pass } = require('/lib/minitest')

describe('# test pathname', () => {
    describe('## test extname', () => {
        it('WScript.ScriptFullName', () => {
            assert(path.extname(WScript.ScriptFullName) === '.js')
        })
        it('index.html', () => {
            assert(path.extname('index.html') === '.html')
        })
        it('index.coffee.md', () => {
            assert(path.extname('index.coffee.md') === '.md')
        })
        it('index.', () => {
            assert(path.extname('index.') === '.')
        })
        it('index', () => {
            assert(path.extname('index') === '')
        })
        it('.index.md', () => {
            assert(path.extname('.index.md') === '.md')
        })
    })

    describe('## test normalize', () => {
        it('d://bin/github//wes////wes.js', () => {
            assert(
                path.normalize('d://bin/github//wes////wes.js') ===
                    'D:/bin/github/wes/wes.js'
            )
        })
        it('d://bin/github//./wes////wes.js', () => {
            assert(
                path.normalize('d://bin/github//./wes////wes.js') ===
                    'D:/bin/github/wes/wes.js'
            )
        })
        it('d://bin/github//../wes////wes.js', () => {
            assert(
                path.normalize('d://bin/github//../wes////wes.js') ===
                    'D:/bin/wes/wes.js'
            )
        })
        it('d://bin/github/..//../wes////wes.js', () => {
            assert(
                path.normalize('d://bin/github/..//../wes////wes.js') ===
                    'D:/wes/wes.js'
            )
        })
        it('bin/github/wes////wes.js', () => {
            assert(
                path.normalize('bin/github/wes////wes.js') ===
                    'bin/github/wes/wes.js'
            )
        })
        it('github/.././../wes////wes.js', () => {
            assert(
                path.normalize('github/.././../wes////wes.js') ===
                    '../wes/wes.js'
            )
        })
    })

    describe('## test isAbsolute', () => {
        it('WScript.ScriptFullName', () => {
            assert(path.isAbsolute(WScript.ScriptFullName) === true)
        })
        it('d:/bin/github/wes/wes.js', () => {
            assert(path.isAbsolute('d:/bin/github/wes/wes.js') === true)
        })
        it('github/wes/wes.js', () => {
            assert(path.isAbsolute('github/wes/wes.js') === false)
        })
        it('./wes.js', () => {
            assert(path.isAbsolute('./wes.js') === false)
        })
        it('d:/bin/github/../Desktop/log/log.json', () => {
            assert(
                path.isAbsolute('d:/bin/github/../Desktop/log/log.json') ===
                    true
            )
        })
    })
})

return pass
