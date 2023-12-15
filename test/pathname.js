const path = require('/lib/pathname')
const { describe, it, assert, pass } = require('/lib/minitest')
const { NONE } = require('/lib/text')

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
            assert(path.extname('index') === NONE)
        })
        it('.index.md', () => {
            assert(path.extname('.index.md') === '.md')
        })
    })

    describe('## test normalize', () => {
        it('d://e/f//g////k.js', () => {
            assert(path.normalize('d://e/f//g////k.js') === 'D:/e/f/g/k.js')
        })
        it('d://e/f//./g////k.js', () => {
            assert(path.normalize('d://e/f//./g////k.js') === 'D:/e/f/g/k.js')
        })
        it('d://e/f//../g////k.js', () => {
            assert(path.normalize('d://e/f//../g////k.js') === 'D:/e/g/k.js')
        })
        it('d://e/f/..//../g////k.js', () => {
            assert(path.normalize('d://e/f/..//../g////k.js') === 'D:/g/k.js')
        })
        it('bin/f/g////k.js', () => {
            assert(path.normalize('bin/f/g////k.js') === 'bin/f/g/k.js')
        })
        it('github/.././../g////k.js', () => {
            assert(path.normalize('github/.././../g////k.js') === '../g/k.js')
        })
    })

    describe('## test isAbsolute', () => {
        it('WScript.ScriptFullName', () => {
            assert(path.isAbsolute(WScript.ScriptFullName) === true)
        })
        it('d:/e/f/g/i.js', () => {
            assert(path.isAbsolute('d:/e/f/g/i.js') === true)
        })
        it('github/g/k.js', () => {
            assert(path.isAbsolute('github/g/k.js') === false)
        })
        it('./k.js', () => {
            assert(path.isAbsolute('./k.js') === false)
        })
        it('d:/e/f/../Desktop/h/i.json', () => {
            assert(path.isAbsolute('d:/e/f/../Desktop/h/i.json') === true)
        })
    })

    describe('## test dirname', () => {
        it('C:/e/f/g', () => {
            assert(path.dirname('C:/e/f/g') === 'C:/e/f')
        })
        it('C:/e', () => {
            assert(path.dirname('C:/e') === 'C:/')
        })
        it('C:/', () => {
            assert(path.dirname('C:/') === 'C:/')
        })
        it('C:', () => {
            assert(path.dirname('C:') === 'C:')
        })
    })

    describe('## test drivename', () => {
        it('C:/e/f/g', () => {
            assert(path.drivename('C:/e/f/g') === 'C:/')
        })
        it('C:/e', () => {
            assert(path.drivename('C:/e') === 'C:/')
        })
        it('C:/', () => {
            assert(path.drivename('C:/') === 'C:/')
        })
        it('C:', () => {
            assert(path.drivename('C:') === 'C:/')
        })
    })

    describe('## test relative', () => {
        it('relative("C:/d/e/f", "C:/d/e/f") => ""', () => {
            assert.equal(path.relative("C:/d/e/f", "C:/d/e/f"), "")
        })
        it('relative("C:/d/e", "C:/d/e/f") => "f"', () => {
            assert.equal(path.relative("C:/d/e", "C:/d/e/f"), "f")
        })
        it('relative("C:/d", "C:/d/e/f") => "e/f"', () => {
            assert.equal(path.relative("C:/d", "C:/d/e/f"), "e/f")
        })
        it('relative("C:/", "C:/d/e/f") => "d/e/f"', () => {
            assert.equal(path.relative("C:/", "C:/d/e/f"), "d/e/f")
        })
        it('relative("C:/d/e/f", "C:/d/e/f") => "../g"', () => {
            assert.equal(path.relative("C:/d/e/f", "C:/d/e/g"), "../g")
        })
        it('relative("C:/d/e/f", "C:/d/g") => "../../g"', () => {
            assert.equal(path.relative("C:/d/e/f", "C:/d/g"), "../../g")
        })
        it('relative("C:/d/e/f", "C:/g") => "../../../g"', () => {
            assert.equal(path.relative("C:/d/e/f", "C:/g"), "../../../g")
        })
        it('relative(process.cwd(), "wes.js") => "wes.js"', () => {
            assert.equal(path.relative(process.cwd(), "wes.js"), "wes.js")
        })
        it('relative(process.cwd(), "../wes.js") => "../wes.js"', () => {
            assert.equal(path.relative(process.cwd(), "../wes.js"), "../wes.js")
        })
    })
})
