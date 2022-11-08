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

     bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js

Nous utilisons `SendKeys` *wes* *WScript.Shell* lors de l'exécution en tant qu'implémentation. Si le chemin du répertoire où *wes.js* est enregistré contient des caractères autres que *ascii* , `SendKeys` ne peut pas envoyer la clé correctement et le script ne peut pas être exécuté.\
Configurez le chemin *wes.js* est stocké en *ascii* uniquement. Si vous avez déjà téléchargé *wes* , vous pouvez le mettre à jour avec la commande suivante.

     wes update


# Usage

Entrez le mot-clé `wes` suivi de la commande spécifiant le fichier qui sera le point de départ du programme vers la console. L'extension de script *.js* peut être omise.

     wes index

De plus, étant donné que *wes* est équipé de *REP* , vous pouvez entrer des scripts directement en démarrant `wes` seul.

     wes

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

     // ./add.js function add (a, b) { return ab } module.exports = add

<!---->

     // ./main.js const add = require('./add') console.log('add(7, 3) // => %O', add(7, 3))

En outre, il est possible d'importer avec *require* pour un *COM Object* comme `require('WScript.Shell')` .

     const Shell = require('Shell.Application') Shell.MinimizeAll() WScript.Sleep(2000) Shell.UndoMinimizeAll()


## *es module*

*Chakra* , qui est un moteur d'exécution de script, interprète une syntaxe telle que `imoprt` , mais il ne peut pas être exécuté tel quel car la méthode de traitement en tant que *cscript* n'est pas définie. Dans *wes* , en ajoutant *babel* aux modules intégrés, les modules *es module* sont également exécutés tout en étant séquentiellement transpilés. Cela nous coûte des frais généraux de traitement et un fichier *wes.js* gonflé. Les modules écrits dans le *es module* sont également convertis en `require()` par transpilation, il est donc possible d'appeler *COM Object* . Cependant, il ne prend pas en charge la spécification de l'encodage du fichier de module avec *es module* . Tout est chargé automatiquement. Pour le charger en tant que *es module* , définissez l'extension sur `.mjs` ou définissez le champ `"type"` dans `package.json` sur `"module"` .

     // ./sub.mjs export default function sub (a, b) { return a - b }

<!---->

     // ./main2.js import sub from './sub.mjs' console.log('sub(7, 3) // => %O', sub(7, 3))


# objet incorporé

*wes* a *built-in objects* introuvables dans *WSH (JScript)* .


undefined


## *Buffer*

Vous pouvez gérer les tampons.

     const content = 'Hello World' const buff = Buffer.from(content) console.log(`${content} %O`, buff)


## `__dirname` et `__filename`

`__filename` stocke le chemin du fichier de module en cours d'exécution. `__dirname` contient le répertoire de `__filename` .

     console.log('dirname: %O\nfilename: %O', __dirname, __filename)


## *setTimeout* *setInterval* *setImmediate* *Promise*

Étant donné que *wes* est un environnement d'exécution pour le traitement synchrone, *setTimeout* *setInterval* *setImmediate* *Promise* ne fonctionne pas comme un traitement asynchrone, mais il est implémenté pour prendre en charge les modules qui supposent l'implémentation de *Promise* .

     const example = () => { const promise = new Promise((resolve, reject) => { console.log('promise') setTimeout(() => { console.log('setTimeout') resolve('resolved'); }, 2000); }).then((val) => { console.log(val) }); console.log('sub') }; console.log('start') example(); console.log('end')


# Module intégré

*wes* a *built-in modules* pour simplifier et standardiser le traitement de base.


## *ansi*

`ansi` est *ANSI escape code* qui peut modifier les couleurs et les effets de sortie standard. Les couleurs et les effets peuvent différer selon le type et les paramètres de l'application console utilisée.

     const { redBright, yellow } = require('ansi') const message = 'File does not exist' console.log(redBright 'Error: ' yellow message)

Vous pouvez également créer vos propres couleurs avec `ansi.color()` et `ansi.bgColor()` . Les arguments utilisent *RGB* tels que `255, 165, 0` et *color code* tels que `'#FFA500'` . *color name* tels que `orange` ne sont pas pris en charge.

     const { color } = require('ansi') const orange = color(255, 165, 0) console.log(orange 'Hello World')


