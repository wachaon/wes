# WES

*wes* は *Windows Script Host* で *ECMAScript* を実行するフレームワークです

## Features

-  スクリプトエンジンを *Chakra* に変更し *ECMAScript* を使用可能にします
-  常に 32bit の *cscript.exe* を使用するので、64bit環境 の固有の不具合を回避します
-  `require()` でモジュールを呼び出せます
-  標準出力に色付き文字を出力できます
-  ファイルのエンコードを自動で推測します

## Features not resolved

-  `WScript.Quit()` はプログラムを中断出来ず、エラーコードも返しません
-  非同期処理
-  `WScript.CreateObject()` の第二引数の *event prefix* の活用

## Install

コマンドプロンプトを起動して次のコマンドを入力してください。

```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

## Usage

コマンドラインにて `wes` に続けてプログラムの起点となるファイルを指定します。
スクリプトの拡張子 *.js* の入力は省くことができます。

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

## Global

*wes* には *JScript* には無い *Global Object* があります。

### require

*require* でモジュールを取得出来ます。*wes* ではモジュールファイルのエンコードを自動推測しますが、
正しく推測しない場合に第二引数でエンコードを指定します。

また、`require('WScript.Shell')` の様に *OLE* に対しても *require* で取得可能です。

### module and module.exports

`module.exports` に代入した値をモジュールの値としてエクスポート出来ます。

### console

*wes* では `WScript.Echo` や `WScript.StdErr.WriteLine` の代わりに *console* を使用します。

#### console.log

`console.log` でコマンドラインに文字を出力出来ます。また書式化文字列にも対応しています。

書式化演算子 `%` 使用して書式化文字列を指定できます。

```javascript
console.log( `item: %j`,  {name: 'apple', id: '001', price: 120 } )
// => item: {"name":"apple","id":"001","price":120}
```

### console.ansi

`console.ansi` にはあらかじめ *ANSI escape code* があります。
使用するコンソールアプリケーションの種類や設定によって色や効果などは異なる場合があります。
`console.log()` は出力の最後に `console.ansi.clear` を追加し、初期化されます。

| プロパティ        | 値            |
|-------------------|---------------|
| `bold`            | `\u001B[1m`   |
| `underscore`      | `\u001B[4m`   |
| `blink`           | `\u001B[5m`   |
| `reverse`         | `\u001B[7m`   |
| `concealed`       | `\u001B[8m`   |
| `black`           | `\u001B[30m`  |
| `red`             | `\u001B[31m`  |
| `green`           | `\u001B[32m`  |
| `yellow`          | `\u001B[33m`  |
| `blue`            | `\u001B[34m`  |
| `magenta`         | `\u001B[35m`  |
| `cyan`            | `\u001B[36m`  |
| `silver`          | `\u001B[37m`  |
| `gray`            | `\u001B[90m`  |
| `brightRed`       | `\u001B[91m`  |
| `brightGreen`     | `\u001B[92m`  |
| `brightYellow`    | `\u001B[93m`  |
| `brightBlue`      | `\u001B[94m`  |
| `brightMagenta`   | `\u001B[95m`  |
| `brightCyan`      | `\u001B[96m`  |
| `white`           | `\u001B[97m`  |
| `bgBlack`         | `\u001B[40m`  |
| `bgRed`           | `\u001B[41m`  |
| `bgGreen`         | `\u001B[42m`  |
| `bgYellow`        | `\u001B[43m`  |
| `bgBlue`          | `\u001B[44m`  |
| `bgMagenta`       | `\u001B[45m`  |
| `bgCyan`          | `\u001B[46m`  |
| `bgSilver`        | `\u001B[47m`  |
| `bgGray`          | `\u001B[100m` |
| `bgBrightRed`     | `\u001B[101m` |
| `bgBrightGreen`   | `\u001B[102m` |
| `bgBrightYellow`  | `\u001B[103m` |
| `bgBrightBlue`    | `\u001B[104m` |
| `bgBrightMagenta` | `\u001B[105m` |
| `bgBrightCyan`    | `\u001B[106m` |
| `bgWhite`         | `\u001B[107m` |

```javascript
const message = 'File does not exist'
console.log( console.ansi.brightRed + 'Error: ' + console.ansi.brightMagenta + message )
```

`console.ansi.color()` や `console.ansi.bgColor()` で色の作成ができます。
引数は `255, 165, 0` などの *RGB* や `'#FFA500'` などの *color code* が使用できますが、`orange` などの *color name* は使用できません。

```javascript
const orange = console.ansi.color(255, 165, 0)
console.log(orange + 'Hello World')
```

### Buffer

### __dirname and __Filename

## Standard module

*wes* では基本的な処理を簡略化するための *Standard module* を搭載しています。

### argv

### pathname

### filesystem

### JScript

### VBScript

### inspect

### httprequest

### minitest

### pipe

### text

### typecheck

## Module bundle and install

### bundle

### install

## External module

ここではいくつかの外部モジュールを紹介します。

### *@wachaon/fmt*

*@wachaon/fmt* は *prettier* をバンドルしたもので、スクリプトのフォーマットをします。

#### install

```shell
wes install @wachaon/fmt
```

#### usage

ワーキングディレクトリに *.prettierrc* (JSONフォーマットのみ対応) があれば設定に反映させます。
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

*@wachaon/fmt* はコマンドラインから直接実行も可能です。

```shell
wes @wachaon/fmt sample.js dist/sample.js --write
```

また、*wes* で *SyntaxError* が発生した場合に *@wachaon/fmt* をインストールしておけば
どの部分で *SyntaxError* が発生したか *prettier* のエラーから確認出来ます。
（正規表現での *SyntaxError* は *prettier* では確認できません。）

















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
