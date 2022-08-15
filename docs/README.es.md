# *WES*


*wes* es un marco de consola para ejecutar *ECMAScript* en *WSH (Windows Script Host)* . El [*japanese*](/README.md) original del *README* estará en japonés. Los textos que no sean en japonés serán traducidos automáticamente.  
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


-   Puede cambiar el motor de secuencias de comandos a *Chakra* y escribir de acuerdo con las especificaciones de *ECMAScript2015* .
-   Dado que *cscript.exe* de 32 bits siempre se ejecuta, no hay un problema único en el entorno de 64 bits.
-   Dado que hay un sistema de módulos, se puede desarrollar de manera más eficiente que el *WSH* convencional
-   Los módulos incorporados admiten el procesamiento básico, como la entrada/salida de archivos y la salida de texto en color a la consola
-   Puede dejar que la lectura de archivos adivine automáticamente la codificación, para que no tenga que preocuparse por la codificación, etc.
-   Paquete de módulos para admitir la publicación y recuperación externas


# Problemas *wes* que no podemos resolver


-   `WScript.Quit` no puede cancelar el programa y no devuelve un código de error
-   No es posible el procesamiento asíncrono como `setTimeout` y `Promise`
-   No puede usar el *event prefix* del segundo argumento de `WScript.CreateObject`


# descargar


