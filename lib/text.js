const LF = '\n'
const CR = '\r'
const CRLF = CR + LF
const SPACE = ' '
const TAB = '\t'
const NONE = ''
const CHECKMARK = '\u2713' // '\u221a'

const _NULL = 'null'
const _UNDEFINED = 'undefind'
const _STRING = 'string'
const _FUNCTION = 'function'
const _BOOLEAN = 'boolean'
const _NUMBER = 'number'
const _SYMBOL = 'symbol'
const _OBJECT = 'object'
const NULL = 'Null'
const UNDEFINED = 'Undefined'
const STRING = 'String'
const FUNCTION = 'Function'
const BOOLEAN = 'Boolean'
const NUMBER = 'Number'
const SYMBOL = 'Symbol'
const ARRAY = 'Array'
const OBJECT = 'Object'
const REGEXP = 'RegExp'
const DATE = 'Date'
const MATH = 'Math'
const INT8ARRAY = 'Int8Array'
const UINT8ARRAY = 'Uint8Array'
const UINT8CLAMPEDARRAY = 'Uint8ClampedArray'
const INT16ARRAY = 'Int16Array'
const UINT16ARRAY = 'Uint16Array'
const INT32ARRAY = 'Int32Array'
const UINT32ARRAY = 'Uint32Array'
const FLOAT32ARRAY = 'Float32Array'
const FLOAT64ARRAY = 'Float64Array'
const BIGINT64ARRAY = 'BigInt64Array'
const BIGUINT64ARRAY = 'BigUint64Array'
const ERROR = 'Error'
const EVALERROR = 'EvalError'
const RANGEERROR = 'RangeError'
const REFERENCEERROR = 'ReferenceError'
const SYNTAXERROR = 'SyntaxError'
const TYPEERROR = 'TypeError'
const URIERROR = 'URIError'

const rLINE_SEP = /\r?\n/g
const rLF = /\n/g
const rCR = /\r/g
const rCRLF = /\r\n/g
const rSPACE = /\s/g
const rSPACES = /\s+/g
const rBLANK_LINE = /^\s+$/
const rTAB = /\t/g
const rTABS = /\t+/g
const INDNT = /^\s+/

const trimStarts = function text_trimStarts(string) {
    return string.replace(/^([\s\r\n]+\n)/, NONE)
}
const trimEnds = function text_trimEnds(string) {
    return string.replace(/(\n[\s\r\n]+)$/, NONE)
}
const trim = function text_trimEnds(string) {
    return trimStarts(trimEnds(string))
}
const splitLines = function text_splitLines(string, mod, start, end) {
    const sep = rCRLF.test(string) ? CRLF : LF
    return string
        .split(rLINE_SEP)
        .filter((value, i) => (start < i % mod && i % mod < end) || rBLANK_LINE.test(value))
        .join(sep)
}

const unindent = function text_unindent(text) {
    const lineBreak = text.includes(CRLF) ? CRLF : LF
    let line = text.split(rLINE_SEP)
    const lastLineSpace = line[line.length - 1].match(INDNT)
    if (lastLineSpace == null) return text
    return line
        .map((v) => {
            return v.replace(lastLineSpace, NONE)
        })
        .join(lineBreak)
        .replace(/^\s+/, NONE)
}

module.exports = {
    LF,
    CR,
    CRLF,
    SPACE,
    TAB,
    NONE,
    CHECKMARK,

    _NULL,
    _UNDEFINED,
    _STRING,
    _FUNCTION,
    _BOOLEAN,
    _NUMBER,
    _SYMBOL,
    _OBJECT,
    NULL,
    UNDEFINED,
    STRING,
    FUNCTION,
    BOOLEAN,
    NUMBER,
    SYMBOL,
    ARRAY,
    OBJECT,
    REGEXP,
    DATE,
    MATH,
    INT8ARRAY,
    UINT8ARRAY,
    UINT8CLAMPEDARRAY,
    INT16ARRAY,
    UINT16ARRAY,
    INT32ARRAY,
    UINT32ARRAY,
    FLOAT32ARRAY,
    FLOAT64ARRAY,
    BIGINT64ARRAY,
    BIGUINT64ARRAY,
    ERROR,
    EVALERROR,
    RANGEERROR,
    REFERENCEERROR,
    SYNTAXERROR,
    TYPEERROR,
    URIERROR,

    rLINE_SEP,
    rLF,
    rCR,
    rCRLF,
    rSPACE,
    rSPACES,
    rBLANK_LINE,
    rTAB,
    rTABS,
    INDNT,

    trimStarts,
    trimEnds,
    trim,
    splitLines,
    unindent
}
