// gm-mobile Taro 4 验证线：8 包统一发布闭包门禁
// 用法: node verify_publish_closure.js --root <仓库根> --version 4.0.0-beta.0 --pack-dir <tarball目录> [--metadata-dir <npm view元数据目录>]
// 退出码: 0 通过；1 存在违规或参数错误
const { spawnSync } = require('node:child_process')
const { createHash } = require('node:crypto')
const {
  readFileSync,
  readdirSync,
  mkdirSync,
  mkdtempSync,
  rmSync,
  existsSync,
  statSync,
} = require('node:fs')
const os = require('node:os')
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
const SCOPE = '@gm-mobile/'
// 闭包外的已知包，出现 tarball 即违规
const EXTERNAL_PACKAGES = [
  'swiper',
  'business',
  'c-service-time',
  'c-qrcode',
  'c-cookie',
]
const REACT_PEER = '^18.2.0'
const TARO_PEER = '4.2.1'
// React/Taro 运行时只允许出现在 peerDependencies
const PEER_ONLY = ['react', 'react-dom', '@tarojs/taro', '@tarojs/runtime']
const EXPECTED_PEER = {
  react: REACT_PEER,
  'react-dom': REACT_PEER,
  '@tarojs/taro': TARO_PEER,
  '@tarojs/runtime': TARO_PEER,
}
const DEP_SECTIONS = ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies']
const VERSION_RE = /-(\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?)$/

// npm pack 命名: gm-mobile-<short>-<version>.tgz（scope 分隔符被替换为 -）
function mapTarballName(filename, version) {
  if (!filename.endsWith('.tgz')) return null
  let base = filename.slice(0, -4)
  const matched = base.match(VERSION_RE)
  if (!matched) return null
  if (version && matched[1] !== version) return null
  base = base.slice(0, base.length - matched[0].length)
  if (base.startsWith('gm-mobile-')) base = base.slice('gm-mobile-'.length)
  return PUBLISH_PACKAGES.includes(base) ? base : null
}

function extractTarball(tgzPath, destDir) {
  mkdirSync(destDir, { recursive: true })
  const result = spawnSync('tar', ['-xzf', tgzPath, '-C', destDir], { encoding: 'utf8' })
  if (result.error) throw new Error(`tar 执行失败(${tgzPath}): ${result.error.message}`)
  if (result.status !== 0) {
    throw new Error(
      `tar 解包失败(${path.basename(tgzPath)}): ${result.stderr || result.stdout}`
    )
  }
}

function listFiles(rootDir) {
  const files = []
  const walk = (dir) => {
    for (const entry of readdirSync(dir)) {
      const full = path.join(dir, entry)
      const stats = statSync(full)
      if (stats.isDirectory()) walk(full)
      else files.push(path.relative(rootDir, full).split(path.sep).join('/'))
    }
  }
  walk(rootDir)
  return files
}

function collectPackDir(packDir, version) {
  const errors = []
  const mapped = new Map()
  for (const entry of readdirSync(packDir)) {
    if (!entry.endsWith('.tgz')) continue
    const shortName = mapTarballName(entry, version)
    if (shortName) {
      mapped.set(shortName, path.join(packDir, entry))
      continue
    }
    let base = entry.slice(0, -4)
    const matched = base.match(VERSION_RE)
    if (matched) base = base.slice(0, base.length - matched[0].length)
    if (base.startsWith('gm-mobile-')) base = base.slice('gm-mobile-'.length)
    if (EXTERNAL_PACKAGES.includes(base)) {
      errors.push(`闭包外包 @gm-mobile/${base} 不得有 tarball: ${entry}`)
    } else {
      errors.push(`pack-dir 中存在无法映射到固定 8 包的 tarball: ${entry}`)
    }
  }
  for (const shortName of PUBLISH_PACKAGES) {
    if (!mapped.has(shortName)) errors.push(`pack-dir 缺少 ${shortName} 的 tarball`)
  }
  if (mapped.size !== PUBLISH_PACKAGES.length && errors.length === 0) {
    errors.push(`pack-dir 必须恰好包含 ${PUBLISH_PACKAGES.length} 个 tarball，实际 ${mapped.size} 个`)
  }
  return { errors, mapped }
}

