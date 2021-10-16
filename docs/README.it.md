# _WES_

_wes_ è un framework per l'esecuzione di _ECMAScript_ su _Windows Script Host_

Il testo originale del _README_ è [_japanese_](README.ja.md) . Oltre al giapponese, è una frase tradotta automaticamente.  
Si prega di selezionare le frasi in altre lingue dalle seguenti.

## Caratteristiche

-   Cambia il motore di script in _Chakra_ ed esegui _ECMAScript2015_ _Chakra_
-   _cscript.exe_ 32 bit e non presenta bug specifici per l'ambiente a 64 bit
-   Importa il modulo con `require`
-   Emette caratteri colorati sull'output standard
-   Indovina automaticamente la codifica del file

## Funzionalità non risolte

-   `WScript.Quit` non può interrompere il programma e non restituisce un codice di errore
-   Elaborazione asincrona
-   Utilizzo del _event prefix_ del secondo argomento di `WScript.CreateObject`

## Installare

_wes_ bisogno di _wes.js_ Only file. Per scaricare, avvia un prompt dei comandi e inserisci il seguente comando.

```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

_wes_ al momento dell'esecuzione in quanto utilizza l'implementazione _WScript.Shell_ di `SendKeys` . _wes.js_ il percorso della directory in cui è salvato _wes.js_ contiene caratteri diversi da _ascii_ , `SendKeys` non sarà in grado di inviare correttamente la chiave e lo script non potrà essere eseguito.  
Si prega di configurare il percorso di destinazione di _wes.js_ di _wes.js_ only _ascii_ .

## Utilizzo

Sulla riga di comando, specifica il file che sarà il punto di partenza del programma dopo `wes` . L'estensione dello script _.js_ può essere omessa.

```shell
wes index
```

Inoltre, _wes_ ha _REPL_ quindi se lo avvii solo con `wes` , puoi inserire direttamente lo script.

```shell
wes
```

Lo script verrà accettato finché non si inseriscono due righe vuote. _README.md_ anche controllare l'esecuzione dello script di esempio in _README.md_ con _REPL_ .

## argomenti denominati da riga di comando

Le opzioni di avvio per _wes_ sono le seguenti.

| di nome            | descrizione                                                     |
| ------------------ | --------------------------------------------------------------- |
| `--monotone`       | Elimina il _ANSI escape code_                                   |
| `--safe`           | Esegui lo script in modalità provvisoria                        |
| `--usual`          | Esegui lo script in modalità normale (impostazione predefinita) |
| `--unsafe`         | Esegui lo script in modalità non sicura                         |
| `--dangerous`      | Esegui lo script in modalità pericolosa                         |
| `--debug`          | Esegui lo script in modalità debug                              |
| `--encoding=UTF-8` | Specifica la codifica del primo file da leggere                 |
| `--engine=Chakra`  | Questa opzione viene aggiunta automaticamente da _wes_          |

L'implementazione di `--safe` `--usual` `--unsafe` `--dangerous` è incompleta, ma gli argomenti con nome sono riservati.

## oggetti incorporati

_wes_ ha _built-in objects_ che _WSH (JScript)_ non ha.

### _require_

Importa il modulo con _require_ . _wes_ indovina automaticamente la codifica del file del modulo, ma se non indovini correttamente, puoi specificare la codifica con il secondo argomento.

Inoltre, `require('WScript.Shell')` partire da _OLE_ anche per _require_ importazione è possibile con.

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

### module e module.exports

Se vuoi definirlo come modulo, assegnalo a `module.exports` .

```javascript
function add (a, b) {
    return a + b
}

module.exports = add
```

### _console_

_wes_ usa _console_ invece di `WScript.Echo` e `WScript.StdErr.WriteLine` .

Stampa i caratteri sulla riga di comando in `console.log` . Supporta anche stringhe formattate. Stampa una stringa formattata utilizzando l'operatore di formattazione `%` .

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

_wes_ per produrre una stringa colorata in `WScript.StdOut.WriteLine` , invece, usa `WScript.StdErr.WriteLine` . `WScript.Echo` e `WScript.StdOut.WriteLine` sono bloccati dall'output, quindi usa `WScript.StdOut.WriteLine` o `console.log` .

### _Buffer_

Può gestire i buffer.

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```

### `__dirname` e `__filename`

`__filename` contiene il percorso del file del modulo attualmente in esecuzione. `__dirname` `__filename` la directory di `__filename` .

```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```

## moduli integrati

_wes_ ha _built-in modules_ per semplificare e standardizzare l'elaborazione di base.

### _ansi_

`ansi` dispone di un _ANSI escape code_ che consente di modificare il colore e l'effetto dell'output standard. I colori e gli effetti possono variare a seconda del tipo e delle impostazioni dell'applicazione console utilizzata.

```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```

Puoi anche creare i tuoi colori con `ansi.color()` e `ansi.bgColor()` . L'argomento utilizza _RGB_ come `255, 165, 0` o _color code_ come `'#FFA500'` . Non è possibile utilizzare un _color name_ come `orange` .

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

### _argv_

Ottiene l'argomento della riga di comando. `cscript.exe` argomenti della riga di comando di `/` dichiara argomenti denominati in ma, _wes_ in `-` e `--` dichiara gli argomenti denominati in.

_argv.unnamed_ e _argv.named_ lanciano il tipo di valore dell'argomento della riga di comando a uno dei _Number_ _Boolean_ _String_ .

Immettere gli argomenti della riga di comando insieme a _REPL_ .

```shell
wes REPL aaa -bcd eee --fgh=iii jjj --kln mmm
```

