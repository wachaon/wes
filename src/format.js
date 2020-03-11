const FSO = require('Scripting.FileSystemObject')
const { readdirSync } = require('filesystem')
// const Day = require('day')
const { exec } = require('formatter')
const { join } = require('pathname')

const successColor = console.ansi.brightGreen
const failureColor = console.ansi.brightRed
// const infoColor = console.ansi.brightYellow
const { clear } = console.ansi

const dir = readdirSync(join(process.cwd(), 'lib'))

/*
const moduleSpec = join(process.cwd(), 'src', 'modules.json')
if (!existsFileSync(moduleSpec)) writeTextFileSync(moduleSpec, stringify({}))
const mod = require('./modules')
*/

dir.map(spec => {
    const filespec = join(process.cwd(), 'lib', spec)
    const file = FSO.GetFile(filespec)
    let modified = new Date(file.DateLastModified)
    let created = new Date(file.DateCreated)
    return { filespec, modified, created }
}).forEach(spec => {
    const { filespec, modified, created } = spec
    try {
        exec( filespec )
        // mod[filespec] = {modified: new Day( modified ).getTime(), created: new Day( created ).getTime()}
        // console.log( successColor + ' ' + filespec )
    } catch (error) {
        console.log( failureColor + filespec + ': ' + clear + error.message)
    }
} )

// console.log(writeTextFileSync(moduleSpec, stringify(mod, null, 2)))