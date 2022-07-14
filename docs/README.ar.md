# *WES*

*wes* هو إطار عمل لوحدة التحكم يقوم بتشغيل *ECMAScript* على *WSH (Windows Script Host)* . النص الأصلي *README* هو [*japanese*](/README.md) . بخلاف اليابانية ، إنها جملة مترجمة آليًا.  
يرجى تحديد الجمل بلغات أخرى مما يلي.

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

# خاصية

-   يمكنك تغيير محرك البرنامج النصي إلى *Chakra* وكتابته في مواصفات *ECMAScript2015*
-   يتم تشغيله دائمًا *cscript.exe* 32 بت ، لذلك لا توجد مشاكل متأصلة في بيئة 64 بت.
-   باستخدام نظام معياري ، يمكنك التطوير بشكل أكثر كفاءة من *WSH* التقليدي
-   تدعم الوحدة المدمجة المعالجة الأساسية مثل إدخال / إخراج الملف وإخراج الأحرف الملونة إلى وحدة التحكم.
-   لا داعي للقلق بشأن الترميز لأنه يمكنك جعل الملف يقرأ تلقائيًا تخمين الترميز.
-   نقوم أيضًا بحزم الوحدات النمطية لدعم النشر الخارجي والاسترجاع.

# لا يمكن حل المشكلات *wes*

-   لا يمكن لـ `WScript.Quit` مقاطعة البرنامج ولا يُرجع رمز خطأ
-   المعالجة غير المتزامنة مثل `setTimeout` و `Promise` غير ممكنة
-   لا يمكنك استخدام *event prefix* كوسيطة ثانية لـ `WScript.CreateObject`

# تحميل

