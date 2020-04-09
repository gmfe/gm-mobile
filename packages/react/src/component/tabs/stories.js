import React from 'react'
import { observable } from 'mobx'

import Tabs from './'

const tabsList = ['模块一', '模块二', '模块三']
const store = observable({
  tabIndex: 1,
  setTabIndex(index) {
    this.tabIndex = index
  }
})

export const Normal = () => {
  return (
    <Tabs
      tabIndex={store.tabIndex}
      list={tabsList}
      onChange={index => store.setTabIndex(index)}
    />
  )
}

export default {
  title: 'Tab',
}
