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

*   您可以将脚本引擎更改为*Chakra*并根据*ECMAScript2015*规范编写。
*   由于始终执行 32 位*cscript.exe* ，因此在 64 位环境中没有唯一问题。
*   由于有一个模块系统，它可以比传统的*WSH*更有效地开发
*   内置模块支持基本处理，例如文件输入/输出和彩色文本输出到控制台
*   您可以让文件读取自动猜测编码，因此您不必担心编码等。
*   打包模块以支持外部发布和检索

# 我们无法解决的*wes*问题

*   `WScript.Quit`不能中止程序并且不返回错误代码
*   异步处理无法正常工作
*   您不能使用`WScript.CreateObject`的第二个参数的*event prefix*

# 下载

*wes.js* *wes* 。要下载，请从[*@wachaon/wes*](https://github.com/wachaon/wes)复制*wes.js*或在控制台中运行以下命令。

     bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js

我们在运行时*WScript.Shell* *wes* `SendKeys`作为实现。如果*wes.js*保存目录的路径中包含*ascii*以外的字符，则`SendKeys`无法正确发送密钥，脚本无法执行。\
配置*wes.js*仅存储在*ascii*中的路径。如果您已经下载了*wes* ，您可以使用以下命令对其进行更新。

     wes update

# 用法

输入`wes`关键字和指定将成为控制台程序起点的文件的命令。脚本扩展名*.js*可以省略。

     wes index

此外，由于*wes*配备了*REP* ，因此您可以通过单独启动`wes`直接输入脚本。

     wes

*REP*接受脚本输入，直到您输入两个空行。您还可以在*README.md*中看到*REP*运行示例脚本。

## 命令行选项

*wes*启动选项如下。

| 命名为                | 描述                          |
| ------------------ | --------------------------- |
| `--monotone`       | 消除*ANSI escape code*        |
| `--transpile`      | 始终使用*babel-standalone*转换和运行 |
| `--debug`          | 在调试模式下运行脚本                  |
| `--encoding=UTF-8` | 指定读取的第一个文件的编码               |
| `--engine=Chakra`  | 此选项由*wes*自动添加               |

# 模块系统

*wes*支持两个模块系统，使用`require()`的*commonjs module*系统和使用`import`的*es module*系统。 （不支持*dynamic import* ，因为它是一个异步过程）

## *commonjs module*

通过分配给`module.exports`并调用`require()`来管理模块。以`./`和`../`开头的绝对路径和相对路径以外的路径在*wes\_modules*目录和*node\_modules*目录中查找模块。 *wes*的`require()`会自动猜测模块文件的编码，但如果没有正确猜测，您可以使用第二个参数指定编码。

     // ./add.js function add (a, b) { return ab } module.exports = add

<!---->

     // ./main.js const add = require('./add') console.log('add(7, 3) // => %O', add(7, 3))

此外，还可以使用*require* `require('WScript.Shell')`类的*COM Object*导入。

     const Shell = require('Shell.Application') Shell.MinimizeAll() WScript.Sleep(2000) Shell.UndoMinimizeAll()

## *es module*

*Chakra*是一个脚本执行引擎，可以解释诸如`imoprt`之类的语法，但由于没有定义`cscript`的处理方法，因此无法按原样执行。在*wes*中，通过在内置模块中添加*babel* ， *es module*也在被顺序转译的同时执行。这会花费我们处理开销和臃肿的*wes.js*文件。 *es module*中写的模块也通过转译转换为`require()` ，因此可以调用*COM Object* 。但是，它不支持使用*es module*指定模块文件的编码。一切都是自动加载的。要将其加载为*es module* ，请将扩展名设置为`.mjs`或将`package.json`中的`"type"`字段设置为`"module"` 。

     // ./sub.mjs export default function sub (a, b) { return a - b }

<!---->

     // ./main2.js import sub from './sub.mjs' console.log('sub(7, 3) // => %O', sub(7, 3))

# 内置对象

*wes*有*WSH (JScript)*中没有的*built-in objects* 。

undefined

## *Buffer*

您可以处理缓冲区。

     const content = 'Hello World' const buff = Buffer.from(content) console.log(`${content} %O`, buff)

## `__dirname`和`__filename`

`__filename`存储当前执行的模块文件的路径。 `__dirname`包含`__filename`的目录。

     console.log('dirname: %O\nfilename: %O', __dirname, __filename)

## *setTimeout* *setInterval* *setImmediate* *Promise*

由于*wes*是用于同步处理的执行环境，因此*setTimeout* *setInterval* *setImmediate* *Promise*并不能起到异步处理的作用，但它的实现是为了支持假设*Promise*实现的模块。

     const example = () => { const promise = new Promise((resolve, reject) => { console.log('promise') setTimeout(() => { console.log('setTimeout') resolve('resolved'); }, 2000); }).then((val) => { console.log(val) }); console.log('sub') }; console.log('start') example(); console.log('end')

# 内置模块

*wes*有*built-in modules*来简化和标准化基本处理。

## *ansi*

`ansi`是*ANSI escape code* ，可以更改标准输出颜色和效果。颜色和效果可能因使用的控制台应用程序的类型和设置而异。

     const { redBright, yellow } = require('ansi') const message = 'File does not exist' console.log(redBright 'Error: ' yellow message)

您还可以使用`ansi.color()`和`ansi.bgColor()`创建自己的颜色。参数使用*RGB* （例如`255, 165, 0` ）和*color code* （例如`'#FFA500'` 。不支持`orange`等*color name* 。

     const { color } = require('ansi') const orange = color(255, 165, 0) console.log(orange 'Hello World')

## *argv*

获取命令行参数。 `cscript.exe`的命令行参数用`/`声明命名参数，而*wes*用`-`和`--`声明命名参数。 *argv.unnamed*和*argv.named*命令行参数值类型转换为*String* *Number* *Boolean* 。使用*REP*输入命令行参数。

     wes REP aaa -bcd eee --fgh=iii jjj --kln mmm

在*REP*上运行以下脚本。

     const argv = require('argv') console.log(`argv: %O argv.unnamed: %O argv.named: %O`, argv, argv.unnamed, argv.named)

## *pathname*

操纵路径。以`/`和`\`开头的路径通常相对于驱动器根目录。例如`/filename`和`C:/filename`可以是相同的路径。出于安全原因， `wes`解释以`/`和`\`开头的相对于工作目录的路径。

     const path = require('pathname') const file = path.resolve(__dirname, 'index.js') console.log('file %O', file)

## *filesystem*

操作文件和目录。 `readTextFileSync`自动猜测文件的编码并读取它。

     const fs = require('filesystem') const path = require('pathname') const readme = path.resolve(__dirname, 'README.md') const contents = fs.readTextFileSync(readme) console.log(contents)

## *chardet*

我正在使用<https://github.com/runk/node-chardet>的一些功能。您可以通过增加特定于编码的字符来提高自动猜测的准确性。

## *JScript*

如果您将脚本引擎更改为*Chakra* ，您将无法使用*JScript*特定的*Enumerator*等。内置模块*JScript*使它们可用。但是， *Enumerator*返回一个*Array* ，而不是*Enumerator object* 。

     const { Enumerator, ActiveXObject } = require('JScript') const FSO = new ActiveXObject('Scripting.FileSystemObject') const dir = FSO.getFolder(__dirname).Files const files = new Enumerator(dir) files.forEach(file => console.log(file.Name))

*GetObject*作为`WScript.GetObject`的替代品。

     const { GetObject, Enumerator } = require('JScript') const ServiceSet = GetObject("winmgmts:{impersonationLevel=impersonate}").InstancesOf("Win32_Service") new Enumerator(ServiceSet).forEach(service => console.log( 'Name: %O\nDescription: %O\n', service.Name, service.Description ))

## *VBScript*

*VBScript*提供了一些*JScript*没有的功能。

     const { TypeName } = require('VBScript') const FSO = require('Scripting.FileSystemObject') console.log(TypeName(FSO))

## *httprequest*

*httprequest*发出一个*http request* 。

     const request = require('httprequest') const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1') console.log('%O', JSON.parse(content))

undefined

## *pipe*

*pipe*简化了管道。

### 用法

    const pipe = require('pipe') function add (a, b) { return ba } function sub (a, b) { return b - a } function div (a, b) { return a / b } const add5 = add.bind(null, 5) const sub3 = sub.bind(null, 3) pipe() .use(add5) .use(sub3) .use(div, 4) .process(10, (err, res) => console.log('res: %O', res))

## *typecheck*

确定脚本类型。

### 用法

    const { isString, isNumber, isBoolean, isObject } = require('typecheck') const log = require('log') log(() => isString("ECMAScript")) log(() => isNumber(43.5)) log(() => isBoolean(false)) log(() => isObject(function(){}))

undefined

## *getMember*

从*ProgID*获取*COM Object*的成员类型和描述。

### 用法

    const getMember = require('getMember') const FileSystemObject = 'Scripting.FileSystemObject' console.log('require("%S") // => %O', FileSystemObject, getMember(FileSystemObject))

## *zip*

压缩文件和文件夹并解压缩压缩文件。在内部， *PowerShell*被调用和处理。

### 用法

    const {zip, unzip} = require('zip') console.log(zip('docs\\*', 'dox.zip')) console.log(unzip('dox.zip'))

通配符`*`可以写在`zip(path, destinationPath)` `path`路径中。它可以在*CLI (Command Line Interface)*和*module*中使用。

     wes zip docs\* dox.zip wes zip -p dox.zip

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

在*wes*中，几个模块的捆绑称为一个包。您可以安装在*github*上发布的*wes*软件包。发布包需要*github repository* 。

## *bundle*

将包发布到*github*时， *bundle*会捆绑所需的模块并创建*bundle.json* 。

1.  一个*repository*只能发布一个包

2.  *package.json*是必需的。至少， `main`字段的描述是必需的。

         { "main": "index.js" }

3.  如果要发布包，请*public*存储库

4.  从`version 0.12.0`开始，直接模块加载到工作目录之上的目录的包将不会被捆绑。可以捆绑上层目录*wes\_modules*或*node\_modules*中的包。

输入以下命令进行捆绑：请参阅*package.json*以了解要捆绑的内容。

     wes bundle

undefined

# 从私有仓库安装包

*install*不仅可以安装来自公共*github*存储库的包，还可以安装来自私有存储库的包。在*install*中，使用*@author/repository*指定包。该实现尝试下载以下 url。

     `https://raw.githubusercontent.com/${author}/${repository}/master/bundle.json`

如果您使用浏览器访问*raw*存储库，则会显示*token* ，因此请复制*token*并使用它。您还可以通过在*token*有效时在控制台中运行来安装私有存储库中的软件包。

     wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA

# 包装介绍

这是一些外部软件包。

## *@wachaon/fmt*

*@wachaon/fmt* *prettier*地打包为*wes*格式化脚本。此外，如果在安装*@wachaon/fmt*时出现*Syntax Error* ，您可以指出错误的位置。

### 安装

    wes install @wachaon/fmt

### 用法

如果工作目录中有*.prettierrc* （JSON 格式），它会反映在设置中。 *fmt*在*CLI*和*module*中都可用。

#### 用作*CLI* 。

     wes @wachaon/fmt src/sample --write

| 无名号码 | 描述             |
| ---- | -------------- |
| 1    | 必需的。要格式化的文件的路径 |

| 命名为       | 简称   | 描述   |
| --------- | ---- | ---- |
| `--write` | `-w` | 允许覆盖 |

如果指定了`--write`或`-w`命名参数，则使用格式化脚本覆盖文件。

#### 作为一个模块使用

    const fmt = require('@wachaon/fmt') const { readTextFileSync, writeTextFileSync } = require('filesystem') const { join, workingDirectory } = require('pathname') const target = join(workingDirectory, 'index.js') console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
