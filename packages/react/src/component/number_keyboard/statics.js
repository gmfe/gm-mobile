import React from 'react'

import NumberKeyboard from './number_keyboard'
import Popup from '../popup'

const NumberKeyboardStatics = {
  render(options) {
    return Popup.render({
      bottom: true,
      children: <NumberKeyboard {...options} />,
    })
  },

  hide() {
    Popup.hide()
  },
}

export default NumberKeyboardStatics
