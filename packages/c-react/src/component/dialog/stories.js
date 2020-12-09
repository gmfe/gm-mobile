import React from 'react'
import Dialog from './'
import Toast from '../toast'
import View from '../view'
import Button from '../button'

export const normal = () => {
  return (
    <View>
      <Button
        onClick={() => {
          Dialog.alert('啦啦啦啦').then(() => {
            console.log('resolve')
          })
        }}
      >
        alert
      </Button>
      <Button
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
      </Button>
      <Button
        onClick={() => {
          Dialog.delete('是否要删除').then(
            () => {
              console.log('resolve')
            },
            () => {
              console.log('reject')
            }
          )
        }}
      >
        delete
      </Button>
      <Button
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
      </Button>
    </View>
  )
}

export default {
  title: '浮层/Dialog',
}
