const path = require('path')
const _ = require('lodash')
const webpack = require('webpack')

const webpackFinal = (config) => {
  _.each(config.module.rules, (rule) => {
    // if (rule.use && rule.use[0] && rule.use[0].loader) {
    //   if (rule.use[0].loader.includes('babel-loader')) {
    //     rule.include.push(/gm-/)
    //     rule.exclude = function (filepath) {
    //       return filepath.includes('/node_modules/')
    //     }
    //   }
    // }

    if (rule.loader && rule.loader.includes('file-loader')) {
      rule.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf|svg)(\?.*)?$/
    }
  })

  config.module.rules.push({
    test: /(stories|story)\.(tsx|jsx)?$/,
    loader: require.resolve('@storybook/source-loader'),
    exclude: [/node_modules/],
    enforce: 'pre',
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
          postcssOptions: {},
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
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-viewport'
  ],
  // 枚举，避免识别到tail node_modules 的 stories
  // todo: 暂时兼容js和ts
  stories: [
    '../packages/c-react/src/**/*stories.{tsx,ts,js,mdx}',
    '../packages/c-business/src/**/*stories.{tsx,ts,js,mdx}',
    '../packages/react/src/**/*stories.{tsx,ts,js,mdx}',
    '../packages/locales/src/**/*stories.{tsx,ts,js,mdx}',
    '../packages/business/src/**/*stories.{tsx,ts,js,mdx}',
    '../packages/c-service-time/src/**/*stories.{tsx,ts,js,mdx}',
    '../packages/swiper/src/**/*stories.{tsx,ts,js,mdx}',
    '../packages/c-qrcode/src/**/*stories.{tsx,ts,js,mdx}',
    '../packages/c-cookie/src/**/*stories.{tsx,ts,js,mdx}',
    '../packages/c-tool/src/**/*stories.{tsx,ts,js,mdx}',
    '../other/**/*.stories.{tsx,ts,js,mdx}',
    '../other/text_field.stories.mdx',
  ],
  webpackFinal,
}
