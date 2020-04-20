import React from 'react'
import Input from './input'
import InputPassword from './input_password'
import InputNumber from './input_number'
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

export const inputNumber = () => {
  return (
    <div>
      <div>
        无限制
        <InputNumber
          className='m-margin-10'
          value={store.value}
          onChange={(value) => store.setValue(value)}
        />
      </div>
      <div>
        最大最小值限制, min=0, max=100
        <InputNumber
          className='m-margin-10'
          value={store.value}
          onChange={(value) => store.setValue(value)}
          min={0}
          max={100}
        />
      </div>
    </div>
  )
}

export default {
  title: '表单/Input',
}
