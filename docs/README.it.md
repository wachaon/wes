# *WES*


*wes* è un framework per console che esegue *ECMAScript* su *WSH (Windows Script Host)* .


Il testo originale del *README* è [*japanese*](/README.md) . A parte il giapponese, è una frase tradotta automaticamente.  
Si prega di selezionare frasi in altre lingue dalle seguenti.


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



# caratteristica


-   Puoi cambiare il motore di script in *Chakra* e scriverlo nella specifica *ECMAScript2015*
-   Funziona sempre a 32 bit *cscript.exe* , quindi non ha problemi intrinseci nell'ambiente a 64 bit.
-   Con un sistema modulare, puoi sviluppare in modo più efficiente rispetto al tradizionale *WSH*
-   Il modulo integrato supporta l'elaborazione di base come l'input/output di file e l'output di caratteri colorati sulla console.
-   Non devi preoccuparti della codifica perché puoi leggere il file indovinare automaticamente la codifica.
-   Forniamo anche moduli per supportare la pubblicazione e il recupero esterni.


# Problemi *wes* che non possiamo risolvere


-   `WScript.Quit` non può interrompere il programma e non restituisce un codice di errore
-   L'elaborazione asincrona come `setTimeout` e `Promise` non è possibile
-   Non è possibile utilizzare il *event prefix* come secondo argomento di `WScript.CreateObject`


# Scarica


