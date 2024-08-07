# *WES*

*wes* هو إطار عمل لوحدة التحكم لتشغيل *ECMAScript* على *WSH (Windows Script Host)* . سيكون النص الأصلي من *README* باللغة [*japanese*](/README.md) . سيتم ترجمة النصوص غير اليابانية آليًا.\
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

# ميزة

*   يمكنك تغيير محرك البرنامج النصي إلى *Chakra* والكتابة وفقًا لمواصفات *ECMAScript2015+* .
*   يستخدم دائمًا *cscript.exe* 32 بت ، لذلك لا توجد مشاكل 64 بت فريدة
*   نظام الوحدة متاح لتطوير أكثر كفاءة من *WSH* التقليدي
*   تدعم الوحدات المدمجة المعالجة الأساسية مثل إدخال / إخراج الملف وإخراج النص الملون إلى وحدة التحكم
*   لا داعي للقلق بشأن الترميز وما إلى ذلك لأنه يمكن أن يستنتج الترميز تلقائيًا عند قراءة الملف
*   من الممكن أيضًا حزم الوحدة ونشرها خارجيًا أو الحصول عليها.
*   عرض تفاصيل الخطأ بلطف أكثر من *WSH*

# المشكلات المعروفة التي لا *wes* حلها

*   لا يمكن لـ `WScript.Quit` إحباط البرنامج ولا يُرجع رمز خطأ
*   المعالجة غير المتزامنة لا تعمل بشكل صحيح
*   لا يمكنك استخدام *event prefix* للوسيطة الثانية من `WScript.CreateObject`

# تحميل

