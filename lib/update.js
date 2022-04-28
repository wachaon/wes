const WShell = require('WScript.Shell')
// const { dirname, resolve, toWin32Sep, toPosixSep } = require('pathname')

// const CD = WScript.ScriptFullName

const command = [
    `bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js`,
    WScript.ScriptFullName
].join(' ')

const instance = WShell.Exec(command)
const stream = instance.StdOut

while (!stream.AtEndOfStream) {
    console.print(stream.Read())
}
