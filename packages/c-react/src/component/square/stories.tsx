import React from 'react'
import Square from './square'

import { View } from '../view'

export const Normal = () => {
  return (
    <View style={{ width: '50%' }}>
      <Square className='m-bg-white' />
    </View>
  )
}

export default {
  title: '布局/Square',
  component: Square,
}
