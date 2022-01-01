# *WES*


*wes* هو إطار عمل لتنفيذ *ECMAScript* على *Windows Script Host*


النص الأصلي *README* هو [*japanese*](/README.md) . بخلاف اليابانية ، إنها جملة مترجمة آليًا.  
يرجى تحديد الجمل بلغات أخرى مما يلي.


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



# سمات


-   قم بتغيير محرك البرنامج النصي لـ *Windows Script Host* إلى *Chakra* وقم بتشغيل *ECMAScript2015* *Chakra*
-   يتم تشغيله دائمًا *cscript.exe* 32 بت ، لذلك لا توجد أخطاء متأصلة في بيئة 64 بت.
-   استيراد الوحدة مع `require` (المطابق *es module* من *ver 0.9.0* )
-   لإخراج الأحرف الملونة إلى الإخراج القياسي
-   قم بتخمين وقراءة تشفير الملف النصي تلقائيًا


# المشكلات المعروفة لا يمكن حلها


-   لا يمكن لـ `WScript.Quit` مقاطعة البرنامج ولا يُرجع رمز خطأ
-   المعالجة غير المتزامنة مثل `setTimeout` و `Promise` غير ممكنة
-   لا يمكن استخدام *event prefix* للوسيطة الثانية لـ `WScript.CreateObject` .


# تثبيت


*wes* حاجة غير *wes.js* الملف الوحيد. للتنزيل ، ابدأ موجه الأوامر وأدخل الأمر التالي.


```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```


*wes* في وقت التنفيذ كما تنفيذ *WScript.Shell* من `SendKeys` استخدام. *wes.js* مسار الدليل الذي تم حفظ *wes.js* فيه يحتوي على أحرف غير *ascii* ، فلن تتمكن `SendKeys` من إرسال المفتاح بشكل صحيح ولن يتم تنفيذ البرنامج النصي.  
يرجى تكوين مسار لتوفير *wes.js* الوحيد *ascii* .


## إستعمال


في سطر الأوامر ، حدد الملف الذي سيكون نقطة انطلاق البرنامج بعد `wes` . يمكن حذف ملحق البرنامج النصي *.js* .


```shell
wes index
```


أيضًا ، يحتوي *wes* على *REPL* لذلك إذا بدأت باستخدام `wes` فقط ، يمكنك إدخال البرنامج النصي مباشرة.


```shell
wes
```


سيتم قبول البرامج النصية حتى تقوم بإدخال سطرين فارغين. *README.md* أيضًا التحقق من تنفيذ نموذج البرنامج النصي في *README.md* باستخدام *REPL* .


## سطر الأوامر المسمى الحجج


خيارات بدء التشغيل الخاصة بـ *wes* هي كما يلي.


| اسم الشيئ          | وصف                                                |
| ------------------ | -------------------------------------------------- |
| `--monotone`       | القضاء على *ANSI escape code*                      |
| `--safe`           | قم بتشغيل البرنامج النصي في الوضع الآمن            |
| `--usual`          | قم بتشغيل البرنامج النصي في الوضع العادي (افتراضي) |
| `--unsafe`         | قم بتشغيل البرنامج النصي في الوضع غير الآمن        |
| `--dangerous`      | قم بتشغيل البرنامج النصي في الوضع الخطير           |
| `--debug`          | قم بتشغيل البرنامج النصي في وضع التصحيح            |
| `--encoding=UTF-8` | يحدد ترميز الملف الأول المراد قراءته               |
| `--engine=Chakra`  | يتم إضافة هذا الخيار تلقائيًا بواسطة *wes*         |


تنفيذ - `--safe` `--usual` `--unsafe` `--dangerous` `--debug` غير مكتمل ، لكن الحجج المسماة محفوظة.


# كائنات مدمجة


يحتوي *wes* *built-in objects* *WSH (JScript)* لا *WSH (JScript)* .


## *require*


استيراد وحدة مع *require* . يخمن *wes* تلقائيًا ترميز ملف الوحدة النمطية ، ولكن إذا لم تخمن بشكل صحيح ، فيمكنك تحديد الترميز باستخدام الوسيطة الثانية.


بالإضافة إلى ذلك ، `require('WScript.Shell')` اعتبارًا من *OLE* حتى يمكن *require* الاستيراد باستخدام.


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


## `module` و `module` `module.exports`


إذا كنت تريد تعريفها كوحدة نمطية ، `module.exports` بتعيينها إلى `module.exports` .


```javascript
function add (a, b) {
    return a + b
}

module.exports = add
```


