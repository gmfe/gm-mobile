import React from 'react'
import { Flex } from '@gm-mobile/react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'

const Labels = (props) => {
  const { labels, disabled, className } = props

  return (
    <Flex wrap className={classNames('m-coupon-labels', className)}>
      {_.map(labels, (labelItem, index) => {
        return (
          <span
            className={classNames('m-coupon-label', {
              'm-coupon-label-disabled': disabled,
              'm-margin-right-5': index !== labels.length - 1,
            })}
            key={index + labelItem}
          >
            {labelItem}
          </span>
        )
      })}
    </Flex>
  )
}

Labels.propTypes = {
  /** 优惠券标签展示文字，必传，不考虑为空的情况 */
  labels: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
}

export default Labels
