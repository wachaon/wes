# *WES*

*wes* はコマンドラインの *Windows Script Host* で *ECMAScript* を実行するフレームワークです。

*README* の原文は [*japanese*](/README.md) になります。日本語以外は機械翻訳の文章になります。  
他言語の文章は下記から選択してください。

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


# Features

-   *Windows Script Host* のスクリプトエンジンを *Chakra* に変更し *ECMAScript2015+* を実行します
-   常に 32bit の *cscript.exe* を実行するので、64bit環境での固有の不具合はありません
-   `require` でモジュールをインポートします (*ver 0.9.0* から *es module* に対応しました)
-   標準出力に色付き文字を出力します
-   テキストファイルのエンコードを自動で推測し読み込みます

# Known issues wes can't solve

-   `WScript.Quit` はプログラムを中断出来ず、エラーコードも返しません
-   `setTimeout` や `Promise` など非同期処理は出来ません
-   `WScript.CreateObject` の第二引数の *event prefix* の使用は出来ません

# Install

*wes* に必要なのは *wes.js* ファイルのみです。
ダウンロードするにはコマンドプロンプトを起動して次のコマンドを入力してください。

```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

*wes* は実装として実行時に *WScript.Shell* の `SendKeys` を使用します。
*wes.js* を保存するディレクトリのパスに *ascii* 以外文字が含まれていると `SendKeys` で正しくキーが送れず、
スクリプトが実行できません。  
*wes.js* の保存先のパスは *ascii* のみで構成してください。

## Usage

コマンドラインにて `wes` に続けてプログラムの起点となるファイルを指定します。
スクリプトの拡張子 *.js* は省略できます。

```shell
wes index
```

また、*wes* には *REPL* が備わっているので、`wes` のみで起動させると、
スクリプトを直接入力できます。

```shell
wes
```

空行を２つ入力するまでスクリプトの入力を受け付けます。*README.md* でのサンプルスクリプトの
実行も *REPL* で確認出来ます。

## command-line named arguments

*wes* の起動オプションは下記になります。

| named              | description                                       |
| ------------------ | ------------------------------------------------- |
| `--monotone`       | *ANSI escape code* を排除します                   |
| `--safe`           | スクリプトを安全モードで実行します                |
| `--usual`          | スクリプトを通常モードで実行します (デフォルト)   |
| `--unsafe`         | スクリプトを安全ではないモードで実行します        |
| `--dangerous`      | スクリプトを危険なモードで実行します              |
| `--debug`          | スクリプトをデバックモードで実行します            |
| `--encoding=UTF-8` | 最初に読み込むファイルのエンコードを指定します    |
| `--engine=Chakra`  | このオプションは *wes* によって自動で付加されます |

`--safe` `--usual` `--unsafe` `--dangerous` `--debug` の実装は不完全ですが、名前付き引数は予約されています。

# module system

*wes* は一般的な `require()` を使用する *commonjs module* のシステムと `import` を使用する
*es module* のシステムに対応しています。(*dynamic import* は非同期処理の為、未対応)

## *commonjs module*

`module.exports` への代入と `require()` での呼び出しでモジュールを管理します。
利便上 *node_modules* ディレクトリへの対応もしています。

*wes* の `require()` はモジュールファイルのエンコードを自動推測しますが、
正しく推測しない場合に第二引数でエンコードを指定することも可能です。

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

また、`require('WScript.Shell')` の様に *OLE* に対しても *require* でインポート可能です。

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

スクリプトの実行エンジンである *Chakra* は `imoprt` などの構文を解釈しますが `cscript` としての処理方法が定義されていないのか、そのままでは実行はできません。
*wes* では *babel* を内包。
*es module* に対して逐次トランスパイルしながら実行しています。そのためコストとして処理のオーバーヘッドとファイルが肥大化しています。

*es module* で記述されているモジュールもトランスパイルで `require()` に変換されるため、*OLE* の呼び出しも可能です。
しかしながらモジュールファイルのエンコード指定には対応していません。全て自動推測で読み込まれます。

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

# built-in objects

*wes* には *WSH (JScript)* には無い *built-in objects* があります。

## *console*

*wes* では `WScript.Echo` や `WScript.StdErr.WriteLine` の代わりに *console* を使用します。

`console.log` でコマンドラインに文字を出力します。また書式化文字列にも対応しています。
書式化演算子 `%` 使用して書式化文字列を出力します。

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

*wes* では色付き文字列を出力する為に `WScript.StdOut.WriteLine` ではなく、`WScript.StdErr.WriteLine` を使用します。
`WScript.Echo` や `WScript.StdOut.WriteLine` は出力を遮断されているので、`WScript.StdErr.WriteLine` もしくは `console.log` を使用してください。

## *Buffer*

バッファーを扱うことができます。

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```

