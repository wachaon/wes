# *WES*

*wes* es un marco de consola para ejecutar *ECMAScript* en *WSH (Windows Script Host)* . El texto original del *README* estará en [*japanese*](/README.md) . Los textos que no sean en japonés serán traducidos automáticamente.\
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

# característica

*   Puede cambiar el motor de secuencias de comandos a *Chakra* y escribir de acuerdo con las especificaciones de *ECMAScript2015+* .
*   Siempre usa *cscript.exe* de 32 bits, por lo que no hay problemas únicos de 64 bits
*   Sistema de módulos disponible para un desarrollo más eficiente que *WSH* tradicional
*   Los módulos incorporados admiten el procesamiento básico, como la entrada/salida de archivos y la salida de texto en color a la consola
*   No tiene que preocuparse por la codificación, etc., ya que puede inferir automáticamente la codificación al leer el archivo.
*   También es posible empaquetar el módulo y publicarlo externamente o adquirirlo.
*   Muestra los detalles del error con más amabilidad que *WSH*

# Problemas conocidos que no *wes* resolver

*   `WScript.Quit` no puede cancelar el programa y no devuelve un código de error
*   El procesamiento asíncrono no funciona correctamente
*   No puede usar *event prefix* del segundo argumento de `WScript.CreateObject`

# descargar

