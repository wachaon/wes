# *WES*


*wes* ist ein Framework zum Ausführen von *ECMAScript* auf dem *Windows Script Host*


Der Originaltext der *README* ist [*japanese*](/README.md) . Anders als Japanisch ist es ein maschinell übersetzter Satz.  
Bitte wählen Sie aus den folgenden Sätzen in anderen Sprachen aus.


+  [*簡体字*](README.zh-CN.md) <!-- 中国語 (簡体字) -->
+  [*繁体字*](README.zh-TW.md) <!-- 中国語 (繁体字) -->
+  [*English*](README.en.md) <!-- 英語 -->
+  [*हिन्दी*](README.hi.md) <!-- ヒンディー語 -->
+  [*Español*](README.es.md) <!-- スペイン語 -->
+  [*عربى*](README.ar.md) <!-- アラビア語 -->
+  [*বাংলা*](README.bn.md) <!-- ベンガル語 -->
+  [*Português*](README.pt.md) <!-- ポルトガル語 -->
+  [*русский язык*](README.ru.md) <!-- ロシア語 -->
+  [*Deutsch*](README.de.md) <!-- ドイツ語 -->
+  [*français*](README.fr.md) <!-- フランス語 -->
+  [*italiano*](README.it.md) <!-- イタリア語 -->



# Merkmale


-   Ändern Sie die Skript-Engine von *Windows Script Host* in *Chakra* und führen Sie *ECMAScript2015* *Chakra*
-   Es führt immer 32- *cscript.exe* , daher gibt es keine inhärenten Fehler in einer 64-Bit-Umgebung.
-   Importieren Sie das Modul mit `require`
-   Gibt farbige Zeichen auf der Standardausgabe aus
-   Erraten und lesen Sie automatisch die Kodierung der Textdatei


# Funktionen nicht behoben


-   `WScript.Quit` kann das Programm nicht unterbrechen und gibt keinen Fehlercode zurück
-   Eine asynchrone Verarbeitung wie `setTimeout` und `Promise` ist nicht möglich
-   Das *event prefix* des zweiten Arguments von `WScript.CreateObject` kann nicht verwendet werden.


# Installieren


*wes* braucht nur die Datei *wes.js* Starten Sie zum Herunterladen eine Eingabeaufforderung und geben Sie den folgenden Befehl ein.


```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```


*wes* zum Zeitpunkt der Ausführung als Implementierung *WScript.Shell* von `SendKeys` verwenden. *wes.js* der Pfad des Verzeichnisses, in dem *wes.js* gespeichert ist, andere Zeichen als *ascii* , kann `SendKeys` den Schlüssel nicht korrekt senden und das Skript kann nicht ausgeführt werden.  
Bitte konfigurieren Sie den Pfad, um *wes.js* nur *ascii* zu speichern.


## Verwendung


Geben Sie in der Befehlszeile die Datei an, die nach `wes` der Startpunkt des Programms sein soll. Die *.js* kann weggelassen werden.


```shell
wes index
```


Außerdem hat *wes* eine *REPL* wenn Sie es also nur mit `wes` starten, können Sie das Skript direkt eingeben.


```shell
wes
```


Skripte werden akzeptiert, bis Sie zwei Leerzeilen eingeben. *README.md* können die Ausführung des Beispielskripts auch in *README.md* mit *REPL* überprüfen.


## Befehlszeilenbenannte Argumente


Die Startoptionen für *wes* sind wie folgt.


| genannt            | Bezeichnung                                            |
| ------------------ | ------------------------------------------------------ |
| `--monotone`       | Eliminieren Sie den *ANSI escape code*                 |
| `--safe`           | Führen Sie das Skript im abgesicherten Modus aus       |
| `--usual`          | Führen Sie das Skript im normalen Modus aus (Standard) |
| `--unsafe`         | Führen Sie das Skript im unsicheren Modus aus          |
| `--dangerous`      | Führen Sie das Skript im gefährlichen Modus aus        |
| `--debug`          | Führen Sie das Skript im Debug-Modus aus               |
| `--encoding=UTF-8` | Gibt die Codierung der ersten zu lesenden Datei an     |
| `--engine=Chakra`  | Diese Option wird von *wes* automatisch hinzugefügt    |


