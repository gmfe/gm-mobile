import React from 'react'
import { observable } from 'mobx'

import Select from './'

const data = [
  { value: 1, text: '深圳' },
  { value: 2, text: '罗湖' },
  { value: 3, text: '南山' },
  { value: 4, text: '宝安' },
  { value: 5, text: '福田' },
  { value: 6, text: '龙岗' },
]
const store = observable({
  value: null,
  show: false,
  setData({ value, show }) {
    this.value = value
    this.show = show
  },
  setValue(v) {
    this.value = v
  },
})

export const PopupSelect = () => {
  const handleChange = () => {
    const { value } = store

    Select.render({
      data,
      value,
    }).then((v) => {
      store.setValue(v)
    })
  }

  return <button onClick={handleChange}>选择</button>
}

export default {
  title: 'Select',
}