*wes* solo necesita el archivo *wes.js* Para descargar, copie *wes.js* desde [*@wachaon/wes*](https://github.com/wachaon/wes) o ejecute el siguiente comando en su consola.

```bat
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

*wes* adopta una implementación que usa `SendKeys` de *WScript.Shell* en tiempo de ejecución. Si la ruta del directorio donde está almacenado *wes.js* contiene caracteres que no son ASCII, `SendKeys` no podrá enviar las claves correctamente y el script no se ejecutará. Por lo tanto, asegúrese de que la ruta donde almacena *wes.js* se componga únicamente de caracteres ASCII. Alternativamente, si ya ha descargado *wes.js* , puede actualizarlo usando el siguiente comando.

```bat
wes update
```

# como empezar *wes*

Ingrese `wes` seguida del comando que especifica el archivo que serÃ¡ el punto de partida del programa en la consola. La extensiÃ³n de secuencia de comandos *.js* se puede omitir.

```bat
wes index
```

*wes* puede ingresar y ejecutar scripts directamente en la consola. Si lo inicia solo con `wes` , puede ingresar y ejecutar directamente el script.

```bat
wes
```

*REP* acepta entrada de script hasta que ingrese dos líneas en blanco. También puede ver *REP* ejecutando el script de ejemplo en *README.md* .

## opciones de lÃ­nea de comando

Las opciones de inicio *wes* son las siguientes.

| llamado            | Descripción                                         |
| ------------------ | --------------------------------------------------- |
| `--monotone`       | Elimina *ANSI escape code*                          |
| `--transpile`      | Siempre convierta y ejecute con *babel-standalone*  |
| `--debug`          | ejecutar el script en modo de depuración            |
| `--encoding=UTF-8` | Especifica la codificación del primer archivo leído |
| `--arch=x86`       | Esta opción es agregada automáticamente por *wes*   |

# sistema de módulos

*wes* admite dos sistemas de módulos, *commonjs module* que usa `require()` y *es module* que usa `import` . ( *dynamic import* no es compatible porque es un proceso asíncrono)

## *commonjs module*

Administre módulos asignándolos a `module.exports` y llamando `require()` . Las rutas que no sean rutas absolutas y rutas relativas que comiencen con `./` y `../` busquen módulos en *wes\_modules* y convenientemente *node\_modules* . `require()` de *wes* adivina automáticamente la codificación del archivo del módulo, pero puede especificar la codificación con el segundo argumento si no adivina correctamente.

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

*Chakra* , el motor de ejecución de scripts, interpreta sintaxis como `imoprt` , pero no se ejecuta en *cscript* . En *wes* al agregar *babel* a los módulos incorporados, *es module* también se ejecutan mientras se transpilan uno por uno. Esto tiene un costo de sobrecarga de procesamiento y un archivo *wes.js* inflado. Los módulos escritos en *es module* es también se convierten a `require()` mediante la transpilación, por lo que es posible llamar *COM Object* . Sin embargo, no admite especificar la codificación del archivo del módulo con *es module* . Todo se carga automáticamente. Para cargarlo como *es module* , configure la extensión en `.mjs` o configure el campo `"type"` en `package.json` en `"module"` .

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

*wes* tiene *built-in objects* que no se encuentran en *WSH (JScript)* .

## *console*

*wes* *console* en lugar de `WScript.Echo()` y `WScript.StdErr.WriteLine()` .

### *console.log*

Envíe caracteres a la consola con `console.log()` . También admite cadenas formateadas. Muestra una cadena formateada utilizando el operador de formato `%` . (Los operadores de formato también son válidos para otros métodos).

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

*wes* usa `WScript.StdOut.WriteLine` en lugar de `WScript.StdErr.WriteLine` para generar cadenas de colores. `WScript.Echo` y `WScript.StdOut.WriteLine` están bloqueados. Utilice `WScript.StdErr.WriteLine` o `console.log` .

### *console.print*

`console.log()` normalmente incluye una nueva línea al final, pero `console.print` no.

### *console.debug*

Salida a la consola solo si `--debug` está habilitada.

### *console.error*

Lanzar una excepción con el contenido como mensaje.

### *console.weaklog*

Las cadenas impresas con `console.weaklog()` desaparecen de la consola si hay alguna salida posterior. Útil para conmutar salidas.

## *Buffer*

Puede manejar búferes.

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log('%s %O', content, buff)
```

## `__dirname` y `__filename`

`__filename` almacena la ruta del archivo del módulo que se está ejecutando actualmente. `__dirname` contiene el directorio de `__filename` .

```javascript
const message = `dirname: ${__dirname}\nfilename: ${ __filename}`
console.log(message)
```

## *setTimeout* *setInterval* *setImmediate* *Promise*

Dado que *wes* es un entorno de ejecución para procesamiento síncrono, *setTimeout* *setInterval* *setImmediate* *Promise* no funciona como procesamiento asíncrono, pero se implementa para admitir módulos que asumen la implementación *Promise* .

```javascript
const example = () => {
  const promise = new Promise((resolve, reject) => {
    console.log('promise')

    setTimeout(() => {
      console.log('setTimeout') 
      resolve('resolved');
    }, 2000);
  }).then((val) => {
    console.log(val)
  });
  console.log('sub')
};

console.log('start')
example();
console.log('end')
```

# Módulo incorporado

*wes* tiene *built-in modules* para simplificar y estandarizar el procesamiento básico.

## Módulos integrados a desmontar

Cambie algunos módulos integrados por módulos externos para que el archivo sea más ligero y fácil de mantener.

*   *animate.js*
*   *day.js*
*   *debug.js*
*   *log.js*

Los módulos anteriores se pueden instalar como `@wachaon/animate` `@wachaon/day` `@wachaon/debug` `@wachaon/log` respectivamente.

## *ansi*

`ansi` es *ANSI escape code* que puede cambiar los colores y efectos de salida estándar. Los colores y los efectos pueden diferir según el tipo y la configuración de la aplicación de consola utilizada.

```javascript
const { redBright, yellow } = require('ansi')
const message = 'File does not exist'
console.log(redBright + 'Error: ' + yellow + message)
```

También puede crear sus propios colores con `ansi.color()` y `ansi.bgColor()` . Los argumentos usan *RGB* como `255, 165, 0` *color code* como `'#FFA500'` . No se admiten *color name* como `orange` .

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

## *argv*

Obtener argumentos de la línea de comandos. Los argumentos de la línea de comandos de `cscript.exe` declaran argumentos con nombre con `/` , mientras que *wes* declara argumentos con nombre con `-` y `--` . *argv.unnamed* y *argv.named* convierten el tipo de valor del argumento de la línea de comandos en *String* *Number* *Boolean* . Introduzca los argumentos de la línea de comandos con *REP* .

```bat
wes REP aaa -bc dd --e=false --gh=iii jjj --klm nn -o --p 9 r
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

Manipular caminos. Las rutas que comienzan con `/` y `\` son generalmente relativas a la raíz de la unidad. Por ejemplo `/filename` y `C:/filename` pueden ser la misma ruta. Por razones de seguridad, *wes* interpreta las rutas que comienzan con `/` y `\` relativas al directorio de trabajo.

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

## *filesystem*

Manipular archivos y directorios. `readTextFileSync()` adivina automáticamente la codificación del archivo y lo lee. (Incluso si el segundo `encode` de `readFileSync()` se establece en `auto` , se adivinará automáticamente).

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
// const contents = fs.readFileSync(readme, 'auto')
console.log(contents)
```

## *chardet*

Estoy usando algunas funciones de <https://github.com/runk/node-chardet> . Puede aumentar la precisión de las adivinanzas automáticas aumentando los caracteres específicos de la codificación.

## *JScript*

Si cambia el motor de secuencias de comandos a *Chakra* , no podrá usar *Enumerator* específicos *JScript* , etc. El módulo integrado *JScript* los pone a disposición. Sin embargo, *Enumerator* devuelve *Array* , no *Enumerator object* .

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

```javascript {"testing": true, "message": "Typename"}
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(() => TypeName(FSO)) // => "FileSystemObject"
```

## *httprequest*

*httprequest* emite *http request* .

```javascript {"testing": true, "message": "httprequest"}
const request = require('httprequest')
const { responseText } = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log(() => JSON.parse(responseText)) /* => {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
            "lat": "-37.3159",
            "lng": "81.1496"
        }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
    }
} */
```

## *minitest*

*minitest* puede escribir pruebas simples. A partir de la versión `0.10.71` , volvimos al concepto básico y redujimos los tipos de aserciones a 3 tipos.

Agrupe con `describe` , pruebe con `it` y verifique con `assert` . `pass` será una matriz del número de `it` y el número de pases.

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

### afirmaciones

Solo hay tres funciones de aserción para comparar objetos por simplicidad.

#### `assert(value, message)` `assert.ok(value, message)`

Compare con `true` con el operador de igualdad estricta `===` . Si `value` es una funciÃ³n, evalÃºa el resultado de ejecutar la funciÃ³n.

| Parámetro | Tipo                  | Descripción                            |
| :-------- | :-------------------- | :------------------------------------- |
| `value`   | `{Function\|Boolean}` | función booleana o de retorno booleano |
| `message` | `{String}`            | mensaje de falla                       |

#### `assert.equal(expected, actual)`

Compara objetos por igualdad de miembros, no por referencia.\
`NaN === NaN` `function (){} === function (){}` `true` `/RegExp/g === /RegExp/g` o `{one: {two: 2}} === {one: {two: 2}}` `[1,2,3] === [1,2,3]` etc.\
Al comparar clases (objetos), deben tener el mismo constructor o una superclase cuyo `actual` se `expected` .

| Parámetro  | Tipo    | Descripción    |
| :--------- | :------ | :------------- |
| `expected` | `{Any}` | valor esperado |
| `actual`   | `{Any}` | Valor actual   |

#### `assert.throws(value, expected, message)`

Verifique que los errores se estén lanzando correctamente.\
Si el error es correcto o no se determina si el *constructor* de error esperado, *message* es igual y la expresión regular pasa la evaluación *stack* .

| Parámetro  | Tipo                      | Descripción                                                                            |
| :--------- | :------------------------ | :------------------------------------------------------------------------------------- |
| `value`    | `{Error}`                 | error                                                                                  |
| `expected` | `{Error\|String\|RegExp}` | Una expresión regular que evalúa el error esperado *constructor* , *message* o *stack* |
| `message`  | `{String}`                | mensaje en caso de falla                                                               |

## *match*

*match* es un módulo que determina si la ruta de un archivo coincide con un patrón específico. Puede utilizar comodines (los comodines son caracteres especiales como `*` y `?` ) en nombres de archivos y rutas para buscar archivos que coincidan con criterios específicos.

| parámetro | Tipo       | Descripción     |
| :-------- | :--------- | :-------------- |
| `pattern` | `{String}` | patrón          |
| `matcher` | `{Any}`    | Ruta de destino |

```javascript {"testing": true, "message": "match"}
const match = require('match')

console.log(() => match('path/to/*.js', 'path/to/url.js')) // => true
console.log(() => match('path/**/index.*', 'path/to/url/index.json')) // => true
console.log(() => match('path/to/*.?s', 'path/to/script.cs')) // => true
```

### *match.search*

*match.search* encuentra rutas que coinciden con un patrón de rutas existentes.

| parámetro | Tipo       | Descripción                     |
| :-------- | :--------- | :------------------------------ |
| `pattern` | `{String}` | patrón                          |
| `matcher` | `{Any}`    | Ruta del directorio para buscar |

```javascript
const { search } = require('match')

console.log(() => search('**/LICENSE', process.cwd()))
```

## *pipe*

*pipe* simplifica la instalación de tuberías. Envíe el resultado al convertir *data* con uno o varios *converter* . Desde *ver 0.12.75* en adelante, se puede iniciar directamente desde la línea de comandos.

### *pipe* de inicio como un módulo

Coloque la función de conversión en `use(converter)` del método *pipe* y describa la entrada de datos y el procesamiento posterior a la conversión con `process(data, callback(error, result))` . Si no se especifica ninguna `callback` , el valor de retorno será *promise* y el procesamiento se puede conectar con `then(result)` y `catch(error)` .

```javascript {"testing": true, "message": "pipe"}
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
  .process(10, (err, res) => {
    console.log(() => res) // => 3
  })
```

Además de `use(converter)` , existen métodos como `.filter(callbackFn(value, index))` y `map(callbackFn(value, index))` . Cada *data* es una cadena, una matriz y un objeto.

```javascript {"testing": true, "message": "utility methods for pipes"}
const pipe = require('pipe')

const tsv = `
javascript\t1955
java\t1995
vbscript\t1996
c#\t2000
`.trim()

function include(value, i) {
    return value.includes('script')
}

function release(value, i) {
    return value.split('\t').join(' was released in ')
}

pipe()
    .filter(include)
    .map(release)
    .process(tsv)
    .then((res) => {
        console.log(() => res) /* => `javascript was released in 1955
vbscript was released in 1996` */
    })

```

### Comenzando *pipe* desde la línea de comando

Desde la línea de comando, ingrese la función de conversión en orden después de `pipe` . Los argumentos de las funciones de conversión se ingresan como los valores de los argumentos de la línea de comandos con el mismo nombre que la función de conversión. `=>` valor `(` analiza con `eval()` en lugar de `JSON.parse()` `)` *WSH* fuerza `"` en los argumentos de la línea de comandos. En ese caso, no analice con `eval()` )

