import React from 'react'
import Panel from './panel'
import { View } from '../view'

export const normal = () => {
  return (
    <View className='m-bg-back m-padding-15'>
      <Panel>panel</Panel>
      <View className='m-gap-5' />
      <Panel title='标题'>panel</Panel>
      <View className='m-gap-5' />
      <Panel
        title='标题'
        action={<View className='m-padding-lr-15'>待分拣</View>}
      >
        panel
      </Panel>
      <View className='m-gap-5' />
      <Panel title='标题' top>
        panel
      </Panel>
      <View className='m-gap-5' />
      <Panel title='标题' bottom>
        panel
      </Panel>
      <View className='m-gap-5' />
      <Panel
        title='标题 onTitle'
        onTitle={() => {
          window.location.href = 'https://www.baidu.com'
        }}
      >
        panel
      </Panel>
      <View className='m-gap-5' />
      <Panel title='业务自己做上border，不拉通'>
        <View className='m-border-1px-top-before m-margin-lr-15 m-padding-tb-10'>
          lalalaal
        </View>
      </Panel>
      <View className='m-gap-5' />
      <Panel title='业务自己做上border，拉通'>
        <View className='m-border-1px-top-before m-padding-lr-15 m-padding-tb-10'>
          lalalaal
        </View>
      </Panel>
    </View>
  )
}

export default {
  title: '布局/Panel',
}
