# *WES*

*wes* *Windows Script Host* पर *ECMAScript* निष्पादित करने के लिए एक रूपरेखा है

[*japanese*](README.ja.md) का *README* मूल होगा। जापानी के अलावा, यह मशीन अनुवादित पाठ होगा।  
कृपया निम्नलिखित में से किसी अन्य भाषा में एक वाक्य चुनें।

-   [*簡体字*](README.zh-CN.md) <!-- 中国語 (簡体字) -->
-   [*繁体字*](README.zh-TW.md) <!-- 中国語 (繁体字) -->
-   [*English*](README.en.md) <!-- 英語 -->
-   [*हिन्दी*](README.hi.md)　<!-- ヒンディー語 -->
-   [*Español*](README.es.md) <!-- スペイン語 -->
-   [*عربى*](README.ar.md) <!-- アラビア語 -->
-   [*বাংলা*](README.bn.md) <!-- ベンガル語 -->
-   [*Português*](README.pt.md) <!-- ポルトガル語 -->
-   [*русский язык*](README.ru.md) <!-- ロシア語 -->
-   [*Deutsch*](README.de.md) <!-- ドイツ語 -->
-   [*français*](README.fr.md) <!-- フランス語 -->
-   [*italiano*](README.it.md)　<!-- イタリア語 -->

## विशेषताएं

-   स्क्रिप्ट इंजन को *Chakra* बदलें और *ECMAScript2015* *Chakra* निष्पादित करें
-   32bit *cscript.exe* और 64 बिट वातावरण के लिए विशिष्ट किसी भी कीड़े का कारण नहीं है
-   `require` साथ मॉड्यूल आयात करें
-   मानक वर्णों को रंगीन वर्ण आउटपुट करता है
-   फ़ाइल एन्कोडिंग स्वचालित रूप से लगता है

## सुविधाएँ हल नहीं हुई हैं

-   `WScript.Quit` प्रोग्राम को बाधित नहीं कर सकता है और एक त्रुटि कोड वापस नहीं करता है
-   अतुल्यकालिक प्रसंस्करण
-   `WScript.CreateObject` के दूसरे तर्क के *event prefix* का `WScript.CreateObject`

## इंस्टॉल

*wes* जरूरत *wes.js* केवल फ़ाइल है। डाउनलोड करने के लिए, कमांड प्रॉम्प्ट शुरू करें और निम्न कमांड दर्ज करें।