Die Implementierung von `--safe` `--usual` `--unsafe` `--dangerous` `--debug` ist unvollständig, aber benannte Argumente sind reserviert.


# eingebaute Objekte


*wes* hat *built-in objects* , die *WSH (JScript)* nicht hat.


## *require*


Importieren Sie das Modul mit *require* . *wes* errät automatisch die Kodierung der Moduldatei, aber wenn Sie nicht richtig raten, können Sie die Kodierung mit dem zweiten Argument angeben.


Außerdem `require('WScript.Shell')` ab *OLE* sogar *require* Import *require* ist mit möglich.


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


## `module` und `module.exports`


Wenn Sie es als Modul definieren möchten, weisen Sie es `module.exports` .


```javascript
function add (a, b) {
    return a + b
}

module.exports = add
```


## *console*


*wes* In `WScript.Echo` und `WScript.StdErr.WriteLine` anstelle der *console* die.


`console.log` Zeichen in die Befehlszeile in `console.log` . Es unterstützt auch formatierte Zeichenfolgen. Gibt eine formatierte Zeichenfolge mit dem Formatierungsoperator `%` .


```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```


*wes* um stattdessen einen in `WScript.StdOut.WriteLine` eingefärbten String `WScript.StdOut.WriteLine` , verwenden Sie `WScript.StdErr.WriteLine` . `WScript.Echo` und `WScript.StdOut.WriteLine` werden von der Ausgabe blockiert, verwenden Sie also `WScript.StdErr.WriteLine` oder `console.log` .


## *Buffer*


Kann mit Puffern umgehen.


```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```


## `__dirname` und `__filename`


`__filename` enthält den Pfad der aktuell laufenden Moduldatei. `__dirname` `__filename` das Verzeichnis von `__filename` .


```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```


# eingebaute Module


*wes* verfügt über *built-in modules* , um die grundlegende Verarbeitung zu vereinfachen und zu standardisieren.


## *ansi*


`ansi` verfügt über einen *ANSI escape code* , mit dem Sie die Farbe und den Effekt der Standardausgabe ändern können. Farben und Effekte können je nach Typ und Einstellungen der verwendeten Konsolenanwendung variieren.


```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```


Sie können mit `ansi.color()` und `ansi.bgColor()` auch eigene Farben `ansi.color()` . Das Argument verwendet *RGB* wie `255, 165, 0` oder *color code* wie `'#FFA500'` . *color name* wie `orange` nicht unterstützt.


```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```


## *argv*


Ruft das Befehlszeilenargument ab. `cscript.exe` Befehlszeilenargumente von `/` deklarieren benannte Argumente in aber *wes* in `-` und `--` deklarieren die benannten Argumente in.


*argv.unnamed* und *argv.named* *argv.unnamed* *argv.named* des Befehlszeilenarguments in einen der *Boolean* *String* *Number* *Boolean* .


Geben Sie die Befehlszeilenargumente zusammen mit der *REPL* .


```shell
wes REPL aaa -bcd eee --fgh=iii jjj --kln mmm
```


Führen Sie das folgende Skript in der *REPL* .


```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```


## *pathname*


Bedienen Sie den Pfad.


```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```


## *filesystem*


Betreiben Sie Dateien und Verzeichnisse. `readTextFileSync` errät und liest automatisch die Codierung der Datei.


```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```


## *JScript*


Wenn Sie die Skript-Engine auf *Chakra* ändern, können Sie den *JScript* spezifischen *Enumerator* usw. nicht verwenden. Das eingebaute Modul *JScript* stellt sie zur Verfügung. *Enumerator* gibt jedoch ein *Array* anstelle eines Enumerator-Objekts zurück.


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


## *VBScript*


*VBScript* bietet einige Funktionen, die *JScript* nicht hat.


```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```


## *httprequest*


*httprequest* ist wie der Name, den *http request* *httprequest* a.


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


## *typecheck*


Bestimmen Sie den Typ des Skripts.


```javascript
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```


# Modul bündeln und installieren


*install* können Sie das auf *github* veröffentlichte Modul für *wes* *github* . Sie benötigen ein *github repository* , um das Modul zu veröffentlichen. Außerdem müssen der Repository-Name und der lokale Verzeichnisname gleich sein.


## *bundle*


