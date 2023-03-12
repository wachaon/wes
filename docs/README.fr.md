# *WES*

*wes* est un framework de console pour exécuter *ECMAScript* sur *WSH (Windows Script Host)* . Le [*japanese*](/README.md) original du *README* sera en japonais. Les textes autres que le japonais seront traduits automatiquement.\
Pour les textes dans d'autres langues, veuillez sélectionner parmi les options ci-dessous.

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

# caractéristique

*   Vous pouvez changer le moteur de script en *Chakra* et écrire selon les spécifications *ECMAScript2015* .
*   Étant donné que *cscript.exe* 32 bits est toujours exécuté, il n'y a pas de problème unique dans un environnement 64 bits.
*   Puisqu'il existe un système de modules, il peut être développé plus efficacement que le *WSH* conventionnel
*   Les modules intégrés prennent en charge le traitement de base tel que l'entrée/sortie de fichiers et la sortie de texte coloré vers la console
*   Vous pouvez laisser la lecture du fichier deviner automatiquement l'encodage, vous n'avez donc pas à vous soucier de l'encodage, etc.
*   Modules de package pour prendre en charge la publication et la récupération externes
*   Afficher les détails de l'erreur plus gentiment que *WSH*

# Problèmes *wes* que nous ne pouvons pas résoudre

*   `WScript.Quit` ne peut pas interrompre le programme et ne renvoie pas de code d'erreur
*   Le traitement asynchrone ne fonctionne pas correctement
*   Vous ne pouvez pas utiliser le *event prefix* du deuxième argument de `WScript.CreateObject`

# Télécharger

Wes n'a besoin que du *wes* *wes.js* . Pour télécharger, copiez *wes.js* depuis [*@wachaon/wes*](https://github.com/wachaon/wes) ou exécutez la commande suivante dans la console.