## *argv*

Obtenir les arguments de la ligne de commande. Les arguments de ligne de commande de `cscript.exe` déclarent des arguments nommés avec `/` , tandis que *wes* déclare des arguments nommés avec `-` et `--` . *argv.unnamed* et *argv.named* le type de valeur d'argument de ligne de commande en *String* *Number* *Boolean* . Entrez les arguments de la ligne de commande avec *REP* .

     wes REP aaa -bcd eee --fgh=iii jjj --kln mmm

Exécutez le script suivant sur *REP* .

     const argv = require('argv') console.log(`argv: %O argv.unnamed: %O argv.named: %O`, argv, argv.unnamed, argv.named)


## *pathname*

Manipulez les chemins. Les chemins commençant par `/` et `\` sont généralement relatifs à la racine du lecteur. Par exemple `/filename` et `C:/filename` peuvent être le même chemin. Pour des raisons de sécurité, *wes* interprète les chemins commençant par `/` et `\` par rapport au répertoire de travail.

     const path = require('pathname') const file = path.resolve(__dirname, 'index.js') console.log('file %O', file)


## *filesystem*

Manipuler des fichiers et des répertoires. `readTextFileSync()` devine automatiquement l'encodage du fichier et le lit. (Même si le deuxième argument de `readFileSync()` est `encode` sur `auto` , il sera deviné automatiquement.)

     const fs = require('filesystem') const path = require('pathname') const readme = path.resolve(__dirname, 'README.md') const contents = fs.readTextFileSync(readme) // const contents = fs.readFileSync(readme, 'auto') console.log(contents)


## *chardet*

J'utilise certaines fonctionnalités de <https://github.com/runk/node-chardet> . Vous pouvez augmenter la précision de l'auto-estimation en augmentant les caractères spécifiques à l'encodage.


## *JScript*

Si vous changez le moteur de script en *Chakra* , vous ne pourrez pas utiliser les *Enumerator* spécifiques à *JScript* , etc. Le module intégré *JScript* les rend disponibles. Cependant, *Enumerator* renvoie un *Array* , pas un *Enumerator object* .

     const { Enumerator, ActiveXObject } = require('JScript') const FSO = new ActiveXObject('Scripting.FileSystemObject') const dir = FSO.getFolder(__dirname).Files const files = new Enumerator(dir) files.forEach(file => console.log(file.Name))

*GetObject* fonctionne comme une alternative à `WScript.GetObject` .

     const { GetObject, Enumerator } = require('JScript') const ServiceSet = GetObject("winmgmts:{impersonationLevel=impersonate}").InstancesOf("Win32_Service") new Enumerator(ServiceSet).forEach(service => console.log( 'Name: %O\nDescription: %O\n', service.Name, service.Description ))


## *VBScript*

*VBScript* offre certaines fonctionnalités que *JScript* n'offre pas.

     const { TypeName } = require('VBScript') const FSO = require('Scripting.FileSystemObject') console.log(TypeName(FSO))


## *httprequest*

*httprequest* émet une *http request* .

     const request = require('httprequest') const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1') console.log('%O', JSON.parse(content))


undefined


## *pipe*

*pipe* simplifie la tuyauterie.

### Usage

     const pipe = require('pipe') function add (a, b) { return ba } function sub (a, b) { return b - a } function div (a, b) { return a / b } const add5 = add.bind(null, 5) const sub3 = sub.bind(null, 3) pipe() .use(add5) .use(sub3) .use(div, 4) .process(10, (err, res) => console.log('res: %O', res))


## *typecheck*

Déterminez le type de script.

### Usage

     const { isString, isNumber, isBoolean, isObject } = require('typecheck') const log = require('log') log(() => isString("ECMAScript")) log(() => isNumber(43.5)) log(() => isBoolean(false)) log(() => isObject(function(){}))


undefined


## *getMember*

Obtenez le type de membre et la description de *COM Object* à partir de *ProgID* .

### Usage

     const getMember = require('getMember') const FileSystemObject = 'Scripting.FileSystemObject' console.log('require("%S") // => %O', FileSystemObject, getMember(FileSystemObject))


## *zip*

Compresse les fichiers et les dossiers et décompresse les fichiers compressés. En interne, *PowerShell* est appelé et traité.

### Usage

     const {zip, unzip} = require('zip') console.log(zip('docs\\*', 'dox.zip')) console.log(unzip('dox.zip'))

Un caractère générique `*` peut être écrit dans le `path` de `zip(path, destinationPath)` . Il peut être utilisé à la fois dans *CLI (Command Line Interface)* et dans les *module* .

     wes zip docs\* dox.zip wes zip -p dox.zip

Si le `path` a l'extension `.zip` , `unzip()` est traité et il n'y a pas de description de l'extension `.zip` . Alternativement, même s'il y a une extension `.zip` , s'il y a une description générique `*` , `zip()` sera traité.

| anonyme | La description                              |
| ------- | ------------------------------------------- |
| `1`     | `path` ou fichier à entrer                  |
| `2`     | fichier de dossier vers la `dest` de sortie |

| nommé    | nommé court | La description                              |
| -------- | ----------- | ------------------------------------------- |
| `--path` | `-p`        | `path` ou fichier à entrer                  |
| `--dest` | `-d`        | fichier de dossier vers la `dest` de sortie |


# Regroupement (conditionnement) et installation de modules

Dans *wes* , un bundle de plusieurs modules est appelé un package. Vous pouvez installer le package pour *wes* publié sur *github* . Un *github repository* est requis pour publier un package.


## *bundle*

Lors de la publication d'un package sur *github* , *bundle* regroupe les modules requis et crée *bundle.json* .

1.  Un seul package peut être publié dans un *repository*

2.  *package.json* est requis. Au minimum, la description du champ `main` est requise.

         { "main": "index.js" }

3.  Rendez le référentiel *public* si vous souhaitez publier le package

4.  À partir de la `version 0.12.0` , les packages avec chargement direct du module dans un répertoire au-dessus du répertoire de travail ne seront pas regroupés. Les packages du répertoire supérieur *wes\_modules* ou *node\_modules* peuvent être regroupés.

Saisissez la commande suivante pour regrouper : Reportez-vous à *package.json* pour savoir quoi regrouper.

     wes bundle


undefined


# Installation de packages à partir de référentiels privés

*install* peut installer non seulement des packages à partir de référentiels *github* publics, mais également des packages à partir de référentiels privés. Dans *install* , spécifiez le package avec *@author/repository* . L'implémentation tente de télécharger l'URL suivante.

     `https://raw.githubusercontent.com/${author}/${repository}/master/bundle.json`

