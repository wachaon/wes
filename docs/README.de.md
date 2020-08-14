# WIR S

*wes* ist ein Framework zum Ausführen von *ECMAScript* auf *Windows Script Host*

*README* Original der [*japanese*](README.ja.md) wird sein. Anders als Japanisch wird der Text maschinell übersetzt. Bitte wählen Sie aus den folgenden Texten in anderen Sprachen.

-   [*簡体字*](README.zh-CN.md) <!-- 中国語 (簡体字) -->
-   [*繁体字*](README.zh-TW.md) <!-- 中国語 (繁体字) -->
-   [*English*](README.en.md) <!-- 英語 -->
-   [*हिन्दी*](README.hi.md)　<!-- ヒンディー語 -->
-   [*Español*](README.es.md) <!-- スペイン語 -->
-   [*عربى*](README.ar.md) <!-- アラビア語 -->
-   [*বাংলা*](README.bn.md) <!-- ベンガル語 -->
-   [*Português*](README.pt.md) <!-- ポルトガル語 -->
-   [*русский язык*](README.ru.md) <!-- ロシア語 -->
-   [*Deutsch*](README.de.md) <!-- ドイツ語 -->
-   [*français*](README.fr.md) <!-- フランス語 -->
-   [*italiano*](README.it.md)　<!-- イタリア語 -->

## Eigenschaften

-   Ändern Sie die Skript-Engine in *Chakra* und aktivieren Sie die Ausführung von *ECMAScript2015* *Chakra*
-   *cscript.exe* 32-Bit- *cscript.exe* , um besondere Fehler in der 64-Bit-Umgebung zu vermeiden
-   Sie können das Modul mit `require` importieren
-   Farbige Zeichen können in der Standardausgabe ausgegeben werden
-   Erraten Sie die Dateicodierung automatisch

## Funktionen nicht behoben

-   `WScript.Quit` kann das Programm nicht unterbrechen und gibt keinen Fehlercode zurück
-   Asynchrone Verarbeitung
-   Verwendung des *event prefix* des zweiten Arguments von `WScript.CreateObject`

## Installieren

*wes* brauchen ist *wes.js* einzige Datei. Starten Sie zum Herunterladen die Eingabeaufforderung und geben Sie den folgenden Befehl ein.

```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

*wes* zum Zeitpunkt der Ausführung als Implementierung *WScript.Shell* von `SendKeys` verwenden. *wes.js* der Pfad des Verzeichnisses, in dem *wes.js* gespeichert ist, andere Zeichen als *ascii* , `SendKeys` ihn nicht korrekt und das Skript wird nicht ausgeführt. In diesem Fall konfigurieren Sie bitte den Pfad, um *wes.js* nur mit *ascii* zu speichern.

## Verwendung

Geben Sie in der Befehlszeile die Datei an, die nach `wes` der Startpunkt des Programms ist. Die *.js* kann weggelassen werden.

```shell
wes index
```

Da *wes* über eine *REPL* , können Sie ein direkt in der Befehlszeile eingegebenes Skript ausführen, indem Sie es nur mit `wes` starten.

```shell
wes
```

Die Skripteingabe wird akzeptiert, bis Sie zwei Leerzeilen eingeben. *README.md* können die Ausführung des Beispielskripts in *README.md* mit *REPL* überprüfen.

## Argumente in der Befehlszeile

*wes* folgenden benannten Argumente werden als Startoptionen akzeptiert.

| genannt            | Beschreibung                                             |
| ------------------ | -------------------------------------------------------- |
| `--monotone`       | Beseitigen Sie den *ANSI escape code*                    |
| `--safe`           | Führen Sie das Skript im abgesicherten Modus aus         |
| `--usual`          | Führen Sie das Skript im normalen Modus aus (Standard)   |
| `--unsafe`         | Führen Sie das Skript im unsicheren Modus aus            |
| `--dangerous`      | Führen Sie das Skript im gefährlichen Modus aus          |
| `--debug`          | Führen Sie das Skript im Debug-Modus aus                 |
| `--encoding=UTF-8` | Geben Sie die Codierung der zuerst zu lesenden Datei an. |
| `--engine=Chakra`  | Diese Option wird von *wes* automatisch hinzugefügt      |

Die Implementierung von `--safe` `--usual` `--unsafe` `--dangerous` ist unvollständig, benannte Argumente sind jedoch vorbehalten.

## eingebaute Objekte

*wes* hat *built-in objects* , die *JScript* nicht hat.

### benötigen

Importieren Sie das Modul mit *require* . *wes* errät automatisch die Codierung der Moduldatei. Wenn Sie sie jedoch nicht richtig erraten, können Sie die Codierung mit dem zweiten Argument angeben.

Sie können auch mit *require* for *OLE* wie `require('WScript.Shell')` .

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

### module und module.exports

Wenn Sie es als Modul definieren möchten, ersetzen Sie es in `module.exports` .

```javascript
function add (a, b) {
    return a + b
}

