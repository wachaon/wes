# *WES*


*wes* es un marco para ejecutar *ECMAScript* en *Windows Script Host*


El texto original del *README* es [*japanese*](/README.md) . Aparte del japonés, es una oración traducida automáticamente.  
Seleccione oraciones en otros idiomas de los siguientes.


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



# Características


-   Cambie el motor de *Windows Script Host* de *Windows Script Host* de *Windows Script Host* a *Chakra* y ejecute *ECMAScript2015* *Chakra*
-   Siempre ejecuta *cscript.exe* 32 bits, por lo que no hay errores inherentes en el entorno de 64 bits.
-   Importe el módulo con `require` (correspondiente al *es module* de la *ver 0.9.0* )
-   Envía caracteres de colores a la salida estándar
-   Adivina y lee automáticamente la codificación del archivo de texto


# Problemas conocidos que no podemos resolver


-   `WScript.Quit` no puede interrumpir el programa y no devuelve un código de error
-   El procesamiento asincrónico como `setTimeout` y `Promise` no es posible
-   No se puede utilizar el *event prefix* de *event prefix* del segundo argumento de `WScript.CreateObject` .


# Instalar en pc


*wes* necesita es el único archivo *wes.js* Para descargar, inicie un símbolo del sistema e ingrese el siguiente comando.


```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```


*wes* en el momento de la ejecución como la implementación que *WScript.Shell* de `SendKeys` . *wes.js* la ruta del directorio donde se guarda *wes.js* contiene caracteres que no sean *ascii* , `SendKeys` no podrá enviar la clave correctamente y el script no podrá ejecutarse.  
Configure la ruta para guardar *wes.js* solo *ascii* .


## Uso


En la línea de comando, especifique el archivo que será el punto de partida del programa después de `wes` . Se puede omitir la extensión de script *.js* .


```shell
wes index
```


Además, *wes* tiene un *REPL* por lo que si lo inicia solo con `wes` , puede ingresar el script directamente.


```shell
wes
```


Se aceptarán scripts hasta que ingrese dos líneas en blanco. *README.md* puede verificar la ejecución del script de muestra en *README.md* con *REPL* .


## argumentos con nombre de línea de comandos


Las opciones de inicio para *wes* son las siguientes.


| nombrada           | descripción                                           |
| ------------------ | ----------------------------------------------------- |
| `--monotone`       | Elimina el *ANSI escape code*                         |
| `--safe`           | Ejecute el script en modo seguro                      |
| `--usual`          | Ejecute el script en modo normal (predeterminado)     |
| `--unsafe`         | Ejecute el script en modo inseguro                    |
| `--dangerous`      | Ejecute el script en modo peligroso                   |
| `--debug`          | Ejecute el script en modo de depuración               |
| `--encoding=UTF-8` | Especifica la codificación del primer archivo a leer. |
| `--engine=Chakra`  | Esta opción es agregada automáticamente por *wes*     |


La implementación de `--safe` `--usual` `--unsafe` `--dangerous` `--debug` está incompleta, pero los argumentos con nombre están reservados.


# objetos incorporados


*wes* tiene *built-in objects* que *WSH (JScript)* no tiene.


## *require*


Importe el módulo con *require* . *wes* adivina automáticamente la codificación del archivo del módulo, pero si no adivina correctamente, puede especificar la codificación con el segundo argumento.


Además, `require('WScript.Shell')` partir de *OLE* incluso para *require* importación es posible con.


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


## `module` y `module.exports`


Si desea definirlo como un módulo, `module.exports` a `module.exports` .


```javascript
function add (a, b) {
    return a + b
}

module.exports = add
```


## *console*


*wes* En `WScript.Echo` y `WScript.StdErr.WriteLine` lugar de la *console* use el.


Imprima caracteres en la línea de comando en `console.log` . También es compatible con cadenas formateadas. Imprime una cadena formateada utilizando el operador de formato `%` .


```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```


*wes* para generar una cadena coloreada en `WScript.StdOut.WriteLine` en `WScript.StdOut.WriteLine` lugar, utilice `WScript.StdErr.WriteLine` . `WScript.Echo` y `WScript.StdOut.WriteLine` están bloqueados desde la salida, así que el uso `WScript.StdErr.WriteLine` o `console.log` .


## *Buffer*


Puede manejar tampones.


```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```


## `__dirname` y `__filename`


`__filename` contiene la ruta del archivo del módulo que se está ejecutando actualmente. `__dirname` `__filename` el directorio de `__filename` .


```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```


# módulos incorporados


*wes* tiene *built-in modules* para simplificar y estandarizar el procesamiento básico.


## *ansi*


`ansi` tiene un *ANSI escape code* que le permite cambiar el color y el efecto de la salida estándar. Los colores y efectos pueden variar según el tipo y la configuración de la aplicación de consola utilizada.


```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```


También puede crear sus propios colores con `ansi.color()` y `ansi.bgColor()` . El argumento usa *RGB* como `255, 165, 0` o *color code* como `'#FFA500'` . No admite *color name* como `orange` .


```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```


## *argv*


Obtiene el argumento de la línea de comando. `cscript.exe` argumentos de línea de comando de `/` declara argumentos con nombre en pero, *wes* en `-` y `--` declara los argumentos con nombre en.


