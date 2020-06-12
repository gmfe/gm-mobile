import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import CSSVariable from '../../css_variable'
import EVENT_TYPE from '../../event_type'

const KeyboardBox = ({ tabbar, style, ...rest }) => {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const handleKeyboardRender = (detail) => {
      const { isScroll } = detail.detail
      if (!isScroll) return
      setActive(true)
    }

    const handleKeyboardHide = () => {
      setActive(false)
    }

    window.addEventListener(EVENT_TYPE.KEYBOARD_SHOW, handleKeyboardRender)
    window.addEventListener(EVENT_TYPE.KEYBOARD_HIDE, handleKeyboardHide)
    return () => {
      window.removeEventListener(EVENT_TYPE.KEYBOARD_SHOW, handleKeyboardRender)
      window.removeEventListener(EVENT_TYPE.KEYBOARD_HIDE, handleKeyboardHide)
    }
  }, [])

  const getKeyboardHeight = () => {
    const tabbarHeight = tabbar
      ? CSSVariable.getValue('--m-size-tabbar-height')
      : '0px'

    // 暂时先定 185px -- 没有确定按钮
    return `calc(185px - ${tabbarHeight})`
  }

  if (!active) {
    return null
  }

  return <div {...rest} style={{ height: getKeyboardHeight(), ...style }} />
}

KeyboardBox.propTypes = {
  tabbar: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default React.memo(KeyboardBox)
