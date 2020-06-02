import React from 'react'
import { observable } from 'mobx'

import Button from '../button'
import KeyboardWrap from './wrap'
import Page from '../page'

const numStore = observable({
  one: '',
  two: '',
  three: '',
  setValue(id, v) {
    this[id] = v
  },
})

const KeyboardInput = ({ id, value }) => {
  return (
    <div>
      <div className='m-block m-gap-20' />
      <span
        className='m-inline-block m-margin-left-10'
        style={{ width: '100px', height: '30px' }}
      >
        商品{id}:
      </span>
      <KeyboardWrap
        title={`商品${id}`}
        defaultValue={value}
        onSubmit={(v) => numStore.setValue(id, v)}
        min={2}
        max={100}
        className='m-inline-block'
      >
        <Button plain>{value}</Button>
      </KeyboardWrap>

      <div className='m-block m-gap-20' />
    </div>
  )
}

export const normal = () => {
  return (
    <Page
      bottom={<div className='m-border-top m-padding-10'>bottom bottom</div>}
      tabbar={<div className='m-border-top m-padding-10'>tabbar tabbar</div>}
    >
      <div>切成移动端，否则好像有问题，暂时不知道为什么</div>
      <KeyboardInput id='one' value={numStore.one} />
      <KeyboardInput id='two' value={numStore.two} />
      <KeyboardInput id='three' value={numStore.three} />
    </Page>
  )
}

export default {
  title: '表单/Keyboard',
}
