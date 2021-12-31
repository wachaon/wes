# *WES*


*wes* হল *Windows Script Host* *wes* *ECMAScript* কার্যকর করার জন্য একটি কাঠামো


*README* এর মূল পাঠ্য [*japanese*](/README.md) । জাপানি ব্যতীত, এটি একটি মেশিন-অনুবাদিত বাক্য।  
অনুগ্রহ করে নিম্নলিখিত থেকে অন্যান্য ভাষার বাক্য নির্বাচন করুন।


+  [*簡体字*](README.zh-CN.md) <!-- 中国語 (簡体字) -->
+  [*繁体字*](README.zh-TW.md) <!-- 中国語 (繁体字) -->
+  [*English*](README.en.md) <!-- 英語 -->
+  [*हिन्दी*](README.hi.md) <!-- ヒンディー語 -->
+  [*Español*](README.es.md) <!-- スペイン語 -->
+  [*عربى*](README.ar.md) <!-- アラビア語 -->
+  [*বাংলা*](README.bn.md) <!-- ベンガル語 -->
+  [*Português*](README.pt.md) <!-- ポルトガル語 -->
+  [*русский язык*](README.ru.md) <!-- ロシア語 -->
+  [*Deutsch*](README.de.md) <!-- ドイツ語 -->
+  [*français*](README.fr.md) <!-- フランス語 -->
+  [*italiano*](README.it.md) <!-- イタリア語 -->



# বৈশিষ্ট্য


-   *Windows Script Host* স্ক্রিপ্ট ইঞ্জিনকে চক্রে পরিবর্তন করুন এবং *ECMAScript2015* *Chakra* চালান
-   এটি সর্বদা 32bit *cscript.exe* চালায়, তাই 64bit পরিবেশে কোন অন্তর্নিহিত বাগ নেই।
-   `require` সাথে মডিউল আমদানি করুন
-   আদর্শ আউটপুটে রঙিন অক্ষর আউটপুট
-   স্বয়ংক্রিয়ভাবে অনুমান করুন এবং পাঠ্য ফাইলের এনকোডিং পড়ুন


# বৈশিষ্ট্য সমাধান করা হয়নি


-   `WScript.Quit` প্রোগ্রামটিকে বাধা দিতে পারে না এবং একটি ত্রুটি কোড ফেরত দেয় না
-   `setTimeout` এবং `Promise` মতো অ্যাসিঙ্ক্রোনাস প্রক্রিয়াকরণ সম্ভব নয়
-   `WScript.CreateObject` এর দ্বিতীয় আর্গুমেন্টের *event prefix* ব্যবহার করা যাবে না।


# ইনস্টল করুন


*wes* প্রয়োজন *wes.js* শুধুমাত্র ফাইল। ডাউনলোড করতে, একটি কমান্ড প্রম্পট শুরু করুন এবং নিম্নলিখিত কমান্ডটি লিখুন।


```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```


*wes* বাস্তবায়নের সময় *WScript.Shell* এর `SendKeys` ব্যবহার করে। *wes.js* ডিরেক্টরির পাথ যেখানে *wes.js* সংরক্ষিত হয় সেখানে *ascii* ছাড়া অন্য অক্ষর থাকে, তাহলে `SendKeys` সঠিকভাবে কী পাঠাতে পারবে না এবং স্ক্রিপ্টটি কার্যকর করা যাবে না।  
*wes.js* শুধুমাত্র *ascii* সংরক্ষণ করতে পাথ কনফিগার করুন।


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


# অন্তর্নির্মিত বস্তু


*wes* এর *built-in objects* যা *WSH (JScript)* নেই।


## *require*


*require* সহ মডিউল আমদানি করুন। *wes* স্বয়ংক্রিয়ভাবে মডিউল ফাইলের এনকোডিং অনুমান করে, কিন্তু আপনি যদি সঠিকভাবে অনুমান না করেন, তাহলে আপনি দ্বিতীয় আর্গুমেন্টের সাথে এনকোডিং নির্দিষ্ট করতে পারেন।


উপরন্তু, `require('WScript.Shell')` হিসাবে *OLE* এমনকি *require* আমদানি করা সম্ভব।


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


## `module` এবং `module.exports`


আপনি যদি এটিকে একটি মডিউল হিসাবে সংজ্ঞায়িত করতে চান তবে এটিকে `module.exports` বরাদ্দ করুন।


```javascript
function add (a, b) {
    return a + b
}

module.exports = add
```


## *console*


*wes* এ `WScript.Echo` এবং `WScript.StdErr.WriteLine` পরিবর্তে *console* ব্যবহার করুন।


`console.log` এ কমান্ড লাইনে অক্ষর মুদ্রণ করুন। এটি ফরম্যাট করা স্ট্রিংগুলিকেও সমর্থন করে। ফরম্যাটিং অপারেটর `%` ব্যবহার করে একটি ফরম্যাট করা স্ট্রিং প্রিন্ট করে।


```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```


*wes* এ রঙিন একটি স্ট্রিং আউটপুট করার জন্য `WScript.StdOut.WriteLine` পরিবর্তে, `WScript.StdErr.WriteLine` ব্যবহার করুন। `WScript.Echo` এবং `WScript.StdOut.WriteLine` আউটপুট থেকে ব্লক করা হয়েছে, তাই `WScript.StdErr.WriteLine` বা `console.log` ব্যবহার করুন।


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


মৌলিক প্রক্রিয়াকরণকে সরল ও মানসম্মত করার জন্য *wes* এর *built-in modules* ।


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


## *JScript*


আপনাকে স্ক্রিপ্ট ইঞ্জিন পরিবর্তন করেন তাহলে *Chakra* , আপনি ব্যবহার করতে সক্ষম হবেন না *JScript* নির্দিষ্ট *Enumerator* ইত্যাদি অন্তর্নির্মিত মডিউল *JScript* তাদের উপলব্ধ করে তোলে। যাইহোক, *Enumerator* একটি গণনাকারী বস্তুর পরিবর্তে একটি *Array* প্রদান করে।


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


*VBScript* কিছু বৈশিষ্ট্য প্রদান করে যা *JScript* নেই।


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
4.  *wes* স্ক্রিপ্টটি স্ট্যাটিকভাবে ব্যাখ্যা করে না। দ্বারা অর্জিত মডিউল `require` যেমন নির্দিষ্ট অবস্থার অধীনে `if` বিবৃতি বান্ডেল করা যাবে না।
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


| নাম        | সংক্ষিপ্ত নাম | বর্ণনা                                          |
| ---------- | ------------- | ----------------------------------------------- |
| `--bare`   | `-b`          | *@author* ফোল্ডার তৈরি করবেন না                 |
| `--global` | `-g`          | যে ফোল্ডারে *wes.js* সেখানে মডিউলটি ইনস্টল করুন |


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


*@wachaon/fmt* থোকায় থোকায় *prettier* এবং বিন্যাস স্ক্রিপ্ট। এছাড়াও, যদি *@wachaon/fmt* ইনস্টল করা থাকে এবং একটি `SyntaxError` ত্রুটি দেখা দেয়, ত্রুটির অবস্থান নির্দেশ করা যেতে পারে।


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


যদি আপনি একটি নামে যুক্তি উল্লেখ একটি ফরম্যাট স্ক্রিপ্ট ফাইলটি প্রতিস্থাপন `--write` বা `-w` ।


### একটি *module* হিসাবে ব্যবহার করার *module*


### `option`


```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')

const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```
