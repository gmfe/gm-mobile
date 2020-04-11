import React from 'react'
import { observable } from 'mobx'

import Keyboard from './'

const store = observable({
  value: '',
  setvalue(v) {
    this.value = v
  },
})

export const Normal = () => (
  <div>
    <div className='m-margin-5'>选择的数字为: {store.value}</div>
    <Keyboard value={store.value} onChange={(v) => store.setvalue(v)} />
  </div>
)

export default {
  title: 'Keyboard',
}
