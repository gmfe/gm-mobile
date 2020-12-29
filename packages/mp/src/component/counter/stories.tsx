import React, { useReducer } from 'react'
import { Counter } from '.'
import { Page, View } from '@gm-mobile/c-react'

interface CounterErrorMsg {
  value: string
  min?: number
  max?: number
  precision?: number
}

const reducer = (state: any, action: any) => {
  return {
    ...state,
    [action.type]: action.value,
  }
}

export const Normal = () => {
  const [state, dispatch] = useReducer(reducer, {
    defaultValue: '',
    closeCheckValue: '',
    disableValue: '',
    diyValue: '',
  })

  const handleCheckValue = ({ value, min, max }: CounterErrorMsg) => {
    if (+value > 10) {
      return '库存不足'
    }

    if (+value < 3) {
      return '最小起售为3'
    }
    return ''
  }

  return (
    <Page>
      default形式
      <View className='m-padding-10'>
        <Counter
          value={state.defaultValue}
          min={3}
          max={100}
          onChange={(value) => {
            dispatch({ type: 'defaultValue', value })
          }}
        />
      </View>
      关闭键盘上下限校验
      <View className='m-padding-10'>
        <Counter
          value={state.closeCheckValue}
          min={3}
          max={100}
          closeCheck
          onChange={(value) => {
            dispatch({ type: 'closeCheckValue', value })
          }}
        />
      </View>
      disable
      <View className='m-padding-10'>
        <Counter
          value={state.disableValue}
          disabled
          onChange={(value) => {
            dispatch({ type: 'disableValue', value })
          }}
        />
      </View>
      自定义提示信息
      <View className='m-padding-10'>
        <Counter
          min={3}
          max={10}
          value={state.diyValue}
          onChange={(value) => {
            dispatch({ type: 'diyValue', value })
          }}
          getErrorMsg={handleCheckValue}
        />
      </View>
    </Page>
  )
}

export default {
  title: '基础/Counter',
}
