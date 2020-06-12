const typecheck = require('/lib/typecheck')
const { describe, it, assert, pass } = require('/lib/minitest')

describe('# test typecheck', () => {
    describe('## isNull', () => {
        const { isNull } = typecheck
        it('null', () => {
            assert(isNull(null))
        })
        it('isNull( undefined ) === false', () => {
            assert(isNull(undefined) === false)
        })
        it('isNull( {} ) === false', () => {
            assert(isNull({}) === false)
        })
    })

    describe('## isString', () => {
        const { isString } = typecheck
        it('"wachaon"', () => {
            assert(isString('wachaon'))
        })
        it('new String( 3 )', () => {
            assert(isString(new String(3)))
        })
        it('String( 3.6 )', () => {
            assert(isString(String(3.6)))
        })
    })

    describe('## isNumber', () => {
        const { isNumber } = typecheck
        it('5', () => {
            assert(isNumber(5))
        })
        it('NaN', () => {
            assert(isNumber(NaN))
        })
        it('Infinity', () => {
            assert(isNumber(Infinity))
        })
        it('isNumber( "8" ) === false', () => {
            assert(isNumber('8') === false)
        })
    })

    describe('## isFunction', () => {
        const { isFunction } = typecheck
        it('function(){}', () => {
            assert(isFunction(function() {}))
        })
        it('() => {}', () => {
            assert(isFunction(() => {}))
        })
        it('String', () => {
            assert(isFunction(String))
        })
        it('typecheck.isFunction', () => {
            assert(isFunction(typecheck.isFunction))
        })
        it('class { constructor() {} }', () => {
            assert(
                isFunction(
                    class {
                        constructor() {}
                    }
                )
            )
        })
    })

    describe('## isBoolean', () => {
        const { isBoolean } = typecheck
        it('true', () => {
            assert(isBoolean(true))
        })
        it('false', () => {
            assert(isBoolean(false))
        })
        it('isBoolean( 1 ) === false', () => {
            assert(isBoolean(1) === false)
        })
    })

    describe('## isSymbol', () => {
        const { isSymbol } = typecheck
        it('Symbol()', () => {
            assert(isSymbol(Symbol()))
        })
        it('Symbol.for( isSymbol )', () => {
            assert(isSymbol(Symbol.for(isSymbol)))
        })
    })

    describe('## isDate', () => {
        const { isDate } = typecheck
        it('new Date', () => {
            assert(isDate(new Date()))
        })
        it('new Day', () => {
            const Day = require('day')
            assert(isDate(new Day()))
        })
        it('isDate( new Date().getTime() ) === false', () => {
            assert(isDate(new Date().getTime()) === false)
        })
    })

    describe('## isRegExp', () => {
        const { isRegExp } = typecheck
        it('/RegExp/', () => {
            assert(isRegExp(/RegExp/))
        })
        it('new RegExp( "RegExp" )', () => {
            assert(isRegExp(new RegExp('RegExp')))
        })
        it('isRegExp( "RegExp" ) === false', () => {
            assert(isRegExp('RegExp') === false)
        })
    })

    describe('## isArray', () => {
        const { isArray } = typecheck
        it('[]', () => {
            assert(isArray([]))
        })
        it('Object.keys( typecheck )', () => {
            assert(isArray(Object.keys(typecheck)))
        })
        it('new Array( 90 )', () => {
            assert(isArray(new Array(90)))
        })
        it('isArray( { [0]: "zero", [1]: "one", length: 2 } ) === false', () => {
            assert(isArray({ [0]: 'zero', [1]: 'one', length: 2 }) === false)
        })
        it('( function( a ) { return isArray( arguments ) === false } )( 2 )', () => {
            assert(
                (function(a) {
                    return isArray(arguments) === false
                })(2)
            )
        })
    })

    describe('## isObject', () => {
        const { isObject } = typecheck
        it('{}', () => {
            assert(isObject({}))
        })
        it('new Object', () => {
            assert(isObject(new Object()))
        })
        it('isObject( [] ) === false', () => {
            assert(isObject([]) === false)
        })
        it('isObject( new RegExp( "Object" ) ) === false', () => {
            assert(isObject(new RegExp('Object')) === false)
        })
        it('isObject( new Date ) === false', () => {
            assert(isObject(new Date()) === false)
        })
        it('isObject( function(){} ) === false', () => {
            assert(isObject(function() {}) === false)
        })
    })

    describe('## isClass', () => {
        const { isClass } = typecheck
        it('String', () => {
            assert(isClass(new String(5), String))
        })
        it('Function', () => {
            assert(isClass(new Function('return 5'), Function))
        })
        it('class One', () => {
            class One {}
            const one = new One()
            assert(isClass(one, One))
        })
    })
})

return pass
