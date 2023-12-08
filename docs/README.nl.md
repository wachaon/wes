# *WES*

*wes* is een consoleframework voor het uitvoeren van *ECMAScript* op *WSH (Windows Script Host)* . De originele tekst van *README* is in [*japanese*](/README.md) . Andere teksten dan Japans worden automatisch vertaald.\
Maak voor teksten in andere talen een keuze uit de onderstaande opties.

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

# functie

*   U kunt de script-engine wijzigen in *Chakra* en schrijven volgens de specificaties van *ECMAScript2015+* .
*   Gebruikt altijd 32-bits *cscript.exe* , dus geen unieke 64-bits problemen
*   Modulesysteem beschikbaar voor efficiëntere ontwikkeling dan traditionele *WSH*
*   Ingebouwde modules ondersteunen basisverwerking zoals invoer/uitvoer van bestanden en uitvoer van gekleurde tekst naar de console
*   U hoeft zich geen zorgen te maken over codering etc. omdat het de codering automatisch kan afleiden bij het lezen van het bestand
*   Het is ook mogelijk om de module te verpakken en extern te publiceren of te verwerven.
*   Geef foutdetails vriendelijker weer dan *WSH*

# Bekende problemen die *wes* niet kunnen oplossen

*   `WScript.Quit` kan het programma niet afbreken en retourneert geen foutcode
*   Asynchrone verwerking werkt niet goed
*   U kunt *event prefix* van het tweede argument van `WScript.CreateObject` niet gebruiken

# downloaden

