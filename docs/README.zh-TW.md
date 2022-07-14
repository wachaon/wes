# *WES*

*wes*是一個在*WSH (Windows Script Host)*上運行*ECMAScript*的控制台框架。 *README*文件的原文是[*japanese*](/README.md) 。除了日語，它是機器翻譯的句子。  
請從以下選擇其他語言的句子。

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

-   您可以將腳本引擎更改為*Chakra* ，並將其寫入*ECMAScript2015*規範中
-   它始終運行 32 位*cscript.exe* ，因此在 64 位環境中沒有任何固有問題。
-   使用模塊化系統，您可以比傳統*WSH*更高效地開發
-   內置模塊支持文件輸入/輸出、彩色字符輸出到控制台等基本處理。
-   您不必擔心編碼，因為您可以讓文件讀取自動猜測編碼。
-   我們還打包模塊以支持外部發布和檢索。

# 我們*wes*已知問題

-   `WScript.Quit`不能中斷程序並且不返回錯誤代碼
-   無法進行`setTimeout`和`Promise`等異步處理
-   您不能將*event prefix*用作`WScript.CreateObject`的第二個參數

# 下載

*wes.js* *wes* 。要下載，請從[*@wachaon/wes*](https://github.com/wachaon/wes) wes 複製*wes.js*或在控制台中運行以下命令。

```bat
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

*WScript.Shell*在運行時使用*wes*中的`SendKeys`作為實現。如果*wes.js*保存目錄的路徑中包含*ascii*以外的字符， `SendKeys`將無法正確發送密鑰，腳本將無法執行。  
請僅配置*wes.js*的保存目標路徑*ascii* 。如果您已經下載了*wes* ，您可以使用以下命令對其進行更新。

```bat
wes update
```

# 如何使用

向控制台輸入命令，該命令在`wes`關鍵字之後指定將成為程序起點的文件。腳本擴展名*.js*可以省略。

```bat
wes index
```

而且*wes*有一個*REP* ，所以如果你只用`wes`啟動它，你可以直接進入腳本。

```bat
wes
```

*REP*接受腳本輸入，直到您輸入兩個空行。您還可以使用*REP*檢查*README.md*中示例腳本的執行情況。

## 命令行選項

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

*wes*支持兩個模塊系統，一個使用`require()`的*commonjs module*系統和一個使用`import`的*es module* 。 （ *dynamic import*為異步處理，不支持）

## *commonjs module*

通過分配給`module.exports`並使用`require()`調用來管理模塊。對於以`./`和`../`開頭的絕對路徑和相對路徑以外的路徑，請在*wes_modules*目錄中查找模塊，為方便起見，請在*node_modules*目錄中查找。 *wes* `require()`會自動猜測模塊文件的編碼，但如果沒有猜測正確，可以用第二個參數指定編碼。

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

您還可以使用*require* `require('WScript.Shell')`導入*ActiveX* 。

```javascript
const Shell = require('Shell.Application')
Shell.MinimizeAll()
WScript.Sleep(2000)
Shell.UndoMinimizeAll()
```

## *es module*

腳本的執行引擎*Chakra*解釋了諸如`imoprt`之類的語法，但由於未定義`cscript`的處理方法，因此無法按原樣執行。在*wes*中，通過將*babel*添加到內置模塊中，我們在執行它的同時按順序轉譯到*es module* 。結果，處理開銷和*wes.js*文件作為成本而膨脹。 *es module*模塊描述的模塊也被轉譯為`require()` ，因此*ActiveX*調用是可能的。但是，它不支持*es module*中模塊文件的編碼規範。都是通過自動猜測讀取的。要將其作為*es module*加載，請將擴展名設置為`.mjs`或將`package.json`的`"type"`字段設置為`"module"` 。

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

*wes*使用*console*而不是`WScript.Echo`或`WScript.StdErr.WriteLine` 。在`console.log`中將字符打印到控制台。它還支持格式化字符串。使用格式化運算符`%`打印格式化字符串。

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

| 格式說明符 | 描述                               |
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
| `%o`  | 對象轉儲                             |
| `%O`  | 對象轉儲（縮進彩色）                       |

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
const { redBright, yellow } = require('ansi')
const message = 'File does not exist'
console.log(redBright + 'Error: ' + yellow + message)
```

您還可以使用`ansi.color()`和`ansi.bgColor()`創建自己的顏色。該參數使用*RGB* `255, 165, 0`例如 255、165、0 或*color code* ，例如`'#FFA500'` 。它不支持諸如`orange`之類的*color name* 。

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

## *argv*

獲取命令行參數。 `cscript.exe`中的命令行參數用`/` *wes*命名參數`--`而我們用`-`和 - 聲明命名參數。 *argv.unnamed*和*argv.named*將命令行參數的值類型轉換為*String* *Number* *Boolean*之一。與*REP*一起輸入命令行參數。

```bat
wes REP aaa -bcd eee --fgh=iii jjj --kln mmm
```

在*REP*中運行以下腳本。

```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```

## *pathname*

操作路徑。以`/`和`\`開頭的路徑通常是指相對於驅動器根目錄的路徑。例如， `/filename`和`C:/filename`可能具有相同的路徑。出於安全原因， `wes`將以`/`和`\`開頭的路徑解釋為相對於工作目錄。

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

## *filesystem*

操作文件和目錄。 `readTextFileSync`自動猜測文件的編碼並讀取它。

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```

## *chardet*

我正在使用<https://github.com/runk/node-chardet>的一些功能。您可以通過增加特定於編碼的字符來提高自動猜測的準確性。

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

*httprequest* *http request*發出一個http請求。

```javascript
const request = require('httprequest')
const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log('%O', JSON.parse(content))
```

## *minitest*

*minitest*可以編寫簡單的測試。語法簡單，斷言少 回到`0.10.71`版本的基本概念，我們將斷言類型的數量減少到三種。

### 用法

用`describe`分組，用`it`編寫測試，用`assert`驗證。 `pass`是`it`的出現次數和通過次數的數組。

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

### 斷言

#### `assert(value, message)` `assert.ok(value, message)`

將`true`與完全相等運算符`===`進行比較。如果`value`是一個函數，則評估執行該函數的結果。

| 參數        | 類型         | 描述     |
| :-------- | :--------- | :----- |
| `value`   | \`{函數      | 布爾} \` |
| `message` | `{String}` | 失敗時的消息 |

#### `assert.equal(expected, actual)`

通過其成員是否等價而不是通過引用來比較對象。  
NaN `true` `NaN === NaN` `function (){} === function (){}` `/RegExp/g === /RegExp/g` and `{one: {two: 2}} === {one: {two: 2}}` `[1,2,3] === [1,2,3]`等也成立。  
比較類（對象）時，相同的構造函數或`actual`必須是`expected`的超類。

| 參數         | 類型      | 描述   |
| :--------- | :------ | :--- |
| `expected` | `{Any}` | 期望值  |
| `actual`   | `{Any}` | 實際價值 |

#### `assert.throws(value, expected, message)`

驗證錯誤是否正確拋出。  
錯誤是否正確取決於它是否是預期錯誤的*constructor* ，或者*message*是否等效並且正則表達式通過*stack*評估。

| 參數         | 類型         | 描述     |
| :--------- | :--------- | :----- |
| `value`    | `{Error}`  | 錯誤     |
| `expected` | \`{錯誤      | 細繩     |
| `message`  | `{String}` | 失敗時的消息 |

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

確定腳本的類型。

```javascript
const { isString, isNumber, isBoolean, isObject } = require('typecheck')
const log = require('log')
log(() => isString("ECMAScript"))
log(() => isNumber(43.5))
log(() => isBoolean(false))
log(() => isObject(function(){}))
```

## *zip*

壓縮文件和文件夾並解壓縮壓縮文件。它在內部調用*PowerShell*並對其進行處理。

```javascript
const {zip, unzip} = require('zip')
console.log(zip('docs\\*', 'dox.zip'))
console.log(unzip('dox.zip'))
```

通配符`*`可以寫在`zip(path, destinationPath)` `path`路徑中。它可以與*CLI (Command Line Interface)*和*module*一起使用。

```bat
wes zip docs\* dox.zip
wes zip -p dox.zip
```

如果`path`具有擴展名`.zip` ，則處理`unzip()`並且沒有擴展名`.zip`的描述。或者即使有`.zip`擴展名，如果有通配符`*`的描述，也會處理`zip()` 。

| 未命名 | 描述               |
| --- | ---------------- |
| `1` | `path`要輸入的文件夾或文件 |
| `2` | 文件夾文件輸出`dest`    |

| 命名為      | 簡稱   | 描述               |
| -------- | ---- | ---------------- |
| `--path` | `-p` | `path`要輸入的文件夾或文件 |
| `--dest` | `-d` | 文件夾文件輸出`dest`    |

# 模塊捆綁和安裝

在*wes*中，幾個模塊的捆綁稱為一個包。您可以安裝在*github*上發布的*wes*軟件包。您將需要一個*github repository*來發布包。此外，存儲庫名稱和本地目錄名稱必須相同。

## *bundle*

將包發佈到*github*時， *bundle*會捆綁所需的模塊並更改格式，以便可以通過安裝導入。出於安全原因， *bundle*會創建一個*.json*文件，因為*wes*不允許您以可以直接執行的格式導入包。包裝有一些條件。

1.  一個*repository*只能發布一個包

2.  確保*github*上的倉庫名稱和​​本地工作目錄名稱相同。

3.  如果您發布包，請將存儲庫*public*

4.  在頂層範圍內聲明模塊獲取

5.  包*.json*文件在您的工作目錄中創建，名稱為*directory_name.json* 。如果重命名文件或移動文件，安裝時無法引用。

6.  `node_modules/directory_name`是 bundle 的起點

    ```bat
        wes bundle directory_name
    ```

    不捆綁

    ```bat
        wes bundle node_modules/directory_name
    ```

    請捆綁

## *install*

用於安裝*github*上發布的*wes*包。從`version 0.10.28` ，安裝文件夾將從`node_modules`更改為`wes_modules` 。如果要安裝到`node_modules` ，請添加`--node`選項。

### 如何使用

以`@author/repository`格式傳遞參數以進行*install* 。

```bat
wes install @wachaon/fmt
```

*install*有選項。

| 命名為           | 簡稱   | 描述                                            |
| ------------- | ---- | --------------------------------------------- |
| `--bare`      | `-b` | 不要創建*@author*文件夾                              |
| `--global`    | `-g` | 將包安裝到*wes.js*所在的文件夾中                          |
| `--save`      | `-S` | 將包名稱和版本添加到*package.json*的*dependencies*項字段中   |
| `--save--dev` | `-D` | 將包名稱和版本添加到*package.json*中的*devDependencies*字段 |
| `--node`      | `-n` | 安裝在*node_module*文件夾中                          |

`--bare`選項可以省略從`author@repository`到`repository`的`require`參數。 `--global`選項使已安裝的軟件包可用於所有腳本。 `--node`或`-n`選項必須與*wes*安全選項`--unsafe`或`--dangerous` 。

```bat
wes install @wachaon/fmt --bare --unsafe
```

# 在私有存儲庫中安裝包

*install*可以將包安裝在私有存儲庫中，也可以將包安裝在*github*上的公共存儲庫中。在*install*中，使用*@author/repository*指定包。該實現將嘗試下載以下 url。

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```

當您使用瀏覽器訪問私有倉庫的*raw*時，將顯示*token* ，因此請複制*token*並使用它。您還可以通過在*token*的生命週期內在控制台中運行它們來將包安裝到私有存儲庫中。

```bat
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

# 包裝介紹

這是一些外部軟件包。

## *@wachaon/fmt*

@ *wes* *@wachaon/fmt*是為*prettier*打包並格式化腳本的一個更漂亮的工具。此外，如果在安裝*@wachaon/fmt*時出現*Syntax Error* ，您可以指出錯誤位置。

### 安裝

```bat
wes install @wachaon/fmt
```

### 如何使用

如果工作目錄中有*.prettierrc* （JSON 格式），會反映在設置中。 *fmt*可以與*CLI*和*module*一起使用。

#### 用作*CLI* 。

```bat
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

#### 作為模塊使用

```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')
const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```

## *@wachaon/edge*

*Internet Explorer*將於 2022/6/15 完成支持。因此，預計將無法使用`require('InternetExplorer.Application')`操作應用程序。另一種方法是通過*web driver*運行*Microsoft Edge based on Chromium* 。 `@wachaon/edge`簡化了*Edge*自動駕駛儀。

### 安裝

首先，安裝軟件包。

```bat
wes install @wachaon/edge --unsafe --bare
```

然後下載*web driver* 。

```bat
wes edge --download
```

檢查安裝的*Edge*版本並下載相應的*web driver* 。

### 如何使用

這將很容易使用。

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

此腳本將按順序將訪問的*URL*輸出到控制台。 `@wachaon/edge`為*URL*註冊一個事件並將數據添加到`res.exports` 。要註冊的*URL*可以是`String` `RegExp` ，可以進行靈活的設置。通過使其成為事件驅動，可以通過不設置自動駕駛難以處理的處理事件來輕鬆切換到手動操作。如果要停止腳本，請運行`navi.emit('terminate', res)`或手動終止*Edge* 。終止進程將`res.exports`輸出為*.json*文件作為默認值。如果要設置終止過程，設置`edge(callback, terminate)` `terminate` `window`不是瀏覽器中的`window` ，而是*@wachaon/webdriver*的*Window*類的一個實例。

## *@wachaon/webdriver*

它是一個向操作瀏覽器的*web driver*發送請求的包。內置在*@wachaon/edge*中。與*@wachaon/edge*一樣，瀏覽器操作需要*web driver* 。

### 安裝

```bat
wes install @wachaon/webdriver --unsafe --bare
```

如果您沒有基於*Chromium*的*Microsoft Edge* *web driver* ，請下載它。另外，如果*edge*版本和*web driver*版本不同，請下載相同版本的*web driver* 。

```bat
wes webdriver --download
```
