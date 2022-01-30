# *WES*


*wes* ist ein Framework zum Ausführen von *ECMAScript* auf einem Befehlszeilen- *Windows Script Host* .


Der Originaltext der *README* ist [*japanese*](/README.md) . Anders als Japanisch ist es ein maschinell übersetzter Satz.  
Bitte wählen Sie aus den folgenden Sätzen in anderen Sprachen aus.


+  [*簡体字*](/docs/README.zh-CN.md) <!-- 中国語 (簡体字) -->
+  [*繁体字*](/docs/README.zh-TW.md) <!-- 中国語 (繁体字) -->
+  [*English*](/docs/README.en.md) <!-- 英語 -->
+  [*हिन्दी*](/docs/README.hi.md) <!-- ヒンディー語 -->
+  [*Español*](/docs/README.es.md) <!-- スペイン語 -->
+  [*عربى*](/docs/README.ar.md) <!-- アラビア語 -->
+  [*বাংলা*](/docs/README.bn.md) <!-- ベンガル語 -->
+  [*Português*](/docs/README.pt.md) <!-- ポルトガル語 -->
+  [*русский язык*](/docs/README.ru.md) <!-- ロシア語 -->
+  [*Deutsch*](/docs/README.de.md) <!-- ドイツ語 -->
+  [*français*](/docs/README.fr.md) <!-- フランス語 -->
+  [*italiano*](/docs/README.it.md) <!-- イタリア語 -->



# Merkmale


-   Ändern Sie die Skript-Engine von *Windows Script Host* in *Chakra* und führen *ECMAScript2015* 2015 aus
-   Es wird immer 32-Bit *cscript.exe* , sodass es in der 64-Bit-Umgebung keine inhärenten Fehler gibt.
-   Importieren Sie das Modul mit `require` (entspricht dem *es module* von *ver 0.9.0* )
-   Gibt farbige Zeichen auf die Standardausgabe aus
-   Erraten und lesen Sie automatisch die Kodierung der Textdatei


# Bekannte Probleme, die wir nicht lösen können


-   `WScript.Quit` kann das Programm nicht unterbrechen und gibt keinen Fehlercode zurück
-   Eine asynchrone Verarbeitung wie `setTimeout` und `Promise` ist nicht möglich
-   Das zweite *event prefix* von `WScript.CreateObject` kann nicht verwendet werden


# Installieren


Wes benötigt nur die *wes* *wes.js* . Starten Sie zum Herunterladen eine Eingabeaufforderung und geben Sie den folgenden Befehl ein.


```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```


*WScript.Shell* verwendet `SendKeys` von *wes* zur Laufzeit als Implementierung. Wenn der Pfad des Verzeichnisses, in dem *wes.js* gespeichert ist, andere Zeichen als *ascii* enthält, kann `SendKeys` den Schlüssel nicht korrekt senden und das Skript kann nicht ausgeführt werden.  
Bitte konfigurieren Sie den Speicherzielpfad von *wes.js* nur *ascii* .


## Verwendung


Geben Sie in der Befehlszeile die Datei an, die der Startpunkt des Programms nach `wes` sein soll. Die *.js* kann weggelassen werden.


```shell
wes index
```


Außerdem hat *wes* eine *REPL* , wenn Sie es also nur mit `wes` starten, können Sie das Skript direkt eingeben.


```shell
wes
```


Skripte werden akzeptiert, bis Sie zwei Leerzeilen eingeben. Sie können die Ausführung des Beispielskripts in *README.md* mit *REPL* überprüfen.


## benannte Argumente in der Befehlszeile


Die Startoptionen für *wes* sind wie folgt.


| genannt            | Bezeichnung                                            |
| ------------------ | ------------------------------------------------------ |
| `--monotone`       | Beseitigen *ANSI escape code*                          |
| `--safe`           | Führen Sie das Skript im abgesicherten Modus aus       |
| `--usual`          | Führen Sie das Skript im normalen Modus aus (Standard) |
| `--unsafe`         | Führen Sie das Skript im unsicheren Modus aus          |
| `--dangerous`      | Führen Sie das Skript im gefährlichen Modus aus        |
| `--debug`          | Führen Sie das Skript im Debug-Modus aus               |
| `--encoding=UTF-8` | Gibt die Codierung der ersten zu lesenden Datei an     |
| `--engine=Chakra`  | Diese Option wird automatisch von *wes* hinzugefügt    |