*wes* heeft alleen het bestand *wes.js* nodig. Om te downloaden, kopieert u *wes.js* van [*@wachaon/wes*](https://github.com/wachaon/wes) of voert u de volgende opdracht uit in de console.

```bat
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

*wes* past een implementatie toe die *WScript.Shell* 's `SendKeys` tijdens runtime gebruikt. Als het pad van de map waarin *wes.js* is opgeslagen niet-ASCII-tekens bevat, kan `SendKeys` de sleutels niet correct verzenden en wordt het script niet uitgevoerd. Daarom mag het pad waar u *wes.js* opslaat alleen uit ASCII-tekens bestaan. Als u *wes.js* al hebt gedownload, kunt u het ook bijwerken met de onderstaande opdracht.

```bat
wes update
```

# hoe te *wes*

Voer `wes` trefwoord in en de opdracht die het bestand specificeert dat het startpunt van het programma naar de console zal zijn. De scriptextensie *.js* kan worden weggelaten.

```bat
wes index
```

*wes* kan direct scripts invoeren en uitvoeren op de console. Als u het alleen met `wes` start, kunt u het script direct invoeren en uitvoeren.

```bat
wes
```

*REP* accepteert scriptinvoer totdat u twee lege regels invoert. U kunt *REP* ook het voorbeeldscript zien uitvoeren in *README.md* .

## opdrachtregel opties

De opstartopties *wes* zijn als volgt.

| genaamd            | Beschrijving                                            |
| ------------------ | ------------------------------------------------------- |
| `--monotone`       | Elimineert *ANSI escape code*                           |
| `--transpile`      | Altijd converteren en uitvoeren met *babel-standalone*  |
| `--debug`          | voer het script uit in foutopsporingsmodus              |
| `--encoding=UTF-8` | Specificeert de codering van het eerste gelezen bestand |
| `--arch=x86`       | Deze optie wordt automatisch toegevoegd door *wes*      |

# module systeem

*wes* ondersteunt twee modulesystemen, *commonjs module* met behulp van `require()` en *es module* met behulp van `import` . ( *dynamic import* wordt niet ondersteund omdat het een asynchroon proces is)

## *commonjs module*

Beheer modules door ze toe te wijzen aan `module.exports` en `require()` aan te roepen. Andere paden dan absolute paden en relatieve paden die beginnen met `./` en `../` zoeken naar modules in *wes\_modules* en handig in *node\_modules* . *wes* ' `require()` raadt automatisch de codering van het modulebestand, maar u kunt de codering specificeren met het tweede argument als het niet correct raadt.

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

Het is ook mogelijk om te importeren met *require* voor *COM Object* zoals `require('WScript.Shell')` .

```javascript
const Shell = require('Shell.Application')
Shell.MinimizeAll()
WScript.Sleep(2000)
Shell.UndoMinimizeAll()
```

## *es module*

*Chakra* , de engine voor het uitvoeren van scripts, interpreteert syntaxis zoals `imoprt` , maar wordt niet uitgevoerd in *cscript* omgeving. In *wes* door *babel* toe te voegen aan de ingebouwde modules, worden *es module* ook uitgevoerd terwijl ze een voor een worden getransponeerd. Dit gaat gepaard met verwerkingskosten en een opgeblazen *wes.js* bestand. Modules geschreven in *es module* worden ook geconverteerd naar `require()` door transpilatie, dus het is mogelijk om *COM Object* aan te roepen. Het ondersteunt echter niet het specificeren van de codering van het modulebestand met *es module* . Alles wordt automatisch geladen. Om het als *es module* te laden, stelt u de extensie in op `.mjs` of stelt u het veld `"type"` in `package.json` in op `"module"` .

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

# ingebouwd voorwerp

*wes* heeft *built-in objects* die niet zijn gevonden in *WSH (JScript)* .

## *console*

*wes* gebruiken *console* in plaats van `WScript.Echo()` en `WScript.StdErr.WriteLine()` .

### *console.log*

Voer tekens uit naar de console met `console.log()` . Het ondersteunt ook geformatteerde strings. Voert een opgemaakte tekenreeks uit met behulp van de `%` -opmaakoperator. (Opmaakoperatoren zijn ook geldig voor andere methoden.)

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

| Formaat specificatie | Beschrijving                        |
| -------------------- | ----------------------------------- |
| `%s`                 | `String(value)`                     |
| `%S`                 | `String(value)`                     |
| `%c`                 | `String(value)`                     |
| `%C`                 | `String(value)`                     |
| `%d`                 | `parseInt(value, 10)`               |
| `%D`                 | `parseInt(value, 10)`               |
| `%f`                 | `Number(value)`                     |
| `%F`                 | `Number(value)`                     |
| `%j`                 | `JSON.stringify(value)`             |
| `%J`                 | `JSON.stringify(value, null, 2)`    |
| `%o`                 | object dumpen                       |
| `%O`                 | Objectdump (ingesprongen/kleurrijk) |

*wes* gebruikt `WScript.StdOut.WriteLine` in plaats van `WScript.StdErr.WriteLine` om gekleurde strings uit te voeren. `WScript.Echo` en `WScript.StdOut.WriteLine` zijn geblokkeerd. Gebruik `WScript.StdErr.WriteLine` of `console.log` .

### *console.print*

`console.log()` bevat normaal gesproken een nieuwe regel aan het eind, maar `console.print` niet.

### *console.debug*

Alleen uitvoer naar de console als `--debug` is ingeschakeld.

### *console.error*

Gooi een uitzondering met de inhoud als bericht.

### *console.weaklog*

Tekenreeksen die zijn afgedrukt met `console.weaklog()` verdwijnen van de console als er een volgende uitvoer is. Handig voor het schakelen van uitgangen.

## *Buffer*

Je kunt omgaan met buffers.

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log('%s %O', content, buff)
```

## `__dirname` en `__filename`

`__filename` slaat het pad op van het modulebestand dat momenteel wordt uitgevoerd. `__dirname` bevat de directory van `__filename` .

```javascript
const message = `dirname: ${__dirname}\nfilename: ${ __filename}`
console.log(message)
```

## *setTimeout* *setInterval* *setImmediate* *Promise*

Aangezien *wes* een uitvoeringsomgeving is voor synchrone verwerking, functioneert *setTimeout* *setInterval* *setImmediate* *Promise* niet als asynchrone verwerking, maar is het geïmplementeerd om modules te ondersteunen die uitgaan van *Promise* implementatie.

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

# Ingebouwde module

*wes* heeft *built-in modules* om basisverwerking te vereenvoudigen en te standaardiseren.

## Ingebouwde modules moeten verwijderd worden

Wijzig enkele ingebouwde modules in externe modules om het bestand lichter en gemakkelijker te onderhouden te maken.

*   *animate.js*
*   *day.js*
*   *debug.js*
*   *log.js*

De bovenstaande modules kunnen respectievelijk worden geïnstalleerd als `@wachaon/animate` `@wachaon/day` `@wachaon/debug` `@wachaon/log` .

## *ansi*

`ansi` is *ANSI escape code* die standaard uitvoerkleuren en -effecten kan wijzigen. Kleuren en effecten kunnen verschillen, afhankelijk van het type en de instellingen van de gebruikte consoletoepassing.

```javascript
const { redBright, yellow } = require('ansi')
const message = 'File does not exist'
console.log(redBright + 'Error: ' + yellow + message)
```

U kunt ook uw eigen kleuren maken met `ansi.color()` en `ansi.bgColor()` . Argumenten gebruiken *RGB* zoals `255, 165, 0` *color code* zoals `'#FFA500'` . *color name* zoals `orange` worden niet ondersteund.

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

## *argv*

Krijg opdrachtregelargumenten. De opdrachtregelargumenten van `cscript.exe` declareren benoemde argumenten met `/` , terwijl *wes* benoemde argumenten declareert met `-` en `--` . *argv.unnamed* en *argv.named* casten het waardetype van het opdrachtregelargument naar ofwel *String* *Number* *Boolean* . Voer opdrachtregelargumenten in met *REP* .

```bat
wes REP aaa -bc dd --e=false --gh=iii jjj --klm nn -o --p 9 r
```

Voer het volgende script uit op *REP* .

```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```

## *pathname*

Paden manipuleren. Paden die beginnen met `/` en `\` zijn over het algemeen relatief ten opzichte van de hoofdmap van de schijf. Bijvoorbeeld `/filename` en `C:/filename` kunnen hetzelfde pad zijn. Om veiligheidsredenen interpreteert *wes* paden die beginnen met `/` en `\` ten opzichte van de werkdirectory.

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

## *filesystem*

Bestanden en mappen manipuleren. `readTextFileSync()` raadt automatisch de codering van het bestand en leest het. (Zelfs als het tweede `encode` van `readFileSync()` is ingesteld op `auto` , wordt het automatisch geraden.)

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
// const contents = fs.readFileSync(readme, 'auto')
console.log(contents)
```

## *chardet*

Ik gebruik enkele functies van <https://github.com/runk/node-chardet> . U kunt de nauwkeurigheid van automatisch raden vergroten door het aantal coderingsspecifieke tekens te vergroten.

## *JScript*

Als u de script-engine wijzigt in *Chakra* , kunt u geen *JScript* specifieke *Enumerator* enz. gebruiken. De ingebouwde module *JScript* maakt ze beschikbaar. *Enumerator* retourneert echter *Array* en geen *Enumerator object* .

```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```

*GetObject* werkt als een alternatief voor `WScript.GetObject` .

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

*VBScript* biedt enkele functies die *JScript* niet biedt.

```javascript {"testing": true, "message": "Typename"}
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(() => TypeName(FSO)) // => "FileSystemObject"
```

## *httprequest*

*httprequest* geeft *http request* af.

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

*minitest* kan eenvoudige toetsen schrijven. Vanaf versie `0.10.71` zijn we teruggegaan naar het basisconcept en hebben we de soorten beweringen teruggebracht tot 3 soorten.

Groepeer met `describe` , test `it` en verifieer met `assert` . `pass` zal een array zijn van het aantal keren dat `it` voorkomt en het aantal passes.

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

### beweringen

Er zijn slechts drie beweringsfuncties voor het vergelijken van objecten voor de eenvoud.

#### `assert(value, message)` `assert.ok(value, message)`

Vergelijk met `true` met de strikte gelijkheidsoperator `===` . Als `value` een functie is, evalueer dan het resultaat van het uitvoeren van de functie.

| Param     | Type                  | Beschrijving                     |
| :-------- | :-------------------- | :------------------------------- |
| `value`   | `{Function\|Boolean}` | booleaanse of booleaanse functie |
| `message` | `{String}`            | bericht in geval van storing     |

#### `assert.equal(expected, actual)`

Vergelijkt objecten voor ledengelijkheid, niet op basis van referentie.\
`NaN === NaN` `function (){} === function (){}` `true` `/RegExp/g === /RegExp/g` of `{one: {two: 2}} === {one: {two: 2}}` `[1,2,3] === [1,2,3]` enz.\
Bij het vergelijken van klassen (objecten) moeten ze dezelfde constructor hebben of een superklasse waarvan `actual` wordt `expected` .

| Param      | Type    | Beschrijving      |
| :--------- | :------ | :---------------- |
| `expected` | `{Any}` | verwachte waarde  |
| `actual`   | `{Any}` | Werkelijke waarde |

#### `assert.throws(value, expected, message)`

Controleer of fouten correct worden gegenereerd.\
Of de fout al dan niet correct is, wordt bepaald door het feit of de *constructor* van de verwachte fout, *message* gelijk is en de reguliere expressie *stack* doorstaat.

| Param      | Type                      | Beschrijving                                                                            |
| :--------- | :------------------------ | :-------------------------------------------------------------------------------------- |
| `value`    | `{Error}`                 | fout                                                                                    |
| `expected` | `{Error\|String\|RegExp}` | Een reguliere expressie die de verwachte *constructor* , *message* of *stack* evalueert |
| `message`  | `{String}`                | bericht in geval van storing                                                            |

## *match*

*match* is een module die bepaalt of een bestandspad overeenkomt met een specifiek patroon. U kunt jokertekens gebruiken (wildcards zijn speciale tekens zoals `*` en `?` ) in bestandsnamen en paden om te zoeken naar bestanden die aan specifieke criteria voldoen.

| Param     | Type       | Beschrijving |
| :-------- | :--------- | :----------- |
| `pattern` | `{String}` | patroon      |
| `matcher` | `{Any}`    | Doelpad      |

```javascript {"testing": true, "message": "match"}
const match = require('match')

console.log(() => match('path/to/*.js', 'path/to/url.js')) // => true
console.log(() => match('path/**/index.*', 'path/to/url/index.json')) // => true
console.log(() => match('path/to/*.?s', 'path/to/script.cs')) // => true
```

### *match.search*

*match.search* vindt paden die overeenkomen met een patroon uit bestaande paden.

| Param     | Type       | Beschrijving                              |
| :-------- | :--------- | :---------------------------------------- |
| `pattern` | `{String}` | patroon                                   |
| `matcher` | `{Any}`    | Directorypad waarnaar moet worden gezocht |

```javascript
const { search } = require('match')

console.log(() => search('**/LICENSE', process.cwd()))
```

## *pipe*

*pipe* vereenvoudigt piping. Voer het resultaat uit tijdens het converteren van *data* met een of meerdere *converter* . Vanaf *ver 0.12.75* kan het direct vanaf de opdrachtregel worden gestart.

### Start *pipe* als een module

Plaats de conversiefunctie in `use(converter)` van de *pipe* methode en beschrijf de gegevensinvoer en verwerking na de conversie met `process(data, callback(error, result))` . Als er geen `callback` is opgegeven, is de geretourneerde waarde *promise* en kan de verwerking worden verbonden met `then(result)` en `catch(error)` .

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

Naast `use(converter)` zijn er methoden zoals `.filter(callbackFn(value, index))` en `map(callbackFn(value, index))` . Elke *data* is een string, een array en een object.

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

### start *pipe* vanaf de opdrachtregel

Voer vanaf de opdrachtregel de conversiefunctie in de volgorde na `pipe` in. Argumenten voor conversiefuncties worden ingevoerd als de waarden van benoemde opdrachtregelargumenten met dezelfde naam als de conversiefunctie. `=>` waarde `(` geparseerd met `eval()` in plaats van `JSON.parse()` `)` *WSH* `"` forceert in opdrachtregelargumenten. In dat geval niet parseren met `eval()` )

