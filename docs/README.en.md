# *WES*

*wes* is a console framework for running *ECMAScript* on *WSH (Windows Script Host)* . The original [*japanese*](/README.md) of the *README* will be in Japanese. Texts other than Japanese will be machine translated.\
For texts in other languages, please select from the options below.

+  [*English*](/docs/README.en.md) <!-- 英語 -->
+  [*簡体字*](/docs/README.zh-CN.md) <!-- 中国語 (簡体字) -->
+  [*繁体字*](/docs/README.zh-TW.md) <!-- 中国語 (繁体字) -->
+  [*Español*](/docs/README.es.md) <!-- スペイン語 -->
+  [*Deutsch*](/docs/README.de.md) <!-- ドイツ語 -->
+  [*français*](/docs/README.fr.md) <!-- フランス語 -->
+  [*हिन्दी*](/docs/README.hi.md) <!-- ヒンディー語 -->
+  [*Português*](/docs/README.pt.md) <!-- ポルトガル語 -->
+  [*italiano*](/docs/README.it.md) <!-- イタリア語 -->
+  [*русский язык*](/docs/README.ru.md) <!-- ロシア語 -->
+  [*Melayu*](/docs/README.ms.md) <!-- マレー語 -->
+  [*Nederlands*](/docs/README.nl.md) <!-- オランダ語 -->
+  [*عربى*](/docs/README.ar.md) <!-- アラビア語 -->
+  [*বাংলা*](/docs/README.bn.md) <!-- ベンガル語 -->

# feature

*   You can change the script engine to *Chakra* and write according to *ECMAScript2015* specifications.
*   Since 32bit *cscript.exe* is always executed, there is no unique problem in 64bit environment.
*   Since there is a module system, it can be developed more efficiently than the conventional *WSH*
*   Built-in modules support basic processing such as file input/output and colored text output to the console
*   You can let file reading automatically guess the encoding, so you don't have to worry about encoding etc.
*   Package modules to support external publishing and retrieval
*   Display error details more kindly than *WSH*

# *wes* issues that we can't solve

*   `WScript.Quit` cannot abort the program and does not return an error code
*   Asynchronous processing does not work properly
*   You cannot use the *event prefix* of the second argument of `WScript.CreateObject`

# download

