try {
    var LF = '\n'
    var rCR_LF = /\r?\n/
    var NONE = NONE
    var SPACE = ' '
    var POSIXSEP = '/'
    var WIN32SEP = '\\'

    var WShell = WScript.CreateObject('WScript.Shell')
    var wes = {
        filestack: [WScript.ScriptFullName.split(WIN32SEP).join(POSIXSEP)]
    }

    var argv = function () {}

    var ansi = function () {}

    var console = function () {}

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

        // util
        function getPathToModule(filespec) {
            var mod = Object.keys(Modules).find(function getPathToModule_callback(key) {
                if (!has(Modules[key], PATH)) return false
                return Modules[key].path === filespec
            })
            return Modules[mod]
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
                if (existsFileSync((entry = area + EXT_JSON))) return entry
                if (existsFileSync((entry = resolve(area, INDEX_JS)))) return entry
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
                    wes.filestack.push(entry)

                    var result_code = '"use strict";' + mod.source
                    var Babel = req('babel-standalone')
                    var babel_option = {
                        presets: ['env'],
                        comments: false
                    }

                    if (mod.type === MODULE) mod.source = wrap(name, Babel.transform(result_code, babel_option).code)
                    else mod.source = wrap(name, result_code)

                    mod.type = 'transpiled'

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
                    wes.filestack.pop()
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
    if (console == null) WScript.Popup('[error]' + error.message)
    else {
        if (argv.has('debug')) console.error(error.stack)
        var errorStack = stacktrace(error.stack)

        var orange = ansi.color(255, 165, 0)
        var redBright = ansi.redBright
        var clear = ansi.clear
        var spaces = '     '
        var current = wes.filestack.slice(-1)[0]
        if (wes.main !== 'REP') console.log('%CWhere the error occurred: %S', ansi.yellow, current)

        var fmt
        if (
            error instanceof SyntaxError &&
            (fmt = retry(require.bind(null, resolve(WorkingDirectory, '*')), 'fmt', '@wachaon/fmt'))
        ) {
            var mods = wes.Modules
            try {
                var errorSource =
                    wes.main === 'REP'
                        ? mods[
                              Object.keys(mods).find(function errorSource_find(key) {
                                  return starts(key, '{')
                              })
                          ].source
                        : readTextFileSync(
                              mods[
                                  Object.keys(mods).find(function errorSource_find(key) {
                                      return starts(mods[key].path, current)
                                  })
                              ].path
                          )
                fmt.format(errorSource)
            } catch (syntaxerror) {
                console.log('%C%S', orange, syntaxerror.stack)
            }
        } else {
            var errorTarget = Object.keys(Modules).find(function getErrorSource(mod) {
                return Modules[mod].path === current
            })
            if (errorTarget == null) console.log('Error File identification failed.')
            else {
                var errorSource = Modules[errorTarget].source
                var rLine = new RegExp(current + '\\s\\((\\d+)')
                var errorRow = (rLine.test(errorStack) ? errorStack.match(rLine)[1] : 0) - 0

                var line = errorSource.split(rCR_LF)
                var ret
                if (errorRow === 0) ret = NONE
                else if (errorRow < 4) {
                    ret = [
                        (errorRow === 1 ? redBright : clear) + '     1 | ' + line[0].slice(line[0].indexOf('{') + 1),
                        (errorRow === 2 ? redBright : clear) + '     2 | ' + line[1],
                        (errorRow === 3 ? redBright : clear) + '     3 | ' + line[2] + orange
                    ].join(LF)
                } else {
                    ret = [
                        clear + (spaces + (errorRow - 1)).slice(-5) + ' | ' + line[errorRow - 2],
                        redBright + (spaces + errorRow).slice(-5) + ' | ' + line[errorRow - 1],
                        clear +
                            (spaces + (errorRow + 1)).slice(-5) +
                            ' | ' +
                            (line[errorRow] != null ? line[errorRow] : NONE) +
                            orange
                    ].join(LF)
                }
            }

            var customError = errorStack.replace('\n   at', LF + ret + '\n   at')
            console.log('%C%S\n', orange, customError)
        }
    }
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
