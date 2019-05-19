# WES (Windows EcmaScript host)

WES は WSH を現代的なECMAScript構文で開発できる実行環境です。
Windows のオートメーション処理の開発コストを軽減できます。

## 特徴
-  chakra エンジンを使用して `const` `let` `() =>` `class` などの現代的なECMAScript構文で開発できる
-  モジュールを扱える
-  標準出力に色付き文字を出力できます
-  ファイルのエンコードを自動で推測します

## 取得

実行に必要なファイルは wes.js の1ファイルのみです。

コマンドプロンプトからダウンロード

```
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

もしくは下記リンク先から wes.js を取得して、プロジェクトルートに配置するか、配置先のディレクトリを環境変数に登録します。
https://github.com/wachaon/wes


## 使い方

コマンドプロンプトでプロジェクトルートまで移動をしたら `wes` に続けて起点となるファイルを入力します。

```
wes index.js
```

wes.js が cpu の 32/64bit の判断、実行エンジンを chakra に変更、色付き文字を出力するために ` | echo off` を付加して、
起点となるファイルを実行します。

## console

標準出力は `WScript.Echo()` ではなく、`console.log()` を使います。
色付き文字を出力したい場合は `console.ansi` にあるカラープロパティを使います。

また、色を RBG で指定できる `console.ansi.color()` `console.ansi.bgColor()` もあります。

色付き文字を表示するサンプル

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

console.log( `${ white }white ${ silver }silver ${ gray }gray${ clear }
${ red }red ${ green }green ${ yellow }yellow ${ blue }blue ${ magenta }magenta ${ cyan }cyan${ clear }
${ brightRed }brightRed ${ brightGreen }brightGreen ${ brightYellow }brightYellow${ clear }
${ brightBlue }brightBlue ${ brightMagenta }brightMagenta ${ brightCyan }brightCyan${ clear }
${ reverse }reverse${ clear } ${ underscore }underscore${ clear }
${ black + bgWhite }bgWhite ${ bgSilver }bgSilver ${ bgGray }bgGray${ clear }
${ black + bgRed }bgRed ${ bgGreen }bgGreen ${ bgYellow }bgYellow${ clear }
${ black + bgBlue }bgBlue ${ bgMagenta }bgMagenta ${ bgCyan }bgCyan${ clear }
${ black + bgBrightRed }bgBrightRed ${ bgBrightGreen }bgBrightGreen ${ bgBrightYellow }bgBrightYellow${ clear }
${ black + bgBrightBlue }bgBrightBlue ${ bgBrightMagenta }bgBrightMagenta ${ bgBrightCyan }bgBrightCyan${ clear }
${ color( '#E6DB74' ) + bgColor( '#272822' ) }color( '#E6DB74' ) + bgColor( '#272822' )${ clear }
${ color( 39, 40, 34 ) + bgColor( 174, 129, 255 ) }color( 39, 40, 34 ) + bgColor( 174, 129, 255 )${ clear }
`)
```

## require

モジュールは node.js で使われてる `module.exports` で定義して `require()` で読み込みます。

パスの指定も node.js の `require()` に似せているので、拡張子の指定も不要です。

[chardet](https://github.com/runk/node-chardet) を修正したものが標準モジュールにあるので、
UTF-8 以外のエンコードファイルも自動推測で読み込めます。

また、従来のオートメーションオブジェクトを呼ぶ場合

```javascript
var FSO = new ActiveXObject( 'Scripting.FileSystemObject' )
```

と、していたものを

```javascript
const FSO = require( 'Scripting.FileSystemObject' )
```

と、`require` で呼び出します。

## 標準モジュール

wes はいくつかの標準モジュールを持っています。

### filesyste

ファイルの読み書きを行います。

引数で指定する `path` を相対パスにした場合は常にプロジェクトルート `require( 'WScript.Shell' ).CurrentDirectory` が起点となります。

読み込みは `readFileSync( path, encode )` で読み込めます。`encode` を指定しない場合の戻り値は `Buffer` オブジェクトになります。

テキストファイルを読み込むならエンコードの自動推測を行う  `readTextFileSync( path )` が便利です。

ファイルを読み込みのサンプル

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

現時点では encode を `'UTF-8'` に指定した場合は `'UTF-8BOM'` ( utf-8 with byte order mark ) で書き込みます。( 読み込みは自動で `'UTF-8'`　の BOM を取り除きます。)

BOM なし ( utf-8 without byte order mark ) で書き込みたい場合は、明示的に `encode` に `'UTF-8N'` と指定してください。

 今後、 encode を `'UTF-8'` にした場合の規定値を変更する可能性があります。
 保存したファイルを他のプログラムで使用する可能性がある場合は、明示的に `'UTF-8BOM'` もしくは `'UTF-8N'` を指定してエンコードを固定してください。

ファイルを書き込むサンプル

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

wes ではパスの区切り文字は `\\` と `/` の両方使えます。
pathname のメソッドのほとんどは戻り値のパスの区切りを `/` にして返します。

### JScript

JScript 固有のコンストラクタの `Enumerator` を使用可能にします。
`new Enumerator( collection )` は常に `Array` を返します。

ディレクトリにある、すべてのファイルを読み込むサンプル

```javascript
const { Enumerator } = require( 'JScript' )
const FSO = require( 'Scripting.FileSystemObject' )
const path = require( 'pathname' )
const WShell = require( 'WScript.Shell' )
const fs = require( 'filesystem' )

const dir = path.join( WShell.CurrentDirectory, 'lib' )
const folder = FSO.GetFolder( dir )
const libs = new Enumerator( folder.Files )
  .map( file => file.Path )
  .map( path => fs.readTextFileSync( path ) )

libs.forEach( text => console.log( text ) )
```

### VBScript

VBScript 固有の `TypeName` や `VarType` と `VarType` をわかりやすくした `Type` が使えます。

`require( 'Scripting.FileSystemObject' )` オブジェクトを `TypeName` で表示するサンプル

```javascript
const { TypeName, Type, VarType } = require( 'VBScript' )
const FSO = require( 'Scripting.FileSystemObject' )

console.log( TypeName( FSO ) )
console.log( VarType( FSO ) )
console.log( Type( FSO ) )
```

## dump

オブジェクトを内容を簡易表記します。

オブジェクトの表示するサンプル

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

簡易ログ表示のサンプル

```javascript
const log = require( 'log' )

log( () => new Date() )
```

### minitest

簡易的なテストを実行できます。

テストのサンプル

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
### contract

与えられた引数の値が想定している値かどうかを確認します。
コマンドラインで名前付き引数を `/debug` にしなければ確認はしません。
条件に合致しない場合のみ画面に出力します。

```javascript
const contract = require( 'contract' )
const { isNumber } = require( 'typecheck' )
const log = require( 'log' )


const numbers = ( ...args ) => [
    ( arg ) => isNumber( arg ) && arg === parseInt( arg ),
    ( arg ) => isNumber( arg ) && arg === parseInt( arg )
].map( ( v, i ) => v( args[i] ) )

const two = 2
const five = 5
const _five = '5'
const eight = 8

const add = ( a, b ) => a + b

contract( add, numbers, two, five )
log( () => add( two, five ) )

contract( add, numbers, two, _five )
log( () => add( two, _five ) )


const sub = ( a, b ) => a - b

contract( sub, numbers, eight, five )
log( () => sub( eight, five ) )

contract( sub, numbers, eight, _five )
log( () => sub( eight, _five ) )
```