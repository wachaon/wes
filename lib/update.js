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
