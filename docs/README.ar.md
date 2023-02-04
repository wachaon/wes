# *WES*

*wes* هو إطار عمل لوحدة التحكم لتشغيل *ECMAScript* على *WSH (Windows Script Host)* . سيكون [*japanese*](/README.md) الأصلي من *README* باللغة اليابانية. سيتم ترجمة النصوص غير اليابانية آليًا.\
للنصوص بلغات أخرى ، يرجى التحديد من الخيارات أدناه.

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

*   يمكنك تغيير محرك البرنامج النصي إلى *Chakra* والكتابة وفقًا لمواصفات *ECMAScript2015* .
*   نظرًا لأنه يتم دائمًا تنفيذ 32bit *cscript.exe* ، فلا توجد مشكلة فريدة في بيئة 64 بت.
*   نظرًا لوجود نظام وحدة نمطية ، يمكن تطويره بشكل أكثر كفاءة من *WSH* التقليدي
*   تدعم الوحدات المدمجة المعالجة الأساسية مثل إدخال / إخراج الملف وإخراج النص الملون إلى وحدة التحكم
*   يمكنك السماح لقراءة الملف تلقائيًا بتخمين الترميز ، لذلك لا داعي للقلق بشأن الترميز وما إلى ذلك.
*   وحدات الحزمة لدعم النشر الخارجي والاسترجاع
*   عرض تفاصيل الخطأ بلطف أكثر من *WSH*

# المشكلات *wes* التي لا يمكننا حلها

*   لا يمكن لـ `WScript.Quit` إحباط البرنامج ولا يُرجع رمز خطأ
*   المعالجة غير المتزامنة لا تعمل بشكل صحيح
*   لا يمكنك استخدام *event prefix* للوسيطة الثانية من `WScript.CreateObject`

# تحميل

