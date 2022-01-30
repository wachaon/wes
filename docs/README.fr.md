# *WES*


*wes* est un framework pour exécuter *ECMAScript* sur une ligne de commande *Windows Script Host* .


Le texte original du *README* est en [*japanese*](/README.md) . Autre que le japonais, c'est une phrase traduite automatiquement.  
Veuillez sélectionner des phrases dans d'autres langues parmi les suivantes.


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



# Caractéristiques


-   Changez le moteur de script de *Windows Script Host* en *Chakra* et exécutez *ECMAScript2015* 2015
-   Il exécute toujours 32 bits *cscript.exe* , il n'y a donc pas de bogues inhérents à l'environnement 64 bits.
-   Importez le module avec `require` (correspondant au *es module* de *ver 0.9.0* )
-   Sortie des caractères colorés sur la sortie standard
-   Devine et lit automatiquement l'encodage du fichier texte


# Problèmes connus que nous ne pouvons pas résoudre


-   `WScript.Quit` ne peut pas interrompre le programme et ne renvoie pas de code d'erreur
-   Le traitement asynchrone tel que `setTimeout` et `Promise` n'est pas possible
-   Le *event prefix* du deuxième argument de `WScript.CreateObject` ne peut pas être utilisé


# Installer


Wes n'a besoin que du *wes* *wes.js* . Pour télécharger, lancez une invite de commande et entrez la commande suivante.


```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```


*WScript.Shell* utilise `SendKeys` de *wes* lors de l'exécution en tant qu'implémentation. Si le chemin du répertoire où *wes.js* est enregistré contient des caractères autres que *ascii* , `SendKeys` ne pourra pas envoyer la clé correctement et le script ne pourra pas être exécuté.  
Veuillez configurer le chemin de destination de sauvegarde de *wes.js* uniquement *ascii* .


## Usage


Sur la ligne de commande, spécifiez le fichier qui sera le point de départ du programme après `wes` . L'extension de script *.js* peut être omise.


```shell
wes index
```


De plus, *wes* a un *REPL* , donc si vous le démarrez uniquement avec `wes` , vous pouvez entrer le script directement.


```shell
wes
```


Les scripts seront acceptés jusqu'à ce que vous saisissiez deux lignes vides. Vous pouvez également vérifier l'exécution de l'exemple de script dans *README.md* avec *REPL* .


## arguments nommés en ligne de commande


Les options de démarrage de *wes* sont les suivantes.


| nommé              | la description                                     |
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


# système de modules


