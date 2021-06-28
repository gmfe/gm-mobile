import React from 'react'
import { Flex } from '../flex'
import { View } from '../view'
import { Draggable } from './index'

export const normal = (args) => {
  return (
    <View
      className='m-bg-white m-container-full m-padding-20'
      style={{ height: '100vh' }}
    >
      <View>使用Fixed定位，请在canvas中预览，或切换浏览器到手机模拟器</View>
      <Draggable {...args}>
        <Flex
          alignCenter
          justifyCenter
          className='m-bg-primary m-text-white m-text-20'
          width='100%'
          height='100%'
          style={{ borderRadius: '50%' }}
        >
          +
        </Flex>
      </Draggable>
    </View>
  )
}
normal.args = {
  width: '50px',
  height: '50px',
  autoCling: true,
}

export default {
  title: '布局/Draggable',
  component: Draggable,
}