```bash
wes pipe swap merge --input="sample.txt" --output="" --swap="[2, 0, 1, 3]" --merge=4
```

Este comando es equivalente al script:

```javascript
const pipe = require('pipe')
const { readFileSync, writeFileSync } = require('filesystem')
const { resolve } = require('pathname')

const data = readFileSync(resolve(process.cwd(), 'sample.txt'), 'auto')

pipe()
    .use(swap, 2, 0, 1, 3)
    .use(merge, 4)
    .process(data, (err, res) => {
        if (err) console.error(err)
        console.log(res)
    })
```

## *typecheck*

Determinar el tipo de guión.

```javascript {"testing": true, "message": "typecheck"}
const { isString, isNumber, isBoolean, isObject } = require('typecheck')
console.log(() => isString("ECMAScript")) /* => true */
console.log(() => isNumber(43.5)) /* => true */
console.log(() => isBoolean(false)) /* => true */
console.log(() => isObject(function(){})) /* => false */
```

## *getMember*

Obtiene el tipo de miembro *COM Object* y la descripción *ProgID* cuando se usa en la consola.

```bat
wes getMember "Scripting.FileSystemObject"
```

Cuando se usa como módulo, obtiene el tipo y la descripción de los miembros de la instancia. Cuando se usa como módulo, puede obtener información sobre objetos que no se pueden confirmar desde *WSH (Windows Script Host)* .