```bat
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

Nous utilisons `SendKeys` *wes* *WScript.Shell* lors de l'exécution en tant qu'implémentation. Si le chemin du répertoire où *wes.js* est enregistré contient des caractères autres que *ascii* , `SendKeys` ne peut pas envoyer la clé correctement et le script ne peut pas être exécuté.\
Configurez le chemin *wes.js* est stocké en *ascii* uniquement. Si vous avez déjà téléchargé *wes* , vous pouvez le mettre à jour avec la commande suivante.

```bat
wes update
```

# comment commencer *wes*

Entrez le mot-clé `wes` et la commande spécifiant le fichier qui sera le point de départ du programme vers la console. L'extension de script *.js* peut être omise.

```bat
wes index
```

*wes* peut saisir et exécuter directement des scripts sur la console. Si vous le démarrez avec `wes` uniquement, vous pouvez entrer et exécuter directement le script.

```bat
wes
```

*REP* accepte l'entrée de script jusqu'à ce que vous saisissiez deux lignes vides. Vous pouvez également voir *REP* exécuter l'exemple de script dans *README.md* .

## options de ligne de commande

Les options de démarrage de *wes* sont les suivantes.

| nommé              | La description                                         |
| ------------------ | ------------------------------------------------------ |
| `--monotone`       | Élimine *ANSI escape code*                             |
| `--transpile`      | Toujours convertir et exécuter avec *babel-standalone* |
| `--debug`          | exécuter le script en mode débogage                    |
| `--encoding=UTF-8` | Spécifie l'encodage du premier fichier lu              |
| `--engine=Chakra`  | Cette option est ajoutée automatiquement par *wes*     |

# système de modules

*wes* prend en charge deux systèmes de modules, le système de *commonjs module* utilisant `require()` et le système de *es module* utilisant les `import` . ( *dynamic import* n'est pas prise en charge car il s'agit d'un processus asynchrone)

## *commonjs module*

Gérez les modules en attribuant à `module.exports` et en appelant `require()` . Les chemins autres que les chemins absolus et les chemins relatifs commençant par `./` ​​et `../` recherchent les modules dans le répertoire *wes\_modules* et commodément le répertoire *node\_modules* . Le `require()` de *wes* devine automatiquement l'encodage du fichier de module, mais vous pouvez spécifier l'encodage avec le deuxième argument s'il ne devine pas correctement.

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

En outre, il est possible d'importer avec *require* pour un *COM Object* comme `require('WScript.Shell')` .

```javascript
const Shell = require('Shell.Application')
Shell.MinimizeAll()
WScript.Sleep(2000)
Shell.UndoMinimizeAll()
```

## *es module*

*Chakra* , le moteur d'exécution de script, interprète une syntaxe telle que `imoprt` , mais il n'est pas exécuté dans l'environnement *cscript* . Dans *wes* , en ajoutant *babel* aux modules intégrés, les modules *es module* sont également exécutés tout en étant transpilés un par un. Cela a un coût de traitement supplémentaire et un fichier *wes.js* gonflé. Les modules écrits dans le *es module* sont également convertis en `require()` par transpilation, il est donc possible d'appeler *COM Object* . Cependant, il ne prend pas en charge la spécification de l'encodage du fichier de module avec *es module* . Tout est chargé automatiquement. Pour le charger en tant que *es module* , définissez l'extension sur `.mjs` ou définissez le champ `"type"` dans `package.json` sur `"module"` .

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

# objet intégré

*wes* a *built-in objects* introuvables dans *WSH (JScript)* .

## *console*

Nous utilisons *console* au lieu de *wes* `WScript.Echo()` et `WScript.StdErr.WriteLine()` .

### *console.log*

Affichez les caractères sur la console avec `console.log()` . Il prend également en charge les chaînes formatées. Génère une chaîne formatée à l'aide de l'opérateur de formatage `%` . (Les opérateurs de formatage sont également valables pour d'autres méthodes.)

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

| Spécificateur de format | La description                   |
| ----------------------- | -------------------------------- |
| `%s`                    | `String(value)`                  |
| `%S`                    | `String(value)`                  |
| `%c`                    | `String(value)`                  |
| `%C`                    | `String(value)`                  |
| `%d`                    | `parseInt(value, 10)`            |
| `%D`                    | `parseInt(value, 10)`            |
| `%f`                    | `Number(value)`                  |
| `%F`                    | `Number(value)`                  |
| `%j`                    | `JSON.stringify(value)`          |
| `%J`                    | `JSON.stringify(value, null, 2)` |
| `%o`                    | vidage d'objet                   |
| `%O`                    | Vidage d'objet (indenté/coloré)  |

`WScript.StdOut.WriteLine` *wes* de `WScript.StdErr.WriteLine` pour générer des chaînes colorées. `WScript.Echo` et `WScript.StdOut.WriteLine` sont des sorties bloquées. `WScript.StdErr.WriteLine` ou `console.log` .

### *console.print*

`console.log()` inclut normalement une nouvelle ligne à la fin, mais pas `console.print` .

### *console.debug*

Sortie vers la console uniquement si l'option `--debug` est activée.

### *console.error*

Levez une exception avec le contenu comme message.

### *console.weaklog*

Les chaînes imprimées avec `console.weaklog()` disparaissent de la console s'il y a une sortie ultérieure. Utile pour commuter les sorties.

## *Buffer*

Vous pouvez gérer les tampons.

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log('%s %O', content, buff)
```

## `__dirname` et `__filename`

`__filename` stocke le chemin du fichier de module en cours d'exécution. `__dirname` contient le répertoire de `__filename` .

```javascript
const message = `dirname: ${__dirname}\nfilename: ${ __filename}`
console.log(message)
```

## *setTimeout* *setInterval* *setImmediate* *Promise*

Étant donné que *wes* est un environnement d'exécution pour le traitement synchrone, *setTimeout* *setInterval* *setImmediate* *Promise* ne fonctionne pas comme un traitement asynchrone, mais il est implémenté pour prendre en charge les modules qui supposent l'implémentation de *Promise* .

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

# Module intégré

*wes* a *built-in modules* pour simplifier et standardiser le traitement de base.

## Modules intégrés à supprimer

Remplacez certains modules intégrés par des modules externes pour rendre le fichier plus léger et plus facile à entretenir.

*   *animate.js*
*   *day.js*
*   *debug.js*
*   *log.js*

Les modules ci-dessus peuvent être installés en tant que `@wachaon/animate` `@wachaon/day` `@wachaon/debug` `@wachaon/log` respectivement.

## *ansi*

`ansi` est *ANSI escape code* qui peut modifier les couleurs et les effets de sortie standard. Les couleurs et les effets peuvent différer selon le type et les paramètres de l'application console utilisée.

