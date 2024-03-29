# *WES*

*wes* is a console framework for running *ECMAScript* on *WSH (Windows Script Host)* . The original text of *README* will be in [*japanese*](/README.md) . Texts other than Japanese will be machine translated.\
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

*   You can change the script engine to *Chakra* and write according to *ECMAScript2015+* specifications.
*   Always uses 32-bit *cscript.exe* , so no unique 64-bit problems
*   Module system available for more efficient development than traditional *WSH*
*   Built-in modules support basic processing such as file input/output and colored text output to the console
*   You don't have to worry about encoding etc. as it can automatically infer the encoding when reading the file
*   It is also possible to package the module and publish it externally or obtain it.
*   Display error details more kindly than *WSH*

# Known issues that *wes* can't solve

*   `WScript.Quit` cannot abort the program and does not return an error code
*   Asynchronous processing does not work properly
*   You cannot use *event prefix* of the second argument of `WScript.CreateObject`

# download

*wes* only needs the *wes.js* file. To download, copy *wes.js* from [*@wachaon/wes*](https://github.com/wachaon/wes) or run the following command in console.

```bat
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

*wes* adopts an implementation that uses *WScript.Shell* 's `SendKeys` at runtime. If the path of the directory where *wes.js* is stored contains non-ASCII characters, `SendKeys` will not be able to send the keys correctly and the script will not run. Therefore, make sure that the path where you store *wes.js* consists only of ASCII characters. Alternatively, if you have already downloaded *wes.js* , you can update it using the command below.

```bat
wes update
```

# how to start *wes*

Enter `wes` keyword and the command specifying the file that will be the starting point of the program to the console. The script extension *.js* can be omitted.

```bat
wes index
```

*wes* can directly input and execute scripts on the console. If you start it with `wes` only, you can directly enter and execute the script.

```bat
wes
```

*REP* accepts script input until you enter two blank lines. You can also see *REP* running the example script in *README.md* .

## command line options

*wes* startup options are as follows.

| named              | Description                                    |
| ------------------ | ---------------------------------------------- |
| `--monotone`       | Eliminates *ANSI escape code*                  |
| `--transpile`      | Always convert and run with *babel-standalone* |
| `--debug`          | run the script in debug mode                   |
| `--encoding=UTF-8` | Specifies the encoding of the first file read  |
| `--arch=x86`       | This option is added automatically by *wes*    |

# module system

*wes* supports two module systems, *commonjs module* system using `require()` and *es module* system using `import` . ( *dynamic import* is not supported because it is an asynchronous process)

## *commonjs module*

Manage modules by assigning to `module.exports` and calling `require()` . Paths other than absolute paths and relative paths starting with `./` and `../` look for modules in *wes\_modules* directory and conveniently *node\_modules* directory. *wes* 's `require()` automatically guesses the encoding of the module file, but you can specify the encoding with the second argument if it doesn't guess correctly.

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

*Chakra* , the script execution engine, interprets syntax such as `imoprt` , but it is not executed in *cscript* environment. In *wes* by adding *babel* to the built-in modules, *es module* are also executed while being transpiled one by one. This comes at a cost of processing overhead and a bloated *wes.js* file. Modules written in *es module* are also converted to `require()` by transpiling, so it is possible to call *COM Object* . However, it does not support specifying the encoding of the module file with *es module* . Everything is loaded automatically. To load it as *es module* , set the extension to `.mjs` or set the `"type"` field in `package.json` to `"module"` .

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

*wes* use *console* instead of `WScript.Echo()` and `WScript.StdErr.WriteLine()` .

### *console.log*

Output characters to the console with `console.log()` . It also supports formatted strings. Outputs a formatted string using the `%` formatting operator. (Formatting operators are also valid for other methods.)

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

*wes* uses `WScript.StdOut.WriteLine` instead of `WScript.StdErr.WriteLine` to output colored strings. `WScript.Echo` and `WScript.StdOut.WriteLine` are blocked. Use `WScript.StdErr.WriteLine` or `console.log` .

### *console.print*

`console.log()` normally includes a newline at the end, but `console.print` does not.

### *console.debug*

Output to the console only if `--debug` option is enabled.

### *console.error*

Throw an exception with the content as the message.

### *console.weaklog*

Strings printed with `console.weaklog()` disappear from the console if there is any subsequent output. Useful for switching outputs.

## *Buffer*

You can handle buffers.

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log('%s %O', content, buff)
```

## `__dirname` and `__filename`

`__filename` stores the path of the currently executing module file. `__dirname` contains the directory of `__filename` .

```javascript
const message = `dirname: ${__dirname}\nfilename: ${ __filename}`
console.log(message)
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

## Built-in modules to be removed

Change some built-in modules to external modules to make the file lighter and easier to maintain.

*   *animate.js*
*   *day.js*
*   *debug.js*
*   *log.js*

The above modules can be installed as `@wachaon/animate` `@wachaon/day` `@wachaon/debug` `@wachaon/log` respectively.

## *ansi*

`ansi` is *ANSI escape code* that can change standard output colors and effects. Colors and effects may differ depending on the type and settings of the console application used.

```javascript
const { redBright, yellow } = require('ansi')
const message = 'File does not exist'
console.log(redBright + 'Error: ' + yellow + message)
```

You can also create your own colors with `ansi.color()` and `ansi.bgColor()` . Arguments use *RGB* such as `255, 165, 0` *color code* such as `'#FFA500'` . *color name* such as `orange` are not supported.

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

## *argv*

Get command line arguments. `cscript.exe` 's command line arguments declare named arguments with `/` , while *wes* declares named arguments with `-` and `--` . *argv.unnamed* and *argv.named* cast the command line argument value type to either *String* *Number* *Boolean* . Enter command line arguments with *REP* .

```bat
wes REP aaa -bc dd --e=false --gh=iii jjj --klm nn -o --p 9 r
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

Manipulate paths. Paths starting with `/` and `\` are generally relative to the drive root. For example `/filename` and `C:/filename` can be the same path. For security reasons, *wes* interprets paths starting with `/` and `\` relative to the working directory.

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

## *filesystem*

Manipulate files and directories. `readTextFileSync()` automatically guesses the encoding of the file and reads it. (Even if the second `encode` of `readFileSync()` is set to `auto` , it will be guessed automatically.)

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
// const contents = fs.readFileSync(readme, 'auto')
console.log(contents)
```

## *chardet*

I am using some features from <https://github.com/runk/node-chardet> . You can increase the accuracy of auto-guessing by increasing encoding-specific characters.

## *JScript*

If you change the script engine to *Chakra* , you won't be able to use *JScript* specific *Enumerator* , etc. The built-in module *JScript* makes them available. However, *Enumerator* returns *Array* , not *Enumerator object* .

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

```javascript {"testing": true, "message": "Typename"}
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(() => TypeName(FSO)) // => "FileSystemObject"
```

## *httprequest*

*httprequest* issues *http request* .

```javascript {"testing": true, "message": "httprequest"}
const request = require('httprequest')
const { responseText } = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log(() => JSON.parse(responseText)) /* => {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
            "lat": "-37.3159",
            "lng": "81.1496"
        }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
    }
} */
```

## *minitest*

*minitest* can write simple tests. From version `0.10.71` , we went back to the basic concept and reduced the types of assertions to 3 types.

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

### assertions

There are only three assertion functions for comparing objects for simplicity.

#### `assert(value, message)` `assert.ok(value, message)`

Compare to `true` with the strict equality operator `===` . If `value` is a function, evaluate the result of executing the function.

| Param     | Type                  | Description                           |
| :-------- | :-------------------- | :------------------------------------ |
| `value`   | `{Function\|Boolean}` | boolean or boolean-returning function |
| `message` | `{String}`            | message in case of failure            |

#### `assert.equal(expected, actual)`

Compares objects for member equality, not by reference.\
`NaN === NaN` `function (){} === function (){}` `true` `/RegExp/g === /RegExp/g` or `{one: {two: 2}} === {one: {two: 2}}` `[1,2,3] === [1,2,3]` etc.\
When comparing classes (objects), they must have the same constructor or a superclass whose `actual` is `expected` .

| Param      | Type    | Description    |
| :--------- | :------ | :------------- |
| `expected` | `{Any}` | expected value |
| `actual`   | `{Any}` | Actual value   |

#### `assert.throws(value, expected, message)`

Verify that the error is being thrown correctly.\
Whether or not the error is correct is determined by whether the expected error *constructor* , *message* is equal, and the regular expression passes *stack* evaluation.

| Param      | Type                      | Description                                                                                   |
| :--------- | :------------------------ | :-------------------------------------------------------------------------------------------- |
| `value`    | `{Error}`                 | error                                                                                         |
| `expected` | `{Error\|String\|RegExp}` | A regular expression that evaluates the expected error *constructor* , *message* , or *stack* |
| `message`  | `{String}`                | message in case of failure                                                                    |

## *match*

*match* is a module that determines whether a file path matches a specific pattern. You can use wildcards (wildcards are special characters such as `*` and `?` ) in file names and paths to search for files that match specific criteria.

| Param     | Type       | Description |
| :-------- | :--------- | :---------- |
| `pattern` | `{String}` | pattern     |
| `matcher` | `{Any}`    | Target path |

```javascript {"testing": true, "message": "match"}
const match = require('match')

console.log(() => match('path/to/*.js', 'path/to/url.js')) // => true
console.log(() => match('path/**/index.*', 'path/to/url/index.json')) // => true
console.log(() => match('path/to/*.?s', 'path/to/script.cs')) // => true
```

### *match.search*

*match.search* finds paths that match a pattern from existing paths.

| Param     | Type       | Description              |
| :-------- | :--------- | :----------------------- |
| `pattern` | `{String}` | pattern                  |
| `matcher` | `{Any}`    | Directory path to search |

```javascript
const { search } = require('match')

console.log(() => search('**/LICENSE', process.cwd()))
```

## *pipe*

*pipe* simplifies piping. Output the result while converting *data* with one or multiple *converter* . From *ver 0.12.75* onwards, it can be started directly from the command line.

### Start *pipe* as a module

Put the conversion function in `use(converter)` argument of the *pipe* method and describe the data input and post-conversion processing with `process(data, callback(error, result))` . If no `callback` is specified, the return value will be *promise* , and processing can be connected with `then(result)` and `catch(error)` .

```javascript {"testing": true, "message": "pipe"}
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
  .process(10, (err, res) => {
    console.log(() => res) // => 3
  })
```

In addition to `use(converter)` , there are methods such as `.filter(callbackFn(value, index))` and `map(callbackFn(value, index))` . Each *data* is a string, an array, and an object.

```javascript {"testing": true, "message": "utility methods for pipes"}
const pipe = require('pipe')

const tsv = `
javascript\t1955
java\t1995
vbscript\t1996
c#\t2000
`.trim()

function include(value, i) {
    return value.includes('script')
}

function release(value, i) {
    return value.split('\t').join(' was released in ')
}

pipe()
    .filter(include)
    .map(release)
    .process(tsv)
    .then((res) => {
        console.log(() => res) /* => `javascript was released in 1955
vbscript was released in 1996` */
    })

```

### Starting *pipe* from the command line

From the command line, enter the conversion function in order after `pipe` . Arguments to conversion functions are entered as the values ​​of named command-line arguments with the same name as the conversion function. `=>` value `(` parsed with `eval()` instead of `JSON.parse()` `)` *WSH* forces out `"` in command line arguments. In that case, do not parse with `eval()` )

