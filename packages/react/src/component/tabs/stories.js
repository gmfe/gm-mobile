import React from 'react'
import { observable } from 'mobx'

import Tabs from './'
import Page from '../page'

const store = {
  activeTab: 1,
  setActiveTab(index) {
    this.activeTab = index
  },
}

const tabsList = [
  { value: 1, text: '模块一' },
  { value: 2, text: '模块二' },
  { value: 3, text: '模块三' },
]
const tabsContent = ['aaa', 'bbb', 'ccc']
const defaultStore = observable(store)
export const defaultType = () => {
  return (
    <div className='m-padding-10' style={{ height: '300px' }}>
      default形式
      <Tabs
        activeTab={defaultStore.activeTab}
        tabs={tabsList}
        onChange={(index) => defaultStore.setActiveTab(index)}
      />
      <div className='m-text-center m-margin-10'>
        {tabsContent[defaultStore.activeTab - 1]}
      </div>
    </div>
  )
}

const labelTabs = [
  { value: 1, text: '全部' },
  { value: 2, text: '待分拣' },
  { value: 3, text: '分拣中' },
  { value: 4, text: '配送中' },
  { value: 5, text: '已签收' },
]
const labelTabsContent = ['aaa', 'bbb', 'ccc', 'ddd', 'eee']
const labelStore = observable(store)
export const labelType = () => {
  return (
    <Page className='m-padding-10' style={{ height: '300px' }}>
      <span className='m-padding-10'>label 形式</span>
      <Tabs
        activeTab={labelStore.activeTab}
        tabs={labelTabs}
        onChange={(index) => labelStore.setActiveTab(index)}
        type='label'
      />
      <div className='m-margin-10 m-text-center'>
        {labelTabsContent[labelStore.activeTab - 1]}
      </div>
    </Page>
  )
}

const capsuleTabs = [
  { value: 1, text: '到店自提' },
  { value: 2, text: '外卖配送' },
  { value: 3, text: '到店自提' },
]
const capsuleTabsContent = ['aaa', 'bbb']
const capsuleStore = observable(store)
export const capsuleType = () => {
  return (
    <Page className='m-padding-10 m-bg-back' style={{ height: '300px' }}>
      <span className='m-padding-10'>capsule 形式</span>
      <Tabs
        activeTab={capsuleStore.activeTab}
        tabs={capsuleTabs}
        onChange={(index) => capsuleStore.setActiveTab(index)}
        type='capsule'
      />
      <div className='m-margin-10'>
        {capsuleTabsContent[capsuleStore.activeTab - 1]}
      </div>
    </Page>
  )
}

export default {
  title: '布局/Tabs',
}
