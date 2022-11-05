# *WES*

*wes* هو إطار عمل لوحدة التحكم لتشغيل *ECMAScript* على *WSH (Windows Script Host)* . سيكون [*japanese*](/README.md) الأصلي من *README* باللغة اليابانية. سيتم ترجمة النصوص غير اليابانية آليًا. \\ للنصوص بلغات أخرى ، يرجى الاختيار مما يلي.

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

-   يمكنك تغيير محرك البرنامج النصي إلى *Chakra* والكتابة وفقًا لمواصفات *ECMAScript2015* .
-   نظرًا لأنه يتم دائمًا تنفيذ 32bit *cscript.exe* ، فلا توجد مشكلة فريدة في بيئة 64 بت.
-   نظرًا لوجود نظام وحدة نمطية ، يمكن تطويره بشكل أكثر كفاءة من *WSH* التقليدي
-   تدعم الوحدات المدمجة المعالجة الأساسية مثل إدخال / إخراج الملف وإخراج النص الملون إلى وحدة التحكم
-   يمكنك السماح لقراءة الملف تلقائيًا بتخمين الترميز ، لذلك لا داعي للقلق بشأن الترميز وما إلى ذلك.
-   وحدات الحزمة لدعم النشر الخارجي والاسترجاع

# المشكلات *wes* التي لا يمكننا حلها

-   لا يمكن لـ `WScript.Quit` إحباط البرنامج ولا يُرجع رمز خطأ
-   المعالجة غير المتزامنة لا تعمل بشكل صحيح
-   لا يمكنك استخدام *event prefix* للوسيطة الثانية من `WScript.CreateObject`

# تحميل

