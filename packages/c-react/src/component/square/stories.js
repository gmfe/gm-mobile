import React from 'react'
import Square from './'

import View from '../view'

export const Normal = () => {
  return (
    <View style={{ width: '50%' }}>
      <Square className='m-bg-white'></Square>
    </View>
  )
}

export default {
  title: '布局/Square',
}
