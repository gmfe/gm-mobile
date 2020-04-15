import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'

const Radio = (props) => {
  const {
    className,
    disabled,
    checked,
    style,
    onChange,
    children,
    ...rest
  } = props

  return (
    <label
      {...rest}
      className={classNames(
        'm-radio',
        {
          disabled,
        },
        className
      )}
    >
      <input
        className='m-radio-input'
        type='radio'
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <span className='m-radio-span' />
      {children}
    </label>
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
  onChange: _.noop,
  disabled: false,
}

export default Radio
