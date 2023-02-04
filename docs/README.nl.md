# *WES*

*wes* is een consoleframework voor het uitvoeren van *ECMAScript* op *WSH (Windows Script Host)* . De originele [*japanese*](/README.md) van de *README* is in het Japans. Andere teksten dan Japans worden automatisch vertaald.\
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

# voorzien zijn van

*   U kunt de scriptengine wijzigen in *Chakra* en schrijven volgens *ECMAScript2015* -specificaties.
*   Aangezien 32bit *cscript.exe* altijd wordt uitgevoerd, is er geen uniek probleem in een 64bit-omgeving.
*   Omdat er een modulesysteem is, kan het efficiënter worden ontwikkeld dan de conventionele *WSH*
*   Ingebouwde modules ondersteunen basisverwerking zoals invoer/uitvoer van bestanden en uitvoer van gekleurde tekst naar de console
*   U kunt het lezen van bestanden automatisch de codering laten raden, zodat u zich geen zorgen hoeft te maken over codering enz.
*   Pakketmodules ter ondersteuning van extern publiceren en ophalen
*   Geef foutdetails vriendelijker weer dan *WSH*

# *wes* problemen die we niet kunnen oplossen

*   `WScript.Quit` kan het programma niet afbreken en geeft geen foutcode terug
*   Asynchrone verwerking werkt niet goed
*   U kunt het *event prefix* van het tweede argument van `WScript.CreateObject` . niet gebruiken

# downloaden

