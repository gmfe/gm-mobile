import React from 'react'

import Keyboard from './keyboard'
import Popup from '../popup'

const NumberKeyboardStatics = {
  render(options) {
    return Popup.render({
      bottom: true,
      children: <Keyboard {...options} />,
    })
  },

  hide() {
    Popup.hide()
  },
}

export default NumberKeyboardStatics
