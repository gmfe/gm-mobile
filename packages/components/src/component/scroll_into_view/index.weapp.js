import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView } from '@tarojs/components'

// 先 默认纵向滚动
const ScrollIntoView = ({ children, targetId, ...rest }) => {
  const options = { scrollY: true, scrollWithAnimation: true }

  return (
    <ScrollView {...options} {...rest} scrollIntoView={targetId}>
      {children}
    </ScrollView>
  )
}

ScrollIntoView.propTypes = {
  /** 滚动目标id */
  targetId: PropTypes.string.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
}

export default ScrollIntoView
