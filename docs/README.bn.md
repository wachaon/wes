# *WES*


*wes* হল একটি কনসোল ফ্রেমওয়ার্ক যা *WSH (Windows Script Host)* এ *ECMAScript* চালায়।


*README* এর মূল পাঠ্য [*japanese*](/README.md) । জাপানি ব্যতীত, এটি একটি মেশিন-অনুবাদিত বাক্য।  
অনুগ্রহ করে নিম্নলিখিত থেকে অন্যান্য ভাষার বাক্য নির্বাচন করুন।


+  [*簡体字*](/docs/README.zh-CN.md) <!-- 中国語 (簡体字) -->
+  [*繁体字*](/docs/README.zh-TW.md) <!-- 中国語 (繁体字) -->
+  [*English*](/docs/README.en.md) <!-- 英語 -->
+  [*हिन्दी*](/docs/README.hi.md) <!-- ヒンディー語 -->
+  [*Español*](/docs/README.es.md) <!-- スペイン語 -->
+  [*عربى*](/docs/README.ar.md) <!-- アラビア語 -->
+  [*বাংলা*](/docs/README.bn.md) <!-- ベンガル語 -->
+  [*Português*](/docs/README.pt.md) <!-- ポルトガル語 -->
+  [*русский язык*](/docs/README.ru.md) <!-- ロシア語 -->
+  [*Deutsch*](/docs/README.de.md) <!-- ドイツ語 -->
+  [*français*](/docs/README.fr.md) <!-- フランス語 -->
+  [*italiano*](/docs/README.it.md) <!-- イタリア語 -->



# বৈশিষ্ট্য


-   আপনি স্ক্রিপ্ট ইঞ্জিনটিকে *Chakra* পরিবর্তন করতে পারেন এবং এটি *ECMAScript2015* স্পেসিফিকেশনে লিখতে পারেন
-   এটি সর্বদা 32bit *cscript.exe* চালায়, তাই 64bit পরিবেশে কোন অন্তর্নিহিত সমস্যা নেই।
-   একটি মডুলার সিস্টেমের সাহায্যে, আপনি ঐতিহ্যগত *WSH* এর চেয়ে আরও দক্ষতার সাথে বিকাশ করতে পারেন
-   অন্তর্নির্মিত মডিউল মৌলিক প্রক্রিয়াকরণকে সমর্থন করে যেমন ফাইল ইনপুট/আউটপুট এবং কনসোলে রঙিন অক্ষরের আউটপুট।
-   আপনাকে এনকোডিং সম্পর্কে চিন্তা করতে হবে না কারণ আপনি ফাইলটি স্বয়ংক্রিয়ভাবে এনকোডিং অনুমান করতে পারেন।
-   আমরা বহিরাগত প্রকাশনা এবং পুনরুদ্ধার সমর্থন করার জন্য মডিউল প্যাকেজ করি।


# পরিচিত সমস্যা *wes* সমাধান করতে পারে না


-   `WScript.Quit` প্রোগ্রামটিকে বাধা দিতে পারে না এবং একটি ত্রুটি কোড ফেরত দেয় না
-   `setTimeout` এবং `Promise` মতো অ্যাসিঙ্ক্রোনাস প্রক্রিয়াকরণ সম্ভব নয়
-   আপনি `WScript.CreateObject` এর দ্বিতীয় আর্গুমেন্ট হিসাবে *event prefix* ব্যবহার করতে পারবেন না


# ইনস্টল


