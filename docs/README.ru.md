# _WES_

_wes_ - это фреймворк для выполнения _ECMAScript_ на _Windows Script Host_

Оригинальный текст _README_ - [_japanese_](README.ja.md) . Помимо японского, это предложение машинного перевода.  
Пожалуйста, выберите предложения на других языках из следующих.

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

-   Измените движок скрипта на _Chakra_ и запустите _ECMAScript2015_ _Chakra_
-   _cscript.exe_ 32- _cscript.exe_ и не имеет ошибок, характерных для 64-битной среды.
-   Импортируйте модуль с помощью `require`
-   Выводит цветные символы на стандартный вывод
-   Автоматически угадывать кодировку файла

## Функции не решены

-   `WScript.Quit` не может прервать программу и не возвращает код ошибки
-   Асинхронная обработка
-   Использование _event prefix_ второго аргумента `WScript.CreateObject`

## Установить

_wes_ потребность _wes.js_ только файл. Для загрузки запустите командную строку и введите следующую команду.

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

_wes_ во время выполнения, поскольку реализация _WScript.Shell_ использует `SendKeys` . _wes.js_ путь к каталогу, в котором _wes.js_ содержит символы, отличные от _ascii_ , `SendKeys` не сможет правильно отправить ключ и скрипт не сможет быть выполнен.  
_wes.js_ путь для _wes.js_ только в _wes.js_ _ascii_ .

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

В командной строке укажите файл, который будет отправной точкой программы после `wes` . Расширение скрипта _.js_ можно не указывать.

```shell
wes index
```

Кроме того, в _wes_ есть _REPL_ поэтому, если вы запускаете его только с `wes` , вы можете напрямую войти в скрипт.

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

Скрипт будет принят, пока вы не введете две пустые строки. _README.md_ также можете проверить выполнение примера сценария в _README.md_ с помощью _REPL_ .

## именованные аргументы командной строки

Варианты запуска _wes_ следующие.

| названный          | описание                                         |
| ------------------ | ------------------------------------------------ |
| `--monotone`       | Устранение _ANSI escape code_                    |
| `--safe`           | Запустить скрипт в безопасном режиме             |
| `--usual`          | Запустить скрипт в обычном режиме (по умолчанию) |
| `--unsafe`         | Запустить скрипт в небезопасном режиме           |
| `--dangerous`      | Запустить скрипт в опасном режиме                |
| `--debug`          | Запустить скрипт в режиме отладки                |
| `--encoding=UTF-8` | Задает кодировку первого файла для чтения        |
| `--engine=Chakra`  | Эта опция автоматически добавляется _wes_        |

Реализация `--safe` `--usual` `--unsafe` `--dangerous` не завершена, но именованные аргументы зарезервированы.

## встроенные объекты

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

Импортируйте модуль с помощью _require_ . _wes_ автоматически угадывает кодировку файла модуля, но если вы не угадали правильно, вы можете указать кодировку с помощью второго аргумента.

Кроме того, для _OLE_ `require('WScript.Shell')` даже если _require_ импорт, возможен с.

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

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

```javascript
function add (a, b) {
    return a + b
}

module.exports = add
```

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

_wes_ использует _console_ вместо `WScript.Echo` и `WScript.StdErr.WriteLine` .

Печатайте символы в командной строке в `console.log` . Он также поддерживает форматированные строки. Печатает отформатированную строку с помощью оператора форматирования `%` .

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

_wes_ для того , чтобы вывести строку в цветной `WScript.StdOut.WriteLine` вместо того, чтобы , `WScript.StdErr.WriteLine` использование. `WScript.Echo` и `WScript.StdOut.WriteLine` заблокированы для вывода, поэтому используйте `WScript.StdOut.WriteLine` или `console.log` .

### _Buffer_

Может обрабатывать буферы.

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```

### `__dirname` и `__filename`

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```

## встроенные модули

_wes_ есть _built-in modules_ для упрощения и стандартизации базовой обработки.

### _ansi_

`ansi` есть _ANSI escape code_ который позволяет изменять цвет и эффект стандартного вывода. Цвета и эффекты могут различаться в зависимости от типа и настроек используемого консольного приложения.

```javascript
const { brightRed, yellow } = require('ansi')
const message = 'File does not exist'
console.log(brightRed + 'Error: ' + yellow + message)
```

