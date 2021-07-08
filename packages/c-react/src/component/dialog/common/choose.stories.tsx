import React from 'react'
import { Button } from '../../button'
import { View } from '../../view'
import choose, { ChooseProps } from './choose'

export const Choose = (args: ChooseProps) => {
  return (
    <View>
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
Choose.args = {
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
} as ChooseProps

export default {
  title: '浮层/Dialog/Choose',
  parameters: {
    docs: {
      source: {
        type: 'auto',
      },
    },
  },
}
