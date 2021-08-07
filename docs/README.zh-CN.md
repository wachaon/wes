# _WES_

_wes_是一个在_Windows Script Host_上执行_ECMAScript_的框架

_README_的原文是[_japanese_](README.ja.md) 。除了日语，它是一个机器翻译的句子。  
请从以下选择其他语言的句子。

## 特征

-   将脚本引擎更改为_Chakra_并运行_ECMAScript2015_ _Chakra_
-   _cscript.exe_ 32 位_cscript.exe_并且没有任何特定于 64 位环境的错误
-   使用`require`导入模块
-   将彩色字符输出到标准输出
-   自动猜测文件编码

## 未解决的功能

-   `WScript.Quit`不能中断程序并且不返回错误代码
-   异步处理
-   使用`WScript.CreateObject`的第二个参数的_event prefix_

## 安装

_wes_需要的是_wes.js_唯一的文件。要下载，请启动命令提示符并输入以下命令。

```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

_wes_在执行的时候作为实现_WScript.Shell_的`SendKeys`使用。 _wes.js_保存的目录路径包含_ascii_以外的字符，则`SendKeys`将无法正确发送密钥，脚本将无法执行。  
请只配置_wes.js_的保存目标路径_ascii_ 。

## 用法

在命令行上，在`wes`之后指定将成为程序起点的文件。脚本扩展名_.js_可以省略。

```shell
wes index
```

另外， _wes_有_REPL_所以如果你只用`wes`启动它，你可以直接输入脚本。

```shell
wes
```

脚本将被接受，直到您输入两个空行。 _README.md_还可以使用_REPL_检查_README.md_示例脚本的执行情况。

## 命令行命名参数

_wes_的启动选项如下。

| 命名                 | 描述                   |
| ------------------ | -------------------- |
| `--monotone`       | 消除_ANSI escape code_ |
| `--safe`           | 在安全模式下运行脚本           |
| `--usual`          | 以正常模式运行脚本（默认）        |
| `--unsafe`         | 在不安全模式下运行脚本          |
| `--dangerous`      | 以危险模式运行脚本            |
| `--debug`          | 在调试模式下运行脚本           |
| `--encoding=UTF-8` | 指定要读取的第一个文件的编码       |
| `--engine=Chakra`  | 这个选项是由_wes_自动添加的     |

`--safe` `--usual` `--unsafe` `--dangerous`的实现不完整，但保留了命名参数。

## 内置对象

_wes_具有_WSH (JScript)_没有的_built-in objects_ 。

### _require_

使用_require_导入模块。 _wes_自动猜测模块文件的编码，但如果你没有猜对，你可以用第二个参数指定编码。

此外， `require('WScript.Shell')`作为_OLE_甚至_require_导入是可能的。

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

### 模块和module.exports

如果要将其定义为模块，请将其分配给`module.exports` 。

```javascript
function add (a, b) {
    return a + b
}

module.exports = add
```

### _console_

_wes_使用_console_而不是`WScript.Echo`和`WScript.StdErr.WriteLine` 。

将字符打印到`console.log`的命令行。它还支持格式化字符串。使用格式化运算符`%`打印格式化字符串。

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

_wes_为了输出一个用`WScript.StdOut.WriteLine`着色的字符串来代替，使用`WScript.StdErr.WriteLine` 。 `WScript.Echo`和`WScript.StdOut.WriteLine`被阻止输出，所以使用`WScript.StdOut.WriteLine`或`console.log` 。

### _Buffer_

可以处理缓冲区。

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```

### `__dirname`和`__filename`

`__filename`包含当前运行的模块文件的路径。 `__dirname` `__filename` `__dirname`的目录。

```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```

## 内置模块

_wes_具有_built-in modules_来简化和标准化基本处理。

### _ansi_

`ansi`有一个_ANSI escape code_ ，允许您更改标准输出的颜色和效果。颜色和效果可能因所使用的控制台应用程序的类型和设置而异。

```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```

您还可以使用`ansi.color()`和`ansi.bgColor()`创建自己的颜色。所述参数使用_RGB_如`255, 165, 0`或_color code_如`'#FFA500'` 。您不能使用诸如`orange`类的_color name_ 。

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

### _argv_

获取命令行参数。 `cscript.exe`的命令行参数`/`声明了一个名为论据，但_wes_在`-`和`--`在声明命名参数。

