# 浮层/InnerLayer
```tsx
import React from 'react'

import { Button } from '../button'
import { InnerLayer } from '.'
import { View } from '../view'

const Normal = () => {
  const handleCancel = () => {
    InnerLayer.hide()
  }

  const handleClick = () => {
    InnerLayer.render({
      children: (
        <View className='m-bg-back m-text-center m-padding-20'>
          lalala
          <Button mini className='m-margin-left-20' onClick={handleCancel}>
            取消
          </Button>
        </View>
      ),
    })
  }
  return (
    <View className='m-padding-20' onClick={handleClick}>
      click here 打开内页
    </View>
  )
}

export default Normal
```