*wes.js* *wes* প্রয়োজন. ডাউনলোড করতে, [*@wachaon/wes*](https://github.com/wachaon/wes) থেকে *wes.js* কপি করুন বা কনসোলে নিম্নলিখিত কমান্ডটি চালান।


```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```


*WScript.Shell* একটি বাস্তবায়ন হিসাবে রানটাইমে *wes* এ `SendKeys` ব্যবহার করে। যদি ডিরেক্টরির পাথ যেখানে *wes.js* সংরক্ষিত হয় সেখানে *ascii* ছাড়া অন্য অক্ষর থাকে, `SendKeys` সঠিকভাবে কী পাঠাতে পারবে না এবং স্ক্রিপ্টটি কার্যকর করা যাবে না।  
অনুগ্রহ করে *wes.js* only *ascii* এর সেভ গন্তব্য পথ কনফিগার করুন।


# কিভাবে ব্যবহার করে


কমান্ডটি লিখুন যা ফাইলটি নির্দিষ্ট করে যা কনসোলের `wes` কীওয়ার্ড থেকে প্রোগ্রামের সূচনা পয়েন্ট হবে। স্ক্রিপ্ট এক্সটেনশন *.js* বাদ দেওয়া যেতে পারে.


```shell
wes index
```


এছাড়াও, *wes* এর একটি *REPL* রয়েছে, তাই আপনি যদি এটি শুধুমাত্র `wes` দিয়ে শুরু করেন, আপনি সরাসরি স্ক্রিপ্টে প্রবেশ করতে পারেন।


```shell
wes
```


আপনি দুটি ফাঁকা লাইন না দেওয়া পর্যন্ত *REPL* স্ক্রিপ্ট ইনপুট গ্রহণ করে। আপনি REPL-এর সাথে *REPL* এ নমুনা স্ক্রিপ্টের *README.md* পরীক্ষা করতে পারেন।


## কমান্ড লাইন বিকল্প


*wes* এর জন্য স্টার্টআপ বিকল্পগুলি নিম্নরূপ।


| নাম                | বর্ণনা                                                |
| ------------------ | ----------------------------------------------------- |
| `--monotone`       | *ANSI escape code* বাদ দিন                            |
| `--safe`           | নিরাপদ মোডে স্ক্রিপ্ট চালান                           |
| `--usual`          | স্বাভাবিক মোডে স্ক্রিপ্ট চালান (ডিফল্ট)               |
| `--unsafe`         | অনিরাপদ মোডে স্ক্রিপ্ট চালান                          |
| `--dangerous`      | বিপজ্জনক মোডে স্ক্রিপ্ট চালান                         |
| `--debug`          | ডিবাগ মোডে স্ক্রিপ্ট চালান                            |
| `--encoding=UTF-8` | পড়ার জন্য প্রথম ফাইলের এনকোডিং নির্দিষ্ট করে         |
| `--engine=Chakra`  | এই বিকল্পটি স্বয়ংক্রিয়ভাবে *wes* দ্বারা যোগ করা হয় |


\-- নিরাপদ `--usual` `--unsafe` -- বিপজ্জনক -- `--debug` বাস্তবায়ন অসম্পূর্ণ, কিন্তু `--safe` `--dangerous` সংরক্ষিত।


# মডুলার সিস্টেম


*wes* দুটি মডিউল সিস্টেম সমর্থন করে, একটি *commonjs module* সিস্টেম যা সাধারণ `require()` ব্যবহার করে এবং একটি *es module* যা `import` ব্যবহার করে। ( *dynamic import* অ্যাসিঙ্ক্রোনাস প্রসেসিং, তাই এটি সমর্থিত নয়)


## *commonjs module*


`module.exports` বরাদ্দ করে মডিউল পরিচালনা করুন এবং `require()` এর সাথে কল করুন। সুবিধার জন্য, এটি *node_modules* ডিরেক্টরিকেও সমর্থন করে।


*wes* `require()` স্বয়ংক্রিয়ভাবে মডিউল ফাইলের এনকোডিং অনুমান করে, কিন্তু যদি এটি সঠিকভাবে অনুমান না করে, আপনি দ্বিতীয় আর্গুমেন্টের সাথে এনকোডিং নির্দিষ্ট করতে পারেন।


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


আপনি প্রয়োজনের সাথে *require* মতো `require('WScript.Shell')` *ActiveX* করতে পারেন।


```javascript
const Shell = require('Shell.Application')
Shell.MinimizeAll()
WScript.Sleep(2000)
Shell.UndoMinimizeAll()
```


## *es module*


*Chakra* , যা স্ক্রিপ্টের এক্সিকিউশন ইঞ্জিন, সিনট্যাক্সকে ব্যাখ্যা করে যেমন `imoprt` , কিন্তু এটি কার্যকর করা যায় না কারণ এটি `cscript` হিসাবে প্রক্রিয়াকরণ পদ্ধতি সংজ্ঞায়িত করা হয়নি। *wes* এ, অন্তর্নির্মিত মডিউলে *babel* যোগ করার মাধ্যমে, এটি *es module* ক্রমানুসারে স্থানান্তর করার সময় কার্যকর করা হয়। ফলস্বরূপ, প্রসেসিং ওভারহেড এবং *wes.js* ফাইল একটি খরচ হিসাবে ফুলে গেছে।


*es module* দ্বারা বর্ণিত মডিউলগুলিকে `require()` তে রূপান্তরিত করা হয়, তাই *ActiveX* বলা যেতে পারে। যাইহোক, এটি মডিউল ফাইল এনকোডিং স্পেসিফিকেশন সমর্থন করে না। সব স্বয়ংক্রিয় অনুমান দ্বারা পড়া হয়.


এটিকে একটি *es module* হিসাবে লোড করতে, `package.json` এ এক্সটেনশন সেট করুন বা `.mjs` এর `"type"` ক্ষেত্রটিকে `"module"` এ সেট করুন।


```javascript
// ./sub.mjs
export default function sub (a, b) {
    return a - b
}
```


```javascript
./main2.js\
import sub from './sub.mjs'

console.log('sub(7, 3) // => %O', sub(7, 3))
```


# অন্তর্নির্মিত বস্তু


*wes* এর *built-in objects* রয়েছে যা *WSH (JScript)* এর নেই।


## *console*


*wes* `WScript.Echo` বা `WScript.StdErr.WriteLine` এর পরিবর্তে *console* ব্যবহার করে।


`console.log` এ কনসোলে অক্ষর মুদ্রণ করুন। এটি ফরম্যাট করা স্ট্রিংগুলিকেও সমর্থন করে। ফরম্যাটিং অপারেটর `%` ব্যবহার করে একটি ফরম্যাট করা স্ট্রিং প্রিন্ট করে।


```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```


`WScript.StdOut.WriteLine` রঙিন স্ট্রিং আউটপুট করতে WScript.StdOut.WriteLine এর *wes* `WScript.StdErr.WriteLine` ব্যবহার করে। `WScript.Echo` এবং `WScript.StdOut.WriteLine` আউটপুট থেকে ব্লক করা হয়েছে। `WScript.StdErr.WriteLine` বা `console.log` ব্যবহার করুন।


## *Buffer*


বাফারগুলি পরিচালনা করতে পারে।


```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```


## `__dirname` এবং `__filename`


`__filename` বর্তমানে চলমান মডিউল ফাইলের পথ ধারণ করে। `__dirname` এ `__filename` এর ডিরেক্টরি রয়েছে।


```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```


# অন্তর্নির্মিত মডিউল


বেসিক প্রসেসিংকে সরল ও প্রমিত করার জন্য *wes* এর *built-in modules* রয়েছে।


## *ansi*


ansi হল একটি `ansi` *ANSI escape code* যা আপনাকে স্ট্যান্ডার্ড আউটপুটের রঙ এবং প্রভাব পরিবর্তন করতে দেয়। ব্যবহৃত কনসোল অ্যাপ্লিকেশনের ধরন এবং সেটিংসের উপর নির্ভর করে রঙ এবং প্রভাব পরিবর্তিত হতে পারে।


```javascript
const { redBright, yellow } = require('ansi')
const message = 'File does not exist'
console.log(redBright + 'Error: ' + yellow + message)
```


এছাড়াও আপনি `ansi.color()` এবং `ansi.bgColor()` ) দিয়ে আপনার নিজস্ব রং তৈরি করতে পারেন। আর্গুমেন্ট *RGB* ব্যবহার করে যেমন `255, 165, 0` বা *color code* যেমন `'#FFA500'` । এটি `orange` মতো *color name* সমর্থন করে না।


