const zero = '0'
const NONE = ''
const rHex = /.{1,2}/g

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
    buffer.forEach((v) => res.push((zero + v.toString(16)).slice(-2)))
    return res.join(NONE)
}

const HexToUint8 = function hex_HexToUint8(hex) {
    return new Uint8Array(hex.match(rHex).map((v) => parseInt(v, 16)))
}

module.exports = {
    ByteToHex,
    HexToByte,
    Uint8ToHex,
    HexToUint8
}