```javascript
const getMember = require('getMember')
const SWbemServicesEx = require("WbemScripting.SWbemLocator").ConnectServer()
getMember(SWbemServicesEx)
```

## *ps*

Facilita la ejecución *PowerShell* .

### `ps(source, option)`

Ejecute `source` *PowerShell* .

Muestre una lista de cmdlets en la consola.

```javascript
const ps = require('ps')
 
console.log(ps("Get-Command"))
```

Si hay una ventana *Google Cherome* , cambie el tamaño y la posición de la ventana. (No funciona en el modo de pantalla completa).

```javascript
const ps = require('ps')

const code = `
$name = "chrome"
$w = 700
$h = 500
$x = 10
$y = 100

Add-Type @"
  using System;
  using System.Runtime.InteropServices;
  public class Win32Api {
    [DllImport("user32.dll")]
    [return: MarshalAs(UnmanagedType.Bool)]
    public static extern bool MoveWindow(IntPtr hWnd, int X, int Y, int nWidth, int nHeight, bool bRepaint);
  }
"@

Get-Process -Name $name | where { $_.MainWindowTitle -ne "" } | foreach {
    [Win32Api]::MoveWindow($_.MainWindowHandle, $x, $y, $w, $h, $true) | Out-Null
}
`

ps(code)
```

