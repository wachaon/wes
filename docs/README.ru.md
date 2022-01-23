# *WES*


*wes* — это фреймворк для выполнения *ECMAScript* в командной строке *Windows Script Host* .


Оригинальный текст *README* — [*japanese*](/README.md) . За исключением японского, это предложение с машинным переводом.  
Пожалуйста, выберите предложения на других языках из следующих.


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



# Функции


-   Измените обработчик сценариев *Windows Script Host* на *Chakra* и запустите *ECMAScript2015* *Chakra*
-   Он всегда запускает 32- *cscript.exe* , поэтому в 64-битной среде нет ошибок.
-   Импортируйте модуль с помощью `require` (соответствует *es module* из *ver 0.9.0* )
-   Выводит цветные символы на стандартный вывод
-   Автоматически угадывать и читать кодировку текстового файла


# Известные проблемы, которые мы не можем решить


-   `WScript.Quit` не может прервать программу и не возвращает код ошибки
-   Асинхронная обработка, такая как `setTimeout` и `Promise` невозможна.
-   Нельзя использовать *event prefix* второго аргумента `WScript.CreateObject`


# Установить


*wes* потребность *wes.js* только файл. Для загрузки запустите командную строку и введите следующую команду.


```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```


*wes* во время выполнения в качестве реализации *WScript.Shell* для использования `SendKeys` . *wes.js* путь к каталогу, в котором сохранен *wes.js* содержит символы, отличные от *ascii* , `SendKeys` не сможет правильно отправить ключ и скрипт не сможет быть выполнен.  
*wes.js* путь сохранения *wes.js* только в *wes.js* *ascii* .


## использование


В командной строке укажите файл, который будет начальной точкой программы после `wes` . Расширение скрипта *.js* можно не указывать.


```shell
wes index
```


Кроме того, у *wes* есть *REPL* , поэтому, если вы запустите его только с помощью `wes` , вы сможете войти в скрипт напрямую.


```shell
wes
```


Скрипты будут приниматься до тех пор, пока вы не введете две пустые строки. Вы также можете проверить выполнение примера скрипта в *README.md* с помощью *REPL* .


## именованные аргументы командной строки


Варианты запуска для *wes* следующие.


| по имени           | описание                                         |
| ------------------ | ------------------------------------------------ |
| `--monotone`       | Удалите *ANSI escape code*                       |
| `--safe`           | Запустите скрипт в безопасном режиме             |
| `--usual`          | Запустить скрипт в обычном режиме (по умолчанию) |
| `--unsafe`         | Запустите скрипт в небезопасном режиме           |
| `--dangerous`      | Запустить скрипт в опасном режиме                |
| `--debug`          | Запустите скрипт в режиме отладки                |
| `--encoding=UTF-8` | Указывает кодировку первого файла для чтения     |
| `--engine=Chakra`  | Эта опция автоматически добавляется *wes*        |


Реализация `--safe` `--usual` `--unsafe` `--dangerous` `--debug` неполна, но именованные аргументы зарезервированы.


# модульная система


*wes* поддерживает *commonjs module* системы , которые используют общий `require()` и *es module* систем , которые используют `import` . ( *dynamic import* не поддерживается, так как это асинхронная обработка)


## *commonjs module*


`module.exports` модулями, назначая `module.exports` и вызывая с помощью `require()` . Для удобства он также поддерживает каталог *node_modules* .


*wes* `require()` автоматически угадывает кодировку файла модуля, но если она не угадывается правильно, вы можете указать кодировку вторым аргументом.


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


Вы также можете импортировать в *OLE* например, `require('WScript.Shell')` с помощью *require* .


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


*Chakra* который является механизмом выполнения скрипта, интерпретирует такой синтаксис, как `imoprt` , но он не может быть выполнен как есть, потому что метод обработки как `cscript` не определен. *wes* В *babel* ограждении. Он выполняется при последовательной *es module* в *es module* . В результате накладные расходы на обработку и раздувание файлов увеличиваются как затраты.


Модули, описываемые *es module* , также `require()` в `require()` , поэтому можно вызывать *OLE* . Однако он не поддерживает спецификацию кодировки файла модуля. Все читаются автоматическим угадыванием.


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


# встроенные объекты


