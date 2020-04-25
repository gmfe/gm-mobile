import React from 'react'
import Tooltip from './index'

export const normal = () => {
  return (
    <Tooltip ttile='提示' content={<div>asdfafa</div>}>
      <div>点我提示</div>
    </Tooltip>
  )
}

export default {
  title: '浮层/ToolTip',
}
