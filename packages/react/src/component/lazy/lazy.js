import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { isElementOverViewport } from '@gm-common/tool'
import _ from 'lodash'

const Lazy = ({ targetId, delay, children, ...rest }) => {
  const ref = useRef(null)
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

Lazy.propTypes = {
  /** 指定监听滚动的dom id */
  targetId: PropTypes.string,
  /** throttle delay */
  delay: PropTypes.number,
}

Lazy.defaultProps = {
  delay: 500,
}

export default Lazy
