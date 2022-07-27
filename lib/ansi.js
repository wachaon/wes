/** Reset or normal */
var clear = '\u001B[0m'
/**	Bold or increased intensity */
var bold = '\u001B[1m'
/** Underline */
var underscore = '\u001B[4m'
/** Slow blink */
var blink = '\u001B[5m'
/** Reverse video or invert */
var reverse = '\u001B[7m'
/** Conceal or hide */
var concealed = '\u001B[8m'

/** Black foreground color */
var black = '\u001B[30m'
/** Red foreground color */
var red = '\u001B[31m'
/** Green foreground color */
var green = '\u001B[32m'
/** Yellow foreground color */
var yellow = '\u001B[33m'
/** Blue foreground color */
var blue = '\u001B[34m'
/** Magenta foreground color */
var magenta = '\u001B[35m'
/** Cyan foreground color */
var cyan = '\u001B[36m'
/** Silver foreground color */
var silver = '\u001B[37m'

/** Gray foreground color */
var gray = '\u001B[90m'
/** Bright red foreground color */
var redBright = '\u001B[91m'
/** Bright green foreground color */
var greenBright = '\u001B[92m'
/** Bright yellow foreground color */
var yellowBright = '\u001B[93m'
/** Bright blue foreground color */
var blueBright = '\u001B[94m'
/** Bright magenta foreground color */
var magentaBright = '\u001B[95m'
/** Bright cyan foreground color */
var cyanBright = '\u001B[96m'
/** white foreground color */
var white = '\u001B[97m'
/** Bright white foreground color */
var whiteBright = '\u001B[97m'

/** Black background color */
var bgBlack = '\u001B[40m'
/** Red background color */
var bgRed = '\u001B[41m'
/** Green background color */
var bgGreen = '\u001B[42m'
/** Yellow background color */
var bgYellow = '\u001B[43m'
/** Blue background color */
var bgBlue = '\u001B[44m'
/** Magenta background color */
var bgMagenta = '\u001B[45m'
/** Cyan background color */
var bgCyan = '\u001B[46m'
/** Silver background color */
var bgSilver = '\u001B[47m'

/** Gray background color */
var bgGray = '\u001B[100m'
/** Bright red background color */
var bgRedBright = '\u001B[101m'
/** Bright green background color */
var bgGreenBright = '\u001B[102m'
/** Bright yellow background color */
var bgYellowBright = '\u001B[103m'
/** Bright blue background color */
var bgBlueBright = '\u001B[104m'
/** Bright magenta background color */
var bgMagentaBright = '\u001B[105m'
/** Bright cyan background color */
var bgCyanBright = '\u001B[106m'
/** white background color */
var bgWhite = '\u001B[107m'
/** Bright white background color */
var bgWhiteBright = '\u001B[107m'

/** Clears the entire line. */
var eraseWholeLine = '\r\u001B[2K'

/**
 * Returns the character that changes the color of the console output text.
 * @param {number|string} red Color code string starting with an integer or #.
 * @param {number} green
 * @param {number} blue
 * @returns {string} ANSI escape code
 */
function color(red, green, blue) {
    var args = Array.prototype.slice.call(arguments)
    if (args.length === 1 && args[0].startsWith('#')) {
        red = parseInt(args[0].slice(1, 3), 16)
        green = parseInt(args[0].slice(3, 5), 16)
        blue = parseInt(args[0].slice(5, 7), 16)
    }
    return '\u001B[38;2;' + red + ';' + green + ';' + blue + 'm'
}

/**
 * Returns the character that changes the background color of the console's output characters.
 * @param {number|string} red Color code string starting with an integer or #.
 * @param {number} green
 * @param {number} blue
 * @returns {string} ANSI escape code
 */
function bgColor(red, green, blue) {
    var args = Array.prototype.slice.call(arguments)
    if (args.length === 1 && args[0].startsWith('#')) {
        red = parseInt(args[0].slice(1, 3), 16)
        green = parseInt(args[0].slice(3, 5), 16)
        blue = parseInt(args[0].slice(5, 7), 16)
    }
    return '\u001B[48;2;' + red + ';' + green + ';' + blue + 'm'
}

/**
 * Moves the cursor upward by n cells.
 * @param {number} row
 * @returns {string} ANSI escape code
 */
function cursorUp(row) {
    return '\u001B[' + row + 'A'
}

/**
 * Moves the cursor downward by n cells.
 * @param {number} row
 * @returns {string} ANSI escape code
 */
function cursorDown(row) {
    return '\u001B[' + row + 'B'
}

/**
 * Moves the cursor forward by n cells.
 * @param {number} column
 * @returns {string} ANSI escape code
 */
function cursorForward(column) {
    return '\u001B[' + column + 'C'
}

