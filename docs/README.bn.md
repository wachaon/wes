# *WES*

*wes* হল *WSH (Windows Script Host)* এ *ECMAScript* চালানোর জন্য একটি কনসোল ফ্রেমওয়ার্ক। *README* এর মূল [*japanese*](/README.md) জাপানি ভাষায় হবে। জাপানি ব্যতীত অন্য পাঠ্যগুলি মেশিন অনুবাদ করা হবে।\
অন্যান্য ভাষার পাঠ্যের জন্য, অনুগ্রহ করে নীচের বিকল্পগুলি থেকে নির্বাচন করুন৷

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

# বৈশিষ্ট্য

*   আপনি *Chakra* স্ক্রিপ্ট ইঞ্জিন পরিবর্তন করতে পারেন এবং *ECMAScript2015* স্পেসিফিকেশন অনুযায়ী লিখতে পারেন।
*   যেহেতু 32bit *cscript.exe* সর্বদা কার্যকর করা হয়, তাই 64bit পরিবেশে কোন অনন্য সমস্যা নেই।
*   যেহেতু একটি মডিউল সিস্টেম রয়েছে, এটি প্রচলিত *WSH* এর চেয়ে আরও দক্ষতার সাথে বিকাশ করা যেতে পারে
*   অন্তর্নির্মিত মডিউলগুলি মৌলিক প্রক্রিয়াকরণকে সমর্থন করে যেমন ফাইল ইনপুট/আউটপুট এবং কনসোলে রঙিন পাঠ্য আউটপুট
*   আপনি ফাইল রিডিং স্বয়ংক্রিয়ভাবে এনকোডিং অনুমান করতে দিতে পারেন, তাই আপনাকে এনকোডিং ইত্যাদি সম্পর্কে চিন্তা করতে হবে না।
*   বাহ্যিক প্রকাশনা এবং পুনরুদ্ধার সমর্থন করার জন্য প্যাকেজ মডিউল
*   *WSH* চেয়ে আরো দয়া করে ত্রুটির বিবরণ প্রদর্শন করুন

# *wes* সমস্যা যা আমরা সমাধান করতে পারি না

*   `WScript.Quit` প্রোগ্রামটি বাতিল করতে পারে না এবং একটি ত্রুটি কোড ফেরত দেয় না
*   অ্যাসিঙ্ক্রোনাস প্রক্রিয়াকরণ সঠিকভাবে কাজ করে না
*   আপনি `WScript.CreateObject` এর দ্বিতীয় আর্গুমেন্টের *event prefix* ব্যবহার করতে পারবেন না

# ডাউনলোড