module.exports = add
```

### Konsole

*wes* `WScript.Echo` `WScript.StdErr.WriteLine` in `WScript.Echo` und `WScript.StdErr.WriteLine` anstelle der *console* die.

Sie können Zeichen in der Befehlszeile mit `console.log` . Es werden auch formatierte Zeichenfolgen unterstützt. Mit dem Formatoperator `%` eine Formatzeichenfolge angeben.

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

*wes* um stattdessen eine in `WScript.StdOut.WriteLine` gefärbte Zeichenfolge `WScript.StdOut.WriteLine` , wird `WScript.StdErr.WriteLine` verwendet. Verwenden Sie `WScript.StdOut.WriteLine` oder `console.log` `WScript.Echo` Ausgabe von `WScript.Echo` und `WScript.StdOut.WriteLine` blockiert ist.

### Puffer

Kann mit Puffern umgehen.

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```

### **Verzeichnisname und** Dateiname

`__filename` speichert den Pfad der Moduldatei, die gerade ausgeführt wird. `__dirname` speichert das Verzeichnis `__filename` .

```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```

## eingebaute Module

*wes* verfügt über *built-in modules* zur Vereinfachung und Standardisierung der Basisverarbeitung.

### ansi

`ansi` enthält einen *ANSI escape code* , und Sie können die Farbe und den Effekt der Standardausgabe ändern. Farben und Effekte können je nach Typ und Einstellungen der verwendeten Konsolenanwendung variieren.

```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```

Sie können auch Ihre eigene Farbe mit `ansi.color()` oder `ansi.bgColor()` . Die Argumente verwenden *RGB* wie `255, 165, 0` oder *color code* wie `'#FFA500'` . Sie können keine *color name* wie `orange` .

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

### argv

Ruft Befehlszeilenargumente ab. `cscript.exe` Befehlszeilenargumente von `/` deklarieren benannte Argumente in, aber *wes* in `-` und `--` deklarieren die benannten Argumente in.

*argv.unnamed* und *argv.named* *argv.unnamed* *argv.named* des Befehlszeilenarguments in einen der *Boolean* Werte für *String* *Number* .

Geben Sie Befehlszeilenargumente mit *REPL* .

```shell
wes REPL aaa -bcd eee --fgh=iii jjj --kln mmm
```

Führen Sie das folgende Skript in *REPL* .

```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```

### Pfadname

Bedienen Sie den Pfad.

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

### Dateisystem

Betreibt Dateien und Verzeichnisse. `readTextFileSync` die `readTextFileSync` und liest sie.

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```

### JScript

Wenn Sie die Skript-Engine in *Chakra* ändern, können Sie keine *JScript* spezifischen *Enumerator* . Das eingebaute Modul *JScript* stellt sie zur Verfügung. *Enumerator* gibt jedoch ein *Array* anstelle eines Enumerator-Objekts zurück.

```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```

*GetObject* `WScript.GetObject` als Alternative zu `WScript.GetObject` .

```javascript
const { GetObject, Enumerator } = require('JScript')