## *console*


استخدم *wes* في `WScript.Echo` و `WScript.StdErr.WriteLine` بدلاً من *console* .


طباعة الأحرف إلى سطر الأوامر في `console.log` . كما يدعم السلاسل المنسقة. يطبع سلسلة منسقة باستخدام عامل التنسيق `%` .


```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```


*wes* لإخراج سلسلة ملونة في `WScript.StdOut.WriteLine` بدلاً من ذلك ، استخدم `WScript.StdErr.WriteLine` . يتم حظر `WScript.Echo` و `WScript.StdOut.WriteLine` من الإخراج ، لذلك استخدم `WScript.StdErr.WriteLine` أو `console.log` .


## *Buffer*


يمكن التعامل مع المخازن المؤقتة.


```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```


## `__dirname` و `__filename`


`__filename` يحتوي على مسار ملف الوحدة النمطية قيد التشغيل حاليًا. `__filename` `__dirname` `__filename` دليل `__filename` .


```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```


# وحدات مدمجة


يحتوي *wes* *built-in modules* لتبسيط وتوحيد المعالجة الأساسية.


## *ansi*


يحتوي `ansi` على *ANSI escape code* يسمح لك بتغيير لون وتأثير الإخراج القياسي. قد تختلف الألوان والتأثيرات وفقًا لنوع وإعدادات تطبيق وحدة التحكم المستخدمة.


```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```


يمكنك أيضًا إنشاء الألوان الخاصة بك باستخدام `ansi.color()` و `ansi.bgColor()` . تستخدم الوسيطة *RGB* مثل `255, 165, 0` أو `255, 165, 0` أو *color code* مثل `'#FFA500'` . لا يدعم *color name* مثل `orange` .


```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```


## *argv*


يحصل على وسيطة سطر الأوامر. `cscript.exe` وسيطات سطر الأوامر الخاصة بـ `/` تعلن عن الوسائط المسماة في ولكن ، يعلن *wes* in `-` and `--` عن الوسائط المسماة في.


*argv.unnamed* و *argv.named* يلقي نوع قيمة وسيطة سطر الأوامر إلى أحد *Boolean* *String* *Number* *Boolean* .


أدخل وسيطات سطر الأوامر مع *REPL* .


```shell
wes REPL aaa -bcd eee --fgh=iii jjj --kln mmm
```


قم بتشغيل البرنامج النصي التالي في *REPL* .


```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```


## *pathname*


تشغيل المسار.


