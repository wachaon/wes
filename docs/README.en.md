# *WES*

*wes* is a framework to execute *ECMAScript* on *Windows Script Host*

*README* original of the [*japanese*](README.ja.md) will be. Other than Japanese, the text will be machine translated.  
Please select from the following texts in other languages.

-   [*簡体字*](README.zh-CN.md) <!-- 中国語 (簡体字) -->
-   [*繁体字*](README.zh-TW.md) <!-- 中国語 (繁体字) -->
-   [*English*](README.en.md) <!-- 英語 -->
-   [*हिन्दी*](README.hi.md)　<!-- ヒンディー語 -->
-   [*Español*](README.es.md) <!-- スペイン語 -->
-   [*عربى*](README.ar.md) <!-- アラビア語 -->
-   [*বাংলা*](README.bn.md) <!-- ベンガル語 -->
-   [*Português*](README.pt.md) <!-- ポルトガル語 -->
-   [*русский язык*](README.ru.md) <!-- ロシア語 -->
-   [*Deutsch*](README.de.md) <!-- ドイツ語 -->
-   [*français*](README.fr.md) <!-- フランス語 -->
-   [*italiano*](README.it.md)　<!-- イタリア語 -->

## Features

-   Change the script engine to *Chakra* and execute *ECMAScript2015* *Chakra*
-   *cscript.exe* 32bit *cscript.exe* and does not cause any bugs specific to 64bit environment
-   import the module with `require`
-   Outputs colored characters to standard output
-   Guess the file encoding automatically

## Features not resolved

-   `WScript.Quit` cannot interrupt the program and does not return an error code
-   Asynchronous processing
-   Utilization of *event prefix* of the second argument of `WScript.CreateObject`

## Install

*wes* need is *wes.js* only file. To download, start the command prompt and enter the following command.

```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

*wes* uses *WScript.Shell* 's `SendKeys` as an implementation. *wes.js* the path of the directory where *wes.js* is saved contains characters other than *ascii* , `SendKeys` cannot send the key correctly and the script cannot be executed.  
Please configure *ascii* only for the path to save *wes.js*

## Usage

In the command line, specify the file that is the starting point of the program after `wes` . The script extension *.js* can be omitted.

```shell
wes index
```

Also, *wes* comes with a *REPL* so if you start it only with `wes` , you can enter the script directly.

```shell
wes
```

Script input is accepted until you enter two blank lines. *README.md* can also check the execution of the sample script in *README.md* with *REPL* .

## command-line named arguments

The start options of *wes* are as follows.

| named              | description                                      |
| ------------------ | ------------------------------------------------ |
| `--monotone`       | Eliminate *ANSI escape code*                     |
| `--safe`           | Run the script in safe mode                      |
| `--usual`          | Run the script in normal mode (default)          |
| `--unsafe`         | Run the script in unsafe mode                    |
| `--dangerous`      | Run the script in dangerous mode                 |
| `--debug`          | Run the script in debug mode                     |
| `--encoding=UTF-8` | Specifies the encoding of the file to read first |
| `--engine=Chakra`  | This option is automatically added by *wes*      |

The implementation of `--safe` `--usual` `--unsafe` `--dangerous` is incomplete, but named arguments are reserved.

## built-in objects

*wes* has *built-in objects* that *WSH (JScript)* does not have.

### *require*

Import the module with *require* . *wes* automatically guesses the encoding of the module file, but if you do not guess it correctly, you can specify the encoding with the second argument.

You can also import with *require* for *OLE* like `require('WScript.Shell')` .

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

### module and module.exports

If you want to define it as a module, substitute it in `module.exports` .

```javascript
function add (a, b) {
    return a + b
}

module.exports = add
```

### *console*

*wes* In `WScript.Echo` and `WScript.StdErr.WriteLine` instead of the *console* use the.

Output characters to the command line with `console.log` . It also supports formatted strings. Output the format string using the format operator `%` .

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

*wes* in order to output a string colored in `WScript.StdOut.WriteLine` instead, `WScript.StdErr.WriteLine` use. `WScript.Echo` output of `WScript.Echo` and `WScript.StdOut.WriteLine` is blocked, so use `WScript.StdOut.WriteLine` or `console.log` .

### *Buffer*

Can handle buffers.

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```

### `__dirname` and `__filename`

`__filename` stores the path of the module file currently being executed. `__dirname` stores the `__filename` directory.

```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```

## built-in modules

*wes* has *built-in modules* to simplify and standardize basic processing.

### *ansi*

`ansi` has an *ANSI escape code* that allows you to change the colors and effects of standard output. Colors and effects may vary depending on the type and settings of the console application used.

```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```

