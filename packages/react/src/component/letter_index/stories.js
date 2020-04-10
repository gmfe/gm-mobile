import React from 'react'
import { observable } from 'mobx'
import _ from 'lodash'

import Page from '../page'
import LetterIndex from './letter_index'
import LetterIndexMultiple from './letter_index_multiple'

const data = [
  { value: 'apple', text: 'apple' },
  { value: 'banana', text: 'banana' },
  { value: 'orange', text: 'orange' },
  {
    value: 'watermalon',
    text: 'watermalon',
  },
  { value: 'apples', text: 'apples' },
  { value: 'bananas', text: 'bananas' },
  { value: 'oranges', text: 'oranges' },
  {
    value: 'watermalons',
    text: 'watermalons',
  },
]

const store = observable({
  selected: null,
  setSelected(selected) {
    this.selected = selected
  },
})

const mulStore = observable({
  selected: [],
  setSelected(selected) {
    this.selected = selected
  },
})

// 简单以英文为例
export const Normal = () => (
  <Page>
    <LetterIndex
      data={data}
      selected={store.selected}
      onSelect={(selected) => store.setSelected(selected)}
      getFirstLetter={(v) => v[0]}
    />
  </Page>
)

export const Multiple = () => (
  <Page>
    <LetterIndexMultiple
      data={data}
      selected={mulStore.selected}
      onSelect={(selected) => {
        console.log(selected)
        mulStore.setSelected(selected)
      }}
      onCancel={_.noop}
      getFirstLetter={(v) => v[0]}
    />
  </Page>
)

export default {
  title: 'Letter',
}
