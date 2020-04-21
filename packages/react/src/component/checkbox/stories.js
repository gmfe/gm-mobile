import React from 'react'
import Flex from '../flex'
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
    <Flex>
      <Checkbox checked={store1.checked}>选择</Checkbox>
      <Checkbox circle checked={store1.checked}>选择</Checkbox>
    </Flex>
    checked {`${store2.checked ? 'true' : 'false'}`}
    <Flex>
      <Checkbox checked={store2.checked}>选择</Checkbox>
      <Checkbox circle checked={store2.checked}>选择</Checkbox>
    </Flex>
    disabled
    <Flex>
      <div>
        <Checkbox disabled checked={store3.checked} className='m-text-16'>选择</Checkbox>
        <Checkbox disabled checked={!store3.checked} className='m-text-16'>选择</Checkbox>
      </div>
      <div>
        <Checkbox disabled circle checked={store3.checked} className='m-text-16'>选择</Checkbox>
        <Checkbox disabled circle checked={!store3.checked} className='m-text-16'>选择</Checkbox>
      </div>
    </Flex>
    checked shape
    <Flex>
      <Checkbox checked={false} className='m-text-16'>normal</Checkbox>
      <Checkbox circle checked={false} className='m-text-16'>circle</Checkbox>
    </Flex>
  </div>
)

export default {
  title: '表单/Checkbox',
}
