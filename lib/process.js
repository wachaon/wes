// COM
var WShell = require('WScript.Shell')

// Built-ins
var NONE = require('text').NONE
var toPosixSep = require('pathname').toPosixSep
var version = require('version')
var argv = require('argv')

var cwd = function process_cwd() {
    return toPosixSep(WShell.CurrentDirectory)
}

var arch = WShell.ExpandEnvironmentStrings('%PROCESSOR_ARCHITECTURE%')

var platform = 'win32'

var env = {
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
    cwd: cwd,
    env: env,
    argv: argv,
    arch: arch,
    platform: platform,
    version: version,
    stdout: stdout,
    stderr: stderr
}
