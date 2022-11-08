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

Wes benötigt nur die *wes* *wes.js* . Kopieren Sie zum Herunterladen *wes.js* von [*@wachaon/wes*](https://github.com/wachaon/wes) oder führen Sie den folgenden Befehl in der Konsole aus.

     bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js

`SendKeys` *WScript.Shell* *wes* zur Laufzeit als Implementierung. Wenn der Pfad des Verzeichnisses, in dem *wes.js* gespeichert ist, andere Zeichen als *ascii* enthält, kann `SendKeys` den Schlüssel nicht korrekt senden und das Skript kann nicht ausgeführt werden.\
Konfigurieren Sie den Pfad, *wes.js* gespeichert ist, nur in *ascii* . Wenn Sie *wes* bereits heruntergeladen haben, können Sie es mit dem folgenden Befehl aktualisieren.

     wes update

# Verwendungszweck

Geben Sie das Schlüsselwort `wes` gefolgt von dem Befehl ein, der die Datei angibt, die der Startpunkt des Programms für die Konsole sein wird. Die *.js* kann weggelassen werden.

     wes index

Da *wes* mit *REP* ausgestattet ist, können Sie Skripte auch direkt eingeben, indem Sie `wes` alleine starten.

     wes

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

     // ./add.js function add (a, b) { return ab } module.exports = add

<!---->

     // ./main.js const add = require('./add') console.log('add(7, 3) // => %O', add(7, 3))

Außerdem ist es möglich, mit *require* für *COM Object* wie `require('WScript.Shell')` zu importieren.

     const Shell = require('Shell.Application') Shell.MinimizeAll() WScript.Sleep(2000) Shell.UndoMinimizeAll()

## *es module*

*Chakra* , eine Skriptausführungs-Engine, interpretiert Syntax wie `imoprt` , kann jedoch nicht unverändert ausgeführt werden, da die Verarbeitungsmethode als *cscript* nicht definiert ist. In *wes* werden durch Hinzufügen von *babel* zu den eingebauten Modulen auch *es module* ausgeführt, während sie sequentiell transpiliert werden. Dies kostet uns Verarbeitungsaufwand und eine aufgeblähte *wes.js* -Datei. Module, die in *es module* geschrieben wurden, werden durch Transpilieren ebenfalls in `require()` konvertiert, sodass es möglich ist, *COM Object* aufzurufen. Es unterstützt jedoch nicht die Angabe der Codierung der Moduldatei mit *es module* . Alles wird automatisch geladen. Um es als *es module* zu laden, setzen Sie die Erweiterung auf `.mjs` oder setzen Sie das Feld `"type"` in `package.json` auf `"module"` .

     // ./sub.mjs export default function sub (a, b) { return a - b }

<!---->

     // ./main2.js import sub from './sub.mjs' console.log('sub(7, 3) // => %O', sub(7, 3))

# eingebautes Objekt

*wes* hat *built-in objects* , die in *WSH (JScript)* nicht gefunden werden.

undefined

## *Buffer*

Sie können mit Puffern umgehen.

     const content = 'Hello World' const buff = Buffer.from(content) console.log(`${content} %O`, buff)

## `__dirname` und `__filename`

`__filename` speichert den Pfad der aktuell ausgeführten Moduldatei. `__dirname` enthält das Verzeichnis von `__filename` .

     console.log('dirname: %O\nfilename: %O', __dirname, __filename)

## *setTimeout* *setInterval* *setImmediate* *Promise*

Da *wes* eine Ausführungsumgebung für synchrone Verarbeitung ist, *setTimeout* *setInterval* *setImmediate* *Promise* nicht als asynchrone Verarbeitung, sondern wird implementiert, um Module zu unterstützen, die eine *Promise* -Implementierung voraussetzen.

     const example = () => { const promise = new Promise((resolve, reject) => { console.log('promise') setTimeout(() => { console.log('setTimeout') resolve('resolved'); }, 2000); }).then((val) => { console.log(val) }); console.log('sub') }; console.log('start') example(); console.log('end')

# Eingebautes Modul

*wes* verfügt über *built-in modules* , um die grundlegende Verarbeitung zu vereinfachen und zu standardisieren.

## *ansi*

`ansi` ist ein *ANSI escape code* , der Standardausgabefarben und -effekte ändern kann. Farben und Effekte können je nach Typ und Einstellungen der verwendeten Konsolenanwendung abweichen.

     const { redBright, yellow } = require('ansi') const message = 'File does not exist' console.log(redBright 'Error: ' yellow message)

Sie können auch Ihre eigenen Farben mit `ansi.color()` und `ansi.bgColor()` . Argumente verwenden *RGB* wie `255, 165, 0` und *color code* wie `'#FFA500'` . *color name* wie `orange` werden nicht unterstützt.

     const { color } = require('ansi') const orange = color(255, 165, 0) console.log(orange 'Hello World')

## *argv*

Befehlszeilenargumente erhalten. Die Befehlszeilenargumente von `cscript.exe` deklarieren benannte Argumente mit `/` , während *wes* benannte Argumente mit `-` und `--` deklariert . *argv.unnamed* und *argv.named* des Befehlszeilenarguments entweder in *String* *Number* *Boolean* um. Geben Sie Kommandozeilenargumente mit *REP* ein.

     wes REP aaa -bcd eee --fgh=iii jjj --kln mmm

Führen Sie das folgende Skript auf *REP* aus.

     const argv = require('argv') console.log(`argv: %O argv.unnamed: %O argv.named: %O`, argv, argv.unnamed, argv.named)

## *pathname*

Pfade manipulieren. Pfade, die mit `/` und `\` beginnen, sind im Allgemeinen relativ zum Stammverzeichnis des Laufwerks. Beispielsweise können `/filename` und `C:/filename` derselbe Pfad sein. Aus Sicherheitsgründen interpretiert *wes* Pfade beginnend mit `/` und `\` relativ zum Arbeitsverzeichnis.

     const path = require('pathname') const file = path.resolve(__dirname, 'index.js') console.log('file %O', file)

## *filesystem*

Manipulieren Sie Dateien und Verzeichnisse. `readTextFileSync()` errät automatisch die Kodierung der Datei und liest sie. (Auch wenn das zweite Argument von `readFileSync()` auf `auto` `encode` ist, wird es automatisch erraten.)

     const fs = require('filesystem') const path = require('pathname') const readme = path.resolve(__dirname, 'README.md') const contents = fs.readTextFileSync(readme) // const contents = fs.readFileSync(readme, 'auto') console.log(contents)

## *chardet*

Ich verwende einige Funktionen von <https://github.com/runk/node-chardet> . Sie können die Genauigkeit der automatischen Schätzung erhöhen, indem Sie die Zahl der kodierungsspezifischen Zeichen erhöhen.

## *JScript*

Wenn Sie die Skript-Engine in *Chakra* ändern, können Sie keine *JScript* -spezifischen *Enumerator* usw. verwenden. Das eingebaute Modul *JScript* stellt sie zur Verfügung. *Enumerator* gibt jedoch ein *Array* zurück, kein *Enumerator object* .

     const { Enumerator, ActiveXObject } = require('JScript') const FSO = new ActiveXObject('Scripting.FileSystemObject') const dir = FSO.getFolder(__dirname).Files const files = new Enumerator(dir) files.forEach(file => console.log(file.Name))

*GetObject* funktioniert als Alternative zu `WScript.GetObject` .

     const { GetObject, Enumerator } = require('JScript') const ServiceSet = GetObject("winmgmts:{impersonationLevel=impersonate}").InstancesOf("Win32_Service") new Enumerator(ServiceSet).forEach(service => console.log( 'Name: %O\nDescription: %O\n', service.Name, service.Description ))

## *VBScript*

*VBScript* bietet einige Funktionen, die *JScript* nicht bietet.

     const { TypeName } = require('VBScript') const FSO = require('Scripting.FileSystemObject') console.log(TypeName(FSO))

## *httprequest*

*httprequest* gibt eine *http request* aus.

     const request = require('httprequest') const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1') console.log('%O', JSON.parse(content))

undefined

## *pipe*

*pipe* vereinfacht die Verrohrung.

### Verwendungszweck

     const pipe = require('pipe') function add (a, b) { return ba } function sub (a, b) { return b - a } function div (a, b) { return a / b } const add5 = add.bind(null, 5) const sub3 = sub.bind(null, 3) pipe() .use(add5) .use(sub3) .use(div, 4) .process(10, (err, res) => console.log('res: %O', res))

## *typecheck*

Bestimmen Sie den Skripttyp.

### Verwendungszweck

     const { isString, isNumber, isBoolean, isObject } = require('typecheck') const log = require('log') log(() => isString("ECMAScript")) log(() => isNumber(43.5)) log(() => isBoolean(false)) log(() => isObject(function(){}))

undefined

## *getMember*

Rufen Sie den Mitgliedstyp und die Beschreibung des *COM Object* von *ProgID* ab.

### Verwendungszweck

     const getMember = require('getMember') const FileSystemObject = 'Scripting.FileSystemObject' console.log('require("%S") // => %O', FileSystemObject, getMember(FileSystemObject))

## *zip*

Komprimiert Dateien und Ordner und dekomprimiert komprimierte Dateien. Intern wird *PowerShell* aufgerufen und verarbeitet.

### Verwendungszweck

     const {zip, unzip} = require('zip') console.log(zip('docs\\*', 'dox.zip')) console.log(unzip('dox.zip'))

In den `path` von `zip(path, destinationPath)` kann ein Platzhalter `*` geschrieben werden. Es kann sowohl in *CLI (Command Line Interface)* als auch in *module* verwendet werden.

     wes zip docs\* dox.zip wes zip -p dox.zip

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

2.  *package.json* ist erforderlich. Als Minimum ist die Beschreibung des `main` erforderlich.

         { "main": "index.js" }

3.  Machen Sie das Repository *public* , wenn Sie das Paket veröffentlichen möchten

4.  Ab `version 0.12.0` werden Pakete mit direktem Modulladen in ein Verzeichnis oberhalb des Arbeitsverzeichnisses nicht mehr gebündelt. Pakete im oberen Verzeichnis *wes\_modules* oder *node\_modules* können gebündelt werden.

Geben Sie zum Bündeln den folgenden Befehl ein: *package.json* Sie, was gebündelt werden soll.

     wes bundle

undefined

# Installieren von Paketen aus privaten Repositories

*install* kann nicht nur Pakete aus öffentlichen *github* Repositories installieren, sondern auch Pakete aus privaten Repositories. Geben Sie bei *install* das Paket mit *@author/repository* an. Die Implementierung versucht, die folgende URL herunterzuladen.

     `https://raw.githubusercontent.com/${author}/${repository}/master/bundle.json`

Wenn Sie mit einem Browser *raw* auf das private Repository zugreifen, wird das *token* angezeigt, also kopieren Sie das *token* und verwenden Sie es. Sie können auch Pakete aus privaten Repositorys installieren, indem Sie sie in der Konsole ausführen, solange das *token* gültig ist.

     wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA

# Paket Einführung

Hier sind einige externe Pakete.

## *@wachaon/fmt*

*@wachaon/fmt* ist *prettier* verpackt, damit *wes* Skripte formatieren können. Wenn während der Installation von *@wachaon/fmt* ein *Syntax Error* auftritt, können Sie außerdem den Ort des Fehlers angeben.

### Installieren

     wes install @wachaon/fmt

### Verwendungszweck

Wenn im Arbeitsverzeichnis *.prettierrc* (JSON-Format) vorhanden ist, wird dies in den Einstellungen widergespiegelt. *fmt* ist sowohl im *CLI* als auch im *module* verfügbar.

#### Als *CLI* verwenden.

     wes @wachaon/fmt src/sample --write

| unbenannte Nummer | Beschreibung                                                  |
| ----------------- | ------------------------------------------------------------- |
| 1                 | Erforderlich. den Pfad der Datei, die Sie formatieren möchten |

| genannt   | kurz benannt | Beschreibung           |
| --------- | ------------ | ---------------------- |
| `--write` | `-w`         | Überschreiben zulassen |

Überschreiben Sie die Datei mit dem formatierten Skript, wenn `--write` oder das benannte Argument `-w` angegeben ist.

#### als Modul verwenden

     const fmt = require('@wachaon/fmt') const { readTextFileSync, writeTextFileSync } = require('filesystem') const { join, workingDirectory } = require('pathname') const target = join(workingDirectory, 'index.js') console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
