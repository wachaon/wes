function color(red, green, blue) {
    var args = Array.prototype.slice.call(arguments)
    if (args.length === 1 && args[0].startsWith('#')) {
        red = parseInt(args[0].slice(1, 3), 16)
        green = parseInt(args[0].slice(3, 5), 16)
        blue = parseInt(args[0].slice(5, 7), 16)
    }
    return '\u001B[38;2;' + red + ';' + green + ';' + blue + 'm'
}

function bgColor(red, green, blue) {
    var args = Array.prototype.slice.call(arguments)
    if (args.length === 1 && args[0].startsWith('#')) {
        red = parseInt(args[0].slice(1, 3), 16)
        green = parseInt(args[0].slice(3, 5), 16)
        blue = parseInt(args[0].slice(5, 7), 16)
    }
    return '\u001B[48;2;' + red + ';' + green + ';' + blue + 'm'
}

function cursorUp(row) {
    return '\u001B[' + row + 'A'
}

function cursorDown(row) {
    return '\u001B[' + row + 'B'
}

function cursorForward(column) {
    return '\u001B[' + column + 'C'
}

function cursorBack(column) {
    return '\u001B[' + column + 'D'
}

function cursorNextLine(row) {
    return '\u001B[' + row + 'E'
}

function cursorPreviousLine(row) {
    return '\u001B[' + row + 'F'
}

function cursorHrAbs(column) {
    return '\u001B[' + column + 'G'
}

function cursorPosition(row, column) {
    return '\u001B[' + row + ';' + column + 'H'
}

function eraseinDisplay(type) {
    // type {Number} Clears part of the screen.
    // 0: clear from cursor to the end of screen.
    // 1: clear from cursor to beginning of screen.
    // 2: clear from clear entire screen
    // 3: clear entire screen and delete all lines saved in the scrollback buffer
    if (type == null) return '\u001B[' + 0 + 'J'
    return '\u001B[' + type + 'J'
}

function eraseInLine(type) {
    // type {Number} Erases part of the line. and Cursor position does not change.
    // 0: clear from cursor to the end of the line.
    // 1: clear from cursor to beginning of the line.
    // 2: clear from clear entire line
    if (type == null) return '\u001B[' + 0 + 'K'
    return '\u001B[' + type + 'K'
}

function scrollUp(row) {
    return '\u001B[' + row + 'S'
}

function scrollDown(row) {
    return '\u001B[' + row + 'T'
}

function hrVerticalPos(row, column) {
    return '\u001B[' + row + ';' + column + 'f'
}

module.exports = {
    clear: '\u001B[0m',
    bold: '\u001B[1m',
    underscore: '\u001B[4m',
    blink: '\u001B[5m',
    reverse: '\u001B[7m',
    concealed: '\u001B[8m',

    black: '\u001B[30m',
    red: '\u001B[31m',
    green: '\u001B[32m',
    yellow: '\u001B[33m',
    blue: '\u001B[34m',
    magenta: '\u001B[35m',
    cyan: '\u001B[36m',
    silver: '\u001B[37m',

    gray: '\u001B[90m',
    redBright: '\u001B[91m',
    greenBright: '\u001B[92m',
    yellowBright: '\u001B[93m',
    blueBright: '\u001B[94m',
    magentaBright: '\u001B[95m',
    cyanBright: '\u001B[96m',
    white: '\u001B[97m',
    whiteBright: '\u001B[97m',

    bgBlack: '\u001B[40m',
    bgRed: '\u001B[41m',
    bgGreen: '\u001B[42m',
    bgYellow: '\u001B[43m',
    bgBlue: '\u001B[44m',
    bgMagenta: '\u001B[45m',
    bgCyan: '\u001B[46m',
    bgSilver: '\u001B[47m',

    bgGray: '\u001B[100m',
    bgRedBright: '\u001B[101m',
    bgGreenBright: '\u001B[102m',
    bgYellowBright: '\u001B[103m',
    bgBlueBright: '\u001B[104m',
    bgMagentaBright: '\u001B[105m',
    bgCyanBright: '\u001B[106m',
    bgWhite: '\u001B[107m',
    bgWhiteBright: '\u001B[107m',

    eraseWholeLine: '\r\u001B[2K',

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