## `__dirname` and `__filename`

`__filename` は現在実行しているモジュールファイルのパスが格納されています。
`__dirname` は `__filename` のディレクトリが格納されています。

```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```

# built-in modules

*wes* では基本的な処理を簡略・共通化するための *built-in modules* があります。

## *ansi*

`ansi` には *ANSI escape code* があり、標準出力の色や効果を変更できます。
使用するコンソールアプリケーションの種類や設定によって色や効果などは異なる場合があります。

```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```

また、`ansi.color()` や `ansi.bgColor()` で独自の色の作成ができます。
引数は `255, 165, 0` などの *RGB* や `'#FFA500'` などの *color code* を使用します。
`orange` などの *color name* には対応していません。

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

*REPL* と一緒にコマンドライン引数を入力します。

```shell
wes REPL aaa -bcd eee --fgh=iii jjj --kln mmm
```

*REPL* で次のスクリプトを実行します。

```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```

## *pathname*

パスの操作をします。

一般的には `/` および `\` から開始されるパスはドライブルートからの相対パスを指しますが、(例えば `/filename` は `C:/filename` と同じパスになる場合があります) `wes` ではセキュリティーの観点から `/` および `\` から開始されるパスはワーキングディレクトリからの相対パスと解釈されます。 

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

## *filesystem*

ファイルの操作やディレクトリの操作をします。
`readTextFileSync` はファイルのエンコードを自動推測して読み込みます。


```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```

## *chardet*

https://github.com/runk/node-chardet の一部の機能を使用しています。

エンコード固有の文字を増やすことで自動推測の精度を上げれます。

## *JScript*

スクリプトエンジンを *Chakra* に変更すると、*JScript* 固有の *Enumerator* などが使用できなくなります。
ビルトインモジュールの *JScript* はそれらを使用可能にします。
ただし、*Enumerator* は Enumeratorオブジェクトではなく *Array* を返します。

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

```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```

## *httprequest*

*httprequest* はその名の通り *http request* を発行します。

```javascript
const request = require('httprequest')
const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log('%O', JSON.parse(content))
```

## *minitest*

*minitest* は簡易的なテストを記述できます。

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

*pipe* はパイプ処理を簡素化します

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

スクリプトの型の判定をします。

```javascript
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```

# Module bundle and install

*install* では *github* で公開されている *wes* 用のモジュールをインストール出来ます。
モジュールを公開する為には *github repository* が必要になります。
またリポジトリ名とローカルのディレクトリ名は同名にする必要があります。

## *bundle*

 *github* にモジュールを公開するにあたり、*bundle* は必要なモジュールをバンドルし、*install* モジュールで取り込める形式に変更します。

安全性を考え、*wes* では直接実行できる形式のモジュールを取り込みをさせないため、*bundle* モジュールにて *.json* ファイルを作成します。

モジュールをバンドルさせるにはいくつかの条件があります。

1.  一つの *repository* で公開できるモジュールは一種類になります。
2.  *github* のリポジトリ名とローカルのワーキングディレクトリ名は同名である必要があります。
3.  第三者にモジュールを公開する場合にはリポジトリはパブリックである必要があります。
4.  *wes* はモジュールのパスを動的に解釈します。`if` ステートメントなど特定条件時に `require` で取得したモジュールはバンドルされない可能性があります。
5.  *.json* ファイルはワーキングディレクトリに *directory_name.json* という名前で作成されます。ファイル名の変更やファイルを移動するとインストールできません。
6.  `node_modules/directory_name` をバンドルする場合 `directory_name.json` を参照するのでバンドルが失敗します。

## *install*

*github* に公開されている *wes* 用のモジュールファイルをインストールするのに使用します。

### usage

*install* には `@author/repository` という書式で引数を渡します

```shell
wes install @wachaon/fmt
```

*install* にはオプションがあります

| named      | short named | description                                           |
| ---------- | ----------- | ------------------------------------------------------|
| `--bare`   | `-b`        | *@author* フォルダを作成しない                        |
| `--global` | `-g`        | *wes.js* があるフォルダにモジュールをインストールする |

`--bare` オプションは `require` の引数を `author@repository` から `repository` に省略できます。
`--global` オプションはインストールしたモジュールを全てのスクリプトから利用できます。
上記のオプションは *wes* のセキュリティーオプション `--unsafe` もしくは `--dangerous` と
同時に指定する必要があります。

```shell
wes install @wachaon/fmt --bare --unsafe
```

# Install the module of private repository

*install* は *github* のパブリックリポジトリのモジュールだけでなく、プライベートリポジトリでもインストール可能です。

*install* では `author@repository` でモジュールを指定します。
実装では下記をダウンロードしています。

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```

