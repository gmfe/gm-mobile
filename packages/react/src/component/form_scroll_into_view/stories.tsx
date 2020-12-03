import React from 'react'
import { observable } from 'mobx'
import { Input } from '@gm-mobile/c-react'

const store = observable({
  value: '',
  setValue(value: string) {
    this.value = value
  },
})

export const normal = () => {
  return (
    <>
      <div>解决安卓唤起键盘后遮挡输入框的问题，封装了一层。</div>
      <div>当触发onFocus事件时自动判断让输入框保持在视图内</div>
      <div style={{ height: '450px' }}>空白处...</div>
      <Input
        value={store.value}
        onChange={(e) => store.setValue(e.target.value)}
        placeholder='请输入'
      />
    </>
  )
}

export default {
  title: '表单/FormScrollIntoView',
}
