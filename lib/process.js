// COM
const WShell = require('WScript.Shell')

// Built-ins
const { NONE } = require('text')
const { toPosixSep } = require('pathname')
const argv = require('argv')
const version = require('version')

var cwd = function process_cwd() {
    return toPosixSep(WShell.CurrentDirectory)
}

var arch = WShell.ExpandEnvironmentStrings('%PROCESSOR_ARCHITECTURE%')

var platform = 'win32'

const env = {
    NODE_ENV: NONE
}

var stdout = {
    write: function stdout_write(msg) {
        return console.log(msg)
    }
}
var stderr = {
    write: function stderr_write(msg) {
        return console.error(msg)
    }
}

module.exports = {
    cwd,
    env,
    argv,
    arch,
    platform,
    version,
    stdout,
    stderr
}
