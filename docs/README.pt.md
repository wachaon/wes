# *WES*

*wes* é uma estrutura de console para executar *ECMAScript* em *WSH (Windows Script Host)* . O texto original *README* estará em [*japanese*](/README.md) . Textos diferentes do japonês serão traduzidos automaticamente.\
Para textos em outros idiomas, selecione uma das opções abaixo.

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

# recurso

*   Você pode alterar o mecanismo de script para *Chakra* e escrever de acordo com as especificações *ECMAScript2015+* .
*   Sempre usa *cscript.exe* de 32 bits, portanto, não há problemas exclusivos de 64 bits
*   Sistema de módulos disponível para um desenvolvimento mais eficiente do que *WSH* tradicional
*   Os módulos integrados suportam processamento básico, como entrada/saída de arquivo e saída de texto colorido para o console
*   Você não precisa se preocupar com a codificação, etc., pois ele pode inferir automaticamente a codificação ao ler o arquivo
*   Também é possível empacotar o módulo e publicá-lo externamente ou obtê-lo.
*   Exibir detalhes do erro com mais gentileza do que *WSH*

# Problemas conhecidos que nÃ£o *wes* resolver

*   `WScript.Quit` não pode abortar o programa e não retorna um código de erro
*   O processamento assíncrono não funciona corretamente
*   Você não pode usar *event prefix* do segundo argumento de `WScript.CreateObject`

# download