```bash
wes pipe swap merge --input="sample.txt" --output="" --swap="[2, 0, 1, 3]" --merge=4
```

Deze opdracht is gelijk aan het script:

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

Bepaal het scripttype.

```javascript {"testing": true, "message": "typecheck"}
const { isString, isNumber, isBoolean, isObject } = require('typecheck')
console.log(() => isString("ECMAScript")) /* => true */
console.log(() => isNumber(43.5)) /* => true */
console.log(() => isBoolean(false)) /* => true */
console.log(() => isObject(function(){})) /* => false */
```

## *getMember*

Haalt het *COM Object* en de beschrijving op van *ProgID* bij gebruik in de console.

```bat
wes getMember "Scripting.FileSystemObject"
```

Bij gebruik als module krijgt het het type en de beschrijving van de leden van de instantie. Bij gebruik als module kunt u informatie krijgen over objecten die niet kunnen worden bevestigd vanuit *WSH (Windows Script Host)* .

```javascript
const getMember = require('getMember')
const SWbemServicesEx = require("WbemScripting.SWbemLocator").ConnectServer()
getMember(SWbemServicesEx)
```

## *ps*

Vergemakkelijkt het uitvoeren van *PowerShell* .

### `ps(source, option)`

Voer `source` *PowerShell* bronscript uit.

