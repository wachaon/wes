# *WES*


هو إطار *ECMAScript* *wes* سطر أوامر *Windows Script Host* .


النص الأصلي *README* هو [*japanese*](/README.md) . بخلاف اليابانية ، إنها جملة مترجمة آليًا.  
يرجى تحديد الجمل بلغات أخرى مما يلي.


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



# سمات


-   قم بتغيير محرك البرنامج النصي لـ *Windows Script Host* إلى *Chakra* وقم بتشغيل *ECMAScript2015* 2015
-   يتم تشغيله دائمًا *cscript.exe* 32 بت ، لذلك لا توجد أخطاء متأصلة في بيئة 64 بت.
-   استيراد الوحدة مع `require` (المطابق *es module* من *ver 0.9.0* )
-   لإخراج الأحرف الملونة إلى الإخراج القياسي
-   قم بتخمين وقراءة تشفير الملف النصي تلقائيًا


# المشكلات المعروفة لا يمكن حلها


-   لا يمكن لـ `WScript.Quit` مقاطعة البرنامج ولا يعرض رمز خطأ
-   المعالجة غير المتزامنة مثل `setTimeout` و `Promise` غير ممكنة
-   لا يمكن استخدام *event prefix* الوسيطة الثانية لـ `WScript.CreateObject`


# تثبيت


يحتاج Wes فقط إلى *wes* *wes.js* للتنزيل ، ابدأ موجه الأوامر وأدخل الأمر التالي.


```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```


يستخدم *WScript.Shell* `SendKeys` من *wes* في وقت التشغيل كتطبيق. إذا كان مسار الدليل الذي تم حفظ *wes.js* فيه يحتوي على أحرف غير *ascii* ، فلن تتمكن `SendKeys` من إرسال المفتاح بشكل صحيح ولن يتم تنفيذ البرنامج النصي.  
يرجى تكوين مسار وجهة الحفظ لـ *wes.js* فقط *ascii* .


## إستعمال


في سطر الأوامر ، حدد الملف الذي سيكون نقطة انطلاق البرنامج بعد `wes` . يمكن حذف ملحق البرنامج النصي *.js* .


```shell
wes index
```


أيضًا ، يحتوي *wes* على *REPL* ، لذلك إذا بدأت باستخدام `wes` فقط ، يمكنك إدخال البرنامج النصي مباشرة.


```shell
wes
```


سيتم قبول البرامج النصية حتى تقوم بإدخال سطرين فارغين. يمكنك أيضًا التحقق من تنفيذ نموذج البرنامج النصي في *README.md* باستخدام *REPL* .


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


تنفيذ - `--usual` - `--debug` `--unsafe` `--dangerous` `--safe` لكن الحجج المسماة محفوظة.


# نظام الوحدة


يدعم *wes* أنظمة *commonjs module* التي تستخدم أنظمة الوحدات النمطية `require()` و *es module* العامة التي تستخدم `import` . ( *dynamic import* غير مدعوم لأنه معالجة غير متزامنة)


## *commonjs module*


قم بإدارة الوحدات النمطية عن طريق التخصيص إلى `module.exports` والاتصال بـ `require()` . للراحة ، فإنه يدعم أيضًا دليل *node_modules* .


`require()` *wes* () تخمينًا تلقائيًا ترميز ملف الوحدة النمطية ، ولكن إذا لم يتم التخمين بشكل صحيح ، فيمكنك تحديد الترميز باستخدام الوسيطة الثانية.


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


يمكنك أيضًا الاستيراد إلى *OLE* مثل *require* `require('WScript.Shell')` باستخدام.


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


تفسر *Chakra* ، وهي محرك تنفيذ البرنامج النصي ، بناء الجملة مثل `imoprt` ، ولكن لا يمكن تنفيذها كما هي لأن طريقة المعالجة مثل `cscript` غير محددة. تم تضمين *babel* في *wes* . يتم تنفيذه أثناء التحويل التسلسلي إلى *es module* . نتيجة لذلك ، تتزايد تكاليف المعالجة ونفخ الملفات كتكلفة.


الوحدات الموصوفة بواسطة *es module* يتم تحويلها أيضًا إلى transpile `require()` ، لذلك يمكن استدعاء *OLE* . ومع ذلك ، فإنه لا يدعم مواصفات ترميز ملف الوحدة النمطية. تتم قراءتها جميعًا عن طريق التخمين التلقائي.


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


