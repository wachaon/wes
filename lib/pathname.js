const { CurrentDirectory } = require('WScript.Shell')
const FSO = require('Scripting.FileSystemObject')
const { NONE } = require('text')

const win32Sep = '\\'
const posixSep = '/'
const parentdot = '..'
const currentdot = '.'

const split = function pathname_split(spec) {
    return toPosixSep(spec).split(posixSep)
}
const toWin32Sep = function pathname_toWin32Sep(spec) {
    return spec.split(posixSep).join(win32Sep)
}
const toPosixSep = function pathname_toPosixSep(spec) {
    return spec.split(win32Sep).join(posixSep)
}
const absolute = function pathname_absolute(spec) {
    return toPosixSep(FSO.GetAbsolutePathName(toWin32Sep(spec)))
}

const join = function pathname_join(...spec) {
    let acc = NONE
    for (let i = spec.length - 1; ~i; i--) {
        let curr = toPosixSep(spec[i])
        acc = curr + posixSep + acc
        if (acc.toLowerCase() === absolute(acc).toLowerCase())
            return absolute(acc)
    }
    return absolute(acc)
}

const dirname = function pathname_dirname(path) {
    if (FSO.GetParentFolderName(toWin32Sep(path)) !== NONE) {
        return absolute(FSO.GetParentFolderName(toWin32Sep(path)))
    } else {
        return NONE
    }
}

const extname = function pathname_extname(path) {
    let temp = split(path)
    let res = temp[temp.length - 1].split(currentdot)
    if (res.length > 1) return currentdot + res[res.length - 1]
    return NONE
}

const relative = function pathname_relative(from, to) {
    let _from = split(absolute(from))
    let _to = split(absolute(to))
    if (_from[0] !== _to[0]) return toPosixSep(to)
    while (_from[0] === _to[0]) {
        _from.shift()
        _to.shift()
    }
    _from = _from.fill(parentdot)
    return _from.concat(_to).join(posixSep)
}

const basename = function pathname_basename(path, ext) {
    const temp = split(path)
    const res = temp[temp.length - 1]
    if (
        ext != null &&
        ext[0] === currentdot &&
        res.slice(-ext.length) === ext
    ) {
        return res.slice(0, res.length - ext.length)
    } else {
        return res
    }
}

const normalize = function pathname_normalize(path) {
    let temp = split(removeTailSep(toPosixSep(path)))
    let res = []
    let parent = 0
    for (let i = temp.length - 1; i > -1; i--) {
        let item = temp[i]
        if (item === currentdot || item === NONE) continue
        else if (item === parentdot) parent++
        else if (parent) parent--
        else res.unshift(item)
    }
    if (parent > 0) res.unshift(new Array(parent).fill(parentdot))
    let result = res.join(posixSep)
    if (result.toLowerCase() === absolute(result).toLowerCase())
        return absolute(result)
    return result
}

const removeTailSep = function pathname_removeTailSep(spec) {
    return spec.replace(/[\\\/]+$/, NONE)
}

const isAbsolute = function pathname_isAbsolute(path) {
    return absolute(path) === normalize(path)
}

module.exports = {
    CurrentDirectory: toPosixSep(CurrentDirectory),
    WorkingDirectory: toPosixSep(CurrentDirectory),
    win32Sep,
    posixSep,
    split,
    toWin32Sep,
    toPosixSep,
    absolute,
    join,
    dirname,
    extname,
    relative,
    basename,
    normalize,
    isAbsolute
}
