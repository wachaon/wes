# *WES*


*wes* ialah rangka kerja konsol yang menjalankan *ECMAScript* pada *WSH (Windows Script Host)* .


Teks asal *README* adalah bahasa [*japanese*](/README.md) . Selain bahasa Jepun, ia adalah ayat yang diterjemahkan oleh mesin.  
Sila pilih ayat dalam bahasa lain daripada yang berikut.


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



# ciri


-   Anda boleh menukar enjin skrip kepada *Chakra* dan menulisnya dalam spesifikasi *ECMAScript2015*
-   Ia sentiasa menjalankan 32bit *cscript.exe* , jadi tiada masalah yang wujud dalam persekitaran 64bit.
-   Dengan sistem modular, anda boleh membangun dengan lebih cekap daripada *WSH* tradisional
-   Modul terbina dalam menyokong pemprosesan asas seperti input / output fail dan output aksara berwarna ke konsol.
-   Anda tidak perlu risau tentang pengekodan kerana anda boleh meminta fail dibaca secara automatik meneka pengekodan.
-   Kami juga membungkus modul untuk menyokong penerbitan dan pengambilan luaran.


# Isu yang *wes* tidak dapat diselesaikan


-   `WScript.Quit` tidak boleh mengganggu program dan tidak mengembalikan kod ralat
-   Pemprosesan tak segerak seperti `setTimeout` dan `Promise` tidak boleh dilakukan
-   Anda tidak boleh menggunakan *event prefix* sebagai hujah kedua `WScript.CreateObject`


# muat turun


