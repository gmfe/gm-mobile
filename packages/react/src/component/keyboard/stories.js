import React from 'react'
import { observable } from 'mobx'

import Button from '../button'
import KeyboardWrap from './wrap'
import Page from '../page'

const numStore = observable({
  one: '',
  two: '',
  three: '',
  four: '',
  five: '',
  six: '',
  seven: '',
  setValue(id, v) {
    this[id] = v
  },
})

const KeyboardInput = ({ id, value }) => {
  return (
    <div>
      <div className='m-block m-gap-20' />
      <span className='m-inline-block m-margin-left-10' style={{ width: '100px', height: '30px' }}>商品{id}:</span>
      <KeyboardWrap
        title={`商品${id}`}
        onSubmit={(v) => numStore.setValue(id, v)}
        min={2}
        max={100}
        className='m-inline-block'
      >
        <Button plain>
          {value}
        </Button>
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
      <KeyboardInput id='one' value={numStore.one} />
      <KeyboardInput id='two' value={numStore.two} />
      <KeyboardInput id='three' value={numStore.three} />
      <KeyboardInput id='four' value={numStore.four} />
      <KeyboardInput id='five' value={numStore.five} />
      <KeyboardInput id='six' value={numStore.six} />
      <KeyboardInput id='seven' value={numStore.seven} />
    </Page>
  )
}

export default {
  title: '表单/Keyboard',
}
