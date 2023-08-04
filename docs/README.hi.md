# *WES*

*wes* *WSH (Windows Script Host)* पर *ECMAScript* चलाने के लिए एक कंसोल फ्रेमवर्क है। *README* का मूल पाठ [*japanese*](/README.md) में होगा। जापानी के अलावा अन्य पाठों का मशीन से अनुवाद किया जाएगा।\
अन्य भाषाओं के पाठों के लिए, कृपया नीचे दिए गए विकल्पों में से चयन करें।

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

*   आप स्क्रिप्ट इंजन को *Chakra* में बदल सकते हैं और *ECMAScript2015+* विनिर्देशों के अनुसार लिख सकते हैं।
*   हमेशा 32-बिट *cscript.exe* उपयोग करता है, इसलिए 64-बिट में कोई अनोखी समस्या नहीं होती
*   पारंपरिक *WSH* की तुलना में अधिक कुशल विकास के लिए मॉड्यूल प्रणाली उपलब्ध है
*   अंतर्निर्मित मॉड्यूल बुनियादी प्रसंस्करण जैसे फ़ाइल इनपुट/आउटपुट और कंसोल पर रंगीन टेक्स्ट आउटपुट का समर्थन करते हैं
*   आपको एन्कोडिंग आदि के बारे में चिंता करने की ज़रूरत नहीं है क्योंकि फ़ाइल पढ़ते समय यह स्वचालित रूप से एन्कोडिंग का अनुमान लगा सकता है
*   मॉड्यूल को पैकेज करना और उसे बाहरी रूप से प्रकाशित करना या प्राप्त करना भी संभव है।
*   *WSH* की तुलना में त्रुटि विवरण अधिक दयालुतापूर्वक प्रदर्शित करें

# ज्ञात मुद्दे जिन्हें *wes* हल नहीं कर सकते

*   `WScript.Quit` प्रोग्राम को निरस्त नहीं कर सकता और कोई त्रुटि कोड नहीं लौटाता
*   एसिंक्रोनस प्रोसेसिंग ठीक से काम नहीं करती
*   आप `WScript.CreateObject` के दूसरे तर्क के *event prefix* उपयोग नहीं कर सकते

# डाउनलोड करना

