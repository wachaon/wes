const isCLI = require('isCLI')
if (!isCLI(__filename)) throw new Error('"updata" can only be used on the command line')

const httprequest = require('httprequest')
const { writeFileSync } = require('filesystem')
const { toPosixSep } = require('pathname')

function update() {
    const url = 'https://raw.githubusercontent.com/wachaon/wes/master/wes.js'
    const json = 'https://raw.githubusercontent.com/wachaon/wes/master/package.json'

    try {
        const { responseText } = httprequest('GET', url, { message: 'Download wes' })
        writeFileSync(toPosixSep(WScript.ScriptFullName), responseText, 'UTF-8')

        const pkg = httprequest('GET', json)
        console.log('wes update completed. %O', JSON.parse(pkg.responseText).version)
    } catch (e) {
        throw e
    }
}

if (isCLI(__filename)) update()
else module.exports = update
