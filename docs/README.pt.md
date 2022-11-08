# *WES*

*wes* é uma estrutura de console para executar o *ECMAScript* no *WSH (Windows Script Host)* . O [*japanese*](/README.md) original do *README* será em japonês. Textos diferentes do japonês serão traduzidos automaticamente.\
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



# característica

*   Você pode alterar o mecanismo de script para *Chakra* e escrever de acordo com as especificações *ECMAScript2015* .
*   Como o *cscript.exe* de 32 bits é sempre executado, não há nenhum problema exclusivo no ambiente de 64 bits.
*   Como existe um sistema de módulos, ele pode ser desenvolvido de forma mais eficiente que o *WSH* convencional
*   Módulos integrados suportam processamento básico, como entrada/saída de arquivo e saída de texto colorido para o console
*   Você pode deixar a leitura do arquivo adivinhar automaticamente a codificação, para que você não precise se preocupar com a codificação, etc.
*   Módulos de pacote para dar suporte à publicação e recuperação externas
*   Exiba os detalhes do erro com mais gentileza do que *WSH*


# *wes* que não podemos resolver

*   `WScript.Quit` não pode abortar o programa e não retorna um código de erro
*   O processamento assíncrono não funciona corretamente
*   Você não pode usar o *event prefix* do segundo argumento de `WScript.CreateObject`


# download

