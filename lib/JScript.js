const {JScript} = require('sc')

JScript.AddCode(`
function enumerator ( collection ) {
    return new Enumerator( collection )
}`)

const Enumerator = new Proxy(() => {}, {
    construct(target, args) {
        const res = []
        const e = JScript.Run('enumerator', args[0])
        for (; !e.atEnd(); e.moveNext()) {
            res.push(e.item())
        }
        return res
    }
})

module.exports = {
    Enumerator
}