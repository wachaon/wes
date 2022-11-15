# *WES*

*wes* — консольный фреймворк для запуска *ECMAScript* на *WSH (Windows Script Host)* . Оригинальный [*japanese*](/README.md) *README* будет на японском языке. Тексты, отличные от японского, будут переведены автоматически.\
Для текстов на других языках выберите один из вариантов ниже.

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

*   Вы можете изменить скриптовый движок на *Chakra* и писать в соответствии со спецификациями *ECMAScript2015* .
*   Поскольку 32 *cscript.exe* всегда выполняется, в 64-битной среде нет уникальной проблемы.
*   Поскольку существует модульная система, ее можно развивать более эффективно, чем обычную *WSH* .
*   Встроенные модули поддерживают базовую обработку, такую ​​как ввод/вывод файлов и вывод цветного текста на консоль.
*   Вы можете позволить чтению файла автоматически угадывать кодировку, поэтому вам не нужно беспокоиться о кодировке и т. д.
*   Пакетные модули для поддержки внешней публикации и поиска
*   Отображение сведений об ошибке более любезно, чем *WSH*

# *wes* проблемы, которые мы не можем решить

*   `WScript.Quit` не может прервать программу и не возвращает код ошибки.
*   Асинхронная обработка работает неправильно
*   Вы не можете использовать *event prefix* второго аргумента `WScript.CreateObject`

# скачать

