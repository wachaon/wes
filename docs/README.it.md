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
*   I moduli integrati supportano l'elaborazione di base come input/output di file e output di testo colorato sulla console
*   Puoi lasciare che la lettura del file indovini automaticamente la codifica, quindi non devi preoccuparti della codifica ecc.
*   Moduli del pacchetto per supportare la pubblicazione e il recupero esterni
*   Visualizza i dettagli dell'errore in modo più gentile rispetto a *WSH*

# Problemi *wes* che non possiamo risolvere

*   `WScript.Quit` non può interrompere il programma e non restituisce un codice di errore
*   L'elaborazione asincrona non funziona correttamente
*   Non è possibile utilizzare il *event prefix* del secondo argomento di `WScript.CreateObject`

# Scarica

Wes ha bisogno solo del *wes* *wes.js* Per scaricare, copia *wes.js* da [*@wachaon/wes*](https://github.com/wachaon/wes) o esegui il seguente comando nella console.

     bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js

Usiamo `SendKeys` *wes* *WScript.Shell* in fase di esecuzione come implementazione. Se il percorso della directory in cui è salvato *wes.js* contiene caratteri diversi da *ascii* , `SendKeys` non può inviare la chiave correttamente e lo script non può essere eseguito.\
Configura il percorso *wes.js* è archiviato solo in *ascii* . Se hai già scaricato *wes* , puoi aggiornarlo con il seguente comando.

     wes update

# Utilizzo

Immettere la parola chiave `wes` e il comando specificando il file che sarà il punto di partenza del programma nella console. L'estensione dello script *.js* può essere omessa.

     wes index

Inoltre, poiché *wes* è dotato di *REP* , puoi inserire gli script direttamente avviando `wes` da solo.

     wes

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

     // ./add.js function add (a, b) { return ab } module.exports = add

<!---->

     // ./main.js const add = require('./add') console.log('add(7, 3) // => %O', add(7, 3))

Inoltre, è possibile importare con *require* per *COM Object* come `require('WScript.Shell')` .

     const Shell = require('Shell.Application') Shell.MinimizeAll() WScript.Sleep(2000) Shell.UndoMinimizeAll()

## *es module*

*Chakra* , che è il motore di esecuzione dello script, interpreta la sintassi come `imoprt` , ma non può essere eseguito così com'è perché il metodo di elaborazione come *cscript* non è definito. In *wes* , aggiungendo *babel* ai moduli integrati, anche *es module* vengono eseguiti mentre vengono transpilati uno per uno. Questo ci costa un sovraccarico di elaborazione e un file *wes.js* gonfio. I moduli scritti in *es module* vengono anche convertiti in `require()` tramite transpilazione, quindi è possibile chiamare *COM Object* . Tuttavia, non supporta la specifica della codifica del file del modulo con *es module* . Tutto viene caricato automaticamente. Per caricarlo come *es module* , imposta l'estensione su `.mjs` o imposta il campo `"type"` in `package.json` su `"module"` .

     // ./sub.mjs export default function sub (a, b) { return a - b }

<!---->

     // ./main2.js import sub from './sub.mjs' console.log('sub(7, 3) // => %O', sub(7, 3))

# oggetto incorporato

*wes* ha *built-in objects* non trovati in *WSH (JScript)* .

undefined

## *Buffer*

Puoi gestire i buffer.

     const content = 'Hello World' const buff = Buffer.from(content) console.log(`${content} %O`, buff)

## `__dirname` e `__filename`

`__filename` memorizza il percorso del file del modulo attualmente in esecuzione. `__dirname` contiene la directory di `__filename` .

     console.log('dirname: %O\nfilename: %O', __dirname, __filename)

## *setTimeout* *setInterval* *setImmediate* *Promise*

Poiché *wes* è un ambiente di esecuzione per l'elaborazione sincrona, *setTimeout* *setInterval* *setImmediate* *Promise* non funziona come elaborazione asincrona, ma è implementato per supportare moduli che presuppongono l'implementazione di *Promise* .

     const example = () => { const promise = new Promise((resolve, reject) => { console.log('promise') setTimeout(() => { console.log('setTimeout') resolve('resolved'); }, 2000); }).then((val) => { console.log(val) }); console.log('sub') }; console.log('start') example(); console.log('end')

# Modulo integrato

*wes* dispone *built-in modules* per semplificare e standardizzare l'elaborazione di base.

## *ansi*

`ansi` è un *ANSI escape code* che può modificare i colori e gli effetti dell'output standard. I colori e gli effetti possono variare a seconda del tipo e delle impostazioni dell'applicazione console utilizzata.

     const { redBright, yellow } = require('ansi') const message = 'File does not exist' console.log(redBright 'Error: ' yellow message)

Puoi anche creare i tuoi colori con `ansi.color()` e `ansi.bgColor()` . Gli argomenti utilizzano *RGB* come `255, 165, 0` e *color code* come `'#FFA500'` . I *color name* come l' `orange` non sono supportati.

     const { color } = require('ansi') const orange = color(255, 165, 0) console.log(orange 'Hello World')

## *argv*

Ottieni argomenti da riga di comando. Gli argomenti della riga di comando di `cscript.exe` dichiarano argomenti denominati con `/` , mentre *wes* dichiara argomenti denominati con `-` e `--` . *argv.unnamed* e *argv.named* del tipo di valore dell'argomento della riga di comando su *String* *Number* *Boolean* . Immettere gli argomenti della riga di comando con *REP* .

     wes REP aaa -bcd eee --fgh=iii jjj --kln mmm

Esegui il seguente script su *REP* .

     const argv = require('argv') console.log(`argv: %O argv.unnamed: %O argv.named: %O`, argv, argv.unnamed, argv.named)

## *pathname*

Manipola percorsi. I percorsi che iniziano con `/` e `\` sono generalmente relativi alla radice dell'unità. Ad esempio `/filename` e `C:/filename` possono essere lo stesso percorso. Per motivi di sicurezza, *wes* interpreta i percorsi che iniziano con `/` e `\` relativi alla directory di lavoro.

     const path = require('pathname') const file = path.resolve(__dirname, 'index.js') console.log('file %O', file)

## *filesystem*

Manipola file e directory. `readTextFileSync()` indovina automaticamente la codifica del file e lo legge. (Anche se il secondo argomento di `readFileSync()` è `encode` su `auto` , verrà indovinato automaticamente.)

     const fs = require('filesystem') const path = require('pathname') const readme = path.resolve(__dirname, 'README.md') const contents = fs.readTextFileSync(readme) // const contents = fs.readFileSync(readme, 'auto') console.log(contents)

## *chardet*

Sto usando alcune funzionalità di <https://github.com/runk/node-chardet> . Puoi aumentare la precisione dell'auto-indovina aumentando i caratteri specifici della codifica.

## *JScript*

Se modifichi il motore di script in *Chakra* , non sarai in grado di utilizzare *Enumerator* specifici di *JScript* , ecc. Il modulo integrato *JScript* li rende disponibili. Tuttavia, *Enumerator* restituisce un oggetto *Array* , non un *Enumerator object* .

     const { Enumerator, ActiveXObject } = require('JScript') const FSO = new ActiveXObject('Scripting.FileSystemObject') const dir = FSO.getFolder(__dirname).Files const files = new Enumerator(dir) files.forEach(file => console.log(file.Name))

*GetObject* funziona come alternativa a `WScript.GetObject` .

     const { GetObject, Enumerator } = require('JScript') const ServiceSet = GetObject("winmgmts:{impersonationLevel=impersonate}").InstancesOf("Win32_Service") new Enumerator(ServiceSet).forEach(service => console.log( 'Name: %O\nDescription: %O\n', service.Name, service.Description ))

## *VBScript*

*VBScript* offre alcune funzionalità che *JScript* non offre.

     const { TypeName } = require('VBScript') const FSO = require('Scripting.FileSystemObject') console.log(TypeName(FSO))

## *httprequest*

*httprequest* emette una *http request* .

     const request = require('httprequest') const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1') console.log('%O', JSON.parse(content))

undefined

## *pipe*

*pipe* semplifica le tubazioni.

### Utilizzo

     const pipe = require('pipe') function add (a, b) { return ba } function sub (a, b) { return b - a } function div (a, b) { return a / b } const add5 = add.bind(null, 5) const sub3 = sub.bind(null, 3) pipe() .use(add5) .use(sub3) .use(div, 4) .process(10, (err, res) => console.log('res: %O', res))

## *typecheck*

Determina il tipo di script.

### Utilizzo

     const { isString, isNumber, isBoolean, isObject } = require('typecheck') const log = require('log') log(() => isString("ECMAScript")) log(() => isNumber(43.5)) log(() => isBoolean(false)) log(() => isObject(function(){}))

undefined

## *getMember*

Ottieni il tipo di membro e la descrizione *COM Object* da *ProgID* .

### Utilizzo

     const getMember = require('getMember') const FileSystemObject = 'Scripting.FileSystemObject' console.log('require("%S") // => %O', FileSystemObject, getMember(FileSystemObject))

## *zip*

Comprime file e cartelle e decomprime i file compressi. Internamente, *PowerShell* viene chiamato ed elaborato.

### Utilizzo

     const {zip, unzip} = require('zip') console.log(zip('docs\\*', 'dox.zip')) console.log(unzip('dox.zip'))

Un carattere jolly `*` può essere scritto nel `path` di `zip(path, destinationPath)` . Può essere utilizzato sia in *CLI (Command Line Interface)* che *module* .

     wes zip docs\* dox.zip wes zip -p dox.zip

Se il `path` ha l'estensione `.zip` , `unzip()` viene elaborato e non c'è una descrizione dell'estensione `.zip` . In alternativa, anche se è presente un'estensione `.zip` , se è presente una descrizione con carattere jolly `*` , verrà elaborato `zip()` .

| senza nome | Descrizione                            |
| ---------- | -------------------------------------- |
| `1`        | `path` o file da inserire              |
| `2`        | cartella di output per l'output `dest` |

| di nome  | nome breve | Descrizione                            |
| -------- | ---------- | -------------------------------------- |
| `--path` | `-p`       | `path` o file da inserire              |
| `--dest` | `-d`       | cartella di output per l'output `dest` |

# Raggruppamento (packaging) e installazione di moduli

In *wes* , un pacchetto di più moduli è chiamato pacchetto. Puoi installare il pacchetto per *wes* pubblicato su *github* . Per pubblicare un pacchetto è necessario un *github repository* .

## *bundle*

Quando si pubblica un pacchetto su *github* , *bundle* raggruppa i moduli richiesti e crea *bundle.json* .

1.  È possibile pubblicare un solo pacchetto in un *repository*

2.  *package.json* è obbligatorio. Come minimo, è richiesta la descrizione del campo `main` .

         { "main": "index.js" }

3.  Rendi *public* il repository se desideri pubblicare il pacchetto

4.  A partire dalla `version 0.12.0` , i pacchetti con caricamento diretto del modulo in una directory sopra la directory di lavoro non verranno raggruppati. I pacchetti nella directory superiore *wes\_modules* o *node\_modules* possono essere raggruppati.

Immettere il seguente comando per raggruppare: Fare riferimento a *package.json* per cosa raggruppare.

     wes bundle

undefined

# Installazione di pacchetti da repository privati

*install* può installare non solo pacchetti da repository *github* pubblici, ma anche pacchetti da repository privati. In *install* , specifica il pacchetto con *@author/repository* . L'implementazione tenta di scaricare il seguente URL.

     `https://raw.githubusercontent.com/${author}/${repository}/master/bundle.json`

Se accedi al repository privato *raw* con un browser, il *token* verrà visualizzato, quindi copia il *token* e usalo. Puoi anche installare pacchetti da repository privati ​​eseguendolo nella console mentre il *token* è valido.

     wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA

# Presentazione del pacchetto

Ecco alcuni pacchetti esterni.

## *@wachaon/fmt*

*@wachaon/fmt* è un pacchetto *prettier* *wes* per noi per formattare gli script. Inoltre, se si verifica un *Syntax Error* durante l'installazione di *@wachaon/fmt* , è possibile indicare la posizione dell'errore.

### installare

     wes install @wachaon/fmt

### Utilizzo

Se è presente *.prettierrc* (formato JSON) nella directory di lavoro, si rifletterà nelle impostazioni. *fmt* è disponibile sia in *CLI* che in *module* .

#### Utilizzare come *CLI* .

     wes @wachaon/fmt src/sample --write

| numero senza nome | Descrizione                                          |
| ----------------- | ---------------------------------------------------- |
| 1                 | Necessario. il percorso del file che vuoi formattare |

| di nome   | nome breve | Descrizione                  |
| --------- | ---------- | ---------------------------- |
| `--write` | `-w`       | consentire la sovrascrittura |

Sovrascrivi il file con lo script formattato se è specificato `--write` o l'argomento denominato `-w` .

#### utilizzare come modulo

     const fmt = require('@wachaon/fmt') const { readTextFileSync, writeTextFileSync } = require('filesystem') const { join, workingDirectory } = require('pathname') const target = join(workingDirectory, 'index.js') console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
