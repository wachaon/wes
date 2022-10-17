const { Type } = require('VBScript')
const { ByteToHex, HexToByte, Uint8ToHex, HexToUint8 } = require('hex')
const { isString, isArray } = require('typecheck')

class Buffer extends Uint8Array {
    constructor(data) {
        if (data instanceof Buffer) return data
        else if (Type(data) === 'vbByte[]') super(HexToUint8(ByteToHex(data)))
        else if (data instanceof Uint8Array) super(data)
        else if (isString(data)) {
            const uint16Array = Uint16Array.from(data, (c) => c.charCodeAt(0))
            const len = uint16Array.length
            const uint8Array = new Uint8Array(len * 2)
            for (let i = 0, j = 0; i < len; ++i, j += 2) {
                uint8Array[j] = (uint16Array[i] & 0xff00) >> 8
                uint8Array[j + 1] = uint16Array[i] & 0x00ff
            }
            super(uint8Array)
        } else if (isArray(data)) super(data)
        else
            throw new TypeError(
                'argument type that can be passed to the constructor is a `string`, `Buffer`, `byte[]`, or `Array`'
            )
    }
    toByte() {
        return HexToByte(Uint8ToHex(this))
    }
    static from(date) {
        return new Buffer(date)
    }
    static isBuffer(instance) {
        return instance instanceof Buffer
    }
}

module.exports = Buffer
