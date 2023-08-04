# *WES*

*wes*是一個用於在*WSH (Windows Script Host)*上運行*ECMAScript*控制台框架。自述*README*的原始文本將為[*japanese*](/README.md) 。日語以外的文本將被機器翻譯。\
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

*   您可以將腳本引擎更改為*Chakra*並按照*ECMAScript2015+*規范進行編寫。
*   始終使用 32 位*cscript.exe* ，因此沒有獨特的 64 位問題
*   模塊系統可實現比傳統*WSH*更高效的開發
*   內置模塊支持基本處理，例如文件輸入/輸出和彩色文本輸出到控制台
*   您不必擔心編碼等問題，因為它可以在讀取文件時自動推斷編碼
*   也可以將模塊打包對外發布或者獲取。
*   比*WSH*更友好地顯示錯誤詳細信息

# *wes*無法解決的已知問題

*   `WScript.Quit`無法中止程序並且不返回錯誤代碼
*   異步處理無法正常工作
*   不能使用`WScript.CreateObject`的第二個參數的*event prefix*

# 下載

*wes*只需要*wes.js*文件。要下載，請從[*@wachaon/wes*](https://github.com/wachaon/wes)複製*wes.js*或在控制台中運行以下命令。

```bat
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

*wes*採用在運行時使用*WScript.Shell*的`SendKeys`的實現。如果*wes.js*所在目錄的路徑包含非 ASCII 字符， `SendKeys`將無法正確發送密鑰，腳本將無法運行。因此，請確保存儲*wes.js*路徑僅包含 ASCII 字符。或者，如果您已經下載了*wes.js* ，則可以使用以下命令更新它。

```bat
wes update
```

# 如何開始*wes*

輸入`wes`關鍵字和命令，指定將作為控制台程序起點的文件。腳本擴展名*.js*可以省略。

```bat
wes index
```

*wes*可以直接在控制台輸入並執行腳本。如果只用`wes`啟動，可以直接輸入並執行腳本。

```bat
wes
```

*REP*接受腳本輸入，直到您輸入兩個空行。您還可以在*README.md*中看到*REP*運行示例腳本。

## 命令行選項

*wes*啟動選項如下。

| 命名的                | 描述                            |
| ------------------ | ----------------------------- |
| `--monotone`       | 消除*ANSI escape code*          |
| `--transpile`      | 始終使用*babel-standalone*進行轉換和運行 |
| `--debug`          | 在調試模式下運行腳本                    |
| `--encoding=UTF-8` | 指定讀取的第一個文件的編碼                 |
| `--arch=x86`       | 該選項由*wes*自動添加                 |

# 模塊系統

*wes*支持兩種模塊系統，使用`require()` *commonjs module*系統和使用`import` *es module*系統。 （不支持*dynamic import*因為它是一個異步過程）

## *commonjs module*

通過分配給`module.exports`並調用`require()`來管理模塊。除了絕對路徑和以`./`和`../`開頭的相對路徑之外的路徑在*wes\_modules*目錄中查找模塊，並且方便地在*node\_modules*目錄中查找模塊。 *wes*的`require()`自動猜測模塊文件的編碼，但如果猜測不正確，您可以使用第二個參數指定編碼。

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

此外，還可以使用*require*導入*COM Object* ，例如`require('WScript.Shell')` 。

```javascript
const Shell = require('Shell.Application')
Shell.MinimizeAll()
WScript.Sleep(2000)
Shell.UndoMinimizeAll()
```

## *es module*

*Chakra*是腳本執行引擎，解釋諸如`imoprt`之類的語法，但它不在*cscript*環境中執行。在*wes*通過在內置模塊中添加*babel* ， *es module*也在被一一編譯的同時執行。這是以處理開銷和臃腫的*wes.js*文件為代價的。 *es module*中編寫的模塊也會通過轉譯轉換為`require()` ，因此可以調用*COM Object* 。但是，它不支持使用*es module*指定模塊文件的編碼。一切都會自動加載。要將其作為*es module*加載，請將擴展名設置為`.mjs`或將`package.json`中的`"type"`字段設置為`"module"` 。

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

*wes*具有*WSH (JScript)*中未找到的*built-in objects* 。

## *console*

*wes*使用*console*而不是`WScript.Echo()`和`WScript.StdErr.WriteLine()` 。

### *console.log*

使用`console.log()`將字符輸出到控制台。它還支持格式化字符串。使用`%`格式化運算符輸出格式化字符串。 （格式化運算符對於其他方法也有效。）

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
| `%O`  | 對象轉儲（縮進/彩色）                      |

*wes*使用`WScript.StdOut.WriteLine`而不是`WScript.StdErr.WriteLine`來輸出彩色字符串。 `WScript.Echo`和`WScript.StdOut.WriteLine`被阻止。使用`WScript.StdErr.WriteLine`或`console.log` 。

### *console.print*

`console.log()`通常在末尾包含換行符，但`console.print`不包含。

### *console.debug*

僅當啟用`--debug`選項時才輸出到控制台。

### *console.error*

拋出異常，並將內容作為消息。

### *console.weaklog*

如果有任何後續輸出，使用`console.weaklog()`打印的字符串將從控制台消失。對於開關輸出很有用。

## *Buffer*

您可以處理緩衝區。

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log('%s %O', content, buff)
```

## `__dirname`和`__filename`

`__filename`存儲當前正在執行的模塊文件的路徑。 `__dirname`包含`__filename`的目錄。

```javascript
const message = `dirname: ${__dirname}\nfilename: ${ __filename}`
console.log(message)
```

## *setTimeout* *setInterval* *setImmediate* *Promise*

由於*wes*是同步處理的執行環境， *setTimeout* *setInterval* *setImmediate* *Promise*並不起到異步處理的作用，而是為了支持假設*Promise*實現的模塊而實現的。

```javascript
const example = () => {
  const promise = new Promise((resolve, reject) => {
    console.log('promise')

    setTimeout(() => {
      console.log('setTimeout') 
      resolve('resolved');
    }, 2000);
  }).then((val) => {
    console.log(val)
  });
  console.log('sub')
};

console.log('start')
example();
console.log('end')
```

# 內置模塊

*wes*具有*built-in modules*來簡化和標準化基本處理。

## 要刪除的內置模塊

將一些內置模塊改為外部模塊，使文件更輕，更易於維護。

*   *animate.js*
*   *day.js*
*   *debug.js*
*   *log.js*

上述模塊可以分別安裝為`@wachaon/animate` `@wachaon/day` `@wachaon/debug` `@wachaon/log` 。

## *ansi*

`ansi`是*ANSI escape code* ，可以更改標準輸出顏色和效果。顏色和效果可能會有所不同，具體取決於所使用的控制台應用程序的類型和設置。

```javascript
const { redBright, yellow } = require('ansi')
const message = 'File does not exist'
console.log(redBright + 'Error: ' + yellow + message)
```

您還可以使用`ansi.color()`和`ansi.bgColor()`創建自己的顏色。參數使用*RGB* （例如`255, 165, 0` *color code* （例如`'#FFA500'` 。不支持`orange`等*color name* 。

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

## *argv*

獲取命令行參數。 `cscript.exe`的命令行參數使用`/`聲明命名參數，而*wes*使用`-`和`--`聲明命名參數。 *argv.unnamed*和*argv.named*將命令行參數值類型轉換為*String* *Number* *Boolean* 。使用*REP*輸入命令行參數。

```bat
wes REP aaa -bc dd --e=false --gh=iii jjj --klm nn -o --p 9 r
```

在*REP*上運行以下腳本。

```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```

## *pathname*

操縱路徑。以`/`和`\`開頭的路徑通常相對於驅動器根目錄。例如`/filename`和`C:/filename`可以是相同的路徑。出於安全原因， *wes*解釋以`/`和`\`開頭的相對於工作目錄的路徑。

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

## *filesystem*

操作文件和目錄。 `readTextFileSync()`自動猜測文件的編碼並讀取它。 （即使`readFileSync()`的第二個`encode`設置為`auto` ，它也會被自動猜測。）

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
// const contents = fs.readFileSync(readme, 'auto')
console.log(contents)
```

## *chardet*

我正在使用<https://github.com/runk/node-chardet>中的一些功能。您可以通過增加特定於編碼的字符來提高自動猜測的準確性。

## *JScript*

如果將腳本引擎更改為*Chakra* ，您將無法使用*JScript*特定的*Enumerator*等。內置模塊*JScript*使它們可用。但是， *Enumerator*返回*Array* ，而不是*Enumerator object* 。

```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```

*GetObject*可作為`WScript.GetObject`的替代方案。

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

*VBScript*提供了*JScript*所沒有的一些功能。

```javascript {"testing": true}
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO)) // => "FileSystemObject"
```

## *httprequest*

*httprequest*發出*http request* 。

```javascript {"testing": true}
const request = require('httprequest')
const { responseText } = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log(() => JSON.parse(responseText)) /* => {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
            "lat": "-37.3159",
            "lng": "81.1496"
        }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
    }
} */
```

## *minitest*

*minitest*可以編寫簡單的測試。從`0.10.71`版本開始，我們回到了基本概念，並將斷言類型減少到了 3 種。

使用`describe`進行分組，使用`it`進行測試，並使用`assert`進行驗證。 `pass`將是一個`it`出現的次數和傳遞次數組成的數組。

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

為了簡單起見，只有三個斷言函數用於比較對象。

#### `assert(value, message)` `assert.ok(value, message)`

使用嚴格相等運算符`===`與`true`進行比較。如果`value`是一個函數，則評估執行該函數的結果。

| 參數        | 類型                    | 描述           |
| :-------- | :-------------------- | :----------- |
| `value`   | `{Function\|Boolean}` | 布爾值或返回布爾值的函數 |
| `message` | `{String}`            | 失敗時的消息       |

#### `assert.equal(expected, actual)`

比較對象的成員相等性，而不是通過引用。\
`NaN === NaN` `function (){} === function (){}` `true` `/RegExp/g === /RegExp/g`或`{one: {two: 2}} === {one: {two: 2}}` `[1,2,3] === [1,2,3]`等\
比較類（對象）時，它們必須具有相同的構造函數或`actual` `expected`超類。

| 參數         | 類型      | 描述   |
| :--------- | :------ | :--- |
| `expected` | `{Any}` | 期望值  |
| `actual`   | `{Any}` | 實際價值 |

#### `assert.throws(value, expected, message)`

驗證是否正確拋出錯誤。\
錯誤是否正確取決於預期錯誤*constructor*函數、 *message*是否相等以及正則表達式是否通過*stack*求值。

| 參數         | 類型                        | 描述                                            |
| :--------- | :------------------------ | :-------------------------------------------- |
| `value`    | `{Error}`                 | 錯誤                                            |
| `expected` | `{Error\|String\|RegExp}` | 計算預期錯誤*constructor* 、 *message*或*stack*的正則表達式 |
| `message`  | `{String}`                | 失敗時的消息                                        |

## *pipe*

*pipe*簡化了管道。使用一個或多個*converter*轉換*data*的同時輸出結果。從*ver 0.12.75*開始，可以直接從命令行啟動。

### 將*pipe*作為模塊啟動

將轉換函數放在*pipe*方法的`use(converter)`參數中，並使用`process(data, callback(error, result))`描述數據輸入和轉換後處理。如果沒有指定`callback` ，返回值將是*promise* ，處理可以與`then(result)`和`catch(error)`連接。

```javascript {"testing": true}
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
  .process(10, (err, res) => {
    console.log(() => res) // => 3
  })
```

除了`use(converter)`之外，還有`.filter(callbackFn(value, index))`和`map(callbackFn(value, index))`等方法。每個*data*都是一個字符串、一個數組和一個對象。

```javascript {"testing": true}
const pipe = require('pipe')

const tsv = `
javascript\t1955
java\t1995
vbscript\t1996
c#\t2000
`.trim()

function include(value, i) {
    return value.includes('script')
}

function release(value, i) {
    return value.split('\t').join(' was released in ')
}

pipe()
    .filter(include)
    .map(release)
    .process(tsv)
    .then((res) => {
        console.log(() => res) /* => `javascript was released in 1955
vbscript was released in 1996` */
    })

```

### 從命令行啟動*pipe*

從命令行中，在`pipe`之後按順序輸入轉換函數。轉換函數的參數作為與轉換函數同名的命名命令行參數的值輸入。 `=>`值`(` `eval()`而不是`JSON.parse()`進行解析`)` *WSH*在命令行參數中強制輸出`"` 。在這種情況下，請勿使用`eval()`進行解析）

```bash
wes pipe swap merge --input="sample.txt" --output="" --swap="[2, 0, 1, 3]" --merge=4
```

該命令相當於以下腳本：

```javascript
const pipe = require('pipe')
const { readFileSync, writeFileSync } = require('filesystem')
const { resolve } = require('pathname')

const data = readFileSync(resolve(process.cwd(), 'sample.txt'), 'auto')

pipe()
    .use(swap, 2, 0, 1, 3)
    .use(merge, 4)
    .process(data, (err, res) => {
        if (err) console.error(err)
        console.log(res)
    })
```

## *typecheck*

確定腳本類型。

```javascript {"testing": true}
const { isString, isNumber, isBoolean, isObject } = require('typecheck')
console.log(() => isString("ECMAScript")) /* => true */
console.log(() => isNumber(43.5)) /* => true */
console.log(() => isBoolean(false)) /* => true */
console.log(() => isObject(function(){})) /* => false */
```

## *getMember*

在控制台中使用時，從*ProgID*獲取*COM Object*成員類型和描述。

```bat
wes getMember "Scripting.FileSystemObject"
```

當用作模塊時，它獲取實例成員的類型和描述。如果用作模塊，則可以從*WSH (Windows Script Host)*獲取無法確認的對象的信息。

```javascript
const getMember = require('getMember')
const SWbemServicesEx = require("WbemScripting.SWbemLocator").ConnectServer()
getMember(SWbemServicesEx)
```

## *ps*

有助於運行*PowerShell* 。

### `ps(source, option)`

運行`source` *PowerShell*腳本。

在控制台中顯示 cmdlet 列表。

```javascript
const ps = require('ps')
 
console.log(ps("Get-Command"))
```

如果有*Google Cherome*窗口，請更改窗口的大小和位置。 （它在全屏模式下不起作用。）

```javascript
const ps = require('ps')

const code = `
$name = "chrome"
$w = 700
$h = 500
$x = 10
$y = 100

Add-Type @"
  using System;
  using System.Runtime.InteropServices;
  public class Win32Api {
    [DllImport("user32.dll")]
    [return: MarshalAs(UnmanagedType.Bool)]
    public static extern bool MoveWindow(IntPtr hWnd, int X, int Y, int nWidth, int nHeight, bool bRepaint);
  }
"@

Get-Process -Name $name | where { $_.MainWindowTitle -ne "" } | foreach {
    [Win32Api]::MoveWindow($_.MainWindowHandle, $x, $y, $w, $h, $true) | Out-Null
}
`

ps(code)
```

控制鼠標移動和點擊。

```javascript
const ps = require("ps")
const { unnamed } = require('argv')
const option = [
    unnamed[1],
    unnamed[2] || 0,
    unnamed[3] || 0
]

ps(`
$Method = $args[0]
$PosX = $args[1]
$PosY = $args[2]

$assemblies = @("System", "System.Runtime.InteropServices")

$Source = @"
using System;
using System.Runtime.InteropServices;

namespace Device {
    public class Mouse {
        public static void Main (params string[] args) {
            string method = args[0];
            int posX = args.Length > 1 ? Int32.Parse(args[1]) : 0;
            int posY = args.Length > 2 ? Int32.Parse(args[2]) : 0;

            if (method == "pos") {
                SetCursorPos(posX, posY);
            }

            if (method == "click") {
                mouse_event(0x2, posX, posY, 0, 0);
                mouse_event(0x4, 0, 0, 0, 0);
            }

            if (method == "leftDown") {
                mouse_event(0x2, posX, posY, 0, 0);
            }

            if (method == "leftUp") {
                mouse_event(0x4, posX, posY, 0, 0);
            }

            if (method == "rightClick") {
                mouse_event(0x8, posX, posY, 0, 0);
                mouse_event(0x10, 0, 0, 0, 0);
            }

            if (method == "rightDown") {
                mouse_event(0x8, posX, posY, 0, 0);
            }

            if (method == "righttUp") {
                mouse_event(0x10, posX, posY, 0, 0);
            }
        }

        [DllImport("USER32.dll", CallingConvention = CallingConvention.StdCall)]
        public static extern void SetCursorPos(int X, int Y);

        [DllImport("USER32.dll", CallingConvention = CallingConvention.StdCall)]
        public static extern void mouse_event(int dwFlags, int dx, int dy, int cButtons, int dwExtraInfo);
    }
}
"@

Add-Type -Language CSharp -TypeDefinition $Source -ReferencedAssemblies $assemblies

[Device.Mouse]::Main($Method, $PosX, $PosY)
`, option)
```

將腳本保存為文件或將其粘貼到下一個`REP`中。

```bat
wes REP pos 100 100
```

### 直接從控制台運行*powershell*

在控制台中執行指定的*.ps1*文件。

```bat
wes ps ./sample.ps1
```

您還可以通過指定`--Command`或`-c`選項直接執行命令。

顯示當前目錄中文件列表的示例

```bat
wes ps --Command Get-ChildItem
```

## *zip*

壓縮文件和文件夾並解壓縮壓縮文件。在內部， *PowerShell*被調用並處理。

```javascript
const {zip, unzip} = require('zip')
console.log(zip('docs\\*', 'dox.zip'))
console.log(unzip('dox.zip'))
```

`zip(path, destinationPath)`的`path`中可以寫入通配符`*` 。它可以在*CLI (Command Line Interface)*和*module*中使用。

```bat
wes zip docs\* dox.zip
wes zip -p dox.zip
```

如果`path`具有擴展`.zip` ，則處理`unzip()` ，並且沒有擴展名`.zip`的描述。或者，即使存在擴展`.zip`如果存在通配符`*`描述，也會處理`zip()` 。

| 未命名的 | 描述            |
| ---- | ------------- |
| `1`  | 要輸入的`path`或文件 |
| `2`  | 文件夾文件輸出`dest` |

| 命名的      | 簡稱   | 描述            |
| -------- | ---- | ------------- |
| `--path` | `-p` | 要輸入的`path`或文件 |
| `--dest` | `-d` | 文件夾文件輸出`dest` |

# 捆綁（打包）和安裝模塊

在*wes*中，多個模塊的捆綁稱為包。您可以安裝*github*上發布的*wes*包。發布包需要*github repository* 。

## *bundle*

將包發佈到*github*時， *bundle*會捆綁所需的模塊並創建*bundle.json* 。

1.  一個*repository*中只能發布一個包

2.  *package.json*是必需的。至少需要對`main`字段進行描述。

    ```json
     { "main": "index.js" }
    ```

3.  如果您想發布包，請將存儲庫*public*

4.  從`version 0.12.0`開始，直接將模塊加載到工作目錄之上的目錄中的包將不會被捆綁。上層目錄*wes\_modules*或*node\_modules*中的包可以進行捆綁。

輸入以下命令進行捆綁：請參閱*package.json*了解要捆綁的內容。

```bat
wes bundle 
```

## *init*

輸入一些項目，它將根據該信息創建*package.json* 。

```bat
wes init
```

## *install*

用於安裝*github*上發布的*wes*包。從`version 0.10.28`開始，安裝文件夾從`node_modules`更改為`wes_modules` 。如果要安裝在`node_modules`中，請添加`--node`選項。從`version 0.12.0`開始，文件將從*bandle.json*中解壓縮並保存。由於規範更改， `version 0.12.0`捆綁的軟件包可能無法與`version 0.12.0`一起正確安裝。

以`@author/repository`形式傳遞*install*參數。

```bat
wes install @wachaon/fmt
```

*install*有選項。

| 命名的           | 簡稱   | 描述                                            |
| ------------- | ---- | --------------------------------------------- |
| `--bare`      | `-b` | 不要創建*@author*文件夾                              |
| `--global`    | `-g` | 將包安裝到*wes.js*所在文件夾中                           |
| `--save`      | `-S` | 將包名稱和版本添加到*package.json*中的*dependencies*項字段   |
| `--save--dev` | `-D` | 將包名稱和版本添加到*package.json*中的*devDependencies*字段 |
| `--node`      | `-n` | 安裝在*node\_module*文件夾中                         |

`--bare`選項可以省略從`author@repository`到`repository`的`require`參數。 `--global`選項使已安裝的軟件包可供所有腳本使用。

```bat
wes install @wachaon/fmt --bare
```

# 從私有存儲庫安裝包

*install*不僅可以安裝公共*github*存儲庫中的包，還可以安裝私有存儲庫中的包。在*install*中，使用*@author/repository*指定包。該實現嘗試下載以下 url。

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/bundle.json`
```

當你用瀏覽器訪問私有倉庫的*raw*時，會顯示*token* ，所以復制*token*並使用它。如果在*token*有效時在控制台中執行，也可以安裝來自私有存儲庫的包。

```bat
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

# 套餐介紹

這裡有一些外部包。

## *@wachaon/fmt*

*@wachaon/fmt*是*prettier*包裝，供*wes*格式化腳本。另外，如果安裝*@wachaon/fmt*時發生*Syntax Error* ，您可以指出錯誤的位置。

### 安裝*@wachaon/fmt*

```bat
wes install @wachaon/fmt
```

如果工作目錄中有*.prettierrc* （JSON格式），它將反映在設置中。 *fmt*在*CLI*和*module*中都可用。

#### 用作*CLI* 。

```bat
wes @wachaon/fmt src/sample --write
```

| 無名號碼 | 描述              |
| ---- | --------------- |
| 1    | 必需的。您要格式化的文件的路徑 |

| 命名的       | 簡稱   | 描述   |
| --------- | ---- | ---- |
| `--write` | `-w` | 允許覆蓋 |

如果指定了`--write`或`-w`命名參數，則使用格式化腳本覆蓋文件。

#### 作為模塊使用

```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')
const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```

## *@wachaon/edge*

*Internet Explorer*將於 2022 年 6 月 15 日終止支持。因此，預計使用`require('InternetExplorer.Application')`進行應用程序操作將變得不可能。此外，終止對*Internet Explorer*支持後，網站本身將無法正確顯示。另一種方法是通過*web driver(msedgedriver.exe)*操作*Microsoft Edge based on Chromium* 。 `@wachaon/edge`簡化了*Edge*自動駕駛儀。

### 安裝*@wachaon/edge*

首先安裝該軟件包。

```bat
wes install @wachaon/edge --bare
```

然後下載*web driver(msedgedriver.exe)* 。

```bat
wes edge --download
```

檢查已安裝的*Edge*版本並下載相應的*web driver* 。

### 如何使用*@wachaon/edge*

它將很容易使用。啟動瀏覽器並將窗口大小和要顯示的站點更改為`https://www.google.com` 。

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

我們會存儲您的訪問歷史記錄，直到您的瀏覽器*URL*以`https://www.yahoo`開頭。

```javascript
const edge = require('/index.js')

const ret = edge((window, navi, res) => {
    window.rect({
        x: 1,
        y: 1,
        width: 1200,
        height: 500
    })
    res.exports = []

    navi.on(/^https?:\/\/www\.yahoo\b/, (url) => {
        console.log('finished!')
        navi.emit('terminate', res, window)
    })

    navi.on(/https?:\/\/.+/, (url) => {
        console.log('URL: %O', url)
        res.exports.push(url)
    })

    window.navigate('http://www.google.com')
})

console.log('ret // => %O', ret)
```

*edge*按順序將訪問過的*URL*打印到控制台。 `@wachaon/edge`註冊*URL*事件並將數據添加到`res.exports` 。註冊的*URL*可以是`String` `RegExp` ，可以靈活設置。通過使其成為事件驅動的，您可以通過不為自動駕駛儀難以處理的流程設置事件來輕鬆切換到手動操作。如果您希望腳本停止，請運行`navi.emit('terminate', res)`或手動終止*Edge* 。默認情況下，最終確定會將`res.exports`輸出為*.json*文件。如果要設置終止處理，請設置`edge(callback, terminate)`的`terminate` 。 `window`是*@wachaon/webdriver*的*Window*類的實例，而不是瀏覽器的`window` 。

## *@wachaon/webdriver*

它將是一個向運行瀏覽器的*web driver*發送請求的包。 *@wachaon/edge*包括*@wachaon/webdriver* 。

### 安裝*@wachaon/webdriver*

```bat
wes install @wachaon/webdriver --bare
```

如果沒有，請下載基於*Chromium*的*Microsoft Edge* *web driver(msedgedriver.exe)* 。另外，如果*edge*版本和*web driver(msedgedriver.exe)*版本不同，請下載相同版本的*web driver(msedgedriver.exe)* 。

```bat
wes webdriver --download
```

### 如何使用*@wachaon/webdriver*

轉到[*yahoo JAPAN*](https://www.yahoo.co.jp/)網站並保存特定塊元素的屏幕截圖。

```javascript
const { Window } = require('webdriver')
const { writeFileSync } = require('filesystem')
const { resolve, WorkingDirectory } = require('pathname')
const genGUID = require('genGUID')

const window = new Window
const { document } = window
window.rect({
    x: 0,
    y: 0,
    width: 1280,
    height: 600
})
window.navigate('https://www.yahoo.co.jp/')

const [elm] = document.querySelectorAll('#ContentWrapper > main > div:nth-child(2)')
const screen = elm.takeScreenShot()

const spec = resolve(WorkingDirectory, 'dev', genGUID() + '.png')
console.log(writeFileSync(spec, screen))

window.quit()
```