*wes* só precisa do arquivo *wes.js* Para baixar, copie *wes.js* de [*@wachaon/wes*](https://github.com/wachaon/wes) ou execute o seguinte comando em seu console.

```bat
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

*wes* adota uma implementação que usa `SendKeys` de *WScript.Shell* em tempo de execução. Se o caminho do diretório onde *wes.js* está armazenado contiver caracteres não ASCII, `SendKeys` não poderá enviar as chaves corretamente e o script não será executado. Portanto, certifique-se de que o caminho onde você armazena *wes.js* consiste apenas em caracteres ASCII. Como alternativa, se você já baixou *wes.js* , pode atualizá-lo usando o comando abaixo.

```bat
wes update
```

# como comeÃ§ar *wes*

Digite `wes` seguida do comando especificando o arquivo que serÃ¡ o ponto inicial do programa para o console. A extensÃ£o de script *.js* pode ser omitida.

```bat
wes index
```

*wes* pode inserir e executar scripts diretamente no console. Se você iniciá-lo apenas com `wes` , poderá inserir e executar o script diretamente.

```bat
wes
```

*REP* aceita entrada de script até que você insira duas linhas em branco. Você também pode ver *REP* executando o script de exemplo em *README.md* .

## opÃ§Ãµes de linha de comando

As opções de inicialização *wes* são as seguintes.

| nomeado            | Descrição                                         |
| ------------------ | ------------------------------------------------- |
| `--monotone`       | Elimina *ANSI escape code*                        |
| `--transpile`      | Sempre converta e execute com *babel-standalone*  |
| `--debug`          | execute o script no modo de depuração             |
| `--encoding=UTF-8` | Especifica a codificação do primeiro arquivo lido |
| `--arch=x86`       | Esta opção é adicionada automaticamente por *wes* |

# sistema modular

*wes* suporta dois sistemas de módulos, *commonjs module* usando `require()` e *es module* usando `import` . ( *dynamic import* não é suportada porque é um processo assíncrono)

## *commonjs module*

Gerencie módulos atribuindo a `module.exports` e chamando `require()` . Caminhos diferentes de caminhos absolutos e caminhos relativos começando com `./` e `../` procuram módulos no diretório *wes\_modules* e, convenientemente, *node\_modules* . `require()` de *wes* adivinha automaticamente a codificação do arquivo do módulo, mas você pode especificar a codificação com o segundo argumento se não adivinhar corretamente.

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

Além disso, é possível importar com *require* para *COM Object* como `require('WScript.Shell')` .

```javascript
const Shell = require('Shell.Application')
Shell.MinimizeAll()
WScript.Sleep(2000)
Shell.UndoMinimizeAll()
```

## *es module*

*Chakra* , o mecanismo de execução de script, interpreta sintaxe como `imoprt` , mas não é executado no ambiente *cscript* . No *wes* ao adicionar *babel* aos módulos integrados, *es module* também são executados enquanto são transpilados um a um. Isso tem um custo de sobrecarga de processamento e um arquivo *wes.js* inchado. Os módulos escritos no *es module* também são convertidos para `require()` por transpilação, então é possível chamar *COM Object* . No entanto, ele não suporta a especificação da codificação do arquivo do módulo com *es module* . Tudo é carregado automaticamente. Para carregá-lo como *es module* , defina a extensão como `.mjs` ou defina o campo `"type"` em `package.json` como `"module"` .

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

# objeto embutido

*wes* possui *built-in objects* não encontrados em *WSH (JScript)* .

## *console*

*wes* *console* em vez de `WScript.Echo()` e `WScript.StdErr.WriteLine()` .

### *console.log*

Caracteres de saída para o console com `console.log()` . Ele também suporta strings formatadas. Gera uma string formatada usando o operador de formatação `%` . (Os operadores de formatação também são válidos para outros métodos.)

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

| Especificador de formato | Descrição                            |
| ------------------------ | ------------------------------------ |
| `%s`                     | `String(value)`                      |
| `%S`                     | `String(value)`                      |
| `%c`                     | `String(value)`                      |
| `%C`                     | `String(value)`                      |
| `%d`                     | `parseInt(value, 10)`                |
| `%D`                     | `parseInt(value, 10)`                |
| `%f`                     | `Number(value)`                      |
| `%F`                     | `Number(value)`                      |
| `%j`                     | `JSON.stringify(value)`              |
| `%J`                     | `JSON.stringify(value, null, 2)`     |
| `%o`                     | despejo de objeto                    |
| `%O`                     | Despejo de objeto (recuado/colorido) |

*wes* usa `WScript.StdOut.WriteLine` em vez de `WScript.StdErr.WriteLine` para produzir strings coloridas. `WScript.Echo` e `WScript.StdOut.WriteLine` são bloqueados. Use `WScript.StdErr.WriteLine` ou `console.log` .

### *console.print*

`console.log()` normalmente inclui uma nova linha no final, mas `console.print` não.

### *console.debug*

SaÃ­da para o console somente se `--debug` estiver habilitada.

### *console.error*

Lance uma exceÃ§Ã£o com o conteÃºdo como a mensagem.

### *console.weaklog*

Strings impressas com `console.weaklog()` desaparecem do console se houver qualquer saída subseqüente. Útil para comutar saídas.

## *Buffer*

Você pode lidar com buffers.

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log('%s %O', content, buff)
```

## `__dirname` e `__filename`

`__filename` armazena o caminho do arquivo de módulo atualmente em execução. `__dirname` contém o diretório de `__filename` .

```javascript
const message = `dirname: ${__dirname}\nfilename: ${ __filename}`
console.log(message)
```

## *setTimeout* *setInterval* *setImmediate* *Promise*

Como *wes* é um ambiente de execução para processamento síncrono, *setTimeout* *setInterval* *setImmediate* *Promise* não funciona como processamento assíncrono, mas é implementado para suportar módulos que assumem implementação *Promise* .

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

# Módulo embutido

*wes* possui *built-in modules* para simplificar e padronizar o processamento básico.

## Módulos embutidos a serem removidos

Altere alguns módulos internos para módulos externos para tornar o arquivo mais leve e fácil de manter.

*   *animate.js*
*   *day.js*
*   *debug.js*
*   *log.js*

Os módulos acima podem ser instalados como `@wachaon/animate` `@wachaon/day` `@wachaon/debug` `@wachaon/log` respectivamente.

## *ansi*

`ansi` é *ANSI escape code* que pode alterar cores e efeitos de saída padrão. Cores e efeitos podem diferir dependendo do tipo e configurações do aplicativo de console usado.

```javascript
const { redBright, yellow } = require('ansi')
const message = 'File does not exist'
console.log(redBright + 'Error: ' + yellow + message)
```

Você também pode criar suas próprias cores com `ansi.color()` e `ansi.bgColor()` . Os argumentos usam *RGB* como `255, 165, 0` *color code* como `'#FFA500'` . *color name* como `orange` não são suportados.

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

## *argv*

Obtenha argumentos de linha de comando. Os argumentos de linha de comando do `cscript.exe` declaram argumentos nomeados com `/` , enquanto *wes* declara argumentos nomeados com `-` e `--` . *argv.unnamed* e *argv.named* lanÃ§am o tipo de valor do argumento da linha de comando para *String* *Number* *Boolean* . Digite argumentos de linha de comando com *REP* .

```bat
wes REP aaa -bc dd --e=false --gh=iii jjj --klm nn -o --p 9 r
```

Execute o seguinte script no *REP* .

```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```

## *pathname*

Manipular caminhos. Os caminhos que começam com `/` e `\` são geralmente relativos à raiz da unidade. Por exemplo `/filename` e `C:/filename` podem ser o mesmo caminho. Por motivos de segurança, *wes* interpreta caminhos começando com `/` e `\` relativos ao diretório de trabalho.

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

## *filesystem*

Manipular arquivos e diretórios. `readTextFileSync()` adivinha automaticamente a codificação do arquivo e o lê. (Mesmo que o segundo `encode` de `readFileSync()` seja definido como `auto` , ele será adivinhado automaticamente.)

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
// const contents = fs.readFileSync(readme, 'auto')
console.log(contents)
```

## *chardet*

Estou usando alguns recursos de <https://github.com/runk/node-chardet> . Você pode aumentar a precisão da adivinhação automática aumentando os caracteres específicos da codificação.

## *JScript*

Se você alterar o mecanismo de script para *Chakra* , não poderá usar *Enumerator* específicos *JScript* etc. O módulo integrado *JScript* os torna disponíveis. No entanto, *Enumerator* retorna *Array* , não *Enumerator object* .

```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```

*GetObject* funciona como uma alternativa para `WScript.GetObject` .

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

*VBScript* oferece alguns recursos que *JScript* não oferece.

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

*minitest* pode escrever testes simples. A partir da versão `0.10.71` , voltamos ao conceito básico e reduzimos os tipos de asserções para 3 tipos.

Agrupe com `describe` , teste com `it` e verifique com `assert` . `pass` será um array do número de ocorrências `it` e o número de passes.

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

### afirmações

Existem apenas três funções de asserção para comparar objetos para simplificar.

#### `assert(value, message)` `assert.ok(value, message)`

Compare com `true` com o operador de igualdade estrita `===` . Se `value` for uma função, avalie o resultado da execução da função.

| Parâmetro | Tipo                  | Descrição                              |
| :-------- | :-------------------- | :------------------------------------- |
| `value`   | `{Function\|Boolean}` | função booleana ou de retorno booleano |
| `message` | `{String}`            | mensagem em caso de falha              |

#### `assert.equal(expected, actual)`

Compara objetos para igualdade de membro, não por referência.\
`NaN === NaN` `function (){} === function (){}` `true` `/RegExp/g === /RegExp/g` ou `{one: {two: 2}} === {one: {two: 2}}` `[1,2,3] === [1,2,3]` etc.\
Ao comparar classes (objetos), elas devem ter o mesmo construtor ou uma superclasse cuja `actual` seja `expected` .

| Parâmetro  | Tipo    | Descrição      |
| :--------- | :------ | :------------- |
| `expected` | `{Any}` | valor esperado |
| `actual`   | `{Any}` | Valor atual    |

#### `assert.throws(value, expected, message)`

Verifique se os erros estão sendo lançados corretamente.\
Se o erro está correto ou não, é determinado se o *constructor* de erro esperado, *message* é igual e a expressão regular passa na avaliação *stack* .

| Parâmetro  | Tipo                      | Descrição                                                                                |
| :--------- | :------------------------ | :--------------------------------------------------------------------------------------- |
| `value`    | `{Error}`                 | erro                                                                                     |
| `expected` | `{Error\|String\|RegExp}` | Uma expressão regular que avalia o *constructor* , *message* ou *stack* de erro esperado |
| `message`  | `{String}`                | mensagem em caso de falha                                                                |

## *match*

*match* é um módulo que determina se um caminho de arquivo corresponde a um padrão específico. Você pode usar curingas (curingas são caracteres especiais como `*` e `?` ) em nomes e caminhos de arquivos para procurar arquivos que correspondam a critérios específicos.

| Parâmetro | Tipo       | Descrição          |
| :-------- | :--------- | :----------------- |
| `pattern` | `{String}` | padrão             |
| `matcher` | `{Any}`    | Caminho de Destino |

```javascript {"testing": true, "message": "match"}
const match = require('match')

console.log(() => match('path/to/*.js', 'path/to/url.js')) // => true
console.log(() => match('path/**/index.*', 'path/to/url/index.json')) // => true
console.log(() => match('path/to/*.?s', 'path/to/script.cs')) // => true
```

### *match.search*

*match.search* encontra caminhos que correspondem a um padrão de caminhos existentes.

| Parâmetro | Tipo       | Descrição                           |
| :-------- | :--------- | :---------------------------------- |
| `pattern` | `{String}` | padrão                              |
| `matcher` | `{Any}`    | Caminho do diretório para pesquisar |

```javascript
const { search } = require('match')

console.log(() => search('**/LICENSE', process.cwd()))
```

## *pipe*

*pipe* simplifica a tubulação. Gere o resultado durante a conversão de *data* com um ou vários *converter* . A partir *ver 0.12.75* , pode ser iniciado diretamente da linha de comando.

### Inicie *pipe* como um módulo

Coloque a função de conversão `use(converter)` do método *pipe* e descreva a entrada de dados e o processamento pós-conversão com `process(data, callback(error, result))` . Se nenhum `callback` for especificado, o valor de retorno será *promise* e o processamento pode ser conectado com `then(result)` e `catch(error)` .

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

Além de `use(converter)` , existem métodos como `.filter(callbackFn(value, index))` e `map(callbackFn(value, index))` . Cada *data* é uma string, uma matriz e um objeto.

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

### iniciar *pipe* a partir da linha de comando

Na linha de comando, insira a função de conversão em ordem após `pipe` . Os argumentos para as funções de conversão são inseridos como os valores dos argumentos de linha de comando nomeados com o mesmo nome da função de conversão. `=>` valor `(` analisado com `eval()` em vez de `JSON.parse()` `)` *WSH* força `"` nos argumentos da linha de comando. Nesse caso, não analise com `eval()` )

