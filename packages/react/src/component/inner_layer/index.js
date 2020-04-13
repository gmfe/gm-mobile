import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import LayerRoot from '../layer_root'

const InnerLayerStatics = {
  render(props) {
    LayerRoot.renderWith(LayerRoot.TYPE.INNERLAYER, <InnerLayer {...props} />)
  },

  hide() {
    LayerRoot.hideWith(LayerRoot.TYPE.INNERLAYER)
  },
}

const InnerLayer = ({ className, children, ...rest }) => (
  <div
    {...rest}
    className={classNames(
      'm-inner-layer-container m-container-full',
      className
    )}
  >
    {children}
  </div>
)

Object.assign(InnerLayer, InnerLayerStatics)

InnerLayer.propTypes = {
  className: PropTypes.string,
}

export default InnerLayer
