import React from 'react'
import { Button } from '../../button'
import { View } from '../../view'
import choose, { ChooseProps } from './choose'

export const Choose = (args: ChooseProps) => {
  return (
    <View style={{ minHeight: '600px' }}>
      <Button
        className='m-margin-10'
        onClick={() => {
          choose(args).then((res) => {
            console.log(res)
            return alert(JSON.stringify(res))
          })
        }}
      >
        快速选择
      </Button>
    </View>
  )
}

export default {
  title: '浮层/Dialog/Choose',
  component: choose,
  args: {
    list: Array(10)
      .fill(null)
      .map((_, i) => {
        return {
          text: 'LABEL-' + i,
          value: i,
        }
      }),
    multiSelect: false,
    needConfirm: false,
    //   search: false,
    title: 'Title',
    defaultSelected: [{ text: '', value: 0 }],
  } as ChooseProps,
  argTypes: {
    multiSelect: {
      description: '是否显示确认按钮，多选时multiSelect强制为true',
    },
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `
choose(options).then((res) => {
  return alert(JSON.stringify(res))
})`,
      },
    },
  },
}
