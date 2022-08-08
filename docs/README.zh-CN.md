# *WES*


*wes*是一个控制台框架，用于在*WSH (Windows Script Host)*上运行*ECMAScript* 。 *README*文件的[*japanese*](/README.md)将是日文。日语以外的文本将被机器翻译。  
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


-   您可以将脚本引擎更改为*Chakra*并根据*ECMAScript2015*规范编写。
-   由于始终执行 32 位*cscript.exe* ，因此在 64 位环境中没有唯一问题。
-   由于有一个模块系统，它可以比传统的*WSH*更有效地开发
-   内置模块支持基本处理，例如文件输入/输出和彩色文本输出到控制台
-   您可以让文件读取自动猜测编码，因此您不必担心编码等。
-   打包模块以支持外部发布和检索


# 我们无法解决的*wes*问题


-   `WScript.Quit`不能中止程序并且不返回错误代码
-   无法进行`setTimeout`和`Promise`等异步处理
-   您不能使用`WScript.CreateObject`的第二个参数的*event prefix*


# 下载


*wes.js* *wes* 。要下载，请从[*@wachaon/wes*](https://github.com/wachaon/wes) wes 复制*wes.js*或在控制台中运行以下命令。


```bat
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```


我们在运行时*WScript.Shell* *wes* `SendKeys`作为实现。如果*wes.js*保存目录的路径中包含*ascii*以外的字符，则`SendKeys`无法正确发送密钥，脚本无法执行。  
配置*wes.js*仅存储在*ascii*中的路径。如果您已经下载了*wes* ，您可以使用以下命令对其进行更新。


```bat
wes update
```


# 用法


输入`wes`关键字和指定将成为控制台程序起点的文件的命令。脚本扩展名*.js*可以省略。


```bat
wes index
```


此外，由于*wes*配备了*REP* ，因此您可以通过单独启动`wes`直接输入脚本。


```bat
wes
```


*REP*接受脚本输入，直到您输入两个空行。您还可以看到*REP*在*README.md*中运行示例脚本。


## 命令行选项


*wes*启动选项如下。


| 命名为                | 描述                   |
| ------------------ | -------------------- |
| `--monotone`       | 消除*ANSI escape code* |
| `--safe`           | 以安全模式运行脚本            |
| `--usual`          | 以正常模式运行脚本（默认）        |
| `--unsafe`         | 在不安全模式下运行脚本          |
| `--dangerous`      | 以危险模式运行脚本            |
| `--debug`          | 在调试模式下运行脚本           |
| `--encoding=UTF-8` | 指定读取的第一个文件的编码        |
| `--engine=Chakra`  | 此选项由*wes*自动添加        |


`--safe` `--usual` `--unsafe` `--dangerous` `--debug`的实现不完整，但保留了命名参数。


# 模块系统


*wes*支持两种模块系统，使用`require()`的*commonjs module*系统和使用`import`的*es module*系统。 （不支持*dynamic import* ，因为它是一个异步过程）


## *commonjs module*


通过分配给`module.exports`并调用`require()`来管理模块。以`./`和`../`开头的绝对路径和相对路径以外的路径在*wes_modules*目录和*node_modules*目录中查找模块。 *wes*的`require()`会自动猜测模块文件的编码，但如果没有正确猜测，您可以使用第二个参数指定编码。


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


此外，还可以使用*require* `require('WScript.Shell')`类的*COM Object*导入。


```javascript
const Shell = require('Shell.Application')
Shell.MinimizeAll()
WScript.Sleep(2000)
Shell.UndoMinimizeAll()
```


## *es module*


脚本执行引擎*Chakra*解释了诸如`imoprt`之类的语法，但由于未定义`cscript`的处理方法，因此无法按原样执行。在*wes*中，通过在内置模块中添加*babel* ， *es module*也在被一个一个转译的同时执行。这会花费我们处理开销和臃肿的*wes.js*文件。用*es module*模块写的模块也通过转译转换成`require()` ，所以可以调用*COM Object* 。但是，它不支持使用*es module*指定模块文件的编码。一切都是自动加载的。要将其作为*es module*加载，请将扩展名设置为`.mjs`或将`package.json`中的`"type"`字段设置为`"module"` 。


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


`WScript.Echo`使用*console*而不是*wes*和`WScript.StdErr.WriteLine` 。使用`console.log`将字符输出到控制台。它还支持格式化字符串。使用`%`格式化运算符输出格式化字符串。


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


`WScript.StdOut.WriteLine` *wes* `WScript.StdErr.WriteLine`来输出彩色字符串。 `WScript.Echo`和`WScript.StdOut.WriteLine`被阻止。 `WScript.StdErr.WriteLine`或`console.log` 。


## *Buffer*


您可以处理缓冲区。


```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```


## `__dirname`和`__filename`


`__filename`存储当前执行的模块文件的路径。 `__dirname`包含`__filename`的目录。


```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```


# 内置模块


*wes*有*built-in modules*来简化和标准化基本处理。


## *ansi*


`ansi`是*ANSI escape code* ，可以更改标准输出颜色和效果。颜色和效果可能因使用的控制台应用程序的类型和设置而异。


```javascript
const { redBright, yellow } = require('ansi')
const message = 'File does not exist'
console.log(redBright + 'Error: ' + yellow + message)
```


您还可以使用`ansi.color()`和`ansi.bgColor()`创建自己的颜色。参数使用*RGB* （例如`255, 165, 0` ）和*color code* （例如`'#FFA500'` 。不支持`orange`等*color name* 。


```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```


## *argv*


获取命令行参数。 `cscript.exe`的命令行参数用`/`声明命名参数，而*wes*用`-`和`--`声明命名参数。 *argv.unnamed*和*argv.named*命令行参数值类型转换为*String* *Number* *Boolean* 。使用*REP*输入命令行参数。


```bat
wes REP aaa -bcd eee --fgh=iii jjj --kln mmm
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


操纵路径。以`/`和`\`开头的路径通常相对于驱动器根目录。例如`/filename`和`C:/filename`可以是相同的路径。出于安全原因， `wes`解释以`/`和`\`开头的相对于工作目录的路径。


```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```


## *filesystem*


操作文件和目录。 `readTextFileSync`自动猜测文件的编码并读取它。


```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```


## *chardet*


我正在使用<https://github.com/runk/node-chardet>的一些功能。您可以通过增加特定于编码的字符来提高自动猜测的准确性。


## *JScript*


如果您将脚本引擎更改为*Chakra* ，您将无法使用*JScript*特定的*Enumerator*等。内置模块*JScript*使它们可用。但是， *Enumerator*返回一个*Array* ，而不是*Enumerator object* 。


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


*httprequest*发出一个*http request* 。


```javascript
const request = require('httprequest')
const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log('%O', JSON.parse(content))
```


## *minitest*


*minitest*可以编写简单的测试。从`0.10.71`版本开始，我们回到了基本概念，将断言的类型减少到 3 种。


### 用法


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


#### `assert(value, message)` `assert.ok(value, message)`


使用严格相等运算符`===`与`true`进行比较。如果`value`是一个函数，则评估执行该函数的结果。


| 参数        | 类型                    | 描述        |
| :-------- | :-------------------- | :-------- |
| `value`   | `{Function\|Boolean}` | 布尔或布尔返回函数 |
| `message` | `{String}`            | 失败消息      |


#### `assert.equal(expected, actual)`


比较对象的成员相等性，而不是通过引用。  
NaN `true` `NaN === NaN` `function (){} === function (){}` `/RegExp/g === /RegExp/g`或`{one: {two: 2}} === {one: {two: 2}}` `[1,2,3] === [1,2,3]`等等。  
比较类（对象）时，它们必须具有相同的构造函数或`actual` `expected`的超类。


| 参数         | 类型      | 描述   |
| :--------- | :------ | :--- |
| `expected` | `{Any}` | 期望值  |
| `actual`   | `{Any}` | 实际价值 |


#### `assert.throws(value, expected, message)`


验证错误是否正确抛出。  
错误是否正确取决于预期的错误*constructor* 、 *message*是否相等，以及正则表达式是否通过*stack*评估。


| 参数         | 类型                        | 描述                                            |
| :--------- | :------------------------ | :-------------------------------------------- |
| `value`    | `{Error}`                 | 错误                                            |
| `expected` | `{Error\|String\|RegExp}` | 计算预期错误*constructor* 、 *message*或*stack*的正则表达式 |
| `message`  | `{String}`                | 失败消息                                          |


## *pipe*


*pipe*简化了管道。


### 用法


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


确定脚本类型。


### 用法


```javascript
const { isString, isNumber, isBoolean, isObject } = require('typecheck')
const log = require('log')
log(() => isString("ECMAScript"))
log(() => isNumber(43.5))
log(() => isBoolean(false))
log(() => isObject(function(){}))
```


## *task*


一个*task*用于周期性地执行多个进程。


### 用法


如果处理需要很长时间，最好在控制台上显示进度。


```javascript
const Task = require('task')
const task = new Task
const size = 23
let counter = 0

const progress = Task.genProgressIndicator([
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

const indigator = Task.genProgressIndicator(['   ', '.  ', '.. ', '...'])

task.register(() => {
    let prog = counter / size
    if (prog >= 1) {
        prog = 1
        task.stop()
    }

    task.view = console.format(
        '%S %S %S',
        progress(Math.ceil(prog * 20)),
        ('  ' + Math.ceil(prog * 100) + '%').slice(-4),
        prog < 1 ? 'loading' + indigator(counter) : 'finished!'
    )
    counter++
}, 100, Number.MAX_VALUE)
task.run()
```


#### `static genProgressIndicator(animation)`


生成一个函数。


#### `register(callback, interval, conditional)`


注册处理。可以并行注册和处理多个进程。


#### `stop()`


暂停*task* 。


#### `cancel(queue)`


暂停特定进程。


#### `run()`


开始并行处理。


#### `view`


指定打印到控制台的字符。定期切换字符。


## *getMember*


从*ProgID*获取*COM Object*的成员类型和描述。


### 用法


```javascript
const getMember = require('getMember')
const FileSystemObject = 'Scripting.FileSystemObject'
console.log('require("%S") // => %O', FileSystemObject, getMember(FileSystemObject))
```


## *zip*


压缩文件和文件夹并解压缩压缩文件。在内部， *PowerShell*被调用和处理。


### 用法


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


如果`path`具有扩展名`.zip` ，则处理`unzip()` ，并且没有扩展名`.zip`的描述。或者，即使有扩展名`.zip` ，如果有通配符`*`描述，也会处理`zip()` 。


| 未命名 | 描述               |
| --- | ---------------- |
| `1` | `path`要输入的文件夹或文件 |
| `2` | 文件夹文件输出`dest`    |


| 命名为      | 简称   | 描述               |
| -------- | ---- | ---------------- |
| `--path` | `-p` | `path`要输入的文件夹或文件 |
| `--dest` | `-d` | 文件夹文件输出`dest`    |


# 捆绑（打包）和安装模块


在*wes*中，多个模块的捆绑包称为包。您可以安装在*github*上发布的*wes*软件包。发布包需要*github repository* 。此外，存储库名称和本地目录名称必须相同。


## *bundle*


将包发布到*github*时， *bundle*会捆绑必要的模块并将它们更改为可以通过安装包含的格式。出于安全原因， *bundle* *.json* *wes* ，因为我们不允许您直接导入可执行包。包装有一些条件。


1.  一个*repository*只能发布一个包

2.  *github*存储库名称和本地工作目录名称请使用相同的名称

3.  如果要发布包，请*public*存储库

4.  在顶层范围内声明模块的获取

5.  包的*.json*文件在名为*directory_name.json*的工作目录中创建。如果更改文件名或移动文件，则在安装过程中无法引用它。

6.  `node_modules/directory_name`是包的起点

    ```bat
        wes bundle directory_name
    ```

    不捆绑

    ```bat
        wes bundle node_modules/directory_name
    ```

    请捆绑


## *install*


用于安装*github*上发布的*wes*包。从`version 0.10.28` ，安装文件夹从`node_modules`更改为`wes_modules` 。如果要在`node_modules`中安装，请添加`--node`选项。


### 用法


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
| `--node`      | `-n` | 安装在*node_module*文件夹中                          |


`--bare`选项可以省略从`author@repository`到`repository`的`require`参数。 `--global`选项使已安装的软件包可用于所有脚本。 `--node`或`-n`选项必须与*wes*安全选项`--unsafe`或`--dangerous`一起指定。


```bat
wes install @wachaon/fmt --bare --unsafe
```


# 从私有仓库安装包


*install*不仅可以安装来自公共*github*存储库的包，还可以安装来自私有存储库的包。在*install*中，使用*@author/repository*指定包。该实现尝试下载以下网址。


```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```


如果您使用浏览器访问*raw*存储库，则会显示*token* ，因此请复制*token*并使用它。您还可以通过在*token*有效时在控制台中运行来从私有存储库安装包。


```bat
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```


# 包装介绍


这是一些外部软件包。


## *@wachaon/fmt*


*@wachaon/fmt* *prettier*地打包为*wes*格式化脚本。此外，如果在安装*@wachaon/fmt*时出现*Syntax Error* ，您可以显示错误的位置。


### 安装


```bat
wes install @wachaon/fmt
```


### 用法


如果工作目录中有*.prettierrc* （JSON 格式），它会反映在设置中。 *fmt*在*CLI*和*module*中都可用。


#### 用作*CLI* 。


```bat
wes @wachaon/fmt src/sample --write
```


| 无名号码 | 描述             |
| ---- | -------------- |
| 0    | -              |
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


*Internet Explorer*将于 2022 年 6 月 15 日终止支持。与此同时，预计使用`require('InternetExplorer.Application')`应用程序操作也将变得不可能。另一种方法是通过*web driver*使用*Microsoft Edge based on Chromium* 。 `@wachaon/edge`简化了*Edge*自动驾驶仪。


### 安装


首先安装软件包。


```bat
wes install @wachaon/edge --unsafe --bare
```


然后下载*web driver* 。


```bat
wes edge --download
```


检查安装的*Edge*版本并下载相应的*web driver* 。


### 用法


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


此脚本按顺序将访问的*URL*打印到控制台。 `@wachaon/edge`为*URL*注册事件并将数据添加到`res.exports` 。要注册的*URL*可以是`String` `RegExp` ，可以灵活设置。通过使其事件驱动，您可以通过不为自动驾驶难以处理的流程设置事件来轻松切换到手动操作。如果您希望脚本停止， `navi.emit('terminate', res)`或手动终止*Edge* 。 Finalization 默认将`res.exports`输出为*.json*文件。如果要设置`terminate`处理，请设置`edge(callback, terminate)`的终止。 `window`是*@wachaon/webdriver*的*Window*类的实例，而不是浏览器的`window` 。


## *@wachaon/webdriver*


它将是一个向操作浏览器的*web driver*发送请求的包。内置*@wachaon/edge* 。与*@wachaon/edge* ，浏览器操作需要单独的*web driver* 。


### 安装


```bat
wes install @wachaon/webdriver --unsafe --bare
```


如果没有，请下载基于*Chromium*的*Microsoft Edge* *web driver* 。另外，如果*edge*版本和*web driver*版本不同，请下载相同版本的*web driver* 。


```bat
wes webdriver --download
```
