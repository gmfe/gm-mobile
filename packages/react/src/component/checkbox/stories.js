import React from 'react'
import { observable } from 'mobx'

import Checkbox from './'

const store = {
  checked: true,
  setChecked(value) {
    this.checked = value
  },
}

const store1 = observable(store)
const store2 = observable({
  ...store,
  checked: false,
})
const store3 = observable(store)

export const normal = () => (
  <div>
    checked {`${store1.checked ? 'true' : 'false'}`}
    <div>
      <Checkbox checked={store1.checked}>aaa</Checkbox>
    </div>
    checked {`${store2.checked ? 'true' : 'false'}`}
    <div>
      <Checkbox checked={store2.checked}>bbb</Checkbox>
    </div>
    disabled
    <div>
      <Checkbox disabled checked={store3.checked}>aaa</Checkbox>
      <Checkbox disabled checked={!store3.checked}>bbb</Checkbox>
    </div>
  </div>
)

export default {
  title: 'Checkbox',
}
