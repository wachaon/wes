# *WES*

*wes*是一个控制台框架，用于在*WSH (Windows Script Host)*上运行*ECMAScript* 。 *README*文件的[*japanese*](/README.md)将是日文。日语以外的文本将被机器翻译。\
对于其他语言的文本，请从以下选项中选择。

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

*   可以将脚本引擎换成*Chakra* ，按照*ECMAScript2015*规范编写。
*   始终使用 32 位*cscript.exe* ，因此没有独特的 64 位问题
*   模块系统可用于比传统*WSH*更高效的开发
*   内置模块支持文件输入/输出、彩色文本输出到控制台等基本处理
*   您不必担心编码等问题，因为它可以在读取文件时自动推断编码
*   也可以将模块打包对外发布或者获取。
*   比*WSH*更友好地显示错误详细信息

# 我们无法解决的*wes*问题

*   `WScript.Quit`不能中止程序并且不返回错误代码
*   异步处理不能正常工作
*   您不能使用`WScript.CreateObject`的第二个参数的*event prefix*

# 下载

*wes*只需要*wes.js*文件。要下载，请从[*@wachaon/wes*](https://github.com/wachaon/wes)复制*wes.js*或在您的控制台中运行以下命令。

```bat
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

*wes*采用了一种在运行时使用*WScript.Shell*的`SendKeys`实现。如果*wes.js*所在目录的路径包含非 ASCII 字符， `SendKeys`将无法正确发送密钥，脚本将无法运行。因此，请确保您存储*wes.js*路径仅包含 ASCII 字符。或者，如果您已经下载了*wes.js* ，您可以使用下面的命令更新它。

```bat
wes update
```

# 如何开始*wes*

输入`wes`关键字，然后输入命令，指定将成为控制台程序起点的文件。脚本扩展名*.js*可以省略。

```bat
wes index
```

*wes*可以直接在控制台输入和执行脚本。如果只用`wes`启动，可以直接进入并执行脚本。

```bat
wes
```

*REP*接受脚本输入，直到您输入两个空行。您还可以在*README.md*中看到*REP*运行示例脚本。

## 命令行选项

*wes*启动选项如下。

| 命名的                | 描述                          |
| ------------------ | --------------------------- |
| `--monotone`       | 消除*ANSI escape code*        |
| `--transpile`      | 始终使用*babel-standalone*转换和运行 |
| `--debug`          | 在调试模式下运行脚本                  |
| `--encoding=UTF-8` | 指定读取的第一个文件的编码               |
| `--arch=x86`       | 这个选项是*wes*自动添加的             |

# 模块系统

*wes*支持两种模块系统，使用`require()`的*commonjs module*系统和使用`import`的*es module*系统。 （不支持*dynamic import* ，因为它是一个异步过程）

## *commonjs module*

通过分配给`module.exports`和调用`require()`来管理模块。绝对路径和以`./`和`../`开头的相对路径以外的路径在*wes\_modules*目录和方便的*node\_modules*目录中查找模块。 *wes*的`require()`会自动猜测模块文件的编码，但如果它没有猜对，您可以使用第二个参数指定编码。

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

此外，可以使用*require*来导入*COM Object* ，例如`require('WScript.Shell')` 。

```javascript
const Shell = require('Shell.Application')
Shell.MinimizeAll()
WScript.Sleep(2000)
Shell.UndoMinimizeAll()
```

## *es module*

脚本执行引擎*Chakra*会解释`imoprt`等语法，但它不会在*cscript*环境中执行。在*wes*中，通过在内置模块中加入*babel* ， *es module*也在一个一个转译的同时执行。这是以处理开销和臃肿的*wes.js*文件为代价的。用*es module*模块编写的模块也通过转译转换为`require()` ，因此可以调用*COM Object* 。但是不支持用*es module*指定模块文件的编码。一切都自动加载。要将其作为*es module*加载，请将扩展名设置为`.mjs`或将`package.json`中的`"type"`字段设置为`"module"` 。

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

*wes*有*WSH (JScript)*中没有的*built-in objects* 。

## *console*

我们使用*console*而不是*wes* `WScript.Echo()`和`WScript.StdErr.WriteLine()` 。

### *console.log*

使用`console.log()`将字符输出到控制台。它还支持格式化字符串。使用`%`格式化运算符输出格式化字符串。 （格式化运算符对其他方法也有效。）

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

`WScript.StdOut.WriteLine` *wes* `WScript.StdErr.WriteLine`来输出彩色字符串。 `WScript.Echo`和`WScript.StdOut.WriteLine`是阻塞输出。 `WScript.StdErr.WriteLine`或`console.log` 。

### *console.print*

`console.log()`通常在末尾包含换行符，但`console.print`不包含。

### *console.debug*

仅当启用`--debug`选项时才输出到控制台。

### *console.error*

以内容作为消息抛出异常。

### *console.weaklog*

如果有任何后续输出，使用`console.weaklog()`打印的字符串将从控制台中消失。用于切换输出。

## *Buffer*

您可以处理缓冲区。

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log('%s %O', content, buff)
```

## `__dirname`和`__filename`

`__filename`存储当前执行的模块文件的路径。 `__dirname`包含`__filename`的目录。

```javascript
const message = `dirname: ${__dirname}\nfilename: ${ __filename}`
console.log(message)
```

## *setTimeout* *setInterval* *setImmediate* *Promise*

由于*wes*是用于同步处理的执行环境，因此*setTimeout* *setInterval* *setImmediate* *Promise*并不能起到异步处理的作用，但它的实现是为了支持假设*Promise*实现的模块。

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

*wes*有*built-in modules*来简化和标准化基本处理。

## 要删除的内置模块

将一些内置模块更改为外部模块，使文件更轻便，更易于维护。

*   *animate.js*
*   *day.js*
*   *debug.js*
*   *log.js*

以上模块可以分别安装为`@wachaon/animate` `@wachaon/day` `@wachaon/debug` `@wachaon/log` 。

## *ansi*

`ansi`是*ANSI escape code* ，可以改变标准输出颜色和效果。颜色和效果可能会有所不同，具体取决于所使用的控制台应用程序的类型和设置。

```javascript
const { redBright, yellow } = require('ansi')
const message = 'File does not exist'
console.log(redBright + 'Error: ' + yellow + message)
```

您还可以使用`ansi.color()`和`ansi.bgColor()`创建自己的颜色。参数使用*RGB* （例如`255, 165, 0` ）和*color code* （例如`'#FFA500'` 。不支持*color name* ，例如`orange` 。

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

## *argv*

获取命令行参数。 `cscript.exe`的命令行参数使用`/`声明命名参数，而*wes*使用`-`和`--`声明命名参数。 *argv.unnamed*和*argv.named*命令行参数值类型转换为*String* *Number* *Boolean* 。使用*REP*输入命令行参数。

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

操作文件和目录。 `readTextFileSync()`自动猜测文件的编码并读取它。 （即使`readFileSync()`的第二个参数`encode`为`auto` ，它也会被自动猜测。）

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
// const contents = fs.readFileSync(readme, 'auto')
console.log(contents)
```

## *chardet*

我正在使用<https://github.com/runk/node-chardet>的一些功能。您可以通过增加特定于编码的字符来提高自动猜测的准确性。

## *JScript*

如果将脚本引擎更改为*Chakra* ，您将无法使用*JScript* specific *Enumerator*等。内置模块*JScript*使它们可用。但是， *Enumerator*返回*Array* ，而不是*Enumerator object* 。

```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```

*GetObject*用作`WScript.GetObject`的替代方法。

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

*VBScript*提供了一些*JScript*没有的功能。

```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```

## *httprequest*

*httprequest*发出一个*http request* 。

```javascript
const request = require('httprequest')
const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log('%O', JSON.parse(content))
```

## *minitest*

*minitest*可以编写简单的测试。从`0.10.71`版本开始，我们回到了基本概念，将断言的类型减少到 3 种类型。

用`describe`分组，用`it`测试，用`assert`验证。 `pass`将是`it`的出现次数和通过次数的数组。

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

为简单起见，只有三个断言函数用于比较对象。

#### `assert(value, message)` `assert.ok(value, message)`

使用严格相等运算符`===`与`true`进行比较。如果`value`是一个函数，则评估执行该函数的结果。

| 参数        | 类型                    | 描述        |
| :-------- | :-------------------- | :-------- |
| `value`   | `{Function\|Boolean}` | 布尔或布尔返回函数 |
| `message` | `{String}`            | 失败时的消息    |

#### `assert.equal(expected, actual)`

比较对象的成员相等性，而不是通过引用。\
NaN `true` `NaN === NaN` `function (){} === function (){}` `/RegExp/g === /RegExp/g`或`{one: {two: 2}} === {one: {two: 2}}` `[1,2,3] === [1,2,3]`等等。\
在比较类（对象）时，它们必须具有相同的构造函数或`actual` `expected`的超类。

| 参数         | 类型      | 描述   |
| :--------- | :------ | :--- |
| `expected` | `{Any}` | 期望值  |
| `actual`   | `{Any}` | 实际价值 |

#### `assert.throws(value, expected, message)`

验证错误是否正确抛出。\
错误是否正确取决于预期的错误*constructor* 、 *message*是否相等，以及正则表达式是否通过*stack*评估。

| 参数         | 类型                        | 描述                                            |
| :--------- | :------------------------ | :-------------------------------------------- |
| `value`    | `{Error}`                 | 错误                                            |
| `expected` | `{Error\|String\|RegExp}` | 计算预期错误*constructor* 、 *message*或*stack*的正则表达式 |
| `message`  | `{String}`                | 失败时的消息                                        |

## *pipe*

*pipe*简化了管道。在用一个或多个*converter*转换*data*的同时输出结果。从*ver 0.12.75*开始，可以直接从命令行启动。

### 作为模块启动*pipe*

将转换函数放在*pipe*方法的`use(converter)`参数中，用`process(data, callback(error, result))`描述数据输入和转换后处理。如果没有指定`callback` ，返回值将是*promise* ，处理可以连接到`then(result)`和`catch(error)` 。

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

除了`use(converter)`之外，还有`.filter(callbackFn(value, index))`和`map(callbackFn(value, index))`等方法。每个*data*都是一个字符串、一个数组和一个对象。

```javascript
const pipe = require('pipe')

const tsv = `
javascript\t1955
java\t1995
vbscript\t1996
c#\t2000
`.trim()

pipe()
    .filter(include)
    .map(release)
    .process(tsv)
    .then((res) => console.log(() => res))

function include(value, i) {
    return value.includes('script')
}

function release(value, i) {
    return value.split('\t').join(' was released in ')
}
```

### 从命令行启动*pipe*

在命令行中，在`pipe`之后按顺序输入转换函数。转换函数的参数作为与转换函数同名的命名命令行参数的值输入。 `=>`值`(` `eval()`而不是`JSON.parse()`进行解析`)` *WSH*在命令行参数中强制使用`"` 。在这种情况下，请勿使用`eval()`进行解析）

```bash
wes pipe swap merge --input="sample.txt" --output="" --swap="[2, 0, 1, 3]" --merge=4
```

此命令等效于脚本：

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

```javascript
const { isString, isNumber, isBoolean, isObject } = require('typecheck')
const log = require('log')
log(() => isString("ECMAScript"))
log(() => isNumber(43.5))
log(() => isBoolean(false))
log(() => isObject(function(){}))
```

## *getMember*

在控制台中使用时，从*ProgID*获取*COM Object*成员类型和描述。

```bat
wes getMember "Scripting.FileSystemObject"
```

当作为模块使用时，它获取实例的成员类型和描述。如果用作模块，您可以获得有关无法从*WSH (Windows Script Host)*确认的对象的信息。

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

将脚本另存为文件或将其粘贴到您的下一个`REP`中。

```bat
wes REP pos 100 100
```

### 直接从控制台运行*powershell*

在控制台中执行指定的*.ps1*文件。

```bat
wes ps ./sample.ps1
```

您也可以通过指定`--Command`或`-c`选项直接执行命令。

显示当前目录中文件列表的示例

```bat
wes ps --Command Get-ChildItem
```

## *zip*

压缩文件和文件夹并解压缩压缩文件。在内部调用和处理*PowerShell* 。

```javascript
const {zip, unzip} = require('zip')
console.log(zip('docs\\*', 'dox.zip'))
console.log(unzip('dox.zip'))
```

通配符`*`可以写在`zip(path, destinationPath)` `path`路径中。它可以在*CLI (Command Line Interface)*和*module*中使用。

```bat
wes zip docs\* dox.zip
wes zip -p dox.zip
```

如果`path`有扩展名`.zip` ， `unzip()`被处理，并且没有扩展名`.zip`的描述。或者，即使有扩展名`.zip` ，如果有通配符`*`描述， `zip()`也会被处理。

| 无名  | 描述             |
| --- | -------------- |
| `1` | `path`文件夹或文件进入 |
| `2` | 文件夹文件输出`dest`  |

| 命名的      | 简称   | 描述             |
| -------- | ---- | -------------- |
| `--path` | `-p` | `path`文件夹或文件进入 |
| `--dest` | `-d` | 文件夹文件输出`dest`  |

# 捆绑（打包）和安装模块

在*wes*中，几个模块的捆绑称为包。您可以安装在*github*上发布的*wes*包。发布包需要一个*github repository* 。

## *bundle*

将包发布到*github*时， *bundle*会捆绑所需的模块并创建*bundle.json* 。

1.  一个*repository*只能发布一个包
2.  *package.json*是必需的。至少，需要对`main`字段进行描述。 ```json
    {
        "main": "index.js"
    }
    ```
3.  如果要发布包，请*public*存储库
4.  从`version 0.12.0`开始，直接模块加载到工作目录上方目录的包将不会被捆绑。可以打包上层目录*wes\_modules*或*node\_modules*中的包。

输入以下命令进行捆绑：有关要捆绑的内容，请参阅*package.json* 。

```bat
wes bundle 
```

## *init*

输入一些项目，它将根据该信息创建*package.json* 。

```bat
wes init
```

## *install*

用于安装*github*上发布的*wes*包。从`version 0.10.28` ，安装文件夹从`node_modules`更改为`wes_modules` 。如果要在`node_modules`中安装，请添加`--node`选项。从`version 0.12.0`开始，文件将从*bandle.json*解压缩并保存。由于规范更改，与 0.12.0 以下`version 0.12.0`捆绑的软件包可能无法与`version 0.12.0`正确安装。

以`@author/repository`的形式传递要*install*的参数。

```bat
wes install @wachaon/fmt
```

*install*有选项。

| 命名为           | 简称   | 描述                                            |
| ------------- | ---- | --------------------------------------------- |
| `--bare`      | `-b` | 不要创建*@author*文件夹                              |
| `--global`    | `-g` | 将包安装到*wes.js*所在的文件夹中                          |
| `--save`      | `-S` | 将包名称和版本添加到*package.json*中的*dependencies*项字段   |
| `--save--dev` | `-D` | 将包名称和版本添加到*package.json*中的*devDependencies*字段 |
| `--node`      | `-n` | 安装在*node\_module*文件夹中                         |

`--bare`选项可以省略从`author@repository`到`repository`的`require`参数。 `--global`选项使已安装的软件包可用于所有脚本。

```bat
wes install @wachaon/fmt --bare
```

# 从私有仓库安装包

*install*不仅可以安装来自公共*github*存储库的包，还可以安装来自私有存储库的包。在*install*中，使用*@author/repository*指定包。该实现尝试下载以下网址。

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/bundle.json`
```

如果您使用浏览器访问*raw*存储库，则会显示*token* ，因此请复制*token*并使用它。您还可以通过在*token*有效时在控制台中运行来从私有存储库安装包。

```bat
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

# 包装介绍

这是一些外部软件包。

## *@wachaon/fmt*

*@wachaon/fmt* *prettier*地打包为*wes*格式化脚本。此外，如果在安装*@wachaon/fmt*时出现*Syntax Error* ，您可以指出错误的位置。

### 安装*@wachaon/fmt*

```bat
wes install @wachaon/fmt
```

如果工作目录中有*.prettierrc* （JSON 格式），它会反映在设置中。 *fmt*在*CLI*和*module*中都可用。

#### 用作*CLI* 。

```bat
wes @wachaon/fmt src/sample --write
```

| 无名号码 | 描述             |
| ---- | -------------- |
| 1    | 必需的。要格式化的文件的路径 |

| 命名为       | 简称   | 描述   |
| --------- | ---- | ---- |
| `--write` | `-w` | 允许覆盖 |

如果指定了`--write`或`-w`命名参数，则使用格式化脚本覆盖文件。

#### 作为一个模块使用

```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')
const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```

## *@wachaon/edge*

*Internet Explorer*将于 2022 年 6 月 15 日终止支持。因此，预计使用`require('InternetExplorer.Application')`应用程序操作将变得不可能。此外，终止对*Internet Explorer*的支持后，站点本身将无法正确显示。另一种方法是通过*web driver(msedgedriver.exe)*运行*Microsoft Edge based on Chromium* 。 `@wachaon/edge`简化了*Edge*自动驾驶仪。

### 安装*@wachaon/edge*

首先安装包。

```bat
wes install @wachaon/edge --bare
```

然后下载*web driver(msedgedriver.exe)* 。

```bat
wes edge --download
```

查看安装的*Edge*版本，下载对应的*web driver* 。

### 如何使用*@wachaon/edge*

它将易于使用。启动浏览器并将窗口大小和要显示的站点更改为`https://www.google.com` 。

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

我们会存储您的访问历史记录，直到您的浏览器的*URL*以`https://www.yahoo`开头。

```javascript
const edge = require('/index.js')

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

*edge*按顺序将访问过的*URL*打印到控制台。 `@wachaon/edge`为*URL*注册事件并将数据添加到`res.exports` 。注册的*URL*可以是`String` `RegExp` ，可以灵活设置。通过使其成为事件驱动，您可以通过不为自动驾驶仪难以处理的流程设置事件来轻松切换到手动操作。如果您希望脚本停止， `navi.emit('terminate', res)`或手动终止*Edge* 。默认情况下，终结将*.json*输出为`res.exports`文件。如果要设置终止处理，请设置`terminate` of `edge(callback, terminate)` 。 `window`是*@wachaon/webdriver*的*Window*类的实例，而不是浏览器的`window` 。

## *@wachaon/webdriver*

它将是一个向运行浏览器的*web driver*发送请求的包。 *@wachaon/edge*包括*@wachaon/webdriver* 。

### 安装*@wachaon/webdriver*

```bat
wes install @wachaon/webdriver --bare
```

如果没有基于*Chromium*的*Microsoft Edge* *web driver(msedgedriver.exe)* ，请下载它。另外，如果*edge*的版本和*web driver(msedgedriver.exe)*的版本不同，请下载相同版本的*web driver(msedgedriver.exe)* 。

```bat
wes webdriver --download
```

### 如何使用*@wachaon/webdriver*

转到[*yahoo JAPAN*](https://www.yahoo.co.jp/)站点并保存特定块元素的屏幕截图。

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
