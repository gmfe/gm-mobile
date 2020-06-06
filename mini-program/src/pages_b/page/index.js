import React from 'react'
import { Button, PageMP, Toast, View } from '../../../../packages/mp/src'
import { useDidShow, usePullDownRefresh, useReachBottom } from '@tarojs/taro'

const Index = () => {
  usePullDownRefresh(() => {
    Toast.loading('onPullDownRefresh')

    setTimeout(() => {
      Toast.clear()
      wx.stopPullDownRefresh()
    }, 2000)
  })

  useReachBottom(() => {
    Toast.tip('onReachBottom')
  })

  useDidShow(() => {
    Toast.tip('show')
  })

  return (
    <PageMP>
      <Button
        mini
        onClick={() => {
          wx.startPullDownRefresh({
            success() {
              console.log('success')
            },
            fail() {
              console.log('fail')
            },
          })
        }}
      >
        startPullDownRefresh
      </Button>
      <Button
        mini
        onClick={() => {
          wx.stopPullDownRefresh({
            success() {
              console.log('success')
            },
            fail() {
              console.log('fail')
            },
          })
        }}
      >
        stopPullDownRefresh
      </Button>
      <View style={{ height: '100vh' }} />
      <View>onReachBottom</View>
      <View>onReachBottom</View>
    </PageMP>
  )
}

export default Index
