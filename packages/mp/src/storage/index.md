# 其他/Storage
```tsx
import React, { useState, useEffect } from 'react'
import { View, Input, Button, Toast } from '@gm-mobile/c-react'
import Storage from './index'

const key = 'input'

const Normal = () => {
  const [value, setValue] = useState(Storage.get(key) || '')

  useEffect(() => {
    Storage.set('bool', true)
  }, [])

  return (
    <View>
      <Input
        type='text'
        placeholder='请输入'
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          Storage.set(key, e.target.value)
        }}
      />
      <View>storage data: {Storage.get(key)}</View>
      <Button
        onClick={() => {
          Storage.set('hello', 'hello')
        }}
      >
        设置
      </Button>
      <Button
        onClick={() => {
          Storage.clear()
        }}
      >
        清空
      </Button>
      <Button
        onClick={() => {
          const data = Storage.getAll()
          Toast.tip(JSON.stringify(data))
        }}
      >
        查看
      </Button>
    </View>
  )
}

export default Normal
```
