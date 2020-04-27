import React from 'react'
import Input from './input'
import InputPassword from './input_password'
import { observable } from 'mobx'
import BorderInput from './border_input'

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

export const border = () => {
  return (
    <div className='m-margin-10'>
      默认形式
      <BorderInput
        value={store.value}
        onChange={(e) => store.setValue(e.target.value)}
        placeholder='请输入'
      />
      <br />
      显示字数
      <BorderInput
        value={store.value}
        maxLength={30}
        onChange={(e) => store.setValue(e.target.value)}
        placeholder='请输入'
      />
    </div>
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
