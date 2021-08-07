# _WES_

_wes_ _Windows Script Host_ पर _ECMAScript_ निष्पादित करने के लिए एक ढांचा है

_README_ का मूल पाठ [_japanese_](README.ja.md) । जापानी के अलावा, यह एक मशीनी अनुवादित वाक्य है।  
कृपया निम्नलिखित में से अन्य भाषाओं में वाक्यों का चयन करें।

## विशेषताएं

-   स्क्रिप्ट इंजन को _Chakra_ बदलें और _ECMAScript2015_ _Chakra_ चलाएं
-   32 बिट _cscript.exe_ और इसमें 64 बिट वातावरण के लिए विशिष्ट कोई बग नहीं है
-   `require` साथ मॉड्यूल आयात करें
-   मानक आउटपुट के लिए रंगीन वर्ण आउटपुट करता है
-   फ़ाइल एन्कोडिंग का स्वचालित रूप से अनुमान लगाएं

## सुविधाएँ हल नहीं हुई

-   `WScript.Quit` प्रोग्राम को बाधित नहीं कर सकता और त्रुटि कोड नहीं लौटाता
-   अतुल्यकालिक प्रसंस्करण
-   `WScript.CreateObject` के दूसरे तर्क के _event prefix_ का उपयोग। `WScript.CreateObject`

## इंस्टॉल

_wes_ जरूरत है _wes.js_ ओनली फाइल। डाउनलोड करने के लिए, कमांड प्रॉम्प्ट प्रारंभ करें और निम्न आदेश दर्ज करें।

```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

_wes_ कार्यान्वयन के रूप में निष्पादन के समय _WScript.Shell_ की `SendKeys` का उपयोग करें। _wes.js_ निर्देशिका का पथ जहां _wes.js_ सहेजा गया है, में _ascii_ अलावा अन्य वर्ण हैं, तो `SendKeys` कुंजी को सही ढंग से भेजने में सक्षम नहीं होगा और स्क्रिप्ट निष्पादित करने में सक्षम नहीं होगी।  
कृपया केवल _ascii_ _wes.js_ का गंतव्य सहेजें पथ कॉन्फ़िगर करें।

## प्रयोग

कमांड लाइन पर, उस फ़ाइल को निर्दिष्ट करें जो `wes` बाद प्रोग्राम का शुरुआती बिंदु होगा। स्क्रिप्ट एक्सटेंशन _.js_ को छोड़ा जा सकता है।

```shell
wes index
```

साथ ही, _wes_ में _REPL_ इसलिए यदि आप इसे केवल `wes` प्रारंभ करते हैं, तो आप सीधे स्क्रिप्ट दर्ज कर सकते हैं।

```shell
wes
```

स्क्रिप्ट तब तक स्वीकार की जाएगी जब तक आप दो रिक्त पंक्तियाँ दर्ज नहीं करते। _README.md_ _REPL_ साथ _README.md_ में नमूना स्क्रिप्ट के निष्पादन की जांच भी कर सकते हैं।

## कमांड-लाइन नाम के तर्क

_wes_ लिए स्टार्टअप विकल्प इस प्रकार हैं।

| नामित              | विवरण                                                     |
| ------------------ | --------------------------------------------------------- |
| `--monotone`       | _ANSI escape code_ हटा दें                                |
| `--safe`           | स्क्रिप्ट को सुरक्षित मोड में चलाएँ                       |
| `--usual`          | स्क्रिप्ट को सामान्य मोड में चलाएँ (डिफ़ॉल्ट)             |
| `--unsafe`         | स्क्रिप्ट को असुरक्षित मोड में चलाएँ                      |
| `--dangerous`      | स्क्रिप्ट को खतरनाक मोड में चलाएं                         |
| `--debug`          | स्क्रिप्ट को डिबग मोड में चलाएँ                           |
| `--encoding=UTF-8` | पढ़ने के लिए पहली फ़ाइल के एन्कोडिंग को निर्दिष्ट करता है |
| `--engine=Chakra`  | यह विकल्प स्वचालित रूप से _wes_ द्वारा जोड़ा जाता _wes_   |

`--safe` `--usual` `--unsafe` `--dangerous` का कार्यान्वयन अधूरा है, लेकिन नामित तर्क आरक्षित हैं।

## अंतर्निर्मित वस्तुएं

_wes_ में _built-in objects_ जो _WSH (JScript)_ में नहीं हैं।

### _require_

_require_ साथ मॉड्यूल आयात करें। _wes_ स्वचालित रूप से मॉड्यूल फ़ाइल के एन्कोडिंग का अनुमान लगाता है, लेकिन यदि आप सही अनुमान नहीं लगाते हैं, तो आप दूसरे तर्क के साथ एन्कोडिंग निर्दिष्ट कर सकते हैं।

इसके अलावा, `require('WScript.Shell')` की _require_ क्योंकि _OLE_ भी _require_ आयात संभव है।

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

### मॉड्यूल और मॉड्यूल.निर्यात

आप एक मॉड्यूल के रूप में यह निर्धारित करना चाहते हैं, यह करने के लिए आवंटित `module.exports` ।

```javascript
function add (a, b) {
    return a + b
}

