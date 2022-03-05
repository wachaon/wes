# *WES*


*wes* is een consoleframework dat *ECMAScript* op *WSH (Windows Script Host)* draait.


De originele tekst van de *README* is [*japanese*](/README.md) . Behalve Japans is het een machinaal vertaalde zin.  
Selecteer zinnen in andere talen uit het volgende.


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


-   U kunt de scriptengine wijzigen in *Chakra* en deze in de *ECMAScript2015* -specificatie schrijven
-   Het draait altijd 32bit *cscript.exe* , dus er zijn geen inherente problemen in een 64bit-omgeving.
-   Met een modulair systeem ontwikkel je efficiënter dan traditionele *WSH*
-   De ingebouwde module ondersteunt basisverwerking zoals bestandsinvoer / uitvoer en uitvoer van gekleurde tekens naar de console.
-   U hoeft zich geen zorgen te maken over codering, omdat u het bestand automatisch kunt laten lezen en de codering kunt raden.
-   We verpakken ook modules om extern publiceren en ophalen te ondersteunen.


# Bekende problemen *wes* we niet kunnen oplossen


-   `WScript.Quit` kan het programma niet onderbreken en geeft geen foutcode terug
-   Asynchrone verwerking zoals `setTimeout` en `Promise` is niet mogelijk
-   U kunt het *event prefix* niet gebruiken als het tweede argument van `WScript.CreateObject`


# installeren


