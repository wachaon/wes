# *WES*

*wes* ist ein Konsolenframework zum Ausführen *ECMAScript* auf *WSH (Windows Script Host)* . Der Originaltext *README* wird auf [*japanese*](/README.md) sein. Andere Texte als Japanisch werden maschinell übersetzt.\
Für Texte in anderen Sprachen wählen Sie bitte aus den untenstehenden Optionen aus.

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

*   Sie können die Skript-Engine auf *Chakra* ändern und gemäß den *ECMAScript2015+* -Spezifikationen schreiben.
*   Verwendet immer die 32-Bit-Version *cscript.exe* , daher gibt es keine eindeutigen 64-Bit-Probleme
*   Modulsystem für effizientere Entwicklung als herkömmliches *WSH* verfügbar
*   Integrierte Module unterstützen grundlegende Verarbeitung wie Dateieingabe/-ausgabe und farbige Textausgabe an die Konsole
*   Sie müssen sich nicht um die Codierung usw. kümmern, da beim Lesen der Datei automatisch auf die Codierung geschlossen werden kann
*   Es besteht auch die Möglichkeit, das Modul zu verpacken und extern zu veröffentlichen oder zu erwerben.
*   Fehlerdetails werden freundlicher angezeigt als bei *WSH*

# Bekannte Probleme, die *wes* nicht lösen können

*   `WScript.Quit` kann das Programm nicht abbrechen und gibt keinen Fehlercode zurück
*   Die asynchrone Verarbeitung funktioniert nicht ordnungsgemäß
*   Sie können *event prefix* des zweiten Arguments von `WScript.CreateObject` nicht verwenden

# herunterladen