*argv.unnamed* y *argv.named* el tipo de valor del argumento de la línea de comando en uno de los *Boolean* *Number* *String* .


Ingrese los argumentos de la línea de comando junto con el *REPL* .


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


Opere el camino.


Generalmente, las rutas que comienzan con `/` y `\` refieren a rutas relativas desde la raíz de la unidad (por ejemplo, `/filename` puede ser la misma ruta que `C:/filename` ), pero por seguridad en `wes` `/` y las rutas que comienzan con `\` se interpretan como relativas a el directorio de trabajo.


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


Estoy usando algunas funciones de <https://github.com/runk/node-chardet> .


Puede mejorar la precisión de la adivinación automática aumentando los caracteres específicos de la codificación.


## *JScript*


Si cambia el motor de secuencias de *Chakra* , usted no será capaz de utilizar *JScript* específica *Enumerator* etc. El módulo incorporado *JScript* hace disponibles. Sin embargo, *Enumerator* devuelve un objeto *Array* lugar de un objeto Enumerator.


```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```


*GetObject* `WScript.GetObject` como una alternativa a `WScript.GetObject` .


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


*httprequest* es como su nombre la *http request* emitirá un *httprequest* .


```javascript
const request = require('httprequest')
const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log('%O', JSON.parse(content))
```


## *minitest*


*minitest* puede escribir pruebas sencillas.


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


*pipe* simplifica el procesamiento de la tubería


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


Determina el tipo de guión.


```javascript
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```


# Paquete de módulos e instalación


*install* , puede instalar el módulo para *wes* publicado en *github* . Necesitará un *github repository* para publicar el módulo. Además, el nombre del repositorio y el nombre del directorio local deben ser iguales.


## *bundle*


*github* publicar un módulo en *github* , *bundle* agrupa el módulo requerido y lo cambia a un formato que pueda ser importado por el módulo de *install* .


Por razones de seguridad, *wes* no importa módulos en un formato que se pueda ejecutar directamente, así que cree un archivo *.json* con el módulo del *bundle* .


Existen algunas condiciones para agrupar módulos.


1.  *repository* se puede publicar un tipo de módulo en un *repository* .
2.  El nombre del repositorio en *github* y el nombre del directorio de trabajo local deben ser el mismo.
3.  El repositorio debe ser público si desea publicar el módulo para un tercero.
4.  *wes* interpreta dinámicamente la ruta del módulo. Los módulos adquiridos por `require` en condiciones específicas como, por ejemplo, `if` declaraciones no se pueden agrupar.
5.  *.json* archivo será creado en el directorio de trabajo con el nombre *directory_name.json* . No se puede instalar si se cambia el nombre del archivo o si se mueve.
6.  `node_modules/directory_name` , el paquete falla porque hace referencia a `directory_name.json` .


## *install*


Se utiliza para instalar el archivo del módulo para *wes* publicado en *github* .


### uso


Pasar argumentos para *install* en el formato `@author/repository`


```shell
wes install @wachaon/fmt
```


*install* tiene opciones


| nombrada   | nombre corto | descripción                                         |
| ---------- | ------------ | --------------------------------------------------- |
| `--bare`   | `-b`         | No cree la carpeta *@author*                        |
| `--global` | `-g`         | Instale el módulo en la carpeta donde está *wes.js* |


`--bare` opción `--bare` puede omitir el argumento `require` del `author@repository` al `repository` . `--global` opción `--global` hace que los módulos instalados estén disponibles para todos los scripts. Las opciones anteriores deben especificarse al mismo tiempo que la opción de seguridad *wes* `--unsafe` o `--dangerous` .


```shell
wes install @wachaon/fmt --bare --unsafe
```


# Instalar el módulo de repositorio privado


*install* se puede instalar no solo en módulos en repositorios públicos en *github* , sino también en repositorios privados.


*install* , especifique el módulo con `author@repository` . La implementación descarga lo siguiente.


```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```


Cuando se accede a *raw* del depósito privado con un navegador, el *token* se mostrará, por lo que copiar el *token* y lo utilizan.


También puede instalar un módulo en un repositorio privado ejecutándolo en la línea de comandos dentro de la *token* del *token* .


```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```


# Módulo externo


A continuación se muestran algunos módulos externos.


## *@wachaon/fmt*


*@wachaon/fmt* *prettier* y formatea el script. Además, si *@wachaon/fmt* está instalado y se produce un error de `SyntaxError` , se puede indicar la ubicación del error.


### Instalar en pc


```shell
wes install @wachaon/fmt
```


### uso


Si hay *.prettierrc* (formato JSON) en el directorio de trabajo, se reflejará en la configuración. *fmt* puede utilizar tanto con *CLI* (interfaz de línea de comandos) como con el *module* en *fmt* .


Usar como *CLI*


```shell
wes @wachaon/fmt src/sample --write
```


| número sin nombre | descripción                                        |
| ----------------- | -------------------------------------------------- |
| 0                 | ――――                                               |
| 1                 | Requerido. La ruta del archivo que desea formatear |


| nombrada  | nombre corto | descripción           |
| --------- | ------------ | --------------------- |
| `--write` | `-w`         | Permitir sobrescribir |


Sobrescriba el archivo con una secuencia de comandos formateada si especifica un argumento con nombre de `--write` o `-w` .


### Cuando se usa como *module*


### `option`


```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')

const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```
