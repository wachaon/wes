# _WES_

_wes_ es un marco para ejecutar _ECMAScript_ en _Windows Script Host_

El texto original del _README_ es [_japanese_](README.ja.md) . Aparte del japonés, es una oración traducida automáticamente.  
Seleccione oraciones en otros idiomas de los siguientes.

## Características

-   Cambie el motor de secuencia de comandos a _Chakra_ y ejecute _ECMAScript2015_ _Chakra_
-   _cscript.exe_ 32 bits y no tiene errores específicos del entorno de 64 bits
-   Importar el módulo con `require`
-   Envía caracteres de colores a la salida estándar
-   Adivina automáticamente la codificación del archivo

## Funciones no resueltas

-   `WScript.Quit` no puede interrumpir el programa y no devuelve un código de error
-   Procesamiento asincrónico
-   Utilización del _event prefix_ de _event prefix_ del segundo argumento de `WScript.CreateObject`

## Instalar en pc

_wes_ necesita es el archivo _wes.js_ Only. Para descargar, inicie un símbolo del sistema e ingrese el siguiente comando.

```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

_wes_ en el momento de la ejecución como la implementación que _WScript.Shell_ de `SendKeys` . _wes.js_ la ruta del directorio donde se guarda _wes.js_ contiene caracteres que no sean _ascii_ , `SendKeys` no podrá enviar la clave correctamente y el script no podrá ejecutarse.  
Configure la ruta de destino para guardar de _wes.js_ solo _ascii_ .

## Uso

En la línea de comando, especifique el archivo que será el punto de partida del programa después de `wes` . Se puede omitir la extensión de script _.js_ .

```shell
wes index
```

Además, _wes_ tiene _REPL_ por lo que si lo inicia solo con `wes` , puede ingresar el script directamente.

```shell
wes
```

El guión será aceptado hasta que ingrese dos líneas en blanco. _README.md_ puede verificar la ejecución del script de muestra en _README.md_ con _REPL_ .

## argumentos con nombre de línea de comandos

Las opciones de inicio para _wes_ son las siguientes.

| llamado            | descripción                                           |
| ------------------ | ----------------------------------------------------- |
| `--monotone`       | Elimina el _ANSI escape code_                         |
| `--safe`           | Ejecute el script en modo seguro                      |
| `--usual`          | Ejecute el script en modo normal (predeterminado)     |
| `--unsafe`         | Ejecute el script en modo inseguro                    |
| `--dangerous`      | Ejecute el script en modo peligroso                   |
| `--debug`          | Ejecute el script en modo de depuración               |
| `--encoding=UTF-8` | Especifica la codificación del primer archivo a leer. |
| `--engine=Chakra`  | Esta opción es agregada automáticamente por _wes_     |

La implementación de `--safe` `--usual` `--unsafe` `--dangerous` está incompleta, pero los argumentos con nombre están reservados.

## objetos incorporados

_wes_ tiene _built-in objects_ que _WSH (JScript)_ no tiene.

### _require_

Importe el módulo con _require_ . _wes_ adivina automáticamente la codificación del archivo del módulo, pero si no adivina correctamente, puede especificar la codificación con el segundo argumento.

Además, `require('WScript.Shell')` partir de _OLE_ incluso para _require_ importación es posible con.

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

Si desea definirlo como un módulo, `module.exports` a `module.exports` .

```javascript
function add (a, b) {
    return a + b
}

module.exports = add
```

### _console_

_wes_ usa la _console_ lugar de `WScript.Echo` y `WScript.StdErr.WriteLine` .

Imprima caracteres en la línea de comando en `console.log` . También es compatible con cadenas formateadas. Imprime una cadena formateada utilizando el operador de formato `%` .

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

_wes_ para generar una cadena coloreada en `WScript.StdOut.WriteLine` en `WScript.StdOut.WriteLine` lugar, utilice `WScript.StdErr.WriteLine` . `WScript.Echo` y `WScript.StdOut.WriteLine` están bloqueados desde la salida, así que el uso `WScript.StdOut.WriteLine` o `console.log` .

### _Buffer_

Puede manejar tampones.

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```

### `__dirname` y `__filename`

`__filename` contiene la ruta del archivo del módulo que se está ejecutando actualmente. `__dirname` `__filename` el directorio de `__filename` .

```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```

## módulos incorporados

_wes_ tiene _built-in modules_ para simplificar y estandarizar el procesamiento básico.

### _ansi_

`ansi` tiene un _ANSI escape code_ que le permite cambiar el color y el efecto de la salida estándar. Los colores y los efectos pueden variar según el tipo y la configuración de la aplicación de consola utilizada.

```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```

También puede crear sus propios colores con `ansi.color()` y `ansi.bgColor()` . El argumento usa _RGB_ como `255, 165, 0` o _color code_ como `'#FFA500'` . No puede utilizar un _color name_ como `orange` .

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

### _argv_

Obtiene el argumento de la línea de comandos. `cscript.exe` argumentos de línea de comandos de `/` declara argumentos con nombre en pero, _wes_ en `-` y `--` declara los argumentos con nombre en.

_argv.unnamed_ y _argv.named_ el tipo de valor del argumento de la línea de comando en uno de los _Number_ _Boolean_ _String_ .

