# *WES*


*wes* *Windows Script Host* पर *ECMAScript* निष्पादित करने के लिए एक ढांचा है


*README* का मूल पाठ [*japanese*](docs/README.ja.md) । जापानी के अलावा, यह एक मशीनी अनुवादित वाक्य है।  
कृपया निम्नलिखित में से अन्य भाषाओं में वाक्यों का चयन करें।


+  [*簡体字*](README.zh-CN.md) <!-- 中国語 (簡体字) -->
+  [*繁体字*](README.zh-TW.md) <!-- 中国語 (繁体字) -->
+  [*English*](README.en.md) <!-- 英語 -->
+  [*हिन्दी*](README.hi.md) <!-- ヒンディー語 -->
+  [*Español*](README.es.md) <!-- スペイン語 -->
+  [*عربى*](README.ar.md) <!-- アラビア語 -->
+  [*বাংলা*](README.bn.md) <!-- ベンガル語 -->
+  [*Português*](README.pt.md) <!-- ポルトガル語 -->
+  [*русский язык*](README.ru.md) <!-- ロシア語 -->
+  [*Deutsch*](README.de.md) <!-- ドイツ語 -->
+  [*français*](README.fr.md) <!-- フランス語 -->
+  [*italiano*](README.it.md) <!-- イタリア語 -->



# विशेषताएं


-   *ECMAScript2015* *Chakra* चलाने के लिए *Windows Script Host* का स्क्रिप्ट इंजन *Chakra* करें
-   चूंकि 32 बिट *cscript.exe* निष्पादित किया गया है, इसलिए 64 बिट वातावरण में कोई विशेष समस्या नहीं है।
-   `require` साथ मॉड्यूल आयात करें
-   मानक आउटपुट के लिए रंगीन वर्ण आउटपुट करता है
-   फ़ाइल एन्कोडिंग का स्वचालित रूप से अनुमान लगाएं


# सुविधाएँ हल नहीं हुई


-   `WScript.Quit` प्रोग्राम को बाधित नहीं कर सकता और त्रुटि कोड नहीं लौटाता
-   अतुल्यकालिक प्रसंस्करण
-   `WScript.CreateObject` के दूसरे तर्क का *event prefix* । `WScript.CreateObject` उपयोग नहीं किया जा सकता है


# इंस्टॉल


*wes* जरूरत है *wes.js* केवल फाइल। डाउनलोड करने के लिए, कमांड प्रॉम्प्ट प्रारंभ करें और निम्न आदेश दर्ज करें।


```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```


*wes* कार्यान्वयन के रूप में निष्पादन के समय *WScript.Shell* की `SendKeys` का उपयोग करें। *wes.js* निर्देशिका का पथ जहां *wes.js* सहेजा गया है, में *ascii* अलावा अन्य वर्ण हैं, तो `SendKeys` कुंजी को सही ढंग से भेजने में सक्षम नहीं होगा और स्क्रिप्ट निष्पादित करने में सक्षम नहीं होगी।  
कृपया केवल *ascii* *wes.js* का गंतव्य सहेजें पथ कॉन्फ़िगर करें।


## प्रयोग


कमांड लाइन पर, उस फ़ाइल को निर्दिष्ट करें जो `wes` बाद प्रोग्राम का शुरुआती बिंदु होगा। स्क्रिप्ट एक्सटेंशन *.js* को छोड़ा जा सकता है।


```shell
wes index
```


साथ ही, *wes* का *REPL* इसलिए यदि आप इसे केवल `wes` प्रारंभ करते हैं, तो आप सीधे स्क्रिप्ट दर्ज कर सकते हैं।


```shell
wes
```


स्क्रिप्ट तब तक स्वीकार की जाएगी जब तक आप दो रिक्त पंक्तियाँ दर्ज नहीं करते। *README.md* *REPL* साथ *README.md* में नमूना स्क्रिप्ट के निष्पादन की जांच भी कर सकते हैं।


## कमांड-लाइन नाम के तर्क


*wes* लिए स्टार्टअप विकल्प इस प्रकार हैं।


| नामित              | विवरण                                                     |
| ------------------ | --------------------------------------------------------- |
| `--monotone`       | *ANSI escape code* हटा दें                                |
| `--safe`           | स्क्रिप्ट को सुरक्षित मोड में चलाएँ                       |
| `--usual`          | स्क्रिप्ट को सामान्य मोड में चलाएँ (डिफ़ॉल्ट)             |
| `--unsafe`         | स्क्रिप्ट को असुरक्षित मोड में चलाएँ                      |
| `--dangerous`      | स्क्रिप्ट को खतरनाक मोड में चलाएं                         |
| `--debug`          | स्क्रिप्ट को डिबग मोड में चलाएँ                           |
| `--encoding=UTF-8` | पढ़ने के लिए पहली फ़ाइल के एन्कोडिंग को निर्दिष्ट करता है |
| `--engine=Chakra`  | यह विकल्प स्वचालित रूप से *wes* द्वारा जोड़ा जाता *wes*   |


