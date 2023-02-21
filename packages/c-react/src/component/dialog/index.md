
# 浮层/Dialog

```tsx
import React from 'react'
import { Dialog } from '.'
import { Toast } from '../toast'
import { View } from '../view'
import { Button } from '../button'
import choose from './common/choose'

const alert = () => {
  return (
    <View>
      <Button
        className='m-margin-10'
        onClick={() => {
          Dialog.alert('啦啦啦啦').then(() => console.log('resolve'))
        }}
      >
        alert
      </Button>
    </View>
  )
}

export default alert
```

```tsx
import React from 'react'
import { Dialog } from '.'
import { Toast } from '../toast'
import { View } from '../view'
import { Button } from '../button'
import choose from './common/choose'

const confirm = () => {
  return (
    <View>
      <Button
        className='m-margin-10'
        onClick={() => {
          Dialog.confirm('是否要啥啥啥').then(
            () => console.log('resolve'),
            () => {
              console.log('reject')
            }
          )
        }}
      >
        confirm
      </Button>
    </View>
  )
}
export default confirm
```
```tsx
import React from 'react'
import { Dialog } from '.'
import { Toast } from '../toast'
import { View } from '../view'
import { Button } from '../button'
import choose from './common/choose'

const Delete = () => {
  return (
    <View>
      <Button
        className='m-margin-10'
        onClick={() => {
          Dialog.delete('是否要删除').then(
            () => console.log('resolve'),
            () => {
              console.log('reject')
            }
          )
        }}
      >
        delete
      </Button>
      <Button
        className='m-margin-10'
        onClick={() => {
          Dialog.render({
            children: '是否要啥啥啥',
            onConfirm: () => {
              console.log('confirm')
            },
            onCancel: () => {
              console.log('cancel')
            },
            otherText: '其他按钮',
            onOther: () => {
              console.log('otherText')
            },
          })
        }}
      >
        other btn
      </Button>
      <Button
        className='m-margin-10'
        onClick={() => {
          Dialog.prompt({
            promptText: '是否要啥啥啥',
            promptInputProps: {
              placeholder: '请输入列表名称',
            },
            promptGetError: (value) => {
              if (value.length > 5) {
                return '超过5个字啦'
              }
              return ''
            },
            onConfirm: (value): boolean | void => {
              console.log('confirm', value)
              if (value === '') {
                Toast.tip('请输入')
                return false
              }
            },
          }).then(
            (value) => console.log('resolve', value),
            () => {
              console.log('reject')
            }
          )
        }}
      >
        prompt
      </Button>

      <Button
        className='m-margin-10'
        onClick={() => {
          choose({
            list: Array(10)
              .fill(null)
              .map((_, i) => {
                return {
                  text: 'LABEL' + i,
                  value: i,
                }
              }),
          })
        }}
      >
        Choose
      </Button>
    </View>
  )
}

export default Delete
```

```tsx
import React from 'react'
import { Dialog } from '.'
import { Toast } from '../toast'
import { View } from '../view'
import { Button } from '../button'
import choose from './common/choose'

const render = () => {
  return (
    <View>
      <Button
        className='m-margin-10'
        onClick={() => {
          Dialog.render({
            children: '是否要啥啥啥',
            onConfirm: () => {
              console.log('confirm')
            },
            onCancel: () => {
              console.log('cancel')
            },
            otherText: '其他按钮',
            onOther: () => {
              console.log('otherText')
            },
          })
        }}
      >
        other btn
      </Button>
      <Button
        className='m-margin-10'
        onClick={() => {
          Dialog.prompt({
            promptText: '是否要啥啥啥',
            promptInputProps: {
              placeholder: '请输入列表名称',
            },
            promptGetError: (value) => {
              if (value.length > 5) {
                return '超过5个字啦'
              }
              return ''
            },
            onConfirm: (value): boolean | void => {
              console.log('confirm', value)
              if (value === '') {
                Toast.tip('请输入')
                return false
              }
            },
          }).then(
            (value) => console.log('resolve', value),
            () => {
              console.log('reject')
            }
          )
        }}
      >
        prompt
      </Button>

      <Button
        className='m-margin-10'
        onClick={() => {
          choose({
            list: Array(10)
              .fill(null)
              .map((_, i) => {
                return {
                  text: 'LABEL' + i,
                  value: i,
                }
              }),
          })
        }}
      >
        Choose
      </Button>
    </View>
  )
}

export default render
```

```tsx
import React from 'react'
import { Dialog } from '.'
import { Toast } from '../toast'
import { View } from '../view'
import { Button } from '../button'
import choose from './common/choose'

const prompt = () => {
  return (
    <View>
      <Button
        className='m-margin-10'
        onClick={() => {
          Dialog.prompt({
            promptText: '是否要啥啥啥',
            promptInputProps: {
              placeholder: '请输入列表名称',
            },
            promptGetError: (value) => {
              if (value.length > 5) {
                return '超过5个字啦'
              }
              return ''
            },
            onConfirm: (value): boolean | void => {
              console.log('confirm', value)
              if (value === '') {
                Toast.tip('请输入')
                return false
              }
            },
          }).then(
            (value) => console.log('resolve', value),
            () => {
              console.log('reject')
            }
          )
        }}
      >
        prompt
      </Button>

      <Button
        className='m-margin-10'
        onClick={() => {
          choose({
            list: Array(10)
              .fill(null)
              .map((_, i) => {
                return {
                  text: 'LABEL' + i,
                  value: i,
                }
              }),
          })
        }}
      >
        Choose
      </Button>
    </View>
  )
}

export default prompt
```

