# *WES*


*wes* কমান্ড লাইনে *ECMAScript* চালানোর জন্য একটি কাঠামো *Windows Script Host* ।


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


-   *Windows Script Host* স্ক্রিপ্ট ইঞ্জিনকে চক্রে পরিবর্তন করুন এবং *ECMAScript2015* *Chakra* চালান
-   এটি সর্বদা 32bit *cscript.exe* চালায়, তাই 64bit পরিবেশে কোন অন্তর্নিহিত বাগ নেই।
-   `require` সহ মডিউল আমদানি করুন ( *ver 0.9.0* থেকে *es module* )
-   আদর্শ আউটপুটে রঙিন অক্ষর আউটপুট
-   স্বয়ংক্রিয়ভাবে অনুমান করুন এবং পাঠ্য ফাইলের এনকোডিং পড়ুন


# পরিচিত সমস্যা আমরা সমাধান করতে পারে না


-   `WScript.Quit` প্রোগ্রামটিকে বাধা দিতে পারে না এবং একটি ত্রুটি কোড ফেরত দেয় না
-   `setTimeout` এবং `Promise` মতো অ্যাসিঙ্ক্রোনাস প্রক্রিয়াকরণ সম্ভব নয়
-   `WScript.CreateObject` এর দ্বিতীয় আর্গুমেন্ট *event prefix* ব্যবহার করা যাবে না


# ইনস্টল করুন


*wes* প্রয়োজন *wes.js* শুধুমাত্র ফাইল। ডাউনলোড করতে, একটি কমান্ড প্রম্পট শুরু করুন এবং নিম্নলিখিত কমান্ডটি লিখুন।


```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```


*wes* বাস্তবায়নের সময় *WScript.Shell* এর `SendKeys` ব্যবহার করে। *wes.js* ডিরেক্টরির পাথ যেখানে *wes.js* সংরক্ষিত হয় সেখানে *ascii* ছাড়া অন্য অক্ষর থাকে, তাহলে `SendKeys` সঠিকভাবে কী পাঠাতে পারবে না এবং স্ক্রিপ্টটি কার্যকর করা যাবে না।  
গন্তব্য পথ সংরক্ষণ দয়া করে কনফিগার করুন *wes.js* শুধুমাত্র *ascii* ।


## ব্যবহার


কমান্ড লাইনে, `wes` পরে যে ফাইলটি প্রোগ্রামের সূচনা বিন্দু হবে সেটি নির্দিষ্ট করুন। স্ক্রিপ্ট এক্সটেনশন *.js* বাদ দেওয়া যেতে পারে.


```shell
wes index
```


এছাড়াও, *wes* এর একটি *REPL* তাই আপনি যদি এটি শুধুমাত্র `wes` দিয়ে শুরু করেন, আপনি সরাসরি স্ক্রিপ্টে প্রবেশ করতে পারেন।


```shell
wes
```


আপনি দুটি ফাঁকা লাইন প্রবেশ না করা পর্যন্ত স্ক্রিপ্ট গ্রহণ করা হবে। *README.md* এছাড়াও নমুনা স্ক্রিপ্টটি চালানোর পরীক্ষা করতে পারবেন *README.md* সঙ্গে *REPL* ।


## কমান্ড লাইন নামযুক্ত আর্গুমেন্ট


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


বাস্তবায়ন `--safe` `--usual` `--unsafe` `--dangerous` `--debug` অসম্পূর্ণ, কিন্তু নামে আর্গুমেন্ট সংরক্ষিত।


# মডিউল সিস্টেম


*wes* সাধারণ `require()` এবং *es module* সিস্টেম ব্যবহার করে এমন *commonjs module* সিস্টেম সমর্থন করে যা `import` ব্যবহার করে। ( *dynamic import* সমর্থিত নয় কারণ এটি অ্যাসিঙ্ক্রোনাস প্রক্রিয়াকরণ)


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


আপনি প্রয়োজনের সাথে *require* মতো `require('WScript.Shell')` *OLE* করতে পারেন।


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


## *es module*


*Chakra* যা স্ক্রিপ্টের এক্সিকিউশন ইঞ্জিন, সিনট্যাক্সকে ব্যাখ্যা করে যেমন `imoprt` , কিন্তু এটি কার্যকর করা যায় না কারণ এটি `cscript` হিসাবে প্রক্রিয়াকরণ পদ্ধতি সংজ্ঞায়িত করা হয়নি। *wes* সালে *babel* পরিক্ষেপ। *es module* ক্রমানুসারে *es module* করার সময় এটি কার্যকর করা হয়। ফলস্বরূপ, প্রক্রিয়াকরণের ওভারহেড এবং ফাইল ব্লোট ব্যয় হিসাবে বাড়ছে।


