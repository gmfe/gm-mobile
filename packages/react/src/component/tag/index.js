import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const TagWrap = ({ tag, className, children, ...rest }) => {
  return (
    <div {...rest} className={classNames('m-tag-wrap', className)}>
      {children}
      <div className='m-tag'>{tag}</div>
    </div>
  )
}

TagWrap.propTypes = {
  tag: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default TagWrap
