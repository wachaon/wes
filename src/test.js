const { Enumerator } = require('/lib/JScript')
const fs = require('/lib/filesystem')
const { greenBright, redBright } = require('/lib/ansi')

const FSO = require('Scripting.FileSystemObject')
let files = new Enumerator(FSO.GetFolder(`./test`).Files).map((v) => v.path)

let total = 0
let succeed = 0

files.forEach((v) => {
    let [_total, _succeed] = eval(`( () => { ${fs.readTextFileSync(v)}\nreturn pass } )()`)
    total = _total
    succeed = _succeed
})

let complete = succeed / total === 1

console.log(
    `\n${complete ? greenBright : redBright}tests: ${total} ${complete ? 'complete' : 'fail:' + (total - succeed)}`
)

module.exports = complete
