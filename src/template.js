;(function () {
    try {
        var LF = '\n'
        var rLINE_SEP = /\r?\n/
        var NONE = ''
        var SPACE = ' '
        var POSIXSEP = '/'
        var WIN32SEP = '\\'

        var WShell = WScript.CreateObject('WScript.Shell')
        var history = [WScript.ScriptFullName.split(WIN32SEP).join(POSIXSEP)]
        var entry_point = null
        var ARCHITECTURE = WShell.ExpandEnvironmentStrings('%PROCESSOR_ARCHITECTURE%')

        var wes = {
            history: history,
            entry_point: entry_point,
            architecture: ARCHITECTURE
        }

        /* insert argv */

        /* insert ansi */

        /* insert console */

        /* insert utility */

        if (!argv.has('engine', 'Chakra')) {
            var cpu = ARCHITECTURE !== 'x86' ? '{%}windir{%}\\SysWOW64\\cscript' : 'cscript'
            var nologo = '//nologo'
            var engin = '--engine=Chakra'
            var chakra = '//E:{{}1b7cd997-e5ff-4932-a7a6-2a9e636da385{}}'
            var monotone = argv.has('monotone') ? NONE : '| echo off'
            var enter = '{ENTER}'

            var parameters = []
            for (var i = 0; i < WScript.Arguments.length; i++) {
                parameters.push(escape(WScript.Arguments(i)).replace(/%/g, '{%}'))
            }

            WShell.SendKeys(
                [cpu, WScript.ScriptFullName, parameters.join(SPACE), nologo, chakra, engin, monotone, enter].join(
                    SPACE
                )
            )

            WScript.Quit()
        } else {
            /* insert Modules */

            var EXT_JS = '.js'
            var EXT_CJS = '.cjs'
            var EXT_MJS = '.mjs'
            var EXT_JSON = '.json'
            var PACKAGE_JSON = 'package.json'
            var INDEX = 'index'
            var INDEX_JS = INDEX + EXT_JS
            var INDEX_CJS = INDEX + EXT_CJS
            var INDEX_MJS = INDEX + EXT_MJS
            var INDEX_JSON = INDEX + EXT_JSON
            var NODE_MODULES = 'node_modules'
            var WES_MODULES = 'wes_modules'
            var JSONTYPE = 'json'
            var COMMONJS = 'commonjs'
            var MODULE = 'module'
            var EXPORTS = 'exports'
            var REQUIRE = 'require'
            var IMPORT = 'import'
            var TYPE = 'type'
            var MAIN = 'main'
            var PATH = 'path'
            var string = 'string'
            var REP = 'REP'
            var BUFFER = 'buffer'
            var GEN_GUID = 'genGUID'
            var PATHNAME = 'pathname'
            var FILESYSTEM = 'filesystem'
            var BABEL_STANDALONE = 'babel-standalone'
            var ROOT_DIR = '/'
            var CURRENT_DIR = './'
            var PARENT_DIR = '../'
            var WIN32 = 'win32'
            var TRANSPILED = 'transpiled'
            var USE_STRICT = '"use strict";'
            var SHEBANG = '#!'
            var LINE_COMMENT = '//'
            var rSTACK_LINE = /   at ([A-z]:\/.+|\{.+\}.+) \(Function code:(\d+):(\d+)\)/gm
            var rSTACK_FIRST_LINE = /   at (.+) \(Function code:(\d+):(\d+)\)/m
            var BRACKET_START = '{'
            var DOLLAR = '$'
            var PERCENT = '%'

            var pathname = req(PATHNAME)
            var resolve = pathname.resolve
            var dirname = pathname.dirname
            var extname = pathname.extname
            var isAbsolute = pathname.isAbsolute
            var toPosixSep = pathname.toPosixSep
            var WorkingDirectory = pathname.WorkingDirectory

            var filesystem = req(FILESYSTEM)
            var existsFileSync = filesystem.existsFileSync
            var readTextFileSync = filesystem.readTextFileSync

            var find = utility.find

            var process = {
                env: { NODE_ENV: NONE },
                cwd: function process_cwd() {
                    return WorkingDirectory
                },
                arch: ARCHITECTURE,
                platform: WIN32
            }

            var Babel_option = {
                plugins: ['transform-modules-commonjs', 'proposal-object-rest-spread'],
                presets: ['es2017'],
                sourceMaps: true,
                comments: false
            }

            wes.Modules = Modules

            var main = argv.unnamed[0] != null ? argv.unnamed[0] : REP
            if (main in wes.Modules) wes.main = main

            var founder = resolve(WorkingDirectory, '*')

            var tree = {}
            var properties = []
            var current = null

            current = seq(tree, properties)
            current.type = founder

            require(founder, main, argv.get('encoding'))

            if (argv.get('relation')) console.log('\n[relation]: %O', tree)
        }
    } catch (error) {
        var ORANGE = ansi.color(255, 165, 0)
        var LIME = ansi.color(181, 255, 20)
        var AQUA = ansi.color(24, 235, 249)
        var LEMON = ansi.color(253, 255, 0)
        var CARMINE = ansi.color(215, 0, 53)
        var ERROR_COLOR = ansi.red
        var FILE_PATH_COLOR = ansi.redBright
        var REVERSE = ansi.reverse
        var CLEAR = ansi.clear

        ;(function () {
            if (argv.get('relation')) console.log('\n[relation]: %O', tree)
            error.stack = unescapeName(error.stack)

            if (console == null) WScript.Popup(error.stack)
            console.debug(error.stack)

            var mod =
                wes.main === REP
                    ? find(Modules, function (_mod, _id) {
                          return _id.startsWith(BRACKET_START)
                      })
                    : find(Modules, function (_mod, _id) {
                          return _mod.path === wes.history[wes.history.length - 1]
                      })

            if (mod == null) return console.log(coloring(error.stack, ERROR_COLOR))

            if (mod.type === COMMONJS) {
                if (error instanceof SyntaxError) {
                    try {
                        req(BABEL_STANDALONE).transform(mod.source, Babel_option)
                        return console.log(coloring(error.stack, ERROR_COLOR))
                    } catch (e) {
                        return console.log(coloring(unescapeName(e.stack), ERROR_COLOR))
                    }
                }

                if (!rSTACK_LINE.test(error.stack)) {
                    error.stack = error.stack.replace(rSTACK_FIRST_LINE, function (_, __, _row, _column) {
                        var row = _row - 0
                        var column = _column - 0
                        var spec = wes.main === REP ? '[Real-Eval-Print]' : mod.path
                        return showErrorCode(mod.source, spec, row, column)
                    })
                }

                error.stack = error.stack.replace(rSTACK_LINE, function (_, _spec, _row, _column) {
                    var row = _row - 0
                    var column = _column - 0

                    var mod = find(Modules, function (_mod, _id) {
                        return _mod.path === _spec
                    })

                    return showErrorCode(mod.source, mod.path, row, column)
                })
                return console.log(coloring(error.stack, ERROR_COLOR))
            }

            if (mod.type === MODULE || mod.type === TRANSPILED) {
                if (error instanceof SyntaxError) {
                    return console.log(coloring(error.stack, ERROR_COLOR))
                }

                if (!rSTACK_LINE.test(error.stack)) {
                    error.stack = error.stack.replace(rSTACK_FIRST_LINE, function (_, __, _row, _column) {
                        var row = _row - 0
                        var column = _column - 0

                        var decoded = decodeMappings(mod.map.mappings)
                        var mapping = decoded[row - 1][column - 1]

                        var spec = wes.main === REP ? '[Real-Eval-Print]' : mod.path
                        return showErrorCode(mod.source, spec, mapping[2] + 1, mapping[3] + 1)
                    })
                }

                error.stack = error.stack.replace(rSTACK_LINE, function (_, _spec, _row, _column) {
                    var row = _row - 0
                    var column = _column - 0

                    var mod = find(Modules, function (_mod, _id) {
                        return _mod.path === _spec
                    })

                    var decoded = decodeMappings(mod.map.mappings)
                    var mapping = decoded[row - 1][column - 1]

                    return showErrorCode(mod.source, mod.path, mapping[2] + 1, mapping[3] + 1)
                })
                console.log(coloring(error.stack, ERROR_COLOR))
            }
        })()
    }

    function getEntry(areas) {
        var entry = null
        while (areas.length) {
            var area = areas.shift()
            var temp
            if (existsFileSync((entry = area))) return entry
            if (existsFileSync((temp = resolve(area, PACKAGE_JSON)))) {
                var pkg = JSON.parse(readTextFileSync(temp))
                if (
                    has(pkg, MAIN) &&
                    (existsFileSync((entry = resolve(area, pkg[MAIN]))) ||
                        existsFileSync((entry = resolve(area, pkg[MAIN] + EXT_JS))) ||
                        existsFileSync((entry = resolve(area, pkg[MAIN] + EXT_CJS))) ||
                        existsFileSync((entry = resolve(area, pkg[MAIN] + EXT_MJS))))
                )
                    return entry
            }
            if (existsFileSync((entry = area + EXT_JS))) return entry
            if (existsFileSync((entry = area + EXT_CJS))) return entry
            if (existsFileSync((entry = area + EXT_MJS))) return entry
            if (existsFileSync((entry = area + EXT_JSON))) return entry
            if (existsFileSync((entry = resolve(area, INDEX_JS)))) return entry
            if (existsFileSync((entry = resolve(area, INDEX_CJS)))) return entry
            if (existsFileSync((entry = resolve(area, INDEX_MJS)))) return entry
            if (existsFileSync((entry = resolve(area, INDEX_JSON)))) return entry
            if (existsFileSync((temp = resolve(area, PACKAGE_JSON)))) {
                var dir = dirname(temp)
                var pkg = nearestPackageJson(dir)
                var exp = getField(pkg, EXPORTS)
                if (exp != null) {
                    if (typeof exp === string) areas.push(resolve(dir, exp))
                    else {
                        var dot = getField(exp, '.')
                        if (dot != null) {
                            var type = getField(pkg, TYPE) || COMMONJS
                            if (typeof dot === string) areas.push(resolve(dir, dot))
                            else if (Array.isArray(dot)) {
                                dot.find(function (val) {
                                    if (typeof val === string) {
                                        l
                                        areas.push(resolve(dir, val))
                                    } else if (type === COMMONJS && REQUIRE in val) {
                                        areas.push(resolve(dir, val[REQUIRE]))
                                    } else if (type === MODULE && IMPORT in val) {
                                        areas.push(resolve(dir, val[IMPORT]))
                                    }
                                })
                            } else {
                                if (type === COMMONJS && REQUIRE in dot) {
                                    areas.push(resolve(dir, dot[REQUIRE]))
                                } else if (type === MODULE && IMPORT in dot) {
                                    areas.push(resolve(dir, dot[IMPORT]))
                                }
                            }
                        }
                    }
                }
                var main = getPkgField(dirname(temp), MAIN)
                if (main == null) continue
                areas.unshift(resolve(area, main))
            }
        }
    }

    function createModule(GUID, entry, query, parentModule, encode) {
        if (parentModule) parentModule.mapping[query] = GUID

        console.debug('%O require to %O ', parentModule ? parentModule.path : null, entry)

        var mod = {
            source: readTextFileSync(entry, encode != null ? encode : null),
            module: {
                exports: {}
            },
            path: entry,
            mapping: {}
        }
        if (mod.source.startsWith(SHEBANG)) mod.source = LINE_COMMENT + mod.source

        Modules[GUID] = mod
        mod.type = getModuleType(mod)
        switch (extname(entry)) {
            case EXT_MJS:
            case EXT_JS:
                var name = escapeName(entry)
                wes.history.push(entry)

                var Babel = req(BABEL_STANDALONE)

                if (mod.type === MODULE) {
                    var transpiled = Babel.transform(mod.source, Babel_option)
                    mod.map = transpiled.map
                    mod.code = wrap(name, transpiled.code)
                    mod.type = TRANSPILED
                } else {
                    mod.code = wrap(name, USE_STRICT + mod.source)
                }

                var buf = entry === BUFFER ? null : req(BUFFER)

                var codeMap = {
                    require: require.bind(null, entry),
                    module: mod.module,
                    exports: mod.module.exports,
                    console: console,
                    __dirname: dirname(entry),
                    __filename: entry,
                    wes: wes,
                    Buffer: buf,
                    process: process
                }
                generateCodeAndExecution(codeMap, mod.code)
                wes.history.pop()
                break
            case EXT_JSON:
                mod.module.exports = JSON.parse(mod.source)
                break
            default:
                mod.module.exports = mod.source
        }
        return mod
    }

    function req(moduleID) {
        var mod = Modules[moduleID]
        var entry = mod.path || POSIXSEP
        if (!has(mod, EXPORTS)) {
            if (!has(mod, MODULE)) {
                mod.module = { exports: {} }
                if (mod.path.endsWith(EXT_JSON)) {
                    mod.module.exports = JSON.parse(mod.source)
                    mod.exports = mod.module.exports
                    return mod.exports
                }
                var dirname = entry.split(POSIXSEP).slice(0, -1).join(POSIXSEP)
                mod.mapping = mod.mapping || {}
                var buf = entry === BUFFER ? null : req(BUFFER)

                var codeMap = {
                    require: require.bind(null, entry),
                    module: mod.module,
                    exports: mod.module.exports,
                    console: console,
                    __dirname: dirname,
                    __filename: entry,
                    wes: wes,
                    Buffer: buf,
                    process: process
                }
                generateCodeAndExecution(codeMap, mod.code || mod.source)
            }
            mod.exports = mod.module.exports
        }
        return mod.exports
    }

    // require
    function require(callee, query, encode) {
        var start = Date.now()
        var element

        if (argv.get('dump')) console.print('callee: ' + callee)

        // execute req function, if it is a core module
        if (!query.includes(POSIXSEP)) {
            if (has(Modules, query)) {
                if (argv.get('dump')) console.log(' => <built-in>: ' + query)
                return req(query)
            }
        }

        // execute OLE, if it is OLE
        try {
            var com = WScript.CreateObject(query)
            if (argv.get('dump')) console.log(' => <com>: ' + query)
            return com
        } catch (e) {}

        // execute req function, if it is a mapping[ query ]
        var parentModule = getPathToModule(callee)
        var mappingID
        if (parentModule) {
            if ((mappingID = parentModule.mapping[query])) {
                current = seq(tree, properties)
                current.children = current.children || []
                element = { type: Modules[mappingID].path }
                current.children.push(element)
                properties.push(Modules[mappingID].path)

                if (argv.get('dump')) console.log(' => <mapping>: ' + element.type)
                var mappingMod = req(mappingID)
                element.value = Date.now() - start

                properties.pop()

                return mappingMod
            }
        }

        var areas = []
        if (isAbsolute(query)) areas = [resolve(query)]
        else areas = getAreas(callee, query)

        var entry = getEntry(areas)
        if (entry == null)
            throw new Error(
                'no module:\n' + 'callee: ' + callee + '\nquery: ' + query + LF + JSON.stringify(areas, null, 2)
            )

        var modId = req(GEN_GUID)()

        if (callee === founder) {
            wes.entry_point = entry
            wes.main = modId
        }

        current = seq(tree, properties)
        current.children = current.children || []
        element = { type: entry }
        current.children.push(element)
        properties.push(entry)

        if (argv.get('dump')) console.log(' => <module>: ' + entry)
        var mod = createModule(modId, entry, query, parentModule, encode)
        element.value = Date.now() - start

        properties.pop()

        mod.exports = mod.module.exports
        return mod.exports
    }

    // util
    function has(cls, prop) {
        if (cls == null) throw new Error(prop + ' is null')
        return cls.hasOwnProperty(prop)
    }

    function bubblingDirectory(dir, query) {
        var res = []
        query ? res.push(resolve(dir, query)) : res.push(resolve(dir))
        while (dir !== dirname(dir)) {
            dir = dirname(dir)
            query ? res.push(resolve(dir, query)) : res.push(resolve(dir))
        }
        return res.reverse()
    }

    function nearestPackageJson(dir) {
        var pkgSpec = bubblingDirectory(dir, PACKAGE_JSON)
            .reverse()
            .find(function (spec) {
                return existsFileSync(spec)
            })
        return pkgSpec ? JSON.parse(readTextFileSync(pkgSpec)) : {}
    }

    function generateCodeAndExecution(hash, source) {
        var args = Object.keys(hash)
        var prop = args.map(function (key) {
            return hash[key]
        })
        args.unshift(null)
        args.push(source)

        var code = new (Function.prototype.bind.apply(Function, args))()

        return code.apply(null, prop)
    }

    function wrap(name, source) {
        return '(function ' + name + '() {' + source + '\n} )()'
    }

    function escapeName(name) {
        return name
            .split(NONE)
            .map(function (ch) {
                return /\w/.test(ch) ? ch : DOLLAR + ch.codePointAt(0).toString(16)
            })
            .join(NONE)
    }

    function seq(target, props) {
        if (!Array.isArray(props) || props.length === 0) return target
        return props.reduce(function (acc, curr) {
            acc.children = acc.children || []
            return acc.children.find(function (elm) {
                return elm.type === curr
            })
        }, target)
    }

    function getPathToModule(filespec) {
        return find(Modules, function (_mod, _id) {
            return PATH in _mod && _mod[PATH] === filespec
        })
    }

    function getField(json, path) {
        var parts = path.split(POSIXSEP)
        var part = null
        var curr = json
        while (parts.length) {
            part = parts.shift()
            if (part in curr) curr = curr[part]
            else return undefined
        }
        return curr
    }

    function getPkgField(dir, field) {
        var pkg = resolve(dir, PACKAGE_JSON)
        if (!existsFileSync(pkg)) return undefined
        var file = readTextFileSync(pkg)
        var json = JSON.parse(file)
        return getField(json, field)
    }

    function getAreas(callee, _query) {
        var query = toPosixSep(_query)

        var areas = []

        // Replace '/' with Current Directory if query starts with '/'
        if (query.startsWith(ROOT_DIR)) {
            areas.push(resolve(WorkingDirectory, query.replace(ROOT_DIR, NONE)))

            // combine the callee's path and the query, if relative path
        } else if (query.startsWith(CURRENT_DIR) || query.startsWith(PARENT_DIR)) {
            areas.push(resolve(dirname(callee), query))
        } else {
            areas.push(resolve(dirname(callee), query))

            // Otherwise, combine node_module while going back directory
            var hierarchy = dirname(callee)

            while (hierarchy !== NONE) {
                areas.push(resolve(hierarchy, WES_MODULES, query))
                areas.push(resolve(hierarchy, NODE_MODULES, query))
                var _hierarchy = dirname(hierarchy)
                if (hierarchy === _hierarchy) break
                hierarchy = _hierarchy
            }
            var ScriptFullName = WScript.ScriptFullName
            areas.push(resolve(dirname(ScriptFullName), NODE_MODULES, query))
            areas.push(resolve(dirname(ScriptFullName), WES_MODULES, query))
        }
        return areas
    }

    function getModuleType(mod) {
        var ext = extname(mod.path)
        if (ext === EXT_JSON) return JSONTYPE
        if (ext === EXT_CJS) return COMMONJS
        if (ext === EXT_MJS) return MODULE
        var dir = dirname(mod.path)
        var pkg = nearestPackageJson(dir)
        var type
        if ((type = getField(pkg, TYPE))) return type
        return COMMONJS
    }
    function unescapeName(stack) {
        return stack
            .split(rLINE_SEP)
            .join(LF)
            .replace(/ ([A-Z]\$3a\$2f|\$7b)[^ ]+ /g, function (_spec) {
                return unescape(_spec.split(DOLLAR).join(PERCENT))
            })
    }

    function coloring(message, color) {
        return message
            .split(rLINE_SEP)
            .map(function coloring_map(line) {
                return color + line + CLEAR
            })
            .join(LF)
    }

    function addLineNumber(source) {
        var lines = source.split(rLINE_SEP)
        var max = String(lines.length).length + 4
        return lines
            .map(function (line, i) {
                return (SPACE.repeat(max) + String(i + 1) + ' | ').slice(max * -1) + line
            })
            .join(LF)
    }

    function showErrorCode(code, path, row, column) {
        var target = row
        var min = Math.max(target - 2, 0)
        var max = Math.min(code.length, target + 2)
        var pickup = addLineNumber(code)
            .split(rLINE_SEP)
            .map(function showErrorCode_map(line, i) {
                var lineRow = i + 1
                if (lineRow === target) return REVERSE + line + CLEAR
                else return line
            })
            .filter(function (line, i) {
                var lineRow = i + 1
                return min <= lineRow && lineRow <= max ? true : false
            })
            .join(LF)

        return LF + pickup + LF + FILE_PATH_COLOR + '\u21B3  at ' + path + ' (' + target + ':' + column + ')' + CLEAR
    }

    function decodeMappings(mappings) {
        var charToInteger = {
            '43': 62,
            '47': 63,
            '48': 52,
            '49': 53,
            '50': 54,
            '51': 55,
            '52': 56,
            '53': 57,
            '54': 58,
            '55': 59,
            '56': 60,
            '57': 61,
            '61': 64,
            '65': 0,
            '66': 1,
            '67': 2,
            '68': 3,
            '69': 4,
            '70': 5,
            '71': 6,
            '72': 7,
            '73': 8,
            '74': 9,
            '75': 10,
            '76': 11,
            '77': 12,
            '78': 13,
            '79': 14,
            '80': 15,
            '81': 16,
            '82': 17,
            '83': 18,
            '84': 19,
            '85': 20,
            '86': 21,
            '87': 22,
            '88': 23,
            '89': 24,
            '90': 25,
            '97': 26,
            '98': 27,
            '99': 28,
            '100': 29,
            '101': 30,
            '102': 31,
            '103': 32,
            '104': 33,
            '105': 34,
            '106': 35,
            '107': 36,
            '108': 37,
            '109': 38,
            '110': 39,
            '111': 40,
            '112': 41,
            '113': 42,
            '114': 43,
            '115': 44,
            '116': 45,
            '117': 46,
            '118': 47,
            '119': 48,
            '120': 49,
            '121': 50,
            '122': 51
        }
        var decoded = []
        var line = []
        var segment = [0, 0, 0, 0, 0]
        var j = 0
        for (var i = 0, shift = 0, value = 0; i < mappings.length; i++) {
            var c = mappings.charCodeAt(i)
            if (c === 44) {
                // ","
                segmentify(line, segment, j)
                j = 0
            } else if (c === 59) {
                // ";"
                segmentify(line, segment, j)
                j = 0
                decoded.push(line)
                line = []
                segment[0] = 0
            } else {
                var integer = charToInteger[c]
                if (integer === undefined) {
                    throw new Error('Invalid character (' + String.fromCharCode(c) + ')')
                }
                var hasContinuationBit = integer & 32
                integer &= 31
                value += integer << shift
                if (hasContinuationBit) {
                    shift += 5
                } else {
                    var shouldNegate = value & 1
                    value >>>= 1
                    if (shouldNegate) {
                        value = value === 0 ? -0x80000000 : -value
                    }
                    segment[j] += value
                    j++
                    value = shift = 0 // reset
                }
            }
        }
        segmentify(line, segment, j)
        decoded.push(line)
        return decoded
    }

    function segmentify(line, segment, j) {
        if (j === 4) line.push([segment[0], segment[1], segment[2], segment[3]])
        else if (j === 5) line.push([segment[0], segment[1], segment[2], segment[3], segment[4]])
        else if (j === 1) line.push([segment[0]])
    }
})()