Die Implementierung von `--safe` `--usual` `--unsafe` `--dangerous` `--debug` ist unvollständig, aber benannte Argumente sind reserviert.


# Modulsystem


*wes* unterstützt *commonjs module* , die das allgemeine `require()` verwenden, und *es module* , die `import` verwenden. ( *dynamic import* wird nicht unterstützt, da es sich um eine asynchrone Verarbeitung handelt.)


## *commonjs module*


Verwalten Sie Module, indem `module.exports` und mit `require()` aufrufen. Der Einfachheit halber unterstützt es auch das Verzeichnis *node_modules* .


*wes* `require()` errät automatisch die Codierung der Moduldatei, aber wenn es nicht richtig rät, können Sie die Codierung mit dem zweiten Argument angeben.


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


Sie können auch wie *require* `require('WScript.Shell')` mit require in *OLE* importieren.


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


## *es module*


*Chakra* , die Ausführungsmaschine des Skripts, interpretiert die Syntax wie `imoprt` , kann jedoch nicht unverändert ausgeführt werden, da die Verarbeitungsmethode als `cscript` nicht definiert ist. *babel* ist in *wes* enthalten. Es wird ausgeführt, während sequentiell in das *es module* transpiliert wird. Infolgedessen steigen der Verarbeitungsaufwand und das Aufblähen von Dateien als Kosten.


Module, die von *es module* beschrieben werden, werden ebenfalls in `require()` transpiliert, sodass *OLE* aufgerufen werden kann. Es unterstützt jedoch nicht die Moduldatei-Codierungsspezifikation. Alle werden durch automatisches Raten gelesen.


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


# eingebaute Objekte


*wes* hat *built-in objects* , die *WSH (JScript)* nicht hat.


## *console*


`WScript.Echo` verwendet die *console* anstelle von *wes* oder `WScript.StdErr.WriteLine` .


Gibt Zeichen an die Befehlszeile in `console.log` . Es unterstützt auch formatierte Zeichenfolgen. Druckt eine formatierte Zeichenfolge mit dem Formatierungsoperator `%` .


```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```


`WScript.StdOut.WriteLine` *wes* von `WScript.StdErr.WriteLine` , um farbige Zeichenfolgen auszugeben. `WScript.Echo` und `WScript.StdOut.WriteLine` werden für die Ausgabe blockiert. `WScript.StdErr.WriteLine` oder `console.log` .


## *Buffer*


Kann mit Puffern umgehen.


```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```


## `__dirname` und `__filename`


`__filename` enthält den Pfad der aktuell laufenden Moduldatei. `__dirname` enthält das Verzeichnis von `__filename` .


```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```


# eingebaute Module


*wes* verfügt über *built-in modules* zur Vereinfachung und Standardisierung der grundlegenden Verarbeitung.


## *ansi*


`ansi` verfügt über einen *ANSI escape code* , mit dem Sie die Farbe und den Effekt der Standardausgabe ändern können. Farben und Effekte können je nach Typ und Einstellungen der verwendeten Konsolenanwendung variieren.


```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```


Sie können auch Ihre eigenen Farben mit `ansi.color()` und `ansi.bgColor()` . Das Argument verwendet *RGB* wie `255, 165, 0` oder einen *color code* wie `'#FFA500'` . *color name* wie `orange` werden nicht unterstützt.


```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```


## *argv*


Ruft das Befehlszeilenargument ab. Die Befehlszeilenargumente in `cscript.exe` deklarieren benannte Argumente mit `/` `--` während *wes* benannte Argumente mit `-` und - deklarieren.


*argv.unnamed* und *argv.named* wandeln den Werttyp des Befehlszeilenarguments in einen der *String* *Number* *Boolean* .


Geben Sie die Befehlszeilenargumente zusammen mit *REPL* ein.


```shell
wes REPL aaa -bcd eee --fgh=iii jjj --kln mmm
```


Führen Sie das folgende Skript in der *REPL* aus.


```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```


## *pathname*


Betreiben Sie den Pfad.


