# *WES*


*wes*是一个在*Windows Script Host*上执行*ECMAScript*的框架


*README*的原文是[*japanese*](docs/README.ja.md) 。除了日语，它是一个机器翻译的句子。  
请从以下选择其他语言的句子。


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


# 特征


-   *Chakra*是*Windows Script Host*的脚本引擎，用于运行*ECMAScript2015* *Chakra*
-   由于执行的是 32bit *cscript.exe* ，所以在 64bit 环境下没有具体问题。
-   使用`require`导入模块
-   将彩色字符输出到标准输出
-   自动猜测文件编码


# 未解决的功能


-   `WScript.Quit`不能中断程序并且不返回错误代码
-   异步处理
-   不能使用`WScript.CreateObject`的第二个参数的*event prefix*


# 安装


*wes*需要的是*wes.js*唯一的文件。要下载，请启动命令提示符并输入以下命令。


```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```


*wes*在执行的时候作为实现*WScript.Shell*的`SendKeys`使用。 *wes.js*保存的目录路径包含*ascii*以外的字符，则`SendKeys`将无法正确发送密钥，脚本将无法执行。  
请只配置*wes.js*的保存目标路径*ascii* 。


## 用法


在命令行上，在`wes`之后指定将成为程序起点的文件。脚本扩展名*.js*可以省略。


```shell
wes index
```


另外， *wes*有*REPL*所以如果你只用`wes`启动它，你可以直接输入脚本。


```shell
wes
```


该脚本将被接受，直到您输入两个空行。 *README.md*还可以使用*REPL*检查*README.md*示例脚本的执行情况。


## 命令行命名参数


*wes*的启动选项如下。


| 命名                 | 描述                   |
| ------------------ | -------------------- |
| `--monotone`       | 消除*ANSI escape code* |
| `--safe`           | 在安全模式下运行脚本           |
| `--usual`          | 以正常模式运行脚本（默认）        |
| `--unsafe`         | 在不安全模式下运行脚本          |
| `--dangerous`      | 以危险模式运行脚本            |
| `--debug`          | 在调试模式下运行脚本           |
| `--encoding=UTF-8` | 指定要读取的第一个文件的编码       |
| `--engine=Chakra`  | 这个选项是由*wes*自动添加的     |


`--safe` `--usual` `--unsafe` `--dangerous`的实现不完整，但保留了命名参数。


# 内置对象


*wes*具有*WSH (JScript)*没有的*built-in objects* 。


## *require*


使用*require*导入模块。 *wes*自动猜测模块文件的编码，但如果你没有猜对，你可以用第二个参数指定编码。


此外， `require('WScript.Shell')`作为*OLE*甚至*require*导入是可能的。


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


## `module`和`module.exports`


如果要将其定义为模块，请将其分配给`module.exports` 。


```javascript
function add (a, b) {
    return a + b
}

module.exports = add
```


## *console*


*wes*使用*console*而不是`WScript.Echo`和`WScript.StdErr.WriteLine` 。


将字符打印到`console.log`的命令行。它还支持格式化字符串。使用格式化运算符`%`打印格式化字符串。


```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```


*wes*为了输出一个用`WScript.StdOut.WriteLine`着色的字符串来代替，使用`WScript.StdErr.WriteLine` 。 `WScript.Echo`和`WScript.StdOut.WriteLine`被阻止输出，所以使用`WScript.StdErr.WriteLine`或`console.log` 。


## *Buffer*


可以处理缓冲区。


```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```


## `__dirname`和`__filename`


`__filename`包含当前运行的模块文件的路径。 `__dirname` `__filename` `__dirname`的目录。


```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```


# 内置模块


*wes*具有*built-in modules*来简化和标准化基本处理。


## *ansi*


`ansi`有一个*ANSI escape code* ，允许您更改标准输出的颜色和效果。颜色和效果可能因所使用的控制台应用程序的类型和设置而异。


```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```


