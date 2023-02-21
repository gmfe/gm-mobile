# 表单/Radio
```tsx
import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import Radio from './radio'
import { View } from '../view'

const store = observable({
  checked: true,
  setChecked(v: boolean) {
    this.checked = v
  },
})

const Normal = () => {
  return (
    <View>
      <Radio checked={store.checked}>选择</Radio>
      <Radio checked={store.checked} disabled>
        选择
      </Radio>
    </View>
  )
}

export default observer(Normal)
```