You can also create your own color with `ansi.color()` or `ansi.bgColor()` . The argument uses *RGB* such as `255, 165, 0` or *color code* such as `'#FFA500'` . You cannot use *color name* such as `orange` .

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

### *argv*

Gets of command line arguments. `cscript.exe` command-line arguments of `/` declares named arguments in but, *wes* in `-` and `--` declare the named arguments in.

*argv.unnamed* and *argv.named* cast the value type of the command line argument to one of *String* *Number* *Boolean* .

Enter the command line arguments with *REPL* .

```shell
wes REPL aaa -bcd eee --fgh=iii jjj --kln mmm
```

Run the following script in *REPL* .

```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```

### *pathname*

Operate the path.

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

### *filesystem*

Operates files and directories. `readTextFileSync` will guess the file encoding and read it.

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```

### *JScript*

If you change the script engine to *Chakra* , you will not be able to use *JScript* specific *Enumerator* . The built-in module *JScript* makes them available. However, *Enumerator* returns an *Array* rather than an Enumerator object.

```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```

*GetObject* `WScript.GetObject` a replacement for `WScript.GetObject` .

```javascript
const { GetObject, Enumerator } = require('JScript')

const ServiceSet = GetObject("winmgmts:{impersonationLevel=impersonate}").InstancesOf("Win32_Service")
new Enumerator(ServiceSet).forEach(service => console.log(
    'Name: %O\nDescription: %O\n',
    service.Name,
    service.Description
))
```

### *VBScript*

*VBScript* offers some of the features that *JScript* does not have.

```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```

### *httprequest*

*httprequest* is as its name *http request* will issue a.

```javascript
const request = require('httprequest')
const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log('%O', JSON.parse(content))
```

### *minitest*

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

### *pipe*

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

### *typecheck*

Judge the type of script.

```javascript
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```

## Module bundle and install

*install* , you can install the module for *wes* published on *github* . To publish the module, you need the *github repository* . Also, the repository name and the local directory name must be the same.

### *bundle*

*github* publishing a module to *github* , *bundle* bundles the necessary modules and changes it into a format that can be included by the *install* module.

In consideration of safety, *wes* will not import the module that can be directly executed, so create *.json* file in *bundle* module.

There are some conditions for bundling modules.

1.  *repository* one module can be published in one *repository* .
2.  *github* repository name and local working directory name must be the same.
3.  The repository must be public if you want to publish the module to a third party.
4.  *wes* does not statically interpret the script. Modules that `require` under certain conditions such as `if` statements may not be bundled.
5.  *.json* file will be created in the working directory with the name *directory_name.json* . If you change the file name or move the file, you cannot install it.
6.  `node_modules/directory_name` , bundling fails because it references `directory_name.json` .

### *install*

It is used to install the module file for *wes* published on *github* .

## usage

Pass arguments to *install* in the format `@author/repository`

```shell
wes install @wachaon/fmt
```

*install* has options

| named      | short named | description                                        |
| ---------- | ----------- | -------------------------------------------------- |
| `--bare`   | `-b`        | do not create *@author* folder                     |
| `--global` | `-g`        | Install the module in the folder where *wes.js* is |

`--bare` option can omit the `require` argument from `author@repository` to `repository` . `--global` option makes the installed module available to all scripts. The above options must be used with the *wes* security option `--unsafe` or `--dangerous` .

```shell
wes install @wachaon/fmt --bare --unsafe
```

# Install private repository module

*install* can be installed in private repository as well as public repository module of *github* .

*install* , specify the module with `author@repository` . The implementation downloads the following.

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```

When you access the *raw* of the private repository with a browser, the *token* is displayed, so copy the *token* and use it.

If you execute it on the command line within the valid time of *token* , you can install the module of private repository.

```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

## External module

Here we introduce some external modules.

### *@wachaon/fmt*

*@wachaon/fmt* is a bundle of *prettier* that formats the script. In addition, *@wachaon/fmt* in a state that has been installed `SyntaxError` can present the error location when occurs.

#### install

```shell
wes install @wachaon/fmt
```

#### usage

If there is *.prettierrc* (JSON format) in the working directory, reflect it in the setting. *fmt* can be used with both *CLI* (command line interface) and *module* .

Use as *CLI*

```shell
wes @wachaon/fmt src/sample --write
```

| unnamed number | description                                       |
| -------------- | ------------------------------------------------- |
| 0              | -                                                 |
| 1              | Required. The path of the file you want to format |

| named     | short named | description       |
| --------- | ----------- | ----------------- |
| `--write` | `-w`        | Allow overwriting |

Overwrites the file with the formatted script if given a `--write` or `-w` named argument.

#### *module* using as a *module*

#### `option`

```javascript
{
    parser: 'babel',
    plugins: [babel]
}
```
