# *WES*


*wes*是一個在*Windows Script Host*上執行*ECMAScript*的框架


*README*的原文是[*japanese*](docs/README.ja.md) 。除了日語，它是一個機器翻譯的句子。  
請從以下選擇其他語言的句子。


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



# 特徵


-   *Chakra*是*Windows Script Host*的腳本引擎，用於運行*ECMAScript2015* *Chakra*
-   由於執行的是 32bit *cscript.exe* ，所以沒有特定於 64bit 環境的問題。
-   使用`require`導入模塊
-   將彩色字符輸出到標準輸出
-   自動猜測文件編碼


# 未解決的功能


-   `WScript.Quit`不能中斷程序並且不返回錯誤代碼
-   異步處理
-   不能使用`WScript.CreateObject`的第二個參數*event prefix*


# 安裝


*wes*需要的是*wes.js*唯一的文件。要下載，請啟動命令提示符並輸入以下命令。


```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```


*wes*在執行時作為*WScript.Shell*的`SendKeys`執行使用。 *wes.js*保存的目錄路徑包含*ascii*以外的字符，則`SendKeys`將無法正確發送密鑰，腳本將無法執行。  
請只配置*wes.js*的保存目標路徑*ascii* 。


## 用法


在命令行中，在`wes`之後指定將成為程序起點的文件。腳本擴展名*.js*可以省略。


```shell
wes index
```


另外， *wes*有*REPL*所以如果你只用`wes`啟動它，你可以直接輸入腳本。


```shell
wes
```


腳本將被接受，直到您輸入兩個空行。 *README.md*還可以使用*REPL*檢查*README.md*示例腳本的執行情況。


## 命令行命名參數


*wes*的啟動選項如下。


| 命名                 | 描述                   |
| ------------------ | -------------------- |
| `--monotone`       | 消除*ANSI escape code* |
| `--safe`           | 在安全模式下運行腳本           |
| `--usual`          | 以正常模式運行腳本（默認）        |
| `--unsafe`         | 在不安全模式下運行腳本          |
| `--dangerous`      | 以危險模式運行腳本            |
| `--debug`          | 在調試模式下運行腳本           |
| `--encoding=UTF-8` | 指定要讀取的第一個文件的編碼       |
| `--engine=Chakra`  | 這個選項是由*wes*自動添加的     |


`--safe` `--usual` `--unsafe` `--dangerous`的實現不完整，但保留了命名參數。


# 內置對象


*wes*具有*WSH (JScript)*沒有的*built-in objects* 。


## *require*


使用*require*導入模塊。 *wes*自動猜測模塊文件的編碼，但如果你沒有猜對，你可以用第二個參數指定編碼。


您還可以導入到*OLE*像`require('WScript.Shell')`與*require* 。


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


如果要將其定義為模塊，請將其分配給`module.exports` 。


```javascript
function add (a, b) {
    return a + b
}

module.exports = add
```


## *console*


*wes*在`WScript.Echo`和`WScript.StdErr.WriteLine`代替*console*使用。


將字符打印到`console.log`的命令行。它還支持格式化字符串。使用格式化運算符`%`打印格式化字符串。


```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```


*wes*為了輸出一個用`WScript.StdOut.WriteLine`著色的字符串來代替，使用`WScript.StdErr.WriteLine` 。 `WScript.Echo`和`WScript.StdOut.WriteLine`被阻止輸出，所以使用`WScript.StdErr.WriteLine`或`console.log` 。


## *Buffer*


可以處理緩衝區。


```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```


## `__dirname`和`__filename`


`__filename`包含當前運行的模塊文件的路徑。 `__dirname` `__filename` `__dirname`的目錄。


```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```


# 內置模塊


*wes*具有*built-in modules*來簡化和標準化基本處理。


## *ansi*


`ansi`有一個*ANSI escape code* ，允許您更改標準輸出的顏色和效果。顏色和效果可能因所使用的控制台應用程序的類型和設置而異。


```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```


您還可以使用`ansi.color()`和`ansi.bgColor()`創建自己的顏色。所述參數使用*RGB*如`255, 165, 0`或*color code*如`'#FFA500'`您不能使用諸如`orange` *color name* 。


```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```


## *argv*


