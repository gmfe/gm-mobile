import { getLocale } from '@gm-mobile/locales'
import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { Flex } from '@gm-mobile/react'
import Labels from './labels'

const ReceivedCoupon = (props) => {
  const {
    currency,
    discount,
    couponAmount,
    labels,
    totalInfo,
    className,
    isReceived,
    onReceived,
    ...rest
  } = props

  return (
    <div {...rest} className={classNames('m-received-coupon', className)}>
      <Flex className='m-received-coupon-container'>
        <Flex column justifyCenter className='m-received-coupon-left'>
          <Flex
            alignCenter
            className={classNames('m-received-coupon-left-header', {
              'm-received-coupon-received': isReceived,
            })}
          >
            <span className='m-received-coupon-left-currency'>{currency}</span>
            {discount}
            {couponAmount !== undefined && (
              <span
                className={classNames('m-received-coupon-left-info', {
                  'm-received-coupon-received': isReceived,
                })}
              >
                ({couponAmount}
                {getLocale('张可领')})
              </span>
            )}
          </Flex>
          {totalInfo && (
            <Flex
              className={classNames('m-received-coupon-left-total', {
                'm-received-coupon-received': isReceived,
              })}
            >
              {labels && labels.length > 0 && (
                <Labels
                  className='m-margin-right-5'
                  disabled={isReceived}
                  labels={labels}
                />
              )}
              {totalInfo}
            </Flex>
          )}
        </Flex>
        <Flex
          alignCenter
          justifyCenter
          none
          className='m-received-coupon-right'
        >
          <span
            className={classNames('m-received-coupon-right-btn', {
              'm-received-coupon-right-btn-received': isReceived,
            })}
            onClick={isReceived ? _.noop : onReceived}
          >
            {getLocale('领取')}
          </span>
        </Flex>
      </Flex>
    </div>
  )
}

ReceivedCoupon.propTypes = {
  /** 折扣金额货币符号 */
  currency: PropTypes.string.isRequired,
  /** 折扣金额 */
  discount: PropTypes.string.isRequired,
  /** 可领的优惠券数量 */
  couponAmount: PropTypes.number,
  /** 优惠券标签展示文字，不传不展示标签,数组形式：[label1,label2,...] */
  labels: PropTypes.array,
  /** 满减说明 */
  totalInfo: PropTypes.string,
  /** 领取状态 */
  isReceived: PropTypes.bool,
  /** 领取回调函数 */
  onReceived: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default ReceivedCoupon