ブラウザでプライベートリポジトリの *raw* にアクセスすると *token* が表示されますので、
その *token* をコピーして使用します。

*token* の有効時間内にコマンドラインで実行すれば、プライベートリポジトリのモジュールもインストールできます。

```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

# External module

ここではいくつかの外部モジュールを紹介します。

## *@wachaon/fmt*

*@wachaon/fmt* は *prettier* をバンドルしたもので、スクリプトのフォーマットをします。
また、*@wachaon/fmt* がインストールされている状態で `SyntaxError` が発生した場合に
そのエラー箇所を提示できます。

### install

```shell
wes install @wachaon/fmt
```

### usage

ワーキングディレクトリに *.prettierrc* (JSONフォーマット) があれば設定に反映させます。
*fmt* では *CLI*（コマンドラインインターフェース）と *module* の両方で使用できます。

*CLI* として使用する

```shell
wes @wachaon/fmt src/sample --write
```

| unnamed number | description                            |
| -------------- | -------------------------------------- |
| 0              | -                                      |
| 1              | 必須。フォーマットしたいファイルのパス |

| named     | short named | description      |
| --------- | ----------- | ---------------- |
| `--write` | `-w`        | 上書きを許可する |

 `--write` もしくは `-w` の名前付き引数の指定があればフォーマットしたスクリプトでファイルを上書きします。

### When used as *module*

### `option`

```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')

const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```

## `@wachaon/edge`

*Internet Explorer* が2022年6月15日を以てサポートを完了します。それに伴い `require('InternetExplorer.Application')` でのアプリケーションの操作も不可能になります。

代替案として、*Microsoft Edge based on Chromium* を *web driver* 経由で操作することになりますが、`@wachaon/edge` は *Edge* の自動操縦を簡素化します。

### install

まずはモジュールをインストールします。

```shell
wes install @wachaon/edge --unsafe --bare
```
次に *web driver* をダウンロードします。

```shell
wes edge
```
ダウンロードした *zip* を解凍して、*msedgedriver.exe* をカレントディレクトリに移動させます。

### usage

簡単な使い方になります。

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
このスクリプトは訪問した *URL* を順次コマンドプロンプトに出力します。

`@wachaon/edge` は *URL* に対してイベントを登録して `res.exports` にデータを追加していきます。
登録する *URL* は `String` `RegExp` どちらでも可能で、柔軟な設定ができます。

イベントドリブンにすることで、自動操縦では対応が困難な処理などはあえて *URL* を設定しないことで、容易に手動操作への切り替えが可能です。

スクリプトを停止させたい場合は、`navi.emit('terminate', res)` を実行するか、*Edge* を手動で終了させます。

終了処理は既定値として `res.exports` を *.json* ファイルとして出力します。
終了処理を設定したい場合は、`edge(callback, terminate)` の `terminate` を設定します。
