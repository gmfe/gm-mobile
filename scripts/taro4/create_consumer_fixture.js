// gm-mobile Taro 4 验证线：生成最小 Taro 4 消费项目（本地 tarball 或 registry 两种来源）
// 用法:
//   node create_consumer_fixture.js --source local --pack-dir <tarball目录> --output <目录>
//   node create_consumer_fixture.js --source registry --version 4.0.0-beta.0 --registry <url> --output <目录>
// 退出码: 0 成功；1 失败或参数错误
const { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync, statSync } = require('node:fs')
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
const VERSION_RE = /-(\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?)$/

const TARO_VERSION = '4.2.1'
const REACT_VERSION = '18.2.0'
const TYPESCRIPT_VERSION = '5.1.6'
const WEBPACK_VERSION = '5.91.0'
const LESS_VERSION = '4.9.1'
const TARO_DEPS = [
  '@tarojs/cli',
  '@tarojs/components',
  '@tarojs/react',
  '@tarojs/runtime',
  '@tarojs/taro',
  '@tarojs/plugin-framework-react',
  '@tarojs/plugin-platform-weapp',
  '@tarojs/webpack5-runner',
  'babel-preset-taro',
]

// pack 目录 -> [{ shortName, file, version }]
function collectPack(packDir) {
  if (!packDir || !existsSync(packDir) || !statSync(packDir).isDirectory()) {
    throw new Error(`--pack-dir 目录不存在: ${packDir}`)
  }
  const mapped = new Map()
  for (const entry of readdirSync(packDir)) {
    if (!entry.endsWith('.tgz')) continue
    const matched = entry.slice(0, -4).match(VERSION_RE)
    if (!matched) continue
    const noExt = entry.slice(0, -4)
    let base = noExt.slice(0, noExt.length - matched[0].length)
    if (base.startsWith('gm-mobile-')) base = base.slice('gm-mobile-'.length)
    if (PUBLISH_PACKAGES.includes(base)) {
      mapped.set(base, { shortName: base, file: path.resolve(packDir, entry), version: matched[1] })
    }
  }
  if (mapped.size !== PUBLISH_PACKAGES.length) {
    const missing = PUBLISH_PACKAGES.filter((name) => !mapped.has(name))
    throw new Error(
      `pack-dir 必须恰好包含 ${PUBLISH_PACKAGES.length} 个固定 8 包 tarball，缺少: ${missing.join(', ')}（当前 ${mapped.size} 个）`
    )
  }
  return PUBLISH_PACKAGES.map((name) => mapped.get(name))
}

function renderPackageJson({ source, packDir, version, registry }) {
  const dependencies = {}
  const resolutions = {}
  if (source === 'local') {
    for (const { shortName, file } of collectPack(packDir)) {
      dependencies[SCOPE + shortName] = `file:${file}`
      // tarball 内部互相依赖精确版本，需 resolutions 强制映射到本地 tarball
      resolutions[SCOPE + shortName] = `file:${file}`
    }
  } else {
    if (!version) throw new Error('source=registry 需要 --version')
    if (!registry) throw new Error('source=registry 需要 --registry')
    for (const shortName of PUBLISH_PACKAGES) {
      dependencies[SCOPE + shortName] = version
    }
  }
  for (const dep of TARO_DEPS) {
    dependencies[dep] = TARO_VERSION
  }
  dependencies['@babel/preset-react'] = '7.12.7'
  dependencies['@types/react'] = '18.2.79'
  // @gm-mobile 各包 peer 依赖（源码直接 import，消费方必须安装）
  dependencies.classnames = '2.2.6'
  dependencies.lodash = '4.17.20'
  dependencies.moment = '2.29.1'
  dependencies['prop-types'] = '15.7.2'
  dependencies['big.js'] = '6.0.3'
  dependencies.dayjs = '1.11.4'
  dependencies.mobx = '6.0.4'
  dependencies['mobx-react'] = '7.0.5'
  dependencies['@types/wechat-miniprogram'] = '3.1.0'
  dependencies['@types/react-dom'] = '18.2.25'
  dependencies.react = REACT_VERSION
  dependencies['react-dom'] = REACT_VERSION
  dependencies.typescript = TYPESCRIPT_VERSION
  dependencies.webpack = WEBPACK_VERSION
  dependencies.less = LESS_VERSION
  return {
    name: 'taro4-consumer-fixture',
    version: '1.0.0',
    private: true,
    template: 'taro4-consumer-fixture',
    scripts: {
      build: 'taro build --type weapp',
      typecheck: 'tsc --noEmit',
    },
    dependencies,
    resolutions,
  }
}

