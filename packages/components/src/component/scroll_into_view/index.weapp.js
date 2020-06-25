import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView } from '@tarojs/components'

// 先 默认纵向滚动
const ScrollIntoView = ({ children, targetId, options, ...rest }) => {
  const _options = options || { scrollY: true, scrollWithAnimation: true }

  return (
    <ScrollView {..._options} {...rest} scrollIntoView={targetId}>
      {children}
    </ScrollView>
  )
}

ScrollIntoView.propTypes = {
  /** 小程序 scrollView 参数设置，不传默认纵向 */
  options: PropTypes.object,
  /** 滚动目标id */
  targetId: PropTypes.string.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
}

export default ScrollIntoView
