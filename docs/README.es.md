# *WES*

*wes* es un marco de consola para ejecutar *ECMAScript* en *WSH (Windows Script Host)* . El [*japanese*](/README.md) original del *README* estará en japonés. Los textos que no sean en japonés serán traducidos automáticamente.\
Para textos en otros idiomas, seleccione entre las opciones a continuación.

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

# rasgo

*   Puede cambiar el motor de secuencias de comandos a *Chakra* y escribir de acuerdo con las especificaciones de *ECMAScript2015* .
*   Dado que *cscript.exe* de 32 bits siempre se ejecuta, no hay un problema único en el entorno de 64 bits.
*   Dado que hay un sistema de módulos, se puede desarrollar de manera más eficiente que el *WSH* convencional
*   Los módulos incorporados admiten el procesamiento básico, como la entrada/salida de archivos y la salida de texto en color a la consola
*   Puede dejar que la lectura de archivos adivine automáticamente la codificación, para que no tenga que preocuparse por la codificación, etc.
*   Paquete de módulos para admitir la publicación y recuperación externas
*   Muestra los detalles del error con más amabilidad que *WSH*

# Problemas *wes* que no podemos resolver

*   `WScript.Quit` no puede cancelar el programa y no devuelve un código de error
*   El procesamiento asíncrono no funciona correctamente
*   No puede usar el *event prefix* del segundo argumento de `WScript.CreateObject`

# descargar

