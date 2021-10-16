# _WES_

_wes_ هو إطار عمل لتنفيذ _ECMAScript_ على _Windows Script Host_

النص الأصلي _README_ هو [_japanese_](README.ja.md) . بخلاف اليابانية ، إنها جملة مترجمة آليًا.  
يرجى تحديد الجمل بلغات أخرى مما يلي.

## سمات

-   قم بتغيير محرك البرنامج النصي إلى _Chakra_ وقم بتشغيل _ECMAScript2015_ _Chakra_
-   _cscript.exe_ 32 بت _cscript.exe_ وليس لديه أي أخطاء خاصة ببيئة 64 بت
-   استيراد الوحدة مع `require`
-   لإخراج الأحرف الملونة إلى الإخراج القياسي
-   تخمين ترميز الملف تلقائيًا

## الميزات لم تحل

-   لا يمكن لـ `WScript.Quit` مقاطعة البرنامج ولا يُرجع رمز خطأ
-   المعالجة غير المتزامنة
-   استخدام _event prefix_ للوسيطة الثانية من `WScript.CreateObject`

## ثبت

_wes_ حاجة غير _wes.js_ ملف فقط. للتنزيل ، ابدأ موجه الأوامر وأدخل الأمر التالي.

```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

_wes_ في وقت التنفيذ كما تنفيذ _WScript.Shell_ من `SendKeys` استخدام. _wes.js_ مسار الدليل الذي تم حفظ _wes.js_ فيه يحتوي على أحرف غير _ascii_ ، فلن تتمكن `SendKeys` من إرسال المفتاح بشكل صحيح ولن يتم تنفيذ البرنامج النصي.  
يرجى تكوين مسار وجهة الحفظ لـ _wes.js_ فقط _ascii_ .

## إستعمال

في سطر الأوامر ، حدد الملف الذي سيكون نقطة انطلاق البرنامج بعد `wes` . يمكن حذف ملحق البرنامج النصي _.js_ .

```shell
wes index
```

أيضًا ، يحتوي _wes_ على _REPL_ لذلك إذا بدأت باستخدام `wes` فقط ، يمكنك إدخال البرنامج النصي مباشرة.

```shell
wes
```

سيتم قبول البرنامج النصي حتى تقوم بإدخال سطرين فارغين. _README.md_ أيضًا التحقق من تنفيذ نموذج البرنامج النصي في _README.md_ باستخدام _REPL_ .

## سطر الأوامر المسمى الوسيطات

خيارات بدء التشغيل الخاصة بـ _wes_ هي كما يلي.

| اسم الشيئ          | وصف                                                |
| ------------------ | -------------------------------------------------- |
| `--monotone`       | القضاء على _ANSI escape code_                      |
| `--safe`           | قم بتشغيل البرنامج النصي في الوضع الآمن            |
| `--usual`          | قم بتشغيل البرنامج النصي في الوضع العادي (افتراضي) |
| `--unsafe`         | قم بتشغيل البرنامج النصي في الوضع غير الآمن        |
| `--dangerous`      | قم بتشغيل البرنامج النصي في الوضع الخطير           |
| `--debug`          | قم بتشغيل البرنامج النصي في وضع التصحيح            |
| `--encoding=UTF-8` | يحدد ترميز الملف الأول المراد قراءته               |
| `--engine=Chakra`  | يتم إضافة هذا الخيار تلقائيًا بواسطة _wes_         |

تنفيذ - `--safe` `--usual` `--unsafe` `--dangerous` غير مكتمل ، لكن الحجج المسماة محفوظة.

## كائنات مدمجة

يحتوي _wes_ _built-in objects_ _WSH (JScript)_ لا _WSH (JScript)_ .

### _require_

استيراد الوحدة مع _require_ . يخمن _wes_ تلقائيًا ترميز ملف الوحدة النمطية ، ولكن إذا لم تخمن بشكل صحيح ، فيمكنك تحديد الترميز باستخدام الوسيطة الثانية.

بالإضافة إلى ذلك ، `require('WScript.Shell')` اعتبارًا من _OLE_ حتى يمكن _require_ الاستيراد باستخدام.

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

### وحدة و وحدة الصادرات

إذا كنت تريد تعريفها كوحدة نمطية ، `module.exports` بتعيينها إلى `module.exports` .

```javascript
function add (a, b) {
    return a + b
}

