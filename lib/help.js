const isCLI = require('isCLI')

const message = `
| named            | Description                                    |
| ---------------- | ---------------------------------------------- |
| --monotone       | Eliminates *ANSI escape code*                  |
| --transpile      | Always convert and run with *babel-standalone* |
| --debug          | run the script in debug mode                   |
| --encoding=UTF-8 | Specifies the encoding of the first file read  |
| --engine=Chakra  | This option is added automatically by *wes*    |
`

if (isCLI(__filename)) console.log(message)
else module.exports = message
