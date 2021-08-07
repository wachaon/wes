# _WES_

_wes_ is a framework for executing _ECMAScript_ on _Windows Script Host_

The original text of the _README_ is [_japanese_](README.ja.md) . Other than Japanese, it is a machine-translated sentence.  
Please select sentences in other languages ​​from the following.

## Features

-   Change the script engine to _Chakra_ and run _ECMAScript2015_ _Chakra_
-   _cscript.exe_ 32bit _cscript.exe_ and does not have any bugs specific to 64bit environment
-   Import the module with `require`
-   Outputs colored characters to standard output
-   Automatically guess the file encoding

## Features not resolved

-   `WScript.Quit` cannot interrupt the program and does not return an error code
-   Asynchronous processing
-   Utilization of _event prefix_ of the second argument of `WScript.CreateObject`

## Install

_wes_ need is _wes.js_ only file. To download, start a command prompt and enter the following command.

```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

_wes_ at the time of execution as the implementation _WScript.Shell_ of `SendKeys` use. _wes.js_ the path of the directory where _wes.js_ is saved contains characters other than _ascii_ , `SendKeys` will not be able to send the key correctly and the script will not be able to be executed.  
Please configure the save destination path of _wes.js_ only _ascii_ .

## Usage

On the command line, specify the file that will be the starting point of the program after `wes` . The script extension _.js_ can be omitted.

```shell
wes index
```

Also, _wes_ has a _REPL_ so if you start it only with `wes` , you can enter the script directly.

```shell
wes
```

The script will be accepted until you enter two blank lines. _README.md_ can also check the execution of the sample script in _README.md_ with _REPL_ .

## command-line named arguments

The startup options for _wes_ are as follows.

| named              | description                                      |
| ------------------ | ------------------------------------------------ |
| `--monotone`       | Eliminate _ANSI escape code_                     |
| `--safe`           | Run the script in safe mode                      |
| `--usual`          | Run the script in normal mode (default)          |
| `--unsafe`         | Run the script in unsafe mode                    |
| `--dangerous`      | Run the script in dangerous mode                 |
| `--debug`          | Run the script in debug mode                     |
| `--encoding=UTF-8` | Specifies the encoding of the first file to read |
| `--engine=Chakra`  | This option is automatically added by _wes_      |

The implementation of `--safe` `--usual` `--unsafe` `--dangerous` is incomplete, but named arguments are reserved.

## built-in objects

_wes_ has _built-in objects_ that _WSH (JScript)_ doesn't have.

### _require_

Import the module with _require_ . _wes_ automatically guesses the encoding of the module file, but if you don't guess correctly, you can specify the encoding with the second argument.

In addition, `require('WScript.Shell')` as of _OLE_ even to _require_ import is possible with.

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

If you want to define it as a module, assign it to `module.exports` .

```javascript
function add (a, b) {
    return a + b
}

module.exports = add
```

### _console_

_wes_ uses _console_ instead of `WScript.Echo` and `WScript.StdErr.WriteLine` .

Print characters to the command line in `console.log` . It also supports formatted strings. Prints a formatted string using the formatting operator `%` .

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

_wes_ in order to output a string colored in `WScript.StdOut.WriteLine` instead, `WScript.StdErr.WriteLine` use. `WScript.Echo` and `WScript.StdOut.WriteLine` are blocked from output, so use `WScript.StdOut.WriteLine` or `console.log` .

### _Buffer_

Can handle buffers.

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```

### `__dirname` and `__filename`

`__filename` contains the path of the currently running module file. `__dirname` `__filename` the directory of `__filename` .

```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```

## built-in modules

_wes_ has _built-in modules_ to simplify and standardize basic processing.

### _ansi_

`ansi` has an _ANSI escape code_ that allows you to change the color and effect of standard output. Colors and effects may vary depending on the type and settings of the console application used.

```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```

You can also create your own colors with `ansi.color()` and `ansi.bgColor()` . The argument uses _RGB_ such as `255, 165, 0` or _color code_ such as `'#FFA500'` . You cannot use a _color name_ such as `orange` .

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

### _argv_

Gets the command line argument. `cscript.exe` command-line arguments of `/` declares named arguments in but, _wes_ in `-` and `--` declare the named arguments in.

_argv.unnamed_ and _argv.named_ cast the value type of the command line argument to one of the _String_ _Number_ _Boolean_ .

Enter the command line arguments along with the _REPL_ .

```shell
wes REPL aaa -bcd eee --fgh=iii jjj --kln mmm
```

