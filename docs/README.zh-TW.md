# *WES*


*wes*是一個用於在控制台的*WSH (Windows Script Host)*上執行*ECMAScript*的框架。


*README*文件的原文是[*japanese*](/README.md) 。除了日語，它是機器翻譯的句子。  
請從以下選擇其他語言的句子。


+  [*簡体字*](/docs/README.zh-CN.md) <!-- 中国語 (簡体字) -->
+  [*繁体字*](/docs/README.zh-TW.md) <!-- 中国語 (繁体字) -->
+  [*English*](/docs/README.en.md) <!-- 英語 -->
+  [*हिन्दी*](/docs/README.hi.md) <!-- ヒンディー語 -->
+  [*Español*](/docs/README.es.md) <!-- スペイン語 -->
+  [*عربى*](/docs/README.ar.md) <!-- アラビア語 -->
+  [*বাংলা*](/docs/README.bn.md) <!-- ベンガル語 -->
+  [*Português*](/docs/README.pt.md) <!-- ポルトガル語 -->
+  [*русский язык*](/docs/README.ru.md) <!-- ロシア語 -->
+  [*Deutsch*](/docs/README.de.md) <!-- ドイツ語 -->
+  [*français*](/docs/README.fr.md) <!-- フランス語 -->
+  [*italiano*](/docs/README.it.md) <!-- イタリア語 -->



# 特徵


-   您可以將腳本引擎更改為*Chakra* ，並將其寫入*ECMAScript2015*規範。
-   它始終運行 32 位*cscript.exe* ，因此在 64 位環境中沒有任何固有問題。
-   使用模塊化系統，您可以比傳統*WSH*更高效地開發
-   內置模塊支持文件輸入/輸出、彩色字符輸出到控制台等基本處理。
-   您不必擔心編碼，因為您可以讓文件讀取自動猜測編碼。
-   我們還打包模塊以支持外部發布和檢索。


# 我們*wes*已知問題


-   `WScript.Quit`不能中斷程序並且不返回錯誤代碼
-   無法進行`setTimeout`和`Promise`等異步處理
-   不能使用`WScript.CreateObject`的第二個參數*event prefix*


# 安裝


