import React, { useEffect } from 'react'
import View from '../view'
import PropTypes from 'prop-types'

// 先 默认纵向滚动
const ScrollIntoView = ({ children, targetId, horizontal, ...rest }) => {
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
  /** 小程序独有 */
  horizontal: PropTypes.bool,
  /** 滚动事件 */
  onScroll: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default ScrollIntoView