يحتاج *wes* إلى ملف *wes.js* فقط. للتنزيل ، انسخ *wes.js* من [*@wachaon/wes*](https://github.com/wachaon/wes) أو قم بتشغيل الأمر التالي في وحدة التحكم.

```bat
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

يتبنى *wes* تطبيقًا يستخدم `SendKeys` لـ *WScript.Shell* في وقت التشغيل. إذا كان مسار الدليل حيث تم تخزين *wes.js* يحتوي على أحرف غير ASCII ، فلن تتمكن `SendKeys` من إرسال المفاتيح بشكل صحيح ولن يتم تشغيل البرنامج النصي. لذلك ، تأكد من أن المسار الذي تخزن فيه *wes.js* يتكون فقط من أحرف ASCII. بدلاً من ذلك ، إذا قمت بالفعل بتنزيل *wes.js* ، فيمكنك تحديثه باستخدام الأمر أدناه.

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
| `--arch=x86`       | هذا الخيار يضاف تلقائيا من قبل *wes*                    |

# نظام الوحدة

يدعم *wes* نظامين للوحدات النمطية ، وهما نظام *commonjs module* باستخدام `require()` ونظام *es module* باستخدام `import` . ( *dynamic import* غير مدعوم لأنه عملية غير متزامنة)

## *commonjs module*

إدارة الوحدات عن طريق التخصيص إلى `module.exports` والاستدعاء `require()` . المسارات بخلاف المسارات المطلقة والمسارات النسبية التي تبدأ بـ `./` و `../` ابحث عن الوحدات النمطية في دليل *wes\_modules* وبشكل ملائم في دليل *node\_modules* . يقوم *wes* `require()` تلقائيًا بتخمين ترميز ملف الوحدة النمطية ، ولكن يمكنك تحديد الترميز باستخدام الوسيطة الثانية إذا لم يتم التخمين بشكل صحيح.

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

*Chakra* ، محرك تنفيذ النص ، يفسر بناء الجملة مثل `imoprt` ، لكن لا يتم تنفيذه في بيئة *cscript* . في *wes* من خلال إضافة *babel* إلى الوحدات المدمجة ، يتم أيضًا تنفيذ *es module* أثناء نقلها واحدة تلو الأخرى. يأتي هذا بتكلفة معالجة ملف *wes.js* متضخم. يتم أيضًا تحويل الوحدات المكتوبة في *es module* إلى `require()` عن طريق التحويل ، لذلك من الممكن استدعاء *COM Object* . ومع ذلك ، فإنه لا يدعم تحديد ترميز ملف الوحدة النمطية باستخدام *es module* . يتم تحميل كل شيء تلقائيًا. لتحميلها *es module* ، اضبط الامتداد على `.mjs` أو اضبط حقل `"type"` في `package.json` على `"module"` .

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

يحتوي *wes* *built-in objects* غير موجودة في *WSH (JScript)* .

## *console*

يستخدم *wes* *console* بدلاً من `WScript.Echo()` و `WScript.StdErr.WriteLine()` .

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

يستخدم *wes* `WScript.StdOut.WriteLine` بدلاً من `WScript.StdErr.WriteLine` لإخراج السلاسل الملونة. تم حظر `WScript.Echo` و `WScript.StdOut.WriteLine` . استخدم `WScript.StdErr.WriteLine` أو `console.log` .

### *console.print*

تتضمن `console.log()` عادةً سطرًا جديدًا في النهاية ، لكن لا تتضمن `console.print` .

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

## *setTimeout* *setInterval* *setImmediate* *Promise*

نظرًا لأن *wes* هي بيئة تنفيذ للمعالجة المتزامنة ، *setTimeout* *setInterval* *setImmediate* *Promise* تعمل كعملية غير متزامنة ، ولكن يتم تنفيذها لدعم الوحدات النمطية التي تفترض تنفيذ *Promise* .

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

## الوحدات المدمجة المراد إزالتها

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

احصل على وسيطات سطر الأوامر. تعلن وسيطات سطر الأوامر الخاصة بـ `cscript.exe` عن الوسائط المسماة بـ `/` ، بينما يعلن *wes* عن الوسائط المسماة بـ `-` و `--` . *argv.unnamed* و *argv.named* يلقي نوع قيمة وسيطة سطر الأوامر إما إلى *String* *Number* *Boolean* . أدخل وسيطات سطر الأوامر باستخدام *REP* .

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

معالجة الملفات والدلائل. يخمن `readTextFileSync()` تلقائيًا ترميز الملف ويقرأه. (حتى إذا تم تعيين `encode` الثانية لـ `readFileSync()` على `auto` ، فسيتم تخمينها تلقائيًا.)

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

```javascript {"testing": true, "message": "Typename"}
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(() => TypeName(FSO)) // => "FileSystemObject"
```

## *httprequest*

*httprequest* يصدر *http request* .

```javascript {"testing": true, "message": "httprequest"}
const request = require('httprequest')
const { responseText } = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log(() => JSON.parse(responseText)) /* => {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
            "lat": "-37.3159",
            "lng": "81.1496"
        }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
    }
} */
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

قارن مع `true` مع عامل المساواة الصارم `===` . إذا كانت `value` دالة ، فقم بتقييم نتيجة تنفيذ الوظيفة.

| بارام     | يكتب                  | وصف                         |
| :-------- | :-------------------- | :-------------------------- |
| `value`   | `{Function\|Boolean}` | دالة عائدة منطقية أو منطقية |
| `message` | `{String}`            | رسالة عن الفشل              |

#### `assert.equal(expected, actual)`

يقارن الكائنات من أجل مساواة الأعضاء ، وليس بالإشارة.\
`NaN === NaN` `function (){} === function (){}` `true` `/RegExp/g === /RegExp/g` أو `{one: {two: 2}} === {one: {two: 2}}` `[1,2,3] === [1,2,3]` إلخ.\
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
| `message`  | `{String}`                | رسالة عن الفشل                                                             |

## *match*

*match* هي وحدة تحدد ما إذا كان مسار الملف يتطابق مع نمط معين. يمكنك استخدام أحرف البدل (أحرف البدل هي أحرف خاصة مثل `*` و `?` ) في أسماء الملفات والمسارات للبحث عن الملفات التي تطابق معايير محددة.

| بارام     | يكتب       | وصف        |
| :-------- | :--------- | :--------- |
| `pattern` | `{String}` | نمط        |
| `matcher` | `{Any}`    | مسار الهدف |

```javascript {"testing": true, "message": "match"}
const match = require('match')

console.log(() => match('path/to/*.js', 'path/to/url.js')) // => true
console.log(() => match('path/**/index.*', 'path/to/url/index.json')) // => true
console.log(() => match('path/to/*.?s', 'path/to/script.cs')) // => true
```

### *match.search*

يبحث *match.search* عن المسارات التي تطابق نمطًا من المسارات الموجودة.

| بارام     | يكتب       | وصف               |
| :-------- | :--------- | :---------------- |
| `pattern` | `{String}` | نمط               |
| `matcher` | `{Any}`    | مسار الدليل للبحث |

```javascript
const { search } = require('match')

console.log(() => search('**/LICENSE', process.cwd()))
```

## *pipe*

يبسط *pipe* . إخراج النتيجة أثناء تحويل *data* باستخدام *converter* . من *ver 0.12.75* فصاعدًا ، يمكن بدء تشغيله مباشرة من سطر الأوامر.

### ابدأ *pipe* كوحدة نمطية

ضع وظيفة التحويل في وسيطة `use(converter)` لطريقة *pipe* ووصف إدخال البيانات ومعالجة ما بعد التحويل مع `process(data, callback(error, result))` . إذا لم يتم تحديد `callback` ، فستكون القيمة المعادة *promise* ، ويمكن ربط المعالجة بـ `then(result)` `catch(error)` .

```javascript {"testing": true, "message": "pipe"}
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
  .process(10, (err, res) => {
    console.log(() => res) // => 3
  })
```

بالإضافة إلى `use(converter)` ، هناك طرق مثل `.filter(callbackFn(value, index))` و `map(callbackFn(value, index))` . كل *data* عبارة عن سلسلة ومصفوفة وكائن.

```javascript {"testing": true, "message": "utility methods for pipes"}
const pipe = require('pipe')

const tsv = `
javascript\t1955
java\t1995
vbscript\t1996
c#\t2000
`.trim()

function include(value, i) {
    return value.includes('script')
}

function release(value, i) {
    return value.split('\t').join(' was released in ')
}

pipe()
    .filter(include)
    .map(release)
    .process(tsv)
    .then((res) => {
        console.log(() => res) /* => `javascript was released in 1955
vbscript was released in 1996` */
    })

```

### بدء *pipe* من سطر الأوامر

من سطر الأوامر ، أدخل وظيفة التحويل بالترتيب بعد `pipe` . يتم إدخال وسيطات وظائف التحويل كقيم لوسائط سطر الأوامر المسماة بنفس اسم وظيفة التحويل. `(` تحليل `=>` باستخدام `eval()` بدلاً من `JSON.parse()` `)` *WSH* يفرض الخروج `"` في وسيطات سطر الأوامر. في هذه الحالة ، لا تحلل باستخدام `eval()` )

