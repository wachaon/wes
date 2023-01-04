# *WES*

*wes* è un framework console per l'esecuzione di *ECMAScript* su *WSH (Windows Script Host)* . Il [*japanese*](/README.md) originale del *README* sarà in giapponese. I testi diversi dal giapponese verranno tradotti automaticamente.\
Per testi in altre lingue, seleziona una delle opzioni seguenti.

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

*   Puoi cambiare il motore di script in *Chakra* e scrivere secondo le specifiche *ECMAScript2015* .
*   Poiché *cscript.exe* a 32 bit viene sempre eseguito, non ci sono problemi univoci nell'ambiente a 64 bit.
*   Poiché esiste un sistema di moduli, può essere sviluppato in modo più efficiente rispetto al *WSH* convenzionale
*   I moduli integrati supportano l'elaborazione di base come l'input/output di file e l'output di testo colorato sulla console
*   Puoi lasciare che la lettura del file indovini automaticamente la codifica, quindi non devi preoccuparti della codifica ecc.
*   Moduli del pacchetto per supportare la pubblicazione e il recupero esterni
*   Visualizza i dettagli dell'errore in modo più gentile rispetto a *WSH*

# Problemi *wes* che non possiamo risolvere

*   `WScript.Quit` non può interrompere il programma e non restituisce un codice di errore
*   L'elaborazione asincrona non funziona correttamente
*   Non è possibile utilizzare il *event prefix* del secondo argomento di `WScript.CreateObject`

# Scarica

