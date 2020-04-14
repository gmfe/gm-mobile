import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'

const Switch = ({ className, ...rest }) => {
  return (
    <input
      {...rest}
      type='checkbox'
      className={classNames('m-switch', className)}
    />
  )
}

Switch.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
}

Switch.defaultProps = {
  onChange: _.noop,
}

export default Switch