У *wes* есть *built-in objects* , которых нет в *WSH (JScript)* .


## *console*


*wes* использует *console* вместо `WScript.Echo` или `WScript.StdErr.WriteLine` .


Вывести символы в командную строку в `console.log` . Он также поддерживает форматированные строки. Выводит отформатированную строку с использованием оператора форматирования `%` .


```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```


`WScript.StdOut.WriteLine` *wes* `WScript.StdErr.WriteLine` для вывода цветных строк. `WScript.Echo` и `WScript.StdOut.WriteLine` заблокирован, поэтому используйте `WScript.StdErr.WriteLine` или `console.log` .


## *Buffer*


Может обрабатывать буферы.


```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```


## `__dirname` и `__filename`


`__filename` содержит путь к `__filename` файлу модуля. `__dirname` `__filename` каталог `__filename` .


```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```


# встроенные модули


*wes* есть *built-in modules* для упрощения и стандартизации базовой обработки.


## *ansi*


`ansi` есть *ANSI escape code* который позволяет вам изменять цвет и эффект стандартного вывода. Цвета и эффекты могут различаться в зависимости от типа и настроек используемого консольного приложения.


```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```


Вы также можете создавать свои собственные цвета с помощью `ansi.color()` и `ansi.bgColor()` . Аргумент использует *RGB* например `255, 165, 0` или *color code* например `'#FFA500'` . Он не поддерживает *color name* такие как `orange` .


```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```


## *argv*


Получает аргумент командной строки. `cscript.exe` аргументы командной строки `/` объявляет именованные аргументы в но, *wes* в `-` и `--` объявить именованные аргументы.


*argv.unnamed* и *argv.named* отливать тип значения аргумента командной строки к одному из *String* *Number* *Boolean* .


Введите аргументы командной строки вместе с *REPL* .


```shell
wes REPL aaa -bcd eee --fgh=iii jjj --kln mmm
```


Запустите следующий скрипт в *REPL* .


```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```


## *pathname*


Управляйте путем.


