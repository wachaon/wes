const { describe, it, assert, pass } = require('/lib/minitest')
const match = require('/lib/match')

const cases = {
    'path/**/*.html': {
        'path/x.html': true,
        'path/x/y.html': true,
        'path/x/y/z.html': true,
        'path//x.html': true,
        'path//x//y.html': true,
        'path//x//y//z.html': true,
        'path.html': false,
        'pathx.html': false,
        'pathx/y.html': false,
        'pathx/y/z.html': false,
    },
    'path/**/**/*.html': {
        'path/x.html': true,
        'path/x/y.html': true,
        'path/x/y/z.html': true,
        'path//x.html': true,
        'path//x//y.html': true,
        'path//x//y//z.html': true,
        'path.html': false,
        'pathx.html': false,
        'pathx/y.html': false,
        'pathx/y/z.html': false,
    },
    '**/*.html': {
        'path/x.html': true,
        'path/x/y.html': true,
        'path/x/y/z.html': true,
        'path//x.html': true,
        'path//x//y.html': true,
        'path//x//y//z.html': true,
        'path.html': true,
        'pathx.html': true,
        'pathx/y.html': true,
        'pathx/y/z.html': true,
        '/z.html': true,
    },
    '**/**/*.html': {
        'path/x.html': true,
        'path/x/y.html': true,
        'path/x/y/z.html': true,
        'path//x.html': true,
        'path//x//y.html': true,
        'path//x//y//z.html': true,
        'path.html': true,
        'pathx.html': true,
        'pathx/y.html': true,
        'pathx/y/z.html': true,
        '/z.html': true,
    },
    'path/?/*.html': {
        'path/x.html': false,
        'path/x/y.html': true,
        'path/x/y/z.html': false,
        'path//x.html': false,
        'path//x//y.html': false,
        'path//x//y//z.html': false,
        'path.html': false,
        'pathx.html': false,
        'pathx/y.html': false,
        'pathx/y/z.html': false,
        '/y/z.html': false,
    }
}

describe('# blog test', () => {
    Object.keys(cases).forEach(query => {
        Object.keys(cases[query]).forEach(actual => {
            it('match("' + query + '", "' + actual + '") // => ' + cases[query][actual], () => {
                assert.equal(match(query, actual), cases[query][actual])
            })
        })
    })
})
