import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const Label = ({ text, type, className, ...rest }) => {
  return (
    <span
      {...rest}
      className={classNames('m-label', className, `m-label-${type}`)}
    >
      {text}
    </span>
  )
}

Label.propTypes = {
  /** 标签显示的文字 */
  text: PropTypes.string,
  /** 标签样式种类 */
  type: PropTypes.oneOf(['default', 'plain', 'accent', 'primary']),
  className: PropTypes.string,
  style: PropTypes.object,
}

Label.defaultProps = {
  type: 'default',
}

export default Label
