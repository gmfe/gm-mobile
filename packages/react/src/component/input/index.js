import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class Input extends React.Component {
  render() {
    const { className, ...rest } = this.props

    return <input {...rest} className={classNames('m-input', className)} />
  }
}

Input.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default Input