*wes.js* *wes* . To download, copy *wes.js* from [*@wachaon/wes*](https://github.com/wachaon/wes) or run the following command in console.

     bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js

*WScript.Shell* *wes* `SendKeys` at runtime as an implementation. If the path of the directory where *wes.js* is saved contains characters other than *ascii* , `SendKeys` cannot send the key correctly and the script cannot be executed.\
Configure the path *wes.js* is stored in *ascii* only. If you have already downloaded *wes* , you can update it with the following command.

     wes update

# Usage

Enter the `wes` keyword followed by the command specifying the file that will be the starting point of the program to the console. The script extension *.js* can be omitted.

     wes index

Also, since *wes* is equipped with *REP* , you can enter scripts directly by starting `wes` alone.

     wes

*REP* accepts script input until you enter two blank lines. You can also see *REP* running the example script in *README.md* .

## command line options

*wes* startup options are as follows.

| named              | Description                                    |
| ------------------ | ---------------------------------------------- |
| `--monotone`       | Eliminates *ANSI escape code*                  |
| `--transpile`      | Always convert and run with *babel-standalone* |
| `--debug`          | run the script in debug mode                   |
| `--encoding=UTF-8` | Specifies the encoding of the first file read  |
| `--engine=Chakra`  | This option is added automatically by *wes*    |

# module system

*wes* supports two module systems, the *commonjs module* system using `require()` and the *es module* system using `import` . ( *dynamic import* is not supported because it is an asynchronous process)

## *commonjs module*

Manage modules by assigning to `module.exports` and calling `require()` . Paths other than absolute paths and relative paths starting with `./` and `../` look for modules in the *wes\_modules* directory and conveniently the *node\_modules* directory. *wes* 's `require()` automatically guesses the encoding of the module file, but you can specify the encoding with the second argument if it doesn't guess correctly.

     // ./add.js function add (a, b) { return ab } module.exports = add

<!---->

     // ./main.js const add = require('./add') console.log('add(7, 3) // => %O', add(7, 3))

Also, it is possible to import with *require* for *COM Object* like `require('WScript.Shell')` .

     const Shell = require('Shell.Application') Shell.MinimizeAll() WScript.Sleep(2000) Shell.UndoMinimizeAll()

## *es module*

*Chakra* , which is the script execution engine, interprets syntax such as `imoprt` , but it cannot be executed as it is because the processing method as *cscript* is not defined. In *wes* , by adding *babel* to the built-in modules, *es module* are also executed while being transpiled one by one. This costs us processing overhead and a bloated *wes.js* file. Modules written in *es module* are also converted to `require()` by transpiling, so it is possible to call *COM Object* . However, it does not support specifying the encoding of the module file with *es module* . Everything is loaded automatically. To load it as an *es module* , set the extension to `.mjs` or set the `"type"` field in `package.json` to `"module"` .

     // ./sub.mjs export default function sub (a, b) { return a - b }

<!---->

     // ./main2.js import sub from './sub.mjs' console.log('sub(7, 3) // => %O', sub(7, 3))

# built-in object

*wes* has *built-in objects* not found in *WSH (JScript)* .

undefined

## *Buffer*

You can handle buffers.

     const content = 'Hello World' const buff = Buffer.from(content) console.log(`${content} %O`, buff)

## `__dirname` and `__filename`

`__filename` stores the path of the currently executing module file. `__dirname` contains the directory of `__filename` .

     console.log('dirname: %O\nfilename: %O', __dirname, __filename)

## *setTimeout* *setInterval* *setImmediate* *Promise*

Since *wes* is an execution environment for synchronous processing, *setTimeout* *setInterval* *setImmediate* *Promise* does not function as asynchronous processing, but it is implemented to support modules that assume *Promise* implementation.

     const example = () => { const promise = new Promise((resolve, reject) => { console.log('promise') setTimeout(() => { console.log('setTimeout') resolve('resolved'); }, 2000); }).then((val) => { console.log(val) }); console.log('sub') }; console.log('start') example(); console.log('end')

# Built-in module

*wes* has *built-in modules* to simplify and standardize basic processing.

## *ansi*

`ansi` is *ANSI escape code* that can change standard output colors and effects. Colors and effects may differ depending on the type and settings of the console application used.

     const { redBright, yellow } = require('ansi') const message = 'File does not exist' console.log(redBright 'Error: ' yellow message)

You can also create your own colors with `ansi.color()` and `ansi.bgColor()` . Arguments use *RGB* such as `255, 165, 0` and *color code* such as `'#FFA500'` . *color name* such as `orange` are not supported.

     const { color } = require('ansi') const orange = color(255, 165, 0) console.log(orange 'Hello World')

## *argv*

Get command line arguments. `cscript.exe` 's command line arguments declare named arguments with `/` , while *wes* declares named arguments with `-` and `--` . *argv.unnamed* and *argv.named* the command line argument value type to either *String* *Number* *Boolean* . Enter command line arguments with *REP* .

     wes REP aaa -bcd eee --fgh=iii jjj --kln mmm

Run the following script on *REP* .

     const argv = require('argv') console.log(`argv: %O argv.unnamed: %O argv.named: %O`, argv, argv.unnamed, argv.named)

## *pathname*

Manipulate paths. Paths starting with `/` and `\` are generally relative to the drive root. For example `/filename` and `C:/filename` can be the same path. For security reasons, *wes* interprets paths starting with `/` and `\` relative to the working directory.

     const path = require('pathname') const file = path.resolve(__dirname, 'index.js') console.log('file %O', file)

## *filesystem*

Manipulate files and directories. `readTextFileSync()` automatically guesses the encoding of the file and reads it. (Even if the second argument of `readFileSync()` is `encode` to `auto` , it will be guessed automatically.)

     const fs = require('filesystem') const path = require('pathname') const readme = path.resolve(__dirname, 'README.md') const contents = fs.readTextFileSync(readme) // const contents = fs.readFileSync(readme, 'auto') console.log(contents)

## *chardet*

I am using some features from <https://github.com/runk/node-chardet> . You can increase the accuracy of auto-guessing by increasing encoding-specific characters.

## *JScript*

If you change the script engine to *Chakra* , you won't be able to use *JScript* -specific *Enumerator* , etc. The built-in module *JScript* makes them available. However, *Enumerator* returns an *Array* , not an *Enumerator object* .

     const { Enumerator, ActiveXObject } = require('JScript') const FSO = new ActiveXObject('Scripting.FileSystemObject') const dir = FSO.getFolder(__dirname).Files const files = new Enumerator(dir) files.forEach(file => console.log(file.Name))

*GetObject* works as an alternative to `WScript.GetObject` .

     const { GetObject, Enumerator } = require('JScript') const ServiceSet = GetObject("winmgmts:{impersonationLevel=impersonate}").InstancesOf("Win32_Service") new Enumerator(ServiceSet).forEach(service => console.log( 'Name: %O\nDescription: %O\n', service.Name, service.Description ))

## *VBScript*

*VBScript* offers some features that *JScript* does not.

     const { TypeName } = require('VBScript') const FSO = require('Scripting.FileSystemObject') console.log(TypeName(FSO))

## *httprequest*

*httprequest* issues an *http request* .

     const request = require('httprequest') const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1') console.log('%O', JSON.parse(content))

undefined

## *pipe*

*pipe* simplifies piping.

### Usage

     const pipe = require('pipe') function add (a, b) { return ba } function sub (a, b) { return b - a } function div (a, b) { return a / b } const add5 = add.bind(null, 5) const sub3 = sub.bind(null, 3) pipe() .use(add5) .use(sub3) .use(div, 4) .process(10, (err, res) => console.log('res: %O', res))

## *typecheck*

Determine the script type.

### Usage

     const { isString, isNumber, isBoolean, isObject } = require('typecheck') const log = require('log') log(() => isString("ECMAScript")) log(() => isNumber(43.5)) log(() => isBoolean(false)) log(() => isObject(function(){}))

undefined

## *getMember*

Get member type and description of *COM Object* from *ProgID* .

### Usage

     const getMember = require('getMember') const FileSystemObject = 'Scripting.FileSystemObject' console.log('require("%S") // => %O', FileSystemObject, getMember(FileSystemObject))

## *zip*

Compresses files and folders and decompresses compressed files. Internally, *PowerShell* is called and processed.

### Usage

     const {zip, unzip} = require('zip') console.log(zip('docs\\*', 'dox.zip')) console.log(unzip('dox.zip'))

A wildcard `*` can be written in the `path` of `zip(path, destinationPath)` . It can be used in both *CLI (Command Line Interface)* and *module* .

     wes zip docs\* dox.zip wes zip -p dox.zip

If the `path` has the extension `.zip` , `unzip()` is processed, and there is no description of the extension `.zip` . Alternatively, even if there is an extension `.zip` , if there is a wildcard `*` description, `zip()` will be processed.

| unnamed | Description                  |
| ------- | ---------------------------- |
| `1`     | `path` or file to enter      |
| `2`     | folder file to output `dest` |

| named    | short named | Description                  |
| -------- | ----------- | ---------------------------- |
| `--path` | `-p`        | `path` or file to enter      |
| `--dest` | `-d`        | folder file to output `dest` |

# Bundling (packaging) and installing modules

In *wes* , a bundle of several modules is called a package. You can install the package for *wes* published on *github* . A *github repository* is required to publish a package.

## *bundle*

When publishing a package to *github* , *bundle* bundles the required modules and creates *bundle.json* .

1.  Only one package can be published in one *repository*

2.  *package.json* is required. At a minimum, the description of the `main` field is required.

         { "main": "index.js" }

3.  Make the repository *public* if you want to publish the package

4.  Starting with `version 0.12.0` , packages with direct module loading into a directory above the working directory will not be bundled. Packages in the upper directory *wes\_modules* or *node\_modules* can be bundled.

Enter the following command to bundle: Refer to *package.json* for what to bundle.

     wes bundle

undefined

# Installing packages from private repositories

*install* can install not only packages from public *github* repositories, but also packages from private repositories. In *install* , specify the package with *@author/repository* . The implementation tries to download the following url.

     `https://raw.githubusercontent.com/${author}/${repository}/master/bundle.json`

If you access the private repository *raw* with a browser, the *token* will be displayed, so copy the *token* and use it. You can also install packages from private repositories by running it in the console while the *token* is valid.

     wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA

# Package introduction

Here are some external packages.

## *@wachaon/fmt*

*@wachaon/fmt* is *prettier* packaged for *wes* to format scripts. Also, if a *Syntax Error* occurs while *@wachaon/fmt* is installed, you can indicate the location of the error.

### install

     wes install @wachaon/fmt

### Usage

If there is *.prettierrc* (JSON format) in the working directory, it will be reflected in the settings. *fmt* is available in both *CLI* and *module* .

#### Use as *CLI* .

     wes @wachaon/fmt src/sample --write

| unnamed number | Description                                       |
| -------------- | ------------------------------------------------- |
| 1              | Required. the path of the file you want to format |

| named     | short named | Description     |
| --------- | ----------- | --------------- |
| `--write` | `-w`        | allow overwrite |

Overwrite the file with the formatted script if `--write` or the `-w` named argument is specified.

#### use as a module

     const fmt = require('@wachaon/fmt') const { readTextFileSync, writeTextFileSync } = require('filesystem') const { join, workingDirectory } = require('pathname') const target = join(workingDirectory, 'index.js') console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