Wes solo necesita el *wes* *wes.js* Para descargar, copie *wes.js* desde [*@wachaon/wes*](https://github.com/wachaon/wes) o ejecute el siguiente comando en la consola.

     bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js

Usamos `SendKeys` *wes* *WScript.Shell* en tiempo de ejecución como una implementación. Si la ruta del directorio donde se guarda *wes.js* contiene caracteres que no sean *ascii* , `SendKeys` no puede enviar la clave correctamente y el script no se puede ejecutar.\
Configure la ruta *wes.js* solo en *ascii* . Si ya ha descargado *wes* , puede actualizarlo con el siguiente comando.

     wes update

# Uso

Ingrese la palabra clave `wes` seguida del comando que especifica el archivo que será el punto de partida del programa en la consola. La extensión de secuencia de comandos *.js* se puede omitir.

     wes index

Además, dado que *wes* está equipado con *REP* , puede ingresar scripts directamente iniciando `wes` solo.

     wes

*REP* acepta entrada de script hasta que ingrese dos líneas en blanco. También puede ver a *REP* ejecutando el script de ejemplo en *README.md* .

## opciones de línea de comando

Las opciones de inicio de *wes* son las siguientes.

| nombrada           | Descripción                                         |
| ------------------ | --------------------------------------------------- |
| `--monotone`       | Elimina *ANSI escape code*                          |
| `--transpile`      | Siempre convierta y ejecute con *babel-standalone*  |
| `--debug`          | ejecutar el script en modo de depuración            |
| `--encoding=UTF-8` | Especifica la codificación del primer archivo leído |
| `--engine=Chakra`  | Esta opción es agregada automáticamente por *wes*   |

# sistema de módulos

*wes* admite dos sistemas de módulos, el sistema *commonjs module* que usa `require()` y el sistema de *es module* que usa `import` . ( *dynamic import* no es compatible porque es un proceso asíncrono)

## *commonjs module*

Administre módulos asignándolos a `module.exports` y llamando a `require()` . Las rutas que no sean rutas absolutas y rutas relativas que comiencen con `./` y `../` busquen módulos en el directorio *wes\_modules* y convenientemente en el directorio *node\_modules* . El `require()` de *wes* adivina automáticamente la codificación del archivo del módulo, pero puede especificar la codificación con el segundo argumento si no adivina correctamente.

     // ./add.js function add (a, b) { return ab } module.exports = add

<!---->

     // ./main.js const add = require('./add') console.log('add(7, 3) // => %O', add(7, 3))

Además, es posible importar con *require* para *COM Object* como `require('WScript.Shell')` .

     const Shell = require('Shell.Application') Shell.MinimizeAll() WScript.Sleep(2000) Shell.UndoMinimizeAll()

## *es module*

*Chakra* , que es un motor de ejecución de scripts, interpreta sintaxis como `imoprt` , pero no se puede ejecutar tal cual porque el método de procesamiento como *cscript* no está definido. En *wes* , al agregar *babel* a los módulos incorporados, *es module* es también se ejecutan mientras se transpilan secuencialmente. Esto nos cuesta la sobrecarga de procesamiento y un archivo *wes.js* . Los módulos escritos en el *es module* es también se convierten a `require()` mediante la transpilación, por lo que es posible llamar a *COM Object* . Sin embargo, no admite especificar la codificación del archivo del módulo con el *es module* . Todo se carga automáticamente. Para cargarlo como un *es module* , configure la extensión en `.mjs` o configure el campo `"type"` en `package.json` en `"module"` .

     // ./sub.mjs export default function sub (a, b) { return a - b }

<!---->

     // ./main2.js import sub from './sub.mjs' console.log('sub(7, 3) // => %O', sub(7, 3))

# objeto incorporado

*wes* tiene *built-in objects* no se encuentran en *WSH (JScript)* .

undefined

## *Buffer*

Puede manejar búferes.

     const content = 'Hello World' const buff = Buffer.from(content) console.log(`${content} %O`, buff)

## `__dirname` y `__filename`

`__filename` almacena la ruta del archivo del módulo que se está ejecutando actualmente. `__dirname` contiene el directorio de `__filename` .

     console.log('dirname: %O\nfilename: %O', __dirname, __filename)

## *setTimeout* *setInterval* *setImmediate* *Promise*

Dado que *wes* es un entorno de ejecución para procesamiento síncrono, *setTimeout* *setInterval* *setImmediate* *Promise* no funciona como procesamiento asíncrono, pero se implementa para admitir módulos que asumen la implementación de *Promise* .

     const example = () => { const promise = new Promise((resolve, reject) => { console.log('promise') setTimeout(() => { console.log('setTimeout') resolve('resolved'); }, 2000); }).then((val) => { console.log(val) }); console.log('sub') }; console.log('start') example(); console.log('end')

# Módulo incorporado

*wes* tiene *built-in modules* para simplificar y estandarizar el procesamiento básico.

## *ansi*

`ansi` es un *ANSI escape code* que puede cambiar los colores y efectos de salida estándar. Los colores y los efectos pueden diferir según el tipo y la configuración de la aplicación de consola utilizada.

     const { redBright, yellow } = require('ansi') const message = 'File does not exist' console.log(redBright 'Error: ' yellow message)

También puede crear sus propios colores con `ansi.color()` y `ansi.bgColor()` . Los argumentos usan *RGB* como `255, 165, 0` y *color code* como `'#FFA500'` . No se admiten *color name* como `orange` .

     const { color } = require('ansi') const orange = color(255, 165, 0) console.log(orange 'Hello World')

## *argv*

Obtener argumentos de la línea de comandos. Los argumentos de la línea de comandos de `cscript.exe` declaran argumentos con nombre con `/` , mientras que *wes* declara argumentos con nombre con `-` y `--` . *argv.unnamed* y *argv.named* el tipo de valor del argumento de la línea de comandos en *String* *Number* *Boolean* . Introduzca los argumentos de la línea de comandos con *REP* .

     wes REP aaa -bcd eee --fgh=iii jjj --kln mmm

Ejecute el siguiente script en *REP* .

     const argv = require('argv') console.log(`argv: %O argv.unnamed: %O argv.named: %O`, argv, argv.unnamed, argv.named)

## *pathname*

Manipular caminos. Las rutas que comienzan con `/` y `\` son generalmente relativas a la raíz de la unidad. Por ejemplo `/filename` y `C:/filename` pueden ser la misma ruta. Por razones de seguridad, *wes* interpreta las rutas que comienzan con `/` y `\` relativas al directorio de trabajo.

     const path = require('pathname') const file = path.resolve(__dirname, 'index.js') console.log('file %O', file)

## *filesystem*

Manipular archivos y directorios. `readTextFileSync()` adivina automáticamente la codificación del archivo y lo lee. (Incluso si el segundo argumento de `readFileSync()` se `encode` en `auto` , se adivinará automáticamente).

     const fs = require('filesystem') const path = require('pathname') const readme = path.resolve(__dirname, 'README.md') const contents = fs.readTextFileSync(readme) // const contents = fs.readFileSync(readme, 'auto') console.log(contents)

## *chardet*

Estoy usando algunas funciones de <https://github.com/runk/node-chardet> . Puede aumentar la precisión de las adivinanzas automáticas aumentando los caracteres específicos de la codificación.

## *JScript*

Si cambia el motor de secuencias de comandos a *Chakra* , no podrá usar *Enumerator* específicos de *JScript* , etc. El módulo integrado *JScript* los pone a disposición. Sin embargo, *Enumerator* devuelve un *Array* , no un *Enumerator object* .

     const { Enumerator, ActiveXObject } = require('JScript') const FSO = new ActiveXObject('Scripting.FileSystemObject') const dir = FSO.getFolder(__dirname).Files const files = new Enumerator(dir) files.forEach(file => console.log(file.Name))

*GetObject* funciona como una alternativa a `WScript.GetObject` .

     const { GetObject, Enumerator } = require('JScript') const ServiceSet = GetObject("winmgmts:{impersonationLevel=impersonate}").InstancesOf("Win32_Service") new Enumerator(ServiceSet).forEach(service => console.log( 'Name: %O\nDescription: %O\n', service.Name, service.Description ))

## *VBScript*

*VBScript* ofrece algunas funciones que *JScript* no ofrece.

     const { TypeName } = require('VBScript') const FSO = require('Scripting.FileSystemObject') console.log(TypeName(FSO))

## *httprequest*

*httprequest* emite una *http request* .

     const request = require('httprequest') const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1') console.log('%O', JSON.parse(content))

undefined

## *pipe*

*pipe* simplifica la instalación de tuberías.

### Uso

     const pipe = require('pipe') function add (a, b) { return ba } function sub (a, b) { return b - a } function div (a, b) { return a / b } const add5 = add.bind(null, 5) const sub3 = sub.bind(null, 3) pipe() .use(add5) .use(sub3) .use(div, 4) .process(10, (err, res) => console.log('res: %O', res))

## *typecheck*

Determinar el tipo de guión.

### Uso

     const { isString, isNumber, isBoolean, isObject } = require('typecheck') const log = require('log') log(() => isString("ECMAScript")) log(() => isNumber(43.5)) log(() => isBoolean(false)) log(() => isObject(function(){}))

undefined

## *getMember*

Obtenga el tipo de miembro y la descripción del *COM Object* de *ProgID* .

### Uso

     const getMember = require('getMember') const FileSystemObject = 'Scripting.FileSystemObject' console.log('require("%S") // => %O', FileSystemObject, getMember(FileSystemObject))

## *zip*

Comprime archivos y carpetas y descomprime archivos comprimidos. Internamente, se llama y procesa *PowerShell* .

### Uso

     const {zip, unzip} = require('zip') console.log(zip('docs\\*', 'dox.zip')) console.log(unzip('dox.zip'))

Se puede escribir un comodín `*` en la `path` de `zip(path, destinationPath)` . Se puede utilizar tanto en *CLI (Command Line Interface)* como en *module* .

     wes zip docs\* dox.zip wes zip -p dox.zip

Si la `path` tiene la extensión `.zip` , se procesa `unzip()` y no hay una descripción de la extensión `.zip` . Alternativamente, incluso si hay una extensión `.zip` , si hay una descripción comodín `*` , se procesará `zip()` .

| sin nombre | Descripción                           |
| ---------- | ------------------------------------- |
| `1`        | `path` o archivo a ingresar           |
| `2`        | archivo de carpeta a `dest` de salida |

| nombrada | nombre corto | Descripción                           |
| -------- | ------------ | ------------------------------------- |
| `--path` | `-p`         | `path` o archivo a ingresar           |
| `--dest` | `-d`         | archivo de carpeta a `dest` de salida |

# Agrupación (embalaje) e instalación de módulos

En *wes* , un conjunto de varios módulos se denomina paquete. Puede instalar el paquete para *wes* publicado en *github* . Se requiere un *github repository* para publicar un paquete.

## *bundle*

Al publicar un paquete en *github* , *bundle* agrupa los módulos necesarios y crea *bundle.json* .

1.  Solo se puede publicar un paquete en un *repository*

2.  Se requiere *package.json* . Como mínimo, se requiere la descripción del campo `main` .

         { "main": "index.js" }

3.  Haga *public* el repositorio si desea publicar el paquete

4.  A partir de `version 0.12.0` , los paquetes con módulos que se cargan directamente en un directorio por encima del directorio de trabajo no se incluirán. Los paquetes en el directorio superior *wes\_modules* o *node\_modules* se pueden agrupar.

Ingrese el siguiente comando para agrupar: Consulte *package.json* para saber qué empaquetar.

     wes bundle

undefined

# Instalar paquetes desde repositorios privados

*install* puede instalar no solo paquetes de repositorios públicos de *github* , sino también paquetes de repositorios privados. En la *install* , especifique el paquete con *@author/repository* . La implementación intenta descargar la siguiente url.

     `https://raw.githubusercontent.com/${author}/${repository}/master/bundle.json`

Si accede al repositorio privado *raw* con un navegador, se mostrará el *token* , así que copie el *token* y utilícelo. También puede instalar paquetes desde repositorios privados ejecutándolos en la consola mientras el *token* es válido.

     wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA

# Introducción del paquete

Aquí hay algunos paquetes externos.

## *@wachaon/fmt*

*@wachaon/fmt* *prettier* mejor empaquetado para que *wes* forme scripts. Además, si se produce un *Syntax Error* mientras está instalado *@wachaon/fmt* , puede indicar la ubicación del error.

### Instalar en pc

     wes install @wachaon/fmt

### Uso

Si hay *.prettierrc* (formato JSON) en el directorio de trabajo, se reflejará en la configuración. *fmt* está disponible tanto en *CLI* como en *module* .

#### Utilizar como *CLI* .

     wes @wachaon/fmt src/sample --write

| número sin nombre | Descripción                                        |
| ----------------- | -------------------------------------------------- |
| 1                 | Requerido. la ruta del archivo que desea formatear |

| nombrada  | nombre corto | Descripción           |
| --------- | ------------ | --------------------- |
| `--write` | `-w`         | permitir sobrescribir |

Sobrescriba el archivo con el script formateado si se `--write` o el argumento con nombre `-w` .

#### utilizar como módulo

     const fmt = require('@wachaon/fmt') const { readTextFileSync, writeTextFileSync } = require('filesystem') const { join, workingDirectory } = require('pathname') const target = join(workingDirectory, 'index.js') console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
