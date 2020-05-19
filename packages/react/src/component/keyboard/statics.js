import React from 'react'

import Keyboard from './keyboard'
import Popup from '../popup'

const NumberKeyboardStatics = {
  render(options) {
    return Popup.render({
      bottom: true,
      title: options.title,
      onHide: Popup.hide,
      children: <Keyboard {...options} />,
    })
  },

  hide() {
    Popup.hide()
  },
}

export default NumberKeyboardStatics
