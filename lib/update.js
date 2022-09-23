const isCLI = require('isCLI')
const { __callFromTest, exclusion } = isCLI
if (!exclusion) {
    if (!isCLI(__filename) && !__callFromTest()) throw new Error('"bundle" can only be used on the command line')
}

function update() {
    const { SPACE } = require('text')
    const WShell = require('WScript.Shell')
    const command = [
        `bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js`,
        WScript.ScriptFullName
    ].join(SPACE)

    let instance = WShell.Exec(command)
    let stream = instance.StdOut

    while (!stream.AtEndOfStream) {
        console.log(stream.ReadLine())
    }
}

if (isCLI(__filename)) update()
else module.exports = update