يحتاج Wes إلى *wes* *wes.js* . للتنزيل ، انسخ *wes.js* من [*@wachaon/wes*](https://github.com/wachaon/wes) أو قم بتشغيل الأمر التالي في وحدة التحكم الخاصة بك.

```bat
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

*WScript.Shell* `SendKeys` *wes* WScript.Shell في وقت التشغيل كتطبيق. إذا كان مسار الدليل الذي تم حفظ *wes.js* فيه يحتوي على أحرف غير *ascii* ، فلن يتمكن `SendKeys` من إرسال المفتاح بشكل صحيح ولا يمكن تنفيذ البرنامج النصي. يجب تكوين مسار الوجهة \\ *wes.js* *ascii* فقط. إذا قمت بالفعل بتنزيل *wes* ، فيمكنك تحديثه باستخدام الأمر التالي.

```bat
wes update
```

# إستعمال

أدخل الكلمة الأساسية `wes` متبوعة بالأمر الذي يحدد الملف الذي سيكون نقطة انطلاق البرنامج إلى وحدة التحكم. يمكن حذف ملحق البرنامج النصي *.js* .

```bat
wes index
```

أيضًا ، نظرًا لأن *wes* مجهز بـ *REP* ، يمكنك إدخال البرامج النصية مباشرة عن طريق بدء `wes` وحده.

```bat
wes
```

يقبل *REP* إدخال البرنامج النصي حتى تقوم بإدخال سطرين فارغين. يمكنك أيضًا مشاهدة *REP* يعمل على نماذج البرامج النصية في *README.md* .

## خيارات سطر الأوامر

خيارات بدء التشغيل *wes* كما يلي.

| اسم الشيئ          | وصف                                     |
| ------------------ | --------------------------------------- |
| `--monotone`       | يلغي *ANSI escape code*                 |
| `--debug`          | قم بتشغيل البرنامج النصي في وضع التصحيح |
| `--encoding=UTF-8` | يحدد ترميز أول ملف تمت قراءته           |
| `--engine=Chakra`  | هذا الخيار يضاف تلقائيا من قبل *wes*    |

# نظام الوحدة

يدعم *wes* نظامين للوحدات النمطية ، وهما نظام *commonjs module* باستخدام `require()` ونظام *es module* باستخدام `import` . ( *dynamic import* غير مدعوم لأنه عملية غير متزامنة)

## *commonjs module*

إدارة الوحدات عن طريق التخصيص إلى `module.exports` `require()` . المسارات بخلاف المسارات المطلقة والمسارات النسبية التي تبدأ بـ `./` و `../` ابحث عن الوحدات النمطية في دليل *wes_modules* وبشكل ملائم في دليل *node_modules* . يقوم *wes* `require()` تلقائيًا بتخمين ترميز ملف الوحدة النمطية ، ولكن يمكنك تحديد الترميز باستخدام الوسيطة الثانية إذا لم يتم التخمين بشكل صحيح.

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

يفسر *Chakra* ، وهو محرك تنفيذ البرنامج النصي ، بناء الجملة مثل `imoprt` ، ولكن لا يمكن تنفيذه كما هو لأن طريقة المعالجة مثل `cscript` غير محددة. في *wes* ، من خلال إضافة *babel* إلى الوحدات المدمجة ، يتم أيضًا تنفيذ *es module* أثناء نقلها واحدة تلو الأخرى. هذا يكلفنا معالجة النفقات العامة وملف *wes.js* المتضخم. يتم أيضًا تحويل الوحدات المكتوبة في *es module* إلى `require()` عن طريق التحويل ، لذلك من الممكن استدعاء *COM Object* . ومع ذلك ، فإنه لا يدعم تحديد ترميز ملف الوحدة النمطية باستخدام *es module* . يتم تحميل كل شيء تلقائيًا. لتحميلها كوحدة *es module* ، اضبط الامتداد على `.mjs` أو اضبط حقل `"type"` في `package.json` على `"module"` .

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

يستخدم `WScript.Echo` *console* بدلاً من *wes* و `WScript.StdErr.WriteLine` . إخراج الأحرف إلى وحدة التحكم مع `console.log` . كما يدعم السلاسل المنسقة. إخراج سلسلة منسقة باستخدام عامل التنسيق `%` .

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

`WScript.StdOut.WriteLine` *wes* من `WScript.StdErr.WriteLine` لإخراج السلاسل الملونة. تم حظر `WScript.Echo` و `WScript.StdOut.WriteLine` . `WScript.StdErr.WriteLine` أو `console.log` .

## *Buffer*

يمكنك التعامل مع المخازن المؤقتة.

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```

## `__dirname` و `__filename`

`__filename` يخزن مسار ملف الوحدة النمطية الجاري تنفيذه. يحتوي `__dirname` على دليل `__filename` .

```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
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
wes REP aaa -bcd eee --fgh=iii jjj --kln mmm
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

التلاعب بالمسارات. المسارات التي تبدأ بـ `/` و `\` بشكل عام مرتبطة بجذر محرك الأقراص. على سبيل المثال `/filename` و `C:/filename` يمكن أن يكونا نفس المسار. لأسباب أمنية ، يفسر `wes` المسارات التي تبدأ بـ `/` و `\` المتعلقة بدليل العمل.

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

## *filesystem*

معالجة الملفات والدلائل. يخمن `readTextFileSync` تلقائيًا ترميز الملف ويقرأه.

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
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

### إستعمال

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

### تأكيد

#### `assert(value, message)` `assert.ok(value, message)`

قارن مع `true` مع عامل المساواة الصارم `===` . إذا كانت `value` دالة ، فقم بتقييم نتيجة تنفيذ الوظيفة.

| بارام     | يكتب                  | وصف                         |
| :-------- | :-------------------- | :-------------------------- |
| `value`   | `{Function\|Boolean}` | دالة عائدة منطقية أو منطقية |
| `message` | `{String}`            | رسالة في حالة الفشل         |

#### `assert.equal(expected, actual)`

يقارن الكائنات من أجل مساواة الأعضاء ، وليس بالإشارة. \\ NaN `true` دالة `NaN === NaN` `function (){} === function (){}` `/RegExp/g === /RegExp/g` أو `{one: {two: 2}} === {one: {two: 2}}` `[1,2,3] === [1,2,3]` إلخ. \\ عند مقارنة الفئات (الكائنات) ، يجب أن تكون نفس المُنشئ أو الفئة الفائقة التي `expected` `actual` .

| بارام      | يكتب    | وصف             |
| :--------- | :------ | :-------------- |
| `expected` | `{Any}` | القيمة المتوقعة |
| `actual`   | `{Any}` | القيمة الفعلية  |

#### `assert.throws(value, expected, message)`

تحقق من أن الأخطاء يتم طرحها بشكل صحيح. \\ يتم تحديد ما إذا كان الخطأ صحيحًا من خلال ما إذا كان هو *constructor* الخطأ المتوقع ، أو ما إذا كانت *message* متساوية ويمرر التعبير العادي تقييم *stack* .

| بارام      | يكتب                      | وصف                                                                        |
| :--------- | :------------------------ | :------------------------------------------------------------------------- |
| `value`    | `{Error}`                 | خطأ                                                                        |
| `expected` | `{Error\|String\|RegExp}` | تعبير عادي يقوم بتقييم *constructor* الخطأ أو *message* أو *stack* المتوقع |
| `message`  | `{String}`                | رسالة في حالة الفشل                                                        |

## *pipe*

يبسط *pipe* الأنابيب.

### إستعمال

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

### إستعمال

```javascript
const { isString, isNumber, isBoolean, isObject } = require('typecheck')
const log = require('log')
log(() => isString("ECMAScript"))
log(() => isNumber(43.5))
log(() => isBoolean(false))
log(() => isObject(function(){}))
```

## *animate*

*animate* يساعد على تحريك عرض وحدة التحكم.

### إستعمال

إذا استغرقت المعالجة وقتًا طويلاً ، فسيكون من الجيد عرض التقدم كرسوم متحركة على وحدة التحكم.

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

قم بتنفيذ الوظيفة `complete` عند اكتمال جميع قوائم الانتظار أو عند استدعاء `stop()` .

#### `static genProgressIndicator(animation)`

قم بإنشاء وظيفة تعرض رسمًا متحركًا للدراجات.

#### `register(callback, interval, conditional)`

معالجة التسجيل. يمكن تسجيل عمليات متعددة ومعالجتها بالتوازي. في `callback` ، سنصدر تعليمات بإيقاف الرسوم المتحركة وكتابة العرض المراد عرضه. `interval` يحدد الفاصل الزمني للمعالجة. إذا كانت `conditional` دالة ، فستنفذ `conditional(count, queue)` وإذا كانت النتيجة صحيحة ، فستستمر. ينفذ `conditional` `decrement(count)` إذا كان رقمًا ويستمر إذا كانت النتيجة رقمًا موجبًا. يتم التنفيذ مرة واحدة فقط إذا كان `conditional` غير محدد. لاحظ أن تحديد دالة يؤدي إلى زيادة `count` ، بينما يؤدي تحديد رقم إلى تقليل `count` .

#### `stop()`

*animate* .

#### `cancel(queue)`

يوقف معالجة قائمة انتظار معينة.

#### `run()`

ابدأ الرسوم المتحركة.

#### `view`

يحدد الأحرف التي يتم طباعتها على وحدة التحكم. تبديل الأحرف على فترات منتظمة. قم بتعيين إما *Arrary* أو *String* `view` . تكون *String* مفيدة عند تحديث رسم متحرك واحد ، وتكون *Array* مفيدة عند تحريك عدة صفوف بشكل فردي.

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

الحصول على نوع العضو ووصف *COM Object* من *ProgID* .

### إستعمال

```javascript
const getMember = require('getMember')
const FileSystemObject = 'Scripting.FileSystemObject'
console.log('require("%S") // => %O', FileSystemObject, getMember(FileSystemObject))
```

## *zip*

يضغط الملفات والمجلدات ويفك ضغط الملفات المضغوطة. داخليًا ، يتم استدعاء *PowerShell* ومعالجته.

### إستعمال

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

2.  *package.json* مطلوب. كحد أدنى ، مطلوب وصف الحقل `main` .

    ```json
    {
        "main": "index.js"
    }
    ```

3.  اجعل المستودع *public* إذا كنت تريد نشر الحزمة

4.  بدءًا من `version 0.12.0` ، لن يتم تجميع الحزم ذات التحميل المباشر للوحدة في دليل أعلى دليل العمل. يمكن تجميع الحزم الموجودة في الدليل العلوي *wes_modules* أو *node_modules* .

أدخل الأمر التالي للحزمة: ارجع إلى *package.json* لمعرفة ما تريد تجميعه.

```bat
    wes bundle 
```

## *install*

تستخدم لتثبيت حزمة *wes* المنشورة على *github* . من `version 0.10.28` ، يتم تغيير مجلد التثبيت من `node_modules` إلى `wes_modules` . إذا كنت تريد التثبيت في `node_modules` أضف خيار `--node` . بدءًا من `version 0.12.0` ، سيتم فك ضغط الملفات من *bandle.json* وحفظها. نظرًا لتغييرات المواصفات ، قد لا يتم تثبيت الحزم المرفقة `version 0.12.0` أقل من 0.12.0 بشكل صحيح مع `version 0.12.0` أو أحدث.

### إستعمال

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
| `--node`      | `-n`     | التثبيت في مجلد *node_module*                                       |

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

*@wachaon/fmt* *wes* *prettier* من أجل تنسيق البرامج النصية. أيضًا ، في حالة حدوث *Syntax Error* أثناء *@wachaon/fmt* ، يمكنك إظهار موقع الخطأ.

### تثبيت

```bat
wes install @wachaon/fmt
```

### إستعمال

إذا كان هناك *.prettierrc* (تنسيق JSON) في دليل العمل ، فسوف ينعكس في الإعدادات. يتوفر *fmt* في كل من *CLI* *module* .

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

#### استخدم كوحدة نمطية

```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')
const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```
