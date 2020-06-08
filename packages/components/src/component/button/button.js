import React, { useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'
import { is } from '@gm-common/tool'
import Loading from '../loading'
import BaseButton from './base'

const Button = ({
  type,
  plain,
  mini,
  block,
  noRound,
  disabled,
  onClick,
  loading,
  children,
  htmlType,
  className,
  ...rest
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const loadFlag = loading || isLoading

  const handleClick = (e) => {
    if (loadFlag) {
      return
    }

    const result = onClick(e)

    if (!is.promise(result)) {
      return
    }

    setIsLoading(true)

    Promise.resolve(result).finally(() => {
      setIsLoading(false)
    })
  }

  return (
    <BaseButton
      {...rest}
      type={htmlType}
      className={classNames(
        `m-btn m-btn-${type}`,
        {
          'm-btn-block': block,
          'm-btn-mini': mini,
          'm-btn-no-round': noRound,
          'm-btn-plain': type !== 'link' && plain,
        },
        className
      )}
      disabled={loadFlag || disabled}
      onClick={handleClick}
    >
      {loadFlag && <Loading className='m-btn-loading' />}
      {children}
    </BaseButton>
  )
}

// 只封装了 loading
Button.propTypes = {
  type: PropTypes.oneOf(['default', 'primary', 'danger', 'link']),
  plain: PropTypes.bool,
  mini: PropTypes.bool,
  block: PropTypes.bool,
  noRound: PropTypes.bool,
  loading: PropTypes.bool,
  /** 仅web 用。原生的 type */
  htmlType: PropTypes.string,
  /** 仅小程序 */
  formType: PropTypes.string,
  /** 仅小程序 */
  openType: PropTypes.string,
  /** 返回 Promise 才有 loading */
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
}

Button.defaultProps = {
  type: 'default',
  htmlType: 'button',
  onClick: _.noop,
}

export default Button