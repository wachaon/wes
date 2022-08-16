# *WES*

*WSH (Windows Script Host)* पर *ECMAScript* चलाने के लिए *wes* एक कंसोल फ्रेमवर्क है। *README* का मूल [*japanese*](/README.md) जापानी में होगा। जापानी के अलावा अन्य ग्रंथों का मशीनी अनुवाद किया जाएगा।  
अन्य भाषाओं में पाठ के लिए, कृपया नीचे दिए गए विकल्पों में से चुनें।

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

# विशेषता

-   आप स्क्रिप्ट इंजन को *Chakra* में बदल सकते हैं और *ECMAScript2015* विनिर्देशों के अनुसार लिख सकते हैं।
-   चूंकि 32 बिट *cscript.exe* हमेशा निष्पादित होता है, 64 बिट वातावरण में कोई अनूठी समस्या नहीं है।
-   चूंकि एक मॉड्यूल प्रणाली है, इसे पारंपरिक *WSH* की तुलना में अधिक कुशलता से विकसित किया जा सकता है
-   बिल्ट-इन मॉड्यूल कंसोल में फ़ाइल इनपुट/आउटपुट और रंगीन टेक्स्ट आउटपुट जैसे बुनियादी प्रसंस्करण का समर्थन करते हैं
-   आप फ़ाइल रीडिंग को स्वचालित रूप से एन्कोडिंग का अनुमान लगाने दे सकते हैं, इसलिए आपको एन्कोडिंग आदि के बारे में चिंता करने की ज़रूरत नहीं है।
-   बाहरी प्रकाशन और पुनर्प्राप्ति का समर्थन करने के लिए पैकेज मॉड्यूल

# *wes* मुद्दे जिन्हें हम हल नहीं कर सकते

-   `WScript.Quit` प्रोग्राम को निरस्त नहीं कर सकता और त्रुटि कोड नहीं लौटाता
-   एसिंक्रोनस प्रोसेसिंग जैसे `setTimeout` और `Promise` संभव नहीं है
-   आप WScript के दूसरे तर्क के *event prefix* का उपयोग नहीं कर सकते हैं। `WScript.CreateObject`

# डाउनलोड

