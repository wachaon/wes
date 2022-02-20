# *WES*


*wes* es un marco de consola que ejecuta *ECMAScript* en *WSH (Windows Script Host)* .


El texto original del *README* es [*japanese*](/README.md) . Aparte del japonés, es una oración traducida automáticamente.  
Seleccione oraciones en otros idiomas de las siguientes.


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


-   Puede cambiar el motor de script a *Chakra* y escribirlo en la especificación *ECMAScript2015*
-   Siempre ejecuta *cscript.exe* de 32 bits, por lo que no hay problemas inherentes en un entorno de 64 bits.
-   Con un sistema modular, puede desarrollar de manera más eficiente que el *WSH* tradicional
-   El módulo incorporado admite el procesamiento básico, como la entrada/salida de archivos y la salida de caracteres de colores a la consola.
-   No tiene que preocuparse por la codificación porque puede hacer que la lectura del archivo adivine automáticamente la codificación.
-   También empaquetamos módulos para admitir la publicación y recuperación externas.


# Problemas *wes* que no podemos resolver


-   `WScript.Quit` no puede interrumpir el programa y no devuelve un código de error
-   No es posible el procesamiento asíncrono como `setTimeout` y `Promise`
-   No puede usar el *event prefix* como segundo argumento de `WScript.CreateObject`


# Instalar en pc


