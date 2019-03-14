const { Enumerator } = require( '../lib/JScript' )
const { describe, it, assert } = require('test') // { describe, it, assert }

describe('Enumerator test', () => {
    it('lib/ files', () => {
        const FSO = require('Scripting.FileSystemObject')

        let files = new Enumerator(FSO.GetFolder(`./lib`).Files)
        let list = files.map( (v) => `${ v }`)
        assert.ng(JSON.stringify(list, null, 2))

    })
})
