# *WES*

*wes* ialah rangka kerja konsol untuk menjalankan *ECMAScript* pada *WSH (Windows Script Host)* . [*japanese*](/README.md) asal *README* adalah dalam bahasa Jepun. Teks selain bahasa Jepun akan diterjemahkan mesin.\
Untuk teks dalam bahasa lain, sila pilih daripada pilihan di bawah.

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

*   Anda boleh menukar enjin skrip kepada *Chakra* dan menulis mengikut spesifikasi *ECMAScript2015* .
*   Memandangkan 32bit *cscript.exe* sentiasa dilaksanakan, tiada masalah unik dalam persekitaran 64bit.
*   Memandangkan terdapat sistem modul, ia boleh dibangunkan dengan lebih cekap daripada *WSH* konvensional
*   Modul terbina dalam menyokong pemprosesan asas seperti input/output fail dan output teks berwarna ke konsol
*   Anda boleh membiarkan pembacaan fail meneka pengekodan secara automatik, jadi anda tidak perlu risau tentang pengekodan dsb.
*   Pakej modul untuk menyokong penerbitan dan pengambilan luaran
*   Paparkan butiran ralat dengan lebih baik daripada *WSH*


# Isu yang *wes* yang tidak dapat kami selesaikan

*   `WScript.Quit` tidak boleh membatalkan program dan tidak mengembalikan kod ralat
*   Pemprosesan tak segerak tidak berfungsi dengan betul
*   Anda tidak boleh menggunakan *event prefix* bagi argumen kedua `WScript.CreateObject`


# muat turun