Вы также можете создавать свои собственные цвета с помощью `ansi.color()` и `ansi.bgColor()` . В аргументе используется _RGB_ например `255, 165, 0` или _color code_ например `'#FFA500'` . Вы не можете использовать _color name_ например, `orange` .

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

### _argv_

Получает аргумент командной строки. `cscript.exe` аргументы командной строки `/` объявляет именованные аргументы в но, _wes_ в `-` и `--` объявить именованные аргументы.

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

Введите аргументы командной строки вместе с _REPL_ .

```shell
wes REPL aaa -bcd eee --fgh=iii jjj --kln mmm
```

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

### _pathname_

Управляйте тропой.

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

### _filesystem_

Управляйте файлами и каталогами. `readTextFileSync` автоматически угадывает и считывает кодировку файла.

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```

### _JScript_

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```

_GetObject_ `WScript.GetObject` как альтернатива `WScript.GetObject` .

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

_VBScript_ предлагает некоторые функции, которых нет в _JScript_ .

```javascript
const { TypeName } = require('VBScript')
const FSO = require('Scripting.FileSystemObject')
console.log(TypeName(FSO))
```

### _httprequest_

_httprequest_ выдает _http request_ как следует из названия.

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

### _minitest_

_minitest_ может писать простые тесты.

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

_pipe_ упрощает обработку трубы

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

### _typecheck_

Определите тип сценария.

```javascript
const { isString, isNumber, isBoolean } = require('typecheck')

console.log('isString("ECMAScript") // => %O', isString("ECMAScript"))
console.log('isNumber(43.5) // => %O', isNumber(43.5))
console.log('isBoolean(false) // => %O', isBoolean(false))
```

## Комплектация и установка модуля

_install_ вы можете установить модуль для _wes_ опубликованных на _github_ . Для публикации модуля вам понадобится _github repository_ . Кроме того, имя репозитория и имя локального каталога должны совпадать.

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

1.  _repository_ одном _repository_ может быть опубликован _repository_ один тип модуля.
2.  _github_ репозитория _github_ и имя локального рабочего каталога должны совпадать.
3.  Репозиторий должен быть общедоступным, если вы хотите опубликовать модуль для третьей стороны.
4.  _wes_ не интерпретирует сценарий статически. Модули, которые `require` при определенных условиях, например операторы `if` , не могут быть объединены.
5.  _.json_ каталоге будет создан файл _.json_ с именем _directory_name.json_ . Если вы переименуете файл или переместите файл, вы не сможете его установить.
6.  `node_modules/directory_name` отправка одной посылкой не может, потому что он ссылается `directory_name.json` .

### _install_

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

## использование

Передайте аргументы для _install_ в формате `@author/repository`

```shell
wes install @wachaon/fmt
```

_install_ имеет параметры

| названный  | короткое имя | описание                                          |
| ---------- | ------------ | ------------------------------------------------- |
| `--bare`   | `-b`         | Не создавайте папку _@author_                     |
| `--global` | `-g`         | Установите модуль в папку, где находится _wes.js_ |

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

# Установите модуль частного репозитория

_install_ можно установить не только на модули публичного репозитория _github_ , но и на частные репозитории.

_install_ укажите модуль с `author@repository` . Реализация загружает следующее.

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

```shell
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

### _@wachaon/fmt_

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

#### установить

```shell
wes install @wachaon/fmt
```

#### использование

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）

Использовать как _CLI_

```shell
wes @wachaon/fmt src/sample --write
```

| безымянный номер | описание                                                     |
| ---------------- | ------------------------------------------------------------ |
| 0                | ---                                                          |
| 1                | Необходимые. Путь к файлу, который вы хотите отформатировать |

| названный | короткое имя | описание             |
| --------- | ------------ | -------------------- |
| `--write` | `-w`         | Разрешить перезапись |

Перезаписывает файл отформатированным сценарием, если указан именованный аргумент `--write` или `-w` .

#### _module_ использовании в качестве _module_

#### `option`

![Google Apps Script](//ssl.gstatic.com/docs/script/images/logo.png)

Exception: 1 日にサービス translate を実行した回数が多すぎます。（行 4、ファイル「コード」）