您还可以使用`ansi.color()`和`ansi.bgColor()`创建自己的颜色。所述参数使用*RGB*如`255, 165, 0`或*color code*如`'#FFA500'` 。您不能使用诸如`orange`类的*color name* 。


```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```


## *argv*


获取命令行参数。 `cscript.exe`的命令行参数`/`声明了一个名为论据，但*wes*在`-`和`--`在声明命名参数。


*argv.unnamed*和*argv.named*将命令行参数的值类型转换为*String* *Number* *Boolean* 。


输入命令行参数和*REPL* 。


```shell
wes REPL aaa -bcd eee --fgh=iii jjj --kln mmm
```


在*REPL*运行以下脚本。


```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```


## *pathname*


操作路径。


```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```


## *filesystem*


操作文件和目录。 `readTextFileSync`自动猜测文件编码并读取它。


```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```


## *JScript*


如果您将脚本引擎更改为*Chakra* ，您将无法使用*JScript*特定的*Enumerator*等。内置模块*JScript*使它们可用。但是， *Enumerator*返回一个*Array*而不是 Enumerator 对象。


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


*VBScript*提供了一些*JScript*没有的功能。


```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```


## *httprequest*


*httprequest*发出*http request* 。


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


*pipe*简化管道加工


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
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```


# 模块捆绑和安装


*install* ，您可以安装该模块*wes*上发布*github* 。您将需要*github repository*来发布模块。此外，存储库名称和本地目录名称必须相同。


## *bundle*


将模块发布到*github* ， *bundle*捆绑所需的模块并将其更改为可由*install*模块导入的格式。


出于安全原因， *wes*不会以可以直接执行的格式导入模块，因此使用*bundle*模块创建一个*.json*文件。


捆绑模块有一些条件。


1.  在一个*repository*只能发布一种类型的模块。
2.  *github*仓库名称和本地工作目录名称必须相同。
3.  如果要将模块发布给第三方，存储库必须是公开的。
4.  *wes*不会静态地解释脚本。 `require`在特定条件下获取的模块，例如`if`语句可能不捆绑。
5.  *.json*文件将在您的工作目录中创建，名为*directory_name.json* 。如果重命名文件或移动文件，则无法安装它。
6.  `node_modules/directory_name`绑定失败，因为它引用了`directory_name.json` 。


## *install*


用于安装*github*发布的*wes*的模块文件。


### 用法


传递参数以`@author/repository`格式*install*


```shell
wes install @wachaon/fmt
```


*install*有选项


| 命名         | 简称   | 描述                    |
| ---------- | ---- | --------------------- |
| `--bare`   | `-b` | 不要创建*@author*文件夹      |
| `--global` | `-g` | 将模块安装在*wes.js*所在的文件夹中 |


`--bare`选项可以省略从`author@repository`到`repository`的`require`参数。 `--global`选项使已安装的模块可用于所有脚本。上述选项必须作为同时指定*wes*安全选项`--unsafe`或`--dangerous` 。


```shell
wes install @wachaon/fmt --bare --unsafe
```


# 安装私有仓库模块


*install*不仅可以安装在*github*公共存储库模块上，还可以安装在私有存储库上。


*install* ，使用`author@repository`指定模块。该实现下载以下内容。


```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```


使用浏览器访问私有仓库的*raw*时，会显示*token* ，所以复制*token*使用即可。


您还可以通过在*token*的*token*内在命令行上运行模块来将模块安装在私有存储库*token* 。


```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```


# 外部模块


下面是一些外部模块。


## *@wachaon/fmt*


*@wachaon/fmt*是一组*prettier*的脚本格式。此外，如果安装了*@wachaon/fmt*时出现`SyntaxError` ，您可以指出错误位置。


### 安装


```shell
wes install @wachaon/fmt
```


### 用法


如果工作目录中有*.prettierrc* （JSON 格式），它会反映在设置中。 *fmt*可以与*CLI* （命令行界面）和*fmt* *module*一起使用。


用作*CLI*


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


### 作为*module*


### `option`


```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')

const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```
