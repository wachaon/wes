# *WES*

*WSH (Windows Script Host)* पर *ECMAScript* चलाने के लिए *wes* एक कंसोल फ्रेमवर्क है। *README* का मूल [*japanese*](/README.md) जापानी में होगा। जापानी के अलावा अन्य ग्रंथों का मशीनी अनुवाद किया जाएगा।\
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

*   आप स्क्रिप्ट इंजन को *Chakra* में बदल सकते हैं और *ECMAScript2015* विनिर्देशों के अनुसार लिख सकते हैं।
*   चूंकि 32 बिट *cscript.exe* हमेशा निष्पादित होता है, 64 बिट वातावरण में कोई अनूठी समस्या नहीं है।
*   चूंकि एक मॉड्यूल प्रणाली है, इसे पारंपरिक *WSH* की तुलना में अधिक कुशलता से विकसित किया जा सकता है
*   बिल्ट-इन मॉड्यूल कंसोल में फ़ाइल इनपुट/आउटपुट और रंगीन टेक्स्ट आउटपुट जैसे बुनियादी प्रसंस्करण का समर्थन करते हैं
*   आप फ़ाइल रीडिंग को स्वचालित रूप से एन्कोडिंग का अनुमान लगाने दे सकते हैं, इसलिए आपको एन्कोडिंग आदि के बारे में चिंता करने की ज़रूरत नहीं है।
*   बाहरी प्रकाशन और पुनर्प्राप्ति का समर्थन करने के लिए पैकेज मॉड्यूल
*   *WSH* से अधिक कृपया त्रुटि विवरण प्रदर्शित करें

# *wes* मुद्दे जिन्हें हम हल नहीं कर सकते

*   `WScript.Quit` प्रोग्राम को निरस्त नहीं कर सकता और त्रुटि कोड नहीं लौटाता
*   अतुल्यकालिक प्रसंस्करण ठीक से काम नहीं करता है
*   आप WScript के दूसरे तर्क के *event prefix* का उपयोग नहीं कर सकते हैं। `WScript.CreateObject`

# डाउनलोड

