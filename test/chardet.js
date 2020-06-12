const { describe, it, assert, pass } = require('/lib/minitest')

describe('# test chardet', () => {
    const { Enumerator } = require('JScript')
    const FSO = require('Scripting.FileSystemObject')
    const path = require('pathname')
    const fs = require('filesystem')
    const chardet = require('/lib/chardet')

    const dir = path.join(path.CurrentDirectory, 'test/encodings')
    const folder = FSO.GetFolder(dir)
    const encodeings = new Enumerator(folder.Files)
    const names = encodeings.map(file => file.name)
    const paths = encodeings.map(file => file.Path)

    paths.forEach((file, i) => {
        const detect = chardet.detect(fs.readFileSync(file))
        it(names[i] + ' === ' + detect, () => {
            const a = detect.toLowerCase().replace(/\-/g, '_')
            const b = detect.toLowerCase().replace(/\-/g, '')
            assert(
                names[i] === a ||
                    names[i] === b ||
                    names[i].startsWith(b) ||
                    (names[i].startsWith('lang') && detect === 'UTF-8')
            )
        })
    })
})

return pass
