import React from 'react'
import { observable } from 'mobx'

import Counter from './'
import Page from '../page'
import Flex from '../flex'

const store = observable({
  one: '',
  two: '',
  three: '',
  four: '',
  five: '',
  six: '',
  seven: '',
  isActive: null,
  setValue(type, v) {
    this[type] = v
  },
  setIsActive(type) {
    this.isActive = type
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
    <Page
      className='m-overflow-y'
      bottom={<div className='m-border-top m-padding-10'>bottom bottom</div>}
      tabbar={<div className='m-border-top m-padding-10'>tabbar tabbar</div>}
    >
      default形式
      <div className='m-padding-10'>
        <Counter
          value={store.one}
          min={3}
          max={100}
          onChange={(v) => store.setValue('one', v)}
          id='one'
        />
      </div>
      large形式
      <div className='m-padding-10'>
        <Counter
          value={store.two}
          onChange={(v) => store.setValue('two', v)}
          id='two'
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
          id='three'
          getErrorMsg={handleCheckValue}
        />
      </div>
      111
      <div className='m-padding-10'>
        <Counter
          value={store.four}
          min={3}
          max={100}
          onChange={(v) => store.setValue('four', v)}
          id='four'
        />
      </div>
      222
      <div className='m-padding-10'>
        <Counter
          value={store.five}
          onChange={(v) => store.setValue('five', v)}
          id='five'
        />
      </div>
      333
      <div className='m-padding-10'>
        <Counter
          value={store.six}
          min={3}
          max={10}
          onChange={(v) => store.setValue('six', v)}
          id='six'
          getErrorMsg={handleCheckValue}
        />
      </div>
      444
      <div className='m-padding-10'>
        <Counter
          value={store.seven}
          onChange={(v) => store.setValue('seven', v)}
          id='seven'
        />
      </div>
    </Page>
  )
}

export default {
  title: '基础/Counter',
}
