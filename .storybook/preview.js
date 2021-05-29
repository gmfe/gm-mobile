import React from 'react'
import { addDecorator, addParameters } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { LayoutRoot,LayoutRootV1, CSSVariable } from '../packages/react/src'
import { Observer } from 'mobx-react'

import './less.less'

import '../packages/react/src/index.less'
import '../packages/swiper/src/index.less'
import '../packages/business/src/index.less'

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
      return {
        ...stylesheet,
        // 啥也不用
        infoBody: {
          borderTop: '1px solid rgba(0, 0, 0, 0.05)',
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
    <LayoutRootV1 />
  </React.Fragment>
))

if (
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
) {
  CSSVariable.setTheme(CSSVariable.TYPE.DARK)
}