*wes.js* *wes* की आवश्यकता है। डाउनलोड करने के लिए, *wes.js* को [*@wachaon/wes*](https://github.com/wachaon/wes) से कॉपी करें या अपने कंसोल में निम्न कमांड चलाएँ।

```bat
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

*WScript.Shell* *wes* `SendKeys` का उपयोग करते हैं। यदि निर्देशिका का पथ जहां *wes.js* सहेजा गया है, उसमें *ascii* के अलावा अन्य वर्ण हैं, तो `SendKeys` कुंजी को सही ढंग से नहीं भेज सकता है और स्क्रिप्ट को निष्पादित नहीं किया जा सकता है।  
उस पथ को कॉन्फ़िगर करें *wes.js* केवल *ascii* में संग्रहीत है। यदि आपने पहले ही *wes* डाउनलोड कर लिया है, तो आप इसे निम्न कमांड से अपडेट कर सकते हैं।

```bat
wes update
```

# प्रयोग

कंसोल में प्रोग्राम की शुरुआती फाइल को निर्दिष्ट करने वाले कमांड के बाद `wes` कीवर्ड दर्ज करें। स्क्रिप्ट एक्सटेंशन *.js* को छोड़ा जा सकता है।

```bat
wes index
```

साथ ही, चूंकि *wes* *REP* से लैस है, आप अकेले `wes` शुरू करके सीधे स्क्रिप्ट दर्ज कर सकते हैं।

```bat
wes
```

जब तक आप दो रिक्त पंक्तियाँ दर्ज नहीं करते तब तक *REP* स्क्रिप्ट इनपुट स्वीकार करता है। आप *REP* को *README.md* में नमूना स्क्रिप्ट चलाते हुए भी देख सकते हैं।

## कमांड लाइन विकल्प

*wes* स्टार्टअप विकल्प इस प्रकार हैं।

| नामित              | विवरण                                                  |
| ------------------ | ------------------------------------------------------ |
| `--monotone`       | *ANSI escape code* को हटाता है                         |
| `--safe`           | स्क्रिप्ट को सुरक्षित मोड में चलाएँ                    |
| `--usual`          | सामान्य मोड में स्क्रिप्ट चलाएँ (डिफ़ॉल्ट)             |
| `--unsafe`         | स्क्रिप्ट को असुरक्षित मोड में चलाएं                   |
| `--dangerous`      | स्क्रिप्ट को खतरनाक मोड में चलाएं                      |
| `--debug`          | स्क्रिप्ट को डिबग मोड में चलाएँ                        |
| `--encoding=UTF-8` | पढ़ी गई पहली फ़ाइल के एन्कोडिंग को निर्दिष्ट करता है   |
| `--engine=Chakra`  | यह विकल्प स्वचालित रूप से *wes* . द्वारा जोड़ा जाता है |

`--safe` `--usual` `--unsafe` `--dangerous` `--debug` का कार्यान्वयन अधूरा है, लेकिन नामित तर्क आरक्षित हैं।

# मॉड्यूल प्रणाली

*wes* दो मॉड्यूल सिस्टम का समर्थन करता है, `require()` का उपयोग कर *commonjs module* सिस्टम और `import` का उपयोग कर *es module* सिस्टम। ( *dynamic import* समर्थित नहीं है क्योंकि यह एक अतुल्यकालिक प्रक्रिया है)

## *commonjs module*

मॉड्यूल को असाइन करके मॉड्यूल प्रबंधित करें। `module.exports` और कॉल `require()` । `./` और `../` से शुरू होने वाले निरपेक्ष पथों और सापेक्ष पथों के अलावा पथ, *wes_modules* निर्देशिका में मॉड्यूल की तलाश करते हैं और आसानी से *node_modules* निर्देशिका। *wes* की `require()` स्वचालित रूप से मॉड्यूल फ़ाइल के एन्कोडिंग का अनुमान लगाती है, लेकिन यदि आप सही ढंग से अनुमान नहीं लगाते हैं तो आप दूसरे तर्क के साथ एन्कोडिंग निर्दिष्ट कर सकते हैं।

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

साथ ही, *COM Object* के लिए *require* के साथ आयात करना संभव है जैसे `require('WScript.Shell')` ।

```javascript
const Shell = require('Shell.Application')
Shell.MinimizeAll()
WScript.Sleep(2000)
Shell.UndoMinimizeAll()
```

## *es module*

*Chakra* , जो स्क्रिप्ट निष्पादन इंजन है, सिंटैक्स की व्याख्या करता है जैसे कि `imoprt` , लेकिन इसे निष्पादित नहीं किया जा सकता क्योंकि ऐसा इसलिए है क्योंकि `cscript` के रूप में प्रसंस्करण विधि परिभाषित नहीं है। *wes* में, बिल्ट-इन मॉड्यूल में *babel* जोड़कर, *es module* को एक-एक करके ट्रांसपाइल करते हुए भी निष्पादित किया जाता है। यह हमें ओवरहेड और एक फूली *wes.js* फ़ाइल को संसाधित करने में खर्च करता है। *es module* में लिखे गए मॉड्यूल को ट्रांसपिलिंग द्वारा `require()` में भी परिवर्तित किया जाता है, इसलिए *COM Object* को कॉल करना संभव है। हालांकि, यह *es module* के साथ मॉड्यूल फ़ाइल के एन्कोडिंग को निर्दिष्ट करने का समर्थन नहीं करता है। सब कुछ अपने आप लोड हो जाता है। इसे *es module* के रूप में लोड करने के लिए, एक्सटेंशन को `.mjs` पर सेट करें या `package.json` में `"type"` फ़ील्ड को `"module"` पर सेट करें।

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

# अंतर्निहित वस्तु

*wes* में *WSH (JScript)* *built-in objects* नहीं मिले हैं।

## *console*

`WScript.Echo` *wes* और `WScript.StdErr.WriteLine` के बजाय *console* का उपयोग करता है। कंसोल के लिए आउटपुट वर्ण `console.log` के साथ। यह स्वरूपित तारों का भी समर्थन करता है। `%` फ़ॉर्मेटिंग ऑपरेटर का उपयोग करके एक स्वरूपित स्ट्रिंग को आउटपुट करता है।

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

| प्रारूप विनिर्देशक | विवरण                            |
| ------------------ | -------------------------------- |
| `%s`               | `String(value)`                  |
| `%S`               | `String(value)`                  |
| `%c`               | `String(value)`                  |
| `%C`               | `String(value)`                  |
| `%d`               | `parseInt(value, 10)`            |
| `%D`               | `parseInt(value, 10)`            |
| `%f`               | `Number(value)`                  |
| `%F`               | `Number(value)`                  |
| `%j`               | `JSON.stringify(value)`          |
| `%J`               | `JSON.stringify(value, null, 2)` |
| `%o`               | वस्तु डंप                        |
| `%O`               | ऑब्जेक्ट डंप (इंडेंट/रंगीन)      |

`WScript.StdOut.WriteLine` के *wes* `WScript.StdErr.WriteLine` का उपयोग करता है। `WScript.Echo` और `WScript.StdOut.WriteLine` अवरुद्ध आउटपुट हैं। `WScript.StdErr.WriteLine` या `console.log` का उपयोग करें।

## *Buffer*

आप बफ़र्स को संभाल सकते हैं।

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```

## `__dirname` और `__filename`

`__filename` वर्तमान में निष्पादित मॉड्यूल फ़ाइल का पथ संग्रहीत करता है। `__dirname` में `__filename` की निर्देशिका है।

```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```

# अंतर्निहित मॉड्यूल

*wes* में बुनियादी प्रसंस्करण को सरल और मानकीकृत करने के लिए *built-in modules* हैं।

## *ansi*

`ansi` *ANSI escape code* है जो मानक आउटपुट रंग और प्रभाव बदल सकता है। उपयोग किए गए कंसोल एप्लिकेशन के प्रकार और सेटिंग्स के आधार पर रंग और प्रभाव भिन्न हो सकते हैं।

```javascript
const { redBright, yellow } = require('ansi')
const message = 'File does not exist'
console.log(redBright + 'Error: ' + yellow + message)
```

आप `ansi.color()` और `ansi.bgColor()` के साथ अपने खुद के रंग भी बना सकते हैं। तर्क *RGB* जैसे `255, 165, 0` और *color code* जैसे `'#FFA500'` हैं। `orange` जैसे *color name* समर्थित नहीं हैं।

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

## *argv*

कमांड लाइन तर्क प्राप्त करें। `cscript.exe` की कमांड लाइन तर्क `/` के साथ नामित तर्कों की घोषणा करते हैं, जबकि *wes* `-` और `--` के साथ नामित तर्कों की घोषणा करते हैं। *argv.unnamed* और *argv.named* कमांड लाइन तर्क मान प्रकार को *String* *Number* *Boolean* में डाला। *REP* के साथ कमांड लाइन तर्क दर्ज करें।

```bat
wes REP aaa -bcd eee --fgh=iii jjj --kln mmm
```

*REP* पर निम्न स्क्रिप्ट चलाएँ।

```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```

## *pathname*

रास्तों में हेरफेर। `/` और `\` से शुरू होने वाले पथ आमतौर पर ड्राइव रूट के सापेक्ष होते हैं। उदाहरण के लिए `/filename` और `C:/filename` एक ही पथ हो सकते हैं। सुरक्षा कारणों से, `wes` कार्यशील निर्देशिका के सापेक्ष `/` और `\` से शुरू होने वाले पथों की व्याख्या करता है।

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

## *filesystem*

फ़ाइलों और निर्देशिकाओं में हेरफेर करें। `readTextFileSync` स्वचालित रूप से फ़ाइल के एन्कोडिंग का अनुमान लगाता है और उसे पढ़ता है।

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```

## *chardet*

मैं <https://github.com/runk/node-chardet> से कुछ सुविधाओं का उपयोग कर रहा हूं। आप एन्कोडिंग-विशिष्ट वर्णों को बढ़ाकर स्वतः अनुमान लगाने की सटीकता बढ़ा सकते हैं।

## *JScript*

यदि आप स्क्रिप्ट इंजन को *Chakra* में बदलते हैं, तो आप *JScript* विशिष्ट *Enumerator* आदि का उपयोग नहीं कर पाएंगे। बिल्ट-इन मॉड्यूल *JScript* उन्हें उपलब्ध कराता है। हालांकि, *Enumerator* एक *Array* देता है, न कि *Enumerator object* ।

```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```

*GetObject* `WScript.GetObject` के विकल्प के रूप में काम करता है।

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

*VBScript* कुछ सुविधाएं प्रदान करता है जो *JScript* नहीं करता है।

```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```

## *httprequest*

*httprequest* एक *http request* जारी करता है।

```javascript
const request = require('httprequest')
const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log('%O', JSON.parse(content))
```

## *minitest*

*minitest* सरल परीक्षण लिख सकता है। संस्करण `0.10.71` से, हम मूल अवधारणा पर वापस गए और अभिकथन के प्रकारों को घटाकर 3 प्रकार कर दिया।

### प्रयोग

`describe` के साथ समूह, `it` साथ परीक्षण करें, और `assert` से सत्यापित करें। `pass` `it` घटनाओं की संख्या और पास की संख्या की एक सरणी होगी।

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

### बल देकर कहना

#### `assert(value, message)` `assert.ok(value, message)`

सख्त समानता ऑपरेटर `===` के साथ `true` की तुलना करें। यदि `value` एक फ़ंक्शन है, तो फ़ंक्शन को निष्पादित करने के परिणाम का मूल्यांकन करें।

| परम       | टाइप                  | विवरण                              |
| :-------- | :-------------------- | :--------------------------------- |
| `value`   | `{Function\|Boolean}` | बूलियन या बूलियन-रिटर्निंग फ़ंक्शन |
| `message` | `{String}`            | विफलता के मामले में संदेश          |

#### `assert.equal(expected, actual)`

सदस्य समानता के लिए वस्तुओं की तुलना करता है, संदर्भ से नहीं।  
NaN `true` `NaN === NaN` `function (){} === function (){}` `/RegExp/g === /RegExp/g` या `{one: {two: 2}} === {one: {two: 2}}` `[1,2,3] === [1,2,3]` आदि।  
कक्षाओं (वस्तुओं) की तुलना करते समय, उनके पास वही कंस्ट्रक्टर या सुपरक्लास होना चाहिए जिसका `actual` `expected` ।

| परम        | टाइप    | विवरण          |
| :--------- | :------ | :------------- |
| `expected` | `{Any}` | अपेक्षित मूल्य |
| `actual`   | `{Any}` | असल मूल्य      |

#### `assert.throws(value, expected, message)`

सत्यापित करें कि त्रुटि सही ढंग से फेंकी जा रही है।  
त्रुटि सही है या नहीं, यह इस बात से निर्धारित होता है कि अपेक्षित त्रुटि *constructor* , *message* बराबर है, और नियमित अभिव्यक्ति *stack* मूल्यांकन पास करती है।

| परम        | टाइप                      | विवरण                                                                                             |
| :--------- | :------------------------ | :------------------------------------------------------------------------------------------------ |
| `value`    | `{Error}`                 | गलती                                                                                              |
| `expected` | `{Error\|String\|RegExp}` | एक रेगुलर एक्सप्रेशन जो अपेक्षित त्रुटि *constructor* , *message* या *stack* का मूल्यांकन करता है |
| `message`  | `{String}`                | विफलता के मामले में संदेश                                                                         |

## *pipe*

*pipe* पाइपिंग को सरल करता है।

### प्रयोग

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

स्क्रिप्ट प्रकार निर्धारित करें।

### प्रयोग

```javascript
const { isString, isNumber, isBoolean, isObject } = require('typecheck')
const log = require('log')
log(() => isString("ECMAScript"))
log(() => isNumber(43.5))
log(() => isBoolean(false))
log(() => isObject(function(){}))
```

## *animate*

*animate* कंसोल के प्रदर्शन को चेतन करने में मदद करता है।

### प्रयोग

यदि प्रसंस्करण में लंबा समय लगता है, तो प्रगति को कंसोल पर एनीमेशन के रूप में प्रदर्शित करना अच्छा होगा।

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

जब सभी कतारें पूरी हो जाती हैं या `stop()` कहा जाता है, तो `complete` फ़ंक्शन निष्पादित करें।

#### `static genProgressIndicator(animation)`

एक फ़ंक्शन उत्पन्न करें जो एक साइकिलिंग एनीमेशन प्रदर्शित करता है।

#### `register(callback, interval, conditional)`

पंजीकरण प्रक्रिया। कई प्रक्रियाओं को समानांतर में पंजीकृत और संसाधित किया जा सकता है। `callback` में, हम एनीमेशन को रोकने और प्रदर्शित होने वाले दृश्य को लिखने का निर्देश देंगे। `interval` प्रसंस्करण अंतराल निर्दिष्ट करता है। यदि `conditional` एक फ़ंक्शन है, तो यह `conditional(count, queue)` निष्पादित करेगा और यदि परिणाम सत्य है, तो यह जारी रहेगा। `conditional` `decrement(count)` को निष्पादित करता है यदि यह एक संख्या है और यदि परिणाम एक सकारात्मक संख्या है तो जारी रहता है। `conditional` अपरिभाषित होने पर केवल एक बार निष्पादित होता है। ध्यान दें कि एक फ़ंक्शन निर्दिष्ट करने से `count` बढ़ जाती है, जबकि एक संख्या निर्दिष्ट करने से `count` घट जाती है।

#### `stop()`

*animate* ।

#### `cancel(queue)`

एक विशिष्ट कतार के प्रसंस्करण को निलंबित करता है।

#### `run()`

एनिमेशन शुरू करें।

#### `view`

कंसोल पर मुद्रित वर्णों को निर्दिष्ट करता है। नियमित अंतराल पर वर्ण बदलें। `view` के लिए या तो *Arrary* या *String* असाइन करें। एकल एनीमेशन को अपडेट करते समय एक *String* उपयोगी होती है, और एक से अधिक पंक्तियों को व्यक्तिगत रूप से एनिमेट करते समय एक *Array* उपयोगी होता है।

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

*ProgID* से सदस्य प्रकार और *COM Object* का विवरण प्राप्त करें।

### प्रयोग

```javascript
const getMember = require('getMember')
const FileSystemObject = 'Scripting.FileSystemObject'
console.log('require("%S") // => %O', FileSystemObject, getMember(FileSystemObject))
```

## *zip*

फ़ाइलों और फ़ोल्डरों को संपीड़ित करता है और संपीड़ित फ़ाइलों को डीकंप्रेस करता है। आंतरिक रूप से, *PowerShell* को कॉल और संसाधित किया जाता है।

### प्रयोग

```javascript
const {zip, unzip} = require('zip')
console.log(zip('docs\\*', 'dox.zip'))
console.log(unzip('dox.zip'))
```

एक वाइल्डकार्ड `*` को `zip(path, destinationPath)` के `path` में लिखा जा सकता है। इसका उपयोग *CLI (Command Line Interface)* और *module* दोनों में किया जा सकता है।

```bat
wes zip docs\* dox.zip
wes zip -p dox.zip
```

यदि `path` में एक्सटेंशन `.zip` है, तो `unzip()` संसाधित हो गया है, और एक्सटेंशन `.zip` का कोई विवरण नहीं है। वैकल्पिक रूप से, भले ही कोई एक्सटेंशन `.zip` हो, यदि कोई वाइल्डकार्ड `*` विवरण है, तो `zip()` संसाधित किया जाएगा।

| अज्ञात | विवरण                              |
| ------ | ---------------------------------- |
| `1`    | `path` या दर्ज करने के लिए फ़ाइल   |
| `2`    | आउटपुट के लिए फ़ोल्डर फ़ाइल `dest` |

| नामित    | संक्षिप्त नाम | विवरण                              |
| -------- | ------------- | ---------------------------------- |
| `--path` | `-p`          | `path` या दर्ज करने के लिए फ़ाइल   |
| `--dest` | `-d`          | आउटपुट के लिए फ़ोल्डर फ़ाइल `dest` |

# बंडलिंग (पैकेजिंग) और मॉड्यूल स्थापित करना

*wes* में, कई मॉड्यूल के बंडल को पैकेज कहा जाता है। आप *github* पर प्रकाशित *wes* के लिए पैकेज स्थापित कर सकते हैं। एक पैकेज प्रकाशित करने के लिए एक *github repository* की आवश्यकता होती है। साथ ही, रिपॉजिटरी का नाम और स्थानीय निर्देशिका का नाम समान होना चाहिए।

## *bundle*

*github* पर पैकेज प्रकाशित करते समय, *bundle* आवश्यक मॉड्यूल को बंडल करता है और उन्हें एक प्रारूप में बदल देता है जिसे इंस्टॉलेशन द्वारा शामिल किया जा सकता है। सुरक्षा कारणों से, *bundle* *.json* *wes* बनाता है क्योंकि हम आपको सीधे निष्पादन योग्य पैकेज आयात करने की अनुमति नहीं देते हैं। पैकेजिंग के लिए कुछ शर्तें हैं।

1.  एक *repository* में केवल एक पैकेज प्रकाशित किया जा सकता है

2.  कृपया *github* रिपोजिटरी नाम और स्थानीय कार्यशील निर्देशिका नाम के लिए एक ही नाम का उपयोग करें

3.  यदि आप पैकेज प्रकाशित करना चाहते हैं तो रिपॉजिटरी को *public* करें

4.  शीर्ष-स्तरीय दायरे में मॉड्यूल के अधिग्रहण की घोषणा करें

5.  पैकेज के लिए एक *.json* फ़ाइल *directory_name.json* .json नाम के साथ कार्यशील निर्देशिका में बनाई गई है। यदि आप फ़ाइल का नाम बदलते हैं या फ़ाइल को स्थानांतरित करते हैं, तो आप इसे संस्थापन के दौरान संदर्भित नहीं कर सकते।

6.  `node_modules/directory_name` बंडल का शुरुआती बिंदु है

    ```bat
        wes bundle directory_name
    ```

    के साथ बंडल किए बिना

    ```bat
        wes bundle node_modules/directory_name
    ```

    कृपया साथ बंडल करें

## *install*

*github* पर प्रकाशित *wes* के पैकेज को स्थापित करने के लिए उपयोग किया जाता है। `version 0.10.28` से, संस्थापन फ़ोल्डर को `wes_modules` से `node_modules` में बदल दिया गया है। यदि आप `node_modules` ऐड `--node` विकल्प में स्थापित करना चाहते हैं।

### प्रयोग

फ़ॉर्म `@author/repository` में *install* के लिए तर्क पास करें।

```bat
wes install @wachaon/fmt
```

*install* के विकल्प हैं।

| नामित         | संक्षिप्त नाम | विवरण                                                                                 |
| ------------- | ------------- | ------------------------------------------------------------------------------------- |
| `--bare`      | `-b`          | *@author* फोल्डर न बनाएं                                                              |
| `--global`    | `-g`          | पैकेज को उस फ़ोल्डर में स्थापित करें जहां *wes.js* है                                 |
| `--save`      | `-S`          | पैकेज का नाम और संस्करण *package.json* में *dependencies* फ़ील्ड में जोड़ें।json      |
| `--save--dev` | `-D`          | पैकेज नाम और संस्करण को पैकेज में *package.json* फ़ील्ड में जोड़ें। *devDependencies* |
| `--node`      | `-n`          | *node_module* फ़ोल्डर में स्थापित करें                                                |

`--bare` विकल्प `author@repository` से `repository` में `require` तर्क को छोड़ सकता है। `--global` विकल्प संस्थापित संकुल को सभी स्क्रिप्ट के लिए उपलब्ध कराता है. `--node` या `-n` विकल्प को *wes* सुरक्षा विकल्प `--unsafe` या `--dangerous` के साथ निर्दिष्ट किया जाना चाहिए।

```bat
wes install @wachaon/fmt --bare --unsafe
```

# निजी भंडारों से संकुल अधिष्ठापन

*install* न केवल सार्वजनिक *github* रिपॉजिटरी से पैकेज स्थापित कर सकता है, बल्कि निजी रिपॉजिटरी से भी पैकेज स्थापित कर सकता है। *install* में, पैकेज को *@author/repository* के साथ निर्दिष्ट करें। कार्यान्वयन निम्न url को डाउनलोड करने का प्रयास करता है।

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```

जब आप एक ब्राउज़र के साथ निजी भंडार के *raw* तक पहुँचते हैं, तो *token* प्रदर्शित किया जाएगा, इसलिए *token* की प्रतिलिपि बनाएँ और उसका उपयोग करें। आप निजी रिपॉजिटरी से पैकेज को कंसोल में चलाकर भी इंस्टॉल कर सकते हैं जबकि *token* वैध है।

```bat
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

# पैकेज परिचय

यहां कुछ बाहरी पैकेज दिए गए हैं।

## *@wachaon/fmt*

स्क्रिप्ट को प्रारूपित करने के लिए *@wachaon/fmt* को *wes* के लिए *prettier* पैक किया गया है। साथ ही, अगर *@wachaon/fmt* स्थापित होने के दौरान *Syntax Error* होती है, तो त्रुटि का स्थान दिखाया जा सकता है।

### इंस्टॉल

```bat
wes install @wachaon/fmt
```

### प्रयोग

यदि कार्यशील निर्देशिका में *.prettierrc* (JSON प्रारूप) है, तो यह सेटिंग्स में दिखाई देगा। *fmt* *CLI* और *module* दोनों में उपलब्ध है।

#### *CLI* के रूप में प्रयोग करें।

```bat
wes @wachaon/fmt src/sample --write
```

| अनाम संख्या | विवरण                                                |
| ----------- | ---------------------------------------------------- |
| 0           | -                                                    |
| 1           | आवश्यक। फ़ाइल का पथ जिसे आप प्रारूपित करना चाहते हैं |

| नामित     | संक्षिप्त नाम | विवरण                       |
| --------- | ------------- | --------------------------- |
| `--write` | `-w`          | अधिलेखित करने की अनुमति दें |

प्रारूपित स्क्रिप्ट के साथ फ़ाइल को अधिलेखित करें यदि `--write` या `-w` नामित तर्क निर्दिष्ट है।

#### एक मॉड्यूल के रूप में उपयोग करें

```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')
const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```

## *@wachaon/edge*

*Internet Explorer* 15 जून, 2022 को समर्थन समाप्त कर देगा। इसके साथ ही यह उम्मीद की जाती है कि `require('InternetExplorer.Application')` साथ आवेदन संचालन भी असंभव हो जाएगा। एक विकल्प *web driver* के माध्यम से *Microsoft Edge based on Chromium* के साथ काम करना होगा। `@wachaon/edge` *Edge* ऑटोपायलट को सरल करता है।

### इंस्टॉल

पहले पैकेज स्थापित करें।

```bat
wes install @wachaon/edge --unsafe --bare
```

फिर *web driver* डाउनलोड करें।

```bat
wes edge --download
```

स्थापित *Edge* के संस्करण की जाँच करें और संबंधित *web driver* को डाउनलोड करें।

### प्रयोग

इसका उपयोग करना आसान होगा।

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

यह स्क्रिप्ट विज़िट किए गए *URL* को क्रम में कंसोल पर प्रिंट करती है। `@wachaon/edge` *URL* के लिए ईवेंट पंजीकृत करता है और डेटा को `res.exports` में जोड़ता है। पंजीकृत किया जाने वाला *URL* या तो `String` `RegExp` हो सकता है, और लचीले ढंग से सेट किया जा सकता है। इसे ईवेंट-चालित बनाकर, आप उन प्रक्रियाओं के लिए ईवेंट सेट न करके आसानी से मैन्युअल संचालन पर स्विच कर सकते हैं जिन्हें ऑटोपायलट के साथ संभालना मुश्किल है। यदि आप चाहते हैं कि स्क्रिप्ट रुक जाए, तो `navi.emit('terminate', res)` या *Edge* को मैन्युअल रूप से समाप्त करें। अंतिम रूप से `res.exports` को *.json* फ़ाइल के रूप में डिफ़ॉल्ट रूप से आउटपुट करता है। यदि आप टर्मिनेशन प्रोसेसिंग सेट करना चाहते हैं, तो `terminate` ऑफ `edge(callback, terminate)` सेट करें। `window` *@wachaon/webdriver* की *Window* क्लास का एक उदाहरण है, न कि ब्राउज़र की `window` का।

## *@wachaon/webdriver*

यह एक पैकेज होगा जो ब्राउज़र को संचालित करने वाले *web driver* को अनुरोध भेजता है। *@wachaon/edge* में निर्मित। *@wachaon/edge* के साथ, ब्राउज़र संचालन के लिए एक अलग *web driver* की आवश्यकता होती है।

### इंस्टॉल

```bat
wes install @wachaon/webdriver --unsafe --bare
```

यदि आपके पास नहीं है तो *Chromium* -आधारित *Microsoft Edge* *web driver* डाउनलोड करें। साथ ही, यदि *edge* का संस्करण और *web driver* का संस्करण भिन्न हैं, तो वेब *web driver* का एक ही संस्करण डाउनलोड करें।

```bat
wes webdriver --download
```
