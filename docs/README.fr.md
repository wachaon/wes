# *WES*


*wes* est un framework de console pour exécuter *ECMAScript* sur *WSH (Windows Script Host)* . Le [*japanese*](/README.md) original du *README* sera en japonais. Les textes autres que le japonais seront traduits automatiquement.  
Pour les textes dans d'autres langues, veuillez sélectionner l'une des options ci-dessous.


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


-   Vous pouvez changer le moteur de script en *Chakra* et écrire selon les spécifications *ECMAScript2015* .
-   Étant donné que *cscript.exe* 32 bits est toujours exécuté, il n'y a pas de problème unique dans un environnement 64 bits.
-   Puisqu'il existe un système de modules, il peut être développé plus efficacement que le *WSH* conventionnel
-   Les modules intégrés prennent en charge le traitement de base tel que l'entrée/sortie de fichiers et la sortie de texte coloré vers la console
-   Vous pouvez laisser la lecture du fichier deviner automatiquement l'encodage, vous n'avez donc pas à vous soucier de l'encodage, etc.
-   Modules de package pour prendre en charge la publication et la récupération externes


# Problèmes *wes* que nous ne pouvons pas résoudre


-   `WScript.Quit` ne peut pas interrompre le programme et ne renvoie pas de code d'erreur
-   Le traitement asynchrone tel que `setTimeout` et `Promise` n'est pas possible
-   Vous ne pouvez pas utiliser le *event prefix* du deuxième argument de `WScript.CreateObject`


# Télécharger


Wes n'a besoin que du *wes* *wes.js* . Pour télécharger, copiez *wes.js* depuis [*@wachaon/wes*](https://github.com/wachaon/wes) ou exécutez la commande suivante dans votre console.


```bat
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```


Nous utilisons `SendKeys` *wes* *WScript.Shell* lors de l'exécution en tant qu'implémentation. Si le chemin du répertoire où *wes.js* est enregistré contient des caractères autres que *ascii* , `SendKeys` ne peut pas envoyer la clé correctement et le script ne peut pas être exécuté.  
Configurez le chemin *wes.js* est stocké en *ascii* uniquement. Si vous avez déjà téléchargé *wes* , vous pouvez le mettre à jour avec la commande suivante.


```bat
wes update
```


# Usage


Entrez le mot-clé `wes` et la commande spécifiant le fichier qui sera le point de départ du programme vers la console. L'extension de script *.js* peut être omise.


```bat
wes index
```


De plus, étant donné que *wes* est équipé de *REP* , vous pouvez entrer des scripts directement en démarrant `wes` seul.


```bat
wes
```


*REP* accepte l'entrée de script jusqu'à ce que vous saisissiez deux lignes vides. Vous pouvez également voir *REP* exécuter les exemples de scripts dans *README.md* .


## options de ligne de commande


Les options de démarrage de *wes* sont les suivantes.


| nommé              | La description                                     |
| ------------------ | -------------------------------------------------- |
| `--monotone`       | Élimine *ANSI escape code*                         |
| `--safe`           | exécuter le script en mode sans échec              |
| `--usual`          | Exécuter le script en mode normal (par défaut)     |
| `--unsafe`         | exécuter le script en mode non sécurisé            |
| `--dangerous`      | exécuter le script en mode dangereux               |
| `--debug`          | exécuter le script en mode débogage                |
| `--encoding=UTF-8` | Spécifie l'encodage du premier fichier lu          |
| `--engine=Chakra`  | Cette option est ajoutée automatiquement par *wes* |


`--safe` `--usual` `--unsafe` `--dangerous` `--debug` est incomplète, mais les arguments nommés sont réservés.


# système de modules


