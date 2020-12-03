import React, { useState, useRef, useEffect, FC } from 'react'
import _ from 'lodash'
import { LazyProps } from './types'

function isElementOverViewport(dom: HTMLDivElement | null) {
  if (dom) {
    const rect = dom.getBoundingClientRect()
    return (
      rect.bottom >= 0 &&
      rect.right >= 0 &&
      rect.left <=
        (window.innerWidth || document.documentElement.clientWidth) &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight)
    )
  }
  return false
}

const Lazy: FC<LazyProps> = ({ targetId, delay, children, ...rest }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const target = targetId
      ? document.getElementById(targetId)
      : document.querySelector('.m-page-content')

    if (!target) {
      setShow(true)
      console.log('lazy 不会起作用，找不到 .m-page-content 和 targetId')
      return
    }

    const doLazy = _.throttle(() => {
      if (ref.current && isElementOverViewport(ref.current)) {
        setShow(true)
      } else {
        setShow(false)
      }
    }, delay)

    target.addEventListener('scroll', doLazy)

    doLazy()

    return () => {
      target.removeEventListener('scroll', doLazy)
    }
  }, [])

  return (
    <div ref={ref} {...rest}>
      {show && children}
    </div>
  )
}

export default Lazy