```bash
wes pipe swap merge --input="sample.txt" --output="" --swap="[2, 0, 1, 3]" --merge=4
```

Este comando é equivalente ao script:

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

Determine o tipo de script.

```javascript {"testing": true, "message": "typecheck"}
const { isString, isNumber, isBoolean, isObject } = require('typecheck')
console.log(() => isString("ECMAScript")) /* => true */
console.log(() => isNumber(43.5)) /* => true */
console.log(() => isBoolean(false)) /* => true */
console.log(() => isObject(function(){})) /* => false */
```

## *getMember*

Obtém o tipo de membro *COM Object* e a descrição *ProgID* quando usado no console.

```bat
wes getMember "Scripting.FileSystemObject"
```

Quando usado como um módulo, obtém o tipo de membro e a descrição da instância. Quando usado como um módulo, você pode obter informações sobre objetos que não podem ser confirmados do *WSH (Windows Script Host)* .

```javascript
const getMember = require('getMember')
const SWbemServicesEx = require("WbemScripting.SWbemLocator").ConnectServer()
getMember(SWbemServicesEx)
```

## *ps*

Facilita a execução *PowerShell* .

### `ps(source, option)`

Execute `source` script *PowerShell* de origem.

Exiba uma lista de cmdlets no console.

```javascript
const ps = require('ps')
 
console.log(ps("Get-Command"))
```

