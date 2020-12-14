const path = require('path')
const _ = require('lodash')

const webpackFinal = (config) => {
  _.each(config.module.rules, (rule) => {
    if (rule.use && rule.use[0] && rule.use[0].loader) {
      if (rule.use[0].loader.includes('babel-loader')) {
        rule.include.push(/gm-/)
        rule.exclude = function (filepath) {
          return filepath.includes('/node_modules/')
        }
      }
    }

    if (rule.loader && rule.loader.includes('file-loader')) {
      rule.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/
    }
  })

  config.module.rules.push({
    test: /\.stories\.tsx?$/,
    loaders: [require.resolve('@storybook/source-loader')],
    enforce: 'pre',
  })

  config.module.rules.push({
    test: /(gm-mobile-icons)\.(woff|woff2|ttf|eot|svg)($|\?)/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: 'static/media/font/[name].[hash:8].[ext]',
        },
      },
    ],
  })

  config.module.rules.push({
    test: /\.less$/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
      },
      {
        loader: 'less-loader',
      },
    ],
  })

  config.module.rules.unshift({
    test: /svg\/(\w|\W)+\.svg$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          expandProps: 'start',
          svgProps: {
            fill: 'currentColor',
            className: "{'m-svg-icon ' + (props.className || '')}",
          },
        },
      },
    ],
  })

  config.module.rules.push({
    test: /\.tsx?$/,
    use: [require.resolve('babel-loader')],
  })

  config.resolve.extensions.push('.ts', '.tsx')

  return config
}

module.exports = {
  addons: [
    '@storybook/addon-storysource',
    {
      name: '@storybook/preset-typescript',
      options: {
        tsLoaderOptions: {
          transpileOnly: true,
          happyPackMode: true,
          configFile: path.resolve(__dirname, '../tsconfig.json'),
        },
        forkTsCheckerWebpackPluginOptions: {
          checkSyntacticErrors: true,
          tsconfig: path.resolve(__dirname, '../tsconfig.json'),
          reportFiles: [
            'packages/c-react/src/**/*stories.{tsx,ts}',
            'packages/c-business/src/**/*stories.{tsx,ts}',
            'packages/react/src/**/*stories.{tsx,ts}',
            'packages/locales/src/**/*stories.{tsx,ts}',
            'packages/business/src/**/*stories.{tsx,ts}',
            'packages/c-service-time/src/**/*stories.{tsx,ts}',
            'packages/swiper/src/**/*stories.{tsx,ts}',
            'packages/c-qrcode/src/**/*stories.{tsx,ts}',
            'other/**/*.stories.{tsx,ts}',
          ],
        },
      },
    },
  ],
  // 枚举，避免识别到 node_modules 的 stories
  // todo: 暂时兼容js和ts
  stories: [
    '../packages/c-react/src/**/*stories.js',
    '../packages/c-business/src/**/*stories.js',
    '../packages/react/src/**/*stories.js',
    '../packages/locales/src/**/*stories.js',
    '../packages/business/src/**/*stories.js',
    '../packages/c-service-time/src/**/*stories.js',
    '../packages/swiper/src/**/*stories.js',
    '../packages/c-qrcode/src/**/*stories.js',
    '../other/**/*.stories.js',

    '../packages/c-react/src/**/*stories.{tsx,ts}',
    '../packages/c-business/src/**/*stories.{tsx,ts}',
    '../packages/react/src/**/*stories.{tsx,ts}',
    '../packages/locales/src/**/*stories.{tsx,ts}',
    '../packages/business/src/**/*stories.{tsx,ts}',
    '../packages/c-service-time/src/**/*stories.{tsx,ts}',
    '../packages/swiper/src/**/*stories.{tsx,ts}',
    '../packages/c-qrcode/src/**/*stories.{tsx,ts}',
    '../other/**/*.stories.{tsx,ts}',
  ],
  webpackFinal,
}
