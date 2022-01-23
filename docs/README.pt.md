# *WES*


*wes* é uma estrutura para executar o *ECMAScript* na linha de comando do *Windows Script Host* .


O texto original do *README* é [*japanese*](/README.md) . Além do japonês, é uma frase traduzida por máquina.  
Por favor, selecione frases em outros idiomas a partir do seguinte.


+  [*簡体字*](/docs/README.zh-CN.md) <!-- 中国語 (簡体字) -->
+  [*繁体字*](/docs/README.zh-TW.md) <!-- 中国語 (繁体字) -->
+  [*English*](/docs/README.en.md) <!-- 英語 -->
+  [*हिन्दी*](/docs/README.hi.md) <!-- ヒンディー語 -->
+  [*Español*](/docs/README.es.md) <!-- スペイン語 -->
+  [*عربى*](/docs/README.ar.md) <!-- アラビア語 -->
+  [*বাংলা*](/docs/README.bn.md) <!-- ベンガル語 -->
+  [*Português*](/docs/README.pt.md) <!-- ポルトガル語 -->
+  [*русский язык*](/docs/README.ru.md) <!-- ロシア語 -->
+  [*Deutsch*](/docs/README.de.md) <!-- ドイツ語 -->
+  [*français*](/docs/README.fr.md) <!-- フランス語 -->
+  [*italiano*](/docs/README.it.md) <!-- イタリア語 -->



# Recursos


-   Altere o mecanismo de script do *Windows Script Host* para *Chakra* e execute o *ECMAScript2015* *Chakra*
-   Ele sempre executa *cscript.exe* 32 bits, portanto, não há bugs inerentes ao ambiente de 64 bits.
-   Importe o módulo com `require` (correspondente ao *es module* da *ver 0.9.0* )
-   Emite caracteres coloridos para a saída padrão
-   Adivinhe e leia automaticamente a codificação do arquivo de texto


# Problemas conhecidos que não podemos resolver


-   `WScript.Quit` não pode interromper o programa e não retorna um código de erro
-   Processamento assíncrono como `setTimeout` e `Promise` não é possível
-   O segundo *event prefix* de *event prefix* argumento de `WScript.CreateObject` não pode ser usado


# Instalar


*wes* necessidade é apenas arquivo *wes.js* Para baixar, inicie um prompt de comando e digite o seguinte comando.


```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```


*wes* no momento da execução como a implementação *WScript.Shell* de `SendKeys` usa. *wes.js* o caminho do diretório onde *wes.js* está salvo contiver caracteres diferentes de *ascii* , `SendKeys` não poderá enviar a chave corretamente e o script não poderá ser executado.  
Configure o caminho de destino de *wes.js* de *wes.js* somente *ascii* .


## Uso


Na linha de comando, especifique o arquivo que será o ponto de partida do programa após `wes` . A extensão de script *.js* pode ser omitida.


```shell
wes index
```


Além disso, *wes* tem um *REPL* , portanto, se você iniciar apenas com `wes` , poderá inserir o script diretamente.


```shell
wes
```


Os scripts serão aceitos até que você insira duas linhas em branco. *README.md* também pode verificar a execução do script de amostra em *README.md* com *REPL* .


## argumentos nomeados de linha de comando


As opções de inicialização para *wes* são as seguintes.


| nomeado            | Descrição                                               |
| ------------------ | ------------------------------------------------------- |
| `--monotone`       | Elimine o *ANSI escape code*                            |
| `--safe`           | Execute o script no modo de segurança                   |
| `--usual`          | Execute o script no modo normal (padrão)                |
| `--unsafe`         | Execute o script no modo inseguro                       |
| `--dangerous`      | Execute o script no modo perigoso                       |
| `--debug`          | Execute o script no modo de depuração                   |
| `--encoding=UTF-8` | Especifica a codificação do primeiro arquivo a ser lido |
| `--engine=Chakra`  | Esta opção é adicionada automaticamente por *wes*       |


A implementação de `--safe` `--usual` `--unsafe` `--dangerous` `--debug` está incompleta, mas os argumentos nomeados são reservados.


# sistema de módulos


*wes* suporta sistemas *commonjs module* que usam os sistemas de módulo geral `require()` e *es module* que usam `import` . ( *dynamic import* não é suportada porque é um processamento assíncrono)


## *commonjs module*


Gerencie módulos atribuindo a `module.exports` e chamando com `require()` . Por conveniência, ele também suporta o diretório *node_modules* .


*wes* `require()` adivinha automaticamente a codificação do arquivo do módulo, mas se não adivinhar corretamente, você pode especificar a codificação com o segundo argumento.


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


