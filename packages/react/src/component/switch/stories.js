import React from 'react'
import Switch from './'
import { observable } from 'mobx'

const store = observable({
  checked: false,
  setChecked(checked) {
    this.checked = checked
  },
})

export const normal = () => {
  return (
    <div>
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
    </div>
  )
}

export default {
  title: 'Switch',
}
