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

*wes* に必要なのは *wes.js* のファイルのみです。
コマンドプロンプトを起動して次のコマンドを入力してください。

```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

*wes* は実装として *WScript.Shell* の `SendKeys` を使用します。
*wes.js* を保存するディレクトリのパスに *ascii* 以外文字が含まれており `SendKeys` で正しく処理出来ない場合は
*wes.js* の保存先を変更してください。

## Usage

コマンドラインにて `wes` に続けてプログラムの起点となるファイルを指定します。
スクリプトの拡張子 *.js* のは省略できます。

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



## built-in objects

*wes* には *JScript* には無い *built-in objects* があります。

### require

*require* でモジュールをインポートします。*wes* ではモジュールファイルのエンコードを自動推測しますが、
正しく推測しない場合に第二引数でエンコードを指定します。

また、`require('WScript.Shell')` の様に *OLE* に対しても *require* でインポート可能です。

```javascript
const WShell = require('WScript.Shell')
const ie = require('InternetExplorer.Application')
ie.Visible = true
ie.Navigate('https://google.com/')
while( ie.Busy || ie.readystate != 4 ) {
    WScript.Sleep( 100 )
}
WShell.AppActivate('Google')
```

### module and module.exports

`module.exports` に代入した値を `require` の戻り値としてエクスポートします。

### console

*wes* では `WScript.Echo` や `WScript.StdErr.WriteLine` の代わりに *console* を使用します。

`console.log` でコマンドラインに文字を出力出来ます。また書式化文字列にも対応しています。
書式化演算子 `%` 使用して書式化文字列を指定できます。

```javascript
console.log( `item: %j`,  {name: 'apple', id: '001', price: 120 } )
```

### Buffer

バッファーを扱うことができます。

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```

### __dirname and __filename

`__filename` は現在実行しているモジュールファイルのパスで `__dirname` はそのディレクトリを指します。

```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```

## built-in modules

*wes* では基本的な処理を簡略化するための *built-in modules* を搭載しています。

### ansi

`ansi` には *ANSI escape code* があり、標準出力の色や効果を変更できます。
使用するコンソールアプリケーションの種類や設定によって色や効果などは異なる場合があります。

```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log( brightRed + 'Error: ' + yellow + message )
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
const request = require('lib/httprequest')
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
console.log('(isBoolean(false) // => %O', isBoolean(false))
```

## Module bundle and install

*install* では *github* で公開されている *wes* 用のモジュールをインストール出来ます。
モジュールを公開する為には *github repository* が必要になります。
またリポジトリ名とローカルのディレクトリ名は同名にしてください。

### bundle

*wes* では *github* で公開されているモジュールを取り込むことができます。
モジュールを公開するにあたり、*bundle* モジュールは必要なモジュールをバンドルし、*install* モジュールで取り込める形式に変更します。

安全性を考え、*wes* ではスクリプトの直接的な取り込みをさせないため、*bundle* モジュールにて *.json* ファイルを作成します。

モジュールをバンドルさせるにはいくつかの条件があります。

1. 一つの *repository* に公開できるモジュールは一つになります。
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

| オプション名 | ショートオプション名 | 解説                                                  |
|--------------|----------------------|-------------------------------------------------------|
| `--bare`     | `-b`                 | *@author* フォルダを作成しない                        |
| `--global`   | `-g`                 | *wes.js* があるフォルダにモジュールをインストールする |

`--bare` オプションは `require` の引数を `author@repository` から `repository` に省略できます。
`--global` オプションはインストールしたモジュールを全てのスクリプトから利用できます。
上記のオプションは *wes* のセキュリティーオプション `--unsafe` もしくは `--dangerous` と
同時に指定する必要があります。


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

| unnamed number | description |
|---|---|
| 0 | - |
| 1 | 必須。フォーマットしたいファイル |

| short name | long name | description |
|---|---|---|
| `-w` | `--write` | 上書きを許可する |

`-w` もしくは `--write` の名前付き引数の指定があればフォーマットしたスクリプトでファイルを上書きします。