*wes.js* *wes* की आवश्यकता है। डाउनलोड करने के लिए, *wes.js* को [*@wachaon/wes*](https://github.com/wachaon/wes) से कॉपी करें या कंसोल में निम्न कमांड चलाएँ।

     bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js

*WScript.Shell* *wes* `SendKeys` का उपयोग करते हैं। यदि निर्देशिका का पथ जहां *wes.js* सहेजा गया है, उसमें *ascii* के अलावा अन्य वर्ण हैं, तो `SendKeys` कुंजी को सही ढंग से नहीं भेज सकता है और स्क्रिप्ट को निष्पादित नहीं किया जा सकता है।\
उस पथ को कॉन्फ़िगर करें *wes.js* केवल *ascii* में संग्रहीत है। यदि आपने पहले ही *wes* डाउनलोड कर लिया है, तो आप इसे निम्न कमांड से अपडेट कर सकते हैं।

     wes update

# प्रयोग

फ़ाइल को निर्दिष्ट करने वाले कमांड के बाद `wes` कीवर्ड दर्ज करें जो कंसोल के लिए प्रोग्राम का शुरुआती बिंदु होगा। स्क्रिप्ट एक्सटेंशन *.js* को छोड़ा जा सकता है।

     wes index

साथ ही, चूंकि *wes* *REP* से लैस है, आप अकेले `wes` शुरू करके सीधे स्क्रिप्ट दर्ज कर सकते हैं।

     wes

जब तक आप दो रिक्त पंक्तियाँ दर्ज नहीं करते तब तक *REP* स्क्रिप्ट इनपुट स्वीकार करता है। आप *REP* को *README.md* में उदाहरण स्क्रिप्ट चलाते हुए भी देख सकते हैं।

## कमांड लाइन विकल्प

*wes* स्टार्टअप विकल्प इस प्रकार हैं।

| नामित              | विवरण                                                  |
| ------------------ | ------------------------------------------------------ |
| `--monotone`       | *ANSI escape code* को हटाता है                         |
| `--transpile`      | हमेशा *babel-standalone* के साथ कनवर्ट करें और चलाएं   |
| `--debug`          | स्क्रिप्ट को डिबग मोड में चलाएँ                        |
| `--encoding=UTF-8` | पढ़ी गई पहली फ़ाइल के एन्कोडिंग को निर्दिष्ट करता है   |
| `--engine=Chakra`  | यह विकल्प स्वचालित रूप से *wes* . द्वारा जोड़ा जाता है |

# मॉड्यूल प्रणाली

*wes* दो मॉड्यूल सिस्टम का समर्थन करता है, `require()` का उपयोग कर *commonjs module* सिस्टम और `import` का उपयोग कर *es module* सिस्टम। ( *dynamic import* समर्थित नहीं है क्योंकि यह एक अतुल्यकालिक प्रक्रिया है)

## *commonjs module*

मॉड्यूल को असाइन करके मॉड्यूल प्रबंधित करें। `module.exports` और कॉल `require()` । `./` और `../` से शुरू होने वाले निरपेक्ष पथों और सापेक्ष पथों के अलावा पथ, *wes\_modules* निर्देशिका में मॉड्यूल की तलाश करते हैं और आसानी से *node\_modules* निर्देशिका। *wes* की `require()` स्वचालित रूप से मॉड्यूल फ़ाइल के एन्कोडिंग का अनुमान लगाती है, लेकिन यदि आप सही ढंग से अनुमान नहीं लगाते हैं तो आप दूसरे तर्क के साथ एन्कोडिंग निर्दिष्ट कर सकते हैं।

     // ./add.js function add (a, b) { return ab } module.exports = add

<!---->

     // ./main.js const add = require('./add') console.log('add(7, 3) // => %O', add(7, 3))

साथ ही, *COM Object* के लिए *require* के साथ आयात करना संभव है जैसे `require('WScript.Shell')` ।

     const Shell = require('Shell.Application') Shell.MinimizeAll() WScript.Sleep(2000) Shell.UndoMinimizeAll()

## *es module*

*Chakra* , जो स्क्रिप्ट निष्पादन इंजन है, सिंटैक्स की व्याख्या करता है जैसे कि `imoprt` , लेकिन इसे निष्पादित नहीं किया जा सकता क्योंकि ऐसा इसलिए है क्योंकि *cscript* के रूप में प्रसंस्करण विधि परिभाषित नहीं है। *wes* में, बिल्ट-इन मॉड्यूल में *babel* जोड़कर, *es module* को एक-एक करके ट्रांसपाइल करते हुए भी निष्पादित किया जाता है। यह हमें ओवरहेड और एक फूली *wes.js* फ़ाइल को संसाधित करने में खर्च करता है। *es module* में लिखे गए मॉड्यूल को ट्रांसपिलिंग द्वारा `require()` में भी परिवर्तित किया जाता है, इसलिए *COM Object* को कॉल करना संभव है। हालांकि, यह *es module* के साथ मॉड्यूल फ़ाइल के एन्कोडिंग को निर्दिष्ट करने का समर्थन नहीं करता है। सब कुछ अपने आप लोड हो जाता है। इसे *es module* के रूप में लोड करने के लिए, एक्सटेंशन को `.mjs` पर सेट करें या `package.json` में `"type"` फ़ील्ड को `"module"` पर सेट करें।

     // ./sub.mjs export default function sub (a, b) { return a - b }

<!---->

     // ./main2.js import sub from './sub.mjs' console.log('sub(7, 3) // => %O', sub(7, 3))

# अंतर्निहित वस्तु

*wes* में *WSH (JScript)* *built-in objects* नहीं मिले हैं।

undefined

## *Buffer*

आप बफ़र्स को संभाल सकते हैं।

     const content = 'Hello World' const buff = Buffer.from(content) console.log(`${content} %O`, buff)

## `__dirname` और `__filename`

`__filename` वर्तमान में निष्पादित मॉड्यूल फ़ाइल का पथ संग्रहीत करता है। `__dirname` में `__filename` की निर्देशिका है।

     console.log('dirname: %O\nfilename: %O', __dirname, __filename)

## *setTimeout* *setInterval* *setImmediate* *Promise*

चूंकि *wes* सिंक्रोनस प्रोसेसिंग के लिए एक निष्पादन वातावरण है, *setTimeout* *setInterval* *setImmediate* *Promise* एसिंक्रोनस प्रोसेसिंग के रूप में कार्य नहीं करता है, लेकिन यह उन मॉड्यूल का समर्थन करने के लिए कार्यान्वित किया जाता है जो *Promise* कार्यान्वयन को मानते हैं।

     const example = () => { const promise = new Promise((resolve, reject) => { console.log('promise') setTimeout(() => { console.log('setTimeout') resolve('resolved'); }, 2000); }).then((val) => { console.log(val) }); console.log('sub') }; console.log('start') example(); console.log('end')

# अंतर्निहित मॉड्यूल

*wes* में बुनियादी प्रसंस्करण को सरल और मानकीकृत करने के लिए *built-in modules* हैं।

## *ansi*

`ansi` *ANSI escape code* है जो मानक आउटपुट रंग और प्रभाव बदल सकता है। उपयोग किए गए कंसोल एप्लिकेशन के प्रकार और सेटिंग्स के आधार पर रंग और प्रभाव भिन्न हो सकते हैं।

     const { redBright, yellow } = require('ansi') const message = 'File does not exist' console.log(redBright 'Error: ' yellow message)

आप `ansi.color()` और `ansi.bgColor()` के साथ अपने खुद के रंग भी बना सकते हैं। तर्क *RGB* जैसे `255, 165, 0` और *color code* जैसे `'#FFA500'` हैं। `orange` जैसे *color name* समर्थित नहीं हैं।

     const { color } = require('ansi') const orange = color(255, 165, 0) console.log(orange 'Hello World')

## *argv*

कमांड लाइन तर्क प्राप्त करें। `cscript.exe` की कमांड लाइन तर्क `/` के साथ नामित तर्कों की घोषणा करते हैं, जबकि *wes* `-` और `--` के साथ नामित तर्कों की घोषणा करते हैं। *argv.unnamed* और *argv.named* कमांड लाइन तर्क मान प्रकार को *String* *Number* *Boolean* में डाला। *REP* के साथ कमांड लाइन तर्क दर्ज करें।

     wes REP aaa -bcd eee --fgh=iii jjj --kln mmm

*REP* पर निम्न स्क्रिप्ट चलाएँ।

     const argv = require('argv') console.log(`argv: %O argv.unnamed: %O argv.named: %O`, argv, argv.unnamed, argv.named)

## *pathname*

रास्तों में हेरफेर। `/` और `\` से शुरू होने वाले पथ आमतौर पर ड्राइव रूट के सापेक्ष होते हैं। उदाहरण के लिए `/filename` और `C:/filename` एक ही पथ हो सकते हैं। सुरक्षा कारणों से, *wes* कार्यशील निर्देशिका के सापेक्ष `/` और `\` से शुरू होने वाले पथों की व्याख्या करता है।

     const path = require('pathname') const file = path.resolve(__dirname, 'index.js') console.log('file %O', file)

## *filesystem*

फ़ाइलों और निर्देशिकाओं में हेरफेर करें। `readTextFileSync()` स्वचालित रूप से फ़ाइल के एन्कोडिंग का अनुमान लगाता है और उसे पढ़ता है। (भले ही `readFileSync()` का दूसरा तर्क `auto` पर `encode` हो, यह स्वचालित रूप से अनुमान लगाया जाएगा।)

     const fs = require('filesystem') const path = require('pathname') const readme = path.resolve(__dirname, 'README.md') const contents = fs.readTextFileSync(readme) // const contents = fs.readFileSync(readme, 'auto') console.log(contents)

## *chardet*

मैं <https://github.com/runk/node-chardet> से कुछ सुविधाओं का उपयोग कर रहा हूं। आप एन्कोडिंग-विशिष्ट वर्णों को बढ़ाकर स्वतः अनुमान लगाने की सटीकता बढ़ा सकते हैं।

## *JScript*

यदि आप स्क्रिप्ट इंजन को *Chakra* में बदलते हैं, तो आप *JScript* -विशिष्ट *Enumerator* , आदि का उपयोग नहीं कर पाएंगे। बिल्ट-इन मॉड्यूल *JScript* उन्हें उपलब्ध कराता है। हालांकि, *Enumerator* एक *Array* देता है, न कि *Enumerator object* ।

     const { Enumerator, ActiveXObject } = require('JScript') const FSO = new ActiveXObject('Scripting.FileSystemObject') const dir = FSO.getFolder(__dirname).Files const files = new Enumerator(dir) files.forEach(file => console.log(file.Name))

*GetObject* `WScript.GetObject` के विकल्प के रूप में काम करता है।

     const { GetObject, Enumerator } = require('JScript') const ServiceSet = GetObject("winmgmts:{impersonationLevel=impersonate}").InstancesOf("Win32_Service") new Enumerator(ServiceSet).forEach(service => console.log( 'Name: %O\nDescription: %O\n', service.Name, service.Description ))

## *VBScript*

*VBScript* कुछ सुविधाएं प्रदान करता है जो *JScript* नहीं करता है।

     const { TypeName } = require('VBScript') const FSO = require('Scripting.FileSystemObject') console.log(TypeName(FSO))

## *httprequest*

*httprequest* एक *http request* जारी करता है।

     const request = require('httprequest') const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1') console.log('%O', JSON.parse(content))

undefined

## *pipe*

*pipe* पाइपिंग को सरल करता है।

### प्रयोग

     const pipe = require('pipe') function add (a, b) { return ba } function sub (a, b) { return b - a } function div (a, b) { return a / b } const add5 = add.bind(null, 5) const sub3 = sub.bind(null, 3) pipe() .use(add5) .use(sub3) .use(div, 4) .process(10, (err, res) => console.log('res: %O', res))

## *typecheck*

स्क्रिप्ट प्रकार निर्धारित करें।

### प्रयोग

     const { isString, isNumber, isBoolean, isObject } = require('typecheck') const log = require('log') log(() => isString("ECMAScript")) log(() => isNumber(43.5)) log(() => isBoolean(false)) log(() => isObject(function(){}))

undefined

## *getMember*

*ProgID* से सदस्य प्रकार और *COM Object* का विवरण प्राप्त करें।

### प्रयोग

     const getMember = require('getMember') const FileSystemObject = 'Scripting.FileSystemObject' console.log('require("%S") // => %O', FileSystemObject, getMember(FileSystemObject))

## *zip*

फ़ाइलों और फ़ोल्डरों को संपीड़ित करता है और संपीड़ित फ़ाइलों को डीकंप्रेस करता है। आंतरिक रूप से, *PowerShell* को कॉल और संसाधित किया जाता है।

### प्रयोग

     const {zip, unzip} = require('zip') console.log(zip('docs\\*', 'dox.zip')) console.log(unzip('dox.zip'))

एक वाइल्डकार्ड `*` को `zip(path, destinationPath)` के `path` में लिखा जा सकता है। इसका उपयोग *CLI (Command Line Interface)* और *module* दोनों में किया जा सकता है।

     wes zip docs\* dox.zip wes zip -p dox.zip

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

*wes* में, कई मॉड्यूल के बंडल को पैकेज कहा जाता है। आप *github* पर प्रकाशित *wes* के लिए पैकेज स्थापित कर सकते हैं। एक पैकेज प्रकाशित करने के लिए एक *github repository* की आवश्यकता होती है।

## *bundle*

*github* पर पैकेज प्रकाशित करते समय, *bundle* आवश्यक मॉड्यूल को बंडल करता है और *bundle.json* बनाता है।

1.  एक *repository* में केवल एक पैकेज प्रकाशित किया जा सकता है

2.  *package.json* आवश्यक है। कम से कम, `main` क्षेत्र का विवरण आवश्यक है।

         { "main": "index.js" }

3.  यदि आप पैकेज प्रकाशित करना चाहते हैं तो रिपॉजिटरी को *public* करें

4.  `version 0.12.0` से शुरू होकर, कार्यशील निर्देशिका के ऊपर एक निर्देशिका में सीधे मॉड्यूल लोड होने वाले पैकेजों को बंडल नहीं किया जाएगा। ऊपरी निर्देशिका में संकुल *wes\_modules* या *node\_modules* बंडल किए जा सकते हैं।

बंडल करने के लिए निम्न आदेश दर्ज करें: क्या बंडल करना है इसके लिए *package.json* का संदर्भ लें।

     wes bundle

undefined

# निजी भंडारों से संकुल अधिष्ठापन

*install* न केवल सार्वजनिक *github* रिपॉजिटरी से पैकेज स्थापित कर सकता है, बल्कि निजी रिपॉजिटरी से भी पैकेज स्थापित कर सकता है। *install* में, पैकेज को *@author/repository* के साथ निर्दिष्ट करें। कार्यान्वयन निम्न url को डाउनलोड करने का प्रयास करता है।

     `https://raw.githubusercontent.com/${author}/${repository}/master/bundle.json`

यदि आप एक ब्राउज़र के साथ निजी भंडार तक *raw* हैं, तो *token* प्रदर्शित होगा, इसलिए *token* की प्रतिलिपि बनाएँ और उसका उपयोग करें। आप निजी रिपॉजिटरी से पैकेज को कंसोल में चलाकर भी इंस्टॉल कर सकते हैं जबकि *token* वैध है।

     wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA

# पैकेज परिचय

यहां कुछ बाहरी पैकेज दिए गए हैं।

## *@wachaon/fmt*

स्क्रिप्ट को प्रारूपित करने के लिए *@wachaon/fmt* को *wes* के लिए *prettier* पैक किया गया है। साथ ही, यदि *@wachaon/fmt* स्थापित होने के दौरान *Syntax Error* होती है, तो आप त्रुटि के स्थान को इंगित कर सकते हैं।

### इंस्टॉल

     wes install @wachaon/fmt

### प्रयोग

यदि कार्यशील निर्देशिका में *.prettierrc* (JSON प्रारूप) है, तो यह सेटिंग्स में दिखाई देगा। *fmt* *CLI* और *module* दोनों में उपलब्ध है।

#### *CLI* के रूप में प्रयोग करें।

     wes @wachaon/fmt src/sample --write

| अनाम संख्या | विवरण                                                |
| ----------- | ---------------------------------------------------- |
| 1           | आवश्यक। फ़ाइल का पथ जिसे आप प्रारूपित करना चाहते हैं |

| नामित     | संक्षिप्त नाम | विवरण                       |
| --------- | ------------- | --------------------------- |
| `--write` | `-w`          | अधिलेखित करने की अनुमति दें |

प्रारूपित स्क्रिप्ट के साथ फ़ाइल को अधिलेखित करें यदि `--write` या `-w` नामित तर्क निर्दिष्ट है।

#### मॉड्यूल के रूप में उपयोग करें

     const fmt = require('@wachaon/fmt') const { readTextFileSync, writeTextFileSync } = require('filesystem') const { join, workingDirectory } = require('pathname') const target = join(workingDirectory, 'index.js') console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
