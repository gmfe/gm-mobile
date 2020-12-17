import React from 'react'
import Input from './input'
import InputPassword from './input_password'
import { observable } from 'mobx'
import InputMaxLength from './input_max_length'
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
      <Input
        value={store.value}
        onChange={(e) => store.setValue(e.target.value)}
        placeholder='请输入'
      />
      disabled
      <Input
        value={store.value}
        onChange={(e) => store.setValue(e.target.value)}
        placeholder='请输入'
        disabled
      />
    </View>
  )
}

export const isFrom = () => {
  return (
    <View>
      <Input
        value={store.value}
        isFrom
        onChange={(e) => store.setValue(e.target.value)}
        placeholder='请输入'
      />
      disabled
      <Input
        value={store.value}
        onChange={(e) => store.setValue(e.target.value)}
        placeholder='请输入'
        disabled
      />
    </View>
  )
}

export const maxLength = () => {
  return (
    <InputMaxLength
      value={store.value}
      maxLength={30}
      onChange={(e) => store.setValue(e.target.value)}
      placeholder='请输入'
    />
  )
}

export const inputPassword = () => {
  return (
    <InputPassword
      value={store.value}
      onChange={(e) => store.setValue(e.target.value)}
      placeholder='请输入密码'
    />
  )
}

export default {
  title: '表单/Input',
}