*wes* prend en charge les systèmes *commonjs module* qui utilisent les systèmes de modules généraux `require()` et *es module* qui utilisent `import` . ( *dynamic import* n'est pas prise en charge car il s'agit d'un traitement asynchrone)


## *commonjs module*


Gérez les modules en attribuant à `module.exports` et en appelant avec `require()` . Pour plus de commodité, il prend également en charge le répertoire *node_modules* .


*wes* `require()` devine automatiquement l'encodage du fichier de module, mais s'il ne devine pas correctement, vous pouvez spécifier l'encodage avec le deuxième argument.


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


Vous pouvez également importer vers *OLE* comme *require* `require('WScript.Shell')` avec require.


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


*Chakra* , qui est le moteur d'exécution du script, interprète la syntaxe telle que `imoprt` , mais il ne peut pas être exécuté tel quel car la méthode de traitement en tant que `cscript` n'est pas définie. *babel* est inclus dans *wes* . Il est exécuté lors de la transpilation séquentielle vers le *es module* . En conséquence, la surcharge de traitement et le gonflement des fichiers augmentent en tant que coût.


Les modules décrits par le *es module* sont également convertis par transpilation en `require()` , ainsi *OLE* peut être appelé. Cependant, il ne prend pas en charge la spécification de codage de fichier de module. Tous sont lus par devinette automatique.


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


# objets intégrés


*wes* a *built-in objects* que *WSH (JScript)* n'a pas.


## *console*


`WScript.Echo` utilise *console* au lieu de *wes* ou `WScript.StdErr.WriteLine` .


Affiche des caractères sur la ligne de commande dans `console.log` . Il prend également en charge les chaînes formatées. Imprime une chaîne formatée à l'aide de l'opérateur de formatage `%` .


```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```


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


# modules intégrés


*wes* a *built-in modules* pour simplifier et standardiser le traitement de base.


## *ansi*


`ansi` a un *ANSI escape code* qui vous permet de changer la couleur et l'effet de la sortie standard. Les couleurs et les effets peuvent varier selon le type et les paramètres de l'application console utilisée.


```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```


Vous pouvez également créer vos propres couleurs avec `ansi.color()` et `ansi.bgColor()` . L'argument utilise *RGB* tel que `255, 165, 0` ou *color code* tel que `'#FFA500'` . Il ne prend pas en charge *color name* tels que `orange` .


```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```


## *argv*


Obtient l'argument de ligne de commande. Les arguments de ligne de commande dans `cscript.exe` déclarent des arguments nommés avec `/` `--` tandis que *wes* des arguments nommés avec `-` et -.


*argv.unnamed* et *argv.named* le type de valeur de l'argument de ligne de commande en l'un des *String* *Number* *Boolean* .


Entrez les arguments de ligne de commande avec le *REPL* .


```shell
wes REPL aaa -bcd eee --fgh=iii jjj --kln mmm
```


Exécutez le script suivant dans le *REPL* .


```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```


## *pathname*


Exploitez le chemin.


Les chemins commençant par `/` et `\` font généralement référence à des chemins relatifs à la racine du lecteur. Par exemple, `/filename` et `C:/filename` peuvent se trouver sur le même chemin. Pour des raisons de sécurité, `wes` interprète les chemins commençant par `/` et `\` comme relatifs au répertoire de travail.


```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```


## *filesystem*


Exploiter des fichiers et des répertoires. `readTextFileSync` devine et lit automatiquement l'encodage du fichier.


```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```


## *chardet*


J'utilise certaines fonctionnalités de <https://github.com/runk/node-chardet> .


Vous pouvez améliorer la précision de l'estimation automatique en augmentant les caractères spécifiques à l'encodage.


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


La requête *httprequest* *http request* comme son nom l'indique.


```javascript
const request = require('httprequest')
const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log('%O', JSON.parse(content))
```


## *minitest*


*minitest* peut écrire des tests simples.


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


*pipe* simplifie le traitement des tuyaux.


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


Déterminez le type de script.


```javascript
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```


# Regrouper et installer le module


Avec *install* , vous pouvez installer le module pour *wes* publié sur *github* . Vous aurez besoin d'un *github repository* pour publier le module. De plus, le nom du référentiel et le nom du répertoire local doivent être identiques.


## *bundle*


Lors de la publication d'un module sur *github* , *bundle* regroupe le module requis et le modifie dans un format pouvant être importé par le module d' *install* .


Pour des raisons de sécurité, *wes* n'importe pas de modules dans un format exécutable directement, créez donc un fichier *.json* avec le module *bundle* .


Il y a certaines conditions pour regrouper des modules.


1.  Un seul type de module peut être publié dans un *repository* .
2.  Le nom du référentiel sur *github* et le nom du répertoire de travail local doivent être identiques.
3.  Le référentiel doit être public si vous souhaitez publier le module à un tiers.
4.  *wes* interprète dynamiquement le chemin du module. Les modules acquis par `require` des conditions spécifiques telles que `if` les instructions ne peuvent pas être regroupées.
5.  *.json* sera créé dans votre répertoire de travail avec le nom *directory_name.json* . Il ne peut pas être installé si le fichier est renommé ou si le fichier est déplacé.
6.  `node_modules/directory_name` , le bundle échoue car il fait référence à `directory_name.json` .


## *install*


Utilisé pour installer le fichier de module pour *wes* publié sur *github* .


### usage


Passez les arguments à *install* au format `@author/repository` .


```shell
wes install @wachaon/fmt
```


*install* a des options.


| nommé      | nommé court | la description                                            |
| ---------- | ----------- | --------------------------------------------------------- |
| `--bare`   | `-b`        | Ne pas créer de dossier *@author*                         |
| `--global` | `-g`        | Installez le module dans le dossier où se trouve *wes.js* |


`--bare` peut omettre l'argument `require` de `author@repository` à `repository` . `--global` rend les modules installés disponibles pour tous les scripts. Les options ci-dessus doivent être spécifiées en même temps que l'option de sécurité *wes* `--unsafe` ou `--dangerous` .


```shell
wes install @wachaon/fmt --bare --unsafe
```


# Installer le module de dépôt privé


*install* peut être installé non seulement dans des modules de dépôts publics sur *github* , mais également dans des dépôts privés.


Dans *install* , spécifiez le module avec `author@repository` . L'implémentation télécharge les éléments suivants.


```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```


Lorsque vous accédez à *raw* du référentiel privé avec un navigateur, le *token* s'affiche, alors copiez le *token* et utilisez-le.


Vous pouvez également installer un module dans un référentiel privé en l'exécutant sur la ligne de commande pendant la durée de vie du *token* .


```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```


# Module externe


Voici quelques modules externes.


## *@wachaon/fmt*


*@wachaon/fmt* regroupe *prettier* joliment et formate le script. De plus, si une erreur de syntaxe se produit avec @ `SyntaxError` *@wachaon/fmt* installé, vous pouvez indiquer l'emplacement de l'erreur.


### installer


```shell
wes install @wachaon/fmt
```


### usage


S'il y a *.prettierrc* (format JSON) dans le répertoire de travail, cela sera reflété dans le paramètre. Il peut être utilisé à la fois avec *CLI* (interface de ligne de commande) et *module* dans *fmt* .


Utilisé comme *CLI* .


```shell
wes @wachaon/fmt src/sample --write
```


| numéro anonyme | la description                                                |
| -------------- | ------------------------------------------------------------- |
| 0              | ――――                                                          |
| 1              | Obligatoire. Le chemin du fichier que vous souhaitez formater |


| nommé     | nommé court | la description         |
| --------- | ----------- | ---------------------- |
| `--write` | `-w`        | Autoriser l'écrasement |


Remplacez le fichier par un script formaté si vous spécifiez un argument nommé `--write` ou `-w` .


### Lorsqu'il est utilisé comme *module*


### `option`


```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')

const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```


## `@wachaon/edge`


*Internet Explorer* terminera la prise en charge avec le 15/06/2022. En conséquence, il devient impossible de faire fonctionner l'application avec `require('InternetExplorer.Application')` .


Une alternative serait de faire fonctionner *Microsoft Edge based on Chromium* via le *web driver* . `@wachaon/edge` simplifie le pilote automatique *Edge* .


### installer


Tout d'abord, installez le module.


```shell
wes install @wachaon/edge --unsafe --bare
```


Ensuite, téléchargez le *web driver* .


```shell
wes edge
```


Décompressez le *zip* téléchargé et déplacez *msedgedriver.exe* dans le répertoire actuel.


### usage


Il sera facile à utiliser.


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


Ce script génère les *URL* visitées à l'invite de commande dans l'ordre.


`@wachaon/edge` enregistre un événement pour l' *URL* et ajoute des données à `res.exports` . L' *URL* à enregistrer peut être soit `String` `RegExp` , et des paramètres flexibles peuvent être définis.


En le rendant piloté par les événements, il est possible de passer facilement au fonctionnement manuel en ne définissant pas l' *URL* pour les processus difficiles à gérer avec le pilote automatique.


Si vous souhaitez arrêter le script, exécutez `navi.emit('terminate', res)` ou terminez manuellement *Edge* .


Le processus de terminaison `res.exports` sous la forme d'un fichier *.json* comme valeur par défaut. Si vous souhaitez définir le processus de terminaison, définissez `terminate` of `edge(callback, terminate)` .