Controla el movimiento del ratÃ³n y los clics.

```javascript
const ps = require("ps")
const { unnamed } = require('argv')
const option = [
    unnamed[1],
    unnamed[2] || 0,
    unnamed[3] || 0
]

ps(`
$Method = $args[0]
$PosX = $args[1]
$PosY = $args[2]

$assemblies = @("System", "System.Runtime.InteropServices")

$Source = @"
using System;
using System.Runtime.InteropServices;

namespace Device {
    public class Mouse {
        public static void Main (params string[] args) {
            string method = args[0];
            int posX = args.Length > 1 ? Int32.Parse(args[1]) : 0;
            int posY = args.Length > 2 ? Int32.Parse(args[2]) : 0;

            if (method == "pos") {
                SetCursorPos(posX, posY);
            }

            if (method == "click") {
                mouse_event(0x2, posX, posY, 0, 0);
                mouse_event(0x4, 0, 0, 0, 0);
            }

            if (method == "leftDown") {
                mouse_event(0x2, posX, posY, 0, 0);
            }

            if (method == "leftUp") {
                mouse_event(0x4, posX, posY, 0, 0);
            }

            if (method == "rightClick") {
                mouse_event(0x8, posX, posY, 0, 0);
                mouse_event(0x10, 0, 0, 0, 0);
            }

            if (method == "rightDown") {
                mouse_event(0x8, posX, posY, 0, 0);
            }

            if (method == "righttUp") {
                mouse_event(0x10, posX, posY, 0, 0);
            }
        }

        [DllImport("USER32.dll", CallingConvention = CallingConvention.StdCall)]
        public static extern void SetCursorPos(int X, int Y);

        [DllImport("USER32.dll", CallingConvention = CallingConvention.StdCall)]
        public static extern void mouse_event(int dwFlags, int dx, int dy, int cButtons, int dwExtraInfo);
    }
}
"@

Add-Type -Language CSharp -TypeDefinition $Source -ReferencedAssemblies $assemblies

[Device.Mouse]::Main($Method, $PosX, $PosY)
`, option)
```

Guarde el script como un archivo o péguelo en su próximo `REP` .

```bat
wes REP pos 100 100
```

### Ejecute *powershell* directamente desde la consola

Ejecuta el archivo *.ps1* especificado en la consola.

```bat
wes ps ./sample.ps1
```

También puede ejecutar directamente un comando especificando `--Command` o `-c` .

Ejemplo de visualización de una lista de archivos en el directorio actual

```bat
wes ps --Command Get-ChildItem
```

## *zip*

Comprime archivos y carpetas y descomprime archivos comprimidos. Internamente, se llama y procesa *PowerShell* .

```javascript
const {zip, unzip} = require('zip')
console.log(zip('docs\\*', 'dox.zip'))
console.log(unzip('dox.zip'))
```

Se puede escribir un comodín `*` en `path` de `zip(path, destinationPath)` . Se puede utilizar tanto en *CLI (Command Line Interface)* como en *module* .

```bat
wes zip docs\* dox.zip
wes zip -p dox.zip
```

Si `path` tiene la extensión `.zip` , se procesa `unzip()` y no hay una descripción de la extensión `.zip` . Alternativamente, incluso si hay una extensión `.zip` si hay una descripción comodín `*` , se procesará `zip()` .

| sin nombre | Descripción                           |
| ---------- | ------------------------------------- |
| `1`        | `path` o archivo a ingresar           |
| `2`        | archivo de carpeta a `dest` de salida |

