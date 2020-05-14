import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const TagWrap = ({ tag, bottom, block, className, children, ...rest }) => {
  return (
    <div
      {...rest}
      className={classNames(
        'm-tag-wrap',
        {
          'm-tag-wrap-bottom': bottom,
          'm-tag-wrap-block': block,
        },
        className
      )}
    >
      {children}
      {tag && <div className='m-tag'>{tag}</div>}
    </div>
  )
}

TagWrap.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  bottom: PropTypes.bool,
  block: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default TagWrap
