# *WES*

*wes* est un framework pour exécuter *ECMAScript* sur *Windows Script Host*

*README* original du [*japanese*](README.ja.md) sera. Autre que le japonais, le texte sera traduit automatiquement.  
Veuillez choisir parmi les textes suivants dans d'autres langues.

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

## Caractéristiques

-   Changez le moteur de script en *Chakra* et exécutez *ECMAScript2015* *Chakra*
-   *cscript.exe* 32 bits et ne provoque aucun bogue spécifique à l'environnement 64 bits
-   importer le module avec `require`
-   Émet des caractères colorés sur la sortie standard
-   Devinez l'encodage du fichier automatiquement

## Fonctionnalités non résolues

-   `WScript.Quit` ne peut pas interrompre le programme et ne renvoie pas de code d'erreur
-   Traitement asynchrone
-   `WScript.CreateObject` du *event prefix* du deuxième argument de `WScript.CreateObject`

## Installer

*wes* besoin est *wes.js* fichier uniquement. Pour télécharger, lancez une invite de commande et entrez la commande suivante.

```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

*wes* utilise les `SendKeys` *WScript.Shell* au moment de l'exécution. *wes.js* le chemin du répertoire dans lequel *wes.js* est enregistré contient des caractères autres que *ascii* , `SendKeys` ne peut pas envoyer la clé correctement et le script ne peut pas être exécuté.  
Veuillez configurer *ascii* uniquement pour le chemin de sauvegarde de *wes.js*

## Usage

Dans la ligne de commande, spécifiez le fichier qui est le point de départ du programme après `wes` . L'extension de script *.js* peut être omise.

```shell
wes index
```

De plus, *wes* est livré avec un *REPL* donc si vous le démarrez uniquement avec `wes` , vous pouvez entrer directement le script.

```shell
wes
```

La saisie de script est acceptée jusqu'à ce que vous saisissiez deux lignes vides. *README.md* pouvez également vérifier l'exécution de l'exemple de script dans *README.md* avec *REPL* .

## arguments nommés en ligne de commande

Les options de démarrage de *wes* sont les suivantes.

| nommé              | la description                                     |
| ------------------ | -------------------------------------------------- |
| `--monotone`       | Éliminer le *ANSI escape code*                     |
| `--safe`           | Exécutez le script en mode sans échec              |
| `--usual`          | Exécutez le script en mode normal (par défaut)     |
| `--unsafe`         | Exécutez le script en mode non sécurisé            |
| `--dangerous`      | Exécutez le script en mode dangereux               |
| `--debug`          | Exécutez le script en mode débogage                |
| `--encoding=UTF-8` | Spécifie le codage du fichier à lire en premier    |
| `--engine=Chakra`  | Cette option est automatiquement ajoutée par *wes* |

L'implémentation de `--safe` `--usual` `--unsafe` `--dangerous` est incomplète, mais les arguments nommés sont réservés.

## objets intégrés

*wes* a *built-in objects* que *WSH (JScript)* n'a pas.

### *require*

Importez le module avec *require* . *wes* devine automatiquement l'encodage du fichier du module, mais si vous ne le devinez pas correctement, vous pouvez spécifier l'encodage avec le deuxième argument.

Vous pouvez également importer avec *require* pour *OLE* comme `require('WScript.Shell')` .

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

### module et module.exports

Si vous souhaitez le définir en tant que module, remplacez-le dans `module.exports` .

```javascript
function add (a, b) {
    return a + b
}

module.exports = add
```

### *console*

*wes* Dans `WScript.Echo` et `WScript.StdErr.WriteLine` au lieu de la *console* utilisez l' `WScript.StdErr.WriteLine` .

Sortez les caractères sur la ligne de commande avec `console.log` . Il prend également en charge les chaînes formatées. Sortez la chaîne de format à l'aide de l'opérateur de format `%` .

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

*wes* pour produire une chaîne de couleur dans `WScript.StdOut.WriteLine` au lieu, `WScript.StdErr.WriteLine` utilisation. `WScript.Echo` sortie de `WScript.Echo` et `WScript.StdOut.WriteLine` est bloquée, utilisez `WScript.StdOut.WriteLine` ou `console.log` .

### *Buffer*

Peut gérer les tampons.

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```

### `__dirname` et `__filename`

`__filename` stocke le chemin du fichier de module en cours d'exécution. `__dirname` stocke le répertoire `__filename` .

```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```

## modules intégrés

*wes* a *built-in modules* pour simplifier et normaliser le traitement de base.

### *ansi*

`ansi` a un *ANSI escape code* qui vous permet de changer les couleurs et les effets de la sortie standard. Les couleurs et les effets peuvent varier en fonction du type et des paramètres de l'application console utilisée.

```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```

Vous pouvez également créer votre propre couleur avec `ansi.color()` ou `ansi.bgColor()` . Les arguments utilisent *RGB* tel que `255, 165, 0` ou *color code* tel que `'#FFA500'` . Vous ne pouvez pas utiliser de *color name* tels que l' `orange` .

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

### *argv*

Obtient des arguments de ligne de commande. `cscript.exe` arguments de ligne de commande `cscript.exe` de `/` déclare les arguments nommés dans mais, *wes* entre `-` et `--` déclare les arguments nommés dans.