```javascript
const { redBright, yellow } = require('ansi')
const message = 'File does not exist'
console.log(redBright + 'Error: ' + yellow + message)
```

Vous pouvez également créer vos propres couleurs avec `ansi.color()` et `ansi.bgColor()` . Les arguments utilisent *RGB* tels que `255, 165, 0` et *color code* tels que `'#FFA500'` . *color name* tels que `orange` ne sont pas pris en charge.

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

## *argv*

Obtenir les arguments de la ligne de commande. Les arguments de ligne de commande de `cscript.exe` déclarent des arguments nommés avec `/` , tandis que *wes* déclare des arguments nommés avec `-` et `--` . *argv.unnamed* et *argv.named* le type de valeur d'argument de ligne de commande en *String* *Number* *Boolean* . Entrez les arguments de la ligne de commande avec *REP* .

```bat
wes REP aaa -bc dd --e=false --gh=iii jjj --klm nn -o --p 9 r
```

Exécutez le script suivant sur *REP* .

```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```

## *pathname*

Manipulez les chemins. Les chemins commençant par `/` et `\` sont généralement relatifs à la racine du lecteur. Par exemple `/filename` et `C:/filename` peuvent être le même chemin. Pour des raisons de sécurité, *wes* interprète les chemins commençant par `/` et `\` par rapport au répertoire de travail.

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

## *filesystem*

Manipuler des fichiers et des répertoires. `readTextFileSync()` devine automatiquement l'encodage du fichier et le lit. (Même si le deuxième argument de `readFileSync()` est `encode` sur `auto` , il sera deviné automatiquement.)

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
// const contents = fs.readFileSync(readme, 'auto')
console.log(contents)
```

## *chardet*

J'utilise certaines fonctionnalités de <https://github.com/runk/node-chardet> . Vous pouvez augmenter la précision de l'auto-estimation en augmentant les caractères spécifiques à l'encodage.

## *JScript*

Si vous changez le moteur de script en *Chakra* , vous ne pourrez pas utiliser *Enumerator* spécifiques *JScript* , etc. Le module intégré *JScript* les rend disponibles. Cependant, *Enumerator* renvoie *Array* , pas *Enumerator object* .

```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```

*GetObject* fonctionne comme une alternative à `WScript.GetObject` .

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

*VBScript* offre certaines fonctionnalités que *JScript* n'offre pas.

```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```

## *httprequest*

*httprequest* émet une *http request* .

```javascript
const request = require('httprequest')
const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log('%O', JSON.parse(content))
```

## *minitest*

*minitest* peut écrire des tests simples. A partir de la version `0.10.71` , nous sommes revenus au concept de base et avons réduit les types d'assertions à 3 types.

Grouper avec `describe` , tester `it` et vérifier avec `assert` . `pass` sera un tableau du nombre d'occurrences de `it` et du nombre de passes.

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

### affirmations

Il n'y a que trois fonctions d'assertion pour comparer des objets pour plus de simplicité.

#### `assert(value, message)` `assert.ok(value, message)`

Comparez à `true` avec l'opérateur d'égalité stricte `===` . Si `value` est une fonction, évalue le résultat de l'exécution de la fonction.

| Param     | Taper                 | La description                             |
| :-------- | :-------------------- | :----------------------------------------- |
| `value`   | `{Function\|Boolean}` | fonction booléenne ou renvoyant un booléen |
| `message` | `{String}`            | message en cas de panne                    |

#### `assert.equal(expected, actual)`

Compare les objets pour l'égalité des membres, pas par référence.\
NaN `true` `NaN === NaN` `function (){} === function (){}` `/RegExp/g === /RegExp/g` ou `{one: {two: 2}} === {one: {two: 2}}` `[1,2,3] === [1,2,3]` etc.\
Lors de la comparaison de classes (objets), elles doivent avoir le même constructeur ou une superclasse dont `actual` est `expected` .

| Param      | Taper   | La description  |
| :--------- | :------ | :-------------- |
| `expected` | `{Any}` | valeur attendue |
| `actual`   | `{Any}` | Valeur actuelle |

#### `assert.throws(value, expected, message)`

