const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')

const { parseList, checkRuntime } = require('./verify_runtime')

function writeList(rows) {
  const text = JSON.stringify({
    type: 'table',
    data: { head: ['Package', 'Version', 'Location'], body: rows },
  })
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'vr-list-'))
  const file = path.join(dir, 'yarn-list.json')
  fs.writeFileSync(file, text)
  return file
}

function makeDist(files) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'vr-dist-'))
  for (const [name, content] of Object.entries(files)) {
    const p = path.join(dir, name)
    fs.mkdirSync(path.dirname(p), { recursive: true })
    fs.writeFileSync(p, content)
  }
  return dir
}

const LEGAL_ROWS = [
  ['@tarojs/taro@4.2.1', '4.2.1', 'node_modules/@tarojs/taro'],
  ['@tarojs/runtime@4.2.1', '4.2.1', 'node_modules/@tarojs/runtime'],
  ['@tarojs/react@4.2.1', '4.2.1', 'node_modules/@tarojs/react'],
  ['@tarojs/components@4.2.1', '4.2.1', 'node_modules/@tarojs/components'],
  ['@tarojs/cli@4.2.1', '4.2.1', 'node_modules/@tarojs/cli'],
  [
    '@tarojs/plugin-framework-react@4.2.1',
    '4.2.1',
    'node_modules/@tarojs/plugin-framework-react',
  ],
  [
    '@tarojs/plugin-platform-weapp@4.2.1',
    '4.2.1',
    'node_modules/@tarojs/plugin-platform-weapp',
  ],
  ['@tarojs/webpack5-runner@4.2.1', '4.2.1', 'node_modules/@tarojs/webpack5-runner'],
  ['babel-preset-taro@4.2.1', '4.2.1', 'node_modules/babel-preset-taro'],
  ['react@18.2.0', '18.2.0', 'node_modules/react'],
  ['react-dom@18.2.0', '18.2.0', 'node_modules/react-dom'],
  ['lodash@4.17.21', '4.17.21', 'node_modules/lodash'],
]

test('parseList 解析 yarn list table 格式', () => {
  const rows = parseList(fs.readFileSync(writeList(LEGAL_ROWS), 'utf8'))
  assert.equal(rows.length, LEGAL_ROWS.length)
  assert.deepEqual(
    rows.filter((r) => r.name === 'react').map((r) => r.version),
    ['18.2.0']
  )
})

test('合法单套 Taro 4 + React 18 依赖树通过', () => {
  const errors = checkRuntime(
    parseList(fs.readFileSync(writeList(LEGAL_ROWS), 'utf8')),
    makeDist({ 'app.js': 'console.log(1)' })
  )
  assert.deepEqual(errors, [])
})

test('Taro 3 与 Taro 4 混装被拒绝', () => {
  const rows = LEGAL_ROWS.concat([
    ['@tarojs/taro@3.0.18', '3.0.18', 'node_modules/x/node_modules/@tarojs/taro'],
  ])
  const errors = checkRuntime(
    parseList(fs.readFileSync(writeList(rows), 'utf8')),
    makeDist({ 'app.js': 'x' })
  )
  assert.ok(errors.some((e) => /3\.0\.18/.test(e)), errors.join(';'))
})

test('双 React 实例被拒绝', () => {
  const rows = LEGAL_ROWS.concat([
    ['react@16.14.0', '16.14.0', 'node_modules/y/node_modules/react'],
  ])
  const errors = checkRuntime(
    parseList(fs.readFileSync(writeList(rows), 'utf8')),
    makeDist({ 'app.js': 'x' })
  )
  assert.ok(errors.some((e) => /react/.test(e) && /16\.14\.0/.test(e)), errors.join(';'))
})

test('产物中出现 Taro 3 runtime 标识被拒绝', () => {
  const errors = checkRuntime(
    parseList(fs.readFileSync(writeList(LEGAL_ROWS), 'utf8')),
    makeDist({
      'common.js': 'var v="Taro v3.0.18";',
      'pages/a/a.js': 'ok',
    })
  )
  assert.ok(errors.some((e) => /产物.*Taro 3|Taro 3.*标识/.test(e)), errors.join(';'))
})

test('依赖树缺少 Taro 核心包被拒绝', () => {
  const rows = [
    ['react@18.2.0', '18.2.0', 'node_modules/react'],
    ['react-dom@18.2.0', '18.2.0', 'node_modules/react-dom'],
  ]
  const errors = checkRuntime(
    parseList(fs.readFileSync(writeList(rows), 'utf8')),
    makeDist({ 'app.js': 'x' })
  )
  assert.ok(errors.some((e) => /@tarojs\/taro/.test(e)), errors.join(';'))
})

test('依赖树缺少 react 或 react-dom 被拒绝', () => {
  const rows = LEGAL_ROWS.filter((r) => !r[0].startsWith('react-dom@'))
  const errors = checkRuntime(
    parseList(fs.readFileSync(writeList(rows), 'utf8')),
    makeDist({ 'app.js': 'x' })
  )
  assert.ok(errors.some((e) => /react-dom/.test(e)), errors.join(';'))
})
