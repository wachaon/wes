# _WES_

_wes_ é uma estrutura para executar _ECMAScript_ no _Windows Script Host_

O texto original do _README_ é o [_japanese_](README.ja.md) . Além do japonês, é uma frase traduzida automaticamente.  
Selecione frases em outros idiomas entre os seguintes.

## Recursos

-   Mude o mecanismo de script para _Chakra_ e execute _ECMAScript2015_ _Chakra_
-   _cscript.exe_ 32 bits e não tem nenhum bug específico para o ambiente de 64 bits
-   Importe o módulo com `require`
-   Produz caracteres coloridos para a saída padrão
-   Adivinhe automaticamente a codificação do arquivo

## Recursos não resolvidos

-   `WScript.Quit` não pode interromper o programa e não retorna um código de erro
-   Processamento assíncrono
-   Utilização do _event prefix_ do _event prefix_ do segundo argumento de `WScript.CreateObject`

## Instalar

_wes_ precisa é o único arquivo _wes.js_ Para fazer o download, inicie um prompt de comando e digite o seguinte comando.

```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

_wes_ no momento da execução conforme a implementação _WScript.Shell_ de `SendKeys` usa. _wes.js_ o caminho do diretório onde _wes.js_ foi salvo contiver caracteres diferentes de _ascii_ , `SendKeys` não poderá enviar a chave corretamente e o script não poderá ser executado.  
Configure o caminho de destino de _wes.js_ de _wes.js_ apenas _ascii_ .

## Uso

Na linha de comando, especifique o arquivo que será o ponto de partida do programa após `wes` . A extensão do script _.js_ pode ser omitida.

```shell
wes index
```

Além disso, o _wes_ tem _REPL_ portanto _REPL_ se você iniciá-lo apenas com o `wes` , poderá inserir o script diretamente.

```shell
wes
```

O script será aceito até que você insira duas linhas em branco. _README.md_ também pode verificar a execução do script de amostra em _README.md_ com _REPL_ .

## argumentos nomeados de linha de comando

As opções de inicialização do _wes_ são as seguintes.

| nomeado            | Descrição                                               |
| ------------------ | ------------------------------------------------------- |
| `--monotone`       | Elimine o _ANSI escape code_                            |
| `--safe`           | Execute o script em modo de segurança                   |
| `--usual`          | Execute o script no modo normal (padrão)                |
| `--unsafe`         | Execute o script em modo inseguro                       |
| `--dangerous`      | Execute o script em modo perigoso                       |
| `--debug`          | Execute o script em modo de depuração                   |
| `--encoding=UTF-8` | Especifica a codificação do primeiro arquivo a ser lido |
| `--engine=Chakra`  | Esta opção é adicionada automaticamente pelo _wes_      |

A implementação de `--safe` `--usual` `--unsafe` `--dangerous` está incompleta, mas os argumentos nomeados são reservados.

## objetos embutidos

_wes_ possui _built-in objects_ que _WSH (JScript)_ não possui.

### _require_

Importe o módulo com _require_ . _wes_ adivinha automaticamente a codificação do arquivo do módulo, mas se você não adivinhar corretamente, pode especificar a codificação com o segundo argumento.

Além disso, `require('WScript.Shell')` como do _OLE_ mesmo para _require_ importação seja possível com.

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

Se você deseja defini-lo como um módulo, atribua-o a `module.exports` .

```javascript
function add (a, b) {
    return a + b
}

module.exports = add
```

### _console_

_wes_ usa _console_ vez de `WScript.Echo` e `WScript.StdErr.WriteLine` .

Imprime caracteres na linha de comando em `console.log` . Ele também oferece suporte a strings formatadas. Imprime uma string formatada usando o operador de formatação `%` .

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

_wes_ para gerar uma string colorida em `WScript.StdOut.WriteLine` , em vez disso, usar `WScript.StdErr.WriteLine` . `WScript.Echo` e `WScript.StdOut.WriteLine` são bloqueados na saída, portanto, use `WScript.StdOut.WriteLine` ou `console.log` .

### _Buffer_

Pode lidar com buffers.

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```

### `__dirname` e `__filename`

`__filename` contém o caminho do arquivo de módulo atualmente em execução. `__dirname` `__filename` o diretório de `__filename` .

```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```

## módulos embutidos

_wes_ tem _built-in modules_ para simplificar e padronizar o processamento básico.

### _ansi_

`ansi` tem um _ANSI escape code_ que permite alterar a cor e o efeito da saída padrão. As cores e os efeitos podem variar dependendo do tipo e das configurações do aplicativo de console usado.

```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```

Você também pode criar suas próprias cores com `ansi.color()` e `ansi.bgColor()` . O argumento usa _RGB_ como `255, 165, 0` ou _color code_ como `'#FFA500'` . Você não pode usar um _color name_ como `orange` .

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

### _argv_

Obtém o argumento da linha de comando. Os argumentos da linha de comando `cscript.exe` de `/` declara os argumentos nomeados em, mas, _wes_ em `-` e `--` declara os argumentos nomeados em.

_argv.unnamed_ e _argv.named_ convertem o tipo de valor do argumento da linha de comando em um dos _String_ _Number_ _Boolean_ .

