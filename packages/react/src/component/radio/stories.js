import React from 'react'
import { observable } from 'mobx'

import Radio from './'

const store = observable({
  checked: true,
  setChecked(value) {
    this.checked = value
  },
})

export const normal = () => (
  <Radio
    checked={store.checked}
    onChange={(value) => store.setChecked(value)}
  />
)
export const disabled = () => <Radio disabled />

export default {
  title: 'Radio',
}