Geef een lijst met cmdlets weer in de console.

```javascript
const ps = require('ps')
 
console.log(ps("Get-Command"))
```

Als er een *Google Cherome* venster is, wijzigt u de grootte en positie van het venster. (Het werkt niet in de modus Volledig scherm.)

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

Regelt muisbewegingen en klikken.

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

Sla het script op als een bestand of plak het in uw volgende `REP` .

```bat
wes REP pos 100 100
```

### Voer *powershell* rechtstreeks uit vanaf de console

Voert het opgegeven *.ps1* bestand uit in de console.

```bat
wes ps ./sample.ps1
```

U kunt ook direct een opdracht uitvoeren door `--Command` of `-c` op te geven.

Voorbeeld van het weergeven van een lijst met bestanden in de huidige map

```bat
wes ps --Command Get-ChildItem
```

## *zip*

Comprimeert bestanden en mappen en decomprimeert gecomprimeerde bestanden. Intern wordt *PowerShell* aangeroepen en verwerkt.

```javascript
const {zip, unzip} = require('zip')
console.log(zip('docs\\*', 'dox.zip'))
console.log(unzip('dox.zip'))
```

Een jokerteken `*` kan worden geschreven in `path` van `zip(path, destinationPath)` . Het kan zowel in *CLI (Command Line Interface)* als in *module* worden gebruikt.