```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

कार्यान्वयन के समय *wes* कार्यान्वयन के रूप में *WScript.Shell* का `SendKeys` उपयोग करते हैं। *wes.js* निर्देशिका का पथ जहाँ *wes.js* सहेजा गया है, उसमें *ascii* अलावा वर्ण हैं, `SendKeys` कुंजी को सही ढंग से नहीं भेज सकता है और स्क्रिप्ट निष्पादित नहीं की जा सकती है।  
कृपया केवल *wes.js* को बचाने के लिए *ascii* कॉन्फ़िगर करें

## प्रयोग

कमांड लाइन में, वह फ़ाइल निर्दिष्ट करें जो `wes` बाद प्रोग्राम का शुरुआती बिंदु `wes` । स्क्रिप्ट एक्सटेंशन *.js* को छोड़ा जा सकता है।

```shell
wes index
```

इसके अलावा, *wes* *REPL* साथ आता है *REPL* इसलिए यदि आप इसे केवल `wes` शुरू करते हैं, तो आप सीधे स्क्रिप्ट में प्रवेश कर सकते हैं।

```shell
wes
```

स्क्रिप्ट इनपुट तब तक स्वीकार किया जाता है जब तक आप दो रिक्त लाइनों को दर्ज नहीं करते हैं। *README.md* में *REPL* साथ नमूना स्क्रिप्ट के निष्पादन की भी जांच कर सकते हैं।

## कमांड-लाइन जिसका नाम तर्कों है

*wes* आरंभिक विकल्प इस प्रकार हैं।

| नामित              | विवरण                                                     |
| ------------------ | --------------------------------------------------------- |
| `--monotone`       | *ANSI escape code* हटा दें                                |
| `--safe`           | स्क्रिप्ट को सुरक्षित मोड में चलाएँ                       |
| `--usual`          | सामान्य मोड में स्क्रिप्ट चलाएँ (डिफ़ॉल्ट)                |
| `--unsafe`         | स्क्रिप्ट को असुरक्षित मोड में चलाएँ                      |
| `--dangerous`      | स्क्रिप्ट को खतरनाक मोड में चलाएँ                         |
| `--debug`          | स्क्रिप्ट को डीबग मोड में चलाएँ                           |
| `--encoding=UTF-8` | पहले पढ़ने के लिए फ़ाइल के एन्कोडिंग को निर्दिष्ट करता है |
| `--engine=Chakra`  | यह विकल्प स्वचालित रूप से *wes* द्वारा जोड़ा जाता *wes*   |

`--safe` `--usual` `--unsafe` `--dangerous` का कार्यान्वयन अधूरा है, लेकिन नामित तर्क आरक्षित हैं।

## निर्मित वस्तुओं में

*wes* में *built-in objects* जो *WSH (JScript)* में नहीं हैं।

### *require*

*require* साथ मॉड्यूल आयात करें। *wes* स्वचालित रूप से मॉड्यूल फ़ाइल के एन्कोडिंग का अनुमान लगाता है, लेकिन यदि आप इसे सही तरीके से अनुमान नहीं लगाते हैं, तो आप दूसरे तर्क के साथ एन्कोडिंग को निर्दिष्ट कर सकते हैं।

आप `require('WScript.Shell')` जैसे *OLE* लिए *require* के साथ भी आयात कर सकते हैं।

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

### मॉड्यूल और मॉड्यूल

यदि आप इसे एक मॉड्यूल के रूप में परिभाषित करना चाहते हैं, तो इसे `module.exports` में `module.exports` ।

```javascript
function add (a, b) {
    return a + b
}

module.exports = add
```

### *console*

*wes* इन `WScript.Echo` और `WScript.StdErr.WriteLine` *console* बजाय का उपयोग करें।

साथ कमांड लाइन के लिए उत्पादन पात्रों `console.log` । यह स्वरूपित स्ट्रिंग्स का भी समर्थन करता है। प्रारूप ऑपरेटर `%` का उपयोग करके प्रारूप स्ट्रिंग का उत्पादन करें।

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

`WScript.StdOut.WriteLine` बजाय एक स्ट्रिंग रंगीन आउटपुट के लिए *wes* , `WScript.StdErr.WriteLine` उपयोग। `WScript.Echo` के उत्पादन `WScript.Echo` और `WScript.StdOut.WriteLine` अवरुद्ध है, उपयोग `WScript.StdOut.WriteLine` या `console.log` ।

### *Buffer*

बफ़र्स संभाल सकते हैं।

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```

### `__dirname` और `__filename`

`__filename` वर्तमान में निष्पादित की जा रही मॉड्यूल फ़ाइल का पथ संग्रहीत करता है। `__dirname` , `__filename` निर्देशिका को संग्रहीत करता है।

```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```

## अंतर्निहित मॉड्यूल

*wes* में बुनियादी प्रसंस्करण को सरल और मानकीकृत करने के लिए *built-in modules* ।

### *ansi*

`ansi` में एक *ANSI escape code* है जो आपको मानक आउटपुट के रंगों और प्रभावों को बदलने की अनुमति देता है। उपयोग किए गए कंसोल एप्लिकेशन के प्रकार और सेटिंग्स के आधार पर रंग और प्रभाव भिन्न हो सकते हैं।

```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```

आप अपना रंग `ansi.color()` या `ansi.bgColor()` साथ भी बना सकते हैं। तर्क *RGB* उपयोग करते हैं जैसे कि `255, 165, 0` या *color code* जैसे `'#FFA500'` । आप `orange` जैसे *color name* उपयोग नहीं कर सकते।

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

### *argv*

कमांड लाइन की दलीलें मिलती हैं। `cscript.exe` कमांड-लाइन की दलीलों को `/` लेकिन, *wes* इन `-` और `--` में नामित तर्कों को घोषित करता है।

