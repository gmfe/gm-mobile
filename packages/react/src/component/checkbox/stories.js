import React from 'react'
import { observable } from 'mobx'

import Checkbox from './'
import Flex from '../flex'

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
const store4 = observable(store)

export const normal = () => (
  <div className='m-margin-left-10'>
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
    children
    <div>
      <Checkbox
        checked={store4.checked}
        onChange={(value) => store4.setChecked(value)}
      >
        选择
      </Checkbox>
      <Checkbox checked={store4.checked} disabled>
        选择
      </Checkbox>
      <Checkbox checked={!store4.checked} disabled>
        选择
      </Checkbox>
    </div>
  </div>
)

export default {
  title: 'Checkbox',
}
