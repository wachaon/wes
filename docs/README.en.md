# *WES*


*wes* is a console framework that runs *ECMAScript* on *WSH (Windows Script Host)* .


The original text of the *README* is [*japanese*](/README.md) . Other than Japanese, it is a machine-translated sentence.  
Please select sentences in other languages ​​from the following.


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


-   You can change the script engine to *Chakra* and write it in the *ECMAScript2015* specification
-   It always runs 32bit *cscript.exe* , so there are no inherent problems in 64bit environment.
-   With a modular system, you can develop more efficiently than traditional *WSH*
-   The built-in module supports basic processing such as file input / output and output of colored characters to the console.
-   You don't have to worry about encoding because you can have the file read automatically guess the encoding.
-   We also package modules to support external publishing and retrieval.


# Known issues *wes* cannot solve


-   `WScript.Quit` can't interrupt the program and doesn't return an error code
-   Asynchronous processing such as `setTimeout` and `Promise` is not possible
-   You cannot use the *event prefix* as the second argument of `WScript.CreateObject`


# install


*wes.js* *wes* . To download, copy *wes.js* from [*@wachaon/wes*](https://github.com/wachaon/wes) or run the following command in the console.


```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```


*WScript.Shell* uses `SendKeys` in *wes* at runtime as an implementation. If the path of the directory where *wes.js* is saved contains characters other than *ascii* , `SendKeys` will not be able to send the key correctly and the script will not be able to be executed.  
Please configure the save destination path of *wes.js* only *ascii* .


# How to use


Enter the command that specifies the file that will be the starting point of the program from the `wes` keyword in the console. The script extension *.js* can be omitted.


```shell
wes index
```


Also, *wes* has a *REPL* , so if you start it only with `wes` , you can enter the script directly.


```shell
wes
```


The *REPL* accepts script input until you enter two blank lines. You can also check the execution of the sample script in *README.md* with *REPL* .


## Command line options


The startup options for *wes* are as follows.


| named              | description                                      |
| ------------------ | ------------------------------------------------ |
| `--monotone`       | Eliminate *ANSI escape code*                     |
| `--safe`           | Run the script in safe mode                      |
| `--usual`          | Run the script in normal mode (default)          |
| `--unsafe`         | Run the script in unsafe mode                    |
| `--dangerous`      | Run the script in dangerous mode                 |
| `--debug`          | Run the script in debug mode                     |
| `--encoding=UTF-8` | Specifies the encoding of the first file to read |
| `--engine=Chakra`  | This option is automatically added by *wes*      |


The implementation of `--safe` `--usual` `--unsafe` `--dangerous` `--debug` is incomplete, but named arguments are reserved.


# Modular system


*wes* supports two module systems, a *commonjs module* system that uses the general `require()` and an *es module* that uses `import` . ( *dynamic import* is asynchronous processing, so it is not supported)


## *commonjs module*


Manage modules by assigning to `module.exports` and calling with `require()` . For convenience, it also supports the *node_modules* directory.


*wes* `require()` automatically guesses the encoding of the module file, but if it doesn't guess correctly, you can specify the encoding with the second argument.


```javascript
// ./add.js
function add (a, b) {
    return a + b
}

module.exports = add
```


```javascript
// ./main.js
const add = require('./add')

console.log('add(7, 3) // => %O', add(7, 3))
```


You can also import to *ActiveX* with *require* `require('WScript.Shell')` like require ('WScript.Shell').


```javascript
const Shell = require('Shell.Application')
Shell.MinimizeAll()
WScript.Sleep(2000)
Shell.UndoMinimizeAll()
```


## *es module*


*Chakra* , which is the execution engine of the script, interprets the syntax such as `imoprt` , but it cannot be executed as it is because the processing method as `cscript` is not defined. In *wes* , by adding *babel* to the built-in module, it is executed while sequentially transpiling to the *es module* . As a result, the processing overhead and the *wes.js* file are bloated as a cost.


Modules described by *es module* are also transpile converted to `require()` , so *ActiveX* can be called. However, it does not support the module file encoding specification. All are read by automatic guessing.


To load it as an *es module* , set the extension to `.mjs` or the `"type"` field of `package.json` to `"module"` .


```javascript
// ./sub.mjs
export default function sub (a, b) {
    return a - b
}
```


```javascript
./main2.js\
import sub from './sub.mjs'

console.log('sub(7, 3) // => %O', sub(7, 3))
```


# Built-in object


*wes* has *built-in objects* that *WSH (JScript)* doesn't have.


## *console*


*wes* uses *console* instead of `WScript.Echo` or `WScript.StdErr.WriteLine` .


Print characters to the console in `console.log` . It also supports formatted strings. Prints a formatted string using the formatting operator `%` .


```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```


`WScript.StdOut.WriteLine` *wes* of `WScript.StdErr.WriteLine` to output colored strings. `WScript.Echo` and `WScript.StdOut.WriteLine` are blocked from output. `WScript.StdErr.WriteLine` or `console.log` .


## *Buffer*


Can handle buffers.


```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```


## `__dirname` and `__filename`


`__filename` contains the path of the currently running module file. `__dirname` contains the directory of `__filename` .


```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```


# Built-in module


*wes* has *built-in modules* to simplify and standardize basic processing.


## *ansi*


`ansi` is an *ANSI escape code* that allows you to change the color and effect of standard output. Colors and effects may vary depending on the type and settings of the console application used.


```javascript
const { redBright, yellow } = require('ansi')
const message = 'File does not exist'
console.log(redBright + 'Error: ' + yellow + message)
```


You can also create your own colors with `ansi.color()` and `ansi.bgColor()` . The argument uses *RGB* such as `255, 165, 0` or *color code* such as `'#FFA500'` . It does not support *color name* such as `orange` .


```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```


## *argv*


Gets the command line argument. The command line arguments in `cscript.exe` declare named arguments with `/` `--` while *wes* declare named arguments with `-` and-.


*argv.unnamed* and *argv.named* cast the value type of the command line argument to one of the *String* *Number* *Boolean* .


Enter the command line arguments along with the *REPL* .


```shell
wes REPL aaa -bcd eee --fgh=iii jjj --kln mmm
```


Run the following script in the *REPL* .


```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```


## *pathname*


Operate the path.


Paths starting with `/` and `\` generally refer to paths relative to the drive root. For example, `/filename` and `C:/filename` may be on the same path. For security reasons, `wes` interprets paths starting with `/` and `\` as relative to the working directory.


```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```


## *filesystem*


Operate files and directories. `readTextFileSync` automatically guesses and reads the file's encoding.


```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```


## *chardet*


I am using some features of <https://github.com/runk/node-chardet> .


You can improve the accuracy of automatic guessing by increasing the characters specific to the encoding.


## *JScript*


If you change the script engine to *Chakra* , you will not be able to use *JScript* -specific *Enumerator* etc. The built-in module *JScript* makes them available. However, *Enumerator* returns an *Array* instead of an *Enumerator object* .


```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```


*GetObject* acts as an alternative to `WScript.GetObject` .


```javascript
const { GetObject, Enumerator } = require('JScript')

const ServiceSet = GetObject("winmgmts:{impersonationLevel=impersonate}").InstancesOf("Win32_Service")
new Enumerator(ServiceSet).forEach(service => console.log(
    'Name: %O\nDescription: %O\n',
    service.Name,
    service.Description
))
```


## *VBScript*


*VBScript* provides some features that *JScript* does not have.


```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```


## *httprequest*


*httprequest* issues an *http request* .


```javascript
const request = require('httprequest')
const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log('%O', JSON.parse(content))
```


## *minitest*


*minitest* can write simple tests.


```javascript
const { describe, it, assert } = require('minitest')

function add (a, b) {
  return a + b
}

describe( '# calc test', () => {
  it('add(2, 5) === 7', () => {
    assert(add(2, 5) === 7)
  })
})
```


## *pipe*


*pipe* simplifies pipe processing.


```javascript
const pipe = require('pipe')

function add (a, b) {
    return b + a
}

function sub (a, b) {
    return b - a
}

const add5 = add.bind(null, 5)
const sub3 = sub.bind(null, 3)

pipe()
  .use(add5)
  .use(sub3)
  .process(10, (err, res) => console.log('res: %O', res))
```


## *typecheck*


Determine the type of the script.


```javascript
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```


## *zip*


Compress files and folders and decompress compressed files. It calls *PowerShell* internally and processes it.


```javascript
const {zip, unzip} = require('zip')

console.log(zip('docs\\*', 'dox.zip'))
console.log(unzip('dox.zip'))
```


Wildcards `*` can be written in the `path` of `zip(path, destinationPath)` .


It can be used with both *CLI (Command Line Interface)* and *module* .


```shell
wes zip docs\* dox.zip
wes zip -p dox.zip
```


If `path` has extension `.zip` , `unzip()` is processed and there is no description of extension `.zip` . Or even if there is a `.zip` extension, if there is a description of a wildcard `*` , `zip()` will be processed.


| unnamed | description                    |
| ------- | ------------------------------ |
| `1`     | `path` Folder or file to enter |
| `2`     | folder file to output `dest`   |


| named    | short named | description                    |
| -------- | ----------- | ------------------------------ |
| `--path` | `-p`        | `path` Folder or file to enter |
| `--dest` | `-d`        | folder file to output `dest`   |


# Module bundling and installation


In *wes* , a bundle of several modules is called a package. You can install the package for *wes* published on *github* . You will need a *github repository* to publish the package. Also, the repository name and the local directory name must be the same.


## *bundle*


When publishing the package to *github* , *bundle* bundles the required modules and changes the format so that it can be imported by installation.


For security reasons, *bundle* creates a *.json* file because *wes* doesn't allow you to import packages in a format that can be executed directly.


There are some conditions for packaging.


1.  Only one module can be published in one *repository* .
2.  Make sure that the repository name on *github* and the local working directory name are the same.
3.  If you want to publish the package, make the repository *public* .
4.  Declare module acquisition in top-level scope.
5.  The package *.json* file is created in your working directory with the name *directory_name.json* . It cannot be installed if the file is renamed or the file is moved.
6.  `node_modules/directory_name` , the bundle fails because it refers to `directory_name.json` .


## *install*


Used to install the package for *wes* published on *github* .


### How to use


Pass arguments to *install* in the format `@author/repository` .


```shell
wes install @wachaon/fmt
```


*install* has options.


| named      | short named | description                                        |
| ---------- | ----------- | -------------------------------------------------- |
| `--bare`   | `-b`        | Do not create *@author* folder                     |
| `--global` | `-g`        | Install the module in the folder where *wes.js* is |


`--bare` option can omit the `require` argument from `author@repository` to `repository` . `--global` option makes the installed modules available to all scripts. The above options must be specified at the same time as the *wes* security option `--unsafe` or `--dangerous` .


```shell
wes install @wachaon/fmt --bare --unsafe
```


# Installing packages in private repositories


*install* can install not only modules in public repositories on *github* , but also private repositories.


In *install* , specify the module with *@author/repository* . The implementation will try to download the following url.


```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```


When you access the *raw* of the private repository with a browser, the *token* will be displayed, so copy the *token* and use it.


You can also install a module in a private repository by running it in the console within the *token* 's lifetime.


```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```


# Package introduction


Here are some external modules.


## *@wachaon/fmt*


*@wachaon/fmt* bundles *prettier* and formats the script. Also, if a *Syntax Error* occurs with *@wachaon/fmt* installed, you can indicate the error location.


### install


```shell
wes install @wachaon/fmt
```


### How to use


If there is *.prettierrc* (JSON format) in the working directory, it will be reflected in the setting. *fmt* can be used with both *CLI* and *module* .


#### Used as *CLI* .


```shell
wes @wachaon/fmt src/sample --write
```


| unnamed number | description                                       |
| -------------- | ------------------------------------------------- |
| 0              | ――――                                              |
| 1              | Required. The path of the file you want to format |


| named     | short named | description       |
| --------- | ----------- | ----------------- |
| `--write` | `-w`        | Allow overwriting |


Overwrite the file with a formatted script if you specify a named argument of `--write` or `-w` .


#### Use as a module


```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')

const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```


## `@wachaon/edge`


*Internet Explorer* will complete support with 2022/6/15. As a result, it is expected that it will not be possible to operate the application with `require('InternetExplorer.Application')` .


An alternative would be to operate *Microsoft Edge based on Chromium* via the *web driver* . `@wachaon/edge` simplifies *Edge* autopilot.


### install


First, install the module.


```shell
wes install @wachaon/edge --unsafe --bare
```


Then download the *web driver* .


```shell
wes edge --download
```


Check the installed version of *Edge* and download the corresponding *web driver* .


### How to use


It will be easy to use.


```javascript
const edge = require('./index')

edge((window, navi, res) => {
    window.rect({x: 1 ,y: 1, width: 1200, height: 500})
    res.exports = []

    navi.on(/https?:\/\/.+/, (url) => {
        console.log('URL: %O', url)
        res.exports.push(url)
    })

    window.navigate('https://www.google.com')
})
```


This script will sequentially output the visited *URL* to the console.


`@wachaon/edge` registers an event for the *URL* and adds data to `res.exports` . The *URL* to be registered can be either `String` `RegExp` , and flexible settings can be made.


By making it event-driven, it is possible to easily switch to manual operation by not setting an event for processing that is difficult to handle with autopilot.


If you want to stop the script, run `navi.emit('terminate', res)` or manually terminate *Edge* .


The termination process outputs `res.exports` as a *.json* file as the default value. If you want to set the termination process, set `terminate` of `edge(callback, terminate)` .