module.exports = add
```

### _console_

`WScript.Echo` और `WScript.StdErr.WriteLine` बजाय _wes_ _console_ का उपयोग करता _console_ ।

`console.log` में कमांड लाइन में अक्षर प्रिंट करें। यह स्वरूपित तारों का भी समर्थन करता है। फ़ॉर्मेटिंग ऑपरेटर `%` का उपयोग करके एक स्वरूपित स्ट्रिंग को प्रिंट करता है।

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

_wes_ क्रम में उत्पादन के लिए एक स्ट्रिंग में रंगीन `WScript.StdOut.WriteLine` बजाय, `WScript.StdErr.WriteLine` उपयोग। `WScript.Echo` और `WScript.StdOut.WriteLine` को आउटपुट से ब्लॉक कर दिया गया है, इसलिए `WScript.StdOut.WriteLine` या `console.log` उपयोग करें।

### _Buffer_

बफर संभाल सकते हैं।

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```

### `__dirname` और `__filename`

`__filename` में वर्तमान में चल रहे मॉड्यूल फ़ाइल का पथ शामिल है। `__dirname` `__filename` `__dirname` की निर्देशिका है।

```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```

## अंतर्निहित मॉड्यूल

_wes_ में बुनियादी प्रसंस्करण को सरल और मानकीकृत करने के लिए _built-in modules_ ।

### _ansi_

`ansi` में एक _ANSI escape code_ है जो आपको मानक आउटपुट के रंग और प्रभाव को बदलने की अनुमति देता है। उपयोग किए गए कंसोल एप्लिकेशन के प्रकार और सेटिंग्स के आधार पर रंग और प्रभाव भिन्न हो सकते हैं।

```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```

आप `ansi.color()` और `ansi.bgColor()` साथ अपना खुद का रंग भी बना सकते हैं। तर्क _RGB_ जैसे `255, 165, 0` या _color code_ जैसे `'#FFA500'` । आप `orange` जैसे _color name_ उपयोग नहीं कर सकते।

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

### _argv_

कमांड लाइन तर्क प्राप्त करता है। `cscript.exe` कमांड-लाइन तर्क `/` नामित तर्कों की घोषणा करता है लेकिन, _wes_ इन `-` और `--` नामित तर्कों की घोषणा करता है।

_argv.unnamed_ और _argv.named_ से एक के लिए कमांड लाइन तर्क के मान प्रकार डाली _String_ _Number_ _Boolean_ ।

_REPL_ के साथ कमांड लाइन तर्क दर्ज करें।

```shell
wes REPL aaa -bcd eee --fgh=iii jjj --kln mmm
```

_REPL_ में निम्न स्क्रिप्ट चलाएँ।

```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```

