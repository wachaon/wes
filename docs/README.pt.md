# WES

*wes* é uma estrutura para executar *ECMAScript* no *Windows Script Host*

*README* original do [*japanese*](README.ja.md) será. Além do japonês, será um texto traduzido automaticamente. Selecione uma frase em outro idioma entre os seguintes.

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

## Recursos

-   Mude o mecanismo de script para *Chakra* e habilite a execução do *ECMAScript2015* *Chakra*
-   *cscript.exe* 32 bits, para evitar bugs peculiares em ambientes de 64 bits
-   Você pode importar o módulo com `require`
-   Caracteres coloridos podem ser enviados para saída padrão
-   Adivinhe a codificação do arquivo automaticamente

## Recursos não resolvidos

-   `WScript.Quit` não pode interromper o programa e não retorna um código de erro
-   Processamento assíncrono
-   Utilização do *event prefix* do *event prefix* do segundo argumento de `WScript.CreateObject`

## Instalar

*wes* precisa é apenas o arquivo *wes.js* Para fazer o download, inicie o prompt de comando e digite o seguinte comando.

```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

*wes* no momento da execução conforme a implementação *WScript.Shell* de `SendKeys` usa. *wes.js* o caminho do diretório onde *wes.js* foi salvo contiver caracteres diferentes de *ascii* , `SendKeys` não o enviará corretamente e o script não será executado. Nesse caso, configure o caminho para salvar *wes.js* apenas com *ascii* .

## Uso

Na linha de comando, especifique o arquivo que é o ponto de partida do programa após `wes` . A extensão do script *.js* pode ser omitida.

```shell
wes index
```

Além disso, como o *wes* tem um *REPL* , você pode executar um script inserido diretamente na linha de comando, iniciando-o apenas com o `wes` .

```shell
wes
```

A entrada do script é aceita até que você insira duas linhas em branco. *README.md* também pode verificar a execução do script de amostra em *README.md* com *REPL* .

## argumentos nomeados de linha de comando

*wes* seguintes argumentos nomeados são aceitos como opções de inicialização do *wes* .

| nomeado            | descrição                                                 |
| ------------------ | --------------------------------------------------------- |
| `--monotone`       | Elimine o *ANSI escape code*                              |
| `--safe`           | Execute o script em modo de segurança                     |
| `--usual`          | Execute o script no modo normal (padrão)                  |
| `--unsafe`         | Execute o script em modo inseguro                         |
| `--dangerous`      | Execute o script em modo perigoso                         |
| `--debug`          | Execute o script em modo de depuração                     |
| `--encoding=UTF-8` | Especifique a codificação do arquivo a ser lido primeiro. |
| `--engine=Chakra`  | Esta opção é adicionada automaticamente pelo *wes*        |

A implementação de `--safe` `--usual` `--unsafe` `--dangerous` está incompleta, mas os argumentos nomeados são reservados.

## objetos embutidos

*wes* possui *built-in objects* *JScript* que o *JScript* não possui.

### exigir

Importe o módulo com *require* . *wes* adivinha automaticamente a codificação do arquivo do módulo, mas se você não adivinhar corretamente, pode especificar a codificação com o segundo argumento.

Você também pode importar com *require* para *OLE* como `require('WScript.Shell')` .

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

### módulo e módulo.exportações

Se você deseja defini-lo como um módulo, substitua-o em `module.exports` .

```javascript
function add (a, b) {
    return a + b
}

module.exports = add
```

### console

*wes* Em `WScript.Echo` e `WScript.StdErr.WriteLine` vez do *console* use o.

Você pode enviar caracteres para a linha de comando com `console.log` . Ele também oferece suporte a strings formatadas. Você pode usar o operador de formato `%` para especificar uma string de formato.

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

*wes* para gerar uma string colorida em `WScript.StdOut.WriteLine` , em vez disso, usar `WScript.StdErr.WriteLine` . `WScript.Echo` saída de `WScript.Echo` e `WScript.StdOut.WriteLine` está bloqueada, use `WScript.StdOut.WriteLine` ou `console.log` .

### Amortecedor

Pode lidar com buffers.

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```

### **dirname e** nome do arquivo

`__filename` armazena o caminho do arquivo de módulo atualmente em execução. `__dirname` armazena o diretório `__filename` .

```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```

## módulos embutidos

*wes* possui *built-in modules* para simplificar e padronizar o processamento básico.

### ansi

`ansi` contém um *ANSI escape code* e você pode alterar a cor e o efeito da saída padrão. As cores e os efeitos podem variar dependendo do tipo e das configurações do aplicativo de console usado.

```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```

Você também pode criar sua própria cor com `ansi.color()` ou `ansi.bgColor()` . Os argumentos usam *RGB* , como `255, 165, 0` ou *color code* , como `'#FFA500'` . Você não pode usar *color name* como `orange` .

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

### argv

Obtém argumentos de linha de comando. Os argumentos da linha de comando `cscript.exe` de `/` declara os argumentos nomeados em, mas, *wes* em `-` e `--` declara os argumentos nomeados em.

*argv.unnamed* e *argv.named* convertem o tipo de valor do argumento da linha de comando em um *String* *Number* *Boolean* .

Insira os argumentos da linha de comando com *REPL* .

```shell
wes REPL aaa -bcd eee --fgh=iii jjj --kln mmm
```

Execute o seguinte script em *REPL* .

```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```

### nome do caminho

Opere o caminho.

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

### sistema de arquivo

