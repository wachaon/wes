function pipe () {
    const translators = []
    function process ( data, callback = ( err, res ) => res ) {
        let res, err
        try {
            res = translators.reduce( ( acc, curr, i ) => {
                return curr( i === 1 ? data : acc )
            } )
        } catch ( error ) {
            err = error
        } finally {
            return callback( err, res )
        }
    }
    function use ( fn ) {
        translators.push( fn )
        return {
            use,
            process
        }
    }
    return use( null )
}

module.exports = pipe