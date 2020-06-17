import React, { useReducer } from 'react'

import Counter from './'
import { Page, View } from '@gm-mobile/components'

const reducer = (state, action) => {
  console.log(action)
  return {
    ...state,
    [action.type]: action.value
  }
}

export const normal = () => {
  const [state, dispatch] = useReducer(reducer, {
    one: '',
    two: '',
    three: '',
  })

  const handleCheckValue = ({ value, min, max, precision }) => {
    if (value > 10) {
      return '库存不足'
    }

    if (value < 3) {
      return '最小起售为3'
    }
    return null
  }

  return (
    <Page>
      default形式
      <View className='m-padding-10'>
        <Counter
          value={state.one}
          min={3}
          max={100}
          onChange={(value) => {
            dispatch({ type: 'one', value })
          }}
        />
      </View>
      disable
      <View className='m-padding-10'>
        <Counter
          value={state.two}
          large
          disabled
          onChange={(value) => {
            dispatch({ type: 'two', value })
          }}
        />
      </View>
    </Page>
  )
}

export default {
  title: '基础/Counter',
}
