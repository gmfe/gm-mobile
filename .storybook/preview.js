import React from 'react'
import { addDecorator, addParameters } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { LayoutRoot } from '../packages/react/src'
import { Observer } from 'mobx-react'
import './less.less'

import '../packages/react/src/index.less'
import '../packages/swiper/src/index.less'

// business
import '../packages/business/src/index.less'

const isDark =
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

addParameters({
  options: {
    showRoots: true,
  },
})

addDecorator(
  withInfo({
    inline: true,
    header: false,
    source: false,
    styles: (stylesheet) => {
      console.log(stylesheet.infoBody)

      return {
        ...stylesheet,
        // 啥也不用
        infoBody: {
          padding: '10px',
        },
      }
    },
  })
)

addDecorator((storeFn) => (
  <React.Fragment>
    <Observer>{() => storeFn()}</Observer>
    <LayoutRoot />
  </React.Fragment>
))

if (isDark) {
  document.body.classList.add('m-theme-dark')
}
