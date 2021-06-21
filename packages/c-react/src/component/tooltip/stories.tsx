import React from 'react'
import { Tooltip } from './index'
import { View } from '../view'

export const normal = () => {
  return (
    <Tooltip title='提示' content={<View>asdfafa</View>}>
      <View>点我提示</View>
    </Tooltip>
  )
}

export default {
  title: '浮层/ToolTip',
  component: Tooltip,
}
