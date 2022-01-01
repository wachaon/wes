# *WES*


*wes* - это фреймворк для выполнения *ECMAScript* на *Windows Script Host*


Исходный текст *README* - [*japanese*](/README.md) . За исключением японского, это предложение машинного перевода.  
Пожалуйста, выберите предложения на других языках из следующих.


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



# Функции


-   Измените механизм сценариев *Windows Script Host* на *Chakra* и запустите *ECMAScript2015* *Chakra*
-   Он всегда запускает 32- *cscript.exe* , поэтому в 64-битной среде нет присущих ему ошибок.
-   Импортируйте модуль с `require` (соответствует *es module* из *ver 0.9.0* )
-   Выводит цветные символы на стандартный вывод
-   Автоматически угадывать и читать кодировку текстового файла


# Известные проблемы, которые мы не можем решить


-   `WScript.Quit` не может прервать выполнение программы и не возвращает код ошибки
-   Асинхронная обработка, такая как `setTimeout` и `Promise` невозможна
-   *event prefix* второго аргумента `WScript.CreateObject` использовать нельзя.


# Установить


*wes* потребность *wes.js* только файл. Для загрузки запустите командную строку и введите следующую команду.


```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```


*wes* во время выполнения, поскольку реализация *WScript.Shell* использует `SendKeys` . *wes.js* путь к каталогу, в котором *wes.js* содержит символы, отличные от *ascii* , `SendKeys` не сможет правильно отправить ключ и скрипт не сможет быть выполнен.  
*wes.js* путь для сохранения *wes.js* только в *wes.js* *ascii* .


## использование


В командной строке укажите файл, который будет отправной точкой программы после `wes` . Расширение скрипта *.js* можно не указывать.


```shell
wes index
```


Кроме того, в *wes* есть *REPL* поэтому, если вы запустите его только с помощью `wes` , вы можете напрямую ввести скрипт.


```shell
wes
```


Скрипты будут приниматься, пока вы не введете две пустые строки. *README.md* также можете проверить выполнение примера сценария в *README.md* с помощью *REPL* .


## именованные аргументы командной строки


Варианты запуска *wes* следующие.


| названный          | описание                                         |
| ------------------ | ------------------------------------------------ |
| `--monotone`       | Устранение *ANSI escape code*                    |
| `--safe`           | Запустить скрипт в безопасном режиме             |
| `--usual`          | Запустить скрипт в обычном режиме (по умолчанию) |
| `--unsafe`         | Запустить скрипт в небезопасном режиме           |
| `--dangerous`      | Запустить скрипт в опасном режиме                |
| `--debug`          | Запустить скрипт в режиме отладки                |
| `--encoding=UTF-8` | Задает кодировку первого файла для чтения        |
| `--engine=Chakra`  | Эта опция автоматически добавляется *wes*        |


Реализация `--safe` `--usual` `--unsafe` `--dangerous` `--debug` не завершена, но именованные аргументы зарезервированы.


# встроенные объекты


*wes* есть *built-in objects* , которых нет в *WSH (JScript)* .


## *require*


Импортируйте модуль с помощью *require* . *wes* автоматически угадывает кодировку файла модуля, но если вы не угадали правильно, вы можете указать кодировку с помощью второго аргумента.


Кроме того, `require('WScript.Shell')` как в *OLE* даже *require* импорт возможен с.


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


## `module` и `module.exports`


Если вы хотите определить его как модуль, назначьте его для `module.exports` .


```javascript
function add (a, b) {
    return a + b
}

module.exports = add
```


## *console*


*wes* В `WScript.Echo` и `WScript.StdErr.WriteLine` вместо *console* использовать.


Печатайте символы в командной строке в `console.log` . Он также поддерживает форматированные строки. Печатает отформатированную строку с помощью оператора форматирования `%` .


```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```


*wes* для того , чтобы вывести строку в цветной `WScript.StdOut.WriteLine` вместо того, чтобы , `WScript.StdErr.WriteLine` использование. `WScript.Echo` и `WScript.StdOut.WriteLine` заблокированы для вывода, поэтому используйте `WScript.StdErr.WriteLine` или `console.log` .


## *Buffer*


Может обрабатывать буферы.


```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```


## `__dirname` и `__filename`


`__filename` содержит путь к `__filename` запущенному файлу модуля. `__dirname` `__filename` каталог `__filename` .


```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```


# встроенные модули


*wes* есть *built-in modules* для упрощения и стандартизации базовой обработки.


