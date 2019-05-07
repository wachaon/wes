# WES (Windows EcmaScript host)

WES は WSH を現代的なECMAScript構文で開発できる実行環境です。
Windows のオートメーション処理をストレスなく開発できます。

## 特徴
-  chakra エンジンを使用して `const` `let` `() =>` `class` などの現代的なECMAScript構文で開発できる
-  モジュールを扱える
-  標準出力に色指定ができる
-  ファイルエンコードを自動推測できる

## 設定

https://github.com/wachaon/wes から wes.js を取得してプロジェクトルートに保存するか、
保存先のディレクトリのパスを環境変数に登録してください。

## 使い方

コマンドプロンプトでプロジェクトルートまで移動をしたら　`wes`　に続けて起点となるファイルを入力します。

```
wes index.js
```

wes.js が cpu の 32/64bit の判断、実行エンジンを chakra に変更、標準出力の色出力を可能にするコマンドを発行します

## console

標準出力は `WScript.Echo()` ではなく、`console.log()` を使います。
色付き文字を出力したい場合は `console.ansi` にあるカラープロパティを使います。

色付き文字を表示するサンプル

```javascript
const { 
    white, silver, gray,
    red, green, yellow, blue, magenta, cyan,
    brightRed, brightGreen, brightYellow,
    brightBlue, brightMagenta, brightCyan,
    reverse, underscore, clear
} = console.ansi

console.log( `
${ white }white ${ silver }silver ${ gray }gray
${ red }red ${ green }green ${ yellow }yellow ${ blue }blue ${ magenta }magenta ${ cyan }cyan
${ brightRed }brightRed ${ brightGreen }brightGreen ${ brightYellow }brightYellow
${ brightBlue }brightBlue ${ brightMagenta }brightMagenta ${ brightCyan }brightCyan
${ reverse }reverse${ clear } ${ underscore }underscore${ clear }
`)
```

## require

モジュールは node.js で使われてる `require()` `module.exports` で読み込みます。

パスの指定も node.js に似ているので、拡張子は自動で補間されます。

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

書き込みは `writeFileSync( path, data, encode )` で行います。`data` が `Buffer` もしくは `byte` の場合は `encode` の指定を無視して、`byte` を書き込みます。

テキストを保存する場合は `writeTextFileSync( path, text, encode )` を使います。`encode` を指定しない場合は `require( 'ADODB.stream' )` で `Charset` を省略した場合と同になります。

現時点では `encode` で `'UTF-8'` を指定した場合の規定値が `'UTF-8BOM'` ( utf-8 with byte order mark ) となります。

BOM なし ( utf-8 without byte order mark ) の場合は、明示的に `'UTF-8N'` と指定してください。

`'UTF-8'` の場合の規定値は変更される可能性があります。保存したファイルを他のプログラムで使用する可能性がある場合は明示的に `'UTF-8BOM'` `'UTF-8N'` を指定してエンコードを固定してください。

```javascript
const fs = require( 'filesystem' )
const path = require( 'pathname' )

const readme = path.join( __dirname, '_README.md' )

const text = 'Hello World'

console.log( fs.writeFileSync( readme, text, 'UTF-8N' ) )
// or
console.log( fs.writeTextFileSync( readme, text, 'UTF-8N' ) )
```

読み込みは `readFileSync( path, encode )` で行います。`encode` を指定しない場合の戻り値は `Buffer` オブジェクトになります。

`readTextFileSync( path )` はエンコードの自動推測を行うので、テキストファイルの場合はこちらが便利です。

ファイルを読み込みのサンプル

```javascript
const fs = require( 'filesystem' )
const path = require( 'pathname' )

const readme = path.join( __dirname, '_README.md' )

console.log( fs.readFileSync( readme, 'UTF-8' ) )
// or
console.log( fs.readTextFileSync( readme ) )
```

### pathname

パスの操作をします。

wes ではパスの区切り文字は `\\` と `/` の両方使えます。
pathname のメソッドのほとんどは戻り値のパスの区切りを `/` にして返します。

### JScript

JScript 固有のコンストラクタの `Enumerator` を使用可能にします。
`new Enumerator( collection )` は `Array` を返します。

カレントディレクトリにある、すべてのファイルを読み込むサンプル

```javascript
const { Enumerator } = require( 'JScript' )
const FSO = require( 'Scripting.FileSystemObject' )
const WShell = require( 'WScript.Shell' )
const fs = require( 'filesystem' )

const cd = FSO.GetFolder( WShell.CurrentDirectory )
const files = new Enumerator( cd.Files ).map( item => item.Path )

files.forEach( path => console.log( fs.readTextFileSync( path ) ) )
```

### VBScript

VBScript 固有の `TypeName` や `VarType` と `VarType` をわかりやすくした `Type` が使えます。

`require( 'Scripting.FileSystemObject' )` オブジェクトを `TypeName` で表示するサンプル

```javascript
const { TypeName, Type } = require( 'VBScript' )
const FSO = require( 'Scripting.FileSystemObject' )

console.log( TypeName( FSO ) )
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
    buffer: fs.readFileSync( 'index.js' ),
    array: [1, 'string'],
    object: {
        code: () => false
    },
}
obj.object.array = obj.array

console.log( dump( obj ) )
```


### log

アロー関数を引数に渡すことで、出力したい項目と内容が標準出力に出力されます。

簡易ログ表示のサンプル

```javascript
const log = require( 'log' )

const now = new Date()
log( () => now )
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

