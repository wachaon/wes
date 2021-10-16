undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

### _console_

_wes_ utilise la _console_ au lieu de `WScript.Echo` et `WScript.StdErr.WriteLine` .

Imprimer des caractères sur la ligne de commande dans `console.log` . Il prend également en charge les chaînes formatées. Imprime une chaîne formatée à l'aide de l'opérateur de formatage `%` .

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

_wes_ afin de produire une chaîne colorée dans `WScript.StdOut.WriteLine` place, `WScript.StdErr.WriteLine` utilise. `WScript.Echo` et `WScript.StdOut.WriteLine` sont bloqués en sortie, utilisez donc `WScript.StdOut.WriteLine` ou `console.log` .

### _Buffer_

Peut gérer les tampons.

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```

### `__dirname` et `__filename`

`__filename` contient le chemin du fichier du module en cours d'exécution. `__dirname` `__filename` le répertoire de `__filename` .

```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```

## modules intégrés

_wes_ a _built-in modules_ pour simplifier et standardiser le traitement de base.

### _ansi_

`ansi` a un _ANSI escape code_ qui vous permet de changer la couleur et l'effet de la sortie standard. Les couleurs et les effets peuvent varier en fonction du type et des paramètres de l'application console utilisée.

```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```

Vous pouvez également créer vos propres couleurs avec `ansi.color()` et `ansi.bgColor()` . L'argument utilise _RGB_ tel que `255, 165, 0` ou _color code_ tel que `'#FFA500'` . Vous ne pouvez pas utiliser un _color name_ tel que `orange` .

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

### _argv_

Obtient l'argument de ligne de commande. `cscript.exe` arguments de ligne de commande `cscript.exe` de `/` déclarent les arguments nommés dans mais, _wes_ dans `-` et `--` déclarent les arguments nommés dans.

_argv.unnamed_ et _argv.named_ le type de valeur de l'argument de ligne de commande en l'un des _Boolean_ _String_ _Number_ .

Entrez les arguments de la ligne de commande avec le _REPL_ .

```shell
wes REPL aaa -bcd eee --fgh=iii jjj --kln mmm
```

Exécutez le script suivant dans le _REPL_ .

```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```

### _pathname_

Exploiter le chemin.

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

### _filesystem_

Manipuler des fichiers et des répertoires. `readTextFileSync` devine automatiquement l'encodage du fichier et le lit.

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```

### _JScript_

Si vous modifiez le moteur de script à _Chakra_ , vous ne serez pas en mesure d'utiliser _JScript_ spécifique _Enumerator_ etc. Le module intégré _JScript_ rend disponibles. Cependant, _Enumerator_ renvoie un _Array_ au lieu d'un objet Enumerator.

```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```

_GetObject_ `WScript.GetObject` comme une alternative à `WScript.GetObject` .

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

_VBScript_ offre certaines fonctionnalités que _JScript_ n'a pas.

```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```

### _httprequest_

_httprequest_ émet une _http request_ comme son nom l'indique.

```javascript
const request = require('httprequest')
const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log('%O', JSON.parse(content))
```

### _minitest_

_minitest_ peut écrire des tests simples.

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

_pipe_ simplifie le traitement des tuyaux

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

Déterminez le type du script.

```javascript
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```

## Ensemble de modules et installation

_install_ , vous pouvez installer le module pour _wes_ publié sur _github_ . Vous aurez besoin du _github repository_ pour publier le module. De plus, le nom du référentiel et le nom du répertoire local doivent être identiques.

### _bundle_

_github_ publication d'un module sur _github_ , _bundle_ regroupe le module requis et le modifie dans un format pouvant être importé par le module d' _install_ .

Pour des raisons de sécurité, _wes_ n'importe pas les modules dans un format qui peut être exécuté directement, alors créez un fichier _.json_ avec le module _bundle_ .

Il existe certaines conditions pour le regroupement de modules.

1.  _repository_ seul type de module peut être publié dans un _repository_ .
2.  _github_ nom du référentiel _github_ et le nom du répertoire de travail local doivent être identiques.
3.  Le référentiel doit être public si vous souhaitez publier le module vers un tiers.
4.  _wes_ n'interprète pas statiquement le script. Les modules qui `require` dans certaines conditions, comme les instructions `if` , peuvent ne pas être regroupés.
5.  _.json_ fichier _.json_ sera créé dans votre répertoire de travail avec le nom _directory_name.json_ . Si vous renommez le fichier ou déplacez le fichier, vous ne pouvez pas l'installer.
6.  `node_modules/directory_name` regroupement échoue car il fait référence à `directory_name.json` .

### _install_

Il est utilisé pour installer le fichier du module pour _wes_ publié sur _github_ .

## usage

Passer des arguments à _install_ au format `@author/repository`

```shell
wes install @wachaon/fmt
```

_install_ a des options

| nommé      | court nommé | la description                                                  |
| ---------- | ----------- | --------------------------------------------------------------- |
| `--bare`   | `-b`        | Ne pas créer de dossier _@author_                               |
| `--global` | `-g`        | Installez le module dans le dossier où _wes.js_ trouve _wes.js_ |

`--bare` option `--bare` peut omettre l'argument `require` de `author@repository` vers `repository` . `--global` option `--global` rend les modules installés disponibles pour tous les scripts. Les options ci-dessus doivent être spécifiées en même temps que l'option de sécurité _wes_ `--unsafe` ou `--dangerous` .

```shell
wes install @wachaon/fmt --bare --unsafe
```

# Installer le module de dépôt privé

_install_ peut être installé non seulement sur les modules de référentiel public _github_ , mais également sur des référentiels privés.

_install_ , spécifiez le module avec `author@repository` . L'implémentation télécharge les éléments suivants.

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```

Lorsque vous accédez au _raw_ du référentiel privé avec un navigateur, le _token_ sera affiché, alors copiez le _token_ et utilisez-le.

Vous pouvez également installer le module dans le référentiel privé en l'exécutant sur la ligne de commande pendant la _token_ du _token_ .

```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

## Module externe

Voici quelques modules externes.

### _@wachaon/fmt_

_@wachaon/fmt_ est un ensemble de _prettier_ qui formate le script. De plus, si une `SyntaxError` se produit avec _@wachaon/fmt_ installé, vous pouvez indiquer l'emplacement de l'erreur.

#### installer

```shell
wes install @wachaon/fmt
```

#### usage

S'il y a _.prettierrc_ (format JSON) dans le répertoire de travail, cela sera reflété dans les paramètres. _fmt_ peut être utilisé à la fois avec la _CLI_ (interface de ligne de commande) et le _module_ dans _fmt_ .

Utiliser comme _CLI_

```shell
wes @wachaon/fmt src/sample --write
```

| numéro sans nom | la description                                                |
| --------------- | ------------------------------------------------------------- |
| 0               | ---                                                           |
| 1               | Obligatoire. Le chemin du fichier que vous souhaitez formater |

| nommé     | court nommé | la description         |
| --------- | ----------- | ---------------------- |
| `--write` | `-w`        | Autoriser l'écrasement |

Remplace le fichier par un script formaté si un argument nommé `--write` ou `-w` est spécifié.

#### _module_ utilisation en tant que _module_

#### `option`

```javascript
{
    parser: 'babel',
    plugins: [babel]
}
```
