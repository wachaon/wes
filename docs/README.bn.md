# _WES_

_wes_ _Windows Script Host_ _wes_ _ECMAScript_ চালানোর জন্য একটি কাঠামো

_README_ এর মূল পাঠ্যটি [_japanese_](README.ja.md) । জাপানি ব্যতীত, এটি একটি মেশিন-অনুবাদিত বাক্য।  
অনুগ্রহ করে নিচের থেকে অন্য ভাষায় বাক্য নির্বাচন করুন।

## বৈশিষ্ট্য

-   স্ক্রিপ্ট ইঞ্জিনকে _Chakra_ পরিবর্তন করুন এবং _ECMAScript2015_ _Chakra_ চালান
-   32 বিট _cscript.exe_ করে এবং 64 বিট পরিবেশের জন্য নির্দিষ্ট কোন বাগ নেই
-   `require` সাথে মডিউল আমদানি করুন
-   আউটপুট রঙিন অক্ষর মান আউটপুট
-   স্বয়ংক্রিয়ভাবে ফাইল এনকোডিং অনুমান করুন

## বৈশিষ্ট্যগুলি সমাধান করা হয়নি

-   `WScript.Quit` প্রোগ্রামকে ব্যাহত করতে পারে না এবং একটি ত্রুটি কোড ফেরত দেয় না
-   অ্যাসিঙ্ক্রোনাস প্রক্রিয়াকরণ
-   `WScript.CreateObject` দ্বিতীয় যুক্তির _event prefix_ ব্যবহার

## ইনস্টল করুন

_wes_ প্রয়োজন শুধু _wes.js_ ফাইল। ডাউনলোড করতে, একটি কমান্ড প্রম্পট শুরু করুন এবং নিম্নলিখিত কমান্ডটি প্রবেশ করুন।

```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

_wes_ বাস্তবায়ন যেমন সঞ্চালনের সময় _WScript.Shell_ এর `SendKeys` ব্যবহার করুন। _wes.js_ সংরক্ষিত ডিরেক্টরিটির _wes.js_ _ascii_ ছাড়া অন্য অক্ষর থাকে, `SendKeys` সঠিকভাবে কী পাঠাতে সক্ষম হবে না এবং স্ক্রিপ্টটি কার্যকর করা যাবে না।  
দয়া করে _wes.js_ এর সেভ ডেস্টিনেশন পাথ কনফিগার করুন শুধুমাত্র _ascii_ ।

## ব্যবহার

কমান্ড লাইনে, ফাইলটি নির্দিষ্ট করুন যা `wes` পরে প্রোগ্রামের প্রারম্ভিক বিন্দু হবে। স্ক্রিপ্ট এক্সটেনশন _.js_ বাদ দেওয়া যেতে পারে।

```shell
wes index
```

এছাড়াও, _wes_ একটি _REPL_ তাই যদি আপনি এটি শুধুমাত্র `wes` দিয়ে শুরু করেন, আপনি সরাসরি স্ক্রিপ্টটি প্রবেশ করতে পারেন।

```shell
wes
```

আপনি দুটি ফাঁকা লাইন প্রবেশ না করা পর্যন্ত স্ক্রিপ্ট গ্রহণ করা হবে। _README.md_ _REPL_ সাথে _README.md_ এ নমুনা স্ক্রিপ্টের বাস্তবায়নও পরীক্ষা করতে পারেন।

## কমান্ড লাইন নাম যুক্তি

_wes_ জন্য স্টার্টআপ বিকল্পগুলি নিম্নরূপ।

| নামযুক্ত           | বর্ণনা                                                  |
| ------------------ | ------------------------------------------------------- |
| `--monotone`       | _ANSI escape code_ বাদ দিন                              |
| `--safe`           | নিরাপদ মোডে স্ক্রিপ্ট চালান                             |
| `--usual`          | স্ক্রিপ্টটি স্বাভাবিক মোডে চালান (ডিফল্ট)               |
| `--unsafe`         | অনিরাপদ মোডে স্ক্রিপ্ট চালান                            |
| `--dangerous`      | স্ক্রিপ্টটি বিপজ্জনক মোডে চালান                         |
| `--debug`          | স্ক্রিপ্টটি ডিবাগ মোডে চালান                            |
| `--encoding=UTF-8` | পড়ার জন্য প্রথম ফাইলের এনকোডিং নির্দিষ্ট করে           |
| `--engine=Chakra`  | এই বিকল্পটি স্বয়ংক্রিয়ভাবে _wes_ দ্বারা যুক্ত করা হয় |

`--safe` `--usual` `--unsafe` `--dangerous` এর বাস্তবায়ন অসম্পূর্ণ, কিন্তু নামযুক্ত আর্গুমেন্ট সংরক্ষিত আছে।

## অন্তর্নির্মিত বস্তু

_wes_ এর _built-in objects_ যা _WSH (JScript)_ নেই।

### _require_

_require_ সাথে মডিউল আমদানি করুন। _wes_ স্বয়ংক্রিয়ভাবে মডিউল ফাইলের এনকোডিং অনুমান করে, কিন্তু যদি আপনি সঠিকভাবে অনুমান না করেন তবে আপনি দ্বিতীয় যুক্তি দিয়ে এনকোডিং নির্দিষ্ট করতে পারেন।

উপরন্তু, `require('WScript.Shell')` _OLE_ হিসাবে `require('WScript.Shell')` _require_ এমনকি আমদানি করা সম্ভব।

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

### মডিউল এবং module.exports

আপনি যদি এটি একটি মডিউল হিসাবে সংজ্ঞায়িত করতে চান, তাহলে এটি `module.exports` বরাদ্দ করুন।

```javascript
function add (a, b) {
    return a + b
}