Wes solo necesita el *wes* *wes.js* Para descargar, copie *wes.js* desde [*@wachaon/wes*](https://github.com/wachaon/wes) o ejecute el siguiente comando en su consola.


```bat
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```


Usamos `SendKeys` *wes* *WScript.Shell* en tiempo de ejecución como una implementación. Si la ruta del directorio donde se guarda *wes.js* contiene caracteres que no sean *ascii* , `SendKeys` no puede enviar la clave correctamente y el script no se puede ejecutar.  
Configure la ruta *wes.js* solo en *ascii* . Si ya ha descargado *wes* , puede actualizarlo con el siguiente comando.


```bat
wes update
```


# Uso


Ingrese la palabra clave `wes` seguida de un comando que especifique el archivo de inicio del programa en la consola. La extensión de secuencia de comandos *.js* se puede omitir.


```bat
wes index
```


Además, dado que *wes* está equipado con *REP* , puede ingresar scripts directamente iniciando `wes` solo.


```bat
wes
```


*REP* acepta entrada de script hasta que ingrese dos líneas en blanco. También puede ver a *REP* ejecutando los scripts de muestra en *README.md* .


## opciones de línea de comando


Las opciones de inicio de *wes* son las siguientes.


| nombrada           | Descripción                                         |
| ------------------ | --------------------------------------------------- |
| `--monotone`       | Elimina *ANSI escape code*                          |
| `--safe`           | ejecutar el script en modo seguro                   |
| `--usual`          | Ejecutar script en modo normal (predeterminado)     |
| `--unsafe`         | ejecutar el script en modo inseguro                 |
| `--dangerous`      | ejecutar el script en modo peligroso                |
| `--debug`          | ejecutar el script en modo de depuración            |
| `--encoding=UTF-8` | Especifica la codificación del primer archivo leído |
| `--engine=Chakra`  | Esta opción es agregada automáticamente por *wes*   |


`--safe` `--usual` `--unsafe` `--dangerous` `--debug` La implementación de está incompleta, pero los argumentos con nombre están reservados.


# sistema de módulos


*wes* admite dos sistemas de módulos, el sistema *commonjs module* que usa `require()` y el sistema de *es module* que usa `import` . ( *dynamic import* no es compatible porque es un proceso asíncrono)


## *commonjs module*


Administre módulos asignándolos a `module.exports` y llamando a `require()` . Las rutas que no sean rutas absolutas y rutas relativas que comiencen con `./` y `../` busquen módulos en el directorio *wes_modules* y convenientemente en el directorio *node_modules* . El `require()` de *wes* adivina automáticamente la codificación del archivo del módulo, pero puede especificar la codificación con el segundo argumento si no adivina correctamente.


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


Además, es posible importar con *require* para *COM Object* como `require('WScript.Shell')` .


```javascript
const Shell = require('Shell.Application')
Shell.MinimizeAll()
WScript.Sleep(2000)
Shell.UndoMinimizeAll()
```


## *es module*


*Chakra* , que es el motor de ejecución de secuencias de comandos, interpreta sintaxis como `imoprt` , pero no se puede ejecutar tal cual porque el método de procesamiento como `cscript` no está definido. En *wes* , al agregar *babel* a los módulos incorporados, *es module* es también se ejecutan mientras se transpilan uno por uno. Esto nos cuesta la sobrecarga de procesamiento y un archivo *wes.js* . Los módulos escritos en el *es module* es también se convierten a `require()` mediante la transpilación, por lo que es posible llamar a *COM Object* . Sin embargo, no admite especificar la codificación del archivo del módulo con el *es module* . Todo se carga automáticamente. Para cargarlo como un *es module* , configure la extensión en `.mjs` o configure el campo `"type"` en `package.json` en `"module"` .


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


# objeto incorporado


*wes* tiene *built-in objects* no se encuentran en *WSH (JScript)* .


## *console*


`WScript.Echo` usa *console* en lugar de *wes* y `WScript.StdErr.WriteLine` . Envíe caracteres a la consola con `console.log` . También admite cadenas formateadas. Muestra una cadena formateada utilizando el operador de formato `%` .


```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```


| Especificador de formato | Descripción                           |
| ------------------------ | ------------------------------------- |
| `%s`                     | `String(value)`                       |
| `%S`                     | `String(value)`                       |
| `%c`                     | `String(value)`                       |
| `%C`                     | `String(value)`                       |
| `%d`                     | `parseInt(value, 10)`                 |
| `%D`                     | `parseInt(value, 10)`                 |
| `%f`                     | `Number(value)`                       |
| `%F`                     | `Number(value)`                       |
| `%j`                     | `JSON.stringify(value)`               |
| `%J`                     | `JSON.stringify(value, null, 2)`      |
| `%o`                     | volcado de objetos                    |
| `%O`                     | Volcado de objeto (sangrado/colorido) |


`WScript.StdOut.WriteLine` *wes* de `WScript.StdErr.WriteLine` para generar cadenas de colores. `WScript.Echo` y `WScript.StdOut.WriteLine` están bloqueados. `WScript.StdErr.WriteLine` o `console.log` .


## *Buffer*


Puede manejar búferes.


```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```


## `__dirname` y `__filename`


`__filename` almacena la ruta del archivo del módulo que se está ejecutando actualmente. `__dirname` contiene el directorio de `__filename` .


```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```


# Módulo incorporado


*wes* tiene *built-in modules* para simplificar y estandarizar el procesamiento básico.


## *ansi*


`ansi` es un *ANSI escape code* que puede cambiar los colores y efectos de salida estándar. Los colores y los efectos pueden diferir según el tipo y la configuración de la aplicación de consola utilizada.


```javascript
const { redBright, yellow } = require('ansi')
const message = 'File does not exist'
console.log(redBright + 'Error: ' + yellow + message)
```


También puede crear sus propios colores con `ansi.color()` y `ansi.bgColor()` . Los argumentos usan *RGB* como `255, 165, 0` y *color code* como `'#FFA500'` . No se admiten *color name* como `orange` .


```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```


## *argv*


Obtener argumentos de la línea de comandos. Los argumentos de la línea de comandos de `cscript.exe` declaran argumentos con nombre con `/` , mientras que *wes* declara argumentos con nombre con `-` y `--` . *argv.unnamed* y *argv.named* el tipo de valor del argumento de la línea de comandos en *String* *Number* *Boolean* . Introduzca los argumentos de la línea de comandos con *REP* .


```bat
wes REP aaa -bcd eee --fgh=iii jjj --kln mmm
```


Ejecute el siguiente script en *REP* .


```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```


## *pathname*


Manipular caminos. Las rutas que comienzan con `/` y `\` generalmente son relativas a la raíz de la unidad. Por ejemplo `/filename` y `C:/filename` pueden ser la misma ruta. Por razones de seguridad, `wes` interpreta las rutas que comienzan con `/` y `\` relativas al directorio de trabajo.


```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```


## *filesystem*


Manipular archivos y directorios. `readTextFileSync` adivina automáticamente la codificación del archivo y lo lee.


```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```


## *chardet*


Estoy usando algunas funciones de <https://github.com/runk/node-chardet> . Puede aumentar la precisión de las adivinanzas automáticas aumentando los caracteres específicos de la codificación.


## *JScript*


Si cambia el motor de secuencias de comandos a *Chakra* , no podrá usar *Enumerator* específicos de *JScript* , etc. El módulo integrado *JScript* los pone a disposición. Sin embargo, *Enumerator* devuelve un *Array* , no un *Enumerator object* .


```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```


*GetObject* funciona como una alternativa a `WScript.GetObject` .


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


*VBScript* ofrece algunas funciones que *JScript* no ofrece.


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


*minitest* puede escribir pruebas simples. A partir de la versión `0.10.71` , volvimos al concepto básico y redujimos los tipos de aserciones a 3 tipos.


### Uso


Agrupe con `describe` , pruebe con `it` y verifique con `assert` . `pass` será una matriz del número de ocurrencias `it` el número de pases.


```javascript
const { describe, it, assert, pass } = require('minitest')
describe('minitest', () => {
    describe('add', () => {
        const add = (a, b) => a + b
        it('2 plus 3 is 5', () => {
            assert.equal(5, add(2, 3))
        })
        it('0 plus 0 is 0', () => {
            assert(0 === add(0, 0))
        })
        it('"4" plus "5" is 9', () => {
            assert.equal(9, add("4", "5"))
        })
        it('NaN plus 3 is NaN', () => {
            assert.equal(NaN, add(NaN, 3))
        })
    })
    describe('sub', () => {
        it('5 minus 4 is 1', () => {
            const sub = (a, b) => a - b
            assert.equal(1, sub(5, 4))
        })
    })
})
console.log('tests: %O passed: %O, failed: %O', pass[0], pass[1], pass[0] - pass[1])
```


### afirmación


#### `assert(value, message)` `assert.ok(value, message)`


Compare con `true` con el operador de igualdad estricta `===` . Si el `value` es una función, evalúa el resultado de ejecutar la función.


| Parámetro | Escribe               | Descripción                            |
| :-------- | :-------------------- | :------------------------------------- |
| `value`   | `{Function\|Boolean}` | función booleana o de retorno booleano |
| `message` | `{String}`            | mensaje en caso de falla               |


#### `assert.equal(expected, actual)`


Compara objetos por igualdad de miembros, no por referencia.  
NaN `true` `NaN === NaN` `function (){} === function (){}` `/RegExp/g === /RegExp/g` o `{one: {two: 2}} === {one: {two: 2}}` `[1,2,3] === [1,2,3]` etc.  
Al comparar clases (objetos), deben tener el mismo constructor o una superclase cuyo `actual` se `expected` .


| Parámetro  | Escribe | Descripción    |
| :--------- | :------ | :------------- |
| `expected` | `{Any}` | valor esperado |
| `actual`   | `{Any}` | Valor actual   |


#### `assert.throws(value, expected, message)`


Verifique que el error se esté lanzando correctamente.  
Si el error es correcto o no se determina si el *constructor* de error esperado, el *message* es igual y la expresión regular pasa la evaluación de la *stack* .


| Parámetro  | Escribe                   | Descripción                                                                            |
| :--------- | :------------------------ | :------------------------------------------------------------------------------------- |
| `value`    | `{Error}`                 | error                                                                                  |
| `expected` | `{Error\|String\|RegExp}` | Una expresión regular que evalúa el error esperado *constructor* , *message* o *stack* |
| `message`  | `{String}`                | mensaje en caso de falla                                                               |


## *pipe*


*pipe* simplifica la instalación de tuberías.


### Uso


```javascript
const pipe = require('pipe')
function add (a, b) {
    return b + a
}
function sub (a, b) {
    return b - a
}
function div (a, b) {
    return a / b
}
const add5 = add.bind(null, 5)
const sub3 = sub.bind(null, 3)
pipe()
  .use(add5)
  .use(sub3)
  .use(div, 4)
  .process(10, (err, res) => console.log('res: %O', res))
```


## *typecheck*


Determinar el tipo de guión.


### Uso


```javascript
const { isString, isNumber, isBoolean, isObject } = require('typecheck')
const log = require('log')
log(() => isString("ECMAScript"))
log(() => isNumber(43.5))
log(() => isBoolean(false))
log(() => isObject(function(){}))
```


## *animate*


*animate* ayuda a animar la visualización de la consola.


### Uso


Si el procesamiento lleva mucho tiempo, sería bueno mostrar el progreso como una animación en la consola.


```javascript
const Animate = require('animate')
const animate = new Animate
const size = 23
let counter = 0

const progress = Animate.genProgressIndicator([
    '|----------|----------|',
    '|*---------|----------|',
    '|**--------|----------|',
    '|***-------|----------|',
    '|****------|----------|',
    '|*****-----|----------|',
    '|******----|----------|',
    '|*******---|----------|',
    '|********--|----------|',
    '|*********-|----------|',
    '|**********|----------|',
    '|**********|*---------|',
    '|**********|**--------|',
    '|**********|***-------|',
    '|**********|****------|',
    '|**********|*****-----|',
    '|**********|******----|',
    '|**********|*******---|',
    '|**********|********--|',
    '|**********|*********-|',
    '|**********|**********|',
])

const indigator = Animate.genProgressIndicator(['   ', '.  ', '.. ', '...'])

animate.register(() => {
    let prog = counter / size
    if (prog >= 1) {
        prog = 1
        animate.stop()
    }

    animate.view = console.format(
        '%S %S %S',
        progress(Math.ceil(prog * 20)),
        ('  ' + Math.ceil(prog * 100) + '%').slice(-4),
        prog < 1 ? 'loading' + indigator(counter) : 'finished!'
    )
    counter++
}, 100, Number.MAX_VALUE)
animate.run()
```


### `constructor(complete)`


Ejecuta la función `complete` cuando todas las colas están completas o cuando se llama a `stop()` .


#### `static genProgressIndicator(animation)`


Genere una función que muestre una animación de ciclismo.


#### `register(callback, interval, conditional)`


Tramitación de registros. Se pueden registrar y procesar múltiples procesos en paralelo. En la `callback` de llamada, le indicaremos que detenga la animación y escriba la vista que se mostrará. `interval` especifica el intervalo de procesamiento. Si el `conditional` es una función, ejecuta `conditional(count, queue)` y si el resultado es verdadero, continúa con el siguiente. El `conditional` ejecuta `decrement(count)` si es un número y continúa si el resultado es un número positivo. Se ejecuta solo una vez si `conditional` no está definido. Tenga en cuenta que especificar una función aumenta la `count` , mientras que especificar un `count` la disminuye.


#### `stop()`


*animate* .


#### `cancel(queue)`


Suspende el procesamiento de una cola específica.


#### `run()`


Iniciar animación.


#### `view`


Especifica los caracteres que se imprimen en la consola. Cambia de personaje a intervalos regulares. Asigne *Arrary* o *String* para `view` . Una *String* es útil cuando se actualiza una sola animación y una *Array* es útil cuando se animan varias filas individualmente.


```javascript
const Animate = require('/lib/animate')
const animate = new Animate(
    () => console.log('All Finished!!')
)

const progress = Animate.genProgressIndicator([
    '|----------|----------|',
    '|*---------|----------|',
    '|**--------|----------|',
    '|***-------|----------|',
    '|****------|----------|',
    '|*****-----|----------|',
    '|******----|----------|',
    '|*******---|----------|',
    '|********--|----------|',
    '|*********-|----------|',
    '|**********|----------|',
    '|**********|*---------|',
    '|**********|**--------|',
    '|**********|***-------|',
    '|**********|****------|',
    '|**********|*****-----|',
    '|**********|******----|',
    '|**********|*******---|',
    '|**********|********--|',
    '|**********|*********-|',
    '|**********|**********|',
])

const indigator = Animate.genProgressIndicator(['   ', '.  ', '.. ', '...'])

const state = {
    one: null,
    two: null,
    three: null
}

function upload(name, size, row) {
    let counter = 0
    return () => {
        let prog = counter / size
        if (prog >= 1) {
            prog = 1
            animate.cancel(state[name])
        }

        animate.view[row] = console.format(
            '%S %S %S',
            progress(Math.ceil(prog * 20)),
            ('  ' + Math.ceil(prog * 100) + '%').slice(-4),
            prog < 1 ? name + ' loading' + indigator(counter) : name + ' finished! '
        )
        counter++
    }
}

state.one = animate.register(upload('one', 63, 0), 50, Number.MAX_VALUE)
state.two = animate.register(upload('two', 49, 1), 60, Number.MAX_VALUE)
state.three = animate.register(upload('three', 109, 2), 40, Number.MAX_VALUE)
animate.run()
```


## *getMember*


Obtenga el tipo de miembro y la descripción del *COM Object* de *ProgID* .


### Uso


```javascript
const getMember = require('getMember')
const FileSystemObject = 'Scripting.FileSystemObject'
console.log('require("%S") // => %O', FileSystemObject, getMember(FileSystemObject))
```


## *zip*


Comprime archivos y carpetas y descomprime archivos comprimidos. Internamente, se llama y procesa *PowerShell* .


### Uso


```javascript
const {zip, unzip} = require('zip')
console.log(zip('docs\\*', 'dox.zip'))
console.log(unzip('dox.zip'))
```


Se puede escribir un comodín `*` en la `path` de `zip(path, destinationPath)` . Se puede utilizar tanto en *CLI (Command Line Interface)* como en *module* .


```bat
wes zip docs\* dox.zip
wes zip -p dox.zip
```


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


En *wes* , un conjunto de varios módulos se denomina paquete. Puede instalar el paquete para *wes* publicado en *github* . Se requiere un *github repository* para publicar un paquete. Además, el nombre del repositorio y el nombre del directorio local deben ser iguales.


## *bundle*


Al publicar un paquete en *github* , *bundle* agrupa los módulos necesarios y los cambia a un formato que se puede incluir mediante la instalación. Por razones de seguridad, el *bundle* crea un *wes* *.json* porque no le permitimos importar paquetes ejecutables directamente. Hay algunas condiciones para el embalaje.


1.  Solo se puede publicar un paquete en un *repository*

2.  Utilice el mismo nombre para el nombre del repositorio de *github* y el nombre del directorio de trabajo local

3.  Haga *public* el repositorio si desea publicar el paquete

4.  Declarar la adquisición del módulo en el ámbito de nivel superior

5.  Se crea un archivo *.json* para el paquete en el *directory_name.json* de trabajo con el nombre nombre_directorio.json. Si cambia el nombre del archivo o mueve el archivo, no podrá consultarlo durante la instalación.

6.  `node_modules/directory_name` es el punto de partida del paquete

    ```bat
        wes bundle directory_name
    ```

    sin liarse con

    ```bat
        wes bundle node_modules/directory_name
    ```

    Paquete con


## *install*


Se usa para instalar el paquete para *wes* publicado en *github* . A partir de la `version 0.10.28` , la carpeta de instalación se cambia de `node_modules` a `wes_modules` . Si desea instalar en `node_modules` , agregue la opción `--node` .


### Uso


Pase argumentos para *install* en el formulario `@author/repository` .


```bat
wes install @wachaon/fmt
```


*install* tiene opciones.


| nombrada      | nombre corto | Descripción                                                                             |
| ------------- | ------------ | --------------------------------------------------------------------------------------- |
| `--bare`      | `-b`         | No cree carpetas *@author*                                                              |
| `--global`    | `-g`         | Instale el paquete en la carpeta donde se encuentra *wes.js*                            |
| `--save`      | `-S`         | Agregue el nombre y la versión del paquete al campo de *dependencies* en *package.json* |
| `--save--dev` | `-D`         | Agregue el nombre y la versión del paquete al campo *devDependencies* en *package.json* |
| `--node`      | `-n`         | Instalar en la carpeta *node_module*                                                    |


`--bare` puede omitir el argumento `require` de `author@repository` a `repository` . `--global` hace que los paquetes instalados estén disponibles para todos los scripts. `--node` o `-n` debe especificarse junto con la opción de seguridad *wes* `--unsafe` o `--dangerous` .


```bat
wes install @wachaon/fmt --bare --unsafe
```


# Instalar paquetes desde repositorios privados


*install* puede instalar no solo paquetes de repositorios públicos de *github* , sino también paquetes de repositorios privados. En la *install* , especifique el paquete con *@author/repository* . La implementación intenta descargar la siguiente url.


```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```


Si accede al repositorio privado *raw* con un navegador, se mostrará el *token* , así que copie el *token* y utilícelo. También puede instalar paquetes desde repositorios privados ejecutándolos en la consola mientras el *token* es válido.


```bat
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```


# Introducción del paquete


Aquí hay algunos paquetes externos.


## *@wachaon/fmt*


*@wachaon/fmt* *prettier* mejor empaquetado para que *wes* forme scripts. Además, si se produce un *Syntax Error* mientras está instalado *@wachaon/fmt* , se puede mostrar la ubicación del error.


### Instalar en pc


```bat
wes install @wachaon/fmt
```


### Uso


Si hay *.prettierrc* (formato JSON) en el directorio de trabajo, se reflejará en la configuración. *fmt* está disponible tanto en *CLI* como en *module* .


#### Utilizar como *CLI* .


```bat
wes @wachaon/fmt src/sample --write
```


| número sin nombre | Descripción                                        |
| ----------------- | -------------------------------------------------- |
| 0                 | -                                                  |
| 1                 | Requerido. la ruta del archivo que desea formatear |


| nombrada  | nombre corto | Descripción           |
| --------- | ------------ | --------------------- |
| `--write` | `-w`         | permitir sobrescribir |


Sobrescriba el archivo con el script formateado si se `--write` o el argumento con nombre `-w` .


#### utilizar como módulo


```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')
const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```


## *@wachaon/edge*


*Internet Explorer* dejará de ser compatible el 15 de junio de 2022. Junto con eso, se espera que la operación de la aplicación con `require('InternetExplorer.Application')` también sea imposible. Una alternativa sería trabajar con *Microsoft Edge based on Chromium* través del *web driver* . `@wachaon/edge` *Edge* el piloto automático perimetral.


### Instalar en pc


Primero instale el paquete.


```bat
wes install @wachaon/edge --unsafe --bare
```


Luego descargue el *web driver* .


```bat
wes edge --download
```


Comprueba la versión de *Edge* instalada y descarga el *web driver* correspondiente.


### Uso


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


Este script imprime las *URL* visitadas en la consola en secuencia. `@wachaon/edge` registra eventos para *URL* y agrega datos a `res.exports` . La *URL* que se va a registrar puede ser `String` `RegExp` y se puede configurar de forma flexible. Al hacerlo controlado por eventos, puede cambiar fácilmente a la operación manual al no configurar eventos para procesos que son difíciles de manejar con el piloto automático. Si desea que la secuencia de comandos se detenga, `navi.emit('terminate', res)` o finalice *Edge* manualmente. La finalización genera `res.exports` como un archivo *.json* de forma predeterminada. Si desea configurar el procesamiento de terminación, configure la `terminate` de `edge(callback, terminate)` . `window` es una instancia de la clase *Window* de *@wachaon/webdriver* , no la `window` del navegador.


## *@wachaon/webdriver*


Será un paquete que envía solicitudes al *web driver* que opera el navegador. Construido en *@wachaon/edge* . Al igual que con *@wachaon/edge* , se requiere un *web driver* independiente para el funcionamiento del navegador.


### Instalar en pc


```bat
wes install @wachaon/webdriver --unsafe --bare
```


Descargue el *web driver* de *Microsoft Edge* basado en *Chromium* si no lo tiene. Además, si la versión de *edge* y la versión del *web driver* son diferentes, descargue la misma versión del *web driver* .


```bat
wes webdriver --download
```
