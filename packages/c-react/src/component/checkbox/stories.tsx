import React from 'react'
import { observable } from 'mobx'

import Checkbox from '.'
import { View } from '../view'

const store = observable({
  checked: true,
  setChecked(value: boolean) {
    this.checked = value
  },
})

export const normal = () => (
  <View className='m-bg-white'>
    <Checkbox
      checked={store.checked}
      onChange={() => {
        store.setChecked(!store.checked)
      }}
    >
      选择
    </Checkbox>
    <Checkbox
      circle
      checked={store.checked}
      onChange={() => {
        store.setChecked(!store.checked)
      }}
    >
      选择
    </Checkbox>
    <Checkbox
      disabled
      checked={store.checked}
      onChange={() => {
        store.setChecked(!store.checked)
      }}
    >
      选择
    </Checkbox>
    <Checkbox
      primary
      checked={store.checked}
      onChange={() => {
        store.setChecked(!store.checked)
      }}
    >
      选择
    </Checkbox>
    <Checkbox
      primary
      disabled
      checked={store.checked}
      onChange={() => {
        store.setChecked(!store.checked)
      }}
    >
      选择
    </Checkbox>
  </View>
)

export default {
  title: '表单/Checkbox',
}
