
# 表单/Checkbox
```tsx
import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import { Checkbox } from '.'
import { View } from '../view'

const store = observable({
  checked: true,
  setChecked(value: boolean) {
    this.checked = value
  },
})

const normal = () => (
  <View className='m-bg-white'>
    <Checkbox
      checked={store.checked}
      onChange={() => {
        store.setChecked(!store.checked)
      }}
    >
      选择
    </Checkbox>
    <Checkbox
      circle
      checked={store.checked}
      onChange={() => {
        store.setChecked(!store.checked)
      }}
    >
      选择
    </Checkbox>
    <Checkbox
      disabled
      checked={store.checked}
      onChange={() => {
        store.setChecked(!store.checked)
      }}
    >
      选择
    </Checkbox>
    <Checkbox
      primary
      checked={store.checked}
      onChange={() => {
        store.setChecked(!store.checked)
      }}
    >
      选择
    </Checkbox>
    <Checkbox
      primary
      disabled
      checked={store.checked}
      onChange={() => {
        store.setChecked(!store.checked)
      }}
    >
      选择
    </Checkbox>
  </View>
)

export default observer(normal)
```