function renderConfig() {
  return `const path = require('path')

const config = {
  projectName: 'taro4-consumer-fixture',
  date: '2026-1-1',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {},
  copy: {
    patterns: [],
    options: {},
  },
  framework: 'react',
  compiler: {
    type: 'webpack5',
    prebundle: {
      enable: false,
    },
  },
  mini: {
    // @gm-mobile 包以 TS 源码发布，需 include 进 babel 编译
    compile: {
      include: [(modulePath) => modulePath.includes('@gm-mobile')],
    },
  },
  h5: {},
}

module.exports = config
`
}

function renderTsConfig() {
  return `{
  "compilerOptions": {
    "target": "es2017",
    "module": "commonjs",
    "moduleResolution": "node",
    "jsx": "react",
    "strict": false,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "noEmit": true,
    "types": ["wechat-miniprogram"]
  },
  "include": ["src", "global.d.ts"]
}
`
}

function renderBabelConfig() {
  return `module.exports = {
  presets: [
    [
      'babel-preset-taro',
      {
        framework: 'react',
        ts: true,
      },
    ],
  ],
}
`
}

function renderAppConfig() {
  return `export default defineAppConfig({
  pages: ['pages/index/index'],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'Taro4',
    navigationBarTextStyle: 'black',
  },
})
`
}

function renderApp() {
  return `import { Component, PropsWithChildren } from 'react'
import './app.less'

class App extends Component<PropsWithChildren> {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return this.props.children
  }
}

export default App
`
}

function renderGlobalDts() {
  return `declare module '*.png' {
  const content: string
  export default content
}

declare module '*.gif' {
  const content: string
  export default content
}

// 最小 process 声明：@gm-mobile 源码仅在 env 读取使用 process，
// 不引入 @types/node（其 setTimeout 返回 Timeout 与源码 number 字段冲突）
declare const process: {
  env: Record<string, string | undefined>
}
`
}

function renderAppLess() {
  return `page {
  background: #fff;
}
`
}

function renderIndexPage() {
  return `import React from 'react'
import { View } from '@tarojs/components'
import { Button } from '@gm-mobile/c-react'

export default function Index() {
  return (
    <View className='index'>
      <Button>ok</Button>
    </View>
  )
}
`
}

function renderIndexConfig() {
  return `export default definePageConfig({
  navigationBarTitleText: 'Taro4',
})
`
}

function renderProjectConfig() {
  return JSON.stringify(
    {
      miniprogramRoot: 'dist/',
      projectname: 'taro4-consumer-fixture',
      appid: 'touristappid',
      setting: {
        es6: false,
        minified: false,
      },
      compileType: 'miniprogram',
      libVersion: '3.0.0',
    },
    null,
    2
  )
}

function createFixture(options) {
  if (!options || !options.output) throw new Error('--output 必填')
  if (options.source !== 'local' && options.source !== 'registry') {
    throw new Error("--source 只支持 'local' 或 'registry'")
  }
  const packageJson = renderPackageJson(options)
  const files = {
    'package.json': JSON.stringify(packageJson, null, 2) + '\n',
    'tsconfig.json': renderTsConfig(),
    'config/index.js': renderConfig(),
    'babel.config.js': renderBabelConfig(),
    'src/app.tsx': renderApp(),
    'global.d.ts': renderGlobalDts(),
    'src/app.config.js': renderAppConfig(),
    'src/app.less': renderAppLess(),
    'src/pages/index/index.tsx': renderIndexPage(),
    'src/pages/index/index.config.js': renderIndexConfig(),
    'project.config.json': renderProjectConfig(),
  }
  mkdirSync(options.output, { recursive: true })
  for (const [rel, content] of Object.entries(files)) {
    const target = path.join(options.output, rel)
    mkdirSync(path.dirname(target), { recursive: true })
    writeFileSync(target, content)
  }
  return Object.keys(files)
}

function parseArgs(argv) {
  const options = {}
  const known = ['--source', '--pack-dir', '--output', '--version', '--registry']
  for (let i = 0; i < argv.length; i += 2) {
    const name = argv[i]
    const value = argv[i + 1]
    if (!known.includes(name) || value === undefined) {
      throw new Error(usage())
    }
    options[name.slice(2).replace(/-([a-z])/g, (m, c) => c.toUpperCase())] = value
  }
  if (!options.source || !options.output) throw new Error(usage())
  return options
}

function usage() {
  return (
    '用法: create_consumer_fixture.js --source local --pack-dir <tarball目录> --output <目录>' +
    ' 或 --source registry --version <v> --registry <url> --output <目录>'
  )
}

function main(argv) {
  const options = parseArgs(argv)
  const files = createFixture(options)
  process.stdout.write(
    `[create_consumer_fixture] 已生成 ${files.length} 个文件到 ${options.output}（source=${options.source}）\n`
  )
}

if (require.main === module) {
  try {
    main(process.argv.slice(2))
  } catch (error) {
    process.stderr.write(`[create_consumer_fixture] ${error.message}\n`)
    process.exitCode = 1
  }
}

module.exports = {
  PUBLISH_PACKAGES,
  collectPack,
  renderPackageJson,
  createFixture,
}
