const charset = `簡体	zh-CN
繁体	zh-TW
英語	en
ヒンディー語	hi
スペイン語	es
アラビア語	ar
ベンガル語	bn
ポルトガル語	pt
ロシア語	ru
ドイツ語	de
フランス語	fr
イタリア語	it`
    .split(/\r?\n/)
    .map((str) => str.split('\t'))
const api = require('/account').google_apps_script.translate
const md_translate = require('markdown-translate')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { resolve } = require('pathname')

const readme = readTextFileSync(resolve(process.cwd(), 'docs/README.ja.md'), 'UTF-8N')

charset.forEach((list) => {
    const lang = list[1]
    const spec = resolve(process.cwd(), `docs/README.${lang}.md`)
    let res = md_translate(api, readme, { target: lang })
    const content = readTextFileSync(resolve(process.cwd(), 'src/lang.md'))
    res = res.replace('*import document*', content)
    console.log(writeTextFileSync(spec, res, 'UTF-8N'))
})
