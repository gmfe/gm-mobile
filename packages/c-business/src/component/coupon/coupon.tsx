import { getLocale } from '@gm-mobile/locales'
import React, { FC, useState } from 'react'
import { Flex, Checkbox, View, Text } from '@gm-mobile/c-react'
import classNames from 'classnames'
import _ from 'lodash'
import { CouponProps, LabelsProps } from './types'

export const Labels: FC<LabelsProps> = (props) => {
  const { labels } = props

  return (
    <Flex wrap className='m-coupon-right-header-labels'>
      {_.map(labels, (labelItem, index) => {
        return (
          <Text
            className='m-coupon-right-header-label m-margin-left-5 m-margin-top-5'
            key={index + labelItem}
          >
            {labelItem}
          </Text>
        )
      })}
    </Flex>
  )
}

export const Coupon: FC<CouponProps> = (props) => {
  const {
    currency,
    discount,
    totalInfo,
    dateInfo,
    title,
    labels,
    useInfo,
    onUse,
    className,
    disabled,
    checked,
    onCheck,
    hasUseInfo,
    isExpired,
    isUsed,
    onReceived,
    couponAmount,
    type = 'default',
    ...rest
  } = props

  const [showUseInfo, setShowUseInfo] = useState(false)

  const renderUseInfo = () => {
    // 暂定往下撑开
    return useInfo || getLocale('没有使用说明描述')
  }

  const handleShowInfo = () => {
    const show = !showUseInfo
    setShowUseInfo(show)
  }

  const isDisabled = disabled || isExpired || isUsed

  return (
    <View
      {...rest}
      className={classNames(
        'm-coupon-container',
        `m-coupon-${type}`,
        { disabled: isDisabled },
        className
      )}
    >
      <View className='m-coupon'>
        <Flex justifyCenter alignCenter column className='m-coupon-left'>
          <Flex justifyCenter alignCenter>
            <Flex alignEnd className='m-coupon-left-currency'>
              {currency}
            </Flex>
            <Text className='m-coupon-left-discount'>{discount}</Text>
          </Flex>
          {totalInfo && (
            <Text className='m-coupon-left-total'>{totalInfo}</Text>
          )}
        </Flex>
        <Flex
          column
          flex
          className='m-coupon-right'
          onClick={onCheck || _.noop}
        >
          <Flex
            flex
            column
            alignStart
            justifyCenter
            className={classNames('m-coupon-right-header', {
              'm-coupon-right-header-padding': onCheck,
            })}
          >
            <Text className='m-coupon-right-header-title'>{title}</Text>
            {labels && labels.length > 0 && <Labels labels={labels} />}
            <Flex
              none
              alignCenter
              justifyBetween
              className='m-coupon-right-header-date'
            >
              {dateInfo || ''}
              {couponAmount !== undefined
                ? `${getLocale('可领')}${couponAmount}${getLocale('张')}`
                : ''}
              {(onUse || onReceived) && (
                <View
                  className='m-coupon-right-header-btn'
                  onClick={isDisabled ? _.noop : onUse || onReceived}
                >
                  {onReceived ? getLocale('立即领取') : getLocale('立即使用')}
                </View>
              )}
            </Flex>
            {onCheck && (
              <Checkbox
                className='m-coupon-right-checked'
                circle
                primary
                disabled={disabled}
                checked={!!checked}
                onChange={onCheck}
              />
            )}
            {isExpired || isUsed ? (
              <View>
                <Text className='m-font m-font-expired m-coupon-right-expired' />
                <Flex
                  alignCenter
                  justifyCenter
                  className='m-coupon-right-expired-text'
                >
                  {isExpired ? getLocale('已过期') : getLocale('已使用')}
                </Flex>
              </View>
            ) : null}
          </Flex>
          {hasUseInfo && (
            <Flex
              alignCenter
              className='m-coupon-right-footer'
              onClick={handleShowInfo}
            >
              <Flex flex justifyStart>
                {getLocale('使用说明')}
              </Flex>
              <Flex
                flex
                justifyEnd
                className={classNames('m-coupon-right-footer-icon', {
                  active: showUseInfo,
                })}
              >
                <Text className='m-font m-font-down-up-circle m-coupon-right-footer-down-up' />
              </Flex>
            </Flex>
          )}
        </Flex>
      </View>
      {showUseInfo && (
        <View className='m-coupon-use-info'>{renderUseInfo()}</View>
      )}
    </View>
  )
}

export default Coupon
