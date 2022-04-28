const isCLI = require('isCLI')
if (!isCLI(__filename)) throw new Error('update can only be used on the command line')

const WShell = require('WScript.Shell')
const command = [
    `bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js`,
    WScript.ScriptFullName
].join(' ')

let instance = WShell.Exec(command)
let stream = instance.StdOut

while (!stream.AtEndOfStream) {
    console.log(stream.ReadLine())
}
