import { getLocale } from '@gm-mobile/locales'
import React, { FC } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import { Flex, View, Text } from '@gm-mobile/c-react'

import { ReceivedCouponProps } from './types'

const ReceivedCoupon: FC<ReceivedCouponProps> = (props) => {
  const {
    currency,
    discount,
    couponAmount,
    totalInfo,
    className,
    isReceived,
    onReceived,
    type = 'default',
    ...rest
  } = props

  return (
    <View
      {...rest}
      className={classNames(
        'm-received-coupon',
        `m-received-coupon-${type}`,
        { 'm-received-coupon-received': isReceived },
        className
      )}
    >
      <Flex className='m-received-coupon-container'>
        <Flex column justifyCenter className='m-received-coupon-left'>
          <Flex alignCenter className='m-received-coupon-left-header'>
            <Text className='m-received-coupon-left-currency'>{currency}</Text>
            {discount}
            {couponAmount !== undefined && (
              <Text className='m-received-coupon-left-info'>
                ({couponAmount}
                {getLocale('张可领')})
              </Text>
            )}
          </Flex>
          {totalInfo && (
            <Flex className='m-received-coupon-left-total'>{totalInfo}</Flex>
          )}
        </Flex>
        <Flex
          alignCenter
          justifyCenter
          none
          className='m-received-coupon-right'
        >
          <Text
            className='m-received-coupon-right-btn'
            onClick={isReceived ? _.noop : onReceived}
          >
            {getLocale('领取')}
          </Text>
        </Flex>
      </Flex>
    </View>
  )
}

export default ReceivedCoupon
