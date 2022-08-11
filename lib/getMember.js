const WShell = require('WScript.Shell')
const { TypeName } = require('VBScript')

function getMember(com) {
    const ProgID = TypeName(com) === 'String' ? com : String(com)
    const command = `PowerShell -NoProfile -NoExit -Command $com = New-Object -ComObject "${ProgID}";$com|Get-Member`
    const exec = WShell.Exec(command)
    var stream = exec.StdOut
    const membars = []
    let isHeader = false

    while (true) {
        const content = stream.ReadLine()
        isHeader = isHeader || /^[\s\-]+$/.test(content)
        if (isHeader && content.trim() === '') break
        if (!isHeader || /^[\s\-]+$/.test(content)) continue
        const [_, Name, MemberType, definition] = /^([^\s]+)\s+([^\s]+)\s+(.+)$/.exec(content)
        membars.push({ Name, MemberType, Definition: definition.trim() })
    }
    return { ProgID, TypeName: TypeName(WScript.CreateObject(ProgID)), membars }
}

module.exports = getMember
