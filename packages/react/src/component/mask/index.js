import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Mask = ({ opacity, className, style, ...rest }) => {
  const s = Object.assign({ opacity }, style)

  return <div {...rest} className={classNames('m-mask', className)} style={s} />
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