### _pathname_

पथ का संचालन करें।

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

### _filesystem_

फ़ाइलों और निर्देशिकाओं में हेरफेर करें। `readTextFileSync` स्वचालित रूप से फ़ाइल के एन्कोडिंग का अनुमान लगाता है और पढ़ता है।

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```

### _JScript_

यदि आप स्क्रिप्ट इंजन को _Chakra_ बदलते हैं, तो आप _JScript_ विशिष्ट _Enumerator_ आदि का उपयोग नहीं कर पाएंगे। बिल्ट-इन मॉड्यूल _JScript_ उन्हें उपलब्ध कराता है। हालांकि, _Enumerator_ एक एन्यूमरेटर ऑब्जेक्ट के बजाय एक _Array_ देता है।

```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```

_GetObject_ `WScript.GetObject` विकल्प के रूप में `WScript.GetObject` ।

```javascript
const { GetObject, Enumerator } = require('JScript')

const ServiceSet = GetObject("winmgmts:{impersonationLevel=impersonate}").InstancesOf("Win32_Service")
new Enumerator(ServiceSet).forEach(service => console.log(
    'Name: %O\nDescription: %O\n',
    service.Name,
    service.Description
))
```

### _VBScript_

_VBScript_ कुछ सुविधाएं प्रदान करता है जो _JScript_ में नहीं है।

```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```

### _httprequest_

_httprequest_ _http request_ करता है जैसा कि इसके नाम से पता चलता है।

```javascript
const request = require('httprequest')
const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log('%O', JSON.parse(content))
```

### _minitest_

_minitest_ सरल परीक्षण लिख सकता है।

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

### _pipe_

_pipe_ पाइप प्रसंस्करण को सरल करता है

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

### _typecheck_

स्क्रिप्ट के प्रकार का निर्धारण करें।

```javascript
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```

## मॉड्यूल बंडल और स्थापित करें

_install_ , आप के लिए मॉड्यूल स्थापित कर सकते हैं _wes_ पर प्रकाशित _github_ । मॉड्यूल को प्रकाशित करने के लिए आपको _github repository_ आवश्यकता होगी। साथ ही, रिपॉजिटरी का नाम और स्थानीय निर्देशिका का नाम समान होना चाहिए।

### _bundle_

_github_ एक मॉड्यूल प्रकाशित करते समय, _bundle_ आवश्यक मॉड्यूल को बंडल करता है और इसे एक प्रारूप में बदल देता है जिसे _install_ मॉड्यूल द्वारा आयात किया जा सकता है।

सुरक्षा कारणों से, _wes_ ऐसे प्रारूप में मॉड्यूल आयात नहीं करता है जिसे सीधे निष्पादित किया जा सकता है, इसलिए _bundle_ मॉड्यूल के साथ एक _.json_ फ़ाइल बनाएं।

मॉड्यूल को बंडल करने के लिए कुछ शर्तें हैं।

1.  एक _repository_ में _repository_ एक प्रकार का मॉड्यूल प्रकाशित किया जा सकता _repository_ ।
2.  _github_ रिपॉजिटरी का नाम और स्थानीय कार्यशील निर्देशिका का नाम समान होना चाहिए।
3.  यदि आप मॉड्यूल को किसी तीसरे पक्ष को प्रकाशित करना चाहते हैं तो भंडार सार्वजनिक होना चाहिए।
4.  _wes_ स्क्रिप्ट की सांख्यिकीय रूप से व्याख्या नहीं करता है। कुछ शर्तों के तहत `require` मॉड्यूल, जैसे कि `if` कथन, को बंडल नहीं किया जा सकता है।
5.  _.json_ फ़ाइल नाम के साथ अपने काम निर्देशिका में बनाया जाएगा _directory_name.json_ । यदि आप फ़ाइल का नाम बदलते हैं या फ़ाइल को स्थानांतरित करते हैं, तो आप इसे स्थापित नहीं कर सकते।
6.  `node_modules/directory_name` बंडल करते समय बंडलिंग विफल हो जाती है क्योंकि यह `directory_name.json` संदर्भित करता है।

### _install_

इसके लिए मॉड्यूल फ़ाइल को स्थापित किया जाता है _wes_ पर प्रकाशित _github_ ।

## प्रयोग

प्रारूप में _install_ लिए तर्क पास करें `@author/repository`

```shell
wes install @wachaon/fmt
```

_install_ के विकल्प हैं

| नामित      | संक्षिप्त नाम | विवरण                                                   |
| ---------- | ------------- | ------------------------------------------------------- |
| `--bare`   | `-b`          | _@author_ फोल्डर न बनाएं                                |
| `--global` | `-g`          | मॉड्यूल को उस फ़ोल्डर में स्थापित करें जहां _wes.js_ है |

`--bare` विकल्प `author@repository` से `repository` में `require` तर्क को छोड़ सकता `repository` । `--global` विकल्प संस्थापित मॉड्यूल को सभी स्क्रिप्ट के लिए उपलब्ध कराता है। उपरोक्त विकल्पों को उसी समय निर्दिष्ट किया जाना चाहिए जब _wes_ सुरक्षा विकल्प `--unsafe` or `--dangerous` ।

```shell
wes install @wachaon/fmt --bare --unsafe
```

# निजी भंडार का मॉड्यूल स्थापित करें

_install_ न केवल _github_ पब्लिक रिपोजिटरी मॉड्यूल पर स्थापित किया जा सकता है, बल्कि निजी भंडारों पर भी _install_ जा सकता है।

_install_ , `author@repository` साथ मॉड्यूल निर्दिष्ट करें। कार्यान्वयन निम्नलिखित डाउनलोड करता है।

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```