```bash
wes pipe swap merge --input="sample.txt" --output="" --swap="[2, 0, 1, 3]" --merge=4
```

This command is equivalent to the script:

```javascript
const pipe = require('pipe')
const { readFileSync, writeFileSync } = require('filesystem')
const { resolve } = require('pathname')

const data = readFileSync(resolve(process.cwd(), 'sample.txt'), 'auto')

pipe()
    .use(swap, 2, 0, 1, 3)
    .use(merge, 4)
    .process(data, (err, res) => {
        if (err) console.error(err)
        console.log(res)
    })
```

## *typecheck*

Determine the script type.

```javascript {"testing": true, "message": "typecheck"}
const { isString, isNumber, isBoolean, isObject } = require('typecheck')
console.log(() => isString("ECMAScript")) /* => true */
console.log(() => isNumber(43.5)) /* => true */
console.log(() => isBoolean(false)) /* => true */
console.log(() => isObject(function(){})) /* => false */
```

## *getMember*

Gets the *COM Object* member type and description from *ProgID* when used in the console.

```bat
wes getMember "Scripting.FileSystemObject"
```

When used as a module, it gets the type and description of the instance's members. When used as a module, you can get information about objects that cannot be confirmed from *WSH (Windows Script Host)* .

```javascript
const getMember = require('getMember')
const SWbemServicesEx = require("WbemScripting.SWbemLocator").ConnectServer()
getMember(SWbemServicesEx)
```