_argv.unnamed_和_argv.named_将命令行参数的值类型转换为_String_ _Number_ _Boolean_ 。

输入命令行参数和_REPL_ 。

```shell
wes REPL aaa -bcd eee --fgh=iii jjj --kln mmm
```

在_REPL_运行以下脚本。

```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```

### _pathname_

操作路径。

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

### _filesystem_

操作文件和目录。 `readTextFileSync`自动猜测并读取文件的编码。

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```

### _JScript_

如果您将脚本引擎更改为_Chakra_ ，您将无法使用_JScript_特定的_Enumerator_等。内置模块_JScript_使它们可用。但是， _Enumerator_返回的是_Array_而不是 Enumerator 对象。

```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```

_GetObject_作为`WScript.GetObject`的替代品。

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

_VBScript_提供了一些_JScript_没有的功能。

```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```

### _httprequest_

_httprequest_发出_http request_ 。

```javascript
const request = require('httprequest')
const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log('%O', JSON.parse(content))
```

### _minitest_

_minitest_可以编写简单的测试。

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

_pipe_简化管道加工

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

确定脚本的类型。

```javascript
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```

## 模块捆绑和安装

_install_ ，您可以安装该模块_wes_上发布_github_ 。您将需要_github repository_来发布模块。此外，存储库名称和本地目录名称必须相同。

### _bundle_

将模块发布到_github_ ， _bundle_捆绑所需的模块并将其更改为可由_install_模块导入的格式。

出于安全原因， _wes_不会以可以直接执行的格式导入模块，因此使用_bundle_模块创建一个_.json_文件。

捆绑模块有一些条件。

1.  在一个_repository_只能发布一种类型的模块。
2.  _github_仓库名称和本地工作目录名称必须相同。
3.  如果要将模块发布给第三方，存储库必须是公开的。
4.  _wes_不会静态地解释脚本。在某些条件下`require`模块，例如`if`语句，可能不会捆绑。
5.  _.json_文件将在您的工作目录中创建，名为_directory_name.json_ 。如果重命名文件或移动文件，则无法安装它。
6.  `node_modules/directory_name`绑定失败，因为它引用了`directory_name.json` 。

### _install_

用于安装_github_发布的_wes_的模块文件。

## 用法

传递参数以`@author/repository`格式_install_

```shell
wes install @wachaon/fmt
```

_install_有选项

| 命名         | 简称   | 描述                    |
| ---------- | ---- | --------------------- |
| `--bare`   | `-b` | 不要创建_@author_文件夹      |
| `--global` | `-g` | 将模块安装在_wes.js_所在的文件夹中 |

`--bare`选项可以省略从`author@repository`到`repository`的`require`参数。 `--global`选项使已安装的模块可用于所有脚本。上述选项必须作为同时指定_wes_安全选项`--unsafe`或`--dangerous` 。

```shell
wes install @wachaon/fmt --bare --unsafe
```

# 安装私有仓库模块

_install_不仅可以安装在_github_公共存储库模块上，还可以安装在私有存储库上。

_install_ ，使用`author@repository`指定模块。该实现下载以下内容。

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```

使用浏览器访问私有仓库的_raw_时，会显示_token_ ，所以复制_token_使用即可。

您还可以通过在_token_的_token_内在命令行上运行模块来将模块安装在私有存储库_token_ 。

```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

## 外部模块

下面是一些外部模块。

### _@wachaon/fmt_

_@wachaon/fmt_是一组_prettier_的脚本格式。此外，如果安装了_@wachaon/fmt_时出现`SyntaxError` ，您可以指出错误位置。

#### 安装

```shell
wes install @wachaon/fmt
```

#### 用法

如果工作目录中有_.prettierrc_ （JSON 格式），它会反映在设置中。 _fmt_可以与_CLI_ （命令行界面）和_fmt_ _module_一起使用。

用作_CLI_

```shell
wes @wachaon/fmt src/sample --write
```

| 无名号码 | 描述             |
| ---- | -------------- |
| 0    | ---            |
| 1    | 必需的。要格式化的文件的路径 |

| 命名        | 简称   | 描述   |
| --------- | ---- | ---- |
| `--write` | `-w` | 允许覆盖 |

如果指定了`--write`或`-w`的命名参数，则使用格式化脚本覆盖文件。

#### 作为_module_

#### `option`

```javascript
{
    parser: 'babel',
    plugins: [babel]
}
```
