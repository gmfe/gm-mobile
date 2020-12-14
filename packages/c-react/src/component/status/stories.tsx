import React from 'react'
import Status from '.'
import View from '../view'

export const Normal = () => {
  return (
    <View>
      <Status type='loading' />
      <Status
        type='error'
        onReload={() => {
          console.log('reload')
        }}
      />
      <Status type='empty' />
    </View>
  )
}

export default {
  title: '布局/Status',
}
