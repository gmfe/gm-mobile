import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'
import View from '../view'

const Checkbox = ({
  className,
  disabled,
  checked,
  onChange,
  circle,
  primary,
  children,
  ...rest
}) => {
  const handleChange = () => {
    if (disabled) return
    onChange()
  }

  return (
    <View
      {...rest}
      className={classNames(
        'm-checkbox',
        {
          disabled,
          'm-checkbox-checked': checked,
          'm-checkbox-circle': circle,
          'm-checkbox-primary': primary,
        },
        className
      )}
      onClick={handleChange}
    >
      <View className='m-checkbox-tick' />
      <View className='m-checkbox-child'>{children}</View>
    </View>
  )
}

Checkbox.propTypes = {
  /** 选中态 */
  checked: PropTypes.bool.isRequired,
  /** 圆形 */
  circle: PropTypes.bool,
  /** 主题色 */
  primary: PropTypes.bool,
  disabled: PropTypes.bool,
  /** 回调函数 */
  onChange: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
}

Checkbox.defaultProps = {
  onChange: _.noop,
}

export default Checkbox