```bash
wes pipe swap merge --input="sample.txt" --output="" --swap="[2, 0, 1, 3]" --merge=4
```

هذا الأمر يكافئ البرنامج النصي:

```javascript
const pipe = require('pipe')
const { readFileSync, writeFileSync } = require('filesystem')
const { resolve } = require('pathname')

const data = readFileSync(resolve(process.cwd(), 'sample.txt'), 'auto')

pipe()
    .use(swap, 2, 0, 1, 3)
    .use(merge, 4)
    .process(data, (err, res) => {
        if (err) console.error(err)
        console.log(res)
    })
```

## *typecheck*

حدد نوع البرنامج النصي.

```javascript {"testing": true, "message": "typecheck"}
const { isString, isNumber, isBoolean, isObject } = require('typecheck')
console.log(() => isString("ECMAScript")) /* => true */
console.log(() => isNumber(43.5)) /* => true */
console.log(() => isBoolean(false)) /* => true */
console.log(() => isObject(function(){})) /* => false */
```

## *getMember*

الحصول على نوع *COM Object* ووصفه من *ProgID* عند استخدامه في وحدة التحكم.

```bat
wes getMember "Scripting.FileSystemObject"
```

عند استخدامه كوحدة نمطية ، فإنه يحصل على نوع ووصف أعضاء المثيل. إذا تم استخدامها كوحدة نمطية ، يمكنك الحصول على معلومات حول الكائنات التي لا يمكن تأكيدها من *WSH (Windows Script Host)* .

```javascript
const getMember = require('getMember')
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
 
console.log(ps("Get-Command"))
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

إذا كان `path` يحتوي على الامتداد `.zip` ، تتم معالجة `unzip()` ، ولا يوجد وصف للملحق `.zip` . بدلاً من ذلك ، حتى إذا كان هناك امتداد `.zip` إذا كان هناك وصف بدل `*` ، فستتم معالجة `zip()` .

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

عند نشر حزمة على *github* ، *bundle* بتجميع الوحدات النمطية المطلوبة في حزم وإنشاء *bundle.json* .

1.  يمكن نشر حزمة واحدة فقط في *repository* واحد

2.  *package.json* مطلوب. كحد أدنى ، مطلوب وصف الحقل `main` .

    ```json
     { "main": "index.js" }
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

