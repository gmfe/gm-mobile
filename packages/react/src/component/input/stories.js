import React from 'react'
import Input from './index'
import { observable } from 'mobx'

const store = observable({
  value: '',
  setValue(value) {
    this.value = value
  },
})

export const normal = () => {
  return (
    <Input
      value={store.value}
      onChange={(e) => store.setValue(e.target.value)}
      placeholder='请输入'
    />
  )
}

export default {
  title: '表单/Input',
}