Vérifiez que les erreurs sont générées correctement.\
Le fait que l'erreur soit correcte ou non est déterminé par le fait que le *constructor* d'erreur attendu, *message* est égal et que l'expression régulière réussit l'évaluation de la *stack* .

| Param      | Taper                     | La description                                                                                   |
| :--------- | :------------------------ | :----------------------------------------------------------------------------------------------- |
| `value`    | `{Error}`                 | Erreur                                                                                           |
| `expected` | `{Error\|String\|RegExp}` | Une expression régulière qui évalue le *constructor* , *message* ou la *stack* d'erreur attendus |
| `message`  | `{String}`                | message en cas de panne                                                                          |

## *pipe*

*pipe* simplifie la tuyauterie. Le résultat est sorti lors de la conversion *data* avec un ou plusieurs *converter* . À partir de *ver 0.12.75* , il peut être lancé directement à partir de la ligne de commande.

### Démarrer *pipe* en tant que module

Placez la fonction de conversion dans `use(converter)` de la méthode *pipe* et décrivez l'entrée de données et le traitement post-conversion avec `process(data, callback(error, result))` . Si aucun `callback` n'est spécifié, la valeur de retour sera *promise* et le traitement peut être connecté avec `then(result)` et `catch(error)` .

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

En plus de `use(converter)` , il existe des méthodes telles que `.filter(callbackFn(value, index))` et `map(callbackFn(value, index))` . Chaque *data* est une chaîne, un tableau et un objet.

```javascript
const pipe = require('pipe')

const tsv = `
javascript\t1955
java\t1995
vbscript\t1996
c#\t2000
`.trim()

pipe()
    .filter(include)
    .map(release)
    .process(tsv)
    .then((res) => console.log(() => res))

function include(value, i) {
    return value.includes('script')
}

function release(value, i) {
    return value.split('\t').join(' was released in ')
}
```

### démarrer *pipe* à partir de la ligne de commande

## *typecheck*

Déterminez le type de script.

```javascript
const { isString, isNumber, isBoolean, isObject } = require('typecheck')
const log = require('log')
log(() => isString("ECMAScript"))
log(() => isNumber(43.5))
log(() => isBoolean(false))
log(() => isObject(function(){}))
```

## *getMember*

Obtient le type de membre et la description de l' *COM Object* à partir du *ProgID* lorsqu'il est utilisé dans la console.

```bat
wes getMember "Scripting.FileSystemObject"
```

Lorsqu'il est utilisé en tant que module, il obtient le type de membre et la description de l'instance. S'il est utilisé en tant que module, vous pouvez obtenir des informations sur les objets qui ne peuvent pas être confirmés à partir de *WSH (Windows Script Host)* .

```javascript
const getMember = require('getMember')
const SWbemServicesEx = require("WbemScripting.SWbemLocator").ConnectServer()
getMember(SWbemServicesEx)
```

Passer des objets de *wes* à *PowerShell* nécessite un certain temps.

Si le traitement s'arrête, veuillez préciser le temps d'attente. (la valeur par défaut est `1000` )

```bat
wes getMember "Scripting.FileSystemObject" 2000
```

ou alors

```javascript
const getMember = require('getMember', 2000)
const SWbemServicesEx = require("WbemScripting.SWbemLocator").ConnectServer()
getMember(SWbemServicesEx)
```

## *ps*

Facilite l'exécution de *PowerShell* .

### `ps(source, option)`

Exécutez le script *PowerShell* `source` .

Affichez une liste d'applets de commande dans la console.

```javascript
const ps = require('ps')
const one = ps("Get-Command")
```

S'il existe une fenêtre *Google Cherome* , modifiez la taille et la position de la fenêtre. (Cela ne fonctionne pas en mode plein écran.)

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

Contrôle le mouvement de la souris et les clics.

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

Enregistrez le script sous forme de fichier ou collez-le dans votre prochain `REP` .

```bat
wes REP pos 100 100
```

### Exécutez *powershell* directement depuis la console

Exécute le fichier *.ps1* spécifié dans la console.

```bat
wes ps ./sample.ps1
```

Vous pouvez également exécuter directement une commande en spécifiant l'option `--Command` ou `-c` .

Exemple d'affichage d'une liste de fichiers dans le répertoire en cours

```bat
wes ps --Command Get-ChildItem
```

