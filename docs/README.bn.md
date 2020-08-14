# Wes

*wes* *Windows Script Host* *wes* *ECMAScript* কার্যকর করার জন্য একটি কাঠামো

*README* মূল [*japanese*](README.ja.md) হবে। জাপানি ছাড়া অন্য পাঠ্যটি মেশিন অনুবাদ করা হবে। নিম্নলিখিত ভাষাগুলি থেকে অন্যান্য ভাষায় নির্বাচন করুন select

-   [*簡体字*](README.zh-CN.md) <!-- 中国語 (簡体字) -->
-   [*繁体字*](README.zh-TW.md) <!-- 中国語 (繁体字) -->
-   [*English*](README.en.md) <!-- 英語 -->
-   [*हिन्दी*](README.hi.md)　<!-- ヒンディー語 -->
-   [*Español*](README.es.md) <!-- スペイン語 -->
-   [*عربى*](README.ar.md) <!-- アラビア語 -->
-   [*বাংলা*](README.bn.md) <!-- ベンガル語 -->
-   [*Português*](README.pt.md) <!-- ポルトガル語 -->
-   [*русский язык*](README.ru.md) <!-- ロシア語 -->
-   [*Deutsch*](README.de.md) <!-- ドイツ語 -->
-   [*français*](README.fr.md) <!-- フランス語 -->
-   [*italiano*](README.it.md)　<!-- イタリア語 -->

## বৈশিষ্ট্য

-   স্ক্রিপ্ট ইঞ্জিনটিকে *Chakra* পরিবর্তন করুন এবং *ECMAScript2015* *Chakra* কার্যকরকরণ সক্ষম করুন
-   32-বিট *cscript.exe* , তাই 64-বিট পরিবেশে অদ্ভুত বাগগুলি এড়ানো যায়
-   আপনি `require` সহ মডিউলটি আমদানি করতে পারেন
-   বর্ণযুক্ত অক্ষরগুলি স্ট্যান্ডার্ড আউটপুট থেকে আউটপুট হতে পারে
-   স্বয়ংক্রিয়ভাবে ফাইল এনকোডিং অনুমান করুন

## বৈশিষ্ট্যগুলি সমাধান করা হয়নি

-   `WScript.Quit` প্রোগ্রামটিতে বাধা দিতে পারে না এবং একটি ত্রুটি কোড দেয় না
-   অ্যাসিনক্রোনাস প্রসেসিং
-   `WScript.CreateObject` দ্বিতীয় আর্গুমেন্টের *event prefix* ব্যবহার

## ইনস্টল করুন

*wes* প্রয়োজন নেই *wes.js* শুধুমাত্র ফাইল। ডাউনলোড করতে, কমান্ড প্রম্পটটি শুরু করুন এবং নিম্নলিখিত কমান্ডটি প্রবেশ করুন।

