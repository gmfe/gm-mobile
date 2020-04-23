import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'

const Checkbox = (props) => {
  const {
    className,
    style,
    disabled,
    checked,
    onChange,
    circle,
    primary,
    children,
    ...rest
  } = props

  return (
    <label
      {...rest}
      className={classNames(
        'm-checkbox',
        {
          disabled,
          'm-checkbox-circle': circle,
          'm-checkbox-primary': primary,
        },
        className
      )}
    >
      <input
        className='m-checkbox-input'
        type='checkbox'
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <span className='m-checkbox-span' />
      {children}
    </label>
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