*wes* केवल *wes.js* फ़ाइल की आवश्यकता है। डाउनलोड करने के लिए, [*@wachaon/wes*](https://github.com/wachaon/wes) से *wes.js* कॉपी करें या कंसोल में निम्न कमांड चलाएँ।

```bat
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

*wes* एक कार्यान्वयन को अपनाता है जो रनटाइम पर *WScript.Shell* के `SendKeys` का उपयोग करता है। यदि निर्देशिका का पथ जहां *wes.js* संग्रहीत है, में गैर-ASCII वर्ण हैं, `SendKeys` कुंजियाँ सही ढंग से भेजने में सक्षम नहीं होगा और स्क्रिप्ट नहीं चलेगी। इसलिए, सुनिश्चित करें कि जिस पथ पर आप *wes.js* संग्रहीत करते हैं उसमें केवल ASCII वर्ण हों। वैकल्पिक रूप से, यदि आपने पहले ही *wes.js* डाउनलोड कर लिया है, तो आप नीचे दिए गए आदेश का उपयोग करके इसे अपडेट कर सकते हैं।

```bat
wes update
```

# *wes* कैसे शुरू करें

`wes` कीवर्ड और फ़ाइल को निर्दिष्ट करने वाला कमांड दर्ज करें जो कंसोल पर प्रोग्राम का शुरुआती बिंदु होगा। स्क्रिप्ट एक्सटेंशन *.js* को छोड़ा जा सकता है।

```bat
wes index
```

*wes* सीधे कंसोल पर स्क्रिप्ट इनपुट और निष्पादित कर सकता है। यदि आप इसे केवल `wes` से शुरू करते हैं, तो आप सीधे स्क्रिप्ट दर्ज कर सकते हैं और निष्पादित कर सकते हैं।

```bat
wes
```

जब तक आप दो रिक्त पंक्तियाँ दर्ज नहीं करते तब तक *REP* स्क्रिप्ट इनपुट स्वीकार करता है। आप *REP* *README.md* में उदाहरण स्क्रिप्ट चलाते हुए भी देख सकते हैं।

## कमांड लाइन विकल्प

*wes* स्टार्टअप विकल्प इस प्रकार हैं।

| नाम                | विवरण                                                |
| ------------------ | ---------------------------------------------------- |
| `--monotone`       | *ANSI escape code* हटा देता है                       |
| `--transpile`      | हमेशा *babel-standalone* के साथ कनवर्ट करें और चलाएं |
| `--debug`          | स्क्रिप्ट को डिबग मोड में चलाएँ                      |
| `--encoding=UTF-8` | पहली पढ़ी गई फ़ाइल की एन्कोडिंग निर्दिष्ट करता है    |
| `--arch=x86`       | यह विकल्प *wes* द्वारा स्वचालित रूप से जोड़ा जाता है |

# मॉड्यूल प्रणाली

*wes* दो मॉड्यूल सिस्टम का समर्थन करता है, *commonjs module* सिस्टम `require()` का उपयोग करता है और *es module* सिस्टम `import` उपयोग करता है। ( *dynamic import* समर्थित नहीं है क्योंकि यह एक अतुल्यकालिक प्रक्रिया है)

## *commonjs module*

`module.exports` को असाइन करके और `require()` पर कॉल करके मॉड्यूल प्रबंधित करें। `./` और `../` से शुरू होने वाले पूर्ण पथों और सापेक्ष पथों के अलावा अन्य पथ *wes\_modules* निर्देशिका और सुविधाजनक रूप से *node\_modules* निर्देशिका में मॉड्यूल की तलाश करते हैं। *wes* की `require()` स्वचालित रूप से मॉड्यूल फ़ाइल के एन्कोडिंग का अनुमान लगाती है, लेकिन यदि यह सही ढंग से अनुमान नहीं लगाता है तो आप दूसरे तर्क के साथ एन्कोडिंग निर्दिष्ट कर सकते हैं।

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

इसके अलावा, `require('WScript.Shell')` जैसे *COM Object* के लिए *require* के साथ आयात करना संभव है।

```javascript
const Shell = require('Shell.Application')
Shell.MinimizeAll()
WScript.Sleep(2000)
Shell.UndoMinimizeAll()
```

## *es module*

*Chakra* , स्क्रिप्ट निष्पादन इंजन, `imoprt` जैसे वाक्यविन्यास की व्याख्या करता है, लेकिन इसे *cscript* वातावरण में निष्पादित नहीं किया जाता है। *wes* अंतर्निहित मॉड्यूल में *babel* जोड़कर, *es module* एक-एक करके स्थानांतरित करते समय भी निष्पादित किया जाता है। यह ओवरहेड प्रसंस्करण और फूली हुई *wes.js* फ़ाइल की लागत पर आता है। *es module* में लिखे गए मॉड्यूल को भी ट्रांसपिलिंग द्वारा `require()` में परिवर्तित किया जाता है, इसलिए *COM Object* कॉल करना संभव है। हालाँकि, यह *es module* के साथ मॉड्यूल फ़ाइल की एन्कोडिंग को निर्दिष्ट करने का समर्थन नहीं करता है। सब कुछ स्वचालित रूप से लोड हो जाता है. इसे *es module* के रूप में लोड करने के लिए, एक्सटेंशन को `.mjs` पर सेट करें या `package.json` में `"type"` फ़ील्ड को `"module"` पर सेट करें।

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

*wes* *built-in objects* हैं *WSH (JScript)* में नहीं पाए जाते हैं।

## *console*

*wes* `WScript.Echo()` और `WScript.StdErr.WriteLine()` के बजाय *console* उपयोग करते हैं।

### *console.log*

`console.log()` के साथ कंसोल पर आउटपुट वर्ण। यह स्वरूपित स्ट्रिंग्स का भी समर्थन करता है। `%` फ़ॉर्मेटिंग ऑपरेटर का उपयोग करके एक स्वरूपित स्ट्रिंग को आउटपुट करता है। (फ़ॉर्मेटिंग ऑपरेटर अन्य विधियों के लिए भी मान्य हैं।)

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
| `%o`               | ऑब्जेक्ट डंप                     |
| `%O`               | ऑब्जेक्ट डंप (इंडेंटेड/रंगीन)    |

*wes* रंगीन स्ट्रिंग्स को आउटपुट करने के लिए `WScript.StdErr.WriteLine` के बजाय `WScript.StdOut.WriteLine` उपयोग करता है। `WScript.Echo` और `WScript.StdOut.WriteLine` अवरुद्ध हैं। `WScript.StdErr.WriteLine` या `console.log` उपयोग करें।

### *console.print*

`console.log()` आम तौर पर अंत में एक नई पंक्ति शामिल होती है, लेकिन `console.print` ऐसा नहीं होता है।

### *console.debug*

कंसोल पर आउटपुट केवल तभी जब `--debug` विकल्प सक्षम हो।

### *console.error*

संदेश के रूप में सामग्री के साथ एक अपवाद फेंकें।

### *console.weaklog*

यदि कोई अगला आउटपुट होता है तो `console.weaklog()` के साथ मुद्रित स्ट्रिंग्स कंसोल से गायब हो जाती हैं। आउटपुट स्विच करने के लिए उपयोगी.

## *Buffer*

आप बफ़र्स को संभाल सकते हैं.

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log('%s %O', content, buff)
```

## `__dirname` और `__filename`

`__filename` वर्तमान में निष्पादित मॉड्यूल फ़ाइल का पथ संग्रहीत करता है। `__dirname` में `__filename` की निर्देशिका शामिल है।

```javascript
const message = `dirname: ${__dirname}\nfilename: ${ __filename}`
console.log(message)
```

## *setTimeout* *setInterval* *setImmediate* *Promise*

चूंकि *wes* सिंक्रोनस प्रोसेसिंग के लिए एक निष्पादन वातावरण है, *setTimeout* *setInterval* *setImmediate* *Promise* एसिंक्रोनस प्रोसेसिंग के रूप में कार्य नहीं करता है, लेकिन इसे उन मॉड्यूल का समर्थन करने के लिए कार्यान्वित किया जाता है जो *Promise* कार्यान्वयन मानते हैं।

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

# अंतर्निर्मित मॉड्यूल

बुनियादी प्रसंस्करण को सरल और मानकीकृत करने के लिए *wes* के पास *built-in modules* हैं।

## अंतर्निहित मॉड्यूल को हटाया जाना है

फ़ाइल को हल्का और रखरखाव में आसान बनाने के लिए कुछ अंतर्निहित मॉड्यूल को बाहरी मॉड्यूल में बदलें।

*   *animate.js*
*   *day.js*
*   *debug.js*
*   *log.js*

उपरोक्त मॉड्यूल को क्रमशः `@wachaon/animate` `@wachaon/day` `@wachaon/debug` `@wachaon/log` के रूप में स्थापित किया जा सकता है।

## *ansi*

`ansi` *ANSI escape code* है जो मानक आउटपुट रंग और प्रभाव बदल सकता है। उपयोग किए गए कंसोल एप्लिकेशन के प्रकार और सेटिंग्स के आधार पर रंग और प्रभाव भिन्न हो सकते हैं।

```javascript
const { redBright, yellow } = require('ansi')
const message = 'File does not exist'
console.log(redBright + 'Error: ' + yellow + message)
```

आप `ansi.color()` और `ansi.bgColor()` के साथ अपने खुद के रंग भी बना सकते हैं। तर्क *RGB* जैसे `255, 165, 0` *color code* जैसे `'#FFA500'` का उपयोग करते हैं। `orange` जैसे *color name* समर्थित नहीं हैं.

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

## *argv*

कमांड लाइन तर्क प्राप्त करें. `cscript.exe` की कमांड लाइन तर्क `/` के साथ नामित तर्क घोषित करते हैं, जबकि *wes* `-` और `--` के साथ नामित तर्क घोषित करते हैं। *argv.unnamed* और *argv.named* कमांड लाइन तर्क मान प्रकार को *String* *Number* *Boolean* में डाल दिया। *REP* के साथ कमांड लाइन तर्क दर्ज करें।

```bat
wes REP aaa -bc dd --e=false --gh=iii jjj --klm nn -o --p 9 r
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

पथों में हेरफेर करें. `/` और `\` से शुरू होने वाले पथ आम तौर पर ड्राइव रूट से संबंधित होते हैं। उदाहरण के लिए `/filename` और `C:/filename` एक ही पथ हो सकते हैं। सुरक्षा कारणों से, *wes* कार्यशील निर्देशिका के सापेक्ष `/` और `\` से शुरू होने वाले पथों की व्याख्या करता है।

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

## *filesystem*

फ़ाइलों और निर्देशिकाओं में हेरफेर करें. `readTextFileSync()` स्वचालित रूप से फ़ाइल की एन्कोडिंग का अनुमान लगाता है और उसे पढ़ता है। (भले ही `readFileSync()` का दूसरा `encode` `auto` पर सेट हो, इसका अनुमान स्वचालित रूप से लगाया जाएगा।)

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
// const contents = fs.readFileSync(readme, 'auto')
console.log(contents)
```

## *chardet*

मैं <https://github.com/runk/node-chardet> से कुछ सुविधाओं का उपयोग कर रहा हूं। आप एन्कोडिंग-विशिष्ट वर्णों को बढ़ाकर ऑटो-अनुमान लगाने की सटीकता बढ़ा सकते हैं।

## *JScript*

यदि आप स्क्रिप्ट इंजन को *Chakra* में बदलते हैं, तो आप *JScript* विशिष्ट *Enumerator* आदि का उपयोग नहीं कर पाएंगे। अंतर्निहित मॉड्यूल *JScript* उन्हें उपलब्ध कराता है। हालाँकि, *Enumerator* *Array* लौटाता है, *Enumerator object* नहीं।

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

*VBScript* कुछ सुविधाएँ प्रदान करता है जो *JScript* नहीं करता है।

```javascript {"testing": true}
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO)) // => "FileSystemObject"
```

## *httprequest*

*httprequest* *http request* जारी करता है।

```javascript {"testing": true}
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

*minitest* सरल परीक्षण लिख सकता है। संस्करण `0.10.71` से, हम मूल अवधारणा पर वापस गए और अभिकथनों के प्रकारों को घटाकर 3 प्रकार कर दिया।

`describe` के साथ समूह बनाएं, `it` साथ परीक्षण करें और `assert` के साथ सत्यापित करें। `pass` `it` घटनाओं की संख्या और पासों की संख्या की एक सरणी होगी।

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

### इस प्रकार के दावे

सरलता के लिए वस्तुओं की तुलना करने के लिए केवल तीन अभिकथन कार्य हैं।

#### `assert(value, message)` `assert.ok(value, message)`

सख्त समानता ऑपरेटर `===` के साथ `true` की तुलना करें। यदि `value` एक फ़ंक्शन है, तो फ़ंक्शन निष्पादित करने के परिणाम का मूल्यांकन करें।

| परम       | प्रकार                | विवरण                              |
| :-------- | :-------------------- | :--------------------------------- |
| `value`   | `{Function\|Boolean}` | बूलियन या बूलियन-रिटर्निंग फ़ंक्शन |
| `message` | `{String}`            | विफलता के मामले में संदेश          |

#### `assert.equal(expected, actual)`

सदस्य समानता के लिए वस्तुओं की तुलना करता है, संदर्भ के आधार पर नहीं।\
NaN `true` `NaN === NaN` `function (){} === function (){}` `/RegExp/g === /RegExp/g` `{one: {two: 2}} === {one: {two: 2}}` `[1,2,3] === [1,2,3]` आदि।\
कक्षाओं (वस्तुओं) की तुलना करते समय, उनके पास एक ही कंस्ट्रक्टर या एक सुपरक्लास होना चाहिए जिसका `actual` `expected` है।

| परम        | प्रकार  | विवरण          |
| :--------- | :------ | :------------- |
| `expected` | `{Any}` | अपेक्षित मूल्य |
| `actual`   | `{Any}` | असल मूल्य      |

#### `assert.throws(value, expected, message)`

सत्यापित करें कि त्रुटि सही ढंग से डाली जा रही है।\
त्रुटि सही है या नहीं यह इस बात से निर्धारित होता है कि अपेक्षित त्रुटि *constructor* , *message* बराबर है या नहीं, और रेगुलर एक्सप्रेशन *stack* मूल्यांकन से गुजरता है।

| परम        | प्रकार                    | विवरण                                                                                             |
| :--------- | :------------------------ | :------------------------------------------------------------------------------------------------ |
| `value`    | `{Error}`                 | गलती                                                                                              |
| `expected` | `{Error\|String\|RegExp}` | एक नियमित अभिव्यक्ति जो अपेक्षित त्रुटि *constructor* , *message* या *stack* का मूल्यांकन करती है |
| `message`  | `{String}`                | विफलता पर संदेश                                                                                   |

## *pipe*

*pipe* पाइपिंग को सरल बनाता है। एक या एकाधिक *converter* के साथ *data* परिवर्तित करते समय परिणाम आउटपुट होता है। *ver 0.12.75* से आगे, इसे सीधे कमांड लाइन से शुरू किया जा सकता है।

### *pipe* एक मॉड्यूल के रूप में प्रारंभ करें

रूपांतरण फ़ंक्शन को *pipe* विधि के `use(converter)` तर्क में रखें और `process(data, callback(error, result))` के साथ डेटा इनपुट और पोस्ट-रूपांतरण प्रसंस्करण का वर्णन करें। यदि कोई `callback` निर्दिष्ट नहीं है, तो रिटर्न मान *promise* होगा, और प्रसंस्करण को `then(result)` और `catch(error)` के साथ जोड़ा जा सकता है।

```javascript {"testing": true}
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

`use(converter)` के अलावा, `.filter(callbackFn(value, index))` और `map(callbackFn(value, index))` जैसी विधियां भी हैं। प्रत्येक *data* एक स्ट्रिंग, एक सरणी और एक ऑब्जेक्ट है।

```javascript {"testing": true}
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

### कमांड लाइन से *pipe* शुरू करना

कमांड लाइन से, `pipe` के बाद क्रम में रूपांतरण फ़ंक्शन दर्ज करें। रूपांतरण फ़ंक्शन के तर्कों को रूपांतरण फ़ंक्शन के समान नाम के साथ नामित कमांड-लाइन तर्कों के मान के रूप में दर्ज किया जाता है। `=>` को `JSON.parse()` `eval()` से पार्स किया जाता `(` `)` *WSH* कमांड लाइन तर्कों में `"` को बाध्य करता है। उस स्थिति में, `eval()` से पार्स न करें)

```bash
wes pipe swap merge --input="sample.txt" --output="" --swap="[2, 0, 1, 3]" --merge=4
```

यह कमांड स्क्रिप्ट के समतुल्य है:

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

स्क्रिप्ट प्रकार निर्धारित करें.

```javascript {"testing": true}
const { isString, isNumber, isBoolean, isObject } = require('typecheck')
console.log(() => isString("ECMAScript")) /* => true */
console.log(() => isNumber(43.5)) /* => true */
console.log(() => isBoolean(false)) /* => true */
console.log(() => isObject(function(){})) /* => false */
```

## *getMember*

कंसोल में उपयोग किए जाने पर *ProgID* से *COM Object* सदस्य प्रकार और विवरण प्राप्त करता है।

```bat
wes getMember "Scripting.FileSystemObject"
```

जब एक मॉड्यूल के रूप में उपयोग किया जाता है, तो इसे इंस्टेंस के सदस्यों का प्रकार और विवरण मिलता है। यदि मॉड्यूल के रूप में उपयोग किया जाता है, तो आप उन वस्तुओं के बारे में जानकारी प्राप्त कर सकते हैं जिनकी पुष्टि *WSH (Windows Script Host)* से नहीं की जा सकती है।

```javascript
const getMember = require('getMember')
const SWbemServicesEx = require("WbemScripting.SWbemLocator").ConnectServer()
getMember(SWbemServicesEx)
```

## *ps*

*PowerShell* चलाने की सुविधा प्रदान करता है।

### `ps(source, option)`

`source` *PowerShell* स्क्रिप्ट चलाएँ।

कंसोल में cmdlet की एक सूची प्रदर्शित करें।

```javascript
const ps = require('ps')
 
console.log(ps("Get-Command"))
```

यदि *Google Cherome* विंडो है, तो विंडो का आकार और स्थिति बदलें। (यह पूर्ण स्क्रीन मोड में काम नहीं करता है।)

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

माउस की गति और क्लिक को नियंत्रित करता है।

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

स्क्रिप्ट को फ़ाइल के रूप में सहेजें या अपने अगले `REP` में पेस्ट करें।

```bat
wes REP pos 100 100
```

### कंसोल से सीधे *powershell* चलाएँ

कंसोल में निर्दिष्ट *.ps1* फ़ाइल निष्पादित करता है।

```bat
wes ps ./sample.ps1
```

आप `--Command` या `-c` विकल्प निर्दिष्ट करके किसी कमांड को सीधे निष्पादित भी कर सकते हैं।

वर्तमान निर्देशिका में फ़ाइलों की सूची प्रदर्शित करने का उदाहरण

```bat
wes ps --Command Get-ChildItem
```

## *zip*

फ़ाइलों और फ़ोल्डरों को संपीड़ित करता है और संपीड़ित फ़ाइलों को डीकंप्रेस करता है। आंतरिक रूप से, *PowerShell* कॉल किया जाता है और संसाधित किया जाता है।

```javascript
const {zip, unzip} = require('zip')
console.log(zip('docs\\*', 'dox.zip'))
console.log(unzip('dox.zip'))
```

एक वाइल्डकार्ड `*` `zip(path, destinationPath)` के `path` में लिखा जा सकता है। इसका उपयोग *CLI (Command Line Interface)* और *module* दोनों में किया जा सकता है।

```bat
wes zip docs\* dox.zip
wes zip -p dox.zip
```

यदि `path` एक्सटेंशन `.zip` है, `unzip()` संसाधित होता है, और एक्सटेंशन `.zip` का कोई विवरण नहीं है। वैकल्पिक रूप से, भले ही कोई एक्सटेंशन `.zip` यदि कोई वाइल्डकार्ड `*` विवरण है, `zip()` संसाधित किया जाएगा।

| अज्ञात | विवरण                              |
| ------ | ---------------------------------- |
| `1`    | दर्ज करने के लिए `path` या फ़ाइल   |
| `2`    | आउटपुट `dest` के लिए फ़ोल्डर फ़ाइल |

| नाम      | संक्षिप्त नाम | विवरण                              |
| -------- | ------------- | ---------------------------------- |
| `--path` | `-p`          | दर्ज करने के लिए `path` या फ़ाइल   |
| `--dest` | `-d`          | आउटपुट `dest` के लिए फ़ोल्डर फ़ाइल |

# बंडलिंग (पैकेजिंग) और मॉड्यूल स्थापित करना

*wes* , कई मॉड्यूल के बंडल को पैकेज कहा जाता है। आप *github* पर प्रकाशित *wes* के लिए पैकेज इंस्टॉल कर सकते हैं। किसी पैकेज को प्रकाशित करने के लिए *github repository* की आवश्यकता होती है।

## *bundle*

*github* पर एक पैकेज प्रकाशित करते समय, *bundle* आवश्यक मॉड्यूल को बंडल करता है और *bundle.json* बनाता है।

1.  एक *repository* में केवल एक पैकेज प्रकाशित किया जा सकता है

2.  *package.json* आवश्यक है. कम से कम, `main` क्षेत्र का विवरण आवश्यक है।

    ```json
     { "main": "index.js" }
    ```

3.  यदि आप पैकेज प्रकाशित करना चाहते हैं तो रिपॉजिटरी को *public* करें

4.  `version 0.12.0` से शुरू करके, कार्यशील निर्देशिका के ऊपर की निर्देशिका में सीधे मॉड्यूल लोड करने वाले पैकेजों को बंडल नहीं किया जाएगा। ऊपरी निर्देशिका *wes\_modules* या *node\_modules* में पैकेज बंडल किए जा सकते हैं।

बंडल करने के लिए निम्नलिखित कमांड दर्ज करें: क्या बंडल करना है इसके लिए *package.json* देखें।

```bat
wes bundle 
```

## *init*

कुछ आइटम दर्ज करें और यह उस जानकारी से *package.json* बनाएगा।

```bat
wes init
```

## *install*

*github* पर प्रकाशित *wes* के लिए पैकेज स्थापित करने के लिए उपयोग किया जाता है। `version 0.10.28` से, इंस्टॉलेशन फ़ोल्डर को `node_modules` से `wes_modules` में बदल दिया गया है। यदि आप `node_modules` में इंस्टॉल करना चाहते हैं तो `--node` विकल्प जोड़ें। `version 0.12.0` से प्रारंभ करके, फ़ाइलों को *bandle.json* से अनज़िप किया जाएगा और सहेजा जाएगा। विनिर्देश परिवर्तनों के कारण, `version 0.12.0` के साथ बंडल किए गए पैकेज `version 0.12.0` के साथ सही ढंग से स्थापित नहीं हो सकते हैं।

`@author/repository` फ़ॉर्म में *install* के लिए तर्क पास करें।

```bat
wes install @wachaon/fmt
```

*install* विकल्प हैं।

| नाम           | संक्षिप्त नाम | विवरण                                                                          |
| ------------- | ------------- | ------------------------------------------------------------------------------ |
| `--bare`      | `-b`          | *@author* फ़ोल्डर न बनाएं                                                      |
| `--global`    | `-g`          | पैकेज को उस फ़ोल्डर में स्थापित करें जहां *wes.js* है                          |
| `--save`      | `-S`          | *package.json* में *dependencies* फ़ील्ड में पैकेज का नाम और संस्करण जोड़ें    |
| `--save--dev` | `-D`          | *package.json* में *devDependencies* फ़ील्ड में पैकेज का नाम और संस्करण जोड़ें |
| `--node`      | `-n`          | *node\_module* फ़ोल्डर में स्थापित करें                                        |

`--bare` विकल्प `@author/repository` से `repository` तक `require` तर्क को हटा सकता है। `--global` विकल्प स्थापित पैकेजों को सभी स्क्रिप्ट के लिए उपलब्ध कराता है।

```bat
wes install @wachaon/fmt --bare
```

# निजी रिपॉजिटरी से पैकेज इंस्टॉल करना

*install* न केवल सार्वजनिक *github* रिपॉजिटरी से पैकेज इंस्टॉल कर सकता है, बल्कि निजी रिपॉजिटरी से भी पैकेज इंस्टॉल कर सकता है। *install* में, *@author/repository* के साथ पैकेज निर्दिष्ट करें। कार्यान्वयन निम्नलिखित यूआरएल डाउनलोड करने का प्रयास करता है।

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/bundle.json`
```

यदि आप किसी ब्राउज़र से निजी रिपॉजिटरी *raw* तक पहुंचते हैं, *token* प्रदर्शित किया जाएगा, इसलिए *token* प्रतिलिपि बनाएँ और इसका उपयोग करें। *token* वैध होने पर आप इसे कंसोल में चलाकर निजी रिपॉजिटरी से पैकेज भी इंस्टॉल कर सकते हैं।

```bat
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

# पैकेज परिचय

यहां कुछ बाहरी पैकेज हैं.

## *@wachaon/fmt*

स्क्रिप्ट को प्रारूपित *wes* के लिए *@wachaon/fmt* को *prettier* पैक किया गया है। इसके अलावा, यदि *@wachaon/fmt* स्थापित होने पर *Syntax Error* होती है, तो आप त्रुटि का स्थान बता सकते हैं।

### *@wachaon/fmt* इंस्टॉल करें

```bat
wes install @wachaon/fmt
```

यदि कार्यशील निर्देशिका में *.prettierrc* (JSON प्रारूप) है, तो यह सेटिंग्स में दिखाई देगा। *fmt* *CLI* और *module* दोनों में उपलब्ध है।

#### *CLI* के रूप में उपयोग करें।

```bat
wes @wachaon/fmt src/sample --write
```

| अनाम संख्या | विवरण                                                  |
| ----------- | ------------------------------------------------------ |
| 1           | आवश्यक। उस फ़ाइल का पथ जिसे आप फ़ॉर्मेट करना चाहते हैं |

| नाम       | संक्षिप्त नाम | विवरण                       |
| --------- | ------------- | --------------------------- |
| `--write` | `-w`          | अधिलेखित करने की अनुमति दें |

यदि `--write` या `-w` नामित तर्क निर्दिष्ट है, तो फ़ाइल को स्वरूपित स्क्रिप्ट के साथ अधिलेखित करें।

#### एक मॉड्यूल के रूप में उपयोग करें

```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')
const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```

## *@wachaon/edge*

*Internet Explorer* 15 जून, 2022 को समर्थन समाप्त कर देगा। परिणामस्वरूप, यह उम्मीद की जाती है कि `require('InternetExplorer.Application')` के साथ एप्लिकेशन संचालन असंभव हो जाएगा। इसके अलावा, *Internet Explorer* के लिए समर्थन समाप्त करने से साइट स्वयं सही ढंग से प्रदर्शित नहीं हो पाएगी। एक विकल्प *web driver(msedgedriver.exe)* के माध्यम से *Microsoft Edge based on Chromium* संचालित करना होगा। `@wachaon/edge` *Edge* को सरल बनाता है।

### *@wachaon/edge* इंस्टॉल करें

सबसे पहले पैकेज इंस्टॉल करें.

```bat
wes install @wachaon/edge --bare
```

फिर *web driver(msedgedriver.exe)* डाउनलोड करें।

```bat
wes edge --download
```

स्थापित *Edge* संस्करण की जाँच करें और संबंधित *web driver* डाउनलोड करें।

### *@wachaon/edge* उपयोग कैसे करें

इसे इस्तेमाल करना आसान होगा. अपना ब्राउज़र प्रारंभ करें और विंडो आकार और डिस्प्ले साइट को `https://www.google.com` में बदलें।

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

हम आपके विज़िट इतिहास को तब तक संग्रहीत करते हैं जब तक कि आपके ब्राउज़र का *URL* `https://www.yahoo` से शुरू न हो जाए।

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

*edge* विज़िट किए गए *URL* क्रम में कंसोल पर प्रिंट करता है। `@wachaon/edge` *URL* के लिए ईवेंट पंजीकृत करता है और `res.exports` में डेटा जोड़ता है। पंजीकृत किया जाने वाला *URL* या तो `String` `RegExp` हो सकता है, और इसे लचीले ढंग से सेट किया जा सकता है। इसे ईवेंट-संचालित बनाकर, आप उन प्रक्रियाओं के लिए ईवेंट सेट न करके मैन्युअल ऑपरेशन पर आसानी से स्विच कर सकते हैं जिन्हें ऑटोपायलट के साथ संभालना मुश्किल है। यदि आप चाहते हैं कि स्क्रिप्ट बंद हो जाए, तो `navi.emit('terminate', res)` चलाएँ या *Edge* मैन्युअल रूप से समाप्त करें। अंतिम रूप से डिफ़ॉल्ट रूप से *.json* फ़ाइल के रूप में `res.exports` आउटपुट होता है। यदि आप समाप्ति प्रसंस्करण सेट करना चाहते हैं, तो किनारे का `terminate` `edge(callback, terminate)` सेट करें। `window` *@wachaon/webdriver* की *Window* क्लास का उदाहरण है, ब्राउज़र की `window` का नहीं।

## *@wachaon/webdriver*

यह एक पैकेज होगा जो ब्राउज़र को संचालित करने वाले *web driver* को अनुरोध भेजता है। *@wachaon/edge* में *@wachaon/webdriver* शामिल है।

### *@wachaon/webdriver* स्थापित करें

```bat
wes install @wachaon/webdriver --bare
```

यदि आपके पास *Chromium* आधारित *Microsoft Edge* *web driver(msedgedriver.exe)* नहीं है तो उसे डाउनलोड करें। साथ ही, यदि *edge* का संस्करण और *web driver(msedgedriver.exe)* अलग-अलग हैं, तो *web driver(msedgedriver.exe)* डाउनलोड करें।

```bat
wes webdriver --download
```

### *@wachaon/webdriver* उपयोग कैसे करें

[*yahoo JAPAN*](https://www.yahoo.co.jp/) साइट पर जाएं और एक विशिष्ट ब्लॉक तत्व का स्क्रीनशॉट सहेजें।

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
