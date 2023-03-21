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

*   Sie können die Skript-Engine auf *Chakra* ändern und gemäß den *ECMAScript2015* Spezifikationen schreiben.
*   Verwendet immer 32-Bit *cscript.exe* , also keine eindeutigen 64-Bit-Probleme
*   Verfügbares Modulsystem für eine effizientere Entwicklung als herkömmliche *WSH*
*   Eingebaute Module unterstützen die grundlegende Verarbeitung wie Dateieingabe/-ausgabe und Farbtextausgabe an die Konsole
*   Sie müssen sich keine Gedanken über die Codierung usw. machen, da es beim Lesen der Datei automatisch auf die Codierung schließen kann
*   Es ist auch möglich, das Modul zu packen und extern zu veröffentlichen oder zu beziehen.
*   Zeigen Sie Fehlerdetails freundlicher an als *WSH*

# *wes* Probleme, die wir nicht lösen können

*   `WScript.Quit` kann das Programm nicht abbrechen und gibt keinen Fehlercode zurück
*   Die asynchrone Verarbeitung funktioniert nicht richtig
*   Sie können das *event prefix* des zweiten Arguments von `WScript.CreateObject` nicht verwenden

# herunterladen

*wes* benötigt nur die Datei *wes.js* Kopieren Sie zum Herunterladen *wes.js* von [*@wachaon/wes*](https://github.com/wachaon/wes) oder führen Sie den folgenden Befehl in Ihrer Konsole aus.

```bat
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

*wes* übernimmt eine Implementierung, die `SendKeys` von *WScript.Shell* zur Laufzeit verwendet. Wenn der Pfad des Verzeichnisses, in dem *wes.js* gespeichert ist, Nicht-ASCII-Zeichen enthält, kann `SendKeys` die Schlüssel nicht korrekt senden und das Skript wird nicht ausgeführt. Stellen Sie daher sicher, dass der Pfad, in dem Sie *wes.js* speichern, nur aus ASCII-Zeichen besteht. Wenn Sie *wes.js* bereits heruntergeladen haben, können Sie es alternativ mit dem folgenden Befehl aktualisieren.

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
| `--arch=x86`       | Diese Option wird automatisch von *wes* hinzugefügt     |

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

*Chakra* , die Skriptausführungs-Engine, interpretiert Syntax wie `imoprt` , wird jedoch nicht in der *cscript* Umgebung ausgeführt. In *wes* werden durch Hinzufügen von *babel* zu den eingebauten Modulen auch *es module* ausgeführt, während sie einzeln transpiliert werden. Dies geht zu Lasten des Verarbeitungsaufwands und einer aufgeblähten *wes.js* -Datei. Module, die in *es module* geschrieben wurden, werden durch Transpilieren ebenfalls in `require()` konvertiert, sodass es möglich ist, *COM Object* aufzurufen. Es unterstützt jedoch nicht die Angabe der Codierung der Moduldatei mit *es module* . Alles wird automatisch geladen. Um es als *es module* zu laden, setzen Sie die Erweiterung auf `.mjs` oder setzen Sie das Feld `"type"` in `package.json` auf `"module"` .

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
console.log('%s %O', content, buff)
```

## `__dirname` und `__filename`

`__filename` speichert den Pfad der aktuell ausgeführten Moduldatei. `__dirname` enthält das Verzeichnis von `__filename` .

```javascript
const message = `dirname: ${__dirname}\nfilename: ${ __filename}`
console.log(message)
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

## Eingebaute Module zum Entfernen

Ändern Sie einige eingebaute Module in externe Module, um die Datei schlanker und pflegeleichter zu machen.

*   *animate.js*
*   *day.js*
*   *debug.js*
*   *log.js*

Die obigen Module können jeweils als `@wachaon/animate` `@wachaon/day` `@wachaon/debug` `@wachaon/log` werden.

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

Wenn Sie die Skript-Engine auf *Chakra* ändern, können Sie keine *JScript* spezifischen *Enumerator* usw. verwenden. Das eingebaute Modul *JScript* stellt sie zur Verfügung. *Enumerator* gibt jedoch *Array* zurück, kein *Enumerator object* .

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

Gruppiere mit `describe` , teste `it` und verifiziere mit `assert` . `pass` ist ein Array aus der Anzahl der Vorkommen `it` und der Anzahl der Durchgänge.

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

Der Einfachheit halber gibt es nur drei Behauptungsfunktionen zum Vergleichen von Objekten.

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

*pipe* vereinfacht die Verrohrung. Das Ergebnis wird beim Konvertieren *data* mit einem oder mehreren *converter* ausgegeben. Ab *ver 0.12.75* kann es direkt von der Kommandozeile aus gestartet werden.

### *pipe* als Modul starten

Fügen Sie die Konvertierungsfunktion in `use(converter)` der *pipe* Methode ein und beschreiben Sie die Dateneingabe und die Verarbeitung nach der Konvertierung mit `process(data, callback(error, result))` . Wird kein `callback` angegeben, ist der Rückgabewert *promise* und die Verarbeitung kann mit `then(result)` und `catch(error)` verbunden werden.

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

Neben `use(converter)` gibt es Methoden wie `.filter(callbackFn(value, index))` und `map(callbackFn(value, index))` . Alle *data* sind eine Zeichenfolge, ein Array und ein Objekt.

```javascript
const pipe = require('pipe')

const tsv = `
javascript\t1955
java\t1995
vbscript\t1996
c#\t2000
`.trim()

pipe()
    .filter(include)
    .map(release)
    .process(tsv)
    .then((res) => console.log(() => res))

function include(value, i) {
    return value.includes('script')
}

function release(value, i) {
    return value.split('\t').join(' was released in ')
}
```

### starten Sie *pipe* von der Befehlszeile aus

Geben Sie in der Befehlszeile die Konvertierungsfunktion in der Reihenfolge nach `pipe` ein. Argumente für Konvertierungsfunktionen werden als Werte für benannte Befehlszeilenargumente mit demselben Namen wie die Konvertierungsfunktion eingegeben. `=>` Wert `(` mit `eval()` anstelle von `JSON.parse()` analysiert `)` *WSH* `"` in Befehlszeilenargumenten erzwingt. In diesem Fall nicht mit `eval()` analysieren.)

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

```javascript
const { isString, isNumber, isBoolean, isObject } = require('typecheck')
const log = require('log')
log(() => isString("ECMAScript"))
log(() => isNumber(43.5))
log(() => isBoolean(false))
log(() => isObject(function(){}))
```

## *getMember*

Ruft bei Verwendung in der Konsole den Mitgliedstyp und die Beschreibung des *COM Object* aus der *ProgID* ab.

```bat
wes getMember "Scripting.FileSystemObject"
```

Wenn es als Modul verwendet wird, erhält es den Typ und die Beschreibung der Mitglieder der Instanz. Wenn es als Modul verwendet wird, können Sie Informationen über Objekte erhalten, die nicht von *WSH (Windows Script Host)* bestätigt werden können.

```javascript
const getMember = require('getMember')
const SWbemServicesEx = require("WbemScripting.SWbemLocator").ConnectServer()
getMember(SWbemServicesEx)
```

Das Übergeben von Objekten von *wes* an *PowerShell* erfordert eine gewisse Zeit.

Wenn die Bearbeitung stoppt, geben Sie bitte die Wartezeit an. (Standard ist `1000` )

```bat
wes getMember "Scripting.FileSystemObject" 2000
```

oder

```javascript
const getMember = require('getMember', 2000)
const SWbemServicesEx = require("WbemScripting.SWbemLocator").ConnectServer()
getMember(SWbemServicesEx)
```

## *ps*

Erleichtert das Ausführen von *PowerShell* .

### `ps(source, option)`

Führen Sie das `source` *PowerShell* -Skript aus.

Zeigen Sie eine Liste von Cmdlets in der Konsole an.

```javascript
const ps = require('ps')
const one = ps("Get-Command")
```

Wenn ein *Google Cherome* Fenster vorhanden ist, ändern Sie die Größe und Position des Fensters. (Funktioniert nicht im Vollbildmodus.)

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

### Führen *powershell* direkt von der Konsole aus

Führt die angegebene *.ps1* -Datei in der Konsole aus.

```bat
wes ps ./sample.ps1
```

Sie können einen Befehl auch direkt ausführen, indem Sie die Option `--Command` oder `-c` angeben.

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

## *init*

Geben Sie einige Elemente ein und es wird *package.json* aus diesen Informationen erstellt.

```bat
wes init
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

### Installieren Sie *@wachaon/fmt*

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

## *@wachaon/edge*

Der Support für *Internet Explorer* endet am 15. Juni 2022. Daher wird erwartet, dass Anwendungsoperationen mit `require('InternetExplorer.Application')` unmöglich werden. Darüber hinaus kann die Website selbst nicht korrekt angezeigt werden, wenn die Unterstützung für *Internet Explorer* beendet wird. Eine Alternative wäre, *Microsoft Edge based on Chromium* über den *web driver(msedgedriver.exe)* zu betreiben. `@wachaon/edge` vereinfacht den *Edge* -Autopiloten.

### Installieren Sie *@wachaon/edge*

Installieren Sie zuerst das Paket.

```bat
wes install @wachaon/edge --bare
```

Laden Sie dann den *web driver(msedgedriver.exe)* herunter.

```bat
wes edge --download
```

Überprüfen Sie die installierte *Edge* -Version und laden Sie den entsprechenden *web driver* herunter.

### So verwenden *@wachaon/edge*

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

Wir speichern Ihren Besuchsverlauf, bis die *URL* Ihres Browsers mit `https://www.yahoo` beginnt.

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

*edge* gibt die besuchten *URL* der Reihe nach auf der Konsole aus. `@wachaon/edge` registriert Ereignisse für *URL* und fügt Daten zu `res.exports` hinzu. Die zu registrierende *URL* kann entweder `String` `RegExp` sein und kann flexibel festgelegt werden. Indem Sie es ereignisgesteuert machen, können Sie einfach auf manuellen Betrieb umschalten, indem Sie keine Ereignisse für Prozesse festlegen, die mit Autopilot schwierig zu handhaben sind. Wenn Sie möchten, dass das Skript beendet wird, `navi.emit('terminate', res)` oder beenden Sie *Edge* manuell. Die Finalisierung gibt `res.exports` als *.json* -Datei aus. Wenn Sie die Beendigungsverarbeitung festlegen möchten, setzen Sie „ `terminate` of `edge(callback, terminate)` . `window` ist eine Instanz der *Window* -Klasse von *@wachaon/webdriver* , nicht das `window` des Browsers.

## *@wachaon/webdriver*

Es wird ein Paket sein, das Anfragen an den *web driver* sendet, der den Browser betreibt. *@wachaon/edge* enthält *@wachaon/webdriver* .

### Installieren Sie *@wachaon/webdriver*

```bat
wes install @wachaon/webdriver --bare
```

Laden Sie den *Chromium* -basierten *Microsoft Edge* *web driver(msedgedriver.exe)* wenn Sie ihn nicht haben. Wenn die Version von *edge* und die Version des *web driver(msedgedriver.exe)* unterschiedlich sind, laden Sie dieselbe Version des *web driver(msedgedriver.exe)* .

```bat
wes webdriver --download
```

### So verwenden *@wachaon/webdriver*

Rufen Sie die Website von [*yahoo JAPAN*](https://www.yahoo.co.jp/) auf und speichern Sie einen Screenshot eines bestimmten Blockelements.

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