| llamado  | nombre corto | Descripción                           |
| -------- | ------------ | ------------------------------------- |
| `--path` | `-p`         | `path` o archivo a ingresar           |
| `--dest` | `-d`         | archivo de carpeta a `dest` de salida |

# Agrupación (embalaje) e instalación de módulos

En *wes* , un conjunto de varios módulos se denomina paquete. Puede instalar el paquete para *wes* publicado en *github* . Se requiere *github repository* para publicar un paquete.

## *bundle*

Al publicar un paquete en *github* , *bundle* agrupa los módulos necesarios y crea *bundle.json* .

1.  Solo se puede publicar un paquete en un *repository*

2.  Se requiere *package.json* . Como mínimo, se requiere la descripción del campo `main` .

    ```json
     { "main": "index.js" }
    ```

3.  Haga *public* el repositorio si desea publicar el paquete

4.  A partir de `version 0.12.0` , los paquetes con módulos que se cargan directamente en un directorio por encima del directorio de trabajo no se incluirán. Los paquetes en el directorio superior *wes\_modules* o *node\_modules* se pueden agrupar.

Ingrese el siguiente comando para agrupar: Consulte *package.json* para saber quÃ© empaquetar.

```bat
wes bundle 
```

## *init*

Ingrese algunos elementos y creará *package.json* a partir de esa información.

```bat
wes init
```

## *install*

Se usa para instalar el paquete para *wes* publicado en *github* . A partir de `version 0.10.28` , la carpeta de instalación se cambia de `node_modules` a `wes_modules` . Si desea instalar en `node_modules` agregue la opción `--node` . A partir de `version 0.12.0` , los archivos se descomprimirán de *bandle.json* y se guardarán. Debido a cambios en las especificaciones, es posible que los paquetes incluidos con `version 0.12.0` no se instalen correctamente con `version 0.12.0` o posterior.

Pase argumentos para *install* en el formulario `@author/repository` .

```bat
wes install @wachaon/fmt
```

*install* tiene opciones.

| llamado       | nombre corto | Descripción                                                                             |
| ------------- | ------------ | --------------------------------------------------------------------------------------- |
| `--bare`      | `-b`         | No cree carpetas *@author*                                                              |
| `--global`    | `-g`         | Instale el paquete en la carpeta donde se encuentra *wes.js*                            |
| `--save`      | `-S`         | Agregue el nombre y la versión del paquete al campo *dependencies* en *package.json*    |
| `--save--dev` | `-D`         | Agregue el nombre y la versión del paquete al campo *devDependencies* en *package.json* |
| `--node`      | `-n`         | Instalar en la carpeta *node\_module*                                                   |

La opción `--bare` puede omitir `require` de `@author/repository` a `repository` . `--global` hace que los paquetes instalados estén disponibles para todos los scripts.

```bat
wes install @wachaon/fmt --bare
```

# Instalar paquetes desde repositorios privados

*install* puede instalar no solo paquetes de repositorios públicos *github* , sino también paquetes de repositorios privados. En *install* , especifique el paquete con *@author/repository* . La implementación intenta descargar la siguiente url.

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/bundle.json`
```

Si accede al repositorio privado *raw* con un navegador, se mostrará *token* , así que copie el *token* y utilícelo. También puede instalar paquetes desde repositorios privados ejecutándolos en la consola mientras *token* es válido.

