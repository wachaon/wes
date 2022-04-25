try {
    var LF = '\n'
    var NONE = ''
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

        var pathname = req('pathname')
        var resolve = pathname.resolve
        var dirname = pathname.dirname
        var extname = pathname.extname
        var isAbsolute = pathname.isAbsolute
        var WorkingDirectory = pathname.WorkingDirectory

        var filesystem = req('filesystem')
        var existsFileSync = filesystem.existsFileSync
        var readTextFileSync = filesystem.readTextFileSync

        // util
        function getPathToModule(filespec) {
            var mod = Object.keys(Modules).find(function (key) {
                if (!has(Modules[key], 'path')) return false
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
            var parse = JSON.parse

            var pkg = resolve(dir, 'package.json')
            if (!existsFileSync(pkg)) return undefined
            var file = readTextFileSync(pkg)
            var json = parse(file)
            return getField(json, field)
        }

        function getAreas(caller, _query) {
            var rd = '/' // root directory
            var cd = './' // current directory
            var pd = '../' // parent directory
            var query = _query.replace(/\\/g, POSIXSEP)

            var areas = []

            // Replace '/' with Current Directory if query starts with '/'
            if (starts(query, rd)) {
                areas.push(resolve(WorkingDirectory, query.replace(rd, NONE)))

                // combine the caller's path and the query, if relative path
            } else if (starts(query, cd) || starts(query, pd)) {
                areas.push(resolve(dirname(caller), query))
            } else {
                areas.push(resolve(dirname(caller), query))

                // Otherwise, combine node_module while going back directory
                var hierarchy = dirname(caller)
                var node_modules = 'node_modules'
                var wes_modules = 'wes_modules'

                while (hierarchy !== NONE) {
                    areas.push(resolve(hierarchy, wes_modules, query))
                    areas.push(resolve(hierarchy, node_modules, query))
                    var _hierarchy = dirname(hierarchy)
                    if (hierarchy === _hierarchy) break
                    hierarchy = _hierarchy
                }
                var ScriptFullName = WScript.ScriptFullName
                areas.push(resolve(dirname(ScriptFullName), node_modules, query))
                areas.push(resolve(dirname(ScriptFullName), wes_modules, query))
            }
            return areas
        }

        function getEntry(areas) {
            var js = '.js'
            var json = '.json'
            var index = 'index.js'
            var indexmjs = 'index.mjs'
            var indexjson = 'index.json'
            var packagejson = 'package.json'

            var entry = null
            while (areas.length) {
                var type = getPkgField('/', 'type') || 'commonjs'
                var area = areas.shift()
                var temp
                type = getPkgField(dirname(area), 'type') || type
                if (existsFileSync((temp = area))) {
                    if (extname(temp) === '.mjs') type = 'module'
                    entry = temp
                    break
                }
                if (existsFileSync((temp = area + js))) {
                    entry = temp
                    break
                }
                if (existsFileSync((temp = area + json))) {
                    entry = temp
                    type = 'json'
                    break
                }
                if (existsFileSync((temp = resolve(area, index)))) {
                    type = getPkgField(area, 'type') || type
                    entry = temp
                    break
                }
                if (existsFileSync((temp = resolve(area, indexmjs)))) {
                    type = 'module'
                    entry = temp
                    break
                }
                if (existsFileSync((temp = resolve(area, indexjson)))) {
                    entry = temp
                    break
                }
                if (existsFileSync((temp = resolve(area, packagejson)))) {
                    var main = getPkgField(dirname(temp), 'main')
                    if (main == null) continue
                    areas.unshift(resolve(area, main))
                }
            }
            return { entry: entry, type: type }
        }

        function createModule(GUID, entry, query, parentModule, encode, type) {
            var parse = JSON.parse

            if (parentModule) parentModule.mapping[query] = GUID

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
            mod.type = type
            var js = '.js'
            var mjs = '.mjs'
            var json = '.json'

            switch (extname(entry)) {
                case mjs:
                case js:
                    var name = entry
                        .split(NONE)
                        .map(function (ch) {
                            return '$' + ch.codePointAt().toString(16).toUpperCase()
                        })
                        .join(NONE)
                    wes.filestack.push(entry)

                    var Babel = req('babel-standalone')
                    var babel_option = {
                        presets: ['env']
                    }
                    if (argv.get('comments') === false) babel_option.comments = false

                    var result_code = '"use strict";' + mod.source

                    if (mod.type === 'module') {
                        mod.source = Babel.transform(result_code, babel_option).code
                    } else if (argv.get('comments') === false) {
                        mod.source =
                            '(function ' + name + '() { ' + Babel.transform(result_code, babel_option).code + '} )()'
                    } else {
                        mod.source = '(function ' + name + '() { ' + result_code + '} )()'
                    }
                    mod.type = 'transpiled'

                    var buf = entry === 'buffer' ? null : req('buffer')
                    var code = new Function(
                        'require',
                        'module',
                        'exports',
                        'console',
                        '__dirname',
                        '__filename',
                        'wes',
                        'Buffer',
                        'global',
                        mod.source
                    )
                    code(
                        require.bind(null, entry),
                        mod.module,
                        mod.module.exports,
                        console,
                        dirname(entry),
                        entry,
                        wes,
                        buf,
                        { process: process, Buffer: buf, console: console }
                    )
                    wes.filestack.pop()
                    break
                case json:
                    mod.module.exports = parse(mod.source)
                    break
                default:
                    mod.module.exports = mod.source
            }
            return mod
        }

        // local require
        var process = {
            env: { NODE_ENV: NONE },
            cwd: function () {
                return WorkingDirectory
            },
            platform: 'win32'
        }
        function req(moduleID) {
            var mod = Modules[moduleID]
            var entry = mod.path || POSIXSEP
            if (!has(mod, 'exports')) {
                if (!has(mod, 'module')) {
                    mod.module = { exports: {} }
                    if (ends(mod.path, '.json')) {
                        mod.module.exports = JSON.parse(mod.source)
                        mod.exports = mod.module.exports
                        return mod.exports
                    }
                    var dirname = entry.split(POSIXSEP).slice(0, -1).join(POSIXSEP)
                    mod.mapping = mod.mapping || {}
                    var buf = entry === 'buffer' ? null : req('buffer')
                    new Function(
                        'require',
                        'module',
                        'exports',
                        'console',
                        '__dirname',
                        '__filename',
                        'wes',
                        'process',
                        'Buffer',
                        'global',
                        '"use strict";' + mod.source
                    )(
                        require.bind(null, entry),
                        mod.module,
                        mod.module.exports,
                        console,
                        dirname,
                        entry,
                        wes,
                        process,
                        buf,
                        { process: process, Buffer: buf, console: console }
                    )
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

            var file = getEntry(areas)
            var entry = file.entry
            var type = file.type
            if (entry == null)
                throw new Error(
                    'no module:\n' + 'caller: ' + caller + '\nquery: ' + query + LF + JSON.stringify(areas, null, 2)
                )

            var modId = req('genGUID')()
            if (wes.main == null) wes.main = modId
            var mod = createModule(modId, entry, query, parentModule, encode, type)
            mod.exports = mod.module.exports

            return mod.exports
        }

        wes.Modules = Modules

        var main = argv.unnamed[0] != null ? argv.unnamed[0] : 'REP'
        if (main in wes.Modules) wes.main = main
        require(resolve(WorkingDirectory, '_'), main, argv.get('encoding'))
    }
} catch (error) {
    if (!!console) {
        var orange = ansi.color(255, 165, 0)

        var errorStack = unescape(error.stack.split('$').join('%'))
        errorStack = errorStack.split(/\r?\n/).filter(function (line) {
            return !(
                starts(line, '   at Function code (Function code:') ||
                starts(line, '   at createModule (') ||
                starts(line, '   at require (') ||
                starts(line, '   at req (')
            )
        })
        var current = wes.filestack.slice(-1)

        console.log(orange + errorStack.join('\r\n').split('Function code:').join(NONE))

        if (error instanceof SyntaxError) {
            var fmt = retry(require.bind(null, resolve(WorkingDirectory, '*')), 'fmt', '@wachaon/fmt')
            if (fmt != null) {
                var source
                if (wes.main === 'REP') {
                    var file = Object.keys(wes.Modules).filter(function (key) {
                        return starts(key, '{')
                    })[0]
                    source = wes.Modules[file].source
                } else {
                    source = readTextFileSync(current)
                    console.log('\n%SWhere the error occurred: %S', ansi.yellow, current)
                }
                try {
                    fmt.format(source)
                } catch (e) {
                    console.log('%S%S', orange, e)
                }
            }
        }
    } else WScript.Popup('[error]' + error.message)
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
