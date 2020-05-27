import React from 'react'
import LayoutRoot from '../layout_root'
import Keyboard from './keyboard'
import Popup from '../popup'
import {
  KEYBOARDLABEL,
  KEYBOARD_EVENT,
  KEYBOARD_RENDER,
  KEYBOARD_ONHIDE,
  isContains,
} from './util'

const KeyboardStatics = {
  // 事件通知
  dispatchKeyboardEvent(key, eventName) {
    window.dispatchEvent(
      new window.CustomEvent(KEYBOARD_EVENT, {
        detail: { key, eventName },
      })
    )
  },

  // 监听页面点击，判断是否需要收起键盘
  isKeyboardNeedHide(e) {
    const node = e.target
    if (
      !isContains(node, (n) => {
        return n.dataset && n.dataset.label && n.dataset.label === KEYBOARDLABEL
      })
    ) {
      KeyboardStatics.hide()
    }
  },

  render({ title, onHide, ...rest }) {
    LayoutRoot.renderWith(
      LayoutRoot.TYPE.KEYBOARD,
      <Popup
        title={title}
        onHide={() => {
          KeyboardStatics.hide()
          onHide && onHide()
        }}
        bottom
        disabledMask
        style={{ animationDuration: '0s' }}
        // 内部用，为了区分点击区域
        data-label={KEYBOARDLABEL}
      >
        <Keyboard key={rest.key} {...rest} />
      </Popup>,
      () => KeyboardStatics.dispatchKeyboardEvent(null, KEYBOARD_ONHIDE) // 回调, layoutRoot监听popstate用
    )
    // 键盘弹起通知
    KeyboardStatics.dispatchKeyboardEvent(rest.key, KEYBOARD_RENDER)
  },

  hide() {
    LayoutRoot.hideWith(LayoutRoot.TYPE.KEYBOARD)
    // 键盘收起通知
    KeyboardStatics.dispatchKeyboardEvent(null, KEYBOARD_ONHIDE)
  },
}

export default KeyboardStatics
