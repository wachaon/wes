// built-ins
import { readFileSync } from 'filesystem'
import { resolve } from 'pathname'
import tester from 'markdownCodeTester'

const md = readFileSync(resolve(process.cwd(), 'README.md'), 'UTF-8')

tester(md)
