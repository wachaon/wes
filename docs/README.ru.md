# _WES_

_wes_ - это фреймворк для выполнения _ECMAScript_ на _Windows Script Host_

Оригинальный текст _README_ - [_japanese_](README.ja.md) . Помимо японского, это предложение машинного перевода.  
Пожалуйста, выберите предложения на других языках из следующих.

## Функции

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

```shell
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

_wes_ во время выполнения, поскольку реализация _WScript.Shell_ использует `SendKeys` . _wes.js_ путь к каталогу, в котором _wes.js_ содержит символы, отличные от _ascii_ , `SendKeys` не сможет правильно отправить ключ и скрипт не сможет быть выполнен.  
_wes.js_ путь для _wes.js_ только в _wes.js_ _ascii_ .

## использование

В командной строке укажите файл, который будет отправной точкой программы после `wes` . Расширение скрипта _.js_ можно не указывать.

```shell
wes index
```

Кроме того, в _wes_ есть _REPL_ поэтому, если вы запустите его только с помощью `wes` , вы можете напрямую ввести скрипт.

```shell
wes
```

Скрипт будет принят, пока вы не введете две пустые строки. _README.md_ также можете проверить выполнение примера сценария в _README.md_ с помощью _REPL_ .

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined

undefined
