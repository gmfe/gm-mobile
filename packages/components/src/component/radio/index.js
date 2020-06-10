import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import noop from 'lodash/noop'

import View from '../view'

const Radio = ({
  className,
  disabled,
  checked,
  onChange,
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
        'm-radio',
        {
          disabled,
          'm-radio-checked': checked,
        },
        className
      )}
      onClick={handleChange}
    >
      <View className='m-radio-tick' />
      {children}
    </View>
  )
}

Radio.propTypes = {
  /** 选中态 */
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  /** 回调函数 */
  onChange: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
}

Radio.defaultProps = {
  onChange: noop,
}

export default Radio
