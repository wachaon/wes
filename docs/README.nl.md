# *WES*

*wes* is een consoleframework voor het uitvoeren van *ECMAScript* op *WSH (Windows Script Host)* . De originele [*japanese*](/README.md) van de *README* zal in het Japans zijn. Andere teksten dan het Japans worden machinaal vertaald.\
Voor teksten in andere talen kunt u een keuze maken uit de onderstaande opties.

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

     bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js

*WScript.Shell* *wes* `SendKeys` tijdens runtime als implementatie. Als het pad van de map waarin *wes.js* is opgeslagen andere tekens dan *ascii* bevat, kan `SendKeys` de sleutel niet correct verzenden en kan het script niet worden uitgevoerd.\
Configureer het pad *wes.js* alleen in *ascii* wordt opgeslagen. Als je *wes* al hebt gedownload, kun je het bijwerken met de volgende opdracht.

     wes update

# Gebruik

Voer het `wes` -sleutelwoord in gevolgd door de opdracht die het bestand specificeert dat het startpunt van het programma naar de console zal zijn. De *.js* kan worden weggelaten.

     wes index

Omdat *wes* is uitgerust met *REP* , kunt u scripts ook rechtstreeks invoeren door alleen `wes` te starten.

     wes

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

     // ./add.js function add (a, b) { return ab } module.exports = add

<!---->

     // ./main.js const add = require('./add') console.log('add(7, 3) // => %O', add(7, 3))

Het is ook mogelijk om te importeren met *require* voor *COM Object* zoals `require('WScript.Shell')` .

     const Shell = require('Shell.Application') Shell.MinimizeAll() WScript.Sleep(2000) Shell.UndoMinimizeAll()

## *es module*

*Chakra* , de scriptuitvoeringsengine, interpreteert syntaxis zoals `imoprt` , maar het kan niet worden uitgevoerd zoals het is omdat de verwerkingsmethode als *cscript* niet is gedefinieerd. In *wes* , door *babel* toe te voegen aan de ingebouwde modules, worden *es module* ook uitgevoerd terwijl ze één voor één worden getranspileerd. Dit kost ons verwerkingskosten en een opgeblazen *wes.js* -bestand. Modules die in de *es module* zijn geschreven, worden ook geconverteerd naar required `require()` door te transpileren, dus het is mogelijk om *COM Object* aan te roepen. Het ondersteunt echter niet het specificeren van de codering van het modulebestand met *es module* . Alles wordt automatisch geladen. Om het als een *es module* te laden, stelt u de extensie in op `.mjs` of stelt u het veld `"type"` in `package.json` in op `"module"` .

     // ./sub.mjs export default function sub (a, b) { return a - b }

<!---->

     // ./main2.js import sub from './sub.mjs' console.log('sub(7, 3) // => %O', sub(7, 3))

# ingebouwd object

*wes* heeft *built-in objects* niet worden gevonden in *WSH (JScript)* .

undefined

## *Buffer*

Je kunt omgaan met buffers.

     const content = 'Hello World' const buff = Buffer.from(content) console.log(`${content} %O`, buff)

## `__dirname` en `__filename`

`__filename` slaat het pad op van het momenteel uitgevoerde modulebestand. `__dirname` bevat de directory van `__filename` .

     console.log('dirname: %O\nfilename: %O', __dirname, __filename)

## *setTimeout* *setInterval* *setImmediate* *Promise*

Aangezien *wes* een uitvoeringsomgeving is voor synchrone verwerking, werkt *setTimeout* *setInterval* *setImmediate* *Promise* niet als asynchrone verwerking, maar wordt het geïmplementeerd om modules te ondersteunen die de implementatie van *Promise* veronderstellen.

     const example = () => { const promise = new Promise((resolve, reject) => { console.log('promise') setTimeout(() => { console.log('setTimeout') resolve('resolved'); }, 2000); }).then((val) => { console.log(val) }); console.log('sub') }; console.log('start') example(); console.log('end')

# Ingebouwde module

