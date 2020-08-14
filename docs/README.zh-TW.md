# WES

*wes*是在*Windows Script Host*上執行*ECMAScript*的框架

[*japanese*](README.ja.md) *README*原文會。除日語外，它將是機器翻譯的文本。請從下面選擇另一種語言的句子。

-   [*簡体字*](README.zh-CN.md) <!-- 中国語 (簡体字) -->
-   [*繁体字*](README.zh-TW.md) <!-- 中国語 (繁体字) -->
-   [*English*](README.en.md) <!-- 英語 -->
-   [*हिन्दी*](README.hi.md)　<!-- ヒンディー語 -->
-   [*Español*](README.es.md) <!-- スペイン語 -->
-   [*عربى*](README.ar.md) <!-- アラビア語 -->
-   [*বাংলা*](README.bn.md) <!-- ベンガル語 -->
-   [*Português*](README.pt.md) <!-- ポルトガル語 -->
-   [*русский язык*](README.ru.md) <!-- ロシア語 -->
-   [*Deutsch*](README.de.md) <!-- ドイツ語 -->
-   [*français*](README.fr.md) <!-- フランス語 -->
-   [*italiano*](README.it.md)　<!-- イタリア語 -->

## 特徵

-   將腳本引擎更改為*Chakra*並啟用*ECMAScript2015* *Chakra*
-   *cscript.exe* 32位*cscript.exe* ，因此避免了64位環境中的特殊錯誤
-   您可以使用`require`導入模塊
-   彩色字符可以輸出到標準輸出
-   自動猜測文件編碼

## 功能未解決

-   `WScript.Quit`無法中斷程序，並且不返回錯誤代碼
-   異步處理
-   `WScript.CreateObject`的第二個參數的*event prefix*的使用

## 安裝

*wes*需要的只是*wes.js*文件。要下載，請啟動命令提示符並輸入以下命令。

```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

*wes*在運行時使用*WScript.Shell*的`SendKeys` 。 *wes.js*保存*wes.js*的目錄的路徑包含*ascii*以外的字符，則`SendKeys`將無法正確發送它，並且腳本將無法運行。在這種情況下，請配置路徑以僅使用*ascii*保存*wes.js*

## 用法

在命令行中，在`wes`之後指定作為程序起點的文件。腳本擴展名*.js*可以省略。

```shell
wes index
```

另外，由於*wes*具有*REPL* ，您可以通過僅使用`wes`啟動腳本來執行直接在命令行上輸入的腳本。

```shell
wes
```

接受腳本輸入，直到您輸入兩個空白行。 *README.md*還可以使用*REPL*在*README.md*檢查示例腳本的執行情況。

## 命令行命名參數

*wes*下面的命名變量被接受為*wes*啟動選項。

| 命名                 | 描述                   |
| ------------------ | -------------------- |
| `--monotone`       | 消除*ANSI escape code* |
| `--safe`           | 在安全模式下運行腳本           |
| `--usual`          | 在正常模式下運行腳本（默認）       |
| `--unsafe`         | 在不安全模式下運行腳本          |
| `--dangerous`      | 在危險模式下運行腳本           |
| `--debug`          | 在調試模式下運行腳本           |
| `--encoding=UTF-8` | 指定要首先讀取的文件的編碼。       |
| `--engine=Chakra`  | 此選項由*wes*自動添加        |

`--safe` `--usual` `--unsafe` `--dangerous`是不完整的，但是保留了命名參數。

## 內置對象

*wes*具有*JScript*沒有的*built-in objects* 。

### 要求

使用*require*導入模塊。 *wes*自動猜測模塊文件的編碼，但是如果您猜對的不正確，則可以使用第二個參數指定編碼。

您也可以使用*require*的*OLE*導入，例如`require('WScript.Shell')` 。

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

### 模塊和module.exports

如果要將其定義為模塊，則將其替換為`module.exports` 。

```javascript
function add (a, b) {
    return a + b
}

module.exports = add
```

### 安慰

*wes*在`WScript.Echo`和`WScript.StdErr.WriteLine`而不是*console*使用。

您可以使用`console.log`將字符輸出到命令行。它還支持格式化的字符串。您可以使用格式運算符`%`指定格式字符串。

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

*wes*為了輸出彩色串`WScript.StdOut.WriteLine`而是`WScript.StdErr.WriteLine`使用。 `WScript.Echo`和`WScript.StdOut.WriteLine` `WScript.Echo`輸出被阻止，請使用`WScript.StdOut.WriteLine`或`console.log` 。

### 緩衝

可以處理緩衝區。

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```

### **目錄**名**和**文件名

`__filename`存儲當前正在執行的模塊文件的路徑。 `__dirname`存儲`__filename`目錄。

```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```

## 內置模塊

*wes*具有*built-in modules* ，可簡化和標準化基本處理。

### 安西

`ansi`包含*ANSI escape code* ，您可以更改標準輸出的顏色和效果。顏色和效果可能會有所不同，具體取決於所使用的控制台應用程序的類型和設置。

```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```

您還可以使用`ansi.color()`或`ansi.bgColor()`創建自己的顏色。所述參數使用*RGB*如`255, 165, 0`或*color code*如`'#FFA500'`您不能使用`orange`等*color name* 。

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

### 精油

獲取命令行參數。 `cscript.exe`的命令行參數`/`聲明了一個名為論據，但*wes*在`-`和`--`在聲明命名參數。

