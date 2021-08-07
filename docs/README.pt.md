# _WES_

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

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

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

## Uso

Na linha de comando, especifique o arquivo que será o ponto de partida do programa após `wes` . A extensão do script _.js_ pode ser omitida.

```shell
wes index
```

Além disso, o _wes_ tem um _REPL_ portanto _REPL_ se você iniciá-lo apenas com o `wes` , poderá inserir o script diretamente.

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

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

### _console_

_wes_ usa _console_ vez de `WScript.Echo` e `WScript.StdErr.WriteLine` .

Imprime caracteres na linha de comando em `console.log` . Ele também oferece suporte a strings formatadas. Imprime uma string formatada usando o operador de formatação `%` .

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

### _Buffer_

Pode lidar com buffers.

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```

### `__dirname` e `__filename`

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```

## módulos embutidos

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

### _ansi_

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

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

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

### _pathname_

Opere o caminho.

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

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

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

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

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

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

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

Existem algumas condições para agrupar módulos.

1.  _repository_ um tipo de módulo pode ser publicado em um _repository_ .
2.  _github_ nome do repositório _github_ e o nome do diretório de trabalho local devem ser iguais.
3.  O repositório deve ser público se você quiser publicar o módulo para terceiros.
4.  _wes_ não interpreta estaticamente o script. Módulos que `require` sob certas condições, como instruções `if` , não podem ser agrupados.
5.  _.json_ arquivo _.json_ será criado em seu diretório de trabalho com o nome _directory_name.json_ . Se você renomear ou mover o arquivo, não poderá instalá-lo.
6.  `node_modules/directory_name` empacotamento falha porque faz referência a `directory_name.json` .

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

Passe argumentos para _install_ no formato `@author/repository`

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

_install_ tem opções

| nomeado    | nome curto | Descrição                                    |
| ---------- | ---------- | -------------------------------------------- |
| `--bare`   | `-b`       | Não crie a pasta _@author_                   |
| `--global` | `-g`       | Instale o módulo na pasta onde _wes.js_ está |

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

```shell
wes install @wachaon/fmt --bare --unsafe
```

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

_install_ , especifique o módulo com `author@repository` . A implementação baixa o seguinte.

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```

Ao acessar o _raw_ do repositório privado com um navegador, o _token_ será exibido, portanto, copie o _token_ e use-o.

Você também pode instalar o módulo no repositório privado, executando-o na linha de comando durante a _token_ do _token_ .

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

## Módulo Externo

Aqui estão alguns módulos externos.

### _@wachaon/fmt_

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

#### instalar

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

undefined

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

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

```javascript
{
    parser: 'babel',
    plugins: [babel]
}
```
