import React, { useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import Keyboard from './keyboard'
import KeyboardStatics from './statics'
import { KEYBOARD_LABEL, isTouchKeyboard } from './util'

// const useKeyboard = (props) => {
//   const tag = useMemo(() => {
//     return `${KEYBOARD_LABEL}_${Math.random()}`
//   }, [])

//   const handleFocus = (e) => {
//     // 触发事件
//     KeyboardStatics.render({
//       // 每个都对于不同的key
//       key: tag,
//       ...props,
//     })

//     // 延迟点，等 Page render 后再 scrollIntoView
//     setTimeout(() => {
//       const dom = document.querySelector(`[data-keyboard-label="${tag}"]`)
//       dom && dom.scrollIntoViewIfNeeded(false)
//     }, 50)
//   }

//   return {
//     keyboardProps: {
//       tabIndex: 0,
//       'data-keyboard-label': tag,
//       // 更合理，原生键盘也是 onFocus ，而不是 onClick
//       onFocus: handleFocus,
//     },
//   }
// }

// const KeyboardWrap = ({ children, ...rest }) => {
//   const { keyboardProps } = useKeyboard(rest)

//   return React.cloneElement(children, {
//     ...keyboardProps,
//   })
// }

// 兼容采购app
const useKeyboard = ({ onFocus, ...rest }) => {
  const tag = useMemo(() => {
    return `${KEYBOARD_LABEL}_${Math.random()}`
  }, [])

  // 点击键盘阻止失去焦点
  useEffect(() => {
    const handleMouseDown = (e) => {
      if (isTouchKeyboard(e.target)) {
        e.preventDefault()
      }
    }
    document.body.addEventListener('mousedown', handleMouseDown)

    return () => {
      document.body.removeEventListener('mousedown', handleMouseDown)
    }
  }, [])

  const handleFocus = (e) => {
    // 触发事件
    KeyboardStatics.render({
      // 每个都对于不同的key
      key: tag,
      ...rest,
    })

    // 延迟点，等 Page render 后再 scrollIntoView
    setTimeout(() => {
      const dom = document.querySelector(`[data-keyboard-label="${tag}"]`)
      dom && dom.scrollIntoViewIfNeeded(false)
    }, 50)

    onFocus && onFocus()
  }

  return {
    keyboardProps: {
      tabIndex: 0,
      'data-keyboard-label': tag,
      'data-keyboard-area-label': tag,
      // 更合理，原生键盘也是 onFocus ，而不是 onClick
      onFocus: handleFocus,
      // onBlur: handleBlur,
    },
  }
}

const KeyboardWrap = ({ children, ...rest }) => {
  const { keyboardProps } = useKeyboard(rest)

  return React.cloneElement(children, {
    ...keyboardProps,
  })
}

KeyboardWrap.propTypes = {
  ...Keyboard.propTypes,
  /** 标题, 辅助展示 */
  title: PropTypes.string,

  useFuncBar: PropTypes.bool,
  onFocus: PropTypes.func,
  // onBlurs: PropTypes.func,
}

export default KeyboardWrap
