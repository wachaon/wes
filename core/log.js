const log = ( code ) => {
    let res = code()
    switch ( true ) {
        case typeof res === 'function' || res instanceof RegExp:
            res = res.toString()
            break
        case res instanceof Date:
            res = res.toISOString()
            break
        case res === ( function(){} )():
            res = 'undefined'
            break
        case res === null:
            res = null
            break
        default:
            res = JSON.stringify( res, null, 2 )
    }
    const { highGreen: green } = console.ansi
    console.log( code.toString() + green + ' // => ' + res )
}

module.exports = log