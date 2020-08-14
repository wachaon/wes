# WES

*wes* - это среда для выполнения *ECMAScript* на *Windows Script Host*

*README* оригинал [*japanese*](README.ja.md) будет. Кроме японского, это будет машинный перевод. Пожалуйста, выберите предложение на другом языке из следующих.

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

-   Измените механизм сценария на *Chakra* и включите выполнение *ECMAScript2015* *Chakra*
-   *cscript.exe* 32-битный *cscript.exe* , поэтому избегает специфических ошибок в 64-битной среде
-   Вы можете импортировать модуль с помощью `require`
-   Цветные символы можно выводить на стандартный вывод
-   Угадай кодировку файла автоматически

## Функции не решены

-   `WScript.Quit` не может прервать программу и не возвращает код ошибки
-   Асинхронная обработка
-   Использование *event prefix* второго аргумента `WScript.CreateObject`

## устанавливать

*wes* потребность *wes.js* только файл. Для загрузки запустите командную строку и введите следующую команду.

```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

*wes* во время выполнения, поскольку реализация *WScript.Shell* использует `SendKeys` . *wes.js* путь к каталогу, в котором *wes.js* содержит символы, отличные от *ascii* , `SendKeys` не отправит его правильно и скрипт не запустится. В этом случае настройте путь для сохранения *wes.js* только с *ascii* .

## использование

В командной строке укажите файл, который является отправной точкой программы после `wes` . Расширение скрипта *.js* можно не указывать.

```shell
wes index
```

Кроме того, поскольку в *wes* есть *REPL* , вы можете выполнить сценарий, введенный непосредственно в командной строке, запустив его только с помощью команды `wes` .

```shell
wes
```

Ввод скрипта разрешается, пока вы не введете две пустые строки. *README.md* также можете проверить выполнение примера сценария в *README.md* с помощью *REPL* .

## именованные аргументы командной строки

*wes* качестве параметров запуска *wes* принимаются следующие именованные аргументы.

| названный          | описание                                             |
| ------------------ | ---------------------------------------------------- |
| `--monotone`       | Устранение *ANSI escape code*                        |
| `--safe`           | Запустить скрипт в безопасном режиме                 |
| `--usual`          | Запустить скрипт в обычном режиме (по умолчанию)     |
| `--unsafe`         | Запустить скрипт в небезопасном режиме               |
| `--dangerous`      | Запустить скрипт в опасном режиме                    |
| `--debug`          | Запустить скрипт в режиме отладки                    |
| `--encoding=UTF-8` | Укажите кодировку файла для чтения в первую очередь. |
| `--engine=Chakra`  | Эта опция автоматически добавляется *wes*            |

Реализация `--safe` `--usual` `--unsafe` `--dangerous` не завершена, но именованные аргументы зарезервированы.

## встроенные объекты

*wes* имеет *built-in objects* , которых нет в *JScript* .

### требовать

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

### приставка

*wes* В `WScript.Echo` и `WScript.StdErr.WriteLine` вместо *console* использовать.

Вы можете выводить символы в командную строку с помощью `console.log` . Он также поддерживает форматированные строки. Вы можете использовать оператор формата `%` чтобы указать строку формата.

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

*wes* для того , чтобы вывести строку в цветной `WScript.StdOut.WriteLine` вместо того, чтобы , `WScript.StdErr.WriteLine` использование. `WScript.Echo` вывод `WScript.Echo` и `WScript.StdOut.WriteLine` заблокирован, используйте `WScript.StdOut.WriteLine` или `console.log` .

### буфер

Может обрабатывать буферы.

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```

### **dirname и** filename

`__filename` хранит путь к `__filename` файлу модуля. `__dirname` хранит каталог `__filename` .

```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```

## встроенные модули

*wes* есть *built-in modules* для упрощения и стандартизации базовой обработки.

### ANSI

`ansi` содержит *ANSI escape code* , и вы можете изменить цвет и эффект стандартного вывода. Цвета и эффекты могут различаться в зависимости от типа и настроек используемого консольного приложения.

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

### ARGV

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

### путь к файлу

Управляйте тропой.

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

### файловая система

Управляет файлами и каталогами. `readTextFileSync` угадает кодировку файла и прочитает ее.

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```

### JScript

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

### VBScript

*VBScript* предлагает некоторые функции, которых нет в *JScript* .

```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```

### HttpRequest

*httprequest* , как его имя, *http request* выдаст *httprequest* .

```javascript
const request = require('httprequest')
const content = request('GET', 'http://weather.livedoor.com/forecast/webservice/json/v1?city=130010')
console.log('%O', JSON.parse(content))
```

### MiniTest

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

### труба

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

### typecheck

Судите по типу сценария.

```javascript
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```

## Комплектация и установка модуля

*install* вы можете установить модуль для *wes* опубликованных на *github* . Для публикации модуля вам понадобится *github repository* на *github repository* . Кроме того, имя репозитория и имя локального каталога должны совпадать.

### расслоение

*github* публикации модуля на *github* , *bundle* объединяет необходимые модули и изменяет их в формат, который может быть включен *install* модулем.

В целях безопасности *wes* не импортирует модуль, который может быть выполнен напрямую, поэтому создайте файл *.json* в модуле *bundle* .

Есть некоторые условия для комплектации модулей.

1.  *repository* одном *repository* может быть опубликован *repository* один тип модуля.
2.  *github* репозитория *github* и имя локального рабочего каталога должны совпадать.
3.  Репозиторий должен быть общедоступным, если вы хотите опубликовать модуль для третьей стороны.
4.  *wes* не интерпретирует сценарий статически, поэтому модули, которые `require` только при определенных условиях, например, `if` операторы, могут не быть объединены.
5.  *.json* каталоге *.json* файл *.json* с именем *directory_name.json* . Если вы измените имя файла или переместите файл, вы не сможете его установить.
6.  `node_modules/directory_name` , отправка одной посылкой не удается , потому что он ссылается `directory_name.json` .

### устанавливать

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

`--bare` может опускать аргумент `require` из `author@repository` в `repository` . `--global` делает установленный модуль доступным для всех скриптов. Вышеуказанные параметры должны быть использованы с *wes* опции безопасности `--unsafe` или `--dangerous` .

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

Вы также можете установить модули в своем частном репозитории, если запустите его в командной строке, пока *token* действителен.

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

#### `format`

| имя аргумента | тип      | описание                             |
| ------------- | -------- | ------------------------------------ |
| `source`      | `string` | Строка для форматирования            |
| `option?`     | `object` | Варианты перехода к более *prettier* |

```javascript
const { format } = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { resolve } = require('pathname')

const spec = resolve(process.cwd(), 'sample.js')
let source = readTextFileSync(spec)
source = format(source)
console.log(writeTextFileSync(spec, source))
```