*wes.js* *wes* প্রয়োজন. ডাউনলোড করতে, [*@wachaon/wes*](https://github.com/wachaon/wes) থেকে *wes.js* কপি করুন বা কনসোলে নিম্নলিখিত কমান্ডটি চালান।

```bat
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

*WScript.Shell* একটি বাস্তবায়ন হিসাবে রানটাইমে `SendKeys` *wes* SendKeys ব্যবহার করে। যদি ডিরেক্টরির পাথ যেখানে *wes.js* সংরক্ষিত হয় সেখানে *ascii* ছাড়া অন্য অক্ষর থাকে, `SendKeys` সঠিকভাবে কী পাঠাতে পারে না এবং স্ক্রিপ্টটি চালানো যাবে না।\
পাথ কনফিগার করুন *wes.js* শুধুমাত্র *ascii* তে সংরক্ষণ করা হয়। আপনি যদি ইতিমধ্যে *wes* ডাউনলোড করে থাকেন তবে আপনি নিম্নলিখিত কমান্ডের মাধ্যমে এটি আপডেট করতে পারেন।

```bat
wes update
```

# কিভাবে *wes* শুরু করবেন

ফাইলটি নির্দিষ্ট করে কমান্ডটি অনুসরণ করে `wes` কীওয়ার্ড লিখুন যা কনসোলে প্রোগ্রামের শুরুর বিন্দু হবে। স্ক্রিপ্ট এক্সটেনশন *.js* বাদ দেওয়া যেতে পারে।

```bat
wes index
```

*wes* সরাসরি কনসোলে স্ক্রিপ্ট ইনপুট এবং এক্সিকিউট করতে পারে। আপনি যদি এটি শুধুমাত্র `wes` দিয়ে শুরু করেন, আপনি সরাসরি স্ক্রিপ্টটি প্রবেশ করতে এবং চালাতে পারেন।

```bat
wes
```

আপনি দুটি ফাঁকা লাইন প্রবেশ না করা পর্যন্ত *REP* স্ক্রিপ্ট ইনপুট গ্রহণ করে। আপনি *REP* *README.md* এ উদাহরণ স্ক্রিপ্ট চালাতেও দেখতে পারেন।

## কমান্ড লাইন বিকল্প

*wes* স্টার্টআপ বিকল্পগুলি নিম্নরূপ।

| নাম                | বর্ণনা                                                 |
| ------------------ | ------------------------------------------------------ |
| `--monotone`       | *ANSI escape code* বাদ দেয়                            |
| `--transpile`      | সর্বদা রূপান্তর করুন এবং *babel-standalone* সাথে চালান |
| `--debug`          | ডিবাগ মোডে স্ক্রিপ্ট চালান                             |
| `--encoding=UTF-8` | পড়া প্রথম ফাইলের এনকোডিং নির্দিষ্ট করে                |
| `--engine=Chakra`  | এই বিকল্পটি *wes* দ্বারা স্বয়ংক্রিয়ভাবে যোগ করা হয়  |

# মডিউল সিস্টেম

*wes* দুটি মডিউল সিস্টেম সমর্থন করে, *commonjs module* সিস্টেম `require()` ব্যবহার করে এবং *es module* সিস্টেম `import` ব্যবহার করে। ( *dynamic import* সমর্থিত নয় কারণ এটি একটি অ্যাসিঙ্ক্রোনাস প্রক্রিয়া)

## *commonjs module*

`module.exports` বরাদ্দ করে এবং `require()` কল করে মডিউল পরিচালনা করুন। পরম পাথ এবং `./` এবং `../` দিয়ে শুরু হওয়া আপেক্ষিক পাথগুলি ছাড়া অন্য পাথগুলি *wes\_modules* ডিরেক্টরিতে এবং সুবিধামত *node\_modules* ডিরেক্টরিতে মডিউলগুলি সন্ধান করে৷ *wes* 's `require()` স্বয়ংক্রিয়ভাবে মডিউল ফাইলের এনকোডিং অনুমান করে, কিন্তু আপনি দ্বিতীয় আর্গুমেন্টের সাথে এনকোডিং নির্দিষ্ট করতে পারেন যদি এটি সঠিকভাবে অনুমান না করে।

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

এছাড়াও, `require('WScript.Shell')` মতো *COM Object* *require* সাথে আমদানি করা সম্ভব।

```javascript
const Shell = require('Shell.Application')
Shell.MinimizeAll()
WScript.Sleep(2000)
Shell.UndoMinimizeAll()
```

## *es module*

*Chakra* , স্ক্রিপ্ট এক্সিকিউশন ইঞ্জিন, সিনট্যাক্স ব্যাখ্যা করে যেমন `imoprt` , কিন্তু এটি *cscript* পরিবেশে কার্যকর করা হয় না। *wes* এ, অন্তর্নির্মিত মডিউলগুলিতে *babel* যোগ করার মাধ্যমে, *es module* ক্রমানুসারে স্থানান্তরিত হওয়ার সময় কার্যকর করা হয়। এটি ওভারহেড প্রক্রিয়াকরণের খরচ এবং একটি ফুলে যাওয়া *wes.js* ফাইলের জন্য আসে। *es module* লেখা মডিউলগুলিকেও ট্রান্সপিলিং করে `require()` এ রূপান্তরিত করা হয়, তাই *COM Object* অবজেক্টকে কল করা সম্ভব। যাইহোক, এটি *es module* সহ মডিউল ফাইলের এনকোডিং নির্দিষ্ট করা সমর্থন করে না। সবকিছু স্বয়ংক্রিয়ভাবে লোড হয়. এটিকে একটি *es module* হিসাবে লোড করতে, .mjs এ এক্সটেনশন সেট করুন বা `.mjs` এ `"type"` ক্ষেত্রটিকে `"module"` এ `package.json` করুন।

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

# অন্তর্নির্মিত বস্তু

*wes* এর *built-in objects* রয়েছে *WSH (JScript)* এ পাওয়া যায় নি।

## *console*

Wes *wes* `WScript.Echo()` এবং `WScript.StdErr.WriteLine()` এর পরিবর্তে *console* ব্যবহার করে।

### *console.log*

`console.log()` দিয়ে কনসোলে অক্ষর আউটপুট করুন। এটি ফরম্যাট করা স্ট্রিংগুলিকেও সমর্থন করে। `%` ফরম্যাটিং অপারেটর ব্যবহার করে একটি ফরম্যাট করা স্ট্রিং আউটপুট করে। (ফরম্যাটিং অপারেটর অন্যান্য পদ্ধতির জন্যও বৈধ।)

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

| বিন্যাস স্পেসিফায়ার | বর্ণনা                           |
| -------------------- | -------------------------------- |
| `%s`                 | `String(value)`                  |
| `%S`                 | `String(value)`                  |
| `%c`                 | `String(value)`                  |
| `%C`                 | `String(value)`                  |
| `%d`                 | `parseInt(value, 10)`            |
| `%D`                 | `parseInt(value, 10)`            |
| `%f`                 | `Number(value)`                  |
| `%F`                 | `Number(value)`                  |
| `%j`                 | `JSON.stringify(value)`          |
| `%J`                 | `JSON.stringify(value, null, 2)` |
| `%o`                 | বস্তুর ডাম্প                     |
| `%O`                 | অবজেক্ট ডাম্প (ইন্ডেন্টেড/রঙিন)  |

`WScript.StdOut.WriteLine` রঙিন স্ট্রিং আউটপুট করতে WScript.StdOut.WriteLine এর *wes* `WScript.StdErr.WriteLine` ব্যবহার করে। `WScript.Echo` এবং `WScript.StdOut.WriteLine` ব্লক আউটপুট। `WScript.StdErr.WriteLine` বা `console.log` ব্যবহার করুন।

### *console.print*

`console.log()` সাধারণত শেষে একটি নতুন লাইন অন্তর্ভুক্ত করে, কিন্তু `console.print` করে না।

### *console.debug*

`--debug` বিকল্প সক্রিয় থাকলেই কনসোলে আউটপুট।

### *console.error*

বার্তা হিসাবে বিষয়বস্তুর সাথে একটি ব্যতিক্রম নিক্ষেপ করুন।

### *console.weaklog*

`console.weaklog()` দিয়ে মুদ্রিত স্ট্রিংগুলি কনসোল থেকে অদৃশ্য হয়ে যায় যদি পরবর্তী কোনো আউটপুট থাকে। আউটপুট স্যুইচ করার জন্য দরকারী।

## *Buffer*

আপনি বাফার পরিচালনা করতে পারেন.

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log('%s %O', content, buff)
```

## `__dirname` এবং `__filename`

`__filename` বর্তমানে কার্যকর করা মডিউল ফাইলের পথ সংরক্ষণ করে। `__dirname` এ `__filename` এর ডিরেক্টরি রয়েছে।

```javascript
const message = `dirname: ${__dirname}\nfilename: ${ __filename}`
console.log(message)
```

## *setTimeout* *setInterval* *setImmediate* *Promise*

যেহেতু *wes* সিঙ্ক্রোনাস প্রসেসিংয়ের জন্য একটি এক্সিকিউশন এনভায়রনমেন্ট, *setTimeout* *setInterval* *setImmediate* *Promise* অ্যাসিঙ্ক্রোনাস প্রসেসিং হিসাবে কাজ করে না, তবে এটি এমন মডিউলগুলিকে সমর্থন করার জন্য প্রয়োগ করা হয় যা *Promise* বাস্তবায়নকে ধরে নেয়।

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

# অন্তর্নির্মিত মডিউল

মৌলিক প্রক্রিয়াকরণকে সরল ও মানসম্মত করার জন্য *wes* এর *built-in modules* রয়েছে।

# অন্তর্নির্মিত মডিউল অপসারণ করা হবে

ফাইলটিকে হালকা এবং রক্ষণাবেক্ষণ করা সহজ করতে কিছু অন্তর্নির্মিত মডিউলগুলিকে বহিরাগত মডিউলগুলিতে পরিবর্তন করুন৷

*   *animate.js*
*   *day.js*
*   *debug.js*
*   *log.js*

উপরের মডিউলগুলি যথাক্রমে @wachaon `@wachaon/animate` `@wachaon/day` `@wachaon/debug` `@wachaon/log` হিসাবে ইনস্টল করা যেতে পারে।

## *ansi*

ansi হল `ansi` *ANSI escape code* যা আদর্শ আউটপুট রং এবং প্রভাব পরিবর্তন করতে পারে। ব্যবহৃত কনসোল অ্যাপ্লিকেশনের ধরন এবং সেটিংসের উপর নির্ভর করে রঙ এবং প্রভাব ভিন্ন হতে পারে।

```javascript
const { redBright, yellow } = require('ansi')
const message = 'File does not exist'
console.log(redBright + 'Error: ' + yellow + message)
```

এছাড়াও আপনি `ansi.color()` এবং `ansi.bgColor()` ) দিয়ে আপনার নিজস্ব রং তৈরি করতে পারেন। আর্গুমেন্ট *RGB* ব্যবহার করে যেমন `255, 165, 0` এবং *color code* যেমন `'#FFA500'` । `orange` মতো *color name* সমর্থিত নয়।

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