Se houver uma janela *Google Cherome* , altere o tamanho e a posição da janela. (Não funciona no modo de tela cheia.)

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

Controla os movimentos e cliques do mouse.

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

Salve o script como um arquivo ou cole-o em seu próximo `REP` .

```bat
wes REP pos 100 100
```

### Execute *powershell* diretamente do console

Executa o arquivo *.ps1* especificado no console.

```bat
wes ps ./sample.ps1
```

Você também pode executar um comando diretamente especificando `--Command` ou `-c` .

Exemplo de exibição de uma lista de arquivos no diretório atual

```bat
wes ps --Command Get-ChildItem
```

## *zip*

Compacta arquivos e pastas e descompacta arquivos compactados. Internamente, *PowerShell* Ã© chamado e processado.

```javascript
const {zip, unzip} = require('zip')
console.log(zip('docs\\*', 'dox.zip'))
console.log(unzip('dox.zip'))
```

Um curinga `*` pode ser escrito `path` de `zip(path, destinationPath)` . Pode ser usado tanto em *CLI (Command Line Interface)* quanto em *module* .

```bat
wes zip docs\* dox.zip
wes zip -p dox.zip
```

Se `path` tiver a extensão `.zip` , `unzip()` é processado e não há descrição da extensão `.zip` . Como alternativa, mesmo se houver uma extensão `.zip` se houver uma descrição curinga `*` , `zip()` será processado.