```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```


## *argv*


কমান্ড লাইন আর্গুমেন্ট পায়। `cscript.exe` এ কমান্ড লাইন আর্গুমেন্ট `/` এর সাথে নামযুক্ত আর্গুমেন্ট ঘোষণা করে `--` যখন *wes* নামযুক্ত আর্গুমেন্ট `-` এবং- এর সাথে ঘোষণা করে।


*argv.unnamed* এবং *argv.named* কমান্ড লাইন আর্গুমেন্টের মান টাইপ *String* *Number* *Boolean* একটিতে কাস্ট করে।


*REPL* সহ কমান্ড লাইন আর্গুমেন্ট লিখুন।


```shell
wes REPL aaa -bcd eee --fgh=iii jjj --kln mmm
```


*REPL* এ নিম্নলিখিত স্ক্রিপ্টটি চালান।


```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```


## *pathname*


পথ পরিচালনা করুন।


`/` এবং `\` দিয়ে শুরু হওয়া পাথগুলি সাধারণত ড্রাইভ রুটের সাথে সম্পর্কিত পাথগুলিকে বোঝায়। উদাহরণস্বরূপ, `/filename` এবং `C:/filename` একই পথে থাকতে পারে। নিরাপত্তার কারণে, `wes` `/` এবং `\` দিয়ে শুরু হওয়া পাথগুলিকে কার্যকারী ডিরেক্টরির সাথে সম্পর্কিত হিসাবে ব্যাখ্যা করে।


```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```


## *filesystem*


ফাইল এবং ডিরেক্টরি পরিচালনা করুন। `readTextFileSync` স্বয়ংক্রিয়ভাবে অনুমান করে এবং ফাইলের এনকোডিং পড়ে।


```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```


## *chardet*


আমি <https://github.com/runk/node-chardet> এর কিছু বৈশিষ্ট্য ব্যবহার করছি।


আপনি এনকোডিং এর জন্য নির্দিষ্ট অক্ষর বৃদ্ধি করে স্বয়ংক্রিয় অনুমান করার সঠিকতা উন্নত করতে পারেন।


## *JScript*


আপনি যদি স্ক্রিপ্ট ইঞ্জিনকে *JScript* পরিবর্তন করেন, আপনি *Chakra* নির্দিষ্ট *Enumerator* ইত্যাদি ব্যবহার করতে পারবেন না। অন্তর্নির্মিত মডিউল *JScript* তাদের উপলব্ধ করে তোলে। যাইহোক, *Enumerator* একটি *Enumerator object* পরিবর্তে একটি *Array* প্রদান করে।


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


*VBScript* কিছু বৈশিষ্ট্য প্রদান করে যা *JScript* এর নেই।


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


## *pipe*


*pipe* পাইপ প্রক্রিয়াকরণকে সহজ করে।


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


স্ক্রিপ্টের ধরন নির্ধারণ করুন।


```javascript
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```


## *zip*


ফাইল এবং ফোল্ডারগুলিকে সংকুচিত করুন এবং সংকুচিত ফাইলগুলিকে ডিকম্প্রেস করুন। এটি অভ্যন্তরীণভাবে *PowerShell* কল করে এবং এটি প্রক্রিয়া করে।


```javascript
const {zip, unzip} = require('zip')

