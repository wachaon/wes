const WShell = require('WScript.Shell')

const NONE = ''
const Current = '.'
const Parent = '..'
const posixSep = '/'
const win32Sep = '\\'

const toPosixSep = function pathname_toPosixSep(path) {
    return path.split(win32Sep).join(posixSep)
}

const toWin32Sep = function pathname_toWin32Sep(path) {
    return path.split(posixSep).join(win32Sep)
}

const CurrentDirectory = toPosixSep(WShell.CurrentDirectory)

const split = function pathname_split(path) {
    return toPosixSep(path).split(posixSep)
}

const UNC = /^(\/\/[^\/]+\/[^\/]+\/?)(|.+)$/
const SCHEME = /^([A-z]{2,}:\/\/[^\/]+\/?)(|.+)$/
const DRIVE = /^([A-z]:\/?)(|.+)$/
const CWD = /^(?!\/\/)(\/)(.+)$/
const RELATIVE = ''

const _normalize = function pathname_normalize(path) {
    const paths = path.split(posixSep)
    const res = []
    for (let dir of paths) {
        if (dir === Current || dir === NONE) continue
        if (dir === Parent) {
            if (res.length === 0 || res[res.length - 1] === Parent) res.push(Parent)
            else res.pop()
        } else res.push(dir)
    }
    return res.join(posixSep)
}

const parse = function pathname_parse(path) {
    path = toPosixSep(path)

    let res = null

    if (UNC.test(path)) {
        let [, root, body] = UNC.exec(path)
        body = body.replace(/^\/+/g, '')
        res = { type: UNC, root, body }
    } else if (SCHEME.test(path)) {
        let [, root, body] = SCHEME.exec(path)
        // root = root.replace(/\/+$/, '') + '/'
        body = body.replace(/^\/+/g, '')
        res = { type: SCHEME, root, body }
    } else if (DRIVE.test(path)) {
        let [, root, body] = DRIVE.exec(path)
        root = root.replace(/^([A-z])/, ($1) => $1.toUpperCase())
        body = body.replace(/^\/+/g, '')
        res = { type: DRIVE, root, body }
    } else if (CWD.test(path)) {
        let [, , _body] = CWD.exec(path)
        let [, root, body] = DRIVE.exec(process.cwd())
        // root = root.replace(/^([A-z])/, ($1) => $1.toUpperCase()) + posixSep
        // body = body.replace(/^\/+/g, '')
        res = { type: CWD, root, body: body + posixSep + _body }
    } else res = { type: RELATIVE, root: '', body: path }

    res.body = res.type == RELATIVE ? _normalize(res.body) : _normalize(res.body).replace(/^(\.\.\/)+/, '')

    let paths = res.body.split(posixSep)
    let _dir = NONE
    let base = NONE
    if (paths.length === 1) base = paths[0]
    else[_dir, base] = [paths.slice(0, -1).join(posixSep), paths[paths.length - 1]]

    let dir = res.root + _dir

    const dot = '.'
    let name = NONE
    let ext = NONE
    let bases = base.split(dot)

    if ((bases.length === 2 && bases[0] === NONE) || bases.length === 1) [name, ext] = [base, '']
    else[name, ext] = [bases.slice(0, -1).join(dot), dot + bases[bases.length - 1]]

    res.dir = dir
    res.base = base
    res.ext = ext
    res.name = name

    return res
}

const isAbsolute = function pathname_isAbsolute(path) {
    const { root, type } = parse(path)
    return type === SCHEME ? false : !!root
}

const dirname = function pathname_dirname(path) {
    if (/^[A-z]:$/.test(path)) return path
    const { root, body } = parse(path)
    if (body === NONE) return root
    const _body = body.split(posixSep)
    if (_body.length === 1) {
        if (root === NONE) return '.'
        return root
    }
    return split([root, body].join(NONE)).slice(0, -1).join(posixSep)
}

const extname = function pathname_extname(path) {
    return parse(path).ext
}

const basename = function pathname_basename(path, ext) {
    let { base } = parse(path)
    if (ext != null && base.endsWith(ext)) {
        base = Array.from(base)
            .slice(0, ext.length * -1)
            .join(NONE)
    }
    return base
}

const normalize = function pathname_normalize(path) {
    let { root, body } = parse(path)
    return [root, body].join(NONE)
}

const absolute = function pathname_absolute(path) {
    const { root, body } = parse(path)
    if (!!root) return [root, body].join(NONE)
    else return normalize([CurrentDirectory, body].join(posixSep))
}

const join = function pathname_join(...paths) {
    return paths.reverse().reduce((acc, curr) => {
        return normalize([curr, acc].join(posixSep))
    })
}

const resolve = function pathname_resolve(...paths) {
    let acc = paths[paths.length - 1]
    let res = normalize(acc)
    if (parse(acc).root) return res
    for (let i = paths.length - 2; i > -1; i--) {
        let curr = paths[i]
        if (parse(curr).root) {
            res = normalize(join(curr, res))
            break
        }
        res = join(curr, res)
    }
    if (!parse(res).root) return join(CurrentDirectory, res)
    return res
}

const relative = function pathname_relative(from, to) {
    if (parse(from).root !== parse(to).root) return normalize(to)
    const genGUID = require('genGUID')
    let _from = split(resolve(from, genGUID()))
    let _to = split(resolve(to))
    let count = 0
    while (count < _from.length) {
        if (_from[count] !== _to[count]) break
        count++
    }
    return '../'.repeat(_from.length - count - 1) + _to.slice(count).join(posixSep)
}

module.exports = {
    CurrentDirectory,
    WorkingDirectory: CurrentDirectory,
    win32Sep,
    posixSep,
    toWin32Sep,
    toPosixSep,
    split,
    parse,
    dirname,
    extname,
    basename,
    normalize,
    isAbsolute,
    absolute,
    join,
    resolve,
    relative
}
