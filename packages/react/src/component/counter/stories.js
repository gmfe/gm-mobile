import React from 'react'
import { observable } from 'mobx'

import Counter from './'

const store = observable({
  value: '',
  setValue(v) {
    this.value = v
  },
})

export const normal = () => {
  return (
    <div className='m-margin-10'>
      default形式
      <div className='m-margin-10'>
        <Counter
          value={store.value}
          min={3}
          onChange={(v) => store.setValue(v)}
        />
      </div>
      large形式
      <div className='m-margin-10'>
        <Counter
          value={store.value}
          onChange={(v) => store.setValue(v)}
          large
        />
      </div>
    </div>
  )
}

export default {
  title: '基础/Counter',
}
