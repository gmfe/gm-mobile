const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')

const { PUBLISH_PACKAGES, fetchClosure } = require('./fetch_registry_closure')

const VERSION = '4.0.0-beta.0'
const REGISTRY = 'https://registry.npmjs.org/'

function tmpDir(prefix) {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix))
}

function fakeExecFailOnNone() {
  const calls = []
  return {
    calls,
    execFn(args) {
      calls.push(args.slice())
      if (args[0] === 'view') {
        return { status: 0, stdout: JSON.stringify({ name: args[1] }), stderr: '' }
      }
      if (args[0] === 'pack') {
        const name = args[1]
        const shortName = name.slice('@gm-mobile/'.length).split('@')[0]
        return {
          status: 0,
          stdout: JSON.stringify([{ filename: `gm-mobile-${shortName}-${VERSION}.tgz` }]),
          stderr: '',
        }
      }
      return { status: 1, stdout: '', stderr: `unknown command ${args[0]}` }
    },
  }
}

test('PUBLISH_PACKAGES 为固定 8 包拓扑序', () => {
  assert.deepEqual(PUBLISH_PACKAGES, [
    'c-font',
    'c-tool',
    'locales',
    'c-react',
    'c-business',
    'mp',
    'mp-business',
    'mp-request',
  ])
})

test('fetchClosure 按固定顺序执行 view + pack 并落盘', () => {
  const output = tmpDir('frc-out-')
  const fake = fakeExecFailOnNone()
  const { calls } = fetchClosure({
    version: VERSION,
    registry: REGISTRY,
    output,
    execFn: fake.execFn,
  })
  assert.equal(calls.length, 16)
  assert.equal(calls[0][0], 'view')
  assert.equal(calls[0][1], `@gm-mobile/c-font@${VERSION}`)
  assert.ok(calls[0].includes('--registry') && calls[0].includes(REGISTRY))
  assert.equal(calls[1][0], 'pack')
  assert.equal(calls[1][1], `@gm-mobile/c-font@${VERSION}`)
  const lastView = calls[14]
  assert.equal(lastView[1], `@gm-mobile/mp-request@${VERSION}`)

  for (const shortName of PUBLISH_PACKAGES) {
    const metadataFile = path.join(output, 'metadata', `${shortName}.json`)
    const packFile = path.join(output, 'pack', `${shortName}.pack.json`)
    assert.ok(fs.existsSync(metadataFile), `缺少 ${metadataFile}`)
    assert.ok(fs.existsSync(packFile), `缺少 ${packFile}`)
    const metadata = JSON.parse(fs.readFileSync(metadataFile, 'utf8'))
    assert.equal(metadata.name, `@gm-mobile/${shortName}@${VERSION}`)
    const pack = JSON.parse(fs.readFileSync(packFile, 'utf8'))
    assert.equal(pack.spec, `@gm-mobile/${shortName}@${VERSION}`)
    assert.equal(pack.filename, `gm-mobile-${shortName}-${VERSION}.tgz`)
  }
})

test('任一命令失败立即停止且 exit 非零', () => {
  const output = tmpDir('frc-out-')
  let count = 0
  let thrown
  try {
    fetchClosure({
      version: VERSION,
      registry: REGISTRY,
      output,
      execFn(args) {
        count += 1
        if (count === 3) {
          return { status: 1, stdout: '', stderr: 'E404 not found' }
        }
        if (args[0] === 'view') {
          return { status: 0, stdout: '{}', stderr: '' }
        }
        const shortName = args[1].slice('@gm-mobile/'.length).split('@')[0]
        return {
          status: 0,
          stdout: JSON.stringify([{ filename: `gm-mobile-${shortName}-${VERSION}.tgz` }]),
          stderr: '',
        }
      },
    })
  } catch (error) {
    thrown = error
  }
  assert.ok(thrown, '应当抛出异常')
  assert.match(thrown.message, /E404/)
  assert.equal(count, 3)
  // 第三个命令(view mp? 顺序: c-font view, c-font pack, c-tool view)失败后不再执行
  assert.ok(!fs.existsSync(path.join(output, 'pack', 'locales.pack.json')))
})

test('pack 输出非法 JSON 时失败', () => {
  const output = tmpDir('frc-out-')
  assert.throws(
    () =>
      fetchClosure({
        version: VERSION,
        registry: REGISTRY,
        output,
        execFn() {
          return { status: 0, stdout: 'not-json', stderr: '' }
        },
      }),
    /JSON|pack/i
  )
})

test('注入执行器即可运行，无需真实 npm', () => {
  const output = tmpDir('frc-out-')
  const fake = fakeExecFailOnNone()
  fetchClosure({
    version: VERSION,
    registry: REGISTRY,
    output,
    execFn: fake.execFn,
  })
  assert.ok(fs.existsSync(path.join(output, 'metadata', 'c-font.json')))
  assert.ok(fs.existsSync(path.join(output, 'pack', 'c-font.pack.json')))
})
