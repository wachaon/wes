# *WES*

*wes* ist ein Konsolen-Framework zum Ausführen von *ECMAScript* auf *WSH (Windows Script Host)* . Der [*japanese*](/README.md) der *README* wird auf Japanisch sein. Andere Texte als Japanisch werden maschinell übersetzt.\
Für Texte in anderen Sprachen wählen Sie bitte aus den folgenden Optionen aus.

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

# Besonderheit

*   Sie können die Skript-Engine in *Chakra* ändern und gemäß den *ECMAScript2015* -Spezifikationen schreiben.
*   Da 32-Bit *cscript.exe* immer ausgeführt wird, gibt es in der 64-Bit-Umgebung kein eindeutiges Problem.
*   Da es sich um ein Modulsystem handelt, kann es effizienter entwickelt werden als das herkömmliche *WSH*
*   Integrierte Module unterstützen die grundlegende Verarbeitung wie Dateieingabe/-ausgabe und Farbtextausgabe an die Konsole
*   Sie können die Codierung beim Lesen von Dateien automatisch erraten lassen, sodass Sie sich keine Gedanken über die Codierung usw. machen müssen.
*   Paketmodule zur Unterstützung externer Veröffentlichungen und Abrufe
*   Zeigen Sie Fehlerdetails freundlicher an als *WSH*

# *wes* Probleme, die wir nicht lösen können

*   `WScript.Quit` kann das Programm nicht abbrechen und gibt keinen Fehlercode zurück
*   Die asynchrone Verarbeitung funktioniert nicht richtig
*   Sie können das *event prefix* des zweiten Arguments von `WScript.CreateObject` nicht verwenden

# Download

