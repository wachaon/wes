function isCLI(file) {
    return wes.Modules[wes.main].path === file
}

module.exports = isCLI

if (isCLI(__filename)) console.log('isCLI: %O', isCLI)