*argv.unnamed* et *argv.named* le type de valeur de l'argument de ligne de commande en l'un des *String* *Number* *Boolean* .

Entrez les arguments de ligne de commande avec *REPL* .

```shell
wes REPL aaa -bcd eee --fgh=iii jjj --kln mmm
```

Exécutez le script suivant dans *REPL* .

```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```

### *pathname*

Exploitez le chemin.

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

### *filesystem*

Gère les fichiers et les répertoires. `readTextFileSync` devinera le codage du fichier et le lira.

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```

### *JScript*

Si vous modifiez le moteur de script à *Chakra* , vous ne serez pas en mesure d'utiliser *JScript* spécifiques *Enumerator* . Le module intégré *JScript* rend disponibles. Cependant, *Enumerator* renvoie un *Array* plutôt qu'un objet Enumerator.

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

### *VBScript*

*VBScript* offre certaines des fonctionnalités que *JScript* n'a pas.

```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```

### *httprequest*

*httprequest* est comme son nom la *http request* émettra un *httprequest* .

```javascript
const request = require('httprequest')
const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log('%O', JSON.parse(content))
```

### *minitest*

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

### *pipe*

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

### *typecheck*

Jugez du type de script.

```javascript
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```

## Ensemble de modules et installation

*install* , vous pouvez installer le module pour *wes* publié sur *github* . Pour publier le module, vous avez besoin du *github repository* . De plus, le nom du référentiel et le nom du répertoire local doivent être identiques.

### *bundle*

*github* publication d'un module sur *github* , le *bundle* regroupe les modules nécessaires et les modifie dans un format pouvant être inclus par le module d' *install* .

Pour des raisons de sécurité, *wes* n’importe pas le module qui peut être directement exécuté, donc créez *.json* fichier *.json* dans le module *bundle* .

Il existe certaines conditions pour regrouper les modules.

1.  *repository* seul type de module peut être publié dans un *repository* .
2.  *github* nom du référentiel *github* et le nom du répertoire de travail local doivent être identiques.
3.  Le référentiel doit être public si vous souhaitez publier le module auprès d'un tiers.
4.  *wes* n'interprète pas le script de manière statique. Les modules qui `require` sous certaines conditions telles que les instructions `if` ne peuvent pas être regroupés.
5.  *.json* fichier *.json* est créé dans le répertoire de travail avec le nom *directory_name.json* . Si vous modifiez le nom du fichier ou déplacez le fichier, vous ne pouvez pas l'installer.
6.  `node_modules/directory_name` le `directory_name.json` `node_modules/directory_name` , bottelage échoue parce qu'il fait référence `directory_name.json` .

### *install*

Il est utilisé pour installer le fichier de module pour *wes* publié sur *github* .

## usage

Passez les arguments à *install* au format `@author/repository`

```shell
wes install @wachaon/fmt
```

*install* a des options

| nommé      | nom court | la description                                                  |
| ---------- | --------- | --------------------------------------------------------------- |
| `--bare`   | `-b`      | ne pas créer de dossier *@author*                               |
| `--global` | `-g`      | Installez le module dans le dossier où *wes.js* trouve *wes.js* |

`--bare` option `--bare` peut omettre l'argument `require` de `author@repository` vers le `repository` . `--global` option `--global` rend le module installé disponible pour tous les scripts. Les options ci-dessus doivent être utilisées avec l'option de sécurité *wes* `--unsafe` ou `--dangerous` .

```shell
wes install @wachaon/fmt --bare --unsafe
```

# Installer le module de référentiel privé

*install* peut être installé non seulement dans le module de référentiel public de *github* mais également dans le référentiel privé.

*install* , spécifiez le module avec `author@repository` . L'implémentation télécharge les éléments suivants.

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```

Lorsque vous accédez au *raw* du référentiel privé avec un navigateur, le *token* est affiché, donc copier le *token* et l' utiliser.

Si vous l'exécutez sur la ligne de commande dans le délai de validité du *token* , vous pouvez installer le module du référentiel privé.

```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

## Module externe

Ici, nous introduisons quelques modules externes.

### *@wachaon/fmt*

*@wachaon/fmt* est un ensemble de *prettier* qui formate le script. De plus, si `SyntaxError` se produit alors que *@wachaon/fmt* est installé, l'emplacement de l'erreur peut être présenté.

#### installer

```shell
wes install @wachaon/fmt
```

#### usage

S'il y a *.prettierrc* (format JSON) dans le répertoire de travail, reflétez-le dans le paramètre. *fmt* peut être utilisé avec la *CLI* (interface de ligne de commande) et le *module* .

Utiliser comme *CLI*

```shell
wes @wachaon/fmt src/sample --write
```

| numéro sans nom | la description                                                |
| --------------- | ------------------------------------------------------------- |
| 0               | -                                                             |
| 1               | Obligatoire. Le chemin du fichier que vous souhaitez formater |

| nommé     | nom court | la description         |
| --------- | --------- | ---------------------- |
| `--write` | `-w`      | Autoriser l'écrasement |

Remplace le fichier par un script formaté si un argument nommé `--write` ou `-w` donné.

#### *module* utilisé comme *module*

#### `option`

```javascript
{
    parser: 'babel',
    plugins: [babel]
}
```