Wes ha bisogno solo del *wes* *wes.js* Per scaricare, copia *wes.js* da [*@wachaon/wes*](https://github.com/wachaon/wes) o esegui il comando seguente nella console.


```bat
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```


*WScript.Shell* utilizza `SendKeys` da *wes* in fase di esecuzione come implementazione. Se il percorso della directory in cui è salvato *wes.js* contiene caratteri diversi da *ascii* , `SendKeys` non sarà in grado di inviare la chiave correttamente e lo script non potrà essere eseguito.  
Si prega di configurare il percorso di destinazione di salvataggio di *wes.js* only *ascii* .


Se hai già scaricato *wes* , puoi aggiornarlo con il seguente comando.


```bat
wes update
```


# Come usare


Immettere il comando nella console che specifica il file che sarà il punto di partenza del programma seguendo la parola chiave `wes` . L'estensione dello script *.js* può essere omessa.


```bat
wes index
```


Inoltre, *wes* ha un *REP* , quindi se lo avvii solo con `wes` , puoi inserire direttamente lo script.


```bat
wes
```


*REP* accetta l'input dello script finché non inserisci due righe vuote. Puoi anche controllare l'esecuzione dello script di esempio in *README.md* con *REP* .


## Opzioni della riga di comando


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


# Sistema modulare


*wes* supporta due sistemi di moduli, un sistema di *commonjs module* che utilizza `require()` e un *es module* che utilizza `import` . ( *dynamic import* è un'elaborazione asincrona, quindi non è supportata)


## *commonjs module*


Gestisci i moduli assegnando a `module.exports` e chiamando con `require()` . Per i percorsi diversi dai percorsi assoluti e dai percorsi relativi che iniziano con `./` e `../` , cerca i moduli nella directory *wes_modules* e, per comodità, nella directory *node_modules* .


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


Puoi anche importare in *ActiveX* con *require* `require('WScript.Shell')` .


```javascript
const Shell = require('Shell.Application')
Shell.MinimizeAll()
WScript.Sleep(2000)
Shell.UndoMinimizeAll()
```


## *es module*


*Chakra* , che è il motore di esecuzione dello script, interpreta la sintassi come `imoprt` , ma non può essere eseguito così com'è perché il metodo di elaborazione come `cscript` non è definito. In *wes* , aggiungendo *babel* al modulo integrato, viene eseguito durante la traspilazione sequenziale al *es module* . Di conseguenza, il sovraccarico di elaborazione e il file *wes.js* sono gonfiati come costo.


I moduli descritti da *es module* vengono anche convertiti in `require()` tramite transpile, quindi sono possibili anche chiamate *ActiveX* . Tuttavia, non supporta la specifica di codifica del file del modulo in *es module* . Tutti vengono letti per indovinare automaticamente.


Per caricarlo come *es module* , imposta l'estensione su `.mjs` o il campo `"type"` di `package.json` su `"module"` .


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


# Oggetto incorporato


*wes* ha *built-in objects* che *WSH (JScript)* non ha.


## *console*


*wes* usa la *console* invece di `WScript.Echo` o `WScript.StdErr.WriteLine` .


Stampa i caratteri sulla console in `console.log` . Supporta anche le stringhe formattate. Stampa una stringa formattata utilizzando l'operatore di formattazione `%` .


```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```


\|


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


# Modulo integrato


*wes* dispone *built-in modules* per semplificare e standardizzare l'elaborazione di base.


## *ansi*


`ansi` è un *ANSI escape code* che consente di modificare il colore e l'effetto dell'output standard. I colori e gli effetti possono variare a seconda del tipo e delle impostazioni dell'applicazione console utilizzata.


```javascript
const { redBright, yellow } = require('ansi')
const message = 'File does not exist'
console.log(redBright + 'Error: ' + yellow + message)
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


Immettere gli argomenti della riga di comando insieme a *REP* .


```bat
wes REP aaa -bcd eee --fgh=iii jjj --kln mmm
```


Eseguire lo script seguente in *REP* .


```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```


## *pathname*


Gestisci il percorso.


I percorsi che iniziano con `/` e `\` generalmente si riferiscono a percorsi relativi alla radice dell'unità. Ad esempio, `/filename` e `C:/filename` possono avere lo stesso percorso. Per motivi di sicurezza, `wes` interpreta i percorsi che iniziano con `/` e `\` come relativi alla directory di lavoro.


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


*httprequest* emette una *http request* .


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
const { isString, isNumber, isBoolean, isObject } = require('typecheck')
const log = require('log')

log(() => isString("ECMAScript"))
log(() => isNumber(43.5))
log(() => isBoolean(false))
log(() => isObject(function(){}))
```


## *zip*


Comprimi file e cartelle e decomprimi i file compressi. Chiama *PowerShell* internamente e lo elabora.


```javascript
const {zip, unzip} = require('zip')

console.log(zip('docs\\*', 'dox.zip'))
console.log(unzip('dox.zip'))
```


I caratteri jolly `*` possono essere scritti nel `path` di `zip(path, destinationPath)` .


Può essere utilizzato sia con *CLI (Command Line Interface)* che con il *module* .


```bat
wes zip docs\* dox.zip
wes zip -p dox.zip
```


Se il `path` ha l'estensione `.zip` , `unzip()` viene elaborato e non c'è una descrizione dell'estensione `.zip` . O anche se è presente un'estensione `.zip` , se è presente una descrizione di un carattere jolly `*` , verrà elaborato `zip()` .


| senza nome | descrizione                            |
| ---------- | -------------------------------------- |
| `1`        | `path` Cartella o file da inserire     |
| `2`        | cartella di output per l'output `dest` |


| di nome  | nome breve | descrizione                            |
| -------- | ---------- | -------------------------------------- |
| `--path` | `-p`       | `path` Cartella o file da inserire     |
| `--dest` | `-d`       | cartella di output per l'output `dest` |


# Raggruppamento e installazione dei moduli


In *wes* , un pacchetto di più moduli è chiamato pacchetto. Puoi installare il pacchetto per *wes* pubblicato su *github* . Avrai bisogno di un *github repository* per pubblicare il pacchetto. Inoltre, il nome del repository e il nome della directory locale devono essere gli stessi.


## *bundle*


Quando si pubblica il pacchetto su *github* , *bundle* raggruppa i moduli richiesti e lo cambia in un formato che può essere importato dall'installazione.


Per motivi di sicurezza, *bundle* crea un file *.json* perché *wes* non consente di importare pacchetti in un formato che può essere eseguito direttamente.


Ci sono alcune condizioni per l'imballaggio.


1.  È possibile pubblicare un solo pacchetto in un *repository*

2.  Assicurati che il nome del repository su *github* e il nome della directory di lavoro locale siano gli stessi.

3.  Se pubblichi il pacchetto, rendi *public* il repository

4.  Dichiarare l'acquisizione del modulo nell'ambito di primo livello

5.  Il file del pacchetto *.json* viene creato nella directory di lavoro con il nome *directory_name.json* . Se si rinomina il file o si sposta il file, non è possibile fare riferimento ad esso durante l'installazione.

6.  `node_modules/directory_name` è il punto di partenza del bundle

    ```bat
        wes bundle directory_name
    ```

    Senza impacchettare

    ```bat
        wes bundle node_modules/directory_name
    ```

    Si prega di raggruppare con


## *install*


Utilizzato per installare il pacchetto per *wes* pubblicato su *github* . Dalla `version 0.10.28` la cartella di installazione verrà modificata da `node_modules` a `wes_modules` . Se stai installando su `node_modules` , aggiungi l'opzione `--node` .


### Come usare


Passa gli argomenti da *install* nel formato `@author/repository` .


```bat
wes install @wachaon/fmt
```


*install* ha opzioni.


| di nome       | di nome breve | descrizione                                                                                  |
| ------------- | ------------- | -------------------------------------------------------------------------------------------- |
| `--bare`      | `-b`          | Non creare la cartella *@author*                                                             |
| `--global`    | `-g`          | Installa il pacchetto nella cartella in cui si trova *wes.js*                                |
| `--save`      | `-S`          | Aggiungi il nome e la versione del pacchetto al campo delle *dependencies* di *package.json* |
| `--save--dev` | `-D`          | Aggiungi il nome e la versione del pacchetto al campo *devDependencies* in *package.json*    |
| `--node`      | `-n`          | Installa nella cartella *node_module*                                                        |


`--bare` può omettere l'argomento `require` da `author@repository` a `repository` . `--global` rende il pacchetto installato disponibile per tutti gli script. `--node` o `-n` deve essere specificata contemporaneamente all'opzione di sicurezza *wes* `--unsafe` o `--dangerous` .


```bat
wes install @wachaon/fmt --bare --unsafe
```


# Installazione di pacchetti in repository privati


*install* può installare pacchetti in repository privati ​​e pacchetti in repository pubblici su *github* .


In *install* , specificare il pacchetto con *@author/repository* . L'implementazione proverà a scaricare il seguente URL.


```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```


Quando accedi al *raw* del repository privato con un browser, il *token* verrà visualizzato, quindi copia il *token* e usalo.


Puoi anche installare i pacchetti in repository privati ​​eseguendoli nella console entro la vita del *token* .


```bat
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```


# Presentazione del pacchetto


Ecco alcuni pacchetti esterni.


## *@wachaon/fmt*


*@wachaon/fmt* è un pacchetto *prettier* carino per *wes* e formatta lo script. Inoltre, se si verifica un *Syntax Error* con *@wachaon/fmt* installato, è possibile indicare la posizione dell'errore.


### installare


```bat
wes install @wachaon/fmt
```


### Come usare


Se è presente *.prettierrc* (formato JSON) nella directory di lavoro, si rifletterà nell'impostazione. *fmt* può essere utilizzato sia con *CLI* che con il *module* .


#### Usato come *CLI* .


```bat
wes @wachaon/fmt src/sample --write
```


| numero senza nome | descrizione                                              |
| ----------------- | -------------------------------------------------------- |
| 0                 | ――――                                                     |
| 1                 | Necessario. Il percorso del file che desideri formattare |


| di nome   | nome breve | descrizione             |
| --------- | ---------- | ----------------------- |
| `--write` | `-w`       | Consenti sovrascrittura |


Sovrascrivi il file con uno script formattato se specifichi un argomento denominato `--write` o `-w` .


#### Utilizzare come modulo


```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')

const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```


## *@wachaon/edge*


*Internet Explorer* completerà il supporto con il 2022/6/15. Di conseguenza, si prevede che non sarà possibile utilizzare l'applicazione con `require('InternetExplorer.Application')` .


Un'alternativa sarebbe utilizzare *Microsoft Edge based on Chromium* tramite il *web driver* . `@wachaon/edge` semplifica il pilota automatico di *Edge* .


### installare


Innanzitutto, installa il pacchetto.


```bat
wes install @wachaon/edge --unsafe --bare
```


Quindi scaricare il *web driver* .


```bat
wes edge --download
```


Verificare la versione installata di *Edge* e scaricare il *web driver* corrispondente.


### Come usare


Sarà facile da usare.


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


Questo script emetterà in sequenza gli *URL* visitati sulla console.


`@wachaon/edge` registra un evento per l' *URL* e aggiunge dati a `res.exports` . L' *URL* da registrare può essere `String` `RegExp` ed è possibile effettuare impostazioni flessibili.


Rendendolo guidato dagli eventi, è possibile passare facilmente al funzionamento manuale non impostando un evento per l'elaborazione difficile da gestire con il pilota automatico.


Se vuoi interrompere lo script, esegui `navi.emit('terminate', res)` o termina manualmente *Edge* .


Il processo di terminazione restituisce `res.exports` come file *.json* come valore predefinito. Se si desidera impostare il processo di terminazione, impostare `terminate` of `edge(callback, terminate)` .


`window` non è una `window` nel browser, ma un'istanza della classe *Window* di *@wachaon/webdriver* .


## *@wachaon/webdriver*


È un pacchetto che invia una richiesta al *web driver* che gestisce il browser. Integrato in *@wachaon/edge* . Come *@wachaon/edge* , per il funzionamento del browser è richiesto un *web driver* .


### installare


```bat
wes install @wachaon/webdriver --unsafe --bare
```


Se non hai un *web driver* , scaricalo.


```bat
wes webdriver --download
```
