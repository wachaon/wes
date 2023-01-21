const { basename, resolve } = require('pathname')
const { existsFileSync, readFileSync, writeFileSync } = require('filesystem')
const { NONE } = require('text')

function dialog(questions, callback) {
    let answers = []
    const qs = [...questions]

    while (qs.length) {
        console.print(qs.shift() + ' ')
        answers.push(WScript.StdIn.ReadLine())
    }
    return callback(answers)
}

const q = [
    `package name: (${basename(process.cwd())})`,
    'version: (0.0.1)',
    'description: ()',
    'git repository ()',
    'keywords ()',
    'author ()',
    'license: (MIT)'
]

dialog(q, (answers) => {
    const exp = /^.+\((.*)\)$/
    const res = answers.map((answer, i) => {
        return (answer != '' ? answer : exp.exec(q[i])[1]).trim()
    })

    const repo = res[3] !== '' ? res[3] : getGitRepository()

    const result = {
        name: res[0],
        version: res[1],
        main: 'index.js',
        author: res[5],
        license: res[6],
        keywords: res[4],
        description: res[2]
    }

    if (repo !== '')
        result.repository = {
            type: 'git',
            git: `git+${repo}`
        }

    const pkg = JSON.stringify(result, null, 2)
    console.log(pkg)

    dialog(['Is this OK? [yes/no] (yes)'], ([ok]) => {
        if (ok === NONE || ok.toLowerCase() === 'yes') {
            const pkg_spec = resolve(process.cwd(), 'package.json')
            if (existsFileSync(pkg_spec)) {
                dialog(
                    ['Are you sure you want to overwrite the existing package.json? [yes/no] (no)'],
                    ([overwrite]) => {
                        if (overwrite.toLowerCase() === 'yes') console.log(writeFileSync(pkg_spec, pkg, 'UTF-8'))
                        else console.log('Aborted.')
                    }
                )
            } else console.log(writeFileSync(pkg_spec, pkg, 'UTF-8'))
        } else console.log('Aborted.')
    })
})

function getGitRepository() {
    const config_spec = resolve(process.cwd(), '.git', 'config')

    if (existsFileSync(config_spec)) {
        const config = readFileSync(config_spec, 'auto')
        const exp = /\[remote "origin"\]\n\s+url = (https:.+\.git)/
        if (exp.test(config)) return exp.exec(config)[1]
    }
    return ''
}
