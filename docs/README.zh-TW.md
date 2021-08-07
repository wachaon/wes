# _WES_

_wes_是一個在_Windows Script Host_上執行_ECMAScript_的框架

_README_的原文是[_japanese_](README.ja.md) 。除了日語，它是一個機器翻譯的句子。  
請從以下選擇其他語言的句子。

## 特徵

-   將腳本引擎更改為_Chakra_並運行_ECMAScript2015_ _Chakra_
-   _cscript.exe_ 32 位_cscript.exe_並且沒有任何特定於 64 位環境的錯誤
-   使用`require`導入模塊
-   將彩色字符輸出到標準輸出
-   自動猜測文件編碼

## 未解決的功能

-   `WScript.Quit`不能中斷程序並且不返回錯誤代碼
-   異步處理
-   使用`WScript.CreateObject`的第二個參數的_event prefix_

## 安裝

_wes_需要的是_wes.js_唯一的文件。要下載，請啟動命令提示符並輸入以下命令。

```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

_wes_在執行的時候作為實現_WScript.Shell_的`SendKeys`使用。 _wes.js_保存的目錄路徑包含_ascii_以外的字符，則`SendKeys`將無法正確發送密鑰，腳本將無法執行。  
請只配置_wes.js_的保存目標路徑_ascii_ 。

## 用法

在命令行上，在`wes`之後指定將成為程序起點的文件。腳本擴展名_.js_可以省略。

```shell
wes index
```

另外， _wes_有_REPL_所以如果你只用`wes`啟動它，你可以直接輸入腳本。

```shell
wes
```

腳本將被接受，直到您輸入兩個空行。 _README.md_還可以使用_REPL_檢查_README.md_示例腳本的執行情況。

## 命令行命名參數

_wes_的啟動選項如下。

| 命名                 | 描述                   |
| ------------------ | -------------------- |
| `--monotone`       | 消除_ANSI escape code_ |
| `--safe`           | 在安全模式下運行腳本           |
| `--usual`          | 以正常模式運行腳本（默認）        |
| `--unsafe`         | 在不安全模式下運行腳本          |
| `--dangerous`      | 以危險模式運行腳本            |
| `--debug`          | 在調試模式下運行腳本           |
| `--encoding=UTF-8` | 指定要讀取的第一個文件的編碼       |
| `--engine=Chakra`  | 這個選項是由_wes_自動添加的     |

`--safe` `--usual` `--unsafe` `--dangerous`的實現不完整，但保留了命名參數。

## 內置對象

_wes_具有_WSH (JScript)_沒有的_built-in objects_ 。

### _require_

使用_require_導入模塊。 _wes_自動猜測模塊文件的編碼，但如果你沒有猜對，你可以用第二個參數指定編碼。

此外， `require('WScript.Shell')`作為_OLE_甚至_require_導入是可能的。

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

如果要將其定義為模塊，請將其分配給`module.exports` 。

```javascript
function add (a, b) {
    return a + b
}

module.exports = add
```

### _console_

_wes_使用_console_而不是`WScript.Echo`和`WScript.StdErr.WriteLine` 。

將字符打印到`console.log`的命令行。它還支持格式化字符串。使用格式化運算符`%`打印格式化字符串。

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

_wes_為了輸出一個用`WScript.StdOut.WriteLine`著色的字符串來代替，使用`WScript.StdErr.WriteLine` 。 `WScript.Echo`和`WScript.StdOut.WriteLine`被阻止輸出，所以使用`WScript.StdOut.WriteLine`或`console.log` 。

### _Buffer_

可以處理緩衝區。

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```

### `__dirname`和`__filename`

`__filename`包含當前運行的模塊文件的路徑。 `__dirname` `__filename` `__dirname`的目錄。

```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```

## 內置模塊

_wes_具有_built-in modules_來簡化和標準化基本處理。

### _ansi_

`ansi`有一個_ANSI escape code_ ，允許您更改標準輸出的顏色和效果。顏色和效果可能因所使用的控制台應用程序的類型和設置而異。

```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```

您還可以使用`ansi.color()`和`ansi.bgColor()`創建自己的顏色。所述參數使用_RGB_如`255, 165, 0`或_color code_如`'#FFA500'`您不能使用諸如`orange`類的_color name_ 。

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

### _argv_

獲取命令行參數。 `cscript.exe`的命令行參數`/`聲明了一個名為論據，但_wes_在`-`和`--`在聲明命名參數。

_argv.unnamed_和_argv.named_將命令行參數的值類型轉換為_String_ _Number_ _Boolean_ 。

