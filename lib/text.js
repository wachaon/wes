const LF = '\n'
const CR = '\r'
const CRLF = CR + LF
const SPACE = ' '
const TAB = '\t'
const NONE = ''

const REG_LINE_SEP = /\r?\n/g
const REG_LF = /\n/g
const REG_CR = /\r/g
const REG_CRLF = /\r\n/g
const REG_SPACE = /\s/g
const REG_SPACES = /\s+/g
const REG_BLANK_LINE = /^\s+$/
const REG_TAB = /\t/g
const REG_TABS = /\t+/g
const INDNT = /^\s+/

const trimStarts = function text_trimStarts ( string ) {
    return string.replace( /^([\s\r\n]+\n)/, NONE )
}
const trimEnds = function text_trimEnds ( string ) {
    return string.replace( /(\n[\s\r\n]+)$/, NONE )
}
const trim = function text_trimEnds ( string ) {
    return trimStarts( trimEnds( string ) )
}
const splitLines = function text_splitLines ( string, mod, start, end ) {
    const sep = REG_CRLF.test( string ) ? CRLF : LF
    return string
        .split( REG_LINE_SEP )
        .filter(
            ( value, i ) =>
                ( start < i % mod && i % mod < end ) || REG_BLANK_LINE.test( value )
        )
        .join(sep)
}

const unindent = function text_unindent ( text ) {
    const lineBreak = text.includes( CRLF ) ? CRLF : LF
    let line = text.split( REG_LINE_SEP )
    const lastLineSpace = line[ line.length - 1 ].match( INDNT )
    if ( lastLineSpace == null ) return text
    return line.map( v => {
       return v.replace( lastLineSpace, '' )
    } ).join( lineBreak ).replace( /^\s+/, '')
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
    REG_CR,
    REG_CRLF,
    REG_SPACE,
    REG_SPACES,
    REG_BLANK_LINE,
    REG_TAB,
    REG_TABS,

    trimStarts,
    trimEnds,
    trim,
    splitLines,
    unindent
}