*module*

#### `option`

```javascript
{
    parser: 'babel',
    plugins: [babel]
}
```

#### `format`

| argument name | type | description |
|---|---|---|
| `source` | `string` | フォーマットしたい文字列 |
| `option?` | `object` | *prettier* に渡すオプション |



```javascript
const { format } = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { resolve } = require('pathname')

const spec = resolve(process.cwd(), 'sample.js')
let source = readTextFileSync(spec)
source = format(source)
console.log(writeTextFileSync(spec, source))
```

















*WES* は *WSH* で *ECMAScript* の実行を可能とします。

## 特徴
-  スクリプトエンジンを *Chakra* に変更し *ECMAScript* を使用可能にします
-  常に 32bit の *cscript.exe* を使用するので、64bit環境 の固有の不具合を回避します
-  `require()` でモジュールを呼び出せます
-  標準出力に色付き文字を出力できます
-  ファイルのエンコードを自動で推測します

## 出来ないこと
-  `WScript.Quit()` はプログラムを中断出来ず、エラーコードも返しません
-  非同期処理
-  `WScript.CreateObject()` の第二引数の *event prefix* の使用

## 取得

実行に必要なファイルは *wes.js* の1ファイルのみです。

コマンドプロンプトからダウンロード

```
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

もしくは下記リンク先から *wes.js* を取得して、カレントディレクトリに配置するか、配置先のディレクトリを環境変数に登録します。
https://raw.githubusercontent.com/wachaon/wes/master/wes.js


## 使い方

コマンドプロンプトで `wes` に続けて起点となるファイルを入力します。

```
wes index.js
```

*wes.js* が cpu の 32/64bit の判断、実行エンジンを *chakra* に変更、色付き文字を出力するために ` | echo off` を付加して、起点となるファイルを実行します。

## console

標準出力は `WScript.Echo()` ではなく、`console.log()` を使います。
色付き文字を出力したい場合は `console.ansi` にあるカラープロパティを使います。

また、色を RBG で指定できる `console.ansi.color()` `console.ansi.bgColor()` もあります。

```javascript
const {
    white, silver, gray,
    red, green, yellow, blue, magenta, cyan,
    brightRed, brightGreen, brightYellow,
    brightBlue, brightMagenta, brightCyan,
    reverse, underscore, clear, black,
    bgWhite, bgSilver, bgGray,
    bgRed, bgGreen, bgYellow,
    bgBlue, bgMagenta, bgCyan,
    bgBrightRed, bgBrightGreen, bgBrightYellow,
    bgBrightBlue, bgBrightMagenta, bgBrightCyan,
    color, bgColor
} = console.ansi

