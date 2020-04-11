import React from 'react'
import CSSVariable from './css_variable'
import _ from 'lodash'
import Flex from './component/flex'

export const normal = () => {
  return (
    <div>
      {_.map(CSSVariable, (v, k) => (
        <Flex>
          <Flex
            className='m-padding-5 m-border'
            style={{
              width: '100px',
              backgroundColor: v,
            }}
          />
          {k} {v}
        </Flex>
      ))}
    </div>
  )
}

export default {
  title: 'CSSVariable',
}
