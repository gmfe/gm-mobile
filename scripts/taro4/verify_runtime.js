// gm-mobile Taro 4 验证线：依赖树与产物单实例门禁
// 用法: node verify_runtime.js --list <yarn-list-json> --dist <目录>
// 退出码: 0 通过；1 存在违规
const { readFileSync, readdirSync, statSync } = require('node:fs')
const path = require('node:path')

const TARO_CORE = [
  '@tarojs/taro',
  '@tarojs/runtime',
  '@tarojs/react',
  '@tarojs/components',
  '@tarojs/cli',
  '@tarojs/plugin-framework-react',
  '@tarojs/plugin-platform-weapp',
  '@tarojs/webpack5-runner',
  'babel-preset-taro',
]
const TARO_EXPECTED = '4.2.1'
const REACT_EXPECTED = '18.2.0'
const REACT_CORE = ['react', 'react-dom']
const TARO3_MARKERS = /Taro 3\.\d+\.\d+|Taro v3/i
const SCANNABLE = /\.(js|json|wxss)$/

function parseList(text) {
  const rows = []
  for (const line of text.split('\n').filter((l) => l.trim())) {
    let parsed
    try {
      parsed = JSON.parse(line)
    } catch (error) {
      throw new Error(`yarn list JSON 行解析失败: ${error.message}`)
    }
    if (parsed.type === 'table' && parsed.data && Array.isArray(parsed.data.body)) {
      for (const row of parsed.data.body) {
        if (Array.isArray(row) && row.length >= 2) {
          const first = String(row[0])
          const at = first.lastIndexOf('@')
          if (at > 0) {
            rows.push({ name: first.slice(0, at), version: first.slice(at + 1) })
          } else {
            rows.push({ name: first, version: String(row[1]) })
          }
        }
      }
    } else if (parsed.type === 'tree' && Array.isArray(parsed.data && parsed.data.trees)) {
      for (const node of parsed.data.trees) {
        const at = String(node.name || '').lastIndexOf('@')
        if (at > 0) {
          rows.push({
            name: String(node.name).slice(0, at),
            version: String(node.name).slice(at + 1),
          })
        }
      }
    }
  }
  return rows
}

function scanDistForTaro3(distDir) {
  const hits = []
  const walk = (dir) => {
    for (const entry of readdirSync(dir)) {
      const full = path.join(dir, entry)
      let stats
      try {
        stats = statSync(full)
      } catch (error) {
        continue
      }
      if (stats.isSymbolicLink()) continue
      if (stats.isDirectory()) {
        walk(full)
      } else if (SCANNABLE.test(entry) && stats.size < 64 * 1024 * 1024) {
        const content = readFileSync(full, 'utf8')
        if (TARO3_MARKERS.test(content)) {
          hits.push(path.relative(distDir, full))
        }
      }
    }
  }
  walk(distDir)
  return hits
}

function checkRuntime(rows, distDir) {
  const errors = []
  const byName = new Map()
  for (const row of rows) {
    if (!byName.has(row.name)) byName.set(row.name, new Set())
    byName.get(row.name).add(row.version)
  }

  for (const name of TARO_CORE) {
    const versions = byName.get(name)
    if (!versions) {
      errors.push(`依赖树缺少 Taro 核心包 ${name}`)
      continue
    }
    for (const version of versions) {
      if (version !== TARO_EXPECTED) {
        errors.push(`${name} 版本必须全为 ${TARO_EXPECTED}，发现 ${version}`)
      }
    }
  }
  for (const name of REACT_CORE) {
    const versions = byName.get(name)
    if (!versions) {
      errors.push(`依赖树缺少 ${name}`)
      continue
    }
    for (const version of versions) {
      if (version !== REACT_EXPECTED) {
        errors.push(`${name} 版本必须全为 ${REACT_EXPECTED}，发现 ${version}`)
      }
    }
  }

  if (!distDir) {
    errors.push('--dist 目录必填')
  } else {
    let stats
    try {
      stats = statSync(distDir)
    } catch (error) {
      stats = null
    }
    if (!stats || !stats.isDirectory()) {
      errors.push(`--dist 目录不存在: ${distDir}`)
    } else {
      const hits = scanDistForTaro3(distDir)
      if (hits.length > 0) {
        errors.push(`产物中发现 Taro 3 标识，共 ${hits.length} 个文件: ${hits.join(', ')}`)
      }
    }
  }
  return errors
}

function main(argv) {
  const options = {}
  for (let i = 0; i < argv.length; i += 2) {
    const name = argv[i]
    const value = argv[i + 1]
    if (!['--list', '--dist'].includes(name) || value === undefined) {
      throw new Error('用法: verify_runtime.js --list <yarn-list-json> --dist <目录>')
    }
    options[name.slice(2)] = value
  }
  if (!options.list || !options.dist) {
    throw new Error('用法: verify_runtime.js --list <yarn-list-json> --dist <目录>')
  }
  const rows = parseList(readFileSync(options.list, 'utf8'))
  const errors = checkRuntime(rows, options.dist)
  if (errors.length > 0) {
    process.stderr.write(errors.map((e) => `[verify_runtime] ${e}`).join('\n') + '\n')
    process.exitCode = 1
    return
  }
  process.stdout.write(
    `[verify_runtime] 通过: Taro 全套 ${TARO_EXPECTED}，React/ReactDOM ${REACT_EXPECTED}，产物无 Taro 3 标识\n`
  )
}

if (require.main === module) {
  try {
    main(process.argv.slice(2))
  } catch (error) {
    process.stderr.write(`[verify_runtime] ${error.message}\n`)
    process.exitCode = 1
  }
}

module.exports = { parseList, checkRuntime }
