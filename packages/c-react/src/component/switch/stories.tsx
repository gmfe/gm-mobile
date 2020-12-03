import React from 'react'
import Switch from './switch'
import { observable } from 'mobx'
import { View } from '../view'

const store = observable({
  checked: false,
  setChecked(checked: boolean) {
    this.checked = checked
  },
})

export const normal = () => {
  return (
    <View>
      <Switch
        checked={store.checked}
        onChange={() => {
          store.setChecked(!store.checked)
        }}
      />
      <Switch
        checked={!store.checked}
        onChange={() => {
          store.setChecked(store.checked)
        }}
      />

      <Switch
        disabled
        checked={!store.checked}
        onChange={() => {
          store.setChecked(!store.checked)
        }}
      />
    </View>
  )
}

export default {
  title: '表单/Switch',
}
