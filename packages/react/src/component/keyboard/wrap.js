import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import Keyboard from './keyboard'
import { KEYBOARDLABEL, KEYBOARD_HIDE, isKeyboardNeedHide } from './util'
import KeyboardStatics from './statics'

const useKeyboard = (props) => {
  // 生成 data-label, onClick事件传出去
  const _tag = useRef('' + Math.random())
  const tag = `${KEYBOARDLABEL}_${_tag.current}`

  const keyboardHide = (e) => {
    if (isKeyboardNeedHide(e)) {
      KeyboardStatics.hide()
    }
  }

  const handleKeyboardHide = () => {
    window.removeEventListener('click', keyboardHide)
    window.removeEventListener(KEYBOARD_HIDE, handleKeyboardHide)
  }

  const handleClick = () => {
    setTimeout(() => {
      // 通过埋下的data-label找到当前点击dom
      const doms = document.querySelectorAll('[data-label]')
      const dom = _.find(doms, (dom) => dom.getAttribute('data-label') === tag)
      dom && dom.scrollIntoView()
    }, 50)

    // 触发事件
    Keyboard.render({
      key: tag,
      ...props,
    })

    // 此时监听页面的点击事件，判断后续操作是否触发收起键盘
    window.addEventListener('click', keyboardHide)
    // 弹窗取消按钮，键盘确定按钮都可以收起键盘
    window.addEventListener(KEYBOARD_HIDE, handleKeyboardHide)
  }

  return {
    wrapProps: {
      'data-label': tag,
      onClick: handleClick,
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