```bat
wes zip docs\* dox.zip
wes zip -p dox.zip
```

Als `path` de extensie `.zip` heeft, wordt `unzip()` verwerkt en is er geen beschrijving van de extensie `.zip` . Als alternatief, zelfs als er een extensie `.zip` als er een wildcard `*` beschrijving is, zal `zip()` worden verwerkt.

| naamloos | Beschrijving                      |
| -------- | --------------------------------- |
| `1`      | `path` of bestand om in te voeren |
| `2`      | mapbestand naar `dest`            |

| genaamd  | korte naam | Beschrijving                      |
| -------- | ---------- | --------------------------------- |
| `--path` | `-p`       | `path` of bestand om in te voeren |
| `--dest` | `-d`       | mapbestand naar `dest`            |

# Bundelen (verpakken) en installeren van modules

In *wes* wordt een bundel van meerdere modules een pakket genoemd. U kunt het pakket voor *wes* installeren dat op *github* is gepubliceerd. *github repository* is vereist om een ​​pakket te publiceren.

## *bundle*

Bij het publiceren van een pakket naar *github* , *bundle* bundel de vereiste modules en maakt *bundle.json* .

1.  Er kan slechts één pakket in één *repository* worden gepubliceerd

2.  *package.json* is vereist. De beschrijving van `main` is minimaal vereist.

    ```json
     { "main": "index.js" }
    ```

