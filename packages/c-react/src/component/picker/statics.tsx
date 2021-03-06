import React from 'react'

import { LayoutRoot } from '../layout_root'
import { Popup } from '../popup'
import { OptionsProps, PickerStaticTypes } from './types'

const PickerStatics: PickerStaticTypes = {
  render(options: OptionsProps) {
    LayoutRoot.renderWith(
      LayoutRoot.Type.PICKER,
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
    LayoutRoot.hideWith(LayoutRoot.Type.PICKER)
  },
}

export default PickerStatics
