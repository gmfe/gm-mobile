import { getLocale } from '@gm-mobile/locales'
import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { Flex, View, Text } from '@gm-mobile/components'

const ReceivedCoupon = (props) => {
  const {
    currency,
    discount,
    couponAmount,
    totalInfo,
    className,
    isReceived,
    onReceived,
    type,
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

ReceivedCoupon.propTypes = {
  type: PropTypes.oneOf(['default', 'vip']),
  /** 折扣金额货币符号 */
  currency: PropTypes.string.isRequired,
  /** 折扣金额 */
  discount: PropTypes.string.isRequired,
  /** 可领的优惠券数量 */
  couponAmount: PropTypes.number,
  /** 满减说明 */
  totalInfo: PropTypes.string,
  /** 领取状态 */
  isReceived: PropTypes.bool,
  /** 领取回调函数 */
  onReceived: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
}

ReceivedCoupon.defaultProps = {
  type: 'default',
}

export default ReceivedCoupon