module.exports = add
```

### _console_

يستخدم _wes_ _console_ بدلاً من `WScript.Echo` و `WScript.StdErr.WriteLine` .

طباعة الأحرف إلى سطر الأوامر في `console.log` . كما يدعم السلاسل المنسقة. يطبع سلسلة منسقة باستخدام عامل التنسيق `%` .

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

_wes_ لإخراج سلسلة ملونة في `WScript.StdOut.WriteLine` بدلاً من ذلك ، استخدم `WScript.StdErr.WriteLine` . يتم حظر `WScript.Echo` و `WScript.StdOut.WriteLine` من الإخراج ، لذلك استخدم `WScript.StdOut.WriteLine` أو `console.log` .

### _Buffer_

يمكن التعامل مع المخازن المؤقتة.

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```

### `__dirname` و `__filename`

`__filename` يحتوي على مسار ملف الوحدة النمطية قيد التشغيل حاليًا. `__filename` `__dirname` `__filename` دليل `__filename` .

```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```

## وحدات مدمجة

يحتوي _wes_ _built-in modules_ لتبسيط وتوحيد المعالجة الأساسية.

### _ansi_

يحتوي `ansi` على _ANSI escape code_ يسمح لك بتغيير لون وتأثير الإخراج القياسي. قد تختلف الألوان والتأثيرات وفقًا لنوع وإعدادات تطبيق وحدة التحكم المستخدمة.

```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```

يمكنك أيضًا إنشاء الألوان الخاصة بك باستخدام `ansi.color()` و `ansi.bgColor()` . تستخدم الوسيطة _RGB_ مثل `255, 165, 0` أو `255, 165, 0` أو _color code_ مثل `'#FFA500'` . لا يمكنك استخدام _color name_ مثل `orange` .

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

### _argv_

يحصل على وسيطة سطر الأوامر. `cscript.exe` وسيطات سطر الأوامر الخاصة بـ `/` تعلن عن الوسائط المسماة في ولكن ، يعلن _wes_ in `-` and `--` عن الوسائط المسماة في.

_argv.unnamed_ و _argv.named_ يلقي نوع قيمة وسيطة سطر الأوامر إلى أحد _Boolean_ _String_ _Number_ _Boolean_ .

أدخل وسيطات سطر الأوامر مع _REPL_ .

```shell
wes REPL aaa -bcd eee --fgh=iii jjj --kln mmm
```

قم بتشغيل البرنامج النصي التالي في _REPL_ .

```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```

### _pathname_

تشغيل المسار.

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

### _filesystem_

