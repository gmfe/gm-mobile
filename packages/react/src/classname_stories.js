import React from 'react'
import _ from 'lodash'
import Flex from './component/flex'

export const containerFull = () => {
  return (
    <Flex column className='m-container-full'>
      <div>header</div>
      <Flex>m-container-full 方便做布局</Flex>
    </Flex>
  )
}

export const other = () => {
  return (
    <div>
      <div>.m-img-responsive</div>
      <div>.m-cursor-pointer</div>
      <div>.m-visible</div>
      <div>.m-invisible</div>
      <div>.m-relative</div>
      <div>.m-absolute</div>
    </div>
  )
}

export default {
  title: 'ClassName',
}