```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

*wes* ব্যবহার করে *WScript.Shell* রানটাইমের সময় `SendKeys` এর `SendKeys` । *wes.js* ডিরেক্টরির যেখানে পথ *wes.js* সংরক্ষিত হয় ব্যতীত অন্য অক্ষর রয়েছে *ascii* , `SendKeys` এটি সঠিকভাবে পাঠাব না এবং স্ক্রিপ্ট চলবে না। সেক্ষেত্রে, সংরক্ষণ পাথ দয়া করে কনফিগার করুন *wes.js* শুধুমাত্র সঙ্গে *ascii* ।

## ব্যবহার

কমান্ড লাইনে, ফাইলটি নির্দিষ্ট করুন যা `wes` পরে প্রোগ্রামের প্রারম্ভিক পয়েন্ট। স্ক্রিপ্ট এক্সটেনশন *.js* বাদ দেওয়া যেতে পারে।

```shell
wes index
```

এছাড়াও, যেহেতু *wes* টি *REPL* , আপনি একটি স্ক্রিপ্ট কমান্ড লাইন সরাসরি প্রবেশ এটি শুধুমাত্র দিয়ে শুরু দ্বারা নির্বাহ করতে পারেন `wes` ।

```shell
wes
```

আপনি দুটি ফাঁকা রেখা প্রবেশ না করা পর্যন্ত স্ক্রিপ্ট ইনপুট গ্রহণ করা হবে। *README.md* *REPL* সাথে *README.md* স্যাম্পল স্ক্রিপ্টটির সম্পাদনাও পরীক্ষা করতে পারেন।

## কমান্ড-লাইন নাম যুক্তি

নিম্নলিখিত নামযুক্ত যুক্তিগুলি *wes* স্টার্টআপ বিকল্প হিসাবে স্বীকৃত।

| নামে               | বিবরণ                                               |
| ------------------ | --------------------------------------------------- |
| `--monotone`       | *ANSI escape code* বাদ দিন                          |
| `--safe`           | স্ক্রিপ্টটি নিরাপদ মোডে চালান                       |
| `--usual`          | সাধারণ মোডে স্ক্রিপ্টটি চালান (ডিফল্ট)              |
| `--unsafe`         | অনিরাপদ মোডে স্ক্রিপ্টটি চালান                      |
| `--dangerous`      | স্ক্রিপ্টটি বিপজ্জনক মোডে চালান                     |
| `--debug`          | স্ক্রিপ্টটি ডিবাগ মোডে চালান                        |
| `--encoding=UTF-8` | প্রথমে পড়ার জন্য ফাইলটির এনকোডিং নির্দিষ্ট করুন।   |
| `--engine=Chakra`  | এই বিকল্পটি *wes* দ্বারা স্বয়ংক্রিয়ভাবে যুক্ত হয় |

`--safe` `--usual` `--unsafe` `--dangerous` `--safe` এর প্রয়োগ অসম্পূর্ণ, তবে নাম যুক্তিগুলি সংরক্ষিত।

## অন্তর্নির্মিত বস্তু

*wes* করেছে *built-in objects* যে *JScript* নেই।

### প্রয়োজন

*require* সহ মডিউলটি আমদানি করুন। *wes* স্বয়ংক্রিয়ভাবে মডিউল ফাইলটির এনকোডিং অনুমান করে, তবে আপনি যদি এটি সঠিকভাবে অনুমান না করেন তবে আপনি দ্বিতীয় যুক্তির সাহায্যে এনকোডিং নির্দিষ্ট করতে পারবেন।

আপনি *OLE* মতো `require('WScript.Shell')` সাথে *require* আমদানি করতে পারেন।

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

### মডিউল এবং মডিউল

আপনি যদি এটি মডিউল হিসাবে সংজ্ঞায়িত করতে চান তবে এটি `module.exports` প্রতিস্থাপন করুন।

```javascript
function add (a, b) {
    return a + b
}

module.exports = add
```

### কনসোল

*wes* `WScript.Echo` এবং `WScript.StdErr.WriteLine` এ *console* পরিবর্তে ব্যবহার করুন।

আপনি `console.log` দিয়ে কমান্ড লাইনে অক্ষরগুলি আউটপুট করতে পারেন। এটি ফর্ম্যাটযুক্ত স্ট্রিংগুলিকে সমর্থন করে। বিন্যাসের স্ট্রিং নির্দিষ্ট করতে আপনি বিন্যাস অপারেটর `%` ব্যবহার করতে পারেন।

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

*wes* , `WScript.StdErr.WriteLine` পরিবর্তে `WScript.StdErr.WriteLine` ব্যবহার করে স্ট্রিং রঙিন স্ট্রিং আউটপুট দেওয়ার জন্য `WScript.StdOut.WriteLine` `WScript.Echo` আউটপুট `WScript.Echo` এবং `WScript.StdOut.WriteLine` অবরুদ্ধ করা হয়েছে, ব্যবহার `WScript.StdOut.WriteLine` বা `console.log` ।

### বাফার

বাফারগুলি পরিচালনা করতে পারে।

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```

### নাম **এবং** ফাইলের নাম

`__filename` বর্তমানে কার্যকর করা মডিউল ফাইলের পথ সঞ্চয় করে। `__dirname` ডিরেক্টরিটি `__filename` ডিরেক্টরি ডিরেক্টরি সঞ্চয় করে।

```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```

## অন্তর্নির্মিত মডিউল

*wes* বেসিক প্রসেসিং সহজতর এবং মানক করার জন্য *built-in modules* ।

### ANSI

`ansi` একটি *ANSI escape code* রয়েছে এবং আপনি স্ট্যান্ডার্ড আউটপুট রঙ এবং প্রভাব পরিবর্তন করতে পারেন। ব্যবহৃত কনসোল অ্যাপ্লিকেশনটির ধরণ এবং সেটিংসের উপর নির্ভর করে রঙ এবং প্রভাবগুলি পৃথক হতে পারে।

```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```

আপনি `ansi.color()` বা `ansi.bgColor()` দিয়ে নিজের রঙ তৈরি করতে পারেন। আর্গুমেন্টগুলি *RGB* যেমন `255, 165, 0` বা *color code* যেমন `'#FFA500'` । আপনি `orange` মতো *color name* ব্যবহার করতে পারবেন না।

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

### argv হয়

কমান্ড লাইন আর্গুমেন্ট পেতে। `cscript.exe` কমান্ড-লাইন আর্গুমেন্টগুলি `/` নামযুক্ত আর্গুমেন্টগুলি ঘোষনা করে তবে, *wes* ইন `-` এবং `--` নামক যুক্তিগুলিকে ভিতরে ঘোষণা করে।