console.log(zip('docs\\*', 'dox.zip'))
console.log(unzip('dox.zip'))
```


ওয়াইল্ডকার্ড `*` জিপের `path` `zip(path, destinationPath)` লেখা যেতে পারে।


এটি *CLI (Command Line Interface)* এবং *module* উভয়ের সাথে ব্যবহার করা যেতে পারে।


```shell
wes zip docs\* dox.zip
wes zip -p dox.zip
```


যদি `path` এক্সটেনশন `.zip` থাকে, `unzip()` প্রক্রিয়া করা হয় এবং এক্সটেনশন `.zip` এর কোন বিবরণ নেই। অথবা `.zip` এক্সটেনশন থাকলেও, যদি ওয়াইল্ডকার্ড `*` এর বিবরণ থাকে, `zip()` প্রক্রিয়া করা হবে।


| নামহীন | বর্ণনা                             |
| ------ | ---------------------------------- |
| `1`    | `path` ফোল্ডার বা ফাইল প্রবেশ করতে |
| `2`    | ফোল্ডার ফাইল আউটপুট `dest`         |


| নাম      | সংক্ষিপ্ত নাম | বর্ণনা                             |
| -------- | ------------- | ---------------------------------- |
| `--path` | `-p`          | `path` ফোল্ডার বা ফাইল প্রবেশ করতে |
| `--dest` | `-d`          | ফোল্ডার ফাইল আউটপুট `dest`         |


# মডিউল bundling এবং ইনস্টলেশন


*wes* এ, বেশ কয়েকটি মডিউলের একটি বান্ডিলকে প্যাকেজ বলা হয়। আপনি *github* এ প্রকাশিত *wes* এর জন্য প্যাকেজটি ইনস্টল করতে পারেন। প্যাকেজটি প্রকাশ করতে আপনার একটি *github repository* প্রয়োজন হবে। এছাড়াও, সংগ্রহস্থলের নাম এবং স্থানীয় ডিরেক্টরির নাম অবশ্যই একই হতে হবে।


## *bundle*


প্যাকেজটি *github* এ প্রকাশ করার সময়, প্রয়োজনীয় মডিউলগুলিকে *bundle* করে এবং বিন্যাস পরিবর্তন করে যাতে এটি ইনস্টলেশনের মাধ্যমে আমদানি করা যায়।


নিরাপত্তার কারণে, *bundle* একটি *.json* ফাইল তৈরি করে কারণ *wes* আপনাকে প্যাকেজগুলিকে এমন একটি বিন্যাসে আমদানি করার অনুমতি দেয় না যা সরাসরি চালানো যেতে পারে।


প্যাকেজিংয়ের জন্য কিছু শর্ত রয়েছে।


1.  একটি *repository* শুধুমাত্র একটি মডিউল প্রকাশ করা যেতে পারে।
2.  নিশ্চিত করুন যে *github* সংগ্রহস্থলের নাম এবং স্থানীয় কাজের ডিরেক্টরির নাম একই।
3.  আপনি যদি প্যাকেজটি প্রকাশ করতে চান, সংগ্রহস্থলটি *public* করুন।
4.  শীর্ষ-স্তরের সুযোগে মডিউল অধিগ্রহণ ঘোষণা করুন।
5.  প্যাকেজ *.json* ফাইলটি ডিরেক্টরি\_name.json নামের সাথে আপনার কাজের *directory_name.json* তৈরি করা হয়েছে। ফাইলটির নাম পরিবর্তন করা হলে বা ফাইলটি সরানো হলে এটি ইনস্টল করা যাবে না।
6.  `node_modules/directory_name` বান্ডিল করার সময়, বান্ডিল ব্যর্থ হয় কারণ এটি `directory_name.json` name.json-কে নির্দেশ করে।


## *install*


*wes* প্রকাশিত *github* এর জন্য প্যাকেজ ইনস্টল করতে ব্যবহৃত হয়।


### কিভাবে ব্যবহার করে


`@author/repository` বিন্যাসে *install* করতে আর্গুমেন্ট পাস করুন।


```shell
wes install @wachaon/fmt
```


*install* করার বিকল্প আছে।


| নাম        | সংক্ষিপ্ত নাম | বর্ণনা                                              |
| ---------- | ------------- | --------------------------------------------------- |
| `--bare`   | `-b`          | *@author* ফোল্ডার তৈরি করবেন না                     |
| `--global` | `-g`          | যে ফোল্ডারে *wes.js* আছে সেখানে মডিউলটি ইনস্টল করুন |


`--bare` বিকল্পটি `author@repository` থেকে `repository` তে `require` আর্গুমেন্ট বাদ দিতে পারে। `--global` বিকল্পটি সমস্ত স্ক্রিপ্টের জন্য ইনস্টল করা মডিউলগুলি উপলব্ধ করে। উপরের বিকল্পগুলি অবশ্যই *wes* নিরাপত্তা বিকল্পের সাথে একই সময়ে নির্দিষ্ট করা উচিত `--unsafe` বা `--dangerous` ।


```shell
wes install @wachaon/fmt --bare --unsafe
```


# ব্যক্তিগত সংগ্রহস্থলে প্যাকেজ ইনস্টল করা হচ্ছে


*install* শুধুমাত্র গিথুবে পাবলিক রিপোজিটরিতে *github* ইন্সটল করতে পারে না, ব্যক্তিগত রিপোজিটরিতেও ইনস্টল করতে পারে।


*install* , *@author/repository* সহ মডিউলটি উল্লেখ করুন। বাস্তবায়ন নিম্নলিখিত url ডাউনলোড করার চেষ্টা করবে.


```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```


আপনি যখন ব্রাউজার দিয়ে ব্যক্তিগত সংগ্রহস্থলের *raw* অ্যাক্সেস করেন, *token* প্রদর্শিত হবে, তাই *token* অনুলিপি করুন এবং এটি ব্যবহার করুন।


আপনি *token* জীবনকালের মধ্যে কনসোলে এটি চালিয়ে একটি ব্যক্তিগত সংগ্রহস্থলে একটি মডিউল ইনস্টল করতে পারেন।


```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```


# প্যাকেজ পরিচিতি


এখানে কিছু বাহ্যিক মডিউল আছে।


## *@wachaon/fmt*


*@wachaon/fmt* *prettier* এবং স্ক্রিপ্টটিকে ফর্ম্যাট করে৷ এছাড়াও, *@wachaon/fmt* ইন্সটল করার সাথে যদি একটি *Syntax Error* ঘটে, আপনি ত্রুটির অবস্থান নির্দেশ করতে পারেন।


### ইনস্টল


```shell
wes install @wachaon/fmt
```


### কিভাবে ব্যবহার করে


যদি ওয়ার্কিং ডিরেক্টরিতে *.prettierrc* (JSON ফরম্যাট) থাকে তবে সেটি সেটিংসে প্রতিফলিত হবে। *fmt* *CLI* এবং *module* উভয়ের সাথে ব্যবহার করা যেতে পারে।


#### *CLI* হিসাবে ব্যবহৃত হয়।


```shell
wes @wachaon/fmt src/sample --write
```


| নামহীন নম্বর | বর্ণনা                                            |
| ------------ | ------------------------------------------------- |
| 0            | -----                                             |
| 1            | প্রয়োজন। আপনি যে ফাইলটি ফরম্যাট করতে চান তার পাথ |


| নাম       | সংক্ষিপ্ত নাম | বর্ণনা                   |
| --------- | ------------- | ------------------------ |
| `--write` | `-w`          | ওভাররাইট করার অনুমতি দিন |


যদি আপনি `--write` বা `-w` এর একটি নামযুক্ত আর্গুমেন্ট উল্লেখ করেন তাহলে ফর্ম্যাট করা স্ক্রিপ্ট দিয়ে ফাইলটি ওভাররাইট করুন।


#### একটি মডিউল হিসাবে ব্যবহার করুন


```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')