## *argv*

কমান্ড লাইন আর্গুমেন্ট পান. `cscript.exe` এর কমান্ড লাইন আর্গুমেন্ট `/` এর সাথে নামযুক্ত আর্গুমেন্ট ঘোষণা করে, যখন *wes* `-` এবং `--` এর সাথে নামযুক্ত আর্গুমেন্ট ঘোষণা করে। *argv.unnamed* এবং *argv.named* কমান্ড লাইন আর্গুমেন্ট ভ্যালু টাইপকে *String* *Number* *Boolean* কাস্ট করে। *REP* এর সাথে কমান্ড লাইন আর্গুমেন্ট লিখুন।

```bat
wes REP aaa -bc dd --e=false --gh=iii jjj --klm nn -o --p 9 r
```

*REP* তে নিম্নলিখিত স্ক্রিপ্টটি চালান।

```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```

## *pathname*

পাথ ম্যানিপুলেট. `/` এবং `\` দিয়ে শুরু হওয়া পাথগুলি সাধারণত ড্রাইভ রুটের সাথে আপেক্ষিক। উদাহরণস্বরূপ `/filename` এবং `C:/filename` একই পথ হতে পারে। নিরাপত্তার কারণে, wes কার্যকারী ডিরেক্টরির সাথে সম্পর্কিত `/` এবং `\` দিয়ে শুরু হওয়া *wes* ব্যাখ্যা করে।

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

## *filesystem*

ফাইল এবং ডিরেক্টরি ম্যানিপুলেট. `readTextFileSync()` স্বয়ংক্রিয়ভাবে ফাইলের এনকোডিং অনুমান করে এবং এটি পড়ে। (এমনকি যদি `readFileSync()` এর দ্বিতীয় আর্গুমেন্টটি `auto` `encode` করা থাকে তবে এটি স্বয়ংক্রিয়ভাবে অনুমান করা হবে।)

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
// const contents = fs.readFileSync(readme, 'auto')
console.log(contents)
```

