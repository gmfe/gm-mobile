# 表单/Input
```tsx
import React from 'react'
import Input from './input'
import InputPassword from './input_password'
import { observable } from 'mobx'
import InputMaxLength from './input_max_length'
import { View } from '../view'
import { observer } from 'mobx-react'

const store = observable({
  value: '',
  setValue(value: string) {
    this.value = value
  },
})

const normal = observer(() => {
  return (
    <View>
      <Input
        value={store.value}
        onChange={(e) => store.setValue(e.target.value)}
        placeholder='请输入'
      />
      disabled
      <Input
        value={store.value}
        onChange={(e) => store.setValue(e.target.value)}
        placeholder='请输入'
        disabled
      />
    </View>
  )
})
export default normal
```

```tsx
import React from 'react'
import Input from './input'
import InputPassword from './input_password'
import { observable } from 'mobx'
import InputMaxLength from './input_max_length'
import { View } from '../view'
import { observer } from 'mobx-react'
const store = observable({
  value: '',
  setValue(value: string) {
    this.value = value
  },
})
const isForm = () => {
  return (
    <View>
      <Input
        value={store.value}
        isForm
        onChange={(e) => store.setValue(e.target.value)}
        placeholder='请输入'
      />
      disabled
      <Input
        value={store.value}
        onChange={(e) => store.setValue(e.target.value)}
        placeholder='请输入'
        disabled
      />
    </View>
  )
}
export default observer(isForm)
```

```tsx
import React from 'react'
import Input from './input'
import InputPassword from './input_password'
import { observable } from 'mobx'
import InputMaxLength from './input_max_length'
import { View } from '../view'
import { observer } from 'mobx-react'
const store = observable({
  value: '',
  setValue(value: string) {
    this.value = value
  },
})
const maxLength = () => {
  return (
    <InputMaxLength
      value={store.value}
      maxLength={30}
      onChange={(e) => store.setValue(e.target.value)}
      placeholder='请输入'
    />
  )
}
export default observer(maxLength)
```

```tsx
import React from 'react'
import Input from './input'
import InputPassword from './input_password'
import { observable } from 'mobx'
import InputMaxLength from './input_max_length'
import { View } from '../view'
import { observer } from 'mobx-react'

const store = observable({
  value: '',
  setValue(value: string) {
    this.value = value
  },
})

const inputPassword = () => {
  return (
    <InputPassword
      value={store.value}
      onChange={(e) => store.setValue(e.target.value)}
      placeholder='请输入密码'
    />
  )
}
export default observer(inputPassword)
```