Как правило, пути, начинающиеся с `/` и `\` , относятся к относительным путям от корня диска (например, `/filename` может быть тем же путем, что и `C:/filename` ), но для безопасности в `wes` `/` и пути, начинающиеся с `\` , интерпретируются как относительные рабочий каталог.


```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```


## *filesystem*


Работа с файлами и каталогами. `readTextFileSync` автоматически угадывает и считывает кодировку файла.


```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```


## *chardet*


Я использую некоторые функции <https://github.com/runk/node-chardet> .


Вы можете повысить точность автоматического угадывания, увеличив количество символов, характерных для кодировки.


## *JScript*


Если вы измените скриптовый движок на *Chakra* , вы не сможете использовать специфичный для *JScript* *Enumerator* и т. д. Встроенный модуль *JScript* делает их доступными. Однако *Enumerator* возвращает *Array* вместо объекта Enumerator.


```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```


*GetObject* `WScript.GetObject` как альтернатива `WScript.GetObject` .


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


*VBScript* предоставляет некоторые функции, которых нет в *JScript* .


```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```


## *httprequest*


*httprequest* — это имя, которое *http request* будет выдавать a.


```javascript
const request = require('httprequest')
const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log('%O', JSON.parse(content))
```


## *minitest*


*minitest* может писать простые тесты.


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


*pipe* упрощает обработку труб


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


Определите тип сценария.


```javascript
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```


# Комплектация модуля и установка


*install* вы можете установить модуль для *wes* опубликованный на *github* . Вам понадобится *github repository* для публикации модуля. Кроме того, имя репозитория и имя локального каталога должны совпадать.


## *bundle*


*github* публикации модуля на *github* *bundle* связывает требуемый модуль и изменяет его формат на формат, который может быть импортирован модулем *install* .


Из соображений безопасности *wes* не импортирует модули в формате, который может выполняться напрямую, поэтому создайте файл *.json* с модулем *bundle* .


Есть некоторые условия для комплектации модулей.


1.  *repository* одном *repository* может быть опубликован *repository* один тип модуля.
2.  Имя репозитория на *github* и имя локального рабочего каталога должны совпадать.
3.  Репозиторий должен быть общедоступным, если вы хотите опубликовать модуль третьей стороне.
4.  *wes* динамически интерпретирует путь к модулю. Модули, полученные с помощью `require` при определенных условиях, таких как операторы `if` не могут быть объединены.
5.  *.json* будет создан файл в рабочем каталоге с именем *directory_name.json* . Его нельзя установить, если файл переименован или перемещен.
6.  `node_modules/directory_name` , расслоение терпит неудачу , потому что он относится к `directory_name.json` .


## *install*


Используется для установки файла модуля для *wes* , опубликованного на *github* .


### использование


Передать аргументы для *install* в формате `@author/repository`


```shell
wes install @wachaon/fmt
```


*install* имеет опции


| названный  | короткое имя | описание                                          |
| ---------- | ------------ | ------------------------------------------------- |
| `--bare`   | `-b`         | Не создавайте папку *@author*                     |
| `--global` | `-g`         | Установите модуль в папку, где находится *wes.js* |


`--bare` может опустить аргумент `require` из `author@repository` в `repository` . `--global` делает установленные модули доступными для всех скриптов. Вышеупомянутые параметры должны быть указаны одновременно с параметром безопасности *wes* `--unsafe` или `--dangerous` .


```shell
wes install @wachaon/fmt --bare --unsafe
```


# Установить модуль приватного репозитория


*install* можно устанавливать не только в модули в публичных репозиториях на *github* , но и в приватных репозиториях.


*install* укажите модуль с `author@repository` . Реализация загружает следующее.


```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```


Когда вы получаете доступ к *raw* частному репозиторию с помощью браузера, *token* будет отображаться, поэтому скопируйте *token* и используйте его.


Вы также можете установить модуль в частном репозитории, запустив его в командной строке в течение *token* действия *token* .


```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```


# Внешний модуль


Вот несколько внешних модулей.


## *@wachaon/fmt*


*@wachaon/fmt* связывает *prettier* и форматирует скрипт. Также, если *@wachaon/fmt* установлен и возникает `SyntaxError` Error, может быть указано место ошибки.


### установить


```shell
wes install @wachaon/fmt
```


### использование


Если в рабочем каталоге есть *.prettierrc* (формат JSON), это будет отражено в настройке. *fmt* можно использовать как с *CLI* (интерфейсом командной строки), так и с *module* в *fmt* .


Использовать как *CLI*


```shell
wes @wachaon/fmt src/sample --write
```


| безымянный номер | описание                                                     |
| ---------------- | ------------------------------------------------------------ |
| 0                | ――――                                                         |
| 1                | Необходимые. Путь к файлу, который вы хотите отформатировать |


| названный | короткое имя | описание             |
| --------- | ------------ | -------------------- |
| `--write` | `-w`         | Разрешить перезапись |


Перезапишите файл отформатированным сценарием, если вы укажете именованный аргумент `--write` или `-w` .


### При использовании в качестве *module*


### `option`


```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')

const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```


## `@wachaon/edge`


*Internet Explorer* будет доступен для поддержки с 15 июня 2022 г. В результате работа приложения с `require('InternetExplorer.Application')` становится невозможной.


Альтернативой может быть управление *Microsoft Edge based on Chromium* через *web driver* , но `@wachaon/edge` упрощает автопилот *Edge* .


### установить


Сначала установите модуль.


```shell
wes install @wachaon/edge --unsafe --bare
```


Затем загрузите *web driver* .


```shell
wes edge
```


Разархивируйте загруженный *zip* и переместите *msedgedriver.exe* в текущий каталог.


### использование


Это будет легко использовать.


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


Этот сценарий последовательно выводит посещенные *URL* в командную строку.


`@wachaon/edge` регистрирует событие для *URL* и добавляет данные в `res.exports` . *URL* регистрации может быть либо `String` `RegExp` , и могут быть сделаны гибкие настройки.


Сделав его управляемым событиями, можно легко переключиться на ручное управление, не устанавливая *URL* для процессов, которые трудно обрабатывать с помощью автопилота.


Если вы хотите остановить скрипт, `navi.emit('terminate', res)` или завершите работу *Edge* вручную.


Процесс завершения выводит `res.exports` в виде файла *.json* в качестве значения по умолчанию. Если вы хотите установить процесс завершения, установите `terminate` `edge(callback, terminate)` .
