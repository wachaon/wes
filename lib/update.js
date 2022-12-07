const isCLI = require('isCLI')
const { __callFromTest, exclusion } = isCLI
if (!exclusion) {
    if (!isCLI(__filename) && !__callFromTest()) throw new Error('"bundle" can only be used on the command line')
}

const httprequest = require('httprequest')
const { writeFileSync } = require('filesystem')
const { resolve } = require('pathname')

function update() {
    const url = 'https://raw.githubusercontent.com/wachaon/wes/master/wes.js'

    try {
        const { responseText } = httprequest('GET', url, { message: 'Download wes' })
        writeFileSync(resolve(process.cwd(), 'wes.js'), responseText, 'UTF-8')
        console.log('%O', 'wes update completed.')
    } catch (e) {
        throw e
    }
}

if (isCLI(__filename)) update()
else module.exports = update
