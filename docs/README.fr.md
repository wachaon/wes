![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

Le texte original du _README_ est [_japanese_](README.ja.md) . À part le japonais, c'est une phrase traduite automatiquement.  
Veuillez sélectionner des phrases dans d'autres langues parmi les suivantes.

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

-   Changez le moteur de script en _Chakra_ et exécutez _ECMAScript2015_ _Chakra_
-   _cscript.exe_ 32 bits et n'a aucun bogue spécifique à l'environnement 64 bits
-   Importer le module avec `require`
-   Sort les caractères colorés sur la sortie standard
-   Devinez automatiquement l'encodage du fichier

## Fonctionnalités non résolues

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

## Installer

_wes_ besoin est le seul fichier _wes.js_ Pour télécharger, lancez une invite de commande et entrez la commande suivante.

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

## Usage

Sur la ligne de commande, spécifiez le fichier qui sera le point de départ du programme après `wes` . L'extension de script _.js_ peut être omise.

```shell
wes index
```

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

```shell
wes
```

Le script sera accepté jusqu'à ce que vous entriez deux lignes vierges. _README.md_ pouvez également vérifier l'exécution de l'exemple de script dans _README.md_ avec _REPL_ .

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

L'implémentation de `--safe` `--usual` `--unsafe` `--dangerous` est incomplète, mais les arguments nommés sont réservés.

## objets intégrés

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

### _require_

Importez le module avec _require_ . _wes_ devine automatiquement l'encodage du fichier module, mais si vous ne devinez pas correctement, vous pouvez spécifier l'encodage avec le deuxième argument.

De plus, `require('WScript.Shell')` partir de _OLE_ même _require_ importation est possible avec.

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

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

Si vous souhaitez le définir en tant que module, affectez-le à `module.exports` .

```javascript
function add (a, b) {
    return a + b
}

module.exports = add
```

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

Imprimer des caractères sur la ligne de commande dans `console.log` . Il prend également en charge les chaînes formatées. Imprime une chaîne formatée à l'aide de l'opérateur de formatage `%` .

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

_wes_ afin de produire une chaîne colorée dans `WScript.StdOut.WriteLine` place, `WScript.StdErr.WriteLine` utilise. `WScript.Echo` et `WScript.StdOut.WriteLine` sont bloqués en sortie, utilisez donc `WScript.StdOut.WriteLine` ou `console.log` .

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

### _ansi_

`ansi` a un _ANSI escape code_ qui vous permet de changer la couleur et l'effet de la sortie standard. Les couleurs et les effets peuvent varier en fonction du type et des paramètres de l'application console utilisée.

```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

_argv.unnamed_ et _argv.named_ le type de valeur de l'argument de ligne de commande en l'un des _Boolean_ _String_ _Number_ .

Entrez les arguments de la ligne de commande avec le _REPL_ .

```shell
wes REPL aaa -bcd eee --fgh=iii jjj --kln mmm
```

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

### _filesystem_

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

Si vous modifiez le moteur de script à _Chakra_ , vous ne serez pas en mesure d'utiliser _JScript_ spécifique _Enumerator_ etc. Le module intégré _JScript_ rend disponibles. Cependant, _Enumerator_ renvoie un _Array_ au lieu d'un objet Enumerator.

```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

### _VBScript_

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

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

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

_pipe_ simplifie le traitement des tuyaux

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

### _typecheck_

Déterminez le type du script.

```javascript
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```

## Ensemble de modules et installation

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

Pour des raisons de sécurité, _wes_ n'importe pas les modules dans un format qui peut être exécuté directement, alors créez un fichier _.json_ avec le module _bundle_ .

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

Il est utilisé pour installer le fichier du module pour _wes_ publié sur _github_ .

## usage

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

| nommé      | court nommé | la description                                                  |
| ---------- | ----------- | --------------------------------------------------------------- |
| `--bare`   | `-b`        | Ne pas créer de dossier _@author_                               |
| `--global` | `-g`        | Installez le module dans le dossier où _wes.js_ trouve _wes.js_ |

`--bare` option `--bare` peut omettre l'argument `require` de `author@repository` vers `repository` . `--global` option `--global` rend les modules installés disponibles pour tous les scripts. Les options ci-dessus doivent être spécifiées en même temps que l'option de sécurité _wes_ `--unsafe` ou `--dangerous` .

```shell
wes install @wachaon/fmt --bare --unsafe
```

# Installer le module de dépôt privé

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

_install_ , spécifiez le module avec `author@repository` . L'implémentation télécharge les éléments suivants.

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

Lorsque vous accédez au _raw_ du référentiel privé avec un navigateur, le _token_ sera affiché, alors copiez le _token_ et utilisez-le.

Vous pouvez également installer le module dans le référentiel privé en l'exécutant sur la ligne de commande pendant la _token_ du _token_ .

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

Voici quelques modules externes.

### _@wachaon/fmt_

_@wachaon/fmt_ est un ensemble de _prettier_ qui formate le script. De plus, si une `SyntaxError` se produit avec _@wachaon/fmt_ installé, vous pouvez indiquer l'emplacement de l'erreur.

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

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

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

Remplace le fichier par un script formaté si un argument nommé `--write` ou `-w` est spécifié.

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

#### `option`

```javascript
{
    parser: 'babel',
    plugins: [babel]
}
```