Wes solo necesita el *wes* *wes.js* Para descargar, copie *wes.js* desde [*@wachaon/wes*](https://github.com/wachaon/wes) o ejecute el siguiente comando en la consola.


```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```


*WScript.Shell* usa `SendKeys` en *wes* en tiempo de ejecución como implementación. Si la ruta del directorio donde se guarda *wes.js* contiene caracteres que no sean *ascii* , `SendKeys` no podrá enviar la clave correctamente y el script no podrá ejecutarse.  
Configure la ruta de destino para guardar de *wes.js* solo *ascii* .


# Cómo utilizar


Ingrese el comando a la consola que especifica el archivo que será el punto de partida del programa siguiendo la palabra clave `wes` . La extensión de secuencia de comandos *.js* se puede omitir.


```shell
wes index
```


Además, *wes* tiene un *REPL* , por lo que si lo inicia solo con `wes` , puede ingresar el script directamente.


```shell
wes
```


El *REPL* acepta entrada de script hasta que ingrese dos líneas en blanco. También puede verificar la ejecución del script de muestra en *README.md* con *REPL* .


## Opciones de la línea de comandos


Las opciones de inicio para *wes* son las siguientes.


| llamado            | descripción                                             |
| ------------------ | ------------------------------------------------------- |
| `--monotone`       | Eliminar *ANSI escape code*                             |
| `--safe`           | Ejecute el script en modo seguro                        |
| `--usual`          | Ejecute el script en modo normal (predeterminado)       |
| `--unsafe`         | Ejecute el script en modo no seguro                     |
| `--dangerous`      | Ejecute el script en modo peligroso                     |
| `--debug`          | Ejecute el script en modo de depuración                 |
| `--encoding=UTF-8` | Especifica la codificación del primer archivo para leer |
| `--engine=Chakra`  | Esta opción es agregada automáticamente por *wes*       |


La implementación de `--safe` `--usual` `--unsafe` `--dangerous` `--debug` está incompleta, pero los argumentos con nombre están reservados.


# Sistema modular


*wes* admite dos sistemas de módulos, un sistema *commonjs module* que usa `require()` y un *es module* que usa `import` . ( *dynamic import* es un procesamiento asincrónico, por lo que no se admite)


## *commonjs module*


Administre módulos asignándolos a `module.exports` y llamando con `require()` . Para mayor comodidad, también es compatible con el directorio *node_modules* .


*wes* `require()` adivina automáticamente la codificación del archivo del módulo, pero si no adivina correctamente, puede especificar la codificación con el segundo argumento.


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


También puede importar a *ActiveX* con *require* `require('WScript.Shell')` .


```javascript
const Shell = require('Shell.Application')
Shell.MinimizeAll()
WScript.Sleep(2000)
Shell.UndoMinimizeAll()
```


## *es module*


*Chakra* , que es el motor de ejecución del script, interpreta la sintaxis como `imoprt` , pero no se puede ejecutar tal cual porque el método de procesamiento como `cscript` no está definido. En *wes* , al agregar *babel* al módulo incorporado, se ejecuta mientras se transpila secuencialmente al *es module* . Como resultado, la sobrecarga de procesamiento y el archivo *wes.js* se inflan como un costo.


Los módulos descritos por el *es module* es también se convierten en `require()` mediante transpile, por lo que también son posibles las llamadas *ActiveX* . Sin embargo, no es compatible con la especificación de codificación de archivos del módulo en el *es module* . Todos se leen por adivinación automática.


Para cargarlo como un *es module* , establezca la extensión en `.mjs` o el campo `"type"` de `package.json` en `"module"` .


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


# Objeto incorporado


*wes* tiene *built-in objects* que *WSH (JScript)* no tiene.


## *console*


*wes* usa *console* en lugar de `WScript.Echo` o `WScript.StdErr.WriteLine` .


Imprime caracteres en la consola en `console.log` . También admite cadenas formateadas. Imprime una cadena formateada usando el operador de formato `%` .


```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```


\|


`WScript.StdOut.WriteLine` *wes* de `WScript.StdErr.WriteLine` para generar cadenas de colores. `WScript.Echo` y `WScript.StdOut.WriteLine` están bloqueados para la salida. `WScript.StdErr.WriteLine` o `console.log` .


## *Buffer*


Puede manejar búferes.


```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```


## `__dirname` y `__filename`


`__filename` contiene la ruta del archivo del módulo que se está ejecutando actualmente. `__dirname` contiene el directorio de `__filename` .


```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```


# Módulo incorporado


*wes* tiene *built-in modules* para simplificar y estandarizar el procesamiento básico.


## *ansi*


`ansi` es un *ANSI escape code* que le permite cambiar el color y el efecto de la salida estándar. Los colores y los efectos pueden variar según el tipo y la configuración de la aplicación de consola utilizada.


```javascript
const { redBright, yellow } = require('ansi')
const message = 'File does not exist'
console.log(redBright + 'Error: ' + yellow + message)
```


También puede crear sus propios colores con `ansi.color()` y `ansi.bgColor()` . El argumento usa *RGB* como `255, 165, 0` o *color code* como `'#FFA500'` . No admite *color name* como `orange` .


```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```


## *argv*


Obtiene el argumento de la línea de comando. Los argumentos de la línea de comandos en `cscript.exe` declaran argumentos con nombre con `/` `--` mientras que *wes* declara argumentos con nombre con `-` y -.


*argv.unnamed* y *argv.named* el tipo de valor del argumento de la línea de comando en uno de los *Boolean* de *Number* de *String* .


Introduzca los argumentos de la línea de comandos junto con *REPL* .


```shell
wes REPL aaa -bcd eee --fgh=iii jjj --kln mmm
```


Ejecute el siguiente script en *REPL* .


```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```


## *pathname*


Operar el camino.


Las rutas que comienzan con `/` y `\` generalmente se refieren a rutas relativas a la raíz de la unidad. Por ejemplo, `/filename` y `C:/filename` pueden tener la misma ruta. Por razones de seguridad, `wes` interpreta las rutas que comienzan con `/` y `\` como relativas al directorio de trabajo.


```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```


## *filesystem*


Operar archivos y directorios. `readTextFileSync` adivina y lee automáticamente la codificación del archivo.


```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```


## *chardet*


Estoy usando algunas características de <https://github.com/runk/node-chardet> .


Puede mejorar la precisión de las adivinanzas automáticas aumentando los caracteres específicos de la codificación.


## *JScript*


Si cambia el motor de secuencias de comandos a *Chakra* , no podrá usar el *Enumerator* específico de *JScript* , etc. El módulo integrado *JScript* los pone a disposición. Sin embargo, *Enumerator* devuelve un *Array* en lugar de un *Enumerator object* .


```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```


*GetObject* actúa como una alternativa a `WScript.GetObject` .


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


*VBScript* proporciona algunas funciones que *JScript* no tiene.


```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```


## *httprequest*


*httprequest* emite una *http request* .


```javascript
const request = require('httprequest')
const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log('%O', JSON.parse(content))
```


## *minitest*


*minitest* puede escribir pruebas simples.


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


*pipe* simplifica el procesamiento de tuberías.


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


Determinar el tipo de guión.


```javascript
const { isString, isNumber, isBoolean, isObject } = require('typecheck')
const log = require('log')

log(() => isString("ECMAScript"))
log(() => isNumber(43.5))
log(() => isBoolean(false))
log(() => isObject(function(){}))
```


## *zip*


Comprime archivos y carpetas y descomprime archivos comprimidos. Llama a *PowerShell* internamente y lo procesa.


```javascript
const {zip, unzip} = require('zip')

console.log(zip('docs\\*', 'dox.zip'))
console.log(unzip('dox.zip'))
```


Los comodines `*` se pueden escribir en la `path` del `zip(path, destinationPath)` .


Se puede utilizar tanto con *CLI (Command Line Interface)* como con el *module* .


```shell
wes zip docs\* dox.zip
wes zip -p dox.zip
```


Si `path` tiene la extensión `.zip` , se procesa `unzip()` y no hay una descripción de la extensión `.zip` . O incluso si hay una extensión `.zip` , si hay una descripción de un comodín `*` , se procesará `zip()` .


| sin nombre | descripción                           |
| ---------- | ------------------------------------- |
| `1`        | `path` Carpeta o archivo a ingresar   |
| `2`        | archivo de carpeta a `dest` de salida |


| llamado  | nombre corto | descripción                           |
| -------- | ------------ | ------------------------------------- |
| `--path` | `-p`         | `path` Carpeta o archivo a ingresar   |
| `--dest` | `-d`         | archivo de carpeta a `dest` de salida |


# Empaquetado e instalación de módulos


En *wes* , un conjunto de varios módulos se denomina paquete. Puede instalar el paquete para *wes* publicado en *github* . Necesitará un *github repository* para publicar el paquete. Además, el nombre del repositorio y el nombre del directorio local deben ser iguales.


## *bundle*


Al publicar el paquete en *github* , *bundle* agrupa los módulos necesarios y cambia el formato para que pueda importarse mediante la instalación.


Por razones de seguridad, *bundle* crea un archivo *.json* porque *wes* no le permite importar paquetes en un formato que se pueda ejecutar directamente.


Hay algunas condiciones para el embalaje.


1.  Solo se puede publicar un módulo en un *repository*

2.  Asegúrese de que el nombre del repositorio en *github* y el nombre del directorio de trabajo local sean iguales.

3.  Si publica el paquete, haga *public* el repositorio

4.  Declarar la adquisición del módulo en el ámbito de nivel superior

5.  El archivo *.json* del paquete se crea en su *directory_name.json* de trabajo con el nombre nombre_directorio.json. Si cambia el nombre del archivo o lo mueve, no podrá consultarlo durante la instalación.

6.  `node_modules/directory_name` es el punto de partida del paquete

    ```shell
        wes bundle directory_name
    ```

    sin liarse con

    ```shell
        wes bundle node_modules/directory_name
    ```

    Paquete con


## *install*


Se usa para instalar el paquete para *wes* publicado en *github* .


### Cómo utilizar


Pase argumentos para *install* en el formato `@author/repository` .


```shell
wes install @wachaon/fmt
```


*install* tiene opciones.


| llamado    | nombre corto | descripción                                                 |
| ---------- | ------------ | ----------------------------------------------------------- |
| `--bare`   | `-b`         | No cree la carpeta *@author*                                |
| `--global` | `-g`         | Instale el módulo en la carpeta donde se encuentra *wes.js* |


`--bare` puede omitir el argumento `require` de `author@repository` a `repository` . `--global` hace que los módulos instalados estén disponibles para todos los scripts. Las opciones anteriores deben especificarse al mismo tiempo que la opción de seguridad *wes* `--unsafe` o `--dangerous` .


```shell
wes install @wachaon/fmt --bare --unsafe
```


# Instalación de paquetes en repositorios privados


*install* puede instalar no solo módulos en repositorios públicos en *github* , sino también en repositorios privados.


En la *install* , especifique el módulo con *@author/repository* . La implementación intentará descargar la siguiente url.


```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```


Cuando acceda al *raw* del repositorio privado con un navegador, se mostrará el *token* , así que copie el *token* y utilícelo.


También puede instalar un módulo en un repositorio privado ejecutándolo en la consola durante la vigencia del *token* .


```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```


# Introducción del paquete


Aquí hay algunos módulos externos.


## *@wachaon/fmt*


*@wachaon/fmt* es un paquete *prettier* para *wes* y formatea el script. Además, si ocurre un *Syntax Error* con *@wachaon/fmt* instalado, puede indicar la ubicación del error.


### Instalar en pc


```shell
wes install @wachaon/fmt
```


### Cómo utilizar


Si hay *.prettierrc* (formato JSON) en el directorio de trabajo, se reflejará en la configuración. *fmt* se puede usar tanto con *CLI* como con *module* .


#### Utilizado como *CLI* .


```shell
wes @wachaon/fmt src/sample --write
```


| número sin nombre | descripción                                        |
| ----------------- | -------------------------------------------------- |
| 0                 | ――――                                               |
| 1                 | Requerido. La ruta del archivo que desea formatear |


| llamado   | nombre corto | descripción           |
| --------- | ------------ | --------------------- |
| `--write` | `-w`         | Permitir sobrescribir |


Sobrescriba el archivo con un script formateado si especifica un argumento con nombre de `--write` o `-w` .


#### Usar como un módulo


```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')

const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```


## *@wachaon/edge*


*Internet Explorer* completará el soporte el 15/6/2022. Como resultado, se espera que no sea posible operar la aplicación con `require('InternetExplorer.Application')` .


Una alternativa sería operar *Microsoft Edge based on Chromium* través del *web driver* . `@wachaon/edge` simplifica el piloto automático de *Edge* .


### Instalar en pc


Primero, instale el módulo.


```shell
wes install @wachaon/edge --unsafe --bare
```


Luego descargue el *web driver* .


```shell
wes edge --download
```


Comprueba la versión instalada de *Edge* y descarga el *web driver* correspondiente.


### Cómo utilizar


Será fácil de usar.


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


Este script generará secuencialmente las *URL* visitadas en la consola.


`@wachaon/edge` registra un evento para la *URL* y agrega datos a `res.exports` . La *URL* que se registrará puede ser `String` `RegExp` y se pueden realizar configuraciones flexibles.


Al hacerlo controlado por eventos, es posible cambiar fácilmente a la operación manual al no configurar un evento para el procesamiento que es difícil de manejar con el piloto automático.


Si desea detener la secuencia de comandos, ejecute `navi.emit('terminate', res)` o finalice manualmente *Edge* .


El proceso de finalización genera `res.exports` como un archivo *.json* como valor predeterminado. Si desea establecer el proceso de terminación, establezca la `terminate` de `edge(callback, terminate)` .


`window` no es una `window` en el navegador, sino una instancia de la clase *Window* de *@wachaon/webdriver* .


## *@wachaon/webdriver*


Es un módulo que envía una solicitud al *web driver* que opera el navegador. Integrado en *@wachaon/edge* . Al igual que *@wachaon/edge* , se requiere un *web driver* para el funcionamiento del navegador.


### Instalar en pc


```shell
wes install @wachaon/webdriver --unsafe --bare
```


Si no tiene un *web driver* , descárguelo.


```shell
wes webdriver --download
```
