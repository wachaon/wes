# *WES*


*wes* é uma estrutura para executar *ECMAScript* no *Windows Script Host*


O texto original do *README* é o [*japanese*](docs/README.ja.md) . Além do japonês, é uma frase traduzida automaticamente.  
Selecione frases em outros idiomas entre os seguintes.


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



# Recursos


-   *Chakra* o mecanismo de *Windows Script Host* do *Windows Script Host* para executar o *ECMAScript2015* *Chakra*
-   Como o *cscript.exe* 32 bits é executado, não há nenhum problema específico para o ambiente de 64 bits.
-   Importe o módulo com `require`
-   Produz caracteres coloridos para a saída padrão
-   Adivinhe automaticamente a codificação do arquivo


# Recursos não resolvidos


-   `WScript.Quit` não pode interromper o programa e não retorna um código de erro
-   Processamento assíncrono
-   O segundo *event prefix* de *event prefix* argumento de `WScript.CreateObject` não pode ser usado


# Instalar


*wes* precisa é o único arquivo *wes.js* Para fazer o download, inicie um prompt de comando e digite o seguinte comando.


```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```


*wes* no momento da execução conforme a implementação *WScript.Shell* de `SendKeys` usa. *wes.js* o caminho do diretório onde *wes.js* foi salvo contiver caracteres diferentes de *ascii* , `SendKeys` não conseguirá enviar a chave corretamente e o script não poderá ser executado.  
Configure o caminho de destino de *wes.js* de *wes.js* apenas *ascii* .


## Uso


Na linha de comando, especifique o arquivo que será o ponto de partida do programa após `wes` . A extensão do script *.js* pode ser omitida.


```shell
wes index
```


Além disso, o *wes* tem um *REPL* portanto *REPL* se você iniciá-lo apenas com o `wes` , poderá inserir o script diretamente.


```shell
wes
```


Os scripts serão aceitos até você inserir duas linhas em branco. *README.md* também pode verificar a execução do script de amostra em *README.md* com *REPL* .


## argumentos nomeados de linha de comando


As opções de inicialização do *wes* são as seguintes.


| nomeado            | Descrição                                               |
| ------------------ | ------------------------------------------------------- |
| `--monotone`       | Elimine o *ANSI escape code*                            |
| `--safe`           | Execute o script em modo de segurança                   |
| `--usual`          | Execute o script no modo normal (padrão)                |
| `--unsafe`         | Execute o script em modo inseguro                       |
| `--dangerous`      | Execute o script em modo perigoso                       |
| `--debug`          | Execute o script em modo de depuração                   |
| `--encoding=UTF-8` | Especifica a codificação do primeiro arquivo a ser lido |
| `--engine=Chakra`  | Esta opção é adicionada automaticamente pelo *wes*      |


A implementação de `--safe` `--usual` `--unsafe` `--dangerous` está incompleta, mas os argumentos nomeados são reservados.


# objetos embutidos


*wes* possui *built-in objects* que *WSH (JScript)* não possui.


## *require*


Importe o módulo com *require* . *wes* adivinha automaticamente a codificação do arquivo do módulo, mas se você não adivinhar corretamente, pode especificar a codificação com o segundo argumento.


Além disso, `require('WScript.Shell')` como do *OLE* mesmo para *require* importação seja possível com.


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


## `module` e `module.exports`


Se você deseja defini-lo como um módulo, atribua-o a `module.exports` .


```javascript
function add (a, b) {
    return a + b
}

module.exports = add
```


## *console*


*wes* Em `WScript.Echo` e `WScript.StdErr.WriteLine` vez do *console* use o.


Imprime caracteres na linha de comando em `console.log` . Ele também oferece suporte a strings formatadas. Imprime uma string formatada usando o operador de formatação `%` .


```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```


*wes* para gerar uma string colorida em `WScript.StdOut.WriteLine` , em vez disso, usar `WScript.StdErr.WriteLine` . `WScript.Echo` e `WScript.StdOut.WriteLine` são bloqueados na saída, portanto, use `WScript.StdErr.WriteLine` ou `console.log` .


## *Buffer*


Pode lidar com buffers.


```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```


## `__dirname` e `__filename`


`__filename` contém o caminho do arquivo de módulo atualmente em execução. `__dirname` `__filename` o diretório de `__filename` .


```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```


# módulos embutidos


*wes* tem *built-in modules* para simplificar e padronizar o processamento básico.


## *ansi*


`ansi` possui um *ANSI escape code* que permite alterar a cor e o efeito da saída padrão. As cores e os efeitos podem variar dependendo do tipo e das configurações do aplicativo de console usado.


```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```


Você também pode criar suas próprias cores com `ansi.color()` e `ansi.bgColor()` . O argumento usa *RGB* como `255, 165, 0` ou *color code* como `'#FFA500'` . Você não pode usar *color name* como `orange` .


```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```


## *argv*


Obtém o argumento da linha de comando. Os argumentos da linha de comando `cscript.exe` de `/` declara os argumentos nomeados em, mas, *wes* em `-` e `--` declara os argumentos nomeados em.