*wes.js* *wes* 。要下載，請從[*@wachaon/wes*](https://github.com/wachaon/wes) wes 複製*wes.js*或在控制台中運行以下命令。


```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```


*WScript.Shell*在運行時使用來自*wes*的`SendKeys`作為實現。如果*wes.js*保存目錄的路徑中包含*ascii*以外的字符， `SendKeys`將無法正確發送密鑰，腳本將無法執行。  
請僅配置*wes.js*的保存目標路徑*ascii* 。


# 如何使用


在控制台中，指定`wes`之後將作為程序起點的文件。腳本擴展名*.js*可以省略。


```shell
wes index
```


而且*wes*有一個*REPL* ，所以如果你只用`wes`啟動它，你可以直接進入腳本。


```shell
wes
```


腳本將被接受，直到您輸入兩個空行。您還可以使用*REPL*檢查*README.md*中示例腳本的執行情況。


## 控制台選項


*wes*的啟動選項如下。


| 命名為                | 描述                   |
| ------------------ | -------------------- |
| `--monotone`       | 消除*ANSI escape code* |
| `--safe`           | 在安全模式下運行腳本           |
| `--usual`          | 以正常模式運行腳本（默認）        |
| `--unsafe`         | 在不安全模式下運行腳本          |
| `--dangerous`      | 以危險模式運行腳本            |
| `--debug`          | 在調試模式下運行腳本           |
| `--encoding=UTF-8` | 指定要讀取的第一個文件的編碼       |
| `--engine=Chakra`  | 此選項由*wes*自動添加        |


`--safe` `--usual` `--unsafe` `--dangerous` `--debug`的實現是不完整的，但命名參數是保留的。


# 模塊化系統


*wes*支持使用通用`require()`的*commonjs module*系統和使用`import`的*es module*系統。 （ *dynamic import*為異步處理，不支持）


## *commonjs module*


通過分配給`module.exports`並使用`require()`調用來管理模塊。為方便起見，它還支持*node_modules*目錄。


*wes* `require()`會自動猜測模塊文件的編碼，但是如果沒有猜測正確，可以用第二個參數指定編碼。


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


您也可以像*require* `require('WScript.Shell')`一樣使用 require 導入*OLE* 。


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


## *es module*


腳本的執行引擎*Chakra*解釋了諸如`imoprt`之類的語法，但由於未定義`cscript`的處理方法，因此無法按原樣執行。在*wes*中，通過將*babel*添加到內置模塊中，我們在執行它的同時按順序轉譯到*es module* 。結果，處理開銷和*wes.js*文件作為成本而膨脹。


*es module*模塊描述的模塊也被轉譯為`require()` ，因此可以調用*OLE* 。但是，它不支持模塊文件編碼規範。都是通過自動猜測讀取的。


要將其作為*es module*加載，請將擴展名設置為`.mjs`或將`package.json`的`"type"`字段設置為`"module"` 。


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


# 內置對象


*wes*具有*WSH (JScript)*所沒有*built-in objects* 。


## *console*


`WScript.Echo`使用*console*而不是*wes*或`WScript.StdErr.WriteLine` 。


在`console.log`中將字符打印到控制台。它還支持格式化字符串。使用格式化運算符`%`打印格式化字符串。


```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```


`WScript.StdOut.WriteLine` *wes* `WScript.StdErr.WriteLine`來輸出彩色字符串。 `WScript.Echo`和`WScript.StdOut.WriteLine`被阻止輸出。 `WScript.StdErr.WriteLine`或`console.log` 。


## *Buffer*


可以處理緩衝區。


```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```


## `__dirname`和`__filename`


`__filename`包含當前運行的模塊文件的路徑。 `__dirname`包含`__filename`的目錄。


```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```


# 內置模塊


*wes*有*built-in modules*來簡化和標準化基本處理。


## *ansi*


`ansi`是一個*ANSI escape code* ，允許您更改標準輸出的顏色和效果。顏色和效果可能會因使用的控制台應用程序的類型和設置而異。


```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```


您還可以使用`ansi.color()`和`ansi.bgColor()`創建自己的顏色。該參數使用*RGB* `255, 165, 0`例如 255、165、0 或*color code* ，例如`'#FFA500'` 。它不支持諸如`orange`之類的*color name* 。


```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```


## *argv*


獲取控制台參數。 `cscript.exe`的控制台參數使用`/`聲明命名參數`--`而*wes*使用`-`和 - 聲明命名參數。


*argv.unnamed*和*argv.named*將控制台參數的值類型轉換為*String* *Number* *Boolean*之一。


輸入控制台參數和*REPL* 。


```shell
wes REPL aaa -bcd eee --fgh=iii jjj --kln mmm
```


在*REPL*中運行以下腳本。


```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```


## *pathname*


操作路徑。


以`/`和`\`開頭的路徑通常是指相對於驅動器根目錄的路徑。例如， `/filename`和`C:/filename`可能在同一路徑上。出於安全原因， `wes`將以`/`和`\`開頭的路徑解釋為相對於工作目錄。


```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```


## *filesystem*


操作文件和目錄。 `readTextFileSync`自動猜測並讀取文件的編碼。


```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```


## *chardet*


我正在使用<https://github.com/runk/node-chardet>的一些功能。


您可以通過增加特定於編碼的字符來提高自動猜測的準確性。


## *JScript*


如果您將腳本引擎更改為*Chakra* ，您將無法使用*JScript*特定的*Enumerator*等。內置模塊*JScript*使它們可用。但是， *Enumerator*返回一個*Array*而不是*Enumerator object* 。


```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```


*GetObject*作為`WScript.GetObject`的替代品。


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


*VBScript*提供了一些*JScript*沒有的特性。


```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```


## *httprequest*


*httprequest*發出一個*http request* 。


```javascript
const request = require('httprequest')
const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log('%O', JSON.parse(content))
```


## *minitest*


*minitest*可以編寫簡單的測試。


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


*pipe*簡化了管道處理。


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


確定腳本的類型。


```javascript
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```


## *zip*


壓縮文件和文件夾並解壓縮壓縮文件。它在內部調用*PowerShell*並對其進行處理。


```javascript
const {zip, unzip} = require('zip')

console.log(zip('docs\\*', 'dox.zip'))
console.log(unzip('dox.zip'))
```


通配符`*`可以寫在`zip(path, destinationPath)` `path`路徑中。


它可以與*CLI* （控制台界面）和*module*一起使用。


```shell
wes zip docs\* dox.zip
wes zip -p dox.zip
```


如果`path`有擴展名`.zip` ，則處理`unzip()`並且沒有擴展名`.zip`的描述。或者即使有`.zip`擴展名，如果有通配符`*`的描述，也會處理`zip()` 。


| 未命名 | 描述               |
| --- | ---------------- |
| `1` | `path`要輸入的文件夾或文件 |
| `2` | 文件夾文件輸出`dest`    |


| 命名為      | 簡稱   | 描述               |
| -------- | ---- | ---------------- |
| `--path` | `-p` | `path`要輸入的文件夾或文件 |
| `--dest` | `-d` | 文件夾文件輸出`dest`    |


# 模塊捆綁和安裝


在*wes*中，由幾個模塊組成的捆綁包稱為*package* 。您可以安裝在*github*上發布的*wes* *package* 。您將需要一個*github repository*來發布*package* 。此外，存儲庫名稱和本地目錄名稱必須相同。


## *bundle*


在*github*上發布*package*時， *bundle*會捆綁所需的模塊並將它們更改為可以通過安裝導入的格式。


出於安全原因， *bundle*會創建一個*.json*文件，因為*wes*不允許我們以可以直接執行的格式導入*package* 。


包裝有一些條件。


1.  一個*repository*中只能發布一種類型的模塊。
2.  *github*上的倉庫名和本地工作目錄名必須一致。
3.  發布包時，存儲庫的狀態必須是*public*的。
4.  *wes*動態解釋模塊路徑。在`if`語句等特定條件下`require`獲取的模塊可能不會被捆綁。
5.  *.json*文件將在您的工作目錄中創建，名稱為*directory_name.json* 。如果文件被重命名或文件被移動，則無法安裝。
6.  `node_modules/directory_name`時，捆綁失敗，因為它引用了`directory_name.json` 。


## *install*


用於安裝*github*上發布的*wes* *package* 。


### 如何使用


以`@author/repository`格式傳遞參數以進行*install* 。


```shell
wes install @wachaon/fmt
```


*install*有選項。


| 命名為        | 簡稱   | 描述                   |
| ---------- | ---- | -------------------- |
| `--bare`   | `-b` | 不要創建*@author*文件夾     |
| `--global` | `-g` | 在*wes.js*所在的文件夾中安裝模塊 |


`--bare`選項可以省略從`author@repository`到`repository`的`require`參數。 `--global`選項使已安裝的模塊可用於所有腳本。上述選項必須與*wes*安全選項`--unsafe`或`--dangerous` 。


```shell
wes install @wachaon/fmt --bare --unsafe
```


# 在私有存儲庫中安裝包


*install*不僅可以安裝在*github*上公共存儲庫的模塊中，還可以安裝在私有存儲庫中。


在*install*中，使用`author@repository`指定模塊。實現下載以下內容。


```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```


當您使用瀏覽器訪問私有存儲庫的*raw*文件時，將顯示*token* ，因此請複制*token*並使用它。


您還可以通過在*token*的生命週期內在控制台中運行模塊來將模塊安裝到私有存儲庫中。


```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```


# 包裝介紹


這是一些外部模塊。


## *@wachaon/fmt*


*@wachaon/fmt*捆綁*prettier*並格式化腳本。此外，如果安裝了`SyntaxError` *@wachaon/fmt*並出現語法錯誤，則可以指示錯誤位置。


### 安裝


```shell
wes install @wachaon/fmt
```


### 用法


如果工作目錄中有*.prettierrc* （JSON 格式），會反映在設置中。 *fmt*可以與*CLI* （控制台界面）和*module*一起使用。


用作*CLI* 。


```shell
wes @wachaon/fmt src/sample --write
```


| 無名號碼 | 描述             |
| ---- | -------------- |
| 0    | ――――           |
| 1    | 必需的。要格式化的文件的路徑 |


| 命名為       | 簡稱   | 描述   |
| --------- | ---- | ---- |
| `--write` | `-w` | 允許覆蓋 |


如果指定`--write`或`-w`的命名參數，則使用格式化腳本覆蓋文件。


### 用作*module*時


### `option`


```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')

const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```


## `@wachaon/edge`


*Internet Explorer*將於 2022/6/15 完成支持。結果，無法使用`require('InternetExplorer.Application')`操作應用程序。


另一種方法是通過*web driver*運行*Microsoft Edge based on Chromium* 。 `@wachaon/edge`簡化了*Edge*自動駕駛儀。


### 安裝


首先，安裝模塊。


```shell
wes install @wachaon/edge --unsafe --bare
```


然後下載*web driver* 。


```shell
wes edge
```


解壓縮下載的*zip*並將*msedgedriver.exe*移動到您的工作目錄。


### 用法


這將很容易使用。


```javascript
const edge = require('./index')

edge((window, navi, res) => {
    window.rect({x: 1 ,y: 1, width: 1200, height: 500})
    window.navigate('http://www.google.com')
    res.exports = []

    navi.on(/./, (url) => {
        console.log('URL: %O', url)
        res.exports.push(url)
    })
})
```


此腳本將按順序將訪問的*URL*輸出到控制台。


`@wachaon/edge`為*URL*註冊一個事件並將數據添加到`res.exports` 。要註冊的*URL*可以是`String` `RegExp` ，可以進行靈活的設置。


通過使其成為事件驅動，可以通過不為自動駕駛難以處理的流程設置*URL*來輕鬆切換到手動操作。


如果要停止腳本，請運行`navi.emit('terminate', res)`或手動終止*Edge* 。


終止進程將`res.exports`輸出為*.json*文件作為默認值。如果要設置終止過程，設置`edge(callback, terminate)` `terminate`
