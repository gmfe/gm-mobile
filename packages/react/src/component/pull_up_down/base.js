import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { useTouchHandler } from './hook'

const Base = (props) => {
  const {
    topRenderer,
    bottomRenderer,
    onTopTranslate,
    onBottomTranslate,
    children,
  } = props
  const {
    instanceData,
    transition,
    topTranslate,
    bottomTranslate,
  } = useTouchHandler(props)

  useEffect(() => {
    if (onTopTranslate) {
      const percentage = Math.round(
        (topTranslate / instanceData.topHeight) * 100
      )
      onTopTranslate(percentage, topTranslate)
    }
  }, [topTranslate])

  useEffect(() => {
    if (onBottomTranslate) {
      const percentage = Math.round(
        (bottomTranslate / instanceData.bottomHeight) * 100
      )
      onBottomTranslate(percentage, bottomTranslate)
    }
  }, [bottomTranslate])
  const translate =
    instanceData.direction === 'down' ? topTranslate : -bottomTranslate
  return (
    <div className='m-overflow-hidden' ref={instanceData.domRef}>
      <div
        className='relative'
        style={{
          position: 'relative',
          transform: `translateY(${translate}px)`,
          transition,
        }}
      >
        <div
          style={{
            position: 'absolute',
            transform: 'translateY(-100%)',
            width: '100%',
          }}
          ref={instanceData.topRef}
        >
          {topRenderer && topRenderer()}
        </div>
        <div>{children}</div>
        <div
          style={{ position: 'absolute', width: '100%' }}
          ref={instanceData.bottomRef}
        >
          {bottomRenderer && bottomRenderer()}
        </div>
      </div>
    </div>
  )
}

Base.propTypes = {
  /** 顶部显示区域 */
  topRenderer: PropTypes.func,
  /** 顶部区域下拉回调  */
  onTopTranslate: PropTypes.func,
  /** 底部显示区域 */
  bottomRenderer: PropTypes.func,
  /** 底部区域上拉回调 */
  onBottomTranslate: PropTypes.func,
  /** 滚动子元素的选择器 */
  scrollEl: PropTypes.string,
  /** 手指滑动距离与页面滑动距离的比率 */
  ratio: PropTypes.number,
}

Base.defaultProps = {
  ratio: 2.2,
  onTopTranslate: _.noop,
  onBottomTranslate: _.noop,
}

export default Base
