import React from 'react'
import CSSVariable from './css_variable'
import _ from 'lodash'
import { Button, Flex } from '@gm-mobile/c-react'

export const normal = () => {
  return (
    <div>
      <div>theme</div>
      {_.map(CSSVariable.TYPE, (v, k) => (
        <Button
          onClick={() => {
            CSSVariable.setTheme(v)
          }}
        >
          {k}
        </Button>
      ))}
    </div>
  )
}

export default {
  title: 'Theme',
  component: CSSVariable,
}
