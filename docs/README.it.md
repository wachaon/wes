# NOI S

*wes* è un framework per eseguire *ECMAScript* su *Windows Script Host*

*README* originale del [*japanese*](README.ja.md) sarà. Oltre al giapponese, il testo sarà tradotto automaticamente. Selezionare uno dei seguenti testi in altre lingue.

-   [*簡体字*](README.zh-CN.md) <!-- 中国語 (簡体字) -->
-   [*繁体字*](README.zh-TW.md) <!-- 中国語 (繁体字) -->
-   [*English*](README.en.md) <!-- 英語 -->
-   [*हिन्दी*](README.hi.md)　<!-- ヒンディー語 -->
-   [*Español*](README.es.md) <!-- スペイン語 -->
-   [*عربى*](README.ar.md) <!-- アラビア語 -->
-   [*বাংলা*](README.bn.md) <!-- ベンガル語 -->
-   [*Português*](README.pt.md) <!-- ポルトガル語 -->
-   [*русский язык*](README.ru.md) <!-- ロシア語 -->
-   [*Deutsch*](README.de.md) <!-- ドイツ語 -->
-   [*français*](README.fr.md) <!-- フランス語 -->
-   [*italiano*](README.it.md)　<!-- イタリア語 -->

## Caratteristiche

-   Cambia il motore di script in *Chakra* e abilita l'esecuzione di *ECMAScript2015* *Chakra*
-   *cscript.exe* 32 bit, quindi evita bug particolari nell'ambiente a 64 bit
-   Puoi importare il modulo con `require`
-   I caratteri colorati possono essere stampati sullo standard output
-   Indovina la codifica del file automaticamente

## Funzionalità non risolte

-   `WScript.Quit` non può interrompere il programma e non restituisce un codice di errore
-   Elaborazione asincrona
-   Utilizzo del *event prefix* di *event prefix* del secondo argomento di `WScript.CreateObject`

## Installare

*wes* bisogno solo del file *wes.js* Per scaricare, avviare il prompt dei comandi e immettere il seguente comando.

```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

*wes* utilizza le `SendKeys` *WScript.Shell* in fase di esecuzione. *wes.js* il percorso della directory in cui è salvato *wes.js* contiene caratteri diversi da *ascii* , `SendKeys` non lo invierà correttamente e lo script non verrà eseguito. In tal caso, configurare il percorso per salvare *wes.js* solo con *ascii* .

## uso

Nella riga di comando, specifica il file che è il punto di partenza del programma dopo `wes` . L'estensione dello script *.js* può essere omessa.

```shell
wes index
```

Inoltre, poiché *wes* ha un *REPL* , puoi eseguire uno script immesso direttamente sulla riga di comando avviandolo solo con `wes` .

```shell
wes
```

L'input dello script viene accettato fino a quando non si immettono due righe vuote. *README.md* inoltre possibile controllare l'esecuzione dello script di esempio in *README.md* con *REPL* .

## argomenti denominati da riga di comando

*wes* seguenti argomenti denominati sono accettati come opzioni di avvio di *wes* .

| di nome            | descrizione                                                     |
| ------------------ | --------------------------------------------------------------- |
| `--monotone`       | Elimina il *ANSI escape code*                                   |
| `--safe`           | Esegui lo script in modalità provvisoria                        |
| `--usual`          | Esegui lo script in modalità normale (impostazione predefinita) |
| `--unsafe`         | Esegui lo script in modalità non sicura                         |
| `--dangerous`      | Esegui lo script in modalità pericolosa                         |
| `--debug`          | Esegui lo script in modalità debug                              |
| `--encoding=UTF-8` | Specificare la codifica del file da leggere per primo.          |
| `--engine=Chakra`  | Questa opzione viene aggiunta automaticamente da *wes*          |

L'implementazione di `--safe` `--usual` `--unsafe` `--dangerous` è incompleta, ma gli argomenti con nome sono riservati.

## oggetti incorporati

*wes* ha *built-in objects* che *JScript* non ha.

### richiedere

Importa il modulo con *require* . *wes* indovina automaticamente la codifica del file del modulo, ma se non la indovini correttamente, puoi specificare la codifica con il secondo argomento.

Puoi anche importare con *require* per *OLE* come `require('WScript.Shell')` .

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

Se vuoi definirlo come un modulo, sostituiscilo in `module.exports` .

```javascript
function add (a, b) {
    return a + b
}

