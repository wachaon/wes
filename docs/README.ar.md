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

# المشكلات *wes* التي لا يمكننا حلها

*   لا يمكن لـ `WScript.Quit` إحباط البرنامج ولا يُرجع رمز خطأ
*   المعالجة غير المتزامنة لا تعمل بشكل صحيح
*   لا يمكنك استخدام *event prefix* للوسيطة الثانية من `WScript.CreateObject`

# تحميل

يحتاج Wes إلى *wes* *wes.js* . للتنزيل ، انسخ *wes.js* من [*@wachaon/wes*](https://github.com/wachaon/wes) أو قم بتشغيل الأمر التالي في وحدة التحكم.

     bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js

*WScript.Shell* `SendKeys` *wes* WScript.Shell في وقت التشغيل كتطبيق. إذا كان مسار الدليل الذي تم حفظ *wes.js* فيه يحتوي على أحرف غير *ascii* ، فلن يتمكن `SendKeys` من إرسال المفتاح بشكل صحيح ولا يمكن تنفيذ البرنامج النصي.\
قم بتكوين المسار *wes.js* في ملف *ascii* فقط. إذا قمت بالفعل بتنزيل *wes* ، فيمكنك تحديثه باستخدام الأمر التالي.

     wes update

# إستعمال

أدخل الكلمة الأساسية `wes` متبوعة بالأمر الذي يحدد الملف الذي سيكون نقطة انطلاق البرنامج إلى وحدة التحكم. يمكن حذف ملحق البرنامج النصي *.js* .

     wes index

أيضًا ، نظرًا لأن *wes* مجهز بـ *REP* ، يمكنك إدخال البرامج النصية مباشرة عن طريق بدء `wes` وحده.

     wes

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

     // ./add.js function add (a, b) { return ab } module.exports = add

<!---->

     // ./main.js const add = require('./add') console.log('add(7, 3) // => %O', add(7, 3))

أيضًا ، من الممكن الاستيراد مع *require* *COM Object* مثل `require('WScript.Shell')` .

     const Shell = require('Shell.Application') Shell.MinimizeAll() WScript.Sleep(2000) Shell.UndoMinimizeAll()

## *es module*

*Chakra* ، وهو محرك تنفيذ نصي ، يفسر بناء الجملة مثل `imoprt` ، لكن لا يمكن تنفيذه كما هو لأن طريقة المعالجة مثل `cscript` غير محددة. في *wes* ، من خلال إضافة *babel* إلى الوحدات المدمجة ، يتم أيضًا تنفيذ *es module* أثناء نقلها بالتسلسل. هذا يكلفنا معالجة النفقات العامة وملف *wes.js* المتضخم. يتم أيضًا تحويل الوحدات المكتوبة في *es module* إلى `require()` عن طريق التحويل ، لذلك من الممكن استدعاء *COM Object* . ومع ذلك ، فإنه لا يدعم تحديد ترميز ملف الوحدة النمطية باستخدام *es module* . يتم تحميل كل شيء تلقائيًا. لتحميلها كوحدة *es module* ، اضبط الامتداد على `.mjs` أو اضبط حقل `"type"` في `package.json` على `"module"` .

     // ./sub.mjs export default function sub (a, b) { return a - b }

<!---->

     // ./main2.js import sub from './sub.mjs' console.log('sub(7, 3) // => %O', sub(7, 3))

# كائن مدمج

يحتوي *wes* *built-in objects* مضمنة غير موجودة في *WSH (JScript)* .

undefined

## *Buffer*

يمكنك التعامل مع المخازن المؤقتة.

     const content = 'Hello World' const buff = Buffer.from(content) console.log(`${content} %O`, buff)

## `__dirname` و `__filename`

`__filename` يخزن مسار ملف الوحدة النمطية الجاري تنفيذه. يحتوي `__dirname` على دليل `__filename` .

     console.log('dirname: %O\nfilename: %O', __dirname, __filename)

## *setTimeout* *setInterval* *setImmediate* *Promise* الفوري

نظرًا لأن *wes* هي بيئة تنفيذ للمعالجة المتزامنة ، فإن *setTimeout* *setInterval* *setImmediate* لا تعمل كعملية غير متزامنة ، ولكن يتم تنفيذها لدعم الوحدات النمطية التي *Promise* *Promise*

     const example = () => { const promise = new Promise((resolve, reject) => { console.log('promise') setTimeout(() => { console.log('setTimeout') resolve('resolved'); }, 2000); }).then((val) => { console.log(val) }); console.log('sub') }; console.log('start') example(); console.log('end')

# وحدة مدمجة

يحتوي *wes* *built-in modules* لتبسيط وتوحيد المعالجة الأساسية.

## *ansi*

`ansi` هو *ANSI escape code* يمكنه تغيير ألوان الإخراج القياسية والتأثيرات. قد تختلف الألوان والتأثيرات وفقًا لنوع وإعدادات تطبيق وحدة التحكم المستخدمة.

     const { redBright, yellow } = require('ansi') const message = 'File does not exist' console.log(redBright 'Error: ' yellow message)

يمكنك أيضًا إنشاء الألوان الخاصة بك باستخدام `ansi.color()` و `ansi.bgColor()` . تستخدم الوسائط *RGB* مثل `255, 165, 0` *color code* مثل `'#FFA500'` . *color name* مثل `orange` غير مدعومة.

     const { color } = require('ansi') const orange = color(255, 165, 0) console.log(orange 'Hello World')

## *argv*

احصل على وسيطات سطر الأوامر. تعلن وسيطات سطر الأوامر الخاصة بـ `cscript.exe` عن الوسائط المسماة بـ `/` ، بينما يعلن *wes* عن الوسائط المسماة بـ `-` و `--` . *argv.unnamed* و argv. *argv.named* نوع قيمة وسيطة سطر الأوامر إما إلى *String* *Number* *Boolean* . أدخل وسيطات سطر الأوامر باستخدام *REP* .

     wes REP aaa -bcd eee --fgh=iii jjj --kln mmm

قم بتشغيل البرنامج النصي التالي على *REP* .

     const argv = require('argv') console.log(`argv: %O argv.unnamed: %O argv.named: %O`, argv, argv.unnamed, argv.named)

## *pathname*

التلاعب بالمسارات. المسارات التي تبدأ بـ `/` و `\` بشكل عام مرتبطة بجذر محرك الأقراص. على سبيل المثال `/filename` و `C:/filename` يمكن أن يكونا نفس المسار. لأسباب أمنية ، يفسر `wes` المسارات التي تبدأ بـ `/` و `\` المتعلقة بدليل العمل.

     const path = require('pathname') const file = path.resolve(__dirname, 'index.js') console.log('file %O', file)

## *filesystem*

معالجة الملفات والدلائل. يخمن `readTextFileSync` تلقائيًا ترميز الملف ويقرأه.

     const fs = require('filesystem') const path = require('pathname') const readme = path.resolve(__dirname, 'README.md') const contents = fs.readTextFileSync(readme) console.log(contents)

## *chardet*

أنا أستخدم بعض الميزات من <https://github.com/runk/node-chardet> . يمكنك زيادة دقة التخمين التلقائي عن طريق زيادة الأحرف الخاصة بالترميز.

## *JScript*

إذا قمت بتغيير محرك البرنامج النصي إلى *Chakra* ، فلن تتمكن من استخدام *Enumerator* الخاصة بـ *JScript* ، وما إلى ذلك. وحدة *JScript* المدمجة تجعلها متاحة. ومع ذلك ، يقوم *Enumerator* بإرجاع *Array* ، وليس *Enumerator object* .

     const { Enumerator, ActiveXObject } = require('JScript') const FSO = new ActiveXObject('Scripting.FileSystemObject') const dir = FSO.getFolder(__dirname).Files const files = new Enumerator(dir) files.forEach(file => console.log(file.Name))

يعمل *GetObject* كبديل لـ `WScript.GetObject` .

     const { GetObject, Enumerator } = require('JScript') const ServiceSet = GetObject("winmgmts:{impersonationLevel=impersonate}").InstancesOf("Win32_Service") new Enumerator(ServiceSet).forEach(service => console.log( 'Name: %O\nDescription: %O\n', service.Name, service.Description ))

## *VBScript*

يقدم *VBScript* بعض الميزات التي لا توفرها *JScript* .

     const { TypeName } = require('VBScript') const FSO = require('Scripting.FileSystemObject') console.log(TypeName(FSO))

## *httprequest*

*httprequest* يصدر *http request* .

     const request = require('httprequest') const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1') console.log('%O', JSON.parse(content))

undefined

## *pipe*

يبسط *pipe* الأنابيب.

### إستعمال

     const pipe = require('pipe') function add (a, b) { return ba } function sub (a, b) { return b - a } function div (a, b) { return a / b } const add5 = add.bind(null, 5) const sub3 = sub.bind(null, 3) pipe() .use(add5) .use(sub3) .use(div, 4) .process(10, (err, res) => console.log('res: %O', res))

## *typecheck*

حدد نوع البرنامج النصي.

### إستعمال

     const { isString, isNumber, isBoolean, isObject } = require('typecheck') const log = require('log') log(() => isString("ECMAScript")) log(() => isNumber(43.5)) log(() => isBoolean(false)) log(() => isObject(function(){}))

undefined

## *getMember*

الحصول على نوع العضو ووصف *COM Object* من *ProgID* .

### إستعمال

     const getMember = require('getMember') const FileSystemObject = 'Scripting.FileSystemObject' console.log('require("%S") // => %O', FileSystemObject, getMember(FileSystemObject))

## *zip*

يضغط الملفات والمجلدات ويفك ضغط الملفات المضغوطة. داخليًا ، يتم استدعاء *PowerShell* ومعالجته.

### إستعمال

     const {zip, unzip} = require('zip') console.log(zip('docs\\*', 'dox.zip')) console.log(unzip('dox.zip'))

يمكن كتابة حرف بدل `*` في `path` `zip(path, destinationPath)` . يمكن استخدامه في كل من *CLI (Command Line Interface)* *module* .

     wes zip docs\* dox.zip wes zip -p dox.zip

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

         { "main": "index.js" }

3.  اجعل المستودع *public* إذا كنت تريد نشر الحزمة

4.  بدءًا من `version 0.12.0` ، لن يتم تجميع الحزم ذات التحميل المباشر للوحدة في دليل أعلى دليل العمل. يمكن تجميع الحزم الموجودة في الدليل العلوي *wes\_modules* أو *node\_modules* .

أدخل الأمر التالي للحزمة: ارجع إلى *package.json* لمعرفة ما تريد تجميعه.

     wes bundle

undefined

# تركيب الحزم من المستودعات الخاصة

يمكن *install* ليس فقط تثبيت الحزم من مستودعات *github* العامة ، ولكن أيضًا الحزم من المستودعات الخاصة. في *install* ، حدد الحزمة مع *@author/repository* . يحاول التنفيذ تنزيل عنوان url التالي.

     `https://raw.githubusercontent.com/${author}/${repository}/master/bundle.json`

إذا قمت بالوصول إلى المستودع الخاص بشكل *raw* باستخدام متصفح ، فسيتم عرض *token* ، لذا انسخ *token* . يمكنك أيضًا تثبيت الحزم من المستودعات الخاصة عن طريق تشغيلها في وحدة التحكم أثناء صلاحية *token* .

     wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA

# مقدمة الحزمة

فيما يلي بعض الحزم الخارجية.

## *@wachaon/fmt*

*@wachaon/fmt* *wes* *prettier* من أجل تنسيق البرامج النصية. أيضًا ، في حالة حدوث *Syntax Error* أثناء *@wachaon/fmt* ، يمكنك الإشارة إلى موقع الخطأ.

### تثبيت

     wes install @wachaon/fmt

### إستعمال

إذا كان هناك تنسيق *.prettierrc* (تنسيق JSON) في دليل العمل ، فسوف ينعكس في الإعدادات. يتوفر *fmt* في كل من *CLI* *module* .

#### استخدام *CLI* .

     wes @wachaon/fmt src/sample --write

| رقم غير مسمى | وصف                                |
| ------------ | ---------------------------------- |
| 1            | مطلوب. مسار الملف الذي تريد تنسيقه |

| اسم الشيئ | اسم قصير | وصف             |
| --------- | -------- | --------------- |
| `--write` | `-w`     | السماح بالكتابة |

الكتابة فوق الملف باستخدام البرنامج النصي المنسق إذا تم تحديد الوسيطة `--write` أو `-w` المسماة.

#### استخدام كوحدة نمطية

     const fmt = require('@wachaon/fmt') const { readTextFileSync, writeTextFileSync } = require('filesystem') const { join, workingDirectory } = require('pathname') const target = join(workingDirectory, 'index.js') console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
