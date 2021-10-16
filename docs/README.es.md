# *WES*


*wes* es un marco para ejecutar *ECMAScript* en *Windows Script Host*


El texto original del *README* es [*japanese*](docs/README.ja.md) . Aparte del japonés, es una oración traducida automáticamente.  
Seleccione oraciones en otros idiomas de los siguientes.


![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）


# Características


-   *Chakra* el motor de script de *Windows Script Host* para ejecutar *ECMAScript2015* *Chakra*
-   Dado que se ejecuta *cscript.exe* 32 bits, no hay ningún problema específico en el entorno de 64 bits.
-   Importar el módulo con `require`
-   Envía caracteres de colores a la salida estándar
-   Adivina automáticamente la codificación del archivo


# Funciones no resueltas


-   `WScript.Quit` no puede interrumpir el programa y no devuelve un código de error
-   Procesamiento asincrónico
-   No se puede utilizar el *event prefix* de *event prefix* del segundo argumento de `WScript.CreateObject`


![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）


*wes* necesita es el único archivo *wes.js* Para descargar, inicie un símbolo del sistema e ingrese el siguiente comando.


```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```


*wes* en el momento de la ejecución como la implementación que *WScript.Shell* de `SendKeys` . *wes.js* la ruta del directorio donde se guarda *wes.js* contiene caracteres que no sean *ascii* , `SendKeys` no podrá enviar la clave correctamente y el script no podrá ejecutarse.  
Configure la ruta de destino para guardar de *wes.js* solo *ascii* .


![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）


En la línea de comando, especifique el archivo que será el punto de partida del programa después de `wes` . Se puede omitir la extensión de script *.js* .


```shell
wes index
```


Además, *wes* tiene un *REPL* por lo que si lo inicia solo con `wes` , puede ingresar el script directamente.


```shell
wes
```


![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）


## argumentos con nombre de línea de comandos


Las opciones de inicio para *wes* son las siguientes.


| llamado            | descripción                                           |
| ------------------ | ----------------------------------------------------- |
| `--monotone`       | Elimina el *ANSI escape code*                         |
| `--safe`           | Ejecute el script en modo seguro                      |
| `--usual`          | Ejecute el script en modo normal (predeterminado)     |
| `--unsafe`         | Ejecute el script en modo inseguro                    |
| `--dangerous`      | Ejecute el script en modo peligroso                   |
| `--debug`          | Ejecute el script en modo de depuración               |
| `--encoding=UTF-8` | Especifica la codificación del primer archivo a leer. |
| `--engine=Chakra`  | Esta opción es agregada automáticamente por *wes*     |


La implementación de `--safe` `--usual` `--unsafe` `--dangerous` está incompleta, pero los argumentos con nombre están reservados.


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


![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）


![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）


![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）


```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```


![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）


![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）


Puede manejar tampones.


```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```


## `__dirname` y `__filename`


![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）


```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```


# módulos incorporados


*wes* tiene *built-in modules* para simplificar y estandarizar el procesamiento básico.


## *ansi*


`ansi` tiene un *ANSI escape code* que le permite cambiar el color y el efecto de la salida estándar. Los colores y los efectos pueden variar según el tipo y la configuración de la aplicación de consola utilizada.


```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```


También puede crear sus propios colores con `ansi.color()` y `ansi.bgColor()` . El argumento usa *RGB* como `255, 165, 0` o *color code* como `'#FFA500'` . No puede utilizar un *color name* como `orange` .


```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```


![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）


![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）


*argv.unnamed* y *argv.named* el tipo de valor del argumento de la línea de comando en uno de los *Number* *Boolean* *String* .


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


```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```


## *filesystem*


Manipula archivos y directorios. `readTextFileSync` adivina automáticamente la codificación del archivo y lo lee.


```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```


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


![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）


## *VBScript*


*VBScript* ofrece algunas características que *JScript* no tiene.


```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```


![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）


![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）


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


*github* publicar un módulo en *github* , *bundle* agrupa el módulo requerido y lo cambia a un formato que pueda ser importado por el módulo de *install* .


![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）


Existen algunas condiciones para agrupar módulos.


1.  *repository* se puede publicar un tipo de módulo en un *repository* .
2.  *github* nombre del repositorio de *github* y el nombre del directorio de trabajo local deben ser iguales.
3.  El repositorio debe ser público si desea publicar el módulo para un tercero.
4.  *wes* no interpreta estáticamente el guión. Los módulos adquiridos por `require` en condiciones específicas como, por ejemplo, `if` declaraciones no se pueden agrupar.
5.  *.json* archivo será creado en el directorio de trabajo con el nombre *directory_name.json* . Si cambia el nombre del archivo o lo mueve, no podrá instalarlo.
6.  `node_modules/directory_name` empaquetado falla porque hace referencia a `directory_name.json` .


## *install*


![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）


### uso


![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）


```shell
wes install @wachaon/fmt
```


![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）


| llamado    | nombre corto | descripción                                                 |
| ---------- | ------------ | ----------------------------------------------------------- |
| `--bare`   | `-b`         | No cree la carpeta *@author*                                |
| `--global` | `-g`         | Instale el módulo en la carpeta donde se encuentra *wes.js* |


![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）


```shell
wes install @wachaon/fmt --bare --unsafe
```


![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）


*install* se puede instalar no solo en módulos de repositorios públicos de *github* , sino también en repositorios privados.


*install* , especifique el módulo con `author@repository` . La implementación descarga lo siguiente.


![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）


Al acceder a la *raw* del depósito privado con un navegador, el *token* se mostrará, por lo que copiar el *token* y lo utilizan.


![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）


```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```


# Módulo externo


A continuación se muestran algunos módulos externos.


## *@wachaon/fmt*


![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）


### Instalar en pc


![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）


### uso


Si hay *.prettierrc* (formato JSON) en el directorio de trabajo, se reflejará en la configuración. *fmt* puede utilizar tanto con *CLI* (interfaz de línea de comandos) como con el *module* en *fmt* .


Usar como *CLI*


```shell
wes @wachaon/fmt src/sample --write
```


| número sin nombre | descripción                                        |
| ----------------- | -------------------------------------------------- |
| 0                 | ---                                                |
| 1                 | Requerido. La ruta del archivo que desea formatear |


![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）


Sobrescribe el archivo con una secuencia de comandos formateada si se especifica un argumento con nombre de `--write` o `-w` .


![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）


### `option`


![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）