const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```


## `@wachaon/edge`


*Internet Explorer* 2022/6/15 এর সাথে সমর্থন সম্পূর্ণ করবে। ফলস্বরূপ, এটি প্রত্যাশিত যে `require('InternetExplorer.Application')` সহ অ্যাপ্লিকেশনটি পরিচালনা করা সম্ভব হবে না।


একটি বিকল্প হল *web driver* মাধ্যমে *Microsoft Edge based on Chromium* পরিচালনা করা। `@wachaon/edge` *Edge* অটোপাইলটকে সহজ করে।


### ইনস্টল


প্রথমে মডিউলটি ইনস্টল করুন।


```shell
wes install @wachaon/edge --unsafe --bare
```


তারপর *web driver* ডাউনলোড করুন।


```shell
wes edge --download
```


*Edge* এর ইনস্টল করা সংস্করণ পরীক্ষা করুন এবং সংশ্লিষ্ট *web driver* ডাউনলোড করুন।


### কিভাবে ব্যবহার করে


এটি ব্যবহার করা সহজ হবে।


```javascript
const edge = require('./index')

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


এই স্ক্রিপ্টটি পর্যায়ক্রমে কনসোলে পরিদর্শন করা *URL* আউটপুট করবে।


`@wachaon/edge` *URL* এর জন্য একটি ইভেন্ট নিবন্ধন করে এবং `res.exports` এ ডেটা যোগ করে। যে *URL* নিবন্ধিত হবে তা হয় `String` `RegExp` হতে পারে এবং নমনীয় সেটিংস তৈরি করা যেতে পারে।


এটিকে ইভেন্ট-চালিত করে, অটোপাইলট দিয়ে পরিচালনা করা কঠিন এমন একটি ইভেন্ট প্রক্রিয়াকরণের জন্য সেট না করে সহজেই ম্যানুয়াল অপারেশনে স্যুইচ করা সম্ভব।


আপনি যদি স্ক্রিপ্ট বন্ধ করতে চান, তাহলে `navi.emit('terminate', res)` অথবা ম্যানুয়ালি *Edge* টার্মিনেট করুন।


অবসান প্রক্রিয়া ডিফল্ট মান হিসাবে *.json* ফাইল হিসাবে `res.exports` কে আউটপুট করে। আপনি যদি সমাপ্তি প্রক্রিয়া সেট করতে চান তবে `edge(callback, terminate)` `terminate` সেট করুন (কলব্যাক, টার্মিনেট)।
