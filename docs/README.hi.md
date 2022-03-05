# *WES*


*wes* एक कंसोल फ्रेमवर्क है जो *WSH (Windows Script Host)* पर *ECMAScript* चलाता है।


*README* का मूल पाठ [*japanese*](/README.md) है। जापानी के अलावा, यह एक मशीनी अनुवादित वाक्य है।  
कृपया निम्नलिखित में से अन्य भाषाओं में वाक्यों का चयन करें।


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


-   आप स्क्रिप्ट इंजन को *Chakra* में बदल सकते हैं और इसे *ECMAScript2015* विनिर्देश में लिख सकते हैं
-   यह हमेशा 32 बिट *cscript.exe* चलाता है, इसलिए 64 बिट वातावरण में कोई अंतर्निहित समस्या नहीं है।
-   एक मॉड्यूलर प्रणाली के साथ, आप पारंपरिक *WSH* की तुलना में अधिक कुशलता से विकसित कर सकते हैं
-   बिल्ट-इन मॉड्यूल मूल प्रसंस्करण जैसे फ़ाइल इनपुट / आउटपुट और कंसोल में रंगीन वर्णों के आउटपुट का समर्थन करता है।
-   आपको एन्कोडिंग के बारे में चिंता करने की ज़रूरत नहीं है क्योंकि आप फ़ाइल को स्वचालित रूप से एन्कोडिंग का अनुमान लगा सकते हैं।
-   हम बाहरी प्रकाशन और पुनर्प्राप्ति का समर्थन करने के लिए मॉड्यूल भी पैकेज करते हैं।


# ज्ञात मुद्दे *wes* हल नहीं कर सकते


-   `WScript.Quit` प्रोग्राम को बाधित नहीं कर सकता है और एक त्रुटि कोड नहीं लौटाता है
-   एसिंक्रोनस प्रोसेसिंग जैसे `setTimeout` और `Promise` संभव नहीं है
-   आप *event prefix* का उपयोग WScript के दूसरे तर्क के रूप में नहीं कर सकते। `WScript.CreateObject`


# इंस्टॉल