console.log( `${ white }white ${ silver }silver ${ gray }gray ${ clear }
${ red }red ${ green }green ${ yellow }yellow ${ blue }blue ${ magenta }magenta ${ cyan }cyan${ clear }
${ brightRed }brightRed ${ brightGreen }brightGreen ${ brightYellow }brightYellow${ clear }
${ brightBlue }brightBlue ${ brightMagenta }brightMagenta ${ brightCyan }brightCyan${ clear }
${ reverse }reverse${ clear } ${ underscore }underscore${ clear }\n
${ black + bgWhite } bgWhite ${ bgSilver } bgSilver ${ bgGray } bgGray ${ clear }
${ black + bgRed } bgRed ${ bgGreen } bgGreen ${ bgYellow } bgYellow ${ clear }
${ black + bgBlue } bgBlue ${ bgMagenta } bgMagenta ${ bgCyan } bgCyan ${ clear }
${ black + bgBrightRed } bgBrightRed ${ bgBrightGreen } bgBrightGreen ${ bgBrightYellow } bgBrightYellow ${ clear }
${ black + bgBrightBlue } bgBrightBlue ${ bgBrightMagenta } bgBrightMagenta ${ bgBrightCyan } bgBrightCyan ${ clear }
${ color( '#E6DB74' ) + bgColor( '#272822' ) } color( '#E6DB74' ) + bgColor( '#272822' ) ${ clear }
${ color( 39, 40, 34 ) + bgColor( 174, 129, 255 ) } color( 39, 40, 34 ) + bgColor( 174, 129, 255 )${ clear }
`)
```

## require

モジュールは *node.js* と同じように `module.exports` で定義して `require()` で読み込みます。

パスの指定も *node.js* の `require()` に似せていて、拡張子の指定も不要です。
( ver 0.6.0 から `/` から始めるパスをドライブレターからのパスではなく、カレントディレクトリからのパスとして扱うようになりました。)

*wes* の標準モジュールに [chardet](https://github.com/runk/node-chardet) があり、
*UTF-8* 以外のエンコードファイルも自動推測で読み込めます。

また、従来のオートメーションオブジェクトも `require()` で呼び出せます。

```javascript
const FSO = require( 'Scripting.FileSystemObject' )
```


## 標準モジュール

*wes* はいくつかの標準モジュールを持っています。

### argv

コマンドライン引数の処理を簡略化します。通常 *wsh* での 名前付き引数 は `/` から始まりますが、パスの区切りと混同するので
`--` ならびに `-` で 名前付き引数 を宣言します。

`require( 'argv' )` は 名前なし引数 の配列、 `require( 'argv' ).options` に 名前付き引数 の結果をオブジェクト化したものを格納しています。

`-` は 次の引数が 名前なし引数 の場合は値がその 名前なし引数 になり、それ以外の場合は値が `true` になります。
`--` は 間に `=` があれば右辺が値に、次の引数が 名前なし引数 の場合は値がその 名前なし引数 になり、それ以外の場合は値が `true` になります。

名前付き引数 の値になった 名前なし引数 は 名前なし引数の配列 には追加されません。

### filesystem

ファイルの読み書きを行います。

引数で指定する `path` を相対パスにした場合は常にカレントディレクトリ ( `require( 'WScript.Shell' ).CurrentDirectory` ) が起点となります。

読み込みは `readFileSync( path, encode )` で読み込めます。`encode` を指定しない場合の戻り値は `Buffer` オブジェクトになります。

テキストファイルを読み込むならエンコードの自動推測を行う  `readTextFileSync( path )` が便利です。

```javascript
const fs = require( 'filesystem' )
const path = require( 'pathname' )

const readme = path.join( __dirname, '_README.md' )

console.log( fs.readFileSync( readme, 'UTF-8' ) )
// or
console.log( fs.readTextFileSync( readme ) )
```

書き込みは `writeFileSync( path, data, encode )` で行います。`data` が `Buffer` もしくは `byte` の場合は `encode` の指定を無視して、`byte` を書き込みます。

テキストを保存する場合は `writeTextFileSync( path, text, encode )` を使います。`encode` を指定しない場合は `require( 'ADODB.stream' )` で `Charset` を省略した場合と同になります。

現時点では *encode* を `'UTF-8'` に指定した場合は `'UTF-8BOM'` ( utf-8 with byte order mark ) で書き込みます。( 読み込みは自動で `'UTF-8'`　の BOM を取り除きます。)

BOM なし ( utf-8 without byte order mark ) で書き込みたい場合は、明示的に `encode` に `'UTF-8N'` と指定してください。

今後、*encode* を `'UTF-8'` にした場合の規定値を変更する可能性があります。

保存したファイルを他のプログラムで使用する可能性がある場合は、明示的に `'UTF-8BOM'` もしくは `'UTF-8N'` を指定してエンコードを固定してください。


```javascript
const fs = require( 'filesystem' )
const path = require( 'pathname' )

const readme = path.join( __dirname, '_README.md' )

const text = 'Hello World'

