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
*   Упаковать модули для поддержки внешней публикации и поиска
*   Отображение сведений об ошибке более любезно, чем *WSH*

# *wes* проблемы, которые мы не можем решить

*   `WScript.Quit` не может прервать программу и не возвращает код ошибки.
*   Асинхронная обработка работает неправильно
*   Вы не можете использовать *event prefix* второго аргумента `WScript.CreateObject`

# скачать

Уэсу нужен только *wes* *wes.js* Чтобы скачать, скопируйте *wes.js* из [*@wachaon/wes*](https://github.com/wachaon/wes) или выполните следующую команду в консоли.

     bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js

*WScript.Shell* `SendKeys` *wes* выполнения в качестве реализации. Если путь к каталогу, в котором сохранен *wes.js* , содержит символы, отличные от *ascii* , `SendKeys` не может правильно отправить ключ и скрипт не может быть выполнен.\
Настройте путь, по *wes.js* хранится только в формате *ascii* . Если вы уже загрузили *wes* , вы можете обновить его с помощью следующей команды.

     wes update

# Применение

Введите ключевое слово `wes` , а затем команду, указывающую файл, который будет отправной точкой программы для консоли. Расширение скрипта *.js* можно не указывать.

     wes index

Кроме того, поскольку *wes* оснащен *REP* , вы можете напрямую вводить скрипты, запустив только `wes` .

     wes

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

     // ./add.js function add (a, b) { return ab } module.exports = add

<!---->

     // ./main.js const add = require('./add') console.log('add(7, 3) // => %O', add(7, 3))

Кроме того, можно импортировать с помощью *require* для *COM Object* , например `require('WScript.Shell')` .

     const Shell = require('Shell.Application') Shell.MinimizeAll() WScript.Sleep(2000) Shell.UndoMinimizeAll()

## *es module*

*Chakra* , механизм выполнения сценариев, интерпретирует такой синтаксис, как `imoprt` , но он не может быть выполнен в том виде, в каком он есть, поскольку метод обработки как *cscript* не определен. В *wes* , добавляя *babel* к встроенным модулям, модули *es module* также выполняются при последовательной транспиляции. Это стоит нам накладных расходов на обработку и раздутого файла *wes.js* Модули, написанные в *es module* , также преобразуются в `require()` путем транспиляции, поэтому можно вызывать *COM Object* . Однако он не поддерживает указание кодировки файла модуля с помощью *es module* . Все загружается автоматически. Чтобы загрузить его как *es module* , установите расширение `.mjs` или установите для поля `"type"` в `package.json` значение `"module"` .

     // ./sub.mjs export default function sub (a, b) { return a - b }

<!---->

     // ./main2.js import sub from './sub.mjs' console.log('sub(7, 3) // => %O', sub(7, 3))

# встроенный объект

*wes* имеет *built-in objects* , которых нет в *WSH (JScript)* .

undefined

## *Buffer*

Вы можете обрабатывать буферы.

     const content = 'Hello World' const buff = Buffer.from(content) console.log(`${content} %O`, buff)

## `__dirname` и `__filename`

`__filename` хранит путь к текущему исполняемому файлу модуля. `__dirname` содержит каталог `__filename` .

     console.log('dirname: %O\nfilename: %O', __dirname, __filename)

## *setTimeout* *setInterval* *setImmediate* *Promise*

Поскольку *wes* является средой выполнения для синхронной обработки, *setTimeout* *setInterval* *setImmediate* *Promise* не работает как асинхронная обработка, но реализован для поддержки модулей, предполагающих реализацию *Promise* .

     const example = () => { const promise = new Promise((resolve, reject) => { console.log('promise') setTimeout(() => { console.log('setTimeout') resolve('resolved'); }, 2000); }).then((val) => { console.log(val) }); console.log('sub') }; console.log('start') example(); console.log('end')

# Встроенный модуль

*wes* имеет *built-in modules* для упрощения и стандартизации базовой обработки.

## *ansi*

`ansi` — это *ANSI escape code* , который может изменять стандартные выходные цвета и эффекты. Цвета и эффекты могут отличаться в зависимости от типа и настроек используемого консольного приложения.

     const { redBright, yellow } = require('ansi') const message = 'File does not exist' console.log(redBright 'Error: ' yellow message)

Вы также можете создавать свои собственные цвета с помощью `ansi.color()` и `ansi.bgColor()` . Аргументы используют *RGB* , например `255, 165, 0` и *color code* , например `'#FFA500'` . *color name* , такие как `orange` , не поддерживаются.

     const { color } = require('ansi') const orange = color(255, 165, 0) console.log(orange 'Hello World')

## *argv*

Получить аргументы командной строки. Аргументы командной строки `cscript.exe` объявляют именованные аргументы с помощью `/` , а *wes* объявляет именованные аргументы с помощью `-` и `--` . *argv.unnamed* и *argv.named* приводят тип значения аргумента командной строки к типу *String* *Number* *Boolean* . Введите аргументы командной строки с помощью *REP* .

     wes REP aaa -bcd eee --fgh=iii jjj --kln mmm

Запустите следующий скрипт на *REP* .

     const argv = require('argv') console.log(`argv: %O argv.unnamed: %O argv.named: %O`, argv, argv.unnamed, argv.named)

## *pathname*

Манипулировать путями. Пути, начинающиеся с `/` и `\` , обычно относятся к корню диска. Например, `/filename` и `C:/filename` могут быть одним и тем же путем. Из соображений безопасности *wes* интерпретирует пути, начинающиеся с `/` и `\` , относительно рабочего каталога.

     const path = require('pathname') const file = path.resolve(__dirname, 'index.js') console.log('file %O', file)

## *filesystem*

Работа с файлами и каталогами. `readTextFileSync()` автоматически угадывает кодировку файла и читает ее. (Даже если для второго аргумента `readFileSync()` `encode` значение `auto` , оно будет угадываться автоматически.)

     const fs = require('filesystem') const path = require('pathname') const readme = path.resolve(__dirname, 'README.md') const contents = fs.readTextFileSync(readme) // const contents = fs.readFileSync(readme, 'auto') console.log(contents)

## *chardet*

Я использую некоторые функции из <https://github.com/runk/node-chardet> . Вы можете повысить точность автоматического угадывания, увеличив количество символов, специфичных для кодировки.

## *JScript*

Если вы измените скриптовый движок на *Chakra* , вы не сможете использовать специфичные для *JScript* *Enumerator* и т. д. Встроенный модуль *JScript* делает их доступными. Однако *Enumerator* возвращает *Array* , а не *Enumerator object* .

     const { Enumerator, ActiveXObject } = require('JScript') const FSO = new ActiveXObject('Scripting.FileSystemObject') const dir = FSO.getFolder(__dirname).Files const files = new Enumerator(dir) files.forEach(file => console.log(file.Name))

*GetObject* работает как альтернатива `WScript.GetObject` .

     const { GetObject, Enumerator } = require('JScript') const ServiceSet = GetObject("winmgmts:{impersonationLevel=impersonate}").InstancesOf("Win32_Service") new Enumerator(ServiceSet).forEach(service => console.log( 'Name: %O\nDescription: %O\n', service.Name, service.Description ))

## *VBScript*

*VBScript* предлагает некоторые функции, которых нет *JScript* .

     const { TypeName } = require('VBScript') const FSO = require('Scripting.FileSystemObject') console.log(TypeName(FSO))

## *httprequest*

*httprequest* *http request* .

     const request = require('httprequest') const content = request('GET', 'https://jsonplaceholder.typicode.com/users/1') console.log('%O', JSON.parse(content))

undefined

## *pipe*

*pipe* упрощает трубопровод.

### Применение

     const pipe = require('pipe') function add (a, b) { return ba } function sub (a, b) { return b - a } function div (a, b) { return a / b } const add5 = add.bind(null, 5) const sub3 = sub.bind(null, 3) pipe() .use(add5) .use(sub3) .use(div, 4) .process(10, (err, res) => console.log('res: %O', res))

## *typecheck*

Определите тип сценария.

### Применение

     const { isString, isNumber, isBoolean, isObject } = require('typecheck') const log = require('log') log(() => isString("ECMAScript")) log(() => isNumber(43.5)) log(() => isBoolean(false)) log(() => isObject(function(){}))

undefined

## *getMember*

Получите тип члена и описание *COM Object* из *ProgID* .

### Применение

     const getMember = require('getMember') const FileSystemObject = 'Scripting.FileSystemObject' console.log('require("%S") // => %O', FileSystemObject, getMember(FileSystemObject))

## *zip*

Сжимает файлы и папки и распаковывает сжатые файлы. Внутри *PowerShell* вызывается и обрабатывается.

### Применение

     const {zip, unzip} = require('zip') console.log(zip('docs\\*', 'dox.zip')) console.log(unzip('dox.zip'))

Подстановочный знак `*` может быть записан в `path` `zip(path, destinationPath)` . Его можно использовать как в *CLI (Command Line Interface)* , так и в *module* .

     wes zip docs\* dox.zip wes zip -p dox.zip

Если `path` имеет расширение `.zip` , обрабатывается функция `unzip()` , а описание расширения `.zip` отсутствует. В качестве альтернативы, даже если есть расширение `.zip` , если есть описание с подстановочным знаком `*` , `zip()` будет обработан.

| безымянный | Описание                  |
| ---------- | ------------------------- |
| `1`        | `path` или файл для входа |
| `2`        | файл папки для `dest`     |

| названный | короткое имя | Описание                  |
| --------- | ------------ | ------------------------- |
| `--path`  | `-p`         | `path` или файл для входа |
| `--dest`  | `-d`         | файл папки для `dest`     |

# Комплектация (упаковка) и установка модулей

В *wes* пакет из нескольких модулей называется пакетом. Вы можете установить пакет для *wes* , опубликованный на *github* . Для публикации пакета требуется *github repository* .

## *bundle*

При публикации пакета на *github* *bundle* объединяет необходимые модули и создает *bundle.json* .

1.  Только один пакет может быть опубликован в одном *repository*

2.  требуется *package.json* . Как минимум требуется описание `main` поля.

         { "main": "index.js" }

3.  Сделайте репозиторий *public* , если хотите опубликовать пакет

4.  Начиная с `version 0.12.0` , пакеты с прямой загрузкой модуля в каталог выше рабочего каталога не будут объединяться. Пакеты в верхнем каталоге *wes\_modules* или *node\_modules* могут быть объединены.

Введите следующую команду для объединения: Обратитесь к *package.json* для того, чтобы связать.

     wes bundle

undefined

# Установка пакетов из приватных репозиториев

*install* может устанавливать не только пакеты из общедоступных репозиториев *github* , но и пакеты из частных репозиториев. В *install* укажите пакет с помощью *@author/repository* . Реализация пытается загрузить следующий URL-адрес.

     `https://raw.githubusercontent.com/${author}/${repository}/master/bundle.json`

Если вы получаете доступ к частному *raw* через браузер, *token* будет отображаться, поэтому скопируйте *token* и используйте его. Вы также можете установить пакеты из частных репозиториев, запустив их в консоли, пока *token* действителен.

     wes install @wachaon/calc?token=ADAAOIID5JALCLECFVLWV7K6ZHHDA

# Введение пакета

Вот несколько внешних пакетов.

## *@wachaon/fmt*

*@wachaon/fmt* *wes* *prettier* форматировать скрипты. Кроме того, если во время *@wachaon/fmt* возникает *Syntax Error* , вы можете указать ее местонахождение.

### установить

     wes install @wachaon/fmt

### Применение

Если в рабочей директории есть *.prettierrc* (формат JSON), это будет отражено в настройках. *fmt* доступен как в *CLI* , так и в *module* .

#### Использовать как *CLI* .

     wes @wachaon/fmt src/sample --write

| безымянный номер | Описание                                                     |
| ---------------- | ------------------------------------------------------------ |
| 1                | Необходимый. путь к файлу, который вы хотите отформатировать |

| названный | короткое имя | Описание             |
| --------- | ------------ | -------------------- |
| `--write` | `-w`         | разрешить перезапись |

Перезапишите файл отформатированным сценарием, если указан аргумент `--write` или `-w` .

#### использовать как модуль

     const fmt = require('@wachaon/fmt') const { readTextFileSync, writeTextFileSync } = require('filesystem') const { join, workingDirectory } = require('pathname') const target = join(workingDirectory, 'index.js') console.log(writeTextFileSync(target, fmt.format(readTextFileSync(target))))