## *chardet*

আমি <https://github.com/runk/node-chardet> থেকে কিছু বৈশিষ্ট্য ব্যবহার করছি। আপনি এনকোডিং-নির্দিষ্ট অক্ষর বাড়িয়ে স্বয়ংক্রিয় অনুমান করার সঠিকতা বাড়াতে পারেন।

## *JScript*

আপনি যদি স্ক্রিপ্ট ইঞ্জিনকে *JScript* পরিবর্তন করেন, তাহলে আপনি *Chakra* নির্দিষ্ট *Enumerator* ইত্যাদি ব্যবহার করতে পারবেন না। অন্তর্নির্মিত মডিউল *JScript* তাদের উপলব্ধ করে তোলে। যাইহোক, *Enumerator* একটি *Array* করে, একটি *Enumerator object* নয়।

```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```

*GetObject* `WScript.GetObject` বিকল্প হিসেবে কাজ করে।

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

*VBScript* কিছু বৈশিষ্ট্য অফার করে যা *JScript* করে না।

```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```

## *httprequest*

*httprequest* একটি *http request* ইস্যু করে।

```javascript
const request = require('httprequest')
const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log('%O', JSON.parse(content))
```

## *minitest*

*minitest* সহজ পরীক্ষা লিখতে পারে। সংস্করণ `0.10.71` থেকে, আমরা মূল ধারণায় ফিরে গিয়েছিলাম এবং দাবির ধরনগুলিকে 3 প্রকারে কমিয়েছি।

`describe` সহ গোষ্ঠী করুন, `it` দিয়ে পরীক্ষা করুন এবং `assert` দিয়ে যাচাই করুন। `pass` `it` সংঘটনের সংখ্যা এবং পাসের সংখ্যার একটি অ্যারে হবে।

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

### দাবী

সরলতার জন্য বস্তুর তুলনা করার জন্য শুধুমাত্র তিনটি দাবী ফাংশন আছে।

#### assert(মান, `assert(value, message)` `assert.ok(value, message)`

কঠোর সমতা অপারেটরের সাথে `true` সাথে তুলনা করুন `===` । `value` একটি ফাংশন হলে, ফাংশন কার্যকর করার ফলাফল মূল্যায়ন করুন।

| পরম       | টাইপ                  | বর্ণনা                               |
| :-------- | :-------------------- | :----------------------------------- |
| `value`   | `{Function\|Boolean}` | বুলিয়ান বা বুলিয়ান-রিটার্নিং ফাংশন |
| `message` | `{String}`            | ব্যর্থতার ক্ষেত্রে বার্তা            |

#### `assert.equal(expected, actual)`

সদস্য সমতার জন্য বস্তুর তুলনা, রেফারেন্স দ্বারা নয়।\
NaN `true` `NaN === NaN` `function (){} === function (){}` `/RegExp/g === /RegExp/g` বা `{one: {two: 2}} === {one: {two: 2}}` `[1,2,3] === [1,2,3]` ইত্যাদি।\
ক্লাস (বস্তু) তুলনা করার সময়, তাদের অবশ্যই একই কনস্ট্রাক্টর বা একটি সুপারক্লাস থাকতে হবে যার `actual` `expected` ।

| পরম        | টাইপ    | বর্ণনা         |
| :--------- | :------ | :------------- |
| `expected` | `{Any}` | প্রত্যাশিত মান |
| `actual`   | `{Any}` | প্রকৃত মূল্য   |

#### `assert.throws(value, expected, message)`

যাচাই করুন যে ত্রুটিগুলি সঠিকভাবে নিক্ষেপ করা হচ্ছে।\
ত্রুটিটি সঠিক কিনা তা নির্ধারণ করা হয় প্রত্যাশিত ত্রুটি *constructor* , *message* সমান কিনা এবং রেগুলার এক্সপ্রেশন *stack* মূল্যায়ন পাস করে।

