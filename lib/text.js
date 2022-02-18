const LF = '\n'
const CR = '\r'
const CRLF = CR + LF
const SPACE = ' '
const TAB = '\t'
const NONE = ''
const CHECKMARK = '\u2713' // '\u221a'

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
            return v.replace(lastLineSpace, '')
        })
        .join(lineBreak)
        .replace(/^\s+/, '')
}

module.exports = {
    LF,
    CR,
    CRLF,
    SPACE,
    TAB,
    NONE,
    CHECKMARK,

    rLINE_SEP,
    rLF,
    rCR,
    rCRLF,
    rSPACE,
    rSPACES,
    rBLANK_LINE,
    rTAB,
    rTABS,

    trimStarts,
    trimEnds,
    trim,
    splitLines,
    unindent
}