Wes benötigt nur die *wes* *wes.js* . Kopieren Sie zum Herunterladen *wes.js* von [*@wachaon/wes*](https://github.com/wachaon/wes) oder führen Sie den folgenden Befehl in Ihrer Konsole aus.

```bat
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

`SendKeys` *WScript.Shell* *wes* zur Laufzeit als Implementierung. Wenn der Pfad des Verzeichnisses, in dem *wes.js* gespeichert ist, andere Zeichen als *ascii* enthält, kann `SendKeys` den Schlüssel nicht korrekt senden und das Skript kann nicht ausgeführt werden.\
Konfigurieren Sie den Pfad, *wes.js* gespeichert ist, nur in *ascii* . Wenn Sie *wes* bereits heruntergeladen haben, können Sie es mit dem folgenden Befehl aktualisieren.

```bat
wes update
```

# wie fange ich an *wes*

Geben Sie das Schlüsselwort `wes` gefolgt von dem Befehl ein, der die Datei angibt, die der Startpunkt des Programms für die Konsole sein wird. Die *.js* kann weggelassen werden.

```bat
wes index
```

*wes* kann Skripte direkt auf der Konsole eingeben und ausführen. Wenn Sie es nur mit `wes` starten, können Sie das Skript direkt eingeben und ausführen.

```bat
wes
```

*REP* akzeptiert Skripteingaben, bis Sie zwei Leerzeilen eingeben. Sie können auch sehen, wie *REP* das Beispielskript in *README.md* .

## Befehlszeilenoptionen

*wes* Startoptionen sind wie folgt.

| genannt            | Beschreibung                                            |
| ------------------ | ------------------------------------------------------- |
| `--monotone`       | Beseitigt *ANSI escape code*                            |
| `--transpile`      | Immer konvertieren und mit *babel-standalone* ausführen |
| `--debug`          | Führen Sie das Skript im Debug-Modus aus                |
| `--encoding=UTF-8` | Gibt die Kodierung der ersten gelesenen Datei an        |
| `--engine=Chakra`  | Diese Option wird automatisch von *wes* hinzugefügt     |

# Modulsystem

*wes* unterstützt zwei Modulsysteme, das *commonjs module* mit `require()` und das *es module* mit `import` . ( *dynamic import* wird nicht unterstützt, da es sich um einen asynchronen Prozess handelt)

## *commonjs module*

Verwalten Sie Module, indem `module.exports` und `require()` aufrufen. Andere Pfade als absolute Pfade und relative Pfade, die mit `./` und `../` beginnen, suchen nach Modulen im Verzeichnis *wes\_modules* und praktischerweise im Verzeichnis *node\_modules* . *wes* `require()` errät automatisch die Codierung der Moduldatei, aber Sie können die Codierung mit dem zweiten Argument angeben, wenn es nicht richtig rät.

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

Außerdem ist es möglich, mit *require* für *COM Object* wie `require('WScript.Shell')` zu importieren.

```javascript
const Shell = require('Shell.Application')
Shell.MinimizeAll()
WScript.Sleep(2000)
Shell.UndoMinimizeAll()
```

## *es module*

*Chakra* , die Skriptausführungs-Engine, interpretiert Syntax wie `imoprt` , wird jedoch nicht ausgeführt, da die Verarbeitung nicht definiert ist. In *wes* werden durch Hinzufügen von *babel* zu den eingebauten Modulen auch *es module* ausgeführt, während sie einzeln transpiliert werden. Dies geht zu Lasten des Verarbeitungsaufwands und einer aufgeblähten *wes.js* -Datei. Module, die in *es module* geschrieben wurden, werden durch Transpilieren ebenfalls in `require()` konvertiert, sodass es möglich ist, *COM Object* aufzurufen. Es unterstützt jedoch nicht die Angabe der Codierung der Moduldatei mit *es module* . Alles wird automatisch geladen. Um es als *es module* zu laden, setzen Sie die Erweiterung auf `.mjs` oder setzen Sie das Feld `"type"` in `package.json` auf `"module"` .

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

# eingebautes Objekt

*wes* hat *built-in objects* , die in *WSH (JScript)* nicht gefunden werden.

## *console*

Wir verwenden die *console* anstelle von *wes* `WScript.Echo()` und `WScript.StdErr.WriteLine()` .

### *console.log*

Geben Sie Zeichen mit `console.log()` an die Konsole aus. Es unterstützt auch formatierte Zeichenfolgen. Gibt eine formatierte Zeichenfolge mit dem Formatierungsoperator `%` aus. (Formatierungsoperatoren gelten auch für andere Methoden.)

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

| Formatbezeichner | Beschreibung                     |
| ---------------- | -------------------------------- |
| `%s`             | `String(value)`                  |
| `%S`             | `String(value)`                  |
| `%c`             | `String(value)`                  |
| `%C`             | `String(value)`                  |
| `%d`             | `parseInt(value, 10)`            |
| `%D`             | `parseInt(value, 10)`            |
| `%f`             | `Number(value)`                  |
| `%F`             | `Number(value)`                  |
| `%j`             | `JSON.stringify(value)`          |
| `%J`             | `JSON.stringify(value, null, 2)` |
| `%o`             | Objekt-Dump                      |
| `%O`             | Objekt-Dump (eingerückt/bunt)    |

`WScript.StdOut.WriteLine` *wes* von `WScript.StdErr.WriteLine` , um farbige Zeichenfolgen auszugeben. `WScript.Echo` und `WScript.StdOut.WriteLine` sind blockierte Ausgaben. `WScript.StdErr.WriteLine` oder `console.log` .

### *console.print*

`console.log()` enthält normalerweise einen Zeilenumbruch am Ende, `console.print` jedoch nicht.

### *console.debug*

Ausgabe an die Konsole nur, wenn die Option `--debug` aktiviert ist.

### *console.error*

Lösen Sie eine Ausnahme mit dem Inhalt als Nachricht aus.

### *console.weaklog*

Strings, die mit `console.weaklog()` werden, verschwinden von der Konsole, wenn es eine nachfolgende Ausgabe gibt. Nützlich zum Schalten von Ausgängen.

## *Buffer*

Sie können mit Puffern umgehen.

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```

## `__dirname` und `__filename`

`__filename` speichert den Pfad der aktuell ausgeführten Moduldatei. `__dirname` enthält das Verzeichnis von `__filename` .

```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```

## *setTimeout* *setInterval* *setImmediate* *Promise*

Da *wes* eine Ausführungsumgebung für synchrone Verarbeitung ist, *setTimeout* *setInterval* *setImmediate* *Promise* nicht als asynchrone Verarbeitung, sondern wird implementiert, um Module zu unterstützen, die eine *Promise* -Implementierung voraussetzen.

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

# Eingebautes Modul

*wes* verfügt über *built-in modules* , um die grundlegende Verarbeitung zu vereinfachen und zu standardisieren.

## *ansi*

`ansi` ist ein *ANSI escape code* , der Standardausgabefarben und -effekte ändern kann. Farben und Effekte können je nach Typ und Einstellungen der verwendeten Konsolenanwendung abweichen.

```javascript
const { redBright, yellow } = require('ansi')
const message = 'File does not exist'
console.log(redBright + 'Error: ' + yellow + message)
```

Sie können auch Ihre eigenen Farben mit `ansi.color()` und `ansi.bgColor()` . Argumente verwenden *RGB* wie `255, 165, 0` und *color code* wie `'#FFA500'` . *color name* wie `orange` werden nicht unterstützt.

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

## *argv*

Befehlszeilenargumente erhalten. Die Befehlszeilenargumente von `cscript.exe` deklarieren benannte Argumente mit `/` , während *wes* benannte Argumente mit `-` und `--` deklariert . *argv.unnamed* und *argv.named* des Befehlszeilenarguments entweder in *String* *Number* *Boolean* um. Geben Sie Kommandozeilenargumente mit *REP* ein.

```bat
wes REP aaa -bcd eee --fgh=iii jjj --kln mmm
```

Führen Sie das folgende Skript auf *REP* aus.

```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```

## *pathname*

Pfade manipulieren. Pfade, die mit `/` und `\` beginnen, sind im Allgemeinen relativ zum Stammverzeichnis des Laufwerks. Beispielsweise können `/filename` und `C:/filename` derselbe Pfad sein. Aus Sicherheitsgründen interpretiert *wes* Pfade beginnend mit `/` und `\` relativ zum Arbeitsverzeichnis.

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

## *filesystem*

Manipulieren Sie Dateien und Verzeichnisse. `readTextFileSync()` errät automatisch die Kodierung der Datei und liest sie. (Auch wenn das zweite Argument von `readFileSync()` auf `auto` `encode` ist, wird es automatisch erraten.)

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
// const contents = fs.readFileSync(readme, 'auto')
console.log(contents)
```

## *chardet*

Ich verwende einige Funktionen von <https://github.com/runk/node-chardet> . Sie können die Genauigkeit der automatischen Schätzung erhöhen, indem Sie die Zahl der kodierungsspezifischen Zeichen erhöhen.

## *JScript*

Wenn Sie die Skript-Engine in *Chakra* ändern, können Sie keine *JScript* -spezifischen *Enumerator* usw. verwenden. Das eingebaute Modul *JScript* stellt sie zur Verfügung. *Enumerator* gibt jedoch ein *Array* zurück, kein *Enumerator object* .

```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```

*GetObject* funktioniert als Alternative zu `WScript.GetObject` .

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

*VBScript* bietet einige Funktionen, die *JScript* nicht bietet.

```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```

## *httprequest*

*httprequest* gibt eine *http request* aus.

```javascript
const request = require('httprequest')
const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log('%O', JSON.parse(content))
```

## *minitest*

*minitest* kann einfache Tests schreiben. Ab Version `0.10.71` sind wir zum Grundkonzept zurückgekehrt und haben die Assertion-Typen auf 3 Typen reduziert.

Gruppiere mit `describe` , teste `it` und verifiziere mit " `assert` ". `pass` ist ein Array aus der Anzahl der Vorkommen `it` und der Anzahl der Durchgänge.

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

### Behauptungen

#### `assert(value, message)` `assert.ok(value, message)`

Mit dem strikten Gleichheitsoperator `===` mit `true` vergleichen. Wenn der `value` eine Funktion ist, werten Sie das Ergebnis der Ausführung der Funktion aus.

| Parameter | Typ                   | Beschreibung                              |
| :-------- | :-------------------- | :---------------------------------------- |
| `value`   | `{Function\|Boolean}` | boolesche oder boolesche Rückgabefunktion |
| `message` | `{String}`            | Meldung im Fehlerfall                     |

#### `assert.equal(expected, actual)`

Vergleicht Objekte auf Elementgleichheit, nicht nach Referenz.\
NaN `true` `NaN === NaN` - `function (){} === function (){}` `/RegExp/g === /RegExp/g` oder `{one: {two: 2}} === {one: {two: 2}}` `[1,2,3] === [1,2,3]` usw.\
Beim Vergleich von Klassen (Objekten) müssen sie denselben Konstruktor oder eine Oberklasse haben, deren `actual` Ergebnis `expected` wird.

| Parameter  | Typ     | Beschreibung       |
| :--------- | :------ | :----------------- |
| `expected` | `{Any}` | erwarteter Wert    |
| `actual`   | `{Any}` | Tatsächlicher Wert |

#### `assert.throws(value, expected, message)`

Stellen Sie sicher, dass Fehler korrekt ausgegeben werden.\
Ob der Fehler korrekt ist oder nicht, wird dadurch bestimmt, ob der erwartete Fehlerkonstruktor und *constructor* *message* gleich sind und der reguläre Ausdruck die *stack* besteht.

| Parameter  | Typ                       | Beschreibung                                                                                                     |
| :--------- | :------------------------ | :--------------------------------------------------------------------------------------------------------------- |
| `value`    | `{Error}`                 | Error                                                                                                            |
| `expected` | `{Error\|String\|RegExp}` | Ein regulärer Ausdruck, der den erwarteten Fehlerkonstruktor, *constructor* *message* oder den *stack* auswertet |
| `message`  | `{String}`                | Meldung im Fehlerfall                                                                                            |

## *pipe*

*pipe* vereinfacht die Verrohrung.

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

Bestimmen Sie den Skripttyp.

```javascript
const { isString, isNumber, isBoolean, isObject } = require('typecheck')
const log = require('log')
log(() => isString("ECMAScript"))
log(() => isNumber(43.5))
log(() => isBoolean(false))
log(() => isObject(function(){}))
```

## *animate*

*animate* hilft, die Anzeige der Konsole zu animieren.

Wenn die Bearbeitung lange dauert, wäre es schön, den Fortschritt als Animation auf der Konsole anzuzeigen.

```javascript
const Animate = require('animate')
const animate = new Animate
const size = 23
let counter = 0

const progress = Animate.genProgressIndicator([
    '|----------|----------|',
    '|*---------|----------|',
    '|**--------|----------|',
    '|***-------|----------|',
    '|****------|----------|',
    '|*****-----|----------|',
    '|******----|----------|',
    '|*******---|----------|',
    '|********--|----------|',
    '|*********-|----------|',
    '|**********|----------|',
    '|**********|*---------|',
    '|**********|**--------|',
    '|**********|***-------|',
    '|**********|****------|',
    '|**********|*****-----|',
    '|**********|******----|',
    '|**********|*******---|',
    '|**********|********--|',
    '|**********|*********-|',
    '|**********|**********|',
])

const indigator = Animate.genProgressIndicator(['   ', '.  ', '.. ', '...'])

animate.register(() => {
    let prog = counter / size
    if (prog >= 1) {
        prog = 1
        animate.stop()
    }

    animate.view = console.format(
        '%S %S %S',
        progress(Math.ceil(prog * 20)),
        ('  ' + Math.ceil(prog * 100) + '%').slice(-4),
        prog < 1 ? 'loading' + indigator(counter) : 'finished!'
    )
    counter++
}, 100, Number.MAX_VALUE)
animate.run()
```

### `constructor(complete)`

Führt die `complete` Funktion aus, wenn alle Warteschlangen abgeschlossen sind oder `stop()` aufgerufen wird.

#### `static genProgressIndicator(animation)`

Generieren Sie eine Funktion, die eine Fahrradanimation anzeigt.

#### `register(callback, interval, conditional)`

Verarbeitung registrieren. Es können mehrere Prozesse registriert und parallel verarbeitet werden. Im `callback` wir an, die Animation zu stoppen und die anzuzeigende Ansicht zu schreiben. `interval` gibt das Verarbeitungsintervall an. Wenn die `conditional` eine Funktion ist, wird `conditional(count, queue)` ausgeführt, und wenn das Ergebnis wahr ist, wird sie fortgesetzt. Die `conditional` führt `decrement(count)` aus, wenn es sich um eine Zahl handelt, und fährt fort, wenn das Ergebnis eine positive Zahl ist. Wird nur einmal ausgeführt, wenn `conditional` nicht definiert ist. Beachten Sie, dass die Angabe einer Funktion die `count` erhöht, während die Angabe einer Zahl die `count` verringert.

#### `stop()`

*animate* .

#### `cancel(queue)`

Unterbricht die Verarbeitung einer bestimmten Warteschlange.

#### `run()`

Animation starten.

#### `view`

Gibt die Zeichen an, die an die Konsole ausgegeben werden. Wechseln Sie die Charaktere in regelmäßigen Abständen. Weisen Sie `view` entweder *Arrary* oder *String* zu. Ein *String* ist nützlich, wenn eine einzelne Animation aktualisiert wird, und ein *Array* ist nützlich, wenn mehrere Zeilen einzeln animiert werden.

```javascript
const Animate = require('/lib/animate')
const animate = new Animate(
    () => console.log('All Finished!!')
)

const progress = Animate.genProgressIndicator([
    '|----------|----------|',
    '|*---------|----------|',
    '|**--------|----------|',
    '|***-------|----------|',
    '|****------|----------|',
    '|*****-----|----------|',
    '|******----|----------|',
    '|*******---|----------|',
    '|********--|----------|',
    '|*********-|----------|',
    '|**********|----------|',
    '|**********|*---------|',
    '|**********|**--------|',
    '|**********|***-------|',
    '|**********|****------|',
    '|**********|*****-----|',
    '|**********|******----|',
    '|**********|*******---|',
    '|**********|********--|',
    '|**********|*********-|',
    '|**********|**********|',
])

const indigator = Animate.genProgressIndicator(['   ', '.  ', '.. ', '...'])

const state = {
    one: null,
    two: null,
    three: null
}

function upload(name, size, row) {
    let counter = 0
    return () => {
        let prog = counter / size
        if (prog >= 1) {
            prog = 1
            animate.cancel(state[name])
        }

        animate.view[row] = console.format(
            '%S %S %S',
            progress(Math.ceil(prog * 20)),
            ('  ' + Math.ceil(prog * 100) + '%').slice(-4),
            prog < 1 ? name + ' loading' + indigator(counter) : name + ' finished! '
        )
        counter++
    }
}

state.one = animate.register(upload('one', 63, 0), 50, Number.MAX_VALUE)
state.two = animate.register(upload('two', 49, 1), 60, Number.MAX_VALUE)
state.three = animate.register(upload('three', 109, 2), 40, Number.MAX_VALUE)
animate.run()
```

## *getMember*

Rufen Sie den Mitgliedstyp und die Beschreibung des *COM Object* von *ProgID* ab.

```javascript
const getMember = require('getMember')
const FileSystemObject = 'Scripting.FileSystemObject'
console.log('require("%S") // => %O', FileSystemObject, getMember(FileSystemObject))
```

## *zip*

Komprimiert Dateien und Ordner und dekomprimiert komprimierte Dateien. Intern wird *PowerShell* aufgerufen und verarbeitet.

```javascript
const {zip, unzip} = require('zip')
console.log(zip('docs\\*', 'dox.zip'))
console.log(unzip('dox.zip'))
```

In den `path` von `zip(path, destinationPath)` kann ein Platzhalter `*` geschrieben werden. Es kann sowohl in *CLI (Command Line Interface)* als auch in *module* verwendet werden.

```bat
wes zip docs\* dox.zip
wes zip -p dox.zip
```

Wenn der `path` die Erweiterung `.zip` hat, wird `unzip()` verarbeitet und es gibt keine Beschreibung der Erweiterung `.zip` . Alternativ, auch wenn es eine Erweiterung `.zip` gibt, wird `zip()` verarbeitet, wenn eine Platzhalter `*` Beschreibung vorhanden ist.

| unbenannt | Beschreibung                                  |
| --------- | --------------------------------------------- |
| `1`       | `path` oder Datei, die eingegeben werden soll |
| `2`       | Ordner Datei zum `dest`                       |

| genannt  | kurz benannt | Beschreibung                                  |
| -------- | ------------ | --------------------------------------------- |
| `--path` | `-p`         | `path` oder Datei, die eingegeben werden soll |
| `--dest` | `-d`         | Ordner Datei zum `dest`                       |

# Bündeln (Verpacken) und Installieren von Modulen

In *wes* wird ein Bündel aus mehreren Modulen als Paket bezeichnet. Sie können das auf *github* veröffentlichte Paket für *wes* installieren. Zum Veröffentlichen eines Pakets ist ein *github repository* erforderlich.

## *bundle*

Beim Veröffentlichen eines Pakets auf *github* bündelt *bundle* die erforderlichen Module und erstellt *bundle.json* .

1.  In einem *repository* kann nur ein Paket veröffentlicht werden
2.  *package.json* ist erforderlich. Als Minimum ist die Beschreibung des `main` erforderlich. ```json
    {
        "main": "index.js"
    }
    ```
3.  Machen Sie das Repository *public* , wenn Sie das Paket veröffentlichen möchten
4.  Ab `version 0.12.0` werden Pakete mit direktem Modulladen in ein Verzeichnis oberhalb des Arbeitsverzeichnisses nicht mehr gebündelt. Pakete im oberen Verzeichnis *wes\_modules* oder *node\_modules* können gebündelt werden.

Geben Sie zum Bündeln den folgenden Befehl ein: *package.json* Sie, was gebündelt werden soll.

```bat
    wes bundle 
```

## *install*

Wird verwendet, um das auf *github* veröffentlichte Paket für *wes* zu installieren. Ab `version 0.10.28` wird der Installationsordner von `node_modules` auf `wes_modules` . Wenn Sie in `node_modules` installieren möchten, fügen `--node` Option --node hinzu. Ab `version 0.12.0` werden Dateien aus *bandle.json* und gespeichert. Aufgrund von Spezifikationsänderungen werden Pakete, die mit einer `version 0.12.0` kleiner als 0.12.0 gebündelt sind, möglicherweise nicht korrekt mit `version 0.12.0` oder höher installiert.

Übergeben Sie die zu *install* Argumente in der Form `@author/repository` .

```bat
wes install @wachaon/fmt
```

*install* hat Optionen.

| genannt       | kurz benannt | Beschreibung                                                                            |
| ------------- | ------------ | --------------------------------------------------------------------------------------- |
| `--bare`      | `-b`         | Erstellen Sie keine *@author* Ordner                                                    |
| `--global`    | `-g`         | Installieren Sie das Paket in dem Ordner, in dem sich *wes.js* befindet                 |
| `--save`      | `-S`         | Fügen Sie den Paketnamen und die Version zum Feld „ *dependencies* “ in *package.json*  |
| `--save--dev` | `-D`         | Fügen Sie den Paketnamen und die Version zum Feld „ *devDependencies* in *package.json* |
| `--node`      | `-n`         | Installieren Sie im Ordner *node\_module*                                               |

`--bare` kann das `require` -Argument von `author@repository` zu `repository` weglassen. `--global` macht installierte Pakete für alle Skripte verfügbar.

```bat
wes install @wachaon/fmt --bare
```

# Installieren von Paketen aus privaten Repositories

*install* kann nicht nur Pakete aus öffentlichen *github* Repositories installieren, sondern auch Pakete aus privaten Repositories. Geben Sie bei *install* das Paket mit *@author/repository* an. Die Implementierung versucht, die folgende URL herunterzuladen.

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/bundle.json`
```

Wenn Sie mit einem Browser auf das *raw* des privaten Repositorys zugreifen, wird das *token* angezeigt. Kopieren Sie also das *token* und verwenden Sie es. Pakete aus privaten Repositorys können auch installiert werden, wenn sie in der Konsole ausgeführt werden, während das *token* gültig ist.

```bat
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

# Paket Einführung

Hier sind einige externe Pakete.

## *@wachaon/fmt*

*@wachaon/fmt* ist *prettier* verpackt, damit *wes* Skripte formatieren können. Wenn während der Installation von *@wachaon/fmt* ein *Syntax Error* auftritt, können Sie außerdem den Ort des Fehlers angeben.

### Installieren

```bat
wes install @wachaon/fmt
```

Wenn im Arbeitsverzeichnis *.prettierrc* (JSON-Format) vorhanden ist, wird dies in den Einstellungen widergespiegelt. *fmt* ist sowohl im *CLI* als auch im *module* verfügbar.

#### Als *CLI* verwenden.

```bat
wes @wachaon/fmt src/sample --write
```

| unbenannte Nummer | Beschreibung                                                  |
| ----------------- | ------------------------------------------------------------- |
| 1                 | Erforderlich. den Pfad der Datei, die Sie formatieren möchten |

| genannt   | kurz benannt | Beschreibung           |
| --------- | ------------ | ---------------------- |
| `--write` | `-w`         | Überschreiben zulassen |

Überschreiben Sie die Datei mit dem formatierten Skript, wenn `--write` oder das benannte Argument `-w` angegeben ist.

#### als Modul verwenden

```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')
const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```
