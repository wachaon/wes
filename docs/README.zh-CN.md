# *WES*


*wes*是一个在*WSH (Windows Script Host)*上运行*ECMAScript*的控制台框架。


*README*文件的原文是[*japanese*](/README.md) 。除了日语，它是机器翻译的句子。  
请从以下选择其他语言的句子。


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


-   您可以将脚本引擎更改为*Chakra* ，并将其写入*ECMAScript2015*规范中
-   它始终运行 32 位*cscript.exe* ，因此在 64 位环境下不存在固有问题。
-   使用模块化系统，您可以比传统*WSH*更高效地开发
-   内置模块支持文件输入/输出、彩色字符输出到控制台等基本处理。
-   您不必担心编码，因为您可以让文件读取自动猜测编码。
-   我们还打包模块以支持外部发布和检索。


# 我们*wes*已知问题


-   `WScript.Quit`不能中断程序并且不返回错误代码
-   无法进行`setTimeout`和`Promise`等异步处理
-   您不能将*event prefix*用作`WScript.CreateObject`的第二个参数


# 安装


*wes.js* *wes* 。要下载，请从[*@wachaon/wes*](https://github.com/wachaon/wes) wes 复制*wes.js*或在控制台中运行以下命令。


```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```


*WScript.Shell*在运行时使用*wes*中的`SendKeys`作为实现。如果*wes.js*保存目录的路径中包含*ascii*以外的字符， `SendKeys`将无法正确发送密钥，脚本将无法执行。  
请仅配置*wes.js*的保存目标路径*ascii* 。


# 如何使用


向控制台输入命令，该命令在`wes`关键字之后指定将成为程序起点的文件。脚本扩展名*.js*可以省略。


```shell
wes index
```


而且*wes*有一个*REPL* ，所以如果你只用`wes`启动它，你可以直接进入脚本。


```shell
wes
```


*REPL*接受脚本输入，直到您输入两个空行。您还可以使用*REPL*检查*README.md*中示例脚本的执行情况。


## 命令行选项


*wes*的启动选项如下。


| 命名为                | 描述                   |
| ------------------ | -------------------- |
| `--monotone`       | 消除*ANSI escape code* |
| `--safe`           | 在安全模式下运行脚本           |
| `--usual`          | 以正常模式运行脚本（默认）        |
| `--unsafe`         | 在不安全模式下运行脚本          |
| `--dangerous`      | 以危险模式运行脚本            |
| `--debug`          | 在调试模式下运行脚本           |
| `--encoding=UTF-8` | 指定要读取的第一个文件的编码       |
| `--engine=Chakra`  | 此选项由*wes*自动添加        |


`--safe` `--usual` `--unsafe` `--dangerous` `--debug`的实现是不完整的，但命名参数是保留的。


# 模块化系统


*wes*支持两个模块系统，一个使用`require()`的*commonjs module*系统和一个使用`import`的*es module* 。 （ *dynamic import*为异步处理，不支持）


## *commonjs module*


通过分配给`module.exports`并使用`require()`调用来管理模块。为方便起见，它还支持*node_modules*目录。


*wes* `require()`会自动猜测模块文件的编码，但是如果没有猜测正确，可以用第二个参数指定编码。


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


您还可以使用*require* `require('WScript.Shell')`导入*ActiveX* 。


```javascript
const Shell = require('Shell.Application')
Shell.MinimizeAll()
WScript.Sleep(2000)
Shell.UndoMinimizeAll()
```


## *es module*


脚本的执行引擎*Chakra*解释了诸如`imoprt`之类的语法，但由于未定义`cscript`的处理方法，因此无法按原样执行。在*wes*中，通过将*babel*添加到内置模块中，它在执行的同时顺序转译到*es module* 。结果，处理开销和*wes.js*文件作为成本而膨胀。


*es module*模块描述的模块也通过transpile转换为`require()` ，所以*ActiveX*调用也是可以的。但是，它不支持*es module*中的模块文件编码规范。都是通过自动猜测读取的。


要将其作为*es module*加载，请将扩展名设置为`.mjs`或将`package.json`的`"type"`字段设置为`"module"` 。


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


*wes*具有*WSH (JScript)*所没有*built-in objects* 。


## *console*


*wes*使用*console*而不是`WScript.Echo`或`WScript.StdErr.WriteLine` 。


在`console.log`中将字符打印到控制台。它还支持格式化字符串。使用格式化运算符`%`打印格式化字符串。


```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```


\|


`WScript.StdOut.WriteLine` *wes* `WScript.StdErr.WriteLine`来输出彩色字符串。 `WScript.Echo`和`WScript.StdOut.WriteLine`被阻止输出。 `WScript.StdErr.WriteLine`或`console.log` 。


## *Buffer*


可以处理缓冲区。


```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```


## `__dirname`和`__filename`


`__filename`包含当前运行的模块文件的路径。 `__dirname`包含`__filename`的目录。


```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```


# 内置模块


*wes*有*built-in modules*来简化和标准化基本处理。


## *ansi*


`ansi`是一个*ANSI escape code* ，允许您更改标准输出的颜色和效果。颜色和效果可能会因使用的控制台应用程序的类型和设置而异。


```javascript
const { redBright, yellow } = require('ansi')
const message = 'File does not exist'
console.log(redBright + 'Error: ' + yellow + message)
```


您还可以使用`ansi.color()`和`ansi.bgColor()`创建自己的颜色。该参数使用*RGB* `255, 165, 0`例如 255、165、0 或*color code* ，例如`'#FFA500'` 。它不支持诸如`orange`之类的*color name* 。


```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```


## *argv*


获取命令行参数。 `cscript.exe`中的命令行参数用`/` *wes*命名参数`--`而我们用`-`和 - 声明命名参数。


*argv.unnamed*和*argv.named*将命令行参数的值类型转换为*String* *Number* *Boolean*之一。


与*REPL*一起输入命令行参数。


```shell
wes REPL aaa -bcd eee --fgh=iii jjj --kln mmm
```


在*REPL*中运行以下脚本。


```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```


## *pathname*


操作路径。


以`/`和`\`开头的路径通常是指相对于驱动器根目录的路径。例如， `/filename`和`C:/filename`可能具有相同的路径。出于安全原因， `wes`将以`/`和`\`开头的路径解释为相对于工作目录。


```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```


## *filesystem*


操作文件和目录。 `readTextFileSync`自动猜测并读取文件的编码。


```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```


## *chardet*


我正在使用<https://github.com/runk/node-chardet>的一些功能。


您可以通过增加特定于编码的字符来提高自动猜测的准确性。


## *JScript*


如果您将脚本引擎更改为*Chakra* ，您将无法使用*JScript*特定的*Enumerator*等。内置模块*JScript*使它们可用。但是， *Enumerator*返回一个*Array*而不是*Enumerator object* 。


```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```


*GetObject*作为`WScript.GetObject`的替代品。


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


*VBScript*提供了一些*JScript*没有的特性。


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


*minitest*可以编写简单的测试。


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


*pipe*简化了管道处理。


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


确定脚本的类型。


```javascript
const { isString, isNumber, isBoolean, isObject } = require('typecheck')
const log = require('log')

log(() => isString("ECMAScript"))
log(() => isNumber(43.5))
log(() => isBoolean(false))
log(() => isObject(function(){}))
```


## *zip*


压缩文件和文件夹并解压缩压缩文件。它在内部调用*PowerShell*并对其进行处理。


```javascript
const {zip, unzip} = require('zip')

console.log(zip('docs\\*', 'dox.zip'))
console.log(unzip('dox.zip'))
```


通配符`*`可以写在`zip(path, destinationPath)` `path`路径中。


它可以与*CLI (Command Line Interface)*和*module*一起使用。


```shell
wes zip docs\* dox.zip
wes zip -p dox.zip
```


如果`path`有扩展名`.zip` ，则处理`unzip()`并且没有扩展名`.zip`的描述。或者即使有`.zip`扩展名，如果有通配符`*`的描述，也会处理`zip()` 。


| 未命名 | 描述               |
| --- | ---------------- |
| `1` | `path`要输入的文件夹或文件 |
| `2` | 文件夹文件输出`dest`    |


| 命名为      | 简称   | 描述               |
| -------- | ---- | ---------------- |
| `--path` | `-p` | `path`要输入的文件夹或文件 |
| `--dest` | `-d` | 文件夹文件输出`dest`    |


# 模块捆绑和安装


在*wes*中，多个模块的捆绑包称为包。您可以安装在*github*上发布的*wes*软件包。您将需要一个*github repository*来发布包。此外，存储库名称和本地目录名称必须相同。


## *bundle*


将包发布到*github*时， *bundle*会捆绑所需的模块并更改格式，以便可以通过安装导入。


出于安全原因， *bundle*会创建一个*.json*文件，因为*wes*不允许您以可以直接执行的格式导入包。


包装有一些条件。


1.  一个*repository*只能发布一个模块

2.  确保*github*上的仓库名称和本地工作目录名称相同。

3.  如果您发布包，请*public*存储库

4.  在顶层范围内声明模块获取

5.  包*.json*文件在您的工作目录中创建，名称为*directory_name.json* 。如果重命名文件或移动文件，安装时无法引用。

6.  `node_modules/directory_name`是 bundle 的起点

    ```shell
        wes bundle directory_name
    ```

    不捆绑

    ```shell
        wes bundle node_modules/directory_name
    ```

    请捆绑


## *install*


用于安装*github*上发布的*wes*包。


### 如何使用


以`@author/repository`格式传递参数以进行*install* 。


```shell
wes install @wachaon/fmt
```


*install*有选项。


| 命名为        | 简称   | 描述                   |
| ---------- | ---- | -------------------- |
| `--bare`   | `-b` | 不要创建*@author*文件夹     |
| `--global` | `-g` | 在*wes.js*所在的文件夹中安装模块 |


`--bare`选项可以省略从`author@repository`到`repository`的`require`参数。 `--global`选项使已安装的模块可用于所有脚本。上述选项必须与*wes*安全选项`--unsafe`或`--dangerous` 。


```shell
wes install @wachaon/fmt --bare --unsafe
```


# 在私有存储库中安装包


*install*不仅可以在*github*上的公共存储库中安装模块，还可以在私有存储库中安装模块。


在*install*中，使用*@author/repository*指定模块。该实现将尝试下载以下 url。


```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```


当您使用浏览器访问私有仓库的*raw*时，将显示*token* ，因此请复制*token*并使用它。


您还可以通过在*token*的生命周期内在控制台中运行模块来将模块安装到私有存储库中。


```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```


# 包装介绍


这是一些外部模块。


## *@wachaon/fmt*


@ *wes* *@wachaon/fmt*是为*prettier*打包并格式化脚本的一个更漂亮的工具。此外，如果在安装*@wachaon/fmt*时出现*Syntax Error* ，您可以指出错误位置。


### 安装


```shell
wes install @wachaon/fmt
```


### 如何使用


如果工作目录中有*.prettierrc* （JSON 格式），会反映在设置中。 *fmt*可以与*CLI*和*module*一起使用。


#### 用作*CLI* 。


```shell
wes @wachaon/fmt src/sample --write
```


| 无名号码 | 描述             |
| ---- | -------------- |
| 0    | ――――           |
| 1    | 必需的。要格式化的文件的路径 |


| 命名为       | 简称   | 描述   |
| --------- | ---- | ---- |
| `--write` | `-w` | 允许覆盖 |


如果指定`--write`或`-w`的命名参数，则使用格式化的脚本覆盖文件。


#### 作为模块使用


```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')

const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```


## *@wachaon/edge*


*Internet Explorer*将于 2022/6/15 完成支持。因此，预计将无法使用`require('InternetExplorer.Application')`操作应用程序。


另一种方法是通过*web driver*运行*Microsoft Edge based on Chromium* 。 `@wachaon/edge`简化了*Edge*自动驾驶仪。


### 安装


首先，安装模块。


```shell
wes install @wachaon/edge --unsafe --bare
```


然后下载*web driver* 。


```shell
wes edge --download
```


检查安装的*Edge*版本并下载相应的*web driver* 。


### 如何使用


这将很容易使用。


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


此脚本将按顺序将访问的*URL*输出到控制台。


`@wachaon/edge`为*URL*注册一个事件并将数据添加到`res.exports` 。要注册的*URL*可以是`String` `RegExp` ，可以进行灵活的设置。


通过使其成为事件驱动，可以通过不设置自动驾驶难以处理的处理事件来轻松切换到手动操作。


如果要停止脚本，请运行`navi.emit('terminate', res)`或手动终止*Edge* 。


终止进程将`res.exports`输出为*.json*文件作为默认值。如果要设置终止过程，设置`edge(callback, terminate)` `terminate`


`window`不是浏览器中的`window` ，而是*@wachaon/webdriver*的*Window*类的一个实例。


## *@wachaon/webdriver*


它是一个向操作浏览器的*web driver*发送请求的模块。内置在*@wachaon/edge*中。与*@wachaon/edge*一样，浏览器操作需要*web driver* 。


### 安装


```shell
wes install @wachaon/webdriver --unsafe --bare
```


如果您没有*web driver* ，请下载它。


```shell
wes webdriver --download
```
