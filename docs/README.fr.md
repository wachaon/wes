# *WES*


*wes* est un framework pour exécuter *ECMAScript* sur *Windows Script Host*


Le texte original du *README* est [*japanese*](docs/README.ja.md) . À part le japonais, c'est une phrase traduite automatiquement.  
Veuillez sélectionner des phrases dans d'autres langues parmi les suivantes.


+  [*簡体字*](README.zh-CN.md) <!-- 中国語 (簡体字) -->
+  [*繁体字*](README.zh-TW.md) <!-- 中国語 (繁体字) -->
+  [*English*](README.en.md) <!-- 英語 -->
+  [*हिन्दी*](README.hi.md) <!-- ヒンディー語 -->
+  [*Español*](README.es.md) <!-- スペイン語 -->
+  [*عربى*](README.ar.md) <!-- アラビア語 -->
+  [*বাংলা*](README.bn.md) <!-- ベンガル語 -->
+  [*Português*](README.pt.md) <!-- ポルトガル語 -->
+  [*русский язык*](README.ru.md) <!-- ロシア語 -->
+  [*Deutsch*](README.de.md) <!-- ドイツ語 -->
+  [*français*](README.fr.md) <!-- フランス語 -->
+  [*italiano*](README.it.md) <!-- イタリア語 -->



# Caractéristiques


-   *Chakra* le moteur de script de *Windows Script Host* pour exécuter *ECMAScript2015* *Chakra*
-   Étant donné que *cscript.exe* 32 bits est exécuté, il n'y a pas de problème spécifique à l'environnement 64 bits.
-   Importer le module avec `require`
-   Sort les caractères colorés sur la sortie standard
-   Devinez automatiquement l'encodage du fichier


# Fonctionnalités non résolues


-   `WScript.Quit` ne peut pas interrompre le programme et ne renvoie pas de code d'erreur
-   Traitement asynchrone
-   Le deuxième *event prefix* argument de `WScript.CreateObject` ne peut pas être utilisé


# Installer


*wes* besoin est le seul fichier *wes.js* Pour télécharger, lancez une invite de commande et entrez la commande suivante.


```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```


*wes* au moment de l'exécution comme l'implémentation *WScript.Shell* de `SendKeys` utilise. *wes.js* le chemin du répertoire où *wes.js* est enregistré contient des caractères autres que *ascii* , `SendKeys` ne pourra pas envoyer la clé correctement et le script ne pourra pas être exécuté.  
Veuillez configurer le chemin de destination de sauvegarde de *wes.js* uniquement en *ascii* .


## Usage


Sur la ligne de commande, spécifiez le fichier qui sera le point de départ du programme après `wes` . L'extension de script *.js* peut être omise.


```shell
wes index
```


De plus, *wes* a un *REPL* donc si vous le démarrez uniquement avec `wes` , vous pouvez entrer le script directement.


```shell
wes
```


Les scripts seront acceptés jusqu'à ce que vous entriez deux lignes vierges. *README.md* pouvez également vérifier l'exécution de l'exemple de script dans *README.md* avec *REPL* .


## arguments nommés en ligne de commande


Les options de démarrage de *wes* sont les suivantes.


| nommé              | la description                                     |
| ------------------ | -------------------------------------------------- |
| `--monotone`       | Élimine le *ANSI escape code*                      |
| `--safe`           | Exécutez le script en mode sans échec              |
| `--usual`          | Exécutez le script en mode normal (par défaut)     |
| `--unsafe`         | Exécuter le script en mode non sécurisé            |
| `--dangerous`      | Exécuter le script en mode dangereux               |
| `--debug`          | Exécuter le script en mode débogage                |
| `--encoding=UTF-8` | Spécifie l'encodage du premier fichier à lire      |
| `--engine=Chakra`  | Cette option est automatiquement ajoutée par *wes* |


L'implémentation de `--safe` `--usual` `--unsafe` `--dangerous` est incomplète, mais les arguments nommés sont réservés.


# objets intégrés


*wes* a *built-in objects* que *WSH (JScript)* n'a pas.


## *require*


Importez le module avec *require* . *wes* devine automatiquement l'encodage du fichier module, mais si vous ne devinez pas correctement, vous pouvez spécifier l'encodage avec le deuxième argument.


De plus, `require('WScript.Shell')` partir de *OLE* même *require* importation est possible avec.


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


## `module` et `module.exports`


Si vous souhaitez le définir en tant que module, affectez-le à `module.exports` .


```javascript
function add (a, b) {
    return a + b
}

module.exports = add
```


## *console*


*wes* Dans `WScript.Echo` et `WScript.StdErr.WriteLine` au lieu de la *console* utilisez le.


Imprimer des caractères sur la ligne de commande dans `console.log` . Il prend également en charge les chaînes formatées. Imprime une chaîne formatée à l'aide de l'opérateur de formatage `%` .


```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```


*wes* afin de produire une chaîne colorée dans `WScript.StdOut.WriteLine` place, `WScript.StdErr.WriteLine` utilise. `WScript.Echo` et `WScript.StdOut.WriteLine` sont bloqués en sortie, utilisez donc `WScript.StdErr.WriteLine` ou `console.log` .


## *Buffer*


Peut gérer les tampons.


```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```


## `__dirname` et `__filename`


`__filename` contient le chemin du fichier du module en cours d'exécution. `__dirname` `__filename` le répertoire de `__filename` .


```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```


# modules intégrés


*wes* a *built-in modules* pour simplifier et standardiser le traitement de base.


