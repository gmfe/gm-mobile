import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'
import Flex from '../flex'
import View from '../view'
import Text from '../text'

const Cell = ({
  access,
  icon,
  left,
  right,
  onClick,
  children,
  className,
  ...rest
}) => {
  const handleClick = (e) => {
    onClick(e)
  }

  return (
    <Flex
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
      {icon && <View className='m-cell-icon'>{icon}</View>}
      {left && <View className='m-cell-left'>{left}</View>}
      <View className='m-cell-body'>{children}</View>
      <Flex alignCenter>
        {right &&
          (_.isString(right) ? (
            <View className='m-cell-right'>{right}</View>
          ) : (
            right
          ))}
        {access && (
          <Text className='m-font m-font-angle-right m-cell-access-icon' />
        )}
      </Flex>
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
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
}

Cell.defaultProps = {
  onClick: _.noop,
}

export default Cell
