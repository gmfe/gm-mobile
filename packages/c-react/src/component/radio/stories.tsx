import React from 'react'
import { observable } from 'mobx'

import Radio from './radio'
import { View } from '../view'

const store = observable({
  checked: true,
  setChecked(v: boolean) {
    this.checked = v
  },
})

export const Normal = () => {
  return (
    <View>
      <Radio checked={store.checked}>选择</Radio>
      <Radio checked={store.checked} disabled>
        选择
      </Radio>
    </View>
  )
}

export default {
  title: '表单/Radio',
  component: Radio,
}
