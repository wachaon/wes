# *WES*

*wes* es un marco para ejecutar *ECMAScript* en *Windows Script Host*

*README* original del [*japanese*](README.ja.md) será. Aparte del japonés, será texto traducido automáticamente.  
Seleccione una oración en otro idioma de los siguientes.

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

## Caracteristicas

-   Cambie el motor de secuencia de comandos a *Chakra* y ejecute *ECMAScript2015* *Chakra*
-   *cscript.exe* 32 bits y no causa ningún error específico del entorno de 64 bits
-   importar el módulo con `require`
-   Envía caracteres de colores a la salida estándar
-   Adivina la codificación del archivo automáticamente

## Funciones no resueltas

-   `WScript.Quit` no puede interrumpir el programa y no devuelve un código de error
-   Procesamiento asincrónico
-   `WScript.CreateObject` el *event prefix* de *event prefix* del segundo argumento de `WScript.CreateObject`

## Instalar en pc

*wes* necesita es el único archivo *wes.js* Para descargar, inicie el símbolo del sistema e ingrese el siguiente comando.

```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

*wes* usa `SendKeys` *WScript.Shell* en tiempo de ejecución. *wes.js* la ruta del directorio donde se guarda *wes.js* contiene caracteres que no sean *ascii* , `SendKeys` no puede enviar la clave correctamente y el script no se puede ejecutar.  
Configure *ascii* solo para la ruta para guardar *wes.js*

## Uso

En la línea de comando, especifique el archivo que es el punto de inicio del programa después de `wes` . Se puede omitir la extensión de script *.js* .

```shell
wes index
```

Además, *wes* viene con un *REPL* por lo que si lo inicia solo con `wes` , puede ingresar el script directamente.

```shell
wes
```

Se acepta la entrada de script hasta que ingrese dos líneas en blanco. *README.md* puede verificar la ejecución del script de muestra en *README.md* con *REPL* .

## argumentos con nombre de línea de comandos

Las opciones de inicio de *wes* son las siguientes.

| nombrada           | descripción                                              |
| ------------------ | -------------------------------------------------------- |
| `--monotone`       | Elimina el *ANSI escape code*                            |
| `--safe`           | Ejecute el script en modo seguro                         |
| `--usual`          | Ejecute el script en modo normal (predeterminado)        |
| `--unsafe`         | Ejecute el script en modo inseguro                       |
| `--dangerous`      | Ejecute el script en modo peligroso                      |
| `--debug`          | Ejecute el script en modo de depuración                  |
| `--encoding=UTF-8` | Especifica la codificación del archivo para leer primero |
| `--engine=Chakra`  | Esta opción es agregada automáticamente por *wes*        |

La implementación de `--safe` `--usual` `--unsafe` `--dangerous` está incompleta, pero los argumentos con nombre están reservados.

## objetos incorporados

*wes* tiene *built-in objects* que *WSH (JScript)* no tiene.

### *require*

Importe el módulo con *require* . *wes* adivina automáticamente la codificación del archivo del módulo, pero si no lo adivina correctamente, puede especificar la codificación con el segundo argumento.

También puede importar con *require* para *OLE* como `require('WScript.Shell')` .

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

### module y module.exports

Si desea definirlo como módulo, sustitúyalo en `module.exports` .

```javascript
function add (a, b) {
    return a + b
}

module.exports = add
```

### *console*

*wes* En `WScript.Echo` y `WScript.StdErr.WriteLine` lugar de la *console* use el.

Salida de caracteres a la línea de comando con `console.log` . También admite cadenas formateadas. Genere la cadena de formato utilizando el operador de formato `%` .

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

*wes* para generar una cadena coloreada en `WScript.StdOut.WriteLine` en `WScript.StdOut.WriteLine` lugar, utilice `WScript.StdErr.WriteLine` . `WScript.Echo` salida de `WScript.Echo` y `WScript.StdOut.WriteLine` está bloqueado, el uso `WScript.StdOut.WriteLine` o `console.log` .

### *Buffer*

Puede manejar tampones.

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```

### `__dirname` y `__filename`

`__filename` almacena la ruta del archivo del módulo que se está ejecutando actualmente. `__dirname` almacena el directorio `__filename` .

```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```

## módulos incorporados

*wes* tiene *built-in modules* para simplificar y estandarizar el procesamiento básico.

### *ansi*

`ansi` tiene un *ANSI escape code* que le permite cambiar los colores y efectos de la salida estándar. Los colores y los efectos pueden variar según el tipo y la configuración de la aplicación de consola utilizada.

```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```

También puede crear su propio color con `ansi.color()` o `ansi.bgColor()` . Los argumentos utilizan *RGB* como `255, 165, 0` o *color code* como `'#FFA500'` . No puede utilizar *color name* como `orange` .

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

### *argv*

Obtiene argumentos de la línea de comandos. `cscript.exe` argumentos de línea de comandos de `/` declara argumentos con nombre en pero, *wes* en `-` y `--` declara los argumentos con nombre en.

