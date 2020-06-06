import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _noop from 'lodash/noop'

import View from '../view'

const Switch = ({ checked, disabled, onChange, className, ...rest }) => {
  const handleClick = () => {
    if (disabled) return
    onChange()
  }
  return (
    <View
      {...rest}
      className={classNames(
        'm-switch',
        {
          'm-switch-on': checked,
          disabled: disabled,
        },
        className
      )}
      onClick={handleClick}
    />
  )
}

Switch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
}

Switch.defaultProps = {
  onChange: _noop,
}

export default Switch
