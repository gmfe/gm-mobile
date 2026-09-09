const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { execFileSync, spawnSync } = require('node:child_process')
const { createHash } = require('node:crypto')

const { mapTarballName, verify } = require('./verify_publish_closure')

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
const INTERNAL_DEPS = {
  'c-font': {},
  'c-tool': {},
  locales: {},
  'c-react': { '@gm-mobile/c-font': VERSION, '@gm-mobile/c-tool': VERSION },
  'c-business': { '@gm-mobile/c-react': VERSION },
  mp: { '@gm-mobile/c-react': VERSION, '@gm-mobile/locales': VERSION },
  'mp-business': { '@gm-mobile/c-business': VERSION },
  'mp-request': { '@gm-mobile/c-tool': VERSION, '@gm-mobile/mp': VERSION },
}
const REACT_PACKAGES = ['c-tool', 'c-react', 'mp']
const TARO_PACKAGES = ['c-react', 'mp']

function tmpDir(prefix) {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix))
}

function basePackageJson(shortName, version) {
  const name = `@gm-mobile/${shortName}`
  const manifest = {
    name,
    version,
    main: 'src/index.js',
    types: 'src/index.js',
    dependencies: {},
    peerDependencies: {},
  }
  const internal = INTERNAL_DEPS[shortName] || {}
  for (const [dep, range] of Object.entries(internal)) {
    manifest.dependencies[dep] = range
  }
  if (REACT_PACKAGES.includes(shortName)) {
    manifest.peerDependencies.react = '^18.2.0'
  }
  if (TARO_PACKAGES.includes(shortName)) {
    manifest.peerDependencies['@tarojs/taro'] = '4.2.1'
  }
  return manifest
}

// 构造最小 fixture tarball: package/package.json + package/src/index.js
function makeTarball(dir, shortName, version, options = {}) {
  const buildDir = tmpDir('vpc-build-')
  const pkgDir = path.join(buildDir, 'package')
  fs.mkdirSync(path.join(pkgDir, 'src'), { recursive: true })
  const manifest = options.manifest || basePackageJson(shortName, version)
  fs.writeFileSync(path.join(pkgDir, 'package.json'), JSON.stringify(manifest, null, 2))
  fs.writeFileSync(path.join(pkgDir, 'src', 'index.js'), `module.exports = '${shortName}'`)
  for (const [rel, content] of Object.entries(options.files || {})) {
    const target = path.join(pkgDir, rel)
    fs.mkdirSync(path.dirname(target), { recursive: true })
    fs.writeFileSync(target, content)
  }
  const file = path.join(dir, `gm-mobile-${shortName}-${version}.tgz`)
  execFileSync('tar', ['-czf', file, '-C', buildDir, 'package'])
  fs.rmSync(buildDir, { recursive: true, force: true })
  return file
}

function buildLegalPackDir() {
  const dir = tmpDir('vpc-pack-')
  for (const shortName of PACKAGES) makeTarball(dir, shortName, VERSION)
  return dir
}

function buildMetadataDir(packDir) {
  const dir = tmpDir('vpc-meta-')
  for (const file of fs.readdirSync(packDir)) {
    if (!file.endsWith('.tgz')) continue
    const shortName = mapTarballName(file, VERSION)
    const tgz = path.join(packDir, file)
    const integrity =
      'sha512-' + createHash('sha512').update(fs.readFileSync(tgz)).digest('base64')
    fs.writeFileSync(
      path.join(dir, `${shortName}.json`),
      JSON.stringify({ name: `@gm-mobile/${shortName}`, dist: { integrity } })
    )
  }
  return dir
}

function runVerify(packDir, metadataDir) {
  return verify({
    root: tmpDir('vpc-root-'),
    version: VERSION,
    packDir,
    metadataDir,
  })
}

test('mapTarballName 识别 npm pack 命名', () => {
  assert.equal(mapTarballName(`gm-mobile-c-react-${VERSION}.tgz`, VERSION), 'c-react')
  assert.equal(mapTarballName(`c-tool-${VERSION}.tgz`, VERSION), 'c-tool')
  assert.equal(mapTarballName('gm-mobile-c-qrcode-1.0.0.tgz', VERSION), null)
  assert.equal(mapTarballName('random.tgz', VERSION), null)
})

