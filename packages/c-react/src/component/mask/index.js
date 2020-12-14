import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { View } from '../view'

const Mask = ({ opacity, className, style, ...rest }) => {
  return (
    <View
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
