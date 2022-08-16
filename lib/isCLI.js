const main = wes.Modules[wes.main].path

function isCLI(spec) {
    return main === spec
}
isCLI.main = main
isCLI.__callFromTest = () => {
    return wes.filestack.some((spec) => {
        return /([\/\.]test(\/|\.[cm]?js$))/.test(spec)
    })
}

module.exports = isCLI

if (isCLI(__filename)) console.log('[isCLI]  main === %O', main)
