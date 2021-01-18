import React from 'react'
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import appConfig from '@/app.config'
import { getCurrentPages } from '@tarojs/taro'
import _ from 'lodash'
import { View } from '../view'

function getCustomTabbarHeight(): number {
  let height = 0
  if (appConfig.tabBar.custom) {
    const path = _.last(getCurrentPages())?.route
    if (_.find(appConfig.tabBar.list, (v) => v.pagePath === path)) {
      height = 49
    }
  }

  return height
}

const CustomTabbar = () => {
  const height = getCustomTabbarHeight()
  if (height === 0) {
    return null
  }

  return <View style={{ height: `${height}px` }} />
}

CustomTabbar.getCustomTabbarHeight = getCustomTabbarHeight

export default CustomTabbar