Opera arquivos e diretórios. `readTextFileSync` irá adivinhar a codificação do arquivo e lê-lo.

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```

### JScript

Se você alterar o motor de script para *Chakra* , você não será capaz de usar *JScript* específicas *Enumerator* . O módulo integrado *JScript* os disponibiliza. No entanto, *Enumerator* retorna um *Array* vez de um objeto Enumerator.

```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```

*GetObject* `WScript.GetObject` como uma alternativa para `WScript.GetObject` .

```javascript
const { GetObject, Enumerator } = require('JScript')

const ServiceSet = GetObject("winmgmts:{impersonationLevel=impersonate}").InstancesOf("Win32_Service")
new Enumerator(ServiceSet).forEach(service => console.log(
    'Name: %O\nDescription: %O\n',
    service.Name,
    service.Description
))
```

### VBScript

*VBScript* oferece alguns dos recursos que o *JScript* não possui.

```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```

### httpprequest

*httprequest* é como seu nome a *http request* emitirá um

```javascript
const request = require('httprequest')
const content = request('GET', 'http://weather.livedoor.com/forecast/webservice/json/v1?city=130010')
console.log('%O', JSON.parse(content))
```

### miniteste

*minitest* pode escrever testes simples.

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

### tubo

*pipe* simplifica o processamento de tubo

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

### Typecheck

Julgue o tipo de script.

```javascript
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```

## Pacote de módulo e instalação

*install* , você pode instalar o módulo para *wes* publicado no *github* . Para publicar o módulo, você precisa do *github repository* . Além disso, o nome do repositório e o nome do diretório local devem ser iguais.

### agrupar

*github* a publicação de um módulo para *github* , *bundle* agrupa os módulos necessários e muda-lo em um formato que pode ser incluído pelo *install* módulo.

Em consideração à segurança, o *wes* não importa o módulo que pode ser executado diretamente, então crie o arquivo *.json* no módulo do *bundle* .

Existem algumas condições para agrupar módulos.

1.  *repository* um tipo de módulo pode ser publicado em um *repository* .
2.  *github* nome do repositório *github* e o nome do diretório de trabalho local devem ser iguais.
3.  O repositório deve ser público se você quiser publicar o módulo para terceiros.
4.  *wes* não interpreta estaticamente o script, portanto, os módulos que `require` apenas sob certas condições, como instruções `if` , não podem ser agrupados.
5.  *.json* arquivo *.json* será criado no diretório de trabalho com o nome *directory_name.json* . Se você alterar o nome do arquivo ou mover o arquivo, não poderá instalá-lo.
6.  `node_modules/directory_name` , o empacotamento falha porque faz referência a `directory_name.json` .

### instalar

Ele é usado para instalar o arquivo de módulo para *wes* publicado no *github* .

## uso

Passe argumentos para *install* no formato `@author/repository`

```shell
wes install @wachaon/fmt
```

*install* tem opções

| nomeado    | nome curto | descrição                                    |
| ---------- | ---------- | -------------------------------------------- |
| `--bare`   | `-b`       | não crie a pasta *@author*                   |
| `--global` | `-g`       | Instale o módulo na pasta onde *wes.js* está |

`--bare` opção `--bare` pode omitir o argumento `require` de `author@repository` para `repository` . `--global` opção `--global` torna o módulo instalado disponível para todos os scripts. As opções acima devem ser usadas com a opção de segurança do *wes* `--unsafe` ou `--dangerous` .

```shell
wes install @wachaon/fmt --bare --unsafe
```

# Instalar módulo de repositório privado

*install* pode ser instalado não apenas no módulo de repositório público do *github* mas também no repositório privado.

*install* , especifique o módulo com `author@repository` . A implementação baixa o seguinte.

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```

Quando você acessa o *raw* do repositório privado com um navegador, o *token* é exibido, portanto, copie o *token* e use-o.

Você também pode instalar os módulos em seu repositório privado se executá-lo na linha de comando enquanto o *token* é válido.

```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

## Módulo Externo

Aqui, apresentamos alguns módulos externos.

### *@wachaon/fmt*

*@wachaon/fmt* é um pacote *prettier* que formata o script. Além disso, *@wachaon/fmt* em um estado que foi instalado `SyntaxError` pode apresentar a localização do erro quando ocorrer.

#### instalar

```shell
wes install @wachaon/fmt
```

#### uso

Se houver *.prettierrc* (formato JSON) no diretório de trabalho, reflita na configuração. *fmt* pode ser usado com *CLI* (interface de linha de comando) e *module* .

Use como *CLI*

```shell
wes @wachaon/fmt src/sample --write
```

| número sem nome | descrição                                                 |
| --------------- | --------------------------------------------------------- |
| 0               | -                                                         |
| 1               | Requeridos. O caminho do arquivo que você deseja formatar |

| nomeado   | nome curto | descrição             |
| --------- | ---------- | --------------------- |
| `--write` | `-w`       | Permitir substituição |

Substitui o arquivo com o script formatado se for fornecido um argumento nomeado `--write` ou `-w` .

#### *module* usado como um *module*

#### `option`

```javascript
{
    parser: 'babel',
    plugins: [babel]
}
```

#### `format`

| nome do argumento | tipo     | descrição                             |
| ----------------- | -------- | ------------------------------------- |
| `source`          | `string` | String para formatar                  |
| `option?`         | `object` | Opções para passar para as *prettier* |

```javascript
const { format } = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { resolve } = require('pathname')

const spec = resolve(process.cwd(), 'sample.js')
let source = readTextFileSync(spec)
source = format(source)
console.log(writeTextFileSync(spec, source))
```
