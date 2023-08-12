# *WES*

*wes*是一个用于在*WSH (Windows Script Host)*上运行*ECMAScript*控制台框架。自述*README*的原始文本将为[*japanese*](/README.md) 。日语以外的文本将被机器翻译。\
对于其他语言的文本，请从以下选项中进行选择。

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

# 特征

*   您可以将脚本引擎更改为*Chakra*并按照*ECMAScript2015+*规范进行编写。
*   始终使用 32 位*cscript.exe* ，因此没有独特的 64 位问题
*   模块系统可实现比传统*WSH*更高效的开发
*   内置模块支持基本处理，例如文件输入/输出和彩色文本输出到控制台
*   您不必担心编码等问题，因为它可以在读取文件时自动推断编码
*   也可以将模块打包对外发布或者获取。
*   比*WSH*更友好地显示错误详细信息

# *wes*无法解决的已知问题

*   `WScript.Quit`无法中止程序并且不返回错误代码
*   异步处理无法正常工作
*   不能使用`WScript.CreateObject`的第二个参数的*event prefix*

# 下载

*wes*只需要*wes.js*文件。要下载，请从[*@wachaon/wes*](https://github.com/wachaon/wes)复制*wes.js*或在控制台中运行以下命令。

```bat
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

*wes*采用在运行时使用*WScript.Shell*的`SendKeys`实现。如果*wes.js*所在目录的路径包含非 ASCII 字符， `SendKeys`将无法正确发送密钥，脚本将无法运行。因此，请确保存储*wes.js*路径仅包含 ASCII 字符。或者，如果您已经下载了*wes.js* ，则可以使用以下命令更新它。

```bat
wes update
```

# 如何开始*wes*

输入`wes`关键字，后跟命令指定将作为程序到控制台的起点的文件。脚本扩展名*.js*可以省略。

```bat
wes index
```

*wes*可以直接在控制台输入并执行脚本。如果只用`wes`启动，可以直接输入并执行脚本。

```bat
wes
```

*REP*接受脚本输入，直到您输入两个空行。您还可以在*README.md*中看到*REP*运行示例脚本。

## 命令行选项

*wes*启动选项如下。

| 命名的                | 描述                            |
| ------------------ | ----------------------------- |
| `--monotone`       | 消除*ANSI escape code*          |
| `--transpile`      | 始终使用*babel-standalone*进行转换和运行 |
| `--debug`          | 在调试模式下运行脚本                    |
| `--encoding=UTF-8` | 指定读取的第一个文件的编码                 |
| `--arch=x86`       | 该选项由*wes*自动添加                 |

# 模块系统

*wes*支持两种模块系统，使用`require()` *commonjs module*系统和使用`import` *es module*系统。 （不支持*dynamic import*因为它是一个异步过程）

## *commonjs module*

通过分配给`module.exports`并调用`require()`来管理模块。除了绝对路径和以`./`和`../`开头的相对路径之外的路径在*wes\_modules*目录中查找模块，并且方便地在*node\_modules*目录中查找模块。 *wes*的`require()`自动猜测模块文件的编码，但如果猜测不正确，您可以使用第二个参数指定编码。

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

此外，还可以使用*require*导入*COM Object* ，例如`require('WScript.Shell')` 。

```javascript
const Shell = require('Shell.Application')
Shell.MinimizeAll()
WScript.Sleep(2000)
Shell.UndoMinimizeAll()
```

## *es module*

*Chakra*是脚本执行引擎，解释诸如`imoprt`之类的语法，但它不在*cscript*环境中执行。在*wes*通过在内置模块中添加*babel* ， *es module*也在被一一转译的同时执行。这是以处理开销和臃肿的*wes.js*文件为代价的。 *es module*中编写的模块也会通过转译转换为`require()` ，因此可以调用*COM Object* 。但是，它不支持使用*es module*指定模块文件的编码。一切都会自动加载。要将其作为*es module*加载，请将扩展名设置为`.mjs`或将`package.json`中的`"type"`字段设置为`"module"` 。

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

# 内置对象

*wes*具有*WSH (JScript)*中未找到的*built-in objects* 。

## *console*

*wes*使用*console*而不是`WScript.Echo()`和`WScript.StdErr.WriteLine()` 。

### *console.log*

使用`console.log()`将字符输出到控制台。它还支持格式化字符串。使用`%`格式化运算符输出格式化字符串。 （格式化运算符对于其他方法也有效。）

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

| 格式说明符 | 描述                               |
| ----- | -------------------------------- |
| `%s`  | `String(value)`                  |
| `%S`  | `String(value)`                  |
| `%c`  | `String(value)`                  |
| `%C`  | `String(value)`                  |
| `%d`  | `parseInt(value, 10)`            |
| `%D`  | `parseInt(value, 10)`            |
| `%f`  | `Number(value)`                  |
| `%F`  | `Number(value)`                  |
| `%j`  | `JSON.stringify(value)`          |
| `%J`  | `JSON.stringify(value, null, 2)` |
| `%o`  | 对象转储                             |
| `%O`  | 对象转储（缩进/彩色）                      |

*wes*使用`WScript.StdOut.WriteLine`而不是`WScript.StdErr.WriteLine`来输出彩色字符串。 `WScript.Echo`和`WScript.StdOut.WriteLine`被阻止。使用`WScript.StdErr.WriteLine`或`console.log` 。

### *console.print*

`console.log()`通常在末尾包含换行符，但`console.print`不包含。

### *console.debug*

仅当启用`--debug`选项时才输出到控制台。

### *console.error*

抛出异常，并将内容作为消息。

### *console.weaklog*

如果有任何后续输出，使用`console.weaklog()`打印的字符串将从控制台消失。对于开关输出很有用。

## *Buffer*

您可以处理缓冲区。

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log('%s %O', content, buff)
```

## `__dirname`和`__filename`

`__filename`存储当前正在执行的模块文件的路径。 `__dirname`包含`__filename`的目录。

```javascript
const message = `dirname: ${__dirname}\nfilename: ${ __filename}`
console.log(message)
```

## *setTimeout* *setInterval* *setImmediate* *Promise*

由于*wes*是同步处理的执行环境， *setTimeout* *setInterval* *setImmediate* *Promise*并不起到异步处理的作用，而是为了支持假设*Promise*实现的模块而实现的。

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

# 内置模块

*wes*具有*built-in modules*来简化和标准化基本处理。

## 要删除的内置模块

将一些内置模块改为外部模块，使文件更轻，更易于维护。

*   *animate.js*
*   *day.js*
*   *debug.js*
*   *log.js*

上述模块可以分别安装为`@wachaon/animate` `@wachaon/day` `@wachaon/debug` `@wachaon/log` 。

## *ansi*

`ansi`是*ANSI escape code* ，可以更改标准输出颜色和效果。颜色和效果可能会有所不同，具体取决于所使用的控制台应用程序的类型和设置。

```javascript
const { redBright, yellow } = require('ansi')
const message = 'File does not exist'
console.log(redBright + 'Error: ' + yellow + message)
```

您还可以使用`ansi.color()`和`ansi.bgColor()`创建自己的颜色。参数使用*RGB* （例如`255, 165, 0` *color code* （例如`'#FFA500'` 。不支持`orange`等*color name* 。

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

## *argv*

获取命令行参数。 `cscript.exe`的命令行参数使用`/`声明命名参数，而*wes*使用`-`和`--`声明命名参数。 *argv.unnamed*和*argv.named*将命令行参数值类型转换为*String* *Number* *Boolean* 。使用*REP*输入命令行参数。

```bat
wes REP aaa -bc dd --e=false --gh=iii jjj --klm nn -o --p 9 r
```

在*REP*上运行以下脚本。

```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```

## *pathname*

操纵路径。以`/`和`\`开头的路径通常相对于驱动器根目录。例如`/filename`和`C:/filename`可以是相同的路径。出于安全原因， *wes*解释以`/`和`\`开头的相对于工作目录的路径。

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

## *filesystem*

操作文件和目录。 `readTextFileSync()`自动猜测文件的编码并读取它。 （即使`readFileSync()`的第二个`encode`设置为`auto` ，它也会被自动猜测。）

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
// const contents = fs.readFileSync(readme, 'auto')
console.log(contents)
```

## *chardet*

我正在使用<https://github.com/runk/node-chardet>中的一些功能。您可以通过增加特定于编码的字符来提高自动猜测的准确性。

## *JScript*

如果将脚本引擎更改为*Chakra* ，您将无法使用*JScript*特定的*Enumerator*等。内置模块*JScript*使它们可用。但是， *Enumerator*返回*Array* ，而不是*Enumerator object* 。

```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```

*GetObject*可作为`WScript.GetObject`的替代方案。

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

*VBScript*提供了*JScript*所没有的一些功能。

```javascript {"testing": true, "message": "Typename"}
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(() => TypeName(FSO)) // => "FileSystemObject"
```

## *httprequest*

*httprequest*发出*http request* 。

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

*minitest*可以编写简单的测试。从`0.10.71`版本开始，我们回到了基本概念，并将断言类型减少到了 3 种。

使用`describe`进行分组，使用`it`进行测试，并使用`assert`进行验证。 `pass`将是一个由`it`出现的次数和传递次数组成的数组。

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

### 断言

为了简单起见，只有三个断言函数用于比较对象。

#### `assert(value, message)` `assert.ok(value, message)`

使用严格相等运算符`===`与`true`进行比较。如果`value`是一个函数，则评估执行该函数的结果。

| 参数        | 类型                    | 描述           |
| :-------- | :-------------------- | :----------- |
| `value`   | `{Function\|Boolean}` | 布尔值或返回布尔值的函数 |
| `message` | `{String}`            | 失败时的消息       |

#### `assert.equal(expected, actual)`

比较对象的成员相等性，而不是通过引用。\
`NaN === NaN` `function (){} === function (){}` `true` `/RegExp/g === /RegExp/g`或`{one: {two: 2}} === {one: {two: 2}}` `[1,2,3] === [1,2,3]`等\
比较类（对象）时，它们必须具有相同的构造函数或`actual` `expected`超类。

| 参数         | 类型      | 描述   |
| :--------- | :------ | :--- |
| `expected` | `{Any}` | 期望值  |
| `actual`   | `{Any}` | 实际价值 |

#### `assert.throws(value, expected, message)`

验证是否正确抛出错误。\
错误是否正确取决于预期错误*constructor*函数、 *message*是否相等以及正则表达式是否通过*stack*求值。

| 参数         | 类型                        | 描述                                            |
| :--------- | :------------------------ | :-------------------------------------------- |
| `value`    | `{Error}`                 | 错误                                            |
| `expected` | `{Error\|String\|RegExp}` | 计算预期错误*constructor* 、 *message*或*stack*的正则表达式 |
| `message`  | `{String}`                | 失败时的消息                                        |

## *pipe*

*pipe*简化了管道。用一个或多个*converter*转换*data*的同时输出结果。从*ver 0.12.75*开始，可以直接从命令行启动。

### 将*pipe*作为模块启动

将转换函数放在*pipe*方法的`use(converter)`参数中，并使用`process(data, callback(error, result))`描述数据输入和转换后处理。如果没有指定`callback` ，返回值将是*promise* ，处理可以与`then(result)`和`catch(error)`连接。

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

除了`use(converter)`之外，还有`.filter(callbackFn(value, index))`和`map(callbackFn(value, index))`等方法。每个*data*都是一个字符串、一个数组和一个对象。

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

### 从命令行启动*pipe*

从命令行中，在`pipe`之后按顺序输入转换函数。转换函数的参数作为与转换函数同名的命名命令行参数的值输入。 `=>`值`(` `eval()`而不是`JSON.parse()`进行解析`)` *WSH*在命令行参数中强制输出`"` 。在这种情况下，请勿使用`eval()`进行解析）

```bash
wes pipe swap merge --input="sample.txt" --output="" --swap="[2, 0, 1, 3]" --merge=4
```

该命令相当于以下脚本：

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

确定脚本类型。

```javascript {"testing": true, "message": "typecheck"}
const { isString, isNumber, isBoolean, isObject } = require('typecheck')
console.log(() => isString("ECMAScript")) /* => true */
console.log(() => isNumber(43.5)) /* => true */
console.log(() => isBoolean(false)) /* => true */
console.log(() => isObject(function(){})) /* => false */
```

## *getMember*

在控制台中使用时，从*ProgID*获取*COM Object*成员类型和描述。

```bat
wes getMember "Scripting.FileSystemObject"
```

当用作模块时，它获取实例的成员类型和描述。当用作模块时，您可以获取无法从*WSH (Windows Script Host)*确认的对象的信息。

```javascript
const getMember = require('getMember')
const SWbemServicesEx = require("WbemScripting.SWbemLocator").ConnectServer()
getMember(SWbemServicesEx)
```

## *ps*

有助于运行*PowerShell* 。

### `ps(source, option)`

运行`source` *PowerShell*脚本。

在控制台中显示 cmdlet 列表。

```javascript
const ps = require('ps')
 
console.log(ps("Get-Command"))
```

如果有*Google Cherome*窗口，请更改窗口的大小和位置。 （它在全屏模式下不起作用。）

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

控制鼠标移动和点击。

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

将脚本保存为文件或将其粘贴到下一个`REP`中。

```bat
wes REP pos 100 100
```

### 直接从控制台运行*powershell*

在控制台中执行指定的*.ps1*文件。

```bat
wes ps ./sample.ps1
```

您还可以通过指定`--Command`或`-c`选项直接执行命令。

显示当前目录中文件列表的示例

```bat
wes ps --Command Get-ChildItem
```

## *zip*

压缩文件和文件夹并解压缩压缩文件。在内部， *PowerShell*被调用并处理。

```javascript
const {zip, unzip} = require('zip')
console.log(zip('docs\\*', 'dox.zip'))
console.log(unzip('dox.zip'))
```

`zip(path, destinationPath)`的`path`中可以写入通配符`*` 。它可以在*CLI (Command Line Interface)*和*module*中使用。

```bat
wes zip docs\* dox.zip
wes zip -p dox.zip
```

如果`path`具有扩展`.zip` ，则处理`unzip()` ，并且没有扩展名`.zip`的描述。或者，即使存在扩展名`.zip`如果存在通配符`*`描述，也会处理`zip()` 。

| 未命名的 | 描述            |
| ---- | ------------- |
| `1`  | 要输入的`path`或文件 |
| `2`  | 文件夹文件输出`dest` |

| 命名的      | 简称   | 描述            |
| -------- | ---- | ------------- |
| `--path` | `-p` | 要输入的`path`或文件 |
| `--dest` | `-d` | 文件夹文件输出`dest` |

# 捆绑（打包）和安装模块

在*wes*中，多个模块的捆绑称为包。您可以安装*github*上发布的*wes*包。发布包需要*github repository* 。

## *bundle*

将包发布到*github*时， *bundle*会捆绑所需的模块并创建*bundle.json* 。

1.  一个*repository*中只能发布一个包

2.  *package.json*是必需的。至少需要对`main`字段进行描述。

    ```json
     { "main": "index.js" }
    ```

3.  如果您想发布包，请将存储库*public*

4.  从`version 0.12.0`开始，直接将模块加载到工作目录之上的目录中的包将不会被捆绑。上层目录*wes\_modules*或*node\_modules*中的包可以进行捆绑。

输入以下命令进行捆绑：请参阅*package.json*了解要捆绑的内容。

```bat
wes bundle 
```

## *init*

输入一些项目，它将根据该信息创建*package.json* 。

```bat
wes init
```

## *install*

用于安装*github*上发布的*wes*包。从`version 0.10.28`开始，安装文件夹从`node_modules`更改为`wes_modules` 。如果要安装在`node_modules`中，请添加`--node`选项。从`version 0.12.0`开始，文件将从*bandle.json*中解压缩并保存。由于规范更改， `version 0.12.0`捆绑的软件包可能无法与`version 0.12.0`一起正确安装。

以`@author/repository`形式传递*install*参数。

```bat
wes install @wachaon/fmt
```

*install*有选项。

| 命名的           | 简称   | 描述                                            |
| ------------- | ---- | --------------------------------------------- |
| `--bare`      | `-b` | 不要创建*@author*文件夹                              |
| `--global`    | `-g` | 将包安装到*wes.js*所在文件夹中                           |
| `--save`      | `-S` | 将包名称和版本添加到*package.json*中的*dependencies*字段    |
| `--save--dev` | `-D` | 将包名称和版本添加到*package.json*中的*devDependencies*字段 |
| `--node`      | `-n` | 安装在*node\_module*文件夹中                         |

`--bare`选项可以省略从`@author/repository`到`repository`的`require`参数。 `--global`选项使已安装的软件包可供所有脚本使用。

```bat
wes install @wachaon/fmt --bare
```

# 从私有存储库安装包

*install*不仅可以安装公共*github*存储库中的包，还可以安装私有存储库中的包。在*install*中，使用*@author/repository*指定包。该实现尝试下载以下 url。

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/bundle.json`
```

如果使用浏览器访问私有仓库*raw* ，会显示*token* ，所以复制*token*并使用。您还可以在*token*有效时通过在控制台中运行来安装私有存储库中的软件包。

```bat
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

# 套餐介绍

这里有一些外部包。

## *@wachaon/fmt*

*@wachaon/fmt*是*prettier*包装，供*wes*格式化脚本。另外，如果安装*@wachaon/fmt*时发生*Syntax Error* ，您可以显示错误位置。

### 安装*@wachaon/fmt*

```bat
wes install @wachaon/fmt
```

如果工作目录中有*.prettierrc* （JSON格式），它将反映在设置中。 *fmt*在*CLI*和*module*中都可用。

#### 用作*CLI* 。

```bat
wes @wachaon/fmt src/sample --write
```

| 无名号码 | 描述              |
| ---- | --------------- |
| 1    | 必需的。您要格式化的文件的路径 |

| 命名的       | 简称   | 描述   |
| --------- | ---- | ---- |
| `--write` | `-w` | 允许覆盖 |

如果指定了`--write`或`-w`命名参数，则使用格式化脚本覆盖文件。

#### 作为模块使用

```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')
const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```

## *@wachaon/edge*

*Internet Explorer*将于 2022 年 6 月 15 日终止支持。因此，预计使用`require('InternetExplorer.Application')`进行应用程序操作将变得不可能。此外，终止对*Internet Explorer*支持后，网站本身将无法正确显示。另一种方法是通过*web driver(msedgedriver.exe)*操作*Microsoft Edge based on Chromium* 。 `@wachaon/edge`简化了*Edge*自动驾驶仪。

### 安装*@wachaon/edge*

首先安装该软件包。

```bat
wes install @wachaon/edge --bare
```

然后下载*web driver(msedgedriver.exe)* 。

```bat
wes edge --download
```

检查安装的*Edge*版本并下载相应的*web driver* 。

### 如何使用*@wachaon/edge*

它将很容易使用。启动浏览器并将窗口大小和要显示的站点更改为`https://www.google.com` 。

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

我们会存储您的访问历史记录，直到您的浏览器*URL*以`https://www.yahoo`开头。

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

*edge*按顺序将访问过的*URL*打印到控制台。 `@wachaon/edge`注册*URL*事件并将数据添加到`res.exports` 。注册的*URL*可以是`String` `RegExp` ，可以灵活设置。通过使其成为事件驱动的，您可以通过不为自动驾驶仪难以处理的流程设置事件来轻松切换到手动操作。如果您希望脚本停止，请运行`navi.emit('terminate', res)`或手动终止*Edge* 。默认情况下，最终确定会将`res.exports`输出为*.json*文件。如果要设置终止处理，请设置`edge(callback, terminate)`的`terminate` 。 `window`是*@wachaon/webdriver*的*Window*类的实例，而不是浏览器的`window` 。

## *@wachaon/webdriver*

它将是一个向运行浏览器的*web driver*发送请求的包。 *@wachaon/edge*包括*@wachaon/webdriver* 。

### 安装*@wachaon/webdriver*

```bat
wes install @wachaon/webdriver --bare
```

如果没有，请下载基于*Chromium*的*Microsoft Edge* *web driver(msedgedriver.exe)* 。另外，如果*edge*版本和*web driver(msedgedriver.exe)*版本不同，请下载相同版本的*web driver(msedgedriver.exe)* 。

```bat
wes webdriver --download
```

### 如何使用*@wachaon/webdriver*

转到[*yahoo JAPAN*](https://www.yahoo.co.jp/)网站并保存特定块元素的屏幕截图。

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
