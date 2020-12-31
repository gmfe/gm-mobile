import React from 'react'
import { View } from '../view'

export const normal = () => {
  return (
    <View>
      <View>
        语法见 [Flex](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
        本组件只是个简单的封装
      </View>
      <View>特别的 props 是 none，flex 会坍缩，提供 none 则不会坍缩</View>
    </View>
  )
}

export default {
  title: '布局/Flex',
}