*argv.unnamed* और *argv.named* *String* *Number* *Boolean* से किसी एक को कमांड लाइन तर्क का मान प्रकार देते हैं।

*REPL* साथ कमांड लाइन तर्क दर्ज करें।

```shell
wes REPL aaa -bcd eee --fgh=iii jjj --kln mmm
```

*REPL* में निम्न स्क्रिप्ट चलाएँ।

```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```

### *pathname*

पथ का संचालन करें।

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

### *filesystem*

फ़ाइलों और निर्देशिकाओं का संचालन करता है। `readTextFileSync` फ़ाइल एन्कोडिंग का अनुमान `readTextFileSync` और इसे पढ़ेगा।

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```

### *JScript*

यदि आप स्क्रिप्ट इंजन को *Chakra* बदलते हैं, तो आप *JScript* विशिष्ट *Enumerator* का उपयोग नहीं कर पाएंगे। अंतर्निहित मॉड्यूल *JScript* उन्हें उपलब्ध कराता है। हालाँकि, *Enumerator* एक एन्यूमरेटर ऑब्जेक्ट के बजाय एक *Array* लौटाता है।

```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```

*GetObject* `WScript.GetObject` विकल्प के रूप में `WScript.GetObject` ।

```javascript
const { GetObject, Enumerator } = require('JScript')

const ServiceSet = GetObject("winmgmts:{impersonationLevel=impersonate}").InstancesOf("Win32_Service")
new Enumerator(ServiceSet).forEach(service => console.log(
    'Name: %O\nDescription: %O\n',
    service.Name,
    service.Description
))
```

### *VBScript*

*VBScript* कुछ ऐसी सुविधाएँ प्रदान करता है जो *JScript* पास नहीं है।

```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```

### *httprequest*

*httprequest* है क्योंकि इसका नाम *http request* जारी करेगा।

```javascript
const request = require('httprequest')
const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log('%O', JSON.parse(content))
```

### *minitest*

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

### *pipe*

*pipe* पाइप प्रसंस्करण को सरल करता है

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

### *typecheck*

स्क्रिप्ट के प्रकार का न्याय करें।

```javascript
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```

## मॉड्यूल बंडल और स्थापित करें

*install* , आप के लिए मॉड्यूल स्थापित कर सकते हैं *wes* पर प्रकाशित *github* । मॉड्यूल प्रकाशित करने के लिए, आपको *github repository* आवश्यकता *github repository* । साथ ही, रिपॉजिटरी का नाम और स्थानीय निर्देशिका का नाम समान होना चाहिए।

### *bundle*

एक मॉड्यूल को *github* प्रकाशित करते समय, *bundle* आवश्यक मॉड्यूल को बंडल करता है और इसे एक प्रारूप में बदलता है जिसे *install* मॉड्यूल द्वारा शामिल किया जा सकता है।

सुरक्षा के *wes* , *wes* मॉड्यूल को आयात नहीं करता है जिसे सीधे निष्पादित किया जा सकता है, इसलिए *bundle* मॉड्यूल में *.json* फ़ाइल बनाएं।

मॉड्यूल बांधने के लिए कुछ शर्तें हैं।

1.  एक *repository* में *repository* एक प्रकार के मॉड्यूल को प्रकाशित किया जा सकता *repository* ।
2.  *github* रिपॉजिटरी नाम और स्थानीय कामकाजी निर्देशिका नाम समान होना चाहिए।
3.  यदि आप मॉड्यूल को किसी तीसरे पक्ष को प्रकाशित करना चाहते हैं तो रिपॉजिटरी सार्वजनिक होनी चाहिए।
4.  *wes* स्क्रिप्ट की व्याख्या नहीं करते हैं। ऐसे मॉड्यूल `require` कुछ शर्तों के तहत `require` जैसे `if` बयानों को बंडल नहीं किया जा सकता है।
5.  *.json* फ़ाइल नाम के साथ काम करने निर्देशिका में बनाई गई है *directory_name.json* । यदि आप फ़ाइल का नाम बदलते हैं या फ़ाइल को स्थानांतरित करते हैं, तो आप उसे स्थापित नहीं कर सकते।
6.  `node_modules/directory_name` को बंडल करते हैं, तो बंडलिंग विफल हो जाता है क्योंकि यह `directory_name.json` संदर्भित करता है।

### *install*

इसके लिए मॉड्यूल फ़ाइल को स्थापित किया जाता है *wes* पर प्रकाशित *github* ।

## प्रयोग

`@author/repository` प्रारूप में *install* लिए तर्क पास करें

```shell
wes install @wachaon/fmt
```

*install* में विकल्प हैं

| नामित      | छोटा नाम | विवरण                                                |
| ---------- | -------- | ---------------------------------------------------- |
| `--bare`   | `-b`     | *@author* फ़ोल्डर बनाएँ नहीं                         |
| `--global` | `-g`     | उस फ़ोल्डर में मॉड्यूल स्थापित करें जहां *wes.js* है |

`--bare` विकल्प `author@repository` से `repository` लिए `require` तर्क को छोड़ सकता `repository` । `--global` विकल्प स्थापित स्क्रिप्ट को सभी लिपियों के लिए उपलब्ध कराता है। उपरोक्त विकल्पों को *wes* सिक्योरिटी विकल्प `--unsafe` या `--dangerous` साथ निर्दिष्ट किया जाना चाहिए।

```shell
wes install @wachaon/fmt --bare --unsafe
```

# निजी रिपॉजिटरी मॉड्यूल स्थापित करें

*install* जा सकता है न केवल *github* के सार्वजनिक भंडार मॉड्यूल में, बल्कि निजी भंडार में भी *install* जा सकता है।

*install* , `author@repository` साथ मॉड्यूल निर्दिष्ट करें। कार्यान्वयन में निम्न डाउनलोड किया गया है।

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```

