# 其他/RepeatTimes

```tsx
import React from 'react'
import RepeatTimes from './repeat_times'
import { View } from '../view'

const Normal = () => {
  return (
    <RepeatTimes
      onRepeat={() => {
        console.log('hello')
      }}
    >
      <View>点我5次</View>
    </RepeatTimes>
  )
}

export default Normal
```