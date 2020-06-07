function pipe() {
    const translators = []
    function process(
        data,
        callback = (err, res) => {
            if (err) throw err
            else return res
        }
    ) {
        let res = data
        let err = null
        try {
            for (let i = 0; i < translators.length; i++) {
                res = translators[i](res)
            }
        } catch (error) {
            err = error
        } finally {
            callback(err, res)
        }
    }
    function use(fn) {
        translators.push(fn)
        return {
            use,
            process
        }
    }
    return use((data) => data)
}
module.exports = pipe
