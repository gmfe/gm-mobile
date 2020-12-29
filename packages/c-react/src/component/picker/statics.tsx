import React from 'react'

import { LayoutRoot, LayoutRootType } from '../layout_root'
import { Popup } from '../popup'
import { OptionsProps, PickerStaticTypes } from './types'

const PickerStatics: PickerStaticTypes = {
  render(options: OptionsProps) {
    LayoutRoot.renderWith(
      LayoutRootType.PICKER,
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
    LayoutRoot.hideWith(LayoutRootType.PICKER)
  },
}

export default PickerStatics