Pfade, die mit `/` und `\` beginnen, beziehen sich im Allgemeinen auf Pfade relativ zum Laufwerkstammverzeichnis. Beispielsweise können sich `/filename` und `C:/filename` im selben Pfad befinden. Aus Sicherheitsgründen interpretiert `wes` Pfade beginnend mit `/` und `\` als relativ zum Arbeitsverzeichnis.


```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```


## *filesystem*


Dateien und Verzeichnisse bedienen. `readTextFileSync` errät und liest automatisch die Kodierung der Datei.


```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```


## *chardet*


Ich verwende einige Funktionen von <https://github.com/runk/node-chardet> .


Sie können die Genauigkeit des automatischen Ratens verbessern, indem Sie die für die Kodierung spezifischen Zeichen erhöhen.


## *JScript*


Wenn Sie die Skript-Engine in *Chakra* ändern, können Sie den *JScript* -spezifischen *Enumerator* usw. nicht verwenden. Das eingebaute Modul *JScript* stellt sie zur Verfügung. *Enumerator* gibt jedoch ein *Array* anstelle eines *Enumerator object* zurück.


```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```


*GetObject* fungiert als Alternative zu `WScript.GetObject` .


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


*VBScript* bietet einige Funktionen, die *JScript* nicht hat.


```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```


## *httprequest*


*httprequest* *http request* eine HTTP-Anfrage aus, wie der Name schon sagt.


```javascript
const request = require('httprequest')
const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log('%O', JSON.parse(content))
```


## *minitest*


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


## *pipe*


*pipe* vereinfacht die Rohrbearbeitung.


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


Bestimmen Sie den Typ des Skripts.


```javascript
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```


# Modul bündeln und installieren


Mit *install* können Sie das auf *github* veröffentlichte Modul für *wes* installieren. Sie benötigen ein *github repository* , um das Modul zu veröffentlichen. Außerdem müssen der Name des Repositorys und der Name des lokalen Verzeichnisses identisch sein.


## *bundle*


Beim Veröffentlichen eines Moduls auf *github* bündelt *bundle* das erforderliche Modul und ändert es in ein Format, das vom *install* importiert werden kann.


Aus Sicherheitsgründen importiert *wes* keine Module in einem Format, das direkt ausgeführt werden kann. Erstellen Sie daher eine *.json* -Datei mit dem *bundle* -Modul.


Es gibt einige Bedingungen für das Bündeln von Modulen.


1.  In einem *repository* kann nur ein Modultyp veröffentlicht werden.
2.  Der Repository-Name auf *github* und der Name des lokalen Arbeitsverzeichnisses müssen identisch sein.
3.  Das Repository muss öffentlich sein, wenn Sie das Modul für Dritte veröffentlichen möchten.
4.  *wes* interpretiert den Modulpfad dynamisch. Module, die von erworben werden, `require` bestimmte Bedingungen, z. B. `if` Anweisungen nicht gebündelt werden dürfen.
5.  *.json* -Datei wird in Ihrem Arbeitsverzeichnis mit dem Namen *directory_name.json* erstellt. Es kann nicht installiert werden, wenn die Datei umbenannt oder die Datei verschoben wird.
6.  `node_modules/directory_name` schlägt das Bundle fehl, da es auf `directory_name.json` verweist.


## *install*


Wird verwendet, um die auf *github* veröffentlichte Moduldatei für *wes* zu installieren.


### Verwendung


Übergeben Sie die zu *install* Argumente im Format `@author/repository` .


```shell
wes install @wachaon/fmt
```


*install* hat Optionen.


| genannt    | kurz benannt | Bezeichnung                                                             |
| ---------- | ------------ | ----------------------------------------------------------------------- |
| `--bare`   | `-b`         | Erstellen Sie keinen *@author* Ordner                                   |
| `--global` | `-g`         | Installieren Sie das Modul in dem Ordner, in dem sich *wes.js* befindet |


`--bare` kann das `require` -Argument von `author@repository` an `repository` weglassen. `--global` macht die installierten Module für alle Skripte verfügbar. Die obigen Optionen müssen gleichzeitig mit der *wes* -Sicherheitsoption `--unsafe` oder `--dangerous` .


```shell
wes install @wachaon/fmt --bare --unsafe
```


# Installieren Sie das Modul des privaten Repositorys


*install* kann nicht nur in Modulen in öffentlichen Repositories auf *github* werden, sondern auch in privaten Repositories.


Geben Sie bei der *install* das Modul mit `author@repository` an. Die Implementierung lädt Folgendes herunter.


```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```


Wenn Sie mit einem Browser auf *raw* des privaten Repositorys zugreifen, wird das *token* angezeigt, also kopieren Sie das *token* und verwenden Sie es.


Sie können ein Modul auch in einem privaten Repository installieren, indem Sie es innerhalb der Lebensdauer des *token* auf der Befehlszeile ausführen.


```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```


# Externes Modul


Hier sind einige externe Module.


## *@wachaon/fmt*


*@wachaon/fmt* bündelt *prettier* und formatiert das Skript. Auch wenn @ `SyntaxError` *@wachaon/fmt* installiert ist und ein Syntaxfehler auftritt, kann die Fehlerstelle angezeigt werden.


### Installieren


```shell
wes install @wachaon/fmt
```


### Verwendung


Wenn im Arbeitsverzeichnis *.prettierrc* (JSON-Format) vorhanden ist, wird dies in der Einstellung widergespiegelt. Es kann sowohl mit *CLI* (Befehlszeilenschnittstelle) als auch mit dem *module* in *fmt* verwendet werden.


Wird als *CLI* verwendet.


```shell
wes @wachaon/fmt src/sample --write
```


| unbenannte Nummer | Bezeichnung                                                   |
| ----------------- | ------------------------------------------------------------- |
| 0                 | ――――                                                          |
| 1                 | Erforderlich. Der Pfad der Datei, die Sie formatieren möchten |


| genannt   | kurz benannt | Bezeichnung            |
| --------- | ------------ | ---------------------- |
| `--write` | `-w`         | Überschreiben zulassen |


Überschreiben Sie die Datei mit einem formatierten Skript, wenn Sie ein benanntes Argument von `--write` oder `-w` angeben.


### Bei Verwendung als *module*


### `option`


```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')

