// built-ins
import { readFileSync } from 'filesystem'
import { resolve } from 'pathname'
import tester from 'markdownCodeTester'

const README_MD = readFileSync(resolve(process.cwd(), 'README.md'), 'UTF-8')

tester(README_MD)
