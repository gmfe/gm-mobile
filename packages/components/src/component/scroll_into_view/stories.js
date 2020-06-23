import React, { useState, useEffect } from 'react'
import ScrollIntoView from './index'
import View from '../view'
import { is } from '@gm-mobile/tool'

export const normal = () => {
  const [scrollId, setScrollId] = useState(null)

  useEffect(() => {
    if (is.weApp()) {
      setScrollId('gg')
      return
    }
    setScrollId('.gg')
  }, [])

  return (
    <View>
      滑动到bbb处
      <ScrollIntoView style={{ height: '100px', overflowY: 'auto' }} scrollIntoView={scrollId}>
        <View className='aa' id='aa'>
          aaa
        </View>
        <View className='bb' id='bb'>
          aaa
        </View>
        <View className='cc' id='cc'>
          aaa
        </View>
        <View className='dd' id='dd'>
          aaa
        </View>
        <View className='ee' id='ee'>
          aaa
        </View>
        <View className='ff' id='ff'>
          aaa
        </View>
        <View className='gg' id='gg'>
          bbb
        </View>
        <View className='hh' id='hh'>
          aaa
        </View>
        <View className='ii' id='ii'>
          aaa
        </View>
        <View className='jj' id='jj'>
          aaa
        </View>
        <View className='kk' id='kk'>
          aaa
        </View>
        <View className='ll' id='ll'>
          aaa
        </View>
        <View className='mm' id='mm'>
          aaa
        </View>
      </ScrollIntoView>
    </View>
  )
}

export default {
  title: '布局/ScrollIntoView',
}