| পরম        | টাইপ                      | বর্ণনা                                                                                          |
| :--------- | :------------------------ | :---------------------------------------------------------------------------------------------- |
| `value`    | `{Error}`                 | ত্রুটি                                                                                          |
| `expected` | `{Error\|String\|RegExp}` | একটি নিয়মিত অভিব্যক্তি যা প্রত্যাশিত ত্রুটি *constructor* , *message* বা *stack* মূল্যায়ন করে |
| `message`  | `{String}`                | ব্যর্থতার ক্ষেত্রে বার্তা                                                                       |

## *pipe*

*pipe* পাইপিংকে সহজ করে।

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

স্ক্রিপ্টের ধরন নির্ধারণ করুন।

```javascript
const { isString, isNumber, isBoolean, isObject } = require('typecheck')
const log = require('log')
log(() => isString("ECMAScript"))
log(() => isNumber(43.5))
log(() => isBoolean(false))
log(() => isObject(function(){}))
```

## *getMember*

কনসোলে ব্যবহার করার সময় *ProgID* থেকে *COM Object* সদস্যের ধরন এবং বিবরণ পায়।

```bat
wes getMember "Scripting.FileSystemObject"
```

একটি মডিউল হিসাবে ব্যবহার করা হলে, এটি উদাহরণের সদস্যদের প্রকার এবং বিবরণ পায়। একটি মডিউল হিসাবে ব্যবহার করা হলে, আপনি *WSH (Windows Script Host)* থেকে নিশ্চিত করা যাবে না এমন বস্তু সম্পর্কে তথ্য পেতে পারেন।

```javascript
const getMember = require('getMember')
const SWbemServicesEx = require("WbemScripting.SWbemLocator").ConnectServer()
getMember(SWbemServicesEx)
```

*wes* থেকে *PowerShell* এ অবজেক্ট পাস করার জন্য একটি নির্দিষ্ট সময় প্রয়োজন।

প্রক্রিয়াকরণ বন্ধ হলে, অপেক্ষার সময় নির্দিষ্ট করুন। (ডিফল্ট হল `1000` )

```bat
wes getMember "Scripting.FileSystemObject" 2000
```

বা

```javascript
const getMember = require('getMember', 2000)
const SWbemServicesEx = require("WbemScripting.SWbemLocator").ConnectServer()
getMember(SWbemServicesEx)
```

## *ps*

*PowerShell* চালানোর সুবিধা দেয়।

### `ps(source, option)`

`source` *PowerShell* স্ক্রিপ্ট চালান.

কনসোলে cmdlets এর একটি তালিকা প্রদর্শন করুন।

```javascript
const ps = require('ps')
const one = ps("Get-Command")
```

যদি একটি *Google Cherome* উইন্ডো থাকে, তাহলে উইন্ডোটির আকার এবং অবস্থান পরিবর্তন করুন। (এটি পূর্ণ স্ক্রীন মোডে কাজ করে না।)

```javascript
const ps = require('ps')

const code = `
$name = "chrome"
$w = 700
$h = 500
$x = 10
$y = 100

Add-Type @"
  using System;
  using System.Runtime.InteropServices;
  public class Win32Api {
    [DllImport("user32.dll")]
    [return: MarshalAs(UnmanagedType.Bool)]
    public static extern bool MoveWindow(IntPtr hWnd, int X, int Y, int nWidth, int nHeight, bool bRepaint);
  }
"@

Get-Process -Name $name | where { $_.MainWindowTitle -ne "" } | foreach {
    [Win32Api]::MoveWindow($_.MainWindowHandle, $x, $y, $w, $h, $true) | Out-Null
}
`

ps(code)
```

মাউস নড়াচড়া এবং ক্লিক নিয়ন্ত্রণ করে।

```javascript
const ps = require("ps")
const { unnamed } = require('argv')
const option = [
    unnamed[1],
    unnamed[2] || 0,
    unnamed[3] || 0
]

ps(`
$Method = $args[0]
$PosX = $args[1]
$PosY = $args[2]

$assemblies = @("System", "System.Runtime.InteropServices")

$Source = @"
using System;
using System.Runtime.InteropServices;

namespace Device {
    public class Mouse {
        public static void Main (params string[] args) {
            string method = args[0];
            int posX = args.Length > 1 ? Int32.Parse(args[1]) : 0;
            int posY = args.Length > 2 ? Int32.Parse(args[2]) : 0;

            if (method == "pos") {
                SetCursorPos(posX, posY);
            }

            if (method == "click") {
                mouse_event(0x2, posX, posY, 0, 0);
                mouse_event(0x4, 0, 0, 0, 0);
            }

            if (method == "leftDown") {
                mouse_event(0x2, posX, posY, 0, 0);
            }

            if (method == "leftUp") {
                mouse_event(0x4, posX, posY, 0, 0);
            }

            if (method == "rightClick") {
                mouse_event(0x8, posX, posY, 0, 0);
                mouse_event(0x10, 0, 0, 0, 0);
            }

            if (method == "rightDown") {
                mouse_event(0x8, posX, posY, 0, 0);
            }

            if (method == "righttUp") {
                mouse_event(0x10, posX, posY, 0, 0);
            }
        }