يحتاج Wes فقط إلى *wes* *wes.js* للتنزيل ، انسخ *wes.js* من [*@wachaon/wes*](https://github.com/wachaon/wes) أو قم بتشغيل الأمر التالي في وحدة التحكم.

```bat
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

يستخدم *WScript.Shell* `SendKeys` في *wes* في وقت التشغيل كتطبيق. إذا كان مسار الدليل الذي تم حفظ *wes.js* فيه يحتوي على أحرف غير *ascii* ، فلن تتمكن `SendKeys` من إرسال المفتاح بشكل صحيح ولن يتم تنفيذ البرنامج النصي.  
يرجى تكوين مسار وجهة الحفظ لـ *wes.js* فقط *ascii* . إذا قمت بالفعل بتنزيل *wes* ، فيمكنك تحديثه باستخدام الأمر التالي.

```bat
wes update
```

# كيف تستعمل

أدخل الأمر إلى وحدة التحكم التي تحدد الملف الذي سيكون نقطة انطلاق البرنامج بعد الكلمة الأساسية `wes` . يمكن حذف ملحق البرنامج النصي *.js* .

```bat
wes index
```

أيضًا ، يحتوي *wes* على *REP* ، لذا إذا بدأت باستخدام `wes` فقط ، يمكنك إدخال البرنامج النصي مباشرةً.

```bat
wes
```

يقبل *REP* إدخال البرنامج النصي حتى تقوم بإدخال سطرين فارغين. يمكنك أيضًا التحقق من تنفيذ نموذج البرنامج النصي في *README.md* باستخدام *REP* .

## خيارات سطر الأوامر

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

تنفيذ - `--safe` `--unsafe` - غير `--dangerous` `--debug` غير `--usual` ، لكن الحجج المسماة محفوظة.

# نظام الوحدات

يدعم *wes* نظامين للوحدات النمطية ، وهما نظام *commonjs module* الذي يستخدم `require()` والوحدة *es module* التي تستخدم `import` . ( *dynamic import* هو معالجة غير متزامنة ، لذلك فهو غير مدعوم)

## *commonjs module*

قم بإدارة الوحدات النمطية عن طريق التخصيص إلى `module.exports` والاتصال بـ `require()` . بالنسبة للمسارات بخلاف المسارات المطلقة والمسارات النسبية التي تبدأ بـ `./` و `../` ، ابحث عن الوحدات النمطية في دليل *wes_modules* ، ولتيسير الأمر ، ابحث عن دليل *node_modules* . `require()` *wes* () تخمينًا تلقائيًا ترميز ملف الوحدة النمطية ، ولكن إذا لم يتم التخمين بشكل صحيح ، فيمكنك تحديد الترميز باستخدام الوسيطة الثانية.

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

يمكنك أيضًا الاستيراد *require* *ActiveX* باستخدام `require('WScript.Shell')` .

```javascript
const Shell = require('Shell.Application')
Shell.MinimizeAll()
WScript.Sleep(2000)
Shell.UndoMinimizeAll()
```

## *es module*

يفسر *Chakra* ، وهو محرك تنفيذ البرنامج النصي ، بناء الجملة مثل `imoprt` ، ولكن لا يمكن تنفيذه كما هو لأن طريقة المعالجة مثل `cscript` غير محددة. في *wes* ، من خلال إضافة *babel* إلى الوحدة المدمجة ، نقوم بتنفيذها أثناء النقل التسلسلي إلى *es module* . نتيجة لذلك ، يتم تضخيم تكاليف المعالجة وملف *wes.js* كتكلفة. يتم أيضًا نقل الوحدات النمطية الموصوفة بواسطة *es module* لتتطلب `require()` ، لذلك من الممكن إجراء مكالمات *ActiveX* . ومع ذلك ، فإنه لا يدعم مواصفات الترميز لملف الوحدة النمطية في *es module* . تتم قراءتها جميعًا عن طريق التخمين التلقائي. لتحميلها كوحدة *es module* ، اضبط الامتداد على `.mjs` أو حقل `"type"` من `package.json` على `"module"` .

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

# كائن مدمج

يحتوي *wes* *built-in objects* مضمنة لا *WSH (JScript)* .

## *console*

يستخدم *wes* *console* بدلاً من `WScript.Echo` أو `WScript.StdErr.WriteLine` . طباعة الأحرف إلى وحدة التحكم في `console.log` . كما يدعم السلاسل المنسقة. يطبع سلسلة منسقة باستخدام عامل التنسيق `%` .

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

| محدد التنسيق | وصف                              |
| ------------ | -------------------------------- |
| `%s`         | `String(value)`                  |
| `%S`         | `String(value)`                  |
| `%c`         | `String(value)`                  |
| `%C`         | `String(value)`                  |
| `%d`         | `parseInt(value, 10)`            |
| `%D`         | `parseInt(value, 10)`            |
| `%f`         | `Number(value)`                  |
| `%F`         | `Number(value)`                  |
| `%j`         | `JSON.stringify(value)`          |
| `%J`         | `JSON.stringify(value, null, 2)` |
| `%o`         | تفريغ الكائن                     |
| `%O`         | تفريغ كائن (مسافة بادئة ملونة)   |

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

# وحدة مدمجة

يحتوي *wes* *built-in modules* لتبسيط وتوحيد المعالجة الأساسية.

## *ansi*

`ansi` هو *ANSI escape code* يسمح لك بتغيير لون وتأثير الإخراج القياسي. قد تختلف الألوان والتأثيرات وفقًا لنوع وإعدادات تطبيق وحدة التحكم المستخدمة.

```javascript
const { redBright, yellow } = require('ansi')
const message = 'File does not exist'
console.log(redBright + 'Error: ' + yellow + message)
```

يمكنك أيضًا إنشاء الألوان الخاصة بك باستخدام `ansi.color()` و `ansi.bgColor()` . تستخدم الوسيطة *RGB* مثل `255, 165, 0` أو *color code* مثل `'#FFA500'` . لا يدعم *color name* مثل `orange` .

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

## *argv*

يحصل على وسيطة سطر الأوامر. تعلن وسيطات سطر الأوامر في `cscript.exe` عن الوسائط المسماة مع `/` `--` بينما يعلن *wes* عن الوسائط المسماة بـ `-` و-. *argv.unnamed* و *argv.named* يلقي نوع قيمة وسيطة سطر الأوامر إلى أحد قيم *String* *Number* *Boolean* . أدخل وسيطات سطر الأوامر مع *REP* .

```bat
wes REP aaa -bcd eee --fgh=iii jjj --kln mmm
```

قم بتشغيل البرنامج النصي التالي في *REP* .

```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```

## *pathname*

تشغيل المسار. المسارات التي تبدأ بـ `/` و `\` تشير بشكل عام إلى المسارات المتعلقة بجذر محرك الأقراص. على سبيل المثال ، قد يكون `/filename` و `C:/filename` لهما نفس المسار. لأسباب أمنية ، يفسر `wes` المسارات التي تبدأ بـ `/` و `\` بالنسبة إلى دليل العمل.

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

## *filesystem*

تشغيل الملفات والدلائل. يخمن `readTextFileSync` تلقائيًا ترميز الملف ويقرأه.

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```

## *chardet*

أنا أستخدم بعض ميزات <https://github.com/runk/node-chardet> . يمكنك تحسين دقة التخمين التلقائي عن طريق زيادة الأحرف الخاصة بالتشفير.

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

*httprequest* يصدر *http request* .

```javascript
const request = require('httprequest')
const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log('%O', JSON.parse(content))
```

## *minitest*

يمكن أن يكتب *minitest* اختبارات بسيطة. بالعودة إلى المفهوم الأساسي من الإصدار `0.10.71` ، قمنا بتقليل أنواع التأكيدات إلى ثلاثة.

### الاستخدام

قسّم إلى مجموعات مع `describe` ، واكتب الاختبارات `it` ، والتحقق من صحتها `assert` . `pass` عبارة عن مجموعة من عدد مرات `it` وعدد التمريرات.

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

### تأكيد

#### `assert(value, message)` `assert.ok(value, message)`

قارن مع `true` مع عامل المساواة الدقيق `===` . إذا كانت `value` دالة ، فقم بتقييم نتيجة تنفيذ الوظيفة.

| بارام     | يكتب                  | وصف                                   |
| :-------- | :-------------------- | :------------------------------------ |
| `value`   | `{Function\|Boolean}` | دالة تُرجع قيمة منطقية أو قيمة منطقية |
| `message` | `{String}`            | رسالة في حالة الفشل                   |

#### `assert.equal(expected, actual)`

يقارن الكائنات من خلال ما إذا كان أعضائها متكافئين ، وليس بالإشارة.  
NaN `true` دالة `NaN === NaN` `function (){} === function (){}` `/RegExp/g === /RegExp/g` و `{one: {two: 2}} === {one: {two: 2}}` `[1,2,3] === [1,2,3]` إلخ.  
عند مقارنة الفئات (الكائنات) ، يجب أن يكون نفس المُنشئ أو `actual` فئة فائقة من `expected` .

| بارام      | يكتب    | وصف             |
| :--------- | :------ | :-------------- |
| `expected` | `{Any}` | القيمة المتوقعة |
| `actual`   | `{Any}` | القيمة الفعلية  |

#### `assert.throws(value, expected, message)`

تحقق من إلقاء الخطأ بشكل صحيح.  
يتم تحديد ما إذا كان الخطأ صحيحًا من خلال ما إذا كان هو *constructor* الخطأ المتوقع ، أو إذا كانت *message* مكافئة ويمرر التعبير العادي تقييم *stack* .

| بارام      | يكتب                      | وصف                                                                        |
| :--------- | :------------------------ | :------------------------------------------------------------------------- |
| `value`    | `{Error}`                 | خطأ                                                                        |
| `expected` | `{Error\|String\|RegExp}` | تعبير عادي يقوم بتقييم *constructor* أو *message* أو *stack* الخطأ المتوقع |
| `message`  | `{String}`                | رسالة في حالة الفشل                                                        |

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

تحديد نوع البرنامج النصي.

```javascript
const { isString, isNumber, isBoolean, isObject } = require('typecheck')
const log = require('log')
log(() => isString("ECMAScript"))
log(() => isNumber(43.5))
log(() => isBoolean(false))
log(() => isObject(function(){}))
```

## *zip*

ضغط الملفات والمجلدات وفك ضغط الملفات المضغوطة. يستدعي *PowerShell* داخليًا ويعالجها.

```javascript
const {zip, unzip} = require('zip')
console.log(zip('docs\\*', 'dox.zip'))
console.log(unzip('dox.zip'))
```

يمكن كتابة أحرف البدل `*` في `path` `zip(path, destinationPath)` . يمكن استخدامه مع كل من *CLI (Command Line Interface)* *module* .

```bat
wes zip docs\* dox.zip
wes zip -p dox.zip
```

إذا كان `path` يحتوي على الامتداد `.zip` ، تتم معالجة `unzip()` ولا يوجد وصف `.zip` . أو حتى إذا كان هناك امتداد `.zip` ، إذا كان هناك وصف لحرف بدل `*` ، فستتم معالجة `zip()` .

| غير مسمى | وصف                           |
| -------- | ----------------------------- |
| `1`      | `path` المجلد أو الملف للدخول |
| `2`      | ملف مجلد لإخراج `dest`        |

| اسم الشيئ | اسم قصير | وصف                           |
| --------- | -------- | ----------------------------- |
| `--path`  | `-p`     | `path` المجلد أو الملف للدخول |
| `--dest`  | `-d`     | ملف مجلد لإخراج `dest`        |

# تجميع الوحدات النمطية وتركيبها

في *wes* ، تسمى حزمة من عدة وحدات حزمة. يمكنك تثبيت الحزمة الخاصة بـ *wes* المنشورة على *github* . ستحتاج إلى *github repository* لنشر الحزمة. أيضًا ، يجب أن يكون اسم المستودع واسم الدليل المحلي متماثلين.

## *bundle*

عند نشر *bundle* على *github* ، قم بتجميع الوحدات النمطية المطلوبة وتغيير التنسيق بحيث يمكن استيرادها عن طريق التثبيت. لأسباب أمنية ، تنشئ *bundle* ملف *.json* لأن *wes* لا يسمح لك باستيراد الحزم بتنسيق يمكن تنفيذه مباشرة. هناك بعض الشروط للتغليف.

1.  يمكن نشر حزمة واحدة فقط في *repository* واحد

2.  تأكد من تطابق اسم المستودع على *github* مع اسم دليل العمل المحلي.

3.  إذا قمت بنشر الحزمة ، فيرجى جعل المستودع *public*

4.  أعلن عن اكتساب الوحدة في نطاق المستوى الأعلى

5.  يتم إنشاء ملف الحزمة *.json* في دليل العمل الخاص بك بالاسم *directory_name.json* . إذا قمت بإعادة تسمية الملف أو نقل الملف ، فلا يمكنك الرجوع إليه عند التثبيت.

6.  `node_modules/directory_name` هي نقطة البداية للحزمة

    ```bat
        wes bundle directory_name
    ```

    بدون تجميع مع

    ```bat
        wes bundle node_modules/directory_name
    ```

    يرجى الحزمة مع

## *install*

تستخدم لتثبيت حزمة *wes* المنشورة على *github* . من `version 0.10.28` ، سيتم تغيير مجلد التثبيت من `node_modules` إلى `wes_modules` . إذا كنت تقوم بالتثبيت على `node_modules` ، أضف الخيار `--node` .

### كيف تستعمل

قم بتمرير الوسائط *install* بالتنسيق `@author/repository` .

```bat
wes install @wachaon/fmt
```

*install* لديه خيارات.

| اسم الشيئ     | اسم قصير | وصف                                                                 |
| ------------- | -------- | ------------------------------------------------------------------- |
| `--bare`      | `-b`     | لا تقم بإنشاء مجلد *@author*                                        |
| `--global`    | `-g`     | قم بتثبيت الحزمة في المجلد حيث يوجد *wes.js*                        |
| `--save`      | `-S`     | أضف اسم الحزمة والإصدار إلى حقل *dependencies* في *package.json*    |
| `--save--dev` | `-D`     | أضف اسم الحزمة والإصدار إلى حقل *devDependencies* في *package.json* |
| `--node`      | `-n`     | التثبيت في مجلد *node_module*                                       |

يمكن أن يحذف الخيار `--bare` الوسيطة `require` من `author@repository` إلى `repository` . يجعل الخيار `--global` الحزمة المثبتة متاحة لجميع البرامج النصية. يجب تحديد الخيار `--node` or `-n` في نفس الوقت الذي يتم فيه تحديد خيار أمان *wes* `--unsafe` أو `--dangerous` .

```bat
wes install @wachaon/fmt --bare --unsafe
```

# تركيب الحزم في مستودعات خاصة

يمكن *install* تثبيت الحزم في مستودعات خاصة وكذلك الحزم في المستودعات العامة على *github* . في *install* ، حدد الحزمة مع *@author/repository* . سيحاول التطبيق تنزيل عنوان url التالي.

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```

عندما تصل إلى *raw* من المستودع الخاص باستخدام متصفح ، سيتم عرض *token* ، لذا انسخ *token* . يمكنك أيضًا تثبيت الحزم في مستودعات خاصة عن طريق تشغيلها في وحدة التحكم خلال عمر *token* .

```bat
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

# مقدمة الحزمة

فيما يلي بعض الحزم الخارجية.

## *@wachaon/fmt*

*@wachaon/fmt* هي حزمة *prettier* لـ *wes* وتنسيق البرنامج النصي. أيضًا ، إذا تم تثبيت *@wachaon/fmt* *Syntax Error* في بناء الجملة ، يمكنك الإشارة إلى موقع الخطأ.

### تثبيت

```bat
wes install @wachaon/fmt
```

### كيف تستعمل

إذا كان هناك تنسيق *.prettierrc* (تنسيق JSON) في دليل العمل ، فسوف ينعكس في الإعداد. يمكن استخدام *fmt* مع كل من *CLI* *module* .

#### تستخدم *CLI* .

```bat
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

#### استخدم كوحدة نمطية

```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')
const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```

## *@wachaon/edge*

سوف يكمل *Internet Explorer* الدعم مع 2022/6/15. نتيجة لذلك ، من المتوقع أنه لن يكون من الممكن تشغيل التطبيق باستخدام `require('InternetExplorer.Application')` . سيكون البديل هو تشغيل *Microsoft Edge based on Chromium* عبر *web driver* . `@wachaon/edge` يبسط الطيار الآلي *Edge* .

### تثبيت

أولاً ، قم بتثبيت الحزمة.

```bat
wes install @wachaon/edge --unsafe --bare
```

ثم قم بتنزيل *web driver* .

```bat
wes edge --download
```

تحقق من الإصدار المثبت من *Edge* وقم بتنزيل *web driver* المقابل.

### كيف تستعمل

سيكون سهل الاستخدام.

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

سيقوم هذا البرنامج النصي بإخراج *URL* التي تمت زيارتها بشكل تسلسلي إلى وحدة التحكم. `@wachaon/edge` حدثًا *URL* ويضيف بيانات إلى `res.exports` . يمكن أن يكون *URL* المراد تسجيله إما `String` `RegExp` ، ويمكن إجراء إعدادات مرنة. من خلال جعلها مدفوعة بالأحداث ، من الممكن التبديل بسهولة إلى التشغيل اليدوي من خلال عدم تعيين حدث للمعالجة يصعب التعامل معه باستخدام الطيار الآلي. إذا كنت تريد إيقاف البرنامج النصي ، فقم بتشغيل `navi.emit('terminate', res)` أو إنهاء *Edge* يدويًا. تقوم عملية الإنهاء بإخراج `res.exports` كملف *.json* كقيمة افتراضية. إذا كنت ترغب في تعيين عملية الإنهاء ، فقم بتعيين `terminate` `edge(callback, terminate)` . `window` ليست `window` في المتصفح ، ولكنها مثيل لفئة *Window* من *@wachaon/webdriver* .

## *@wachaon/webdriver*

إنها حزمة ترسل طلبًا إلى *web driver* الذي يقوم بتشغيل المتصفح. مدمج في *@wachaon/edge* . مثل *@wachaon/edge* ، يلزم وجود *web driver* لتشغيل المتصفح.

### تثبيت

```bat
wes install @wachaon/webdriver --unsafe --bare
```

إذا لم يكن لديك *web driver* *Microsoft Edge* يستند إلى *Chromium* ، فقم بتنزيله. أيضًا ، إذا كان إصدار *edge* وإصدار *web driver* مختلفين ، فقم بتنزيل الإصدار نفسه من *web driver* .

```bat
wes webdriver --download
```
