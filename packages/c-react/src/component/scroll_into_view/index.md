# 其他/ScrollIntoView

```tsx
import React, { useState, useEffect } from 'react'
import ScrollIntoView from './scroll_into_view'
import { View } from '../view'

const Normal = () => {
  const [scrollId, setScrollId] = useState('')

  useEffect(() => {
    setScrollId('gg')
  }, [])

  return (
    <View>
      滑动到bbb处
      <ScrollIntoView
        style={{ height: '100px', overflowY: 'auto' }}
        targetId={scrollId}
      >
        <View id='aa'>aaa</View>
        <View id='bb'>aaa</View>
        <View id='cc'>aaa</View>
        <View id='dd'>aaa</View>
        <View id='ee'>aaa</View>
        <View id='ff'>aaa</View>
        <View id='gg'>bbb</View>
        <View id='hh'>aaa</View>
        <View id='ii'>aaa</View>
        <View id='jj'>aaa</View>
        <View id='kk'>aaa</View>
        <View id='ll'>aaa</View>
        <View id='mm'>aaa</View>
      </ScrollIntoView>
    </View>
  )
}

export default Normal
```
