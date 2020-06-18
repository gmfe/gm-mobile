import React from 'react'
import { useDidShow } from '@tarojs/taro'
import { Toast, PageMP } from '../../../../packages/mp/src'

const Other = () => {
  console.log('other')

  useDidShow(() => {
    Toast.tip('show')
  })

  return <PageMP>other</PageMP>
}

export default Other
