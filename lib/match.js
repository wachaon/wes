const { toPosixSep } = require('pathname')
const { readdirsSync } = require('filesystem')
const { NONE } = require('text')

const match = function match_match(pattern, matcher) {
    var spec = toPosixSep(pattern).replace(/\./g, '\\.').replace(/\?/g, '.').split(NONE)
    for (var i = 0; i < spec.length; i++) {
        const curr = spec[i]
        const next = i + 1 < spec.length ? spec[i + 1] : NONE
        const again = i + 2 < spec.length ? spec[i + 2] : NONE
        if (curr === '*') {
            if (next === '*') {
                spec[i] = '.*'
                spec[i + 1] = ''
                if (again === '/') spec[i + 2] = NONE
            } else spec[i] = '[^/]*'
        }
    }
    var expected = new RegExp('^' + spec.join(NONE))
    return matcher != null ? expected.test(matcher) : expected
}

match.match = match
match.search = function match_search(pattern, curr) {
    return readdirsSync(curr, (file, dir) => {
        if (file) return match(pattern, file)
        else return match(pattern, dir)
    })
}

module.exports = match

//
