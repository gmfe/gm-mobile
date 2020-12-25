const path = require('path')
const _ = require('lodash')
const webpack = require('webpack')

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
        loader: require.resolve('postcss-loader'),
        options: {
          postcssOptions: {
            plugins: [require('tailwindcss')],
          },
        },
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

  config.plugins.push(
    new webpack.DefinePlugin({
      __NAME__: JSON.stringify('none'),
    })
  )

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
            'packages/c-tool/src/**/*stories.{tsx,ts}',
            'packages/c-cookie/src/**/*stories.{tsx,ts}',
            'other/**/*.stories.{tsx,ts}',
          ],
        },
      },
    },
  ],
  // 枚举，避免识别到tail node_modules 的 stories
  // todo: 暂时兼容js和ts
  stories: [
    '../packages/c-react/src/**/*stories.{tsx,ts,js}',
    '../packages/c-business/src/**/*stories.{tsx,ts,js}',
    '../packages/react/src/**/*stories.{tsx,ts,js}',
    '../packages/locales/src/**/*stories.{tsx,ts,js}',
    '../packages/business/src/**/*stories.{tsx,ts,js}',
    '../packages/c-service-time/src/**/*stories.{tsx,ts,js}',
    '../packages/swiper/src/**/*stories.{tsx,ts,js}',
    '../packages/c-qrcode/src/**/*stories.{tsx,ts,js}',
    '../packages/c-tool/src/**/*stories.{tsx,ts,js}',
    '../packages/c-cookie/src/**/*stories.{tsx,ts,js}',
    '../other/**/*.stories.{tsx,ts,js}',
  ],
  webpackFinal,
}