आप का उपयोग करते हैं *raw* एक ब्राउज़र के साथ निजी भंडार की, *token* प्रदर्शित किया जाता है, तो कॉपी *token* और इसका इस्तेमाल करते हैं।

यदि आप *token* के वैध समय के भीतर कमांड लाइन पर इसे निष्पादित करते हैं, तो आप निजी रिपॉजिटरी के मॉड्यूल को स्थापित कर सकते हैं।

```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

## बाहरी मॉड्यूल

यहां हम कुछ बाहरी मॉड्यूल पेश करते हैं।

### *@wachaon/fmt*

*@wachaon/fmt* का एक बंडल है *prettier* है कि स्क्रिप्ट स्वरूपों। इसके अलावा, अगर `SyntaxError` जबकि तब होती है *@wachaon/fmt* स्थापित किया गया है, त्रुटि स्थान प्रस्तुत किया जा सकता।

#### इंस्टॉल

```shell
wes install @wachaon/fmt
```

#### प्रयोग

यदि कार्यशील निर्देशिका में *.prettierrc* (JSON प्रारूप) है, तो सेटिंग में इसे प्रतिबिंबित करें। *fmt* का उपयोग *CLI* (कमांड लाइन इंटरफेस) और *module* दोनों के साथ किया जा सकता है।

*CLI* रूप में उपयोग करें

```shell
wes @wachaon/fmt src/sample --write
```

| अनाम संख्या | विवरण                                                      |
| ----------- | ---------------------------------------------------------- |
| 0           | -                                                          |
| 1           | आवश्यक है। उस फ़ाइल का पथ जिसे आप प्रारूपित करना चाहते हैं |

| नामित     | छोटा नाम | विवरण                    |
| --------- | -------- | ------------------------ |
| `--write` | `-w`     | ओवरराइटिंग की अनुमति दें |

यदि - `--write` या `-w` नाम तर्क दिया जाता है, तो फ़ाइल को स्वरूपित स्क्रिप्ट के साथ अधिलेखित कर देता है।

#### *module* रूप में उपयोग करते समय

#### `option`

```javascript
{
    parser: 'babel',
    plugins: [babel]
}
```