*argv.unnamed* এবং *argv.named* কমান্ড লাইন আর্গুমেন্টের মান *argv.named* *String* *Number* *Boolean* মধ্যে *argv.named* ফেলে দেয়।

*REPL* সহ কমান্ড লাইন আর্গুমেন্ট লিখুন।

```shell
wes REPL aaa -bcd eee --fgh=iii jjj --kln mmm
```

*REPL* নিম্নলিখিত স্ক্রিপ্টটি চালান।

```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```

### পথনাম

পথ পরিচালনা করুন।

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

### নথি ব্যবস্থা

ফাইল এবং ডিরেক্টরি পরিচালনা করে। `readTextFileSync` ফাইল এনকোডিং অনুমান করে এটি পড়বে।

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```

### JScript

আপনাকে স্ক্রিপ্ট ইঞ্জিন পরিবর্তন করেন তাহলে *Chakra* , আপনি ব্যবহার করতে সক্ষম হবেন না *JScript* নির্দিষ্ট *Enumerator* । অন্তর্নির্মিত মডিউল *JScript* তাদের উপলব্ধ করে। তবে, *Enumerator* একটি এনুমুরেটর বস্তুর পরিবর্তে একটি *Array* ।

```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```

*GetObject* `WScript.GetObject` বিকল্প হিসেবে `WScript.GetObject` ।

```javascript
const { GetObject, Enumerator } = require('JScript')

const ServiceSet = GetObject("winmgmts:{impersonationLevel=impersonate}").InstancesOf("Win32_Service")
new Enumerator(ServiceSet).forEach(service => console.log(
    'Name: %O\nDescription: %O\n',
    service.Name,
    service.Description
))
```

### VB স্ক্রিপ্ট

*VBScript* *JScript* নেই এমন কিছু বৈশিষ্ট্য সরবরাহ করে।

```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```

### HTTPrequest

*httprequest* এর নাম হিসাবে *http request* একটি জারি করবে।

```javascript
const request = require('httprequest')
const content = request('GET', 'http://weather.livedoor.com/forecast/webservice/json/v1?city=130010')
console.log('%O', JSON.parse(content))
```

### minitest

*minitest* সহজ পরীক্ষা লিখতে পারে।

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

### নল

*pipe* পাইপ প্রক্রিয়াকরণ সহজ করে তোলে

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

স্ক্রিপ্টের ধরণের বিচার করুন।

```javascript
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```

## মডিউল বান্ডিল এবং ইনস্টল

*install* , আপনার জন্য মডিউল ইনস্টল করতে পারেন *wes* প্রকাশিত *github* । মডিউলটি প্রকাশ করতে আপনার *github repository* প্রয়োজন। এছাড়াও, সংগ্রহস্থলের নাম এবং স্থানীয় ডিরেক্টরি নাম একই হতে হবে।

### পাঁজা

*github* কোনও মডিউল প্রকাশ করার সময়, *bundle* প্রয়োজনীয় মডিউলগুলি বান্ডিল করে এবং এটিকে *install* মডিউল দ্বারা অন্তর্ভুক্ত করা যায় এমন একটি ফর্ম্যাটে রূপান্তরিত করে।

সুরক্ষার বিবেচনায় *wes* সরাসরি সম্পাদন করা যেতে পারে এমন মডিউলটি আমদানি করে না, তাই *bundle* মডিউলটিতে *.json* ফাইল তৈরি করুন।

বান্ডিলিং মডিউলগুলির জন্য কিছু শর্ত রয়েছে।

1.  একটি *repository* এক ধরণের মডিউল প্রকাশিত হতে পারে।
2.  *github* সংগ্রহস্থলের নাম এবং স্থানীয় কর্মরত ডিরেক্টরি নাম অবশ্যই একই হতে হবে।
3.  মডিউলটি তৃতীয় পক্ষের কাছে প্রকাশ করতে চাইলে অবশ্যই সংগ্রহস্থলটি সর্বজনীন হতে হবে।
4.  *wes* স্ট্যাটিক্যালি, স্ক্রিপ্ট ব্যাখ্যা না, তাই মডিউল যা `require` শুধুমাত্র যেমন কিছু অবস্থার অধীনে `if` বিবৃতি বান্ডেল করা যাবে না।
5.  *.json* ফাইল নামের মধ্যে কাজের ডিরেক্টরির মধ্যে তৈরি করা হবে *directory_name.json* । আপনি যদি ফাইলের নাম পরিবর্তন করেন বা ফাইলটি সরান, আপনি এটি ইনস্টল করতে পারবেন না।
6.  `node_modules/directory_name` , বান্ডিলিং ব্যর্থ হয় কারণ এটি `directory_name.json` উল্লেখ করে।

### ইনস্টল

এটা তোলে জন্য মডিউল ফাইল ইনস্টল করার জন্য ব্যবহৃত হয় *wes* প্রকাশিত *github* ।

## ব্যবহার

`@author/repository` বিন্যাসে *install* করার *install* আর্গুমেন্টগুলি পাস করুন

```shell
wes install @wachaon/fmt
```

*install* বিকল্প আছে

| নামে       | সংক্ষিপ্ত নাম | বিবরণ                                 |
| ---------- | ------------- | ------------------------------------- |
| `--bare`   | `-b`          | *@author* ফোল্ডারটি তৈরি করবেন না     |
| `--global` | `-g`          | *wes.js* ফোল্ডারে মডিউলটি ইনস্টল করুন |

`--bare` বিকল্পটি `author@repository` থেকে `repository` থেকে `require` যুক্তি বাদ দিতে `require` । `--global` বিকল্পটি ইনস্টল করা মডিউলটি সমস্ত স্ক্রিপ্টের জন্য উপলব্ধ করে। উপরের বিকল্পগুলি *wes* সুরক্ষা বিকল্পের সাথে ব্যবহার করা আবশ্যক - `--unsafe` বা - `--dangerous`

```shell
wes install @wachaon/fmt --bare --unsafe
```

# ব্যক্তিগত সংগ্রহস্থল মডিউল ইনস্টল করুন

*install* কেবল *github* পাবলিক রিপোজিটরি মডিউলগুলিতেই নয়, বেসরকারী সংগ্রহস্থলগুলিতেও *install* যেতে পারে।

*install* করার সময় `author@repository` সহ মডিউলটি নির্দিষ্ট করুন specify নিম্নলিখিতটি বাস্তবায়নে ডাউনলোড করা হয়েছে।

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```

