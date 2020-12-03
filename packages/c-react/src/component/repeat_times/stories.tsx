import React from 'react'
import RepeatTimes from './repeat_times'
import { View } from '../view'

export const Normal = () => {
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

export default {
  title: '其他/RepeatTimes',
}
