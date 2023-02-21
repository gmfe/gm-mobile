# 表单/Switch

```tsx
import React from 'react'
import Switch from './Switch'
import { observable } from 'mobx'
import { View } from '../view'
import { observer } from 'mobx-react'

const store = observable({
  checked: false,
  setChecked(checked: boolean) {
    this.checked = checked
  },
})

const normal = () => {
  return (
    <View>
      <Switch
        checked={store.checked}
        onChange={() => {
          store.setChecked(!store.checked)
        }}
      />
      <Switch
        checked={!store.checked}
        onChange={() => {
          store.setChecked(store.checked)
        }}
      />

      <Switch
        disabled
        checked={!store.checked}
        onChange={() => {
          store.setChecked(!store.checked)
        }}
      />
    </View>
  )
}

export default observer(normal)
```
