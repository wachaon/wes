# *WES*
*wes* は *WSH (Windows Script Host)* で *ECMAScript* を実行する、コンソール用のフレームワークです。
*README* の原文は [*japanese*](/README.md) になります。日本語以外は機械翻訳の文章になります。  
他言語の文章は下記から選択してください。

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

# 特徴

-  スクリプトエンジンを *Chakra* に変更して *ECMAScript2015+* の仕様で記述できます
-  常に 32bit の *cscript.exe* を実行するので、64bit 環境での固有の不具合が起こりません
-  モジュールシステムがあるので従来の *WSH* より効率的に開発できます
-  ビルトインモジュールがファイルの入出力やコンソールへ色付き文字を出力などの基本的な処理をサポートします
-  ファイルの読み込みにエンコードを自動推測させることができるので、エンコードなどを気にする必要がありません
-  モジュールをパッケージ化して外部公開や取得もサポートします

# *wes* が解決できない既知の問題

-  `WScript.Quit` はプログラムを中断出来ず、エラーコードも返しません
-  `setTimeout` や `Promise` など非同期処理はできません
-  `WScript.CreateObject` の第二引数の *event prefix* の使用はできません

# ダウンロード
*wes* に必要なのは *wes.js* ファイルのみです。
ダウンロードするには [*@wachaon/wes*](https://github.com/wachaon/wes) から *wes.js* をコピーするかコンソールで次のコマンドを実行してください。

```bat
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

*wes* は実装として実行時に *WScript.Shell* の `SendKeys` を使用します。
*wes.js* を保存するディレクトリのパスに *ascii* 以外文字が含まれていると `SendKeys` で正しくキーが送れず、
スクリプトが実行できません。  
*wes.js* の保存先のパスは *ascii* のみで構成してください。
既に *wes* をダウンロード済みの場合は次のコマンドでアップデートできます。

```bat
wes update
```

# 使い方
`wes` のキーワードに続きプログラムの起点となるファイルを指定したコマンドをコンソールへ入力します。
スクリプトの拡張子 *.js* は省略できます。

```bat
wes index
```

また、*wes* には *REP* が備わっているので、`wes` のみで起動させると、
スクリプトを直接入力できます。

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
| `--safe`           | スクリプトを安全モードで実行します                |
| `--usual`          | スクリプトを通常モードで実行します (デフォルト)   |
| `--unsafe`         | スクリプトを安全ではないモードで実行します        |
| `--dangerous`      | スクリプトを危険なモードで実行します              |
| `--debug`          | スクリプトをデバッグモードで実行します            |
| `--encoding=UTF-8` | 最初に読み込むファイルのエンコードを指定します    |
| `--engine=Chakra`  | このオプションは *wes* によって自動で付加されます |

`--safe` `--usual` `--unsafe` `--dangerous` `--debug` の実装は不完全ですが、名前付き引数は予約されています。

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
スクリプトの実行エンジンである *Chakra* は `imoprt` などの構文を解釈しますが `cscript` としての処理方法が定義されていないのか、そのままでは実行できません。
*wes* では *babel* をビルトインモジュールに加えることで、*es module* に対しても逐次トランスパイルしながら実行しています。そのためコストとして処理のオーバーヘッドと *wes.js* ファイルが肥大化しています。
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
*wes* では `WScript.Echo` や `WScript.StdErr.WriteLine` の代わりに *console* を使用します。
`console.log` でコンソールに文字を出力します。また書式化文字列にも対応しています。
書式化演算子 `%` 使用して書式化文字列を出力します。

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

# ビルトインモジュール
*wes* では基本的な処理を簡略・共通化するための *built-in modules* があります。

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
wes REP aaa -bcd eee --fgh=iii jjj --kln mmm
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
`wes` ではセキュリティーの観点から `/` および `\` で開始されるパスはワーキングディレクトリからの相対パスと解釈されます。 

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

```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```

## *httprequest*
*httprequest* は *http request* を発行します。

```javascript
const request = require('httprequest')
const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log('%O', JSON.parse(content))
```

## *minitest*
*minitest* は簡易的なテストを記述できます。
version `0.10.71` から基本コンセプトに立ち返って、アサーションの種類を３種類に減らしました。

### 使い方
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

#### `assert(value, message)` `assert.ok(value, message)`
厳密等価演算子 `===` で `true` と比較します。`value` が関数の場合は関数を実行した結果を評価します。

| Param     | Type                 | Description                    |
|:----------|:---------------------|:-------------------------------|
| `value`   | `{Function\|Boolean}` | 真偽値もしくは真偽値を返す関数 |
| `message` | `{String}`           | 失敗した場合のメッセージ       |

#### `assert.equal(expected, actual)`
オブジェクトを参照先ではなく、メンバーが同値かどうかで比較します。  
通常の厳密等価演算子では `true` にらない `NaN === NaN` `function (){} === function (){}` `/RegExp/g === /RegExp/g` や
`{one: {two: 2}} === {one: {two: 2}}` `[1,2,3] === [1,2,3]` なども成立します。  
クラス（オブジェクト）同士の比較の場合は同じコンストラクタもしくは `actual` が `expected` のスーパークラスである必要があります。

| Param      | Type    | Description |
|:-----------|:--------|:------------|
| `expected` | `{Any}` | 期待する値  |
| `actual`   | `{Any}` | 実際の値    |

#### `assert.throws(value, expected, message)`
正しくエラーが投げられているかを検証します。  
エラーが正しいかどうかは、期待されたエラーの *constructor* なのか、もしくは *message* が同値、 正規表現が *stack* を評価に合格するかどうかで判断されます。

| Param      | Type                   | Description                                                                     |
|:-----------|:-----------------------|:--------------------------------------------------------------------------------|
| `value`    | `{Error}`              | エラー                                                                          |
| `expected` | `{Error\|String\|RegExp}` | 期待するエラーの *constructor* か *message* もしくは *stack* を評価する正規表現 |
| `message`  | `{String}`             | 失敗した場合のメッセージ                                                        |

## *pipe*
*pipe* はパイプ処理を簡素化します。

### 使い方
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
スクリプトの型の判定をします。

### 使い方
```javascript
const { isString, isNumber, isBoolean, isObject } = require('typecheck')
const log = require('log')
log(() => isString("ECMAScript"))
log(() => isNumber(43.5))
log(() => isBoolean(false))
log(() => isObject(function(){}))
```
## *animate*
*animate* はコンソールの表示をアニメーションさせる手助けをします。

### 使い方
処理に時間が掛かる場合は進捗度合をコンソールにアニメーションとして表示させた方が親切です。

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
全てのキューが完了するか、`stop()` が実行された場合に`complete` 関数を実行します。

#### `static genProgressIndicator(animation)`
循環するアニメーションを表示する関数を生成します。

#### `register(callback, interval, conditional)`
処理を登録します。処理は複数登録でき、平行処理します。
`callback` の中で、アニメーションのストップの指示や、表示するビューの書き込みをします。
`interval` は処理間隔を指定します。
`conditional` は関数の場合は `conditional(count, queue)` を実行して結果が真の場合は次も継続して実行します。
`conditional` は数値の場合は `decrement(count)` を実行して結果が正の数値の場合は次も継続して実行します。
`conditional` が未定義の場合は1回のみ実行します。
注意するのは関数を指定した場合の `count` は増加するのに対し、数値を指定したの場合の `count` は減少します。

#### `stop()`

*animate* を中断します。

#### `cancel(queue)`

特定キューの処理を中断します。

#### `run()`

アニメーションを開始します。

#### `view`

コンソールに出力される文字を指定します。
一定間隔毎に文字を切り替えます。
`view` には *Arrary* と *String* のどちらかを代入します。
単一のアニメーションを更新する場合は *String* が便利で、
複数の行を個別にアニメーションする場合は *Array* が便利です。

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
*ProgID* から *COM Object* のメンバーの種類と説明を取得します。

### 使い方
```javascript
const getMember = require('getMember')
const FileSystemObject = 'Scripting.FileSystemObject'
console.log('require("%S") // => %O', FileSystemObject, getMember(FileSystemObject))
```

## *zip*
ファイルやフォルダの圧縮と圧縮ファイルの解凍をします。
内部で *PowerShell* 呼び出して処理をしています。

### 使い方
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

| unnamed |  Description                      |
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
またリポジトリ名とローカルのディレクトリ名は同名にする必要があります。

## *bundle*
 *github* にパッケージを公開するにあたり、*bundle* は必要なモジュールをバンドルし、インストールで取り込める形式に変更します。
安全性を考え、*wes* では直接実行できる形式のパッケージを取り込みをさせないため、*bundle* では *.json* ファイルを作成します。
パッケージ化をさせるにはいくつかの条件があります。

1.  １つの *repository* で公開できるパッケージは１つになります
2.  *github* のリポジトリ名とローカルのワーキングディレクトリ名は同名にしてください
3.  パッケージを公開する場合はリポジトリを *public* にしてください
4.  モジュールの取得はトップレベルのスコープで宣言してください
5.  パッケージの *.json* ファイルはワーキングディレクトリに *directory_name.json* という名前で作成されます。ファイル名の変更やファイルを移動するとインストールする際に参照できません
6.  `node_modules/directory_name` をバンドルの起点にする場合は
    ```bat
        wes bundle directory_name
    ```
    でバンドルせずに
    ```bat
        wes bundle node_modules/directory_name
    ```
    でバンドルしてください

## *install*
*github* に公開されている *wes* 用のパッケージをインストールするのに使用します。
`version 0.10.28` からインストールフォルダが `node_modules` から `wes_modules` に変更になります。
`node_modules` にインストールする場合は、`--node` オプションを追加してください。

### 使い方
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
| `--node`      | `-n`        | *node_module* フォルダにインストールする                                           |

`--bare` オプションは `require` の引数を `author@repository` から `repository` に省略できます。
`--global` オプションはインストールしたパッケージを全てのスクリプトから利用できます。
`--node` もしくは `-n` オプションは *wes* のセキュリティーオプション `--unsafe` もしくは `--dangerous` と
同時に指定する必要があります。

```bat
wes install @wachaon/fmt --bare --unsafe
```

# プライベートリポジトリにあるパッケージのインストール
*install* は *github* のパブリックリポジトリのパッケージだけでなく、プライベートリポジトリのパッケージもインストールできます。
*install* では *@author/repository* でパッケージを指定します。
実装では下記 url のダウンロードを試みます。

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
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

### インストール

```bat
wes install @wachaon/fmt
```

### 使い方
ワーキングディレクトリに *.prettierrc* (JSON フォーマット) があれば設定に反映させます。
*fmt* は *CLI* と *module* の両方で使用できます。

#### *CLI* として使用する。

```bat
wes @wachaon/fmt src/sample --write
```

| unnamed number | Description                            |
| -------------- | -------------------------------------- |
| 0              | -                                      |
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
*Internet Explorer* が 2022/6/15 を以てサポートを完了します。それに伴い `require('InternetExplorer.Application')` でのアプリケーションの操作も不可能になると予想されます。
代替案は、*Microsoft Edge based on Chromium* を *web driver* 経由で操作することになります。`@wachaon/edge` は *Edge* の自動操縦を簡素化します。

### インストール
まずはパッケージをインストールします。

```bat
wes install @wachaon/edge --unsafe --bare
```

次に *web driver* をダウンロードします。

```bat
wes edge --download
```

インストールされている *Edge* のバージョンを確認して対応した *web driver* をダウンロードします。

### 使い方
簡単な使い方になります。

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

このスクリプトは訪問した *URL* を順次コンソールに出力します。
`@wachaon/edge` は *URL* に対してイベントを登録して `res.exports` にデータを追加していきます。
登録する *URL* は `String` `RegExp` どちらでも可能で、柔軟な設定ができます。
イベントドリブンにすることで、自動操縦では対応が困難な処理などはあえてイベントを設定しないことで、容易に手動操作への切り替えが可能です。
スクリプトを停止させたい場合は、`navi.emit('terminate', res)` を実行するか、*Edge* を手動で終了させます。
終了処理はデフォルト値として `res.exports` を *.json* ファイルとして出力します。
終了処理を設定したい場合は、`edge(callback, terminate)` の `terminate` を設定します。
`window` はブラウザでの `window` ではなく、*@wachaon/webdriver* の *Window* クラスのインスタンスになります。

## *@wachaon/webdriver*
ブラウザを操作する *web driver* に対してリクエストを送るパッケージになります。
*@wachaon/edge* に組み込まれています。
*@wachaon/edge* と同様ブラウザ操作には *web driver* が別途必要になります。

### インストール

```bat
wes install @wachaon/webdriver --unsafe --bare
```

*Chromium* ベースの *Microsoft Edge* の *web driver* がなければダウンロードします。また、*edge* のバージョンと *web driver* のバージョンが違う場合は同じバージョンの *web driver* をダウンロードします。

```bat
wes webdriver --download
```