```bat
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

# Introducción del paquete

Aquí hay algunos paquetes externos.

## *@wachaon/fmt*

*@wachaon/fmt* está *prettier* empaquetado para que *wes* forme scripts. Además, si se produce *Syntax Error* mientras está instalado *@wachaon/fmt* , puede mostrar la ubicación del error.

### Instalar *@wachaon/fmt*

```bat
wes install @wachaon/fmt
```

Si hay *.prettierrc* (formato JSON) en el directorio de trabajo, se reflejará en la configuración. *fmt* está disponible tanto en *CLI* como *module* .

#### Utilizar como *CLI* .

```bat
wes @wachaon/fmt src/sample --write
```

| número sin nombre | Descripción                                        |
| ----------------- | -------------------------------------------------- |
| 1                 | Requerido. la ruta del archivo que desea formatear |

| llamado   | nombre corto | Descripción           |
| --------- | ------------ | --------------------- |
| `--write` | `-w`         | permitir sobrescribir |

Sobrescriba el archivo con el script formateado si se especifica `--write` o `-w` .

#### utilizar como módulo

```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')
const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```

## *@wachaon/edge*

*Internet Explorer* dejará de ser compatible el 15 de junio de 2022. Como resultado, se espera que las operaciones de la aplicación con `require('InternetExplorer.Application')` sean imposibles. Además, el sitio en sí mismo no podrá mostrarse correctamente al finalizar el soporte para *Internet Explorer* . Una alternativa sería operar *Microsoft Edge based on Chromium* a través *web driver(msedgedriver.exe)* . `@wachaon/edge` simplifica el piloto automático *Edge* .

### Instalar *@wachaon/edge*

Primero instale el paquete.

```bat
wes install @wachaon/edge --bare
```

Luego descargue *web driver(msedgedriver.exe)* .

```bat
wes edge --download
```

Comprueba la versión *Edge* instalada y descarga el *web driver* correspondiente.

### Cómo usar *@wachaon/edge*

Será fácil de usar. Inicie su navegador y cambie el tamaño de la ventana y el sitio de visualización a `https://www.google.com` .

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

Almacenamos su historial de visitas hasta que *URL* de su navegador comience con `https://www.yahoo` .

```javascript
const edge = require('edge')

const ret = edge((window, navi, res) => {
    window.rect({
        x: 1,
        y: 1,
        width: 1200,
        height: 500
    })
    res.exports = []

    navi.on(/^https?:\/\/www\.yahoo\b/, (url) => {
        console.log('finished!')
        navi.emit('terminate', res, window)
    })

    navi.on(/https?:\/\/.+/, (url) => {
        console.log('URL: %O', url)
        res.exports.push(url)
    })

    window.navigate('http://www.google.com')
})

console.log('ret // => %O', ret)
```

*edge* imprime las *URL* visitadas en la consola en orden. `@wachaon/edge` registra eventos para *URL* y agrega datos a `res.exports` . *URL* que se va a registrar puede ser `String` `RegExp` y se puede configurar de forma flexible. Al hacerlo controlado por eventos, puede cambiar fácilmente a la operación manual al no configurar eventos para procesos que son difíciles de manejar con el piloto automático. Si desea que la secuencia de comandos se detenga, ejecute `navi.emit('terminate', res)` o finalice *Edge* manualmente. La finalización genera `res.exports` como un archivo *.json* de forma predeterminada. Si desea configurar el procesamiento de terminación, configure `terminate` de `edge(callback, terminate)` . `window` es una instancia de la clase *Window* de *@wachaon/webdriver* , no la `window` del navegador.

## *@wachaon/webdriver*

Será un paquete que envía solicitudes al *web driver* que opera el navegador. *@wachaon/edge* incluye *@wachaon/webdriver* .

### Instalar *@wachaon/webdriver*

```bat
wes install @wachaon/webdriver --bare
```

Descargue *Chromium* controlador web *Microsoft Edge* basado en Chromium *web driver(msedgedriver.exe)* si no lo tiene. Además, si la versión de *edge* y la versión del *web driver(msedgedriver.exe)* son diferentes, descargue la misma versión del *web driver(msedgedriver.exe)* .

```bat
wes webdriver --download
```

### Cómo usar *@wachaon/webdriver*

Vaya al sitio [*yahoo JAPAN*](https://www.yahoo.co.jp/) y guarde una captura de pantalla de un elemento de bloque específico.

```javascript
const { Window } = require('webdriver')
const { writeFileSync } = require('filesystem')
const { resolve, WorkingDirectory } = require('pathname')
const genGUID = require('genGUID')

const window = new Window
const { document } = window
window.rect({
    x: 0,
    y: 0,
    width: 1280,
    height: 600
})
window.navigate('https://www.yahoo.co.jp/')

const [elm] = document.querySelectorAll('#ContentWrapper > main > div:nth-child(2)')
const screen = elm.takeScreenShot()

const spec = resolve(WorkingDirectory, 'dev', genGUID() + '.png')
console.log(writeFileSync(spec, screen))

window.quit()
```
