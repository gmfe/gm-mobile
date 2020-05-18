import React from 'react'
import { addDecorator, addParameters } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { LayoutRoot } from '../packages/react/src'
import { Observer } from 'mobx-react'

import '../packages/react/src/index.less'
import '../packages/swiper/src/index.less'

// business
import '../packages/business/src/index.less'
import { themes } from '@storybook/theming'

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
        infoBody: {
          ...stylesheet.infoBody,
          borderTop: '1px solid #ccc',
          color: '#444',
          padding: '10px',
          fontWeight: 'normal',
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

if (
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
) {
  // document.body.classList.add('m-theme-dark')
}
