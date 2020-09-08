# *WES*

*wes* - это среда для выполнения *ECMAScript* на *Windows Script Host*

*README* оригинал [*japanese*](README.ja.md) будет. Текст, кроме японского, будет переведен автоматически.  
Пожалуйста, выберите из следующих текстов на других языках.

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

## Характеристики

-   Измените движок сценария на *Chakra* и выполните *ECMAScript2015* *Chakra*
-   *cscript.exe* 32- *cscript.exe* и не вызывает ошибок, характерных для 64-битной среды.
-   импортировать модуль с помощью `require`
-   Выводит цветные символы на стандартный вывод
-   Угадай кодировку файла автоматически

## Функции не решены

-   `WScript.Quit` не может прервать программу и не возвращает код ошибки
-   Асинхронная обработка
-   `WScript.CreateObject` *event prefix* второго аргумента `WScript.CreateObject`

## устанавливать

*wes* потребность *wes.js* только файл. Для загрузки запустите командную строку и введите следующую команду.

```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

*wes* использует *WScript.Shell* «S `SendKeys` во время выполнения. *wes.js* путь к каталогу, в котором *wes.js* содержит символы, отличные от *ascii* , `SendKeys` не может правильно отправить ключ и сценарий не может быть выполнен.  
*wes.js* *ascii* только для пути сохранения *wes.js*

## использование

В командной строке укажите файл, который является отправной точкой программы после `wes` . Расширение скрипта *.js* можно не указывать.

```shell
wes index
```

Кроме того, в *wes* есть *REPL* поэтому, если вы запустите его только с `wes` , вы можете напрямую ввести скрипт.

```shell
wes
```

Ввод скрипта разрешается, пока вы не введете две пустые строки. *README.md* также можете проверить выполнение примера сценария в *README.md* с помощью *REPL* .

## именованные аргументы командной строки

Варианты старта *wes* следующие.

| названный          | описание                                           |
| ------------------ | -------------------------------------------------- |
| `--monotone`       | Устранение *ANSI escape code*                      |
| `--safe`           | Запустить скрипт в безопасном режиме               |
| `--usual`          | Запустить скрипт в обычном режиме (по умолчанию)   |
| `--unsafe`         | Запустить скрипт в небезопасном режиме             |
| `--dangerous`      | Запустить скрипт в опасном режиме                  |
| `--debug`          | Запустить скрипт в режиме отладки                  |
| `--encoding=UTF-8` | Задает кодировку файла для чтения в первую очередь |
| `--engine=Chakra`  | Эта опция автоматически добавляется *wes*          |

Реализация `--safe` `--usual` `--unsafe` `--dangerous` не завершена, но именованные аргументы зарезервированы.

## встроенные объекты

*wes* имеет *built-in objects* , которых нет в *WSH (JScript)* .

### *require*

Импортируйте модуль с помощью *require* . *wes* автоматически угадывает кодировку файла модуля, но если вы не угадали ее правильно, вы можете указать кодировку вторым аргументом.

Вы также можете импортировать с помощью *require* для *OLE* например `require('WScript.Shell')` .

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

### модуль и module.exports

Если вы хотите определить его как модуль, замените его в `module.exports` .

```javascript
function add (a, b) {
    return a + b
}

module.exports = add
```

### *console*

*wes* В `WScript.Echo` и `WScript.StdErr.WriteLine` вместо *console* использовать.

Выведите символы в командную строку с помощью `console.log` . Он также поддерживает форматированные строки. Выведите строку формата с помощью оператора формата `%` .

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

*wes* для того , чтобы вывести строку в цветной `WScript.StdOut.WriteLine` вместо того, чтобы , `WScript.StdErr.WriteLine` использование. `WScript.Echo` вывод `WScript.Echo` и `WScript.StdOut.WriteLine` заблокирован, используйте `WScript.StdOut.WriteLine` или `console.log` .

### *Buffer*

Может обрабатывать буферы.

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```

### `__dirname` и `__filename`

`__filename` хранит путь к `__filename` файлу модуля. `__dirname` хранит каталог `__filename` .

```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```

## встроенные модули

*wes* есть *built-in modules* для упрощения и стандартизации базовой обработки.

### *ansi*

`ansi` есть *ANSI escape code* который позволяет изменять цвета и эффекты стандартного вывода. Цвета и эффекты могут различаться в зависимости от типа и настроек используемого консольного приложения.

```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```

Вы также можете создать свой собственный цвет с помощью `ansi.color()` или `ansi.bgColor()` . В аргументах используется *RGB* например `255, 165, 0` или *color code* например `'#FFA500'` . Вы не можете использовать *color name* такие как `orange` .

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

### *argv*

Получает аргументы командной строки. `cscript.exe` аргументы командной строки `/` объявляет именованные аргументы в, но, *wes* в `-` и `--` объявляет именованные аргументы в.

