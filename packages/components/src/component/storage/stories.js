import React, { useState } from 'react'
import Storage from './index'
import Input from '../input'
import View from '../view'

const key = 'input'

export const Normal = () => {
  const [value, setValue] = useState(Storage.get(key) || '')

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
      <View>data: {Storage.get('')}</View>
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
