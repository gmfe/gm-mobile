import React from 'react'
import { observable } from 'mobx'
import _ from 'lodash'

import Radio from './'

const store = {
  checked: true,
  setChecked(v) {
    this.checked = v
  },
}
const store1 = observable(store)
const store2 = observable({ ...store, checked: false })
const data = [
  { value: 1, text: 'aaa' },
  { value: 2, text: 'bbb' },
]
const store3 = observable({
  value: 1,
  setValue(v) {
    this.value = v
  },
})

export const Normal = () => (
  <div className='m-padding-left-10'>
    checked true
    <div>
      <Radio checked={store1.checked}>
        选择
      </Radio>
    </div>
    checked false
    <div>
      <Radio checked={store2.checked}>
        选择
      </Radio>
    </div>
    disabled
    <div>
      <Radio checked disabled>
        选择
      </Radio>
      <Radio checked={false} disabled>
        选择
      </Radio>
    </div>
    more example
    <div>
      {_.map(data, (d) => (
        <Radio
          checked={store3.value === d.value}
          key={d.value}
          onChange={() => store3.setValue(d.value)}
        >
          {d.text}
        </Radio>
      ))}
    </div>
  </div>
)

export default {
  title: 'Radio',
}