Wes só precisa do *wes* *wes.js* Para baixar, copie *wes.js* de [*@wachaon/wes*](https://github.com/wachaon/wes) ou execute o seguinte comando no console.

     bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js

Nós usamos `SendKeys` *wes* *WScript.Shell* em tempo de execução como uma implementação. Se o caminho do diretório em que *wes.js* foi salvo contiver caracteres diferentes de *ascii* , `SendKeys` não poderá enviar a chave corretamente e o script não poderá ser executado.\
Configure o caminho *wes.js* é armazenado apenas em *ascii* . Se você já baixou *wes* , pode atualizá-lo com o seguinte comando.

     wes update


# Uso

Digite a palavra-chave `wes` seguida do comando especificando o arquivo que será o ponto de partida do programa para o console. A extensão de script *.js* pode ser omitida.

     wes index

Além disso, como *wes* está equipado com *REP* , você pode inserir scripts diretamente iniciando apenas `wes` .

     wes

*REP* aceita entrada de script até que você insira duas linhas em branco. Você também pode ver *REP* executando o script de exemplo em *README.md* .


## opções de linha de comando

As opções de inicialização do *wes* são as seguintes.

| nomeado            | Descrição                                         |
| ------------------ | ------------------------------------------------- |
| `--monotone`       | Elimina *ANSI escape code*                        |
| `--transpile`      | Sempre converta e execute com *babel-standalone*  |
| `--debug`          | execute o script no modo de depuração             |
| `--encoding=UTF-8` | Especifica a codificação do primeiro arquivo lido |
| `--engine=Chakra`  | Esta opção é adicionada automaticamente por *wes* |


# sistema de módulos

*wes* suporta dois sistemas de módulos, o sistema *commonjs module* usando `require()` e o sistema de *es module* usando `import` . ( *dynamic import* não é suportada porque é um processo assíncrono)


## *commonjs module*

Gerencie módulos atribuindo a `module.exports` e chamando `require()` . Caminhos diferentes de caminhos absolutos e caminhos relativos começando com `./` e `../` procuram módulos no diretório *wes\_modules* e convenientemente no diretório *node\_modules* . O `require()` de *wes* adivinha automaticamente a codificação do arquivo do módulo, mas você pode especificar a codificação com o segundo argumento se não adivinhar corretamente.

     // ./add.js function add (a, b) { return ab } module.exports = add

<!---->

     // ./main.js const add = require('./add') console.log('add(7, 3) // => %O', add(7, 3))

Além disso, é possível importar com *require* para *COM Object* como `require('WScript.Shell')` .

     const Shell = require('Shell.Application') Shell.MinimizeAll() WScript.Sleep(2000) Shell.UndoMinimizeAll()


## *es module*

*Chakra* , que é um mecanismo de execução de scripts, interpreta sintaxe como `imoprt` , mas não pode ser executado porque o método de processamento como *cscript* não está definido. Em *wes* , adicionando *babel* aos módulos embutidos, os módulos *es module* também são executados enquanto são transpilados sequencialmente. Isso nos custa a sobrecarga de processamento e um arquivo *wes.js* inchado. Módulos escritos no *es module* também são convertidos para `require()` por transpilação, então é possível chamar *COM Object* . No entanto, ele não suporta especificar a codificação do arquivo de módulo com *es module* . Tudo é carregado automaticamente. Para carregá-lo como um *es module* , defina a extensão para `.mjs` ou defina o campo `"type"` em `package.json` para `"module"` .

     // ./sub.mjs export default function sub (a, b) { return a - b }

<!---->

     // ./main2.js import sub from './sub.mjs' console.log('sub(7, 3) // => %O', sub(7, 3))


# objeto embutido

*wes* tem *built-in objects* internos não encontrados no *WSH (JScript)* .


undefined


## *Buffer*

Você pode lidar com buffers.

     const content = 'Hello World' const buff = Buffer.from(content) console.log(`${content} %O`, buff)


## `__dirname` e `__filename`

`__filename` armazena o caminho do arquivo de módulo atualmente em execução. `__dirname` contém o diretório de `__filename` .

     console.log('dirname: %O\nfilename: %O', __dirname, __filename)


## *setTimeout* *setInterval* *setImmediate* *Promise*

Como *wes* é um ambiente de execução para processamento síncrono, *setTimeout* *setInterval* *setImmediate* *Promise* não funciona como processamento assíncrono, mas é implementado para suportar módulos que assumem a implementação de *Promise* .

     const example = () => { const promise = new Promise((resolve, reject) => { console.log('promise') setTimeout(() => { console.log('setTimeout') resolve('resolved'); }, 2000); }).then((val) => { console.log(val) }); console.log('sub') }; console.log('start') example(); console.log('end')


# Módulo embutido

*wes* possui *built-in modules* para simplificar e padronizar o processamento básico.


## *ansi*

`ansi` é um *ANSI escape code* que pode alterar as cores e efeitos de saída padrão. As cores e os efeitos podem diferir dependendo do tipo e das configurações do aplicativo de console usado.

     const { redBright, yellow } = require('ansi') const message = 'File does not exist' console.log(redBright 'Error: ' yellow message)

Você também pode criar suas próprias cores com `ansi.color()` e `ansi.bgColor()` . Os argumentos usam *RGB* como `255, 165, 0` e *color code* como `'#FFA500'` . *color name* como `orange` não são suportados.

     const { color } = require('ansi') const orange = color(255, 165, 0) console.log(orange 'Hello World')


## *argv*

Obtenha argumentos de linha de comando. Os argumentos de linha de comando do `cscript.exe` declaram argumentos nomeados com `/` , enquanto *wes* declara argumentos nomeados com `-` e `--` . *argv.unnamed* e *argv.named* o tipo de valor do argumento da linha de comando para *String* *Number* *Boolean* . Insira os argumentos da linha de comando com *REP* .

     wes REP aaa -bcd eee --fgh=iii jjj --kln mmm

Execute o script a seguir em *REP* .

     const argv = require('argv') console.log(`argv: %O argv.unnamed: %O argv.named: %O`, argv, argv.unnamed, argv.named)


## *pathname*

Manipular caminhos. Os caminhos que começam com `/` e `\` são geralmente relativos à raiz da unidade. Por exemplo, `/filename` e `C:/filename` podem ser o mesmo caminho. Por motivos de segurança, *wes* interpreta os caminhos que começam com `/` e `\` relativos ao diretório de trabalho.

     const path = require('pathname') const file = path.resolve(__dirname, 'index.js') console.log('file %O', file)


## *filesystem*

Manipular arquivos e diretórios. `readTextFileSync()` adivinha automaticamente a codificação do arquivo e o lê. (Mesmo que o segundo argumento de `readFileSync()` seja `encode` como `auto` , ele será adivinhado automaticamente.)

     const fs = require('filesystem') const path = require('pathname') const readme = path.resolve(__dirname, 'README.md') const contents = fs.readTextFileSync(readme) // const contents = fs.readFileSync(readme, 'auto') console.log(contents)


## *chardet*

Estou usando alguns recursos de <https://github.com/runk/node-chardet> . Você pode aumentar a precisão da adivinhação automática aumentando os caracteres específicos da codificação.


## *JScript*

Se você alterar o mecanismo de script para *Chakra* , não poderá usar *Enumerator* específicos de *JScript* , etc. O módulo embutido *JScript* os disponibiliza. No entanto, *Enumerator* retorna um *Array* , não um *Enumerator object* .

     const { Enumerator, ActiveXObject } = require('JScript') const FSO = new ActiveXObject('Scripting.FileSystemObject') const dir = FSO.getFolder(__dirname).Files const files = new Enumerator(dir) files.forEach(file => console.log(file.Name))

*GetObject* funciona como uma alternativa para `WScript.GetObject` .

     const { GetObject, Enumerator } = require('JScript') const ServiceSet = GetObject("winmgmts:{impersonationLevel=impersonate}").InstancesOf("Win32_Service") new Enumerator(ServiceSet).forEach(service => console.log( 'Name: %O\nDescription: %O\n', service.Name, service.Description ))


## *VBScript*

*VBScript* oferece alguns recursos que o *JScript* não oferece.

     const { TypeName } = require('VBScript') const FSO = require('Scripting.FileSystemObject') console.log(TypeName(FSO))


## *httprequest*

*httprequest* emite uma *http request* .

     const request = require('httprequest') const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1') console.log('%O', JSON.parse(content))


undefined


## *pipe*

*pipe* simplifica a tubulação.

### Uso

     const pipe = require('pipe') function add (a, b) { return ba } function sub (a, b) { return b - a } function div (a, b) { return a / b } const add5 = add.bind(null, 5) const sub3 = sub.bind(null, 3) pipe() .use(add5) .use(sub3) .use(div, 4) .process(10, (err, res) => console.log('res: %O', res))


## *typecheck*

Determine o tipo de script.

### Uso

     const { isString, isNumber, isBoolean, isObject } = require('typecheck') const log = require('log') log(() => isString("ECMAScript")) log(() => isNumber(43.5)) log(() => isBoolean(false)) log(() => isObject(function(){}))


undefined


## *getMember*

Obtenha o tipo de membro e a descrição do *COM Object* do *ProgID* .

### Uso

     const getMember = require('getMember') const FileSystemObject = 'Scripting.FileSystemObject' console.log('require("%S") // => %O', FileSystemObject, getMember(FileSystemObject))


## *zip*

Compacta arquivos e pastas e descompacta arquivos compactados. Internamente, o *PowerShell* é chamado e processado.

### Uso

     const {zip, unzip} = require('zip') console.log(zip('docs\\*', 'dox.zip')) console.log(unzip('dox.zip'))

Um curinga `*` pode ser escrito no `path` de `zip(path, destinationPath)` . Pode ser usado tanto em *CLI (Command Line Interface)* quanto em *module* .

     wes zip docs\* dox.zip wes zip -p dox.zip

Se o `path` tem a extensão `.zip` , `unzip()` é processado e não há descrição da extensão `.zip` . Alternativamente, mesmo se houver uma extensão `.zip` , se houver uma descrição curinga `*` , `zip()` será processado.

| sem nome | Descrição                          |
| -------- | ---------------------------------- |
| `1`      | `path` ou arquivo para inserir     |
| `2`      | arquivo de pasta para saída `dest` |

| nomeado  | nome curto | Descrição                          |
| -------- | ---------- | ---------------------------------- |
| `--path` | `-p`       | `path` ou arquivo para inserir     |
| `--dest` | `-d`       | arquivo de pasta para saída `dest` |


# Agrupamento (embalagem) e instalação de módulos

Em *wes* , um pacote de vários módulos é chamado de pacote. Você pode instalar o pacote para *wes* publicado no *github* . Um *github repository* é necessário para publicar um pacote.


## *bundle*

Ao publicar um pacote no *github* , o *bundle* agrupa os módulos necessários e cria *bundle.json* .

1.  Apenas um pacote pode ser publicado em um *repository*

2.  *package.json* é obrigatório. No mínimo, a descrição do campo `main` é obrigatória.

         { "main": "index.js" }

3.  Torne o repositório *public* se quiser publicar o pacote

4.  A partir da `version 0.12.0` , os pacotes com carregamento direto do módulo em um diretório acima do diretório de trabalho não serão empacotados. Os pacotes no diretório superior *wes\_modules* ou *node\_modules* podem ser agrupados.

Digite o seguinte comando para agrupar: Consulte *package.json* para saber o que agrupar.

     wes bundle


undefined


# Instalando pacotes de repositórios privados

*install* pode instalar não apenas pacotes de repositórios *github* públicos, mas também pacotes de repositórios privados. Em *install* , especifique o pacote com *@author/repository* . A implementação tenta baixar o seguinte URL.

     `https://raw.githubusercontent.com/${author}/${repository}/master/bundle.json`

Se você acessar o repositório privado *raw* com um navegador, o *token* será exibido, então copie o *token* e use-o. Você também pode instalar pacotes de repositórios privados executando-o no console enquanto o *token* é válido.

     wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA


# Introdução do pacote

Aqui estão alguns pacotes externos.


## *@wachaon/fmt*

*@wachaon/fmt* é um pacote *prettier* para o *wes* formatar scripts. Além disso, se ocorrer um *Syntax Error* enquanto *@wachaon/fmt* estiver instalado, você poderá mostrar o local do erro.

### instalar

     wes install @wachaon/fmt

### Uso

Se houver *.prettierrc* (formato JSON) no diretório de trabalho, isso será refletido nas configurações. *fmt* está disponível na *CLI* e no *module* .

#### Use como *CLI* .

     wes @wachaon/fmt src/sample --write

| número sem nome | Descrição                                                 |
| --------------- | --------------------------------------------------------- |
| 1               | Requeridos. o caminho do arquivo que você deseja formatar |

| nomeado   | nome curto | Descrição             |
| --------- | ---------- | --------------------- |
| `--write` | `-w`       | permitir sobrescrever |

Sobrescreva o arquivo com o script formatado se `--write` ou `-w` o argumento nomeado for especificado.

#### usar como módulo

     const fmt = require('@wachaon/fmt') const { readTextFileSync, writeTextFileSync } = require('filesystem') const { join, workingDirectory } = require('pathname') const target = join(workingDirectory, 'index.js') console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