/**
 * Moves the cursor backward by n cells.
 * @param {number} column
 * @returns {string} ANSI escape code
 */
function cursorBack(column) {
    return '\u001B[' + column + 'D'
}

/**
 * Moves cursor to beginning of the line n (default 1) lines down.
 * @param {number} row
 * @returns {string} ANSI escape code
 */
function cursorNextLine(row) {
    return '\u001B[' + row + 'E'
}

/**
 * Moves cursor to beginning of the line n (default 1) lines up.
 * @param {number} row
 * @returns {string} ANSI escape code
 */
function cursorPreviousLine(row) {
    return '\u001B[' + row + 'F'
}

/**
 * Moves the cursor to column n (default 1).
 * @param {number} column
 * @returns {string} ANSI escape code
 */
function cursorHrAbs(column) {
    return '\u001B[' + column + 'G'
}

/**
 * Moves the cursor to row n, column m. The values are 1-based, and default to 1 (top left corner)
 * @param {number} row
 * @param {number} column
 * @returns {string} ANSI escape code
 */
function cursorPosition(row, column) {
    return '\u001B[' + row + ';' + column + 'H'
}

/**
 * Clears part of the screen. If n is 0 (or nullable), clear from cursor to end of screen.
 * If n is 1, clear from cursor to beginning of the screen.
 * If n is 2, clear entire screen.
 * If n is 3, clear entire screen and delete all lines saved in the scrollback buffer
 * @param {number} type
 * @returns {string} ANSI escape code
 */
function eraseinDisplay(type) {
    if (type == null) return '\u001B[' + 0 + 'J'
    return '\u001B[' + type + 'J'
}

/**
 * Erases part of the line. If n is 0 (or nullable), clear from cursor to the end of the line.
 * If n is 1, clear from cursor to beginning of the line.
 * If n is 2, clear entire line. Cursor position does not change.
 * @param {number} type
 * @returns {string} ANSI escape code
 */
function eraseInLine(type) {
    if (type == null) return '\u001B[' + 0 + 'K'
    return '\u001B[' + type + 'K'
}

/**
 * Scroll whole page up by n (default 1) lines. New lines are added at the bottom.
 * @param {number} row
 * @returns {string} ANSI escape code
 */
function scrollUp(row) {
    return '\u001B[' + row + 'S'
}

/**
 * Scroll whole page down by n (default 1) lines. New lines are added at the top.
 * @param {number} row
 * @returns {string} ANSI escape code
 */
function scrollDown(row) {
    return '\u001B[' + row + 'T'
}

/**
 * Counted as a format effector function (CR, LF, etc.).
 * @param {number} row
 * @param {number} column
 * @returns {string} ANSI escape code
 */
function hrVerticalPos(row, column) {
    return '\u001B[' + row + ';' + column + 'f'
}

module.exports = {
    clear: clear,
    bold: bold,
    underscore: underscore,
    blink: blink,
    reverse: reverse,
    concealed: concealed,

    black: black,
    red: red,
    green: green,
    yellow: yellow,
    blue: blue,
    magenta: magenta,
    cyan: cyan,
    silver: silver,

    gray: gray,
    redBright: redBright,
    greenBright: greenBright,
    yellowBright: yellowBright,
    blueBright: blueBright,
    magentaBright: magentaBright,
    cyanBright: cyanBright,
    white: white,
    whiteBright: whiteBright,

    bgBlack: bgBlack,
    bgRed: bgRed,
    bgGreen: bgGreen,
    bgYellow: bgYellow,
    bgBlue: bgBlue,
    bgMagenta: bgMagenta,
    bgCyan: bgCyan,
    bgSilver: bgSilver,

    bgGray: bgGray,
    bgRedBright: bgRedBright,
    bgGreenBright: bgGreenBright,
    bgYellowBright: bgYellowBright,
    bgBlueBright: bgBlueBright,
    bgMagentaBright: bgMagentaBright,
    bgCyanBright: bgCyanBright,
    bgWhite: bgWhite,
    bgWhiteBright: bgWhiteBright,

    eraseWholeLine: eraseWholeLine,

    color: color,
    bgColor: bgColor,
    cursorUp: cursorUp,
    cursorDown: cursorDown,
    cursorForward: cursorForward,
    cursorBack: cursorBack,
    cursorHrAbs: cursorHrAbs,
    eraseInLine: eraseInLine,
    cursorNextLine: cursorNextLine,
    cursorPreviousLine: cursorPreviousLine,
    cursorPosition: cursorPosition,
    eraseinDisplay: eraseinDisplay,
    scrollUp: scrollUp,
    scrollDown: scrollDown,
    hrVerticalPos: hrVerticalPos
}
