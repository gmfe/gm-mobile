import React from 'react'
import { observable } from 'mobx'

import Price from './index'
import View from '../view'

export const normal = () => {
  return (
    <View>
      <View>
        说明：
        <View />
        货币符号相关方法： setCurrency, setCurrencyList, getCurrency
        <View />
        单位相关方法： setUnit, getUnit
        <View />
        定义金额展示： format
      </View>
      <View />
      normal形式
      <View className='m-margin-5'>
        <Price value={100} />
      </View>
      <View className='m-margin-5'>
        <Price currencyScale={0.5} value={-12314} />
      </View>
      <View className='m-margin-5'>
        <Price isFenUnit value={12345.678} />
      </View>
      <View className='m-margin-5'>
        <Price value={125345.6478} precision={3} />
      </View>
      <View />
      format -- 保留几位小数展示<View />
      {Price.format(-8132789.5404)}
    </View>
  )
}

export default {
  title: '基础/Price',
}
