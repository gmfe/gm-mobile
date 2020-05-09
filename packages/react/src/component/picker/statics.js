import React from 'react'
import Popup from '../popup'
import LayoutRoot from '../layout_root'

const PickerStatics = {
  render(options) {
    LayoutRoot.renderWith(
      LayoutRoot.TYPE.PICKER,
      <Popup {...options} isPickPopup />
    )
  },

  hide() {
    LayoutRoot.hideWith(LayoutRoot.TYPE.PICKER)
  },
}

export default PickerStatics