# كائنات مدمجة


يحتوي *wes* *built-in objects* مضمنة لا *WSH (JScript)* .


## *console*


يستخدم `WScript.Echo` *console* بدلاً من *wes* أو `WScript.StdErr.WriteLine` .


طباعة الأحرف إلى سطر الأوامر في `console.log` . كما يدعم السلاسل المنسقة. يطبع سلسلة منسقة باستخدام عامل التنسيق `%` .


```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```


`WScript.StdOut.WriteLine` *wes* من `WScript.StdErr.WriteLine` لإخراج السلاسل الملونة. يتم حظر `WScript.Echo` و `WScript.StdOut.WriteLine` من الإخراج. `WScript.StdErr.WriteLine` أو `console.log` .


## *Buffer*


يمكن التعامل مع المخازن المؤقتة.


```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```


## `__dirname` و `__filename`


`__filename` يحتوي على مسار ملف الوحدة النمطية قيد التشغيل حاليًا. يحتوي `__dirname` على دليل `__filename` .


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


يمكنك أيضًا إنشاء الألوان الخاصة بك باستخدام `ansi.color()` و `ansi.bgColor()` . تستخدم الوسيطة *RGB* مثل `255, 165, 0` أو *color code* مثل `'#FFA500'` . لا يدعم *color name* مثل `orange` .


```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```


## *argv*


يحصل على وسيطة سطر الأوامر. تعلن وسيطات سطر الأوامر في `cscript.exe` عن الوسائط المسماة مع `/` `--` بينما يعلن *wes* عن الوسائط المسماة بـ `-` و-.


*argv.unnamed* و *argv.named* يلقي نوع قيمة وسيطة سطر الأوامر إلى أحد قيم *String* *Number* *Boolean* .


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