        [DllImport("USER32.dll", CallingConvention = CallingConvention.StdCall)]
        public static extern void SetCursorPos(int X, int Y);

        [DllImport("USER32.dll", CallingConvention = CallingConvention.StdCall)]
        public static extern void mouse_event(int dwFlags, int dx, int dy, int cButtons, int dwExtraInfo);
    }
}
"@

Add-Type -Language CSharp -TypeDefinition $Source -ReferencedAssemblies $assemblies

[Device.Mouse]::Main($Method, $PosX, $PosY)
`, option)
```

স্ক্রিপ্টটিকে একটি ফাইল হিসাবে সংরক্ষণ করুন বা আপনার পরবর্তী `REP` তে পেস্ট করুন।

```bat
wes REP pos 100 100
```

### সরাসরি কনসোল থেকে *powershell* চালান

কনসোলে নির্দিষ্ট *.ps1* ফাইলটি কার্যকর করে।

```bat
wes ps ./sample.ps1
```

আপনি `--Command` বা `-c` বিকল্পটি নির্দিষ্ট করে সরাসরি একটি কমান্ড চালাতে পারেন।

বর্তমান ডিরেক্টরিতে ফাইলগুলির একটি তালিকা প্রদর্শনের উদাহরণ

```bat
wes ps --Command Get-ChildItem
```

## *zip*

ফাইল এবং ফোল্ডারগুলিকে সংকুচিত করে এবং সংকুচিত ফাইলগুলিকে ডিকম্প্রেস করে। অভ্যন্তরীণভাবে, *PowerShell* বলা হয় এবং প্রক্রিয়া করা হয়।

```javascript
const {zip, unzip} = require('zip')
console.log(zip('docs\\*', 'dox.zip'))
console.log(unzip('dox.zip'))
```

একটি ওয়াইল্ডকার্ড `*` `zip(path, destinationPath)` এর `path` লেখা যেতে পারে। এটি *CLI (Command Line Interface)* এবং *module* উভয় ক্ষেত্রেই ব্যবহার করা যেতে পারে।

```bat
wes zip docs\* dox.zip
wes zip -p dox.zip
```

যদি `path` এক্সটেনশন `.zip` থাকে, তাহলে `unzip()` প্রসেস করা হয়, এবং এক্সটেনশন `.zip` এর কোন বিবরণ নেই। বিকল্পভাবে, একটি এক্সটেনশন `.zip` থাকলেও, যদি একটি ওয়াইল্ডকার্ড `*` বিবরণ থাকে, `zip()` প্রক্রিয়া করা হবে।

| নামহীন | বর্ণনা                     |
| ------ | -------------------------- |
| `1`    | প্রবেশ করতে `path` বা ফাইল |
| `2`    | ফোল্ডার ফাইল আউটপুট `dest` |

| নাম      | সংক্ষিপ্ত নাম | বর্ণনা                     |
| -------- | ------------- | -------------------------- |
| `--path` | `-p`          | প্রবেশ করতে `path` বা ফাইল |
| `--dest` | `-d`          | ফোল্ডার ফাইল আউটপুট `dest` |

# বান্ডলিং (প্যাকেজিং) এবং মডিউল ইনস্টল করা

*wes* এ, বেশ কয়েকটি মডিউলের একটি বান্ডিলকে প্যাকেজ বলা হয়। আপনি *github* এ প্রকাশিত *wes* এর জন্য প্যাকেজটি ইনস্টল করতে পারেন। একটি প্যাকেজ প্রকাশ করার জন্য একটি *github repository* প্রয়োজন।

## *bundle*

*github* একটি প্যাকেজ প্রকাশ করার সময়, প্রয়োজনীয় মডিউলগুলি *bundle* করে এবং *bundle.json* তৈরি করে।

1.  একটি *repository* শুধুমাত্র একটি প্যাকেজ প্রকাশ করা যেতে পারে
2.  *package.json* প্রয়োজন। ন্যূনতম, `main` ক্ষেত্রের বিবরণ প্রয়োজন। ```json
    {
        "main": "index.js"
    }
    ```
3.  আপনি যদি প্যাকেজটি প্রকাশ করতে চান তাহলে সংগ্রহস্থলটিকে *public* করুন৷
4.  `version 0.12.0` দিয়ে শুরু করে, কার্যকারী ডিরেক্টরির উপরে একটি ডিরেক্টরিতে সরাসরি মডিউল লোড করা প্যাকেজগুলি বান্ডিল করা হবে না। উপরের ডিরেক্টরির *wes\_modules* বা *node\_modules* করা যেতে পারে।

বান্ডিল করতে নিম্নলিখিত কমান্ডটি লিখুন: কি বান্ডেল করতে হবে তা জানতে *package.json* পড়ুন।

```bat
wes bundle 
```

## *init*

কিছু আইটেম লিখুন এবং এটি সেই তথ্য থেকে *package.json* তৈরি করবে।

```bat
wes init
```

## *install*

