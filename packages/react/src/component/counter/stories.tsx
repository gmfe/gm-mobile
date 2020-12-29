import React from 'react'
import { observable } from 'mobx'

import { Counter, CounterErrorMsg } from '.'
import { Page } from '@gm-mobile/c-react'

const store = observable({
  one: '',
  two: '',
  three: '',
  isActive: '',
  setValue(type: 'one' | 'two' | 'three', v: string) {
    this[type] = v
  },
  setIsActive(type: 'one' | 'two' | 'three') {
    this.isActive = type
  },
})

export const normal = () => {
  const handleCheckValue = ({ value }: CounterErrorMsg) => {
    if (+value > 10) {
      return '库存不足'
    }

    if (+value < 3) {
      return '最小起售为3'
    }
    return ''
  }
  return (
    <Page>
      default形式
      <div className='m-padding-10'>
        <Counter
          value={store.one}
          min={3}
          max={100}
          onChange={(v) => store.setValue('one', v)}
        />
      </div>
      large形式
      <div className='m-padding-10'>
        <Counter
          value={store.two}
          onChange={(v) => store.setValue('two', v)}
          large
        />
      </div>
      自定义提示信息
      <div className='m-padding-10'>
        <Counter
          value={store.three}
          min={3}
          max={10}
          onChange={(v) => store.setValue('three', v)}
          getErrorMsg={handleCheckValue}
        />
      </div>
    </Page>
  )
}

export default {
  title: '基础/Counter',
}
