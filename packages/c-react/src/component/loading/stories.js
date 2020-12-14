import React from 'react'
import Loading from './index'
import { View } from '../view'

export const normal = () => (
  <View style={{ fontSize: '30px' }}>
    <Loading>loading...</Loading>
  </View>
)

export default {
  title: '基础/Loading',
}