*github* Veröffentlichen eines Moduls auf *github* bündelt *bundle* das erforderliche Modul und ändert es in ein Format, das vom *install* importiert werden kann.


Aus Sicherheitsgründen importiert *wes* keine Module in einem Format, das direkt ausgeführt werden kann. Erstellen Sie daher eine *.json* Datei mit dem *bundle* Modul.


Es gibt einige Bedingungen für das Bündeln von Modulen.


1.  In einem *repository* kann *repository* ein Modultyp veröffentlicht werden.
2.  Der Name des Repositorys auf *github* und der Name des lokalen Arbeitsverzeichnisses müssen gleich sein.
3.  Das Repository muss öffentlich sein, wenn Sie das Modul an Dritte veröffentlichen möchten.
4.  *wes* interpretiert das Skript nicht statisch. Module, die von erworben werden, `require` unter bestimmten Bedingungen, z. B. `if` Aussagen nicht gebündelt werden dürfen.
5.  *.json* Datei wird in Ihrem Arbeitsverzeichnis mit dem Namen *directory_name.json* . Es kann nicht installiert werden, wenn die Datei umbenannt oder verschoben wird.
6.  `node_modules/directory_name` schlägt das Bundle fehl, weil es auf `directory_name.json` verweist.


## *install*


Wird verwendet, um die auf *github* veröffentlichte *github* für *wes* zu *github* .


### Verwendung


Übergeben Sie die zu *install* Argumente im Format `@author/repository`


```shell
wes install @wachaon/fmt
```


*install* hat Optionen


| genannt    | kurz benannt | Bezeichnung                                                             |
| ---------- | ------------ | ----------------------------------------------------------------------- |
| `--bare`   | `-b`         | *@author* Ordner erstellen                                              |
| `--global` | `-g`         | Installieren Sie das Modul in dem Ordner, in dem sich *wes.js* befindet |


`--bare` Option `--bare` kann das `require` Argument vom `author@repository` zum `repository` weglassen. `--global` Option `--global` macht die installierten Module für alle Skripte verfügbar. Die obigen Optionen müssen gleichzeitig mit der *wes* Sicherheitsoption `--unsafe` oder `--dangerous` .


```shell
wes install @wachaon/fmt --bare --unsafe
```


# Installieren Sie das Modul des privaten Repositorys


*install* kann nicht nur in Modulen in öffentlichen Repositorys auf *github* , sondern auch in privaten Repositorys.


Geben Sie bei der *install* das Modul mit `author@repository` . Die Implementierung lädt Folgendes herunter.


```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```


Wenn Sie mit einem Browser auf das *raw* des privaten Repositorys zugreifen, wird das *token* angezeigt, also kopieren Sie das *token* und verwenden Sie es.


Sie können ein Modul auch in einem privaten Repository installieren, indem Sie es innerhalb der *token* des *token* auf der Befehlszeile *token* .


```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```


# Externes Modul


Hier sind einige externe Module.


## *@wachaon/fmt*


*@wachaon/fmt* bündelt *prettier* und formatiert das Skript. Auch wenn *@wachaon/fmt* installiert ist und ein `SyntaxError` auftritt, kann die Fehlerstelle angegeben werden.


### Installieren


```shell
wes install @wachaon/fmt
```


### Verwendung


Wenn *.prettierrc* (JSON-Format) im Arbeitsverzeichnis vorhanden ist, wird dies in der Einstellung widergespiegelt. *fmt* kann sowohl mit *CLI* (Befehlszeilenschnittstelle) als auch mit *module* in *fmt* .


Als *CLI*


```shell
wes @wachaon/fmt src/sample --write
```


| unbenannte Nummer | Bezeichnung                                                   |
| ----------------- | ------------------------------------------------------------- |
| 0                 | Ich                                                           |
| 1                 | Erforderlich. Der Pfad der Datei, die Sie formatieren möchten |


| genannt   | kurz benannt | Bezeichnung            |
| --------- | ------------ | ---------------------- |
| `--write` | `-w`         | Überschreiben zulassen |


Überschreiben Sie die Datei mit einem formatierten Skript, wenn Sie ein benanntes Argument von `--write` oder `-w` angeben.


### *module* Verwendung als *module*


### `option`


```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')

const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```