*wes* heeft *built-in modules* om de basisverwerking te vereenvoudigen en te standaardiseren.

## *ansi*

`ansi` is *ANSI escape code* die standaarduitvoerkleuren en -effecten kan wijzigen. Kleuren en effecten kunnen verschillen, afhankelijk van het type en de instellingen van de gebruikte consoletoepassing.

     const { redBright, yellow } = require('ansi') const message = 'File does not exist' console.log(redBright 'Error: ' yellow message)

U kunt ook uw eigen kleuren maken met `ansi.color()` en `ansi.bgColor()` . Argumenten gebruiken *RGB* zoals `255, 165, 0` en *color code* zoals `'#FFA500'` . *color name* zoals `orange` worden niet ondersteund.

     const { color } = require('ansi') const orange = color(255, 165, 0) console.log(orange 'Hello World')

## *argv*

Krijg opdrachtregelargumenten. De opdrachtregelargumenten van `cscript.exe` declareren benoemde argumenten met `/` , terwijl *wes* benoemde argumenten declareren met `-` en `--` . *argv.unnamed* en *argv.named* het waardetype van het opdrachtregelargument naar *String* *Number* *Boolean* . Voer opdrachtregelargumenten in met *REP* .

     wes REP aaa -bcd eee --fgh=iii jjj --kln mmm

Voer het volgende script uit op *REP* .

     const argv = require('argv') console.log(`argv: %O argv.unnamed: %O argv.named: %O`, argv, argv.unnamed, argv.named)

## *pathname*

Manipuleer paden. Paden die beginnen met `/` en `\` zijn over het algemeen relatief ten opzichte van de stationsroot. Bijvoorbeeld `/filename` en `C:/filename` kunnen hetzelfde pad zijn. Om veiligheidsredenen interpreteert *wes* paden die beginnen met `/` en `\` relatief aan de werkdirectory.

     const path = require('pathname') const file = path.resolve(__dirname, 'index.js') console.log('file %O', file)

## *filesystem*

Manipuleer bestanden en mappen. `readTextFileSync()` raadt automatisch de codering van het bestand en leest het. (Zelfs als het tweede argument van `readFileSync()` is `encode` op `auto` , wordt het automatisch geraden.)

     const fs = require('filesystem') const path = require('pathname') const readme = path.resolve(__dirname, 'README.md') const contents = fs.readTextFileSync(readme) // const contents = fs.readFileSync(readme, 'auto') console.log(contents)

## *chardet*

Ik gebruik enkele functies van <https://github.com/runk/node-chardet> . U kunt de nauwkeurigheid van automatisch raden vergroten door coderingsspecifieke tekens te vergroten.

## *JScript*

Als u de scriptengine wijzigt in *Chakra* , kunt u geen *JScript* -specifieke *Enumerator* , enz. gebruiken. De ingebouwde module *JScript* stelt ze beschikbaar. *Enumerator* retourneert echter een *Array* , geen *Enumerator object* .

     const { Enumerator, ActiveXObject } = require('JScript') const FSO = new ActiveXObject('Scripting.FileSystemObject') const dir = FSO.getFolder(__dirname).Files const files = new Enumerator(dir) files.forEach(file => console.log(file.Name))

*GetObject* werkt als een alternatief voor `WScript.GetObject` .

     const { GetObject, Enumerator } = require('JScript') const ServiceSet = GetObject("winmgmts:{impersonationLevel=impersonate}").InstancesOf("Win32_Service") new Enumerator(ServiceSet).forEach(service => console.log( 'Name: %O\nDescription: %O\n', service.Name, service.Description ))

## *VBScript*

*VBScript* biedt enkele functies die *JScript* niet biedt.

     const { TypeName } = require('VBScript') const FSO = require('Scripting.FileSystemObject') console.log(TypeName(FSO))

## *httprequest*

*httprequest* geeft een *http request* uit.

     const request = require('httprequest') const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1') console.log('%O', JSON.parse(content))

undefined

## *pipe*

*pipe* vereenvoudigt pijpen.

### Gebruik

     const pipe = require('pipe') function add (a, b) { return ba } function sub (a, b) { return b - a } function div (a, b) { return a / b } const add5 = add.bind(null, 5) const sub3 = sub.bind(null, 3) pipe() .use(add5) .use(sub3) .use(div, 4) .process(10, (err, res) => console.log('res: %O', res))

## *typecheck*

Bepaal het scripttype.

### Gebruik

     const { isString, isNumber, isBoolean, isObject } = require('typecheck') const log = require('log') log(() => isString("ECMAScript")) log(() => isNumber(43.5)) log(() => isBoolean(false)) log(() => isObject(function(){}))

undefined

## *getMember*

Haal het lidtype en de beschrijving van het *COM Object* op van *ProgID* .

### Gebruik

     const getMember = require('getMember') const FileSystemObject = 'Scripting.FileSystemObject' console.log('require("%S") // => %O', FileSystemObject, getMember(FileSystemObject))

## *zip*

Comprimeert bestanden en mappen en decomprimeert gecomprimeerde bestanden. Intern wordt *PowerShell* aangeroepen en verwerkt.

### Gebruik

     const {zip, unzip} = require('zip') console.log(zip('docs\\*', 'dox.zip')) console.log(unzip('dox.zip'))

Een wildcard `*` kan worden geschreven in het `path` van `zip(path, destinationPath)` . Het kan worden gebruikt in zowel *CLI (Command Line Interface)* als *module* .

     wes zip docs\* dox.zip wes zip -p dox.zip

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

2.  *package.json* is vereist. De beschrijving van het `main` is minimaal vereist.

         { "main": "index.js" }

3.  Maak de repository *public* als u het pakket wilt publiceren

4.  Vanaf `version 0.12.0` worden pakketten met een directe module die in een map boven de werkmap wordt geladen, niet gebundeld. Pakketten in de bovenste directory *wes\_modules* of *node\_modules* kunnen worden gebundeld.

Voer de volgende opdracht in om te bundelen: Raadpleeg *package.json* voor wat u moet bundelen.

     wes bundle

undefined

# Pakketten installeren vanuit privé-repository's

*install* kan niet alleen pakketten van openbare *github* repositories installeren, maar ook pakketten van private repositories. Geef in *install* het pakket op met *@author/repository* . De implementatie probeert de volgende url te downloaden.

     `https://raw.githubusercontent.com/${author}/${repository}/master/bundle.json`

