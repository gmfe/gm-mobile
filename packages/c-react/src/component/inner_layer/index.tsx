import React, { FC } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import LayoutRoot from '../layout_root'
import { View } from '../view'
import { InnerLayerProps } from './types'

const InnerLayerStatics = {
  render(props: InnerLayerProps) {
    LayoutRoot.renderWith(
      LayoutRoot.TYPE.INNER_LAYER,
      <InnerLayerBase {...props} />
    )
  },

  hide() {
    LayoutRoot.hideWith(LayoutRoot.TYPE.INNER_LAYER)
  },
}

const InnerLayerBase: FC<InnerLayerProps> = ({
  className,
  children,
  ...rest
}) => (
  <View
    {...rest}
    className={classNames(
      'm-inner-layer-container m-container-full',
      className
    )}
  >
    {children}
  </View>
)

const InnerLayer = Object.assign(InnerLayerBase, InnerLayerStatics)

export default InnerLayer
export type { InnerLayerProps }
