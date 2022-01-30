# *WES*


*wes* è un framework per l'esecuzione di *ECMAScript* su una riga di comando *Windows Script Host* .


Il testo originale del *README* è [*japanese*](/README.md) . A parte il giapponese, è una frase tradotta automaticamente.  
Si prega di selezionare frasi in altre lingue dalle seguenti.


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



# Caratteristiche


-   Cambia il motore di script di *Windows Script Host* in *Chakra* ed esegui *ECMAScript2015* 2015
-   Funziona sempre a 32 bit *cscript.exe* , quindi non ci sono bug intrinseci nell'ambiente a 64 bit.
-   Importa il modulo con `require` (corrispondente a *es module* da *ver 0.9.0* )
-   Invia caratteri colorati all'output standard
-   Indovina e leggi automaticamente la codifica del file di testo


# Problemi noti che non possiamo risolvere


-   `WScript.Quit` non può interrompere il programma e non restituisce un codice di errore
-   L'elaborazione asincrona come `setTimeout` e `Promise` non è possibile
-   Non è possibile utilizzare il secondo *event prefix* argomento di `WScript.CreateObject`


# Installare


Wes ha bisogno solo del *wes* *wes.js* Per scaricare, avviare un prompt dei comandi e immettere il comando seguente.


```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```


*WScript.Shell* utilizza `SendKeys` da *wes* in fase di esecuzione come implementazione. Se il percorso della directory in cui è salvato *wes.js* contiene caratteri diversi da *ascii* , `SendKeys` non sarà in grado di inviare la chiave correttamente e lo script non potrà essere eseguito.  
Si prega di configurare il percorso di destinazione di salvataggio di *wes.js* only *ascii* .


## Utilizzo


Sulla riga di comando, specifica il file che sarà il punto di partenza del programma dopo `wes` . L'estensione dello script *.js* può essere omessa.


```shell
wes index
```


Inoltre, *wes* ha un *REPL* , quindi se lo avvii solo con `wes` , puoi inserire direttamente lo script.


```shell
wes
```


Gli script verranno accettati finché non inserisci due righe vuote. Puoi anche controllare l'esecuzione dello script di esempio in *README.md* con *REPL* .


## argomenti denominati della riga di comando


Le opzioni di avvio per *wes* sono le seguenti.


| di nome            | descrizione                                                     |
| ------------------ | --------------------------------------------------------------- |
| `--monotone`       | Elimina *ANSI escape code*                                      |
| `--safe`           | Esegui lo script in modalità provvisoria                        |
| `--usual`          | Esegui lo script in modalità normale (impostazione predefinita) |
| `--unsafe`         | Esegui lo script in modalità non sicura                         |
| `--dangerous`      | Esegui lo script in modalità pericolosa                         |
| `--debug`          | Esegui lo script in modalità debug                              |
| `--encoding=UTF-8` | Specifica la codifica del primo file da leggere                 |
| `--engine=Chakra`  | Questa opzione viene aggiunta automaticamente da *wes*          |


L'implementazione di `--safe` `--usual` `--unsafe` `--dangerous` `--debug` è incompleta, ma gli argomenti con nome sono riservati.


# sistema di moduli


