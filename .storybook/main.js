const webpackFinal = (config) => {
  config.module.rules.push({
    test: /\.stories\.jsx?$/,
    loaders: [require.resolve('@storybook/source-loader')],
    enforce: 'pre',
  })

  config.module.rules[3] = {
    test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf|svg)(\?.*)?$/,
    loader:
      './node_modules/@storybook/core/node_modules/file-loader/dist/cjs.js',
    query: { name: 'static/media/[name].[hash:8].[ext]' },
  }

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

  config.module.rules.push({
    test: /\.stories\.jsx?$/,
    loaders: [require.resolve('@storybook/source-loader')],
    enforce: 'pre',
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
  // 枚举，避免识别到 node_modules 的 stories
  // todo: 暂时兼容js和tsx
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

    '../packages/c-react/src/**/*stories.tsx',
    '../packages/c-business/src/**/*stories.tsx',
    '../packages/react/src/**/*stories.tsx',
    '../packages/locales/src/**/*stories.tsx',
    '../packages/business/src/**/*stories.tsx',
    '../packages/c-service-time/src/**/*stories.tsx',
    '../packages/swiper/src/**/*stories.tsx',
    '../packages/c-qrcode/src/**/*stories.tsx',
    '../other/**/*.stories.tsx',
  ],
  webpackFinal,
}