test('合法 8 包 tarball + 完整 metadata 通过', () => {
  const packDir = buildLegalPackDir()
  const errors = runVerify(packDir, buildMetadataDir(packDir))
  assert.deepEqual(errors, [])
})

test('少包被拒绝', () => {
  const packDir = buildLegalPackDir()
  fs.rmSync(path.join(packDir, `gm-mobile-mp-${VERSION}.tgz`))
  const errors = runVerify(packDir)
  assert.ok(errors.some((e) => /mp/.test(e) && /缺/.test(e)), errors.join(';'))
})

test('多包被拒绝', () => {
  const packDir = buildLegalPackDir()
  makeTarball(packDir, 'c-qrcode', '1.0.0')
  const errors = runVerify(packDir)
  assert.ok(
    errors.some((e) => /c-qrcode|闭包外/.test(e)),
    errors.join(';')
  )
})

test('版本不一致被拒绝', () => {
  const packDir = tmpDir('vpc-pack-')
  for (const shortName of PACKAGES) makeTarball(packDir, shortName, VERSION)
  makeTarball(packDir, 'c-font', '3.12.14-beta.0')
  fs.rmSync(path.join(packDir, `gm-mobile-c-font-${VERSION}.tgz`))
  const errors = runVerify(packDir)
  assert.ok(
    errors.some((e) => /c-font/.test(e) && /版本|3\.12\.14/.test(e)),
    errors.join(';')
  )
})

test('内部依赖带 ^ 被拒绝', () => {
  const packDir = tmpDir('vpc-pack-')
  for (const shortName of PACKAGES) makeTarball(packDir, shortName, VERSION)
  makeTarball(packDir, 'c-react', VERSION, {
    manifest: (() => {
      const m = basePackageJson('c-react', VERSION)
      m.dependencies['@gm-mobile/c-font'] = `^${VERSION}`
      return m
    })(),
  })
  const errors = runVerify(packDir)
  assert.ok(errors.some((e) => /\^|精确/.test(e)), errors.join(';'))
})

test('内部依赖为 3.x 版本被拒绝', () => {
  const packDir = tmpDir('vpc-pack-')
  for (const shortName of PACKAGES) makeTarball(packDir, shortName, VERSION)
  makeTarball(packDir, 'mp', VERSION, {
    manifest: (() => {
      const m = basePackageJson('mp', VERSION)
      m.dependencies['@gm-mobile/locales'] = '3.12.14-beta.0'
      return m
    })(),
  })
  const errors = runVerify(packDir)
  assert.ok(errors.some((e) => /3\.12\.14|精确/.test(e)), errors.join(';'))
})

test('React 出现在普通 dependencies 被拒绝', () => {
  const packDir = tmpDir('vpc-pack-')
  for (const shortName of PACKAGES) makeTarball(packDir, shortName, VERSION)
  makeTarball(packDir, 'c-tool', VERSION, {
    manifest: (() => {
      const m = basePackageJson('c-tool', VERSION)
      delete m.peerDependencies.react
      m.dependencies.react = '^18.2.0'
      return m
    })(),
  })
  const errors = runVerify(packDir)
  assert.ok(errors.some((e) => /react/.test(e)), errors.join(';'))
})

test('peerDependencies 版本错误被拒绝', () => {
  const packDir = tmpDir('vpc-pack-')
  for (const shortName of PACKAGES) makeTarball(packDir, shortName, VERSION)
  makeTarball(packDir, 'mp', VERSION, {
    manifest: (() => {
      const m = basePackageJson('mp', VERSION)
      m.peerDependencies.react = '^16.13.1'
      m.peerDependencies['@tarojs/taro'] = '3.0.18'
      return m
    })(),
  })
  const errors = runVerify(packDir)
  assert.ok(errors.some((e) => /16\.13\.1|3\.0\.18/.test(e)), errors.join(';'))
})

