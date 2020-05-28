import React from 'react'
import CSSVariable from './css_variable'
import _ from 'lodash'
import Flex from './component/flex'

export const normal = () => {
  return (
    <div>
      <div>theme</div>
      {_.map(CSSVariable.TYPE, (v, k) => (
        <Flex
          onClick={() => {
            CSSVariable.setTheme(v)
          }}
        >
          {k}
        </Flex>
      ))}
    </div>
  )
}

export default {
  title: 'CSSVariable',
}
