module.exports = function isCLI(file) {
    return wes.Modules[wes.main].path === file
}