*wes* প্রকাশিত *github* এর জন্য প্যাকেজ ইনস্টল করতে ব্যবহৃত হয়। `version 0.10.28` থেকে, ইনস্টলেশন ফোল্ডারটি `wes_modules` থেকে `node_modules` এ পরিবর্তিত হয়েছে। আপনি `node_modules` এ ইনস্টল করতে চাইলে add `--node` অপশন দিন। `version 0.12.0` দিয়ে শুরু করে, ফাইলগুলি *bandle.json* থেকে আনজিপ করা হবে এবং সংরক্ষণ করা হবে৷ স্পেসিফিকেশন পরিবর্তনের কারণে, 0.12.0-এর কম `version 0.12.0` সহ প্যাকেজগুলি `version 0.12.0` সাথে সঠিকভাবে ইনস্টল নাও হতে পারে।

`@author/repository` ফর্মে *install* করতে আর্গুমেন্ট পাস করুন।

```bat
wes install @wachaon/fmt
```

*install* করার বিকল্প আছে।

| নাম           | সংক্ষিপ্ত নাম | বর্ণনা                                                                      |
| ------------- | ------------- | --------------------------------------------------------------------------- |
| `--bare`      | `-b`          | *@author* ফোল্ডার তৈরি করবেন না                                             |
| `--global`    | `-g`          | যে ফোল্ডারে *wes.js* আছে সেখানে প্যাকেজটি ইনস্টল করুন                       |
| `--save`      | `-S`          | *package.json* এ *dependencies* ক্ষেত্রে প্যাকেজের নাম এবং সংস্করণ যোগ করুন |
| `--save--dev` | `-D`          | *devDependencies* *package.json* প্যাকেজের নাম এবং সংস্করণ যোগ করুন         |
| `--node`      | `-n`          | *node\_module* ফোল্ডারে ইনস্টল করুন                                         |

`--bare` বিকল্পটি `author@repository` থেকে `repository` তে `require` আর্গুমেন্ট বাদ দিতে পারে। `--global` বিকল্পটি সমস্ত স্ক্রিপ্টের জন্য ইনস্টল করা প্যাকেজ উপলব্ধ করে।

```bat
wes install @wachaon/fmt --bare
```

# ব্যক্তিগত সংগ্রহস্থল থেকে প্যাকেজ ইনস্টল করা হচ্ছে

*install* শুধুমাত্র পাবলিক *github* রিপোজিটরি থেকে প্যাকেজ ইন্সটল করতে পারে না, ব্যক্তিগত রিপোজিটরি থেকে প্যাকেজও ইনস্টল করতে পারে। *install* সময়, *@author/repository* সহ প্যাকেজটি নির্দিষ্ট করুন। বাস্তবায়ন নিম্নলিখিত url ডাউনলোড করার চেষ্টা করে।

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/bundle.json`
```

আপনি যখন ব্রাউজার দিয়ে ব্যক্তিগত সংগ্রহস্থলের *raw* অ্যাক্সেস করেন, *token* প্রদর্শিত হবে, তাই *token* অনুলিপি করুন এবং এটি ব্যবহার করুন। *token* বৈধ থাকাকালীন কনসোলে কার্যকর করা হলে ব্যক্তিগত সংগ্রহস্থল থেকে প্যাকেজগুলিও ইনস্টল করা যেতে পারে।

```bat
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

# প্যাকেজ পরিচিতি

এখানে কিছু বাহ্যিক প্যাকেজ আছে.

## *@wachaon/fmt*

*@wachaon/fmt* স্ক্রিপ্ট ফর্ম্যাট করার জন্য *prettier* এর জন্য *wes* প্যাকেজ। এছাড়াও, যদি *@wachaon/fmt* ইনস্টল করার সময় একটি *Syntax Error* ঘটে, আপনি ত্রুটির অবস্থান দেখাতে পারেন।

### *@wachaon/fmt* ইনস্টল করুন

```bat
wes install @wachaon/fmt
```

কাজের ডিরেক্টরিতে *.prettierrc* (JSON ফরম্যাট) থাকলে সেটি সেটিংসে প্রতিফলিত হবে। *fmt* *CLI* এবং *module* উভয়েই উপলব্ধ।

#### *CLI* হিসাবে ব্যবহার করুন।

```bat
wes @wachaon/fmt src/sample --write
```

| নামহীন নম্বর | বর্ণনা                                            |
| ------------ | ------------------------------------------------- |
| 1            | প্রয়োজন। আপনি যে ফাইলটি ফরম্যাট করতে চান তার পাথ |

| নাম       | সংক্ষিপ্ত নাম | বর্ণনা                   |
| --------- | ------------- | ------------------------ |
| `--write` | `-w`          | ওভাররাইট করার অনুমতি দিন |

`--write` বা `-w` নামের আর্গুমেন্ট নির্দিষ্ট করা থাকলে ফরম্যাট করা স্ক্রিপ্ট দিয়ে ফাইলটি ওভাররাইট করুন।

#### একটি মডিউল হিসাবে ব্যবহার করুন

```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')
const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```

## *@wachaon/edge*

*Internet Explorer* 15 জুন, 2022-এ সমর্থন বন্ধ করবে। ফলস্বরূপ, এটি প্রত্যাশিত যে `require('InternetExplorer.Application')` সহ অ্যাপ্লিকেশন অপারেশনগুলি অসম্ভব হয়ে উঠবে৷ উপরন্তু, *Internet Explorer* সমর্থন শেষ করে সাইটটি নিজেই সঠিকভাবে প্রদর্শন করতে সক্ষম হবে না। একটি বিকল্প হল *web driver(msedgedriver.exe)* এর মাধ্যমে *Microsoft Edge based on Chromium* পরিচালনা করা। `@wachaon/edge` *Edge* অটোপাইলটকে সহজ করে।

### *@wachaon/edge* ইনস্টল করুন

প্রথমে প্যাকেজটি ইনস্টল করুন।

```bat
wes install @wachaon/edge --bare
```

তারপর *web driver(msedgedriver.exe)* ডাউনলোড করুন।

```bat
wes edge --download
```

ইনস্টল করা *Edge* সংস্করণটি পরীক্ষা করুন এবং সংশ্লিষ্ট *web driver* ডাউনলোড করুন।

### কিভাবে *@wachaon/edge* ব্যবহার করবেন

এটি ব্যবহার করা সহজ হবে। আপনার ব্রাউজার শুরু করুন এবং https: `https://www.google.com` এ প্রদর্শনের জন্য উইন্ডোর আকার এবং সাইট পরিবর্তন করুন।

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

