# *WES*

*wes* est un framework de console qui exécute *ECMAScript* sur *WSH (Windows Script Host)* . Le texte original du *README* est en [*japanese*](/README.md) . Autre que le japonais, c'est une phrase traduite par machine.  
Veuillez sélectionner des phrases dans d'autres langues parmi les suivantes.

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

-   Vous pouvez changer le moteur de script en *Chakra* et l'écrire dans la spécification *ECMAScript2015*
-   Il exécute toujours *cscript.exe* 32 bits, il n'y a donc pas de problèmes inhérents à l'environnement 64 bits.
-   Avec un système modulaire, vous pouvez développer plus efficacement que le *WSH* traditionnel
-   Le module intégré prend en charge le traitement de base tel que l'entrée/sortie de fichier et la sortie de caractères colorés vers la console.
-   Vous n'avez pas à vous soucier de l'encodage car vous pouvez faire en sorte que le fichier lu devine automatiquement l'encodage.
-   Nous emballons également des modules pour prendre en charge la publication et la récupération externes.

# Problèmes *wes* que nous ne pouvons pas résoudre

-   `WScript.Quit` ne peut pas interrompre le programme et ne renvoie pas de code d'erreur
-   Le traitement asynchrone tel que `setTimeout` et `Promise` n'est pas possible
-   Vous ne pouvez pas utiliser le *event prefix* comme deuxième argument de `WScript.CreateObject`

# Télécharger

Wes n'a besoin que du *wes* *wes.js* . Pour télécharger, copiez *wes.js* depuis [*@wachaon/wes*](https://github.com/wachaon/wes) ou exécutez la commande suivante dans la console.

```bat
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

*WScript.Shell* utilise `SendKeys` dans *wes* lors de l'exécution en tant qu'implémentation. Si le chemin du répertoire où *wes.js* est enregistré contient des caractères autres que *ascii* , `SendKeys` ne pourra pas envoyer la clé correctement et le script ne pourra pas être exécuté.  
Veuillez configurer le chemin de destination de sauvegarde de *wes.js* uniquement *ascii* . Si vous avez déjà téléchargé *wes* , vous pouvez le mettre à jour avec la commande suivante.

```bat
wes update
```

# Comment utiliser

Entrez la commande de la console qui spécifie le fichier qui sera le point de départ du programme après le mot-clé `wes` . L'extension de script *.js* peut être omise.

```bat
wes index
```

De plus, *wes* a un *REP* , donc si vous le démarrez uniquement avec `wes` , vous pouvez entrer directement le script.

```bat
wes
```

*REP* accepte l'entrée de script jusqu'à ce que vous saisissiez deux lignes vides. Vous pouvez également vérifier l'exécution de l'exemple de script dans *README.md* avec *REP* .

## Options de ligne de commande

Les options de démarrage de *wes* sont les suivantes.

| nommé              | La description                                     |
| ------------------ | -------------------------------------------------- |
| `--monotone`       | Éliminer *ANSI escape code*                        |
| `--safe`           | Exécutez le script en mode sans échec              |
| `--usual`          | Exécuter le script en mode normal (par défaut)     |
| `--unsafe`         | Exécutez le script en mode non sécurisé            |
| `--dangerous`      | Exécutez le script en mode dangereux               |
| `--debug`          | Exécuter le script en mode débogage                |
| `--encoding=UTF-8` | Spécifie l'encodage du premier fichier à lire      |
| `--engine=Chakra`  | Cette option est automatiquement ajoutée par *wes* |

L'implémentation de `--safe` `--usual` `--unsafe` `--dangerous` `--debug` est incomplète, mais les arguments nommés sont réservés.

# Système modulaire

*wes* prend en charge deux systèmes de modules, un système *commonjs module* qui utilise `require()` et un *es module* qui utilise `import` . ( *dynamic import* est un traitement asynchrone, elle n'est donc pas prise en charge)

## *commonjs module*

Gérez les modules en attribuant à `module.exports` et en appelant avec `require()` . Pour les chemins autres que les chemins absolus et les chemins relatifs commençant par `./` ​​et `../` , recherchez les modules dans le répertoire *wes_modules* et, pour plus de commodité, le répertoire *node_modules* . *wes* `require()` devine automatiquement l'encodage du fichier de module, mais s'il ne devine pas correctement, vous pouvez spécifier l'encodage avec le deuxième argument.

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

Vous pouvez également importer vers *ActiveX* avec *require* `require('WScript.Shell')` .

```javascript
const Shell = require('Shell.Application')
Shell.MinimizeAll()
WScript.Sleep(2000)
Shell.UndoMinimizeAll()
```

## *es module*

*Chakra* , qui est le moteur d'exécution du script, interprète la syntaxe telle que `imoprt` , mais il ne peut pas être exécuté tel quel car la méthode de traitement en tant que `cscript` n'est pas définie. Dans *wes* , en ajoutant *babel* au module intégré, nous l'exécutons tout en transpilant séquentiellement vers le *es module* . Par conséquent, la surcharge de traitement et le fichier *wes.js* sont gonflés en tant que coût. Les modules décrits par le *es module* sont également transpilés en `require()` , de sorte que les appels *ActiveX* sont possibles. Cependant, il ne prend pas en charge la spécification de codage du fichier de module dans *es module* . Tous sont lus par devinette automatique. Pour le charger en tant que *es module* , définissez l'extension sur `.mjs` ou le champ `"type"` de `package.json` sur `"module"` .

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

# Objet intégré

*wes* a *built-in objects* que *WSH (JScript)* n'a pas.

## *console*

*wes* utilise *console* au lieu de `WScript.Echo` ou `WScript.StdErr.WriteLine` . Affiche les caractères sur la console dans `console.log` . Il prend également en charge les chaînes formatées. Imprime une chaîne formatée à l'aide de l'opérateur de formatage `%` .

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
| `%o`                    | Vidage d'objet                   |
| `%O`                    | Vidage d'objet (indenté coloré)  |

`WScript.StdOut.WriteLine` *wes* de `WScript.StdErr.WriteLine` pour générer des chaînes colorées. `WScript.Echo` et `WScript.StdOut.WriteLine` sont bloqués en sortie. `WScript.StdErr.WriteLine` ou `console.log` .

## *Buffer*

Peut gérer les tampons.

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```

