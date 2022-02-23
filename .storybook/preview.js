import React from 'react'
import { addDecorator, addParameters } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { LayoutRoot, LayoutRootV1, CSSVariable } from '../packages/react/src'
import { Observer } from 'mobx-react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

import './less.less'
import '../packages/react/src/index.less'
import '../packages/swiper/src/index.less'
import '../packages/business/src/index.less'

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

export const parameters = {
  options: {
    showRoots: true,
  },
  viewport: {
    viewports: {
      gm: {
        name: 'gm-preview',
        styles: {
          width: '375px',
          height: '600px',
        },
        type: 'mobile',
      },
      ...INITIAL_VIEWPORTS,
    },
    defaultViewport: 'gm',
  },
  docs: {
    source: {
      type: 'auto',
    },
  },
}