3.  Maak de repository *public* als u het pakket wilt publiceren

4.  Vanaf `version 0.12.0` worden pakketten met het direct laden van de module in een map boven de werkmap niet gebundeld. Pakketten in de bovenste directory *wes\_modules* of *node\_modules* kunnen worden gebundeld.

Voer de volgende opdracht in om te bundelen: Raadpleeg *package.json* voor wat u moet bundelen.

```bat
wes bundle 
```

## *init*

Voer enkele items in en het zal *package.json* van die informatie maken.

```bat
wes init
```

## *install*

Gebruikt om het pakket te installeren voor *wes* gepubliceerd op *github* . Vanaf `version 0.10.28` is de installatiemap gewijzigd van `node_modules` in `wes_modules` . Als je in `node_modules` wilt installeren, voeg dan de optie `--node` toe. Vanaf `version 0.12.0` wordt het bestand uit *bandle.json* uitgepakt en opgeslagen. Als gevolg van specificatiewijzigingen kunnen pakketten die zijn gebundeld met `version 0.12.0` mogelijk niet correct worden geïnstalleerd met `version 0.12.0` of later.

Geef argumenten door om te *install* in de vorm `@author/repository` .

```bat
wes install @wachaon/fmt
```

*install* heeft opties.

| genaamd       | korte naam | Beschrijving                                                                    |
| ------------- | ---------- | ------------------------------------------------------------------------------- |
| `--bare`      | `-b`       | Maak geen *@author* mappen                                                      |
| `--global`    | `-g`       | Installeer het pakket in de map waar *wes.js* zich bevindt                      |
| `--save`      | `-S`       | Voeg pakketnaam en -versie toe aan *dependencies* in *package.json*             |
| `--save--dev` | `-D`       | Voeg pakketnaam en -versie toe aan het veld *devDependencies* in *package.json* |
| `--node`      | `-n`       | Installeer in de map *node\_module*                                             |

De optie `--bare` kan `require` weglaten van `@author/repository` naar `repository` . `--global` maakt geïnstalleerde pakketten beschikbaar voor alle scripts.

```bat
wes install @wachaon/fmt --bare
```

# Pakketten installeren vanuit privérepository's

*install* kan niet alleen pakketten uit openbare *github* repository's installeren, maar ook pakketten uit privé-repository's. Specificeer in *install* het pakket met *@author/repository* . De implementatie probeert de volgende url te downloaden.

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/bundle.json`
```

Wanneer u met een browser toegang krijgt tot *raw* van de privérepository, wordt *token* weergegeven, dus kopieer het *token* en gebruik het. Pakketten uit privérepository's kunnen ook worden geïnstalleerd als ze worden uitgevoerd in de console terwijl *token* geldig is.