Ingrese los argumentos de la línea de comando junto con el _REPL_ .

```shell
wes REPL aaa -bcd eee --fgh=iii jjj --kln mmm
```

Ejecute el siguiente script en _REPL_ .

```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```

### _pathname_

Opere el camino.

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

### _filesystem_

Manipula archivos y directorios. `readTextFileSync` adivina y lee automáticamente la codificación del archivo.

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```

### _JScript_

Si cambia el motor de secuencias de _Chakra_ , usted no será capaz de utilizar _JScript_ específica _Enumerator_ etc. El módulo incorporado _JScript_ hace disponibles. Sin embargo, _Enumerator_ devuelve un objeto _Array_ lugar de un objeto Enumerator.

```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```

_GetObject_ `WScript.GetObject` como una alternativa a `WScript.GetObject` .

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

_VBScript_ ofrece algunas características que _JScript_ no tiene.

```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```

### _httprequest_

_httprequest_ emite una _http request_ como sugiere su nombre.

```javascript
const request = require('httprequest')
const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log('%O', JSON.parse(content))
```

### _minitest_

_minitest_ puede escribir pruebas sencillas.

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

_pipe_ simplifica el procesamiento de la tubería

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

Determina el tipo de guión.

```javascript
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```

## Paquete de módulos e instalación

_install_ , puede instalar el módulo para _wes_ publicado en _github_ . Necesitará el _github repository_ para publicar el módulo. Además, el nombre del repositorio y el nombre del directorio local deben ser iguales.

### _bundle_

_github_ publicar un módulo en _github_ , _bundle_ agrupa el módulo requerido y lo cambia a un formato que pueda ser importado por el módulo de _install_ .

Por razones de seguridad, _wes_ no importa módulos en un formato que se pueda ejecutar directamente, así que cree un archivo _.json_ con el módulo del _bundle_ .

Existen algunas condiciones para agrupar módulos.

1.  _repository_ se puede publicar un tipo de módulo en un _repository_ .
2.  _github_ nombre del repositorio de _github_ y el nombre del directorio de trabajo local deben ser iguales.
3.  El repositorio debe ser público si desea publicar el módulo para un tercero.
4.  _wes_ no interpreta estáticamente el guión. Es posible que los módulos que lo `require` bajo ciertas condiciones, como declaraciones `if` , no se incluyan.
5.  _.json_ archivo será creado en el directorio de trabajo con el nombre _directory_name.json_ . Si cambia el nombre del archivo o lo mueve, no podrá instalarlo.
6.  `node_modules/directory_name` empaquetado falla porque hace referencia a `directory_name.json` .

### _install_

Se utiliza para instalar el archivo de módulo para _wes_ publicado en _github_ .

## uso

Pasar argumentos para _install_ en el formato `@author/repository`

```shell
wes install @wachaon/fmt
```

_install_ tiene opciones

| llamado    | nombre corto | descripción                                         |
| ---------- | ------------ | --------------------------------------------------- |
| `--bare`   | `-b`         | No cree la carpeta _@author_                        |
| `--global` | `-g`         | Instale el módulo en la carpeta donde está _wes.js_ |

`--bare` opción `--bare` puede omitir el argumento `require` del `author@repository` al `repository` . `--global` opción `--global` hace que los módulos instalados estén disponibles para todos los scripts. Las opciones anteriores deben especificarse al mismo tiempo que la opción de seguridad _wes_ `--unsafe` o `--dangerous` .

```shell
wes install @wachaon/fmt --bare --unsafe
```

# Instalar el módulo de repositorio privado

_install_ se puede instalar no solo en módulos de repositorios públicos de _github_ , sino también en repositorios privados.

_install_ , especifique el módulo con `author@repository` . La implementación descarga lo siguiente.

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```

Al acceder a la _raw_ del depósito privado con un navegador, el _token_ se mostrará, por lo que copiar el _token_ y lo utilizan.

También puede instalar el módulo en el repositorio privado ejecutándolo en la línea de comandos dentro de la _token_ del _token_ .

```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

## Módulo externo

A continuación se muestran algunos módulos externos.

### _@wachaon/fmt_

_@wachaon/fmt_ es un paquete _prettier_ que formatea el script. Además, si se produce un `SyntaxError` con _@wachaon/fmt_ instalado, puede indicar la ubicación del error.

#### Instalar en pc

```shell
wes install @wachaon/fmt
```

#### uso

Si hay _.prettierrc_ (formato JSON) en el directorio de trabajo, se reflejará en la configuración. _fmt_ puede utilizar tanto con _CLI_ (interfaz de línea de comandos) como con el _module_ en _fmt_ .

Usar como _CLI_

```shell
wes @wachaon/fmt src/sample --write
```

| número sin nombre | descripción                                        |
| ----------------- | -------------------------------------------------- |
| 0                 | ---                                                |
| 1                 | Requerido. La ruta del archivo que desea formatear |

| llamado   | nombre corto | descripción           |
| --------- | ------------ | --------------------- |
| `--write` | `-w`         | Permitir sobrescribir |

Sobrescribe el archivo con una secuencia de comandos formateada si se especifica un argumento con nombre de `--write` o `-w` .

#### _module_ usa como _module_

#### `option`

```javascript
{
    parser: 'babel',
    plugins: [babel]
}
```
