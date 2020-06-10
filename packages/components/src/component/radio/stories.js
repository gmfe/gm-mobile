import React from 'react'
import { observable } from 'mobx'

import Radio from './'
import View from '../view'

const store = observable({
  checked: true,
  setChecked(v) {
    this.checked = v
  },
})

export const Normal = () => (
  <View>
    <Radio checked={store.checked}>选择</Radio>
    <Radio checked={store.checked} disabled>
      选择
    </Radio>
  </View>
)

export default {
  title: '表单/Radio',
}
