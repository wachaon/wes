const charset = `
アラビア語	ar
ベンガル語	bn
ドイツ語	de
英語	en
フランス語	fr
ヒンディー語	hi
マレー語	ms
オランダ語	nl
ポルトガル語	pt
ロシア語	ru
簡体	zh-CN
繁体	zh-TW
スペイン語	es
`
    .trim()
    .split(/\r?\n/)
    .map((str) => str.split('\t'))
const api = require('/account').google_apps_script.translate
const md_translate = require('markdown-translate')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { resolve, WorkingDirectory } = require('pathname')

const content = readTextFileSync(resolve(process.cwd(), 'src/lang.md'))

const readme = readTextFileSync(resolve(process.cwd(), 'docs/README.ja.md'), 'UTF-8N')
const README = readme.replace('*import document*', content)
console.log(writeTextFileSync(resolve(WorkingDirectory, 'README.md'), README, 'UTF-8N'))

charset.forEach((list) => {
    const lang = list[1]
    const spec = resolve(process.cwd(), `docs/README.${lang}.md`)
    let res = md_translate(api, readme, { target: lang })
    res = res.replace('*import document*', content)
    console.log(writeTextFileSync(spec, res, 'UTF-8N'))
})