module.exports = add
```

### _console_

_wes_ `WScript.Echo` এবং `WScript.StdErr.WriteLine` পরিবর্তে _console_ ব্যবহার করে।

`console.log` এ কমান্ড লাইনে অক্ষর মুদ্রণ করুন। এটি ফরম্যাট করা স্ট্রিংগুলিকেও সমর্থন করে। ফরম্যাটিং অপারেটর `%` ব্যবহার করে একটি ফরম্যাট করা স্ট্রিং প্রিন্ট করে।

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

_wes_ অনুক্রমে আউটপুট একটি স্ট্রিং রঙ্গিন `WScript.StdOut.WriteLine` পরিবর্তে, `WScript.StdErr.WriteLine` ব্যবহার। `WScript.Echo` এবং `WScript.StdOut.WriteLine` আউটপুট থেকে ব্লক করা আছে, তাই `WScript.StdOut.WriteLine` বা `console.log` ব্যবহার করুন।

### _Buffer_

বাফারগুলি পরিচালনা করতে পারে।

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```

### `__dirname` এবং `__filename`

`__filename` বর্তমানে চলমান মডিউল ফাইলের পথ রয়েছে। `__dirname` এর ডিরেক্টরি `__filename` ।

```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```

## অন্তর্নির্মিত মডিউল

মৌলিক প্রক্রিয়াকরণকে সহজ এবং মানসম্মত করার জন্য _wes_ _built-in modules_ ।

### _ansi_

`ansi` একটি _ANSI escape code_ যা আপনাকে স্ট্যান্ডার্ড আউটপুটের রঙ এবং প্রভাব পরিবর্তন করতে দেয়। ব্যবহৃত কনসোল অ্যাপ্লিকেশনের ধরন এবং সেটিংসের উপর নির্ভর করে রঙ এবং প্রভাবগুলি পরিবর্তিত হতে পারে।

```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```

আপনি `ansi.color()` এবং `ansi.bgColor()` দিয়ে আপনার নিজের রং তৈরি করতে পারেন। যুক্তি ব্যবহার _RGB_ যেমন `255, 165, 0` বা _color code_ যেমন `'#FFA500'` । আপনি `orange` মতো _color name_ ব্যবহার করতে পারবেন না।

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

### _argv_

কমান্ড লাইন যুক্তি পায়। `cscript.exe` এর কমান্ড লাইন আর্গুমেন্ট `/` নাম আর্গুমেন্ট ঘোষণা কিন্তু _wes_ মধ্যে `-` এবং `--` নাম আর্গুমেন্ট ঘোষণা।

_argv.unnamed_ এবং _argv.named_ একটি _String_ _Number_ _Boolean_ কমান্ড লাইন আর্গুমেন্টের ভ্যালু টাইপ নিক্ষেপ করে।

_REPL_ সহ কমান্ড লাইন আর্গুমেন্ট লিখুন।

```shell
wes REPL aaa -bcd eee --fgh=iii jjj --kln mmm
```

