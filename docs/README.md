# *WES*

*wes* は *WSH (Windows Script Host)* で *ECMAScript* を実行する、コンソール用のフレームワークです。
*README* の原文は [*japanese*](/README.md) になります。日本語以外は機械翻訳の文章になります。\
他言語の文章は下記から選択してください。

<!-- import document -->

# 特徴

*   スクリプトエンジンを *Chakra* に変更して、*ECMAScript2015+* の仕様で記述することができます
*   常に 32ビットの *cscript.exe* を使用するため、64ビット環境での独自の問題が発生しません
*   モジュールシステムが利用可能なため、従来の *WSH* よりも効率的に開発できます
*   ビルトインモジュールがファイルの入出力やコンソールに色付き文字を出力するなどの基本的な処理をサポートしています
*   ファイルの読み込み時に自動的にエンコードを推測することができるため、エンコードなどを心配する必要がありません
*   モジュールをパッケージ化して外部公開や取得も可能です
*   *WSH* よりも親切にエラー内容を表示します

# *wes* が解決できない既知の問題

*   `WScript.Quit` はプログラムを中断出来ず、エラーコードも返しません
*   非同期処理は正しく機能しません
*   `WScript.CreateObject` の第二引数の *event prefix* の使用はできません

# ダウンロード

*wes* に必要なのは *wes.js* ファイルのみです。
ダウンロードするには [*@wachaon/wes*](https://github.com/wachaon/wes) から *wes.js* をコピーするかコンソールで次のコマンドを実行してください。

```bat
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

*wes* は実行時に *WScript.Shell* の `SendKeys` を使用する実装を採用しています。
もし *wes.js* を保存するディレクトリのパスに非ASCII文字が含まれている場合、`SendKeys` で正しくキーを送信できず、スクリプトを実行できません。
したがって、*wes.js*を保存する場所のパスは、ASCII文字のみで構成されるようにしてください。
また、既に *wes.js* をダウンロードしている場合は、以下のコマンドを使用して更新することができます。

```bat
wes update
```

# *wes* の起動方法

`wes` のキーワードに続きプログラムの起点となるファイルを指定したコマンドをコンソールへ入力します。
スクリプトの拡張子 *.js* は省略できます。

```bat
wes index
```

*wes* にはコンソール上でスクリプトの直接入力と実行ができます。`wes` のみで起動させると、
スクリプトを直接入力、実行できます。

```bat
wes
```

*REP* は空行を２つ入力するまでスクリプトの入力を受け付けます。*README.md* でのサンプルスクリプトの
実行も *REP* で確認できます。

## コマンドラインオプション

*wes* の起動オプションは下記になります。

| named              | Description                                       |
| ------------------ | ------------------------------------------------- |
| `--monotone`       | *ANSI escape code* を排除します                   |
| `--transpile`      | 常に *babel-standalone* で変換して実行します      |
| `--debug`          | スクリプトをデバッグモードで実行します            |
| `--encoding=UTF-8` | 最初に読み込むファイルのエンコードを指定します    |
| `--arch=x86`       | このオプションは *wes* によって自動で付加されます |

# モジュールシステム

*wes* は `require()` を使用する *commonjs module* のシステムと `import` を使用する *es module* の２つのモジュールシステムに対応しています。(*dynamic import* は非同期処理の為、対応していません)

## *commonjs module*

`module.exports` への代入と `require()` での呼び出しでモジュールを管理します。
絶対パスと `./` と `../` から始まる相対パス以外のパスは *wes_modules* ディレクトリと
利便上 *node_modules* ディレクトリからモジュールを探します。
*wes* の `require()` はモジュールファイルのエンコードを自動推測しますが、
正しく推測しない場合に第二引数でエンコードを指定も可能です。

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

また、`require('WScript.Shell')` の様に *COM Object* に対しても *require* でインポート可能です。

```javascript
const Shell = require('Shell.Application')
Shell.MinimizeAll()
WScript.Sleep(2000)
Shell.UndoMinimizeAll()
```

## *es module*

スクリプトの実行エンジンである *Chakra* は `imoprt` などの構文を解釈しますが、*cscript* 環境では実行されません。
*wes* では *babel* をビルトインモジュールに加えることで、*es module* に対しても逐次トランスパイルしながら実行しています。そのためコストとして処理のオーバーヘッドと *wes.js* ファイルが肥大化してしまいます。
*es module* で記述されているモジュールもトランスパイルで `require()` に変換されるため、*COM Object* の呼び出しも可能です。
しかしながら *es module* でのモジュールファイルのエンコード指定には対応していません。全て自動推測で読み込まれます。
*es module* として読み込ませるには拡張子を `.mjs` にするか `package.json` の `"type"` フィールドを `"module"` にしてください。

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

# ビルトインオブジェクト

*wes* は *WSH (JScript)* には無い *built-in objects* があります。

## *console*

*wes* では `WScript.Echo()` や `WScript.StdErr.WriteLine()` の代わりに *console* を使用します。

### *console.log*

`console.log()` でコンソールに文字を出力します。また書式化文字列にも対応しています。
書式化演算子 `%` 使用して書式化文字列を出力します。
(書式化演算子は他のメソッドでも有効です。)

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

| Format specifier | Description                                  |
| ---------------- | -------------------------------------------- |
| `%s`             | `String(value)`                              |
| `%S`             | `String(value)`                              |
| `%c`             | `String(value)`                              |
| `%C`             | `String(value)`                              |
| `%d`             | `parseInt(value, 10)`                        |
| `%D`             | `parseInt(value, 10)`                        |
| `%f`             | `Number(value)`                              |
| `%F`             | `Number(value)`                              |
| `%j`             | `JSON.stringify(value)`                      |
| `%J`             | `JSON.stringify(value, null, 2)`             |
| `%o`             | オブジェクトのダンプ                         |
| `%O`             | オブジェクトのダンプ（インデント・カラフル） |

*wes* では色付き文字列を出力する為に `WScript.StdOut.WriteLine` ではなく、`WScript.StdErr.WriteLine` を使用します。
`WScript.Echo` や `WScript.StdOut.WriteLine` は出力を遮断されています。`WScript.StdErr.WriteLine` もしくは `console.log` を使用してください。

### *console.print*

通常 `console.log()` は最後に改行を含みますが、`console.print` は改行を含みません。

### *console.debug*

`--debug` オプションが有効な場合のみコンソールに出力されます。

### *console.error*

内容をメッセージとして例外を投げます。

### *console.weaklog*

`console.weaklog()` で出力された文字列は、後続する出力がある場合にコンソールから消えます。
出力を入れ替える場合に活用します。

## *Buffer*

バッファーを扱うことができます。

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log('%s %O', content, buff)
```

## `__dirname` and `__filename`

`__filename` は現在実行しているモジュールファイルのパスが格納されています。
`__dirname` は `__filename` のディレクトリが格納されています。

```javascript
const message = `dirname: ${__dirname}\nfilename: ${ __filename}`
console.log(message)
```

## *setTimeout* *setInterval* *setImmediate* *Promise*

*wes* は同期処理の実行環境なので、*setTimeout* *setInterval* *setImmediate* *Promise* は
非同期処理として機能しませんが、*Promise* の実装が前提のモジュールの対応の為に実装しています。

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

# ビルトインモジュール

*wes* では基本的な処理を簡略・共通化するための *built-in modules* があります。

## 削除されるビルトインモジュール

ファイルを軽量化とメンテナンスの軽減のため、ビルトインモジュールの一部を外部モジュールに変更します。

+  *animate.js*  
+  *day.js*
+  *debug.js*
+  *log.js*

上記モジュールは それぞれ `@wachaon/animate` `@wachaon/day` `@wachaon/debug` `@wachaon/log` として
インストールできます。

## *ansi*

`ansi` は *ANSI escape code* で、標準出力の色や効果を変更できます。
使用するコンソールアプリケーションの種類や設定によって色や効果などは異なる場合があります。

```javascript
const { redBright, yellow } = require('ansi')
const message = 'File does not exist'
console.log(redBright + 'Error: ' + yellow + message)
```

また、`ansi.color()` や `ansi.bgColor()` で独自の色の作成ができます。
引数は `255, 165, 0` などの *RGB* や `'#FFA500'` などの *color code* を使用します。
`orange` などの *color name* には対応しておりません。

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

## *argv*

コマンドライン引数のを取得します。
`cscript.exe` のコマンドライン引数は `/` で名前付き引数を宣言しますが、*wes* では `-` および `--` で
名前付き引数を宣言します。
*argv.unnamed* および *argv.named* はコマンドライン引数の値の型を *String* *Number* *Boolean* の何れかにキャストします。
*REP* と一緒にコマンドライン引数を入力します。

```bat
wes REP aaa -bc dd --e=false --gh=iii jjj --klm nn -o --p 9 r
```

*REP* で次のスクリプトを実行します。

```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```

## *pathname*

パスの操作をします。
一般的には `/` および `\` から開始されるパスはドライブルートからの相対パスを指します。
例えば `/filename` と `C:/filename` は同じパスになる場合があります。
*wes* ではセキュリティーの観点から `/` および `\` で開始されるパスはワーキングディレクトリからの相対パスと解釈されます。

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

## *filesystem*

ファイルの操作やディレクトリの操作をします。
`readTextFileSync()` はファイルのエンコードを自動推測して読み込みます。
(`readFileSync()` の2番目の引数の `encode` を `auto` にしても自動推測します。)

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
// const contents = fs.readFileSync(readme, 'auto')
console.log(contents)
```

## *chardet*

<https://github.com/runk/node-chardet> の一部の機能を使用しています。
エンコード固有の文字を増やすことで自動推測の精度を上げられます。

## *JScript*

スクリプトエンジンを *Chakra* に変更すると、*JScript* 固有の *Enumerator* などが使用できなくなります。
ビルトインモジュールの *JScript* はそれらを使用可能にします。
ただし、*Enumerator* は *Enumerator object* ではなく *Array* を返します。

```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```

*GetObject* は `WScript.GetObject` の代替として機能します。

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

*VBScript* は *JScript* にはない機能のいくつかを提供します。

```javascript {"testing": true, "message": "Typename"}
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(() => TypeName(FSO)) // => "FileSystemObject"
```

## *httprequest*

*httprequest* は *http request* を発行します。

```javascript {"testing": true, "message": "httprequest"}
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

*minitest* は簡易的なテストを記述できます。
version `0.10.71` から基本コンセプトに立ち返って、アサーションの種類を３種類に減らしました。

`describe` でグループに分け、`it` でテストを記述し、`assert` で検証します。
`pass` は `it` の出現回数と合格数の配列になります。

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

### assertion

オブジェクトを比較する為のアサーション関数は単純化のため、3種類のみになります。

#### `assert(value, message)` `assert.ok(value, message)`

厳密等価演算子 `===` で `true` と比較します。`value` が関数の場合は関数を実行した結果を評価します。

| Param     | Type                  | Description                    |
| :-------- | :-------------------- | :----------------------------- |
| `value`   | `{Function\|Boolean}` | 真偽値もしくは真偽値を返す関数 |
| `message` | `{String}`            | 失敗した場合のメッセージ       |

#### `assert.equal(expected, actual)`

オブジェクトを参照先ではなく、メンバーが同値かどうかで比較します。\
通常の厳密等価演算子では `true` にらない `NaN === NaN` `function (){} === function (){}` `/RegExp/g === /RegExp/g` や
`{one: {two: 2}} === {one: {two: 2}}` `[1,2,3] === [1,2,3]` なども成立します。\
クラス（オブジェクト）同士の比較の場合は同じコンストラクタもしくは `actual` が `expected` のスーパークラスである必要があります。

| Param      | Type    | Description |
| :--------- | :------ | :---------- |
| `expected` | `{Any}` | 期待する値  |
| `actual`   | `{Any}` | 実際の値    |

#### `assert.throws(value, expected, message)`

正しくエラーが投げられているかを検証します。\
エラーが正しいかどうかは、期待されたエラーの *constructor* なのか、もしくは *message* が同値、 正規表現が *stack* を評価に合格するかどうかで判断されます。

| Param      | Type                      | Description                                                                     |
| :--------- | :------------------------ | :------------------------------------------------------------------------------ |
| `value`    | `{Error}`                 | エラー                                                                          |
| `expected` | `{Error\|String\|RegExp}` | 期待するエラーの *constructor* か *message* もしくは *stack* を評価する正規表現 |
| `message`  | `{String}`                | 失敗した場合のメッセージ                                                        |

## *match*

*match* は、ファイルパスが特定のパターンに一致するするかを判定するモジュールです。
ファイル名やパスにワイルドカード（ワイルドカードは、`*` や `?` などの特殊文字）を使用して、特定の条件に一致するファイルを検索できます。

| Param     | Type       | Description |
| :-------- | :--------- | :---------- |
| `pattern` | `{String}` | パターン    |
| `matcher` | `{Any}`    | 対象のパス  |

```javascript {"testing": true, "message": "match"}
const match = require('match')

console.log(() => match('path/to/*.js', 'path/to/url.js')) // => true
console.log(() => match('path/**/index.*', 'path/to/url/index.json')) // => true
console.log(() => match('path/to/*.?s', 'path/to/script.cs')) // => true
```

### *match.search*

*match.search* は実在するパスからパターンにマッチするパスを見つけます。

| Param     | Type       | Description                |
| :-------- | :--------- | :------------------------- |
| `pattern` | `{String}` | パターン                   |
| `matcher` | `{Any}`    | 検索対象のディレクトリパス |

```javascript
const { search } = require('match')

console.log(() => search('**/LICENSE', process.cwd()))
```

## *pipe*

*pipe* はパイプ処理を簡素化します。
*data* を1つないし、複数の *converter* で変換しながら結果をだします。
*ver 0.12.75* 以降はコマンドラインからも直接起動可能になりました。

### *pipe* をモジュールとして起動する

*pipe* のメソッドの `use(converter)` の引数に変換関数を入れて `process(data, callback(error, result))` でデータの入力と変換後の処理を記述します。`callback` を指定しない場合の戻り値は *promise* になり、`then(result)` ならびに `catch(error)` で処理を繋げていけます。

```javascript {"testing": true, "message": "pipe"}
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

また、`use(converter)` 以外に `.filter(callbackFn(value, index))` や `map(callbackFn(value, index))` などのメソッドもあります。それぞれ *data* が文字列、配列、オブジェクトも場合に網羅的にアクセスして処理します。

```javascript {"testing": true, "message": "utility methods for pipes"}
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

### *pipe* をコマンドラインから起動する

コマンドラインからは `pipe` の後に変換関数を順に入力します。変換関数への引数は変換関数と同名の名前付きコマンドライン引数の値として入力します。値は *WSH* がコマンドライン引数の `"` を強制排除することから `JSON.parse()` ではなく、`eval()` で解析します。(予期しない関数を実行しない様に、`(` と `)` や `=>` が含まれる場合は `eval()` での解析はしません)

```bash
wes pipe swap merge --input="sample.txt" --output="" --swap="[2, 0, 1, 3]" --merge=4
```

このコマンドは次のスクリプトと等価です。

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

スクリプトの型の判定をします。

```javascript {"testing": true, "message": "typecheck"}
const { isString, isNumber, isBoolean, isObject } = require('typecheck')
console.log(() => isString("ECMAScript")) /* => true */
console.log(() => isNumber(43.5)) /* => true */
console.log(() => isBoolean(false)) /* => true */
console.log(() => isObject(function(){})) /* => false */
```

## *getMember*

コンソールで使用する場合は *ProgID* から *COM Object* のメンバーの種類と説明を取得します。

```bat
wes getMember "Scripting.FileSystemObject"
```

モジュールとして使う場合はインスタンスのメンバーの種類と説明を取得します。
モジュールとして使えば、*WSH (Windows Script Host)* から確認することができないオブジェクトの情報を取得できます。

```javascript
const getMember = require('getMember')
const SWbemServicesEx = require("WbemScripting.SWbemLocator").ConnectServer()
getMember(SWbemServicesEx)
```

## *ps*

*PowerShell* の実行を容易にします。

### `ps(source, option)`

`source` の *PowerShell* スクリプトを実行します。 

コンソールにコマンドレット一覧を表示します。

```javascript
const ps = require('ps')
 
console.log(ps("Get-Command"))
```

*Google Cherome* のウインドウがあればウインドウのサイズと位置を変更します。
(全画面表示の場合は動作しません。)

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

マウスの移動とクリックを操作します。

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
スクリプトをファイルとして保存するか、次の `REP` にペーストしてください。

```bat
wes REP pos 100 100
```

### コンソールから直接 *powershell* を実行する

コンソールで指定した *.ps1* ファイルを実行します。

```bat
wes ps ./sample.ps1
```

`--Command` もしくは `-c` オプションを指定すれば直接コマンドを実行することもできます。

カレントディレクトリのファイル一覧を表示する例

```bat
wes ps --Command Get-ChildItem
```

## *zip*

ファイルやフォルダの圧縮と圧縮ファイルの解凍をします。
内部で *PowerShell* 呼び出して処理をしています。

```javascript
const {zip, unzip} = require('zip')
console.log(zip('docs\\*', 'dox.zip'))
console.log(unzip('dox.zip'))
```

`zip(path, destinationPath)` の `path` にはワイルドカード `*` が記述できます。
*CLI (Command Line Interface)* と *module* の両方で使用できます。

```bat
wes zip docs\* dox.zip
wes zip -p dox.zip
```

`path` に拡張子 `.zip` があれば `unzip()` を処理し、拡張子 `.zip` の記述がない。もしくは拡張子 `.zip` があってもワイルドカード `*` の記述があれば `zip()` の処理を行います。

| unnamed | Description                       |
| ------- | --------------------------------- |
| `1`     | `path` 入力するフォルダやファイル |
| `2`     | `dest` 出力するフォルダファイル   |

| named    | short named | Description                       |
| -------- | ----------- | --------------------------------- |
| `--path` | `-p`        | `path` 入力するフォルダやファイル |
| `--dest` | `-d`        | `dest` 出力するフォルダファイル   |

# モジュールのバンドル（パッケージ化）とインストール

*wes* ではいくつかのモジュールをバンドルしたものをパッケージといいます。
*github* で公開されている *wes* 用のパッケージをインストールできます。
パッケージを公開する為には *github repository* が必要になります。

## *bundle*

*github* にパッケージを公開するにあたり、*bundle* は必要なモジュールをバンドルし、*bundle.json* を作成します。

1.  １つの *repository* で公開できるパッケージは１つになります
2.  *package.json* が必須になります。
    最低限 `main` フィールドの記述が必須です。
    ```json
    {
        "main": "index.js"
    }
    ```
3.  パッケージを公開する場合はリポジトリを *public* にしてください
4.  `version 0.12.0` からワーキングディレクトリより上層のディレクトリへの直接的なモジュール読み込みがあるパッケージはバンドル不可になります。上層のディレクトリ *wes\_modules* もしくは *node\_modules* にあるパッケージはバンドル可能です。

バンドルするには以下のコマンドを入力します。何をバンドルするかは *package.json* を参照します。

```bat
wes bundle 
```

## *init*

幾つかの項目を入力するとその情報から *package.json* を作成します。 

```bat
wes init
```

## *install*

*github* に公開されている *wes* 用のパッケージをインストールするのに使用します。
`version 0.10.28` からインストールフォルダが `node_modules` から `wes_modules` に変更になります。
`node_modules` にインストールする場合は、`--node` オプションを追加してください。
`version 0.12.0` からファイルを *bandle.json* から解凍して保存するようになります。仕様変更の為 `version 0.12.0` 未満でバンドルされたパッケージは `version 0.12.0` 以降では正しくインストールされない場合があります。

*install* には `@author/repository` という書式で引数を渡します。

```bat
wes install @wachaon/fmt
```

*install* にはオプションがあります。

| named         | short named | Description                                                                        |
| ------------- | ----------- | ---------------------------------------------------------------------------------- |
| `--bare`      | `-b`        | *@author* フォルダを作成しない                                                     |
| `--global`    | `-g`        | *wes.js* があるフォルダにパッケージをインストールする                              |
| `--save`      | `-S`        | *package.json* の *dependencies* フィールドにパッケージ名とバージョンを追加する    |
| `--save--dev` | `-D`        | *package.json* の *devDependencies* フィールドにパッケージ名とバージョンを追加する |
| `--node`      | `-n`        | *node\_module* フォルダにインストールする                                          |

`--bare` オプションは `require` の引数を `@author/repository` から `repository` に省略できます。
`--global` オプションはインストールしたパッケージを全てのスクリプトから利用できます。

```bat
wes install @wachaon/fmt --bare
```

# プライベートリポジトリにあるパッケージのインストール

*install* は *github* のパブリックリポジトリのパッケージだけでなく、プライベートリポジトリのパッケージもインストールできます。
*install* では *@author/repository* でパッケージを指定します。
実装では下記 url のダウンロードを試みます。

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/bundle.json`
```

ブラウザでプライベートリポジトリの *raw* にアクセスすると *token* が表示されますので、
その *token* をコピーして使用します。
*token* の有効時間内にコンソールで実行すれば、プライベートリポジトリのパッケージもインストールできます。

```bat
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

# パッケージの紹介

ここではいくつかの外部パッケージを紹介します。

## *@wachaon/fmt*

*@wachaon/fmt* は *prettier* を *wes* 用にパッケージ化したもので、スクリプトのフォーマットをします。
また、*@wachaon/fmt* がインストールされている状態で *Syntax Error* が発生した場合に
そのエラー箇所を提示できます。

### *@wachaon/fmt* のインストール

```bat
wes install @wachaon/fmt
```

ワーキングディレクトリに *.prettierrc* (JSON フォーマット) があれば設定に反映させます。
*fmt* は *CLI* と *module* の両方で使用できます。

#### *CLI* として使用する。

```bat
wes @wachaon/fmt src/sample --write
```

| unnamed number | Description                            |
| -------------- | -------------------------------------- |
| 1              | 必須。フォーマットしたいファイルのパス |

| named     | short named | Description      |
| --------- | ----------- | ---------------- |
| `--write` | `-w`        | 上書きを許可する |

`--write` もしくは `-w` の名前付き引数の指定があればフォーマットしたスクリプトでファイルを上書きします。

#### モジュールとして使用する

```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')
const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```

## *@wachaon/edge*
*Internet Explorer* が 2022/6/15 を以てサポートを完了します。それに伴い `require('InternetExplorer.Application')` でのアプリケーションの操作が不可能になることが予想されます。
また、サイト自体が *Internet Explorer* のサポートを終了することによって、正しく表示できなくります。
代替案は、*Microsoft Edge based on Chromium* を *web driver(msedgedriver.exe)* 経由で操作することになります。`@wachaon/edge` は *Edge* の自動操縦を簡素化します。

### *@wachaon/edge* のインストール
まずはパッケージをインストールします。

```bat
wes install @wachaon/edge --bare
```

次に *web driver(msedgedriver.exe)* をダウンロードします。

```bat
wes edge --download
```

インストールされている *Edge* のバージョンを確認して対応した *web driver* をダウンロードします。

### *@wachaon/edge* の使い方
簡単な使い方になります。
ブラウザを起動し、ウインドウサイズと表示するサイトを `https://www.google.com` に変更します。

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

ブラウザの *URL* が `https://www.yahoo` から始まるものになるまで、訪問履歴を保管します。

```javascript
const edge = require('edge')

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

*edge* は訪問した *URL* を順次コンソールに出力します。
`@wachaon/edge` は *URL* に対してイベントを登録して `res.exports` にデータを追加していきます。
登録する *URL* は `String` `RegExp` どちらでも可能で、柔軟な設定ができます。
イベントドリブンにすることで、自動操縦では対応が困難な処理などはあえてイベントを設定しないことで、容易に手動操作への切り替えが可能です。
スクリプトを停止させたい場合は、`navi.emit('terminate', res)` を実行するか、*Edge* を手動で終了させます。
終了処理はデフォルト値として `res.exports` を *.json* ファイルとして出力します。
終了処理を設定したい場合は、`edge(callback, terminate)` の `terminate` を設定します。
`window` はブラウザでの `window` ではなく、*@wachaon/webdriver* の *Window* クラスのインスタンスになります。

## *@wachaon/webdriver*
ブラウザを操作する *web driver* に対してリクエストを送るパッケージになります。
*@wachaon/edge* には *@wachaon/webdriver* が内包されております。

### *@wachaon/webdriver* のインストール

```bat
wes install @wachaon/webdriver --bare
```

*Chromium* ベースの *Microsoft Edge* の *web driver(msedgedriver.exe)* がなければダウンロードします。また、*edge* のバージョンと *web driver(msedgedriver.exe)* のバージョンが違う場合は同じバージョンの *web driver(msedgedriver.exe)* をダウンロードします。

```bat
wes webdriver --download
```

### *@wachaon/webdriver* の使い方

[*yahoo JAPAN*](https://www.yahoo.co.jp/) のサイトに移動し、特定のブロック要素のスクリーンショットを保存します。

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
