# *WES*

*wes* হল *WSH (Windows Script Host)* এ *ECMAScript* চালানোর জন্য একটি কনসোল ফ্রেমওয়ার্ক। *README* এর মূল [*japanese*](/README.md) জাপানি ভাষায় হবে। জাপানি ব্যতীত অন্য পাঠ্যগুলি মেশিন অনুবাদ করা হবে।  
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

-   আপনি স্ক্রিপ্ট ইঞ্জিনকে *Chakra* পরিবর্তন করতে পারেন এবং *ECMAScript2015* স্পেসিফিকেশন অনুযায়ী লিখতে পারেন।
-   যেহেতু 32bit *cscript.exe* সর্বদা কার্যকর করা হয়, তাই 64bit পরিবেশে কোন অনন্য সমস্যা নেই।
-   যেহেতু একটি মডিউল সিস্টেম রয়েছে, এটি প্রচলিত *WSH* এর চেয়ে আরও দক্ষতার সাথে বিকাশ করা যেতে পারে
-   অন্তর্নির্মিত মডিউলগুলি মৌলিক প্রক্রিয়াকরণকে সমর্থন করে যেমন ফাইল ইনপুট/আউটপুট এবং কনসোলে রঙিন পাঠ্য আউটপুট
-   আপনি ফাইল রিডিং স্বয়ংক্রিয়ভাবে এনকোডিং অনুমান করতে দিতে পারেন, তাই আপনাকে এনকোডিং ইত্যাদি সম্পর্কে চিন্তা করতে হবে না।
-   বাহ্যিক প্রকাশনা এবং পুনরুদ্ধার সমর্থন করার জন্য প্যাকেজ মডিউল

# *wes* সমস্যা যা আমরা সমাধান করতে পারি না

-   `WScript.Quit` প্রোগ্রামটি বাতিল করতে পারে না এবং একটি ত্রুটি কোড ফেরত দেয় না
-   `setTimeout` এবং `Promise` মতো অ্যাসিঙ্ক্রোনাস প্রক্রিয়াকরণ সম্ভব নয়
-   আপনি `WScript.CreateObject` এর দ্বিতীয় আর্গুমেন্টের *event prefix* ব্যবহার করতে পারবেন না

# ডাউনলোড