*es module* দ্বারা বর্ণিত মডিউলগুলিকে `require()` তে রূপান্তরিত করা হয়, তাই *OLE* বলা যেতে পারে। যাইহোক, এটি মডিউল ফাইল এনকোডিং স্পেসিফিকেশন সমর্থন করে না। সব স্বয়ংক্রিয় অনুমান দ্বারা পড়া হয়.


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


*wes* এর *built-in objects* যা *WSH (JScript)* নেই।


## *console*


*wes* `WScript.Echo` বা `WScript.StdErr.WriteLine` এর পরিবর্তে *console* ব্যবহার করে।


`console.log` এ কমান্ড লাইনে অক্ষর মুদ্রণ করুন। এটি ফরম্যাট করা স্ট্রিংগুলিকেও সমর্থন করে। ফরম্যাটিং অপারেটর `%` ব্যবহার করে একটি ফরম্যাট করা স্ট্রিং প্রিন্ট করে।


```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```


*wes* এর পরিবর্তে `WScript.StdOut.WriteLine` রঙিন একটি স্ট্রিং আউটপুট করার জন্য, `WScript.StdErr.WriteLine` ব্যবহার করুন। `WScript.Echo` এবং `WScript.StdOut.WriteLine` আউটপুট থেকে ব্লক করা হয়েছে, তাই `WScript.StdErr.WriteLine` বা `console.log` ব্যবহার করুন।


## *Buffer*


বাফারগুলি পরিচালনা করতে পারে।


```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```


## `__dirname` এবং `__filename`


`__filename` বর্তমানে চলমান মডিউল ফাইলের পথ ধারণ করে। `__dirname` এর ডিরেক্টরি `__filename` ।


```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```


# অন্তর্নির্মিত মডিউল


বেসিক প্রসেসিংকে সরল ও প্রমিত করার জন্য *wes* এর *built-in modules* ।


## *ansi*


`ansi` এর একটি *ANSI escape code* যা আপনাকে স্ট্যান্ডার্ড আউটপুটের রঙ এবং প্রভাব পরিবর্তন করতে দেয়। ব্যবহৃত কনসোল অ্যাপ্লিকেশনের ধরন এবং সেটিংসের উপর নির্ভর করে রঙ এবং প্রভাব পরিবর্তিত হতে পারে।


```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```


এছাড়াও আপনি `ansi.color()` এবং `ansi.bgColor()` দিয়ে আপনার নিজস্ব রং তৈরি করতে পারেন। আর্গুমেন্ট *RGB* ব্যবহার করে যেমন `255, 165, 0` বা *color code* যেমন `'#FFA500'` । এটি `orange` মতো *color name* সমর্থন করে না।


```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```


## *argv*


কমান্ড লাইন আর্গুমেন্ট পায়। `cscript.exe` এর কমান্ড লাইন আর্গুমেন্ট `/` নাম আর্গুমেন্ট ঘোষণা কিন্তু *wes* মধ্যে `-` এবং `--` নাম আর্গুমেন্ট ঘোষণা।


*argv.unnamed* এবং *argv.named* কমান্ড লাইন আর্গুমেন্টের মান টাইপ *String* *Number* *Boolean* *argv.named* কাস্ট করে।


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