獲取命令行參數。 `cscript.exe`的命令行參數`/`聲明了一個名為論據，但*wes*在`-`和`--`在聲明命名參數。


*argv.unnamed*和*argv.named*將命令行參數的值類型轉換為*String* *Number* *Boolean* 。


輸入命令行參數和*REPL* 。


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


## *pathname*


操作路徑。


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


## *JScript*


如果您將腳本引擎更改為*Chakra* ，您將無法使用*JScript*特定的*Enumerator*等。內置模塊*JScript*使它們可用。但是， *Enumerator*返回的是*Array*而不是 Enumerator 對象。


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


*VBScript*提供了一些*JScript*沒有的功能。


```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```


## *httprequest*


*httprequest*顧名思義， *http request*會發出一個。


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


*pipe*簡化了管道加工


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


# 模塊捆綁和安裝


*install* ，您可以安裝該模塊*wes*上發布*github* 。您將需要一個*github repository*來發布模塊。此外，存儲庫名稱和本地目錄名稱必須相同。


## *bundle*


將模塊發佈到*github* ， *bundle*捆綁所需的模塊並將其更改為可由*install*模塊導入的格式。


出於安全考慮， *wes*不會以可以直接執行的格式導入模塊，因此使用*bundle*模塊創建一個*.json*文件。


捆綁模塊有一些條件。


1.  在一個*repository*只能發布一種類型的模塊。
2.  *github*上的倉庫名稱和​​本地工作目錄名稱必須相同。
3.  如果要將模塊發布給第三方，存儲庫必須是公開的。
4.  *wes*不會靜態地解釋腳本。 `require`在特定條件下獲取的模塊，例如`if`語句可能不捆綁。
5.  *.json*文件將在您的工作目錄中創建，名稱為*directory_name.json* 。如果文件被重命名或文件被移動，則無法安裝。
6.  `node_modules/directory_name` ，捆綁失敗，因為它引用`directory_name.json` 。


## *install*


用於安裝*github*發布的*wes*的模塊文件。


### 用法


傳遞參數以`@author/repository`格式*install*


```shell
wes install @wachaon/fmt
```


*install*有選項


| 命名         | 簡稱   | 描述                    |
| ---------- | ---- | --------------------- |
| `--bare`   | `-b` | 不要創建*@author*文件夾      |
| `--global` | `-g` | 將模塊安裝在*wes.js*所在的文件夾中 |


`--bare`選項可以省略從`author@repository`到`repository`的`require`參數。 `--global`選項使已安裝的模塊可用於所有腳本。上述選項必須作為同時指定*wes*安全選項`--unsafe`或`--dangerous` 。


```shell
wes install @wachaon/fmt --bare --unsafe
```


# 安裝私有倉庫模塊


*install*不僅可以安裝在*github*上公共存儲庫的模塊中，還可以安裝在私有存儲庫中。


*install* ，使用`author@repository`指定模塊。該實現下載以下內容。


```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```


使用瀏覽器訪問私有倉庫的*raw*時，會顯示*token* ，所以復制*token*使用即可。


您還可以通過在*token*的*token*內在命令行上運行模塊來將模塊安裝在私有存儲庫*token* 。


```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```


# 外部模塊


這裡有一些外部模塊。


## *@wachaon/fmt*


*@wachaon/fmt*捆綁*prettier*並格式化腳本。此外，如果安裝了*@wachaon/fmt*並且出現`SyntaxError`錯誤，則可以指示錯誤位置。


### 安裝


```shell
wes install @wachaon/fmt
```


### 用法


如果工作目錄中有*.prettierrc* （JSON 格式），它會反映在設置中。 *fmt*可以與*CLI* （命令行界面）和*fmt* *module*一起使用。


用作*CLI*


```shell
wes @wachaon/fmt src/sample --write
```


| 無名號碼 | 描述             |
| ---- | -------------- |
| 0    | ――――           |
| 1    | 必需的。要格式化的文件的路徑 |


| 命名        | 簡稱   | 描述   |
| --------- | ---- | ---- |
| `--write` | `-w` | 允許覆蓋 |


如果指定`--write`或`-w`的命名參數，則使用格式化腳本覆蓋文件。


### 作為*module*


### `option`


```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')

const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```