يحتاج Wes إلى *wes* *wes.js* . للتنزيل ، انسخ *wes.js* من [*@wachaon/wes*](https://github.com/wachaon/wes) أو قم بتشغيل الأمر التالي في وحدة التحكم.

```bat
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

*WScript.Shell* `SendKeys` *wes* WScript.Shell في وقت التشغيل كتطبيق. إذا كان مسار الدليل الذي تم حفظ *wes.js* فيه يحتوي على أحرف غير *ascii* ، فلن يتمكن `SendKeys` من إرسال المفتاح بشكل صحيح ولا يمكن تنفيذ البرنامج النصي.\
قم بتكوين المسار *wes.js* في ملف *ascii* فقط. إذا قمت بالفعل بتنزيل *wes* ، فيمكنك تحديثه باستخدام الأمر التالي.

```bat
wes update
```

# كيف تبدأ *wes*

أدخل الكلمة الأساسية `wes` والأمر الذي يحدد الملف الذي سيكون نقطة انطلاق البرنامج إلى وحدة التحكم. يمكن حذف ملحق البرنامج النصي *.js* .

```bat
wes index
```

يمكن لـ *wes* إدخال وتنفيذ البرامج النصية مباشرة على وحدة التحكم. إذا بدأت باستخدام `wes` فقط ، فيمكنك إدخال البرنامج النصي وتنفيذه مباشرةً.

```bat
wes
```

يقبل *REP* إدخال البرنامج النصي حتى تقوم بإدخال سطرين فارغين. يمكنك أيضًا رؤية *REP* يشغل مثال البرنامج النصي في *README.md* .

## خيارات سطر الأوامر

خيارات بدء التشغيل *wes* كما يلي.

| اسم الشيئ          | وصف                                                     |
| ------------------ | ------------------------------------------------------- |
| `--monotone`       | يلغي *ANSI escape code*                                 |
| `--transpile`      | قم دائمًا بالتحويل والتشغيل باستخدام *babel-standalone* |
| `--debug`          | قم بتشغيل البرنامج النصي في وضع التصحيح                 |
| `--encoding=UTF-8` | يحدد ترميز أول ملف تمت قراءته                           |
| `--engine=Chakra`  | هذا الخيار يضاف تلقائيا من قبل *wes*                    |

# نظام الوحدة

يدعم *wes* نظامين للوحدات النمطية ، وهما نظام *commonjs module* باستخدام `require()` ونظام *es module* باستخدام `import` . ( *dynamic import* غير مدعوم لأنه عملية غير متزامنة)

## *commonjs module*

إدارة الوحدات عن طريق التخصيص إلى `module.exports` `require()` . المسارات بخلاف المسارات المطلقة والمسارات النسبية التي تبدأ بـ `./` و `../` ابحث عن الوحدات النمطية في دليل *wes\_modules* وبشكل ملائم في دليل *node\_modules* . يقوم *wes* `require()` تلقائيًا بتخمين ترميز ملف الوحدة النمطية ، ولكن يمكنك تحديد الترميز باستخدام الوسيطة الثانية إذا لم يتم التخمين بشكل صحيح.

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

أيضًا ، من الممكن الاستيراد مع *require* *COM Object* مثل `require('WScript.Shell')` .

```javascript
const Shell = require('Shell.Application')
Shell.MinimizeAll()
WScript.Sleep(2000)
Shell.UndoMinimizeAll()
```

## *es module*

*Chakra* ، محرك تنفيذ النص ، يفسر بناء الجملة مثل `imoprt` ، لكن لا يتم تنفيذه في بيئة *cscript* . في *wes* ، من خلال إضافة *babel* إلى الوحدات المدمجة ، يتم أيضًا تنفيذ *es module* أثناء نقلها واحدة تلو الأخرى. يأتي هذا بتكلفة معالجة ملف *wes.js* متضخم. يتم أيضًا تحويل الوحدات المكتوبة في *es module* إلى `require()` عن طريق التحويل ، لذلك من الممكن استدعاء *COM Object* . ومع ذلك ، فإنه لا يدعم تحديد ترميز ملف الوحدة النمطية باستخدام *es module* . يتم تحميل كل شيء تلقائيًا. لتحميله كوحدة *es module* ، اضبط الامتداد على `.mjs` أو اضبط حقل `"type"` في `package.json` على `"module"` .

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

يحتوي *wes* *built-in objects* مضمنة غير موجودة في *WSH (JScript)* .

## *console*

يستخدم Wes *console* بدلاً من *wes* `WScript.Echo()` و `WScript.StdErr.WriteLine()` .

### *console.log*

إخراج الأحرف إلى وحدة التحكم باستخدام `console.log()` . كما يدعم السلاسل المنسقة. إخراج سلسلة منسقة باستخدام عامل التنسيق `%` . (عوامل التنسيق صالحة أيضًا للطرق الأخرى.)

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

| محدد التنسيق | وصف                                |
| ------------ | ---------------------------------- |
| `%s`         | `String(value)`                    |
| `%S`         | `String(value)`                    |
| `%c`         | `String(value)`                    |
| `%C`         | `String(value)`                    |
| `%d`         | `parseInt(value, 10)`              |
| `%D`         | `parseInt(value, 10)`              |
| `%f`         | `Number(value)`                    |
| `%F`         | `Number(value)`                    |
| `%j`         | `JSON.stringify(value)`            |
| `%J`         | `JSON.stringify(value, null, 2)`   |
| `%o`         | تفريغ الكائن                       |
| `%O`         | تفريغ الكائن (مسافة بادئة / ملونة) |

`WScript.StdOut.WriteLine` *wes* من `WScript.StdErr.WriteLine` لإخراج السلاسل الملونة. يتم حظر إخراج `WScript.Echo` و `WScript.StdOut.WriteLine` . `WScript.StdErr.WriteLine` أو `console.log` .

### *console.print*

يتضمن `console.log()` عادةً سطرًا جديدًا في النهاية ، ولكن لا يتضمن `console.print` .

### *console.debug*

الإخراج إلى وحدة التحكم فقط إذا تم تمكين الخيار `--debug` .

### *console.error*

قم بطرح استثناء للمحتوى كرسالة.

### *console.weaklog*

تختفي السلاسل المطبوعة باستخدام `console.weaklog()` من وحدة التحكم إذا كان هناك أي إخراج لاحق. مفيد لتبديل المخرجات.

## *Buffer*

يمكنك التعامل مع المخازن المؤقتة.

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log('%s %O', content, buff)
```

## `__dirname` و `__filename`

`__filename` يخزن مسار ملف الوحدة النمطية الجاري تنفيذه. يحتوي `__dirname` على دليل `__filename` .

```javascript
const message = `dirname: ${__dirname}\nfilename: ${ __filename}`
console.log(message)
```

## *setTimeout* *setInterval* *setImmediate* *Promise* الفوري

نظرًا لأن *wes* هي بيئة تنفيذ للمعالجة المتزامنة ، فإن *setTimeout* *setInterval* *setImmediate* لا تعمل كعملية غير متزامنة ، ولكن يتم تنفيذها لدعم الوحدات النمطية التي *Promise* *Promise*

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

# وحدة مدمجة

يحتوي *wes* *built-in modules* لتبسيط وتوحيد المعالجة الأساسية.

# الوحدات المدمجة المراد إزالتها

قم بتغيير بعض الوحدات المدمجة إلى وحدات خارجية لجعل الملف أفتح وأسهل في الصيانة.

*   *animate.js*
*   *day.js*
*   *debug.js*
*   *log.js*

يمكن تثبيت الوحدات المذكورة أعلاه كـ `@wachaon/animate` `@wachaon/day` `@wachaon/debug` `@wachaon/log` على التوالي.

## *ansi*

`ansi` هو *ANSI escape code* يمكنه تغيير ألوان الإخراج القياسية والتأثيرات. قد تختلف الألوان والتأثيرات وفقًا لنوع وإعدادات تطبيق وحدة التحكم المستخدمة.

```javascript
const { redBright, yellow } = require('ansi')
const message = 'File does not exist'
console.log(redBright + 'Error: ' + yellow + message)
```

يمكنك أيضًا إنشاء الألوان الخاصة بك باستخدام `ansi.color()` و `ansi.bgColor()` . تستخدم الوسائط *RGB* مثل `255, 165, 0` *color code* مثل `'#FFA500'` . *color name* مثل `orange` غير مدعومة.

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

## *argv*

احصل على وسيطات سطر الأوامر. تعلن وسيطات سطر الأوامر الخاصة بـ `cscript.exe` عن الوسائط المسماة بـ `/` ، بينما يعلن *wes* عن الوسائط المسماة بـ `-` و `--` . *argv.unnamed* و argv. *argv.named* نوع قيمة وسيطة سطر الأوامر إما إلى *String* *Number* *Boolean* . أدخل وسيطات سطر الأوامر باستخدام *REP* .

```bat
wes REP aaa -bc dd --e=false --gh=iii jjj --klm nn -o --p 9 r
```

قم بتشغيل البرنامج النصي التالي على *REP* .

```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```

## *pathname*

التلاعب بالمسارات. المسارات التي تبدأ بـ `/` و `\` بشكل عام مرتبطة بجذر محرك الأقراص. على سبيل المثال `/filename` و `C:/filename` يمكن أن يكونا نفس المسار. لأسباب أمنية ، يفسر *wes* المسارات التي تبدأ بـ `/` و `\` المتعلقة بدليل العمل.

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

## *filesystem*

معالجة الملفات والدلائل. `readTextFileSync()` تلقائيًا ترميز الملف ويقرأه. (حتى إذا تم `encode` الوسيطة الثانية لـ `readFileSync()` على `auto` ، فسيتم تخمينها تلقائيًا.)

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
// const contents = fs.readFileSync(readme, 'auto')
console.log(contents)
```

## *chardet*

أنا أستخدم بعض الميزات من <https://github.com/runk/node-chardet> . يمكنك زيادة دقة التخمين التلقائي عن طريق زيادة الأحرف الخاصة بالترميز.

## *JScript*

إذا قمت بتغيير محرك البرنامج النصي إلى *Chakra* ، فلن تتمكن من استخدام *Enumerator* الخاصة بـ *JScript* ، وما إلى ذلك. وحدة *JScript* المدمجة تجعلها متاحة. ومع ذلك ، يقوم *Enumerator* بإرجاع *Array* ، وليس *Enumerator object* .

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

يقدم *VBScript* بعض الميزات التي لا توفرها *JScript* .

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

يمكن أن يكتب *minitest* اختبارات بسيطة. من الإصدار `0.10.71` ، عدنا إلى المفهوم الأساسي واختزلنا أنواع التأكيدات إلى 3 أنواع.

المجموعة مع `describe` ، والاختبار `it` ، والتحقق مع `assert` . سيكون `pass` مجموعة من عدد مرات `it` وعدد التمريرات.

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

### التأكيدات

لا يوجد سوى ثلاث وظائف تأكيد لمقارنة العناصر من أجل البساطة.

#### `assert(value, message)` `assert.ok(value, message)`

قارن بـ " `true` " مع عامل المساواة الصارم `===` . إذا كانت `value` دالة ، فقم بتقييم نتيجة تنفيذ الوظيفة.

| بارام     | يكتب                  | وصف                         |
| :-------- | :-------------------- | :-------------------------- |
| `value`   | `{Function\|Boolean}` | دالة عائدة منطقية أو منطقية |
| `message` | `{String}`            | رسالة في حالة الفشل         |

#### `assert.equal(expected, actual)`

يقارن الكائنات من أجل مساواة الأعضاء ، وليس بالإشارة.\
NaN `true` دالة `NaN === NaN` `function (){} === function (){}` `/RegExp/g === /RegExp/g` أو `{one: {two: 2}} === {one: {two: 2}}` `[1,2,3] === [1,2,3]` إلخ.\
عند مقارنة الفئات (الكائنات) ، يجب أن يكون لها نفس المُنشئ أو فئة فائقة `expected` `actual` .

| بارام      | يكتب    | وصف             |
| :--------- | :------ | :-------------- |
| `expected` | `{Any}` | القيمة المتوقعة |
| `actual`   | `{Any}` | القيمة الفعلية  |

#### `assert.throws(value, expected, message)`

تحقق من أن الأخطاء يتم طرحها بشكل صحيح.\
يتم تحديد ما إذا كان الخطأ صحيحًا أم لا من خلال ما إذا كان *constructor* الخطأ المتوقع ، *message* متساوية ، ويمرر التعبير العادي تقييم *stack* .

| بارام      | يكتب                      | وصف                                                                        |
| :--------- | :------------------------ | :------------------------------------------------------------------------- |
| `value`    | `{Error}`                 | خطأ                                                                        |
| `expected` | `{Error\|String\|RegExp}` | تعبير عادي يقوم بتقييم *constructor* الخطأ أو *message* أو *stack* المتوقع |
| `message`  | `{String}`                | رسالة في حالة الفشل                                                        |

## *pipe*

يبسط *pipe* الأنابيب.

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

حدد نوع البرنامج النصي.

```javascript
const { isString, isNumber, isBoolean, isObject } = require('typecheck')
const log = require('log')
log(() => isString("ECMAScript"))
log(() => isNumber(43.5))
log(() => isBoolean(false))
log(() => isObject(function(){}))
```

## *getMember*

الحصول على نوع عضو *COM Object* ووصفه من *ProgID* عند استخدامه في وحدة التحكم.

```bat
wes getMember "Scripting.FileSystemObject"
```

عند استخدامه كوحدة نمطية ، فإنه يحصل على نوع العضو ووصف المثيل. إذا تم استخدامها كوحدة نمطية ، يمكنك الحصول على معلومات حول الكائنات التي لا يمكن تأكيدها من *WSH (Windows Script Host)* .

```javascript
const getMember = require('getMember')
const SWbemServicesEx = require("WbemScripting.SWbemLocator").ConnectServer()
getMember(SWbemServicesEx)
```

يتطلب تمرير الكائنات من *wes* إلى *PowerShell* قدرًا معينًا من الوقت.

إذا توقفت المعالجة ، يرجى تحديد وقت الانتظار. (الافتراضي هو `1000` )

```bat
wes getMember "Scripting.FileSystemObject" 2000
```

أو

```javascript
const getMember = require('getMember', 2000)
const SWbemServicesEx = require("WbemScripting.SWbemLocator").ConnectServer()
getMember(SWbemServicesEx)
```

## *ps*

يسهل تشغيل *PowerShell* .

### `ps(source, option)`

قم بتشغيل البرنامج النصي *PowerShell* `source` .

اعرض قائمة بأوامر cmdlets في وحدة التحكم.

```javascript
const ps = require('ps')
const one = ps("Get-Command")
```

إذا كانت هناك نافذة *Google Cherome* ، فقم بتغيير حجم وموضع النافذة. (لا يعمل في وضع ملء الشاشة.)

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

يتحكم في حركة الماوس والنقرات.

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

احفظ البرنامج النصي كملف أو الصقه في `REP` التالي.

```bat
wes REP pos 100 100
```

### قم بتشغيل *powershell* مباشرة من وحدة التحكم

ينفذ ملف *.ps1* المحدد في وحدة التحكم.

```bat
wes ps ./sample.ps1
```

يمكنك أيضًا تنفيذ أمر ما مباشرةً عن طريق تحديد الخيار `--Command` أو `-c` .

مثال على عرض قائمة بالملفات في الدليل الحالي

```bat
wes ps --Command Get-ChildItem
```

## *zip*

يضغط الملفات والمجلدات ويفك ضغط الملفات المضغوطة. داخليًا ، يتم استدعاء *PowerShell* ومعالجته.

```javascript
const {zip, unzip} = require('zip')
console.log(zip('docs\\*', 'dox.zip'))
console.log(unzip('dox.zip'))
```

يمكن كتابة حرف بدل `*` في `path` `zip(path, destinationPath)` . يمكن استخدامه في كل من *CLI (Command Line Interface)* *module* .

```bat
wes zip docs\* dox.zip
wes zip -p dox.zip
```

إذا كان `path` يحتوي على الامتداد `.zip` ، تتم معالجة `unzip()` ، ولا يوجد وصف `.zip` . بدلاً من ذلك ، حتى إذا كان هناك امتداد `.zip` ، إذا كان هناك وصف بدل `*` ، فستتم معالجة `zip()` .

| غير مسمى | وصف                    |
| -------- | ---------------------- |
| `1`      | `path` أو ملف للدخول   |
| `2`      | ملف مجلد لإخراج `dest` |

| اسم الشيئ | اسم قصير | وصف                    |
| --------- | -------- | ---------------------- |
| `--path`  | `-p`     | `path` أو ملف للدخول   |
| `--dest`  | `-d`     | ملف مجلد لإخراج `dest` |

# تجميع (تغليف) وتثبيت الوحدات

في *wes* ، تسمى حزمة من عدة وحدات حزمة. يمكنك تثبيت الحزمة الخاصة بـ *wes* المنشورة على *github* . مطلوب *github repository* لنشر الحزمة.

## *bundle*

عند نشر *bundle* على *github* ، قم بتجميع الوحدات النمطية المطلوبة في حزم وإنشاء *bundle.json* .

1.  يمكن نشر حزمة واحدة فقط في *repository* واحد
2.  *package.json* مطلوب. كحد أدنى ، مطلوب وصف الحقل `main` . ```json
    {
        "main": "index.js"
    }
    ```
3.  اجعل المستودع *public* إذا كنت تريد نشر الحزمة
4.  بدءًا من `version 0.12.0` ، لن يتم تجميع الحزم ذات التحميل المباشر للوحدة في دليل أعلى دليل العمل. يمكن تجميع الحزم الموجودة في الدليل العلوي *wes\_modules* أو *node\_modules* .

أدخل الأمر التالي للحزمة: ارجع إلى *package.json* لمعرفة ما تريد تجميعه.

```bat
wes bundle 
```

## *init*

أدخل بعض العناصر وسيتم إنشاء *package.json* من تلك المعلومات.

```bat
wes init
```

## *install*

تستخدم لتثبيت حزمة *wes* المنشورة على *github* . من `version 0.10.28` ، يتم تغيير مجلد التثبيت من `node_modules` إلى `wes_modules` . إذا كنت تريد التثبيت في `node_modules` أضف خيار `--node` . بدءًا من `version 0.12.0` ، سيتم فك ضغط الملفات من *bandle.json* وحفظها. نظرًا لتغييرات المواصفات ، قد لا يتم تثبيت الحزم المرفقة `version 0.12.0` أقل من 0.12.0 بشكل صحيح مع `version 0.12.0` أو أحدث.

قم بتمرير الوسائط *install* في النموذج `@author/repository` .

```bat
wes install @wachaon/fmt
```

*install* لديه خيارات.

| اسم الشيئ     | اسم قصير | وصف                                                                 |
| ------------- | -------- | ------------------------------------------------------------------- |
| `--bare`      | `-b`     | لا تقم بإنشاء مجلدات *@author*                                      |
| `--global`    | `-g`     | قم بتثبيت الحزمة في المجلد حيث يوجد *wes.js*                        |
| `--save`      | `-S`     | أضف اسم الحزمة والإصدار إلى حقل *dependencies* في *package.json*    |
| `--save--dev` | `-D`     | أضف اسم الحزمة والإصدار إلى حقل *devDependencies* في *package.json* |
| `--node`      | `-n`     | التثبيت في مجلد *node\_module*                                      |

يمكن أن يحذف الخيار `--bare` الوسيطة `require` من `author@repository` إلى `repository` . `--global` الحزم المثبتة لجميع البرامج النصية.

```bat
wes install @wachaon/fmt --bare
```

# تركيب الحزم من المستودعات الخاصة

يمكن *install* ليس فقط تثبيت الحزم من مستودعات *github* العامة ، ولكن أيضًا الحزم من المستودعات الخاصة. في *install* ، حدد الحزمة مع *@author/repository* . يحاول التنفيذ تنزيل عنوان url التالي.

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/bundle.json`
```

إذا قمت بالوصول إلى المستودع الخاص بشكل *raw* باستخدام متصفح ، فسيتم عرض *token* ، لذا انسخ *token* . يمكنك أيضًا تثبيت الحزم من المستودعات الخاصة عن طريق تشغيلها في وحدة التحكم أثناء صلاحية *token* .

```bat
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

# مقدمة الحزمة

فيما يلي بعض الحزم الخارجية.

## *@wachaon/fmt*

*@wachaon/fmt* *wes* *prettier* من أجل تنسيق البرامج النصية. أيضًا ، في حالة حدوث *Syntax Error* أثناء *@wachaon/fmt* ، يمكنك الإشارة إلى موقع الخطأ.

### قم بتثبيت *@wachaon/fmt*

```bat
wes install @wachaon/fmt
```

إذا كان هناك تنسيق *.prettierrc* (تنسيق JSON) في دليل العمل ، فسوف ينعكس في الإعدادات. يتوفر *fmt* في كل من *CLI* *module* .

#### استخدام *CLI* .

```bat
wes @wachaon/fmt src/sample --write
```

| رقم غير مسمى | وصف                                |
| ------------ | ---------------------------------- |
| 1            | مطلوب. مسار الملف الذي تريد تنسيقه |

| اسم الشيئ | اسم قصير | وصف             |
| --------- | -------- | --------------- |
| `--write` | `-w`     | السماح بالكتابة |

الكتابة فوق الملف بالبرنامج النصي المنسق إذا تم تحديد الوسيطة `--write` أو `-w` المسماة.

#### استخدام كوحدة نمطية

```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')
const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```

## *@wachaon/edge*

سينهي *Internet Explorer* الدعم في 15 يونيو 2022. نتيجة لذلك ، من المتوقع أن تصبح عمليات التطبيق التي `require('InternetExplorer.Application')` مستحيلة. بالإضافة إلى ذلك ، لن يتمكن الموقع نفسه من العرض بشكل صحيح عن طريق إنهاء دعم *Internet Explorer* . سيكون البديل هو تشغيل *Microsoft Edge based on Chromium* عبر *web driver(msedgedriver.exe)* . `@wachaon/edge` يبسط الطيار الآلي *Edge* .

### قم بتثبيت *@wachaon/edge*

قم أولاً بتثبيت الحزمة.

```bat
wes install @wachaon/edge --bare
```

ثم قم بتنزيل *web driver(msedgedriver.exe)* .

```bat
wes edge --download
```

تحقق من إصدار *Edge* المثبت وقم بتنزيل *web driver* المقابل.

### كيفية استخدام *@wachaon/edge*

سيكون سهل الاستخدام. ابدأ المتصفح وغيّر حجم النافذة والموقع المراد عرضه على `https://www.google.com` .

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

نقوم بتخزين محفوظات زيارتك حتى يبدأ *URL* لمتصفحك بـ `https://www.yahoo` .

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

تطبع *edge* *URL* التي تمت زيارتها إلى وحدة التحكم بالترتيب. `@wachaon/edge` الأحداث *URL* ويضيف البيانات إلى `res.exports` . يمكن أن يكون *URL* المراد تسجيله إما `String` `RegExp` ، ويمكن تعيينه بمرونة. من خلال جعلها مدفوعة بالأحداث ، يمكنك التبديل بسهولة إلى التشغيل اليدوي من خلال عدم تعيين أحداث للعمليات التي يصعب التعامل معها باستخدام الطيار الآلي. إذا كنت تريد أن يتوقف البرنامج النصي ، `navi.emit('terminate', res)` أو إنهاء *Edge* يدويًا. ينتج عن `res.exports` كملف *.json* افتراضيًا. إذا كنت ترغب في تعيين معالجة الإنهاء ، فقم بتعيين `terminate` `edge(callback, terminate)` . `window` هو مثيل لفئة *Window* *@wachaon/webdriver* ، وليس `window` المتصفح.

## *@wachaon/webdriver*

ستكون حزمة ترسل الطلبات إلى *web driver* الذي يقوم بتشغيل المتصفح. يتضمن @ *@wachaon/edge* *@wachaon/webdriver* .

### قم بتثبيت *@wachaon/webdriver*

```bat
wes install @wachaon/webdriver --bare
```

قم بتنزيل برنامج تشغيل الويب *Microsoft Edge* المستند إلى *Chromium* *web driver(msedgedriver.exe)* إذا لم يكن لديك. أيضًا ، إذا كان إصدار *edge* وإصدار *web driver(msedgedriver.exe)* ، فقم بتنزيل الإصدار نفسه من *web driver(msedgedriver.exe)* .

```bat
wes webdriver --download
```

### كيفية استخدام *@wachaon/webdriver*

انتقل إلى موقع [*yahoo JAPAN*](https://www.yahoo.co.jp/) واحفظ لقطة شاشة لعنصر كتلة معين.

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
