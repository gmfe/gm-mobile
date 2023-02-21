# Cookie/Cookie 

```tsx
import React, { useState } from 'react'
import { View, Input, Button } from '../../c-react/src'
import Cookie from './cookie'
import { is } from '@gm-mobile/c-tool'

const key = 'input'

if (is.weApp()) {
  // @ts-ignore
  Cookie.initDomain('guanmai.cn')
}

const Normal = () => {
  const [value, setValue] = useState(Cookie.get(key) || '')

  return (
    <View>
      <Input
        type='text'
        placeholder='请输入'
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          Cookie.set(key, e.target.value)
        }}
      />
      <View>data: {Cookie.get(key)}</View>
      <Button
        onClick={() => {
          Cookie.set('hello', 'hello')
        }}
      >
        设置
      </Button>
    </View>
  )
}

export default Normal
```