معالجة الملفات والدلائل. `readTextFileSync` تلقائيًا بتخمين ترميز الملف `readTextFileSync` .

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```

### _JScript_

إذا قمت بتغيير محرك البرنامج النصي إلى _Chakra_ ، فلن تتمكن من استخدام _Enumerator_ الخاص بـ _JScript_ وما إلى ذلك. وحدة _JScript_ المدمجة تجعلها متاحة. ومع ذلك ، يقوم _Enumerator_ بإرجاع _Array_ بدلاً من كائن العداد.

```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```

`WScript.GetObject` _GetObject_ كبديل لـ `WScript.GetObject` .

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

يقدم _VBScript_ بعض الميزات التي لا تتوفر في _JScript_ .

```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```

### _httprequest_

_httprequest_ قضايا _http request_ كما يوحي اسمه.

```javascript
const request = require('httprequest')
const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log('%O', JSON.parse(content))
```

### _minitest_

_minitest_ يمكنه كتابة اختبارات بسيطة.

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

_pipe_ يبسط تجهيز الأنابيب

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

تحديد نوع البرنامج النصي.

```javascript
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```

## حزمة الوحدة النمطية والتثبيت

_install_ ، يمكنك تثبيت الوحدة النمطية لـ _wes_ المنشورة على _github_ . ستحتاج إلى _github repository_ لنشر الوحدة. أيضًا ، يجب أن يكون اسم المستودع واسم الدليل المحلي متماثلين.

### _bundle_

_github_ نشر وحدة ل _github_ ، _bundle_ حزم وحدة المطلوبة والتغييرات إلى تنسيق التي يمكن استيرادها من قبل _install_ وحدة.

لأسباب تتعلق بالسلامة، _wes_ لا تستورد الوحدات النمطية في الشكل الذي يمكن تنفيذه مباشرة، لذلك إنشاء _.json_ الملف مع _bundle_ حدة.

هناك بعض الشروط لتجميع الوحدات.

1.  يمكن نشر نوع واحد _repository_ من الوحدات في _repository_ واحد.
2.  يجب أن يكون اسم مستودع _github_ واسم دليل العمل المحلي _github_ .
3.  يجب أن يكون المستودع عامًا إذا كنت تريد نشر الوحدة إلى جهة خارجية.
4.  _wes_ لا يفسر بشكل ثابت النصي. الوحدات النمطية التي `require` ظل ظروف معينة ، مثل عبارات `if` ، قد لا يتم تجميعها.
5.  سيتم إنشاء ملف _.json_ في دليل العمل الخاص بك بالاسم _directory_name.json_ . إذا أعدت تسمية الملف أو نقلته ، فلا يمكنك تثبيته.
6.  `node_modules/directory_name` يفشل التجميع لأنه يشير إلى `directory_name.json` .

### _install_

يتم استخدامه لتثبيت ملف الوحدة النمطية لـ _wes_ المنشور على _github_ .

## الاستخدام

قم بتمرير الوسائط _install_ بالتنسيق `@author/repository`

```shell
wes install @wachaon/fmt
```

_install_ لديه خيارات

| اسم الشيئ  | اسم قصير | وصف                                                  |
| ---------- | -------- | ---------------------------------------------------- |
| `--bare`   | `-b`     | لا تقم بإنشاء مجلد _@author_                         |
| `--global` | `-g`     | قم بتثبيت الوحدة النمطية في المجلد حيث يوجد _wes.js_ |

يمكن أن يحذف الخيار `--bare` الوسيطة `require` من `author@repository` إلى `repository` . `--global` الخيار `--global` الوحدات النمطية المثبتة لجميع البرامج النصية. يجب تحديد الخيارات المذكورة أعلاه في نفس الوقت الذي _wes_ الخيار الأمني `--unsafe` أو `--dangerous` .

```shell
wes install @wachaon/fmt --bare --unsafe
```

# قم بتثبيت وحدة المستودع الخاص

_install_ يمكن تركيبها ليس فقط على _github_ وحدات مخزون العامة، ولكن أيضا على مستودعات خاصة.

_install_ ، حدد الوحدة مع `author@repository` . يقوم التطبيق بتنزيل ما يلي.

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```

عند الوصول إلى النسخة _raw_ من المستودع الخاص باستخدام متصفح ، سيتم عرض _token_ ، لذا انسخ _token_ .

يمكنك أيضًا تثبيت الوحدة النمطية في المستودع الخاص عن طريق تشغيلها على سطر الأوامر خلال _token_ .

```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

## الوحدة الخارجية

فيما يلي بعض الوحدات الخارجية.

### _@wachaon/fmt_

_@wachaon/fmt_ عبارة عن حزمة _prettier_ تقوم _@wachaon/fmt_ البرنامج النصي. أيضًا ، إذا حدث `SyntaxError` مع تثبيت _@wachaon/fmt_ ، يمكنك الإشارة إلى موقع الخطأ.

#### ثبيت

```shell
wes install @wachaon/fmt
```

#### الاستخدام

إذا كان هناك _.prettierrc_ (تنسيق JSON) في دليل العمل ، فسوف ينعكس في الإعدادات. _fmt_ يمكن استخدامها مع كل من _CLI_ (واجهة سطر الأوامر) و _module_ في _fmt_ .

استخدم _CLI_

```shell
wes @wachaon/fmt src/sample --write
```

| رقم غير مسمى | وصف                                |
| ------------ | ---------------------------------- |
| 0            | -                                  |
| 1            | مطلوب. مسار الملف الذي تريد تنسيقه |

| اسم الشيئ | اسم قصير | وصف             |
| --------- | -------- | --------------- |
| `--write` | `-w`     | السماح بالكتابة |

`--write` فوق الملف ببرنامج نصي منسق إذا تم تحديد وسيطة مسماة `--write` or `-w` .

#### _module_ استخدامها كوحدة _module_

#### `option`

```javascript
{
    parser: 'babel',
    plugins: [babel]
}
```
