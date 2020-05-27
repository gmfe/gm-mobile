import React from 'react'
import LayoutRoot from '../layout_root'
import Keyboard from './keyboard'
import Popup from '../popup'

const KeyboardStatics = {
  // 事件通知
  dispatchKeyboardEvent(keyboardId, eventName) {
    window.dispatchEvent(
      new window.CustomEvent('keyboard', {
        detail: { keyboardId, eventName },
      })
    )
  },

  render({ title, onHide, ...rest }) {
    LayoutRoot.renderWith(
      LayoutRoot.TYPE.KEYBOARD,
      <Popup
        title={title}
        onHide={onHide}
        bottom
        disabledMask
        style={{ animationDuration: '0s' }}
        // 内部用，为了区分点击区域
        data-label='gm_mobile_keyboard'
      >
        <Keyboard key={rest.keyboardId} {...rest} />
      </Popup>
    )

    // 键盘弹起通知
    KeyboardStatics.dispatchKeyboardEvent(rest.keyboardId, 'render')
  },

  hide() {
    LayoutRoot.hideWith(LayoutRoot.TYPE.KEYBOARD)
    // 取消键盘通知, 统一处理
    KeyboardStatics.dispatchKeyboardEvent(null, 'hide')
  },
}

export default KeyboardStatics