Уэсу нужен только *wes* *wes.js* Чтобы скачать, скопируйте *wes.js* из [*@wachaon/wes*](https://github.com/wachaon/wes) или выполните следующую команду в консоли.

```bat
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

*WScript.Shell* `SendKeys` *wes* выполнения в качестве реализации. Если путь к каталогу, в котором сохранен *wes.js* , содержит символы, отличные от *ascii* , `SendKeys` не может правильно отправить ключ и скрипт не может быть выполнен.\
Настройте путь, по *wes.js* хранится только в формате *ascii* . Если вы уже загрузили *wes* , вы можете обновить его с помощью следующей команды.

```bat
wes update
```

# как начать *wes*

Введите ключевое слово `wes` и команду, указывающую файл, который будет отправной точкой программы в консоль. Расширение скрипта *.js* можно не указывать.

```bat
wes index
```

*wes* может напрямую вводить и выполнять сценарии на консоли. Если вы запустите его только с `wes` , вы можете напрямую войти и выполнить скрипт.

```bat
wes
```

*REP* принимает ввод сценария, пока вы не введете две пустые строки. Вы также можете увидеть, как *REP* запускает пример скрипта в *README.md* .

## параметры командной строки

Варианты запуска *wes* следующие.

| по имени           | Описание                                                       |
| ------------------ | -------------------------------------------------------------- |
| `--monotone`       | Устраняет *ANSI escape code*                                   |
| `--transpile`      | Всегда конвертируйте и запускайте с помощью *babel-standalone* |
| `--debug`          | запустить скрипт в режиме отладки                              |
| `--encoding=UTF-8` | Указывает кодировку первого прочитанного файла                 |
| `--engine=Chakra`  | Эта опция автоматически добавляется *wes*                      |

# модульная система

*wes* поддерживает две модульные системы: *commonjs module* с использованием `require()` и *es module* с использованием `import` . ( *dynamic import* не поддерживается, поскольку это асинхронный процесс)

## *commonjs module*

Управляйте модулями, назначая `module.exports` и вызывая `require()` . Пути, отличные от абсолютных путей и относительных путей, начинающихся с `./` и `../` , ищут модули в каталоге *wes\_modules* и, удобно, в *node\_modules* . *wes* 's `require()` автоматически угадывает кодировку файла модуля, но вы можете указать кодировку вторым аргументом, если она не угадывается правильно.

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

Кроме того, можно импортировать с помощью *require* для *COM Object* , например `require('WScript.Shell')` .

```javascript
const Shell = require('Shell.Application')
Shell.MinimizeAll()
WScript.Sleep(2000)
Shell.UndoMinimizeAll()
```

## *es module*

*Chakra* , механизм выполнения сценариев, интерпретирует такой синтаксис, как `imoprt` , но не выполняется в среде *cscript* . В *wes* , добавляя *babel* к встроенным модулям, модули *es module* также выполняются при последовательной транспиляции. Это происходит за счет накладных расходов на обработку и раздутого файла *wes.js* Модули, написанные в *es module* , также преобразуются в `require()` путем транспиляции, поэтому можно вызывать *COM Object* . Однако он не поддерживает указание кодировки файла модуля с помощью *es module* . Все загружается автоматически. Чтобы загрузить его как *es module* , установите расширение `.mjs` или установите для поля `"type"` в `package.json` значение `"module"` .

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

# встроенный объект

*wes* имеет *built-in objects* , которых нет в *WSH (JScript)* .

## *console*

Мы используем *console* вместо *wes* `WScript.Echo()` и `WScript.StdErr.WriteLine()` .

### *console.log*

Вывод символов на консоль с помощью `console.log()` . Он также поддерживает форматированные строки. Выводит отформатированную строку с помощью оператора форматирования `%` . (Операторы форматирования также допустимы для других методов.)

```javascript
console.log(`item: %j`,  {name: 'apple', id: '001', price: 120 })
```

| Спецификатор формата | Описание                          |
| -------------------- | --------------------------------- |
| `%s`                 | `String(value)`                   |
| `%S`                 | `String(value)`                   |
| `%c`                 | `String(value)`                   |
| `%C`                 | `String(value)`                   |
| `%d`                 | `parseInt(value, 10)`             |
| `%D`                 | `parseInt(value, 10)`             |
| `%f`                 | `Number(value)`                   |
| `%F`                 | `Number(value)`                   |
| `%j`                 | `JSON.stringify(value)`           |
| `%J`                 | `JSON.stringify(value, null, 2)`  |
| `%o`                 | дамп объекта                      |
| `%O`                 | Дамп объекта (с отступом/цветной) |

`WScript.StdOut.WriteLine` *wes* `WScript.StdErr.WriteLine` для вывода цветных строк. `WScript.Echo` и `WScript.StdOut.WriteLine` являются заблокированным выводом. `WScript.StdErr.WriteLine` или `console.log` .

### *console.print*

`console.log()` обычно включает новую строку в конце, а `console.print` — нет.

### *console.debug*

Выводить на консоль, только если включена опция `--debug` .

### *console.error*

Создайте исключение с содержимым в качестве сообщения.

### *console.weaklog*

Строки, напечатанные с помощью `console.weaklog()` , исчезают из консоли, если есть какой-либо последующий вывод. Полезно для переключения выходов.

## *Buffer*

Вы можете обрабатывать буферы.

```javascript
const content = 'Hello World'
const buff = Buffer.from(content)
console.log('%s %O', content, buff)
```

## `__dirname` и `__filename`

`__filename` хранит путь к текущему исполняемому файлу модуля. `__dirname` содержит каталог `__filename` .

```javascript
const message = `dirname: ${__dirname}\nfilename: ${ __filename}`
console.log(message)
```

## *setTimeout* *setInterval* *setImmediate* *Promise*

Поскольку *wes* является средой выполнения для синхронной обработки, *setTimeout* *setInterval* *setImmediate* *Promise* не работает как асинхронная обработка, но реализован для поддержки модулей, предполагающих реализацию *Promise* .

```javascript
const example = () => {
  const promise = new Promise((resolve, reject) => {
    console.log('promise')

    setTimeout(() => {
      console.log('setTimeout') 
      resolve('resolved');
    }, 2000);
  }).then((val) => {
    console.log(val)
  });
  console.log('sub')
};

console.log('start')
example();
console.log('end')
```

# Встроенный модуль

*wes* имеет *built-in modules* для упрощения и стандартизации базовой обработки.

## *ansi*

`ansi` — это *ANSI escape code* , который может изменять стандартные выходные цвета и эффекты. Цвета и эффекты могут отличаться в зависимости от типа и настроек используемого консольного приложения.

```javascript
const { redBright, yellow } = require('ansi')
const message = 'File does not exist'
console.log(redBright + 'Error: ' + yellow + message)
```

Вы также можете создавать свои собственные цвета с помощью `ansi.color()` и `ansi.bgColor()` . Аргументы используют *RGB* , например `255, 165, 0` и *color code* , например `'#FFA500'` . *color name* , такие как `orange` , не поддерживаются.

```javascript
const { color } = require('ansi')
const orange = color(255, 165, 0)
console.log(orange + 'Hello World')
```

## *argv*

Получить аргументы командной строки. Аргументы командной строки `cscript.exe` объявляют именованные аргументы с помощью `/` , а *wes* объявляет именованные аргументы с помощью `-` и `--` . *argv.unnamed* и *argv.named* приводят тип значения аргумента командной строки к типу *String* *Number* *Boolean* . Введите аргументы командной строки с помощью *REP* .

```bat
wes REP aaa -bcd eee --fgh=iii jjj --kln mmm
```

Запустите следующий скрипт на *REP* .

```javascript
const argv = require('argv')
console.log(`argv: %O
argv.unnamed: %O
argv.named: %O`,
argv, argv.unnamed, argv.named)
```

## *pathname*

Манипулировать путями. Пути, начинающиеся с `/` и `\` , обычно относятся к корню диска. Например, `/filename` и `C:/filename` могут быть одним и тем же путем. Из соображений безопасности *wes* интерпретирует пути, начинающиеся с `/` и `\` , относительно рабочего каталога.

```javascript
const path = require('pathname')
const file = path.resolve(__dirname, 'index.js')
console.log('file %O', file)
```

## *filesystem*

Работа с файлами и каталогами. `readTextFileSync()` автоматически угадывает кодировку файла и читает ее. (Даже если для второго аргумента `readFileSync()` `encode` значение `auto` , оно будет угадываться автоматически.)

```javascript
const fs = require('filesystem')
const path = require('pathname')
const readme = path.resolve(__dirname, 'README.md')
const contents = fs.readTextFileSync(readme)
// const contents = fs.readFileSync(readme, 'auto')
console.log(contents)
```

## *chardet*

Я использую некоторые функции из <https://github.com/runk/node-chardet> . Вы можете повысить точность автоматического угадывания, увеличив количество символов, специфичных для кодировки.

## *JScript*

Если вы измените скриптовый движок на *Chakra* , вы не сможете использовать специфичные для *JScript* *Enumerator* и т. д. Встроенный модуль *JScript* делает их доступными. Однако *Enumerator* возвращает *Array* , а не *Enumerator object* .

```javascript
const { Enumerator, ActiveXObject } = require('JScript')
const FSO = new ActiveXObject('Scripting.FileSystemObject')
const dir = FSO.getFolder(__dirname).Files
const files = new Enumerator(dir)
files.forEach(file => console.log(file.Name))
```

*GetObject* работает как альтернатива `WScript.GetObject` .

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

*VBScript* предлагает некоторые функции, которых нет *JScript* .

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

*minitest* может писать простые тесты. С версии `0.10.71` мы вернулись к базовой концепции и сократили типы утверждений до 3 типов.

Группируйте с помощью `describe` , тестируйте с `it` помощью и проверяйте с помощью `assert` . `pass` будет массивом количества `it` вхождений и количества проходов.

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

### утверждения

Для простоты есть только три функции утверждения для сравнения объектов.

#### `assert(value, message)` `assert.ok(value, message)`

Сравните с `true` с оператором строгого равенства `===` . Если `value` является функцией, оцените результат выполнения функции.

| Парам     | Тип                   | Описание                                        |
| :-------- | :-------------------- | :---------------------------------------------- |
| `value`   | `{Function\|Boolean}` | логическая или логическая функция, возвращающая |
| `message` | `{String}`            | сообщение о неудаче                             |

#### `assert.equal(expected, actual)`

Сравнивает объекты на равенство элементов, а не по ссылке.\
NaN `true` Функция `NaN === NaN` `function (){} === function (){}` `/RegExp/g === /RegExp/g` или `{one: {two: 2}} === {one: {two: 2}}` `[1,2,3] === [1,2,3]` и т. д.\
При сравнении классов (объектов) у них должен быть один и тот же конструктор или суперкласс, чей `actual` `expected` .

| Парам      | Тип     | Описание           |
| :--------- | :------ | :----------------- |
| `expected` | `{Any}` | ожидаемое значение |
| `actual`   | `{Any}` | Реальная стоимость |

#### `assert.throws(value, expected, message)`

Убедитесь, что ошибки выдаются правильно.\
Является ли ошибка правильной, определяется тем, равны ли ожидаемый *constructor* ошибок, *message* и регулярное выражение проходит оценку *stack* .

| Парам      | Тип                       | Описание                                                                                  |
| :--------- | :------------------------ | :---------------------------------------------------------------------------------------- |
| `value`    | `{Error}`                 | ошибка                                                                                    |
| `expected` | `{Error\|String\|RegExp}` | Регулярное выражение, оценивающее ожидаемый *constructor* ошибок, *message* или *stack* . |
| `message`  | `{String}`                | сообщение в случае неудачи                                                                |

## *pipe*

*pipe* упрощает трубопровод.

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

## *animate*

*animate* помогает анимировать отображение консоли.

Если обработка занимает много времени, было бы неплохо отображать прогресс в виде анимации на консоли.

```javascript
const Animate = require('animate')
const animate = new Animate
const size = 23
let counter = 0

const progress = Animate.genProgressIndicator([
    '|----------|----------|',
    '|*---------|----------|',
    '|**--------|----------|',
    '|***-------|----------|',
    '|****------|----------|',
    '|*****-----|----------|',
    '|******----|----------|',
    '|*******---|----------|',
    '|********--|----------|',
    '|*********-|----------|',
    '|**********|----------|',
    '|**********|*---------|',
    '|**********|**--------|',
    '|**********|***-------|',
    '|**********|****------|',
    '|**********|*****-----|',
    '|**********|******----|',
    '|**********|*******---|',
    '|**********|********--|',
    '|**********|*********-|',
    '|**********|**********|',
])

const indigator = Animate.genProgressIndicator(['   ', '.  ', '.. ', '...'])

animate.register(() => {
    let prog = counter / size
    if (prog >= 1) {
        prog = 1
        animate.stop()
    }

    animate.view = console.format(
        '%S %S %S',
        progress(Math.ceil(prog * 20)),
        ('  ' + Math.ceil(prog * 100) + '%').slice(-4),
        prog < 1 ? 'loading' + indigator(counter) : 'finished!'
    )
    counter++
}, 100, Number.MAX_VALUE)
animate.run()
```

### `constructor(complete)`

Выполняет `complete` функцию, когда все очереди завершены или вызывается функция `stop()` .

#### `static genProgressIndicator(animation)`

Создайте функцию, которая отображает циклическую анимацию.

#### `register(callback, interval, conditional)`

Регистрация обработки. Несколько процессов могут быть зарегистрированы и обработаны параллельно. В `callback` мы укажем остановить анимацию и написать представление, которое будет отображаться. `interval` указывает интервал обработки. Если `conditional` является функцией, оно выполнит `conditional(count, queue)` и, если результат верен, продолжится. `conditional` выполняет `decrement(count)` , если это число, и продолжает, если результатом является положительное число. Выполняется только один раз, если `conditional` не определено. Обратите внимание, что указание функции увеличивает `count` , а указание `count` уменьшает его.

#### `stop()`

*animate* .

#### `cancel(queue)`

Приостанавливает обработку определенной очереди.

#### `run()`

Запустить анимацию.

#### `view`

Задает символы, которые выводятся на консоль. Переключайте персонажей через равные промежутки времени. Назначьте либо *Arrary* , либо *String* для `view` . *String* полезна при обновлении одной анимации, а *Array* полезен при анимации нескольких строк по отдельности.

```javascript
const Animate = require('/lib/animate')
const animate = new Animate(
    () => console.log('All Finished!!')
)

const progress = Animate.genProgressIndicator([
    '|----------|----------|',
    '|*---------|----------|',
    '|**--------|----------|',
    '|***-------|----------|',
    '|****------|----------|',
    '|*****-----|----------|',
    '|******----|----------|',
    '|*******---|----------|',
    '|********--|----------|',
    '|*********-|----------|',
    '|**********|----------|',
    '|**********|*---------|',
    '|**********|**--------|',
    '|**********|***-------|',
    '|**********|****------|',
    '|**********|*****-----|',
    '|**********|******----|',
    '|**********|*******---|',
    '|**********|********--|',
    '|**********|*********-|',
    '|**********|**********|',
])

const indigator = Animate.genProgressIndicator(['   ', '.  ', '.. ', '...'])

const state = {
    one: null,
    two: null,
    three: null
}

function upload(name, size, row) {
    let counter = 0
    return () => {
        let prog = counter / size
        if (prog >= 1) {
            prog = 1
            animate.cancel(state[name])
        }

        animate.view[row] = console.format(
            '%S %S %S',
            progress(Math.ceil(prog * 20)),
            ('  ' + Math.ceil(prog * 100) + '%').slice(-4),
            prog < 1 ? name + ' loading' + indigator(counter) : name + ' finished! '
        )
        counter++
    }
}

state.one = animate.register(upload('one', 63, 0), 50, Number.MAX_VALUE)
state.two = animate.register(upload('two', 49, 1), 60, Number.MAX_VALUE)
state.three = animate.register(upload('three', 109, 2), 40, Number.MAX_VALUE)
animate.run()
```

## *getMember*

Получите тип члена и описание *COM Object* из *ProgID* .

```javascript
const getMember = require('getMember')
const FileSystemObject = 'Scripting.FileSystemObject'
console.log('require("%S") // => %O', FileSystemObject, getMember(FileSystemObject))
```

## *zip*

Сжимает файлы и папки и распаковывает сжатые файлы. Внутри *PowerShell* вызывается и обрабатывается.

```javascript
const {zip, unzip} = require('zip')
console.log(zip('docs\\*', 'dox.zip'))
console.log(unzip('dox.zip'))
```

Подстановочный знак `*` может быть записан в `path` `zip(path, destinationPath)` . Его можно использовать как в *CLI (Command Line Interface)* , так и в *module* .

```bat
wes zip docs\* dox.zip
wes zip -p dox.zip
```

Если `path` имеет расширение `.zip` , обрабатывается функция `unzip()` , а описание расширения `.zip` отсутствует. В качестве альтернативы, даже если есть расширение `.zip` , если есть описание с подстановочным знаком `*` , `zip()` будет обработан.

| безымянный | Описание                  |
| ---------- | ------------------------- |
| `1`        | `path` или файл для входа |
| `2`        | файл папки для `dest`     |

| по имени | короткое имя | Описание                  |
| -------- | ------------ | ------------------------- |
| `--path` | `-p`         | `path` или файл для входа |
| `--dest` | `-d`         | файл папки для `dest`     |

# Комплектация (упаковка) и установка модулей

В *wes* пакет из нескольких модулей называется пакетом. Вы можете установить пакет для *wes* , опубликованный на *github* . Для публикации пакета требуется *github repository* .

## *bundle*

При публикации пакета на *github* *bundle* объединяет необходимые модули и создает *bundle.json* .

1.  Только один пакет может быть опубликован в одном *repository*
2.  требуется *package.json* . Как минимум требуется описание `main` поля. ```json
    {
        "main": "index.js"
    }
    ```
3.  Сделайте репозиторий *public* , если хотите опубликовать пакет
4.  Начиная с `version 0.12.0` , пакеты с прямой загрузкой модуля в каталог выше рабочего каталога не будут объединяться. Пакеты в верхнем каталоге *wes\_modules* или *node\_modules* могут быть объединены.

Введите следующую команду для объединения: Обратитесь к *package.json* для того, чтобы связать.

```bat
    wes bundle 
```

## *install*

Используется для установки пакета для *wes* , опубликованного на *github* . Начиная с `version 0.10.28` , папка установки изменена с `node_modules` на `wes_modules` . Если вы хотите установить в `node_modules` добавьте параметр `--node` . Начиная с `version 0.12.0` файлы будут распаковываться из *bandle.json* и сохраняться. Из-за изменений в спецификации пакеты, поставляемые в комплекте с `version 0.12.0` ниже 0.12.0, могут быть неправильно установлены с `version 0.12.0` или более поздней.

Передайте аргументы для *install* в форме `@author/repository` .

```bat
wes install @wachaon/fmt
```

*install* имеет опции.

| по имени      | короткое имя | Описание                                                                 |
| ------------- | ------------ | ------------------------------------------------------------------------ |
| `--bare`      | `-b`         | Не создавать папки *@author*                                             |
| `--global`    | `-g`         | Установите пакет в папку, где находится *wes.js*                         |
| `--save`      | `-S`         | Добавьте имя и версию пакета в поле *dependencies* в *package.json* .    |
| `--save--dev` | `-D`         | Добавьте имя и версию пакета в поле *devDependencies* в *package.json* . |
| `--node`      | `-n`         | Установить в папку *node\_module*                                        |

`--bare` может опустить аргумент `require` из `author@repository` в `repository` . `--global` делает установленные пакеты доступными для всех скриптов.

```bat
wes install @wachaon/fmt --bare
```

# Установка пакетов из приватных репозиториев

*install* может устанавливать не только пакеты из общедоступных репозиториев *github* , но и пакеты из частных репозиториев. В *install* укажите пакет с помощью *@author/repository* . Реализация пытается загрузить следующий URL-адрес.

```javascript
`https://raw.githubusercontent.com/${author}/${repository}/master/bundle.json`
```

Когда вы получаете доступ к *raw* частному репозиторию с помощью браузера, *token* будет отображаться, поэтому скопируйте *token* и используйте его. Пакеты из частных репозиториев также могут быть установлены, если они выполняются в консоли, пока *token* действителен.

```bat
wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA
```

# Введение пакета

Вот несколько внешних пакетов.

## *@wachaon/fmt*

*@wachaon/fmt* *wes* *prettier* форматировать скрипты. Кроме того, если во время *@wachaon/fmt* возникает *Syntax Error* , вы можете указать ее местонахождение.

### установить

```bat
wes install @wachaon/fmt
```

Если в рабочей директории есть *.prettierrc* (формат JSON), это будет отражено в настройках. *fmt* доступен как в *CLI* , так и в *module* .

#### Использовать как *CLI* .

```bat
wes @wachaon/fmt src/sample --write
```

| безымянный номер | Описание                                                     |
| ---------------- | ------------------------------------------------------------ |
| 1                | Необходимый. путь к файлу, который вы хотите отформатировать |

| по имени  | короткое имя | Описание             |
| --------- | ------------ | -------------------- |
| `--write` | `-w`         | разрешить перезапись |

Перезапишите файл отформатированным сценарием, если `--write` или `-w` .

#### использовать как модуль

```javascript
const fmt = require('@wachaon/fmt')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { join, workingDirectory } = require('pathname')
const target = join(workingDirectory, 'index.js')
console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
```
