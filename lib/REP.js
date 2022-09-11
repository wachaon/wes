const isCLI = require('isCLI')
if (!isCLI(__filename) && !isCLI.__callFromTest()) throw new Error('"REP" can only be used on the command line')

const { blueBright, magenta, cursorUp, color } = require('ansi')
const { WorkingDirectory, resolve } = require('pathname')
const { isObject } = require('typecheck')
const { NONE, LF } = require('text')
const genGUID = require('genGUID')
const Event = require('event')

let input_string = NONE

console.log('%Swes REP mode:', blueBright)

const stdin = new Event()

stdin.on('data', (chunk) => {
    input_string += chunk + LF
})

stdin.on('end', function REP_end() {
    console.print(cursorUp(1))
    const id = genGUID()
    wes.Modules[id] = {
        source: input_string,
        path: resolve(WorkingDirectory, id + '.js'),
        mapping: {}
    }

    console.log(magenta + 'result:')
    try {
        const res = require(id)
        if (res != null && isObject(res) && Object.keys(res).length > 0) console.log('%O', res)
    } catch (e) {
        const errorColor = color(255, 165, 0)
        console.log(errorColor + e.stack)
    }
})

while (true) {
    if (WScript.StdIn.AtEndOfStream) {
        stdin.emit('end')
        break
    } else {
        let data = WScript.StdIn.ReadLine()
        if (data !== NONE) {
            stdin.emit('data', data)
            continue
        } else {
            data = WScript.StdIn.ReadLine()
            if (data !== NONE) {
                stdin.emit('data', LF + data)
                continue
            } else {
                stdin.emit('end')
                break
            }
        }
    }
}