*wes* benötigt nur die Datei *wes.js* Kopieren Sie zum Herunterladen *wes.js* von [*@wachaon/wes*](https://github.com/wachaon/wes) oder führen Sie den folgenden Befehl in Ihrer Konsole aus.

```bat
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

*wes* übernimmt eine Implementierung, die zur Laufzeit `SendKeys` von *WScript.Shell* verwendet. Wenn der Pfad des Verzeichnisses, in dem *wes.js* gespeichert ist, Nicht-ASCII-Zeichen enthält, kann `SendKeys` die Schlüssel nicht korrekt senden und das Skript wird nicht ausgeführt. Daher sollte der Pfad, in dem Sie *wes.js* speichern, nur aus ASCII-Zeichen bestehen. Wenn Sie *wes.js* bereits heruntergeladen haben, können Sie es alternativ mit dem folgenden Befehl aktualisieren.

```bat
wes update
```

# Wie fange ich an, *wes*

Geben Sie `wes` und den Befehl ein, der die Datei angibt, die als Ausgangspunkt des Programms fÃ¼r die Konsole dienen soll. Die Skripterweiterung *.js* kann weggelassen werden.

```bat
wes index
```

*wes* kann Skripte direkt auf der Konsole eingeben und ausführen. Wenn Sie es nur mit `wes` starten, können Sie das Skript direkt eingeben und ausführen.

```bat
wes
```

*REP* akzeptiert Skripteingaben, bis Sie zwei Leerzeilen eingeben. Sie können auch sehen, *REP* das Beispielskript in *README.md* ausführt.

## Befehlszeilenoptionen

Die Startoptionen *wes* sind wie folgt.

| genannt            | Beschreibung                                                |
| ------------------ | ----------------------------------------------------------- |
| `--monotone`       | Eliminiert *ANSI escape code*                               |
| `--transpile`      | Konvertieren und ausführen Sie immer mit *babel-standalone* |
| `--debug`          | Führen Sie das Skript im Debug-Modus aus                    |
| `--encoding=UTF-8` | Gibt die Kodierung der ersten gelesenen Datei an            |
| `--arch=x86`       | Diese Option wird von *wes* automatisch hinzugefügt         |

# Modulsystem

*wes* unterstützt zwei Modulsysteme, *commonjs module* mit `require()` und *es module* mit `import` . ( *dynamic import* wird nicht unterstützt, da es sich um einen asynchronen Prozess handelt)

## *commonjs module*

Verwalten Sie Module, indem Sie `module.exports` zuweisen und `require()` aufrufen. Andere Pfade als absolute Pfade und relative Pfade, die mit `./` und `../` beginnen, suchen nach Modulen im Verzeichnis *wes\_modules* und praktischerweise *node\_modules* . *wes* 's `require()` errät automatisch die Kodierung der Moduldatei, aber Sie können die Kodierung mit dem zweiten Argument angeben, wenn sie nicht richtig errät.

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

*Chakra* , die Skriptausführungs-Engine, interpretiert Syntax wie `imoprt` , wird jedoch nicht in *cscript* -Umgebung ausgeführt. In *wes* werden durch Hinzufügen *babel* zu den integrierten Modulen auch *es module* ausgeführt, während sie einzeln transpiliert werden. Dies geht mit Verarbeitungsaufwand und einer aufgeblähten *wes.js* Datei einher. Im *es module* geschriebene Module werden durch Transpilieren ebenfalls in `require()` konvertiert, sodass es möglich ist, *COM Object* aufzurufen. Allerdings wird die Angabe der Kodierung der Moduldatei mit *es module* nicht unterstützt. Alles wird automatisch geladen. Um es als *es module* zu laden, setzen Sie die Erweiterung auf `.mjs` oder setzen Sie das Feld `"type"` in `package.json` auf `"module"` .

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

*wes* verfügt über *built-in objects* in *WSH (JScript)* nicht gefunden werden.

## *console*

*wes* verwenden *console* anstelle von `WScript.Echo()` und `WScript.StdErr.WriteLine()` .

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

*wes* verwendet `WScript.StdOut.WriteLine` anstelle von `WScript.StdErr.WriteLine` , um farbige Zeichenfolgen auszugeben. `WScript.Echo` und `WScript.StdOut.WriteLine` sind blockierte Ausgaben. Verwenden Sie `WScript.StdErr.WriteLine` oder `console.log` .

### *console.print*

`console.log()` enthält normalerweise eine neue Zeile am Ende, `console.print` jedoch nicht.

### *console.debug*

Ausgabe an die Konsole nur, wenn `--debug` aktiviert ist.

### *console.error*

Lösen Sie eine Ausnahme mit dem Inhalt als Nachricht aus.

### *console.weaklog*

Mit `console.weaklog()` gedruckte Zeichenfolgen verschwinden aus der Konsole, wenn eine nachfolgende Ausgabe erfolgt. Nützlich zum Schalten von Ausgängen.

## *Buffer*

Sie können mit Puffern umgehen.

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log('%s %O', content, buff)
```

## `__dirname` und `__filename`

`__filename` speichert den Pfad der aktuell ausgeführten Moduldatei. `__dirname` enthält das Verzeichnis von `__filename` .

```javascript
const message = `dirname: ${__dirname}\nfilename: ${ __filename}`
console.log(message)
```

## *setTimeout* *setInterval* *setImmediate* *Promise*

Da *wes* eine Ausführungsumgebung für die synchrone Verarbeitung ist, fungiert *setTimeout* *setInterval* *setImmediate* *Promise* nicht als asynchrone Verarbeitung, sondern ist implementiert, um Module zu unterstützen, die *Promise* Implementierung voraussetzen.

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

*wes* verfügt über *built-in modules* zur Vereinfachung und Standardisierung der grundlegenden Verarbeitung.

## Eingebaute Module zum Entfernen

Ändern Sie einige integrierte Module in externe Module, um die Datei schlanker und einfacher zu warten.

*   *animate.js*
*   *day.js*
*   *debug.js*
*   *log.js*

Die oben genannten Module können jeweils als `@wachaon/animate` `@wachaon/day` `@wachaon/debug` `@wachaon/log` installiert werden.

## *ansi*

`ansi` ist *ANSI escape code* , der Standardausgabefarben und -effekte ändern kann. Farben und Effekte können je nach Typ und Einstellungen der verwendeten Konsolenanwendung unterschiedlich sein.

```javascript
const { redBright, yellow } = require('ansi')
const message = 'File does not exist'
console.log(redBright + 'Error: ' + yellow + message)
```

Sie können mit `ansi.color()` und `ansi.bgColor()` auch Ihre eigenen Farben erstellen. Argumente verwenden *RGB* wie `255, 165, 0` *color code* wie `'#FFA500'` . *color name* wie `orange` werden nicht unterstützt.

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

## *argv*

Befehlszeilenargumente abrufen. Die Befehlszeilenargumente von `cscript.exe` deklarieren benannte Argumente mit `/` , während *wes* benannte Argumente mit `-` und `--` deklariert. *argv.unnamed* und *argv.named* wandeln den Werttyp des Befehlszeilenarguments in *String* *Number* *Boolean* um. Geben Sie Befehlszeilenargumente mit *REP* ein.

```bat
wes REP aaa -bc dd --e=false --gh=iii jjj --klm nn -o --p 9 r
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

Pfade manipulieren. Pfade, die mit `/` und `\` beginnen, beziehen sich im Allgemeinen auf das Stammverzeichnis des Laufwerks. Beispielsweise können `/filename` und `C:/filename` derselbe Pfad sein. Aus Sicherheitsgründen interpretiert *wes* Pfade, die mit `/` und `\` beginnen, relativ zum Arbeitsverzeichnis.

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

## *filesystem*

Bearbeiten Sie Dateien und Verzeichnisse. `readTextFileSync()` errät automatisch die Kodierung der Datei und liest sie. (Auch wenn das zweite `encode` von `readFileSync()` auf `auto` gesetzt ist, wird es automatisch erraten.)

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
// const contents = fs.readFileSync(readme, 'auto')
console.log(contents)
```

## *chardet*

Ich verwende einige Funktionen von <https://github.com/runk/node-chardet> . Sie können die Genauigkeit der automatischen Schätzung erhöhen, indem Sie die Anzahl der kodierungsspezifischen Zeichen erhöhen.

## *JScript*

Wenn Sie die Skript-Engine auf *Chakra* ändern, können Sie keine *JScript* spezifischen *Enumerator* usw. verwenden. Das eingebaute Modul *JScript* stellt sie zur Verfügung. Allerdings gibt *Enumerator* *Array* zurück, kein *Enumerator object* .

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

```javascript {"testing": true}
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO)) // => "FileSystemObject"
```

## *httprequest*

*httprequest* gibt *http request* aus.

```javascript {"testing": true}
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

*minitest* kann einfache Tests schreiben. Ab Version `0.10.71` sind wir zum Grundkonzept zurückgekehrt und haben die Arten von Behauptungen auf drei Arten reduziert.

Mit `describe` gruppieren, damit `it` und mit `assert` verifizieren. `pass` ist ein Array aus der Anzahl `it` Vorkommen und der Anzahl der Durchläufe.

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

Der Einfachheit halber gibt es nur drei Assertionsfunktionen zum Vergleichen von Objekten.

#### `assert(value, message)` `assert.ok(value, message)`

Vergleichen Sie mit `true` mit dem strikten Gleichheitsoperator `===` . Wenn `value` eine Funktion ist, werten Sie das Ergebnis der Ausführung der Funktion aus.

| Param     | Typ                   | Beschreibung                              |
| :-------- | :-------------------- | :---------------------------------------- |
| `value`   | `{Function\|Boolean}` | boolesche oder boolesche Rückgabefunktion |
| `message` | `{String}`            | Meldung bei Fehler                        |

#### `assert.equal(expected, actual)`

Vergleicht Objekte auf Mitgliedergleichheit, nicht anhand von Referenzen.\
`NaN === NaN` `function (){} === function (){}` `true` `/RegExp/g === /RegExp/g` or `{one: {two: 2}} === {one: {two: 2}}` `[1,2,3] === [1,2,3]` usw.\
Beim Vergleich von Klassen (Objekten) müssen diese denselben Konstruktor oder eine Oberklasse haben, deren `actual` `expected` wird.

| Param      | Typ     | Beschreibung       |
| :--------- | :------ | :----------------- |
| `expected` | `{Any}` | erwarteter Wert    |
| `actual`   | `{Any}` | Tatsächlicher Wert |

#### `assert.throws(value, expected, message)`

Stellen Sie sicher, dass der Fehler korrekt ausgegeben wird.\
Ob der Fehler korrekt ist oder nicht, wird dadurch bestimmt, ob der erwartete *constructor* , *message* gleich sind und der reguläre Ausdruck *stack* besteht.

| Param      | Typ                       | Beschreibung                                                                                                             |
| :--------- | :------------------------ | :----------------------------------------------------------------------------------------------------------------------- |
| `value`    | `{Error}`                 | Fehler                                                                                                                   |
| `expected` | `{Error\|String\|RegExp}` | Ein regulärer Ausdruck, der den erwarteten *constructor* , die erwartete *message* oder den erwarteten *stack* auswertet |
| `message`  | `{String}`                | Meldung bei Fehler                                                                                                       |

## *pipe*

*pipe* vereinfacht die Verrohrung. Geben Sie das Ergebnis aus, während Sie *data* mit einem oder mehreren *converter* konvertieren. Ab *ver 0.12.75* kann es direkt über die Kommandozeile gestartet werden.

### *pipe* als Modul starten

Fügen Sie die Konvertierungsfunktion in `use(converter)` der *pipe* Methode ein und beschreiben Sie die Dateneingabe und die Verarbeitung nach der Konvertierung mit `process(data, callback(error, result))` . Wenn kein `callback` angegeben ist, ist der Rückgabewert *promise* und die Verarbeitung kann mit `then(result)` und `catch(error)` verbunden werden.

```javascript {"testing": true}
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

Zusätzlich zu `use(converter)` gibt es Methoden wie `.filter(callbackFn(value, index))` und `map(callbackFn(value, index))` . Alle *data* sind eine Zeichenfolge, ein Array und ein Objekt.

```javascript {"testing": true}
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

### Starten *pipe* über die Befehlszeile

Geben Sie in der Befehlszeile die Konvertierungsfunktion der Reihe nach nach `pipe` ein. Argumente für Konvertierungsfunktionen werden als Werte benannter Befehlszeilenargumente mit demselben Namen wie die Konvertierungsfunktion eingegeben. `=>` Wert `(` mit `eval()` statt mit `JSON.parse()` analysiert `)` *WSH* `"` in Befehlszeilenargumenten erzwingt. In diesem Fall nicht mit `eval()` analysieren.

```bash
wes pipe swap merge --input="sample.txt" --output="" --swap="[2, 0, 1, 3]" --merge=4
```

Dieser Befehl entspricht dem Skript:

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

Bestimmen Sie den Skripttyp.

```javascript {"testing": true}
const { isString, isNumber, isBoolean, isObject } = require('typecheck')
console.log(() => isString("ECMAScript")) /* => true */
console.log(() => isNumber(43.5)) /* => true */
console.log(() => isBoolean(false)) /* => true */
console.log(() => isObject(function(){})) /* => false */
```

## *getMember*

Ruft den *COM Object* Mitgliedstyp und die Beschreibung von *ProgID* ab, wenn es in der Konsole verwendet wird.

```bat
wes getMember "Scripting.FileSystemObject"
```

Bei Verwendung als Modul erhält es den Typ und die Beschreibung der Mitglieder der Instanz. Bei Verwendung als Modul können Sie Informationen über Objekte abrufen, die nicht von *WSH (Windows Script Host)* bestätigt werden können.

```javascript
const getMember = require('getMember')
const SWbemServicesEx = require("WbemScripting.SWbemLocator").ConnectServer()
getMember(SWbemServicesEx)
```

## *ps*

Erleichtert die Ausführung von *PowerShell* .

### `ps(source, option)`

Führen Sie `source` *PowerShell* Quellskript aus.

Zeigen Sie eine Liste der Cmdlets in der Konsole an.

```javascript
const ps = require('ps')
 
console.log(ps("Get-Command"))
```

Wenn ein *Google Cherome* Fenster vorhanden ist, ändern Sie die Größe und Position des Fensters. (Im Vollbildmodus funktioniert es nicht.)

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

Steuert Mausbewegungen und Klicks.

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

Speichern Sie das Skript als Datei oder fügen Sie es in Ihren nächsten `REP` ein.

```bat
wes REP pos 100 100
```

### Führen Sie *powershell* direkt von der Konsole aus

Führt die angegebene *.ps1* Datei in der Konsole aus.

```bat
wes ps ./sample.ps1
```

Sie können einen Befehl auch direkt ausführen, indem Sie `--Command` oder `-c` angeben.

Beispiel für die Anzeige einer Liste von Dateien im aktuellen Verzeichnis

```bat
wes ps --Command Get-ChildItem
```

## *zip*

Komprimiert Dateien und Ordner und dekomprimiert komprimierte Dateien. Intern wird *PowerShell* aufgerufen und verarbeitet.

```javascript
const {zip, unzip} = require('zip')
console.log(zip('docs\\*', 'dox.zip'))
console.log(unzip('dox.zip'))
```

Im `path` von `zip(path, destinationPath)` kann ein Platzhalter `*` geschrieben werden. Es kann sowohl in *CLI (Command Line Interface)* als auch *module* verwendet werden.

```bat
wes zip docs\* dox.zip
wes zip -p dox.zip
```

Wenn `path` die Erweiterung `.zip` hat, wird `unzip()` verarbeitet und es gibt keine Beschreibung der Erweiterung `.zip` . Alternativ wird `zip()` verarbeitet, selbst wenn die Erweiterung `.zip` vorhanden ist und eine Wildcard- `*` Beschreibung vorhanden ist.

| unbenannt | Beschreibung                   |
| --------- | ------------------------------ |
| `1`       | `path` oder Datei zum Eingeben |
| `2`       | Ordnerdatei zum `dest`         |

| genannt  | kurz benannt | Beschreibung                   |
| -------- | ------------ | ------------------------------ |
| `--path` | `-p`         | `path` oder Datei zum Eingeben |
| `--dest` | `-d`         | Ordnerdatei zum `dest`         |

# Bündeln (Verpacken) und Installieren von Modulen

In *wes* wird ein Bündel mehrerer Module als Paket bezeichnet. Sie können das Paket für *wes* installieren, das auf *github* veröffentlicht wurde. Zum Veröffentlichen eines Pakets ist *github repository* erforderlich.

## *bundle*

Wenn Sie ein Paket auf *github* veröffentlichen, *bundle* Bundle die erforderlichen Module und erstellt *bundle.json* .

1.  In einem *repository* kann nur ein Paket veröffentlicht werden

2.  *package.json* ist erforderlich. Es ist mindestens die Beschreibung `main` erforderlich.

    ```json
     { "main": "index.js" }
    ```

3.  Machen Sie das Repository *public* , wenn Sie das Paket veröffentlichen möchten

4.  Ab `version 0.12.0` werden Pakete mit direktem Modulladen in ein Verzeichnis über dem Arbeitsverzeichnis nicht gebündelt. Pakete im oberen Verzeichnis *wes\_modules* oder *node\_modules* können gebündelt werden.

Geben Sie zum Bündeln den folgenden Befehl ein: Informationen zum Bündeln finden Sie in *package.json* .

```bat
wes bundle 
```

## *init*

Geben Sie einige Elemente ein und aus diesen Informationen wird *package.json* erstellt.

```bat
wes init
```

## *install*

Wird verwendet, um das auf *github* veröffentlichte Paket für *wes* zu installieren. Ab `version 0.10.28` wird der Installationsordner von `node_modules` in `wes_modules` geändert. Wenn Sie in `node_modules` installieren möchten, fügen Sie die Option `--node` hinzu. Ab `version 0.12.0` werden Dateien aus *bandle.json* entpackt und gespeichert. Aufgrund von Spezifikationsänderungen werden Pakete, die mit `version 0.12.0` gebündelt sind, möglicherweise nicht korrekt mit `version 0.12.0` oder höher installiert.

Übergeben Sie die zu *install* Argumente im Format `@author/repository` .

```bat
wes install @wachaon/fmt
```

*install* hat Optionen.

| genannt       | kurz benannt | Beschreibung                                                                                |
| ------------- | ------------ | ------------------------------------------------------------------------------------------- |
| `--bare`      | `-b`         | Erstellen Sie keine *@author* Ordner                                                        |
| `--global`    | `-g`         | Installieren Sie das Paket in dem Ordner, in dem sich *wes.js* befindet                     |
| `--save`      | `-S`         | Fügen Sie den Paketnamen und die Version zum *dependencies* in *package.json* hinzu         |
| `--save--dev` | `-D`         | Fügen Sie den Paketnamen und die Version zum Feld *devDependencies* in *package.json* hinzu |
| `--node`      | `-n`         | Im Ordner *node\_module* installieren                                                       |

Mit der Option `--bare` kann `require` Argument von `@author/repository` in `repository` weggelassen werden. `--global` stellt installierte Pakete allen Skripten zur Verfügung.

```bat
wes install @wachaon/fmt --bare
```

# Installieren von Paketen aus privaten Repositorys

*install* kann nicht nur Pakete aus öffentlichen *github* Repositorys installieren, sondern auch Pakete aus privaten Repositorys. Geben Sie in *install* das Paket mit *@author/repository* an. Die Implementierung versucht, die folgende URL herunterzuladen.

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/bundle.json`
```

Wenn Sie mit einem Browser auf *raw* des privaten Repositorys zugreifen, wird *token* angezeigt. Kopieren Sie also das *token* und verwenden Sie es. Pakete aus privaten Repositories können auch installiert werden, wenn sie in der Konsole ausgeführt werden, während *token* gültig ist.

```bat
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

# Paketeinführung

Hier sind einige externe Pakete.

## *@wachaon/fmt*

*@wachaon/fmt* ist für *wes* *prettier* verpackt, um Skripte zu formatieren. Wenn während der Installation *@wachaon/fmt* *Syntax Error* auftritt, können Sie außerdem den Ort des Fehlers angeben.

### Installieren Sie *@wachaon/fmt*

```bat
wes install @wachaon/fmt
```

Wenn im Arbeitsverzeichnis *.prettierrc* (JSON-Format) vorhanden ist, wird dies in den Einstellungen widergespiegelt. *fmt* ist sowohl in *CLI* als auch *module* verfügbar.

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

Überschreiben Sie die Datei mit dem formatierten Skript, wenn `--write` oder `-w` angegeben ist.

#### als Modul nutzen

```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')
const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```

## *@wachaon/edge*

Der Support *Internet Explorer* endet am 15. Juni 2022. Infolgedessen wird erwartet, dass Anwendungsoperationen mit `require('InternetExplorer.Application')` unmöglich werden. Darüber hinaus kann die Website selbst nicht korrekt angezeigt werden, wenn die Unterstützung für *Internet Explorer* eingestellt wird. Eine Alternative wäre der Betrieb *Microsoft Edge based on Chromium* über *web driver(msedgedriver.exe)* . `@wachaon/edge` vereinfacht *Edge* Autopiloten.

### Installieren Sie *@wachaon/edge*

Installieren Sie zunächst das Paket.

```bat
wes install @wachaon/edge --bare
```

Laden Sie dann *web driver(msedgedriver.exe)* herunter.

```bat
wes edge --download
```

Überprüfen Sie die installierte *Edge* Version und laden Sie den entsprechenden *web driver* herunter.

### So verwenden Sie *@wachaon/edge*

Es wird einfach zu bedienen sein. Starten Sie Ihren Browser und ändern Sie die Fenstergröße und die anzuzeigende Website auf `https://www.google.com` .

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

Wir speichern Ihren Besuchsverlauf, bis *URL* Ihres Browsers mit `https://www.yahoo` beginnt.

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

*edge* gibt die besuchten *URL* der Reihe nach an die Konsole aus. `@wachaon/edge` registriert Ereignisse für *URL* und fügt Daten zu `res.exports` hinzu. *URL* kann entweder `String` `RegExp` sein und flexibel festgelegt werden. Durch die ereignisgesteuerte Gestaltung können Sie problemlos auf den manuellen Betrieb umstellen, indem Sie keine Ereignisse für Prozesse festlegen, die mit dem Autopiloten nur schwer zu bewältigen sind. Wenn Sie möchten, dass das Skript angehalten wird, führen Sie `navi.emit('terminate', res)` aus oder beenden Sie *Edge* manuell. Die Finalisierung gibt `res.exports` standardmäßig als *.json* Datei aus. Wenn Sie die Beendigungsverarbeitung festlegen möchten, legen Sie `terminate` of `edge(callback, terminate)` fest. `window` ist eine Instanz der *Window* Klasse von *@wachaon/webdriver* , nicht das `window` des Browsers.

## *@wachaon/webdriver*

Dabei handelt es sich um ein Paket, das Anfragen an *web driver* sendet, der den Browser betreibt. *@wachaon/edge* enthält *@wachaon/webdriver* .

### Installieren Sie *@wachaon/webdriver*

```bat
wes install @wachaon/webdriver --bare
```

Laden Sie *Chromium* basierten *Microsoft Edge* *web driver(msedgedriver.exe)* herunter, falls Sie ihn nicht haben. Wenn die Version von *edge* und die Version des *web driver(msedgedriver.exe)* unterschiedlich sind, laden Sie außerdem dieselbe Version des *web driver(msedgedriver.exe)* herunter.

```bat
wes webdriver --download
```

### So verwenden Sie *@wachaon/webdriver*

Gehen Sie zur [*yahoo JAPAN*](https://www.yahoo.co.jp/) Website und speichern Sie einen Screenshot eines bestimmten Blockelements.

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