`--safe` `--usual` `--unsafe` `--dangerous` का कार्यान्वयन अधूरा है, लेकिन नामित तर्क आरक्षित हैं।


# अंतर्निर्मित वस्तुएं


*wes* में *built-in objects* जो *WSH (JScript)* में नहीं हैं।


## *require*


*require* साथ मॉड्यूल आयात करें। *wes* स्वचालित रूप से मॉड्यूल फ़ाइल के एन्कोडिंग का अनुमान लगाता है, लेकिन यदि आप सही अनुमान नहीं लगाते हैं, तो आप दूसरे तर्क के साथ एन्कोडिंग निर्दिष्ट कर सकते हैं।


इसके अलावा, `require('WScript.Shell')` की *require* क्योंकि *OLE* भी *require* आयात संभव है।


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


## `module` और `module.exports`


![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）


```javascript
function add (a, b) {
    return a + b
}

module.exports = add
```


## *console*


`WScript.Echo` और `WScript.StdErr.WriteLine` बजाय *wes* *console* का उपयोग करता *console* ।


`console.log` में कमांड लाइन में अक्षर प्रिंट करें। यह स्वरूपित तारों का भी समर्थन करता है। फ़ॉर्मेटिंग ऑपरेटर `%` का उपयोग करके एक स्वरूपित स्ट्रिंग को प्रिंट करता है।


```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```


*wes* क्रम में उत्पादन के लिए एक स्ट्रिंग में रंगीन `WScript.StdOut.WriteLine` बजाय, `WScript.StdErr.WriteLine` उपयोग। `WScript.Echo` और `WScript.StdOut.WriteLine` को आउटपुट से ब्लॉक कर दिया गया है, इसलिए `WScript.StdErr.WriteLine` या `console.log` उपयोग करें।


## *Buffer*


बफ़र्स को संभाल सकता है।


```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```


## `__dirname` और `__filename`


`__filename` में वर्तमान में चल रहे मॉड्यूल फ़ाइल का पथ शामिल है। `__dirname` `__filename` `__dirname` की निर्देशिका है।


```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```


# अंतर्निहित मॉड्यूल


*wes* में बुनियादी प्रसंस्करण को सरल और मानकीकृत करने के लिए *built-in modules* ।


## *ansi*


`ansi` में एक *ANSI escape code* है जो आपको मानक आउटपुट के रंग और प्रभाव को बदलने की अनुमति देता है। उपयोग किए गए कंसोल एप्लिकेशन के प्रकार और सेटिंग्स के आधार पर रंग और प्रभाव भिन्न हो सकते हैं।


```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```


![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）


```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```


## *argv*


![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）


*argv.unnamed* और *argv.named* से एक के लिए कमांड लाइन तर्क के मान प्रकार डाली *String* *Number* *Boolean* ।


*REPL* के साथ कमांड लाइन तर्क दर्ज करें।


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


## *pathname*


पथ का संचालन करें।


```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```


## *filesystem*


फ़ाइलों और निर्देशिकाओं में हेरफेर करें। `readTextFileSync` स्वचालित रूप से फ़ाइल एन्कोडिंग का अनुमान लगाता है और उसे पढ़ता है।


```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```


## *JScript*


यदि आप स्क्रिप्ट इंजन को *Chakra* बदलते हैं, तो आप *JScript* विशिष्ट *Enumerator* आदि का उपयोग नहीं कर पाएंगे। बिल्ट-इन मॉड्यूल *JScript* उन्हें उपलब्ध कराता है। हालांकि, *Enumerator* एक एन्यूमरेटर ऑब्जेक्ट के बजाय एक *Array* देता है।


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


## *VBScript*


*VBScript* कुछ सुविधाएं प्रदान करता है जो *JScript* में नहीं है।


```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```


## *httprequest*


*httprequest* *http request* करता है जैसा कि इसके नाम से पता चलता है।


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


*pipe* पाइप प्रसंस्करण को सरल करता है


![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）


## *typecheck*


स्क्रिप्ट के प्रकार का निर्धारण करें।


```javascript
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```


# मॉड्यूल बंडल और स्थापित करें


*install* , आप के लिए मॉड्यूल स्थापित कर सकते हैं *wes* पर प्रकाशित *github* । मॉड्यूल को प्रकाशित करने के लिए आपको *github repository* आवश्यकता होगी। साथ ही, रिपॉजिटरी का नाम और स्थानीय निर्देशिका का नाम समान होना चाहिए।


## *bundle*


*github* एक मॉड्यूल प्रकाशित करते समय, *bundle* आवश्यक मॉड्यूल को बंडल करता है और इसे एक प्रारूप में बदल देता है जिसे *install* मॉड्यूल द्वारा आयात किया जा सकता है।


सुरक्षा कारणों से, *wes* मॉड्यूल को ऐसे प्रारूप में आयात नहीं करता है जिसे सीधे निष्पादित किया जा सकता है, इसलिए *bundle* मॉड्यूल के साथ एक *.json* फ़ाइल बनाएं।


मॉड्यूल को बंडल करने के लिए कुछ शर्तें हैं।


1.  एक *repository* में *repository* एक प्रकार का मॉड्यूल प्रकाशित किया जा सकता *repository* ।
2.  *github* रिपॉजिटरी का नाम और स्थानीय कार्यशील निर्देशिका का नाम समान होना चाहिए।
3.  यदि आप मॉड्यूल को किसी तीसरे पक्ष को प्रकाशित करना चाहते हैं तो भंडार सार्वजनिक होना चाहिए।
4.  *wes* स्क्रिप्ट की सांख्यिकीय रूप से व्याख्या नहीं करता है। विशिष्ट परिस्थितियों में `require` द्वारा अधिग्रहित मॉड्यूल जैसे `if` स्टेटमेंट को बंडल नहीं किया जा सकता है।
5.  *.json* फ़ाइल नाम के साथ अपने काम निर्देशिका में बनाया जाएगा *directory_name.json* । यदि आप फ़ाइल का नाम बदलते हैं या फ़ाइल को स्थानांतरित करते हैं, तो आप इसे स्थापित नहीं कर सकते।
6.  `node_modules/directory_name` बंडल करते समय बंडलिंग विफल हो जाती है क्योंकि यह `directory_name.json` संदर्भित करता है।


## *install*


इसके लिए मॉड्यूल फ़ाइल को स्थापित किया जाता है *wes* पर प्रकाशित *github* ।


### प्रयोग


प्रारूप `@author/repository` में *install* लिए तर्क पास करें


```shell
wes install @wachaon/fmt
```


*install* के विकल्प हैं


| नामित      | संक्षिप्त नाम | विवरण                                                   |
| ---------- | ------------- | ------------------------------------------------------- |
| `--bare`   | `-b`          | *@author* फोल्डर न बनाएं                                |
| `--global` | `-g`          | मॉड्यूल को उस फ़ोल्डर में स्थापित करें जहां *wes.js* है |


![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）


```shell
wes install @wachaon/fmt --bare --unsafe
```


# निजी भंडार का मॉड्यूल स्थापित करें


*install* न केवल *github* पब्लिक रिपोजिटरी मॉड्यूल पर स्थापित किया जा सकता है, बल्कि निजी भंडारों पर भी *install* जा सकता है।


*install* , `author@repository` साथ मॉड्यूल निर्दिष्ट करें। कार्यान्वयन निम्नलिखित डाउनलोड करता है।


```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```


जब आप एक ब्राउज़र के साथ निजी भंडार के *raw* तक पहुँचते हैं, तो *token* प्रदर्शित किया जाएगा, इसलिए *token* प्रतिलिपि बनाएँ और उसका उपयोग करें।


आप मॉड्यूल को *token* के *token* में कमांड लाइन पर चलाकर निजी भंडार में भी स्थापित कर सकते हैं।


```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```


# बाहरी मॉड्यूल


यहाँ कुछ बाहरी मॉड्यूल हैं।


## *@wachaon/fmt*


*@wachaon/fmt* *prettier* का एक बंडल है जो स्क्रिप्ट को प्रारूपित करता है। इसके अलावा, एक अगर `SyntaxError` के साथ होता है *@wachaon/fmt* स्थापित, तो आपको त्रुटि स्थान इंगित कर सकते हैं।


### इंस्टॉल


```shell
wes install @wachaon/fmt
```


### प्रयोग


यदि कार्यशील निर्देशिका में *.prettierrc* (JSON प्रारूप) है, तो यह सेटिंग्स में दिखाई देगा। *fmt* उपयोग *CLI* (कमांड लाइन इंटरफेस) और *fmt* में *module* दोनों के साथ किया जा सकता है।


*CLI* रूप में उपयोग करें


```shell
wes @wachaon/fmt src/sample --write
```


| अनाम संख्या | विवरण                                                |
| ----------- | ---------------------------------------------------- |
| 0           | ---                                                  |
| 1           | आवश्यक। फ़ाइल का पथ जिसे आप प्रारूपित करना चाहते हैं |


![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）


फ़ाइल को स्वरूपित स्क्रिप्ट के साथ अधिलेखित कर देता है यदि `--write` या `-w` का नामित तर्क निर्दिष्ट किया जाता है।


### *module* रूप में उपयोग करते समय


### `option`


```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')

const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```
