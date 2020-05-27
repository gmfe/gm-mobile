import React from 'react'
import LayoutRoot from '../layout_root'
import Keyboard from './keyboard'
import Popup from '../popup'
import {
  KEYBOARDLABEL,
  KEYBOARD_RENDER,
  KEYBOARD_HIDE,
  dispatchKeyboardEvent,
} from './util'

const KeyboardStatics = {
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
      {
        popstateCallback: () => dispatchKeyboardEvent(null, KEYBOARD_HIDE),
      } // 回调, 通知键盘收起, layoutRoot监听popstate用
    )
    // 键盘弹起通知
    dispatchKeyboardEvent(rest.key, KEYBOARD_RENDER)
  },

  hide() {
    LayoutRoot.hideWith(LayoutRoot.TYPE.KEYBOARD)
    // 键盘收起通知
    dispatchKeyboardEvent(null, KEYBOARD_HIDE)
  },
}

export default KeyboardStatics