Você também pode importar para *OLE* como `require('WScript.Shell')` com *require* .


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


## *es module*


*Chakra* que é o mecanismo de execução do script, interpreta a sintaxe como `imoprt` , mas não pode ser executado como está porque o método de processamento como `cscript` não está definido. *wes* Em *babel* encerrando. Ele é executado durante a *es module* sequencial para o *es module* . Como resultado, a sobrecarga de processamento e o inchaço dos arquivos estão aumentando como um custo.


Módulos descritos pelo *es module* também são convertidos em `require()` para `require()` , então *OLE* pode ser chamado. No entanto, ele não suporta a especificação de codificação do arquivo do módulo. Todos são lidos por adivinhação automática.


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


# objetos embutidos


*wes* tem *built-in objects* internos que o *WSH (JScript)* não tem.


## *console*


*wes* usa *console* em vez de `WScript.Echo` ou `WScript.StdErr.WriteLine` .


Imprima caracteres na linha de comando em `console.log` . Ele também suporta strings formatadas. Imprime uma string formatada usando o operador de formatação `%` .


```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```


*wes* para gerar uma string colorida em `WScript.StdOut.WriteLine` em vez disso, use `WScript.StdErr.WriteLine` . `WScript.Echo` e `WScript.StdOut.WriteLine` são bloqueados da saída, portanto, use `WScript.StdErr.WriteLine` ou `console.log` .


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


*wes* possui *built-in modules* para simplificar e padronizar o processamento básico.


## *ansi*


`ansi` possui um *ANSI escape code* que permite alterar a cor e o efeito da saída padrão. As cores e os efeitos podem variar dependendo do tipo e das configurações do aplicativo de console usado.


```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```


Você também pode criar suas próprias cores com `ansi.color()` e `ansi.bgColor()` . O argumento usa *RGB* como `255, 165, 0` ou *color code* como `'#FFA500'` . Ele não suporta *color name* como `orange` .


```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```


## *argv*


Obtém o argumento da linha de comando. argumentos de linha de comando `cscript.exe` de `/` declara argumentos nomeados em mas, *wes* em `-` e `--` declara os argumentos nomeados em.


*argv.unnamed* e *argv.named* convertem o tipo de valor do argumento de linha de comando para um dos *String* *Number* *Boolean* .


Insira os argumentos da linha de comando junto com o *REPL* .


```shell
wes REPL aaa -bcd eee --fgh=iii jjj --kln mmm
```


Execute o script a seguir no *REPL* .


```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```


## *pathname*


Operar o caminho.


