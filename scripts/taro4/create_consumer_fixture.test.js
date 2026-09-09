const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { execFileSync } = require('node:child_process')

const {
  collectPack,
  renderPackageJson,
  createFixture,
} = require('./create_consumer_fixture')

const VERSION = '4.0.0-beta.0'
const PACKAGES = [
  'c-font',
  'c-tool',
  'locales',
  'c-react',
  'c-business',
  'mp',
  'mp-business',
  'mp-request',
]

function tmpDir(prefix) {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix))
}

function makeTarball(dir, shortName, version) {
  const buildDir = tmpDir('ccf-build-')
  const pkgDir = path.join(buildDir, 'package')
  fs.mkdirSync(pkgDir, { recursive: true })
  fs.writeFileSync(
    path.join(pkgDir, 'package.json'),
    JSON.stringify({ name: `@gm-mobile/${shortName}`, version, main: 'src/index.js' })
  )
  const file = path.join(dir, `gm-mobile-${shortName}-${version}.tgz`)
  execFileSync('tar', ['-czf', file, '-C', buildDir, 'package'])
  fs.rmSync(buildDir, { recursive: true, force: true })
  return file
}

function buildPackDir(count = 8) {
  const dir = tmpDir('ccf-pack-')
  for (const shortName of PACKAGES.slice(0, count)) makeTarball(dir, shortName, VERSION)
  return dir
}

test('collectPack 只接受恰好 8 个 tarball', () => {
  assert.deepEqual(collectPack(buildPackDir(8)).map((p) => p.shortName), PACKAGES)
  assert.throws(() => collectPack(buildPackDir(7)), /8/)
  assert.throws(() => collectPack(buildPackDir(6)), /8/)
})

test('renderPackageJson(local) 使用 file: 指向 tarball', () => {
  const packDir = buildPackDir(8)
  const json = renderPackageJson({ source: 'local', packDir })
  assert.equal(json.dependencies['@gm-mobile/c-react'], `file:${path.join(packDir, `gm-mobile-c-react-${VERSION}.tgz`)}`)
  assert.equal(json.dependencies['@tarojs/taro'], '4.2.1')
  assert.equal(json.dependencies['@tarojs/cli'], '4.2.1')
  assert.equal(json.dependencies['@tarojs/components'], '4.2.1')
  assert.equal(json.dependencies['@tarojs/react'], '4.2.1')
  assert.equal(json.dependencies['@tarojs/runtime'], '4.2.1')
  assert.equal(json.dependencies['@tarojs/plugin-framework-react'], '4.2.1')
  assert.equal(json.dependencies['@tarojs/plugin-platform-weapp'], '4.2.1')
  assert.equal(json.dependencies['@tarojs/webpack5-runner'], '4.2.1')
  assert.equal(json.dependencies['babel-preset-taro'], '4.2.1')
  assert.equal(json.dependencies.react, '18.2.0')
  assert.equal(json.dependencies['react-dom'], '18.2.0')
  assert.equal(json.dependencies.typescript, '5.1.6')
  assert.equal(json.dependencies.webpack, '5.91.0')
  assert.equal(json.dependencies.less, '4.9.1')
})

test('renderPackageJson(registry) 使用精确版本而非 file:', () => {
  const json = renderPackageJson({
    source: 'registry',
    version: VERSION,
    registry: 'https://registry.example.com/',
  })
  assert.equal(json.dependencies['@gm-mobile/mp'], VERSION)
  assert.ok(!JSON.stringify(json.dependencies).includes('file:'))
})

test('createFixture 生成文件齐全且内容含精确版本', () => {
  const packDir = buildPackDir(8)
  const output = tmpDir('ccf-out-')
  const files = createFixture({ source: 'local', packDir, output })
  const expected = [
    'package.json',
    path.join('config', 'index.js'),
    'babel.config.js',
    path.join('src', 'app.tsx'),
    path.join('src', 'app.config.js'),
    path.join('src', 'pages', 'index', 'index.tsx'),
    'project.config.json',
  ]
  for (const rel of expected) {
    assert.ok(fs.existsSync(path.join(output, rel)), `缺少文件 ${rel}`)
    assert.ok(files.includes(rel), `返回列表缺少 ${rel}`)
  }
  const pkg = JSON.parse(fs.readFileSync(path.join(output, 'package.json'), 'utf8'))
  assert.equal(pkg.dependencies['@tarojs/taro'], '4.2.1')
  assert.equal(pkg.dependencies.webpack, '5.91.0')
  const config = fs.readFileSync(path.join(output, 'config', 'index.js'), 'utf8')
  assert.match(config, /webpack5/)
  assert.match(config, /prebundle[\s\S]*enable:\s*false/)
  assert.match(config, /framework:\s*'react'/)
  assert.match(config, /sourceRoot:\s*'src'/)
  assert.match(config, /outputRoot:\s*'dist'/)
  const babel = fs.readFileSync(path.join(output, 'babel.config.js'), 'utf8')
  assert.match(babel, /babel-preset-taro/)
  assert.match(babel, /framework:\s*'react'/)
  const appConfig = fs.readFileSync(path.join(output, 'src', 'app.config.js'), 'utf8')
  assert.match(appConfig, /pages\/index\/index/)
  const page = fs.readFileSync(path.join(output, 'src', 'pages', 'index', 'index.tsx'), 'utf8')
  assert.match(page, /@gm-mobile\/c-react/)
  assert.match(page, /<Button>ok<\/Button>/)
  const project = JSON.parse(fs.readFileSync(path.join(output, 'project.config.json'), 'utf8'))
  assert.equal(project.compileType, 'miniprogram')
})

test('pack-dir 少于 8 个 tarball 时 createFixture 失败', () => {
  assert.throws(
    () => createFixture({ source: 'local', packDir: buildPackDir(7), output: tmpDir('ccf-x-') }),
    /8/
  )
})

test('source=registry 缺少 version/registry 失败', () => {
  assert.throws(() => createFixture({ source: 'registry', output: tmpDir('ccf-x-') }), /registry|version/i)
})