Wes ha bisogno solo del *wes* *wes.js* Per scaricare, copia *wes.js* da [*@wachaon/wes*](https://github.com/wachaon/wes) o esegui il seguente comando nella tua console.

```bat
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

Usiamo `SendKeys` *wes* *WScript.Shell* in fase di esecuzione come implementazione. Se il percorso della directory in cui è salvato *wes.js* contiene caratteri diversi da *ascii* , `SendKeys` non può inviare la chiave correttamente e lo script non può essere eseguito.\
Configura il percorso *wes.js* è archiviato solo in *ascii* . Se hai già scaricato *wes* , puoi aggiornarlo con il seguente comando.

```bat
wes update
```

# come iniziare *wes*

Immettere la parola chiave `wes` seguita dal comando specificando il file che sarà il punto di partenza del programma nella console. L'estensione dello script *.js* può essere omessa.

```bat
wes index
```

*wes* può inserire ed eseguire direttamente gli script sulla console. Se lo avvii solo con `wes` , puoi inserire ed eseguire direttamente lo script.

```bat
wes
```

*REP* accetta l'input dello script finché non inserisci due righe vuote. Puoi anche vedere *REP* che esegue lo script di esempio in *README.md* .

## opzioni della riga di comando

Le opzioni di avvio di *wes* sono le seguenti.

| di nome            | Descrizione                                            |
| ------------------ | ------------------------------------------------------ |
| `--monotone`       | Elimina *ANSI escape code*                             |
| `--transpile`      | Converti ed esegui sempre con *babel-standalone*       |
| `--debug`          | eseguire lo script in modalità debug                   |
| `--encoding=UTF-8` | Specifica la codifica del primo file letto             |
| `--engine=Chakra`  | Questa opzione viene aggiunta automaticamente da *wes* |

# sistema di moduli

*wes* supporta due sistemi di moduli, il sistema *commonjs module* che utilizza `require()` e il sistema di *es module* che utilizza `import` . (l' *dynamic import* non è supportata perché è un processo asincrono)

## *commonjs module*

Gestisci i moduli assegnandoli a `module.exports` e chiamando `require()` . Percorsi diversi dai percorsi assoluti e dai percorsi relativi che iniziano con `./` e `../` cercano i moduli nella directory *wes\_modules* e convenientemente nella directory *node\_modules* . `require()` di *wes* indovina automaticamente la codifica del file del modulo, ma puoi specificare la codifica con il secondo argomento se non indovina correttamente.

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

Inoltre, è possibile importare con *require* per *COM Object* come `require('WScript.Shell')` .

```javascript
const Shell = require('Shell.Application')
Shell.MinimizeAll()
WScript.Sleep(2000)
Shell.UndoMinimizeAll()
```

## *es module*

*Chakra* , il motore di esecuzione dello script, interpreta la sintassi come `imoprt` , ma non viene eseguito nell'ambiente *cscript* . In *wes* , aggiungendo *babel* ai moduli integrati, anche *es module* vengono eseguiti mentre vengono trasposti in sequenza. Ciò ha un costo per l'elaborazione delle spese generali e un file *wes.js* gonfio. I moduli scritti in *es module* vengono anche convertiti in `require()` tramite transpilazione, quindi è possibile chiamare *COM Object* . Tuttavia, non supporta la specifica della codifica del file del modulo con *es module* . Tutto viene caricato automaticamente. Per caricarlo come *es module* , imposta l'estensione su `.mjs` o imposta il campo `"type"` in `package.json` su `"module"` .

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

# oggetto integrato

*wes* ha *built-in objects* non trovati in *WSH (JScript)* .

## *console*

Usiamo la *console* invece di *wes* `WScript.Echo()` e `WScript.StdErr.WriteLine()` .

### *console.log*

Invia i caratteri alla console con `console.log()` . Supporta anche le stringhe formattate. Emette una stringa formattata utilizzando l'operatore di formattazione `%` . (Gli operatori di formattazione sono validi anche per altri metodi.)

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

| Identificatore di formato | Descrizione                            |
| ------------------------- | -------------------------------------- |
| `%s`                      | `String(value)`                        |
| `%S`                      | `String(value)`                        |
| `%c`                      | `String(value)`                        |
| `%C`                      | `String(value)`                        |
| `%d`                      | `parseInt(value, 10)`                  |
| `%D`                      | `parseInt(value, 10)`                  |
| `%f`                      | `Number(value)`                        |
| `%F`                      | `Number(value)`                        |
| `%j`                      | `JSON.stringify(value)`                |
| `%J`                      | `JSON.stringify(value, null, 2)`       |
| `%o`                      | dump dell'oggetto                      |
| `%O`                      | Dump dell'oggetto (rientrato/colorato) |

`WScript.StdOut.WriteLine` *wes* di `WScript.StdErr.WriteLine` per generare stringhe colorate. L'output di `WScript.Echo` e `WScript.StdOut.WriteLine` è bloccato. `WScript.StdErr.WriteLine` o `console.log` .

### *console.print*

`console.log()` normalmente include una nuova riga alla fine, ma `console.print` no.

### *console.debug*

Output sulla console solo se l'opzione `--debug` è abilitata.

### *console.error*

Genera un'eccezione con il contenuto come messaggio.

### *console.weaklog*

Le stringhe stampate con `console.weaklog()` scompaiono dalla console se è presente un output successivo. Utile per uscite di commutazione.

## *Buffer*

Puoi gestire i buffer.

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log('%s %O', content, buff)
```

## `__dirname` e `__filename`

`__filename` memorizza il percorso del file del modulo attualmente in esecuzione. `__dirname` contiene la directory di `__filename` .

```javascript
const message = `dirname: ${__dirname}\nfilename: ${ __filename}`
console.log(message)
```

## *setTimeout* *setInterval* *setImmediate* *Promise*

Poiché *wes* è un ambiente di esecuzione per l'elaborazione sincrona, *setTimeout* *setInterval* *setImmediate* *Promise* non funziona come elaborazione asincrona, ma è implementato per supportare moduli che presuppongono l'implementazione di *Promise* .

```javascript
const example = () => {
  const promise = new Promise((resolve, reject) => {
    console.log('promise')

    setTimeout(() => {
      console.log('setTimeout') 
      resolve('resolved');
    }, 2000);
  }).then((val) => {
    console.log(val)
  });
  console.log('sub')
};

console.log('start')
example();
console.log('end')
```

# Modulo integrato

*wes* dispone *built-in modules* per semplificare e standardizzare l'elaborazione di base.

## *ansi*

`ansi` è un *ANSI escape code* che può modificare i colori e gli effetti dell'output standard. I colori e gli effetti possono variare a seconda del tipo e delle impostazioni dell'applicazione console utilizzata.

```javascript
const { redBright, yellow } = require('ansi')
const message = 'File does not exist'
console.log(redBright + 'Error: ' + yellow + message)
```

Puoi anche creare i tuoi colori con `ansi.color()` e `ansi.bgColor()` . Gli argomenti utilizzano *RGB* come `255, 165, 0` e *color code* come `'#FFA500'` . I *color name* come l' `orange` non sono supportati.

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

## *argv*

Ottieni gli argomenti della riga di comando. Gli argomenti della riga di comando di `cscript.exe` dichiarano gli argomenti denominati con `/` , mentre *wes* dichiara gli argomenti denominati con `-` e `--` . *argv.unnamed* e *argv.named* del tipo di valore dell'argomento della riga di comando su *String* *Number* *Boolean* . Immettere gli argomenti della riga di comando con *REP* .

```bat
wes REP aaa -bc dd --e=false --gh=iii jjj --klm nn -o --p 9 r
```

Eseguire il seguente script su *REP* .

```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```

## *pathname*

Manipola percorsi. I percorsi che iniziano con `/` e `\` sono generalmente relativi alla radice dell'unità. Ad esempio `/filename` e `C:/filename` possono essere lo stesso percorso. Per motivi di sicurezza, *wes* interpreta i percorsi che iniziano con `/` e `\` relativi alla directory di lavoro.

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

## *filesystem*

Manipola file e directory. `readTextFileSync()` indovina automaticamente la codifica del file e lo legge. (Anche se il secondo argomento di `readFileSync()` è `encode` su `auto` , verrà indovinato automaticamente.)

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
// const contents = fs.readFileSync(readme, 'auto')
console.log(contents)
```

## *chardet*

Sto usando alcune funzionalità da <https://github.com/runk/node-chardet> . È possibile aumentare la precisione dell'auto-indovina aumentando i caratteri specifici della codifica.

## *JScript*

Se modifichi il motore di script in *Chakra* , non sarai in grado di utilizzare *Enumerator* specifici di *JScript* , ecc. Il modulo integrato *JScript* li rende disponibili. Tuttavia, *Enumerator* restituisce un oggetto *Array* , non un *Enumerator object* .

```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```

*GetObject* funziona come alternativa a `WScript.GetObject` .

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

*VBScript* offre alcune funzionalità che *JScript* non offre.

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

*minitest* può scrivere semplici test. Dalla versione `0.10.71` siamo tornati al concetto di base e abbiamo ridotto i tipi di asserzioni a 3 tipi.

Raggruppa con `describe` , verifica con `it` e verifica con `assert` . `pass` sarà un array del numero di occorrenze di `it` e il numero di passaggi.

```javascript
const { describe, it, assert, pass } = require('minitest')
describe('minitest', () => {
    describe('add', () => {
        const add = (a, b) => a + b
        it('2 plus 3 is 5', () => {
            assert.equal(5, add(2, 3))
        })
        it('0 plus 0 is 0', () => {
            assert(0 === add(0, 0))
        })
        it('"4" plus "5" is 9', () => {
            assert.equal(9, add("4", "5"))
        })
        it('NaN plus 3 is NaN', () => {
            assert.equal(NaN, add(NaN, 3))
        })
    })
    describe('sub', () => {
        it('5 minus 4 is 1', () => {
            const sub = (a, b) => a - b
            assert.equal(1, sub(5, 4))
        })
    })
})
console.log('tests: %O passed: %O, failed: %O', pass[0], pass[1], pass[0] - pass[1])
```

### affermazioni

Ci sono solo tre funzioni di asserzione per confrontare oggetti per semplicità.

#### `assert(value, message)` `assert.ok(value, message)`

Confronta con `true` con l'operatore di uguaglianza rigorosa `===` . Se `value` è una funzione, valuta il risultato dell'esecuzione della funzione.

| Param     | Tipo                  | Descrizione                             |
| :-------- | :-------------------- | :-------------------------------------- |
| `value`   | `{Function\|Boolean}` | funzione booleana o di ritorno booleano |
| `message` | `{String}`            | messaggio sul fallimento                |

#### `assert.equal(expected, actual)`

Confronta gli oggetti per l'uguaglianza dei membri, non per riferimento.\
NaN `true` `NaN === NaN` `function (){} === function (){}` `/RegExp/g === /RegExp/g` o `{one: {two: 2}} === {one: {two: 2}}` `[1,2,3] === [1,2,3]` ecc.\
Quando si confrontano le classi (oggetti), devono avere lo stesso costruttore o una superclasse di cui è `expected` `actual` .

| Param      | Tipo    | Descrizione    |
| :--------- | :------ | :------------- |
| `expected` | `{Any}` | valore atteso  |
| `actual`   | `{Any}` | Valore attuale |

#### `assert.throws(value, expected, message)`

Verificare che gli errori vengano generati correttamente.\
Se l'errore è corretto o meno è determinato dal fatto che il *constructor* di errori previsto , il *message* sia uguale e l'espressione regolare superi la valutazione *stack* .

| Param      | Tipo                      | Descrizione                                                                                       |
| :--------- | :------------------------ | :------------------------------------------------------------------------------------------------ |
| `value`    | `{Error}`                 | errore                                                                                            |
| `expected` | `{Error\|String\|RegExp}` | Un'espressione regolare che valuta il *constructor* , *message* o lo *stack* dell'errore previsto |
| `message`  | `{String}`                | messaggio in caso di guasto                                                                       |

## *pipe*

*pipe* semplifica le tubazioni.

```javascript
const pipe = require('pipe')
function add (a, b) {
    return b + a
}
function sub (a, b) {
    return b - a
}
function div (a, b) {
    return a / b
}
const add5 = add.bind(null, 5)
const sub3 = sub.bind(null, 3)
pipe()
  .use(add5)
  .use(sub3)
  .use(div, 4)
  .process(10, (err, res) => console.log('res: %O', res))
```

## *typecheck*

Determina il tipo di script.

```javascript
const { isString, isNumber, isBoolean, isObject } = require('typecheck')
const log = require('log')
log(() => isString("ECMAScript"))
log(() => isNumber(43.5))
log(() => isBoolean(false))
log(() => isObject(function(){}))
```

## *animate*

*animate* aiuta ad animare il display della console.

Se l'elaborazione richiede molto tempo, sarebbe bello visualizzare l'avanzamento come animazione sulla console.

```javascript
const Animate = require('animate')
const animate = new Animate
const size = 23
let counter = 0

const progress = Animate.genProgressIndicator([
    '|----------|----------|',
    '|*---------|----------|',
    '|**--------|----------|',
    '|***-------|----------|',
    '|****------|----------|',
    '|*****-----|----------|',
    '|******----|----------|',
    '|*******---|----------|',
    '|********--|----------|',
    '|*********-|----------|',
    '|**********|----------|',
    '|**********|*---------|',
    '|**********|**--------|',
    '|**********|***-------|',
    '|**********|****------|',
    '|**********|*****-----|',
    '|**********|******----|',
    '|**********|*******---|',
    '|**********|********--|',
    '|**********|*********-|',
    '|**********|**********|',
])

const indigator = Animate.genProgressIndicator(['   ', '.  ', '.. ', '...'])

animate.register(() => {
    let prog = counter / size
    if (prog >= 1) {
        prog = 1
        animate.stop()
    }

    animate.view = console.format(
        '%S %S %S',
        progress(Math.ceil(prog * 20)),
        ('  ' + Math.ceil(prog * 100) + '%').slice(-4),
        prog < 1 ? 'loading' + indigator(counter) : 'finished!'
    )
    counter++
}, 100, Number.MAX_VALUE)
animate.run()
```

### `constructor(complete)`

Esegue la funzione `complete` quando tutte le code sono state completate o viene chiamato `stop()` .

#### `static genProgressIndicator(animation)`

Genera una funzione che visualizzi un'animazione ciclica.

#### `register(callback, interval, conditional)`

Elaborazione registro. Più processi possono essere registrati ed elaborati in parallelo. Nel `callback` , istruiremo a fermare l'animazione e scrivere la vista da visualizzare. `interval` specifica l'intervallo di elaborazione. Se il `conditional` è una funzione, eseguirà `conditional(count, queue)` e se il risultato è vero, continuerà. Il `conditional` esegue `decrement(count)` se è un numero e continua se il risultato è un numero positivo. Viene eseguito solo una volta se `conditional` non è definito. Si noti che specificando una funzione si aumenta il `count` , mentre specificando un numero si diminuisce il `count` .

#### `stop()`

*animate* .

#### `cancel(queue)`

Sospende l'elaborazione di una coda specifica.

#### `run()`

Avvia animazione.

#### `view`

Specifica i caratteri che vengono stampati sulla console. Cambia carattere a intervalli regolari. Assegna *Arrary* o *String* per `view` . Una *String* è utile quando si aggiorna una singola animazione e una *Array* è utile quando si animano più righe singolarmente.

```javascript
const Animate = require('/lib/animate')
const animate = new Animate(
    () => console.log('All Finished!!')
)

const progress = Animate.genProgressIndicator([
    '|----------|----------|',
    '|*---------|----------|',
    '|**--------|----------|',
    '|***-------|----------|',
    '|****------|----------|',
    '|*****-----|----------|',
    '|******----|----------|',
    '|*******---|----------|',
    '|********--|----------|',
    '|*********-|----------|',
    '|**********|----------|',
    '|**********|*---------|',
    '|**********|**--------|',
    '|**********|***-------|',
    '|**********|****------|',
    '|**********|*****-----|',
    '|**********|******----|',
    '|**********|*******---|',
    '|**********|********--|',
    '|**********|*********-|',
    '|**********|**********|',
])

const indigator = Animate.genProgressIndicator(['   ', '.  ', '.. ', '...'])

const state = {
    one: null,
    two: null,
    three: null
}

function upload(name, size, row) {
    let counter = 0
    return () => {
        let prog = counter / size
        if (prog >= 1) {
            prog = 1
            animate.cancel(state[name])
        }

        animate.view[row] = console.format(
            '%S %S %S',
            progress(Math.ceil(prog * 20)),
            ('  ' + Math.ceil(prog * 100) + '%').slice(-4),
            prog < 1 ? name + ' loading' + indigator(counter) : name + ' finished! '
        )
        counter++
    }
}

state.one = animate.register(upload('one', 63, 0), 50, Number.MAX_VALUE)
state.two = animate.register(upload('two', 49, 1), 60, Number.MAX_VALUE)
state.three = animate.register(upload('three', 109, 2), 40, Number.MAX_VALUE)
animate.run()
```

## *getMember*

Ottiene il tipo e la descrizione del membro *COM Object* dal *ProgID* quando utilizzato nella console.

```bat
wes getMember "Scripting.FileSystemObject"
```

Quando viene utilizzato come modulo, ottiene il tipo e la descrizione dei membri dell'istanza. Se utilizzato come modulo, è possibile ottenere informazioni sugli oggetti che non possono essere confermati da *WSH (Windows Script Host)* .

```javascript
const getMember = require('getMember')
const SWbemServicesEx = require("WbemScripting.SWbemLocator").ConnectServer()
getMember(SWbemServicesEx)
```

Il passaggio di oggetti da *wes* a *PowerShell* richiede un certo periodo di tempo.

Se l'elaborazione si interrompe, specificare il tempo di attesa. (il valore predefinito è `1000` )

```bat
wes getMember "Scripting.FileSystemObject" 2000
```

o

```javascript
const getMember = require('getMember', 2000)
const SWbemServicesEx = require("WbemScripting.SWbemLocator").ConnectServer()
getMember(SWbemServicesEx)
```

## *ps*

Facilita l'esecuzione di *PowerShell* .

### `ps(source, option)`

Eseguire lo script *PowerShell* di `source` .

Visualizza un elenco di cmdlet nella console.

```javascript
const ps = require('ps')
const one = ps("Get-Command")
```

Se è presente una finestra di *Google Cherome* , modifica le dimensioni e la posizione della finestra. (Non funziona in modalità a schermo intero.)

```javascript
const ps = require('ps')

const code = `
$name = "chrome"
$w = 700
$h = 500
$x = 10
$y = 100

Add-Type @"
  using System;
  using System.Runtime.InteropServices;
  public class Win32Api {
    [DllImport("user32.dll")]
    [return: MarshalAs(UnmanagedType.Bool)]
    public static extern bool MoveWindow(IntPtr hWnd, int X, int Y, int nWidth, int nHeight, bool bRepaint);
  }
"@

Get-Process -Name $name | where { $_.MainWindowTitle -ne "" } | foreach {
    [Win32Api]::MoveWindow($_.MainWindowHandle, $x, $y, $w, $h, $true) | Out-Null
}
`

ps(code)
```

Controlla il movimento e i clic del mouse.

```javascript
const ps = require("ps")
const { unnamed } = require('argv')
const option = [
    unnamed[1],
    unnamed[2] || 0,
    unnamed[3] || 0
]

ps(`
$Method = $args[0]
$PosX = $args[1]
$PosY = $args[2]

$assemblies = @("System", "System.Runtime.InteropServices")

$Source = @"
using System;
using System.Runtime.InteropServices;

namespace Device {
    public class Mouse {
        public static void Main (params string[] args) {
            string method = args[0];
            int posX = args.Length > 1 ? Int32.Parse(args[1]) : 0;
            int posY = args.Length > 2 ? Int32.Parse(args[2]) : 0;

            if (method == "pos") {
                SetCursorPos(posX, posY);
            }

            if (method == "click") {
                mouse_event(0x2, posX, posY, 0, 0);
                mouse_event(0x4, 0, 0, 0, 0);
            }

            if (method == "leftDown") {
                mouse_event(0x2, posX, posY, 0, 0);
            }

            if (method == "leftUp") {
                mouse_event(0x4, posX, posY, 0, 0);
            }

            if (method == "rightClick") {
                mouse_event(0x8, posX, posY, 0, 0);
                mouse_event(0x10, 0, 0, 0, 0);
            }

            if (method == "rightDown") {
                mouse_event(0x8, posX, posY, 0, 0);
            }

            if (method == "righttUp") {
                mouse_event(0x10, posX, posY, 0, 0);
            }
        }

        [DllImport("USER32.dll", CallingConvention = CallingConvention.StdCall)]
        public static extern void SetCursorPos(int X, int Y);

        [DllImport("USER32.dll", CallingConvention = CallingConvention.StdCall)]
        public static extern void mouse_event(int dwFlags, int dx, int dy, int cButtons, int dwExtraInfo);
    }
}
"@

Add-Type -Language CSharp -TypeDefinition $Source -ReferencedAssemblies $assemblies

[Device.Mouse]::Main($Method, $PosX, $PosY)
`, option)
```

Salva lo script come file o incollalo nel tuo prossimo `REP` .

```bat
wes REP pos 100 100
```

### Esegui *powershell* direttamente dalla console

Esegue il file *.ps1* specificato nella console.

```bat
wes ps ./sample.ps1
```

È inoltre possibile eseguire direttamente un comando specificando l'opzione `--Command` o `-c` .

Esempio di visualizzazione di un elenco di file nella directory corrente

```bat
wes ps --Command Get-ChildItem
```

## *zip*

Comprime file e cartelle e decomprime i file compressi. Internamente, *PowerShell* viene richiamato ed elaborato.

```javascript
const {zip, unzip} = require('zip')
console.log(zip('docs\\*', 'dox.zip'))
console.log(unzip('dox.zip'))
```

Un carattere jolly `*` può essere scritto nel `path` di `zip(path, destinationPath)` . Può essere utilizzato sia nella *CLI (Command Line Interface)* che nei *module* .

```bat
wes zip docs\* dox.zip
wes zip -p dox.zip
```

Se il `path` ha l'estensione `.zip` , `unzip()` viene elaborato e non c'è alcuna descrizione dell'estensione `.zip` . In alternativa, anche se è presente un'estensione `.zip` , se è presente un carattere jolly `*` descrizione, verrà elaborato `zip()` .

| senza nome | Descrizione                          |
| ---------- | ------------------------------------ |
| `1`        | `path` o file da inserire            |
| `2`        | file della cartella in output `dest` |

| di nome  | breve nome | Descrizione                          |
| -------- | ---------- | ------------------------------------ |
| `--path` | `-p`       | `path` o file da inserire            |
| `--dest` | `-d`       | file della cartella in output `dest` |

# Raggruppamento (packaging) e installazione di moduli

In *wes* , un insieme di diversi moduli è chiamato pacchetto. Puoi installare il pacchetto per *wes* pubblicato su *github* . Per pubblicare un pacchetto è necessario un *github repository* .

## *bundle*

Quando si pubblica un pacchetto su *github* , *bundle* raggruppa i moduli richiesti e crea *bundle.json* .

1.  In un *repository* può essere pubblicato un solo pacchetto
2.  *package.json* è obbligatorio. Come minimo, è richiesta la descrizione del campo `main` . ```json
    {
        "main": "index.js"
    }
    ```
3.  Rendere *public* il repository se si desidera pubblicare il pacchetto
4.  A partire dalla `version 0.12.0` , i pacchetti con caricamento diretto del modulo in una directory sopra la directory di lavoro non verranno raggruppati. I pacchetti nella directory superiore *wes\_modules* o *node\_modules* possono essere raggruppati.

Immettere il seguente comando per raggruppare: Fare riferimento a *package.json* per sapere cosa raggruppare.

```bat
    wes bundle 
```

## *install*

Utilizzato per installare il pacchetto per *wes* pubblicato su *github* . Dalla `version 0.10.28` , la cartella di installazione è cambiata da `node_modules` a `wes_modules` . Se vuoi installare in `node_modules` aggiungi l'opzione `--node` . A partire dalla `version 0.12.0` , i file verranno decompressi da *bandle.json* e salvati. A causa di modifiche alle specifiche, i pacchetti forniti con una `version 0.12.0` inferiore alla 0.12.0 potrebbero non essere installati correttamente con `version 0.12.0` o successiva.

Passa gli argomenti da *install* nel formato `@author/repository` .

```bat
wes install @wachaon/fmt
```

*install* ha opzioni.

| di nome       | breve nome | Descrizione                                                                                 |
| ------------- | ---------- | ------------------------------------------------------------------------------------------- |
| `--bare`      | `-b`       | Non creare cartelle *@author*                                                               |
| `--global`    | `-g`       | Installa il pacchetto nella cartella in cui si trova *wes.js*                               |
| `--save`      | `-S`       | Aggiungi il nome e la versione del pacchetto al campo *dependencies* in *package.json*      |
| `--save--dev` | `-D`       | Aggiungere il nome e la versione del pacchetto al campo *devDependencies* in *package.json* |
| `--node`      | `-n`       | Installa nella cartella *node\_module*                                                      |

`--bare` può omettere l'argomento `require` da `author@repository` a `repository` . `--global` rende i pacchetti installati disponibili per tutti gli script.

```bat
wes install @wachaon/fmt --bare
```

# Installazione di pacchetti da repository privati

*install* può installare non solo pacchetti da repository *github* pubblici, ma anche pacchetti da repository privati. In *install* , specifica il pacchetto con *@author/repository* . L'implementazione tenta di scaricare il seguente URL.

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/bundle.json`
```

Se accedi al repository privato *raw* con un browser, il *token* verrà visualizzato, quindi copia il *token* e utilizzalo. Puoi anche installare pacchetti da repository privati ​​eseguendolo nella console mentre il *token* è valido.

```bat
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

# Presentazione del pacchetto

Ecco alcuni pacchetti esterni.

## *@wachaon/fmt*

*@wachaon/fmt* è un pacchetto *prettier* *wes* per noi per formattare gli script. Inoltre, se si verifica un *Syntax Error* durante l'installazione di *@wachaon/fmt* , è possibile visualizzare la posizione dell'errore.

### Installa *@wachaon/fmt*

```bat
wes install @wachaon/fmt
```

Se è presente *.prettierrc* (formato JSON) nella directory di lavoro, si rifletterà nelle impostazioni. *fmt* è disponibile sia nella *CLI* che nel *module* .

#### Utilizzare come *CLI* .

```bat
wes @wachaon/fmt src/sample --write
```

| numero senza nome | Descrizione                                          |
| ----------------- | ---------------------------------------------------- |
| 1                 | Necessario. il percorso del file che vuoi formattare |

| di nome   | di nome breve | Descrizione                  |
| --------- | ------------- | ---------------------------- |
| `--write` | `-w`          | consentire la sovrascrittura |

Sovrascrivi il file con lo script formattato se è specificato `--write` o l'argomento denominato `-w` .

#### utilizzare come modulo

```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')
const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```

## *@wachaon/edge*

*Internet Explorer* terminerà il supporto il 15 giugno 2022. Di conseguenza, si prevede che le operazioni dell'applicazione con `require('InternetExplorer.Application')` diventeranno impossibili. Inoltre, il sito stesso non sarà in grado di essere visualizzato correttamente interrompendo il supporto per *Internet Explorer* . Un'alternativa sarebbe utilizzare *Microsoft Edge based on Chromium* tramite il *web driver(msedgedriver.exe)* . `@wachaon/edge` semplifica il pilota automatico *Edge* .

### Installa *@wachaon/edge*

Prima installa il pacchetto.

```bat
wes install @wachaon/edge --bare
```

Quindi scaricare il *web driver(msedgedriver.exe)* .

```bat
wes edge --download
```

Controlla la versione di *Edge* installata e scarica il *web driver* corrispondente.

### Come usare *@wachaon/edge*

Sarà facile da usare. Avvia il browser e modifica le dimensioni della finestra e il sito da visualizzare in `https://www.google.com` .

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

Memorizziamo la cronologia delle tue visite finché l' *URL* del tuo browser non inizia con `https://www.yahoo` .

```javascript
const edge = require('/index.js')

const ret = edge((window, navi, res) => {
    window.rect({
        x: 1,
        y: 1,
        width: 1200,
        height: 500
    })
    res.exports = []

    navi.on(/^https?:\/\/www\.yahoo\b/, (url) => {
        console.log('finished!')
        navi.emit('terminate', res, window)
    })

    navi.on(/https?:\/\/.+/, (url) => {
        console.log('URL: %O', url)
        res.exports.push(url)
    })

    window.navigate('http://www.google.com')
})

console.log('ret // => %O', ret)
```

*edge* stampa gli *URL* visitati sulla console in ordine. `@wachaon/edge` registra gli eventi per gli *URL* e aggiunge i dati a `res.exports` . L' *URL* da registrare può essere `String` `RegExp` e può essere impostato in modo flessibile. Rendendolo basato sugli eventi, puoi passare facilmente al funzionamento manuale non impostando eventi per processi difficili da gestire con il pilota automatico. Se vuoi che lo script si interrompa, `navi.emit('terminate', res)` o termina *Edge* manualmente. La finalizzazione restituisce `res.exports` come file *.json* per impostazione predefinita. Se si desidera impostare l'elaborazione della terminazione, impostare `terminate` of `edge(callback, terminate)` . `window` è un'istanza della classe *Window* di *@wachaon/webdriver* , non la `window` del browser .

## *@wachaon/webdriver*

Sarà un pacchetto che invia richieste al *web driver* che gestisce il browser. *@wachaon/edge* include *@wachaon/webdriver* .

### Installa *@wachaon/webdriver*

```bat
wes install @wachaon/webdriver --bare
```

Scarica il driver Web *Microsoft Edge* basato su *Chromium* *web driver(msedgedriver.exe)* se non lo possiedi. Inoltre, se la versione di *edge* e la versione del *web driver(msedgedriver.exe)* sono diverse, scaricare la stessa versione del *web driver(msedgedriver.exe)* .

```bat
wes webdriver --download
```

### Come usare *@wachaon/webdriver*

Vai al sito di [*yahoo JAPAN*](https://www.yahoo.co.jp/) e salva uno screenshot di un elemento di blocco specifico.

```javascript
const { Window } = require('webdriver')
const { writeFileSync } = require('filesystem')
const { resolve, WorkingDirectory } = require('pathname')
const genGUID = require('genGUID')

const window = new Window
const { document } = window
window.rect({
    x: 0,
    y: 0,
    width: 1280,
    height: 600
})
window.navigate('https://www.yahoo.co.jp/')

const [elm] = document.querySelectorAll('#ContentWrapper > main > div:nth-child(2)')
const screen = elm.takeScreenShot()

const spec = resolve(WorkingDirectory, 'dev', genGUID() + '.png')
console.log(writeFileSync(spec, screen))

window.quit()
```
