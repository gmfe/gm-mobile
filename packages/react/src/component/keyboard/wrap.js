import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import Keyboard from './keyboard'
import { KEYBOARDLABEL, isKeyboardNeedHide } from './util'
import KeyboardStatics from './statics'

const useKeyboard = (props) => {
  // 生成 data-label, onClick事件传出去
  const tag = useRef(`${KEYBOARDLABEL}_` + Math.random())

  const handleFocus = (e) => {
    e.preventDefault()

    console.log('focus')
    // 触发事件
    Keyboard.render({
      key: tag.current,
      ...props,
    })

    setTimeout(() => {
      // 通过埋下的data-label找到当前点击dom
      const dom = document.querySelector(`[data-label="${tag.current}"]`)
      dom && dom.scrollIntoView()
    }, 50)
  }

  const handleBlur = (e) => {
    console.log('blur', e.target)
    Keyboard.hide()
  }

  return {
    wrapProps: {
      'data-label': tag.current,
      onFocus: handleFocus,
      onBlur: handleBlur,
    },
  }
}

const KeyboardWrap = ({ children, ...rest }) => {
  const { wrapProps } = useKeyboard(rest)
  return React.cloneElement(children, {
    ...wrapProps,
  })
}

KeyboardWrap.propTypes = {
  ...Keyboard.propTypes,
  /** 标题, 辅助展示 */
  title: PropTypes.string,
}

export default KeyboardWrap