*argv.unnamed*和*argv.named*將命令行參數的值類型*argv.named*轉換為*String* *Number* *Boolean* 。

使用*REPL*輸入命令行參數。

```shell
wes REPL aaa -bcd eee --fgh=iii jjj --kln mmm
```

在*REPL*運行以下腳本。

```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```

### 路徑名

操作路徑。

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

### 文件系統

操作文件和目錄。 `readTextFileSync`將猜測文件編碼並讀取它。

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```

### 腳本

如果將腳本引擎更改為*Chakra* ，則將無法使用特定於*JScript* *Enumerator* 。內置模塊*JScript*使它們可用。但是， *Enumerator*返回一個*Array*而不是一個Enumerator對象。

```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```

*GetObject*替代`WScript.GetObject` 。

```javascript
const { GetObject, Enumerator } = require('JScript')

const ServiceSet = GetObject("winmgmts:{impersonationLevel=impersonate}").InstancesOf("Win32_Service")
new Enumerator(ServiceSet).forEach(service => console.log(
    'Name: %O\nDescription: %O\n',
    service.Name,
    service.Description
))
```

### VB腳本

*VBScript*提供了*JScript*不具備的某些功能。

```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```

### httprequest

*httprequest*是它的名稱， *http request*將發出一個。

```javascript
const request = require('httprequest')
const content = request('GET', 'http://weather.livedoor.com/forecast/webservice/json/v1?city=130010')
console.log('%O', JSON.parse(content))
```

### 最小測試

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

### 管

*pipe*簡化了管道處理

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

### 類型檢查

判斷腳本的類型。

```javascript
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```

## 模塊捆綁和安裝

*install* ，您可以安裝該模塊*wes*上發布*github* 。要發布模塊，您需要*github repository* 。另外，存儲庫名稱和本地目錄名稱必須相同。

### 束

將模塊發佈到*github* ， *bundle*包捆綁必要的模塊並將其更改為*install*模塊可以包含的格式。

考慮到安全性， *wes*不會導入，可直接執行的模塊，所以建立*.json*文件*bundle*模塊。

捆綁模塊有一些條件。

1.  在一個*repository*只能發布一種模塊。
2.  *github*存儲庫名稱和本地工作目錄名稱必須相同。
3.  如果要將模塊發布給第三方，則存儲庫必須是公共的。
4.  *wes*不會靜態地解釋腳本，因此僅在某些條件下（例如`if`語句可能未捆綁）才`require`模塊。
5.  *.json*文件將在工作目錄中創建，名稱為*directory_name.json* 。如果更改文件名或移動文件，則無法安裝。
6.  `node_modules/directory_name` ，綁定失敗，因為它引用`directory_name.json` 。

### 安裝

它用於為*github*發布的*wes*安裝模塊文件。

## 用法

傳遞參數以`@author/repository`格式*install*

```shell
wes install @wachaon/fmt
```

*install*有選項

| 命名         | 簡稱   | 描述                    |
| ---------- | ---- | --------------------- |
| `--bare`   | `-b` | 不要創建*@author*文件夾      |
| `--global` | `-g` | 將模塊安裝在*wes.js*所在的文件夾中 |

`--bare`選項可以省略`author@repository`到`repository`的`require`參數。 `--global`選項使安裝的模塊可用於所有腳本。以上選項必須指定與*wes*安全選項`--unsafe`或`--dangerous` 。

```shell
wes install @wachaon/fmt --bare --unsafe
```

# 安裝私有存儲庫模塊

*install*不僅可以安裝在*github*的公共存儲庫模塊中，還可以安裝在私有存儲庫中。

*install* ，使用`author@repository`指定模塊。該實現下載以下內容。

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```

當您使用瀏覽器訪問私有存儲庫的*raw*時，會顯示*token* ，因此請複制並使用*token* 。

如果在*token*有效時在命令行上運行模塊，則也可以將模塊安裝在專用存儲庫中。

```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

## 外部模塊

在這裡，我們介紹一些外部模塊。

### *@wachaon/fmt*

*@wachaon/fmt*是*@wachaon/fmt* *prettier*格式化腳本的文件。此外，在已安裝`SyntaxError`的狀態下的*@wachaon/fmt*可以在發生錯誤時顯示錯誤位置。

#### 安裝

```shell
wes install @wachaon/fmt
```

#### 用法

如果工作目錄中存在*.prettierrc* （JSON格式），則將其反映在設置中。 *fmt*可以與*CLI* （命令行界面）和*module* 。

用作*CLI*

```shell
wes @wachaon/fmt src/sample --write
```

| 匿名電話 | 描述             |
| ---- | -------------- |
| 0    | --             |
| 1個   | 需要。您要格式化的文件的路徑 |

| 命名        | 簡稱   | 描述   |
| --------- | ---- | ---- |
| `--write` | `-w` | 允許覆蓋 |

如果給定了`--write`或`-w`命名參數，則使用格式化的腳本覆蓋文件。

#### 用作*module*

#### `option`

```javascript
{
    parser: 'babel',
    plugins: [babel]
}
```

#### `format`

| 參數名稱      | 類型       | 描述            |
| --------- | -------- | ------------- |
| `source`  | `string` | 字符串格式         |
| `option?` | `object` | 傳遞給*prettier* |

```javascript
const { format } = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { resolve } = require('pathname')

const spec = resolve(process.cwd(), 'sample.js')
let source = readTextFileSync(spec)
source = format(source)
console.log(writeTextFileSync(spec, source))
```