test('tarball 缺少 main/types 声明的入口文件被拒绝', () => {
  const packDir = tmpDir('vpc-pack-')
  for (const shortName of PACKAGES) makeTarball(packDir, shortName, VERSION)
  // 重打一个不含入口的包
  fs.rmSync(path.join(packDir, `gm-mobile-locales-${VERSION}.tgz`))
  const buildDir = tmpDir('vpc-build-')
  fs.mkdirSync(path.join(buildDir, 'package'))
  fs.writeFileSync(
    path.join(buildDir, 'package', 'package.json'),
    JSON.stringify(basePackageJson('locales', VERSION))
  )
  execFileSync('tar', [
    '-czf',
    path.join(packDir, `gm-mobile-locales-${VERSION}.tgz`),
    '-C',
    buildDir,
    'package',
  ])
  const errors = runVerify(packDir)
  assert.ok(
    errors.some((e) => /locales/.test(e) && /入口|src\/index\.js/.test(e)),
    errors.join(';')
  )
})

test('tarball 中出现 react 物理副本被拒绝', () => {
  const packDir = tmpDir('vpc-pack-')
  for (const shortName of PACKAGES) makeTarball(packDir, shortName, VERSION)
  makeTarball(packDir, 'mp-business', VERSION, {
    files: { 'node_modules/react/cjs/react.production.min.js': '/* react */' },
  })
  const errors = runVerify(packDir)
  assert.ok(
    errors.some((e) => /mp-business/.test(e) && /物理|react/.test(e)),
    errors.join(';')
  )
})

test('tarball 中出现 @tarojs/runtime 物理副本被拒绝', () => {
  const packDir = tmpDir('vpc-pack-')
  for (const shortName of PACKAGES) makeTarball(packDir, shortName, VERSION)
  makeTarball(packDir, 'c-business', VERSION, {
    files: { 'node_modules/@tarojs/runtime/dist/index.js': 'x' },
  })
  const errors = runVerify(packDir)
  assert.ok(errors.some((e) => /@tarojs\/runtime/.test(e)), errors.join(';'))
})

test('缺少 metadata 文件被拒绝', () => {
  const packDir = buildLegalPackDir()
  const metadataDir = buildMetadataDir(packDir)
  fs.rmSync(path.join(metadataDir, 'c-react.json'))
  const errors = runVerify(packDir, metadataDir)
  assert.ok(errors.some((e) => /c-react/.test(e) && /metadata/i.test(e)), errors.join(';'))
})

test('metadata 包名映射错误被拒绝', () => {
  const packDir = buildLegalPackDir()
  const metadataDir = buildMetadataDir(packDir)
  const file = path.join(metadataDir, 'c-tool.json')
  const data = JSON.parse(fs.readFileSync(file, 'utf8'))
  data.name = '@gm-mobile/c-qrcode'
  fs.writeFileSync(file, JSON.stringify(data))
  const errors = runVerify(packDir, metadataDir)
  assert.ok(errors.some((e) => /c-tool/.test(e) && /c-qrcode/.test(e)), errors.join(';'))
})

test('integrity 篡改被拒绝', () => {
  const packDir = buildLegalPackDir()
  const metadataDir = buildMetadataDir(packDir)
  const file = path.join(metadataDir, 'mp-request.json')
  const data = JSON.parse(fs.readFileSync(file, 'utf8'))
  data.dist.integrity =
    'sha512-' + createHash('sha512').update('tampered').digest('base64')
  fs.writeFileSync(file, JSON.stringify(data))
  const errors = runVerify(packDir, metadataDir)
  assert.ok(
    errors.some((e) => /mp-request/.test(e) && /integrity/i.test(e)),
    errors.join(';')
  )
})

test('CLI 参数缺失退出码非 0', () => {
  const script = path.join(__dirname, 'verify_publish_closure.js')
  const result = spawnSync(process.execPath, [script, '--root', os.tmpdir()], {
    encoding: 'utf8',
  })
  assert.notEqual(result.status, 0)
})

test('CLI 合法样例退出码 0', () => {
  const script = path.join(__dirname, 'verify_publish_closure.js')
  const packDir = buildLegalPackDir()
  const metadataDir = buildMetadataDir(packDir)
  const result = spawnSync(
    process.execPath,
    [
      script,
      '--root',
      os.tmpdir(),
      '--version',
      VERSION,
      '--pack-dir',
      packDir,
      '--metadata-dir',
      metadataDir,
    ],
    { encoding: 'utf8' }
  )
  assert.equal(result.status, 0, result.stderr)
})