بشكل عام ، المسارات التي تبدأ بـ `/` و `\` تشير إلى المسارات النسبية من جذر محرك الأقراص (على سبيل المثال ، يمكن أن يكون `/filename` هو نفس المسار مثل `C:/filename` ) ، ولكن للأمان في `wes` `/` والمسارات التي تبدأ بـ `\` يتم تفسيرها على أنها مرتبطة بـ دليل العمل.


```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```


## *filesystem*


تشغيل الملفات والدلائل. `readTextFileSync` تلقائيًا بتخمين ترميز الملف `readTextFileSync` .


```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```


## *chardet*


أنا أستخدم بعض ميزات <https://github.com/runk/node-chardet> .


يمكنك تحسين دقة التخمين التلقائي عن طريق زيادة الأحرف الخاصة بالتشفير.


## *JScript*


إذا قمت بتغيير محرك البرنامج النصي إلى *Chakra* ، فلن تتمكن من استخدام *Enumerator* الخاص بـ *JScript* وما إلى ذلك. وحدة *JScript* المدمجة تجعلها متاحة. ومع ذلك ، يقوم *Enumerator* بإرجاع *Array* بدلاً من كائن العداد.


```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```


`WScript.GetObject` *GetObject* كبديل لـ `WScript.GetObject` .


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


يوفر *VBScript* بعض الميزات التي لا تتوفر في *JScript* .


```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```


## *httprequest*


*httprequest* هو كما سيصدر *http request* اسمها ملف.


```javascript
const request = require('httprequest')
const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log('%O', JSON.parse(content))
```


## *minitest*


*minitest* يمكنه كتابة اختبارات بسيطة.


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


*pipe* يبسط تجهيز الأنابيب


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


تحديد نوع البرنامج النصي.


```javascript
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```


# حزمة الوحدة النمطية والتثبيت


*install* ، يمكنك تثبيت الوحدة النمطية لـ *wes* المنشورة على *github* . ستحتاج إلى *github repository* لنشر الوحدة. أيضًا ، يجب أن يكون اسم المستودع واسم الدليل المحلي متماثلين.


## *bundle*


*github* نشر وحدة ل *github* ، *bundle* حزم وحدة المطلوبة والتغييرات إلى تنسيق التي يمكن استيرادها من قبل *install* وحدة.


لأسباب تتعلق بالسلامة، *wes* لا تستورد الوحدات النمطية في الشكل الذي يمكن تنفيذه مباشرة، لذلك إنشاء *.json* الملف مع *bundle* حدة.


هناك بعض الشروط لتجميع الوحدات.


1.  يمكن نشر نوع واحد *repository* من الوحدات في *repository* واحد.
2.  يجب أن يكون اسم المستودع على *github* واسم دليل العمل المحلي *github* .
3.  يجب أن يكون المستودع عامًا إذا كنت تريد نشر الوحدة إلى جهة خارجية.
4.  يفسر *wes* مسار الوحدة بشكل ديناميكي. `require` الوحدات النمطية التي تم الحصول عليها بموجب شروط محددة مثل ما `if` العبارات لا يمكن تجميعها.
5.  سيتم إنشاء ملف *.json* في دليل العمل الخاص بك بالاسم *directory_name.json* . لا يمكن تثبيته في حالة إعادة تسمية الملف أو نقل الملف.
6.  `node_modules/directory_name` ، تفشل الحزمة لأنها تشير إلى `directory_name.json` .


## *install*


يُستخدم لتثبيت ملف الوحدة النمطية لـ *wes* المنشور على *github* .


### الاستخدام


قم بتمرير الوسائط *install* بالتنسيق `@author/repository`


```shell
wes install @wachaon/fmt
```


*install* لديه خيارات


| اسم الشيئ  | اسم قصير | وصف                                                  |
| ---------- | -------- | ---------------------------------------------------- |
| `--bare`   | `-b`     | لا تقم بإنشاء مجلد *@author*                         |
| `--global` | `-g`     | قم بتثبيت الوحدة النمطية في المجلد حيث يوجد *wes.js* |


يمكن أن يحذف الخيار `--bare` الوسيطة `require` من `author@repository` إلى `repository` . `--global` الخيار `--global` الوحدات النمطية المثبتة لجميع البرامج النصية. يجب تحديد الخيارات المذكورة أعلاه في نفس الوقت الذي *wes* الخيار الأمني `--unsafe` أو `--dangerous` .


```shell
wes install @wachaon/fmt --bare --unsafe
```


# قم بتثبيت وحدة المستودع الخاص


*install* يمكن تركيبها ليس فقط في وحدات في المستودعات العامة على *github* ، ولكن أيضا في مستودعات خاصة.


*install* ، حدد الوحدة مع `author@repository` . يقوم التطبيق بتنزيل ما يلي.


```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```


عندما تصل إلى *raw* من المستودع الخاص باستخدام متصفح ، سيتم عرض *token* ، لذا انسخ *token* .


يمكنك أيضًا تثبيت وحدة نمطية في مستودع خاص عن طريق تشغيلها على سطر الأوامر خلال *token* .


```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```


# الوحدة الخارجية


فيما يلي بعض الوحدات الخارجية.


## *@wachaon/fmt*


حزم *@wachaon/fmt* *prettier* *@wachaon/fmt* البرنامج النصي. أيضًا ، في حالة حدوث خطأ في `SyntaxError` مع تثبيت *@wachaon/fmt* ، يمكنك الإشارة إلى موقع الخطأ.


### تثبيت


```shell
wes install @wachaon/fmt
```


### الاستخدام


إذا كان هناك تنسيق *.prettierrc* (تنسيق JSON) في دليل العمل ، فسوف ينعكس في الإعداد. *fmt* يمكن استخدامها مع كل من *CLI* (واجهة سطر الأوامر) و *module* في *fmt* .


استخدام *CLI*


```shell
wes @wachaon/fmt src/sample --write
```


| رقم غير مسمى | وصف                                |
| ------------ | ---------------------------------- |
| 0            | ――――                               |
| 1            | مطلوب. مسار الملف الذي تريد تنسيقه |


| اسم الشيئ | اسم قصير | وصف             |
| --------- | -------- | --------------- |
| `--write` | `-w`     | السماح بالكتابة |


الكتابة فوق الملف باستخدام برنامج نصي منسق إذا قمت بتحديد وسيطة مسماة `--write` or `-w` .


### عند استخدامها كوحدة *module*


### `option`


```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')

const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```
