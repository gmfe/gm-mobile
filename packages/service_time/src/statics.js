import React from 'react'
import { Popup, LayoutRoot } from '@gm-mobile/react'

const PickerStatics = {
  render(options) {
    const _onHide = options.onHide
    options.onHide = () => {
      PickerStatics.hide()
      _onHide && _onHide()
    }
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