*wes* prend en charge deux systèmes de modules, le système de *commonjs module* utilisant `require()` et le système de *es module* utilisant les `import` . ( *dynamic import* n'est pas prise en charge car il s'agit d'un processus asynchrone)


## *commonjs module*


Gérez les modules en attribuant à `module.exports` et en appelant `require()` . Les chemins autres que les chemins absolus et les chemins relatifs commençant par `./` ​​et `../` recherchent les modules dans le répertoire *wes_modules* et commodément le répertoire *node_modules* . Le `require()` de *wes* devine automatiquement l'encodage du fichier de module, mais vous pouvez spécifier l'encodage avec le deuxième argument s'il ne devine pas correctement.


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


*Chakra* , qui est le moteur d'exécution de script, interprète une syntaxe telle que `imoprt` , mais il ne peut pas être exécuté tel quel car la méthode de traitement en tant que `cscript` n'est pas définie. Dans *wes* , en ajoutant *babel* aux modules intégrés, les modules *es module* sont également exécutés tout en étant transpilés un par un. Cela nous coûte des frais généraux de traitement et un fichier *wes.js* gonflé. Les modules écrits dans le *es module* sont également convertis en `require()` par transpilation, il est donc possible d'appeler *COM Object* . Cependant, il ne prend pas en charge la spécification de l'encodage du fichier de module avec *es module* . Tout est chargé automatiquement. Pour le charger en tant que *es module* , définissez l'extension sur `.mjs` ou définissez le champ `"type"` dans `package.json` sur `"module"` .


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


`WScript.Echo` utilise *console* au lieu de *wes* et `WScript.StdErr.WriteLine` . Sortez les caractères sur la console avec `console.log` . Il prend également en charge les chaînes formatées. Génère une chaîne formatée à l'aide de l'opérateur de formatage `%` .


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


`WScript.StdOut.WriteLine` *wes* de `WScript.StdErr.WriteLine` pour générer des chaînes colorées. `WScript.Echo` et `WScript.StdOut.WriteLine` sont bloqués. `WScript.StdErr.WriteLine` ou `console.log` .


## *Buffer*


Vous pouvez gérer les tampons.


```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```


## `__dirname` et `__filename`


`__filename` stocke le chemin du fichier de module en cours d'exécution. `__dirname` contient le répertoire de `__filename` .


```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```


# Module intégré


*wes* a *built-in modules* pour simplifier et standardiser le traitement de base.


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
wes REP aaa -bcd eee --fgh=iii jjj --kln mmm
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


Manipulez les chemins. Les chemins commençant par `/` et `\` sont généralement relatifs à la racine du lecteur. Par exemple `/filename` et `C:/filename` peuvent être le même chemin. Pour des raisons de sécurité, `wes` interprète les chemins commençant par `/` et `\` par rapport au répertoire de travail.


```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```


## *filesystem*


Manipuler des fichiers et des répertoires. `readTextFileSync` devine automatiquement l'encodage du fichier et le lit.


```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```


## *chardet*


J'utilise certaines fonctionnalités de <https://github.com/runk/node-chardet> . Vous pouvez augmenter la précision de l'auto-estimation en augmentant les caractères spécifiques à l'encodage.


## *JScript*


Si vous changez le moteur de script en *Chakra* , vous ne pourrez pas utiliser les *Enumerator* spécifiques à *JScript* , etc. Le module intégré *JScript* les rend disponibles. Cependant, *Enumerator* renvoie un *Array* , pas un *Enumerator object* .


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


### Usage


Grouper avec `describe` , tester avec `it` vérifier avec `assert` . `pass` sera un tableau du nombre d'occurrences de celui- `it` et du nombre de passes.


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


### affirmation


#### `assert(value, message)` `assert.ok(value, message)`


Comparez à `true` avec l'opérateur d'égalité stricte `===` . Si `value` est une fonction, évalue le résultat de l'exécution de la fonction.


| Param     | Taper                 | La description                             |
| :-------- | :-------------------- | :----------------------------------------- |
| `value`   | `{Function\|Boolean}` | fonction booléenne ou renvoyant un booléen |
| `message` | `{String}`            | message en cas de panne                    |


#### `assert.equal(expected, actual)`


Compare les objets pour l'égalité des membres, pas par référence.  
NaN `true` `NaN === NaN` `function (){} === function (){}` `/RegExp/g === /RegExp/g` et `{one: {two: 2}} === {one: {two: 2}}` `[1,2,3] === [1,2,3]` etc.  
Lors de la comparaison de classes (objets), elles doivent avoir le même constructeur ou une superclasse dont `actual` est `expected` .


| Param      | Taper   | La description  |
| :--------- | :------ | :-------------- |
| `expected` | `{Any}` | valeur attendue |
| `actual`   | `{Any}` | Valeur actuelle |


#### `assert.throws(value, expected, message)`


Vérifiez que l'erreur est générée correctement.  
Le fait que l'erreur soit correcte ou non est déterminé par le fait que le *constructor* d'erreur attendu, *message* est égal et que l'expression régulière réussit l'évaluation de la *stack* .


| Param      | Taper                     | La description                                                                                   |
| :--------- | :------------------------ | :----------------------------------------------------------------------------------------------- |
| `value`    | `{Error}`                 | Erreur                                                                                           |
| `expected` | `{Error\|String\|RegExp}` | Une expression régulière qui évalue le *constructor* , *message* ou la *stack* d'erreur attendus |
| `message`  | `{String}`                | message en cas de panne                                                                          |


## *pipe*


*pipe* simplifie la tuyauterie.


### Usage


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


Déterminez le type de script.


### Usage


```javascript
const { isString, isNumber, isBoolean, isObject } = require('typecheck')
const log = require('log')
log(() => isString("ECMAScript"))
log(() => isNumber(43.5))
log(() => isBoolean(false))
log(() => isObject(function(){}))
```


## *animate*


*animate* permet d'animer l'affichage de la console.


### Usage


Si le traitement prend beaucoup de temps, il serait bien d'afficher la progression sous forme d'animation sur la console.


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


Exécute la fonction `complete` lorsque toutes les files d'attente sont complètes ou lorsque `stop()` est appelé.


#### `static genProgressIndicator(animation)`


Générez une fonction qui affiche une animation de cyclisme.


#### `register(callback, interval, conditional)`


Traitement des registres. Plusieurs processus peuvent être enregistrés et traités en parallèle. Dans le `callback` , nous demanderons d'arrêter l'animation et d'écrire la vue à afficher. `interval` spécifie l'intervalle de traitement. Si la `conditional` est une fonction, elle exécutera `conditional(count, queue)` et si le résultat est vrai, elle continuera. La `conditional` exécute `decrement(count)` s'il s'agit d'un nombre et continue si le résultat est un nombre positif. S'exécute une seule fois si `conditional` n'est pas défini. Notez que la spécification d'une fonction augmente le `count` , tandis que la spécification d'un nombre diminue le `count` .


#### `stop()`


*animate* .


#### `cancel(queue)`


Suspend le traitement d'une file d'attente spécifique.


#### `run()`


Lancer l'animation.


#### `view`


Spécifie les caractères qui sont imprimés sur la console. Changez de personnage à intervalles réguliers. Attribuez *Arrary* ou *String* à `view` . Une *String* est utile lors de la mise à jour d'une seule animation, et un *Array* est utile lors de l'animation de plusieurs lignes individuellement.


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


Obtenez le type de membre et la description de *COM Object* à partir de *ProgID* .


### Usage


```javascript
const getMember = require('getMember')
const FileSystemObject = 'Scripting.FileSystemObject'
console.log('require("%S") // => %O', FileSystemObject, getMember(FileSystemObject))
```


## *zip*


Compresse les fichiers et les dossiers et décompresse les fichiers compressés. En interne, *PowerShell* est appelé et traité.


### Usage


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
| `1`     | `path` ou fichier à saisir                  |
| `2`     | fichier de dossier vers la `dest` de sortie |


| nommé    | nommé court | La description                              |
| -------- | ----------- | ------------------------------------------- |
| `--path` | `-p`        | `path` ou fichier à saisir                  |
| `--dest` | `-d`        | fichier de dossier vers la `dest` de sortie |


# Regroupement (conditionnement) et installation de modules


Dans *wes* , un bundle de plusieurs modules est appelé un package. Vous pouvez installer le package pour *wes* publié sur *github* . Un *github repository* est requis pour publier un package. De plus, le nom du référentiel et le nom du répertoire local doivent être identiques.


## *bundle*


Lors de la publication d'un package sur *github* , *bundle* regroupe les modules nécessaires et les modifie dans un format pouvant être inclus par l'installation. Pour des raisons de sécurité, *bundle* crée un *wes* *.json* car nous ne vous permettons pas d'importer des packages directement exécutables. Il y a certaines conditions pour l'emballage.


1.  Un seul package peut être publié dans un *repository*

2.  Veuillez utiliser le même nom pour le nom du référentiel *github* et le nom du répertoire de travail local

3.  Rendez le référentiel *public* si vous souhaitez publier le package

4.  Déclarer l'acquisition du module dans le périmètre de niveau supérieur

5.  Un fichier *.json* pour le package est créé dans le répertoire de travail avec le nom *directory_name.json* . Si vous modifiez le nom du fichier ou déplacez le fichier, vous ne pouvez pas vous y référer pendant l'installation.

6.  `node_modules/directory_name` est le point de départ du bundle

    ```bat
        wes bundle directory_name
    ```

    sans grouper avec

    ```bat
        wes bundle node_modules/directory_name
    ```

    Veuillez regrouper avec


## *install*


Utilisé pour installer le package pour *wes* publié sur *github* . À partir de la `version 0.10.28` , le dossier d'installation est modifié de `node_modules` à `wes_modules` . Si vous souhaitez installer dans `node_modules` ajoutez l'option `--node` .


### Usage


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
| `--node`      | `-n`        | Installer dans le dossier *node_module*                                                 |


`--bare` peut omettre l'argument `require` de `author@repository` à `repository` . `--global` rend les packages installés disponibles pour tous les scripts. `--node` ou `-n` doit être spécifiée avec l'option de sécurité *wes* `--unsafe` ou `--dangerous` .


```bat
wes install @wachaon/fmt --bare --unsafe
```


# Installation de packages à partir de référentiels privés


*install* peut installer non seulement des packages à partir de référentiels *github* publics, mais également des packages à partir de référentiels privés. Dans *install* , spécifiez le package avec *@author/repository* . L'implémentation tente de télécharger l'URL suivante.


```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```


Si vous accédez au référentiel privé *raw* avec un navigateur, le *token* sera affiché, alors copiez le *token* et utilisez-le. Vous pouvez également installer des packages à partir de référentiels privés en les exécutant dans la console pendant que le *token* est valide.


```bat
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```


# Présentation du forfait


Voici quelques packages externes.


## *@wachaon/fmt*


*@wachaon/fmt* est *prettier* emballé pour *wes* pour formater les scripts. De plus, si une *Syntax Error* se produit pendant *@wachaon/fmt* , vous pouvez afficher l'emplacement de l'erreur.


### installer


```bat
wes install @wachaon/fmt
```


### Usage


S'il y a *.prettierrc* (format JSON) dans le répertoire de travail, cela sera reflété dans les paramètres. *fmt* est disponible à la fois dans la *CLI* et dans le *module* .


#### Utiliser comme *CLI* .


```bat
wes @wachaon/fmt src/sample --write
```


| numéro anonyme | La description                                                |
| -------------- | ------------------------------------------------------------- |
| 0              | -                                                             |
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


*Internet Explorer* mettra fin au support le 15 juin 2022. Parallèlement à cela, on s'attend à ce que le fonctionnement de l'application avec `require('InternetExplorer.Application')` devienne également impossible. Une alternative serait de travailler avec *Microsoft Edge based on Chromium* via le *web driver* . `@wachaon/edge` *Edge* le pilotage automatique des bords.


### installer


Installez d'abord le paquet.


```bat
wes install @wachaon/edge --unsafe --bare
```


Ensuite, téléchargez le *web driver* .


```bat
wes edge --download
```


Vérifiez la version d' *Edge* installée et téléchargez le *web driver* correspondant.


### Usage


Il sera facile à utiliser.


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


Ce script imprime les *URL* visitées sur la console dans l'ordre. `@wachaon/edge` enregistre les événements pour *URL* et ajoute des données à `res.exports` . L' *URL* à enregistrer peut être soit `String` `RegExp` , et peut être définie de manière flexible. En le rendant piloté par les événements, vous pouvez facilement passer au fonctionnement manuel en ne définissant pas d'événements pour les processus difficiles à gérer avec le pilote automatique. Si vous souhaitez que le script s'arrête, `navi.emit('terminate', res)` ou terminez *Edge* manuellement. La finalisation génère par défaut `res.exports` sous la forme d'un fichier *.json* . Si vous souhaitez définir le traitement de terminaison, définissez `terminate` of `edge(callback, terminate)` . `window` est une instance de la classe *Window* de *@wachaon/webdriver* , et non la `window` du navigateur.


## *@wachaon/webdriver*


Ce sera un package qui envoie des requêtes au *web driver* qui exploite le navigateur. Construit en *@wachaon/edge* . Comme avec *@wachaon/edge* , un *web driver* distinct est requis pour le fonctionnement du navigateur.


### installer


```bat
wes install @wachaon/webdriver --unsafe --bare
```


Téléchargez le *web driver* *Microsoft Edge* basé sur *Chromium* si vous ne l'avez pas. De même, si la version d' *edge* et la version du *web driver* sont différentes, téléchargez la même version du *web driver* .


```bat
wes webdriver --download
```
