import React, { useRef } from 'react'
import PropTypes from 'prop-types'

import Keyboard from './keyboard'
import { KEYBOARDLABEL, KEYBOARD_HIDE, isKeyboardNeedHide } from './util'
import KeyboardStatics from './statics'

const KeyboardWrap = ({
  defaultValue,
  title,
  onSubmit,
  min,
  max,
  precision,
  children,
  getErrorMsg,
  ...rest
}) => {
  const wrapRef = useRef(null)

  const keyboardHide = (e) => {
    if (isKeyboardNeedHide(e)) {
      KeyboardStatics.hide()
    }
  }

  const handleKeyboardHide = () => {
    window.removeEventListener('click', keyboardHide)
    window.removeEventListener(KEYBOARD_HIDE, handleKeyboardHide)
  }

  const handleClick = (e) => {
    // 点击元素滚动到可视区域
    setTimeout(() => {
      wrapRef.current &&
        wrapRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }, 50)

    // 触发事件
    Keyboard.render({
      key: Math.random(),
      defaultValue,
      title,
      onSubmit,
      min,
      max,
      precision,
      getErrorMsg,
    })

    // 此时监听页面的点击事件，判断后续操作是否触发收起键盘
    window.addEventListener('click', keyboardHide)
    // 弹窗取消按钮，键盘确定按钮都可以收起键盘
    window.addEventListener(KEYBOARD_HIDE, handleKeyboardHide)
  }

  return (
    <div
      {...rest}
      ref={wrapRef}
      onClick={handleClick}
      data-label={KEYBOARDLABEL}
    >
      {children}
    </div>
  )
}

KeyboardWrap.propTypes = {
  ...Keyboard.propTypes,
  /** 标题, 辅助展示 */
  title: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default KeyboardWrap