আপনি অ্যাক্সেস যখন *raw* একটি ব্রাউজার সাথে ব্যক্তিগত সংগ্রহস্থলের, *token* প্রদর্শন করা হয়, তাই কপি *token* এবং এটি ব্যবহার।

*token* বৈধ হওয়ার সময় আপনি যদি কমান্ড লাইনে এটি চালান তবে আপনি আপনার ব্যক্তিগত সংগ্রহস্থলের মডিউলগুলি ইনস্টল করতে পারেন।

```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

## বাহ্যিক মডিউল

এখানে আমরা কয়েকটি বাহ্যিক মডিউল প্রবর্তন করি।

### *@wachaon/fmt*

*@wachaon/fmt* এর একটি বান্ডিল *prettier* স্ক্রিপ্ট বিন্যাস করা হয়। উপরন্তু, *@wachaon/fmt* একটি রাষ্ট্র ইনস্টল হয়েছে `SyntaxError` যখন ঘটে ত্রুটি অবস্থান উপস্থাপন করতে পারেন।

#### ইনস্টল

```shell
wes install @wachaon/fmt
```

#### ব্যবহার

যদি ওয়ার্কিং ডিরেক্টরিতে। *.prettierrc* ( *.prettierrc* ফর্ম্যাট) থাকে তবে সেটিংসে এটি প্রতিফলিত করুন। *fmt* উভয় *CLI* (কমান্ড লাইন ইন্টারফেস) এবং *module* সঙ্গে ব্যবহার করা যেতে পারে।

*CLI* হিসাবে ব্যবহার করুন

```shell
wes @wachaon/fmt src/sample --write
```

| নামবিহীন সংখ্যা | বিবরণ                                           |
| --------------- | ----------------------------------------------- |
| 0               | -                                               |
| 1               | আবশ্যক। আপনি যে ফাইলটি ফর্ম্যাট করতে চান তার পথ |

| নামে      | সংক্ষিপ্ত নাম | বিবরণ                     |
| --------- | ------------- | ------------------------- |
| `--write` | `-w`          | ওভাররাইটিংয়ের অনুমতি দিন |

`--write` বা `-w` নামক যুক্তি দেওয়া থাকলে ফর্ম্যাট লিপি দিয়ে ফাইলটি ওভাররাইট করে `-w`

#### *module* হিসাবে ব্যবহৃত হয়

#### `option`

```javascript
{
    parser: 'babel',
    plugins: [babel]
}
```

#### `format`

| যুক্তির নাম | আদর্শ    | বিবরণ                          |
| ----------- | -------- | ------------------------------ |
| `source`    | `string` | বিন্যাসে স্ট্রিং               |
| `option?`   | `object` | *prettier* পাস করার বিকল্পগুলি |

```javascript
const { format } = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { resolve } = require('pathname')

const spec = resolve(process.cwd(), 'sample.js')
let source = readTextFileSync(spec)
source = format(source)
console.log(writeTextFileSync(spec, source))
```
