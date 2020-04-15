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
        },
        className
      )}
    >
      <input
        className='m-checkbox-input'
        type='checkbox'
        checked={checked || false}
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