## *ps*

Facilitates running *PowerShell* .

### `ps(source, option)`

Run `source` *PowerShell* script.

Display a list of cmdlets in the console.

```javascript
const ps = require('ps')
 
console.log(ps("Get-Command"))
```

If there is a *Google Cherome* window, change the size and position of the window. (It doesn't work in full screen mode.)

```javascript
const ps = require('ps')

const code = `
$name = "chrome"
$w = 700
$h = 500
$x = 10
$y = 100

Add-Type @"
  using System;
  using System.Runtime.InteropServices;
  public class Win32Api {
    [DllImport("user32.dll")]
    [return: MarshalAs(UnmanagedType.Bool)]
    public static extern bool MoveWindow(IntPtr hWnd, int X, int Y, int nWidth, int nHeight, bool bRepaint);
  }
"@

Get-Process -Name $name | where { $_.MainWindowTitle -ne "" } | foreach {
    [Win32Api]::MoveWindow($_.MainWindowHandle, $x, $y, $w, $h, $true) | Out-Null
}
`

ps(code)
```

Controls mouse movement and clicks.

```javascript
const ps = require("ps")
const { unnamed } = require('argv')
const option = [
    unnamed[1],
    unnamed[2] || 0,
    unnamed[3] || 0
]

ps(`
$Method = $args[0]
$PosX = $args[1]
$PosY = $args[2]

$assemblies = @("System", "System.Runtime.InteropServices")

$Source = @"
using System;
using System.Runtime.InteropServices;

namespace Device {
    public class Mouse {
        public static void Main (params string[] args) {
            string method = args[0];
            int posX = args.Length > 1 ? Int32.Parse(args[1]) : 0;
            int posY = args.Length > 2 ? Int32.Parse(args[2]) : 0;

            if (method == "pos") {
                SetCursorPos(posX, posY);
            }

            if (method == "click") {
                mouse_event(0x2, posX, posY, 0, 0);
                mouse_event(0x4, 0, 0, 0, 0);
            }

            if (method == "leftDown") {
                mouse_event(0x2, posX, posY, 0, 0);
            }

            if (method == "leftUp") {
                mouse_event(0x4, posX, posY, 0, 0);
            }

            if (method == "rightClick") {
                mouse_event(0x8, posX, posY, 0, 0);
                mouse_event(0x10, 0, 0, 0, 0);
            }

            if (method == "rightDown") {
                mouse_event(0x8, posX, posY, 0, 0);
            }

            if (method == "righttUp") {
                mouse_event(0x10, posX, posY, 0, 0);
            }
        }

        [DllImport("USER32.dll", CallingConvention = CallingConvention.StdCall)]
        public static extern void SetCursorPos(int X, int Y);

        [DllImport("USER32.dll", CallingConvention = CallingConvention.StdCall)]
        public static extern void mouse_event(int dwFlags, int dx, int dy, int cButtons, int dwExtraInfo);
    }
}
"@

Add-Type -Language CSharp -TypeDefinition $Source -ReferencedAssemblies $assemblies

[Device.Mouse]::Main($Method, $PosX, $PosY)
`, option)
```

Save the script as a file or paste it into your next `REP` .

```bat
wes REP pos 100 100
```

### Run *powershell* directly from console

Executes the specified *.ps1* file in the console.

```bat
wes ps ./sample.ps1
```

You can also directly execute a command by specifying `--Command` or `-c` option.

Example of displaying a list of files in the current directory

```bat
wes ps --Command Get-ChildItem
```

## *zip*

Compresses files and folders and decompresses compressed files. Internally, *PowerShell* is called and processed.

```javascript
const {zip, unzip} = require('zip')
console.log(zip('docs\\*', 'dox.zip'))
console.log(unzip('dox.zip'))
```

A wildcard `*` can be written in `path` of `zip(path, destinationPath)` . It can be used in both *CLI (Command Line Interface)* and *module* .

```bat
wes zip docs\* dox.zip
wes zip -p dox.zip
```

If `path` has the extension `.zip` , `unzip()` is processed, and there is no description of the extension `.zip` . Alternatively, even if there is an extension `.zip` if there is a wildcard `*` description, `zip()` will be processed.

| unnamed | Description                  |
| ------- | ---------------------------- |
| `1`     | `path` or file to enter      |
| `2`     | folder file to output `dest` |

| named    | short named | Description                  |
| -------- | ----------- | ---------------------------- |
| `--path` | `-p`        | `path` or file to enter      |
| `--dest` | `-d`        | folder file to output `dest` |

# Bundling (packaging) and installing modules

In *wes* , a bundle of several modules is called a package. You can install the package for *wes* published on *github* . *github repository* is required to publish a package.

## *bundle*

When publishing a package to *github* , *bundle* bundles the required modules and creates *bundle.json* .

1.  Only one package can be published in one *repository*

2.  *package.json* is required. At a minimum, the description of `main` field is required.

    ```json
     { "main": "index.js" }
    ```

3.  Make the repository *public* if you want to publish the package

4.  Starting with `version 0.12.0` , packages with direct module loading into a directory above the working directory will not be bundled. Packages in the upper directory *wes\_modules* or *node\_modules* can be bundled.

Enter the following command to bundle: Refer to *package.json* for what to bundle.

```bat
wes bundle 
```

## *init*

Enter some items and it will create *package.json* from that information.

```bat
wes init
```

## *install*

Used to install the package for *wes* published on *github* . From `version 0.10.28` , the installation folder is changed from `node_modules` to `wes_modules` . If you want to install in `node_modules` add `--node` option. Starting with `version 0.12.0` , files will be unzipped from *bandle.json* and saved. Due to specification changes, packages bundled with `version 0.12.0` may not be installed correctly with `version 0.12.0` or later.

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
| `--node`      | `-n`        | Install in *node\_module* folder                                          |

The `--bare` option can omit `require` argument from `@author/repository` to `repository` . `--global` option makes installed packages available to all scripts.

```bat
wes install @wachaon/fmt --bare
```

# Installing packages from private repositories

*install* can install not only packages from public *github* repositories, but also packages from private repositories. In *install* , specify the package with *@author/repository* . The implementation tries to download the following url.

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/bundle.json`
```

If you access the private repository *raw* with a browser, *token* will be displayed, so copy the *token* and use it. You can also install packages from private repositories by running it in the console while *token* is valid.

```bat
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

# Package introduction

Here are some external packages.

## *@wachaon/fmt*

*@wachaon/fmt* is *prettier* packaged for *wes* to format scripts. Also, if *Syntax Error* occurs while *@wachaon/fmt* is installed, you can show the error location.

### Install *@wachaon/fmt*

```bat
wes install @wachaon/fmt
```

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

Overwrite the file with the formatted script if `--write` or `-w` named argument is specified.

#### use as a module

```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')
const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```

## *@wachaon/edge*

*Internet Explorer* will end support on June 15, 2022. As a result, it is expected that application operations with `require('InternetExplorer.Application')` will become impossible. In addition, the site itself will not be able to display correctly by ending support for *Internet Explorer* . An alternative would be to operate *Microsoft Edge based on Chromium* via *web driver(msedgedriver.exe)* . `@wachaon/edge` simplifies *Edge* autopilot.

### Install *@wachaon/edge*

First install the package.

```bat
wes install @wachaon/edge --bare
```

Then download *web driver(msedgedriver.exe)* .

```bat
wes edge --download
```

Check the installed *Edge* version and download the corresponding *web driver* .

### How to use *@wachaon/edge*

It will be easy to use. Start your browser and change the window size and the site to display to `https://www.google.com` .

```javascript
const edge = require('edge')
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

We store your visit history until your browser's *URL* starts with `https://www.yahoo` .

```javascript
const edge = require('edge')

const ret = edge((window, navi, res) => {
    window.rect({
        x: 1,
        y: 1,
        width: 1200,
        height: 500
    })
    res.exports = []

    navi.on(/^https?:\/\/www\.yahoo\b/, (url) => {
        console.log('finished!')
        navi.emit('terminate', res, window)
    })

    navi.on(/https?:\/\/.+/, (url) => {
        console.log('URL: %O', url)
        res.exports.push(url)
    })

    window.navigate('http://www.google.com')
})

console.log('ret // => %O', ret)
```

*edge* prints the visited *URL* to the console in order. `@wachaon/edge` registers events for *URL* and adds data to `res.exports` . *URL* to be registered can be either `String` `RegExp` , and can be set flexibly. By making it event-driven, you can easily switch to manual operation by not setting events for processes that are difficult to handle with autopilot. If you want the script to stop, run `navi.emit('terminate', res)` or terminate *Edge* manually. Finalization outputs `res.exports` as a *.json* file by default. If you want to set termination processing, set `terminate` of `edge(callback, terminate)` . `window` is an instance of *@wachaon/webdriver* 's *Window* class, not the browser's `window` .

## *@wachaon/webdriver*

It will be a package that sends requests to *web driver* that operates the browser. *@wachaon/edge* includes *@wachaon/webdriver* .

### Install *@wachaon/webdriver*

```bat
wes install @wachaon/webdriver --bare
```

Download *Chromium* based *Microsoft Edge* *web driver(msedgedriver.exe)* if you don't have it. Also, if the version of *edge* and the version of *web driver(msedgedriver.exe)* are different, download the same version of *web driver(msedgedriver.exe)* .

```bat
wes webdriver --download
```

### How to use *@wachaon/webdriver*

Go to [*yahoo JAPAN*](https://www.yahoo.co.jp/) site and save a screenshot of a specific block element.

```javascript
const { Window } = require('webdriver')
const { writeFileSync } = require('filesystem')
const { resolve, WorkingDirectory } = require('pathname')
const genGUID = require('genGUID')

const window = new Window
const { document } = window
window.rect({
    x: 0,
    y: 0,
    width: 1280,
    height: 600
})
window.navigate('https://www.yahoo.co.jp/')

const [elm] = document.querySelectorAll('#ContentWrapper > main > div:nth-child(2)')
const screen = elm.takeScreenShot()

const spec = resolve(WorkingDirectory, 'dev', genGUID() + '.png')
console.log(writeFileSync(spec, screen))

window.quit()
```
