const main = wes.Modules[wes.main].path

function isCLI(spec) {
    return main === spec
}

if (isCLI(__filename)) console.log('[isCLI]  main === %O', main)
else module.exports = isCLI