## *zip*

Compresse les fichiers et les dossiers et décompresse les fichiers compressés. En interne, *PowerShell* est appelé et traité.

```javascript
const {zip, unzip} = require('zip')
console.log(zip('docs\\*', 'dox.zip'))
console.log(unzip('dox.zip'))
```

Un caractère générique `*` peut être écrit dans le `path` de `zip(path, destinationPath)` . Il peut être utilisé à la fois dans *CLI (Command Line Interface)* et dans les *module* .

```bat
wes zip docs\* dox.zip
wes zip -p dox.zip
```

Si le `path` a l'extension `.zip` , `unzip()` est traité et il n'y a pas de description de l'extension `.zip` . Alternativement, même s'il y a une extension `.zip` , s'il y a une description générique `*` , `zip()` sera traité.

| anonyme | La description                              |
| ------- | ------------------------------------------- |
| `1`     | `path` ou fichier à entrer                  |
| `2`     | fichier de dossier vers la `dest` de sortie |

| nommé    | nommé court | La description                              |
| -------- | ----------- | ------------------------------------------- |
| `--path` | `-p`        | `path` ou fichier à saisir                  |
| `--dest` | `-d`        | fichier de dossier vers la `dest` de sortie |

# Regroupement (conditionnement) et installation de modules

Dans *wes* , un bundle de plusieurs modules est appelé un package. Vous pouvez installer le package pour *wes* publié sur *github* . Un *github repository* est requis pour publier un package.

## *bundle*

Lors de la publication d'un package sur *github* , *bundle* regroupe les modules requis et crée *bundle.json* .

1.  Un seul package peut être publié dans un *repository*
2.  *package.json* est requis. Au minimum, la description du champ `main` est requise. ```json
    {
        "main": "index.js"
    }
    ```
3.  Rendez le référentiel *public* si vous souhaitez publier le package
4.  À partir de la `version 0.12.0` , les packages avec chargement direct du module dans un répertoire au-dessus du répertoire de travail ne seront pas regroupés. Les packages du répertoire supérieur *wes\_modules* ou *node\_modules* peuvent être regroupés.

Saisissez la commande suivante pour regrouper : Reportez-vous à *package.json* pour savoir quoi regrouper.

```bat
wes bundle 
```

## *init*

Entrez quelques éléments et il créera *package.json* à partir de ces informations.

```bat
wes init
```

## *install*

Utilisé pour installer le package pour *wes* publié sur *github* . À partir de la `version 0.10.28` , le dossier d'installation est modifié de `node_modules` à `wes_modules` . Si vous souhaitez installer dans `node_modules` ajoutez l'option `--node` . À partir de la `version 0.12.0` , les fichiers seront décompressés de *bandle.json* et enregistrés. En raison de changements de spécifications, les packages fournis avec une `version 0.12.0` inférieure à 0.12.0 peuvent ne pas être installés correctement avec la `version 0.12.0` ou ultérieure.

Passez les arguments à *install* sous la forme `@author/repository` .

```bat
wes install @wachaon/fmt
```

*install* a des options.

| nommé         | nommé court | La description                                                                          |
| ------------- | ----------- | --------------------------------------------------------------------------------------- |
| `--bare`      | `-b`        | Ne créez pas de dossiers *@author*                                                      |
| `--global`    | `-g`        | Installez le package dans le dossier où se trouve *wes.js*                              |
| `--save`      | `-S`        | Ajouter le nom et la version du package au champ des *dependencies* dans *package.json* |
| `--save--dev` | `-D`        | Ajouter le nom et la version du package au champ *devDependencies* dans *package.json*  |
| `--node`      | `-n`        | Installer dans le dossier *node\_module*                                                |

`--bare` peut omettre l'argument `require` de `author@repository` à `repository` . `--global` rend les packages installés disponibles pour tous les scripts.

```bat
wes install @wachaon/fmt --bare
```

# Installation de packages à partir de référentiels privés

*install* peut installer non seulement des packages à partir de référentiels *github* publics, mais également des packages à partir de référentiels privés. Dans *install* , spécifiez le package avec *@author/repository* . L'implémentation tente de télécharger l'URL suivante.

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/bundle.json`
```