_REPL_ এ নিম্নলিখিত স্ক্রিপ্টটি চালান।

```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```

### _pathname_

পথ পরিচালনা করুন।

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

### _filesystem_

ফাইল এবং ডিরেক্টরি হেরফের। `readTextFileSync` স্বয়ংক্রিয়ভাবে অনুমান করে এবং ফাইলের এনকোডিং পড়ে।

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```

### _JScript_

আপনাকে স্ক্রিপ্ট ইঞ্জিন পরিবর্তন করেন তাহলে _Chakra_ , আপনি ব্যবহার করতে সক্ষম হবেন না _JScript_ নির্দিষ্ট _Enumerator_ ইত্যাদি অন্তর্নির্মিত মডিউল _JScript_ তাদের উপলব্ধ করে। যাইহোক, _Enumerator_ একটি Enumerator বস্তুর পরিবর্তে একটি _Array_ প্রদান করে।

```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```

_GetObject_ `WScript.GetObject` বিকল্প হিসেবে `WScript.GetObject` ।

```javascript
const { GetObject, Enumerator } = require('JScript')

const ServiceSet = GetObject("winmgmts:{impersonationLevel=impersonate}").InstancesOf("Win32_Service")
new Enumerator(ServiceSet).forEach(service => console.log(
    'Name: %O\nDescription: %O\n',
    service.Name,
    service.Description
))
```

### _VBScript_

_VBScript_ কিছু বৈশিষ্ট্য প্রদান করে যা _JScript_ নেই।

```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```

### _httprequest_

_httprequest_ ইস্যু _http request_ হিসাবে তার নাম প্রস্তাবিত।

```javascript
const request = require('httprequest')
const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log('%O', JSON.parse(content))
```

### _minitest_

_minitest_ সহজ পরীক্ষা লিখতে পারে।

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

### _pipe_

_pipe_ পাইপ প্রক্রিয়াকরণ সহজ করে

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

### _typecheck_

স্ক্রিপ্টের ধরন নির্ধারণ করুন।

```javascript
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```

## মডিউল বান্ডেল এবং ইনস্টল করুন

_install_ , আপনার জন্য মডিউল ইনস্টল করতে পারেন _wes_ প্রকাশিত _github_ । মডিউলটি প্রকাশ করতে আপনার _github repository_ প্রয়োজন হবে। এছাড়াও, সংগ্রহস্থলের নাম এবং স্থানীয় ডিরেক্টরি নাম একই হতে হবে।

### _bundle_

_github_ একটি মডিউল প্রকাশ করার সময়, _bundle_ প্রয়োজনীয় মডিউল বান্ডিল করে এবং এটি একটি বিন্যাসে পরিবর্তন করে যা _install_ মডিউল দ্বারা আমদানি করা যায়।

নিরাপত্তার কারণে, _wes_ এমন একটি ফরম্যাটে মডিউল আমদানি করে না যা সরাসরি কার্যকর করা যায়, তাই _bundle_ মডিউল দিয়ে একটি _.json_ ফাইল তৈরি করুন।

মডিউল বান্ডিল করার জন্য কিছু শর্ত আছে।

1.  একটি _repository_ এক ধরনের মডিউল প্রকাশিত হতে পারে।
2.  _github_ রিপোজিটরির নাম এবং স্থানীয় ওয়ার্কিং ডিরেক্টরির নাম একই হতে হবে।
3.  আপনি যদি তৃতীয় পক্ষের কাছে মডিউলটি প্রকাশ করতে চান তবে সংগ্রহস্থলটি সর্বজনীন হতে হবে।
4.  _wes_ স্থিরভাবে স্ক্রিপ্ট ব্যাখ্যা করে না। মডিউল যা নির্দিষ্ট অবস্থার অধীনে `require` , যেমন `if` বিবৃতি, একত্রিত নাও হতে পারে।
5.  _.json_ ফাইল নামের মধ্যে আপনার কাজের ডিরেক্টরির মধ্যে তৈরি করা হবে _directory_name.json_ । আপনি যদি ফাইলটির নাম পরিবর্তন করেন বা ফাইলটি সরান, আপনি এটি ইনস্টল করতে পারবেন না।
6.  `node_modules/directory_name` ব্যর্থ হয় কারণ এটি `directory_name.json` । `node_modules/directory_name` উল্লেখ করে।

### _install_

এটা তোলে জন্য মডিউল ফাইল ইনস্টল করার জন্য ব্যবহৃত হয় _wes_ প্রকাশিত _github_ ।

## ব্যবহার

`@author/repository` বিন্যাসে _install_ করার _install_ আর্গুমেন্ট পাস করুন

```shell
wes install @wachaon/fmt
```

_install_ বিকল্প আছে

| নামযুক্ত   | সংক্ষিপ্ত নাম | বর্ণনা                                     |
| ---------- | ------------- | ------------------------------------------ |
| `--bare`   | `-b`          | _@author_ ফোল্ডার তৈরি করবেন না            |
| `--global` | `-g`          | _wes.js_ যেখানে ফোল্ডারে মডিউল ইনস্টল করুন |

`--bare` বিকল্পটি `author@repository` থেকে `repository` `require` যুক্তি বাদ দিতে `require` । `--global` বিকল্পটি ইনস্টল করা মডিউলগুলিকে সমস্ত স্ক্রিপ্টে উপলব্ধ করে। উপরোক্ত বিকল্পগুলি অবশ্যই একই সময়ে নির্দিষ্ট করা উচিত _wes_ সিকিউরিটি অপশন `--unsafe` বা `--dangerous` ।

```shell
wes install @wachaon/fmt --bare --unsafe
```

# ব্যক্তিগত সংগ্রহস্থলের মডিউল ইনস্টল করুন

_github_ কেবল _github_ পাবলিক রিপোজিটরি মডিউলগুলিতেই নয়, ব্যক্তিগত সংগ্রহস্থলেও _install_ যেতে পারে।

_install_ , `author@repository` সাথে মডিউলটি নির্দিষ্ট করুন। বাস্তবায়ন নিম্নলিখিত ডাউনলোড করে।

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```