Esegui il seguente script in _REPL_ .

```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```

### _pathname_

Opera il percorso.

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

### _filesystem_

Manipolare file e directory. `readTextFileSync` indovina e legge automaticamente la codifica del file.

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```

### _JScript_

Se si cambia il motore di script per _Chakra_ , non sarà in grado di utilizzare _JScript_ specifica _Enumerator_ etc. Il modulo integrato _JScript_ li rende disponibili. Tuttavia, _Enumerator_ restituisce un oggetto _Array_ anziché un oggetto Enumerator.

```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```

_GetObject_ `WScript.GetObject` da alternativa a `WScript.GetObject` .

```javascript
const { GetObject, Enumerator } = require('JScript')

const ServiceSet = GetObject("winmgmts:{impersonationLevel=impersonate}").InstancesOf("Win32_Service")
new Enumerator(ServiceSet).forEach(service => console.log(
    'Name: %O\nDescription: %O\n',
    service.Name,
    service.Description
))
```

### _VBScript_

_VBScript_ offre alcune funzionalità che _JScript_ non ha.

```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```

### _httprequest_

_httprequest_ emette una _http request_ come suggerisce il nome.

```javascript
const request = require('httprequest')
const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log('%O', JSON.parse(content))
```

### _minitest_

_minitest_ può scrivere semplici test.

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

_pipe_ semplifica la lavorazione del tubo

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

### _typecheck_

Determinare il tipo di script.

```javascript
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```

## Pacchetto e installazione del modulo

_install_ puoi installare il modulo per _wes_ pubblicato su _github_ . Avrai bisogno del _github repository_ per pubblicare il modulo. Inoltre, il nome del repository e il nome della directory locale devono essere gli stessi.

### _bundle_

_github_ pubblica un modulo su _github_ , _bundle_ raggruppa il modulo richiesto e lo modifica in un formato che può essere importato dal modulo di _install_ .

Per motivi di sicurezza, _wes_ non importa i moduli in un formato che può essere eseguito direttamente, quindi crea un file _.json_ con il modulo _bundle_ .

Ci sono alcune condizioni per il raggruppamento dei moduli.

1.  _repository_ tipo di modulo può essere pubblicato in un _repository_ .
2.  _github_ nome del repository _github_ e il nome della directory di lavoro locale devono essere gli stessi.
3.  Il repository deve essere pubblico se si desidera pubblicare il modulo su una terza parte.
4.  _wes_ non interpreta staticamente lo script. I moduli che `require` determinate condizioni, ad esempio istruzioni `if` , potrebbero non essere raggruppati.
5.  _.json_ file _.json_ verrà creato nella directory di lavoro con il nome _directory_name.json_ . Se rinomini il file o sposti il ​​file, non puoi installarlo.
6.  `node_modules/directory_name` raggruppamento non riesce perché fa riferimento a `directory_name.json` .

### _install_

Viene utilizzato per installare il file del modulo per _wes_ pubblicato su _github_ .

## utilizzo

Passa argomenti da _install_ nel formato `@author/repository`

```shell
wes install @wachaon/fmt
```

_install_ ha opzioni

| di nome    | nome breve | descrizione                                                      |
| ---------- | ---------- | ---------------------------------------------------------------- |
| `--bare`   | `-b`       | Non creare la cartella _@author_                                 |
| `--global` | `-g`       | Installa il modulo nella cartella in cui _wes.js_ trova _wes.js_ |

`--bare` opzione `--bare` può omettere l'argomento `require` da `author@repository` a `repository` . `--global` opzione `--global` rende i moduli installati disponibili per tutti gli script. Le opzioni di cui sopra devono essere specificate contemporaneamente all'opzione di sicurezza _wes_ `--unsafe` o `--dangerous` .

```shell
wes install @wachaon/fmt --bare --unsafe
```

# Installa il modulo del repository privato

_install_ può essere installato non solo su moduli di repository pubblici _github_ , ma anche su repository privati.

_install_ , specificare il modulo con `author@repository` . L'implementazione scarica quanto segue.

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```

Quando si accede al _raw_ del repository privata con un browser, la _token_ viene visualizzata, in modo da copiare la _token_ e usarlo.

È inoltre possibile installare il modulo nel repository privato eseguendolo sulla riga di comando entro la _token_ del _token_ .

```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

## Modulo esterno

Ecco alcuni moduli esterni.

### _@wachaon/fmt_

_@wachaon/fmt_ è un pacchetto _prettier_ _@wachaon/fmt_ che formatta lo script. Inoltre, se uno `SyntaxError` si verifica con _@wachaon/fmt_ installato, è possibile indicare la posizione dell'errore.

#### installare

```shell
wes install @wachaon/fmt
```

#### utilizzo

Se è presente _.prettierrc_ (formato JSON) nella directory di lavoro, si rifletterà nelle impostazioni. Può essere utilizzato sia con _CLI_ (interfaccia a riga di comando) che con il _module_ in _fmt_ .

Usa come _CLI_

```shell
wes @wachaon/fmt src/sample --write
```

| numero senza nome | descrizione                                          |
| ----------------- | ---------------------------------------------------- |
| 0                 | ---                                                  |
| 1                 | Necessario. Il percorso del file che vuoi formattare |

| di nome   | nome breve | descrizione             |
| --------- | ---------- | ----------------------- |
| `--write` | `-w`       | Consenti sovrascrittura |

Sovrascrive il file con uno script formattato se viene specificato un argomento denominato `--write` o `-w` .

#### _module_ utilizza come _module_

#### `option`

```javascript
{
    parser: 'babel',
    plugins: [babel]
}
```