আপনার ব্রাউজারের *URL* `https://www.yahoo` দিয়ে শুরু না হওয়া পর্যন্ত আমরা আপনার দর্শনের ইতিহাস সংরক্ষণ করি।

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

*edge* পরিদর্শন করা *URL* কনসোলে ক্রমানুসারে প্রিন্ট করে। `@wachaon/edge` *URL* এর জন্য ইভেন্ট নিবন্ধন করে এবং `res.exports` ডেটা যোগ করে। নিবন্ধিত করা *URL* টি হয় `String` `RegExp` হতে পারে এবং নমনীয়ভাবে সেট করা যেতে পারে। এটিকে ইভেন্ট-চালিত করে, আপনি অটোপাইলট দিয়ে পরিচালনা করা কঠিন প্রক্রিয়াগুলির জন্য ইভেন্ট সেট না করে সহজেই ম্যানুয়াল অপারেশনে স্যুইচ করতে পারেন। আপনি যদি স্ক্রিপ্টটি বন্ধ করতে চান, তাহলে `navi.emit('terminate', res)` বা *Edge* ম্যানুয়ালি বন্ধ করুন। চূড়ান্তকরণ ডিফল্টরূপে *.json* ফাইল হিসাবে `res.exports` কে আউটপুট করে। আপনি যদি টার্মিনেশন প্রসেসিং সেট করতে চান, তাহলে `edge(callback, terminate)` `terminate` সেট করুন (কলব্যাক, টার্মিনেট)। `window` হল *@wachaon/webdriver* এর *Window* ক্লাসের একটি উদাহরণ, ব্রাউজারের `window` নয়।

## *@wachaon/webdriver*

এটি এমন একটি প্যাকেজ হবে যা ব্রাউজারটি পরিচালনাকারী *web driver* অনুরোধ পাঠায়। *@wachaon/edge* এ *@wachaon/webdriver* অন্তর্ভুক্ত রয়েছে।

### *@wachaon/webdriver* ইনস্টল করুন

```bat
wes install @wachaon/webdriver --bare
```

আপনার কাছে না থাকলে *Chromium* ভিত্তিক *Microsoft Edge* *web driver(msedgedriver.exe)* ডাউনলোড করুন৷ এছাড়াও, যদি *edge* সংস্করণ এবং *web driver(msedgedriver.exe)* ভিন্ন হয়, তাহলে *web driver(msedgedriver.exe)* ডাউনলোড করুন।

```bat
wes webdriver --download
```

### *@wachaon/webdriver* কিভাবে ব্যবহার করবেন

[*yahoo JAPAN*](https://www.yahoo.co.jp/) সাইটে যান এবং একটি নির্দিষ্ট ব্লক উপাদানের একটি স্ক্রিনশট সংরক্ষণ করুন।

```javascript
const { Window } = require('webdriver')
const { writeFileSync } = require('filesystem')
const { resolve, WorkingDirectory } = require('pathname')
const genGUID = require('genGUID')

const window = new Window
const { document } = window
window.rect({
    x: 0,
    y: 0,
    width: 1280,
    height: 600
})
window.navigate('https://www.yahoo.co.jp/')

const [elm] = document.querySelectorAll('#ContentWrapper > main > div:nth-child(2)')
const screen = elm.takeScreenShot()

const spec = resolve(WorkingDirectory, 'dev', genGUID() + '.png')
console.log(writeFileSync(spec, screen))

window.quit()
```
