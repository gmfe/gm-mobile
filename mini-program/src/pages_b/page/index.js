import React from 'react'
import {
  Button,
  PageMP,
  Toast,
  View,
  useFirstDidShow,
} from '../../../../packages/mp/src'
import { useDidShow, usePullDownRefresh, useReachBottom } from '@tarojs/taro'
import { useRequest } from 'ahooks'

function getSome() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('getSome data')
    }, 2000)
  })
}

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

  useFirstDidShow(() => {
    console.log('useFirstDidShow')
  })

  const { data, error, loading, run } = useRequest(getSome)

  return (
    <PageMP loading={loading} error={error}>
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
      <View>
        {data}
        <Button
          onClick={() => {
            run()
          }}
        >
          重新加载页面数据
        </Button>
      </View>
      <View style={{ height: '100vh' }} />
      <View>onReachBottom</View>
      <View>onReachBottom</View>
    </PageMP>
  )
}

export default Index
