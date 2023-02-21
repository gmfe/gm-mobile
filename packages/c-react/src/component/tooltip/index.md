# 浮层/ToolTip
```tsx
import React from 'react'
import { Tooltip } from './index'
import { View } from '../view'

const normal = () => {
  return (
    <Tooltip title='提示' content={<View>asdfafa</View>}>
      <View>点我提示</View>
    </Tooltip>
  )
}

export default normal
```
