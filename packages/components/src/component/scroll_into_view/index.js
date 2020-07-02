import React, { useEffect } from 'react'
import View from '../view'
import PropTypes from 'prop-types'

// 先 默认纵向滚动
const ScrollIntoView = ({ children, targetId, ...rest }) => {
  useEffect(() => {
    const d = document.getElementById(targetId)
    if (d) {
      d.scrollIntoViewIfNeeded(false)
    }
  }, [targetId])

  return <View {...rest}>{children}</View>
}

ScrollIntoView.propTypes = {
  /** 滚动目标id */
  targetId: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default ScrollIntoView
