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
    <div className='m-margin-bottom-10'>
      <Checkbox checked={store1.checked} />
    </div>
    checked {`${store2.checked ? 'true' : 'false'}`}
    <div className='m-margin-bottom-10'>
      <Checkbox checked={store2.checked} />
    </div>
    disabled
    <div className='m-margin-bottom-10'>
      <Checkbox disabled checked={store3.checked} />
      <Checkbox disabled checked={!store3.checked} />
    </div>
    children
    <div className='m-margin-bottom-10'>
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
