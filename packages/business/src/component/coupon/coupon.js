import { getLocale } from '@gm-mobile/locales'
import React, { useState } from 'react'
import { Flex, Label, Checkbox } from '@gm-mobile/react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import SVGDownUp from '../../../svg/down-up-circle.svg'
import SVGExpired from '../../../svg/expired.svg'

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
    ...rest
  } = props

  const [showUseInfo, setShowUseInfo] = useState(false)

  const renderUseInfo = () => {
    // 暂定往下撑开
    return useInfo || getLocale('暂无使用说明')
  }

  const handleShowInfo = () => {
    const show = !showUseInfo
    setShowUseInfo(show)
  }

  return (
    <div
      {...rest}
      className={classNames(
        'm-coupon',
        { disabled: disabled || isExpired },
        className
      )}
    >
      <div className='m-coupon-container'>
        <Flex justifyCenter alignCenter className='m-coupon-left'>
          <Flex column className='m-coupon-left-content'>
            <Flex justifyCenter alignCenter>
              <Flex alignEnd className='m-coupon-left-content-currency'>
                {currency}
              </Flex>
              <span className='m-coupon-left-content-discount'>{discount}</span>
            </Flex>
            {totalInfo && (
              <span className='m-coupon-left-content-total'>{totalInfo}</span>
            )}
          </Flex>
        </Flex>
        <Flex column className='m-coupon-right'>
          <Flex column justifyCenter className='m-coupon-right-header'>
            <Flex alignStart>
              {label && (
                <Flex none className='m-margin-right-5'>
                  <Label text={label} />
                </Flex>
              )}
              <span className='m-coupon-right-header-title'>{title}</span>
            </Flex>
            <Flex alignCenter className='m-coupon-right-date-info'>
              {dateInfo}
              {onCheck && (
                <Checkbox
                  className='m-coupon-right-checked'
                  circle
                  primary
                  checked={checked}
                  onChange={onCheck}
                />
              )}
              {onUse && (
                <span className='m-coupon-right-header-btn' onClick={onUse}>
                  {getLocale('立即使用')}
                </span>
              )}
            </Flex>
            {isExpired && (
              <div>
                <SVGExpired className='m-coupon-right-expired' />
                <Flex
                  alignCenter
                  justifyCenter
                  className='m-coupon-right-expired-text'
                >
                  {getLocale('已过期')}
                </Flex>
              </div>
            )}
          </Flex>
          {hasUseInfo && (
            <Flex
              alignCenter
              className='m-coupon-right-footer'
              onClick={handleShowInfo}
            >
              <Flex flex justifyStart className='m-coupon-info'>
                {getLocale('使用说明')}
              </Flex>
              <Flex
                flex
                justifyEnd
                className={classNames('m-coupon-right-footer-icon', {
                  active: showUseInfo,
                })}
              >
                <SVGDownUp />
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
  className: PropTypes.string,
  style: PropTypes.object,
}

Coupon.defaultProps = {
  type: 'default',
}

export default Coupon
