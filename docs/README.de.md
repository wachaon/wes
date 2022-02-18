# *WES*


*wes* ist ein Konsolen-Framework, das *ECMAScript* auf *WSH (Windows Script Host)* .


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



# Merkmal


-   Sie können die Skript-Engine in *Chakra* ändern und in die *ECMAScript2015* -Spezifikation schreiben
-   Es wird immer 32-Bit *cscript.exe* , sodass in einer 64-Bit-Umgebung keine Probleme auftreten.
-   Mit einem modularen System können Sie effizienter entwickeln als mit herkömmlichem *WSH*
-   Das eingebaute Modul unterstützt die grundlegende Verarbeitung wie Dateieingabe / -ausgabe und Ausgabe von farbigen Zeichen an die Konsole.
-   Sie müssen sich keine Gedanken über die Kodierung machen, da Sie die Datei automatisch lesen lassen können, um die Kodierung zu erraten.
-   Wir paketieren auch Module zur Unterstützung der externen Veröffentlichung und des Abrufs.


# Bekannte Probleme, die *wes* nicht lösen können


-   `WScript.Quit` kann das Programm nicht unterbrechen und gibt keinen Fehlercode zurück
-   Eine asynchrone Verarbeitung wie `setTimeout` und `Promise` ist nicht möglich
-   Sie können das *event prefix* nicht als zweites Argument von `WScript.CreateObject`


# Installieren