المسارات التي تبدأ بـ `/` و `\` تشير بشكل عام إلى المسارات المتعلقة بجذر محرك الأقراص. على سبيل المثال ، قد يكون `/filename` و `C:/filename` على نفس المسار. لأسباب أمنية ، يفسر `wes` المسارات التي تبدأ بـ `/` و `\` بالنسبة إلى دليل العمل.


```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```


## *filesystem*


تشغيل الملفات والدلائل. `readTextFileSync` تلقائيًا بتخمين ترميز الملف وقراءته.


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


إذا قمت بتغيير محرك البرنامج النصي إلى *Chakra* ، فلن تتمكن من استخدام *JScript* -specific *Enumerator* وما إلى ذلك. وحدة *JScript* المدمجة تجعلها متاحة. ومع ذلك ، يقوم *Enumerator* بإرجاع *Array* بدلاً من *Enumerator object* .


```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```


يعمل *GetObject* كبديل لـ `WScript.GetObject` .


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


طلب *httprequest* *http request* كما يوحي اسمه.


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


يبسط *pipe* معالجة الأنابيب.


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


مع *install* ، يمكنك تثبيت الوحدة النمطية لـ *wes* المنشورة على *github* . ستحتاج إلى *github repository* لنشر الوحدة. أيضًا ، يجب أن يكون اسم المستودع واسم الدليل المحلي متماثلين.


## *bundle*


عند نشر وحدة على *github* ، قم *bundle* الوحدة النمطية المطلوبة وتغييرها إلى تنسيق يمكن استيراده بواسطة وحدة *install* .


لأسباب تتعلق بالسلامة ، لا يستورد *wes* الوحدات النمطية بتنسيق يمكن تنفيذه مباشرةً ، لذا قم بإنشاء ملف *.json* باستخدام وحدة *bundle* .


هناك بعض الشروط لتجميع الوحدات.


1.  يمكن نشر نوع واحد فقط من الوحدات في *repository* واحد.
2.  يجب أن يكون اسم المستودع على *github* واسم دليل العمل المحلي متماثلين.
3.  يجب أن يكون المستودع عامًا إذا كنت تريد نشر الوحدة إلى جهة خارجية.
4.  يفسر *wes* مسار الوحدة بشكل ديناميكي. `require` الوحدات النمطية التي تم الحصول عليها بموجب شروط محددة مثل ما `if` العبارات لا يمكن تجميعها.
5.  سيتم إنشاء ملف *.json* في دليل العمل الخاص بك بالاسم *directory_name.json* . لا يمكن تثبيته في حالة إعادة تسمية الملف أو نقل الملف.
6.  `node_modules/directory_name` ، تفشل الحزمة لأنها تشير إلى `directory_name.json` .


## *install*


يُستخدم لتثبيت ملف الوحدة النمطية لـ *wes* المنشور على *github* .


### الاستخدام


قم بتمرير الوسائط *install* بالتنسيق `@author/repository` .


```shell
wes install @wachaon/fmt
```


*install* لديه خيارات.


| اسم الشيئ  | اسم قصير | وصف                                                  |
| ---------- | -------- | ---------------------------------------------------- |
| `--bare`   | `-b`     | لا تقم بإنشاء مجلد *@author*                         |
| `--global` | `-g`     | قم بتثبيت الوحدة النمطية في المجلد حيث يوجد *wes.js* |


يمكن أن يحذف الخيار `--bare` الوسيطة `require` من `author@repository` إلى `repository` . `--global` الوحدات النمطية المثبتة لجميع البرامج النصية. يجب تحديد الخيارات المذكورة أعلاه في نفس الوقت الذي يتم فيه تحديد خيار أمان *wes* `--unsafe` أو `--dangerous` .


```shell
wes install @wachaon/fmt --bare --unsafe
```


# قم بتثبيت وحدة المستودع الخاص


يمكن *install* التثبيت ليس فقط في الوحدات النمطية في المستودعات العامة على *github* ، ولكن أيضًا في المستودعات الخاصة.


في *install* ، حدد الوحدة مع `author@repository` . يقوم التطبيق بتنزيل ما يلي.


```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```


عندما تصل إلى *raw* من المستودع الخاص باستخدام متصفح ، سيتم عرض *token* ، لذا انسخ *token* .


يمكنك أيضًا تثبيت وحدة نمطية في مستودع خاص عن طريق تشغيلها على سطر الأوامر خلال عمر *token* .


```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```


# الوحدة الخارجية


فيما يلي بعض الوحدات الخارجية.


## *@wachaon/fmt*


حزم *@wachaon/fmt* *prettier* وتنسيق البرنامج النصي. أيضًا ، في حالة حدوث خطأ في بناء الجملة مع تثبيت @ `SyntaxError` *@wachaon/fmt* ، يمكنك الإشارة إلى موقع الخطأ.


### تثبيت


```shell
wes install @wachaon/fmt
```


### الاستخدام


إذا كان هناك تنسيق *.prettierrc* (تنسيق JSON) في دليل العمل ، فسوف ينعكس في الإعداد. يمكن استخدامه مع كل من *CLI* (واجهة سطر الأوامر) *module* في *fmt* .


تستخدم *CLI* .


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


## `@wachaon/edge`


سوف يكمل *Internet Explorer* الدعم مع 2022/6/15. نتيجة لذلك ، يصبح من المستحيل تشغيل التطبيق باستخدام `require('InternetExplorer.Application')` .


سيكون البديل هو تشغيل *Microsoft Edge based on Chromium* عبر *web driver* . `@wachaon/edge` يبسط الطيار الآلي *Edge* .


### تثبيت


أولاً ، قم بتثبيت الوحدة.


```shell
wes install @wachaon/edge --unsafe --bare
```


ثم قم بتنزيل *web driver* .


```shell
wes edge
```


قم بفك ضغط الملف *zip* الذي تم تنزيله *msedgedriver.exe* إلى الدليل الحالي.


### الاستخدام


سيكون سهل الاستخدام.


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


يقوم هذا البرنامج النصي بإخراج *URL* التي تمت زيارتها إلى موجه الأوامر بالتسلسل.


`@wachaon/edge` حدثًا *URL* ويضيف بيانات إلى `res.exports` . يمكن أن يكون *URL* المراد تسجيله إما `String` `RegExp` ، ويمكن إجراء إعدادات مرنة.


من خلال جعلها مدفوعة بالأحداث ، من الممكن التبديل بسهولة إلى التشغيل اليدوي من خلال عدم تعيين *URL* للعمليات التي يصعب التعامل معها باستخدام الطيار الآلي.


إذا كنت تريد إيقاف البرنامج النصي ، فقم بتشغيل `navi.emit('terminate', res)` أو إنهاء *Edge* يدويًا.


تنتج عملية الإنهاء `res.exports` كملف *.json* كقيمة افتراضية. إذا كنت ترغب في ضبط عملية الإنهاء ، فقم بتعيين `terminate` `edge(callback, terminate)` .
