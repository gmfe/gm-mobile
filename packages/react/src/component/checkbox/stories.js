import React from 'react'
import { observable } from 'mobx'

import Checkbox from './'
import SVGSuccess from '../../../svg/success.svg'
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
  <div>
    checked {`${store1.checked ? 'true' : 'false'}`}
    <div>
      <Checkbox
        checked={store1.checked}
        onChange={(value) => store1.setChecked(value)}
      />
    </div>
    checked {`${store2.checked ? 'true' : 'false'}`}
    <div>
      <Checkbox
        checked={store2.checked}
        onChange={(value) => store2.setChecked(value)}
      />
    </div>
    disabled
    <div>
      <Checkbox
        inline
        disabled
        checked={store3.checked}
        onChange={(value) => store3.setChecked(value)}
      />
      <Checkbox
        inline
        disabled
        checked={!store3.checked}
        onChange={(value) => store3.setChecked(value)}
      />
    </div>
    children
    <div>
      <Checkbox
        checked={store4.checked}
        onChange={(value) => store4.setChecked(value)}
      >
        选择
      </Checkbox>
    </div>
  </div>
)

export default {
  title: 'Checkbox',
}
