import React, { useRef, useEffect } from 'react'
import { findDOMNode } from 'react-dom'
import View from '../view'
import PropTypes from 'prop-types'

// 先 默认纵向滚动
const ScrollIntoView = ({
  children,
  scrollIntoView,
  scrollIntoViewIfNeeded,
  scrollIntoViewIfNeededOptions,
  ...rest
}) => {
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollIntoView) {
      const d = findDOMNode(scrollRef.current).querySelector(scrollIntoView)
      if (d) {
        if (scrollIntoViewIfNeeded) {
          d.scrollIntoViewIfNeeded(scrollIntoViewIfNeededOptions)
        } else {
          d.scrollIntoView()
        }
      }
    }
  }, [scrollIntoView])

  return (
    <View ref={scrollRef} {...rest}>
      {children}
    </View>
  )
}

ScrollIntoView.propTypes = {
  /** 滚动目标，用于 querySelector方法 */
  scrollIntoView: PropTypes.string,
  scrollIntoViewIfNeeded: PropTypes.bool,
  scrollIntoViewIfNeededOptions: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
}

ScrollIntoView.defaultProps = {
  scrollIntoViewIfNeededOptions: true,
}

export default ScrollIntoView
