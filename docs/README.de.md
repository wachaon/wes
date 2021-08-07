![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

_wes_ ist ein Framework zum Ausführen von _ECMAScript_ auf _Windows Script Host_

Der Originaltext der _README_ ist [_japanese_](README.ja.md) . Anders als Japanisch ist es ein maschinell übersetzter Satz.  
Bitte wählen Sie aus den folgenden Sätzen in anderen Sprachen aus.

## Merkmale

-   Ändern Sie die Skript-Engine in _Chakra_ und führen Sie _ECMAScript2015_ _Chakra_
-   _cscript.exe_ 32- _cscript.exe_ und hat keine Fehler, die für die 64-Bit-Umgebung spezifisch sind
-   Importieren Sie das Modul mit `require`
-   Gibt farbige Zeichen auf der Standardausgabe aus
-   Erraten Sie automatisch die Dateicodierung

## Funktionen nicht behoben

-   `WScript.Quit` kann das Programm nicht unterbrechen und gibt keinen Fehlercode zurück
-   Asynchrone Verarbeitung
-   Verwendung des _event prefix_ des zweiten Arguments von `WScript.CreateObject`

## Installieren

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

_wes_ zum Zeitpunkt der Ausführung als Implementierung _WScript.Shell_ von `SendKeys` verwenden. _wes.js_ der Pfad des Verzeichnisses, in dem _wes.js_ gespeichert ist, andere Zeichen als _ascii_ , kann `SendKeys` den Schlüssel nicht korrekt senden und das Skript kann nicht ausgeführt werden.  
Bitte konfigurieren Sie den Speicherzielpfad von _wes.js_ nur _ascii_ .

## Verwendungszweck

Geben Sie in der Befehlszeile die Datei an, die nach `wes` der Startpunkt des Programms sein soll. Die _.js_ kann weggelassen werden.

```shell
wes index
```

Außerdem hat _wes_ eine _REPL_ wenn Sie es also nur mit `wes` starten, können Sie das Skript direkt eingeben.

```shell
wes
```

Das Skript wird akzeptiert, bis Sie zwei Leerzeilen eingeben. _README.md_ können die Ausführung des Beispielskripts auch in _README.md_ mit _REPL_ überprüfen.

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

Die Startoptionen für _wes_ sind wie folgt.

| genannt            | Bezeichnung                                            |
| ------------------ | ------------------------------------------------------ |
| `--monotone`       | Eliminieren Sie den _ANSI escape code_                 |
| `--safe`           | Führen Sie das Skript im abgesicherten Modus aus       |
| `--usual`          | Führen Sie das Skript im normalen Modus aus (Standard) |
| `--unsafe`         | Führen Sie das Skript im unsicheren Modus aus          |
| `--dangerous`      | Führen Sie das Skript im gefährlichen Modus aus        |
| `--debug`          | Führen Sie das Skript im Debug-Modus aus               |
| `--encoding=UTF-8` | Gibt die Codierung der ersten zu lesenden Datei an     |
| `--engine=Chakra`  | Diese Option wird von _wes_ automatisch hinzugefügt    |

Die Implementierung von `--safe` `--usual` `--unsafe` `--dangerous` ist unvollständig, aber benannte Argumente sind reserviert.

## eingebaute Objekte

_wes_ hat _built-in objects_ , die _WSH (JScript)_ nicht hat.

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

Importieren Sie das Modul mit _require_ . _wes_ errät automatisch die Kodierung der Moduldatei, aber wenn Sie nicht richtig raten, können Sie die Kodierung mit dem zweiten Argument angeben.

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

Wenn Sie es als Modul definieren möchten, weisen Sie es `module.exports` .

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

### _console_

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

_wes_ um stattdessen einen in `WScript.StdOut.WriteLine` eingefärbten String `WScript.StdOut.WriteLine` , verwenden Sie `WScript.StdErr.WriteLine` . `WScript.Echo` und `WScript.StdOut.WriteLine` werden von der Ausgabe blockiert, verwenden Sie also `WScript.StdOut.WriteLine` oder `console.log` .

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

Kann mit Puffern umgehen.

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

`__filename` enthält den Pfad der aktuell laufenden Moduldatei. `__dirname` `__filename` das Verzeichnis von `__filename` .

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

## eingebaute Module

_wes_ verfügt über _built-in modules_ , um die grundlegende Verarbeitung zu vereinfachen und zu standardisieren.

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

`ansi` verfügt über einen _ANSI escape code_ , mit dem Sie die Farbe und den Effekt der Standardausgabe ändern können. Farben und Effekte können je nach Typ und Einstellungen der verwendeten Konsolenanwendung variieren.

```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

### _argv_

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

_argv.unnamed_ und _argv.named_ _argv.unnamed_ _argv.named_ des Befehlszeilenarguments in einen der _Boolean_ _String_ _Number_ _Boolean_ .

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

Führen Sie das folgende Skript in der _REPL_ .

```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

Bedienen Sie den Pfad.

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

### _filesystem_

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

Wenn Sie die Skript-Engine auf _Chakra_ ändern, können Sie den _JScript_ spezifischen _Enumerator_ usw. nicht verwenden. Das eingebaute Modul _JScript_ stellt sie zur Verfügung. _Enumerator_ gibt jedoch ein _Array_ anstelle eines Enumerator-Objekts zurück.

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```

### _httprequest_

_httprequest_ gibt eine _http request_ wie der Name schon sagt.

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

_minitest_ kann einfache Tests schreiben.

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

### _pipe_

_pipe_ vereinfacht die Rohrbearbeitung

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

### _typecheck_

Bestimmen Sie den Typ des Skripts.

```javascript
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```

## Modul bündeln und installieren

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

### _bundle_

_github_ Veröffentlichen eines Moduls auf _github_ bündelt _bundle_ das erforderliche Modul und ändert es in ein Format, das vom _install_ importiert werden kann.

Aus Sicherheitsgründen importiert _wes_ keine Module in einem Format, das direkt ausgeführt werden kann. Erstellen Sie daher eine _.json_ Datei mit dem _bundle_ Modul.

Es gibt einige Bedingungen für das Bündeln von Modulen.

1.  In einem _repository_ kann _repository_ ein Modultyp veröffentlicht werden.
2.  _github_ Name des _github_ Repositorys und der Name des lokalen Arbeitsverzeichnisses müssen identisch sein.
3.  Das Repository muss öffentlich sein, wenn Sie das Modul an Dritte veröffentlichen möchten.
4.  _wes_ interpretiert das Skript nicht statisch. Module, `require` unter bestimmten Bedingungen `require` , wie z. B. `if` Anweisungen, dürfen nicht gebündelt werden.
5.  _.json_ Datei wird in Ihrem Arbeitsverzeichnis mit dem Namen _directory_name.json_ . Wenn Sie die Datei umbenennen oder verschieben, können Sie sie nicht installieren.
6.  `node_modules/directory_name` Bündeln schlägt fehl, weil es auf `directory_name.json` verweist.

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

Es wird verwendet, um die auf _github_ veröffentlichte _github_ für _wes_ zu _github_ .

## Verwendungszweck

Übergeben Sie die zu _install_ Argumente im Format `@author/repository`

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

_install_ hat Optionen

| genannt    | kurz benannt | Bezeichnung                                                             |
| ---------- | ------------ | ----------------------------------------------------------------------- |
| `--bare`   | `-b`         | _@author_ Ordner erstellen                                              |
| `--global` | `-g`         | Installieren Sie das Modul in dem Ordner, in dem sich _wes.js_ befindet |

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

```shell
wes install @wachaon/fmt --bare --unsafe
```

# Installieren Sie das Modul des privaten Repositorys

_install_ kann nicht nur auf öffentlichen Repository-Modulen von _github_ _install_ werden, sondern auch auf privaten Repositorys.

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

Wenn Sie mit einem Browser auf das _raw_ des privaten Repositorys zugreifen, wird das _token_ angezeigt, kopieren Sie also das _token_ und verwenden Sie es.

Sie können das Modul auch im privaten Repository installieren, indem Sie es innerhalb der _token_ des _token_ auf der Befehlszeile _token_ .

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

## Externes Modul

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

### _@wachaon/fmt_

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

#### Installieren

```shell
wes install @wachaon/fmt
```

#### Verwendungszweck

Wenn im Arbeitsverzeichnis _.prettierrc_ (JSON-Format) vorhanden ist, wird dies in den Einstellungen widergespiegelt. _fmt_ kann sowohl mit _CLI_ (Befehlszeilenschnittstelle) als auch mit _module_ in _fmt_ .

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

| unbenannte Nummer | Bezeichnung                                                   |
| ----------------- | ------------------------------------------------------------- |
| 0                 | ---                                                           |
| 1                 | Erforderlich. Der Pfad der Datei, die Sie formatieren möchten |

| genannt   | kurz benannt | Bezeichnung            |
| --------- | ------------ | ---------------------- |
| `--write` | `-w`         | Überschreiben zulassen |

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

#### _module_ Verwendung als _module_

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）
