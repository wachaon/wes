const WShell = require('WScript.Shell')
const { TypeName: type } = require('VBScript')
const isCLI = require('isCLI')
const { get, has, unnamed } = require('argv')

if (isCLI(__filename)) {
    if (has('progID')) return console.log('%O', getMember(get('progID')))
    if (has('p')) return console.log('%O', getMember(get('p')))
    if (unnamed[1] != null) return console.log('%O', getMember(unnamed[1]))
    throw new Error('It is mandatory to specify the Program ID for the Component Object Model.')
}

function getMember(progID) {
    try {
        const command = `PowerShell $com=New-Object -ComObject "${progID}"; $com | Get-Member`
        const stream = WShell.Exec(command)
        const data = stream.StdOut.ReadAll()

        let TypeName = null
        const types = type(require(progID))
        const caption = /^\s+TypeName:(.+)$/
        const content = /^([^\s]+)\s+([^\s]+)\s+(.+)$/
        let members = data
            .split(/\r?\n/)
            .filter((row, i) => {
                if (caption.test(row)) TypeName = caption.exec(row)[1].trim()
                if (i < 6) return false
                return content.test(row) ? true : false
            })
            .map((row) => {
                const [_, Name, MemberType, definition] = content.exec(row)
                return { Name, MemberType, Definition: definition.trim() }
            })
        return { progID, types, TypeName, members }
    } catch (error) {
        console.log(error.stack)
    }
}

module.exports = getMember