*wes* supporta i sistemi di *commonjs module* che utilizzano i sistemi di moduli generali `require()` ed *es module* che utilizzano `import` . ( *dynamic import* non è supportata perché è un'elaborazione asincrona)


## *commonjs module*


Gestisci i moduli assegnando a `module.exports` e chiamando con `require()` . Per comodità, supporta anche la directory *node_modules* .


*wes* `require()` indovina automaticamente la codifica del file del modulo, ma se non indovina correttamente, puoi specificare la codifica con il secondo argomento.


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


Puoi anche importare in *OLE* come *require* `require('WScript.Shell')` con require.


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


*Chakra* , che è il motore di esecuzione dello script, interpreta la sintassi come `imoprt` , ma non può essere eseguito così com'è perché il metodo di elaborazione come `cscript` non è definito. *babel* è inclusa in *wes* . Viene eseguito durante la transpilazione sequenziale nel *es module* . Di conseguenza, l'overhead di elaborazione e il file bloat stanno aumentando come costo.


I moduli descritti da *es module* vengono anche convertiti in transpile in `require()` , quindi è possibile chiamare *OLE* . Tuttavia, non supporta la specifica di codifica del file del modulo. Tutti vengono letti per indovinare automaticamente.


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


# oggetti incorporati


*wes* ha *built-in objects* che *WSH (JScript)* non ha.


## *console*


`WScript.Echo` usa la *console* invece di *wes* o `WScript.StdErr.WriteLine` .


Stampa i caratteri sulla riga di comando in `console.log` . Supporta anche le stringhe formattate. Stampa una stringa formattata utilizzando l'operatore di formattazione `%` .


```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```


`WScript.StdOut.WriteLine` *wes* di `WScript.StdErr.WriteLine` per generare stringhe colorate. L'output di `WScript.Echo` e `WScript.StdOut.WriteLine` è bloccato. `WScript.StdErr.WriteLine` o `console.log` .


## *Buffer*


Può gestire i buffer.


```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```


## `__dirname` e `__filename`


`__filename` contiene il percorso del file del modulo attualmente in esecuzione. `__dirname` contiene la directory di `__filename` .


```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```


# moduli integrati


*wes* dispone *built-in modules* per semplificare e standardizzare l'elaborazione di base.


## *ansi*


`ansi` dispone di un *ANSI escape code* che consente di modificare il colore e l'effetto dell'output standard. I colori e gli effetti possono variare a seconda del tipo e delle impostazioni dell'applicazione console utilizzata.


```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```


Puoi anche creare i tuoi colori con `ansi.color()` e `ansi.bgColor()` . L'argomento utilizza *RGB* come `255, 165, 0` o *color code* come `'#FFA500'` . Non supporta *color name* come l' `orange` .


```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```


## *argv*


Ottiene l'argomento della riga di comando. Gli argomenti della riga di comando in `cscript.exe` dichiarano argomenti denominati con `/` `--` mentre *wes* dichiarano argomenti denominati con `-` .


*argv.unnamed* e *argv.named* il cast del tipo di valore dell'argomento della riga di comando su uno degli *String* *Number* *Boolean* .


Immettere gli argomenti della riga di comando insieme a *REPL* .


```shell
wes REPL aaa -bcd eee --fgh=iii jjj --kln mmm
```


Eseguire lo script seguente in *REPL* .


```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```


## *pathname*


Gestisci il percorso.


I percorsi che iniziano con `/` e `\` generalmente si riferiscono a percorsi relativi alla radice dell'unità. Ad esempio, `/filename` e `C:/filename` potrebbero trovarsi sullo stesso percorso. Per motivi di sicurezza, `wes` interpreta i percorsi che iniziano con `/` e `\` come relativi alla directory di lavoro.


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


## *chardet*


Sto usando alcune funzionalità di <https://github.com/runk/node-chardet> .


È possibile migliorare la precisione dell'ipotesi automatica aumentando i caratteri specifici della codifica.


## *JScript*


Se modifichi il motore di script in *Chakra* , non sarai in grado di utilizzare l' *Enumerator* specifico di *JScript* , ecc. Il modulo integrato *JScript* li rende disponibili. Tuttavia, *Enumerator* restituisce un oggetto *Array* invece di un *Enumerator object* .


```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```


*GetObject* funge da alternativa a `WScript.GetObject` .


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


La richiesta *httprequest* *http request* come suggerisce il nome.


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


*pipe* semplifica la lavorazione dei tubi.


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


Determina il tipo di sceneggiatura.


```javascript
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```


# Bundle di moduli e installazione


Con *install* , puoi installare il modulo per *wes* pubblicato su *github* . Avrai bisogno di un *github repository* per pubblicare il modulo. Inoltre, il nome del repository e il nome della directory locale devono essere gli stessi.


## *bundle*


Quando si pubblica un modulo su *github* , *bundle* raggruppa il modulo richiesto e lo cambia in un formato che può essere importato dal modulo di *install* .


Per motivi di sicurezza, *wes* non importa i moduli in un formato che può essere eseguito direttamente, quindi crea un file *.json* con il modulo *bundle* .


Ci sono alcune condizioni per il raggruppamento dei moduli.


1.  È possibile pubblicare un solo tipo di modulo in un *repository* .
2.  Il nome del repository su *github* e il nome della directory di lavoro locale devono essere gli stessi.
3.  Il repository deve essere pubblico se si desidera pubblicare il modulo a una terza parte.
4.  *wes* interpreta dinamicamente il percorso del modulo. I moduli acquisiti da `require` in condizioni specifiche, ad esempio `if` le istruzioni potrebbero non essere raggruppate.
5.  *.json* verrà creato nella directory di lavoro con il nome *directory_name.json* . Non può essere installato se il file viene rinominato o il file viene spostato.
6.  `node_modules/directory_name` , il bundle non riesce perché fa riferimento a `directory_name.json` .


## *install*


Utilizzato per installare il file del modulo per *wes* pubblicato su *github* .


### utilizzo


Passa gli argomenti da *install* nel formato `@author/repository` .


```shell
wes install @wachaon/fmt
```


*install* ha opzioni.


| di nome    | nome breve | descrizione                                                |
| ---------- | ---------- | ---------------------------------------------------------- |
| `--bare`   | `-b`       | Non creare la cartella *@author*                           |
| `--global` | `-g`       | Installa il modulo nella cartella in cui si trova *wes.js* |


`--bare` può omettere l'argomento `require` da `author@repository` a `repository` . `--global` rende i moduli installati disponibili a tutti gli script. Le opzioni di cui sopra devono essere specificate contemporaneamente all'opzione *wes* security `--unsafe` o `--dangerous` .


```shell
wes install @wachaon/fmt --bare --unsafe
```


# Installa il modulo del repository privato


*install* può essere installato non solo nei moduli nei repository pubblici su *github* , ma anche nei repository privati.


In *install* , specifica il modulo con `author@repository` . L'implementazione scarica quanto segue.


```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```


Quando accedi al *raw* del repository privato con un browser, il *token* verrà visualizzato, quindi copia il *token* e usalo.


Puoi anche installare un modulo in un repository privato eseguendolo sulla riga di comando entro la vita del *token* .


```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```


# Modulo esterno


Ecco alcuni moduli esterni.


## *@wachaon/fmt*


*@wachaon/fmt* raggruppa *prettier* graziosi e formatta lo script. Inoltre, se si verifica un errore di sintassi con @ `SyntaxError` *@wachaon/fmt* installato, è possibile indicare la posizione dell'errore.


### installare


```shell
wes install @wachaon/fmt
```


### utilizzo


Se è presente *.prettierrc* (formato JSON) nella directory di lavoro, si rifletterà nell'impostazione. Può essere utilizzato sia con *CLI* (command line interface) che con *module* in *fmt* .


Usato come *CLI* .


```shell
wes @wachaon/fmt src/sample --write
```


| numero senza nome | descrizione                                              |
| ----------------- | -------------------------------------------------------- |
| 0                 | ――――                                                     |
| 1                 | Necessario. Il percorso del file che desideri formattare |


| di nome   | di nome breve | descrizione             |
| --------- | ------------- | ----------------------- |
| `--write` | `-w`          | Consenti sovrascrittura |


Sovrascrivi il file con uno script formattato se specifichi un argomento denominato `--write` o `-w` .


### Quando usato come *module*


### `option`


```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')

const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```


## `@wachaon/edge`


*Internet Explorer* completerà il supporto con il 2022/6/15. Di conseguenza, diventa impossibile utilizzare l'applicazione con `require('InternetExplorer.Application')` .


Un'alternativa sarebbe utilizzare *Microsoft Edge based on Chromium* tramite il *web driver* . `@wachaon/edge` semplifica il pilota automatico di *Edge* .


### installare


Innanzitutto, installa il modulo.


```shell
wes install @wachaon/edge --unsafe --bare
```


Quindi scaricare il *web driver* .


```shell
wes edge
```


Decomprimi lo *zip* scaricato e sposta *msedgedriver.exe* nella directory corrente.


### utilizzo


Sarà facile da usare.


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


Questo script restituisce in sequenza gli *URL* visitati al prompt dei comandi.


`@wachaon/edge` registra un evento per l' *URL* e aggiunge dati a `res.exports` . L' *URL* da registrare può essere `String` `RegExp` ed è possibile effettuare impostazioni flessibili.


Rendendolo basato sugli eventi, è possibile passare facilmente al funzionamento manuale non impostando l' *URL* per i processi difficili da gestire con il pilota automatico.


Se vuoi interrompere lo script, esegui `navi.emit('terminate', res)` o termina manualmente *Edge* .


Il processo di terminazione restituisce `res.exports` come file *.json* come valore predefinito. Se si desidera impostare il processo di terminazione, impostare `terminate` of `edge(callback, terminate)` .