Lorsque vous accédez au *raw* du référentiel privé avec un navigateur, le *token* s'affiche, alors copiez le *token* et utilisez-le. Les packages provenant de référentiels privés peuvent également être installés s'ils sont exécutés dans la console pendant que le *token* est valide.

     wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA


# Présentation du paquet

Voici quelques packages externes.


## *@wachaon/fmt*

*@wachaon/fmt* est *prettier* emballé pour *wes* pour formater les scripts. De même, si une *Syntax Error* se produit lors *@wachaon/fmt* , vous pouvez indiquer l'emplacement de l'erreur.

### installer

     wes install @wachaon/fmt

### Usage

S'il y a *.prettierrc* (format JSON) dans le répertoire de travail, cela sera reflété dans les paramètres. *fmt* est disponible à la fois dans la *CLI* et dans le *module* .

#### Utiliser comme *CLI* .

     wes @wachaon/fmt src/sample --write

| numéro anonyme | La description                                                |
| -------------- | ------------------------------------------------------------- |
| 1              | Obligatoire. le chemin du fichier que vous souhaitez formater |

| nommé     | nommé court | La description            |
| --------- | ----------- | ------------------------- |
| `--write` | `-w`        | autoriser le remplacement |

Remplacez le fichier par le script formaté si `--write` ou l'argument nommé `-w` est spécifié.

#### utiliser comme module

     const fmt = require('@wachaon/fmt') const { readTextFileSync, writeTextFileSync } = require('filesystem') const { join, workingDirectory } = require('pathname') const target = join(workingDirectory, 'index.js') console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
