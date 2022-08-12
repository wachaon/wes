const main = wes.Modules[wes.main].path

function isCLI(spec) {
    return main === spec
}
isCLI.main = main
isCLI.__callFromTest = /\btest.js$/.test(main)

module.exports = isCLI

if (isCLI(__filename)) console.log('[isCLI]  main === %O', main)
