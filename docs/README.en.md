# *WES*


*wes* is a framework for executing *ECMAScript* on *Windows Script Host*


The original text of the *README* is [*japanese*](docs/README.ja.md) . Other than Japanese, it is a machine-translated sentence.  
Please select sentences in other languages ​​from the following.


+  [*簡体字*](README.zh-CN.md) <!-- 中国語 (簡体字) -->
+  [*繁体字*](README.zh-TW.md) <!-- 中国語 (繁体字) -->
+  [*English*](README.en.md) <!-- 英語 -->
+  [*हिन्दी*](README.hi.md) <!-- ヒンディー語 -->
+  [*Español*](README.es.md) <!-- スペイン語 -->
+  [*عربى*](README.ar.md) <!-- アラビア語 -->
+  [*বাংলা*](README.bn.md) <!-- ベンガル語 -->
+  [*Português*](README.pt.md) <!-- ポルトガル語 -->
+  [*русский язык*](README.ru.md) <!-- ロシア語 -->
+  [*Deutsch*](README.de.md) <!-- ドイツ語 -->
+  [*français*](README.fr.md) <!-- フランス語 -->
+  [*italiano*](README.it.md) <!-- イタリア語 -->



# Features


-   *Chakra* the scripting engine of *Windows Script Host* to run *ECMAScript2015* *Chakra*
-   Since 32bit *cscript.exe* is executed, there is no problem specific to 64bit environment.
-   Import the module with `require`
-   Outputs colored characters to standard output
-   Automatically guess the file encoding


# Features not resolved


-   `WScript.Quit` can't interrupt the program and doesn't return an error code
-   Asynchronous processing
-   The second argument *event prefix* of `WScript.CreateObject` cannot be used


# Install


*wes* need is *wes.js* only file. To download, start a command prompt and enter the following command.


```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```


*wes* at the time of execution as the implementation *WScript.Shell* of `SendKeys` use. *wes.js* the path of the directory where *wes.js* is saved contains characters other than *ascii* , `SendKeys` will not be able to send the key correctly and the script will not be able to be executed.  
Please configure the save destination path of *wes.js* only *ascii* .


## Usage


On the command line, specify the file that will be the starting point of the program after `wes` . The script extension *.js* can be omitted.


```shell
wes index
```


Also, *wes* has a *REPL* so if you start it only with `wes` , you can enter the script directly.


```shell
wes
```


Scripts will be accepted until you enter two blank lines. *README.md* can also check the execution of the sample script in *README.md* with *REPL* .


## command-line named arguments


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


The implementation of `--safe` `--usual` `--unsafe` `--dangerous` is incomplete, but named arguments are reserved.


# built-in objects


*wes* has *built-in objects* that *WSH (JScript)* doesn't have.


## *require*


Import the module with *require* . *wes* automatically guesses the encoding of the module file, but if you don't guess correctly, you can specify the encoding with the second argument.


You can also import to *OLE* like `require('WScript.Shell')` with *require* .


```javascript
const WShell = require('WScript.Shell')
const ie = require('InternetExplorer.Application')
ie.Visible = true
ie.Navigate('https://google.com/')
while (ie.Busy || ie.readystate != 4) {
    WScript.Sleep( 100 )
}
WShell.AppActivate(ie.LocationName)
```


## `module` and `module.exports`


If you want to define it as a module, assign it to `module.exports` .


```javascript
function add (a, b) {
    return a + b
}

module.exports = add
```


## *console*


*wes* In `WScript.Echo` and `WScript.StdErr.WriteLine` instead of the *console* use the.


Print characters to the command line in `console.log` . It also supports formatted strings. Prints a formatted string using the formatting operator `%` .


```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```


*wes* in order to output a string colored in `WScript.StdOut.WriteLine` instead, `WScript.StdErr.WriteLine` use. `WScript.Echo` and `WScript.StdOut.WriteLine` are blocked from output, so use `WScript.StdErr.WriteLine` or `console.log` .


