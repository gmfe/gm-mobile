import React from 'react'
import moment from 'moment'
import { observable } from 'mobx'
import { Flex } from '@gm-mobile/react'

import Coupon from './coupon'
import ReceivedCoupon from './received_coupon'

const store = observable({
  checked: false,
  setChecked(checked) {
    this.checked = checked
  },
})

export const normal = () => (
  <div style={{ height: '50%' }} className='m-bg-white'>
    <div className='m-padding-15'>
      <Coupon
        currency='¥'
        discount={100}
        totalInfo='满1000元可用'
        dateInfo='2020-04-29~2020-05-05'
        title='分类优惠券AA'
        labels={['分类券', '新人券']}
        checked={store.checked}
        onCheck={() => store.setChecked(!store.checked)}
      />
    </div>
    <div className='m-padding-15'>
      <Coupon
        currency='¥'
        discount={30}
        totalInfo='满1000元可用'
        dateInfo={
          <Flex wrap>
            <span>2020-05-05</span>
            <span>~</span>
            <span>2020-06-06</span>
          </Flex>
        }
        labels={[
          '仅限xxxxxx商品使用',
          '商品使用',
          '仅限xxxxxx商品使用',
        ]}
        title='分类优惠券B'
        hasUseInfo
        couponAmount={4}
        useInfo={
          <div>
            1. aaa
            <br />
            2. bbb
          </div>
        }
        onUse={() => console.log('use')}
      />
    </div>
    <div className='m-padding-15'>
      <Coupon
        currency='¥'
        discount={200}
        totalInfo='满300元可用'
        hasUseInfo
        dateInfo='2020-05-05到期'
        labels={['仅限xxxxxx商品使用']}
        title='分类优惠券AA'
        onUse={() => console.log('use')}
        disabled
      />
    </div>
    <div className='m-padding-15'>
      <Coupon
        currency='¥'
        discount={200}
        totalInfo='满300元可用'
        hasUseInfo
        dateInfo='2020-05-05到期'
        title='通用优惠券AA'
        isExpired
      />
    </div>
    <div className='m-padding-15'>
      <Coupon
        currency='¥'
        discount={200}
        totalInfo='满300元可用'
        hasUseInfo
        dateInfo='2020-05-05到期'
        title='通用优惠券AA'
        isUsed
      />
    </div>
    <div className='m-padding-15'>
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
    </div>
  </div>
)

export const receivedCoupon = () => (
  <div className='m-bg-back'>
    <ReceivedCoupon
      currency='¥'
      discount='10'
      couponAmount={1}
      labels={[
        '仅限xxxxxx商品使用',
        '商品使用',
        '仅限xxxxxx商品使用',
      ]}
      totalInfo='满100元可用'
    />
    <div className='m-margin-top-10'>
      <ReceivedCoupon
        isReceived
        currency='¥'
        discount='100'
        couponAmount={0}
        labels={[
          '仅限xxxxxx商品使用',
        ]}
        totalInfo='满200元可用'
      />
      <ReceivedCoupon
        isReceived
        currency='¥'
        discount='100'
        className='m-margin-left-10'
        totalInfo='满200元可用'
      />
    </div>
  </div>
)

export default {
  title: '业务/Coupon',
}
