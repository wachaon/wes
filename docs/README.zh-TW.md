# *WES*

*wes*是一個控制台框架，用於在*WSH (Windows Script Host)*上運行*ECMAScript* 。 *README*文件的[*japanese*](/README.md)將是日文。日語以外的文本將被機器翻譯。  
對於其他語言的文本，請從以下選項中選擇。

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

-   您可以將腳本引擎更改為*Chakra*並根據*ECMAScript2015*規範編寫。
-   由於總是執行 32 位*cscript.exe* ，因此在 64 位環境中沒有獨特的問題。
-   由於有模塊系統，因此可以比傳統的*WSH*更高效地開發
-   內置模塊支持基本處理，例如文件輸入/輸出和彩色文本輸出到控制台
-   您可以讓文件讀取自動猜測編碼，因此您不必擔心編碼等。
-   打包模塊以支持外部發布和檢索

# 我們無法解決的*wes*問題

-   `WScript.Quit`不能中止程序並且不返回錯誤代碼
-   異步處理無法正常工作
-   您不能使用`WScript.CreateObject`的第二個參數的*event prefix*

# 下載

*wes.js* *wes* 。要下載，請從[*@wachaon/wes*](https://github.com/wachaon/wes) wes 複製*wes.js*或在控制台中運行以下命令。

```bat
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

我們在運行時*WScript.Shell* *wes* `SendKeys`作為實現。如果*wes.js*保存目錄的路徑中包含*ascii*以外的字符，則`SendKeys`無法正確發送密鑰，腳本無法執行。  
配置*wes.js*僅存儲在*ascii*中的路徑。如果您已經下載了*wes* ，您可以使用以下命令對其進行更新。

```bat
wes update
```

# 用法

輸入`wes`關鍵字，然後輸入指定文件的命令，該文件將成為控制台程序的起點。腳本擴展名*.js*可以省略。

```bat
wes index
```

此外，由於*wes*配備了*REP* ，因此您可以通過單獨啟動`wes`直接輸入腳本。

```bat
wes
```

*REP*接受腳本輸入，直到您輸入兩個空行。您還可以看到*REP*在*README.md*中運行示例腳本。

## 命令行選項

*wes*啟動選項如下。

| 命名為                | 描述                   |
| ------------------ | -------------------- |
| `--monotone`       | 消除*ANSI escape code* |
| `--debug`          | 在調試模式下運行腳本           |
| `--encoding=UTF-8` | 指定讀取的第一個文件的編碼        |
| `--engine=Chakra`  | 此選項由*wes*自動添加        |

# 模塊系統

*wes*支持兩種模塊系統，使用`require()`的*commonjs module*系統和使用`import`的*es module*系統。 （不支持*dynamic import* ，因為它是一個異步過程）

## *commonjs module*

通過分配給`module.exports`並調用`require()`來管理模塊。以`./`和`../`開頭的絕對路徑和相對路徑以外的路徑在*wes_modules*目錄和*node_modules*目錄中查找模塊。 *wes*的`require()`會自動猜測模塊文件的編碼，但如果沒有正確猜測，您可以使用第二個參數指定編碼。

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

此外，還可以使用*require* `require('WScript.Shell')`類的*COM Object*導入。

```javascript
const Shell = require('Shell.Application')
Shell.MinimizeAll()
WScript.Sleep(2000)
Shell.UndoMinimizeAll()
```

## *es module*

腳本執行引擎*Chakra*解釋了諸如`imoprt`之類的語法，但由於未定義`cscript`的處理方法，因此無法按原樣執行。在*wes*中，通過在內置模塊中添加*babel* ， *es module*也在被一個一個轉譯的同時執行。這會花費我們處理開銷和臃腫的*wes.js*文件。用*es module*模塊寫的模塊也通過轉譯轉換成`require()` ，所以可以調用*COM Object* 。但是，它不支持使用*es module*指定模塊文件的編碼。一切都是自動加載的。要將其作為*es module*加載，請將擴展名設置為`.mjs`或將`package.json`中的`"type"`字段設置為`"module"` 。

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

*wes*有*WSH (JScript)*中沒有的*built-in objects* 。

## *console*

`WScript.Echo`使用*console*而不是*wes*和`WScript.StdErr.WriteLine` 。使用`console.log`將字符輸出到控制台。它還支持格式化字符串。使用`%`格式化運算符輸出格式化字符串。

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

`WScript.StdOut.WriteLine` *wes* `WScript.StdErr.WriteLine`來輸出彩色字符串。 `WScript.Echo`和`WScript.StdOut.WriteLine`被阻止。 `WScript.StdErr.WriteLine`或`console.log` 。

## *Buffer*

您可以處理緩衝區。

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```

## `__dirname`和`__filename`

`__filename`存儲當前執行的模塊文件的路徑。 `__dirname`包含`__filename`的目錄。

```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```

## *setTimeout* *setInterval* *setImmediate* *Promise*

由於*wes*是用於同步處理的執行環境，因此*setTimeout* *setInterval* *setImmediate* *Promise*不起到異步處理的作用，但它的實現是為了支持假設*Promise*實現的模塊。

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

*wes*有*built-in modules*來簡化和標準化基本處理。

## *ansi*

`ansi`是*ANSI escape code* ，可以更改標準輸出顏色和效果。顏色和效果可能因使用的控制台應用程序的類型和設置而異。

```javascript
const { redBright, yellow } = require('ansi')
const message = 'File does not exist'
console.log(redBright + 'Error: ' + yellow + message)
```

您還可以使用`ansi.color()`和`ansi.bgColor()`創建自己的顏色。參數使用*RGB* （例如`255, 165, 0` ）和*color code* （例如`'#FFA500'` 。不支持`orange`等*color name* 。

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

## *argv*

獲取命令行參數。 `cscript.exe`的命令行參數用`/`聲明命名參數，而*wes*用`-`和`--`聲明命名參數。 *argv.unnamed*和*argv.named*命令行參數值類型轉換為*String* *Number* *Boolean* 。使用*REP*輸入命令行參數。

```bat
wes REP aaa -bcd eee --fgh=iii jjj --kln mmm
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

操縱路徑。以`/`和`\`開頭的路徑通常相對於驅動器根目錄。例如`/filename`和`C:/filename`可以是相同的路徑。出於安全原因， `wes`解釋以`/`和`\`開頭的相對於工作目錄的路徑。

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

如果您將腳本引擎更改為*Chakra* ，您將無法使用*JScript*特定的*Enumerator*等。內置模塊*JScript*使它們可用。但是， *Enumerator*返回一個*Array* ，而不是*Enumerator object* 。

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

*httprequest*發出一個*http request* 。

```javascript
const request = require('httprequest')
const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log('%O', JSON.parse(content))
```

## *minitest*

*minitest*可以編寫簡單的測試。從`0.10.71`版本開始，我們回到了基本概念，將斷言的類型減少到 3 種。

### 用法

用`describe`分組，用`it`測試，用`assert`驗證。 `pass`將是`it`的出現次數和通過次數的數組。

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

使用嚴格相等運算符`===`與`true`進行比較。如果`value`是一個函數，則評估執行該函數的結果。

| 參數        | 類型                    | 描述        |
| :-------- | :-------------------- | :-------- |
| `value`   | `{Function\|Boolean}` | 布爾或布爾返回函數 |
| `message` | `{String}`            | 失敗消息      |

#### `assert.equal(expected, actual)`

比較對象的成員相等性，而不是通過引用。  
NaN `true` `NaN === NaN` `function (){} === function (){}` `/RegExp/g === /RegExp/g`或`{one: {two: 2}} === {one: {two: 2}}` `[1,2,3] === [1,2,3]`等等。  
在比較類（對象）時，它們必須具有相同的構造函數或`actual` `expected`的超類。

| 參數         | 類型      | 描述   |
| :--------- | :------ | :--- |
| `expected` | `{Any}` | 期望值  |
| `actual`   | `{Any}` | 實際價值 |

#### `assert.throws(value, expected, message)`

驗證錯誤是否正確拋出。  
錯誤是否正確取決於預期的錯誤*constructor* 、 *message*是否相等，以及正則表達式是否通過*stack*評估。

| 參數         | 類型                        | 描述                                            |
| :--------- | :------------------------ | :-------------------------------------------- |
| `value`    | `{Error}`                 | 錯誤                                            |
| `expected` | `{Error\|String\|RegExp}` | 計算預期錯誤*constructor* 、 *message*或*stack*的正則表達式 |
| `message`  | `{String}`                | 失敗時的消息                                        |

## *pipe*

*pipe*簡化了管道。

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

確定腳本類型。

### 用法

```javascript
const { isString, isNumber, isBoolean, isObject } = require('typecheck')
const log = require('log')
log(() => isString("ECMAScript"))
log(() => isNumber(43.5))
log(() => isBoolean(false))
log(() => isObject(function(){}))
```

## *animate*

*animate*有助於為控制台的顯示設置動畫。

### 用法

如果處理需要很長時間，最好在控制台上將進度顯示為動畫。

```javascript
const Animate = require('animate')
const animate = new Animate
const size = 23
let counter = 0

const progress = Animate.genProgressIndicator([
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

const indigator = Animate.genProgressIndicator(['   ', '.  ', '.. ', '...'])

animate.register(() => {
    let prog = counter / size
    if (prog >= 1) {
        prog = 1
        animate.stop()
    }

    animate.view = console.format(
        '%S %S %S',
        progress(Math.ceil(prog * 20)),
        ('  ' + Math.ceil(prog * 100) + '%').slice(-4),
        prog < 1 ? 'loading' + indigator(counter) : 'finished!'
    )
    counter++
}, 100, Number.MAX_VALUE)
animate.run()
```

### `constructor(complete)`

當所有隊列完成或調用`stop()`時執行`complete`函數。

#### `static genProgressIndicator(animation)`

生成一個顯示循環動畫的函數。

#### `register(callback, interval, conditional)`

註冊處理。可以並行註冊和處理多個進程。在`callback`中，我們將指示停止動畫並編寫要顯示的視圖。 `interval`指定處理間隔。如果`conditional`是一個函數，它將執行`conditional(count, queue)` ，如果結果為真，它將繼續。如果`conditional`是數字，則執行`decrement(count)` ，如果結果是正數，則繼續。如果`conditional`未定義，則僅執行一次。請注意，指定函數會增加`count` ，而指定數字會減少`count` 。

#### `stop()`

*animate* 。

#### `cancel(queue)`

暫停特定隊列的處理。

#### `run()`

開始動畫。

#### `view`

指定打印到控制台的字符。定期切換字符。將*Arrary*或*String*分配給`view` 。 *String*在更新單個動畫時很有用，而*Array*在單獨為多行設置動畫時很有用。

```javascript
const Animate = require('/lib/animate')
const animate = new Animate(
    () => console.log('All Finished!!')
)

const progress = Animate.genProgressIndicator([
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

const indigator = Animate.genProgressIndicator(['   ', '.  ', '.. ', '...'])

const state = {
    one: null,
    two: null,
    three: null
}

function upload(name, size, row) {
    let counter = 0
    return () => {
        let prog = counter / size
        if (prog >= 1) {
            prog = 1
            animate.cancel(state[name])
        }

        animate.view[row] = console.format(
            '%S %S %S',
            progress(Math.ceil(prog * 20)),
            ('  ' + Math.ceil(prog * 100) + '%').slice(-4),
            prog < 1 ? name + ' loading' + indigator(counter) : name + ' finished! '
        )
        counter++
    }
}

state.one = animate.register(upload('one', 63, 0), 50, Number.MAX_VALUE)
state.two = animate.register(upload('two', 49, 1), 60, Number.MAX_VALUE)
state.three = animate.register(upload('three', 109, 2), 40, Number.MAX_VALUE)
animate.run()
```

## *getMember*

從*ProgID*獲取*COM Object*的成員類型和描述。

### 用法

```javascript
const getMember = require('getMember')
const FileSystemObject = 'Scripting.FileSystemObject'
console.log('require("%S") // => %O', FileSystemObject, getMember(FileSystemObject))
```

## *zip*

壓縮文件和文件夾並解壓縮壓縮文件。在內部， *PowerShell*被調用和處理。

### 用法

```javascript
const {zip, unzip} = require('zip')
console.log(zip('docs\\*', 'dox.zip'))
console.log(unzip('dox.zip'))
```

通配符`*`可以寫在`zip(path, destinationPath)` `path`路徑中。它可以在*CLI (Command Line Interface)*和*module*中使用。

```bat
wes zip docs\* dox.zip
wes zip -p dox.zip
```

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

在*wes*中，多個模塊的捆綁包稱為包。您可以安裝在*github*上發布的*wes*軟件包。發布包需要*github repository* 。

## *bundle*

將包發佈到*github*時， *bundle*會捆綁所需的模塊並創建*bundle.json* 。

1.  一個*repository*只能發布一個包

2.  *package.json*是必需的。至少， `main`字段的描述是必需的。

    ```json
    {
        "main": "index.js"
    }
    ```

3.  如果要發布包，請*public*存儲庫

4.  從`version 0.12.0`開始，直接模塊加載到工作目錄之上的目錄的包將不會被捆綁。可以捆綁上層目錄*wes_modules*或*node_modules*中的包。

輸入以下命令進行捆綁：請參閱*package.json*以了解要捆綁的內容。

```bat
    wes bundle 
```

## *install*

用於安裝*github*上發布的*wes*包。從`version 0.10.28` ，安裝文件夾從`node_modules`更改為`wes_modules` 。如果要在`node_modules`中安裝，請添加`--node`選項。從`version 0.12.0`開始，文件將從*bandle.json*解壓縮並保存。由於規範更改，與 0.12.0 以下`version 0.12.0`捆綁的軟件包可能無法與`version 0.12.0`正確安裝。

### 用法

以`@author/repository`的形式傳遞要*install*的參數。

```bat
wes install @wachaon/fmt
```

*install*有選項。

| 命名為           | 簡稱   | 描述                                            |
| ------------- | ---- | --------------------------------------------- |
| `--bare`      | `-b` | 不要創建*@author*文件夾                              |
| `--global`    | `-g` | 將包安裝到*wes.js*所在的文件夾中                          |
| `--save`      | `-S` | 將包名稱和版本添加到*package.json*中的*dependencies*項字段   |
| `--save--dev` | `-D` | 將包名稱和版本添加到*package.json*中的*devDependencies*字段 |
| `--node`      | `-n` | 安裝在*node_module*文件夾中                          |

`--bare`選項可以省略從`author@repository`到`repository`的`require`參數。 `--global`選項使已安裝的軟件包可用於所有腳本。

```bat
wes install @wachaon/fmt --bare
```

# 從私有倉庫安裝包

*install*不僅可以安裝來自公共*github*存儲庫的包，還可以安裝來自私有存儲庫的包。在*install*中，使用*@author/repository*指定包。該實現嘗試下載以下網址。

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/bundle.json`
```

當您使用瀏覽器訪問私有存儲庫的*raw*文件時，將顯示*token* ，因此請複制*token*並使用它。如果在*token*有效時在控制台中執行，也可以安裝來自私有存儲庫的包。

```bat
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```