Als u de private repository *raw* met een browser, wordt het *token* weergegeven, dus kopieer het *token* en gebruik het. U kunt ook pakketten installeren vanuit privérepository's door het in de console uit te voeren terwijl het *token* geldig is.

     wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA

# Pakket introductie:

Hier zijn enkele externe pakketten.

## *@wachaon/fmt*

*@wachaon/fmt* is *prettier* verpakt voor *wes* om scripts te formatteren. Als er een *Syntax Error* optreedt terwijl *@wachaon/fmt* is geïnstalleerd, kunt u ook de locatie van de fout aangeven.

### installeren

     wes install @wachaon/fmt

### Gebruik

Als er *.prettierrc* (JSON-indeling) in de werkmap staat, wordt dit weergegeven in de instellingen. *fmt* is beschikbaar in zowel *CLI* als *module* .

#### Gebruik als *CLI* .

     wes @wachaon/fmt src/sample --write

| naamloos nummer | Beschrijving                                              |
| --------------- | --------------------------------------------------------- |
| 1               | Verplicht. het pad van het bestand dat u wilt formatteren |

| genaamd   | korte naam | Beschrijving           |
| --------- | ---------- | ---------------------- |
| `--write` | `-w`       | overschrijven toestaan |

Overschrijf het bestand met het opgemaakte script als `--write` of het `-w` benoemde argument is opgegeven.

#### gebruik als een module

     const fmt = require('@wachaon/fmt') const { readTextFileSync, writeTextFileSync } = require('filesystem') const { join, workingDirectory } = require('pathname') const target = join(workingDirectory, 'index.js') console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
