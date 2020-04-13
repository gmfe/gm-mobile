import React from 'react'
import Storage from './index'

export const normal = () => <div />

export default {
  title: 'Storage',
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