function checkManifest(shortName, manifest, version, extractedFiles) {
  const errors = []
  const name = SCOPE + shortName
  if (manifest.name !== name) {
    errors.push(`${shortName}: package.json name 应为 ${name}，实际 ${manifest.name}`)
  }
  if (manifest.version !== version) {
    errors.push(`${shortName}: package.json version 应为 ${version}，实际 ${manifest.version}`)
  }
  for (const field of ['main', 'types']) {
    const entry = manifest[field]
    if (!entry || typeof entry !== 'string') continue
    const normalized = entry.split(path.sep).join('/').replace(/^\.\//, '')
    if (!extractedFiles.includes(`package/${normalized}`)) {
      errors.push(`${shortName}: ${field} 声明的入口 ${entry} 不在 tarball 中`)
    }
  }
  for (const section of DEP_SECTIONS) {
    const deps = manifest[section] || {}
    for (const [dep, range] of Object.entries(deps)) {
      if (!dep.startsWith(SCOPE)) continue
      const short = dep.slice(SCOPE.length)
      if (!PUBLISH_PACKAGES.includes(short)) continue
      if (range !== version) {
        errors.push(
          `${shortName}: 内部依赖 ${dep}（${section}）必须精确为 ${version}，实际 ${range}`
        )
      }
    }
  }
  for (const [pkg, expected] of Object.entries(EXPECTED_PEER)) {
    const inPeer = (manifest.peerDependencies || {})[pkg]
    if (inPeer !== undefined && inPeer !== expected) {
      errors.push(`${shortName}: ${pkg} peer 版本必须为 ${expected}，实际 ${inPeer}`)
    }
  }
  for (const section of DEP_SECTIONS) {
    if (section === 'peerDependencies') continue
    const deps = manifest[section] || {}
    for (const pkg of PEER_ONLY) {
      if (deps[pkg] !== undefined) {
        errors.push(
          `${shortName}: ${pkg} 只允许出现在 peerDependencies，禁止写入 ${section}（当前 ${deps[pkg]}）`
        )
      }
    }
  }
  const bundled = extractedFiles.filter((f) =>
    PEER_ONLY.some((pkg) => f.startsWith(`package/node_modules/${pkg}/`))
  )
  if (bundled.length > 0) {
    errors.push(
      `${shortName}: tarball 中出现 React/Taro 物理副本: ${bundled.slice(0, 5).join(', ')}`
    )
  }
  return errors
}

function checkMetadata(shortName, tgzPath, metadataPath, content) {
  const errors = []
  if (!existsSync(metadataPath)) {
    errors.push(`${shortName}: 缺少 metadata 文件 ${path.basename(metadataPath)}`)
    return errors
  }
  let metadata
  try {
    metadata = JSON.parse(readFileSync(metadataPath, 'utf8'))
  } catch (error) {
    errors.push(`${shortName}: metadata 解析失败: ${error.message}`)
    return errors
  }
  const expectedName = SCOPE + shortName
  if (metadata.name !== expectedName) {
    errors.push(
      `${shortName}: metadata 包名映射错误，期望 ${expectedName}，实际 ${metadata.name}`
    )
  }
  const sha512 = createHash('sha512').update(content).digest('base64')
  const sha256 = createHash('sha256').update(content).digest('hex')
  const integrity = metadata.dist && metadata.dist.integrity
  if (integrity !== `sha512-${sha512}`) {
    errors.push(
      `${shortName}: integrity 不匹配（tarball sha512=${sha512}，sha256=${sha256}，metadata=${integrity}）`
    )
  }
  return errors
}

function parseArgs(argv) {
  const options = {}
  const known = ['--root', '--version', '--pack-dir', '--metadata-dir']
  for (let i = 0; i < argv.length; i += 2) {
    const name = argv[i]
    const value = argv[i + 1]
    if (!known.includes(name) || value === undefined) {
      throw new Error(
        '用法: verify_publish_closure.js --root <仓库根> --version 4.0.0-beta.0 --pack-dir <tarball目录> [--metadata-dir <npm view元数据目录>]'
      )
    }
    options[name.slice(2).replace(/-([a-z])/g, (m, c) => c.toUpperCase())] = value
  }
  if (!options.root || !options.version || !options.packDir) {
    throw new Error(
      '用法: verify_publish_closure.js --root <仓库根> --version 4.0.0-beta.0 --pack-dir <tarball目录> [--metadata-dir <npm view元数据目录>]'
    )
  }
  return options
}

function verify({ root, version, packDir, metadataDir }) {
  const errors = []
  if (!root || !existsSync(root) || !statSync(root).isDirectory()) {
    return [`--root 目录不存在: ${root}`]
  }
  if (!packDir || !existsSync(packDir) || !statSync(packDir).isDirectory()) {
    return [`--pack-dir 目录不存在: ${packDir}`]
  }
  const { errors: packErrors, mapped } = collectPackDir(packDir, version)
  errors.push(...packErrors)

  const workDir = mkdtempSync(path.join(os.tmpdir(), 'vpc-extract-'))
  try {
    const metadataResults = []
    for (const shortName of PUBLISH_PACKAGES) {
      const tgzPath = mapped.get(shortName)
      if (!tgzPath) continue
      let content
      try {
        content = readFileSync(tgzPath)
      } catch (error) {
        errors.push(`${shortName}: tarball 读取失败: ${error.message}`)
        continue
      }
      const extractDir = path.join(workDir, shortName)
      try {
        extractTarball(tgzPath, extractDir)
      } catch (error) {
        errors.push(error.message)
        continue
      }
      const manifestPath = path.join(extractDir, 'package', 'package.json')
      if (!existsSync(manifestPath)) {
        errors.push(`${shortName}: tarball 中缺少 package/package.json`)
        continue
      }
      let manifest
      try {
        manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
      } catch (error) {
        errors.push(`${shortName}: package.json 解析失败: ${error.message}`)
        continue
      }
      errors.push(...checkManifest(shortName, manifest, version, listFiles(extractDir)))
      if (metadataDir) {
        metadataResults.push([
          shortName,
          tgzPath,
          path.join(metadataDir, `${shortName}.json`),
          content,
        ])
      }
    }
    if (metadataDir) {
      for (const [shortName, tgzPath, metadataPath, content] of metadataResults) {
        errors.push(...checkMetadata(shortName, tgzPath, metadataPath, content))
      }
    }
  } finally {
    rmSync(workDir, { recursive: true, force: true })
  }
  return errors
}

function main(argv) {
  const options = parseArgs(argv)
  const errors = verify(options)
  if (errors.length > 0) {
    process.stderr.write(errors.map((e) => `[verify_publish_closure] ${e}`).join('\n') + '\n')
    process.exitCode = 1
    return
  }
  process.stdout.write(
    `[verify_publish_closure] 通过: ${PUBLISH_PACKAGES.length} 个包 @ ${options.version} 闭包完整${
      options.metadataDir ? '，integrity 校验一致' : ''
    }\n`
  )
}

if (require.main === module) {
  try {
    main(process.argv.slice(2))
  } catch (error) {
    process.stderr.write(`[verify_publish_closure] ${error.message}\n`)
    process.exitCode = 1
  }
}

module.exports = { PUBLISH_PACKAGES, mapTarballName, verify, parseArgs }