Run the following script in the _REPL_ .

```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```

### _pathname_

Operate the path.

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

### _filesystem_

Manipulate files and directories. `readTextFileSync` automatically guesses the file encoding and reads it.

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```

### _JScript_

If you change the script engine to _Chakra_ , you will not be able to use _JScript_ specific _Enumerator_ etc. The built-in module _JScript_ makes them available. However, _Enumerator_ returns an _Array_ instead of an Enumerator object.

```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```

_GetObject_ `WScript.GetObject` as an alternative to `WScript.GetObject` .

```javascript
const { GetObject, Enumerator } = require('JScript')

const ServiceSet = GetObject("winmgmts:{impersonationLevel=impersonate}").InstancesOf("Win32_Service")
new Enumerator(ServiceSet).forEach(service => console.log(
    'Name: %O\nDescription: %O\n',
    service.Name,
    service.Description
))
```

### _VBScript_

_VBScript_ offers some features that _JScript_ doesn't have.

```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```

### _httprequest_

_httprequest_ issues _http request_ as its name suggests.

```javascript
const request = require('httprequest')
const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log('%O', JSON.parse(content))
```

### _minitest_

_minitest_ can write simple tests.

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

### _pipe_

_pipe_ simplifies pipe processing

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

### _typecheck_

Determine the type of the script.

```javascript
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```

## Module bundle and install

_install_ , you can install the module for _wes_ published on _github_ . You will need the _github repository_ to publish the module. Also, the repository name and the local directory name must be the same.

### _bundle_

_github_ publishing a module to _github_ , _bundle_ bundles the required module and changes it to a format that can be imported by the _install_ module.

For safety reasons, _wes_ does not import modules in a format that can be executed directly, so create a _.json_ file with the _bundle_ module.

There are some conditions for bundling modules.

1.  _repository_ one type of module can be published in one _repository_ .
2.  _github_ repository name and the local working directory name must be the same.
3.  The repository must be public if you want to publish the module to a third party.
4.  _wes_ does not statically interpret the script. Modules that `require` under certain conditions, such as `if` statements, may not be bundled.
5.  _.json_ file will be created in your working directory with the name _directory_name.json_ . If you rename the file or move the file, you cannot install it.
6.  `node_modules/directory_name` bundling fails because it references `directory_name.json` .

### _install_

It is used to install the module file for _wes_ published on _github_ .

## usage

Pass arguments to _install_ in the format `@author/repository`

```shell
wes install @wachaon/fmt
```

_install_ has options

| named      | short named | description                                        |
| ---------- | ----------- | -------------------------------------------------- |
| `--bare`   | `-b`        | Do not create _@author_ folder                     |
| `--global` | `-g`        | Install the module in the folder where _wes.js_ is |

`--bare` option can omit the `require` argument from `author@repository` to `repository` . `--global` option makes the installed modules available to all scripts. The above options must be specified at the same time as the _wes_ security option `--unsafe` or `--dangerous` .

```shell
wes install @wachaon/fmt --bare --unsafe
```

# Install the module of private repository

_install_ can be installed not only on _github_ public repository modules, but also on private repositories.

_install_ , specify the module with `author@repository` . The implementation downloads the following.

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```

When you access the _raw_ of the private repository with a browser, the _token_ will be displayed, so copy the _token_ and use it.

You can also install the module in the private repository by running it on the command line within the _token_ 's _token_ .

```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

## External module

Here are some external modules.

### _@wachaon/fmt_

_@wachaon/fmt_ is a bundle of _prettier_ that formats the script. Also, if a `SyntaxError` occurs with _@wachaon/fmt_ installed, you can indicate the error location.

#### install

```shell
wes install @wachaon/fmt
```

#### usage

If there is _.prettierrc_ (JSON format) in the working directory, it will be reflected in the settings. _fmt_ can be used with both _CLI_ (command line interface) and _module_ in _fmt_ .

Use as _CLI_

```shell
wes @wachaon/fmt src/sample --write
```

| unnamed number | description                                       |
| -------------- | ------------------------------------------------- |
| 0              | ---                                               |
| 1              | Required. The path of the file you want to format |

| named     | short named | description       |
| --------- | ----------- | ----------------- |
| `--write` | `-w`        | Allow overwriting |

Overwrites the file with a formatted script if a named argument of `--write` or `-w` is specified.

#### _module_ using as a _module_

#### `option`

```javascript
{
    parser: 'babel',
    plugins: [babel]
}
```
