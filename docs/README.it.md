# *WES*


*wes* è un framework per l'esecuzione di *ECMAScript* su *Windows Script Host*


Il testo originale del *README* è [*japanese*](docs/README.ja.md) . Oltre al giapponese, è una frase tradotta automaticamente.  
Si prega di selezionare le frasi in altre lingue dalle seguenti.


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



# Caratteristiche


-   *Chakra* il motore di scripting di *Windows Script Host* per eseguire *ECMAScript2015* *Chakra*
-   Poiché viene eseguito *cscript.exe* 32 bit, non ci sono problemi specifici per l'ambiente a 64 bit.
-   Importa il modulo con `require`
-   Emette caratteri colorati sull'output standard
-   Indovina automaticamente la codifica del file


# Funzionalità non risolte


-   `WScript.Quit` non può interrompere il programma e non restituisce un codice di errore
-   Elaborazione asincrona
-   Il *event prefix* secondo argomento di `WScript.CreateObject` non può essere utilizzato


# Installare


*wes* bisogno del solo file *wes.js* Per scaricare, avvia un prompt dei comandi e inserisci il seguente comando.


```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```


*wes* al momento dell'esecuzione in quanto utilizza l'implementazione *WScript.Shell* di `SendKeys` . *wes.js* il percorso della directory in cui è salvato *wes.js* contiene caratteri diversi da *ascii* , `SendKeys` non sarà in grado di inviare correttamente la chiave e lo script non potrà essere eseguito.  
Si prega di configurare il percorso di destinazione di *wes.js* di *wes.js* only *ascii* .


## utilizzo


Sulla riga di comando, specifica il file che sarà il punto di partenza del programma dopo `wes` . L'estensione dello script *.js* può essere omessa.


```shell
wes index
```


Inoltre, *wes* ha un *REPL* quindi se lo avvii solo con `wes` , puoi inserire direttamente lo script.


```shell
wes
```


Gli script verranno accettati fino a quando non si inseriscono due righe vuote. *README.md* anche controllare l'esecuzione dello script di esempio in *README.md* con *REPL* .


## argomenti denominati da riga di comando


Le opzioni di avvio per *wes* sono le seguenti.


| di nome            | descrizione                                                     |
| ------------------ | --------------------------------------------------------------- |
| `--monotone`       | Elimina il *ANSI escape code*                                   |
| `--safe`           | Esegui lo script in modalità provvisoria                        |
| `--usual`          | Esegui lo script in modalità normale (impostazione predefinita) |
| `--unsafe`         | Esegui lo script in modalità non sicura                         |
| `--dangerous`      | Esegui lo script in modalità pericolosa                         |
| `--debug`          | Esegui lo script in modalità debug                              |
| `--encoding=UTF-8` | Specifica la codifica del primo file da leggere                 |
| `--engine=Chakra`  | Questa opzione viene aggiunta automaticamente da *wes*          |


L'implementazione di `--safe` `--usual` `--unsafe` `--dangerous` è incompleta, ma gli argomenti con nome sono riservati.


# oggetti incorporati


*wes* ha *built-in objects* che *WSH (JScript)* non ha.


## *require*


Importa il modulo con *require* . *wes* indovina automaticamente la codifica del file del modulo, ma se non indovini correttamente, puoi specificare la codifica con il secondo argomento.


Puoi anche importare in *OLE* come `require('WScript.Shell')` con *require* .


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


## `module` e `module.exports`


Se vuoi definirlo come modulo, assegnalo a `module.exports` .


```javascript
function add (a, b) {
    return a + b
}

module.exports = add
```


## *console*


*wes* In `WScript.Echo` e `WScript.StdErr.WriteLine` invece della *console* usa il file.


Stampa i caratteri sulla riga di comando in `console.log` . Supporta anche stringhe formattate. Stampa una stringa formattata utilizzando l'operatore di formattazione `%` .


```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```


*wes* per produrre una stringa colorata in `WScript.StdOut.WriteLine` , invece, usa `WScript.StdErr.WriteLine` . `WScript.Echo` e `WScript.StdOut.WriteLine` sono bloccati dall'output, quindi usa `WScript.StdErr.WriteLine` o `console.log` .


## *Buffer*


Può gestire i buffer.


```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```


## `__dirname` e `__filename`


`__filename` contiene il percorso del file del modulo attualmente in esecuzione. `__dirname` `__filename` la directory di `__filename` .


```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```


# moduli integrati


*wes* ha *built-in modules* per semplificare e standardizzare l'elaborazione di base.


## *ansi*


`ansi` dispone di un *ANSI escape code* che consente di modificare il colore e l'effetto dell'output standard. I colori e gli effetti possono variare a seconda del tipo e delle impostazioni dell'applicazione console utilizzata.


```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```


Puoi anche creare i tuoi colori con `ansi.color()` e `ansi.bgColor()` . L'argomento utilizza *RGB* come `255, 165, 0` o *color code* come `'#FFA500'` . Non è possibile utilizzare *color name* come `orange` .


```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```


## *argv*


Ottiene l'argomento della riga di comando. `cscript.exe` argomenti della riga di comando di `/` dichiara argomenti denominati in ma, *wes* in `-` e `--` dichiara gli argomenti denominati in.


