# WES

*wes* は *Windows Script Host* で *ECMAScript* を実行するフレームワークです

## Features

-  スクリプトエンジンを *Chakra* に変更し *ECMAScript2015+* の実行を可能にします
-  32bit の *cscript.exe* を使用するので、64bit環境 の固有の不具合を回避します
-  `require` でモジュールをインポートできます
-  標準出力に色付き文字を出力できます
-  ファイルのエンコードを自動で推測します

## Features not resolved

-  `WScript.Quit` はプログラムを中断出来ず、エラーコードも返しません
-  非同期処理
-  `WScript.CreateObject` の第二引数の *event prefix* の活用

## Install

*wes* に必要なのは *wes.js* ファイルのみです。
ダウンロードするにはコマンドプロンプトを起動して次のコマンドを入力してください。

```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

*wes* は実装として実行時に *WScript.Shell* の `SendKeys` を使用します。
*wes.js* を保存するディレクトリのパスに *ascii* 以外文字が含まれていると `SendKeys` で正しく送れず、
スクリプトが実行できません。
その場合は *wes.js* の保存先のパスを *ascii* のみで構成してください。

## Usage

コマンドラインにて `wes` に続けてプログラムの起点となるファイルを指定します。
スクリプトの拡張子 *.js* は省略できます。

```shell
wes index
```

また、*wes* には *REPL* が備わっているので、`wes` のみで起動させることで、
コマンドラインに直接入力したスクリプトを実行出来ます。

```shell
wes
```

空白行を２つ入力するまでスクリプトの入力を受け付けます。*README.md* でのサンプルスクリプトの
実行も *REPL* で確認出来ます。

## command-line named arguments

*wes* の起動オプションとして下記の名前付き引数を受け付けします。

| named             | description                                       |
|-------------------|---------------------------------------------------|
| `--monotone`      | *ANSI escape code* を排除します                   |
| `--safe`          | スクリプトを安全モードで実行します                |
| `--usual`         | スクリプトを通常モードで実行します (デフォルト)   |
| `--unsafe`        | スクリプトを安全ではないモードで実行します        |
| `--dangerous`     | スクリプトを危険なモードで実行します              |
| `--debug`         | スクリプトをデバックモードで実行します            |
| `--engine=Chakra` | このオプションは *wes* によって自動で付加されます |

`--safe` `--usual` `--unsafe` `--dangerous` の実装は不完全ですが、名前付き引数は予約されています。

## built-in objects

*wes* には *JScript* には無い *built-in objects* があります。

### require

*require* でモジュールをインポートします。*wes* ではモジュールファイルのエンコードを自動推測しますが、
正しく推測しない場合に第二引数でエンコードを指定することも可能です。

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

### module and module.exports

モジュールとして定義したい場合は `module.exports` に代入します。

```javascript
function add (a, b) {
    return a + b
}

module.exports = add
```


### console

*wes* では `WScript.Echo` や `WScript.StdErr.WriteLine` の代わりに *console* を使用します。

`console.log` でコマンドラインに文字を出力出来ます。また書式化文字列にも対応しています。
書式化演算子 `%` 使用して書式化文字列を指定できます。

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

*wes* では色付き文字列を出力する為に `WScript.StdOut.WriteLine` ではなく、`WScript.StdErr.WriteLine` を使用します。
`WScript.Echo`　や `WScript.StdOut.WriteLine` は出力を遮断されているので、`WScript.StdOut.WriteLine` もしくは `console.log` を使用してください。

### Buffer

バッファーを扱うことができます。

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```

### __dirname and __filename

`__filename` は現在実行しているモジュールファイルのパスが格納されています。
`__dirname` は `__filename` のディレクトリが格納されています。

```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```

## built-in modules

*wes* では基本的な処理を簡略・共通化するための *built-in modules* があります。

### ansi

`ansi` には *ANSI escape code* が格納されており、標準出力の色や効果を変更できます。
使用するコンソールアプリケーションの種類や設定によって色や効果などは異なる場合があります。

```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```

また、`ansi.color()` や `ansi.bgColor()` で独自の色の作成ができます。
引数は `255, 165, 0` などの *RGB* や `'#FFA500'` などの *color code* を使用します。
`orange` などの *color name* は使用できません。

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

### argv

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

### pathname

パスの操作をします。

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

### filesystem

