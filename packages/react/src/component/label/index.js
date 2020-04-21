import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const Label = ({ text, type }) => {
  return (
    <span className={classnames('m-label', `m-label-${type}`)}>{text}</span>
  )
}

Label.propTypes = {
  text: PropTypes.string,
  type: PropTypes.oneOf(['default', 'plain', 'accent']),
}

Label.defaultProps = {
  type: 'default',
}

export default Label