সাধারণত, `/` এবং `\` দিয়ে শুরু হওয়া পাথগুলি ড্রাইভ রুট থেকে আপেক্ষিক পাথগুলিকে নির্দেশ করে (উদাহরণস্বরূপ, `/filename` `C:/filename` হিসাবে একই পাথ হতে পারে), তবে নিরাপত্তার জন্য `wes` `/` এবং `\` দিয়ে শুরু হওয়া `wes` আপেক্ষিক হিসাবে ব্যাখ্যা করা হয় কাজের ডিরেক্টরি।


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


আপনি যদি স্ক্রিপ্ট ইঞ্জিনকে *JScript* পরিবর্তন করেন, আপনি *Chakra* নির্দিষ্ট *Enumerator* ইত্যাদি ব্যবহার করতে পারবেন না। অন্তর্নির্মিত মডিউল *JScript* তাদের উপলব্ধ করে তোলে। যাইহোক, *Enumerator* একটি গণনাকারী বস্তুর পরিবর্তে একটি *Array* প্রদান করে।


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


## *VBScript*


*VBScript* কিছু বৈশিষ্ট্য প্রদান করে যা *JScript* এর নেই।


```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```


## *httprequest*


*httprequest* এর নাম হিসাবে *http request* একটি ইস্যু করবে।


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


*pipe* পাইপ প্রক্রিয়াকরণকে সহজ করে


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


# মডিউল বান্ডিল এবং ইনস্টল করুন


*install* , আপনার জন্য মডিউল ইনস্টল করতে পারেন *wes* প্রকাশিত *github* । মডিউলটি প্রকাশ করার জন্য আপনার একটি *github repository* প্রয়োজন হবে। এছাড়াও, সংগ্রহস্থলের নাম এবং স্থানীয় ডিরেক্টরির নাম অবশ্যই একই হতে হবে।


## *bundle*


*github* একটি মডিউল প্রকাশ *github* , *bundle* প্রয়োজনীয় মডিউল থোকায় এমন একটি বিন্যাসে দ্বারা আমদানি করা যায় তা পরিবর্তন করে *install* মডিউল।


নিরাপত্তার কারণে, *wes* এমন একটি বিন্যাসে মডিউল আমদানি করে না যা সরাসরি চালানো যায়, তাই *bundle* মডিউল দিয়ে একটি *.json* ফাইল তৈরি করুন।


মডিউল bundling জন্য কিছু শর্ত আছে.


1.  একটি *repository* এক ধরনের মডিউল প্রকাশ করা যেতে পারে।
2.  *github* সংগ্রহস্থলের নাম এবং স্থানীয় কাজের ডিরেক্টরির নাম অবশ্যই একই হতে হবে।
3.  আপনি যদি তৃতীয় পক্ষের কাছে মডিউলটি প্রকাশ করতে চান তবে সংগ্রহস্থলটি অবশ্যই সর্বজনীন হতে হবে।
4.  *wes* গতিশীলভাবে মডিউল পাথ ব্যাখ্যা করে। দ্বারা অর্জিত মডিউল `require` যেমন নির্দিষ্ট অবস্থার অধীনে `if` বিবৃতি বান্ডেল করা যাবে না।
5.  *.json* ফাইল নামের মধ্যে আপনার কাজের ডিরেক্টরির মধ্যে তৈরি করা হবে *directory_name.json* । ফাইলটির নাম পরিবর্তন করা হলে বা ফাইলটি সরানো হলে এটি ইনস্টল করা যাবে না।
6.  `node_modules/directory_name` , বান্ডিল ব্যর্থ হয়েছে কারণ এটি বোঝায় `directory_name.json` ।


## *install*


*github* প্রকাশিত *wes* জন্য মডিউল ফাইলটি ইনস্টল করতে ব্যবহৃত হয়।


### ব্যবহার


`@author/repository` বিন্যাসে *install* করতে আর্গুমেন্ট পাস করুন


```shell
wes install @wachaon/fmt
```


*install* করার বিকল্প আছে


| নাম        | সংক্ষিপ্ত নাম | বর্ণনা                                              |
| ---------- | ------------- | --------------------------------------------------- |
| `--bare`   | `-b`          | *@author* ফোল্ডার তৈরি করবেন না                     |
| `--global` | `-g`          | যে ফোল্ডারে *wes.js* আছে সেখানে মডিউলটি ইনস্টল করুন |


`--bare` বিকল্পটি `author@repository` থেকে `repository` তে `require` আর্গুমেন্ট বাদ দিতে `require` । `--global` বিকল্পটি সমস্ত স্ক্রিপ্টে ইনস্টল করা মডিউলগুলি উপলব্ধ করে। উপরের বিকল্পগুলি অবশ্যই *wes* সুরক্ষা বিকল্পের সাথে একই সময়ে নির্দিষ্ট করা উচিত `--unsafe` বা `--dangerous` ।


```shell
wes install @wachaon/fmt --bare --unsafe
```


# ব্যক্তিগত সংগ্রহস্থলের মডিউল ইনস্টল করুন


*install* শুধুমাত্র *github* এ পাবলিক রিপোজিটরির মডিউলেই নয়, ব্যক্তিগত রিপোজিটরিতেও *install* যেতে পারে।


*install* , `author@repository` সহ মডিউলটি উল্লেখ করুন। বাস্তবায়ন নিম্নলিখিত ডাউনলোড করে.


```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```


আপনি যখন ব্রাউজার দিয়ে ব্যক্তিগত সংগ্রহস্থলের *raw* অ্যাক্সেস করেন, *token* প্রদর্শিত হবে, তাই *token* অনুলিপি করুন এবং এটি ব্যবহার করুন।


আপনি *token* কমান্ড লাইনে চালানোর মাধ্যমে একটি ব্যক্তিগত সংগ্রহস্থলে একটি মডিউল ইনস্টল করতে পারেন।


```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```


# বাহ্যিক মডিউল


এখানে কিছু বাহ্যিক মডিউল আছে।


## *@wachaon/fmt*


*@wachaon/fmt* থোকায় থোকায় *prettier* এবং বিন্যাস স্ক্রিপ্ট। এছাড়াও, *@wachaon/fmt* ইন্সটল করার সাথে যদি একটি `SyntaxError` ত্রুটি ঘটে, আপনি ত্রুটির অবস্থান নির্দেশ করতে পারেন।


### ইনস্টল


```shell
wes install @wachaon/fmt
```


### ব্যবহার


যদি ওয়ার্কিং ডিরেক্টরিতে *.prettierrc* (JSON ফরম্যাট) থাকে তবে সেটি সেটিংসে প্রতিফলিত হবে। *fmt* *CLI* (কমান্ড লাইন ইন্টারফেস) এবং *fmt* *module* উভয়ের সাথে ব্যবহার করা যেতে পারে।


*CLI* হিসাবে ব্যবহার করুন


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


আপনি `--write` বা `-w` এর একটি নামযুক্ত আর্গুমেন্ট উল্লেখ করলে ফর্ম্যাট করা স্ক্রিপ্ট দিয়ে ফাইলটি ওভাররাইট করুন।


### যখন *module* হিসাবে ব্যবহার করা হয়


### `option`


```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')

