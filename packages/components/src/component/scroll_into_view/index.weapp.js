import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView } from '@tarojs/components'

// 先 默认纵向滚动
const ScrollIntoView = ({ children, targetId, horizontal, ...rest }) => {
  const options = {
    scrollY: !horizontal,
    scrollX: horizontal,
    scrollWithAnimation: true,
  }

  return (
    <ScrollView {...options} {...rest} scrollY scrollIntoView={targetId}>
      {children}
    </ScrollView>
  )
}

ScrollIntoView.propTypes = {
  /** 滚动目标id */
  targetId: PropTypes.string.isRequired,
  /** 小程序独有 */
  horizontal: PropTypes.bool,
  /** 滚动事件 */
  onScroll: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string,
}

export default ScrollIntoView
