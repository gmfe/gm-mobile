import React from 'react'
import { observable } from 'mobx'

import Radio from './'

const store = observable({
  checked: true,
  setChecked(v) {
    this.checked = v
  },
})

export const Normal = () => (
  <div>
    <Radio
      checked={store.checked}
      onChange={() => {
        store.setChecked(!store.checked)
      }}
    >
      选择
    </Radio>
    <Radio checked={store.checked} disabled>
      选择
    </Radio>
  </div>
)

export default {
  title: '表单/Radio',
}
