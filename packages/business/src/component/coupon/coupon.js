import { getLocale } from '@gm-mobile/locales'
import React, { useState } from 'react'
import { Flex, Checkbox } from '@gm-mobile/react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import _ from 'lodash'

const Coupon = (props) => {
  const {
    currency,
    discount,
    totalInfo,
    dateInfo,
    title,
    label,
    useInfo,
    onUse,
    className,
    disabled,
    checked,
    onCheck,
    hasUseInfo,
    isExpired,
    isUsed,
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
    <div
      {...rest}
      className={classNames(
        'm-coupon-container',
        { disabled: isDisabled },
        className
      )}
    >
      <div className='m-coupon'>
        <Flex justifyCenter alignCenter column className='m-coupon-left'>
          <Flex justifyCenter alignCenter>
            <Flex alignEnd className='m-coupon-left-currency'>
              {currency}
            </Flex>
            <span className='m-coupon-left-discount'>{discount}</span>
          </Flex>
          {totalInfo && (
            <span className='m-coupon-left-total'>{totalInfo}</span>
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
            <span className='m-coupon-right-header-title'>{title}</span>
            {label && (
              <span className='m-coupon-right-header-label'>{label}</span>
            )}
            <Flex alignCenter none className='m-coupon-right-header-date'>
              {dateInfo}
              {onUse && (
                <span
                  className='m-coupon-right-header-btn'
                  onClick={isDisabled ? _.noop : onUse}
                >
                  {getLocale('立即使用')}
                </span>
              )}
            </Flex>
            {onCheck && (
              <Checkbox
                className='m-coupon-right-checked'
                circle
                primary
                disabled={disabled}
                checked={checked}
                onChange={onCheck}
              />
            )}
            {isExpired || isUsed ? (
              <div>
                <i className='m-font m-font-expired m-coupon-right-expired' />
                <Flex
                  alignCenter
                  justifyCenter
                  className='m-coupon-right-expired-text'
                >
                  {isExpired ? getLocale('已过期') : getLocale('已使用')}
                </Flex>
              </div>
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
                <i className='m-font m-font-down-up-circle m-coupon-right-footer-down-up' />
              </Flex>
            </Flex>
          )}
        </Flex>
      </div>
      {showUseInfo && (
        <div className='m-coupon-use-info'>{renderUseInfo()}</div>
      )}
    </div>
  )
}

Coupon.propTypes = {
  /** 折扣金额货币符号 */
  currency: PropTypes.string.isRequired,
  /** 折扣金额 */
  discount: PropTypes.number.isRequired,
  /** 满减说明 */
  totalInfo: PropTypes.string,
  /** 优惠券标签展示文字，不传不展示标签 */
  label: PropTypes.string,
  /** 优惠券标题 */
  title: PropTypes.string,
  /** 是否有使用说明 */
  hasUseInfo: PropTypes.bool,
  /** 优惠券使用说明 */
  useInfo: PropTypes.element,
  /** 使用日期说明 */
  dateInfo: PropTypes.string,
  /** 立即使用回调函数 */
  onUse: PropTypes.func,
  /** 不可用状态 */
  disabled: PropTypes.bool,
  /** 优惠券的勾选状态 */
  checked: PropTypes.bool,
  /** 优惠券勾选回调函数 */
  onCheck: PropTypes.func,
  /** 优惠券是否过期 */
  isExpired: PropTypes.bool,
  /** 优惠券是否已使用 */
  isUsed: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default Coupon
