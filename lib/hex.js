const ByteToHex = function hex_ByteToHex(byte) {
    let elm = require('Msxml2.DOMDocument').createElement('elm')
    elm.dataType = 'bin.hex'
    elm.nodeTypedValue = byte
    return elm.text
}
const HexToByte = function hex_HexToByte(hex) {
    let elm = require('Msxml2.DOMDocument').createElement('elm')
    elm.dataType = 'bin.hex'
    elm.text = hex
    return elm.nodeTypedValue
}

const Uint8ToHex = function hex_Uint8ToHex(buffer) {
    let res = []
    buffer.forEach(v => res.push(('0' + v.toString(16)).slice(-2)))
    return res.join('')
}

const HexToUint8 = function hex_HexToUint8(hex) {
    return new Uint8Array(hex.match(/.{1,2}/g).map(v => parseInt(v, 16)))
}

module.exports = {
    ByteToHex,
    HexToByte,
    Uint8ToHex,
    HexToUint8
}
