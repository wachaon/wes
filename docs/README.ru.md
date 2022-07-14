# *WES*

*wes* — это консольная платформа, которая запускает *ECMAScript* на *WSH (Windows Script Host)* . Оригинальный текст *README* — [*japanese*](/README.md) . Кроме японского, это предложение с машинным переводом.  
Пожалуйста, выберите предложения на других языках из следующих.

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

# особенность

-   Вы можете изменить скриптовый движок на *Chakra* и прописать его в спецификации *ECMAScript2015* .
-   Он всегда запускает 32 *cscript.exe* , поэтому в 64-битной среде нет проблем.
-   С модульной системой вы можете разрабатывать более эффективно, чем традиционные *WSH*
-   Встроенный модуль поддерживает базовую обработку, такую ​​как ввод/вывод файла и вывод цветных символов на консоль.
-   Вам не нужно беспокоиться о кодировке, потому что вы можете автоматически угадать кодировку при чтении файла.
-   Мы также упаковываем модули для поддержки внешней публикации и поиска.

# Известные проблемы, которые *wes* не можем решить

-   `WScript.Quit` не может прервать программу и не возвращает код ошибки
-   Асинхронная обработка, такая как `setTimeout` и `Promise` , невозможна.
-   Вы не можете использовать *event prefix* в качестве второго аргумента `WScript.CreateObject`

# скачать