Insira os argumentos da linha de comando junto com o _REPL_ .

```shell
wes REPL aaa -bcd eee --fgh=iii jjj --kln mmm
```

Execute o seguinte script no _REPL_ .

```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```

### _pathname_

Opere o caminho.

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

### _filesystem_

Manipule arquivos e diretórios. `readTextFileSync` adivinha e lê automaticamente a codificação do arquivo.

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```

### _JScript_

Se você alterar o motor de script para _Chakra_ , você não será capaz de usar _JScript_ específica _Enumerator_ etc. O módulo integrado _JScript_ os disponibiliza. No entanto, _Enumerator_ retorna um _Array_ vez de um objeto Enumerator.

```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```

_GetObject_ `WScript.GetObject` como uma alternativa para `WScript.GetObject` .

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

_VBScript_ oferece alguns recursos que o _JScript_ não possui.

```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```

### _httprequest_

_httprequest_ emite _http request_ como seu nome sugere.

```javascript
const request = require('httprequest')
const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log('%O', JSON.parse(content))
```

### _minitest_

_minitest_ pode escrever testes simples.

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

_pipe_ simplifica o processamento de tubo

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

Determine o tipo de script.

```javascript
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```

## Pacote de módulo e instalação

_install_ , você pode instalar o módulo para _wes_ publicado no _github_ . Você precisará do _github repository_ para publicar o módulo. Além disso, o nome do repositório e o nome do diretório local devem ser iguais.

### _bundle_

_github_ publicar um módulo no _github_ , _bundle_ o módulo necessário e altere-o para um formato que pode ser importado pelo módulo de _install_ .

Por razões de segurança, _wes_ não importa módulos em um formato que pode ser executado diretamente, então crie um arquivo _.json_ com o módulo de _bundle_ .

Existem algumas condições para agrupar módulos.

1.  _repository_ um tipo de módulo pode ser publicado em um _repository_ .
2.  _github_ nome do repositório _github_ e o nome do diretório de trabalho local devem ser iguais.
3.  O repositório deve ser público se você quiser publicar o módulo para terceiros.
4.  _wes_ não interpreta estaticamente o script. Módulos que `require` sob certas condições, como instruções `if` , não podem ser agrupados.
5.  _.json_ arquivo _.json_ será criado em seu diretório de trabalho com o nome _directory_name.json_ . Se você renomear ou mover o arquivo, não poderá instalá-lo.
6.  `node_modules/directory_name` empacotamento falha porque faz referência a `directory_name.json` .

### _install_

Ele é usado para instalar o arquivo de módulo para _wes_ publicado no _github_ .

## uso

Passe argumentos para _install_ no formato `@author/repository`

```shell
wes install @wachaon/fmt
```

_install_ tem opções

| nomeado    | nome curto | Descrição                                    |
| ---------- | ---------- | -------------------------------------------- |
| `--bare`   | `-b`       | Não crie a pasta _@author_                   |
| `--global` | `-g`       | Instale o módulo na pasta onde _wes.js_ está |

`--bare` opção `--bare` pode omitir o argumento `require` de `author@repository` para `repository` . `--global` opção `--global` torna os módulos instalados disponíveis para todos os scripts. As opções acima devem ser especificadas ao mesmo tempo que a opção de segurança do _wes_ `--unsafe` ou `--dangerous` .

```shell
wes install @wachaon/fmt --bare --unsafe
```

# Instale o módulo de repositório privado

_install_ pode ser instalado não apenas em módulos de repositório público _github_ , mas também em repositórios privados.

_install_ , especifique o módulo com `author@repository` . A implementação baixa o seguinte.

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```

Ao acessar o _raw_ do repositório privado com um navegador, o _token_ será exibido, portanto, copie o _token_ e use-o.

Você também pode instalar o módulo no repositório privado, executando-o na linha de comando durante a _token_ do _token_ .

```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

## Módulo Externo

Aqui estão alguns módulos externos.

### _@wachaon/fmt_

_@wachaon/fmt_ é um pacote _prettier_ que formata o script. Além disso, se ocorrer um `SyntaxError` com _@wachaon/fmt_ instalado, você pode indicar a localização do erro.

#### instalar

```shell
wes install @wachaon/fmt
```

#### uso

Se houver _.prettierrc_ (formato JSON) no diretório de trabalho, isso será refletido nas configurações. _fmt_ pode ser usado com _CLI_ (interface de linha de comando) e _module_ em _fmt_ .

Use como _CLI_

```shell
wes @wachaon/fmt src/sample --write
```

| número sem nome | Descrição                                                 |
| --------------- | --------------------------------------------------------- |
| 0               | ---                                                       |
| 1               | Requeridos. O caminho do arquivo que você deseja formatar |

| nomeado   | nome curto | Descrição             |
| --------- | ---------- | --------------------- |
| `--write` | `-w`       | Permitir substituição |

Substitui o arquivo com um script formatado se um argumento nomeado de `--write` ou `-w` for especificado.

#### _module_ usar como um _module_

#### `option`

```javascript
{
    parser: 'babel',
    plugins: [babel]
}
```
