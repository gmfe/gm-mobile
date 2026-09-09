// gm-mobile Taro 4 验证线：从 registry 拉取固定 8 包的元数据与 tarball
// 用法: node fetch_registry_closure.js --version 4.0.0-beta.0 --registry https://registry.npmjs.org/ --output <目录> [--dry-run]
// 退出码: 0 成功；1 失败或参数错误
const { spawnSync } = require('node:child_process')
const { writeFileSync, mkdirSync } = require('node:fs')
const path = require('node:path')

const PUBLISH_PACKAGES = [
  'c-font',
  'c-tool',
  'locales',
  'c-react',
  'c-business',
  'mp',
  'mp-business',
  'mp-request',
]

function defaultExecFn(args) {
  const result = spawnSync('npm', args, { encoding: 'utf8' })
  if (result.error) {
    return { status: 1, stdout: '', stderr: `npm 执行失败: ${result.error.message}` }
  }
  return { status: result.status, stdout: result.stdout || '', stderr: result.stderr || '' }
}

function fetchClosure({ version, registry, output, execFn }) {
  if (!version) throw new Error('--version 必填')
  if (!registry) throw new Error('--registry 必填')
  if (!output) throw new Error('--output 必填')
  const run = execFn || defaultExecFn
  const metadataDir = path.join(output, 'metadata')
  const tarballsDir = path.join(output, 'tarballs')
  const packDir = path.join(output, 'pack')
  mkdirSync(metadataDir, { recursive: true })
  mkdirSync(tarballsDir, { recursive: true })
  mkdirSync(packDir, { recursive: true })

  const calls = []
  for (const shortName of PUBLISH_PACKAGES) {
    const spec = `@gm-mobile/${shortName}@${version}`
    const viewArgs = ['view', spec, '--registry', registry, '--json']
    calls.push(viewArgs)
    const viewResult = run(viewArgs)
    if (viewResult.status !== 0) {
      throw new Error(`npm view ${spec} 失败: ${viewResult.stderr || viewResult.stdout}`)
    }
    try {
      JSON.parse(viewResult.stdout)
    } catch (error) {
      throw new Error(`npm view ${spec} 输出非法 JSON: ${error.message}`)
    }
    writeFileSync(path.join(metadataDir, `${shortName}.json`), viewResult.stdout)

    const packArgs = ['pack', spec, '--registry', registry, '--pack-destination', tarballsDir, '--json']
    calls.push(packArgs)
    const packResult = run(packArgs)
    if (packResult.status !== 0) {
      throw new Error(`npm pack ${spec} 失败: ${packResult.stderr || packResult.stdout}`)
    }
    let packJson
    try {
      packJson = JSON.parse(packResult.stdout)
    } catch (error) {
      throw new Error(`npm pack ${spec} 输出非法 JSON: ${error.message}`)
    }
    const rows = Array.isArray(packJson) ? packJson : [packJson]
    const filename = rows.length > 0 && rows[0] && rows[0].filename
    if (!filename) {
      throw new Error(`npm pack ${spec} 未返回 filename: ${packResult.stdout}`)
    }
    writeFileSync(
      path.join(packDir, `${shortName}.pack.json`),
      JSON.stringify({ spec, filename, tarball: path.join(tarballsDir, filename) }, null, 2) + '\n'
    )
  }
  return { calls, metadataDir, tarballsDir, packDir }
}

function parseArgs(argv) {
  const options = {}
  const known = ['--version', '--registry', '--output']
  for (let i = 0; i < argv.length; i += 2) {
    const name = argv[i]
    const value = argv[i + 1]
    if (name === '--dry-run') {
      options.dryRun = true
      i -= 1
      continue
    }
    if (!known.includes(name) || value === undefined) {
      throw new Error(usage())
    }
    options[name.slice(2).replace(/-([a-z])/g, (m, c) => c.toUpperCase())] = value
  }
  if (!options.version || !options.registry || !options.output) throw new Error(usage())
  return options
}

function usage() {
  return '用法: fetch_registry_closure.js --version 4.0.0-beta.0 --registry https://registry.npmjs.org/ --output <目录> [--dry-run]'
}

function main(argv) {
  const options = parseArgs(argv)
  if (options.dryRun) {
    // dry-run: 仅打印将执行的命令，不访问网络
    for (const shortName of PUBLISH_PACKAGES) {
      process.stdout.write(
        `[fetch_registry_closure] dry-run npm view @gm-mobile/${shortName}@${options.version} / npm pack @gm-mobile/${shortName}@${options.version}\n`
      )
    }
    return
  }
  const { calls } = fetchClosure(options)
  process.stdout.write(
    `[fetch_registry_closure] 已拉取 ${PUBLISH_PACKAGES.length} 个包（${calls.length} 条命令）到 ${options.output}\n`
  )
}

if (require.main === module) {
  try {
    main(process.argv.slice(2))
  } catch (error) {
    process.stderr.write(`[fetch_registry_closure] ${error.message}\n`)
    process.exitCode = 1
  }
}

module.exports = { PUBLISH_PACKAGES, fetchClosure, parseArgs }