const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```


## `@wachaon/edge`


*Internet Explorer* wird die Unterstützung mit dem 15.06.2022 abschließen. Dadurch wird es unmöglich, die Anwendung mit `require('InternetExplorer.Application')` zu betreiben.


Eine Alternative wäre, *Microsoft Edge based on Chromium* über den *web driver* zu betreiben. `@wachaon/edge` vereinfacht den *Edge* -Autopiloten.


### Installieren


Installieren Sie zuerst das Modul.


```shell
wes install @wachaon/edge --unsafe --bare
```


Laden Sie dann den *web driver* herunter.


```shell
wes edge
```


Entpacken Sie die heruntergeladene *zip* -Datei und verschieben *msedgedriver.exe* in das aktuelle Verzeichnis.


### Verwendung


Es wird einfach zu bedienen sein.


```javascript
const edge = require('./index')

edge((window, navi, res) => {
    window.rect({x: 1 ,y: 1, width: 1200, height: 500})
    window.navigate('http://www.google.com')
    res.exports = []

    navi.on(/./, (url) => {
        console.log('URL: %O', url)
        res.exports.push(url)
    })
})
```


Dieses Skript gibt die besuchten *URL* nacheinander an die Eingabeaufforderung aus.


`@wachaon/edge` registriert ein Ereignis für die *URL* und fügt `res.exports` Daten hinzu. Die zu registrierende *URL* kann entweder `String` `RegExp` sein, und es können flexible Einstellungen vorgenommen werden.


Durch die ereignisgesteuerte Gestaltung ist es möglich, einfach auf manuellen Betrieb umzuschalten, indem die *URL* für Prozesse, die mit Autopilot schwierig zu handhaben sind, nicht gesetzt wird.


Wenn Sie das Skript stoppen möchten, führen `navi.emit('terminate', res)` oder beenden Sie *Edge* manuell.


Der Beendigungsprozess gibt `res.exports` als *.json* -Datei als Standardwert aus. Wenn Sie den Beendigungsprozess festlegen möchten, setzen Sie den Befehl „ `terminate` of `edge(callback, terminate)` .