जब आप एक ब्राउज़र के साथ निजी भंडार के _raw_ तक पहुँचते हैं, तो _token_ प्रदर्शित किया जाएगा, इसलिए _token_ प्रतिलिपि बनाएँ और उसका उपयोग करें।

आप मॉड्यूल को _token_ के _token_ में कमांड लाइन पर चलाकर निजी भंडार में भी स्थापित कर सकते हैं।

```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

## बाहरी मॉड्यूल

यहाँ कुछ बाहरी मॉड्यूल हैं।

### _@wachaon/fmt_

_@wachaon/fmt_ _prettier_ का एक बंडल है जो स्क्रिप्ट को प्रारूपित करता है। इसके अलावा, एक अगर `SyntaxError` के साथ होता है _@wachaon/fmt_ स्थापित, तो आपको त्रुटि स्थान इंगित कर सकते हैं।

#### इंस्टॉल

```shell
wes install @wachaon/fmt
```

#### प्रयोग

यदि कार्यशील निर्देशिका में _.prettierrc_ (JSON प्रारूप) है, तो यह सेटिंग्स में दिखाई देगा। _fmt_ उपयोग _CLI_ (कमांड लाइन इंटरफेस) और _fmt_ में _module_ दोनों के साथ किया जा सकता है।

_CLI_ रूप में उपयोग करें

```shell
wes @wachaon/fmt src/sample --write
```

| अनाम संख्या | विवरण                                                |
| ----------- | ---------------------------------------------------- |
| 0           | ---                                                  |
| 1           | आवश्यक। फ़ाइल का पथ जिसे आप प्रारूपित करना चाहते हैं |

| नामित     | संक्षिप्त नाम | विवरण                    |
| --------- | ------------- | ------------------------ |
| `--write` | `-w`          | ओवरराइटिंग की अनुमति दें |

यदि `--write` या `-w` का एक नामित तर्क निर्दिष्ट किया जाता है, तो एक स्वरूपित स्क्रिप्ट के साथ फ़ाइल को अधिलेखित कर देता है।

#### _module_ रूप में उपयोग करते समय

#### `option`

```javascript
{
    parser: 'babel',
    plugins: [babel]
}
```