console.log( fs.writeFileSync( readme, text, 'UTF-8N' ) )
// or
console.log( fs.writeTextFileSync( readme, text ) )
```

### pathname

パスの操作をします。

*wes* ではパスの区切り文字は `\\` と `/` の両方使えます。
*pathname* のメソッドのほとんどは戻り値のパスの区切りを `/` にして返します。

### JScript

*JScript* 固有のコンストラクタの `Enumerator` や `ActiveXObject` を使用可能にします。
`new Enumerator( collection )` は常に `Array` を返します。

```javascript
const { Enumerator, ActiveXObject } = require( 'JScript' )
const FSO = new ActiveXObject( 'Scripting.FileSystemObject' )
const WShell = require( 'WScript.Shell' )
const { join } = require( 'pathname' )
const fs = require( 'filesystem' )

const dir = join( WShell.CurrentDirectory, 'lib' )
const folder = FSO.GetFolder( dir )
const libs = new Enumerator( folder.Files )
  .map( file => file.Path )
  .map( path => fs.readTextFileSync( path ) )

libs.forEach( text => console.log( text ) )
```

### VBScript

*VBScript* 固有の `TypeName` や `VarType` と `VarType` をわかりやすくした `Type` が使えます。

```javascript
const { TypeName, Type, VarType } = require( 'VBScript' )
const FSO = require( 'Scripting.FileSystemObject' )

console.log( TypeName( FSO ) )
console.log( VarType( FSO ) )
console.log( Type( FSO ) )
```

## dump

オブジェクトを内容を色付き文字で、簡易表記します。

```javascript
const dump = require( 'dump' )
const fs = require( 'filesystem' )

const obj = {
    none: null,
    undefined: undefined,
    string: 'string',
    number: 1234,
    fn( name ){ return name },
    now: new Date(),
    regexp: /regexp/g,
    boolean: true,
    isSymbol: Symbol( fs ),
    buffer: fs.readFileSync( 'README.md' ),
    array: [1, 'string'],
    object: {
        code: () => false
    },
}
obj.object.array = obj.array

console.log( dump( obj ) )
```

### log

関数を引数に渡すことで、出力したい項目と内容が標準出力に出力されます。

```javascript
const log = require( 'log' )

log( () => new Date() )
```

### minitest

簡易的なテストを実行できます。

```javascript
const { describe, it, assert } = require( 'minitest' )

describe( 'test sample', () => {
    it( '1 + 1 === 2', () => {
        assert( 1 + 1 === 2 )
    } )
    it( '1 * 1 !== 2', () => {
        assert.ng( 1 * 1 !== 2 )
    } )
    it( '1 * 1 !== 2', () => {
        assert.ok( 1 * 1 !== 2 )
    } )
} )
```

### typecheck

*ECMAScript* で扱う変数の型を確認する関数を提供します。

```javascript
const { isString } = require( 'typecheck' )

console.log( isString( 'foo' ) )
```

## モジュールエコシステム

*wes* で使用するモジュールを一元管理するエコシステムは存在しません。
代わりに github 利用して モジュールを公開する方法とインストールする方法を提供します。

### モジュールバンドルと登録

モジュールを他者がインストールできるようにするには *github* でリポジトリを公開することが条件になります。
また、レポジトリ名とローカルのカレントディレクトリ名は同名にしてください。
カレントディレクトリを `wes` にするとエラーで登録できません。

*github* のユーザー名が `wachaon`、カレントディレクトリが `C:/calc`、 モジュールの起点のファイルが `C:/calc/index.js` にあるとします。

```
wes bundle /index
```

とコマンドを打つと `C:/calc/calc.json` に モジュールをバンドルした JSONファイル が作成されます。
このバンドルされた JSONファイルを *github* に `push` してください。

### モジュールのインストール

以下のコマンドでモジュールをインストールできます。

```
wes install @wachaon/calc
```

モジュールを使用する場合は以下のように呼び出します。

```javascript
const calc = require( '@wachaon/calc' )
```

コマンドライン引数で `--core`、`--global` を `--unsafe` もしくは `--danger` のオプションと一緒に宣言することでモジュールの名前とインストール先を変更します。

+   `--core` は呼び出し時の `@author` を省いて呼び出しできます。(上記の場合は `require( 'calc' )` )

+   `--global` はモジュールを `WScript.ScriptFullName` ( *wes.js* のあるディレクトリ ) の `node_modules` フォルダにインストールします。
