const isCLI = require('isCLI')

const message = `
| named            | description                                      |
| ---------------- | ------------------------------------------------ |
| --monotone       | Eliminate *ANSI escape code*                     |
| --safe           | Run the script in safe mode                      |
| --usual          | Run the script in normal mode (default)          |
| --unsafe         | Run the script in unsafe mode                    |
| --dangerous      | Run the script in dangerous mode                 |
| --debug          | Run the script in debug mode                     |
| --esmodule       | Put REP in esmodule mode                         |
| --encoding=UTF-8 | Specifies the encoding of the first file to read |
| --engine=Chakra  | This option is automatically added by *wes*      |
`

if (isCLI(__filename)) console.log(message)
else module.exports = message