Уэсу нужен только *wes* *wes.js* Для загрузки скопируйте *wes.js* из [*@wachaon/wes*](https://github.com/wachaon/wes) или выполните следующую команду в консоли.

```bat
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

*WScript.Shell* использует `SendKeys` в *wes* во время выполнения в качестве реализации. Если путь к каталогу, в котором сохранен *wes.js* , содержит символы, отличные от *ascii* , `SendKeys` не сможет правильно отправить ключ и скрипт не сможет быть выполнен.  
Настройте путь сохранения *wes.js* только в формате *ascii* . Если вы уже загрузили *wes* , вы можете обновить его с помощью следующей команды.

```bat
wes update
```

# Как использовать

Введите в консоль команду, указывающую файл, который будет отправной точкой программы после ключевого слова `wes` . Расширение скрипта *.js* можно не указывать.

```bat
wes index
```

Кроме того, у *wes* есть *REP* , поэтому, если вы запустите его только с `wes` , вы сможете войти в скрипт напрямую.

```bat
wes
```

*REP* принимает ввод сценария, пока вы не введете две пустые строки. Вы также можете проверить выполнение примера скрипта в *README.md* с помощью *REP* .

## Параметры командной строки

Варианты запуска для *wes* следующие.

| названный          | Описание                                         |
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

# Модульная система

*wes* поддерживает две модульные системы: *commonjs module* , использующую `require()` , и *es module* , использующий `import` . ( *dynamic import* — это асинхронная обработка, поэтому он не поддерживается)

## *commonjs module*

Управляйте модулями, назначая `module.exports` и вызывая с помощью `require()` . Для путей, отличных от абсолютных путей и относительных путей, начинающихся с `./` и `../` , ищите модули в каталоге *wes_modules* и, для удобства, в *node_modules* . *wes* `require()` автоматически угадывает кодировку файла модуля, но если она не угадывается правильно, вы можете указать кодировку вторым аргументом.

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

Вы также можете импортировать в *ActiveX* с помощью *require* `require('WScript.Shell')` .

```javascript
const Shell = require('Shell.Application')
Shell.MinimizeAll()
WScript.Sleep(2000)
Shell.UndoMinimizeAll()
```

## *es module*

*Chakra* , механизм выполнения скрипта, интерпретирует такой синтаксис, как `imoprt` , но не может быть выполнен как есть, потому что метод обработки как `cscript` не определен. В *wes* , добавляя *babel* к встроенному модулю, мы выполняем его, последовательно транспилируя в *es module* . В результате накладные расходы на обработку и файл *wes.js* раздуваются как затраты. Модули, описываемые *es module* , также транспилируются в `require()` , поэтому возможны вызовы *ActiveX* . Однако он не поддерживает спецификацию кодировки файла модуля в *es module* . Все читаются автоматическим угадыванием. Чтобы загрузить его как *es module* , установите расширение на `.mjs` или поле `"type"` `package.json` на `"module"` .

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

# Встроенный объект

*wes* имеет *built-in objects* , которых нет в *WSH (JScript)* .

## *console*

*wes* использует *console* вместо `WScript.Echo` или `WScript.StdErr.WriteLine` . Выводить символы на консоль в `console.log` . Он также поддерживает форматированные строки. Выводит отформатированную строку с использованием оператора форматирования `%` .

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

| Спецификатор формата | Описание                         |
| -------------------- | -------------------------------- |
| `%s`                 | `String(value)`                  |
| `%S`                 | `String(value)`                  |
| `%c`                 | `String(value)`                  |
| `%C`                 | `String(value)`                  |
| `%d`                 | `parseInt(value, 10)`            |
| `%D`                 | `parseInt(value, 10)`            |
| `%f`                 | `Number(value)`                  |
| `%F`                 | `Number(value)`                  |
| `%j`                 | `JSON.stringify(value)`          |
| `%J`                 | `JSON.stringify(value, null, 2)` |
| `%o`                 | Дамп объекта                     |
| `%O`                 | Дамп объекта (цветной отступ)    |

`WScript.StdOut.WriteLine` *wes* `WScript.StdErr.WriteLine` для вывода цветных строк. `WScript.Echo` и `WScript.StdOut.WriteLine` заблокирован. `WScript.StdErr.WriteLine` или `console.log` .

## *Buffer*

Может обрабатывать буферы.

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log(`${content} %O`, buff)
```

## `__dirname` и `__filename`

`__filename` содержит путь к текущему файлу модуля. `__dirname` содержит каталог `__filename` .

```javascript
console.log('dirname: %O\nfilename: %O', __dirname, __filename)
```

# Встроенный модуль

У *wes* есть *built-in modules* для упрощения и стандартизации базовой обработки.

## *ansi*

`ansi` — это *ANSI escape code* , позволяющий изменять цвет и эффект стандартного вывода. Цвета и эффекты могут различаться в зависимости от типа и настроек используемого консольного приложения.

```javascript
const { redBright, yellow } = require('ansi')
const message = 'File does not exist'
console.log(redBright + 'Error: ' + yellow + message)
```

Вы также можете создавать свои собственные цвета с помощью `ansi.color()` и `ansi.bgColor()` . Аргумент использует *RGB* , например `255, 165, 0` или *color code* , например `'#FFA500'` . Он не поддерживает *color name* , такие как `orange` .

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

## *argv*

Получает аргумент командной строки. Аргументы командной строки в `cscript.exe` объявляют именованные аргументы с помощью `/` `--` а *wes* объявляют именованные аргументы с помощью `-` и-. *argv.unnamed* и *argv.named* тип значения аргумента командной строки к одному из *Boolean* значений *String* *Number* . Введите аргументы командной строки вместе с *REP* .

```bat
wes REP aaa -bcd eee --fgh=iii jjj --kln mmm
```

Запустите следующий скрипт в *REP* .

```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```

## *pathname*

Управляйте путем. Пути, начинающиеся с `/` и `\` , обычно относятся к путям относительно корня диска. Например, `/filename` и `C:/filename` могут иметь один и тот же путь. Из соображений безопасности `wes` интерпретирует пути, начинающиеся с `/` и `\` , как относительные к рабочему каталогу.

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

## *filesystem*

Работа с файлами и каталогами. `readTextFileSync` автоматически угадывает кодировку файла и читает его.

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
console.log(contents)
```

## *chardet*

Я использую некоторые функции <https://github.com/runk/node-chardet> . Вы можете повысить точность автоматического угадывания, увеличив количество символов, характерных для кодировки.

## *JScript*

Если вы измените скриптовый движок на *Chakra* , вы не сможете использовать *JScript* -специфический *Enumerator* и т. д. Встроенный модуль *JScript* делает их доступными. Однако *Enumerator* возвращает *Array* вместо *Enumerator object* .

```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```

*GetObject* действует как альтернатива `WScript.GetObject` .

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

*httprequest* *http request* .

```javascript
const request = require('httprequest')
const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1')
console.log('%O', JSON.parse(content))
```

## *minitest*

*minitest* может писать простые тесты. Простой синтаксис, несколько утверждений Возвращаясь к базовой концепции версии `0.10.71` , мы сократили количество типов утверждений до трех.

### Применение

Разделите на группы с помощью `describe` , напишите тесты с `it` помощью и подтвердите с помощью `assert` . `pass` — это массив количества `it` вхождений и количества проходов.

```javascript
const { describe, it, assert, pass } = require('minitest')
describe('minitest', () => {
    describe('add', () => {
        const add = (a, b) => a + b
        it('2 plus 3 is 5', () => {
            assert.equal(5, add(2, 3))
        })
        it('0 plus 0 is 0', () => {
            assert(0 === add(0, 0))
        })
        it('"4" plus "5" is 9', () => {
            assert.equal(9, add("4", "5"))
        })
        it('NaN plus 3 is NaN', () => {
            assert.equal(NaN, add(NaN, 3))
        })
    })
    describe('sub', () => {
        it('5 minus 4 is 1', () => {
            const sub = (a, b) => a - b
            assert.equal(1, sub(5, 4))
        })
    })
})
console.log('tests: %O passed: %O, failed: %O', pass[0], pass[1], pass[0] - pass[1])
```

### утверждение

#### `assert(value, message)` `assert.ok(value, message)`

Сравните с `true` с оператором точного равенства `===` . Если `value` является функцией, оцените результат выполнения функции.

| Парам     | Тип        | Описание                   |
| :-------- | :--------- | :------------------------- |
| `value`   | \`{Функция | логическое значение} \`    |
| `message` | `{String}` | Сообщение в случае неудачи |

#### `assert.equal(expected, actual)`

Сравнивает объекты по эквивалентности их элементов, а не по ссылке.  
NaN `true` `NaN === NaN` `function (){} === function (){}` `/RegExp/g === /RegExp/g` and `{one: {two: 2}} === {one: {two: 2}}` `[1,2,3] === [1,2,3]` и т.д.  
При сравнении классов (объектов) один и тот же конструктор или `actual` должен быть суперклассом `expected` .

| Парам      | Тип     | Описание           |
| :--------- | :------ | :----------------- |
| `expected` | `{Any}` | Ожидаемое значение |
| `actual`   | `{Any}` | Реальная стоимость |

#### `assert.throws(value, expected, message)`

Убедитесь, что ошибка выдается правильно.  
Правильность ошибки определяется тем, является ли она *constructor* ожидаемой ошибки или эквивалентно ли *message* и регулярное выражение проходит оценку *stack* .

| Парам      | Тип        | Описание                   |
| :--------- | :--------- | :------------------------- |
| `value`    | `{Error}`  | ошибка                     |
| `expected` | \`{Ошибка  | Нить                       |
| `message`  | `{String}` | Сообщение в случае неудачи |

## *pipe*

*pipe* упрощает обработку труб.

```javascript
const pipe = require('pipe')
function add (a, b) {
    return b + a
}
function sub (a, b) {
    return b - a
}
function div (a, b) {
    return a / b
}
const add5 = add.bind(null, 5)
const sub3 = sub.bind(null, 3)
pipe()
  .use(add5)
  .use(sub3)
  .use(div, 4)
  .process(10, (err, res) => console.log('res: %O', res))
```

## *typecheck*

Определите тип сценария.

```javascript
const { isString, isNumber, isBoolean, isObject } = require('typecheck')
const log = require('log')
log(() => isString("ECMAScript"))
log(() => isNumber(43.5))
log(() => isBoolean(false))
log(() => isObject(function(){}))
```

## *zip*

Сжимайте файлы и папки и распаковывайте сжатые файлы. Он вызывает *PowerShell* внутри и обрабатывает его.

```javascript
const {zip, unzip} = require('zip')
console.log(zip('docs\\*', 'dox.zip'))
console.log(unzip('dox.zip'))
```

Подстановочные знаки `*` могут быть записаны в `path` `zip(path, destinationPath)` . Его можно использовать как с *CLI (Command Line Interface)* , так и с *module* .

```bat
wes zip docs\* dox.zip
wes zip -p dox.zip
```

Если `path` имеет расширение `.zip` , обрабатывается `unzip()` и нет описания расширения `.zip` . Или даже если есть расширение `.zip` , если есть описание подстановочного знака `*` , будет обрабатываться `zip()` .

| безымянный | Описание                        |
| ---------- | ------------------------------- |
| `1`        | `path` Папка или файл для входа |
| `2`        | файл папки для `dest`           |

| названный | короткое имя | Описание                        |
| --------- | ------------ | ------------------------------- |
| `--path`  | `-p`         | `path` Папка или файл для входа |
| `--dest`  | `-d`         | файл папки для `dest`           |

# Комплектация и установка модуля

В *wes* пакет из нескольких модулей называется пакетом. Вы можете установить пакет для *wes* , опубликованный на *github* . Вам понадобится *github repository* для публикации пакета. Кроме того, имя репозитория и имя локального каталога должны совпадать.

## *bundle*

При публикации пакета на *github* *bundle* объединяет необходимые модули и меняет формат, чтобы его можно было импортировать при установке. Из соображений безопасности *bundle* создает файл *.json* , поскольку *wes* не позволяет импортировать пакеты в формате, который может выполняться напрямую. Есть некоторые условия для упаковки.

1.  Только один пакет может быть опубликован в одном *repository*

2.  Убедитесь, что имя репозитория на *github* и имя локального рабочего каталога совпадают.

3.  Если вы публикуете пакет, сделайте репозиторий *public* .

4.  Объявите получение модуля в области верхнего уровня

5.  Файл пакета *.json* создается в вашем рабочем каталоге с именем *directory_name.json* . Если вы переименуете файл или переместите файл, вы не сможете ссылаться на него при установке.

6.  `node_modules/directory_name` является отправной точкой бандла

    ```bat
        wes bundle directory_name
    ```

    Без комплектации с

    ```bat
        wes bundle node_modules/directory_name
    ```

    Пожалуйста, объедините с

## *install*

Используется для установки пакета для *wes* , опубликованного на *github* . Начиная с `version 0.10.28` папка установки будет изменена с `node_modules` на `wes_modules` . Если вы устанавливаете в `node_modules` , добавьте параметр `--node` .

### Как использовать

Передайте аргументы для *install* в формате `@author/repository` .

```bat
wes install @wachaon/fmt
```

*install* имеет опции.

| названный     | короткое имя | Описание                                                                 |
| ------------- | ------------ | ------------------------------------------------------------------------ |
| `--bare`      | `-b`         | Не создавайте папку *@author*                                            |
| `--global`    | `-g`         | Установите пакет в папку, где находится *wes.js*                         |
| `--save`      | `-S`         | Добавьте имя и версию пакета в поле *dependencies* *package.json* .      |
| `--save--dev` | `-D`         | Добавьте имя и версию пакета в поле *devDependencies* в *package.json* . |
| `--node`      | `-n`         | Установить в папку *node_module*                                         |

`--bare` может опустить аргумент `require` из `author@repository` в `repository` . `--global` делает установленный пакет доступным для всех сценариев. `--node` или `-n` должен быть указан одновременно с параметром безопасности *wes* `--unsafe` или `--dangerous` .

```bat
wes install @wachaon/fmt --bare --unsafe
```

# Установка пакетов в частные репозитории

*install* может устанавливать пакеты в частные репозитории, а также пакеты в публичные репозитории на *github* . При *install* укажите пакет с *@author/repository* . Реализация попытается загрузить следующий URL-адрес.

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/${repository}.json`
```

При доступе к *raw* частному репозиторию с помощью браузера будет отображаться *token* , поэтому скопируйте *token* и используйте его. Вы также можете установить пакеты в частные репозитории, запустив их в консоли в течение времени жизни *token* .

```bat
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

# Введение пакета

Вот несколько внешних пакетов.

## *@wachaon/fmt*

*@wachaon/fmt* более *prettier* упакован для *wes* и форматирует скрипт. Также, если *Syntax Error* возникает при установленном *@wachaon/fmt* , вы можете указать место ошибки.

### установить

```bat
wes install @wachaon/fmt
```

### Как использовать

Если в рабочем каталоге есть *.prettierrc* (формат JSON), это будет отражено в настройке. *fmt* можно использовать как с *CLI* , так и с *module* .

#### Используется как *CLI* .

```bat
wes @wachaon/fmt src/sample --write
```

| безымянный номер | Описание                                                     |
| ---------------- | ------------------------------------------------------------ |
| 0                | ――――                                                         |
| 1                | Необходимый. Путь к файлу, который вы хотите отформатировать |

| названный | короткое имя | Описание             |
| --------- | ------------ | -------------------- |
| `--write` | `-w`         | Разрешить перезапись |

Перезапишите файл отформатированным сценарием, если вы укажете именованный аргумент `--write` или `-w` .

#### Использовать как модуль

```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')
const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```

## *@wachaon/edge*

*Internet Explorer* завершит поддержку с 2022/6/15. В результате ожидается, что работать с приложением с помощью `require('InternetExplorer.Application')` будет невозможно. Альтернативой может быть использование *Microsoft Edge based on Chromium* через *web driver* . `@wachaon/edge` упрощает автопилот *Edge* .

### установить

Сначала установите пакет.

```bat
wes install @wachaon/edge --unsafe --bare
```

Затем загрузите *web driver* .

```bat
wes edge --download
```

Проверьте установленную версию *Edge* и загрузите соответствующий *web driver* .

### Как использовать

Это будет легко использовать.

```javascript
const edge = require('edge')
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

Этот скрипт будет последовательно выводить посещенные *URL* -адреса на консоль. `@wachaon/edge` регистрирует событие для *URL* и добавляет данные в `res.exports` . *URL* -адрес для регистрации может быть либо `String` `RegExp` , и могут быть сделаны гибкие настройки. Сделав его управляемым событиями, можно легко переключиться на ручное управление, не устанавливая для обработки событие, которое трудно обработать с помощью автопилота. Если вы хотите остановить скрипт, запустите `navi.emit('terminate', res)` или завершите работу *Edge* вручную. Процесс завершения выводит `res.exports` в виде файла *.json* в качестве значения по умолчанию. Если вы хотите установить процесс завершения, установите `terminate` `edge(callback, terminate)` . `window` — это не `window` в браузере, а экземпляр класса *Window* *@wachaon/webdriver* .

## *@wachaon/webdriver*

Это пакет, который отправляет запрос *web driver* , управляющему браузером. Встроен в *@wachaon/edge* . Как и *@wachaon/edge* , для работы браузера требуется *web driver* .

### установить

```bat
wes install @wachaon/webdriver --unsafe --bare
```

Если у вас нет *web driver* *Microsoft Edge* на основе *Chromium* , загрузите его. Кроме того, если версия *edge* и версия *web driver* отличаются, загрузите одну и ту же версию *web driver* .

```bat
wes webdriver --download
```
