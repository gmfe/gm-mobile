import React from 'react'
import { addDecorator, addParameters } from '@storybook/react'
import { LayoutRoot, CSSVariable } from '../packages/react/src'
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

addDecorator((storeFn) => (
  <React.Fragment>
    <Observer>{() => storeFn()}</Observer>
    <LayoutRoot />
  </React.Fragment>
))

if (
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
) {
  CSSVariable.setTheme(CSSVariable.TYPE.DARK)
}