module.exports = add
```

### consolle

*wes* In `WScript.Echo` e `WScript.StdErr.WriteLine` invece della *console* utilizzare il.

È possibile inviare caratteri alla riga di comando con `console.log` . Supporta anche stringhe formattate. È possibile utilizzare l'operatore di formato `%` per specificare una stringa di formato.

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

*wes* per produrre una stringa colorata in `WScript.StdOut.WriteLine` invece, utilizzare `WScript.StdErr.WriteLine` . `WScript.Echo` output di `WScript.Echo` e `WScript.StdOut.WriteLine` è bloccato, utilizzare `WScript.StdOut.WriteLine` o `console.log` .

### Buffer

Può gestire i buffer.

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```

### **dirname e** filename

`__filename` memorizza il percorso del file del modulo attualmente in esecuzione. `__dirname` memorizza la directory `__filename` .

```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```

## moduli integrati

*wes* dispone *built-in modules* per semplificare e standardizzare l'elaborazione di base.

### ANSI

`ansi` contiene un *ANSI escape code* e puoi modificare il colore e l'effetto dello standard output. I colori e gli effetti possono variare a seconda del tipo e delle impostazioni dell'applicazione console utilizzata.

```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```

Puoi anche creare il tuo colore con `ansi.color()` o `ansi.bgColor()` . Gli argomenti utilizzano *RGB* come `255, 165, 0` o *color code* come `'#FFA500'` . Non è possibile utilizzare *color name* come l' `orange` .

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

### argv

Ottiene gli argomenti della riga di comando. `cscript.exe` argomenti della riga di comando di `/` dichiara argomenti denominati in ma, *wes* in `-` e `--` dichiara gli argomenti denominati in.

*argv.unnamed* e *argv.named* cast del tipo di valore dell'argomento della riga di comando su uno di *String* *Number* *Boolean* .

Immettere gli argomenti della riga di comando con *REPL* .

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

### percorso

Gestisci il percorso.

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

### filesystem

