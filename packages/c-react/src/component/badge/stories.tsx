import React from 'react'
import { Badge } from './index'
import { View } from '../view'

export const normal = () => (
  <View style={{ padding: '20px' }}>
    <Badge count={8} />
    <View />
    <Badge count={100} />
    <View />
    <Badge showOverflow count={100} />
  </View>
)

export const dot = () => (
  <View style={{ padding: '20px' }}>
    <Badge dot count={2}>
      <View>消息</View>
    </Badge>
  </View>
)

export const corner = () => (
  <View style={{ padding: '20px' }}>
    <Badge corner count={100}>
      <View style={{ padding: '5px' }}>消息</View>
    </Badge>
  </View>
)

export default {
  title: '基础/Badge',
}
