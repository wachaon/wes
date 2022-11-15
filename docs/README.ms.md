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
*   Oleh kerana terdapat sistem modul, ia boleh dibangunkan dengan lebih cekap daripada *WSH* konvensional
*   Modul terbina dalam menyokong pemprosesan asas seperti input/output fail dan output teks berwarna ke konsol
*   Anda boleh membiarkan pembacaan fail meneka pengekodan secara automatik, jadi anda tidak perlu risau tentang pengekodan dsb.
*   Pakej modul untuk menyokong penerbitan dan pengambilan luaran
*   Paparkan butiran ralat dengan lebih baik daripada *WSH*

# Isu-isu yang *wes* yang tidak dapat kami selesaikan

*   `WScript.Quit` tidak boleh membatalkan program dan tidak mengembalikan kod ralat
*   Pemprosesan tak segerak tidak berfungsi dengan betul
*   Anda tidak boleh menggunakan *event prefix* bagi argumen kedua `WScript.CreateObject`

# muat turun

Wes hanya memerlukan *wes* *wes.js* . Untuk memuat turun, salin *wes.js* daripada [*@wachaon/wes*](https://github.com/wachaon/wes) atau jalankan arahan berikut dalam konsol.

```bat
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

*WScript.Shell* *wes* pada masa `SendKeys` sebagai pelaksanaan. Jika laluan direktori tempat *wes.js* disimpan mengandungi aksara selain *ascii* , `SendKeys` tidak boleh menghantar kunci dengan betul dan skrip tidak boleh dilaksanakan.\
Konfigurasikan laluan *wes.js* disimpan dalam *ascii* sahaja. Jika anda telah memuat turun *wes* , anda boleh mengemas kininya dengan arahan berikut.

```bat
wes update
```

# macam mana nak mulakan *wes*

Masukkan kata kunci `wes` dan arahan yang menyatakan fail yang akan menjadi titik permulaan program ke konsol. Sambungan skrip *.js* boleh diabaikan.

```bat
wes index
```

*wes* boleh terus memasukkan dan melaksanakan skrip pada konsol. Jika anda memulakannya dengan `wes` sahaja, anda boleh terus masuk dan melaksanakan skrip.

```bat
wes
```

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

Juga, adalah mungkin untuk mengimport dengan *require* untuk *COM Object* seperti `require('WScript.Shell')` .

```javascript
const Shell = require('Shell.Application')
Shell.MinimizeAll()
WScript.Sleep(2000)
Shell.UndoMinimizeAll()
```

## *es module*

*Chakra* , enjin pelaksanaan skrip, mentafsir sintaks seperti `imoprt` , tetapi ia tidak dilaksanakan dalam persekitaran *cscript* . Di *wes* , dengan menambahkan *babel* pada modul terbina dalam, modul *es module* juga dilaksanakan semasa ditranspil secara berurutan. Ini datang dengan kos pemprosesan overhed dan fail *wes.js* kembung. Modul yang ditulis dalam *es module* juga ditukar kepada `require()` dengan mengalihkan, jadi adalah mungkin untuk memanggil *COM Object* . Walau bagaimanapun, ia tidak menyokong menentukan pengekodan fail modul dengan *es module* . Semuanya dimuatkan secara automatik. Untuk memuatkannya sebagai *es module* , tetapkan sambungan kepada `.mjs` atau tetapkan medan `"type"` dalam `package.json` kepada `"module"` .

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

# objek terbina dalam

*wes* mempunyai *built-in objects* tidak ditemui dalam *WSH (JScript)* .

## *console*

Wes menggunakan *console* dan bukannya *wes* `WScript.Echo()` dan `WScript.StdErr.WriteLine()` .

### *console.log*

Output aksara ke konsol dengan `console.log()` . Ia juga menyokong rentetan yang diformatkan. Mengeluarkan rentetan yang diformat menggunakan operator pemformatan `%` . (Pengendali pemformatan juga sah untuk kaedah lain.)

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
| `%o`           | tempat pembuangan objek                    |
| `%O`           | Pembuangan objek (berinden/berwarna-warni) |

`WScript.StdOut.WriteLine` *wes* `WScript.StdErr.WriteLine` untuk mengeluarkan rentetan berwarna. `WScript.Echo` dan `WScript.StdOut.WriteLine` disekat output. `WScript.StdErr.WriteLine` atau `console.log` .

### *console.print*

`console.log()` biasanya menyertakan baris baharu pada penghujungnya, tetapi `console.print` tidak.

### *console.debug*

Output ke konsol hanya jika pilihan `--debug` didayakan.

### *console.error*

Lemparkan pengecualian dengan kandungan sebagai mesej.

### *console.weaklog*

Rentetan yang dicetak dengan `console.weaklog()` hilang daripada konsol jika terdapat sebarang output berikutnya. Berguna untuk menukar output.

## *Buffer*

Anda boleh mengendalikan penimbal.

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log('%s %O', content, buff)
```

## `__dirname` dan `__filename`

`__filename` menyimpan laluan fail modul yang sedang dilaksanakan. `__dirname` mengandungi direktori `__filename` .

```javascript
const message = `dirname: ${__dirname}\nfilename: ${ __filename}`
console.log(message)
```

## *setTimeout* *setInterval* *setImmediate* *Promise*

Memandangkan *wes* ialah persekitaran pelaksanaan untuk pemprosesan segerak, *setTimeout* *setInterval* *setImmediate* *Promise* tidak berfungsi sebagai pemprosesan tak segerak, tetapi ia dilaksanakan untuk menyokong modul yang menganggap pelaksanaan *Promise* .

```javascript
const example = () => {
  const promise = new Promise((resolve, reject) => {
    console.log('promise')

    setTimeout(() => {
      console.log('setTimeout') 
      resolve('resolved');
    }, 2000);
  }).then((val) => {
    console.log(val)
  });
  console.log('sub')
};

console.log('start')
example();
console.log('end')
```

# Modul terbina dalam

*wes* mempunyai *built-in modules* untuk memudahkan dan menyeragamkan pemprosesan asas.

## *ansi*

`ansi` ialah *ANSI escape code* yang boleh menukar warna dan kesan output standard. Warna dan kesan mungkin berbeza bergantung pada jenis dan tetapan aplikasi konsol yang digunakan.

```javascript
const { redBright, yellow } = require('ansi')
const message = 'File does not exist'
console.log(redBright + 'Error: ' + yellow + message)
```

Anda juga boleh mencipta warna anda sendiri dengan `ansi.color()` dan `ansi.bgColor()` . Hujah menggunakan *RGB* seperti `255, 165, 0` dan *color code* seperti `'#FFA500'` . *color name* seperti `orange` tidak disokong.

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

## *argv*

Dapatkan hujah baris arahan. Argumen baris arahan `cscript.exe` mengisytiharkan argumen bernama dengan `/` , manakala *wes* mengisytiharkan argumen bernama dengan `-` dan `--` . *argv.unnamed* dan *argv.named* jenis nilai argumen baris arahan kepada sama ada *Number* *String* *Boolean* . Masukkan argumen baris arahan dengan *REP* .

```bat
wes REP aaa -bcd eee --fgh=iii jjj --kln mmm
```

Jalankan skrip berikut pada *REP* .

```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```

## *pathname*

Memanipulasi laluan. Laluan yang bermula dengan `/` dan `\` biasanya relatif kepada akar pemacu. Contohnya `/filename` dan `C:/filename` boleh menjadi laluan yang sama. Atas sebab keselamatan, *wes* mentafsir laluan bermula dengan `/` dan `\` relatif kepada direktori kerja.

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

## *filesystem*

Memanipulasi fail dan direktori. `readTextFileSync()` secara automatik meneka pengekodan fail dan membacanya. (Walaupun hujah kedua `readFileSync()` `encode` kepada `auto` , ia akan diteka secara automatik.)

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
// const contents = fs.readFileSync(readme, 'auto')
console.log(contents)
```

## *chardet*

Saya menggunakan beberapa ciri dari <https://github.com/runk/node-chardet> . Anda boleh meningkatkan ketepatan auto-teka dengan meningkatkan aksara khusus pengekodan.

## *JScript*

Jika anda menukar enjin skrip kepada *Chakra* , anda tidak akan dapat menggunakan *JScript* -specific *Enumerator* , dsb. Modul terbina dalam *JScript* menjadikannya tersedia. Walau bagaimanapun, *Enumerator* mengembalikan *Array* , bukan *Enumerator object* .

```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```

*GetObject* berfungsi sebagai alternatif kepada `WScript.GetObject` .

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

*VBScript* menawarkan beberapa ciri yang tidak dimiliki oleh *JScript* .

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

*minitest* boleh menulis ujian mudah. Daripada versi `0.10.71` , kami kembali kepada konsep asas dan mengurangkan jenis penegasan kepada 3 jenis.

Kumpulan dengan `describe` , uji `it` , dan sahkan dengan `assert` . `pass` akan menjadi tatasusunan bilangan kejadiannya `it` bilangan pas.

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

### dakwaan

Terdapat hanya tiga fungsi penegasan untuk membandingkan objek untuk kesederhanaan.

#### `assert(value, message)` `assert.ok(value, message)`

Bandingkan dengan `true` dengan pengendali kesaksamaan yang ketat `===` . Jika `value` ialah fungsi, nilaikan hasil pelaksanaan fungsi tersebut.

| Param     | taip                  | Penerangan                               |
| :-------- | :-------------------- | :--------------------------------------- |
| `value`   | `{Function\|Boolean}` | boolean atau fungsi pengembalian boolean |
| `message` | `{String}`            | mesej tentang kegagalan                  |

#### `assert.equal(expected, actual)`

Membandingkan objek untuk kesaksamaan ahli, bukan dengan rujukan.\
NaN `true` Fungsi `NaN === NaN` `function (){} === function (){}` `/RegExp/g === /RegExp/g` atau `{one: {two: 2}} === {one: {two: 2}}` `[1,2,3] === [1,2,3]` dsb.\
Apabila membandingkan kelas (objek), mereka mesti mempunyai pembina yang sama atau superclass yang `actual` `expected` .

| Param      | taip    | Penerangan             |
| :--------- | :------ | :--------------------- |
| `expected` | `{Any}` | nilai yang dijangkakan |
| `actual`   | `{Any}` | Nilai sebenar          |

#### `assert.throws(value, expected, message)`

Sahkan bahawa ralat dilemparkan dengan betul.\
Sama ada ralat itu betul atau tidak ditentukan oleh sama ada *constructor* ralat yang dijangkakan , *message* adalah sama, dan ungkapan biasa melepasi penilaian *stack* .

| Param      | taip                      | Penerangan                                                                               |
| :--------- | :------------------------ | :--------------------------------------------------------------------------------------- |
| `value`    | `{Error}`                 | ralat                                                                                    |
| `expected` | `{Error\|String\|RegExp}` | Ungkapan biasa yang menilai *constructor* ralat, *message* atau *stack* yang dijangkakan |
| `message`  | `{String}`                | mesej tentang kegagalan                                                                  |

## *pipe*

*pipe* memudahkan paip.

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

Tentukan jenis skrip.

```javascript
const { isString, isNumber, isBoolean, isObject } = require('typecheck')
const log = require('log')
log(() => isString("ECMAScript"))
log(() => isNumber(43.5))
log(() => isBoolean(false))
log(() => isObject(function(){}))
```

## *animate*

*animate* membantu menghidupkan paparan konsol.

Jika pemprosesan mengambil masa yang lama, adalah baik untuk memaparkan kemajuan sebagai animasi pada konsol.

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

Melaksanakan fungsi `complete` apabila semua baris gilir selesai atau `stop()` dipanggil.

#### `static genProgressIndicator(animation)`

Hasilkan fungsi yang memaparkan animasi berbasikal.

#### `register(callback, interval, conditional)`

Pemprosesan daftar. Pelbagai proses boleh didaftarkan dan diproses secara selari. Dalam `callback` , kami akan mengarahkan untuk menghentikan animasi dan menulis paparan untuk dipaparkan. `interval` menentukan selang pemprosesan. Jika `conditional` ialah fungsi, ia akan melaksanakan `conditional(count, queue)` dan jika hasilnya benar, ia akan diteruskan. `conditional` melaksanakan `decrement(count)` jika ia adalah nombor dan berterusan jika hasilnya ialah nombor positif. Laksanakan sekali sahaja jika `conditional` tidak ditentukan. Ambil perhatian bahawa menentukan fungsi meningkatkan `count` , manakala menyatakan nombor mengurangkan `count` .

#### `stop()`

*animate* .

#### `cancel(queue)`

Menggantung pemprosesan baris gilir tertentu.

#### `run()`

Mulakan animasi.

#### `view`

Menentukan aksara yang dicetak ke konsol. Tukar aksara pada selang masa yang tetap. Tetapkan sama ada *Arrary* atau *String* untuk `view` . *String* berguna apabila mengemas kini satu animasi, dan *Array* berguna apabila menganimasikan berbilang baris secara individu.

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

Dapatkan jenis ahli dan perihalan *COM Object* daripada *ProgID* .

```javascript
const getMember = require('getMember')
const FileSystemObject = 'Scripting.FileSystemObject'
console.log('require("%S") // => %O', FileSystemObject, getMember(FileSystemObject))
```

## *zip*

Memampatkan fail dan folder dan menyahmampat fail yang dimampatkan. Secara dalaman, *PowerShell* dipanggil dan diproses.

```javascript
const {zip, unzip} = require('zip')
console.log(zip('docs\\*', 'dox.zip'))
console.log(unzip('dox.zip'))
```

Kad bebas `*` boleh ditulis dalam `path` `zip(path, destinationPath)` . Ia boleh digunakan dalam kedua-dua *CLI (Command Line Interface)* dan *module* .

```bat
wes zip docs\* dox.zip
wes zip -p dox.zip
```

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
2.  *package.json* diperlukan. Sekurang-kurangnya, perihalan medan `main` diperlukan. ```json
    {
        "main": "index.js"
    }
    ```
3.  Jadikan repositori *public* jika anda ingin menerbitkan pakej tersebut
4.  Bermula dengan `version 0.12.0` , pakej dengan pemuatan modul langsung ke dalam direktori di atas direktori kerja tidak akan digabungkan. Pakej dalam direktori atas *wes\_modules* atau *node\_modules* boleh digabungkan.

Masukkan arahan berikut untuk digabungkan: Rujuk *package.json* untuk mengetahui perkara yang hendak digabungkan.

```bat
    wes bundle 
```

## *install*

Digunakan untuk memasang pakej untuk *wes* diterbitkan di *github* . Daripada `version 0.10.28` , folder pemasangan ditukar daripada `node_modules` kepada `wes_modules` . Jika anda ingin memasang dalam `node_modules` tambah `--node` pilihan. Bermula dengan `version 0.12.0` , fail akan dinyahzip daripada *bandle.json* dan disimpan. Disebabkan oleh perubahan spesifikasi, pakej yang digabungkan dengan `version 0.12.0` kurang daripada 0.12.0 mungkin tidak dipasang dengan betul dengan `version 0.12.0` atau lebih baru.

Lulus hujah untuk *install* dalam bentuk `@author/repository` .

```bat
wes install @wachaon/fmt
```

*install* mempunyai pilihan.

| bernama       | pendek bernama | Penerangan                                                                       |
| ------------- | -------------- | -------------------------------------------------------------------------------- |
| `--bare`      | `-b`           | Jangan buat folder *@author*                                                     |
| `--global`    | `-g`           | Pasang pakej dalam folder di mana *wes.js* berada                                |
| `--save`      | `-S`           | Tambahkan nama pakej dan versi pada medan *dependencies* dalam *package.json*    |
| `--save--dev` | `-D`           | Tambahkan nama pakej dan versi pada medan *devDependencies* dalam *package.json* |
| `--node`      | `-n`           | Pasang dalam folder *node\_module*                                               |

`--bare` boleh menghilangkan hujah `require` daripada `author@repository` ke `repository` . `--global` menjadikan pakej yang dipasang tersedia untuk semua skrip.

```bat
wes install @wachaon/fmt --bare
```

# Memasang pakej dari repositori peribadi

*install* boleh memasang bukan sahaja pakej dari repositori *github* awam, tetapi juga pakej dari repositori peribadi. Dalam *install* , nyatakan pakej dengan *@author/repository* . Pelaksanaan cuba memuat turun url berikut.

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/bundle.json`
```

Jika anda mengakses repositori persendirian *raw* dengan penyemak imbas, *token* akan dipaparkan, jadi salin *token* dan gunakannya. Anda juga boleh memasang pakej dari repositori peribadi dengan menjalankannya dalam konsol semasa *token* itu sah.

```bat
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

# Pengenalan pakej

Berikut adalah beberapa pakej luaran.

## *@wachaon/fmt*

*@wachaon/fmt* dibungkus *prettier* untuk *wes* memformat skrip. Selain itu, jika *Syntax Error* berlaku semasa *@wachaon/fmt* dipasang, anda boleh menunjukkan lokasi ralat.

### Pasang *@wachaon/fmt*

```bat
wes install @wachaon/fmt
```

Jika terdapat *.prettierrc* (format JSON) dalam direktori kerja, ia akan ditunjukkan dalam tetapan. *fmt* tersedia dalam kedua-dua *CLI* dan *module* .

#### Gunakan sebagai *CLI* .

```bat
wes @wachaon/fmt src/sample --write
```

| nombor tanpa nama | Penerangan                                        |
| ----------------- | ------------------------------------------------- |
| 1                 | Diperlukan. laluan fail yang ingin anda formatkan |

| bernama   | pendek bernama | Penerangan           |
| --------- | -------------- | -------------------- |
| `--write` | `-w`           | benarkan tulis ganti |

Tulis ganti fail dengan skrip terformat jika `--write` atau argumen bernama `-w` ditentukan.

#### digunakan sebagai modul

```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')
const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```

## *@wachaon/edge*

*Internet Explorer* akan menamatkan sokongan pada 15 Jun 2022. Seiring dengan itu, operasi aplikasi dengan `require('InternetExplorer.Application')` dijangka juga akan menjadi mustahil. Alternatifnya ialah bekerja dengan *Microsoft Edge based on Chromium* melalui *web driver* . `@wachaon/edge` memudahkan autopilot *Edge* .

### Pasang *@wachaon/edge*

Mula-mula pasang pakej.

```bat
wes install @wachaon/edge --bare
```

Kemudian muat turun *web driver* .

```bat
wes edge --download
```

Semak versi *Edge* yang dipasang dan muat turun *web driver* yang sepadan .

### Penggunaan

Ia akan menjadi mudah untuk digunakan. Mulakan penyemak imbas anda dan tukar saiz tetingkap dan tapak untuk dipaparkan kepada `https://www.google.com` .

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

Kami menyimpan sejarah lawatan anda sehingga *URL* penyemak imbas anda bermula dengan `https://www.yahoo` .

```javascript
const edge = require('/index.js')

const ret = edge((window, navi, res) => {
    window.rect({
        x: 1,
        y: 1,
        width: 1200,
        height: 500
    })
    res.exports = []

    navi.on(/^https?:\/\/www\.yahoo\b/, (url) => {
        console.log('finished!')
        navi.emit('terminate', res, window)
    })

    navi.on(/https?:\/\/.+/, (url) => {
        console.log('URL: %O', url)
        res.exports.push(url)
    })

    window.navigate('http://www.google.com')
})

console.log('ret // => %O', ret)
```

*edge* mencetak *URL* yang dilawati ke konsol mengikut urutan. `@wachaon/edge` mendaftarkan acara untuk *URL* dan menambahkan data pada `res.exports` . *URL* untuk didaftarkan boleh sama ada `String` `RegExp` , dan boleh ditetapkan secara fleksibel. Dengan menjadikannya dipacu peristiwa, anda boleh beralih kepada operasi manual dengan mudah dengan tidak menetapkan acara untuk proses yang sukar dikendalikan dengan autopilot. Jika anda mahu skrip berhenti, `navi.emit('terminate', res)` atau tamatkan *Edge* secara manual. Pemuktamadkan output `res.exports` sebagai fail *.json* secara lalai. Jika anda ingin menetapkan pemprosesan penamatan, tetapkan `terminate` `edge(callback, terminate)` . `window` ialah contoh kelas *Window* *@wachaon/webdriver* , bukan window's `window` .

## *@wachaon/webdriver*

Ia akan menjadi pakej yang menghantar permintaan kepada *web driver* yang mengendalikan penyemak imbas. Dibina dalam *@wachaon/edge* . Seperti *@wachaon/edge* , *web driver* yang berasingan diperlukan untuk operasi penyemak imbas.

### Pasang *@wachaon/webdriver*

```bat
wes install @wachaon/webdriver --unsafe --bare
```

Muat turun *web driver* *Microsoft Edge* berasaskan *Chromium* jika anda tidak memilikinya. Selain itu, jika versi *edge* dan versi *web driver* adalah berbeza, muat turun versi *web driver* yang sama .

```bat
wes webdriver --download
```
