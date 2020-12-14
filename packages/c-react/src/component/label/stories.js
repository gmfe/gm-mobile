import React from 'react'
import Label from './index'
import { View } from '../view'

export const normal = () => (
  <View>
    <Label text='默认' />
  </View>
)

export const primary = () => (
  <View>
    <Label text='自提' type='primary' />
  </View>
)

export const plain = () => (
  <View>
    <Label text='限购' type='plain' />
  </View>
)

export const accent = () => (
  <View>
    <Label text='组合商品' type='accent' />
  </View>
)

export default {
  title: '基础/Label',
}
