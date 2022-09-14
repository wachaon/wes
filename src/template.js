try {
    var LF = '\n'
    var rLINE_SEP = /\r?\n/
    var NONE = ''
    var SPACE = ' '
    var POSIXSEP = '/'
    var WIN32SEP = '\\'

    var WShell = WScript.CreateObject('WScript.Shell')
    var wes = {
        history: [WScript.ScriptFullName.split(WIN32SEP).join(POSIXSEP)]
    }

    var argv = function () {}

    var ansi = function () {}

    var console = function () {}

    var utility = function () {}

    if (!argv.has('engine', 'Chakra')) {
        var cpu =
            WShell.ExpandEnvironmentStrings('%PROCESSOR_ARCHITECTURE%') !== 'x86'
                ? '{%}windir{%}\\SysWOW64\\cscript'
                : 'cscript'
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
            [cpu, WScript.ScriptFullName, parameters.join(SPACE), nologo, chakra, engin, monotone, enter].join(SPACE)
        )

        WScript.Quit()
    } else {
        var Modules = {}

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
        var EXPORT = 'export'
        var EXPORTS = 'exports'
        var REQUIRE = 'require'
        var IMPORT = 'import'
        var TYPE = 'type'
        var MAIN = 'main'
        var PATH = 'path'
        var string = 'string'
        var PATHNAME = 'pathname'
        var FILESYSTEM = 'filesystem'
        var ROOT_DIR = '/'
        var CURRENT_DIR = './'
        var PARENT_DIR = '../'
        var TRANSPILED = 'transpiled'
        var USE_STRICT = '"use strict";'
        var AT = '   at '

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
        var map = utility.map

        // util
        function getPathToModule(filespec) {
            return find(Modules, function getPathToModule_matcher(id, mod) {
                return PATH in mod && mod[PATH] === filespec
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

        function getAreas(caller, _query) {
            var query = toPosixSep(_query)

            var areas = []

            // Replace '/' with Current Directory if query starts with '/'
            if (starts(query, ROOT_DIR)) {
                areas.push(resolve(WorkingDirectory, query.replace(ROOT_DIR, NONE)))

                // combine the caller's path and the query, if relative path
            } else if (starts(query, CURRENT_DIR) || starts(query, PARENT_DIR)) {
                areas.push(resolve(dirname(caller), query))
            } else {
                areas.push(resolve(dirname(caller), query))

                // Otherwise, combine node_module while going back directory
                var hierarchy = dirname(caller)

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

        function getEntry(areas) {
            var entry = null
            while (areas.length) {
                var area = areas.shift()
                var temp
                if (existsFileSync((entry = area))) return entry
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
                                    dot.find(function getEntry_find_callback(val) {
                                        if (typeof val === string) {
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
            if (starts(mod.source, '#!')) mod.source = mod.source.split(LF).slice(1).join(LF)

            Modules[GUID] = mod
            mod.type = getModuleType(mod)
            switch (extname(entry)) {
                case EXT_MJS:
                case EXT_JS:
                    var name = escapeName(entry)
                    wes.history.push(entry)

                    var Babel = req('babel-standalone')
                    var babel_option = {
                        presets: ['es2015'],
                        sourceMaps: true,
                        comments: false
                    }

                    if (mod.type === MODULE) {
                        var transpiled = Babel.transform(mod.source, babel_option)
                        mod.map = transpiled.map
                        mod.data = mod.source + ''
                        mod.code = transpiled.code
                        mod.source = wrap(name, transpiled.code)
                        mod.type = TRANSPILED
                    } else {
                        mod.data = mod.source
                        mod.code = mod.source
                        mod.source = wrap(name, USE_STRICT + mod.source)
                    }

                    var buf = entry === 'buffer' ? null : req('buffer')

                    var codeMap = {
                        require: require.bind(null, entry),
                        module: mod.module,
                        exports: mod.module.exports,
                        console: console,
                        __dirname: dirname(entry),
                        __filename: entry,
                        wes: wes,
                        Buffer: buf,
                        global: { process: process, Buffer: buf, console: console }
                    }
                    generateCodeAndExecution(codeMap, mod.source)
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

        // local require
        var process = {
            env: { NODE_ENV: NONE },
            cwd: function process_cwd() {
                return WorkingDirectory
            },
            platform: 'win32'
        }

        function req(moduleID) {
            var mod = Modules[moduleID]
            var entry = mod.path || POSIXSEP
            if (!has(mod, EXPORTS)) {
                if (!has(mod, MODULE)) {
                    mod.module = { exports: {} }
                    if (ends(mod.path, EXT_JSON)) {
                        mod.module.exports = JSON.parse(mod.source)
                        mod.exports = mod.module.exports
                        return mod.exports
                    }
                    var dirname = entry.split(POSIXSEP).slice(0, -1).join(POSIXSEP)
                    mod.mapping = mod.mapping || {}
                    var buf = entry === 'buffer' ? null : req('buffer')
                    var codeMap = {
                        require: require.bind(null, entry),
                        module: mod.module,
                        exports: mod.module.exports,
                        console: console,
                        __dirname: dirname,
                        __filename: entry,
                        wes: wes,
                        process: process,
                        Buffer: buf,
                        global: { process: process, Buffer: buf, console: console }
                    }
                    generateCodeAndExecution(codeMap, mod.source)
                }
                mod.exports = mod.module.exports
            }
            return mod.exports
        }

        // require
        function require(caller, query, encode) {
            // execute req function, if it is a core module
            if (!query.includes(POSIXSEP)) {
                if (has(Modules, query)) {
                    return req(query)
                }
            }

            // execute OLE, if it is OLE
            try {
                return WScript.CreateObject(query)
            } catch (e) {}

            // execute req function, if it is a mapping[ query ]
            var parentModule = getPathToModule(caller)
            var mappingID
            if (parentModule) {
                if ((mappingID = parentModule.mapping[query])) {
                    return req(mappingID)
                }
            }

            var areas = []
            if (isAbsolute(query)) areas = [resolve(query)]
            else areas = getAreas(caller, query)

            var entry = getEntry(areas)
            if (entry == null)
                throw new Error(
                    'no module:\n' + 'caller: ' + caller + '\nquery: ' + query + LF + JSON.stringify(areas, null, 2)
                )

            var modId = req('genGUID')()
            if (wes.main == null) wes.main = modId
            var mod = createModule(modId, entry, query, parentModule, encode)
            mod.exports = mod.module.exports

            return mod.exports
        }

        wes.Modules = Modules

        var main = argv.unnamed[0] != null ? argv.unnamed[0] : 'REP'
        if (main in wes.Modules) wes.main = main
        require(resolve(WorkingDirectory, '_'), main, argv.get('encoding'))
    }
} catch (error) {
    ;(function errortrace() {
        var errorColor = ansi.color(255, 165, 0)
        var specColor = ansi.redBright
        var clear = ansi.clear
        var reverse = ansi.reverse
        var stack = error.stack

        if (console == null) return WScript.Popup('[error]:\n' + stack)

        // find module object from history
        var generation = find(wes.Modules, function (id, mod) {
            return mod.path === wes.history[wes.history.length - 1]
        })
        if (generation != null && error instanceof SyntaxError) {
            if (generation.type === MODULE) return console.log(errorColor + stack)
            else {
                try {
                    req('babel-standalone').transform(generation.data, {
                        presets: ['es2015']
                    })
                } catch (e) {
                    console.log(errorColor + e.stack)
                }
            }
        }

        stack = stacktrace(stack)
            .split(rLINE_SEP)
            .map(function errortrace_map(line) {
                if (!line.startsWith(AT)) return errorColor + line + clear
                if (!line.includes(POSIXSEP)) return errorColor + line + clear
                return line.replace(/^   at (.+) \((\d+):(\d+)\)$/, function errortrace_replace(_, spec, $1, $2) {
                    var row = $1 - 0
                    var column = $2 - 0
                    var mod = find(wes.Modules, function errortrace_find(id, mod) {
                        return mod.path === spec
                    })
                    if (mod.type === COMMONJS) {
                        return showErrorCode(mod.code, mod.path, row, column)
                    } else if (mod.type === MODULE || mod.type === TRANSPILED) {
                        var decoded = decodeMappings(mod.map.mappings)
                        var mapping = decoded[row - 1][column - 1]
                        return showErrorCode(mod.data, mod.path, mapping[2] + 1, mapping[3] + 1)
                    }
                })
            })
            .join(LF)

        if (argv.has('debug')) return console.log(errorColor + error.stack)
        else return console.log(stack)

        function addLineNumber(source) {
            var lines = source.split(rLINE_SEP)
            var max = String(lines.length).length + 4
            return lines
                .map(function addLineNumber_map(line, i) {
                    return (SPACE.repeat(max) + String(i + 1) + ' | ').slice(max * -1) + line
                })
                .join(LF)
        }

        function showErrorCode(code, path, row, column) {
            console.log('[code]:\n%s', code)
            var target = row
            var min = Math.max(target - 2, 0)
            var max = Math.min(code.length, target + 2)
            var pickup = addLineNumber(code)
                .split(rLINE_SEP)
                .map(function showErrorCode_map(line, i) {
                    var lineRow = i + 1
                    if (lineRow === target) return errorColor + reverse + line + clear
                    else return errorColor + line + clear
                })
                .filter(function showErrorCode_filter(line, i) {
                    var lineRow = i + 1
                    return min <= lineRow && lineRow <= max ? true : false
                })
                .join(LF)
            return LF + pickup + LF + specColor + '\u21B3  at ' + path + ' (' + target + ':' + column + ')' + clear
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

            function segmentify(line, segment, j) {
                if (j === 4) line.push([segment[0], segment[1], segment[2], segment[3]])
                else if (j === 5) line.push([segment[0], segment[1], segment[2], segment[3], segment[4]])
                else if (j === 1) line.push([segment[0]])
            }
        }
    })()
}

// util

function retry() {
    var args = Array.from(arguments)
    if (args.length < 2) return null
    var action = args.shift()
    var res = null
    while (args.length) {
        try {
            res = action(args.shift())
            break
        } catch (error) {}
    }
    return res
}

function has(cls, prop) {
    if (cls == null) throw new Error(prop + ' is null')
    return cls.hasOwnProperty(prop)
}

function starts(str, word) {
    return str.startsWith(word)
}

function ends(str, word) {
    return str.endsWith(word)
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
        .find(function nearestPackageJson_find_callback(spec) {
            return existsFileSync(spec)
        })
    return pkgSpec ? JSON.parse(readTextFileSync(pkgSpec)) : {}
}

function generateCodeAndExecution(map, source) {
    var args = Object.keys(map)
    var prop = args.map(function generateCodeAndExecution_map_callback(key) {
        return map[key]
    })
    args.unshift(null)
    args.push(source)

    var code = new (Function.prototype.bind.apply(Function, args))()

    return code.apply(null, prop)
}

function wrap(name, source) {
    return '(function ' + name + '() {' + source + '\n} )()'
}

function unwrap(source) {
    return source.replace(/^(\(function [^\(]+\(\) \{("use strict";\n)?\n)([\s\S]+)(\n\} \)\(\))$/, function () {
        return arguments[3]
    })
}

function stacktrace(stack) {
    return unescape(stack.split('$').join('%'))
        .split(/\r?\n/)
        .filter(function error_stack_callback(line) {
            return !(
                starts(line, '   at Function code (Function code:') ||
                starts(line, '   at createModule (') ||
                starts(line, '   at require (') ||
                starts(line, '   at req (') ||
                starts(line, '   at generateCodeAndExecution (')
            )
        })
        .join('\r\n')
        .split('Function code:')
        .join(NONE)
        .split('Global code (:')
        .join('Global code (')
        .split('(,')
        .join('(')
}

function escapeName(name) {
    return Array.from(name)
        .map(function escapeName_map(ch) {
            return '$' + ch.codePointAt().toString(16)
        })
        .join('')
}

function unescapeName($name) {
    return $name
        .split('$')
        .slice(1)
        .map(function unescapeName_map(ch) {
            return String.fromCodePoint(parseInt('0x' + ch))
        })
        .join('')
}
