import React from 'react'

import Keyboard from './keyboard'
import Popup from '../popup'

const NumberKeyboardStatics = {
  // 事件通知
  dispatchKeyboardEvent(keyboardId, eventName) {
    window.dispatchEvent(
      new window.CustomEvent('keyboard', {
        detail: { keyboardId, eventName },
      })
    )
  },

  render(options) {
    // 键盘弹起通知
    NumberKeyboardStatics.dispatchKeyboardEvent(options.keyboardId, 'render')
    return Popup.render({
      bottom: true,
      title: options.title,
      onHide: NumberKeyboardStatics.hide,
      disabledMask: true, // 无需mask
      style: { animationDuration: '0s' },
      children: <Keyboard key={options.keyboardId} {...options} />,
      // 内部用，为了区分点击区域
      'data-label': 'gm_mobile_keyboard',
    })
  },

  hide() {
    // 取消键盘通知, 统一处理
    NumberKeyboardStatics.dispatchKeyboardEvent(null, 'hide')
    Popup.hide()
  },
}

export default NumberKeyboardStatics