輸入命令行參數和_REPL_ 。

```shell
wes REPL aaa -bcd eee --fgh=iii jjj --kln mmm
```

在_REPL_運行以下腳本。

```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```

### _pathname_

操作路徑。

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

### _filesystem_

操作文件和目錄。 `readTextFileSync`自動猜測並讀取文件的編碼。

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```

### _JScript_

如果您將腳本引擎更改為_Chakra_ ，您將無法使用_JScript_特定的_Enumerator_等。內置模塊_JScript_使它們可用。但是， _Enumerator_返回一個_Array_而不是 Enumerator 對象。

```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```

_GetObject_作為`WScript.GetObject`的替代品。

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

_VBScript_提供了一些_JScript_沒有的功能。

```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```

### _httprequest_

_httprequest_發出_http request_ 。

```javascript
const request = require('httprequest')
const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log('%O', JSON.parse(content))
```

### _minitest_

_minitest_可以編寫簡單的測試。

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

_pipe_簡化管道加工

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

確定腳本的類型。

```javascript
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```

## 模塊捆綁和安裝

_install_ ，您可以安裝該模塊_wes_上發布_github_ 。您將需要_github repository_來發布模塊。此外，存儲庫名稱和本地目錄名稱必須相同。

### _bundle_

將模塊發佈到_github_ ， _bundle_捆綁所需的模塊並將其更改為可由_install_模塊導入的格式。

出於安全原因， _wes_不會以可以直接執行的格式導入模塊，因此使用_bundle_模塊創建一個_.json_文件。

捆綁模塊有一些條件。

1.  在一個_repository_只能發布一種類型的模塊。
2.  _github_倉庫名稱和​​本地工作目錄名稱必須相同。
3.  如果要將模塊發布給第三方，存儲庫必須是公開的。
4.  _wes_不會靜態地解釋腳本。在某些條件下`require`模塊，例如`if`語句，可能不會捆綁。
5.  _.json_文件將在您的工作目錄中創建，名稱為_directory_name.json_ 。如果重命名文件或移動文件，則無法安裝它。
6.  `node_modules/directory_name`綁定失敗，因為它引用了`directory_name.json` 。

### _install_

用於安裝_github_發布的_wes_的模塊文件。

## 用法

傳遞參數以`@author/repository`格式_install_

```shell
wes install @wachaon/fmt
```

_install_有選項

| 命名         | 簡稱   | 描述                    |
| ---------- | ---- | --------------------- |
| `--bare`   | `-b` | 不要創建_@author_文件夾      |
| `--global` | `-g` | 將模塊安裝在_wes.js_所在的文件夾中 |

`--bare`選項可以省略從`author@repository`到`repository`的`require`參數。 `--global`選項使已安裝的模塊可用於所有腳本。上述選項必須作為同時指定_wes_安全選項`--unsafe`或`--dangerous` 。

```shell
wes install @wachaon/fmt --bare --unsafe
```

# 安裝私有倉庫模塊

_install_不僅可以安裝在_github_公共存儲庫模塊上，還可以安裝在私有存儲庫上。

_install_ ，使用`author@repository`指定模塊。該實現下載以下內容。

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```

使用瀏覽器訪問私有倉庫的_raw_時，會顯示_token_ ，所以復制_token_使用即可。

您還可以通過在_token_的_token_內在命令行上運行模塊來將模塊安裝在私有存儲庫_token_ 。

```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

## 外部模塊

下面是一些外部模塊。

### _@wachaon/fmt_

_@wachaon/fmt_是一組_prettier_的腳本格式。此外，如果安裝了_@wachaon/fmt_時出現`SyntaxError` ，您可以指出錯誤位置。

#### 安裝

```shell
wes install @wachaon/fmt
```

#### 用法

如果工作目錄中有_.prettierrc_ （JSON 格式），它會反映在設置中。 _fmt_可以與_CLI_ （命令行界面）和_fmt_ _module_一起使用。

用作_CLI_

```shell
wes @wachaon/fmt src/sample --write
```

| 無名號碼 | 描述             |
| ---- | -------------- |
| 0    | ---            |
| 1    | 必需的。要格式化的文件的路徑 |

| 命名        | 簡稱   | 描述   |
| --------- | ---- | ---- |
| `--write` | `-w` | 允許覆蓋 |

如果指定了`--write`或`-w`的命名參數，則使用格式化腳本覆蓋文件。

#### 作為_module_

#### `option`

```javascript
{
    parser: 'babel',
    plugins: [babel]
}
```