Wes heeft alleen het *wes* *wes.js* . Om te downloaden, kopieert u *wes.js* van [*@wachaon/wes*](https://github.com/wachaon/wes) of voert u de volgende opdracht uit in de console.

```bat
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

*WScript.Shell* `SendKeys` van *wes* tijdens runtime als implementatie. Als het pad van de map waarin *wes.js* is opgeslagen andere tekens dan *ascii* bevat, kan `SendKeys` de sleutel niet correct verzenden en kan het script niet worden uitgevoerd.\
Configureer het pad *wes.js* wordt opgeslagen alleen in *ascii* . Als je *wes* al hebt gedownload, kun je het bijwerken met de volgende opdracht.

```bat
wes update
```

# hoe te beginnen met *wes*

Voer het `wes` -sleutelwoord in en de opdracht die het bestand specificeert dat het startpunt van het programma naar de console zal zijn. De *.js* kan worden weggelaten.

```bat
wes index
```

*wes* kan direct scripts invoeren en uitvoeren op de console. Als u het alleen met `wes` start, kunt u het script direct invoeren en uitvoeren.

```bat
wes
```

*REP* accepteert scriptinvoer totdat u twee lege regels invoert. U kunt ook zien dat *REP* het voorbeeldscript uitvoert in *README.md* .

## opdrachtregelopties

De opstartopties van *wes* zijn als volgt.

| genaamd            | Beschrijving                                            |
| ------------------ | ------------------------------------------------------- |
| `--monotone`       | Elimineert *ANSI escape code*                           |
| `--transpile`      | Altijd converteren en uitvoeren met *babel-standalone*  |
| `--debug`          | voer het script uit in debug-modus                      |
| `--encoding=UTF-8` | Specificeert de codering van het eerste gelezen bestand |
| `--engine=Chakra`  | Deze optie wordt automatisch toegevoegd door *wes*      |

# module systeem

*wes* ondersteunt twee modulesystemen, het *commonjs module* dat gebruikmaakt van required `require()` en het *es module* dat `import` gebruikt. ( *dynamic import* wordt niet ondersteund omdat het een asynchroon proces is)

## *commonjs module*

Beheer modules door deze toe te wijzen aan `module.exports` en request `require()` aan te roepen. Andere paden dan absolute paden en relatieve paden die beginnen met `./` en `../` zoeken naar modules in de map *wes\_modules* en handig in de map *node\_modules* . *wes* 's `require()` raadt automatisch de codering van het modulebestand, maar je kunt de codering specificeren met het tweede argument als het niet correct raadt.

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

*Chakra* , de scriptuitvoeringsengine, interpreteert syntaxis zoals `imoprt` , maar wordt niet uitgevoerd in de *cscript* omgeving. In *wes* , door *babel* toe te voegen aan de ingebouwde modules, worden *es module* ook uitgevoerd terwijl ze sequentieel worden getranspileerd. Dit gaat gepaard met verwerkingskosten en een opgeblazen *wes.js* -bestand. Modules die in de *es module* zijn geschreven, worden ook geconverteerd naar required `require()` door te transpileren, dus het is mogelijk om *COM Object* aan te roepen. Het ondersteunt echter niet het specificeren van de codering van het modulebestand met *es module* . Alles wordt automatisch geladen. Om het als een *es module* te laden, stelt u de extensie in op `.mjs` of stelt u het veld `"type"` in `package.json` in op `"module"` .

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

# ingebouwd object

*wes* heeft *built-in objects* niet worden gevonden in *WSH (JScript)* .

## *console*

We gebruiken *console* in plaats van *wes* `WScript.Echo()` en `WScript.StdErr.WriteLine()` .

### *console.log*

Voer tekens uit naar de console met `console.log()` . Het ondersteunt ook geformatteerde tekenreeksen. Voert een opgemaakte tekenreeks uit met behulp van de opmaakoperator `%` . (Opmaakoperatoren zijn ook geldig voor andere methoden.)

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

| Formaatspecificatie | Beschrijving                        |
| ------------------- | ----------------------------------- |
| `%s`                | `String(value)`                     |
| `%S`                | `String(value)`                     |
| `%c`                | `String(value)`                     |
| `%C`                | `String(value)`                     |
| `%d`                | `parseInt(value, 10)`               |
| `%D`                | `parseInt(value, 10)`               |
| `%f`                | `Number(value)`                     |
| `%F`                | `Number(value)`                     |
| `%j`                | `JSON.stringify(value)`             |
| `%J`                | `JSON.stringify(value, null, 2)`    |
| `%o`                | object dump                         |
| `%O`                | Objectdump (ingesprongen/kleurrijk) |

`WScript.StdOut.WriteLine` *wes* van `WScript.StdErr.WriteLine` om gekleurde tekenreeksen uit te voeren. `WScript.Echo` en `WScript.StdOut.WriteLine` zijn geblokkeerde uitvoer. `WScript.StdErr.WriteLine` of `console.log` .

### *console.print*

`console.log()` bevat normaal gesproken een nieuwe regel aan het eind, maar `console.print` niet.

### *console.debug*

Alleen uitvoer naar de console als de optie `--debug` is ingeschakeld.

### *console.error*

Gooi een uitzondering met de inhoud als het bericht.

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

`__filename` slaat het pad op van het momenteel uitgevoerde modulebestand. `__dirname` bevat de directory van `__filename` .

```javascript
const message = `dirname: ${__dirname}\nfilename: ${ __filename}`
console.log(message)
```

## *setTimeout* *setInterval* *setImmediate* *Promise*

Aangezien *wes* een uitvoeringsomgeving is voor synchrone verwerking, werkt *setTimeout* *setInterval* *setImmediate* *Promise* niet als asynchrone verwerking, maar wordt het geïmplementeerd om modules te ondersteunen die de implementatie van *Promise* veronderstellen.

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

*wes* heeft *built-in modules* om de basisverwerking te vereenvoudigen en te standaardiseren.

# Ingebouwde modules moeten verwijderd worden

Wijzig enkele ingebouwde modules in externe modules om het bestand lichter en gemakkelijker te onderhouden te maken.

*   *animate.js*
*   *day.js*
*   *debug.js*
*   *log.js*

De bovenstaande modules kunnen respectievelijk worden geïnstalleerd als `@wachaon/animate` `@wachaon/day` `@wachaon/debug` `@wachaon/log` .

## *ansi*

`ansi` is *ANSI escape code* die standaarduitvoerkleuren en -effecten kan wijzigen. Kleuren en effecten kunnen verschillen, afhankelijk van het type en de instellingen van de gebruikte consoletoepassing.

```javascript
const { redBright, yellow } = require('ansi')
const message = 'File does not exist'
console.log(redBright + 'Error: ' + yellow + message)
```

U kunt ook uw eigen kleuren maken met `ansi.color()` en `ansi.bgColor()` . Argumenten gebruiken *RGB* zoals `255, 165, 0` en *color code* zoals `'#FFA500'` . *color name* zoals `orange` worden niet ondersteund.

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

## *argv*

Krijg opdrachtregelargumenten. De opdrachtregelargumenten van `cscript.exe` declareren benoemde argumenten met `/` , terwijl *wes* benoemde argumenten declareert met `-` en `--` . *argv.unnamed* en *argv.named* het waardetype van het opdrachtregelargument naar ofwel *String* *Number* *Boolean* . Voer opdrachtregelargumenten in met *REP* .

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

Manipuleer bestanden en mappen. `readTextFileSync()` raadt automatisch de codering van het bestand en leest het. (Zelfs als het tweede argument van `readFileSync()` is `encode` op `auto` , wordt het automatisch geraden.)

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
// const contents = fs.readFileSync(readme, 'auto')
console.log(contents)
```

## *chardet*

Ik gebruik enkele functies van <https://github.com/runk/node-chardet> . U kunt de nauwkeurigheid van automatisch raden vergroten door coderingsspecifieke tekens te vergroten.

## *JScript*

Als u de scriptengine wijzigt in *Chakra* , kunt u geen *JScript* -specifieke *Enumerator* enz. gebruiken. De ingebouwde module *JScript* stelt ze beschikbaar. *Enumerator* retourneert echter een *Array* , geen *Enumerator object* .

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

```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```

## *httprequest*

*httprequest* geeft een *http request* uit.

```javascript
const request = require('httprequest')
const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log('%O', JSON.parse(content))
```

## *minitest*

*minitest* kan eenvoudige tests schrijven. Vanaf versie `0.10.71` zijn we teruggegaan naar het basisconcept en hebben we de typen beweringen teruggebracht tot 3 typen.

Groepeer met `describe` , test `it` en verifieer met `assert` . `pass` is een array van het aantal keren dat `it` voorkomt en het aantal passen.

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

Vergelijk met `true` met de operator voor strikte gelijkheid `===` . Als `value` een functie is, evalueer dan het resultaat van het uitvoeren van de functie.

| Param     | Type                  | Beschrijving                     |
| :-------- | :-------------------- | :------------------------------- |
| `value`   | `{Function\|Boolean}` | boolean of boolean-retourfunctie |
| `message` | `{String}`            | bericht in geval van storing     |

#### `assert.equal(expected, actual)`

Vergelijkt objecten voor gelijkheid van leden, niet door verwijzing.\
NaN `true` `NaN === NaN` `function (){} === function (){}` `/RegExp/g === /RegExp/g` of `{one: {two: 2}} === {one: {two: 2}}` `[1,2,3] === [1,2,3]` enz.\
Bij het vergelijken van klassen (objecten) moeten ze dezelfde constructor of een superklasse hebben waarvan de `actual` wordt `expected` .

| Param      | Type    | Beschrijving      |
| :--------- | :------ | :---------------- |
| `expected` | `{Any}` | verwachte waarde  |
| `actual`   | `{Any}` | Werkelijke waarde |

#### `assert.throws(value, expected, message)`

Controleer of fouten correct worden gegenereerd.\
Of de fout al dan niet correct is, wordt bepaald door of de verwachte *constructor* , het *message* gelijk is en de reguliere expressie de *stack* doorstaat.

| Param      | Type                      | Beschrijving                                                                            |
| :--------- | :------------------------ | :-------------------------------------------------------------------------------------- |
| `value`    | `{Error}`                 | fout                                                                                    |
| `expected` | `{Error\|String\|RegExp}` | Een reguliere expressie die de verwachte *constructor* , *message* of *stack* evalueert |
| `message`  | `{String}`                | bericht in geval van storing                                                            |

## *pipe*

*pipe* vereenvoudigt pijpen.

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

Bepaal het scripttype.

```javascript
const { isString, isNumber, isBoolean, isObject } = require('typecheck')
const log = require('log')
log(() => isString("ECMAScript"))
log(() => isNumber(43.5))
log(() => isBoolean(false))
log(() => isObject(function(){}))
```

## *getMember*

Haalt het *COM Object* en de beschrijving op van de *ProgID* bij gebruik in de console.

```bat
wes getMember "Scripting.FileSystemObject"
```

Bij gebruik als module krijgt het het type en de beschrijving van de leden van de instantie. Indien gebruikt als een module, kunt u informatie krijgen over objecten die niet kunnen worden bevestigd vanuit *WSH (Windows Script Host)* .

```javascript
const getMember = require('getMember')
const SWbemServicesEx = require("WbemScripting.SWbemLocator").ConnectServer()
getMember(SWbemServicesEx)
```

Het doorgeven van objecten van *wes* naar *PowerShell* vereist een bepaalde hoeveelheid tijd.

Als de verwerking stopt, geef dan de wachttijd op. (standaard is `1000` )

```bat
wes getMember "Scripting.FileSystemObject" 2000
```

of

```javascript
const getMember = require('getMember', 2000)
const SWbemServicesEx = require("WbemScripting.SWbemLocator").ConnectServer()
getMember(SWbemServicesEx)
```

## *ps*

Vergemakkelijkt het uitvoeren van *PowerShell* .

### `ps(source, option)`

Voer het *PowerShell* `source` bronscript uit.

Geef een lijst met cmdlets weer in de console.

```javascript
const ps = require('ps')
const one = ps("Get-Command")
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

Voert het opgegeven *.ps1* -bestand uit in de console.

```bat
wes ps ./sample.ps1
```

U kunt ook direct een opdracht uitvoeren door de optie `--Command` of `-c` op te geven.

Voorbeeld van het weergeven van een lijst met bestanden in de huidige directory

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

Een wildcard `*` kan worden geschreven in het `path` van `zip(path, destinationPath)` . Het kan worden gebruikt in zowel *CLI (Command Line Interface)* als *module* .

```bat
wes zip docs\* dox.zip
wes zip -p dox.zip
```

Als het `path` de extensie `.zip` heeft, wordt `unzip()` verwerkt en is er geen beschrijving van de extensie `.zip` . Als alternatief, zelfs als er een extensie `.zip` is, als er een wildcard `*` beschrijving is, wordt `zip()` verwerkt.

| naamloos | Beschrijving                      |
| -------- | --------------------------------- |
| `1`      | `path` of bestand om in te voeren |
| `2`      | mapbestand naar `dest`            |

| genaamd  | korte naam | Beschrijving                      |
| -------- | ---------- | --------------------------------- |
| `--path` | `-p`       | `path` of bestand om in te voeren |
| `--dest` | `-d`       | mapbestand naar `dest`            |

# Modules bundelen (verpakken) en installeren

In *wes* wordt een bundel van meerdere modules een pakket genoemd. U kunt het pakket voor *wes* installeren dat op *github* is gepubliceerd. Een *github repository* is vereist om een ​​pakket te publiceren.

## *bundle*

Bij het publiceren van een pakket naar *github* , *bundle* bundel de vereiste modules en maakt *bundle.json* .

1.  Er kan slechts één pakket in één *repository* worden gepubliceerd
2.  *package.json* is vereist. De beschrijving van het `main` is minimaal vereist. ```json
    {
        "main": "index.js"
    }
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

Gebruikt om het pakket voor *wes* te installeren dat op *github* is gepubliceerd. Vanaf `version 0.10.28` is de installatiemap gewijzigd van `node_modules` naar `wes_modules` . Als je in `node_modules` wilt installeren, voeg `--node` toe. Vanaf `version 0.12.0` worden bestanden uit *bandle.json* uitgepakt en opgeslagen. Als gevolg van specificatiewijzigingen kunnen pakketten die zijn gebundeld met `version 0.12.0` minder dan 0.12.0 niet correct worden geïnstalleerd met `version 0.12.0` of hoger.

Geef argumenten door om te *install* in de vorm `@author/repository` .

```bat
wes install @wachaon/fmt
```

*install* heeft opties.

| genaamd       | korte naam | Beschrijving                                                                    |
| ------------- | ---------- | ------------------------------------------------------------------------------- |
| `--bare`      | `-b`       | Maak geen *@author* mappen                                                      |
| `--global`    | `-g`       | Installeer het pakket in de map waar *wes.js* is                                |
| `--save`      | `-S`       | Voeg pakketnaam en -versie toe aan het veld *dependencies* in *package.json*    |
| `--save--dev` | `-D`       | Voeg pakketnaam en -versie toe aan het veld *devDependencies* in *package.json* |
| `--node`      | `-n`       | Installeer in de map *node\_module*                                             |

`--bare` optie kan het argument ' `require` ' van `author@repository` naar `repository` weglaten. `--global` optie maakt geïnstalleerde pakketten beschikbaar voor alle scripts.

```bat
wes install @wachaon/fmt --bare
```

# Pakketten installeren vanuit privé-repository's

*install* kan niet alleen pakketten van openbare *github* repositories installeren, maar ook pakketten van private repositories. Geef in *install* het pakket op met *@author/repository* . De implementatie probeert de volgende url te downloaden.

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/bundle.json`
```

Wanneer u de *raw* versie van de privérepository opent met een browser, wordt het *token* weergegeven, dus kopieer het *token* en gebruik het. Pakketten uit privé-repositories kunnen ook worden geïnstalleerd als ze in de console worden uitgevoerd terwijl het *token* geldig is.

```bat
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

# Pakket introductie:

Hier zijn enkele externe pakketten.

## *@wachaon/fmt*

*@wachaon/fmt* is *prettier* verpakt voor *wes* om scripts te formatteren. Als er een *Syntax Error* optreedt terwijl *@wachaon/fmt* is geïnstalleerd, kunt u ook de locatie van de fout aangeven.

### Installeer *@wachaon/fmt*

```bat
wes install @wachaon/fmt
```

Als er *.prettierrc* (JSON-indeling) in de werkmap staat, wordt dit weergegeven in de instellingen. *fmt* is beschikbaar in zowel *CLI* als *module* .

#### Gebruiken als *CLI* .

```bat
wes @wachaon/fmt src/sample --write
```

| naamloos nummer | Beschrijving                                              |
| --------------- | --------------------------------------------------------- |
| 1               | Verplicht. het pad van het bestand dat u wilt formatteren |

| genaamd   | korte naam | Beschrijving             |
| --------- | ---------- | ------------------------ |
| `--write` | `-w`       | toestaan ​​overschrijven |

Overschrijf het bestand met het geformatteerde script als `--write` of het benoemde argument `-w` is opgegeven.

#### gebruiken als module

```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')
const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```

## *@wachaon/edge*

*Internet Explorer* beëindigt de ondersteuning op 15 juni 2022. Hierdoor wordt verwacht dat applicatiebewerkingen met `require('InternetExplorer.Application')` onmogelijk zullen worden. Bovendien zal de site zelf niet correct kunnen worden weergegeven door de ondersteuning voor *Internet Explorer* te beëindigen. Een alternatief zou zijn om *Microsoft Edge based on Chromium* te bedienen via de *web driver(msedgedriver.exe)* . `@wachaon/edge` *Edge* randautomatische piloot.

### Installeer *@wachaon/edge*

Installeer eerst het pakket.

```bat
wes install @wachaon/edge --bare
```

Download dan de *web driver(msedgedriver.exe)* .

```bat
wes edge --download
```

Controleer de geïnstalleerde *Edge* -versie en download de bijbehorende *web driver* .

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

We bewaren uw bezoekgeschiedenis totdat de *URL* van uw browser begint met `https://www.yahoo` .

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

*edge* drukt de bezochte *URL* op volgorde af naar de console. `@wachaon/edge` registreert gebeurtenissen voor *URL* en voegt gegevens toe aan `res.exports` . De te registreren *URL* kan `String` `RegExp` zijn en kan flexibel worden ingesteld. Door het event-driven te maken, kun je eenvoudig overschakelen naar handmatige bediening door geen events in te stellen voor processen die moeilijk af te handelen zijn met de automatische piloot. Als u wilt dat het script stopt, `navi.emit('terminate', res)` of beëindigt u *Edge* handmatig. Finalisatie voert `res.exports` standaard uit als een *.json* bestand. Als u beëindigingsverwerking wilt instellen, stelt `terminate` van `edge(callback, terminate)` . `window` is een instantie van de *Window* -klasse van *@wachaon/webdriver* , niet het `window` .

## *@wachaon/webdriver*

Het zal een pakket zijn dat verzoeken stuurt naar de *web driver* die de browser bestuurt. *@wachaon/edge* bevat *@wachaon/webdriver* .

### Installeer *@wachaon/webdriver*

```bat
wes install @wachaon/webdriver --bare
```

Download de op *Chromium* gebaseerde *Microsoft Edge* *web driver(msedgedriver.exe)* als u deze niet hebt. Als de versie van *edge* en de versie van *web driver(msedgedriver.exe)* verschillend zijn, download dan dezelfde versie van *web driver(msedgedriver.exe)* .

```bat
wes webdriver --download
```

### Hoe *@wachaon/webdriver* te gebruiken

Ga naar de [*yahoo JAPAN*](https://www.yahoo.co.jp/) -site en sla een screenshot op van een specifiek blokelement.

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
