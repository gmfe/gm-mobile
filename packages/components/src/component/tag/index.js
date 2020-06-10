import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import View from '../view'

const TagWrap = ({ tag, bottom, block, className, children, ...rest }) => {
  return (
    <View
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
      {tag && <View className='m-tag'>{tag}</View>}
    </View>
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
