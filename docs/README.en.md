# *WES*

*wes* is a console framework for running *ECMAScript* on *WSH (Windows Script Host)* . The original [*japanese*](/README.md) of the *README* will be in Japanese. Texts other than Japanese will be machine translated.  
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

-   You can change the script engine to *Chakra* and write according to *ECMAScript2015* specifications.
-   Since 32bit *cscript.exe* is always executed, there is no unique problem in 64bit environment.
-   Since there is a module system, it can be developed more efficiently than the conventional *WSH*
-   Built-in modules support basic processing such as file input/output and colored text output to the console
-   You can let file reading automatically guess the encoding, so you don't have to worry about encoding etc.
-   Package modules to support external publishing and retrieval

# *wes* issues that we can't solve

-   `WScript.Quit` cannot abort the program and does not return an error code
-   Asynchronous processing does not work properly
-   You cannot use the *event prefix* of the second argument of `WScript.CreateObject`

# download

*wes.js* *wes* . To download, copy *wes.js* from [*@wachaon/wes*](https://github.com/wachaon/wes) or run the following command in console.

```bat
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

*WScript.Shell* *wes* `SendKeys` at runtime as an implementation. If the path of the directory where *wes.js* is saved contains characters other than *ascii* , `SendKeys` cannot send the key correctly and the script cannot be executed.  
Configure the path *wes.js* is stored in *ascii* only. If you have already downloaded *wes* , you can update it with the following command.

```bat
wes update
```

# Usage

Enter the `wes` keyword followed by the command specifying the file that will be the starting point of the program to the console. The script extension *.js* can be omitted.

```bat
wes index
```

Also, since *wes* is equipped with *REP* , you can enter scripts directly by starting `wes` alone.

```bat
wes
```

*REP* accepts script input until you enter two blank lines. You can also see *REP* running the sample scripts in *README.md* .

## command line options

*wes* startup options are as follows.

| named              | Description                                   |
| ------------------ | --------------------------------------------- |
| `--monotone`       | Eliminates *ANSI escape code*                 |
| `--debug`          | run the script in debug mode                  |
| `--encoding=UTF-8` | Specifies the encoding of the first file read |
| `--engine=Chakra`  | This option is added automatically by *wes*   |

# module system

*wes* supports two module systems, the *commonjs module* system using `require()` and the *es module* system using `import` . ( *dynamic import* is not supported because it is an asynchronous process)

## *commonjs module*

Manage modules by assigning to `module.exports` and calling `require()` . Paths other than absolute paths and relative paths starting with `./` and `../` look for modules in the *wes_modules* directory and conveniently the *node_modules* directory. *wes* 's `require()` automatically guesses the encoding of the module file, but you can specify the encoding with the second argument if it doesn't guess correctly.

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

Also, it is possible to import with *require* for *COM Object* like `require('WScript.Shell')` .

```javascript
const Shell = require('Shell.Application')
Shell.MinimizeAll()
WScript.Sleep(2000)
Shell.UndoMinimizeAll()
```

## *es module*

*Chakra* , which is a script execution engine, interprets syntax such as `imoprt` , but it cannot be executed as it is because the processing method as `cscript` is not defined. In *wes* , by adding *babel* to the built-in modules, *es module* are also executed while being sequentially transpiled. This costs us processing overhead and a bloated *wes.js* file. Modules written in *es module* are also converted to `require()` by transpiling, so it is possible to call *COM Object* . However, it does not support specifying the encoding of the module file with *es module* . Everything is loaded automatically. To load it as an *es module* , set the extension to `.mjs` or set the `"type"` field in `package.json` to `"module"` .

```javascript
// ./sub.mjs
export default function sub (a, b) {
    return a - b
}
```

```javascript
// ./main2.js
import sub from './sub.mjs'
console.log('sub(7, 3) // => %O', sub(7, 3))
```

# built-in object

*wes* has *built-in objects* not found in *WSH (JScript)* .

## *console*

`WScript.Echo` uses *console* instead of *wes* and `WScript.StdErr.WriteLine` . Output characters to the console with `console.log` . It also supports formatted strings. Outputs a formatted string using the `%` formatting operator.

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

| Format specifier | Description                      |
| ---------------- | -------------------------------- |
| `%s`             | `String(value)`                  |
| `%S`             | `String(value)`                  |
| `%c`             | `String(value)`                  |
| `%C`             | `String(value)`                  |
| `%d`             | `parseInt(value, 10)`            |
| `%D`             | `parseInt(value, 10)`            |
| `%f`             | `Number(value)`                  |
| `%F`             | `Number(value)`                  |
| `%j`             | `JSON.stringify(value)`          |
| `%J`             | `JSON.stringify(value, null, 2)` |
| `%o`             | object dump                      |
| `%O`             | Object dump (indented/colorful)  |

`WScript.StdOut.WriteLine` *wes* of `WScript.StdErr.WriteLine` to output colored strings. `WScript.Echo` and `WScript.StdOut.WriteLine` are blocked output. `WScript.StdErr.WriteLine` or `console.log` .

## *Buffer*

You can handle buffers.

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```

## `__dirname` and `__filename`

`__filename` stores the path of the currently executing module file. `__dirname` contains the directory of `__filename` .

```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```

## *setTimeout* *setInterval* *setImmediate* *Promise*

Since *wes* is an execution environment for synchronous processing, *setTimeout* *setInterval* *setImmediate* *Promise* does not function as asynchronous processing, but it is implemented to support modules that assume *Promise* implementation.

```javascript
const example = () => {
  const promise = new Promise((resolve, reject) => {
    console.log('promise')

    setTimeout(() => {
      console.log('setTimeout') 
      resolve('resolved');
    }, 2000);
  }).then((val) => {
    console.log(val)
  });
  console.log('sub')
};

console.log('start')
example();
console.log('end')
```

# Built-in module

*wes* has *built-in modules* to simplify and standardize basic processing.

## *ansi*

`ansi` is *ANSI escape code* that can change standard output colors and effects. Colors and effects may differ depending on the type and settings of the console application used.

```javascript
const { redBright, yellow } = require('ansi')
const message = 'File does not exist'
console.log(redBright + 'Error: ' + yellow + message)
```

You can also create your own colors with `ansi.color()` and `ansi.bgColor()` . Arguments use *RGB* such as `255, 165, 0` and *color code* such as `'#FFA500'` . *color name* such as `orange` are not supported.

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

## *argv*

Get command line arguments. `cscript.exe` 's command line arguments declare named arguments with `/` , while *wes* declares named arguments with `-` and `--` . *argv.unnamed* and *argv.named* the command line argument value type to either *String* *Number* *Boolean* . Enter command line arguments with *REP* .

```bat
wes REP aaa -bcd eee --fgh=iii jjj --kln mmm
```

Run the following script on *REP* .

```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```

## *pathname*

Manipulate paths. Paths starting with `/` and `\` are generally relative to the drive root. For example `/filename` and `C:/filename` can be the same path. For security reasons, `wes` interprets paths starting with `/` and `\` relative to the working directory.

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

## *filesystem*

Manipulate files and directories. `readTextFileSync` automatically guesses the encoding of the file and reads it.

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```

## *chardet*

I am using some features from <https://github.com/runk/node-chardet> . You can increase the accuracy of auto-guessing by increasing encoding-specific characters.

## *JScript*

If you change the script engine to *Chakra* , you won't be able to use *JScript* -specific *Enumerator* , etc. The built-in module *JScript* makes them available. However, *Enumerator* returns an *Array* , not an *Enumerator object* .

```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```

*GetObject* works as an alternative to `WScript.GetObject` .

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

*VBScript* offers some features that *JScript* does not.

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

*minitest* can write simple tests. From version `0.10.71` , we went back to the basic concept and reduced the types of assertions to 3 types.

### Usage

Group with `describe` , test with `it` , and verify with `assert` . `pass` will be an array of the number of occurrences of `it` and the number of passes.

```javascript
const { describe, it, assert, pass } = require('minitest')
describe('minitest', () => {
    describe('add', () => {
        const add = (a, b) => a + b
        it('2 plus 3 is 5', () => {
            assert.equal(5, add(2, 3))
        })
        it('0 plus 0 is 0', () => {
            assert(0 === add(0, 0))
        })
        it('"4" plus "5" is 9', () => {
            assert.equal(9, add("4", "5"))
        })
        it('NaN plus 3 is NaN', () => {
            assert.equal(NaN, add(NaN, 3))
        })
    })
    describe('sub', () => {
        it('5 minus 4 is 1', () => {
            const sub = (a, b) => a - b
            assert.equal(1, sub(5, 4))
        })
    })
})
console.log('tests: %O passed: %O, failed: %O', pass[0], pass[1], pass[0] - pass[1])
```

### assertion

#### `assert(value, message)` `assert.ok(value, message)`

Compare to `true` with the strict equality operator `===` . If `value` is a function, evaluate the result of executing the function.

| Param     | Type                  | Description                           |
| :-------- | :-------------------- | :------------------------------------ |
| `value`   | `{Function\|Boolean}` | boolean or boolean-returning function |
| `message` | `{String}`            | message in case of failure            |

#### `assert.equal(expected, actual)`

Compares objects for member equality, not by reference.  
NaN `true` `NaN === NaN` `function (){} === function (){}` `/RegExp/g === /RegExp/g` or `{one: {two: 2}} === {one: {two: 2}}` `[1,2,3] === [1,2,3]` etc.  
When comparing classes (objects), they must have the same constructor or a superclass whose `actual` is `expected` .

| Param      | Type    | Description    |
| :--------- | :------ | :------------- |
| `expected` | `{Any}` | expected value |
| `actual`   | `{Any}` | Actual value   |

#### `assert.throws(value, expected, message)`

Verify that the error is being thrown correctly.  
Whether or not the error is correct is determined by whether the expected error *constructor* , *message* is equal, and the regular expression passes *stack* evaluation.

| Param      | Type                      | Description                                                                                   |
| :--------- | :------------------------ | :-------------------------------------------------------------------------------------------- |
| `value`    | `{Error}`                 | error                                                                                         |
| `expected` | `{Error\|String\|RegExp}` | A regular expression that evaluates the expected error *constructor* , *message* , or *stack* |
| `message`  | `{String}`                | message in case of failure                                                                    |

## *pipe*

*pipe* simplifies piping.

### Usage

```javascript
const pipe = require('pipe')
function add (a, b) {
    return b + a
}
function sub (a, b) {
    return b - a
}
function div (a, b) {
    return a / b
}
const add5 = add.bind(null, 5)
const sub3 = sub.bind(null, 3)
pipe()
  .use(add5)
  .use(sub3)
  .use(div, 4)
  .process(10, (err, res) => console.log('res: %O', res))
```

## *typecheck*

Determine the script type.

### Usage

```javascript
const { isString, isNumber, isBoolean, isObject } = require('typecheck')
const log = require('log')
log(() => isString("ECMAScript"))
log(() => isNumber(43.5))
log(() => isBoolean(false))
log(() => isObject(function(){}))
```

## *animate*

*animate* helps animate the display of the console.

### Usage

If the processing takes a long time, it would be nice to display the progress as an animation on the console.

```javascript
const Animate = require('animate')
const animate = new Animate
const size = 23
let counter = 0

const progress = Animate.genProgressIndicator([
    '|----------|----------|',
    '|*---------|----------|',
    '|**--------|----------|',
    '|***-------|----------|',
    '|****------|----------|',
    '|*****-----|----------|',
    '|******----|----------|',
    '|*******---|----------|',
    '|********--|----------|',
    '|*********-|----------|',
    '|**********|----------|',
    '|**********|*---------|',
    '|**********|**--------|',
    '|**********|***-------|',
    '|**********|****------|',
    '|**********|*****-----|',
    '|**********|******----|',
    '|**********|*******---|',
    '|**********|********--|',
    '|**********|*********-|',
    '|**********|**********|',
])

const indigator = Animate.genProgressIndicator(['   ', '.  ', '.. ', '...'])

animate.register(() => {
    let prog = counter / size
    if (prog >= 1) {
        prog = 1
        animate.stop()
    }

    animate.view = console.format(
        '%S %S %S',
        progress(Math.ceil(prog * 20)),
        ('  ' + Math.ceil(prog * 100) + '%').slice(-4),
        prog < 1 ? 'loading' + indigator(counter) : 'finished!'
    )
    counter++
}, 100, Number.MAX_VALUE)
animate.run()
```

### `constructor(complete)`

Execute the `complete` function when all queues are completed or `stop()` is called.

#### `static genProgressIndicator(animation)`

Generate a function that displays a cycling animation.

#### `register(callback, interval, conditional)`

Register processing. Multiple processes can be registered and processed in parallel. In the `callback` , we will instruct to stop the animation and write the view to be displayed. `interval` specifies the processing interval. If the `conditional` is a function, it will execute `conditional(count, queue)` and if the result is true, it will continue. The `conditional` executes `decrement(count)` if it is a number and continues if the result is a positive number. Executes only once if `conditional` is undefined. Note that specifying a function increases the `count` , whereas specifying a number decreases the `count` .

#### `stop()`

*animate* .

#### `cancel(queue)`

Suspends processing of a specific queue.

#### `run()`

Start animation.

#### `view`

Specifies the characters that are printed to the console. Switch characters at regular intervals. Assign either *Arrary* or *String* to `view` . A *String* is useful when updating a single animation, and an *Array* is useful when animating multiple rows individually.

```javascript
const Animate = require('/lib/animate')
const animate = new Animate(
    () => console.log('All Finished!!')
)

const progress = Animate.genProgressIndicator([
    '|----------|----------|',
    '|*---------|----------|',
    '|**--------|----------|',
    '|***-------|----------|',
    '|****------|----------|',
    '|*****-----|----------|',
    '|******----|----------|',
    '|*******---|----------|',
    '|********--|----------|',
    '|*********-|----------|',
    '|**********|----------|',
    '|**********|*---------|',
    '|**********|**--------|',
    '|**********|***-------|',
    '|**********|****------|',
    '|**********|*****-----|',
    '|**********|******----|',
    '|**********|*******---|',
    '|**********|********--|',
    '|**********|*********-|',
    '|**********|**********|',
])

const indigator = Animate.genProgressIndicator(['   ', '.  ', '.. ', '...'])

const state = {
    one: null,
    two: null,
    three: null
}

function upload(name, size, row) {
    let counter = 0
    return () => {
        let prog = counter / size
        if (prog >= 1) {
            prog = 1
            animate.cancel(state[name])
        }

        animate.view[row] = console.format(
            '%S %S %S',
            progress(Math.ceil(prog * 20)),
            ('  ' + Math.ceil(prog * 100) + '%').slice(-4),
            prog < 1 ? name + ' loading' + indigator(counter) : name + ' finished! '
        )
        counter++
    }
}

state.one = animate.register(upload('one', 63, 0), 50, Number.MAX_VALUE)
state.two = animate.register(upload('two', 49, 1), 60, Number.MAX_VALUE)
state.three = animate.register(upload('three', 109, 2), 40, Number.MAX_VALUE)
animate.run()
```

## *getMember*

Get member type and description of *COM Object* from *ProgID* .

### Usage

```javascript
const getMember = require('getMember')
const FileSystemObject = 'Scripting.FileSystemObject'
console.log('require("%S") // => %O', FileSystemObject, getMember(FileSystemObject))
```

## *zip*

Compresses files and folders and decompresses compressed files. Internally, *PowerShell* is called and processed.

### Usage

```javascript
const {zip, unzip} = require('zip')
console.log(zip('docs\\*', 'dox.zip'))
console.log(unzip('dox.zip'))
```

A wildcard `*` can be written in the `path` of `zip(path, destinationPath)` . It can be used in both *CLI (Command Line Interface)* and *module* .

```bat
wes zip docs\* dox.zip
wes zip -p dox.zip
```

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

    ```json
    {
        "main": "index.js"
    }
    ```

3.  Make the repository *public* if you want to publish the package

4.  Starting with `version 0.12.0` , packages with direct module loading into a directory above the working directory will not be bundled. Packages in the upper directory *wes_modules* or *node_modules* can be bundled.

Enter the following command to bundle: Refer to *package.json* for what to bundle.

```bat
    wes bundle 
```

## *install*

Used to install the package for *wes* published on *github* . From `version 0.10.28` , the installation folder is changed from `node_modules` to `wes_modules` . If you want to install in `node_modules` add `--node` option. Starting with `version 0.12.0` , files will be unzipped from *bandle.json* and saved. Due to specification changes, packages bundled with `version 0.12.0` less than 0.12.0 may not be installed correctly with `version 0.12.0` or later.

### Usage

Pass arguments to *install* in the form `@author/repository` .

```bat
wes install @wachaon/fmt
```

*install* has options.

| named         | short named | Description                                                               |
| ------------- | ----------- | ------------------------------------------------------------------------- |
| `--bare`      | `-b`        | Do not create *@author* folders                                           |
| `--global`    | `-g`        | Install the package in the folder where *wes.js* is                       |
| `--save`      | `-S`        | Add package name and version to *dependencies* field in *package.json*    |
| `--save--dev` | `-D`        | Add package name and version to *devDependencies* field in *package.json* |
| `--node`      | `-n`        | Install in *node_module* folder                                           |

`--bare` option can omit the `require` argument from `author@repository` to `repository` . `--global` option makes installed packages available to all scripts.

```bat
wes install @wachaon/fmt --bare
```

# Installing packages from private repositories

*install* can install not only packages from public *github* repositories, but also packages from private repositories. In *install* , specify the package with *@author/repository* . The implementation tries to download the following url.

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/bundle.json`
```

If you access the private repository *raw* with a browser, the *token* will be displayed, so copy the *token* and use it. You can also install packages from private repositories by running it in the console while the *token* is valid.

```bat
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

# Package introduction

Here are some external packages.

## *@wachaon/fmt*

*@wachaon/fmt* is *prettier* packaged for *wes* to format scripts. Also, if a *Syntax Error* occurs while *@wachaon/fmt* is installed, the location of the error can be shown.

### install

```bat
wes install @wachaon/fmt
```

### Usage

If there is *.prettierrc* (JSON format) in the working directory, it will be reflected in the settings. *fmt* is available in both *CLI* and *module* .

#### Use as *CLI* .

```bat
wes @wachaon/fmt src/sample --write
```

| unnamed number | Description                                       |
| -------------- | ------------------------------------------------- |
| 1              | Required. the path of the file you want to format |

| named     | short named | Description     |
| --------- | ----------- | --------------- |
| `--write` | `-w`        | allow overwrite |

Overwrite the file with the formatted script if `--write` or the `-w` named argument is specified.

#### use as a module

```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')
const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```
