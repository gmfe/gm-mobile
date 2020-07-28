import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import LayoutRoot from '../layout_root'
import View from '../view'

const InnerLayerStatics = {
  render(props) {
    LayoutRoot.renderWith(
      LayoutRoot.TYPE.INNER_LAYER,
      <InnerLayer {...props} />
    )
  },

  hide() {
    LayoutRoot.hideWith(LayoutRoot.TYPE.INNER_LAYER)
  },
}

const InnerLayer = ({ className, children, ...rest }) => (
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

Object.assign(InnerLayer, InnerLayerStatics)

InnerLayer.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
}

export default InnerLayer