## *Buffer*


Can handle buffers.


```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```


## `__dirname` and `__filename`


`__filename` contains the path of the currently running module file. `__dirname` `__filename` the directory of `__filename` .


```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```


# built-in modules


*wes* has *built-in modules* to simplify and standardize basic processing.


## *ansi*


`ansi` has an *ANSI escape code* that allows you to change the color and effect of standard output. Colors and effects may vary depending on the type and settings of the console application used.


```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```


You can also create your own colors with `ansi.color()` and `ansi.bgColor()` . The argument uses *RGB* such as `255, 165, 0` or *color code* such as `'#FFA500'` . You cannot use *color name* such as `orange` .


```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```


## *argv*


Gets the command line argument. `cscript.exe` command-line arguments of `/` declares named arguments in but, *wes* in `-` and `--` declare the named arguments in.


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


## *JScript*


If you change the script engine to *Chakra* , you will not be able to use *JScript* specific *Enumerator* etc. The built-in module *JScript* makes them available. However, *Enumerator* returns an *Array* instead of an Enumerator object.


```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```


*GetObject* `WScript.GetObject` as an alternative to `WScript.GetObject` .


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


*httprequest* is as its name *http request* will issue a.


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


*pipe* simplifies pipe processing


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


# Module bundle and install


*install* , you can install the module for *wes* published on *github* . You will need a *github repository* to publish the module. Also, the repository name and the local directory name must be the same.


## *bundle*


*github* publishing a module to *github* , *bundle* bundles the required module and changes it to a format that can be imported by the *install* module.


For safety reasons, *wes* does not import modules in a format that can be executed directly, so create a *.json* file with the *bundle* module.


There are some conditions for bundling modules.


1.  *repository* one type of module can be published in one *repository* .
2.  The repository name on *github* and the local working directory name must be the same.
3.  The repository must be public if you want to publish the module to a third party.
4.  *wes* does not statically interpret the script. Modules acquired by `require` under specific conditions such as `if` statements may not be bundled.
5.  *.json* file will be created in your working directory with the name *directory_name.json* . It cannot be installed if the file is renamed or the file is moved.
6.  `node_modules/directory_name` , the bundle fails because it refers to `directory_name.json` .


## *install*


Used to install the module file for *wes* published on *github* .


### usage


Pass arguments to *install* in the format `@author/repository`


```shell
wes install @wachaon/fmt
```


*install* has options


| named      | short named | description                                        |
| ---------- | ----------- | -------------------------------------------------- |
| `--bare`   | `-b`        | Do not create *@author* folder                     |
| `--global` | `-g`        | Install the module in the folder where *wes.js* is |


`--bare` option can omit the `require` argument from `author@repository` to `repository` . `--global` option makes the installed modules available to all scripts. The above options must be specified at the same time as the *wes* security option `--unsafe` or `--dangerous` .


```shell
wes install @wachaon/fmt --bare --unsafe
```


# Install the module of private repository


*install* can be installed not only in modules in public repositories on *github* , but also in private repositories.


*install* , specify the module with `author@repository` . The implementation downloads the following.


```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```


When you access the *raw* of the private repository with a browser, the *token* will be displayed, so copy the *token* and use it.


You can also install a module in a private repository by running it on the command line within the *token* 's *token* .


```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```


# External module


Here are some external modules.


## *@wachaon/fmt*


*@wachaon/fmt* bundles *prettier* and formats the script. Also, if *@wachaon/fmt* is installed and a `SyntaxError` Error occurs, the error location can be indicated.


### install


```shell
wes install @wachaon/fmt
```


### usage


If there is *.prettierrc* (JSON format) in the working directory, it will be reflected in the setting. *fmt* can be used with both *CLI* (command line interface) and *module* in *fmt* .


Use as *CLI*


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


### *module* using as a *module*


### `option`


```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')

const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```