## *ansi*


`ansi` есть *ANSI escape code* который позволяет изменять цвет и эффект стандартного вывода. Цвета и эффекты могут различаться в зависимости от типа и настроек используемого консольного приложения.


```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```


Вы также можете создавать свои собственные цвета с помощью `ansi.color()` и `ansi.bgColor()` . В аргументе используется *RGB* например `255, 165, 0` или *color code* например `'#FFA500'` . Он не поддерживает *color name* такие как `orange` .


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


Запустите следующий сценарий в *REPL* .


```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```


## *pathname*


Управляйте тропой.


Как правило, пути, начинающиеся с `/` и `\` относятся к относительным путям от корня диска (например, `/filename` может быть тем же путем, что и `C:/filename` ), но для безопасности в `wes` `/` и пути, начинающиеся с `\` , интерпретируются как относительные к рабочий каталог.


```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```


## *filesystem*


Управляйте файлами и каталогами. `readTextFileSync` автоматически угадывает и считывает кодировку файла.


```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```


## *chardet*


Я использую некоторые функции <https://github.com/runk/node-chardet> .


Вы можете повысить точность автоматического угадывания, увеличив количество символов, специфичных для кодировки.


## *JScript*


Если вы измените движок сценария на *Chakra* , вы не сможете использовать специфичный для *JScript* *Enumerator* и т. Д. Встроенный модуль *JScript* делает их доступными. Однако *Enumerator* возвращает *Array* вместо объекта Enumerator.


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


*httprequest* , как его имя, *http request* выдаст *httprequest* .


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


*pipe* упрощает обработку трубы


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


# Комплектация и установка модуля


*install* вы можете установить модуль для *wes* опубликованных на *github* . Для публикации модуля вам понадобится *github repository* . Кроме того, имя репозитория и имя локального каталога должны совпадать.


## *bundle*


*github* публикации модуля на *github* , *bundle* объединяет требуемый модуль и изменяет его на формат, который может быть импортирован *install* модулем.


По соображениям безопасности *wes* не импортирует модули в формате, который можно *.json* напрямую, поэтому создайте файл *.json* с модулем *bundle* .


Есть некоторые условия для комплектации модулей.


1.  *repository* одном *repository* может быть опубликован *repository* один тип модуля.
2.  Имя репозитория на *github* и имя локального рабочего каталога должны совпадать.
3.  Репозиторий должен быть общедоступным, если вы хотите опубликовать модуль для третьей стороны.
4.  *wes* динамически интерпретирует путь к модулю. Модули, приобретенные с помощью `require` при определенных условиях, например, `if` операторы не могут быть объединены.
5.  *.json* каталоге будет создан файл *.json* с именем *directory_name.json* . Его нельзя установить, если файл был переименован или перемещен.
6.  `node_modules/directory_name` , расслоение терпит неудачу , потому что он относится к `directory_name.json` .


## *install*


Используется для установки файла модуля для *wes* опубликованного на *github* .


### использование


Передайте аргументы для *install* в формате `@author/repository`


```shell
wes install @wachaon/fmt
```


*install* имеет параметры


| названный  | короткое имя | описание                                          |
| ---------- | ------------ | ------------------------------------------------- |
| `--bare`   | `-b`         | Не создавайте папку *@author*                     |
| `--global` | `-g`         | Установите модуль в папку, где находится *wes.js* |


`--bare` может опускать аргумент `require` из `author@repository` в `repository` . `--global` делает установленные модули доступными для всех скриптов. Указанные параметры должны быть указаны в то же время , как *wes* варианта безопасности `--unsafe` или `--dangerous` .


```shell
wes install @wachaon/fmt --bare --unsafe
```


# Установите модуль частного репозитория


*install* можно устанавливать не только в модули в публичных репозиториях на *github* , но и в приватные репозитории.


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


*@wachaon/fmt* *prettier* и форматирует скрипт. Кроме того, если установлен *@wachaon/fmt* и возникает `SyntaxError` ошибка, можно указать место ошибки.


### установить


```shell
wes install @wachaon/fmt
```


### использование


Если в рабочем каталоге есть *.prettierrc* (формат JSON), это будет отражено в настройке. *fmt* можно использовать как с *CLI* (интерфейс командной строки), так и с *module* в *fmt* .


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


Замените файл отформатированным сценарием, если вы укажете именованный аргумент `--write` или `-w` .


### При использовании в качестве *module*


### `option`


```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')

const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```
