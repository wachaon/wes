const WShell = require('WScript.Shell')
const { TypeName } = require('VBScript')

function getMember(ProgID) {
    const command = `PowerShell -NoProfile -NoExit -Command $com = New-Object -ComObject "${ProgID}";$com|Get-Member`
    const _type = TypeName(WScript.CreateObject(ProgID))
    const exec = WShell.Exec(command)
    var stream = exec.StdOut

    const output = []
    let i = 0

    while (true) {
        const content = stream.ReadLine()
        if (i++ > 5 && content.trim() === '') break
        output.push(content)
    }

    const [Name, MemberType, Definition] = output[5].match(/(\-+\s+)/g).map((line) => line.length)
    const typename = output[2].slice(12).trim()

    const membars = output.slice(7, -3).map((row) => {
        const type = row.slice(Name, Name + MemberType).trim()
        const name = row.slice(0, Name).trim()
        const description = row.slice(Name + MemberType, Name + MemberType + Definition - 1).trim()
        return { name, type, description }
    })

    return { ProgID, TypeName: _type, typename, membars }
}

module.exports = getMember
