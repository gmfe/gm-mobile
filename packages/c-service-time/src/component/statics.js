import React from 'react'
import { Popup, LayoutRoot } from '@gm-mobile/c-react'

const PickerStatics = {
  render(options) {
    const _onHide = options.onHide
    options.onHide = () => {
      PickerStatics.hide()
      _onHide && _onHide()
    }
    LayoutRoot.renderWith(
      LayoutRoot.Type.PICKER,
      <Popup {...options} isPickPopup />
    )
  },

  hide() {
    LayoutRoot.hideWith(LayoutRoot.Type.PICKER)
  },
}

export default PickerStatics
