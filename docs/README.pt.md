# *WES*


*wes* é uma estrutura de console que executa *ECMAScript* em *WSH (Windows Script Host)* .


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


-   Você pode alterar o mecanismo de script para *Chakra* e escrevê-lo na especificação *ECMAScript2015* .
-   Ele sempre executa *cscript.exe* de 32 bits, portanto, não apresenta problemas inerentes ao ambiente de 64 bits.
-   Com um sistema modular, você pode desenvolver com mais eficiência do que o *WSH* tradicional
-   O módulo integrado suporta processamento básico, como entrada/saída de arquivo e saída de caracteres coloridos para o console.
-   Você não precisa se preocupar com a codificação porque pode fazer com que o arquivo lido automaticamente adivinhe a codificação.
-   Também empacotamos módulos para suportar publicação e recuperação externa.


# Problemas *wes* que não podemos resolver


-   `WScript.Quit` não pode interromper o programa e não retorna um código de erro
-   Processamento assíncrono como `setTimeout` e `Promise` não é possível
-   Você não pode usar o *event prefix* como o segundo argumento de `WScript.CreateObject`


# instalar


Wes só precisa do *wes* *wes.js* Para baixar, copie *wes.js* de [*@wachaon/wes*](https://github.com/wachaon/wes) ou execute o seguinte comando no console.


```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```


*WScript.Shell* usa `SendKeys` de *wes* em tempo de execução como uma implementação. Se o caminho do diretório onde *wes.js* está salvo contiver caracteres diferentes de *ascii* , `SendKeys` não poderá enviar a chave corretamente e o script não poderá ser executado.  
Configure o caminho de destino de salvamento de *wes.js* somente *ascii* .


# Como usar


No console, especifique o arquivo que será o ponto de partida do programa após `wes` . A extensão de script *.js* pode ser omitida.


```shell
wes index
```


Além disso, *wes* possui um *REPL* , portanto, se você iniciar apenas com `wes` , poderá inserir o script diretamente.


```shell
wes
```


O *REPL* aceita entrada de script até que você insira duas linhas em branco. Você também pode verificar a execução do script de amostra em *README.md* com *REPL* .


## Opções do console


As opções de inicialização para *wes* são as seguintes.


| nomeado            | Descrição                                               |
| ------------------ | ------------------------------------------------------- |
| `--monotone`       | Elimine *ANSI escape code*                              |
| `--safe`           | Execute o script no modo de segurança                   |
| `--usual`          | Execute o script no modo normal (padrão)                |
| `--unsafe`         | Execute o script no modo inseguro                       |
| `--dangerous`      | Execute o script no modo perigoso                       |
| `--debug`          | Execute o script no modo de depuração                   |
| `--encoding=UTF-8` | Especifica a codificação do primeiro arquivo a ser lido |
| `--engine=Chakra`  | Esta opção é adicionada automaticamente por *wes*       |


A implementação de `--safe` `--usual` `--unsafe` `--dangerous` `--debug` está incompleta, mas os argumentos nomeados são reservados.


# Sistema modular


*wes* suporta dois sistemas de módulos, um sistema *commonjs module* que usa o general `require()` e um *es module* que usa `import` . ( *dynamic import* é um processamento assíncrono, portanto, não é compatível)


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


Você também pode importar para *OLE* como *require* `require('WScript.Shell')` com require.


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


*Chakra* , que é o mecanismo de execução do script, interpreta a sintaxe como `imoprt` , mas não pode ser executado como está porque o método de processamento como `cscript` não está definido. Em *wes* , ao adicionar *babel* ao módulo embutido, ele é executado enquanto transpila sequencialmente para o *es module* . Como resultado, a sobrecarga de processamento e o arquivo *wes.js* são inchados como um custo.


Módulos descritos pelo *es module* também são convertidos em transpile para `require()` , então *OLE* pode ser chamado. No entanto, ele não suporta a especificação de codificação de arquivo do módulo. Todos são lidos por adivinhação automática.


Para carregá-lo como um *es module* , defina a extensão para `.mjs` ou o campo `"type"` de `package.json` para `"module"` .


```javascript
// ./sub.mjs
export default function sub (a, b) {
    return a - b
}
```


```javascript
./main2.js\
import sub from './sub.mjs'

console.log('sub(7, 3) // => %O', sub(7, 3))
```


# Objeto embutido


*wes* possui *built-in objects* internos que o *WSH (JScript)* não possui.


## *console*


`WScript.Echo` usa *console* em vez de *wes* ou `WScript.StdErr.WriteLine` .


Imprima caracteres no console em `console.log` . Ele também suporta strings formatadas. Imprime uma string formatada usando o operador de formatação `%` .


```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```


`WScript.StdOut.WriteLine` *wes* de `WScript.StdErr.WriteLine` para produzir strings coloridas. `WScript.Echo` e `WScript.StdOut.WriteLine` são bloqueados da saída. `WScript.StdErr.WriteLine` ou `console.log` .


## *Buffer*


Pode lidar com buffers.


```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```


## `__dirname` e `__filename`


`__filename` contém o caminho do arquivo de módulo atualmente em execução. `__dirname` contém o diretório de `__filename` .


```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```


# Módulo embutido


*wes* possui *built-in modules* para simplificar e padronizar o processamento básico.


## *ansi*


`ansi` é um *ANSI escape code* que permite alterar a cor e o efeito da saída padrão. As cores e os efeitos podem variar dependendo do tipo e das configurações do aplicativo de console usado.


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


Obtém o argumento do console. O argumento de console de `cscript.exe` declara um argumento nomeado com `/` `--` enquanto *wes* declara um argumento nomeado com `-` e-.


*argv.unnamed* e *argv.named* convertem o tipo de valor do argumento do console para um dos *String* *Number* *Boolean* .


Insira os argumentos do console junto com o *REPL* .


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


Caminhos que começam com `/` e `\` geralmente se referem a caminhos relativos à raiz da unidade. Por exemplo, `/filename` e `C:/filename` podem estar no mesmo caminho. Por motivos de segurança, `wes` interpreta os caminhos que começam com `/` e `\` como relativos ao diretório de trabalho.


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


Se você alterar o mecanismo de script para *Chakra* , não poderá usar o *Enumerator* específico do *JScript* etc. O módulo embutido *JScript* os disponibiliza. No entanto, *Enumerator* retorna um *Array* em vez de um *Enumerator object* .


```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```


*GetObject* atua como uma alternativa para `WScript.GetObject` .


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


*httprequest* emite uma *http request* .


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


*pipe* simplifica o processamento de tubos.


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


## *zip*


Compacte arquivos e pastas e descompacte arquivos compactados. Ele chama o *PowerShell* internamente e o processa.


```javascript
const {zip, unzip} = require('zip')

console.log(zip('docs\\*', 'dox.zip'))
console.log(unzip('dox.zip'))
```


Curingas `*` podem ser escritos no `path` do `zip(path, destinationPath)` .


Pode ser usado com *CLI* (interface de console) e *module* .


```shell
wes zip docs\* dox.zip
wes zip -p dox.zip
```


Se o `path` tiver extensão `.zip` , `unzip()` é processado e não há descrição da extensão `.zip` . Ou mesmo se houver uma extensão `.zip` , se houver uma descrição de um curinga `*` , `zip()` será processado.


| sem nome | Descrição                              |
| -------- | -------------------------------------- |
| `1`      | `path` Pasta ou arquivo a ser inserido |
| `2`      | arquivo de pasta para saída `dest`     |


| nomeado  | nome curto | Descrição                              |
| -------- | ---------- | -------------------------------------- |
| `--path` | `-p`       | `path` Pasta ou arquivo a ser inserido |
| `--dest` | `-d`       | arquivo de pasta para saída `dest`     |


# Agrupamento e instalação de módulos


Em *wes* , um pacote de vários módulos é chamado de pacote. Você pode instalar o pacote para *wes* publicado no *github* . Você precisará de um *github repository* para publicar o pacote. Além disso, o nome do repositório e o nome do diretório local devem ser iguais.


## *bundle*


Ao publicar o pacote no *github* , o *bundle* agrupa os módulos necessários e altera o formato para que possa ser importado por instalação.


Por motivos de segurança, o *bundle* cria um arquivo *.json* porque *wes* não permite que você importe pacotes em um formato que possa ser executado diretamente.


Existem algumas condições para a embalagem.


1.  Apenas um módulo pode ser publicado em um *repository* .
2.  Certifique-se de que o nome do repositório no *github* e o nome do diretório de trabalho local sejam os mesmos.
3.  Se você quiser publicar o pacote, torne o repositório *public* .
4.  Declare a aquisição do módulo no escopo de nível superior.
5.  O arquivo *.json* do pacote é criado em seu diretório de trabalho com o nome *directory_name.json* . Ele não pode ser instalado se o arquivo for renomeado ou o arquivo for movido.
6.  `node_modules/directory_name` , o pacote falha porque se refere a `directory_name.json` .


## *install*


Usado para instalar o pacote para *wes* publicado no *github* .


### Como usar


Passe argumentos para *install* no formato `@author/repository` .


```shell
wes install @wachaon/fmt
```


*install* tem opções.


| nomeado    | nome curto | Descrição                                      |
| ---------- | ---------- | ---------------------------------------------- |
| `--bare`   | `-b`       | Não crie a pasta *@author*                     |
| `--global` | `-g`       | Instale o módulo na pasta onde o *wes.js* está |


`--bare` pode omitir o argumento `require` de `author@repository` para `repository` . `--global` disponibiliza os módulos instalados para todos os scripts. As opções acima devem ser especificadas ao mesmo tempo que a opção *wes* security `--unsafe` ou `--dangerous` .


```shell
wes install @wachaon/fmt --bare --unsafe
```


# Instalando pacotes em repositórios privados


*install* pode instalar não apenas módulos em repositórios públicos no *github* , mas também repositórios privados.


Na *install* , especifique o módulo com *@author/repository* . A implementação tentará baixar o seguinte URL.


```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```


Quando você acessar o *raw* do repositório privado com um navegador, o *token* será exibido, então copie o *token* e use-o.


Você também pode instalar um módulo em um repositório privado executando-o no console durante a vida útil do *token* .


```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```


# Introdução do pacote


Aqui estão alguns módulos externos.


## *@wachaon/fmt*


*@wachaon/fmt* empacota *prettier* e formata o script. Além disso, se ocorrer um *Syntax Error* com *@wachaon/fmt* instalado, você pode indicar o local do erro.


### instalar


```shell
wes install @wachaon/fmt
```


### Como usar


Se houver *.prettierrc* (formato JSON) no diretório de trabalho, ele será refletido na configuração. *fmt* pode ser usado com *CLI* (interface de console) e *module* .


#### Usado como *CLI* .


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


#### Use como um módulo


```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')

const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```


## `@wachaon/edge`


*Internet Explorer* completará o suporte com 2022/6/15. Como resultado, torna-se impossível operar o aplicativo com `require('InternetExplorer.Application')` .


Uma alternativa seria operar *Microsoft Edge based on Chromium* através do *web driver* . `@wachaon/edge` simplifica o piloto automático *Edge* .


### instalar


Primeiro, instale o módulo.


```shell
wes install @wachaon/edge --unsafe --bare
```


Em seguida, baixe o *web driver* .


```shell
wes edge --download
```


Verifique a versão instalada do *Edge* e baixe o *web driver* correspondente.


### Como usar


Será fácil de usar.


```javascript
const edge = require('./index')

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


Esse script exibirá sequencialmente os *URL* visitados no console.


`@wachaon/edge` registra um evento para a *URL* e adiciona dados a `res.exports` . A *URL* a ser registrada pode ser `String` `RegExp` e configurações flexíveis podem ser feitas.


Ao torná-lo orientado a eventos, é possível alternar facilmente para operação manual, não configurando um evento para processamento difícil de lidar com o piloto automático.


Se você quiser parar o script, execute `navi.emit('terminate', res)` ou encerre manualmente o *Edge* .


O processo de encerramento gera `res.exports` como um arquivo *.json* como o valor padrão. Se você quiser definir o processo de finalização, defina `terminate` da `edge(callback, terminate)` .
