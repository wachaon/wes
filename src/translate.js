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
イタリア語	it
日本語	ja`
    .split(/\r?\n/)
    .map((str) => str.split('\t'))

const remark = require('remark')()
const api = require('/account').google_apps_script.translate
const md_translate = require('markdown-translate')
const Action = require('markdown-actions')
const { readTextFileSync, writeTextFileSync } = require('filesystem')
const { resolve } = require('pathname')
const visit = require('unist-util-visit')

const readme = readTextFileSync(resolve(process.cwd(), 'docs/README.md'))

charset.forEach((list) => {
    const lang = list[1]
    let res
    const spec = resolve(process.cwd(), `docs/README.${lang}.md`)
    res = lang === 'ja' ? readme : md_translate(api, readme, { target: lang })
    const action = new Action(res)

    action.on('imports', ({ node, index, parent }, spec) => {
        const md = readTextFileSync(spec)
        const items = remark.parse(md)
        parent.children.splice(index, 1, ...items.children)
    })

    action.run('translator')

    const result = remark.stringify(action.mdast)

    console.log(writeTextFileSync(spec, result, 'UTF-8N'))

    if (lang === 'ja') {
        visit(_mdast, (node, index, parent) => {
            if (node.type === 'link') {
                node.url = 'docs/' + node.url
            }
        })
        writeTextFileSync(resolve(process.cwd(), `README.md`), remark.stringify(action.mdast), 'UTF-8N')
    }
})
