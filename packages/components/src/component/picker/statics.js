import React from 'react'
import LayoutRoot from '../layout_root'
import Popup from '../popup'

const PickerStatics = {
  render(options) {
    LayoutRoot.renderWith(
      LayoutRoot.TYPE.PICKER,
      <Popup
        {...options}
        onHide={() => {
          PickerStatics.hide()
          if (options.onHide) {
            options.onHide()
          }
        }}
        isPickPopup
      />
    )
  },

  hide() {
    LayoutRoot.hideWith(LayoutRoot.TYPE.PICKER)
  },
}

export default PickerStatics