Geralmente, os caminhos que começam com `/` e `\` referem-se a caminhos relativos da raiz da unidade (por exemplo, `/filename` pode ser o mesmo caminho que `C:/filename` ), mas para segurança em `wes` `/` e os caminhos que começam com `\` são interpretados como relativos a o diretório de trabalho.


```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```


## *filesystem*


Operar arquivos e diretórios. `readTextFileSync` automaticamente adivinha e lê a codificação do arquivo.


```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```


## *chardet*


Estou usando alguns recursos de <https://github.com/runk/node-chardet> .


Você pode melhorar a precisão da adivinhação automática aumentando os caracteres específicos da codificação.


## *JScript*


Se você alterar o motor de script para *Chakra* , você não será capaz de usar *JScript* específica *Enumerator* etc. O módulo embutido *JScript* os disponibiliza. No entanto, *Enumerator* retorna um *Array* vez de um objeto Enumerator.


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


*httprequest* é como seu nome *http request* emitirá a.


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


*pipe* simplifica o processamento de tubos


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


Determine o tipo do script.


```javascript
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```


# Pacote de módulos e instalação


*install* , você pode instalar o módulo para *wes* publicado no *github* . Você precisará de um *github repository* para publicar o módulo. Além disso, o nome do repositório e o nome do diretório local devem ser iguais.


## *bundle*


*github* publicar um módulo no *github* , o *bundle* agrupa o módulo necessário e o altera para um formato que pode ser importado pelo módulo de *install* .


Por motivos de segurança, *wes* não importa módulos em um formato que possa ser executado diretamente, então crie um arquivo *.json* com o módulo *bundle* .


Existem algumas condições para o agrupamento de módulos.


1.  *repository* um tipo de módulo pode ser publicado em um *repository* .
2.  O nome do repositório no *github* e o nome do diretório de trabalho local devem ser os mesmos.
3.  O repositório deve ser público se você quiser publicar o módulo para terceiros.
4.  *wes* interpreta dinamicamente o caminho do módulo. Módulos adquiridos por `require` sob condições específicas, como `if` instruções não podem ser agrupadas.
5.  *.json* arquivo *.json* será criado em seu diretório de trabalho com o nome *directory_name.json* . Ele não pode ser instalado se o arquivo for renomeado ou o arquivo for movido.
6.  `node_modules/directory_name` , o pacote falha porque se refere a `directory_name.json` .


## *install*


Usado para instalar o arquivo do módulo para *wes* publicado no *github* .


### uso


Passe argumentos para *install* no formato `@author/repository`


```shell
wes install @wachaon/fmt
```


*install* tem opções


| nomeado    | nome curto | Descrição                                      |
| ---------- | ---------- | ---------------------------------------------- |
| `--bare`   | `-b`       | Não crie a pasta *@author*                     |
| `--global` | `-g`       | Instale o módulo na pasta onde o *wes.js* está |


`--bare` pode omitir o argumento `require` de `author@repository` para `repository` . `--global` disponibiliza os módulos instalados para todos os scripts. As opções acima devem ser especificadas ao mesmo tempo que a opção *wes* security `--unsafe` ou `--dangerous` .


```shell
wes install @wachaon/fmt --bare --unsafe
```


# Instale o módulo do repositório privado


*install* pode ser instalado não apenas em módulos em repositórios públicos no *github* , mas também em repositórios privados.


*install* , especifique o módulo com `author@repository` . A implementação baixa o seguinte.


```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```


Quando você acessar o *raw* do repositório privado com um navegador, o *token* será exibido, então copie o *token* e use-o.


Você também pode instalar um módulo em um repositório privado executando-o na linha de comando durante a *token* do *token* .


```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```


# Módulo externo


Aqui estão alguns módulos externos.


## *@wachaon/fmt*


*@wachaon/fmt* empacota *prettier* e formata o script. Além disso, se @ `SyntaxError` *@wachaon/fmt* estiver instalado e ocorrer um erro de sintaxe, o local do erro poderá ser indicado.


### instalar


```shell
wes install @wachaon/fmt
```


### uso


Se houver *.prettierrc* (formato JSON) no diretório de trabalho, ele será refletido na configuração. *fmt* pode ser usado com *CLI* (interface de linha de comando) e *module* em *fmt* .


Usar como *CLI*


```shell
wes @wachaon/fmt src/sample --write
```


| número sem nome | Descrição                                                 |
| --------------- | --------------------------------------------------------- |
| 0               | ――――                                                      |
| 1               | Requeridos. O caminho do arquivo que você deseja formatar |


| nomeado   | nome curto | Descrição             |
| --------- | ---------- | --------------------- |
| `--write` | `-w`       | Permitir substituição |


Substitua o arquivo por um script formatado se você especificar um argumento nomeado de `--write` ou `-w` .


### Quando usado como *module*


### `option`


```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')

const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```


## `@wachaon/edge`


*Internet Explorer* estará disponível para suporte a partir de 15 de junho de 2022. Como resultado, torna-se impossível operar o aplicativo com `require('InternetExplorer.Application')` .


Uma alternativa seria operar o *Microsoft Edge based on Chromium* por meio de um *web driver* , mas `@wachaon/edge` simplifica o piloto automático do *Edge* .


### instalar


Primeiro, instale o módulo.


```shell
wes install @wachaon/edge --unsafe --bare
```


Em seguida, baixe o *web driver* da *web driver* .


```shell
wes edge
```


Descompacte o *zip* baixado e mova *msedgedriver.exe* para o diretório atual.


### uso


Será fácil de usar.


```javascript
const edge = require('./index')

edge((window, navi, res) => {
    window.rect({x: 1 ,y: 1, width: 1200, height: 500})
    window.navigate('http://www.google.com')
    res.exports = []

    navi.on(/./, (url) => {
        console.log('URL: %O', url)
        res.exports.push(url)
    })
})
```


Esse script gera as *URL* visitadas no prompt de comando em sequência.


`@wachaon/edge` registra um evento para a *URL* e adiciona dados a `res.exports` . A *URL* registrada pode ser `String` `RegExp` e configurações flexíveis podem ser feitas.


Ao torná-lo orientado a eventos, é possível alternar facilmente para a operação manual, não configurando a *URL* para processos difíceis de lidar com o piloto automático.


Se você quiser parar o script, `navi.emit('terminate', res)` ou encerre manualmente o *Edge* .


O processo de encerramento gera `res.exports` como um arquivo *.json* como o valor padrão. Se você deseja definir o processamento final, `edge(callback, terminate)` de `terminate` Conjuntos.