## `__dirname` et `__filename`

`__filename` contient le chemin du fichier de module en cours d'exécution. `__dirname` contient le répertoire de `__filename` .

```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```

# Module intégré

*wes* a *built-in modules* pour simplifier et standardiser le traitement de base.

## *ansi*

`ansi` est un *ANSI escape code* qui vous permet de changer la couleur et l'effet de la sortie standard. Les couleurs et les effets peuvent varier selon le type et les paramètres de l'application console utilisée.

```javascript
const { redBright, yellow } = require('ansi')
const message = 'File does not exist'
console.log(redBright + 'Error: ' + yellow + message)
```

Vous pouvez également créer vos propres couleurs avec `ansi.color()` et `ansi.bgColor()` . L'argument utilise *RGB* tel que `255, 165, 0` ou *color code* tel que `'#FFA500'` . Il ne prend pas en charge *color name* tels que `orange` .

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

## *argv*

Obtient l'argument de ligne de commande. Les arguments de ligne de commande dans `cscript.exe` déclarent des arguments nommés avec `/` `--` tandis que *wes* des arguments nommés avec `-` et -. *argv.unnamed* et *argv.named* le type de valeur de l'argument de ligne de commande en l'un des *String* *Number* *Boolean* . Entrez les arguments de la ligne de commande avec le *REP* .

```bat
wes REP aaa -bcd eee --fgh=iii jjj --kln mmm
```

Exécutez le script suivant dans *REP* .

```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```

## *pathname*

Exploitez le chemin. Les chemins commençant par `/` et `\` font généralement référence à des chemins relatifs à la racine du lecteur. Par exemple, `/filename` et `C:/filename` peuvent avoir le même chemin. Pour des raisons de sécurité, `wes` interprète les chemins commençant par `/` et `\` comme relatifs au répertoire de travail.

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

## *filesystem*

Exploiter des fichiers et des répertoires. `readTextFileSync` devine automatiquement l'encodage du fichier et le lit.

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```

## *chardet*

J'utilise certaines fonctionnalités de <https://github.com/runk/node-chardet> . Vous pouvez améliorer la précision de l'estimation automatique en augmentant les caractères spécifiques à l'encodage.

## *JScript*

Si vous changez le moteur de script en *Chakra* , vous ne pourrez pas utiliser l' *Enumerator* spécifique à *JScript* , etc. Le module intégré *JScript* les rend disponibles. Cependant, *Enumerator* renvoie un *Array* au lieu d'un *Enumerator object* .

```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```

*GetObject* agit comme une alternative à `WScript.GetObject` .

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

*VBScript* fournit certaines fonctionnalités que *JScript* n'a pas.

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

*minitest* peut écrire des tests simples. Syntaxe simple, peu d'assertions Revenant au concept de base de la version `0.10.71` , nous avons réduit le nombre de types d'assertions à trois.

### usage

Divisez-vous en groupes avec `describe` , écrivez des tests avec `it` validez avec `assert` . `pass` est un tableau du nombre d'occurrences de celui- `it` et du nombre de passes.

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

Comparez `true` avec l'opérateur d'égalité exacte `===` . Si `value` est une fonction, évalue le résultat de l'exécution de la fonction.