*wes.js* *wes* की आवश्यकता है। डाउनलोड करने के लिए, *wes.js* को [*@wachaon/wes*](https://github.com/wachaon/wes) से कॉपी करें या कंसोल में निम्न कमांड चलाएँ।


```bat
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```


*WScript.Shell* एक कार्यान्वयन के रूप में रनटाइम पर *wes* से `SendKeys` का उपयोग करता है। यदि निर्देशिका का पथ जहां *wes.js* सहेजा गया है, उसमें *ascii* के अलावा अन्य वर्ण हैं, तो `SendKeys` कुंजी को सही ढंग से भेजने में सक्षम नहीं होगा और स्क्रिप्ट निष्पादित करने में सक्षम नहीं होगी।  
कृपया केवल *ascii* *wes.js* का गंतव्य सहेजें पथ कॉन्फ़िगर करें।


# कैसे इस्तेमाल करे


कंसोल में कमांड दर्ज करें जो उस फ़ाइल को निर्दिष्ट करता है जो `wes` कीवर्ड के बाद प्रोग्राम का शुरुआती बिंदु होगा। स्क्रिप्ट एक्सटेंशन *.js* को छोड़ा जा सकता है।


```bat
wes index
```


साथ ही, *wes* में *REP* है, इसलिए यदि आप इसे केवल `wes` से प्रारंभ करते हैं, तो आप सीधे स्क्रिप्ट दर्ज कर सकते हैं।


```bat
wes
```


जब तक आप दो रिक्त पंक्तियाँ दर्ज नहीं करते तब तक *REP* स्क्रिप्ट इनपुट स्वीकार करता है। आप *REP* के साथ *README.md* में नमूना स्क्रिप्ट के निष्पादन की जांच भी कर सकते हैं।


## कमांड लाइन विकल्प


*wes* के लिए स्टार्टअप विकल्प इस प्रकार हैं।


| नामित              | विवरण                                                     |
| ------------------ | --------------------------------------------------------- |
| `--monotone`       | *ANSI escape code* को हटा दें                             |
| `--safe`           | स्क्रिप्ट को सुरक्षित मोड में चलाएँ                       |
| `--usual`          | स्क्रिप्ट को सामान्य मोड में चलाएँ (डिफ़ॉल्ट)             |
| `--unsafe`         | स्क्रिप्ट को असुरक्षित मोड में चलाएँ                      |
| `--dangerous`      | स्क्रिप्ट को खतरनाक मोड में चलाएं                         |
| `--debug`          | स्क्रिप्ट को डिबग मोड में चलाएँ                           |
| `--encoding=UTF-8` | पढ़ने के लिए पहली फ़ाइल के एन्कोडिंग को निर्दिष्ट करता है |
| `--engine=Chakra`  | यह विकल्प स्वचालित रूप से *wes* . द्वारा जोड़ा जाता है    |


`--safe` `--usual` `--unsafe` `--dangerous` `--debug` का कार्यान्वयन अधूरा है, लेकिन नामित तर्क आरक्षित हैं।


# वैकल्पिक प्रणाली


*wes* दो मॉड्यूल सिस्टम का समर्थन करता है, एक *commonjs module* सिस्टम जो `require()` का उपयोग करता है और एक *es module* जो `import` का उपयोग करता है। ( *dynamic import* अतुल्यकालिक प्रसंस्करण है, इसलिए यह समर्थित नहीं है)


## *commonjs module*


`module.exports` को असाइन करके और `require()` के साथ कॉल करके मॉड्यूल प्रबंधित करें। सुविधा के लिए, यह *node_modules* निर्देशिका का भी समर्थन करता है।


*wes* `require()` स्वचालित रूप से मॉड्यूल फ़ाइल के एन्कोडिंग का अनुमान लगाता है, लेकिन अगर यह सही ढंग से अनुमान नहीं लगाता है, तो आप दूसरे तर्क के साथ एन्कोडिंग निर्दिष्ट कर सकते हैं।


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


आप *require* `require('WScript.Shell')` साथ *ActiveX* में भी आयात कर सकते हैं।


```javascript
const Shell = require('Shell.Application')
Shell.MinimizeAll()
WScript.Sleep(2000)
Shell.UndoMinimizeAll()
```


## *es module*


*Chakra* , जो स्क्रिप्ट का निष्पादन इंजन है, सिंटैक्स की व्याख्या करता है जैसे कि `imoprt` , लेकिन इसे निष्पादित नहीं किया जा सकता क्योंकि ऐसा इसलिए है क्योंकि `cscript` के रूप में प्रसंस्करण विधि परिभाषित नहीं है। *wes* में, बिल्ट-इन मॉड्यूल में बेबेल जोड़कर, हम इसे *es module* में क्रमिक रूप से *babel* करते हुए निष्पादित कर रहे हैं। परिणामस्वरूप, प्रोसेसिंग ओवरहेड और *wes.js* फ़ाइल लागत के रूप में फूली हुई है।


*es module* द्वारा वर्णित मॉड्यूल को भी `require()` में स्थानांतरित किया जाता है, इसलिए *ActiveX* कॉल संभव हैं। हालांकि, यह *es module* में मॉड्यूल फ़ाइल एन्कोडिंग विनिर्देश का समर्थन नहीं करता है। सभी स्वचालित अनुमान लगाकर पढ़े जाते हैं।


इसे *es module* के रूप में लोड करने के लिए, एक्सटेंशन को `.mjs` या `package.json` के `"type"` फ़ील्ड को `"module"` पर सेट करें।


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


*wes* में *built-in objects* जो *WSH (JScript)* में नहीं हैं।


## *console*


`WScript.Echo` *wes* या `WScript.StdErr.WriteLine` के बजाय *console* का उपयोग करता है।


`console.log` में कंसोल में वर्ण प्रिंट करें। यह स्वरूपित तारों का भी समर्थन करता है। फ़ॉर्मेटिंग ऑपरेटर `%` का उपयोग करके एक स्वरूपित स्ट्रिंग को प्रिंट करता है।


```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```


\|


`WScript.StdOut.WriteLine` के *wes* `WScript.StdErr.WriteLine` का उपयोग करता है। `WScript.Echo` और `WScript.StdOut.WriteLine` को आउटपुट से ब्लॉक कर दिया गया है। `WScript.StdErr.WriteLine` या `console.log` का उपयोग करें।


## *Buffer*


बफर संभाल सकते हैं।


```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```


## `__dirname` और `__filename`


`__filename` में वर्तमान में चल रहे मॉड्यूल फ़ाइल का पथ शामिल है। `__dirname` में `__filename` की निर्देशिका है।


```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```


# अंतर्निहित मॉड्यूल


*wes* में बुनियादी प्रसंस्करण को सरल और मानकीकृत करने के लिए *built-in modules* हैं।


## *ansi*


`ansi` एक *ANSI escape code* है जो आपको मानक आउटपुट के रंग और प्रभाव को बदलने की अनुमति देता है। उपयोग किए गए कंसोल एप्लिकेशन के प्रकार और सेटिंग्स के आधार पर रंग और प्रभाव भिन्न हो सकते हैं।


```javascript
const { redBright, yellow } = require('ansi')
const message = 'File does not exist'
console.log(redBright + 'Error: ' + yellow + message)
```


आप `ansi.color()` और `ansi.bgColor()` के साथ अपना खुद का रंग भी बना सकते हैं। तर्क *RGB* जैसे `255, 165, 0` या *color code* जैसे `'#FFA500'` उपयोग करता है। यह `orange` जैसे *color name* का समर्थन नहीं करता है।


```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```


## *argv*


कमांड लाइन तर्क प्राप्त करता है। `cscript.exe` में कमांड लाइन तर्क `/` के साथ नामित तर्क घोषित करते हैं `--` जबकि *wes* नामित तर्क `-` और - के साथ घोषित करते हैं।


*argv.unnamed* और *argv.named* ने *String* *Number* *Boolean* में से किसी एक को कमांड लाइन तर्क के मान प्रकार को कास्ट किया।


*REP* के साथ कमांड लाइन तर्क दर्ज करें।


```bat
wes REP aaa -bcd eee --fgh=iii jjj --kln mmm
```


निम्न स्क्रिप्ट को *REP* में चलाएँ।


```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```


## *pathname*


पथ का संचालन करें।


`/` और `\` से शुरू होने वाले पथ आमतौर पर ड्राइव रूट के सापेक्ष पथ को संदर्भित करते हैं। उदाहरण के लिए, `/filename` और `C:/filename` का पथ समान हो सकता है। सुरक्षा कारणों से, `wes` कार्यशील निर्देशिका के सापेक्ष `/` और `\` से शुरू होने वाले पथों की व्याख्या करता है।


```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```


## *filesystem*


फाइलों और निर्देशिकाओं को संचालित करें। `readTextFileSync` स्वचालित रूप से फ़ाइल के एन्कोडिंग का अनुमान लगाता है और पढ़ता है।


```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```


## *chardet*


मैं <https://github.com/runk/node-chardet> की कुछ विशेषताओं का उपयोग कर रहा हूं।


आप एन्कोडिंग के लिए विशिष्ट वर्णों को बढ़ाकर स्वचालित अनुमान लगाने की सटीकता में सुधार कर सकते हैं।


## *JScript*


यदि आप स्क्रिप्ट इंजन को *Chakra* में बदलते हैं, तो आप *JScript* -विशिष्ट *Enumerator* आदि का उपयोग नहीं कर पाएंगे। बिल्ट-इन मॉड्यूल *JScript* उन्हें उपलब्ध कराता है। हालांकि, *Enumerator* *Enumerator object* के बजाय एक *Array* देता है।


```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```


*GetObject* `WScript.GetObject` के विकल्प के रूप में कार्य करता है।


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


*VBScript* कुछ सुविधाएँ प्रदान करता है जो *JScript* में नहीं है।


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


*minitest* सरल परीक्षण लिख सकता है।


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


*pipe* पाइप प्रसंस्करण को सरल करता है।


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


स्क्रिप्ट के प्रकार का निर्धारण करें।


```javascript
const { isString, isNumber, isBoolean, isObject } = require('typecheck')
const log = require('log')

log(() => isString("ECMAScript"))
log(() => isNumber(43.5))
log(() => isBoolean(false))
log(() => isObject(function(){}))
```


## *zip*


फ़ाइलों और फ़ोल्डरों को संपीड़ित करें और संपीड़ित फ़ाइलों को डीकंप्रेस करें। यह *PowerShell* को आंतरिक रूप से कॉल करता है और इसे संसाधित करता है।


```javascript
const {zip, unzip} = require('zip')

console.log(zip('docs\\*', 'dox.zip'))
console.log(unzip('dox.zip'))
```


वाइल्डकार्ड `*` को `zip(path, destinationPath)` के `path` में वर्णित किया जा सकता है।


इसका उपयोग *CLI (Command Line Interface)* और *module* दोनों के साथ किया जा सकता है।


```bat
wes zip docs\* dox.zip
wes zip -p dox.zip
```


यदि `path` में एक्सटेंशन `.zip` है, तो `unzip()` संसाधित हो गया है और एक्सटेंशन `.zip` का कोई विवरण नहीं है। या `.zip` एक्सटेंशन होने पर भी, यदि वाइल्डकार्ड `*` का वर्णन है, तो `zip()` संसाधित किया जाएगा।


| अज्ञात | विवरण                                    |
| ------ | ---------------------------------------- |
| `1`    | `path` फ़ोल्डर या फ़ाइल दर्ज करने के लिए |
| `2`    | आउटपुट के लिए फ़ोल्डर फ़ाइल `dest`       |


| नामित    | संक्षिप्त नाम | विवरण                                    |
| -------- | ------------- | ---------------------------------------- |
| `--path` | `-p`          | `path` फ़ोल्डर या फ़ाइल दर्ज करने के लिए |
| `--dest` | `-d`          | आउटपुट के लिए फ़ोल्डर फ़ाइल `dest`       |


# मॉड्यूल बंडलिंग और स्थापना


*wes* में, कई मॉड्यूल के बंडल को पैकेज कहा जाता है। आप *github* पर प्रकाशित *wes* के लिए पैकेज स्थापित कर सकते हैं। पैकेज को प्रकाशित करने के लिए आपको एक *github repository* की आवश्यकता होगी। साथ ही, रिपॉजिटरी का नाम और स्थानीय निर्देशिका का नाम समान होना चाहिए।


## *bundle*


पैकेज को *github* में प्रकाशित करते समय, *bundle* आवश्यक मॉड्यूल को बंडल करता है और प्रारूप को बदलता है ताकि इसे इंस्टॉलेशन द्वारा आयात किया जा सके।


सुरक्षा कारणों से, *bundle* एक *.json* फ़ाइल बनाता है क्योंकि *wes* आपको ऐसे प्रारूप में पैकेज आयात करने की अनुमति नहीं देता है जिसे सीधे निष्पादित किया जा सकता है।


पैकेजिंग के लिए कुछ शर्तें हैं।


1.  एक *repository* में केवल एक पैकेज प्रकाशित किया जा सकता है

2.  सुनिश्चित करें कि *github* पर रिपॉजिटरी का नाम और स्थानीय कार्यशील निर्देशिका का नाम समान है।

3.  यदि आप पैकेज प्रकाशित करते हैं, तो कृपया रिपॉजिटरी को *public* करें

4.  शीर्ष-स्तरीय दायरे में मॉड्यूल अधिग्रहण की घोषणा करें

5.  पैकेज *.json* फ़ाइल आपकी कार्यशील निर्देशिका में *directory_name.json* नाम से बनाई गई है। यदि आप फ़ाइल का नाम बदलते हैं या फ़ाइल को स्थानांतरित करते हैं, तो आप इसे इंस्टॉल करते समय संदर्भित नहीं कर सकते।

6.  `node_modules/directory_name` बंडल का प्रारंभिक बिंदु है

    ```bat
        wes bundle directory_name
    ```

    के साथ बंडल किए बिना

    ```bat
        wes bundle node_modules/directory_name
    ```

    कृपया साथ बंडल करें


## *install*


*github* पर प्रकाशित *wes* के पैकेज को स्थापित करने के लिए उपयोग किया जाता है।


### कैसे इस्तेमाल करे


`@author/repository` प्रारूप में *install* के लिए तर्क पास करें।


```bat
wes install @wachaon/fmt
```


*install* के विकल्प हैं।


| नामित         | संक्षिप्त नाम | विवरण                                                                                 |
| ------------- | ------------- | ------------------------------------------------------------------------------------- |
| `--bare`      | `-b`          | *@author* फोल्डर न बनाएं                                                              |
| `--global`    | `-g`          | पैकेज को उस फ़ोल्डर में स्थापित करें जहां *wes.js* है                                 |
| `--save`      | `-S`          | *package.json* के *dependencies* क्षेत्र में पैकेज का नाम और संस्करण जोड़ें           |
| `--save--dev` | `-D`          | पैकेज का नाम और संस्करण पैकेज में *package.json* फ़ील्ड में जोड़ें। *devDependencies* |


`--bare` विकल्प `author@repository` से `repository` में `require` तर्क को छोड़ सकता है। `--global` विकल्प संस्थापित पैकेज को सभी स्क्रिप्ट के लिए उपलब्ध कराता है। उपरोक्त विकल्पों को उसी समय निर्दिष्ट किया जाना चाहिए जब *wes* सुरक्षा विकल्प `--unsafe` or `--dangerous` ।


```bat
wes install @wachaon/fmt --bare --unsafe
```


# निजी रिपॉजिटरी में पैकेज स्थापित करना


*install* निजी रिपॉजिटरी में पैकेज के साथ-साथ *github* पर सार्वजनिक रिपॉजिटरी में पैकेज स्थापित कर सकता है।


*install* में, *@author/repository* के साथ पैकेज निर्दिष्ट करें। कार्यान्वयन निम्नलिखित यूआरएल डाउनलोड करने का प्रयास करेगा।


```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```


जब आप एक ब्राउज़र के साथ निजी भंडार के *raw* तक पहुँचते हैं, तो *token* प्रदर्शित किया जाएगा, इसलिए *token* की प्रतिलिपि बनाएँ और उसका उपयोग करें।


आप निजी रिपॉजिटरी में भी पैकेज को *token* के जीवनकाल में कंसोल में चलाकर स्थापित कर सकते हैं।


```bat
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```


# पैकेज परिचय


यहां कुछ बाहरी पैकेज दिए गए हैं।


## *@wachaon/fmt*


*@wachaon/fmt* *wes* के लिए एक *prettier* पैक है और स्क्रिप्ट को प्रारूपित करता है। साथ ही, यदि *@wachaon/fmt* स्थापित होने पर *Syntax Error* होती है, तो आप त्रुटि स्थान का संकेत दे सकते हैं।


### इंस्टॉल


```bat
wes install @wachaon/fmt
```


### कैसे इस्तेमाल करे


यदि कार्यशील निर्देशिका में *.prettierrc* (JSON प्रारूप) है, तो यह सेटिंग में दिखाई देगा। *fmt* का उपयोग *CLI* और *module* दोनों के साथ किया जा सकता है।


#### *CLI* के रूप में उपयोग किया जाता है।


```bat
wes @wachaon/fmt src/sample --write
```


| अनाम संख्या | विवरण                                                |
| ----------- | ---------------------------------------------------- |
| 0           | मैं                                                  |
| 1           | आवश्यक। फ़ाइल का पथ जिसे आप प्रारूपित करना चाहते हैं |


| नामित     | संक्षिप्त नाम | विवरण                    |
| --------- | ------------- | ------------------------ |
| `--write` | `-w`          | ओवरराइटिंग की अनुमति दें |


यदि आप `--write` या `-w` का नामित तर्क निर्दिष्ट करते हैं, तो स्वरूपित स्क्रिप्ट के साथ फ़ाइल को अधिलेखित कर दें।


#### मॉड्यूल के रूप में उपयोग करें


```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')

const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```


## *@wachaon/edge*


*Internet Explorer* 2022/6/15 के साथ समर्थन पूरा करेगा। परिणामस्वरूप, यह अपेक्षा की जाती है कि `require('InternetExplorer.Application')` साथ एप्लिकेशन को संचालित करना संभव नहीं होगा।


एक विकल्प *web driver* के माध्यम से *Microsoft Edge based on Chromium* को संचालित करना होगा। `@wachaon/edge` *Edge* ऑटोपायलट को सरल करता है।


### इंस्टॉल


सबसे पहले, पैकेज स्थापित करें।


```bat
wes install @wachaon/edge --unsafe --bare
```


फिर *web driver* डाउनलोड करें।


```bat
wes edge --download
```


*Edge* के स्थापित संस्करण की जाँच करें और संबंधित *web driver* को डाउनलोड करें।


### कैसे इस्तेमाल करे


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


यह स्क्रिप्ट कंसोल पर विज़िट किए गए *URL* को क्रमिक रूप से आउटपुट करेगी।


`@wachaon/edge` *URL* के लिए एक ईवेंट पंजीकृत करता है और डेटा को `res.exports` में जोड़ता है। पंजीकृत किया जाने वाला *URL* या तो `String` `RegExp` हो सकता है, और लचीली सेटिंग्स बनाई जा सकती हैं।


इसे ईवेंट-चालित बनाकर, प्रसंस्करण के लिए एक ईवेंट सेट न करके आसानी से मैन्युअल ऑपरेशन पर स्विच करना संभव है जिसे ऑटोपायलट के साथ संभालना मुश्किल है।


यदि आप स्क्रिप्ट को रोकना चाहते हैं, तो `navi.emit('terminate', res)` चलाएँ या *Edge* को मैन्युअल रूप से समाप्त करें।


समाप्ति प्रक्रिया `res.exports` को *.json* फ़ाइल के रूप में डिफ़ॉल्ट मान के रूप में आउटपुट करती है। यदि आप टर्मिनेशन प्रोसेस सेट करना चाहते हैं, तो `terminate` ऑफ `edge(callback, terminate)` सेट करें।


`window` ब्राउज़र में `window` नहीं है, बल्कि *@wachaon/webdriver* के *Window* क्लास का एक उदाहरण है।


## *@wachaon/webdriver*


यह एक पैकेज है जो ब्राउज़र को संचालित करने वाले *web driver* को एक अनुरोध भेजता है। *@wachaon/edge* में निर्मित। *@wachaon/edge* की तरह, ब्राउज़र संचालन के लिए एक *web driver* की आवश्यकता होती है।


### इंस्टॉल


```bat
wes install @wachaon/webdriver --unsafe --bare
```


यदि आपके पास *web driver* नहीं है, तो इसे डाउनलोड करें।


```bat
wes webdriver --download
```
