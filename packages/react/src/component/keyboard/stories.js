import React from 'react'
import { observable } from 'mobx'

import Button from '../button'
import KeyboardWrap from './wrap'
import Page from '../page'

const numStore = observable({
  value: '',
  setValue(v) {
    this.value = v
  },
})

export const normal = () => {
  return (
    <Page>
      <span className='m-margin-left-20'>现切冬瓜500g: {numStore.value}</span>
      <KeyboardWrap
        title='现切冬瓜500g'
        onSubmit={(v) => numStore.setValue(v)}
        min={2}
        max={100}
      >
        <Button mini className='m-margin-10'>
          点击输入数量
        </Button>
      </KeyboardWrap>
    </Page>
  )
}

export default {
  title: '表单/Keyboard',
}