| Param     | Taper       | La description         |
| :-------- | :---------- | :--------------------- |
| `value`   | \`{Fonction | Booléen} \`            |
| `message` | `{String}`  | Message en cas d'échec |

#### `assert.equal(expected, actual)`

Compare des objets selon que leurs membres sont équivalents, et non par référence.  
NaN `true` `NaN === NaN` `function (){} === function (){}` `/RegExp/g === /RegExp/g` et `{one: {two: 2}} === {one: {two: 2}}` `[1,2,3] === [1,2,3]` etc. également tenir.  
Lors de la comparaison de classes (objets), le même constructeur ou `actual` doit être une superclasse de `expected` .

| Param      | Taper   | La description  |
| :--------- | :------ | :-------------- |
| `expected` | `{Any}` | Valeur attendue |
| `actual`   | `{Any}` | Valeur actuelle |

#### `assert.throws(value, expected, message)`

Vérifiez que l'erreur est générée correctement.  
Le fait que l'erreur soit correcte est déterminé par le fait qu'il s'agit du *constructor* de l'erreur attendue ou si le *message* est équivalent et que l'expression régulière réussit l'évaluation de la *stack* .

| Param      | Taper      | La description         |
| :--------- | :--------- | :--------------------- |
| `value`    | `{Error}`  | Erreur                 |
| `expected` | \`{Erreur  | Chaîne de caractères   |
| `message`  | `{String}` | Message en cas d'échec |

## *pipe*

*pipe* simplifie le traitement des tuyaux.

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

```javascript
const { isString, isNumber, isBoolean, isObject } = require('typecheck')
const log = require('log')
log(() => isString("ECMAScript"))
log(() => isNumber(43.5))
log(() => isBoolean(false))
log(() => isObject(function(){}))
```

## *zip*

Compressez les fichiers et les dossiers et décompressez les fichiers compressés. Il appelle *PowerShell* en interne et le traite.

```javascript
const {zip, unzip} = require('zip')
console.log(zip('docs\\*', 'dox.zip'))
console.log(unzip('dox.zip'))
```

Des caractères génériques `*` peuvent être écrits dans le `path` du `zip(path, destinationPath)` . Il peut être utilisé avec *CLI (Command Line Interface)* et le *module* .

```bat
wes zip docs\* dox.zip
wes zip -p dox.zip
```

Si `path` a l'extension `.zip` , `unzip()` est traité et il n'y a pas de description de l'extension `.zip` . Ou même s'il y a une extension `.zip` , s'il y a une description d'un joker `*` , `zip()` sera traité.

| anonyme | La description                              |
| ------- | ------------------------------------------- |
| `1`     | `path` Dossier ou fichier à saisir          |
| `2`     | fichier de dossier vers la `dest` de sortie |

| nommé    | nommé court | La description                              |
| -------- | ----------- | ------------------------------------------- |
| `--path` | `-p`        | `path` Dossier ou fichier à saisir          |
| `--dest` | `-d`        | fichier de dossier vers la `dest` de sortie |

# Regroupement et installation de modules

Dans *wes* , un bundle de plusieurs modules est appelé un package. Vous pouvez installer le package pour *wes* publié sur *github* . Vous aurez besoin d'un *github repository* pour publier le package. De plus, le nom du référentiel et le nom du répertoire local doivent être identiques.

## *bundle*

Lors de la publication du package sur *github* , *bundle* regroupe les modules requis et modifie le format afin qu'il puisse être importé lors de l'installation. Pour des raisons de sécurité, *bundle* crée un fichier *.json* car *wes* ne vous permet pas d'importer des packages dans un format pouvant être exécuté directement. Il y a certaines conditions pour l'emballage.

1.  Un seul package peut être publié dans un *repository*

2.  Assurez-vous que le nom du référentiel sur *github* et le nom du répertoire de travail local sont identiques.

3.  Si vous publiez le package, veuillez rendre le référentiel *public*

4.  Déclarer l'acquisition du module dans la portée de niveau supérieur

5.  Le fichier de package *.json* est créé dans votre répertoire de travail avec le nom *directory_name.json* . Si vous renommez le fichier ou déplacez le fichier, vous ne pouvez pas vous y référer lors de l'installation.

6.  `node_modules/directory_name` est le point de départ du bundle

    ```bat
        wes bundle directory_name
    ```

    Sans grouper avec

    ```bat
        wes bundle node_modules/directory_name
    ```

    Veuillez regrouper avec

## *install*

Utilisé pour installer le package pour *wes* publié sur *github* . À partir de la `version 0.10.28` , le dossier d'installation passera de `node_modules` à `wes_modules` . Si vous installez sur `node_modules` , ajoutez l'option `--node` .

### Comment utiliser

Passez les arguments à *install* au format `@author/repository` .

```bat
wes install @wachaon/fmt
```

*install* a des options.

| nommé         | nommé court | La description                                                                         |
| ------------- | ----------- | -------------------------------------------------------------------------------------- |
| `--bare`      | `-b`        | Ne pas créer de dossier *@author*                                                      |
| `--global`    | `-g`        | Installez le package dans le dossier où se trouve *wes.js*                             |
| `--save`      | `-S`        | Ajoutez le nom et la version du package au champ *dependencies* de *package.json*      |
| `--save--dev` | `-D`        | Ajoutez le nom et la version du package au champ *devDependencies* dans *package.json* |
| `--node`      | `-n`        | Installer dans le dossier *node_module*                                                |

`--bare` peut omettre l'argument `require` de `author@repository` à `repository` . `--global` rend le package installé disponible pour tous les scripts. `--node` ou `-n` doit être spécifiée en même temps que l'option de sécurité *wes* `--unsafe` ou `--dangerous` .

```bat
wes install @wachaon/fmt --bare --unsafe
```

# Installation de packages dans des dépôts privés

*install* peut installer des packages dans des référentiels privés ainsi que des packages dans des référentiels publics sur *github* . Dans *install* , spécifiez le package avec *@author/repository* . L'implémentation essaiera de télécharger l'URL suivante.

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```

