# *WES*


*wes* ist ein Konsolen-Framework, das *ECMAScript* auf *WSH (Windows Script Host)* .


Der Originaltext der *README* ist [*japanese*](/README.md) . Anders als Japanisch ist es ein maschinell übersetzter Satz.  
Bitte wählen Sie aus den folgenden Sätzen in anderen Sprachen aus.


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


# Download


Wes benötigt nur die *wes* *wes.js* . Kopieren Sie zum Herunterladen *wes.js* von [*@wachaon/wes*](https://github.com/wachaon/wes) oder führen Sie den folgenden Befehl in der Konsole aus.


```bat
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```


*WScript.Shell* verwendet `SendKeys` in *wes* zur Laufzeit als Implementierung. Wenn der Pfad des Verzeichnisses, in dem *wes.js* gespeichert ist, andere Zeichen als `SendKeys` *ascii* Schlüssel nicht korrekt senden und das Skript kann nicht ausgeführt werden.  
Bitte konfigurieren Sie den Pfad so, *wes.js* nur *ascii* gespeichert wird.


Wenn Sie *wes* bereits heruntergeladen haben, können Sie es mit dem folgenden Befehl aktualisieren.


```bat
wes update
```


# Wie benutzt man


Geben Sie nach dem Schlüsselwort `wes` den Befehl in die Konsole ein, der die Datei angibt, die der Startpunkt des Programms sein soll. Die *.js* kann weggelassen werden.


```bat
wes index
```


Außerdem hat *wes* einen *REP* , wenn Sie es also nur mit `wes` starten, können Sie das Skript direkt eingeben.


```bat
wes
```


*REP* akzeptiert Skripteingaben, bis Sie zwei Leerzeilen eingeben. Sie können die Ausführung des Beispielskripts in *README.md* mit *REP* überprüfen.


## Befehlszeilenoptionen


Die Startoptionen für *wes* sind wie folgt.


| genannt            | Beschreibung                                           |
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


*wes* unterstützt zwei Modulsysteme, ein *commonjs module* , das `require()` verwendet, und ein *es module* , das `import` verwendet. ( *dynamic import* ist eine asynchrone Verarbeitung und wird daher nicht unterstützt.)


## *commonjs module*


Verwalten Sie Module, indem `module.exports` und mit `require()` aufrufen. Suchen Sie für andere Pfade als absolute Pfade und relative Pfade, die mit `./` und `../` beginnen, nach Modulen im Verzeichnis *wes_modules* und der Einfachheit halber im Verzeichnis *node_modules* .


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


Sie können auch mit *require* `require('WScript.Shell')` in *ActiveX* importieren.


```javascript
const Shell = require('Shell.Application')
Shell.MinimizeAll()
WScript.Sleep(2000)
Shell.UndoMinimizeAll()
```


## *es module*


*Chakra* , die Ausführungsmaschine des Skripts, interpretiert die Syntax wie `imoprt` , kann jedoch nicht unverändert ausgeführt werden, da die Verarbeitungsmethode als `cscript` nicht definiert ist. In *wes* führen wir durch Hinzufügen von *babel* zum eingebauten Modul es aus, während wir sequentiell in das *es module* transpilieren. Infolgedessen werden der Verarbeitungsaufwand und die Datei *wes.js* als Kosten aufgebläht.


Module, die von *es module* beschrieben werden, werden auch in `require()` transpiliert, sodass *ActiveX* -Aufrufe möglich sind. Es unterstützt jedoch nicht die Moduldateicodierungsspezifikation in *es module* . Alle werden durch automatisches Raten gelesen.


Um es als *es module* zu laden, setzen Sie die Erweiterung auf `.mjs` oder das `"type"` -Feld von `package.json` auf `"module"` .


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


# Eingebautes Objekt


*wes* hat *built-in objects* , die *WSH (JScript)* nicht hat.


## *console*


*wes* verwendet die *console* anstelle von `WScript.Echo` oder `WScript.StdErr.WriteLine` .


Gibt Zeichen an die Konsole in `console.log` . Es unterstützt auch formatierte Zeichenfolgen. Druckt eine formatierte Zeichenfolge mit dem Formatierungsoperator `%` .


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
| `%O`             | Objekt Dump (farbig eingerückt)  |


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


Geben Sie die Befehlszeilenargumente zusammen mit *REP* ein.


```bat
wes REP aaa -bcd eee --fgh=iii jjj --kln mmm
```


Führen Sie das folgende Skript in *REP* aus.


```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```


## *pathname*


Betreiben Sie den Pfad.


Pfade, die mit `/` und `\` beginnen, beziehen sich im Allgemeinen auf Pfade relativ zum Laufwerkstammverzeichnis. Beispielsweise können `/filename` und `C:/filename` denselben Pfad haben. Aus Sicherheitsgründen interpretiert `wes` Pfade beginnend mit `/` und `\` als relativ zum Arbeitsverzeichnis.


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
const { isString, isNumber, isBoolean, isObject } = require('typecheck')
const log = require('log')

log(() => isString("ECMAScript"))
log(() => isNumber(43.5))
log(() => isBoolean(false))
log(() => isObject(function(){}))
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


```bat
wes zip docs\* dox.zip
wes zip -p dox.zip
```


Wenn der `path` die Erweiterung `.zip` hat, wird `unzip()` verarbeitet und es gibt keine Beschreibung der Erweiterung `.zip` . Oder selbst wenn es eine `.zip` Erweiterung gibt, wenn es eine Beschreibung eines Platzhalters `*` gibt, wird `zip()` verarbeitet.


| unbenannt | Beschreibung                                         |
| --------- | ---------------------------------------------------- |
| `1`       | `path` Ordner oder Datei, die eingegeben werden soll |
| `2`       | Ordner Datei zum `dest`                              |


| genannt  | kurz benannt | Beschreibung                                         |
| -------- | ------------ | ---------------------------------------------------- |
| `--path` | `-p`         | `path` Ordner oder Datei, die eingegeben werden soll |
| `--dest` | `-d`         | Ordner Datei zum `dest`                              |


# Modulbündelung und Installation


In *wes* wird ein Bündel aus mehreren Modulen als Paket bezeichnet. Sie können das auf *github* veröffentlichte Paket für *wes* installieren. Sie benötigen ein *github repository* , um das Paket zu veröffentlichen. Außerdem müssen der Name des Repositorys und der Name des lokalen Verzeichnisses identisch sein.


## *bundle*


Beim Veröffentlichen des Pakets auf *github* bündelt *bundle* die erforderlichen Module und ändert es in ein Format, das durch die Installation importiert werden kann.


Aus Sicherheitsgründen erstellt *bundle* eine *.json* -Datei, da *wes* Ihnen nicht erlaubt, Pakete in einem Format zu importieren, das direkt ausgeführt werden kann.


Es gibt einige Bedingungen für die Verpackung.


1.  In einem *repository* kann nur ein Paket veröffentlicht werden

2.  Stellen Sie sicher, dass der Repository-Name auf *github* und der Name des lokalen Arbeitsverzeichnisses identisch sind.

3.  Wenn Sie das Paket veröffentlichen, machen Sie bitte das Repository *public*

4.  Deklarieren Sie den Modulerwerb im Bereich der obersten Ebene

5.  Die Paket- *.json* -Datei wird in Ihrem Arbeitsverzeichnis mit dem Namen *directory_name.json* erstellt. Wenn Sie die Datei umbenennen oder verschieben, können Sie bei der Installation nicht darauf verweisen.

6.  `node_modules/directory_name` der Ausgangspunkt des Bundles ist

    ```bat
        wes bundle directory_name
    ```

    Ohne Bündelung mit

    ```bat
        wes bundle node_modules/directory_name
    ```

    Bitte bündeln Sie mit


## *install*


Wird verwendet, um das auf *github* veröffentlichte Paket für *wes* zu installieren. Ab `version 0.10.28` wird der Installationsordner von `node_modules` auf `wes_modules` . Wenn Sie in `node_modules` installieren, fügen Sie die Option `--node` hinzu.


### Wie benutzt man


Übergeben Sie die zu *install* Argumente im Format `@author/repository` .


```bat
wes install @wachaon/fmt
```


*install* hat Optionen.


| genannt       | kurz benannt | Beschreibung                                                                            |
| ------------- | ------------ | --------------------------------------------------------------------------------------- |
| `--bare`      | `-b`         | Erstellen Sie keinen *@author* Ordner                                                   |
| `--global`    | `-g`         | Installieren Sie das Paket in dem Ordner, in dem sich *wes.js* befindet                 |
| `--save`      | `-S`         | Fügen Sie den Paketnamen und die Version zum Feld „ *dependencies* “ von *package.json* |
| `--save--dev` | `-D`         | Fügen Sie den Paketnamen und die Version zum Feld *devDependencies* von *package.json*  |
| `--node`      | `-n`         | Installieren Sie im Ordner *node_module*                                                |


`--bare` kann das `require` -Argument von `author@repository` an `repository` weglassen. `--global` macht das installierte Paket für alle Skripte verfügbar. `--node` oder `-n` muss gleichzeitig mit der *wes* -Sicherheitsoption `--unsafe` oder `--dangerous` .


```bat
wes install @wachaon/fmt --bare --unsafe
```


# Installieren von Paketen in privaten Repositories


*install* kann Pakete in privaten Repositories sowie Pakete in öffentlichen Repositories auf *github* .


Geben Sie bei der *install* das Paket mit *@author/repository* an . Die Implementierung versucht, die folgende URL herunterzuladen.


```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```


Wenn Sie mit einem Browser auf das *raw* des privaten Repositorys zugreifen, wird das *token* angezeigt, also kopieren Sie das *token* und verwenden Sie es.


Sie können Pakete auch in privaten Repositorys installieren, indem Sie sie innerhalb der Lebensdauer des *token* in der Konsole ausführen.


```bat
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```


# Paket Einführung


Hier sind einige externe Pakete.


## *@wachaon/fmt*


*@wachaon/fmt* ist ein *prettier* Paket für *wes* und formatiert das Skript. Auch wenn ein *Syntax Error* auftritt, wenn *@wachaon/fmt* installiert ist, können Sie die Fehlerstelle angeben.


### Installieren


```bat
wes install @wachaon/fmt
```


### Wie benutzt man


Wenn im Arbeitsverzeichnis *.prettierrc* (JSON-Format) vorhanden ist, wird dies in der Einstellung widergespiegelt. *fmt* kann sowohl mit *CLI* als auch mit *module* verwendet werden.


#### Wird als *CLI* verwendet.


```bat
wes @wachaon/fmt src/sample --write
```


| unbenannte Nummer | Beschreibung                                                  |
| ----------------- | ------------------------------------------------------------- |
| 0                 | ――――                                                          |
| 1                 | Erforderlich. Der Pfad der Datei, die Sie formatieren möchten |


| genannt   | kurz benannt | Beschreibung           |
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


## *@wachaon/edge*


*Internet Explorer* wird die Unterstützung mit dem 15.06.2022 abschließen. Daher ist zu erwarten, dass die Anwendung mit `require('InternetExplorer.Application')` nicht betrieben werden kann.


Eine Alternative wäre, *Microsoft Edge based on Chromium* über den *web driver* zu betreiben. `@wachaon/edge` vereinfacht den *Edge* -Autopiloten.


### Installieren


Installieren Sie zuerst das Paket.


```bat
wes install @wachaon/edge --unsafe --bare
```


Laden Sie dann den *web driver* herunter.


```bat
wes edge --download
```


Überprüfen Sie die installierte Version von *Edge* und laden Sie den entsprechenden *web driver* herunter.


### Wie benutzt man


Es wird einfach zu bedienen sein.


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


Dieses Skript gibt die besuchten *URL* nacheinander an die Konsole aus.


`@wachaon/edge` registriert ein Ereignis für die *URL* und fügt `res.exports` Daten hinzu. Die zu registrierende *URL* kann entweder `String` `RegExp` sein, und es können flexible Einstellungen vorgenommen werden.


Indem es ereignisgesteuert gemacht wird, ist es möglich, einfach in den manuellen Betrieb zu wechseln, indem ein Ereignis nicht für die Verarbeitung festgelegt wird, das mit dem Autopiloten schwierig zu handhaben ist.


Wenn Sie das Skript stoppen möchten, führen `navi.emit('terminate', res)` oder beenden Sie *Edge* manuell.


Der Beendigungsprozess gibt `res.exports` als *.json* -Datei als Standardwert aus. Wenn Sie den Beendigungsprozess festlegen möchten, setzen Sie den Befehl „ `terminate` of `edge(callback, terminate)` .


`window` ist kein `window` im Browser, sondern eine Instanz der *Window* -Klasse von *@wachaon/webdriver* .


## *@wachaon/webdriver*


Es ist ein Paket, das eine Anfrage an den *web driver* sendet, der den Browser betreibt. Eingebaut in *@wachaon/edge* . Wie *@wachaon/edge* wird für den Browserbetrieb ein *web driver* benötigt.


### Installieren


```bat
wes install @wachaon/webdriver --unsafe --bare
```


Wenn Sie keinen *Chromium* -basierten *Microsoft Edge* *web driver* haben, laden Sie ihn herunter. Wenn die Version von *edge* und die Version des *web driver* unterschiedlich sind, laden Sie dieselbe Version des *web driver* herunter.


```bat
wes webdriver --download
```
