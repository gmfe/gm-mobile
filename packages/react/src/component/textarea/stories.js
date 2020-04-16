import React from 'react'
import Textarea from './index'
import { observable } from 'mobx'

const store = observable({
  value: '',
  setValue(value) {
    this.value = value
  },
})

export const normal = () => {
  return (
    <div>
      <Textarea
        value={store.value}
        onChange={(e) => store.setValue(e.target.value)}
      />
      不可用
      <Textarea disabled value={'不可用状态'} />
      显示剩余字数
      <Textarea
        maxLength={100}
        value={store.value}
        onChange={(e) => store.setValue(e.target.value)}
      />
    </div>
  )
}

export default {
  title: '表单/Textarea',
}