## *ansi*


`ansi` a un *ANSI escape code* qui vous permet de changer la couleur et l'effet de la sortie standard. Les couleurs et les effets peuvent varier en fonction du type et des paramètres de l'application console utilisée.


```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```


Vous pouvez également créer vos propres couleurs avec `ansi.color()` et `ansi.bgColor()` . L'argument utilise *RGB* tel que `255, 165, 0` ou *color code* tel que `'#FFA500'` . Vous ne pouvez pas utiliser de *color name* tels que `orange` .


```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```


## *argv*


Obtient l'argument de ligne de commande. `cscript.exe` arguments de ligne de commande `cscript.exe` de `/` déclarent les arguments nommés dans mais, *wes* dans `-` et `--` déclarent les arguments nommés dans.


*argv.unnamed* et *argv.named* le type de valeur de l'argument de la ligne de commande en l'un des *Boolean* *String* *Number* .


Entrez les arguments de la ligne de commande avec le *REPL* .


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


Exploiter le chemin.


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


## *JScript*


Si vous modifiez le moteur de script à *Chakra* , vous ne serez pas en mesure d'utiliser *JScript* spécifique *Enumerator* etc. Le module intégré *JScript* rend disponibles. Cependant, *Enumerator* renvoie un *Array* au lieu d'un objet Enumerator.


```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```


*GetObject* `WScript.GetObject` comme une alternative à `WScript.GetObject` .


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


*httprequest* est comme son nom la *http request* émettra un.


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


*pipe* simplifie le traitement des tuyaux


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


# Ensemble de modules et installation


*install* , vous pouvez installer le module pour *wes* publié sur *github* . Vous aurez besoin d'un *github repository* pour publier le module. De plus, le nom du référentiel et le nom du répertoire local doivent être identiques.


## *bundle*


*github* publication d'un module sur *github* , *bundle* regroupe le module requis et le modifie dans un format pouvant être importé par le module d' *install* .


Pour des raisons de sécurité, *wes* n'importe pas les modules dans un format qui peut être exécuté directement, alors créez un fichier *.json* avec le module *bundle* .


Il existe certaines conditions pour le regroupement de modules.


1.  *repository* seul type de module peut être publié dans un *repository* .
2.  Le nom du référentiel sur *github* et le nom du répertoire de travail local doivent être identiques.
3.  Le référentiel doit être public si vous souhaitez publier le module vers un tiers.
4.  *wes* n'interprète pas statiquement le script. Les modules acquis par `require` dans des conditions spécifiques telles que les instructions `if` ne peuvent pas être regroupées.
5.  *.json* fichier *.json* sera créé dans votre répertoire de travail avec le nom *directory_name.json* . Il ne peut pas être installé si le fichier est renommé ou si le fichier est déplacé.
6.  `node_modules/directory_name` , le bundle échoue car il fait référence à `directory_name.json` .


## *install*


Utilisé pour installer le fichier du module pour *wes* publié sur *github* .


### usage


Passer les arguments à *install* au format `@author/repository`


```shell
wes install @wachaon/fmt
```


*install* a des options


| nommé      | court nommé | la description                                                  |
| ---------- | ----------- | --------------------------------------------------------------- |
| `--bare`   | `-b`        | Ne pas créer de dossier *@author*                               |
| `--global` | `-g`        | Installez le module dans le dossier où *wes.js* trouve *wes.js* |


`--bare` option `--bare` peut omettre l'argument `require` de `author@repository` vers `repository` . `--global` option `--global` rend les modules installés disponibles pour tous les scripts. Les options ci-dessus doivent être spécifiées en même temps que l'option de sécurité *wes* `--unsafe` ou `--dangerous` .


```shell
wes install @wachaon/fmt --bare --unsafe
```


# Installer le module de dépôt privé


*install* peut être installé non seulement dans les modules des référentiels publics sur *github* , mais également dans les référentiels privés.


*install* , spécifiez le module avec `author@repository` . L'implémentation télécharge les éléments suivants.


```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```


Lorsque vous accédez au *raw* du référentiel privé avec un navigateur, le *token* sera affiché, alors copiez le *token* et utilisez-le.


Vous pouvez également installer un module dans un référentiel privé en l'exécutant sur la ligne de commande pendant la *token* du *token* .


```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```


# Module externe


Voici quelques modules externes.


## *@wachaon/fmt*


*@wachaon/fmt* regroupe *prettier* et formate le script. De plus, si *@wachaon/fmt* est installé et qu'une erreur de `SyntaxError` se produit, l'emplacement de l'erreur peut être indiqué.


### installer


```shell
wes install @wachaon/fmt
```


### usage


S'il y a *.prettierrc* (format JSON) dans le répertoire de travail, cela sera reflété dans le paramètre. *fmt* peut être utilisé à la fois avec la *CLI* (interface de ligne de commande) et le *module* dans *fmt* .


Utiliser comme *CLI*


```shell
wes @wachaon/fmt src/sample --write
```


| numéro sans nom | la description                                                |
| --------------- | ------------------------------------------------------------- |
| 0               | ??                                                            |
| 1               | Obligatoire. Le chemin du fichier que vous souhaitez formater |


| nommé     | court nommé | la description         |
| --------- | ----------- | ---------------------- |
| `--write` | `-w`        | Autoriser l'écrasement |


Remplacez le fichier par un script formaté si vous spécifiez un argument nommé `--write` ou `-w` .


### *module* utilisation en tant que *module*


### `option`


```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')

const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```
