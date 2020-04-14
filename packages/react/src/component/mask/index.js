import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Mask = ({ opacity, className, style, ...rest }) => {
  return (
    <div
      {...rest}
      className={classNames('m-mask', className)}
      style={{
        opacity,
        ...style,
      }}
    />
  )
}

Mask.propTypes = {
  opacity: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
}

Mask.defaultProps = {
  opacity: 0.5,
}

export default Mask