*argv.unnamed* e *argv.named* convertem o tipo de valor do argumento da linha de comando em um dos *String* *Number* *Boolean* .


Insira os argumentos da linha de comando junto com o *REPL* .


```shell
wes REPL aaa -bcd eee --fgh=iii jjj --kln mmm
```


Execute o seguinte script no *REPL* .


```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```


## *pathname*


Opere o caminho.


```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```


## *filesystem*


Operar arquivos e diretórios. `readTextFileSync` adivinha e lê automaticamente a codificação do arquivo.


```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```


## *JScript*


Se você alterar o motor de script para *Chakra* , você não será capaz de usar *JScript* específica *Enumerator* etc. O módulo integrado *JScript* os disponibiliza. No entanto, *Enumerator* retorna um *Array* vez de um objeto Enumerator.


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


## *VBScript*


*VBScript* fornece alguns recursos que o *JScript* não possui.


```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```


## *httprequest*


*httprequest* é como seu nome a *http request* emitirá um.


```javascript
const request = require('httprequest')
const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log('%O', JSON.parse(content))
```


## *minitest*


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


## *pipe*


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


## *typecheck*


Determine o tipo de script.


```javascript
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```


# Pacote de módulo e instalação


*install* , você pode instalar o módulo para *wes* publicado no *github* . Você precisará de um *github repository* para publicar o módulo. Além disso, o nome do repositório e o nome do diretório local devem ser iguais.


## *bundle*


*github* publicar um módulo no *github* , *bundle* o módulo necessário e altere-o para um formato que pode ser importado pelo módulo de *install* .


Por razões de segurança, *wes* não importa módulos em um formato que pode ser executado diretamente, então crie um arquivo *.json* com o módulo de *bundle* .


Existem algumas condições para agrupar módulos.


1.  *repository* um tipo de módulo pode ser publicado em um *repository* .
2.  O nome do repositório no *github* e o nome do diretório de trabalho local devem ser iguais.
3.  O repositório deve ser público se você quiser publicar o módulo para terceiros.
4.  *wes* não interpreta estaticamente o script. Módulos adquiridos por `require` em condições específicas, como `if` declarações não podem ser agrupadas.
5.  *.json* arquivo *.json* será criado em seu diretório de trabalho com o nome *directory_name.json* . Ele não pode ser instalado se o arquivo for renomeado ou se o arquivo for movido.
6.  `node_modules/directory_name` , o pacote falha porque se refere a `directory_name.json` .


## *install*


Usado para instalar o arquivo de módulo para *wes* publicado no *github* .


### uso


Passe argumentos para *install* no formato `@author/repository`


```shell
wes install @wachaon/fmt
```


*install* tem opções


| nomeado    | nome curto | Descrição                                    |
| ---------- | ---------- | -------------------------------------------- |
| `--bare`   | `-b`       | Não crie a pasta *@author*                   |
| `--global` | `-g`       | Instale o módulo na pasta onde *wes.js* está |


`--bare` opção `--bare` pode omitir o argumento `require` de `author@repository` para `repository` . `--global` opção `--global` torna os módulos instalados disponíveis para todos os scripts. As opções acima devem ser especificadas ao mesmo tempo que a opção de segurança do *wes* `--unsafe` ou `--dangerous` .


```shell
wes install @wachaon/fmt --bare --unsafe
```


# Instale o módulo de repositório privado


*install* pode ser instalado não apenas em módulos em repositórios públicos no *github* , mas também em repositórios privados.


*install* , especifique o módulo com `author@repository` . A implementação baixa o seguinte.


```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```


Quando você acessa *raw* do repositório privado com um navegador, o *token* será exibido, então copie o *token* e use-o.


Você também pode instalar um módulo em um repositório privado, executando-o na linha de comando durante a *token* do *token* .


```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```


# Módulo Externo


Aqui estão alguns módulos externos.


## *@wachaon/fmt*


*@wachaon/fmt* agrupa *prettier* e formata o script. Além disso, se *@wachaon/fmt* estiver instalado e ocorrer um erro de `SyntaxError` , o local do erro pode ser indicado.


### instalar


```shell
wes install @wachaon/fmt
```


### uso


Se houver *.prettierrc* (formato JSON) no diretório de trabalho, isso será refletido na configuração. *fmt* pode ser usado com *CLI* (interface de linha de comando) e *module* em *fmt* .


Use como *CLI*


```shell
wes @wachaon/fmt src/sample --write
```


| número sem nome | Descrição                                                  |
| --------------- | ---------------------------------------------------------- |
| 0               | ――――                                                       |
| 1               | Obrigatório. O caminho do arquivo que você deseja formatar |


| nomeado   | nome curto | Descrição             |
| --------- | ---------- | --------------------- |
| `--write` | `-w`       | Permitir substituição |


Substitua o arquivo por um script formatado se você especificar um argumento nomeado de `--write` ou `-w` .


### *module* usar como um *module*


### `option`


```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')

const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```
