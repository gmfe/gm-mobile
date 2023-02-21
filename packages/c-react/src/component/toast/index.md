# 浮层/Toast

```tsx
import React from 'react'
import { View } from '../view'
import { Button } from '../button'
import Toast from './toast'
import { ToastStaticsTypes } from './types'

const normal = () => {
  const handleToast = <T extends keyof ToastStaticsTypes>(type: T) => {
    Toast[type]('提示' + type)
  }

  return (
    <View>
      <Button onClick={() => handleToast('tip')}>Toast tip</Button>
      <Button onClick={() => handleToast('success')}>Toast success</Button>
      <Button onClick={() => handleToast('warning')}>Toast warning</Button>
      <Button
        onClick={() => {
          Toast.loading()
        }}
      >
        Toast loading
      </Button>
      <View>
        <Button
          onClick={() => {
            Toast.success({
              children: <View>保存成功啦保存成功啦保存成功啦保存成功啦</View>,
            })
          }}
        >
          Toast success children
        </Button>
      </View>
    </View>
  )
}

export default normal
```
