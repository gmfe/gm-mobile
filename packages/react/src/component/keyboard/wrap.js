import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import Keyboard from './keyboard'
import KeyboardStatics from './statics'
import { KEYBOARD_LABEL, isKeyboardNeedHide } from './util'

const useKeyboard = (props) => {
  const [active, setActive] = useState(false)

  const tag = useMemo(() => {
    return `${KEYBOARD_LABEL}_${Math.random()}`
  }, [])

  useEffect(() => {
    // 只有开启的时候才需要监听事件
    if (!active) {
      return
    }

    // 由他来处理隐藏 keyboard
    const handleWindowClick = (e) => {
      if (isKeyboardNeedHide(e.target)) {
        KeyboardStatics.hide()
      }
    }

    document.body.addEventListener('click', handleWindowClick)

    // 记得清理
    return () => {
      document.body.removeEventListener('click', handleWindowClick)
    }
  }, [active])

  const handleFocus = (e) => {
    setActive(true)

    // 触发事件
    KeyboardStatics.render({
      // 每个都对于不同的key
      key: tag,
      ...props,
    })

    // 延迟点，等 Page render 后再 scrollIntoView
    setTimeout(() => {
      const dom = document.querySelector(`[data-keyboard-label="${tag}"]`)

      dom && dom.scrollIntoViewIfNeeded(false)
    }, 50)
  }

  const handleBlur = () => {
    // 维护好状态即可
    setActive(false)
  }

  return {
    keyboardProps: {
      tabIndex: 0,
      'data-keyboard-label': tag,
      // 更合理，原生键盘也是 onFocus ，而不是 onClick
      onFocus: handleFocus,
      onBlur: handleBlur,
    },
  }
}

const KeyboardWrap = ({ children, ...rest }) => {
  const { keyboardProps } = useKeyboard(rest)

  return React.cloneElement(children, {
    ...rest,
    ...keyboardProps,
  })
}

KeyboardWrap.propTypes = {
  ...Keyboard.propTypes,
  /** 标题, 辅助展示 */
  title: PropTypes.string,
}

export default KeyboardWrap