*argv.unnamed* y *argv.named* el tipo de valor del argumento de la línea de comando en uno de *String* *Number* *Boolean* .

Ingrese argumentos en la línea de comando con *REPL* .

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

### *pathname*

Opere el camino.

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

### *filesystem*

Opera archivos y directorios. `readTextFileSync` adivina automáticamente la codificación del archivo y lo lee.

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```

### *JScript*

Si cambia el motor de secuencias de *Chakra* , usted no será capaz de utilizar *JScript* específicos *Enumerator* . El módulo incorporado *JScript* hace disponibles. Sin embargo, *Enumerator* devuelve un objeto *Array* lugar de un objeto Enumerator.

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

### *VBScript*

*VBScript* ofrece algunas de las características que *JScript* no tiene.

```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```

### *httprequest*

*httprequest* es como su nombre la *http request* emitirá un *httprequest* .

```javascript
const request = require('httprequest')
const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log('%O', JSON.parse(content))
```

### *minitest*

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

### *pipe*

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

### *typecheck*

Juzga el tipo de guión.

```javascript
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```

## Paquete de módulos e instalación

*install* , puede instalar el módulo para *wes* publicado en *github* . Para publicar el módulo, necesita el *github repository* . Además, el nombre del repositorio y el nombre del directorio local deben ser iguales.

### *bundle*

*github* publicar un módulo en *github* , *bundle* los módulos necesarios y lo cambia a un formato que pueda ser incluido por el módulo de *install* .

En consideración a la seguridad, *wes* no importa el módulo que se puede ejecutar directamente, así que cree el archivo *.json* en el módulo del *bundle* .

Existen algunas condiciones para agrupar módulos.

1.  *repository* se puede publicar un tipo de módulo en un *repository* .
2.  *github* nombre del repositorio de *github* y el nombre del directorio de trabajo local deben ser iguales.
3.  El repositorio debe ser público si desea publicar el módulo para un tercero.
4.  *wes* no interpreta estáticamente el guión. Los módulos que lo `require` bajo ciertas condiciones, como declaraciones `if` , no pueden estar agrupados.
5.  *.json* archivo será creado en el directorio de trabajo con el nombre *directory_name.json* . Si cambia el nombre del archivo o mueve el archivo, no podrá instalarlo.
6.  `node_modules/directory_name` , el empaquetado falla porque hace referencia a `directory_name.json` .

### *install*

Se utiliza para instalar el archivo de módulo para *wes* publicado en *github* .

## uso

Pasar argumentos para *install* en el formato `@author/repository`

```shell
wes install @wachaon/fmt
```

*install* tiene opciones

| nombrada   | nombre corto | descripción                                         |
| ---------- | ------------ | --------------------------------------------------- |
| `--bare`   | `-b`         | no cree la carpeta *@author*                        |
| `--global` | `-g`         | Instale el módulo en la carpeta donde está *wes.js* |

`--bare` opción `--bare` puede omitir el argumento `require` del `author@repository` al `repository` . `--global` opción `--global` hace que el módulo instalado esté disponible para todos los scripts. Las opciones anteriores deben especificarse con la opción de seguridad *wes* `--unsafe` o `--dangerous` .

```shell
wes install @wachaon/fmt --bare --unsafe
```

# Instalar el módulo de repositorio privado

*install* se puede instalar no solo en el módulo de repositorio público de *github* sino también en el repositorio privado.

*install* , especifique el módulo con `author@repository` . Lo siguiente se descarga en la implementación.

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```

Cuando accede al *raw* del repositorio privado con un navegador, se *token* el *token* , así que copie el *token* y utilícelo.

Si lo ejecuta en la línea de comando dentro del tiempo válido del *token* , puede instalar el módulo del repositorio privado.

```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

## Módulo externo

Aquí presentamos algunos módulos externos.

### *@wachaon/fmt*

*@wachaon/fmt* es un paquete de *prettier* que formatea el script. Además, si se produce `SyntaxError` mientras *@wachaon/fmt* está instalado, se puede presentar la ubicación del error.

#### Instalar en pc

```shell
wes install @wachaon/fmt
```

#### uso

Si hay *.prettierrc* (formato JSON) en el directorio de trabajo, *.prettierrc* en la configuración. *fmt* se puede utilizar tanto con *CLI* (interfaz de línea de comandos) como con el *module* .

Usar como *CLI*

```shell
wes @wachaon/fmt src/sample --write
```

| número sin nombre | descripción                                        |
| ----------------- | -------------------------------------------------- |
| 0                 | -                                                  |
| 1                 | Necesario. La ruta del archivo que desea formatear |

| nombrada  | nombre corto | descripción           |
| --------- | ------------ | --------------------- |
| `--write` | `-w`         | Permitir sobrescribir |

Sobrescribe el archivo con una secuencia de comandos formateada si se le proporciona un argumento con nombre `--write` o `-w` .

#### *module* usa como *module*

#### `option`

```javascript
{
    parser: 'babel',
    plugins: [babel]
}
```