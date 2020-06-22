import React from 'react'
import moment from 'moment'
import { observable } from 'mobx'

import Coupon from './coupon'
import ReceivedCoupon from './received_coupon'
import { View } from '@gm-mobile/components'

const store = observable({
  checked: false,
  setChecked(checked) {
    this.checked = checked
  },
})

export const normal = () => (
  <View className='m-bg-white'>
    <View className='m-padding-15'>
      <Coupon
        currency='¥'
        discount={100}
        totalInfo='满1000元可用'
        dateInfo='2020-04-29~2020-05-05'
        title='分类优惠券AA'
        label='仅限xxx商品使用'
        checked={store.checked}
        onCheck={() => store.setChecked(!store.checked)}
      />
    </View>
    <View className='m-padding-15'>
      <Coupon
        currency='¥'
        discount={30}
        totalInfo='满1000元可用'
        dateInfo='2020-05-05到期'
        label='仅限xxxxxx商品使用'
        title='分类优惠券B'
        hasUseInfo
        useInfo={
          <View>
            <View>1. aaa</View>
            <View>2. bbb</View>
          </View>
        }
        onUse={() => console.log('use')}
        type='vip'
      />
    </View>
    <View className='m-padding-15'>
      <Coupon
        currency='¥'
        discount={200}
        totalInfo='满300元可用'
        hasUseInfo
        dateInfo='2020-05-05到期'
        label='仅限xxxxxx商品使用'
        title='分类优惠券AA'
        onUse={() => console.log('use')}
        disabled
      />
    </View>
    <View className='m-padding-15'>
      <Coupon
        currency='¥'
        discount={200}
        totalInfo='满300元可用'
        hasUseInfo
        dateInfo='2020-05-05到期'
        title='通用优惠券AA'
        isExpired
      />
    </View>
    <View className='m-padding-15'>
      <Coupon
        currency='¥'
        discount={200}
        totalInfo='满300元可用'
        hasUseInfo
        dateInfo='2020-05-05到期'
        title='通用优惠券AA'
        isUsed
      />
    </View>
    <View className='m-padding-15'>
      <Coupon
        currency='¥'
        discount={200}
        totalInfo='满300元可用'
        hasUseInfo
        onReceived={() => {
          console.log('receive')
        }}
        title='通用优惠券AA'
        couponAmount={10}
      />
    </View>
  </View>
)

export const receivedCoupon = () => (
  <View className='m-bg-back'>
    <ReceivedCoupon
      currency='¥'
      discount='10'
      couponAmount={1}
      totalInfo='满100元可用'
    />
    <View className='m-margin-top-10'>
      <ReceivedCoupon
        isReceived
        currency='¥'
        discount='100'
        couponAmount={0}
        totalInfo='满200元可用'
      />
      <ReceivedCoupon
        isReceived
        currency='¥'
        discount='100'
        className='m-margin-left-10'
        totalInfo='满200元可用'
      />
    </View>
  </View>
)

export default {
  title: '业务/Coupon',
}
