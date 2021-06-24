import React from 'react'
import CSSVariable from './css_variable'
import _ from 'lodash'
import { Button, Flex } from '@gm-mobile/c-react'

export const Theme = () => {
  return (
    <div>
      <div className='m-text-primary m-bg-back m-margin-20'>theme</div>
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

Theme.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}

export default {
  title: 'Design',
}