Lorsque vous accédez au *raw* du référentiel privé avec un navigateur, le *token* s'affiche, alors copiez le *token* et utilisez-le. Les packages provenant de référentiels privés peuvent également être installés s'ils sont exécutés dans la console pendant que le *token* est valide.

```bat
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

# Présentation du paquet

Voici quelques packages externes.

## *@wachaon/fmt*

*@wachaon/fmt* est *prettier* emballé pour *wes* pour formater les scripts. De plus, si une *Syntax Error* se produit lors *@wachaon/fmt* , vous pouvez afficher l'emplacement de l'erreur.

### Installer *@wachaon/fmt*

```bat
wes install @wachaon/fmt
```

S'il y a *.prettierrc* (format JSON) dans le répertoire de travail, cela sera reflété dans les paramètres. *fmt* est disponible à la fois dans la *CLI* et dans le *module* .

#### Utiliser comme *CLI* .

```bat
wes @wachaon/fmt src/sample --write
```

| numéro anonyme | La description                                                |
| -------------- | ------------------------------------------------------------- |
| 1              | Obligatoire. le chemin du fichier que vous souhaitez formater |

| nommé     | nommé court | La description            |
| --------- | ----------- | ------------------------- |
| `--write` | `-w`        | autoriser le remplacement |

Remplacez le fichier par le script formaté si `--write` ou l'argument nommé `-w` est spécifié.

#### utiliser comme module

```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')
const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```

## *@wachaon/edge*

*Internet Explorer* mettra fin au support le 15 juin 2022. En conséquence, il est prévu que les opérations d'application avec `require('InternetExplorer.Application')` deviennent impossibles. De plus, le site lui-même ne pourra pas s'afficher correctement en mettant fin à la prise en charge d' *Internet Explorer* . Une alternative serait de faire fonctionner *Microsoft Edge based on Chromium* via le *web driver(msedgedriver.exe)* . `@wachaon/edge` *Edge* le pilotage automatique des bords.

### Installer *@wachaon/edge*

Installez d'abord le paquet.

```bat
wes install @wachaon/edge --bare
```

Téléchargez ensuite le *web driver(msedgedriver.exe)* .

```bat
wes edge --download
```

Vérifiez la version d' *Edge* installée et téléchargez le *web driver* correspondant.

### Comment utiliser *@wachaon/edge*

Il sera facile à utiliser. Démarrez votre navigateur et modifiez la taille de la fenêtre et le site à afficher en `https://www.google.com` .

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

Nous stockons votre historique de visites jusqu'à ce que l' *URL* de votre navigateur commence par `https://www.yahoo` .

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

*edge* imprime les *URL* visitées sur la console dans l'ordre. `@wachaon/edge` enregistre les événements pour *URL* et ajoute des données à `res.exports` . L' *URL* à enregistrer peut être soit `String` `RegExp` , et peut être définie de manière flexible. En le rendant piloté par les événements, vous pouvez facilement passer au fonctionnement manuel en ne définissant pas d'événements pour les processus difficiles à gérer avec le pilote automatique. Si vous souhaitez que le script s'arrête, `navi.emit('terminate', res)` ou terminez *Edge* manuellement. La finalisation génère par défaut `res.exports` sous la forme d'un fichier *.json* . Si vous souhaitez définir le traitement de terminaison, définissez `terminate` of `edge(callback, terminate)` . `window` est une instance de la classe *Window* de *@wachaon/webdriver* , et non la `window` du navigateur.

## *@wachaon/webdriver*

Ce sera un package qui envoie des requêtes au *web driver* qui exploite le navigateur. *@wachaon/edge* inclut *@wachaon/webdriver* .

### Installez *@wachaon/webdriver*

```bat
wes install @wachaon/webdriver --bare
```

Téléchargez le pilote Web *Microsoft Edge* basé sur *Chromium* *web driver(msedgedriver.exe)* si vous ne l'avez pas. De même, si la version d' *edge* et la version du *web driver(msedgedriver.exe)* sont différentes, téléchargez la même version du *web driver(msedgedriver.exe)* .

```bat
wes webdriver --download
```

### Comment utiliser *@wachaon/webdriver*

Accédez au site [*yahoo JAPAN*](https://www.yahoo.co.jp/) et enregistrez une capture d'écran d'un élément de bloc spécifique.

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