*wes.js* *wes* প্রয়োজন. ডাউনলোড করতে, [*@wachaon/wes*](https://github.com/wachaon/wes) থেকে *wes.js* কপি করুন অথবা আপনার কনসোলে নিম্নলিখিত কমান্ডটি চালান।

```bat
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

*WScript.Shell* একটি বাস্তবায়ন হিসাবে রানটাইমে `SendKeys` *wes* SendKeys ব্যবহার করে। যদি ডিরেক্টরির পাথ যেখানে *wes.js* সংরক্ষিত হয় সেখানে *ascii* ব্যতীত অন্য অক্ষর থাকে, `SendKeys` সঠিকভাবে কী পাঠাতে পারে না এবং স্ক্রিপ্টটি চালানো যাবে না।  
পাথ কনফিগার করুন *wes.js* শুধুমাত্র *ascii* তে সংরক্ষণ করা হয়। আপনি যদি ইতিমধ্যে *wes* ডাউনলোড করে থাকেন তবে আপনি নিম্নলিখিত কমান্ডের মাধ্যমে এটি আপডেট করতে পারেন।

```bat
wes update
```

# ব্যবহার

`wes` কীওয়ার্ড এবং ফাইলটি নির্দিষ্ট করে কমান্ডটি লিখুন যা কনসোলে প্রোগ্রামের সূচনা বিন্দু হবে। স্ক্রিপ্ট এক্সটেনশন *.js* বাদ দেওয়া যেতে পারে।

```bat
wes index
```

এছাড়াও, যেহেতু *wes* *REP* দিয়ে সজ্জিত, আপনি একা `wes` শুরু করে সরাসরি স্ক্রিপ্ট লিখতে পারেন।

```bat
wes
```

আপনি দুটি ফাঁকা লাইন প্রবেশ না করা পর্যন্ত *REP* স্ক্রিপ্ট ইনপুট গ্রহণ করে। আপনি *REP* এ *README.md* এর নমুনা স্ক্রিপ্ট চালানো দেখতে পারেন।

## কমান্ড লাইন বিকল্প

*wes* স্টার্টআপ বিকল্পগুলি নিম্নরূপ।

| নাম                | বর্ণনা                                                |
| ------------------ | ----------------------------------------------------- |
| `--monotone`       | *ANSI escape code* বাদ দেয়                           |
| `--safe`           | নিরাপদ মোডে স্ক্রিপ্ট চালান                           |
| `--usual`          | স্বাভাবিক মোডে স্ক্রিপ্ট চালান (ডিফল্ট)               |
| `--unsafe`         | অনিরাপদ মোডে স্ক্রিপ্ট চালান                          |
| `--dangerous`      | বিপজ্জনক মোডে স্ক্রিপ্ট চালান                         |
| `--debug`          | ডিবাগ মোডে স্ক্রিপ্ট চালান                            |
| `--encoding=UTF-8` | পড়া প্রথম ফাইলের এনকোডিং নির্দিষ্ট করে               |
| `--engine=Chakra`  | এই বিকল্পটি *wes* দ্বারা স্বয়ংক্রিয়ভাবে যোগ করা হয় |

`--safe` `--usual` `--unsafe` `--dangerous` `--debug` এর বাস্তবায়ন অসম্পূর্ণ, কিন্তু নামযুক্ত আর্গুমেন্ট সংরক্ষিত।

# মডিউল সিস্টেম

*wes* দুটি মডিউল সিস্টেম সমর্থন করে, *commonjs module* সিস্টেম `require()` ব্যবহার করে এবং *es module* সিস্টেম `import` ব্যবহার করে। ( *dynamic import* সমর্থিত নয় কারণ এটি একটি অ্যাসিঙ্ক্রোনাস প্রক্রিয়া)

## *commonjs module*

`module.exports` বরাদ্দ করে এবং `require()` কল করে মডিউল পরিচালনা করুন। পরম পাথ এবং `./` এবং `../` দিয়ে শুরু হওয়া আপেক্ষিক পাথগুলি ছাড়া অন্য পাথগুলি *wes_modules* ডিরেক্টরিতে এবং সুবিধামত *node_modules* ডিরেক্টরিতে মডিউলগুলি সন্ধান করে৷ *wes* 's `require()` স্বয়ংক্রিয়ভাবে মডিউল ফাইলের এনকোডিং অনুমান করে, কিন্তু যদি সঠিকভাবে অনুমান না করে তাহলে আপনি দ্বিতীয় আর্গুমেন্টের সাথে এনকোডিং নির্দিষ্ট করতে পারেন।

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

*Chakra* , যা স্ক্রিপ্ট এক্সিকিউশন ইঞ্জিন, সিনট্যাক্সকে ব্যাখ্যা করে যেমন `imoprt` , কিন্তু এটি কার্যকর করা যায় না কারণ এটি `cscript` হিসাবে প্রক্রিয়াকরণ পদ্ধতি সংজ্ঞায়িত করা হয়নি। *wes* এ, অন্তর্নির্মিত মডিউলগুলিতে *babel* যোগ করার মাধ্যমে, *es module* একের পর এক স্থানান্তরিত হওয়ার সময় কার্যকর করা হয়। এটি আমাদের ওভারহেড এবং একটি ফুলে যাওয়া *wes.js* ফাইল প্রক্রিয়াকরণের জন্য খরচ করে। *es module* লেখা মডিউলগুলিকেও ট্রান্সপিলিং করে `require()` এ রূপান্তরিত করা হয়, তাই *COM Object* অবজেক্টকে কল করা সম্ভব। যাইহোক, এটি *es module* সহ মডিউল ফাইলের এনকোডিং নির্দিষ্ট করা সমর্থন করে না। সবকিছু স্বয়ংক্রিয়ভাবে লোড হয়. এটিকে একটি *es module* হিসাবে লোড করতে, .mjs এ এক্সটেনশন সেট করুন বা `.mjs` এ `"type"` ক্ষেত্রটিকে `"module"` এ `package.json` করুন।

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

`WScript.Echo` *wes* এবং `WScript.StdErr.WriteLine` এর পরিবর্তে *console* ব্যবহার করে। `console.log` দিয়ে কনসোলে অক্ষর আউটপুট করুন। এটি ফরম্যাট করা স্ট্রিংগুলিকেও সমর্থন করে। `%` ফরম্যাটিং অপারেটর ব্যবহার করে একটি ফর্ম্যাট করা স্ট্রিং আউটপুট করে।

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

`WScript.StdOut.WriteLine` রঙিন স্ট্রিং আউটপুট করতে WScript.StdOut.WriteLine এর *wes* `WScript.StdErr.WriteLine` ব্যবহার করে। `WScript.Echo` এবং `WScript.StdOut.WriteLine` ব্লক করা আছে। `WScript.StdErr.WriteLine` বা `console.log` ব্যবহার করুন।

## *Buffer*

আপনি বাফার পরিচালনা করতে পারেন.

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```

## `__dirname` এবং `__filename`

`__filename` বর্তমানে কার্যকর করা মডিউল ফাইলের পথ সংরক্ষণ করে। `__dirname` এ `__filename` এর ডিরেক্টরি রয়েছে।

```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```

# অন্তর্নির্মিত মডিউল

মৌলিক প্রক্রিয়াকরণকে সরল ও মানসম্মত করার জন্য *wes* এর *built-in modules* রয়েছে।

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
wes REP aaa -bcd eee --fgh=iii jjj --kln mmm
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

পাথ ম্যানিপুলেট. `/` এবং `\` দিয়ে শুরু হওয়া পাথগুলি সাধারণত ড্রাইভ রুটের সাথে আপেক্ষিক। উদাহরণস্বরূপ `/filename` এবং `C:/filename` একই পথ হতে পারে। নিরাপত্তার কারণে, wes কার্যকারী ডিরেক্টরির সাথে সম্পর্কিত `/` এবং `\` দিয়ে শুরু হওয়া `wes` ব্যাখ্যা করে।

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

## *filesystem*

ফাইল এবং ডিরেক্টরি ম্যানিপুলেট. `readTextFileSync` স্বয়ংক্রিয়ভাবে ফাইলের এনকোডিং অনুমান করে এবং এটি পড়ে।

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
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

### ব্যবহার

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

#### assert(মান, `assert(value, message)` `assert.ok(value, message)`

কঠোর সমতা অপারেটরের সাথে `true` সাথে তুলনা করুন `===` । `value` একটি ফাংশন হলে, ফাংশন কার্যকর করার ফলাফল মূল্যায়ন করুন।

| পরম       | টাইপ                  | বর্ণনা                               |
| :-------- | :-------------------- | :----------------------------------- |
| `value`   | `{Function\|Boolean}` | বুলিয়ান বা বুলিয়ান-রিটার্নিং ফাংশন |
| `message` | `{String}`            | ব্যর্থতার ক্ষেত্রে বার্তা            |

#### `assert.equal(expected, actual)`

সদস্য সমতার জন্য বস্তুর তুলনা, রেফারেন্স দ্বারা নয়।  
NaN `true` `NaN === NaN` `function (){} === function (){}` `/RegExp/g === /RegExp/g` বা `{one: {two: 2}} === {one: {two: 2}}` `[1,2,3] === [1,2,3]` ইত্যাদি।  
ক্লাস (বস্তু) তুলনা করার সময়, তাদের অবশ্যই একই কনস্ট্রাক্টর বা একটি সুপারক্লাস থাকতে হবে যার `actual` `expected` ।

| পরম        | টাইপ    | বর্ণনা         |
| :--------- | :------ | :------------- |
| `expected` | `{Any}` | প্রত্যাশিত মান |
| `actual`   | `{Any}` | প্রকৃত মূল্য   |

#### `assert.throws(value, expected, message)`

যাচাই করুন যে ত্রুটিটি সঠিকভাবে নিক্ষেপ করা হচ্ছে।  
ত্রুটিটি সঠিক কিনা তা নির্ধারণ করা হয় প্রত্যাশিত ত্রুটি *constructor* , *message* সমান কিনা এবং রেগুলার এক্সপ্রেশন *stack* মূল্যায়ন পাস করে।

| পরম        | টাইপ                      | বর্ণনা                                                                                          |
| :--------- | :------------------------ | :---------------------------------------------------------------------------------------------- |
| `value`    | `{Error}`                 | ত্রুটি                                                                                          |
| `expected` | `{Error\|String\|RegExp}` | একটি নিয়মিত অভিব্যক্তি যা প্রত্যাশিত ত্রুটি *constructor* , *message* বা *stack* মূল্যায়ন করে |
| `message`  | `{String}`                | ব্যর্থতার ক্ষেত্রে বার্তা                                                                       |

## *pipe*

*pipe* পাইপিংকে সহজ করে।

### ব্যবহার

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

### ব্যবহার

```javascript
const { isString, isNumber, isBoolean, isObject } = require('typecheck')
const log = require('log')
log(() => isString("ECMAScript"))
log(() => isNumber(43.5))
log(() => isBoolean(false))
log(() => isObject(function(){}))
```

## *animate*

*animate* কনসোলের প্রদর্শনকে অ্যানিমেট করতে সহায়তা করে।

### ব্যবহার

যদি প্রক্রিয়াকরণে দীর্ঘ সময় লাগে, তবে কনসোলে একটি অ্যানিমেশন হিসাবে অগ্রগতি প্রদর্শন করা ভাল হবে।

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

সমস্ত সারি সম্পন্ন হলে বা `stop()` বলা হলে `complete` ফাংশনটি চালান।

#### `static genProgressIndicator(animation)`

একটি সাইক্লিং অ্যানিমেশন প্রদর্শন করে এমন একটি ফাংশন তৈরি করুন।

#### `register(callback, interval, conditional)`

নিবন্ধন প্রক্রিয়াকরণ. একাধিক প্রক্রিয়া সমান্তরালভাবে নিবন্ধিত এবং প্রক্রিয়া করা যেতে পারে। `callback` , আমরা অ্যানিমেশন বন্ধ করার নির্দেশ দেব এবং প্রদর্শিত দৃশ্যটি লিখব। `interval` প্রক্রিয়াকরণ ব্যবধান নির্দিষ্ট করে। যদি `conditional` একটি ফাংশন হয়, তবে এটি `conditional(count, queue)` এবং ফলাফলটি সত্য হলে এটি চলতে থাকবে। `conditional` একটি সংখ্যা হলে `decrement(count)` করে এবং ফলাফলটি একটি ধনাত্মক সংখ্যা হলে চলতে থাকে। `conditional` সংজ্ঞায়িত না থাকলে শুধুমাত্র একবার কার্যকর করা হয়। মনে রাখবেন যে একটি ফাংশন নির্দিষ্ট করা `count` বৃদ্ধি করে, যেখানে একটি সংখ্যা নির্দিষ্ট করা `count` হ্রাস করে।

#### `stop()`

*animate* .

#### `cancel(queue)`

একটি নির্দিষ্ট সারির প্রক্রিয়াকরণ স্থগিত করে।

#### `run()`

অ্যানিমেশন শুরু করুন।

#### `view`

কনসোলে মুদ্রিত অক্ষরগুলি নির্দিষ্ট করে। নিয়মিত বিরতিতে অক্ষর পরিবর্তন করুন। `view` *Arrary* বা *String* বরাদ্দ করুন। একটি একক অ্যানিমেশন আপডেট করার সময় একটি *String* দরকারী, এবং পৃথকভাবে একাধিক সারি অ্যানিমেট করার সময় একটি *Array* দরকারী।

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

*ProgID* থেকে *COM Object* সদস্যের ধরন এবং বিবরণ পান।

### ব্যবহার

```javascript
const getMember = require('getMember')
const FileSystemObject = 'Scripting.FileSystemObject'
console.log('require("%S") // => %O', FileSystemObject, getMember(FileSystemObject))
```

## *zip*

ফাইল এবং ফোল্ডারগুলিকে সংকুচিত করে এবং সংকুচিত ফাইলগুলিকে ডিকম্প্রেস করে। অভ্যন্তরীণভাবে, *PowerShell* বলা হয় এবং প্রক্রিয়া করা হয়।

### ব্যবহার

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

*wes* এ, বেশ কয়েকটি মডিউলের একটি বান্ডিলকে প্যাকেজ বলা হয়। আপনি *github* এ প্রকাশিত *wes* এর জন্য প্যাকেজটি ইনস্টল করতে পারেন। একটি প্যাকেজ প্রকাশ করার জন্য একটি *github repository* প্রয়োজন। এছাড়াও, সংগ্রহস্থলের নাম এবং স্থানীয় ডিরেক্টরির নাম অবশ্যই একই হতে হবে।

## *bundle*

*github* এ একটি প্যাকেজ প্রকাশ করার সময়, প্রয়োজনীয় মডিউলগুলিকে *bundle* করে এবং একটি বিন্যাসে পরিবর্তন করে যা ইনস্টলেশনের মাধ্যমে অন্তর্ভুক্ত করা যেতে পারে। নিরাপত্তার কারণে, *bundle* *.json* *wes* তৈরি করে কারণ আমরা আপনাকে সরাসরি এক্সিকিউটেবল প্যাকেজ আমদানি করতে দিই না। প্যাকেজিংয়ের জন্য কিছু শর্ত রয়েছে।

1.  একটি *repository* শুধুমাত্র একটি প্যাকেজ প্রকাশ করা যেতে পারে

2.  অনুগ্রহ করে *github* সংগ্রহস্থলের নাম এবং স্থানীয় কার্যকারী ডিরেক্টরি নামের জন্য একই নাম ব্যবহার করুন

3.  আপনি যদি প্যাকেজটি প্রকাশ করতে চান তাহলে সংগ্রহস্থলটিকে *public* করুন৷

4.  শীর্ষ-স্তরের সুযোগে মডিউলটির অধিগ্রহণ ঘোষণা করুন

5.  প্যাকেজের জন্য একটি *.json* ফাইল নির্দেশিকা\_name.json নামে ওয়ার্কিং *directory_name.json* তৈরি করা হয়। আপনি যদি ফাইলের নাম পরিবর্তন করেন বা ফাইলটি সরান, আপনি ইনস্টলেশনের সময় এটি উল্লেখ করতে পারবেন না।

6.  `node_modules/directory_name` হয় বান্ডেলের শুরুর বিন্দু

    ```bat
        wes bundle directory_name
    ```

    সঙ্গে bundling ছাড়া

    ```bat
        wes bundle node_modules/directory_name
    ```

    সঙ্গে বান্ডিল করুন

## *install*

*wes* প্রকাশিত *github* এর জন্য প্যাকেজ ইনস্টল করতে ব্যবহৃত হয়। `version 0.10.28` থেকে, ইনস্টলেশন ফোল্ডারটি `wes_modules` থেকে `node_modules` এ পরিবর্তিত হয়। আপনি `node_modules` এ ইনস্টল করতে চাইলে add `--node` অপশন দিন।

### ব্যবহার

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
| `--node`      | `-n`          | *node_module* ফোল্ডারে ইনস্টল করুন                                          |

`--bare` বিকল্পটি `author@repository` থেকে `repository` তে `require` আর্গুমেন্ট বাদ দিতে পারে। `--global` বিকল্পটি সমস্ত স্ক্রিপ্টের জন্য ইনস্টল করা প্যাকেজ উপলব্ধ করে। `--node` বা `-n` বিকল্পটিকে অবশ্যই *wes* নিরাপত্তা বিকল্পের সাথে নির্দিষ্ট করতে হবে `--unsafe` বা `--dangerous` ।

```bat
wes install @wachaon/fmt --bare --unsafe
```

# ব্যক্তিগত সংগ্রহস্থল থেকে প্যাকেজ ইনস্টল করা হচ্ছে

*install* শুধুমাত্র পাবলিক *github* রিপোজিটরি থেকে প্যাকেজ ইন্সটল করতে পারে না, ব্যক্তিগত রিপোজিটরি থেকে প্যাকেজও ইনস্টল করতে পারে। *install* , *@author/repository* সহ প্যাকেজটি নির্দিষ্ট করুন। বাস্তবায়ন নিম্নলিখিত url ডাউনলোড করার চেষ্টা করে।

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```

আপনি একটি ব্রাউজার দিয়ে ব্যক্তিগত সংগ্রহস্থল *raw* অ্যাক্সেস করলে, *token* প্রদর্শিত হবে, তাই *token* অনুলিপি করুন এবং এটি ব্যবহার করুন। *token* বৈধ থাকাকালীন আপনি কনসোলে এটি চালিয়ে ব্যক্তিগত সংগ্রহস্থল থেকে প্যাকেজগুলি ইনস্টল করতে পারেন।

```bat
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

# প্যাকেজ পরিচিতি

এখানে কিছু বাহ্যিক প্যাকেজ আছে.

## *@wachaon/fmt*

*@wachaon/fmt* স্ক্রিপ্ট ফর্ম্যাট করার জন্য *prettier* এর জন্য *wes* প্যাকেজ। এছাড়াও, যদি *@wachaon/fmt* ইনস্টল করার সময় একটি *Syntax Error* ঘটে, আপনি ত্রুটিটির অবস্থান দেখাতে পারেন।

### ইনস্টল

```bat
wes install @wachaon/fmt
```

### ব্যবহার

কাজের ডিরেক্টরিতে *.prettierrc* (JSON ফরম্যাট) থাকলে সেটি সেটিংসে প্রতিফলিত হবে। *fmt* *CLI* এবং *module* উভয়েই উপলব্ধ।

#### *CLI* হিসাবে ব্যবহার করুন।

```bat
wes @wachaon/fmt src/sample --write
```

| নামহীন নম্বর | বর্ণনা                                            |
| ------------ | ------------------------------------------------- |
| 0            | -                                                 |
| 1            | প্রয়োজন। আপনি যে ফাইলটি ফরম্যাট করতে চান তার পাথ |

| নাম       | সংক্ষিপ্ত নাম | বর্ণনা                   |
| --------- | ------------- | ------------------------ |
| `--write` | `-w`          | ওভাররাইট করার অনুমতি দিন |

`--write` বা `-w` নামের আর্গুমেন্ট নির্দিষ্ট করা থাকলে ফর্ম্যাট করা স্ক্রিপ্ট দিয়ে ফাইলটি ওভাররাইট করুন।

#### একটি মডিউল হিসাবে ব্যবহার করুন

```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')
const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```

## *@wachaon/edge*

*Internet Explorer* 15 জুন, 2022-এ সমর্থন বন্ধ করবে। সেই সাথে, এটা প্রত্যাশিত যে `require('InternetExplorer.Application')` সহ অ্যাপ্লিকেশন অপারেশনও অসম্ভব হয়ে উঠবে। একটি বিকল্প হল *web driver* মাধ্যমে *Microsoft Edge based on Chromium* সাথে কাজ করা। `@wachaon/edge` *Edge* অটোপাইলটকে সহজ করে।

### ইনস্টল

প্রথমে প্যাকেজটি ইনস্টল করুন।

```bat
wes install @wachaon/edge --unsafe --bare
```

তারপর *web driver* ডাউনলোড করুন।

```bat
wes edge --download
```

*Edge* ইনস্টল করা সংস্করণ পরীক্ষা করুন এবং সংশ্লিষ্ট *web driver* ডাউনলোড করুন।

### ব্যবহার

এটি ব্যবহার করা সহজ হবে।

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

এই স্ক্রিপ্ট ক্রমানুসারে কনসোলে পরিদর্শন করা *URL* প্রিন্ট করে। `@wachaon/edge` *URL* এর জন্য ইভেন্ট নিবন্ধন করে এবং `res.exports` ডেটা যোগ করে। নিবন্ধিত করা *URL* টি হয় `String` `RegExp` হতে পারে এবং নমনীয়ভাবে সেট করা যেতে পারে৷ এটিকে ইভেন্ট-চালিত করে, আপনি অটোপাইলট দিয়ে পরিচালনা করা কঠিন প্রক্রিয়াগুলির জন্য ইভেন্টগুলি সেট না করে সহজেই ম্যানুয়াল অপারেশনে স্যুইচ করতে পারেন। আপনি যদি স্ক্রিপ্টটি বন্ধ করতে চান, তাহলে `navi.emit('terminate', res)` বা ম্যানুয়ালি *Edge* বন্ধ করুন। চূড়ান্তকরণ ডিফল্টরূপে *.json* ফাইল হিসাবে `res.exports` কে আউটপুট করে। আপনি যদি টার্মিনেশন প্রসেসিং সেট করতে চান, তাহলে `edge(callback, terminate)` `terminate` সেট করুন(কলব্যাক, টার্মিনেট)। `window` হল *@wachaon/webdriver* এর *Window* ক্লাসের একটি উদাহরণ, ব্রাউজারের `window` নয়।

## *@wachaon/webdriver*

এটি এমন একটি প্যাকেজ হবে যা ব্রাউজারটি পরিচালনাকারী *web driver* অনুরোধ পাঠায়। *@wachaon/edge* এ নির্মিত। *@wachaon/edge* এর মতো, ব্রাউজার অপারেশনের জন্য একটি পৃথক *web driver* প্রয়োজন।

### ইনস্টল

```bat
wes install @wachaon/webdriver --unsafe --bare
```

আপনার কাছে না থাকলে *Chromium* ভিত্তিক *Microsoft Edge* *web driver* ডাউনলোড করুন। এছাড়াও, যদি *edge* সংস্করণ এবং *web driver* সংস্করণ ভিন্ন হয়, তাহলে *web driver* একই সংস্করণ ডাউনলোড করুন।

```bat
wes webdriver --download
```
