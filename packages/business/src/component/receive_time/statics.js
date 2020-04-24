import React from 'react'
import { Popup, LayerRoot } from '@gm-mobile/react'

const PickerStatics = {
  render(options) {
    const _onHide = options.onHide
    options.onHide = () => {
      PickerStatics.hide()
      _onHide && _onHide()
    }
    LayerRoot.renderWith(
      LayerRoot.TYPE.PICKER,
      <Popup {...options} isPickPopup />
    )
  },

  hide() {
    LayerRoot.hideWith(LayerRoot.TYPE.PICKER)
  },
}

export default PickerStatics