Wes hanya memerlukan *wes* *wes.js* . Untuk memuat turun, salin *wes.js* daripada [*@wachaon/wes*](https://github.com/wachaon/wes) atau jalankan arahan berikut dalam konsol.

     bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js

*WScript.Shell* *wes* pada masa `SendKeys` sebagai pelaksanaan. Jika laluan direktori tempat *wes.js* disimpan mengandungi aksara selain *ascii* , `SendKeys` tidak boleh menghantar kunci dengan betul dan skrip tidak boleh dilaksanakan.\
Konfigurasikan laluan *wes.js* disimpan dalam *ascii* sahaja. Jika anda telah memuat turun *wes* , anda boleh mengemas kininya dengan arahan berikut.

     wes update


# Penggunaan

Masukkan kata kunci `wes` diikuti dengan arahan yang menyatakan fail yang akan menjadi titik permulaan program ke konsol. Sambungan skrip *.js* boleh diabaikan.

     wes index

Selain itu, memandangkan *wes* dilengkapi dengan *REP* , anda boleh memasukkan skrip terus dengan memulakan `wes` sahaja.

     wes

*REP* menerima input skrip sehingga anda memasukkan dua baris kosong. Anda juga boleh melihat *REP* menjalankan skrip contoh dalam *README.md* .


## pilihan baris arahan

Pilihan permulaan *wes* adalah seperti berikut.

| bernama            | Penerangan                                            |
| ------------------ | ----------------------------------------------------- |
| `--monotone`       | Menghapuskan *ANSI escape code*                       |
| `--transpile`      | Sentiasa tukar dan jalankan dengan *babel-standalone* |
| `--debug`          | jalankan skrip dalam mod nyahpepijat                  |
| `--encoding=UTF-8` | Menentukan pengekodan fail pertama dibaca             |
| `--engine=Chakra`  | Pilihan ini ditambah secara automatik oleh *wes*      |


# sistem modul

*wes* menyokong dua sistem modul, sistem *commonjs module* menggunakan `require()` dan sistem *es module* menggunakan `import` . ( *dynamic import* tidak disokong kerana ia adalah proses tak segerak)


## *commonjs module*

Urus modul dengan memberikan kepada `module.exports` dan memanggil `require()` . Laluan selain daripada laluan mutlak dan laluan relatif bermula dengan `./` dan `../` cari modul dalam direktori *wes\_modules* dan dengan mudah direktori *node\_modules* . *wes* `require()` secara automatik meneka pengekodan fail modul, tetapi anda boleh menentukan pengekodan dengan hujah kedua jika ia tidak meneka dengan betul.

     // ./add.js function add (a, b) { return ab } module.exports = add

<!---->

     // ./main.js const add = require('./add') console.log('add(7, 3) // => %O', add(7, 3))

Juga, adalah mungkin untuk mengimport dengan *require* untuk *COM Object* seperti `require('WScript.Shell')` .

     const Shell = require('Shell.Application') Shell.MinimizeAll() WScript.Sleep(2000) Shell.UndoMinimizeAll()


## *es module*

*Chakra* , yang merupakan enjin pelaksanaan skrip, mentafsir sintaks seperti `imoprt` , tetapi ia tidak boleh dilaksanakan kerana kaedah pemprosesan sebagai *cscript* tidak ditakrifkan. Di *wes* , dengan menambahkan *babel* pada modul terbina dalam, modul *es module* juga dilaksanakan semasa ditranspil secara berurutan. Ini membebankan kami memproses overhed dan fail *wes.js* yang kembung. Modul yang ditulis dalam *es module* juga ditukar kepada `require()` dengan mengalihkan, jadi adalah mungkin untuk memanggil *COM Object* . Walau bagaimanapun, ia tidak menyokong menentukan pengekodan fail modul dengan *es module* . Semuanya dimuatkan secara automatik. Untuk memuatkannya sebagai *es module* , tetapkan sambungan kepada `.mjs` atau tetapkan medan `"type"` dalam `package.json` kepada `"module"` .

     // ./sub.mjs export default function sub (a, b) { return a - b }

<!---->

     // ./main2.js import sub from './sub.mjs' console.log('sub(7, 3) // => %O', sub(7, 3))


# objek terbina dalam

*wes* mempunyai *built-in objects* tidak ditemui dalam *WSH (JScript)* .


undefined


## *Buffer*

Anda boleh mengendalikan penimbal.

     const content = 'Hello World' const buff = Buffer.from(content) console.log(`${content} %O`, buff)


## `__dirname` dan `__filename`

`__filename` menyimpan laluan fail modul yang sedang dilaksanakan. `__dirname` mengandungi direktori `__filename` .

     console.log('dirname: %O\nfilename: %O', __dirname, __filename)


## *setTimeout* *setInterval* *setImmediate* *Promise*

Memandangkan *wes* ialah persekitaran pelaksanaan untuk pemprosesan segerak, *setTimeout* *setInterval* *setImmediate* *Promise* tidak berfungsi sebagai pemprosesan tak segerak, tetapi ia dilaksanakan untuk menyokong modul yang menganggap pelaksanaan *Promise* .

     const example = () => { const promise = new Promise((resolve, reject) => { console.log('promise') setTimeout(() => { console.log('setTimeout') resolve('resolved'); }, 2000); }).then((val) => { console.log(val) }); console.log('sub') }; console.log('start') example(); console.log('end')


# Modul terbina dalam

*wes* mempunyai *built-in modules* untuk memudahkan dan menyeragamkan pemprosesan asas.


## *ansi*

`ansi` ialah *ANSI escape code* yang boleh menukar warna dan kesan output standard. Warna dan kesan mungkin berbeza bergantung pada jenis dan tetapan aplikasi konsol yang digunakan.

     const { redBright, yellow } = require('ansi') const message = 'File does not exist' console.log(redBright 'Error: ' yellow message)

Anda juga boleh mencipta warna anda sendiri dengan `ansi.color()` dan `ansi.bgColor()` . Hujah menggunakan *RGB* seperti `255, 165, 0` dan *color code* seperti `'#FFA500'` . *color name* seperti `orange` tidak disokong.

     const { color } = require('ansi') const orange = color(255, 165, 0) console.log(orange 'Hello World')


## *argv*

Dapatkan hujah baris arahan. Argumen baris arahan `cscript.exe` mengisytiharkan argumen bernama dengan `/` , manakala *wes* mengisytiharkan argumen bernama dengan `-` dan `--` . *argv.unnamed* dan *argv.named* jenis nilai argumen baris arahan kepada sama ada *Number* *String* *Boolean* . Masukkan argumen baris arahan dengan *REP* .

     wes REP aaa -bcd eee --fgh=iii jjj --kln mmm

Jalankan skrip berikut pada *REP* .

     const argv = require('argv') console.log(`argv: %O argv.unnamed: %O argv.named: %O`, argv, argv.unnamed, argv.named)


## *pathname*

Memanipulasi laluan. Laluan yang bermula dengan `/` dan `\` biasanya relatif kepada akar pemacu. Contohnya `/filename` dan `C:/filename` boleh menjadi laluan yang sama. Atas sebab keselamatan, *wes* mentafsir laluan bermula dengan `/` dan `\` relatif kepada direktori kerja.

     const path = require('pathname') const file = path.resolve(__dirname, 'index.js') console.log('file %O', file)


## *filesystem*

Memanipulasi fail dan direktori. `readTextFileSync()` secara automatik meneka pengekodan fail dan membacanya. (Walaupun hujah kedua `readFileSync()` `encode` kepada `auto` , ia akan diteka secara automatik.)

     const fs = require('filesystem') const path = require('pathname') const readme = path.resolve(__dirname, 'README.md') const contents = fs.readTextFileSync(readme) // const contents = fs.readFileSync(readme, 'auto') console.log(contents)


## *chardet*

Saya menggunakan beberapa ciri dari <https://github.com/runk/node-chardet> . Anda boleh meningkatkan ketepatan auto-teka dengan meningkatkan aksara khusus pengekodan.


## *JScript*

Jika anda menukar enjin skrip kepada *Chakra* , anda tidak akan dapat menggunakan *JScript* -specific *Enumerator* , dsb. Modul terbina dalam *JScript* menjadikannya tersedia. Walau bagaimanapun, *Enumerator* mengembalikan *Array* , bukan *Enumerator object* .

     const { Enumerator, ActiveXObject } = require('JScript') const FSO = new ActiveXObject('Scripting.FileSystemObject') const dir = FSO.getFolder(__dirname).Files const files = new Enumerator(dir) files.forEach(file => console.log(file.Name))

*GetObject* berfungsi sebagai alternatif kepada `WScript.GetObject` .

     const { GetObject, Enumerator } = require('JScript') const ServiceSet = GetObject("winmgmts:{impersonationLevel=impersonate}").InstancesOf("Win32_Service") new Enumerator(ServiceSet).forEach(service => console.log( 'Name: %O\nDescription: %O\n', service.Name, service.Description ))


## *VBScript*

*VBScript* menawarkan beberapa ciri yang tidak dimiliki oleh *JScript* .

     const { TypeName } = require('VBScript') const FSO = require('Scripting.FileSystemObject') console.log(TypeName(FSO))


## *httprequest*

*httprequest* mengeluarkan *http request* .

     const request = require('httprequest') const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1') console.log('%O', JSON.parse(content))


undefined


## *pipe*

*pipe* memudahkan paip.

### Penggunaan

     const pipe = require('pipe') function add (a, b) { return ba } function sub (a, b) { return b - a } function div (a, b) { return a / b } const add5 = add.bind(null, 5) const sub3 = sub.bind(null, 3) pipe() .use(add5) .use(sub3) .use(div, 4) .process(10, (err, res) => console.log('res: %O', res))


## *typecheck*

Tentukan jenis skrip.

### Penggunaan

     const { isString, isNumber, isBoolean, isObject } = require('typecheck') const log = require('log') log(() => isString("ECMAScript")) log(() => isNumber(43.5)) log(() => isBoolean(false)) log(() => isObject(function(){}))


undefined


## *getMember*

Dapatkan jenis ahli dan perihalan *COM Object* daripada *ProgID* .

### Penggunaan

     const getMember = require('getMember') const FileSystemObject = 'Scripting.FileSystemObject' console.log('require("%S") // => %O', FileSystemObject, getMember(FileSystemObject))


## *zip*

Memampatkan fail dan folder dan menyahmampat fail yang dimampatkan. Secara dalaman, *PowerShell* dipanggil dan diproses.

### Penggunaan

     const {zip, unzip} = require('zip') console.log(zip('docs\\*', 'dox.zip')) console.log(unzip('dox.zip'))

Kad bebas `*` boleh ditulis dalam `path` `zip(path, destinationPath)` . Ia boleh digunakan dalam kedua-dua *CLI (Command Line Interface)* dan *module* .

     wes zip docs\* dox.zip wes zip -p dox.zip

Jika `path` mempunyai sambungan `.zip` , `unzip()` diproses dan tiada perihalan sambungan `.zip` . Sebagai alternatif, walaupun terdapat sambungan `.zip` , jika terdapat kad bebas `*` penerangan, `zip()` akan diproses.

| tidak dinamakan | Penerangan                        |
| --------------- | --------------------------------- |
| `1`             | `path` atau fail untuk dimasukkan |
| `2`             | fail folder ke output `dest`      |

| bernama  | pendek bernama | Penerangan                        |
| -------- | -------------- | --------------------------------- |
| `--path` | `-p`           | `path` atau fail untuk dimasukkan |
| `--dest` | `-d`           | fail folder ke output `dest`      |


# Mengikat (pembungkusan) dan memasang modul

Dalam *wes* , himpunan beberapa modul dipanggil pakej. Anda boleh memasang pakej untuk *wes* diterbitkan di *github* . *github repository* diperlukan untuk menerbitkan pakej.


## *bundle*

Apabila menerbitkan pakej ke *github* , *bundle* modul yang diperlukan dan mencipta *bundle.json* .

1.  Hanya satu pakej boleh diterbitkan dalam satu *repository*

2.  *package.json* diperlukan. Sekurang-kurangnya, perihalan medan `main` diperlukan.

         { "main": "index.js" }

3.  Jadikan repositori *public* jika anda ingin menerbitkan pakej tersebut

4.  Bermula dengan `version 0.12.0` , pakej dengan pemuatan modul langsung ke dalam direktori di atas direktori kerja tidak akan digabungkan. Pakej dalam direktori atas *wes\_modules* atau *node\_modules* boleh digabungkan.

Masukkan arahan berikut untuk digabungkan: Rujuk *package.json* untuk mengetahui perkara yang hendak digabungkan.

     wes bundle


undefined


# Memasang pakej dari repositori peribadi

*install* boleh memasang bukan sahaja pakej dari repositori *github* awam, tetapi juga pakej dari repositori peribadi. Dalam *install* , nyatakan pakej dengan *@author/repository* . Pelaksanaan cuba memuat turun url berikut.

     `https://raw.githubusercontent.com/${author}/${repository}/master/bundle.json`

Jika anda mengakses repositori persendirian *raw* dengan penyemak imbas, *token* akan dipaparkan, jadi salin *token* dan gunakannya. Anda juga boleh memasang pakej dari repositori peribadi dengan menjalankannya dalam konsol semasa *token* itu sah.

     wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA


# Pengenalan pakej

Berikut adalah beberapa pakej luaran.


## *@wachaon/fmt*

*@wachaon/fmt* dibungkus *prettier* untuk *wes* memformat skrip. Selain itu, jika *Syntax Error* berlaku semasa *@wachaon/fmt* dipasang, anda boleh menunjukkan lokasi ralat.

### pasang

     wes install @wachaon/fmt

### Penggunaan

Jika terdapat *.prettierrc* (format JSON) dalam direktori kerja, ia akan ditunjukkan dalam tetapan. *fmt* tersedia dalam kedua-dua *CLI* dan *module* .

#### Gunakan sebagai *CLI* .

     wes @wachaon/fmt src/sample --write

| nombor tanpa nama | Penerangan                                        |
| ----------------- | ------------------------------------------------- |
| 1                 | Diperlukan. laluan fail yang ingin anda formatkan |

| bernama   | pendek bernama | Penerangan           |
| --------- | -------------- | -------------------- |
| `--write` | `-w`           | benarkan tulis ganti |

Tulis ganti fail dengan skrip terformat jika `--write` atau argumen bernama `-w` ditentukan.

#### digunakan sebagai modul

     const fmt = require('@wachaon/fmt') const { readTextFileSync, writeTextFileSync } = require('filesystem') const { join, workingDirectory } = require('pathname') const target = join(workingDirectory, 'index.js') console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