ファイルの操作やディレクトリの操作をします。
`readTextFileSync` はファイルのエンコードを自動推測して読み込みます。

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```

### JScript

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

### VBScript

*VBScript* は *JScript* にはない機能のいくつかを提供します。

```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```

### httprequest

*httprequest* はその名の通り *http request* を発行します。

```javascript
const request = require('httprequest')
const content = request('GET', 'http://weather.livedoor.com/forecast/webservice/json/v1?city=130010')
console.log('%O', JSON.parse(content))
```

### minitest

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

### pipe

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

### typecheck

スクリプトの型の判定をします。

```javascript
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```

## Module bundle and install

*install* では *github* で公開されている *wes* 用のモジュールをインストール出来ます。
モジュールを公開する為には *github repository* が必要になります。
またリポジトリ名とローカルのディレクトリ名は同名にする必要があります。

### bundle

 *github* にモジュールを公開するにあたり、*bundle* は必要なモジュールをバンドルし、*install* モジュールで取り込める形式に変更します。

安全性を考え、*wes* では直接実行できる形式のモジュールを取り込みをさせないため、*bundle* モジュールにて *.json* ファイルを作成します。

モジュールをバンドルさせるにはいくつかの条件があります。

1. 一つの *repository* で公開できるモジュールは一種類になります。
1.  *github* のリポジトリ名とローカルのワーキングディレクトリ名は同名である必要があります。
1. 第三者にモジュールを公開する場合にはリポジトリはパブリックである必要があります。
1. *wes* ではスクリプトの静的解釈はしないので、`if` ステートメントなど特定条件時のみに `require` をしたモジュールはバンドルされない可能性があります。
1. *.json* ファイルはワーキングディレクトリに *directory_name.json* という名前で作成されます。ファイル名の変更やファイルを移動するとインストールできません。
1. `node_modules/directory_name` をバンドルする場合 `directory_name.json` を参照するのでバンドルが失敗します。

### install

*github* に公開されている *wes* 用のモジュールファイルをインストールするのに使用します。

## usage

*install* には `@author/repository` という書式で引数を渡します

```shell
wes install @wachaon/fmt
```

*install* にはオプションがあります

| named      | short named | description                                           |
|------------|-------------|-------------------------------------------------------|
| `--bare`   | `-b`        | *@author* フォルダを作成しない                        |
| `--global` | `-g`        | *wes.js* があるフォルダにモジュールをインストールする |

`--bare` オプションは `require` の引数を `author@repository` から `repository` に省略できます。
`--global` オプションはインストールしたモジュールを全てのスクリプトから利用できます。
上記のオプションは *wes* のセキュリティーオプション `--unsafe` もしくは `--dangerous` と
同時に指定する必要があります。

```shell
wes install @wachaon/fmt --bare --unsafe
```

# プライベートリポジトリのモジュールをインストール

*install* は *github* のパブリックリポジトリのモジュールだけでなく、プライベートリポジトリでもインストール可能です。

*install* では `author@repository` でモジュールを指定します。
実装では下記をダウンロードしています。

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```

ブラウザでプライベートリポジトリの *raw* にアクセスすると *token* が表示されますので、
その *token* をコピーして使用します。

*token* が有効な時間内にコマンドラインで実行すれば、プライベートリポジトリのモジュールもインストールできます。

```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

## External module

ここではいくつかの外部モジュールを紹介します。

### *@wachaon/fmt*

*@wachaon/fmt* は *prettier* をバンドルしたもので、スクリプトのフォーマットをします。
また、*@wachaon/fmt* がインストールされている状態で `SyntaxError` が発生した場合に
そのエラー箇所を提示できます。

#### install

```shell
wes install @wachaon/fmt
```

#### usage

ワーキングディレクトリに *.prettierrc* (JSONフォーマット) があれば設定に反映させます。
*fmt* では *CLI*（コマンドラインインターフェース）と *module* の両方で使用できます。

*CLI* として使用する

```shell
wes @wachaon/fmt src/sample --write
```

| unnamed number | description                            |
|----------------|----------------------------------------|
| 0              | -                                      |
| 1              | 必須。フォーマットしたいファイルのパス |


| named     | short named | description      |
|-----------|-------------|------------------|
| `--write` | `-w`        | 上書きを許可する |



 `--write` もしくは `-w` の名前付き引数の指定があればフォーマットしたスクリプトでファイルを上書きします。

#### *module* として使う場合

#### `option`

```javascript
{
    parser: 'babel',
    plugins: [babel]
}
```

#### `format`

| argument name | type     | description                 |
|---------------|----------|-----------------------------|
| `source`      | `string` | フォーマットしたい文字列    |
| `option?`     | `object` | *prettier* に渡すオプション |

```javascript
const { format } = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { resolve } = require('pathname')

const spec = resolve(process.cwd(), 'sample.js')
let source = readTextFileSync(spec)
source = format(source)
console.log(writeTextFileSync(spec, source))
```