const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```


## `@wachaon/edge`


*Internet Explorer* 15 জুন, 2022 থেকে সমর্থনের জন্য উপলব্ধ হবে। ফলস্বরূপ, `require('InternetExplorer.Application')` সহ অ্যাপ্লিকেশনটি পরিচালনা করা অসম্ভব হয়ে পড়ে।


একটি বিকল্প হল একটি *web driver* মাধ্যমে *Microsoft Edge based on Chromium* পরিচালনা করা, কিন্তু `@wachaon/edge` *Edge* -এর অটোপাইলটকে সরল করে।


### ইনস্টল


প্রথমে মডিউলটি ইনস্টল করুন।


```shell
wes install @wachaon/edge --unsafe --bare
```


তারপর *web driver* ডাউনলোড করুন।


```shell
wes edge
```


ডাউনলোড করা আনজিপ *zip* এবং পদক্ষেপ *msedgedriver.exe* বর্তমান ডিরেক্টরির।


### ব্যবহার


এটি ব্যবহার করা সহজ হবে।


```javascript
const edge = require('./index')

edge((window, navi, res) => {
    window.rect({x: 1 ,y: 1, width: 1200, height: 500})
    window.navigate('http://www.google.com')
    res.exports = []

    navi.on(/./, (url) => {
        console.log('URL: %O', url)
        res.exports.push(url)
    })
})
```


এই স্ক্রিপ্টটি পরিদর্শন করা *URL* ক্রমানুসারে কমান্ড প্রম্পটে আউটপুট করে।


`@wachaon/edge` *URL* জন্য একটি ইভেন্ট নিবন্ধন করে এবং `res.exports` ডেটা যোগ করে। যে *URL* নিবন্ধিত হবে তা হয় `String` `RegExp` হতে পারে এবং নমনীয় সেটিংস তৈরি করা যেতে পারে।


এটিকে ইভেন্ট-চালিত করে, অটোপাইলট দিয়ে পরিচালনা করা কঠিন প্রক্রিয়াগুলির জন্য *URL* সেট না করে সহজেই ম্যানুয়াল অপারেশনে স্যুইচ করা সম্ভব।


আপনি যদি স্ক্রিপ্ট বন্ধ করতে চান, তাহলে `navi.emit('terminate', res)` অথবা ম্যানুয়ালি *Edge* টার্মিনেট করুন।


অবসান প্রক্রিয়া ডিফল্ট মান হিসাবে *.json* ফাইল হিসাবে `res.exports` কে আউটপুট করে। আপনি শেষ প্রক্রিয়াকরণ সেট করতে চান, `edge(callback, terminate)` এর `terminate` সেট.