*argv.unnamed* e *argv.named* lanciano il tipo di valore dell'argomento della riga di comando a uno dei *Number* *Boolean* *String* .


Immettere gli argomenti della riga di comando insieme a *REPL* .


```shell
wes REPL aaa -bcd eee --fgh=iii jjj --kln mmm
```


Esegui il seguente script in *REPL* .


```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```


## *pathname*


Opera il percorso.


```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```


## *filesystem*


Gestire file e directory. `readTextFileSync` indovina e legge automaticamente la codifica del file.


```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```


## *JScript*


Se si cambia il motore di script per *Chakra* , non sarà in grado di utilizzare *JScript* specifica *Enumerator* etc. Il modulo integrato *JScript* li rende disponibili. Tuttavia, *Enumerator* restituisce un oggetto *Array* anziché un oggetto Enumerator.


```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```


*GetObject* `WScript.GetObject` da alternativa a `WScript.GetObject` .


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


*VBScript* fornisce alcune funzionalità che *JScript* non ha.


```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```


## *httprequest*


*httprequest* è come il suo nome *http request* emetterà a.


```javascript
const request = require('httprequest')
const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log('%O', JSON.parse(content))
```


## *minitest*


*minitest* può scrivere semplici test.


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


*pipe* semplifica la lavorazione del tubo


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


Determinare il tipo di script.


```javascript
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```


# Pacchetto e installazione del modulo


*install* puoi installare il modulo per *wes* pubblicato su *github* . Avrai bisogno di un *github repository* per pubblicare il modulo. Inoltre, il nome del repository e il nome della directory locale devono essere gli stessi.


## *bundle*


*github* pubblica un modulo su *github* , *bundle* raggruppa il modulo richiesto e lo modifica in un formato che può essere importato dal modulo di *install* .


Per motivi di sicurezza, *wes* non importa i moduli in un formato che può essere eseguito direttamente, quindi crea un file *.json* con il modulo *bundle* .


Ci sono alcune condizioni per il raggruppamento dei moduli.


1.  *repository* tipo di modulo può essere pubblicato in un *repository* .
2.  Il nome del repository su *github* e il nome della directory di lavoro locale devono essere gli stessi.
3.  Il repository deve essere pubblico se si desidera pubblicare il modulo su una terza parte.
4.  *wes* non interpreta staticamente lo script. I moduli acquisiti da `require` in condizioni specifiche, ad esempio `if` istruzioni non possono essere raggruppate.
5.  *.json* file *.json* verrà creato nella directory di lavoro con il nome *directory_name.json* . Non può essere installato se il file viene rinominato o se il file viene spostato.
6.  `node_modules/directory_name` , il bundle non riesce perché fa riferimento a `directory_name.json` .


## *install*


Utilizzato per installare il file del modulo per *wes* pubblicato su *github* .


### utilizzo


Passa argomenti da *install* nel formato `@author/repository`


```shell
wes install @wachaon/fmt
```


*install* ha delle opzioni


| di nome    | nome breve | descrizione                                                      |
| ---------- | ---------- | ---------------------------------------------------------------- |
| `--bare`   | `-b`       | Non creare la cartella *@author*                                 |
| `--global` | `-g`       | Installa il modulo nella cartella in cui *wes.js* trova *wes.js* |


`--bare` opzione `--bare` può omettere l'argomento `require` da `author@repository` a `repository` . `--global` opzione `--global` rende i moduli installati disponibili per tutti gli script. Le opzioni di cui sopra devono essere specificate contemporaneamente all'opzione di sicurezza *wes* `--unsafe` o `--dangerous` .


```shell
wes install @wachaon/fmt --bare --unsafe
```


# Installa il modulo del repository privato


*install* può essere installato non solo nei moduli nei repository pubblici su *github* , ma anche nei repository privati.


*install* , specificare il modulo con `author@repository` . L'implementazione scarica quanto segue.


```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```


Quando si accede *raw* del repository privata con un browser, la *token* viene visualizzata, in modo da copiare la *token* e usarlo.


È inoltre possibile installare un modulo in un repository privato eseguendolo sulla riga di comando durante la *token* del *token* .


```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```


# Modulo esterno


Ecco alcuni moduli esterni.


## *@wachaon/fmt*


*@wachaon/fmt* raggruppa in modo *prettier* *@wachaon/fmt* e formatta lo script. Inoltre, se *@wachaon/fmt* è installato e si verifica un errore di `SyntaxError` , è possibile indicare la posizione dell'errore.


### installare


```shell
wes install @wachaon/fmt
```


### utilizzo


Se è presente *.prettierrc* (formato JSON) nella directory di lavoro, si rifletterà nell'impostazione. Può essere utilizzato sia con *CLI* (interfaccia a riga di comando) che con il *module* in *fmt* .


Usa come *CLI*


```shell
wes @wachaon/fmt src/sample --write
```


| numero senza nome | descrizione                                          |
| ----------------- | ---------------------------------------------------- |
| 0                 | io                                                   |
| 1                 | Necessario. Il percorso del file che vuoi formattare |


| di nome   | nome breve | descrizione             |
| --------- | ---------- | ----------------------- |
| `--write` | `-w`       | Consenti sovrascrittura |


Sovrascrivi il file con uno script formattato se specifichi un argomento denominato `--write` o `-w` .


### *module* utilizza come *module*


### `option`


```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')

const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```