Wes benötigt nur die *wes* *wes.js* . Kopieren Sie zum Herunterladen *wes.js* von [*@wachaon/wes*](https://github.com/wachaon/wes) oder führen Sie den folgenden Befehl in der Konsole aus.


```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```


*WScript.Shell* verwendet `SendKeys` in *wes* zur Laufzeit als Implementierung. Wenn der Pfad des Verzeichnisses, in dem *wes.js* gespeichert ist, andere Zeichen als *ascii* enthält, kann `SendKeys` den Schlüssel nicht korrekt senden und das Skript kann nicht ausgeführt werden.  
Bitte konfigurieren Sie den Speicherzielpfad von *wes.js* nur *ascii* .


# Wie benutzt man


Geben Sie den Befehl, der die Datei angibt, die der Startpunkt des Programms sein soll, über das Schlüsselwort `wes` in der Konsole ein. Die *.js* kann weggelassen werden.


```shell
wes index
```


Außerdem hat *wes* eine *REPL* , wenn Sie es also nur mit `wes` starten, können Sie das Skript direkt eingeben.


```shell
wes
```


Die *REPL* akzeptiert Skripteingaben, bis Sie zwei Leerzeilen eingeben. Sie können die Ausführung des Beispielskripts in *README.md* mit *REPL* überprüfen.


## Befehlszeilenoptionen


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


# Modulares System


*wes* unterstützt zwei Modulsysteme, ein *commonjs module* , das das allgemeine `require()` verwendet, und ein *es module* , das `import` verwendet. ( *dynamic import* ist eine asynchrone Verarbeitung und wird daher nicht unterstützt.)


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


Sie können auch wie *require* `require('WScript.Shell')` mit require in*ActiveX* importieren.


```javascript
const Shell = require('Shell.Application')
Shell.MinimizeAll()
WScript.Sleep(2000)
Shell.UndoMinimizeAll()
```


## *es module*


*Chakra* , die Ausführungsmaschine des Skripts, interpretiert die Syntax wie `imoprt` , kann jedoch nicht unverändert ausgeführt werden, da die Verarbeitungsmethode als `cscript` nicht definiert ist. In *wes* wird es durch Hinzufügen von *babel* zum eingebauten Modul ausgeführt, während es sequentiell in das *es module* transpiliert wird. Infolgedessen werden der Verarbeitungsaufwand und die Datei *wes.js* als Kosten aufgebläht.


Module, die von *es module* beschrieben werden, werden ebenfalls in `require()` transpiliert, sodass*ActiveX* aufgerufen werden kann. Es unterstützt jedoch nicht die Moduldatei-Codierungsspezifikation. Alle werden durch automatisches Raten gelesen.


Um es als *es module* zu laden, setzen Sie die Erweiterung auf `.mjs` oder das `"type"` -Feld von `package.json` auf `"module"` .


```javascript
// ./sub.mjs
export default function sub (a, b) {
    return a - b
}
```


```javascript
./main2.js\
import sub from './sub.mjs'

console.log('sub(7, 3) // => %O', sub(7, 3))
```


# Eingebautes Objekt


*wes* hat *built-in objects* , die *WSH (JScript)* nicht hat.


## *console*


*wes* verwendet die *console* anstelle von `WScript.Echo` oder `WScript.StdErr.WriteLine` .


Gibt Zeichen an die Konsole in `console.log` . Es unterstützt auch formatierte Zeichenfolgen. Druckt eine formatierte Zeichenfolge mit dem Formatierungsoperator `%` .


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


# Eingebautes Modul


*wes* verfügt über *built-in modules* zur Vereinfachung und Standardisierung der grundlegenden Verarbeitung.


## *ansi*


`ansi` ist ein *ANSI escape code* , mit dem Sie die Farbe und den Effekt der Standardausgabe ändern können. Farben und Effekte können je nach Typ und Einstellungen der verwendeten Konsolenanwendung variieren.


```javascript
const { redBright, yellow } = require('ansi')
const message = 'File does not exist'
console.log(redBright + 'Error: ' + yellow + message)
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


*httprequest* gibt eine *http request* aus.


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


## *zip*


Dateien und Ordner komprimieren und komprimierte Dateien dekomprimieren. Es ruft *PowerShell* intern auf und verarbeitet es.


```javascript
const {zip, unzip} = require('zip')

console.log(zip('docs\\*', 'dox.zip'))
console.log(unzip('dox.zip'))
```


Wildcards `*` können in den `path` von `zip(path, destinationPath)` .


Es kann sowohl mit *CLI (Command Line Interface)* als auch mit *module* verwendet werden.


```shell
wes zip docs\* dox.zip
wes zip -p dox.zip
```


Wenn der `path` die Erweiterung `.zip` hat, wird `unzip()` verarbeitet und es gibt keine Beschreibung der Erweiterung `.zip` . Oder selbst wenn es eine `.zip` Erweiterung gibt, wenn es eine Beschreibung eines Platzhalters `*` gibt, wird `zip()` verarbeitet.


| unbenannt | Bezeichnung                                          |
| --------- | ---------------------------------------------------- |
| `1`       | `path` Ordner oder Datei, die eingegeben werden soll |
| `2`       | Ordner Datei zum `dest`                              |


| genannt  | kurz benannt | Bezeichnung                                          |
| -------- | ------------ | ---------------------------------------------------- |
| `--path` | `-p`         | `path` Ordner oder Datei, die eingegeben werden soll |
| `--dest` | `-d`         | Ordner Datei zum `dest`                              |


# Modulbündelung und Installation


In *wes* wird ein Bündel aus mehreren Modulen als Paket bezeichnet. Sie können das auf *github* veröffentlichte Paket für *wes* installieren. Sie benötigen ein *github repository* , um das Paket zu veröffentlichen. Außerdem müssen der Name des Repositorys und der Name des lokalen Verzeichnisses identisch sein.


## *bundle*


Beim Veröffentlichen des Pakets auf *github* bündelt *bundle* die erforderlichen Module und ändert das Format, sodass es durch die Installation importiert werden kann.


Aus Sicherheitsgründen erstellt *bundle* eine *.json* -Datei, da *wes* Ihnen nicht erlaubt, Pakete in einem Format zu importieren, das direkt ausgeführt werden kann.


Es gibt einige Bedingungen für die Verpackung.


1.  In einem *repository* kann nur ein Modul veröffentlicht werden.
2.  Stellen Sie sicher, dass der Repository-Name auf *github* und der Name des lokalen Arbeitsverzeichnisses identisch sind.
3.  Wenn Sie das Paket veröffentlichen möchten, machen Sie das Repository *public* .
4.  Deklarieren Sie den Modulerwerb im Bereich der obersten Ebene.
5.  Die Paket- *.json* -Datei wird in Ihrem Arbeitsverzeichnis mit dem Namen *directory_name.json* erstellt. Es kann nicht installiert werden, wenn die Datei umbenannt oder die Datei verschoben wird.
6.  `node_modules/directory_name` schlägt das Bundle fehl, da es auf `directory_name.json` verweist.


## *install*


Wird verwendet, um das auf *github* veröffentlichte Paket für *wes* zu installieren.


### Wie benutzt man


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


# Installieren von Paketen in privaten Repositories


*install* kann nicht nur Module in öffentlichen Repositories auf *github* , sondern auch private Repositories.


Geben Sie bei der *install* das Modul mit *@author/repository* an . Die Implementierung versucht, die folgende URL herunterzuladen.


```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```


Wenn Sie mit einem Browser auf *raw* des privaten Repositorys zugreifen, wird das *token* angezeigt, also kopieren Sie das *token* und verwenden Sie es.


Sie können ein Modul auch in einem privaten Repository installieren, indem Sie es innerhalb der Lebensdauer des *token* in der Konsole ausführen.


```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```


# Paket Einführung


Hier sind einige externe Module.


## *@wachaon/fmt*


*@wachaon/fmt* bündelt *prettier* und formatiert das Skript. Auch wenn ein *Syntax Error* auftritt, wenn *@wachaon/fmt* installiert ist, können Sie die Fehlerstelle angeben.


### Installieren


```shell
wes install @wachaon/fmt
```


### Wie benutzt man


Wenn im Arbeitsverzeichnis *.prettierrc* (JSON-Format) vorhanden ist, wird dies in der Einstellung widergespiegelt. *fmt* kann sowohl mit *CLI* als auch mit *module* verwendet werden.


#### Wird als *CLI* verwendet.


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


#### Als Modul verwenden


```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')

const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```


## `@wachaon/edge`


*Internet Explorer* wird die Unterstützung mit dem 15.06.2022 abschließen. Daher ist zu erwarten, dass die Anwendung mit `require('InternetExplorer.Application')` nicht betrieben werden kann.


Eine Alternative wäre, *Microsoft Edge based on Chromium* über den *web driver* zu betreiben. `@wachaon/edge` vereinfacht den *Edge* -Autopiloten.


### Installieren


Installieren Sie zuerst das Modul.


```shell
wes install @wachaon/edge --unsafe --bare
```


Laden Sie dann den *web driver* herunter.


```shell
wes edge --download
```


Überprüfen Sie die installierte Version von *Edge* und laden Sie den entsprechenden *web driver* herunter.


### Wie benutzt man


Es wird einfach zu bedienen sein.


```javascript
const edge = require('./index')

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


Dieses Skript gibt die besuchten *URL* nacheinander an die Konsole aus.


`@wachaon/edge` registriert ein Ereignis für die *URL* und fügt `res.exports` Daten hinzu. Die zu registrierende *URL* kann entweder `String` `RegExp` sein, und es können flexible Einstellungen vorgenommen werden.


Indem es ereignisgesteuert gemacht wird, ist es möglich, einfach in den manuellen Betrieb zu wechseln, indem ein Ereignis nicht für die Verarbeitung festgelegt wird, das mit dem Autopiloten schwierig zu handhaben ist.


Wenn Sie das Skript stoppen möchten, führen `navi.emit('terminate', res)` oder beenden Sie *Edge* manuell.


Der Beendigungsprozess gibt `res.exports` als *.json* -Datei als Standardwert aus. Wenn Sie den Beendigungsprozess festlegen möchten, setzen Sie den Befehl „ `terminate` of `edge(callback, terminate)` .
