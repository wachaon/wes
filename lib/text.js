const LF = '\n'
const CR = '\r'
const CRLF = CR + LF
const SPACE = ' '
const TAB = '\t'
const NONE = ''

const REG_LINE_SEP = /\r?\n/g
const REG_LF = /\n/g
const REG_CRLF = /\r\n/g
const REG_SPACE = /\s/g
const REG_SPACES = /\s+/g
const REG_BLANK_LINE = /^\s+$/
const REG_TAB = /\t/g
const REG_TABS = /\t+/g

const trimStarts = (string) => {
    return string.replace(/^([\s\r\n]+\n)/, NONE)
}
const trimEnds = (string) => {
    return string.replace(/(\n[\s\r\n]+)$/, NONE)
}
const trim = (string) => {
    return trimStarts(trimEnds(string))
}
const splitLines = (string, mod, start, end) => {
    const sep = REG_CRLF.test(string) ? CRLF : LF
    return string
        .split(REG_LINE_SEP)
        .filter(
            (value, i) =>
                (start < i % mod && i % mod < end) || REG_BLANK_LINE.test(value)
        )
        .join(sep)
}

module.exports = {
    LF,
    CR,
    CRLF,
    SPACE,
    TAB,
    NONE,

    REG_LINE_SEP,
    REG_LF,
    REG_CRLF,
    REG_SPACE,
    REG_SPACES,
    REG_BLANK_LINE,
    REG_TAB,
    REG_TABS,

    trimStarts,
    trimEnds,
    trim,
    splitLines
}
