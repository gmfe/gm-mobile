import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const Label = ({ text, type, className }) => {
  return (
    <span className={classnames('m-label', className, `m-label-${type}`)}>
      {text}
    </span>
  )
}

Label.propTypes = {
  /** 标签显示的文字 */
  text: PropTypes.string,
  /** 标签样式种类 */
  type: PropTypes.oneOf(['default', 'plain', 'accent']),
  className: PropTypes.string,
}

Label.defaultProps = {
  type: 'default',
}

export default Label