*argv.unnamed* и *argv.named* *argv.unnamed* *argv.named* тип значения аргумента командной строки к одному из *Boolean* значений *String* *Number* .

Введите аргументы командной строки с помощью *REPL* .

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

### *pathname*

Управляйте путем.

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

### *filesystem*

Управляет файлами и каталогами. `readTextFileSync` автоматически угадывает кодировку файла и читает ее.

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```

### *JScript*

Если вы меняете двигатель сценария к *Chakra* , вы не сможете использовать *JScript* конкретные *Enumerator* . Встроенный модуль *JScript* делает их доступными. Однако *Enumerator* возвращает *Array* а не объект Enumerator.

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

### *VBScript*

*VBScript* предлагает некоторые функции, которых нет в *JScript* .

```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```

### *httprequest*

*httprequest* , как его имя, *http request* выдаст *httprequest* .

```javascript
const request = require('httprequest')
const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log('%O', JSON.parse(content))
```

### *minitest*

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

### *pipe*

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

### *typecheck*

Судите по типу сценария.

```javascript
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```

## Комплектация и установка модуля

*install* вы можете установить модуль для *wes* опубликованных на *github* . Для публикации модуля вам понадобится *github repository* на *github repository* . Кроме того, имя репозитория и имя локального каталога должны совпадать.

### *bundle*

*github* публикации модуля на *github* , *bundle* объединяет необходимые модули и изменяет их в формат, который может быть включен *install* модулем.

В целях безопасности *wes* не импортирует модуль, который может быть выполнен напрямую, поэтому создайте файл *.json* в модуле *bundle* .

Есть некоторые условия для комплектации модулей.

1.  *repository* одном *repository* может быть опубликован *repository* один тип модуля.
2.  *github* репозитория *github* и имя локального рабочего каталога должны совпадать.
3.  Репозиторий должен быть общедоступным, если вы хотите опубликовать модуль для третьей стороны.
4.  *wes* не интерпретирует сценарий статически. Модули, которые `require` при определенных условиях, например, `if` операторы, могут не объединяться.
5.  *.json* будет создан файл в рабочем каталоге с именем *directory_name.json* . Если вы измените имя файла или переместите файл, вы не сможете его установить.
6.  `node_modules/directory_name` , отправка одной посылкой не удается , потому что он ссылается `directory_name.json` .

### *install*

Он используется для установки файла модуля для *wes* опубликованного на *github* .

## использование

Передайте аргументы для *install* в формате `@author/repository`

```shell
wes install @wachaon/fmt
```

*install* имеет параметры

| названный  | короткое имя | описание                                          |
| ---------- | ------------ | ------------------------------------------------- |
| `--bare`   | `-b`         | не создавайте папку *@author*                     |
| `--global` | `-g`         | Установите модуль в папку, где находится *wes.js* |

`--bare` может опустить аргумент `require` от `author@repository` к `repository` . `--global` делает установленный модуль доступным для всех скриптов. Вышеуказанные параметры должны быть использованы с *wes* опции безопасности `--unsafe` или `--dangerous` .

```shell
wes install @wachaon/fmt --bare --unsafe
```

# Установить модуль частного репозитория

*install* может быть установлен не только в модуле публичного репозитория *github* но и в частном репозитории.

*install* укажите модуль с `author@repository` . Следующее загружено в реализацию.

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```

Когда вы получаете доступ к *raw* частному репозиторию с помощью браузера, *token* отображается, поэтому скопируйте *token* и используйте его.

Если вы выполните его в командной строке в течение допустимого времени *token* , вы можете установить модуль частного репозитория.

```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

## Внешний модуль

Здесь мы представляем некоторые внешние модули.

### *@wachaon/fmt*

*@wachaon/fmt* - это пакет *prettier* который форматирует скрипт. Кроме того, если `SyntaxError` время установки *@wachaon/fmt* возникает *@wachaon/fmt* местоположение ошибки.

#### устанавливать

```shell
wes install @wachaon/fmt
```

#### использование

Если в рабочем каталоге есть *.prettierrc* (формат JSON), *.prettierrc* его в настройке. *fmt* можно использовать как с *CLI* (интерфейс командной строки), так и с *module* .

Использовать как *CLI*

```shell
wes @wachaon/fmt src/sample --write
```

| безымянный номер | описание                                                     |
| ---------------- | ------------------------------------------------------------ |
| 0                | -                                                            |
| 1                | Необходимые. Путь к файлу, который вы хотите отформатировать |

| названный | короткое имя | описание             |
| --------- | ------------ | -------------------- |
| `--write` | `-w`         | Разрешить перезапись |

Заменяет файл отформатированным сценарием, если задан именованный аргумент `--write` или `-w` .

#### *module* использовании в качестве *module*

#### `option`

```javascript
{
    parser: 'babel',
    plugins: [babel]
}
```
