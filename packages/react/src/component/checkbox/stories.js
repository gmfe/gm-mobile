import React from 'react'
import Flex from '../flex'
import { observable } from 'mobx'

import Checkbox from './'

const store = observable({
  checked: true,
  setChecked(value) {
    this.checked = value
  },
})

export const normal = () => (
  <div>
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
  </div>
)

export default {
  title: '表单/Checkbox',
}