Wes heeft alleen het *wes* *wes.js* . Om te downloaden, kopieert u *wes.js* van [*@wachaon/wes*](https://github.com/wachaon/wes) of voert u de volgende opdracht uit in de console.


```bat
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```


*WScript.Shell* gebruikt `SendKeys` van *wes* tijdens runtime als implementatie. Als het pad van de map waarin *wes.js* is opgeslagen andere tekens dan *ascii* bevat, kan `SendKeys` de sleutel niet correct verzenden en kan het script niet worden uitgevoerd.  
Configureer het opslagbestemmingspad van *wes.js* alleen *ascii* .


# Hoe te gebruiken


Voer de opdracht in op de console die het bestand specificeert dat het startpunt zal zijn van het programma dat het `wes` -sleutelwoord volgt. De *.js* kan worden weggelaten.


```bat
wes index
```


Wes heeft ook *REP* , dus als je het alleen met *wes* `wes` , kun je het script direct invoeren.


```bat
wes
```


*REP* accepteert scriptinvoer totdat u twee lege regels invoert. U kunt de uitvoering van het voorbeeldscript ook controleren in *README.md* met *REP* .


## Opdrachtregelopties


De opstartopties voor *wes* zijn als volgt.


| genaamd            | Beschrijving                                                            |
| ------------------ | ----------------------------------------------------------------------- |
| `--monotone`       | Elimineer *ANSI escape code*                                            |
| `--safe`           | Voer het script uit in de veilige modus                                 |
| `--usual`          | Voer het script uit in de normale modus (standaard)                     |
| `--unsafe`         | Voer het script uit in de onveilige modus                               |
| `--dangerous`      | Voer het script uit in de gevaarlijke modus                             |
| `--debug`          | Voer het script uit in debug-modus                                      |
| `--encoding=UTF-8` | Specificeert de codering van het eerste bestand dat moet worden gelezen |
| `--engine=Chakra`  | Deze optie wordt automatisch toegevoegd door *wes*                      |


De implementatie van `--safe` `--usual` `--unsafe` `--dangerous` `--debug` is onvolledig, maar benoemde argumenten zijn voorbehouden.


# Modulesysteem


*wes* ondersteunt twee modulesystemen, een *commonjs module* dat gebruikmaakt `require()` en een *es module* die `import` gebruikt. ( *dynamic import* is asynchrone verwerking, dus het wordt niet ondersteund)


## *commonjs module*


Beheer modules door toe te wijzen aan `module.exports` en aan te roepen met required `require()` . Voor het gemak ondersteunt het ook de map *node_modules* .


*wes* `require()` automatisch de codering van het modulebestand raadt, maar als het niet correct raadt, kunt u de codering specificeren met het tweede argument.


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


U kunt ook importeren naar *ActiveX* met *require* `require('WScript.Shell')` .


```javascript
const Shell = require('Shell.Application')
Shell.MinimizeAll()
WScript.Sleep(2000)
Shell.UndoMinimizeAll()
```


## *es module*


*Chakra* , de uitvoeringsengine van het script, interpreteert de syntaxis zoals `imoprt` , maar het kan niet worden uitgevoerd zoals het is omdat de verwerkingsmethode als `cscript` niet is gedefinieerd. In *wes* , door *babel* toe te voegen aan de ingebouwde module, voeren we het uit terwijl we sequentieel naar de *es module* transpileren. Als gevolg hiervan worden de verwerkingsoverhead en het *wes.js* -bestand als kosten opgeblazen.


Modules beschreven door *es module* zijn ook getranspileerd om `require()` , dus *ActiveX* -aanroepen zijn mogelijk. Het ondersteunt echter niet de coderingsspecificatie van het modulebestand in *es module* . Ze worden allemaal gelezen door automatisch te raden.


Om het als een *es module* te laden, stelt u de extensie in op `.mjs` of het veld `"type"` van `package.json` op `"module"` .


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


# Ingebouwd object


*wes* heeft *built-in objects* die *WSH (JScript)* niet heeft.


## *console*


`WScript.Echo` gebruikt *console* in plaats van *wes* of `WScript.StdErr.WriteLine` .


Druk tekens af naar de console in `console.log` . Het ondersteunt ook geformatteerde tekenreeksen. Drukt een opgemaakte tekenreeks af met de opmaakoperator `%` .


```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```


\|


`WScript.StdOut.WriteLine` *wes* van `WScript.StdErr.WriteLine` om gekleurde tekenreeksen uit te voeren. `WScript.Echo` en `WScript.StdOut.WriteLine` zijn geblokkeerd voor uitvoer. `WScript.StdErr.WriteLine` of `console.log` .


## *Buffer*


Kan omgaan met buffers.


```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```


## `__dirname` en `__filename`


`__filename` bevat het pad van het momenteel actieve modulebestand. `__dirname` bevat de directory van `__filename` .


```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```


# Ingebouwde module


*wes* heeft *built-in modules* om de basisverwerking te vereenvoudigen en te standaardiseren.


## *ansi*


`ansi` is een *ANSI escape code* waarmee u de kleur en het effect van standaarduitvoer kunt wijzigen. Kleuren en effecten kunnen variëren, afhankelijk van het type en de instellingen van de gebruikte consoletoepassing.


```javascript
const { redBright, yellow } = require('ansi')
const message = 'File does not exist'
console.log(redBright + 'Error: ' + yellow + message)
```


U kunt ook uw eigen kleuren maken met `ansi.color()` en `ansi.bgColor()` . Het argument gebruikt *RGB* zoals `255, 165, 0` of *color code* zoals `'#FFA500'` . Het ondersteunt geen *color name* zoals `orange` .


```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```


## *argv*


Haalt het opdrachtregelargument op. De opdrachtregelargumenten in `cscript.exe` declareren benoemde argumenten met `/` `--` terwijl *wes* benoemde argumenten declareren met `-` en-.


*argv.unnamed* en *argv.named* casten het waardetype van het opdrachtregelargument naar een van de *String* *Number* *Boolean* .


Voer de opdrachtregelargumenten in samen met *REP* .


```bat
wes REP aaa -bcd eee --fgh=iii jjj --kln mmm
```


Voer het volgende script uit in *REP* .


```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```


## *pathname*


Bedien het pad.


Paden die beginnen met `/` en `\` verwijzen over het algemeen naar paden die relatief zijn ten opzichte van de stationsroot. Bijvoorbeeld, `/filename` en `C:/filename` kunnen hetzelfde pad hebben. Om veiligheidsredenen interpreteert `wes` paden die beginnen met `/` en `\` als relatief ten opzichte van de werkdirectory.


```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```


## *filesystem*


Bedien bestanden en mappen. `readTextFileSync` raadt en leest automatisch de codering van het bestand.


```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```


## *chardet*


Ik gebruik enkele functies van <https://github.com/runk/node-chardet> .


U kunt de nauwkeurigheid van automatisch raden verbeteren door de karakters die specifiek zijn voor de codering te vergroten.


## *JScript*


Als u de scriptengine wijzigt in *Chakra* , kunt u de *JScript* -specifieke *Enumerator* enz. niet gebruiken. De ingebouwde module *JScript* stelt ze beschikbaar. *Enumerator* retourneert echter een *Array* in plaats van een *Enumerator object* .


```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```


*GetObject* fungeert als alternatief voor `WScript.GetObject` .


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


*VBScript* biedt enkele functies die *JScript* niet heeft.


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


*minitest* kan eenvoudige tests schrijven.


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


*pipe* vereenvoudigt pijpverwerking.


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


Bepaal het type script.


```javascript
const { isString, isNumber, isBoolean, isObject } = require('typecheck')
const log = require('log')

log(() => isString("ECMAScript"))
log(() => isNumber(43.5))
log(() => isBoolean(false))
log(() => isObject(function(){}))
```


## *zip*


Comprimeer bestanden en mappen en decomprimeer gecomprimeerde bestanden. Het roept *PowerShell* intern aan en verwerkt het.


```javascript
const {zip, unzip} = require('zip')

console.log(zip('docs\\*', 'dox.zip'))
console.log(unzip('dox.zip'))
```


Wildcard `*` kan worden beschreven in het `path` van `zip(path, destinationPath)` .


Het kan worden gebruikt met zowel *CLI (Command Line Interface)* als *module* .


```bat
wes zip docs\* dox.zip
wes zip -p dox.zip
```


Als `path` de extensie `.zip` heeft, wordt `unzip()` verwerkt en is er geen beschrijving van de extensie `.zip` . Of zelfs als er een `.zip` extensie is, als er een beschrijving is van een wildcard `*` , zal `zip()` worden verwerkt.


| naamloos | Beschrijving                          |
| -------- | ------------------------------------- |
| `1`      | `path` Map of bestand om in te voeren |
| `2`      | mapbestand naar `dest`                |


| genaamd  | korte naam | Beschrijving                          |
| -------- | ---------- | ------------------------------------- |
| `--path` | `-p`       | `path` Map of bestand om in te voeren |
| `--dest` | `-d`       | mapbestand naar `dest`                |


# Module bundelen en installeren


In *wes* wordt een bundel van meerdere modules een pakket genoemd. U kunt het pakket voor *wes* installeren dat op *github* is gepubliceerd. Je hebt een *github repository* nodig om het pakket te publiceren. De naam van de repository en de naam van de lokale map moeten ook hetzelfde zijn.


## *bundle*


Wanneer u het pakket naar *github* , *bundle* u de vereiste modules en wijzigt u het formaat zodat het door installatie kan worden geïmporteerd.


Om veiligheidsredenen maakt *bundle* een *.json* -bestand omdat *wes* u niet toestaat pakketten te importeren in een formaat dat direct kan worden uitgevoerd.


Er zijn enkele voorwaarden voor het verpakken.


1.  Er kan slechts één pakket in één *repository* worden gepubliceerd

2.  Zorg ervoor dat de naam van de repository op *github* en de naam van de lokale werkmap hetzelfde zijn.

3.  Als je het pakket publiceert, maak dan de repository *public*

4.  Verkrijg module-acquisitie op het hoogste niveau

5.  Het pakket *.json* -bestand wordt in uw werkdirectory gemaakt met de naam *directory_name.json* . Als u de naam van het bestand wijzigt of het bestand verplaatst, kunt u er tijdens de installatie niet naar verwijzen.

6.  `node_modules/directory_name` het startpunt van de bundel is

    ```bat
        wes bundle directory_name
    ```

    Zonder bundelen met

    ```bat
        wes bundle node_modules/directory_name
    ```

    Bundel a.u.b. met


## *install*


Gebruikt om het pakket voor *wes* te installeren dat op *github* is gepubliceerd.


### Hoe te gebruiken


Geef argumenten door om te *install* in het formaat `@author/repository` .


```bat
wes install @wachaon/fmt
```


*install* heeft opties.


| genaamd       | korte naam | Beschrijving                                                                       |
| ------------- | ---------- | ---------------------------------------------------------------------------------- |
| `--bare`      | `-b`       | Maak geen *@author* map aan                                                        |
| `--global`    | `-g`       | Installeer het pakket in de map waar *wes.js* is                                   |
| `--save`      | `-S`       | Voeg de pakketnaam en -versie toe aan het *dependencies* van *package.json*        |
| `--save--dev` | `-D`       | Voeg de pakketnaam en -versie toe aan het veld *devDependencies* in *package.json* |


`--bare` optie kan het argument ' `require` ' van `author@repository` naar `repository` weglaten. `--global` optie maakt het geïnstalleerde pakket beschikbaar voor alle scripts. De bovenstaande opties moeten tegelijk met de *wes* security optie `--unsafe` of `--dangerous` worden opgegeven.


```bat
wes install @wachaon/fmt --bare --unsafe
```


# Pakketten installeren in privérepository's


*install* kan zowel pakketten in privé-repositories als pakketten in openbare repositories op *github* .


Geef tijdens de *install* het pakket op met *@author/repository* . De implementatie zal proberen de volgende url te downloaden.


```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```


Wanneer u met een browser *raw* van de privérepository opent, wordt het *token* weergegeven, dus kopieer het *token* en gebruik het.


U kunt pakketten ook in privérepository's installeren door ze binnen de levensduur van het *token* in de console uit te voeren.


```bat
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```


# Pakket introductie:


Hier zijn enkele externe pakketten.


## *@wachaon/fmt*


*@wachaon/fmt* is een *prettier* verpakking voor *wes* en formatteert het script. Als er een *Syntax Error* optreedt met *@wachaon/fmt* geïnstalleerd, kunt u ook de locatie van de fout aangeven.


### installeren


```bat
wes install @wachaon/fmt
```


### Hoe te gebruiken


Als er *.prettierrc* (JSON-indeling) in de werkmap staat, wordt dit weergegeven in de instelling. *fmt* kan worden gebruikt met zowel *CLI* als *module* .


#### Gebruikt als *CLI* .


```bat
wes @wachaon/fmt src/sample --write
```


| naamloos nummer | Beschrijving                                            |
| --------------- | ------------------------------------------------------- |
| 0               | ik                                                      |
| 1               | Vereist. Het pad van het bestand dat u wilt formatteren |


| genaamd   | korte naam | Beschrijving           |
| --------- | ---------- | ---------------------- |
| `--write` | `-w`       | Overschrijven toestaan |


Overschrijf het bestand met een opgemaakt script als u een benoemd argument van `--write` of `-w` opgeeft.


#### Gebruik als module


```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')

const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```


## *@wachaon/edge*


*Internet Explorer* wordt vanaf 2022/6/15 volledig ondersteund. Als gevolg hiervan wordt verwacht dat het niet mogelijk zal zijn om de applicatie te gebruiken met `require('InternetExplorer.Application')` .


Een alternatief zou zijn om *Microsoft Edge based on Chromium* via de *web driver* . `@wachaon/edge` vereenvoudigt *Edge* -stuurautomaat.


### installeren


Installeer eerst het pakket.


```bat
wes install @wachaon/edge --unsafe --bare
```


Download vervolgens het *web driver* .


```bat
wes edge --download
```


Controleer de geïnstalleerde versie van *Edge* en download het bijbehorende *web driver* .


### Hoe te gebruiken


Het zal gemakkelijk te gebruiken zijn.


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


Dit script voert de bezochte *URL* achtereenvolgens uit naar de console.


`@wachaon/edge` registreert een gebeurtenis voor de *URL* en voegt gegevens toe aan `res.exports` . De te registreren *URL* kan `String` `RegExp` zijn en er kunnen flexibele instellingen worden gemaakt.


Door het gebeurtenisgestuurd te maken, is het mogelijk om eenvoudig over te schakelen naar handmatige bediening door geen gebeurtenis in te stellen voor verwerking die moeilijk te verwerken is met de automatische piloot.


Als u het script wilt stoppen, voert u `navi.emit('terminate', res)` of beëindigt u *Edge* handmatig.


Het beëindigingsproces voert `res.exports` als een *.json* bestand als de standaardwaarde. Als u het beëindigingsproces wilt instellen, stelt u het `terminate` van de `edge(callback, terminate)` .


`window` is geen `window` in de browser, maar een instantie van de klasse *Window* van *@wachaon/webdriver* .


## *@wachaon/webdriver*


Het is een pakket dat een verzoek stuurt naar het *web driver* dat de browser bestuurt. Ingebouwd in *@wachaon/edge* . Net als *@wachaon/edge* , is een *web driver* vereist voor de browserwerking.


### installeren


```bat
wes install @wachaon/webdriver --unsafe --bare
```


Als u geen *web driver* heeft, download het dan.


```bat
wes webdriver --download
```
