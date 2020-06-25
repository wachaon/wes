const CLI = wes.Modules[wes.main].path === __filename
if (!CLI) throw new Error('REPL can only be used on the command line')

console.log(console.ansi.brightBlue + 'wes REPL mode:')

const { isObject } = require('typecheck')
const { NONE, LF } = require('text')
const Event = require('event')

let input_string = NONE

const stdin = new Event()

stdin.on('data', (chunk) => {
    input_string += chunk + LF
})

stdin.on('end', () => {
    console.print('\u001B[1A')
    const id = require('genGUID')()
    wes.Modules[id] = {
        source: input_string,
        path: require('pathname').resolve(process.cwd(), id + '.js'),
        mapping: {}
    }

    console.log(console.ansi.magenta + 'result:')
    const result = require(id)

    if (isObject(result) && Object.keys(result).length !== 0) console.log('%O', result)
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