| sem nome | Descrição                             |
| -------- | ------------------------------------- |
| `1`      | `path` ou arquivo para inserir        |
| `2`      | arquivo de pasta para `dest` de saída |

| nomeado  | nome curto | Descrição                             |
| -------- | ---------- | ------------------------------------- |
| `--path` | `-p`       | `path` ou arquivo para inserir        |
| `--dest` | `-d`       | arquivo de pasta para `dest` de saída |

# Agrupamento (empacotamento) e instalaÃ§Ã£o de mÃ³dulos

Em *wes* , um pacote de vários módulos é chamado de pacote. Você pode instalar o pacote para *wes* publicado no *github* . *github repository* é necessário para publicar um pacote.

## *bundle*

Ao publicar um pacote no *github* , *bundle* agrupa os módulos necessários e cria *bundle.json* .

1.  Apenas um pacote pode ser publicado em um *repository*

2.  *package.json* é obrigatório. No mínimo, a descrição do campo `main` é obrigatória.

    ```json
     { "main": "index.js" }
    ```

3.  Torne o repositório *public* se quiser publicar o pacote

4.  A partir da `version 0.12.0` , os pacotes com carregamento direto do módulo em um diretório acima do diretório de trabalho não serão agrupados. Pacotes no diretório superior *wes\_modules* ou *node\_modules* podem ser agrupados.

Digite o seguinte comando para agrupar: Consulte *package.json* para saber o que agrupar.

```bat
wes bundle 
```

## *init*

Insira alguns itens e ele criará *package.json* a partir dessas informações.

```bat
wes init
```

## *install*

Usado para instalar o pacote para *wes* publicado no *github* . A partir `version 0.10.28` , a pasta de instalação foi alterada de `node_modules` para `wes_modules` . Se você deseja instalar em `node_modules` adicione a opção `--node` . A partir `version 0.12.0` , o arquivo será descompactado de *bandle.json* e salvo. Devido a alterações de especificação, os pacotes agrupados com `version 0.12.0` podem não ser instalados corretamente com `version 0.12.0` ou posterior.

Passe argumentos para *install* no formato `@author/repository` .

```bat
wes install @wachaon/fmt
```

*install* tem opções.

| nomeado       | nome curto | Descrição                                                                         |
| ------------- | ---------- | --------------------------------------------------------------------------------- |
| `--bare`      | `-b`       | Não crie pastas *@author*                                                         |
| `--global`    | `-g`       | Instale o pacote na pasta onde está *wes.js*                                      |
| `--save`      | `-S`       | Adicione o nome e a versão do pacote ao campo *dependencies* em *package.json*    |
| `--save--dev` | `-D`       | Adicione o nome e a versão do pacote ao campo *devDependencies* em *package.json* |
| `--node`      | `-n`       | Instale na pasta *node\_module*                                                   |

A opção `--bare` pode omitir `require` de `@author/repository` para `repository` . `--global` disponibiliza os pacotes instalados para todos os scripts.

```bat
wes install @wachaon/fmt --bare
```

# Instalando pacotes de repositÃ³rios privados

