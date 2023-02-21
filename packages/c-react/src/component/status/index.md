# 布局/Status
```tsx
import React from 'react'
import Status from './status'
import { View } from '../view'

const Normal = () => {
  return (
    <View>
      <Status type='loading' />
      <Status
        type='error'
        onReload={() => {
          console.log('reload')
        }}
      />
      <Status type='empty' />
    </View>
  )
}

export default Normal
```