Gestisce file e directory. `readTextFileSync` indovinerà la codifica del file e lo leggerà.

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```

### JScript

Se si cambia il motore di script per *Chakra* , non sarà in grado di utilizzare *JScript* specifici *Enumerator* . Il modulo integrato *JScript* li rende disponibili. Tuttavia, *Enumerator* restituisce un oggetto *Array* anziché un oggetto Enumerator.

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

### VBScript

*VBScript* offre alcune delle funzionalità che *JScript* non ha.

```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```

### HttpRequest

*httprequest* è come il suo nome *http request* emetterà un file.

```javascript
const request = require('httprequest')
const content = request('GET', 'http://weather.livedoor.com/forecast/webservice/json/v1?city=130010')
console.log('%O', JSON.parse(content))
```

### Minitest

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

### tubo

*pipe* semplifica la lavorazione dei tubi

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

### TYPECHECK

Valuta il tipo di copione.

```javascript
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```

## Bundle di moduli e installazione

*install* , puoi installare il modulo per *wes* pubblicato su *github* . Per pubblicare il modulo, è necessario il *github repository* . Inoltre, il nome del repository e il nome della directory locale devono essere gli stessi.

### fascio

*github* pubblica un modulo su *github* , *bundle* raggruppa i moduli necessari e lo modifica in un formato che può essere incluso dal modulo di *install* .

In considerazione della sicurezza, *wes* non importa il modulo che può essere eseguito direttamente, quindi crea il file *.json* nel modulo *bundle* .

Esistono alcune condizioni per raggruppare i moduli.

1.  *repository* possibile pubblicare un *repository* tipo di modulo in un *repository* .
2.  *github* nome del repository *github* e il nome della directory di lavoro locale devono essere gli stessi.
3.  Il repository deve essere pubblico se vuoi pubblicare il modulo su una terza parte.
4.  *wes* non interpreta staticamente lo script, quindi i moduli che `require` solo in determinate condizioni come le istruzioni `if` potrebbero non essere raggruppati.
5.  *.json* file verrà creato nella directory di lavoro con il nome *directory_name.json* . Se si modifica il nome del file o si sposta il file, non è possibile installarlo.
6.  `node_modules/directory_name` , bundling fallisce perché fa riferimento `directory_name.json` .

### installare

Viene utilizzato per installare il file del modulo per *wes* pubblicato su *github* .

## uso

Passa gli argomenti per l' *install* nel formato `@author/repository`

```shell
wes install @wachaon/fmt
```

*install* ha opzioni

| di nome    | nome breve | descrizione                                                      |
| ---------- | ---------- | ---------------------------------------------------------------- |
| `--bare`   | `-b`       | non creare la cartella *@author*                                 |
| `--global` | `-g`       | Installa il modulo nella cartella in cui *wes.js* trova *wes.js* |

`--bare` opzione `--bare` può omettere l'argomento `require` da `author@repository` a `repository` . `--global` opzione `--global` rende il modulo installato disponibile per tutti gli script. Le opzioni precedenti devono essere utilizzate con l'opzione di sicurezza *wes* `--unsafe` o `--dangerous` .

```shell
wes install @wachaon/fmt --bare --unsafe
```

# Installa il modulo di repository privato

*install* può essere installato non solo nel modulo del repository pubblico di *github* ma anche nel repository privato.

*install* , specificare il modulo con `author@repository` . Quanto segue viene scaricato nell'implementazione.

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```

Quando accedi al *raw* del repository privato con un browser, il *token* viene visualizzato, quindi copia il *token* e *token* .

Puoi anche installare i moduli nel tuo repository privato se lo esegui dalla riga di comando mentre il *token* è valido.

```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

## Modulo esterno

Qui presentiamo alcuni moduli esterni.

### *@wachaon/fmt*

*@wachaon/fmt* è un pacchetto di *prettier* *@wachaon/fmt* che formatta lo script. Inoltre, se `SyntaxError` verifica durante l' *@wachaon/fmt* è possibile visualizzare la posizione dell'errore.

#### installare

```shell
wes install @wachaon/fmt
```

#### uso

Se è presente *.prettierrc* (formato JSON) nella directory di lavoro, rifletterlo nell'impostazione. *fmt* può essere utilizzato sia con *CLI* (interfaccia a riga di comando) che con *module* .

Usa come *CLI*

```shell
wes @wachaon/fmt src/sample --write
```

| numero senza nome | descrizione                                              |
| ----------------- | -------------------------------------------------------- |
| 0                 | -                                                        |
| 1                 | Necessario. Il percorso del file che desideri formattare |

| di nome   | nome breve | descrizione                |
| --------- | ---------- | -------------------------- |
| `--write` | `-w`       | Consenti la sovrascrittura |

Sovrascrive il file con lo script formattato se viene fornito un `--write` o `-w` named.

#### *module* utilizzato come *module*

#### `option`

```javascript
{
    parser: 'babel',
    plugins: [babel]
}
```

#### `format`

| nome argomento | genere   | descrizione                      |
| -------------- | -------- | -------------------------------- |
| `source`       | `string` | Stringa da formattare            |
| `option?`      | `object` | Opzioni per passare a *prettier* |

```javascript
const { format } = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { resolve } = require('pathname')

const spec = resolve(process.cwd(), 'sample.js')
let source = readTextFileSync(spec)
source = format(source)
console.log(writeTextFileSync(spec, source))
```
