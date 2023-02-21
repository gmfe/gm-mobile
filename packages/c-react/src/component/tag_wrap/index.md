
```tsx
import React from 'react'
import TagWrap from './tag_wrap'

import { View } from '../view'

const Normal = () => {
  return (
    <View>
      <View style={{ width: '100px' }}>
        <TagWrap tag='这是tag这是这是这是'>
          <View>
            <View>ssfafasfa</View>
            <View>ssfafasfa</View>
            <View>ssfafasfa</View>
          </View>
        </TagWrap>
      </View>
    </View>
  )
}

export default Normal
```