Lorsque vous accédez à *raw* du référentiel privé avec un navigateur, le *token* s'affiche, alors copiez le *token* et utilisez-le. Vous pouvez également installer des packages dans des référentiels privés en les exécutant dans la console pendant la durée de vie du *token* .

```bat
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

# Présentation du paquet

Voici quelques packages externes.

## *@wachaon/fmt*

*@wachaon/fmt* est un *prettier* packagé pour *wes* et formate le script. De plus, si une *Syntax Error* se produit avec *@wachaon/fmt* installé, vous pouvez indiquer l'emplacement de l'erreur.

### installer

```bat
wes install @wachaon/fmt
```

### Comment utiliser

S'il y a *.prettierrc* (format JSON) dans le répertoire de travail, cela sera reflété dans le paramètre. *fmt* peut être utilisé à la fois avec *CLI* et *module* .

#### Utilisé comme *CLI* .

```bat
wes @wachaon/fmt src/sample --write
```

| numéro anonyme | La description                                                |
| -------------- | ------------------------------------------------------------- |
| 0              | ――――                                                          |
| 1              | Obligatoire. Le chemin du fichier que vous souhaitez formater |

| nommé     | nommé court | La description         |
| --------- | ----------- | ---------------------- |
| `--write` | `-w`        | Autoriser l'écrasement |

Remplacez le fichier par un script formaté si vous spécifiez un argument nommé `--write` ou `-w` .

#### Utiliser comme module

```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')
const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```

## *@wachaon/edge*

*Internet Explorer* terminera la prise en charge avec le 15/06/2022. Par conséquent, il est prévu qu'il ne sera pas possible d'utiliser l'application avec `require('InternetExplorer.Application')` . Une alternative serait de faire fonctionner *Microsoft Edge based on Chromium* via le *web driver* . `@wachaon/edge` simplifie le pilote automatique *Edge* .

### installer

Tout d'abord, installez le package.

```bat
wes install @wachaon/edge --unsafe --bare
```

Ensuite, téléchargez le *web driver* .

```bat
wes edge --download
```

Vérifiez la version installée d' *Edge* et téléchargez le *web driver* correspondant.

### Comment utiliser

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

Ce script affichera séquentiellement les *URL* visitées sur la console. `@wachaon/edge` enregistre un événement pour l' *URL* et ajoute des données à `res.exports` . L' *URL* à enregistrer peut être soit `String` `RegExp` , et des paramètres flexibles peuvent être définis. En le rendant événementiel, il est possible de basculer facilement en fonctionnement manuel en ne définissant pas d'événement à traiter difficilement gérable avec le pilote automatique. Si vous souhaitez arrêter le script, exécutez `navi.emit('terminate', res)` ou terminez manuellement *Edge* . Le processus de terminaison `res.exports` sous la forme d'un fichier *.json* comme valeur par défaut. Si vous souhaitez définir le processus de terminaison, définissez `terminate` of `edge(callback, terminate)` . `window` n'est pas une `window` dans le navigateur, mais une instance de la classe *Window* de *@wachaon/webdriver* .

## *@wachaon/webdriver*

Il s'agit d'un package qui envoie une requête au *web driver* qui exploite le navigateur. Intégré à *@wachaon/edge* . Comme *@wachaon/edge* , un *web driver* est requis pour le fonctionnement du navigateur.

### installer

```bat
wes install @wachaon/webdriver --unsafe --bare
```

Si vous ne disposez pas d'un *web driver* *Microsoft Edge* basé sur *Chromium* , téléchargez-le. De même, si la version d' *edge* et la version du *web driver* sont différentes, téléchargez la même version du *web driver* .

```bat
wes webdriver --download
```
