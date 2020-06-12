import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import KeyboardStatic from './statics'
import EVENT_TYPE from '../../event_type'

const KeyboardFuncBox = ({ onCancel, onNextItem, onLastItem }) => {
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

  const handleSubmit = () => {
    KeyboardStatic.hide()
  }

  const handleCancel = () => {
    onCancel && onCancel()
    KeyboardStatic.hide()
  }

  if (!active) {
    return null
  }

  return (
    <div className='m-keyboard-func-box'>
      <span className='m-keyboard-func-box-btn' onClick={handleCancel}>
        取消
      </span>
      <span className='m-keyboard-func-box-btn' onClick={onLastItem}>
        上一项
      </span>
      <span className='m-keyboard-func-box-btn' onClick={onNextItem}>
        下一项
      </span>
      <span className='m-keyboard-func-box-btn' onClick={handleSubmit}>
        确定
      </span>
    </div>
  )
}

KeyboardFuncBox.propTypes = {
  onNextItem: PropTypes.func,
  onLastItem: PropTypes.func,
  onCancel: PropTypes.func,
}

export default KeyboardFuncBox