const ServiceSet = GetObject("winmgmts:{impersonationLevel=impersonate}").InstancesOf("Win32_Service")
new Enumerator(ServiceSet).forEach(service => console.log(
    'Name: %O\nDescription: %O\n',
    service.Name,
    service.Description
))
```

### VBScript

*VBScript* bietet einige der Funktionen, die *JScript* nicht bietet.

```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```

### httprequest

*httprequest* ist wie der Name *http request* *httprequest* .

```javascript
const request = require('httprequest')
const content = request('GET', 'http://weather.livedoor.com/forecast/webservice/json/v1?city=130010')
console.log('%O', JSON.parse(content))
```

### minitest

*minitest* kann einfache Tests schreiben.

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

### Rohr

*pipe* vereinfacht die Rohrbearbeitung

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

### typecheck

Beurteilen Sie die Art des Skripts.

```javascript
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```

## Modul bündeln und installieren

*install* können Sie das auf *github* veröffentlichte Modul für *wes* *github* . Um das Modul zu veröffentlichen, benötigen Sie das *github repository* . Außerdem müssen der Repository-Name und der lokale Verzeichnisname identisch sein.

### bündeln

*github* ein Modul in *github* , bündelt *bundle* die erforderlichen Module und ändert es in ein Format, das vom *install* werden kann.

Aus Sicherheitsgründen importiert *wes* nicht das Modul, das direkt ausgeführt werden kann. Erstellen *.json* daher eine *.json* Datei im *bundle* Modul.

Es gibt einige Bedingungen für die Bündelung von Modulen.

1.  In einem *repository* kann *repository* ein Modultyp veröffentlicht werden.
2.  *github* Name des *github* Repositorys und der Name des lokalen Arbeitsverzeichnisses müssen identisch sein.
3.  Das Repository muss öffentlich sein, wenn Sie das Modul für einen Dritten veröffentlichen möchten.
4.  *wes* interpretiert das Skript nicht statisch, daher sind Module, `require` nur unter bestimmten Bedingungen `require` sind, z. B. `if` Anweisungen möglicherweise nicht gebündelt werden.
5.  *.json* Datei wird im Arbeitsverzeichnis mit dem Namen *directory_name.json* . Wenn Sie den Dateinamen ändern oder die Datei verschieben, können Sie sie nicht installieren.
6.  `node_modules/directory_name` schlägt das Bündeln fehl, da es auf `directory_name.json` verweist.

### Installieren

Es wird verwendet, um die auf *github* veröffentlichte *github* für *wes* zu *github* .

## Verwendung

Übergeben Sie die zu *install* Argumente im Format `@author/repository`

```shell
wes install @wachaon/fmt
```

*install* hat Optionen

| genannt    | kurz benannt | Beschreibung                                                            |
| ---------- | ------------ | ----------------------------------------------------------------------- |
| `--bare`   | `-b`         | Erstellen *@author* keinen *@author* Ordner                             |
| `--global` | `-g`         | Installieren Sie das Modul in dem Ordner, in dem sich *wes.js* befindet |

`--bare` Option `--bare` kann das Argument `require` von `author@repository` zu `repository` `--bare` . `--global` Option `--global` stellt das installierte Modul allen Skripten zur Verfügung. Die oben genannten Optionen müssen mit der *wes* Sicherheitsoption `--unsafe` oder `--dangerous` .

```shell
wes install @wachaon/fmt --bare --unsafe
```

# Installieren Sie das private Repository-Modul

*install* kann nicht nur im öffentlichen Repository-Modul von *github* sondern auch im privaten Repository *install* werden.

Geben Sie bei der *install* das Modul mit `author@repository` . Die Implementierung lädt Folgendes herunter.

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```

Wenn Sie mit einem Browser auf das *raw* des privaten Repositorys zugreifen, wird das *token* angezeigt. Kopieren Sie das *token* und verwenden Sie es.

Sie können die Module auch in Ihrem privaten Repository installieren, wenn Sie sie in der Befehlszeile ausführen, während das *token* gültig ist.

```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

## Externes Modul

Hier stellen wir einige externe Module vor.

### *@wachaon/fmt*

*@wachaon/fmt* ist ein Bündel *prettier* , das das Skript formatiert. Wenn `SyntaxError` auftritt, während *@wachaon/fmt* installiert ist, kann der Fehlerort *@wachaon/fmt* werden.

#### Installieren

```shell
wes install @wachaon/fmt
```

#### Verwendung

Wenn sich im *.prettierrc* (JSON-Format) befindet, geben Sie dies in der Einstellung wieder. *fmt* kann sowohl mit der *CLI* (Befehlszeilenschnittstelle) als auch mit dem *module* .

Als *CLI*

```shell
wes @wachaon/fmt src/sample --write
```

| unbenannte Nummer | Beschreibung                                                  |
| ----------------- | ------------------------------------------------------------- |
| 0                 | - -                                                           |
| 1                 | Erforderlich. Der Pfad der Datei, die Sie formatieren möchten |

| genannt   | kurz benannt | Beschreibung           |
| --------- | ------------ | ---------------------- |
| `--write` | `-w`         | Überschreiben zulassen |

Überschreibt die Datei mit dem formatierten Skript, wenn ein Argument mit dem Namen `--write` oder `-w` .

#### *module* Verwendung als *module*

#### `option`

```javascript
{
    parser: 'babel',
    plugins: [babel]
}
```

#### `format`

| Argumentname | Art      | Beschreibung                  |
| ------------ | -------- | ----------------------------- |
| `source`     | `string` | Zu formatierende Zeichenfolge |
| `option?`    | `object` | Optionen, um *prettier*       |

```javascript
const { format } = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { resolve } = require('pathname')

const spec = resolve(process.cwd(), 'sample.js')
let source = readTextFileSync(spec)
source = format(source)
console.log(writeTextFileSync(spec, source))
```
