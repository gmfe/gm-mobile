import React from 'react'
import Input from './input'
import InputPassword from './input_password'
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
