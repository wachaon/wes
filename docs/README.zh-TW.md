# *WES*

*wes*是一個控制台框架，用於在*WSH (Windows Script Host)*上運行*ECMAScript* 。 *README*文件的[*japanese*](/README.md)將是日文。日語以外的文本將被機器翻譯。\
對於其他語言的文本，請從以下選項中進行選擇。

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

# 特徵

*   您可以將腳本引擎更改為*Chakra*並根據*ECMAScript2015*規範編寫。
*   由於總是執行 32 位*cscript.exe* ，因此在 64 位環境中沒有獨特的問題。
*   由於有模塊系統，因此可以比傳統的*WSH*更高效地開發
*   內置模塊支持基本處理，例如文件輸入/輸出和彩色文本輸出到控制台
*   您可以讓文件讀取自動猜測編碼，因此您不必擔心編碼等。
*   打包模塊以支持外部發布和檢索

# 我們無法解決的*wes*問題

*   `WScript.Quit`不能中止程序並且不返回錯誤代碼
*   異步處理無法正常工作
*   您不能使用`WScript.CreateObject`的第二個參數的*event prefix*

# 下載

*wes.js* *wes* 。要下載，請從[*@wachaon/wes*](https://github.com/wachaon/wes)複製*wes.js*或在控制台中運行以下命令。

     bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js

我們在運行時*WScript.Shell* *wes* `SendKeys`作為實現。如果*wes.js*保存目錄的路徑中包含*ascii*以外的字符，則`SendKeys`無法正確發送密鑰，腳本無法執行。\
配置*wes.js*僅存儲在*ascii*中的路徑。如果您已經下載了*wes* ，您可以使用以下命令對其進行更新。

     wes update

# 用法

輸入`wes`關鍵字和指定將成為控制台程序起點的文件的命令。腳本擴展名*.js*可以省略。

     wes index

此外，由於*wes*配備了*REP* ，您可以通過單獨啟動`wes`直接輸入腳本。

     wes

*REP*接受腳本輸入，直到您輸入兩個空行。您還可以在*README.md*中看到*REP*運行示例腳本。

## 命令行選項

*wes*啟動選項如下。

| 命名為                | 描述                          |
| ------------------ | --------------------------- |
| `--monotone`       | 消除*ANSI escape code*        |
| `--transpile`      | 始終使用*babel-standalone*轉換和運行 |
| `--debug`          | 在調試模式下運行腳本                  |
| `--encoding=UTF-8` | 指定讀取的第一個文件的編碼               |
| `--engine=Chakra`  | 此選項由*wes*自動添加               |

# 模塊系統

*wes*支持兩個模塊系統，使用`require()`的*commonjs module*系統和使用`import`的*es module*系統。 （不支持*dynamic import* ，因為它是一個異步過程）

## *commonjs module*

通過分配給`module.exports`並調用`require()`來管理模塊。絕對路徑和以`./`和`../`開頭的相對路徑以外的路徑在*wes\_modules*目錄中查找模塊，並且方便地在*node\_modules*目錄中查找。 *wes*的`require()`會自動猜測模塊文件的編碼，但如果猜測不正確，您可以使用第二個參數指定編碼。

     // ./add.js function add (a, b) { return ab } module.exports = add

<!---->

     // ./main.js const add = require('./add') console.log('add(7, 3) // => %O', add(7, 3))

此外，還可以使用*require* `require('WScript.Shell')`類的*COM Object*導入。

     const Shell = require('Shell.Application') Shell.MinimizeAll() WScript.Sleep(2000) Shell.UndoMinimizeAll()

## *es module*

腳本執行引擎*Chakra*解釋了諸如`imoprt`之類的語法，但由於未定義`cscript`的處理方法，因此無法按原樣執行。在*wes*中，通過在內置模塊中添加*babel* ， *es module*也在被一個一個轉譯的同時執行。這會花費我們處理開銷和臃腫的*wes.js*文件。 *es module*中寫的模塊也通過轉譯轉換為`require()` ，因此可以調用*COM Object* 。但是，它不支持使用*es module*指定模塊文件的編碼。一切都是自動加載的。要將其加載為*es module* ，請將擴展名設置為`.mjs`或將`package.json`中的`"type"`字段設置為`"module"` 。

     // ./sub.mjs export default function sub (a, b) { return a - b }

<!---->

     // ./main2.js import sub from './sub.mjs' console.log('sub(7, 3) // => %O', sub(7, 3))

# 內置對象

*wes*有*WSH (JScript)*中沒有的*built-in objects* 。

undefined

## *Buffer*

您可以處理緩衝區。

     const content = 'Hello World' const buff = Buffer.from(content) console.log(`${content} %O`, buff)

## `__dirname`和`__filename`

`__filename`存儲當前執行的模塊文件的路徑。 `__dirname`包含`__filename`的目錄。

     console.log('dirname: %O\nfilename: %O', __dirname, __filename)

## *setTimeout* *setInterval* *setImmediate* *Promise*

由於*wes*是用於同步處理的執行環境，因此*setTimeout* *setInterval* *setImmediate* *Promise*不起到異步處理的作用，但它的實現是為了支持假設*Promise*實現的模塊。

     const example = () => { const promise = new Promise((resolve, reject) => { console.log('promise') setTimeout(() => { console.log('setTimeout') resolve('resolved'); }, 2000); }).then((val) => { console.log(val) }); console.log('sub') }; console.log('start') example(); console.log('end')

# 內置模塊

*wes*有*built-in modules*來簡化和標準化基本處理。

## *ansi*

`ansi`是*ANSI escape code* ，可以更改標準輸出顏色和效果。顏色和效果可能因使用的控制台應用程序的類型和設置而異。

     const { redBright, yellow } = require('ansi') const message = 'File does not exist' console.log(redBright 'Error: ' yellow message)

您還可以使用`ansi.color()`和`ansi.bgColor()`創建自己的顏色。參數使用*RGB* （例如`255, 165, 0` ）和*color code* （例如`'#FFA500'` 。不支持`orange`等*color name* 。

     const { color } = require('ansi') const orange = color(255, 165, 0) console.log(orange 'Hello World')

## *argv*

獲取命令行參數。 `cscript.exe`的命令行參數用`/`聲明命名參數，而*wes*用`-`和`--`聲明命名參數。 *argv.unnamed*和*argv.named*命令行參數值類型轉換為*String* *Number* *Boolean* 。使用*REP*輸入命令行參數。

     wes REP aaa -bcd eee --fgh=iii jjj --kln mmm

在*REP*上運行以下腳本。

     const argv = require('argv') console.log(`argv: %O argv.unnamed: %O argv.named: %O`, argv, argv.unnamed, argv.named)

## *pathname*

操縱路徑。以`/`和`\`開頭的路徑通常相對於驅動器根目錄。例如`/filename`和`C:/filename`可以是相同的路徑。出於安全原因， `wes`解釋以`/`和`\`開頭的相對於工作目錄的路徑。

     const path = require('pathname') const file = path.resolve(__dirname, 'index.js') console.log('file %O', file)

## *filesystem*

操作文件和目錄。 `readTextFileSync`自動猜測文件的編碼並讀取它。

     const fs = require('filesystem') const path = require('pathname') const readme = path.resolve(__dirname, 'README.md') const contents = fs.readTextFileSync(readme) console.log(contents)

## *chardet*

我正在使用<https://github.com/runk/node-chardet>的一些功能。您可以通過增加特定於編碼的字符來提高自動猜測的準確性。

## *JScript*

如果您將腳本引擎更改為*Chakra* ，您將無法使用*JScript*特定的*Enumerator*等。內置模塊*JScript*使它們可用。但是， *Enumerator*返回一個*Array* ，而不是*Enumerator object* 。

     const { Enumerator, ActiveXObject } = require('JScript') const FSO = new ActiveXObject('Scripting.FileSystemObject') const dir = FSO.getFolder(__dirname).Files const files = new Enumerator(dir) files.forEach(file => console.log(file.Name))

*GetObject*作為`WScript.GetObject`的替代品。

     const { GetObject, Enumerator } = require('JScript') const ServiceSet = GetObject("winmgmts:{impersonationLevel=impersonate}").InstancesOf("Win32_Service") new Enumerator(ServiceSet).forEach(service => console.log( 'Name: %O\nDescription: %O\n', service.Name, service.Description ))

## *VBScript*

*VBScript*提供了一些*JScript*沒有的功能。

     const { TypeName } = require('VBScript') const FSO = require('Scripting.FileSystemObject') console.log(TypeName(FSO))

## *httprequest*

*httprequest*發出一個*http request* 。

     const request = require('httprequest') const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1') console.log('%O', JSON.parse(content))

undefined

## *pipe*

*pipe*簡化了管道。

### 用法

    const pipe = require('pipe') function add (a, b) { return ba } function sub (a, b) { return b - a } function div (a, b) { return a / b } const add5 = add.bind(null, 5) const sub3 = sub.bind(null, 3) pipe() .use(add5) .use(sub3) .use(div, 4) .process(10, (err, res) => console.log('res: %O', res))

## *typecheck*

確定腳本類型。

### 用法

    const { isString, isNumber, isBoolean, isObject } = require('typecheck') const log = require('log') log(() => isString("ECMAScript")) log(() => isNumber(43.5)) log(() => isBoolean(false)) log(() => isObject(function(){}))

undefined

## *getMember*

從*ProgID*獲取*COM Object*的成員類型和描述。

### 用法

    const getMember = require('getMember') const FileSystemObject = 'Scripting.FileSystemObject' console.log('require("%S") // => %O', FileSystemObject, getMember(FileSystemObject))

## *zip*

壓縮文件和文件夾並解壓縮壓縮文件。在內部， *PowerShell*被調用和處理。

### 用法

    const {zip, unzip} = require('zip') console.log(zip('docs\\*', 'dox.zip')) console.log(unzip('dox.zip'))

通配符`*`可以寫在`zip(path, destinationPath)` `path`路徑中。它可以在*CLI (Command Line Interface)*和*module*中使用。

     wes zip docs\* dox.zip wes zip -p dox.zip

如果`path`具有擴展名`.zip` ，則處理`unzip()` ，並且沒有擴展名`.zip`的描述。或者，即使有擴展名`.zip` ，如果有通配符`*`描述，也會處理`zip()` 。

| 未命名 | 描述               |
| --- | ---------------- |
| `1` | `path`要輸入的文件夾或文件 |
| `2` | 文件夾文件輸出`dest`    |

| 命名為      | 簡稱   | 描述               |
| -------- | ---- | ---------------- |
| `--path` | `-p` | `path`要輸入的文件夾或文件 |
| `--dest` | `-d` | 文件夾文件輸出`dest`    |

# 捆綁（打包）和安裝模塊

在*wes*中，幾個模塊的捆綁稱為一個包。您可以安裝在*github*上發布的*wes*軟件包。發布包需要*github repository* 。

## *bundle*

將包發佈到*github*時， *bundle*會捆綁所需的模塊並創建*bundle.json* 。

1.  一個*repository*只能發布一個包

2.  *package.json*是必需的。至少， `main`字段的描述是必需的。

         { "main": "index.js" }

3.  如果要發布包，請*public*存儲庫

4.  從`version 0.12.0`開始，直接模塊加載到工作目錄之上的目錄的包將不會被捆綁。可以捆綁上層目錄*wes\_modules*或*node\_modules*中的包。

輸入以下命令進行捆綁：請參閱*package.json*以了解要捆綁的內容。

     wes bundle

undefined

# 從私有倉庫安裝包

*install*不僅可以安裝來自公共*github*存儲庫的包，還可以安裝來自私有存儲庫的包。在*install*中，使用*@author/repository*指定包。該實現嘗試下載以下 url。

     `https://raw.githubusercontent.com/${author}/${repository}/master/bundle.json`

如果您使用瀏覽器訪問*raw*存儲庫，則會顯示*token* ，因此請複制*token*並使用它。您還可以通過在*token*有效時在控制台中運行來安裝私有存儲庫中的軟件包。

     wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA

# 包裝介紹

這是一些外部軟件包。

## *@wachaon/fmt*

*@wachaon/fmt* *prettier*地打包為*wes*格式化腳本。此外，如果在安裝*@wachaon/fmt*時出現*Syntax Error* ，您可以指出錯誤的位置。

### 安裝

    wes install @wachaon/fmt

### 用法

如果工作目錄中有*.prettierrc* （JSON 格式），它會反映在設置中。 *fmt*在*CLI*和*module*中都可用。

#### 用作*CLI* 。

     wes @wachaon/fmt src/sample --write

| 無名號碼 | 描述             |
| ---- | -------------- |
| 1    | 必需的。要格式化的文件的路徑 |

| 命名為       | 簡稱   | 描述   |
| --------- | ---- | ---- |
| `--write` | `-w` | 允許覆蓋 |

如果指定了`--write`或`-w`命名參數，則使用格式化腳本覆蓋文件。

#### 作為一個模塊使用

    const fmt = require('@wachaon/fmt') const { readTextFileSync, writeTextFileSync } = require('filesystem') const { join, workingDirectory } = require('pathname') const target = join(workingDirectory, 'index.js') console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
