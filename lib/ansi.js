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
    return `\u001B[${row}A`
}

function cursorDown(row) {
    return `\u001B[${row}B`
}

function cursorForward(column) {
    return `\u001B[${column}C`
}

function cursorBack(column) {
    return `\u001B[${column}D`
}

function cursorHrAbs(column) {
    return `\u001B[${column}G`
}

function eraseInLine(type) {
    return `\u001B[${type}K`
}

var ansi = {
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
    brightRed: '\u001B[91m',
    brightGreen: '\u001B[92m',
    brightYellow: '\u001B[93m',
    brightBlue: '\u001B[94m',
    brightMagenta: '\u001B[95m',
    brightCyan: '\u001B[96m',
    white: '\u001B[97m',

    bgBlack: '\u001B[40m',
    bgRed: '\u001B[41m',
    bgGreen: '\u001B[42m',
    bgYellow: '\u001B[43m',
    bgBlue: '\u001B[44m',
    bgMagenta: '\u001B[45m',
    bgCyan: '\u001B[46m',
    bgSilver: '\u001B[47m',

    bgGray: '\u001B[100m',
    bgBrightRed: '\u001B[101m',
    bgBrightGreen: '\u001B[102m',
    bgBrightYellow: '\u001B[103m',
    bgBrightBlue: '\u001B[104m',
    bgBrightMagenta: '\u001B[105m',
    bgBrightCyan: '\u001B[106m',
    bgWhite: '\u001B[107m',

    color: color,
    bgColor: bgColor,
    cursorUp: cursorUp,
    cursorDown: cursorDown,
    cursorForward: cursorForward,
    cursorBack: cursorBack,
    cursorHrAbs: cursorHrAbs,
    eraseInLine: eraseInLine
}

module.exports = ansi
