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
  const handleCheckValue = ({ value, min, max, precision }) => {
    if (value > 10) {
      return '库存不足'
    }

    if (value < 3) {
      return '最小起售为3'
    }
    return null
  }
  return (
    <div className='m-margin-10'>
      default形式
      <div className='m-margin-10'>
        <Counter
          value={store.value}
          min={3}
          max={100}
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
      自定义提示信息
      <div className='m-margin-10'>
        <Counter
          value={store.value}
          min={3}
          max={10}
          onChange={(v) => store.setValue(v)}
          getErrorMsg={handleCheckValue}
        />
      </div>
    </div>
  )
}

export default {
  title: '基础/Counter',
}
