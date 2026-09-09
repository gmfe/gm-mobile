const path = require('path')

const config = {
  projectName: 'gm-mobile',
  date: '2020-6-1',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: 'mini-program/src',
  outputRoot: 'dist',
  cache: {
    enable: true,
  },
  plugins: [],
  defineConstants: {
    __NAME__: '"none"',
  },
  copy: {
    patterns: [],
    options: {},
  },
  framework: 'react',
  alias: {
    '@': path.resolve(__dirname, '..', 'mini-program/src'),
    // 仓库未使用 workspaces/lerna link，包间引用指向本地源码
    '@gm-mobile/c-business': path.resolve(__dirname, '..', 'packages/c-business'),
    '@gm-mobile/c-font': path.resolve(__dirname, '..', 'packages/c-font'),
    '@gm-mobile/c-react': path.resolve(__dirname, '..', 'packages/c-react'),
    '@gm-mobile/c-tool': path.resolve(__dirname, '..', 'packages/c-tool'),
    '@gm-mobile/locales': path.resolve(__dirname, '..', 'packages/locales'),
    '@gm-mobile/mp-business': path.resolve(__dirname, '..', 'packages/mp-business'),
    '@gm-mobile/mp-request': path.resolve(__dirname, '..', 'packages/mp-request'),
    '@gm-mobile/mp': path.resolve(__dirname, '..', 'packages/mp'),
    '@gm-mobile/react': path.resolve(__dirname, '..', 'packages/react'),
  },
  compiler: {
    type: 'webpack5',
    prebundle: {
      enable: false,
    },
  },
  mini: {
    compile: {
      include: [path.resolve(__dirname, '../packages')],
    },
    webpackChain(chain, webpack) {
      chain.plugin('ignorePlugin').use(
        new webpack.IgnorePlugin({
          resourceRegExp: /^\.\/locale$/,
          contextRegExp: /moment$/,
        })
      )
    },
    postcss: {
      pxtransform: {
        enable: false,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
      'postcss-preset-env': {
        enable: true,
        config: {
          stage: 0,
        },
      },
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