```bat
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

# Pakket introductie

Hier zijn enkele externe pakketten.

## *@wachaon/fmt*

*@wachaon/fmt* is *prettier* verpakt om scripts op te *wes* . Als er *Syntax Error* optreedt terwijl *@wachaon/fmt* is geïnstalleerd, kunt u de locatie van de fout aangeven.

### Installeer *@wachaon/fmt*

```bat
wes install @wachaon/fmt
```

Als er *.prettierrc* (JSON-indeling) in de werkmap staat, wordt dit weergegeven in de instellingen. *fmt* is beschikbaar in zowel *CLI* als *module* .

#### Gebruiken als *CLI* .

```bat
wes @wachaon/fmt src/sample --write
```

| naamloos nummer | Beschrijving                                            |
| --------------- | ------------------------------------------------------- |
| 1               | Vereist. het pad van het bestand dat u wilt formatteren |

| genaamd   | korte naam | Beschrijving             |
| --------- | ---------- | ------------------------ |
| `--write` | `-w`       | toestaan ​​overschrijven |

Overschrijf het bestand met het geformatteerde script als `--write` of `-w` is opgegeven.

#### gebruiken als module

```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')
const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```

## *@wachaon/edge*

*Internet Explorer* beëindigt de ondersteuning op 15 juni 2022. Hierdoor wordt verwacht dat applicatiebewerkingen met `require('InternetExplorer.Application')` onmogelijk zullen worden. Bovendien zal de site zelf niet correct kunnen worden weergegeven door de ondersteuning voor *Internet Explorer* te beëindigen. Een alternatief zou zijn om *Microsoft Edge based on Chromium* te bedienen via *web driver(msedgedriver.exe)* . `@wachaon/edge` vereenvoudigt *Edge* piloot.

### Installeer *@wachaon/edge*

Installeer eerst het pakket.

```bat
wes install @wachaon/edge --bare
```

Download dan *web driver(msedgedriver.exe)* .

```bat
wes edge --download
```

Controleer de geïnstalleerde *Edge* versie en download de bijbehorende *web driver* .

### Hoe *@wachaon/edge* te gebruiken

Het zal gemakkelijk te gebruiken zijn. Start uw browser en wijzig de venstergrootte en de weer te geven site in `https://www.google.com` .

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

We bewaren uw bezoekgeschiedenis totdat *URL* van uw browser begint met `https://www.yahoo` .

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

*edge* drukt de bezochte *URL* op volgorde af naar de console. `@wachaon/edge` registreert gebeurtenissen voor *URL* en voegt gegevens toe aan `res.exports` . *URL* kan `String` `RegExp` zijn en kan flexibel worden ingesteld. Door het event-driven te maken, kun je eenvoudig overschakelen naar handmatige bediening door geen events in te stellen voor processen die moeilijk af te handelen zijn met de automatische piloot. Als u wilt dat het script stopt, voert u `navi.emit('terminate', res)` uit of beëindigt *Edge* handmatig. Finalisatie voert `res.exports` standaard uit als een *.json* bestand. Als u beëindigingsverwerking wilt instellen, stelt u `terminate` van `edge(callback, terminate)` in. `window` is een instantie van *Window* klasse van *@wachaon/webdriver* , niet het `window` .

## *@wachaon/webdriver*

Het zal een pakket zijn dat verzoeken stuurt naar *web driver* die de browser bestuurt. *@wachaon/edge* bevat *@wachaon/webdriver* .

### Installeer *@wachaon/webdriver*

```bat
wes install @wachaon/webdriver --bare
```

Download *Chromium* gebaseerde *Microsoft Edge* *web driver(msedgedriver.exe)* als u deze niet hebt. Als de versie van *edge* en de versie van *web driver(msedgedriver.exe)* verschillend zijn, download dan dezelfde versie van *web driver(msedgedriver.exe)* .

```bat
wes webdriver --download
```

### Hoe *@wachaon/webdriver* te gebruiken

Ga naar [*yahoo JAPAN*](https://www.yahoo.co.jp/) site en sla een screenshot op van een specifiek blokelement.

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