Wes hanya memerlukan *wes* *wes.js* . Untuk memuat turun, salin *wes.js* daripada [*@wachaon/wes*](https://github.com/wachaon/wes) atau jalankan arahan berikut dalam konsol.


```bat
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```


*WScript.Shell* menggunakan `SendKeys` dalam *wes* pada masa jalan sebagai pelaksanaan. Jika laluan direktori tempat *wes.js* disimpan mengandungi aksara selain *ascii* , `SendKeys` tidak akan dapat menghantar kunci dengan betul dan skrip tidak akan dapat dilaksanakan.  
Sila konfigurasikan laluan untuk menyimpan *wes.js* sahaja *ascii* .


Jika anda telah memuat turun *wes* , anda boleh mengemas kininya dengan arahan berikut.


```bat
wes update
```


# Bagaimana nak guna


Masukkan arahan ke konsol yang menentukan fail yang akan menjadi titik permulaan program berikutan kata kunci `wes` . Sambungan skrip *.js* boleh diabaikan.


```bat
wes index
```


Selain itu, *wes* mempunyai *REP* , jadi jika anda memulakannya hanya dengan `wes` , anda boleh memasukkan skrip terus.


```bat
wes
```


*REP* menerima input skrip sehingga anda memasukkan dua baris kosong. Anda juga boleh menyemak pelaksanaan skrip sampel dalam *README.md* dengan *REP* .


## Pilihan baris arahan


Pilihan permulaan untuk *wes* adalah seperti berikut.


| bernama            | Penerangan                                       |
| ------------------ | ------------------------------------------------ |
| `--monotone`       | Hapuskan *ANSI escape code*                      |
| `--safe`           | Jalankan skrip dalam mod selamat                 |
| `--usual`          | Jalankan skrip dalam mod biasa (lalai)           |
| `--unsafe`         | Jalankan skrip dalam mod tidak selamat           |
| `--dangerous`      | Jalankan skrip dalam mod berbahaya               |
| `--debug`          | Jalankan skrip dalam mod nyahpepijat             |
| `--encoding=UTF-8` | Menentukan pengekodan fail pertama untuk dibaca  |
| `--engine=Chakra`  | Pilihan ini ditambah secara automatik oleh *wes* |


Pelaksanaan `--safe` `--usual` `--unsafe` `--dangerous` `--debug` tidak lengkap, tetapi hujah yang dinamakan dikhaskan.


# Sistem modular


*wes* menyokong dua sistem modul, sistem *commonjs module* yang menggunakan `require()` dan *es module* yang menggunakan `import` . ( *dynamic import* ialah pemprosesan tak segerak, jadi ia tidak disokong)


## *commonjs module*


Urus modul dengan memberikan kepada `module.exports` dan memanggil dengan `require()` . Untuk laluan selain daripada laluan mutlak dan laluan relatif bermula dengan `./` dan `../` , cari modul dalam direktori *wes_modules* dan, untuk kemudahan, direktori *node_modules* .


*wes* `require()` secara automatik meneka pengekodan fail modul, tetapi jika ia tidak meneka dengan betul, anda boleh menentukan pengekodan dengan hujah kedua.


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


Anda juga boleh mengimport ke *ActiveX* seperti *require* `require('WScript.Shell')` dengan memerlukan.


```javascript
const Shell = require('Shell.Application')
Shell.MinimizeAll()
WScript.Sleep(2000)
Shell.UndoMinimizeAll()
```


## *es module*


*Chakra* , yang merupakan enjin pelaksanaan skrip, mentafsir sintaks seperti `imoprt` , tetapi ia tidak boleh dilaksanakan kerana kaedah pemprosesan sebagai `cscript` tidak ditakrifkan. Di *wes* , dengan menambahkan *babel* pada modul terbina dalam, kami melaksanakannya sambil memindahkan secara berurutan ke *es module* . Akibatnya, overhed pemprosesan dan fail *wes.js* sebagai kos.


Modul yang diterangkan oleh *es module* juga ditranspilkan untuk `require()` , jadi panggilan *ActiveX* boleh dilakukan. Walau bagaimanapun, ia tidak menyokong spesifikasi pengekodan fail modul dalam *es module* . Semuanya dibaca dengan meneka secara automatik.


Untuk memuatkannya sebagai *es module* , tetapkan sambungan kepada `.mjs` atau medan `"type"` `package.json` kepada `"module"` .


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


# Objek terbina dalam


*wes* mempunyai *built-in objects* yang *WSH (JScript)* tidak mempunyai.


## *console*


*wes* menggunakan *console* dan bukannya `WScript.Echo` atau `WScript.StdErr.WriteLine` .


Cetak aksara ke konsol dalam `console.log` . Ia juga menyokong rentetan yang diformatkan. Mencetak rentetan terformat menggunakan operator pemformatan `%` .


```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```


| Penentu format | Penerangan                                 |
| -------------- | ------------------------------------------ |
| `%s`           | `String(value)`                            |
| `%S`           | `String(value)`                            |
| `%c`           | `String(value)`                            |
| `%C`           | `String(value)`                            |
| `%d`           | `parseInt(value, 10)`                      |
| `%D`           | `parseInt(value, 10)`                      |
| `%f`           | `Number(value)`                            |
| `%F`           | `Number(value)`                            |
| `%j`           | `JSON.stringify(value)`                    |
| `%J`           | `JSON.stringify(value, null, 2)`           |
| `%o`           | Tempat pembuangan objek                    |
| `%O`           | Pembuangan objek (berinden berwarna-warni) |


`WScript.StdOut.WriteLine` *wes* `WScript.StdErr.WriteLine` untuk mengeluarkan rentetan berwarna. `WScript.Echo` dan `WScript.StdOut.WriteLine` disekat daripada output. `WScript.StdErr.WriteLine` atau `console.log` .


## *Buffer*


Boleh mengendalikan penimbal.


```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```


## `__dirname` dan `__filename`


`__filename` mengandungi laluan fail modul yang sedang dijalankan. `__dirname` mengandungi direktori `__filename` .


```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```


# Modul terbina dalam


*wes* mempunyai *built-in modules* untuk memudahkan dan menyeragamkan pemprosesan asas.


## *ansi*


`ansi` ialah *ANSI escape code* yang membolehkan anda menukar warna dan kesan output standard. Warna dan kesan mungkin berbeza bergantung pada jenis dan tetapan aplikasi konsol yang digunakan.


```javascript
const { redBright, yellow } = require('ansi')
const message = 'File does not exist'
console.log(redBright + 'Error: ' + yellow + message)
```


Anda juga boleh mencipta warna anda sendiri dengan `ansi.color()` dan `ansi.bgColor()` . Hujah menggunakan *RGB* seperti `255, 165, 0` atau *color code* seperti `'#FFA500'` . Ia tidak menyokong *color name* seperti `orange` .


```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```


## *argv*


Mendapat hujah baris arahan. Argumen baris arahan dalam `cscript.exe` mengisytiharkan argumen bernama dengan `/` `--` manakala *wes* mengisytiharkan argumen bernama dengan `-` dan-.


*argv.unnamed* dan *argv.named* menghantar jenis nilai argumen baris arahan ke salah satu *String* *Number* *Boolean* .


Masukkan argumen baris arahan bersama *REP* .


```bat
wes REP aaa -bcd eee --fgh=iii jjj --kln mmm
```


Jalankan skrip berikut dalam *REP* .


```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```


## *pathname*


Mengendalikan laluan.


Laluan yang bermula dengan `/` dan `\` biasanya merujuk kepada laluan yang berkaitan dengan akar pemacu. Contohnya, `/filename` dan `C:/filename` mungkin mempunyai laluan yang sama. Atas sebab keselamatan, `wes` mentafsir laluan bermula dengan `/` dan `\` sebagai relatif kepada direktori kerja.


```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```


## *filesystem*


Mengendalikan fail dan direktori. `readTextFileSync` meneka dan membaca pengekodan fail secara automatik.


```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```


## *chardet*


Saya menggunakan beberapa ciri <https://github.com/runk/node-chardet> .


Anda boleh meningkatkan ketepatan meneka automatik dengan meningkatkan aksara khusus untuk pengekodan.


## *JScript*


Jika anda menukar enjin skrip kepada *Chakra* , anda tidak akan dapat menggunakan *JScript* -specific *Enumerator* dsb. Modul terbina dalam *JScript* menjadikannya tersedia. Walau bagaimanapun, *Enumerator* mengembalikan *Array* dan bukannya *Enumerator object* .


```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```


*GetObject* bertindak sebagai alternatif kepada `WScript.GetObject` .


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


*VBScript* menyediakan beberapa ciri yang tidak ada pada *JScript* .


```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```


## *httprequest*


*httprequest* mengeluarkan *http request* .


```javascript
const request = require('httprequest')
const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log('%O', JSON.parse(content))
```


## *minitest*


*minitest* boleh menulis ujian mudah.


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


*pipe* memudahkan pemprosesan paip.


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


Tentukan jenis skrip.


```javascript
const { isString, isNumber, isBoolean, isObject } = require('typecheck')
const log = require('log')

log(() => isString("ECMAScript"))
log(() => isNumber(43.5))
log(() => isBoolean(false))
log(() => isObject(function(){}))
```


## *zip*


Mampatkan fail dan folder dan nyahmampat fail termampat. Ia memanggil *PowerShell* secara dalaman dan memprosesnya.


```javascript
const {zip, unzip} = require('zip')

console.log(zip('docs\\*', 'dox.zip'))
console.log(unzip('dox.zip'))
```


Kad bebas `*` boleh ditulis dalam `path` `zip(path, destinationPath)` .


Ia boleh digunakan dengan kedua-dua *CLI (Command Line Interface)* dan *module* .


```bat
wes zip docs\* dox.zip
wes zip -p dox.zip
```


Jika `path` mempunyai sambungan `.zip` , `unzip()` diproses dan tiada perihalan sambungan `.zip` . Atau walaupun terdapat sambungan `.zip` , jika terdapat penerangan kad bebas `*` , `zip()` akan diproses.


| tidak dinamakan | Penerangan                          |
| --------------- | ----------------------------------- |
| `1`             | `path` Folder atau fail untuk masuk |
| `2`             | fail folder ke output `dest`        |


| bernama  | pendek bernama | Penerangan                          |
| -------- | -------------- | ----------------------------------- |
| `--path` | `-p`           | `path` Folder atau fail untuk masuk |
| `--dest` | `-d`           | fail folder ke output `dest`        |


# Penggabungan dan pemasangan modul


Dalam *wes* , himpunan beberapa modul dipanggil pakej. Anda boleh memasang pakej untuk *wes* diterbitkan di *github* . Anda memerlukan *github repository* untuk menerbitkan pakej tersebut. Juga, nama repositori dan nama direktori tempatan mestilah sama.


## *bundle*


Apabila menerbitkan pakej ke *github* , *bundle* modul yang diperlukan dan menukarnya kepada format yang boleh diimport melalui pemasangan.


Atas sebab keselamatan, *bundle* mencipta fail *.json* kerana *wes* tidak membenarkan anda mengimport pakej dalam format yang boleh dilaksanakan secara langsung.


Terdapat beberapa syarat untuk pembungkusan.


1.  Hanya satu pakej boleh diterbitkan dalam satu *repository*

2.  Pastikan nama repositori pada *github* dan nama direktori kerja tempatan adalah sama.

3.  Jika anda menerbitkan pakej tersebut, sila jadikan repositori *public*

4.  Isytiharkan pemerolehan modul dalam skop peringkat atasan

5.  Fail pakej *.json* dicipta dalam direktori kerja anda dengan nama *directory_name.json* . Jika anda menamakan semula fail atau memindahkan fail, anda tidak boleh merujuknya semasa memasang.

6.  `node_modules/directory_name` ialah titik permulaan berkas

    ```bat
        wes bundle directory_name
    ```

    Tanpa digabungkan dengan

    ```bat
        wes bundle node_modules/directory_name
    ```

    Sila ikat dengan


## *install*


Digunakan untuk memasang pakej untuk *wes* diterbitkan di *github* . Dari `version 0.10.28` folder pemasangan akan bertukar daripada `node_modules` kepada `wes_modules` . Jika anda memasang ke `node_modules` , tambahkan pilihan `--node` .


### Bagaimana nak guna


Lulus hujah untuk *install* dalam format `@author/repository` .


```bat
wes install @wachaon/fmt
```


*install* mempunyai pilihan.


| bernama       | pendek bernama | Penerangan                                                                 |
| ------------- | -------------- | -------------------------------------------------------------------------- |
| `--bare`      | `-b`           | Jangan buat folder *@author*                                               |
| `--global`    | `-g`           | Pasang pakej dalam folder di mana *wes.js* berada                          |
| `--save`      | `-S`           | Tambahkan nama pakej dan versi pada medan *dependencies* *package.json*    |
| `--save--dev` | `-D`           | Tambahkan nama pakej dan versi pada medan *devDependencies* *package.json* |
| `--node`      | `-n`           | Pasang dalam folder *node_module*                                          |


`--bare` boleh menghilangkan hujah `require` daripada `author@repository` ke `repository` . `--global` menjadikan pakej yang dipasang tersedia untuk semua skrip. `--node` atau `-n` mesti dinyatakan pada masa yang sama dengan pilihan keselamatan *wes* `--unsafe` atau `--dangerous` .


```bat
wes install @wachaon/fmt --bare --unsafe
```


# Memasang pakej dalam repositori peribadi


*install* boleh memasang pakej dalam repositori peribadi serta pakej dalam repositori awam di *github* .


Dalam *install* , nyatakan pakej dengan *@author/repository* . Pelaksanaan akan cuba memuat turun url berikut.


```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```


Apabila anda mengakses *raw* repositori peribadi dengan penyemak imbas, *token* akan dipaparkan, jadi salin *token* dan gunakannya.


Anda juga boleh memasang pakej dalam repositori peribadi dengan menjalankannya dalam konsol dalam tempoh hayat *token* .


```bat
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```


# Pengenalan pakej


Berikut adalah beberapa pakej luaran.


## *@wachaon/fmt*


*@wachaon/fmt* adalah pakej yang *prettier* untuk *wes* dan memformat skrip. Selain itu, jika *Syntax Error* berlaku dengan *@wachaon/fmt* dipasang, anda boleh menunjukkan lokasi ralat.


### pasang


```bat
wes install @wachaon/fmt
```


### Bagaimana nak guna


Jika terdapat *.prettierrc* (format JSON) dalam direktori kerja, ia akan ditunjukkan dalam tetapan. *fmt* boleh digunakan dengan kedua-dua *CLI* dan *module* .


#### Digunakan sebagai *CLI* .


```bat
wes @wachaon/fmt src/sample --write
```


| nombor yang tidak dinamakan | Penerangan                                        |
| --------------------------- | ------------------------------------------------- |
| 0                           | ――――                                              |
| 1                           | Diperlukan. Laluan fail yang ingin anda formatkan |


| bernama   | pendek bernama | Penerangan             |
| --------- | -------------- | ---------------------- |
| `--write` | `-w`           | Benarkan menulis ganti |


Tulis ganti fail dengan skrip berformat jika anda menentukan argumen bernama `--write` atau `-w` .


#### Gunakan sebagai modul


```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')

const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```


## *@wachaon/edge*


*Internet Explorer* akan melengkapkan sokongan dengan 2022/6/15. Akibatnya, ia dijangka tidak akan dapat mengendalikan aplikasi dengan `require('InternetExplorer.Application')` .


Alternatifnya ialah dengan mengendalikan *Microsoft Edge based on Chromium* melalui *web driver* . `@wachaon/edge` memudahkan autopilot *Edge* .


### pasang


Pertama, pasang pakej.


```bat
wes install @wachaon/edge --unsafe --bare
```


Kemudian muat turun *web driver* .


```bat
wes edge --download
```


Semak versi *Edge* yang dipasang dan muat turun *web driver* yang sepadan.


### Bagaimana nak guna


Ia akan menjadi mudah untuk digunakan.


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


Skrip ini secara berurutan akan mengeluarkan *URL* yang dilawati ke konsol.


`@wachaon/edge` mendaftarkan acara untuk *URL* dan menambah data pada `res.exports` . *URL* untuk didaftarkan boleh sama ada `String` `RegExp` , dan tetapan fleksibel boleh dibuat.


Dengan menjadikannya dipacu peristiwa, adalah mungkin untuk beralih kepada operasi manual dengan mudah dengan tidak menetapkan acara untuk pemprosesan yang sukar dikendalikan dengan autopilot.


Jika anda ingin menghentikan skrip, jalankan `navi.emit('terminate', res)` atau tamatkan *Edge* secara manual.


Proses penamatan mengeluarkan `res.exports` sebagai fail *.json* sebagai nilai lalai. Jika anda ingin menetapkan proses penamatan, tetapkan `terminate` `edge(callback, terminate)` .


`window` bukan `window` dalam penyemak imbas, tetapi contoh kelas *Window* *@wachaon/webdriver* .


## *@wachaon/webdriver*


Ia adalah pakej yang menghantar permintaan kepada *web driver* yang mengendalikan penyemak imbas. Dibina ke dalam *@wachaon/edge* . Seperti *@wachaon/edge* , *web driver* diperlukan untuk operasi penyemak imbas.


### pasang


```bat
wes install @wachaon/webdriver --unsafe --bare
```


Jika anda tidak mempunyai *web driver* *Microsoft Edge* berasaskan *Chromium* , muat turunnya. Selain itu, jika versi *edge* dan versi *web driver* adalah berbeza, muat turun versi *web driver* yang sama .


```bat
wes webdriver --download
```
