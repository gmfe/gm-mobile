import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'
import Flex from '../flex'
import SVGRight from '../../../svg/right-small.svg'

const Cell = ({
  access,
  icon,
  left,
  right,
  href,
  onClick,
  children,
  className,
  ...rest
}) => {
  const handleClick = (e) => {
    // 如果提供了 href 代表跳转
    if (href) {
      window.location.href = href
    }
    onClick(e)
  }

  return (
    <Flex
      alignCenter
      {...rest}
      className={classNames(
        'm-cell',
        {
          'm-cell-access': access,
          'm-cell-with-icon': icon,
        },
        className
      )}
      onClick={handleClick}
    >
      {icon && <div className='m-cell-icon'>{icon}</div>}
      {left && <div className='m-cell-left'>{left}</div>}
      <div className='m-cell-body'>{children}</div>
      {right &&
        (_.isString(right) ? (
          <div className='m-cell-right'>{right}</div>
        ) : (
          right
        ))}
      {access && <SVGRight className='m-cell-access-icon' />}
    </Flex>
  )
}

Cell.propTypes = {
  /** 右边带箭头 */
  access: PropTypes.bool,
  /** 左边有图标的情况 */
  icon: PropTypes.element,
  left: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  right: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  href: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
}

Cell.defaultProps = {
  onClick: _.noop,
}

export default Cell
