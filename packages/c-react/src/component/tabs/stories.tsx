import React from 'react'
import { observable } from 'mobx'
import { View } from '../view'

import Tabs from './tabs'

const store = {
  active: 'a',
  setActiveTab(index: string) {
    this.active = index
  },
}

const tabsList = [
  { value: 'a', text: '模块一' },
  { value: 'b', text: '模块二' },
  { value: 'c', text: '模块三' },
]
const defaultStore = observable(store)

export const normal = () => {
  return (
    <View className='m-padding-10' style={{ height: '300px' }}>
      default
      <Tabs
        active={defaultStore.active}
        tabs={tabsList}
        onChange={(index) => defaultStore.setActiveTab(index)}
      />
      label
      <View className='m-bg-back m-padding-tb-10'>
        <Tabs
          active={defaultStore.active}
          tabs={tabsList}
          onChange={(index) => defaultStore.setActiveTab(index)}
          type='label'
        />
      </View>
      capsule
      <Tabs
        active={defaultStore.active}
        tabs={tabsList}
        onChange={(index) => defaultStore.setActiveTab(index)}
        type='capsule'
      />
    </View>
  )
}

export default {
  title: '布局/Tabs',
  component: Tabs,
}
