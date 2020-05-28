import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Keyboard from './keyboard'
import { KEYBOARDLABEL, KEYBOARD_HIDE, isKeyboardNeedHide } from './util'
import KeyboardStatics from './statics'

function useKeyboard({ id, openKeyboard, ...rest }, options) {
  useEffect(() => {
    const keyboardHide = (e) => {
      if (isKeyboardNeedHide(e)) {
        KeyboardStatics.hide()
      }
    }

    const handleKeyboardHide = () => {
      window.removeEventListener('click', keyboardHide)
      window.removeEventListener(KEYBOARD_HIDE, handleKeyboardHide)
      options.callback && options.callback()
    }

    if (openKeyboard) {
      setTimeout(() => {
        const dom = document.getElementById(id)
        dom && dom.scrollIntoView()
      }, 50)

      // 触发事件
      Keyboard.render({
        key: Math.random(),
        ...rest,
      })

      // 此时监听页面的点击事件，判断后续操作是否触发收起键盘
      window.addEventListener('click', keyboardHide)
      // 弹窗取消按钮，键盘确定按钮都可以收起键盘
      window.addEventListener(KEYBOARD_HIDE, handleKeyboardHide)
    }
  }, [openKeyboard])
}

const KeyboardWrap = ({ children, ...rest }) => {
  const [openKeyboard, setOpenKeyboard] = useState(false)
  const refId = useRef('' + Math.random())

  useKeyboard(
    {
      id: refId.current,
      openKeyboard,
      ...rest,
    },
    { callback: () => setOpenKeyboard(false) }
  )

  const handleClick = () => {
    setOpenKeyboard(true)
  }

  return React.cloneElement(children, {
    id: refId.current,
    onClick: handleClick,
    'data-label': KEYBOARDLABEL,
  })

  // const keyboardHide = (e) => {
  //   if (isKeyboardNeedHide(e)) {
  //     KeyboardStatics.hide()
  //   }
  // }

  // const handleKeyboardHide = () => {
  //   window.removeEventListener('click', keyboardHide)
  //   window.removeEventListener(KEYBOARD_HIDE, handleKeyboardHide)
  // }

  // const handleClick = () => {
  //   // 点击元素滚动到可视区域
  //   setTimeout(() => {
  //     wrapRef.current && wrapRef.current.scrollIntoView()
  //   }, 50)

  //   // 触发事件
  //   Keyboard.render({
  //     key: Math.random(),
  //     ...rest,
  //   })

  //   // 此时监听页面的点击事件，判断后续操作是否触发收起键盘
  //   window.addEventListener('click', keyboardHide)
  //   // 弹窗取消按钮，键盘确定按钮都可以收起键盘
  //   window.addEventListener(KEYBOARD_HIDE, handleKeyboardHide)
  // }

  // return (
  //   <div
  //     ref={wrapRef}
  //     onClick={handleClick}
  //     data-label={KEYBOARDLABEL}
  //   >
  //     {children}
  //   </div>
  // )
}

KeyboardWrap.propTypes = {
  ...Keyboard.propTypes,
  /** 标题, 辅助展示 */
  title: PropTypes.string,
}

export default KeyboardWrap
