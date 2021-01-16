import React from 'react'
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import appConfig from '@/app.config'
import { getCurrentPages } from '@tarojs/taro'
import _ from 'lodash'
import { View } from '../view'

const CustomTabbar = () => {
  if (!appConfig.tabBar.custom) {
    return null
  }

  const path = _.last(getCurrentPages())?.route
  if (_.find(appConfig.tabBar.list, (v) => v.pagePath === path)) {
    return <View style={{ height: '49px' }} />
  }

  return null
}

export default CustomTabbar
