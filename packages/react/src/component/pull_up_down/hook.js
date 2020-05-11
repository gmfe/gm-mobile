import { useEffect, useRef, useState, useCallback } from 'react'

const useLazyRef = (initFunc, unbox = true) => {
  const ref = useRef()
  if (!ref.current) {
    ref.current = initFunc()
  }
  return unbox ? ref.current : ref
}

const useInstanceData = () => {
  const domRef = useRef()
  const topRef = useRef()
  const bottomRef = useRef()
  return useLazyRef(() => {
    return {
      startY: 0,
      startScrollTop: 0,
      direction: 'up',
      currentY: 0,
      topHeight: 0,
      bottomHeight: 0,
      topRef,
      bottomRef,
      scrollDom: null,
      domRef,
    }
  })
}

const getScrollEventTarget = (element) => {
  let currentNode = element
  while (
    currentNode &&
    currentNode.tagName !== 'HTML' &&
    currentNode.tagName !== 'BODY' &&
    currentNode.nodeType === 1
  ) {
    const overflowY = document.defaultView.getComputedStyle(currentNode)
      .overflowY
    if (overflowY === 'scroll' || overflowY === 'auto') {
      return currentNode
    }
    currentNode = currentNode.parentNode
  }
  return window
}

const getScrollTop = (element) => {
  if (element === window) {
    return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop)
  } else {
    return element.scrollTop
  }
}

const bottomReached = (scrollEl) => {
  return scrollEl.scrollTop + scrollEl.clientHeight >= scrollEl.scrollHeight
}

const useTouchHandler = (props) => {
  const { ratio } = props
  const [topTranslate, setTopTranslate] = useState(0)
  const [bottomTranslate, setBottomTranslate] = useState(0)
  const [transition, setTransition] = useState(0)
  const instanceData = useInstanceData()

  const resetTranslate = () => {
    setTopTranslate(0)
    setBottomTranslate(0)
  }

  const handleTouchStart = useCallback((event) => {
    setTransition('none')
    instanceData.startY = event.touches[0].clientY
    instanceData.startScrollTop = getScrollTop(instanceData.scrollDom)
  }, [])

  const handleTouchMove = useCallback((event) => {
    instanceData.currentY = event.touches[0].clientY
    const distance = instanceData.currentY - instanceData.startY
    const direction = (instanceData.direction = distance > 0 ? 'down' : 'up')
    // 最顶部 手指往下滑
    if (
      direction === 'down' &&
      getScrollTop(instanceData.scrollDom) === 0 &&
      props.topRenderer
    ) {
      // 默认可能会拉起视口等
      if (event.cancelable) {
        event.preventDefault()
      }
      let topTranslate = (distance - instanceData.startScrollTop) / ratio

      if (topTranslate < 0) {
        topTranslate = 0
      } else if (topTranslate > instanceData.topHeight) {
        topTranslate = instanceData.topHeight
      }
      setTopTranslate(topTranslate)
      // 最底部 手指往上滑
    } else if (
      direction === 'up' &&
      bottomReached(instanceData.scrollDom) &&
      props.bottomRenderer
    ) {
      if (event.cancelable) {
        event.preventDefault()
      }

      const scrollDelta =
        getScrollTop(instanceData.scrollDom) - instanceData.startScrollTop
      let bottomTranslate = (Math.abs(distance) - scrollDelta) / ratio
      if (bottomTranslate < 0) {
        bottomTranslate = 0
      } else if (bottomTranslate > instanceData.bottomHeight) {
        bottomTranslate = instanceData.bottomHeight
      }

      setBottomTranslate(bottomTranslate)
    }
  }, [])

  const handleTouchEnd = useCallback((event) => {
    setTransition('transform 0.1s ease-out')
    resetTranslate()
  }, [])

  const handleTouchCancel = useCallback((event) => {
    resetTranslate()
  }, [])

  useEffect(() => {
    const { scrollEl } = props
    instanceData.topHeight = instanceData.topRef.current.offsetHeight
    instanceData.bottomHeight = instanceData.bottomRef.current.offsetHeight
    if (scrollEl) {
      // 滚动元素是 PullUpDown 的 children
      instanceData.scrollDom = document.querySelector(scrollEl)
    } else {
      // 滚动元素是 PullUpDown 的 parent
      instanceData.scrollDom = getScrollEventTarget(instanceData.domRef.current)
    }
    const el = instanceData.domRef.current
    el.addEventListener('touchstart', handleTouchStart)
    el.addEventListener('touchmove', handleTouchMove)
    el.addEventListener('touchend', handleTouchEnd)
    el.addEventListener('touchcancel', handleTouchCancel)
    return () => {
      el.removeEventListener('touchstart', handleTouchStart)
      el.removeEventListener('touchmove', handleTouchMove)
      el.removeEventListener('touchend', handleTouchEnd)
      el.removeEventListener('touchcancel', handleTouchCancel)
    }
  }, [])

  return {
    instanceData,
    topTranslate,
    bottomTranslate,
    transition,
  }
}

export { useTouchHandler }
