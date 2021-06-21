import React from 'react'
import { Textarea } from './'
import { observable } from 'mobx'
import { View } from '../view'

const store = observable({
  value: '',
  setValue(value: string) {
    this.value = value
  },
})

export const normal = () => {
  return (
    <View>
      <Textarea
        value={store.value}
        onChange={(e) => store.setValue(e.target.value)}
      />
      不可用
      <Textarea disabled value='不可用状态' />
      显示剩余字数
      <Textarea
        maxLength={100}
        value={store.value}
        onChange={(e) => store.setValue(e.target.value)}
      />
    </View>
  )
}

export default {
  title: '表单/Textarea',
  component: Textarea,
}
