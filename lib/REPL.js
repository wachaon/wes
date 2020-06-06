const CLI = wes.Modules[wes.main].path === __filename
if (!CLI) throw new Error ('REPL can only be used on the command line')

console.log(console.ansi.brightBlue + 'wes REPL mode:')
process.stdin = {
    writeLine(s) {
        WScript.StdIn.WriteLine(s)
    },
    event: {},
    on(type, callback) {
        const ev = this.event
        ev[type] = ev[type] || []
        ev[type].push(callback)
    },
    emit(type, ...args) {
        if ( !this.event[type] ) return
        const evs = this.event[type]
        return evs.map(ev => ev(...args))
    },
}

let input_string = ''

process.stdin.on('data', (chunk) => {
    input_string += chunk + '\n'
})

process.stdin.on('end', () => {
    console.print('\u001B[1A')
    const id = require('genUUID')()
    wes.Modules[id] = {
        source: input_string,
        path: require('pathname').resolve(process.cwd(), id),
        mapping:{}
    }
    console.log(console.ansi.magenta + 'result:')
    const result = require(id)
    if (Object.prototype.toString.call(result) === '[object Object]' && Object.keys(result).length === 0 ) {}
    else console.log('%O', result)
})

while(true) {
    if (WScript.StdIn.AtEndOfStream) {
        process.stdin.emit('end')
        break
    } else {
        const data = WScript.StdIn.ReadLine()
        if (data === '') {
            const data = WScript.StdIn.ReadLine()
            if (data === '') {
                process.stdin.emit('end')
                break
            } else process.stdin.emit('data', '\n' + data)
        }
        process.stdin.emit('data', data)
    }
}
