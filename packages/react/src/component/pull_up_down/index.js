import React from 'react'
import Base from './base'
import PropTypes from 'prop-types'
import _ from 'lodash'

const PullUpDown = ({
  topRender,
  bottomRender,
  onPullDown,
  onPullUp,
  children,
  scrollEl,
  ...rest
}) => {
  const handleTopTranslate = (percentage) => {
    if (percentage === 100) {
      onPullDown()
    }
  }

  const handleBottomTranslate = (percentage) => {
    if (percentage === 100) {
      onPullUp()
    }
  }

  return (
    <Base
      {...rest}
      scrollEl={scrollEl}
      topRenderer={topRender}
      bottomRenderer={bottomRender}
      onTopTranslate={handleTopTranslate}
      onBottomTranslate={handleBottomTranslate}
    >
      {children}
    </Base>
  )
}

PullUpDown.propTypes = {
  /** 顶部显示区域 */
  topRender: PropTypes.func,
  /** 底部显示区域 */
  bottomRender: PropTypes.func,
  /** 下拉回调 */
  onPullDown: PropTypes.func,
  /** 上拉回调 */
  onPullUp: PropTypes.func,
  /** 手指滑动距离与页面滑动距离的比率 */
  ratio: PropTypes.number,
  /** 滚动元素的选择器 */
  scrollEl: PropTypes.string,
}

PullUpDown.defaultProps = {
  topRender: _.noop,
  bottomRender: _.noop,
  onPullDown: _.noop,
  onPullUp: _.noop,
}

export default PullUpDown
