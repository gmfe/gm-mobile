import React from 'react'
import { observable } from 'mobx'

import InputNumber from './'

const store = {
  value: null,
  setValue(value) {
    this.value = value
  },
}
const store1 = observable(store)
const store2 = observable(store)

export const Normal = () => {
  return (
    <div>
      <div>
        无限制
        <InputNumber
          className='m-margin-8'
          value={store1.value}
          onChange={(value) => store1.setValue(value)}
        />
      </div>
      <div>
        最大最小值限制
        <InputNumber
          className='m-margin-8'
          value={store2.value}
          onChange={(value) => store2.setValue(value)}
          min={10}
          max={100}
        />
      </div>
    </div>
  )
}

export default {
  title: 'InputNumber',
}
