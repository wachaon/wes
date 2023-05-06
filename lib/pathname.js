const WShell = require('WScript.Shell')

const NONE = ''
const Current = '.'
const Parent = '..'
const posixSep = '/'
const win32Sep = '\\'

const toPosixSep = function pathname_toPosixSep(path) /*: string */ {
    return path.toString().split(win32Sep).join(posixSep)
}

const toWin32Sep = function pathname_toWin32Sep(path) /*: string */ {
    return path.toString().split(posixSep).join(win32Sep)
}

const CurrentDirectory = toPosixSep(WShell.CurrentDirectory)

const split = function pathname_split(path) /*: string */ {
    return toPosixSep(path).split(posixSep)
}

const UNC = /^(\/\/[^\/]+\/[^\/]+\/?)(|.+)$/
const SCHEME = /^([A-z]{2,}:\/\/[^\/]+\/?)(|.+)$/
const DRIVE = /^([A-z]:\/?)(|.+)$/
const CWD = /^(?!\/\/)(\/)(.+)$/
const RELATIVE = NONE

const standardization = function pathname_standardization(path) /*: string */ {
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

class Path {
    constructor(spec) {
        spec = toPosixSep(spec)
        const starts = /^\/+/g
        const parent = /^(\.\.\/)+/

        if (UNC.test(spec)) {
            let [, root, body] = UNC.exec(spec)
            this.type = UNC
            this.root = root
            this.body = body.replace(starts, NONE)
        } else if (SCHEME.test(spec)) {
            let [, root, body] = SCHEME.exec(spec)
            this.type = SCHEME
            this.root = root
            this.body = body.replace(starts, NONE)
        } else if (DRIVE.test(spec)) {
            let [, root, body] = DRIVE.exec(spec)
            this.type = DRIVE
            this.root = root.replace(/^([A-z])/, ($1) => $1.toUpperCase())
            this.body = body.replace(starts, NONE)
        } else if (CWD.test(spec)) {
            let [, , _body] = CWD.exec(spec)
            let [, root, body] = DRIVE.exec(CurrentDirectory)
            this.type = CWD
            this.root = root
            this.body = body + posixSep + _body
        } else {
            this.type = RELATIVE
            this.root = NONE
            this.body = spec
        }

        this.body =
            this.type == RELATIVE ? standardization(this.body) : standardization(this.body).replace(parent, NONE)

        let paths = this.body.split(posixSep)
        let _dir = NONE
        let base = NONE
        if (paths.length === 1) base = paths[0]
        else [_dir, base] = [paths.slice(0, -1).join(posixSep), paths[paths.length - 1]]

        let dir = this.root + _dir

        const dot = '.'
        let name = NONE
        let ext = NONE
        let bases = base.split(dot)

        if ((bases.length === 2 && bases[0] === NONE) || bases.length === 1) [name, ext] = [base, NONE]
        else [name, ext] = [bases.slice(0, -1).join(dot), dot + bases[bases.length - 1]]

        this.dir = dir
        this.base = base
        this.ext = ext
        this.name = name
    }
    toString() {
        return normalize(this)
    }
}

const parse = function pathname_parse(spec) /*: Path */ {
    return spec.constructor === Path ? spec : new Path(spec)
}

const isAbsolute = function pathname_isAbsolute(path) /*: boolean */ {
    const { root, type } = parse(path)
    return type === SCHEME ? false : !!root
}

const dirname = function pathname_dirname(path) /*: string */ {
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

const extname = function pathname_extname(path) /*: string */ {
    return parse(path).ext
}

const basename = function pathname_basename(path, ext) /*: string */ {
    let { base } = parse(path)
    if (ext == null) {
        base = base.replace(/^(.+)\.[^\.]+$/, (_, _base, ext) => {
            return _base
        })
    } else if (base.endsWith(ext)) {
        base = Array.from(base)
            .slice(0, ext.length * -1)
            .join(NONE)
    }
    return base
}

const normalize = function pathname_normalize(path) /*: string */ {
    let { root, body } = parse(path)
    return [root, body].join(NONE)
}

const absolute = function pathname_absolute(path) /*: string */ {
    const { root, body } = parse(path)
    if (!!root) return normalize(path)
    else return normalize([CurrentDirectory, body].join(posixSep))
}

const join = function pathname_join(...paths) /*: string */ {
    return paths.reverse().reduce((acc, curr) => {
        return normalize([curr, acc].join(posixSep))
    })
}

const resolve = function pathname_resolve(...paths) /*: string */ {
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
    const result = parse(res)
    if (!result.root) return join(CurrentDirectory, res)
    return normalize(result)
}

const relative = function pathname_relative(from, to) /*: string */ {
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

function bubbleUp(curr, matcher) /*: string | null */ {
    let res
    while (true) {
        const parent = dirname(curr)
        if (parent === curr || (res = matcher(curr))) break
        curr = parent
    }
    return res
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
    relative,
    bubbleUp,
    Path
}