تستخدم لتثبيت حزمة *wes* المنشورة على *github* . من `version 0.10.28` ، يتم تغيير مجلد التثبيت من `node_modules` إلى `wes_modules` . إذا كنت تريد التثبيت في `node_modules` ، أضف خيار `--node` . من `version 0.12.0` ، سيتم فك ضغط الملف من *bandle.json* وحفظه. نظرًا لتغييرات المواصفات ، قد لا يتم تثبيت الحزم المرفقة `version 0.12.0` بشكل صحيح مع `version 0.12.0` أو أحدث.

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

يمكن أن يحذف الخيار `--bare` الوسيطة `require` من `@author/repository` إلى `repository` . يتيح الخيار `--global` الحزم المثبتة لجميع البرامج النصية.

```bat
wes install @wachaon/fmt --bare
```

# تركيب الحزم من المستودعات الخاصة

يمكن *install* ليس فقط تثبيت الحزم من مستودعات *github* العامة ، ولكن أيضًا الحزم من المستودعات الخاصة. في *install* ، حدد الحزمة مع *@author/repository* . يحاول التنفيذ تنزيل عنوان url التالي.

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/bundle.json`
```

إذا قمت بالوصول إلى المستودع الخاص *raw* باستخدام متصفح ، فسيتم عرض *token* ، لذا انسخ *token* واستخدمه. يمكنك أيضًا تثبيت الحزم من المستودعات الخاصة عن طريق تشغيلها في وحدة التحكم أثناء صلاحية *token* المميز.

```bat
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

# مقدمة الحزمة

فيما يلي بعض الحزم الخارجية.

## *@wachaon/fmt*

تم تجميع *@wachaon/fmt* *prettier* من *wes* تنسيق البرامج النصية. أيضًا ، في حالة حدوث *Syntax Error* أثناء تثبيت *@wachaon/fmt* ، يمكنك الإشارة إلى موقع الخطأ.

### قم بتثبيت *@wachaon/fmt*

```bat
wes install @wachaon/fmt
```

إذا كان هناك تنسيق *.prettierrc* (تنسيق JSON) في دليل العمل ، فسوف ينعكس في الإعدادات. يتوفر *fmt* في كل من *CLI* والوحدة *module* .

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

## *@wachaon/edge*

سينهي *Internet Explorer* الدعم في 15 يونيو 2022. نتيجة لذلك ، من المتوقع أن تصبح عمليات التطبيق التي `require('InternetExplorer.Application')` مستحيلة. بالإضافة إلى ذلك ، لن يتمكن الموقع نفسه من العرض بشكل صحيح عن طريق إنهاء دعم *Internet Explorer* . سيكون البديل هو تشغيل *Microsoft Edge based on Chromium* عبر *web driver(msedgedriver.exe)* . `@wachaon/edge` يبسط *Edge* الآلي للحافة.

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
const edge = require('edge')

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

تطبع *edge* *URL* التي تمت زيارتها إلى وحدة التحكم بالترتيب. يسجل `@wachaon/edge` الأحداث لعناوين *URL* ويضيف البيانات إلى `res.exports` . يمكن أن يكون *URL* المراد تسجيله إما `String` `RegExp` ، ويمكن تعيينه بمرونة. من خلال جعلها مدفوعة بالأحداث ، يمكنك التبديل بسهولة إلى التشغيل اليدوي من خلال عدم تعيين أحداث للعمليات التي يصعب التعامل معها باستخدام الطيار الآلي. إذا كنت تريد أن يتوقف البرنامج النصي ، فقم بتشغيل `navi.emit('terminate', res)` أو إنهاء *Edge* يدويًا. ينتج عن الإنهاء `res.exports` كملف *.json* افتراضيًا. إذا كنت ترغب في تعيين معالجة الإنهاء ، فقم بتعيين `terminate` `edge(callback, terminate)` . `window` هو مثيل لفئة *Window* *@wachaon/webdriver* ، وليس `window` المتصفح.

## *@wachaon/webdriver*

ستكون حزمة ترسل الطلبات إلى *web driver* الذي يقوم بتشغيل المتصفح. يتضمن *@wachaon/edge* *@wachaon/webdriver* .

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
