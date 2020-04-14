import React from 'react'
import Dialog from './'
import Toast from '../toast'

export const normal = () => {
  return (
    <div>
      <button
        onClick={() => {
          Dialog.alert('啦啦啦啦').then(() => {
            console.log('resolve')
          })
        }}
      >
        alert
      </button>
      <button
        onClick={() => {
          Dialog.confirm('是否要啥啥啥').then(
            () => {
              console.log('resolve')
            },
            () => {
              console.log('reject')
            }
          )
        }}
      >
        confirm
      </button>
      <button
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
      </button>
      <button
        onClick={() => {
          Dialog.prompt({
            promptText: '是否要啥啥啥',
            promptInputProps: {
              placeholder: '请输入列表名称',
            },
            onConfirm: (value) => {
              console.log('confirm', value)
              if (value === '') {
                Toast.tip('请输入')
                return false
              }
            },
          }).then(
            (value) => {
              console.log('resolve', value)
            },
            () => {
              console.log('reject')
            }
          )
        }}
      >
        prompt
      </button>
    </div>
  )
}

export default {
  title: 'Dialog',
}