*install* pode instalar não apenas pacotes de repositórios *github* públicos, mas também pacotes de repositórios privados. Em *install* , especifique o pacote com *@author/repository* . A implementação tenta baixar o seguinte url.

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/bundle.json`
```

Ao acessar *raw* do repositório privado com um navegador, *token* será exibido, então copie o *token* e use-o. Pacotes de repositórios privados também podem ser instalados se executados no console enquanto *token* for válido.

```bat
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

# Introdução do pacote

Aqui estão alguns pacotes externos.

## *@wachaon/fmt*

*@wachaon/fmt* é *prettier* *wes* formatar scripts. Além disso, se ocorrer *Syntax Error* enquanto *@wachaon/fmt* estiver instalado, você poderá indicar o local do erro.

### Instale *@wachaon/fmt*

```bat
wes install @wachaon/fmt
```

Se houver *.prettierrc* (formato JSON) no diretório de trabalho, isso será refletido nas configurações. *fmt* está disponível na *CLI* e *module* .

#### Use como *CLI* .

```bat
wes @wachaon/fmt src/sample --write
```

| número sem nome | Descrição                                                  |
| --------------- | ---------------------------------------------------------- |
| 1               | Obrigatório. o caminho do arquivo que você deseja formatar |

| nomeado   | nome curto | Descrição             |
| --------- | ---------- | --------------------- |
| `--write` | `-w`       | permitir sobrescrever |

Substitua o arquivo com o script formatado se `--write` ou `-w` for especificado.

#### usar como módulo

```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')
const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```

## *@wachaon/edge*

*Internet Explorer* encerrará o suporte em 15 de junho de 2022. Como resultado, espera-se que as operações do aplicativo com `require('InternetExplorer.Application')` se tornem impossíveis. Além disso, o próprio site não poderá ser exibido corretamente ao encerrar o suporte para *Internet Explorer* . Uma alternativa seria operar *Microsoft Edge based on Chromium* por meio *web driver(msedgedriver.exe)* . `@wachaon/edge` simplifica o piloto automático *Edge* .

### Instale *@wachaon/edge*

Primeiro instale o pacote.

```bat
wes install @wachaon/edge --bare
```

Em seguida, baixe *web driver(msedgedriver.exe)* .

```bat
wes edge --download
```

Verifique a versão *Edge* instalada e baixe o *web driver* correspondente.

### Como usar *@wachaon/edge*

Será fácil de usar. Inicie seu navegador e altere o tamanho da janela e o site de exibição para `https://www.google.com` .

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

Armazenamos seu histórico de visitas até que *URL* de seu navegador comece com `https://www.yahoo` .

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

*edge* imprime os *URL* visitados no console em ordem. `@wachaon/edge` registra eventos para *URL* e adiciona dados a `res.exports` . *URL* a ser registrada pode ser `String` `RegExp` e pode ser definida de forma flexível. Ao torná-lo orientado a eventos, você pode alternar facilmente para a operação manual, não configurando eventos para processos difíceis de lidar com o piloto automático. Se você deseja que o script pare, execute `navi.emit('terminate', res)` ou encerre *Edge* manualmente. A finalização gera `res.exports` como um arquivo *.json* por padrão. Se você deseja definir o processamento de encerramento, defina `terminate` de `edge(callback, terminate)` . `window` é uma instância da classe *Window* de *@wachaon/webdriver* , não a `window` do navegador.

## *@wachaon/webdriver*

Será um pacote que envia requisições ao *web driver* que opera o navegador. *@wachaon/edge* inclui *@wachaon/webdriver* .

### Instale *@wachaon/webdriver*

```bat
wes install @wachaon/webdriver --bare
```

Baixe *Chromium* driver da Web *Microsoft Edge* baseado no Chromium *web driver(msedgedriver.exe)* se você não o tiver. Além disso, se a versão do *edge* e a versão do *web driver(msedgedriver.exe)* forem diferentes, baixe a mesma versão do *web driver(msedgedriver.exe)* .

```bat
wes webdriver --download
```

### Como usar *@wachaon/webdriver*

Acesse [*yahoo JAPAN*](https://www.yahoo.co.jp/) e salve uma captura de tela de um elemento de bloco específico.

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
