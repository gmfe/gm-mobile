import React, { useState, useEffect } from 'react'
import { View, Input, Button, Toast } from '@gm-mobile/c-react'
import Storage from './index'

const key = 'input'

export const Normal = () => {
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

export default {
  title: '其他/Storage',
  parameters: {
    info: {
      text: `
### Static
- \`set(key, value)\` 
- \`get(key)\`
- \`remove(key)\`
- \`clear\` 慎用，清除本域名全部存储
- \`getAll\` 拿到全部存储，以Obj形式返回
`,
    },
  },
}