যখন আপনি একটি ব্রাউজার দিয়ে ব্যক্তিগত সংগ্রহস্থলের _raw_ অ্যাক্সেস করেন, _token_ প্রদর্শিত হবে, তাই _token_ অনুলিপি করুন এবং এটি ব্যবহার করুন।

আপনি _token_ কমান্ড লাইনে এটি চালানোর মাধ্যমে ব্যক্তিগত সংগ্রহস্থলে মডিউলটি ইনস্টল করতে পারেন।

```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

## বাহ্যিক মডিউল

এখানে কিছু বাহ্যিক মডিউল রয়েছে।

### _@wachaon/fmt_

_@wachaon/fmt_ এর একটি বান্ডিল _prettier_ স্ক্রিপ্ট বিন্যাস করা হয়। এছাড়াও, যদি `SyntaxError` ক্ষেত্রেও একই ঘটনা ঘটে _@wachaon/fmt_ ইনস্টল, আপনার ত্রুটিটি অবস্থান নির্দেশ করতে পারেন।

#### ইনস্টল

```shell
wes install @wachaon/fmt
```

#### ব্যবহার

যদি ওয়ার্কিং ডিরেক্টরিতে _.prettierrc_ (JSON ফরম্যাট) থাকে, সেটি সেটিংসে প্রতিফলিত হবে। _fmt_ _CLI_ (কমান্ড লাইন ইন্টারফেস) এবং _fmt_ _module_ উভয়ের সাথে ব্যবহার করা যেতে পারে।

_CLI_ হিসাবে ব্যবহার করুন

```shell
wes @wachaon/fmt src/sample --write
```

| নামহীন নাম্বার | বর্ণনা                                         |
| -------------- | ---------------------------------------------- |
| 0              | ---                                            |
| ঘ              | আবশ্যক। আপনি যে ফাইলটি ফরম্যাট করতে চান তার পথ |

| নামযুক্ত  | সংক্ষিপ্ত নাম | বর্ণনা                   |
| --------- | ------------- | ------------------------ |
| `--write` | `-w`          | ওভাররাইট করার অনুমতি দিন |

যদি `--write` বা `-w` এর একটি নামযুক্ত যুক্তি নির্দিষ্ট করা হয় তবে একটি ফরম্যাট স্ক্রিপ্ট দিয়ে ফাইলটি ওভাররাইট করে।

#### _module_ হিসাবে ব্যবহার করার _module_

#### `option`

```javascript
{
    parser: 'babel',
    plugins: [babel]
}
```
