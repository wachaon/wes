# WES

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
