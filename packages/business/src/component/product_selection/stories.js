import React from 'react'
import { observable } from 'mobx'
import _ from 'lodash'

import { Page } from '@gm-mobile/react'
import ProductSelection from '.'

const data = [
  { value: 'apple', text: '苹果' },
  { value: 'banana', text: '香蕉' },
  { value: 'orange', text: '橙子' },
  {
    value: 'watermalon',
    text: '西瓜',
  },
  { value: 'chicken', text: '鸡' },
  { value: 'duck', text: '鸭' },
  { value: 'goose', text: '鹅' },
  {
    value: 'watermalons',
    text: 'watermalons',
  },
]

const mulStore = observable({
  selected: [],
  setSelected(selected) {
    this.selected = selected
  },
})

// 简单以英文为例
export const Normal = () => (
  <Page>
    <ProductSelection
      data={data}
      selected={mulStore.selected}
      onSelect={(selected) => mulStore.setSelected(selected)}
    />
  </Page>
)

export default {
  title: '业务/ProductSelection',
}
