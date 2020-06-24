import React, { useRef, useEffect } from 'react'
import { findDOMNode } from 'react-dom'
import View from '../view'
import PropTypes from 'prop-types'

// 先 默认纵向滚动
const ScrollIntoView = ({ children, scrollIntoView, options, ...rest }) => {
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollIntoView) {
      const d = findDOMNode(scrollRef.current).querySelector(scrollIntoView)
      if (d) {
        if (options && options.scrollIntoViewIfNeeded) {
          const op =
            options.scrollIntoViewIfNeededOptions === undefined
              ? true
              : options.scrollIntoViewIfNeededOptions
          d.scrollIntoViewIfNeeded(op)
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
  options: PropTypes.shape({
    /** 不传默认采用 element.scrollIntoView */
    scrollIntoViewIfNeeded: PropTypes.bool,
    scrollIntoViewIfNeededOptions: PropTypes.bool,
  }),
  className: PropTypes.string,
  style: PropTypes.object,
}

export default ScrollIntoView
